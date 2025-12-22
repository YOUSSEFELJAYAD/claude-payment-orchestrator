# Skill: Handle Webhook Event

**Role:** sequential-reasoner (Gateway Specialist)
**Domain:** Payment Gateway Integration
**Objective:** Implement secure, robust webhook handling for asynchronous PSP notifications with comprehensive signature verification, replay attack prevention, idempotency checks, and leveraging Context7 for PSP-specific webhook documentation, Serena for handler analysis, systematic debugging for webhook failures, and complete event processing workflows.

## Available Capabilities

### MCP Servers
| Server | Usage in Webhook Handling |
|--------|---------------------------|
| **Serena** | Find webhook handlers, analyze signature verification logic, trace event processing flows |
| **Context7** | Get PSP-specific webhook documentation (Stripe, Cybersource, MPGS signatures) |
| **Playwright** | Test webhook endpoints, simulate PSP event delivery |
| **Chrome** | Monitor PSP webhook logs in dashboards, verify event delivery |
| **Episodic Memory** | Recall past webhook security issues, signature failures, processing patterns |

### Superpowers Skills
| Skill | Webhook-Specific Trigger |
|-------|-------------------------|
| `brainstorming` | Before designing webhook architecture or event routing |
| `systematic-debugging` | When diagnosing webhook signature failures, missing events, processing errors |
| `test-driven-development` | Before implementing webhook handlers |
| `verification-before-completion` | Before deploying webhook changes |
| `writing-plans` | For complex webhook processing pipelines |
| `subagent-driven-development` | Parallel implementation of handler + tests + monitoring |
| `requesting-code-review` | After implementing security-critical webhook code |

### Specialized Agents
| Agent | Webhook Use Case |
|-------|-----------------|
| `code-architect` | Design webhook architecture, event routing patterns |
| `code-reviewer` | Review cryptographic verification, security implementation |
| `silent-failure-hunter` | Find swallowed webhook errors, missing event handlers |
| `pr-test-analyzer` | Verify webhook test coverage |

### Other Capabilities
- `elements-of-style:writing-clearly-and-concisely` - Webhook documentation
- `episodic-memory:remembering-conversations` - Past webhook issues
- `dev-browser:dev-browser` - Test webhook delivery flows
- WebSearch - Latest webhook security best practices
- TodoWrite - Track webhook integration tasks

## Logic Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                       WEBHOOK PROCESSING WORKFLOW                             │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Webhook Request Received                                                     │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ 1. Extract Headers & Body                                    │            │
│  │    ├─ X-Signature / Webhook-Signature                        │            │
│  │    ├─ X-Timestamp / Date                                     │            │
│  │    └─ Event-Type / X-Event-Type                              │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Security Validation                                                          │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ 2. Signature Verification                                    │            │
│  │    ├─ Reconstruct signature payload                          │            │
│  │    ├─ Compute HMAC-SHA256                                    │            │
│  │    └─ Constant-time comparison                               │            │
│  │ 3. Timestamp Check                                           │            │
│  │    ├─ Verify not older than 5 minutes                        │            │
│  │    └─ Prevent replay attacks                                 │            │
│  │ 4. Idempotency Check                                         │            │
│  │    ├─ Check event_id in processed events table               │            │
│  │    └─ Return 200 if already processed                        │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Event Processing                                                             │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ 5. Parse Event Type                                          │            │
│  │    ├─ payment.succeeded → Update order status                │            │
│  │    ├─ payment.failed → Mark as failed                        │            │
│  │    ├─ refund.completed → Update refund status                │            │
│  │    └─ 3ds.challenge → Handle authentication                  │            │
│  │ 6. Async Processing                                          │            │
│  │    ├─ Return 200 OK immediately                              │            │
│  │    ├─ Queue event for background processing                  │            │
│  │    └─ Update database/ledger                                 │            │
│  │ 7. Error Handling                                            │            │
│  │    ├─ Log all errors with event context                      │            │
│  │    ├─ Retry logic for transient failures                     │            │
│  │    └─ Dead letter queue for failed events                    │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Response & Monitoring                                                        │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ 8. Return 200 OK                                             │            │
│  │ 9. Log processed event                                       │            │
│  │ 10. Monitor via metrics                                      │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  Webhook Flow:                                                                │
│  PSP → HTTPS POST → Signature Check → Timestamp Check → Idempotency →        │
│  Event Routing → Async Processing → 200 OK → Background Update               │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Webhook Discovery
```typescript
// Step 1: Search for past webhook issues
const pastIssues = await mcp_episodic_memory.search({
  query: ["webhook", "signature", "validation", "replay"],
  mode: "both",
  limit: 10
});

// Step 2: Get PSP-specific webhook documentation
const stripeWebhookDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "webhook signature verification",
  mode: "code"
});

const cybersourceWebhookDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "webhook notification signature",
  mode: "code"
});

const mpgsWebhookDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "webhook notification events",
  mode: "info"
});

// Step 3: Analyze existing webhook handlers
const webhookHandlers = await mcp_serena.search_for_pattern({
  substring_pattern: "webhook.*handler|processWebhook|verifySignature",
  paths_include_glob: "**/*.ts",
  context_lines_before: 10,
  context_lines_after: 30
});

const signatureVerification = await mcp_serena.search_for_pattern({
  substring_pattern: "verifyWebhookSignature|hmac.*webhook|constant.*time",
  paths_include_glob: "**/*.ts"
});
```

