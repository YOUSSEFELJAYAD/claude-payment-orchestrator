# Skill: Saga Management

**Role:** sequential-reasoner (Distributed Transaction Architect)
**Domain:** Distributed Systems & Transaction Orchestration
**Objective:** Implement saga pattern for distributed transactions across microservices ensuring data consistency, idempotency, and proper compensation logic using MCP-powered code analysis, testing, and orchestration patterns.

## Available Capabilities

### MCP Servers
| Server | Usage in Saga Management |
|--------|--------------------------|
| **Serena** | Find saga orchestrators, analyze compensation logic, trace distributed flows, verify idempotency implementations, generate saga state machines |
| **Context7** | Get distributed transaction patterns, saga orchestration frameworks, BullMQ queue documentation, state machine libraries, retry strategies |
| **Playwright** | Test end-to-end saga flows, verify compensation on failures, test concurrent saga execution, validate state transitions |
| **Chrome** | Monitor saga dashboard, view saga execution traces, debug failed sagas, inspect queue status and pending jobs |
| **Episodic Memory** | Recall saga design patterns, retrieve failure recovery strategies, find solutions to distributed transaction issues |

### Superpowers Skills
| Skill | When to Invoke |
|-------|----------------|
| `brainstorming` | Before designing saga flows, compensation logic, or state machines |
| `systematic-debugging` | When investigating saga failures, stuck states, or orphaned compensations |
| `test-driven-development` | Before implementing saga steps - write tests for all paths including failures |
| `verification-before-completion` | After saga implementation - verify all failure scenarios properly compensated |
| `writing-plans` | When implementing complex multi-step sagas with multiple services |
| `requesting-code-review` | After critical saga orchestration logic affecting money or data consistency |

### Specialized Agents
| Agent | When to Dispatch |
|-------|-----------------|
| `code-architect` | Designing saga architecture or orchestration patterns |
| `code-reviewer` | Reviewing saga logic for race conditions, idempotency, compensation correctness |
| `silent-failure-hunter` | Finding missing compensation logic or unhandled saga failures |

## Logic Flow

```
┌───────────────────────────────────────────────────────────────────────┐
│                   COMPREHENSIVE SAGA MANAGEMENT FLOW                   │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  PHASE 1: SAGA DESIGN                                                 │
│  ├─ Episodic Memory: Search past saga patterns and decisions          │
│  ├─ Context7: Get saga orchestration and compensation patterns        │
│  ├─ Brainstorming: Design saga steps, compensation, failure handling  │
│  └─ Define state machine: CREATED → EXECUTING → COMPLETED/FAILED      │
│                                                                        │
│  PHASE 2: IMPLEMENTATION                                              │
│  ├─ Serena: Analyze existing saga orchestrators                       │
│  ├─ TDD: Write tests for all saga paths (success + all failure points)│
│  ├─ Implement saga orchestrator with state persistence                │
│  ├─ Implement idempotent saga steps with compensation logic           │
│  └─ Setup queue-based async execution (BullMQ)                        │
│                                                                        │
│  PHASE 3: TESTING                                                     │
│  ├─ Test happy path: All steps succeed                                │
│  ├─ Test each failure point: Verify compensation runs                 │
│  ├─ Test concurrent sagas: Race conditions, idempotency               │
│  ├─ Playwright: E2E saga flows through API                            │
│  └─ Chrome: Monitor saga dashboard during tests                       │
│                                                                        │
│  PHASE 4: VERIFICATION & MONITORING                                   │
│  ├─ Verification skill: All tests pass, compensations work            │
│  ├─ Code reviewer: Check for missing compensation, race conditions    │
│  ├─ Silent failure hunter: Find unhandled saga errors                 │
│  ├─ Chrome: Monitor production saga metrics                           │
│  └─ Serena memory: Store saga patterns and learnings                  │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Saga Design

```typescript
// 1. Search past saga implementations
const sagaPatterns = await mcp_episodic_memory.search({
  query: ["saga pattern", "distributed transaction", "compensation logic"],
  mode: "both",
  limit: 10
});

// 2. Get orchestration framework docs
const bullmqDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/taskforcesh/bullmq",
  topic: "queue workflow retry error handling",
  mode: "code"
});

