---
name: manage-event-queuing
description: Configure and manage event queues for webhook and async processing
activation: Use when setting up event queues or troubleshooting queue issues
---

# Manage Event Queuing

**Role:** Event Queue Administrator
**Domain:** Message Queues, Event-Driven Architecture
**Objective:** Configure reliable event queuing for webhook delivery

## Quick Start (TL;DR)

**Use when:** Setting up or managing event queues
**Key steps:** 1. Configure queue  2. Set up consumers  3. Monitor health
**Output:** Reliable event queue with monitoring

## Queue Configuration

```typescript
interface QueueConfig {
  name: string;
  type: 'fifo' | 'standard';
  visibilityTimeout: number;
  messageRetention: number;
  maxReceiveCount: number;
  deadLetterQueue?: string;
  delaySeconds?: number;
  batchSize?: number;
}

const webhookQueue: QueueConfig = {
  name: 'webhook-delivery',
  type: 'standard',
  visibilityTimeout: 60,        // 60 seconds to process
  messageRetention: 1209600,    // 14 days
  maxReceiveCount: 5,           // Retry 5 times before DLQ
  deadLetterQueue: 'webhook-dlq',
  batchSize: 10,
};

const priorityQueue: QueueConfig = {
  name: 'webhook-priority',
  type: 'fifo',                 // Ordered processing
  visibilityTimeout: 30,
  messageRetention: 86400,      // 1 day
  maxReceiveCount: 3,
  deadLetterQueue: 'webhook-priority-dlq',
};
```

## Event Structure

```typescript
interface QueueEvent {
  id: string;
  type: string;
  version: string;
  timestamp: Date;
  source: string;
  correlationId?: string;
  priority?: 'low' | 'normal' | 'high' | 'critical';
  payload: Record<string, any>;
  metadata: {
    retryCount: number;
    originalTimestamp: Date;
    traceId?: string;
  };
}

// Example payment event
const paymentEvent: QueueEvent = {
  id: 'evt_abc123',
  type: 'payment.completed',
  version: '2.0',
  timestamp: new Date(),
  source: 'payment-service',
  correlationId: 'txn_xyz789',
  priority: 'high',
  payload: {
    paymentId: 'pay_123',
    amount: 9999,
    currency: 'USD',
    status: 'completed',
  },
  metadata: {
    retryCount: 0,
    originalTimestamp: new Date(),
    traceId: 'trace-abc',
  },
};
```

## Producer Pattern

```typescript
class EventProducer {
  constructor(
    private queue: MessageQueue,
    private serializer: EventSerializer
  ) {}

  async publish(event: QueueEvent): Promise<PublishResult> {
    const message = this.serializer.serialize(event);

    const attributes = {
      eventType: event.type,
      priority: event.priority || 'normal',
      correlationId: event.correlationId,
    };

    try {
      const result = await this.queue.sendMessage({
        body: message,
        attributes,
        deduplicationId: event.id,
        groupId: this.getGroupId(event),
        delaySeconds: this.getDelay(event),
      });

      await metrics.increment('queue.published', {
        type: event.type,
        priority: event.priority,
      });

      return { messageId: result.messageId, success: true };
    } catch (error) {
      await metrics.increment('queue.publish_failed', {
        type: event.type,
        error: error.message,
      });
      throw error;
    }
  }

  async publishBatch(events: QueueEvent[]): Promise<BatchPublishResult> {
    const messages = events.map(event => ({
      body: this.serializer.serialize(event),
      id: event.id,
      attributes: {
        eventType: event.type,
        priority: event.priority || 'normal',
      },
    }));

    const result = await this.queue.sendMessageBatch(messages);

    return {
      successful: result.successful.map(r => r.id),
      failed: result.failed.map(r => ({ id: r.id, error: r.error })),
    };
  }

  private getGroupId(event: QueueEvent): string | undefined {
    // Group related events for FIFO processing
    if (event.correlationId) {
      return event.correlationId;
    }
    return undefined;
  }

  private getDelay(event: QueueEvent): number {
    // Delay low priority events
    if (event.priority === 'low') {
      return 30; // 30 seconds delay
    }
    return 0;
  }
}
```

## Consumer Pattern

```typescript
interface ConsumerConfig {
  maxConcurrency: number;
  batchSize: number;
  waitTimeSeconds: number;
  processingTimeout: number;
}

class EventConsumer {
  private running: boolean = false;
  private activeProcessors: number = 0;

  constructor(
    private queue: MessageQueue,
    private handlers: Map<string, EventHandler>,
    private config: ConsumerConfig
  ) {}

  async start(): Promise<void> {
    this.running = true;
    console.log(`Consumer started with concurrency: ${this.config.maxConcurrency}`);

    while (this.running) {
      if (this.activeProcessors >= this.config.maxConcurrency) {
        await sleep(100);
        continue;
      }

      const messages = await this.queue.receiveMessages({
        maxMessages: Math.min(
          this.config.batchSize,
          this.config.maxConcurrency - this.activeProcessors
        ),
        waitTimeSeconds: this.config.waitTimeSeconds,
      });

      for (const message of messages) {
        this.processMessage(message);
      }
    }
  }

  private async processMessage(message: QueueMessage): Promise<void> {
    this.activeProcessors++;
    const startTime = Date.now();

    try {
      const event = this.deserialize(message.body);
      const handler = this.handlers.get(event.type);

      if (!handler) {
        console.warn(`No handler for event type: ${event.type}`);
        await this.queue.deleteMessage(message.receiptHandle);
        return;
      }

      // Set processing timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new TimeoutError()), this.config.processingTimeout);
      });

      await Promise.race([
        handler.handle(event),
        timeoutPromise,
      ]);

      await this.queue.deleteMessage(message.receiptHandle);

      await metrics.timing('queue.processing_time', Date.now() - startTime, {
        type: event.type,
      });
    } catch (error) {
      console.error('Failed to process message:', error);

      // Message will become visible again after visibility timeout
      await metrics.increment('queue.processing_failed', {
        error: error.message,
      });
    } finally {
      this.activeProcessors--;
    }
  }

  async stop(): Promise<void> {
    this.running = false;

    // Wait for active processors to complete
    while (this.activeProcessors > 0) {
      await sleep(100);
    }

    console.log('Consumer stopped');
  }
}
```