### Phase 2: Webhook Handler Implementation

#### Generic Webhook Handler
```typescript
import crypto from 'crypto';

export class WebhookHandler {
  private readonly webhookSecrets: Map<string, string> = new Map();
  private readonly processedEvents: Set<string> = new Set();

  constructor(secrets: Record<string, string>) {
    Object.entries(secrets).forEach(([psp, secret]) => {
      this.webhookSecrets.set(psp, secret);
    });
  }

  async handleWebhook(
    psp: string,
    headers: Record<string, string>,
    rawBody: string
  ): Promise<WebhookResponse> {
    try {
      // Step 1: Extract signature and timestamp
      const { signature, timestamp } = this.extractHeaders(psp, headers);

      // Step 2: Verify signature
      const isValid = this.verifySignature(psp, signature, timestamp, rawBody);
      if (!isValid) {
        throw new WebhookError('INVALID_SIGNATURE', 'Webhook signature verification failed');
      }

      // Step 3: Check timestamp (prevent replay attacks)
      this.verifyTimestamp(timestamp);

      // Step 4: Parse event
      const event = JSON.parse(rawBody);

      // Step 5: Idempotency check
      if (this.processedEvents.has(event.id)) {
        console.log(`Event ${event.id} already processed, returning 200`);
        return { success: true, message: 'Event already processed' };
      }

      // Step 6: Process event asynchronously
      this.processEventAsync(psp, event);

      // Step 7: Mark as processed
      this.processedEvents.add(event.id);

      // Step 8: Return 200 OK immediately
      return { success: true, message: 'Webhook received' };

    } catch (error) {
      console.error('Webhook processing error:', error);
      throw error;
    }
  }

  private extractHeaders(
    psp: string,
    headers: Record<string, string>
  ): { signature: string; timestamp: string } {
    const headerMap: Record<string, { sig: string; ts: string }> = {
      stripe: { sig: 'stripe-signature', ts: 'stripe-signature' },
      cybersource: { sig: 'x-pay-token', ts: 'date' },
      mpgs: { sig: 'x-notification-secret', ts: 'date' },
      adyen: { sig: 'hmacSignature', ts: 'date' }
    };

    const config = headerMap[psp.toLowerCase()];
    if (!config) {
      throw new WebhookError('UNKNOWN_PSP', `Unknown PSP: ${psp}`);
    }

    return {
      signature: headers[config.sig] || '',
      timestamp: headers[config.ts] || ''
    };
  }

  private verifySignature(
    psp: string,
    signature: string,
    timestamp: string,
    rawBody: string
  ): boolean {
    const secret = this.webhookSecrets.get(psp.toLowerCase());
    if (!secret) {
      throw new WebhookError('MISSING_SECRET', `No webhook secret for PSP: ${psp}`);
    }

    // PSP-specific signature verification
    switch (psp.toLowerCase()) {
      case 'stripe':
        return this.verifyStripeSignature(signature, timestamp, rawBody, secret);
      case 'cybersource':
        return this.verifyCybersourceSignature(signature, rawBody, secret);
      case 'mpgs':
        return this.verifyMPGSSignature(signature, rawBody, secret);
      default:
        return this.verifyGenericHMAC(signature, rawBody, secret);
    }
  }

  private verifyStripeSignature(
    signature: string,
    timestamp: string,
    rawBody: string,
    secret: string
  ): boolean {
    // Stripe format: t=timestamp,v1=signature
    const parts = signature.split(',').reduce((acc, part) => {
      const [key, value] = part.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const signedPayload = `${parts.t}.${rawBody}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex');

    return this.constantTimeCompare(parts.v1, expectedSignature);
  }

  private verifyCybersourceSignature(
    signature: string,
    rawBody: string,
    secret: string
  ): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('base64');

    return this.constantTimeCompare(signature, expectedSignature);
  }

  private verifyMPGSSignature(
    signature: string,
    rawBody: string,
    secret: string
  ): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('hex');

    return this.constantTimeCompare(signature, expectedSignature);
  }

  private verifyGenericHMAC(
    signature: string,
    rawBody: string,
    secret: string
  ): boolean {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('hex');

    return this.constantTimeCompare(signature, expectedSignature);
  }

  private constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    // Use crypto.timingSafeEqual for constant-time comparison
    const bufferA = Buffer.from(a, 'utf8');
    const bufferB = Buffer.from(b, 'utf8');

    return crypto.timingSafeEqual(bufferA, bufferB);
  }

  private verifyTimestamp(timestamp: string): void {
    const webhookTime = new Date(timestamp).getTime();
    const currentTime = Date.now();
    const timeDiff = Math.abs(currentTime - webhookTime);

    // Reject webhooks older than 5 minutes (300,000ms)
    if (timeDiff > 300000) {
      throw new WebhookError(
        'TIMESTAMP_TOO_OLD',
        `Webhook timestamp is too old: ${timeDiff}ms`
      );
    }
  }

  private async processEventAsync(psp: string, event: any): Promise<void> {
    // Queue event for background processing
    // This allows us to return 200 OK immediately

    setImmediate(async () => {
      try {
        await this.dispatchEvent(psp, event);
      } catch (error) {
        console.error(`Failed to process event ${event.id}:`, error);
        // Send to dead letter queue
        await this.sendToDeadLetterQueue(psp, event, error);
      }
    });
  }

  private async dispatchEvent(psp: string, event: any): Promise<void> {
    const eventType = this.getEventType(psp, event);

    switch (eventType) {
      case 'payment.succeeded':
      case 'charge.succeeded':
      case 'PAYMENT_RECEIVED':
        await this.handlePaymentSuccess(event);
        break;

      case 'payment.failed':
      case 'charge.failed':
      case 'PAYMENT_FAILED':
        await this.handlePaymentFailure(event);
        break;

      case 'refund.completed':
      case 'REFUND_COMPLETED':
        await this.handleRefundCompleted(event);
        break;

      case '3ds.challenge':
      case 'AUTHENTICATION_REQUIRED':
        await this.handle3DSChallenge(event);
        break;

      default:
        console.warn(`Unhandled event type: ${eventType}`);
    }
  }

  private getEventType(psp: string, event: any): string {
    switch (psp.toLowerCase()) {
      case 'stripe':
        return event.type;
      case 'cybersource':
        return event.eventType;
      case 'mpgs':
        return event.order?.status || event.transaction?.type;
      default:
        return event.type || event.eventType;
    }
  }

  private async handlePaymentSuccess(event: any): Promise<void> {
    // Update order status in database
    console.log('Processing payment success:', event.id);
    // Implementation here
  }

  private async handlePaymentFailure(event: any): Promise<void> {
    // Mark payment as failed
    console.log('Processing payment failure:', event.id);
    // Implementation here
  }

  private async handleRefundCompleted(event: any): Promise<void> {
    // Update refund status
    console.log('Processing refund completion:', event.id);
    // Implementation here
  }

  private async handle3DSChallenge(event: any): Promise<void> {
    // Handle 3DS challenge flow
    console.log('Processing 3DS challenge:', event.id);
    // Implementation here
  }

  private async sendToDeadLetterQueue(
    psp: string,
    event: any,
    error: any
  ): Promise<void> {
    // Send failed events to DLQ for manual review
    console.log(`Sending event ${event.id} to DLQ:`, error);
    // Implementation here
  }
}

