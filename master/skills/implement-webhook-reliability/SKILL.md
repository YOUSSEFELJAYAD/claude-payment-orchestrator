---
name: implement-webhook-reliability
description: Build reliable webhook delivery with retries, circuit breakers, and dead letter queues
activation: Use when implementing webhook infrastructure or fixing delivery issues
---

# Implement Webhook Reliability

**Role:** Webhook Infrastructure Engineer
**Domain:** Event-Driven Architecture, Reliability Engineering
**Objective:** Ensure reliable webhook delivery with proper failure handling

## Quick Start (TL;DR)

**Use when:** Building webhook delivery systems or fixing reliability issues
**Key steps:** 1. Implement retries  2. Add circuit breakers  3. Configure DLQ
**Output:** Reliable webhook infrastructure with monitoring

## Retry Strategy

```typescript
interface RetryConfig {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
  retryableStatuses: number[];
}

const defaultConfig: RetryConfig = {
  maxAttempts: 5,
  baseDelayMs: 1000,
  maxDelayMs: 300000, // 5 minutes
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

function calculateDelay(attempt: number, config: RetryConfig): number {
  const delay = config.baseDelayMs * Math.pow(config.backoffMultiplier, attempt);
  const jitter = Math.random() * 0.3 * delay; // 30% jitter
  return Math.min(delay + jitter, config.maxDelayMs);
}

async function deliverWithRetry(
  webhook: WebhookPayload,
  config: RetryConfig = defaultConfig
): Promise<DeliveryResult> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
    try {
      const result = await attemptDelivery(webhook);

      if (result.status >= 200 && result.status < 300) {
        return { success: true, attempts: attempt + 1, response: result };
      }

      if (!config.retryableStatuses.includes(result.status)) {
        return { success: false, attempts: attempt + 1, response: result, permanent: true };
      }

      lastError = new Error(`HTTP ${result.status}`);
    } catch (error) {
      lastError = error as Error;
    }

    if (attempt < config.maxAttempts - 1) {
      const delay = calculateDelay(attempt, config);
      await sleep(delay);
    }
  }

  return {
    success: false,
    attempts: config.maxAttempts,
    error: lastError,
    exhausted: true,
  };
}
```

## Circuit Breaker Pattern

```typescript
interface CircuitBreakerConfig {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
  halfOpenRequests: number;
}

enum CircuitState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half_open',
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failures: number = 0;
  private successes: number = 0;
  private lastFailureTime: number = 0;
  private halfOpenAttempts: number = 0;

  constructor(
    private endpoint: string,
    private config: CircuitBreakerConfig
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime < this.config.timeout) {
        throw new CircuitOpenError(this.endpoint);
      }
      this.state = CircuitState.HALF_OPEN;
      this.halfOpenAttempts = 0;
    }

    if (this.state === CircuitState.HALF_OPEN) {
      if (this.halfOpenAttempts >= this.config.halfOpenRequests) {
        throw new CircuitOpenError(this.endpoint);
      }
      this.halfOpenAttempts++;
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    if (this.state === CircuitState.HALF_OPEN) {
      this.successes++;
      if (this.successes >= this.config.successThreshold) {
        this.state = CircuitState.CLOSED;
        this.successes = 0;
      }
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    this.successes = 0;

    if (this.failures >= this.config.failureThreshold) {
      this.state = CircuitState.OPEN;
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}
```

## Dead Letter Queue (DLQ)

```typescript
interface DeadLetterEntry {
  id: string;
  webhook: WebhookPayload;
  originalTimestamp: Date;
  lastAttempt: Date;
  attempts: number;
  lastError: string;
  endpointId: string;
  metadata: Record<string, any>;
}

class DeadLetterQueue {
  constructor(private storage: DLQStorage) {}

  async enqueue(entry: DeadLetterEntry): Promise<void> {
    await this.storage.save(entry);

    await metrics.increment('webhook.dlq.enqueued', {
      endpointId: entry.endpointId,
    });
  }

  async retry(id: string): Promise<DeliveryResult> {
    const entry = await this.storage.get(id);
    if (!entry) {
      throw new NotFoundError(`DLQ entry ${id} not found`);
    }

    const result = await deliverWithRetry(entry.webhook);

    if (result.success) {
      await this.storage.delete(id);
      await metrics.increment('webhook.dlq.recovered');
    } else {
      await this.storage.update(id, {
        lastAttempt: new Date(),
        attempts: entry.attempts + 1,
        lastError: result.error?.message || 'Unknown error',
      });
    }

    return result;
  }

  async retryAll(endpointId?: string): Promise<BatchRetryResult> {
    const entries = await this.storage.list({ endpointId });
    const results: DeliveryResult[] = [];

    for (const entry of entries) {
      const result = await this.retry(entry.id);
      results.push(result);

      // Rate limit retries
      await sleep(100);
    }

    return {
      total: entries.length,
      succeeded: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
    };
  }

  async purge(olderThan: Date): Promise<number> {
    const deleted = await this.storage.deleteOlderThan(olderThan);
    await metrics.increment('webhook.dlq.purged', {}, deleted);
    return deleted;
  }
}
```