## Priority Queue Routing

```typescript
class PriorityRouter {
  private queues: Map<string, MessageQueue>;

  constructor(queues: { priority: string; queue: MessageQueue }[]) {
    this.queues = new Map(queues.map(q => [q.priority, q.queue]));
  }

  async route(event: QueueEvent): Promise<void> {
    const priority = event.priority || 'normal';
    const queue = this.queues.get(priority) || this.queues.get('normal')!;

    await queue.sendMessage({
      body: JSON.stringify(event),
      attributes: { eventType: event.type },
    });
  }
}

// Usage
const router = new PriorityRouter([
  { priority: 'critical', queue: criticalQueue },
  { priority: 'high', queue: highPriorityQueue },
  { priority: 'normal', queue: standardQueue },
  { priority: 'low', queue: lowPriorityQueue },
]);
```

## Queue Monitoring

```typescript
interface QueueHealth {
  name: string;
  approximateMessages: number;
  approximateMessagesDelayed: number;
  approximateMessagesNotVisible: number;
  oldestMessageAge?: number;
  dlqMessages?: number;
}

async function getQueueHealth(queueName: string): Promise<QueueHealth> {
  const attributes = await queue.getAttributes([
    'ApproximateNumberOfMessages',
    'ApproximateNumberOfMessagesDelayed',
    'ApproximateNumberOfMessagesNotVisible',
  ]);

  const health: QueueHealth = {
    name: queueName,
    approximateMessages: parseInt(attributes.ApproximateNumberOfMessages),
    approximateMessagesDelayed: parseInt(attributes.ApproximateNumberOfMessagesDelayed),
    approximateMessagesNotVisible: parseInt(attributes.ApproximateNumberOfMessagesNotVisible),
  };

  // Check DLQ if configured
  if (config.deadLetterQueue) {
    const dlqAttributes = await dlq.getAttributes(['ApproximateNumberOfMessages']);
    health.dlqMessages = parseInt(dlqAttributes.ApproximateNumberOfMessages);
  }

  return health;
}

async function checkQueueAlerts(health: QueueHealth): Promise<Alert[]> {
  const alerts: Alert[] = [];

  if (health.approximateMessages > 10000) {
    alerts.push({
      severity: 'warning',
      message: `Queue ${health.name} has ${health.approximateMessages} pending messages`,
    });
  }

  if (health.dlqMessages && health.dlqMessages > 100) {
    alerts.push({
      severity: 'critical',
      message: `DLQ for ${health.name} has ${health.dlqMessages} failed messages`,
    });
  }

  return alerts;
}
```

## Backpressure Handling

```typescript
class BackpressureController {
  private currentRate: number;
  private readonly minRate: number;
  private readonly maxRate: number;
  private readonly targetLatency: number;

  constructor(config: {
    initialRate: number;
    minRate: number;
    maxRate: number;
    targetLatency: number;
  }) {
    this.currentRate = config.initialRate;
    this.minRate = config.minRate;
    this.maxRate = config.maxRate;
    this.targetLatency = config.targetLatency;
  }

  adjust(metrics: { latency: number; errorRate: number }): number {
    if (metrics.errorRate > 0.1) {
      // High error rate - reduce by 50%
      this.currentRate = Math.max(
        this.minRate,
        Math.floor(this.currentRate * 0.5)
      );
    } else if (metrics.latency > this.targetLatency * 1.5) {
      // Latency too high - reduce by 20%
      this.currentRate = Math.max(
        this.minRate,
        Math.floor(this.currentRate * 0.8)
      );
    } else if (metrics.latency < this.targetLatency * 0.5 && metrics.errorRate < 0.01) {
      // Room to grow - increase by 10%
      this.currentRate = Math.min(
        this.maxRate,
        Math.ceil(this.currentRate * 1.1)
      );
    }

    return this.currentRate;
  }

  getRate(): number {
    return this.currentRate;
  }
}
```

## Related Skills

**This skill uses:**
- `implement-webhook-reliability` - Delivery patterns

**This skill is used by:**
- `handle-webhook-event` - Event processing
- `webhook-orchestrator` agent

## Best Practices

- Use FIFO queues only when ordering matters
- Set appropriate visibility timeouts
- Always configure dead letter queues
- Monitor queue depth and age
- Implement backpressure handling
- Use batch operations for efficiency
- Include correlation IDs for tracing
- Set message retention based on SLA