class WebhookError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'WebhookError';
  }
}

interface WebhookResponse {
  success: boolean;
  message: string;
}
```

#### Express Route Handler
```typescript
import express from 'express';

const app = express();
const webhookHandler = new WebhookHandler({
  stripe: process.env.STRIPE_WEBHOOK_SECRET!,
  cybersource: process.env.CYBERSOURCE_WEBHOOK_SECRET!,
  mpgs: process.env.MPGS_WEBHOOK_SECRET!
});

// Important: Use express.raw() for webhook routes to preserve raw body
app.post('/webhooks/:psp', express.raw({ type: 'application/json' }), async (req, res) => {
  const psp = req.params.psp;
  const rawBody = req.body.toString('utf8');
  const headers = req.headers as Record<string, string>;

  try {
    const result = await webhookHandler.handleWebhook(psp, headers, rawBody);
    res.status(200).json(result);
  } catch (error) {
    console.error('Webhook error:', error);

    if (error instanceof WebhookError) {
      // Return 400 for validation errors
      res.status(400).json({ error: error.code, message: error.message });
    } else {
      // Return 500 for processing errors
      res.status(500).json({ error: 'INTERNAL_ERROR', message: 'Webhook processing failed' });
    }
  }
});
```

### Phase 3: Testing

#### Playwright Webhook Testing
```typescript
// Test webhook endpoint
const testWebhook = {
  id: 'evt_test_123',
  type: 'payment.succeeded',
  data: {
    object: {
      id: 'ch_123',
      amount: 1000,
      status: 'succeeded'
    }
  }
};