## Idempotency Keys

```typescript
interface IdempotencyRecord {
  key: string;
  webhookId: string;
  status: 'pending' | 'completed' | 'failed';
  response?: any;
  createdAt: Date;
  expiresAt: Date;
}

class IdempotencyManager {
  constructor(private cache: IdempotencyCache) {}

  async getOrCreate(
    webhookId: string,
    endpoint: string
  ): Promise<{ key: string; isDuplicate: boolean; existing?: IdempotencyRecord }> {
    const key = this.generateKey(webhookId, endpoint);
    const existing = await this.cache.get(key);

    if (existing) {
      return { key, isDuplicate: true, existing };
    }

    const record: IdempotencyRecord = {
      key,
      webhookId,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    await this.cache.set(key, record);
    return { key, isDuplicate: false };
  }

  async markCompleted(key: string, response: any): Promise<void> {
    await this.cache.update(key, {
      status: 'completed',
      response,
    });
  }

  async markFailed(key: string): Promise<void> {
    await this.cache.update(key, {
      status: 'failed',
    });
  }

  private generateKey(webhookId: string, endpoint: string): string {
    return `idem:${webhookId}:${crypto.createHash('sha256').update(endpoint).digest('hex').slice(0, 16)}`;
  }
}
```

## Delivery Pipeline

```typescript
class WebhookDeliveryPipeline {
  constructor(
    private circuitBreakers: Map<string, CircuitBreaker>,
    private dlq: DeadLetterQueue,
    private idempotency: IdempotencyManager,
    private retryConfig: RetryConfig
  ) {}

  async deliver(webhook: WebhookPayload, endpoint: WebhookEndpoint): Promise<DeliveryResult> {
    // 1. Check idempotency
    const { key, isDuplicate, existing } = await this.idempotency.getOrCreate(
      webhook.id,
      endpoint.url
    );

    if (isDuplicate && existing?.status === 'completed') {
      return { success: true, cached: true, response: existing.response };
    }

    // 2. Check circuit breaker
    const breaker = this.getCircuitBreaker(endpoint.id);

    try {
      const result = await breaker.execute(async () => {
        return await deliverWithRetry(webhook, this.retryConfig);
      });

      if (result.success) {
        await this.idempotency.markCompleted(key, result.response);
      } else if (result.exhausted) {
        await this.dlq.enqueue({
          id: crypto.randomUUID(),
          webhook,
          originalTimestamp: webhook.timestamp,
          lastAttempt: new Date(),
          attempts: result.attempts,
          lastError: result.error?.message || 'Max retries exceeded',
          endpointId: endpoint.id,
          metadata: { idempotencyKey: key },
        });
        await this.idempotency.markFailed(key);
      }

      return result;
    } catch (error) {
      if (error instanceof CircuitOpenError) {
        // Queue for later when circuit is open
        await this.dlq.enqueue({
          id: crypto.randomUUID(),
          webhook,
          originalTimestamp: webhook.timestamp,
          lastAttempt: new Date(),
          attempts: 0,
          lastError: 'Circuit breaker open',
          endpointId: endpoint.id,
          metadata: { idempotencyKey: key, circuitOpen: true },
        });
      }
      throw error;
    }
  }

  private getCircuitBreaker(endpointId: string): CircuitBreaker {
    if (!this.circuitBreakers.has(endpointId)) {
      this.circuitBreakers.set(endpointId, new CircuitBreaker(endpointId, {
        failureThreshold: 5,
        successThreshold: 2,
        timeout: 60000,
        halfOpenRequests: 3,
      }));
    }
    return this.circuitBreakers.get(endpointId)!;
  }
}
```

## Monitoring Dashboard

```typescript
interface WebhookMetrics {
  delivered: number;
  failed: number;
  retried: number;
  dlqSize: number;
  avgLatency: number;
  circuitBreakers: {
    open: string[];
    halfOpen: string[];
  };
}

async function getWebhookHealth(): Promise<WebhookMetrics> {
  const [delivered, failed, retried, dlqSize, latencies, breakers] = await Promise.all([
    metrics.get('webhook.delivered'),
    metrics.get('webhook.failed'),
    metrics.get('webhook.retried'),
    dlq.count(),
    metrics.getHistogram('webhook.latency'),
    circuitBreakers.getStates(),
  ]);

  return {
    delivered,
    failed,
    retried,
    dlqSize,
    avgLatency: latencies.mean,
    circuitBreakers: {
      open: breakers.filter(b => b.state === 'open').map(b => b.id),
      halfOpen: breakers.filter(b => b.state === 'half_open').map(b => b.id),
    },
  };
}
```

## Related Skills

**This skill uses:**
- `validate-webhook-signatures` - Signature verification
- `manage-event-queuing` - Event queue management

**This skill is used by:**
- `handle-webhook-event` - Event handling
- `payment-orchestration` - Payment flows

## Best Practices

- Use exponential backoff with jitter
- Implement circuit breakers per endpoint
- Store failed webhooks in DLQ for manual retry
- Use idempotency keys to prevent duplicates
- Monitor circuit breaker states
- Set reasonable timeout limits
- Log all delivery attempts for debugging