// 3. Design payment saga
const paymentSagaDesign = `
Payment Saga Flow:
1. Create payment intent (PSP)
2. Authorize payment (PSP)
3. Update ledger (Database)
4. Send confirmation (Email)

Compensation (if any step fails):
- Step 4 fails: No compensation (email not sent, no side effect)
- Step 3 fails: Void payment authorization → Cancel payment intent
- Step 2 fails: Cancel payment intent
- Step 1 fails: No compensation needed
`;

// 4. Brainstorm saga architecture
// Invoke: superpowers:brainstorming
// Topics: State machine design, compensation order, idempotency strategy
```

### Phase 2: Implementation

```typescript
// Use TDD - write saga tests first
// Invoke: superpowers:test-driven-development

// Implement saga orchestrator with Serena
await mcp_serena.create_text_file({
  relative_path: "src/sagas/payment-saga.ts",
  content: `import { Queue, Worker, Job } from 'bullmq';
import { prisma } from '@/lib/prisma';
import { pspAdapter } from '@/adapters/psp';
import { emailService } from '@/services/email';

export enum SagaState {
  CREATED = 'CREATED',
  PAYMENT_INTENT_CREATED = 'PAYMENT_INTENT_CREATED',
  PAYMENT_AUTHORIZED = 'PAYMENT_AUTHORIZED',
  LEDGER_UPDATED = 'LEDGER_UPDATED',
  COMPLETED = 'COMPLETED',
  COMPENSATING = 'COMPENSATING',
  FAILED = 'FAILED'
}

interface PaymentSagaData {
  sagaId: string;
  amount: number;
  currency: string;
  merchantId: string;
  customerId: string;
  idempotencyKey: string;
}

interface SagaContext {
  paymentIntentId?: string;
  authorizationId?: string;
  ledgerEntryId?: string;
  error?: string;
}

export class PaymentSagaOrchestrator {
  private queue: Queue;
  private worker: Worker;

  constructor() {
    this.queue = new Queue('payment-saga', {
      connection: redisConnection
    });

    this.worker = new Worker('payment-saga', this.processStep.bind(this), {
      connection: redisConnection,
      concurrency: 10
    });
  }

  async start(data: PaymentSagaData): Promise<string> {
    // Create saga instance in database (idempotent)
    const saga = await prisma.saga.upsert({
      where: { idempotencyKey: data.idempotencyKey },
      update: {},
      create: {
        id: data.sagaId,
        type: 'PAYMENT',
        state: SagaState.CREATED,
        data: data as any,
        context: {},
        idempotencyKey: data.idempotencyKey,
        createdAt: new Date()
      }
    });

    // Enqueue first step
    await this.queue.add('step', { sagaId: saga.id }, {
      jobId: \`\${saga.id}-step-1\`,
      removeOnComplete: false,
      removeOnFail: false
    });

    return saga.id;
  }

  private async processStep(job: Job) {
    const { sagaId } = job.data;

    // Load saga state from database
    const saga = await prisma.saga.findUnique({
      where: { id: sagaId }
    });

    if (!saga) {
      throw new Error(\`Saga \${sagaId} not found\`);
    }

    const data = saga.data as PaymentSagaData;
    const context = saga.context as SagaContext;

    try {
      // Execute step based on current state
      switch (saga.state) {
        case SagaState.CREATED:
          await this.createPaymentIntent(saga, data, context);
          break;

        case SagaState.PAYMENT_INTENT_CREATED:
          await this.authorizePayment(saga, data, context);
          break;

        case SagaState.PAYMENT_AUTHORIZED:
          await this.updateLedger(saga, data, context);
          break;

        case SagaState.LEDGER_UPDATED:
          await this.sendConfirmation(saga, data, context);
          break;

        case SagaState.COMPENSATING:
          await this.compensate(saga, data, context);
          break;

        default:
          // Saga complete or failed, no action
          break;
      }
    } catch (error) {
      // Initiate compensation
      await this.initiateCompensation(saga, error);
    }
  }

  private async createPaymentIntent(saga: any, data: PaymentSagaData, context: SagaContext) {
    const intent = await pspAdapter.createPaymentIntent({
      amount: data.amount,
      currency: data.currency,
      idempotencyKey: \`\${data.idempotencyKey}-intent\`
    });

    context.paymentIntentId = intent.id;

    await this.transitionState(saga.id, SagaState.PAYMENT_INTENT_CREATED, context);
    await this.enqueueNextStep(saga.id);
  }

  private async authorizePayment(saga: any, data: PaymentSagaData, context: SagaContext) {
    const authorization = await pspAdapter.authorize({
      paymentIntentId: context.paymentIntentId!,
      amount: data.amount
    });

    context.authorizationId = authorization.id;

    await this.transitionState(saga.id, SagaState.PAYMENT_AUTHORIZED, context);
    await this.enqueueNextStep(saga.id);
  }

  private async updateLedger(saga: any, data: PaymentSagaData, context: SagaContext) {
    const entry = await prisma.ledgerEntry.create({
      data: {
        merchantId: data.merchantId,
        amount: data.amount,
        type: 'DEBIT',
        referenceId: context.authorizationId!,
        idempotencyKey: \`\${data.idempotencyKey}-ledger\`
      }
    });

    context.ledgerEntryId = entry.id;

    await this.transitionState(saga.id, SagaState.LEDGER_UPDATED, context);
    await this.enqueueNextStep(saga.id);
  }

  private async sendConfirmation(saga: any, data: PaymentSagaData, context: SagaContext) {
    await emailService.sendPaymentConfirmation({
      customerId: data.customerId,
      amount: data.amount,
      authorizationId: context.authorizationId!
    });

    await this.transitionState(saga.id, SagaState.COMPLETED, context);
  }

  private async compensate(saga: any, data: PaymentSagaData, context: SagaContext) {
    // Compensation runs in reverse order
    if (context.ledgerEntryId) {
      // Reverse ledger entry
      await prisma.ledgerEntry.create({
        data: {
          merchantId: data.merchantId,
          amount: -data.amount,
          type: 'CREDIT',
          referenceId: context.ledgerEntryId,
          idempotencyKey: \`\${data.idempotencyKey}-ledger-reversal\`
        }
      });
    }

    if (context.authorizationId) {
      // Void authorization
      await pspAdapter.voidAuthorization({
        authorizationId: context.authorizationId,
        idempotencyKey: \`\${data.idempotencyKey}-void\`
      });
    }

    if (context.paymentIntentId) {
      // Cancel payment intent
      await pspAdapter.cancelPaymentIntent({
        paymentIntentId: context.paymentIntentId
      });
    }

    await this.transitionState(saga.id, SagaState.FAILED, context);
  }

  private async transitionState(sagaId: string, newState: SagaState, context: SagaContext) {
    await prisma.saga.update({
      where: { id: sagaId },
      data: {
        state: newState,
        context: context as any,
        updatedAt: new Date()
      }
    });
  }

  private async enqueueNextStep(sagaId: string) {
    await this.queue.add('step', { sagaId }, {
      delay: 0,
      removeOnComplete: false
    });
  }

  private async initiateCompensation(saga: any, error: any) {
    await this.transitionState(saga.id, SagaState.COMPENSATING, {
      ...saga.context,
      error: error.message
    });

    await this.enqueueNextStep(saga.id);
  }
}`
});
```

### Phase 3: Testing

```typescript
// 1. Test happy path
await mcp_serena.create_text_file({
  relative_path: "tests/sagas/payment-saga.test.ts",
  content: `import { PaymentSagaOrchestrator, SagaState } from '@/sagas/payment-saga';
import { prisma } from '@/lib/prisma';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('PaymentSagaOrchestrator', () => {
  let orchestrator: PaymentSagaOrchestrator;

  beforeEach(async () => {
    await prisma.saga.deleteMany();
    orchestrator = new PaymentSagaOrchestrator();
  });

  it('should complete saga successfully on happy path', async () => {
    const sagaId = await orchestrator.start({
      sagaId: 'saga_123',
      amount: 100,
      currency: 'USD',
      merchantId: 'merchant_123',
      customerId: 'customer_123',
      idempotencyKey: 'idem_123'
    });

    // Wait for saga to complete
    await waitForSagaState(sagaId, SagaState.COMPLETED, 10000);

    const saga = await prisma.saga.findUnique({ where: { id: sagaId } });
    expect(saga.state).toBe(SagaState.COMPLETED);
    expect(saga.context.authorizationId).toBeDefined();
    expect(saga.context.ledgerEntryId).toBeDefined();
  });

  it('should compensate when ledger update fails', async () => {
    // Mock ledger failure
    vi.spyOn(prisma.ledgerEntry, 'create').mockRejectedValueOnce(
      new Error('Database error')
    );

    const sagaId = await orchestrator.start({
      sagaId: 'saga_456',
      amount: 100,
      currency: 'USD',
      merchantId: 'merchant_123',
      customerId: 'customer_123',
      idempotencyKey: 'idem_456'
    });

    // Wait for compensation to complete
    await waitForSagaState(sagaId, SagaState.FAILED, 10000);

    const saga = await prisma.saga.findUnique({ where: { id: sagaId } });
    expect(saga.state).toBe(SagaState.FAILED);
    expect(saga.context.error).toContain('Database error');

    // Verify payment was voided (compensation ran)
    // Check PSP adapter void was called
  });

  it('should be idempotent - same idempotency key returns same saga', async () => {
    const data = {
      sagaId: 'saga_789',
      amount: 100,
      currency: 'USD',
      merchantId: 'merchant_123',
      customerId: 'customer_123',
      idempotencyKey: 'idem_789'
    };

    const sagaId1 = await orchestrator.start(data);
    const sagaId2 = await orchestrator.start(data);

    expect(sagaId1).toBe(sagaId2);
  });
});`
});