const timestamp = Math.floor(Date.now() / 1000);
const payload = `${timestamp}.${JSON.stringify(testWebhook)}`;
const signature = crypto
  .createHmac('sha256', process.env.STRIPE_WEBHOOK_SECRET!)
  .update(payload)
  .digest('hex');

// Send webhook request
const response = await fetch('http://localhost:3000/webhooks/stripe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'stripe-signature': `t=${timestamp},v1=${signature}`
  },
  body: JSON.stringify(testWebhook)
});

console.log('Webhook response:', response.status);
```

#### Chrome Dashboard Monitoring
```typescript
// Monitor webhook logs in Stripe dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/webhooks"
});

// Check recent webhook deliveries
await mcp_chrome.use_browser({
  action: "await_element",
  selector: ".webhook-events"
});

const webhookStatus = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".webhook-status",
  payload: "text"
});

console.log('Webhook delivery status:', webhookStatus);
```

### Phase 4: Review & Deploy
```typescript
// Invoke silent failure hunter
// Invoke pr-review-toolkit:silent-failure-hunter

// Invoke code review
// Invoke superpowers:requesting-code-review

// Verify all tests pass
// Invoke superpowers:verification-before-completion
```

## MCP Integration Examples

### Serena: Analyze Webhook Handlers
```typescript
// Find all webhook handlers
const handlers = await mcp_serena.search_for_pattern({
  substring_pattern: "webhook.*handler|processWebhook",
  paths_include_glob: "**/*.ts"
});

// Find signature verification logic
const signatureCode = await mcp_serena.search_for_pattern({
  substring_pattern: "verifySignature|constantTimeCompare|timingSafeEqual",
  paths_include_glob: "**/*.ts",
  context_lines_before: 10,
  context_lines_after: 20
});

// Find event routing logic
const eventRouting = await mcp_serena.search_for_pattern({
  substring_pattern: "dispatchEvent|handleEvent|routeWebhook",
  paths_include_glob: "**/*.ts"
});
```

### Context7: Get Webhook Documentation
```typescript
// Stripe webhook documentation
const stripeWebhooks = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "webhooks signature verification security",
  mode: "code"
});

// Cybersource webhook documentation
const cyberWebhooks = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "webhook events notification",
  mode: "info"
});
```

### Episodic Memory: Recall Webhook Issues
```typescript
// Search for signature failures
const signatureIssues = await mcp_episodic_memory.search({
  query: ["webhook signature", "verification failed", "invalid"],
  mode: "both",
  limit: 5
});

// Search for replay attack solutions
const replayPrevention = await mcp_episodic_memory.search({
  query: "webhook replay attack timestamp check",
  mode: "vector"
});
```

## Best Practices

### Security
- Always verify signatures using constant-time comparison
- Check timestamps to prevent replay attacks (5 min window)
- Implement idempotency checks for duplicate events
- Never log raw webhook payloads (may contain sensitive data)
- Use HTTPS only for webhook endpoints
- Validate event structure before processing

### Performance
- Return 200 OK immediately (within 5 seconds)
- Process events asynchronously in background
- Implement retry logic for failed processing
- Use dead letter queue for persistent failures
- Monitor webhook delivery rates

### Error Handling
- Return 400 for validation errors (bad signature)
- Return 500 for processing errors (will trigger retry)
- Log all webhook errors with full context
- Alert on signature failure spikes
- Track processing success rate

### Testing
- Test signature verification independently
- Simulate replay attacks in tests
- Test all event types
- Verify idempotency behavior
- Test webhook endpoint with actual PSP sandbox

### Monitoring
- Track webhook delivery success rate
- Monitor signature verification failures
- Alert on processing delays
- Track event processing latency
- Log all processed event IDs

## Security Checklist

- [ ] Signature verification implemented
- [ ] Constant-time comparison used
- [ ] Timestamp validation prevents replay attacks
- [ ] Idempotency check prevents duplicate processing
- [ ] HTTPS enforced on webhook endpoints
- [ ] Webhook secrets stored securely
- [ ] No sensitive data logged
- [ ] Rate limiting implemented
- [ ] Dead letter queue configured

## Troubleshooting Guide

### Signature Verification Fails
1. Search Episodic Memory for past signature issues
2. Use Context7 to verify current signature algorithm
3. Log signature components (timestamp, payload, expected)
4. Verify webhook secret matches PSP configuration
5. Check for trailing newlines in payload

### Events Not Processing
1. Check webhook endpoint is publicly accessible
2. Verify PSP webhook configuration
3. Check dead letter queue for failed events
4. Monitor background job queue
5. Review error logs for processing failures

### Duplicate Event Processing
1. Verify idempotency check implementation
2. Check processed events store
3. Ensure event IDs are unique
4. Review event ordering logic
5. Check for race conditions

### Replay Attack Detected
1. Verify timestamp parsing logic
2. Check system clock synchronization
3. Adjust time window if needed (currently 5 min)
4. Review webhook delivery delays from PSP
5. Check for timezone issues