// 2. Test via API with Playwright
await mcp_playwright.browser_navigate({ url: "http://localhost:3000/admin/login" });
// Login...

await mcp_playwright.browser_evaluate({
  function: `async () => {
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID()
      },
      body: JSON.stringify({
        amount: 100,
        currency: 'USD',
        merchantId: 'test_merchant'
      })
    });

    const result = await response.json();
    return { status: response.status, data: result };
  }`
});

// 3. Monitor saga dashboard with Chrome
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/admin/sagas"
});

await mcp_chrome.use_browser({
  action: "await_element",
  selector: ".saga-list",
  timeout: 5000
});

const sagaStatus = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".saga-list .saga-row:first-child",
  payload: "text"
});
```

### Phase 4: Verification & Monitoring

```typescript
// 1. Run all saga tests
// Invoke: superpowers:verification-before-completion

// 2. Review for missing compensation
// Dispatch: silent-failure-hunter
// Focus: Unhandled errors, missing compensation steps

// 3. Code review
// Dispatch: code-reviewer
// Focus: Race conditions, idempotency, compensation correctness

// 4. Store saga patterns
await mcp_serena.write_memory({
  memory_file_name: "saga-patterns.md",
  content: `# Saga Patterns

## Saga Design Principles
- Each step must be idempotent (can be retried safely)
- Compensation must reverse the effect of the step
- State transitions must be atomic (database transaction)
- Always persist state before executing external calls

## Compensation Order
- Reverse order of execution
- Each compensation must be idempotent
- Compensation failures must be handled (retry or manual intervention)

## State Machine
- CREATED → First step not started
- EXECUTING → Steps in progress
- COMPENSATING → Failure occurred, running compensations
- COMPLETED → All steps succeeded
- FAILED → Compensations completed, saga failed

## Idempotency Strategy
- Unique idempotency key for entire saga
- Derived keys for each step (\${sagaKey}-step-name)
- Database upsert on saga creation
- Job IDs based on saga ID to prevent duplicates

## Monitoring
- Track saga completion rate
- Alert on stuck sagas (no state change in 5 minutes)
- Dashboard for failed sagas requiring manual intervention
`
});
```

## Best Practices

### Saga Design
- Each step must be idempotent
- Compensation must undo step effects
- Persist state before external calls
- Use derived idempotency keys per step

### Error Handling
- Distinguish retriable vs non-retriable errors
- Implement exponential backoff for retries
- Manual intervention queue for permanent failures
- Always log saga state transitions

### Performance
- Async execution via queues (BullMQ)
- Concurrency control per saga type
- Timeout for long-running steps
- Monitoring and alerting on stuck sagas

### Development Workflow
1. Research: Context7 + Episodic Memory
2. Design: Brainstorming + state machine diagram
3. Implement: TDD + Serena code generation
4. Test: All failure scenarios + compensation paths
5. Monitor: Chrome dashboard + alerting
6. Verify: Verification skill
7. Document: Store patterns in Serena memory
