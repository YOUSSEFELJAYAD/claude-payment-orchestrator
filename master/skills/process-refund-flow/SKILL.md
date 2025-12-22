# Skill: Process Refund Flow

**Role:** sequential-reasoner
**Domain:** Core Payments & Logic
**Objective:** Standardize refund vs. void decision logic and state management across PSPs using comprehensive MCP-powered workflow with code analysis, PSP documentation, transaction monitoring, and historical refund patterns.

---

## Available Capabilities

### MCP Servers
| Server | Refund Flow Usage | Key Operations |
|--------|-------------------|----------------|
| **Serena** | Find refund handlers, trace transaction state machine, audit refund logic | `find_symbol`, `search_for_pattern`, `find_referencing_symbols` |
| **Context7** | Get PSP refund API docs (Stripe, Adyen, CyberSource, MPGS) | `get_library_docs` |
| **Playwright** | Test refund UI flows, verify refund confirmation | `browser_click`, `browser_wait_for`, `browser_snapshot` |
| **Chrome** | Monitor PSP dashboards for refund status, check settlement reports | `use_browser` (navigate, extract, screenshot) |
| **Episodic Memory** | Recall past refund issues, partial refund edge cases, chargeback patterns | `search`, `read` |

### Superpowers Skills
| Skill | When to Use |
|-------|-------------|
| `superpowers:systematic-debugging` | When refunds fail or amounts mismatch |
| `superpowers:test-driven-development` | Write refund tests before implementation |
| `superpowers:verification-before-completion` | Verify refunds process correctly before deploying |

### Available Agents
| Agent | Dispatch For |
|-------|-------------|
| `payment-integration` | Implement refund flows across multiple PSPs |
| `visa-cybersource-payments` | CyberSource-specific refund logic |
| `mastercard-mpgs-specialist` | MPGS refund and void patterns |
| `api-designer` | Design refund API contracts and idempotency |
| `fullstack-developer` | Implement refund UI and backend logic |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    REFUND FLOW DECISION WORKFLOW                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: DISCOVERY & ANALYSIS                                          │
│  ├─ Episodic Memory: Recall past refund issues and edge cases           │
│  ├─ Serena: Find existing refund handlers and transaction state logic   │
│  ├─ Serena: Trace transaction status updates and refund validation      │
│  └─ Context7: Get PSP-specific refund/void API documentation            │
│                                                                          │
│  PHASE 2: DECISION LOGIC                                                │
│  ├─ Fetch transaction current status (AUTHORIZED, CAPTURED, SETTLED)    │
│  ├─ Decision: AUTHORIZED → VOID (auth reversal, no fees)                │
│  ├─ Decision: CAPTURED/SETTLED → REFUND (credit, may lose fees)         │
│  ├─ Validate amount: Requested + Previously Refunded ≤ Captured         │
│  ├─ Check idempotency: Prevent duplicate refunds via requestId          │
│  └─ PSP-specific rules: Some PSPs allow partial void, others don't      │
│                                                                          │
│  PHASE 3: EXECUTION                                                     │
│  ├─ Call PSP API (void or refund endpoint)                              │
│  ├─ Handle PSP response (success, pending, failed)                      │
│  ├─ Update local ledger with refund record                              │
│  ├─ Update transaction status and refunded amount                       │
│  └─ Trigger webhooks/notifications (customer, merchant)                 │
│                                                                          │
│  PHASE 4: TESTING & MONITORING                                          │
│  ├─ Playwright: Test refund UI flow, partial refunds, full refunds      │
│  ├─ Chrome: Monitor PSP dashboard for refund settlement                 │
│  ├─ Serena: Store refund decisions and edge cases in memory             │
│  └─ Verification: Confirm refund amounts reconcile correctly            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Analysis

#### Episodic Memory: Refund History

```typescript
// Recall past refund failures
const refundFailures = await mcp_episodic_memory.search({
  query: ["refund failed", "void error", "partial refund"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Find partial refund edge cases
const partialRefundCases = await mcp_episodic_memory.search({
  query: "partial refund amount validation error",
  mode: "text",
  limit: 5
});

// Recall chargeback patterns
const chargebackPatterns = await mcp_episodic_memory.search({
  query: ["chargeback", "refund dispute", "settlement delay"],
  mode: "both",
  limit: 5
});
```

#### Serena: Refund Handler Analysis

```typescript
// Find all refund handlers
const refundHandlers = await mcp_serena.find_symbol({
  name_path_pattern: "refund|void|Refund|Void",
  substring_matching: true,
  include_body: true,
  depth: 2
});

// Find transaction state machine
const transactionStateMachine = await mcp_serena.search_for_pattern({
  substring_pattern: "AUTHORIZED|CAPTURED|SETTLED|REFUNDED|VOIDED",
  relative_path: "src",
  context_lines_before: 3,
  context_lines_after: 3
});

// Find refund validation logic
const refundValidation = await mcp_serena.search_for_pattern({
  substring_pattern: "refundAmount|previouslyRefunded|capturedAmount",
  relative_path: "src/payments"
});

// Trace refund amount calculations
const amountCalcs = await mcp_serena.find_symbol({
  name_path_pattern: "calculateRefundAmount|validateRefundAmount",
  include_body: true
});

// Find idempotency implementation
const idempotency = await mcp_serena.search_for_pattern({
  substring_pattern: "requestId|idempotencyKey|duplicate.*refund",
  relative_path: "src"
});
```

#### Context7: PSP Documentation

```typescript
// Stripe refund API
const stripeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "refunds create partial refund idempotency",
  mode: "code"
});

// Adyen refund API
const adyenDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/adyen/adyen-node-api-library",
  topic: "refund cancel reversal partial",
  mode: "code"
});

// CyberSource refund patterns
const cyberSourceDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/CyberSource/cybersource-rest-client-node",
  topic: "void refund credit reversal",
  mode: "code"
});

// MPGS refund documentation
const mpgsDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/Mastercard/gateway-nodejs-sdk",
  topic: "refund void transaction",
  mode: "code"
});
```

---

### Phase 2: Decision Logic Implementation

#### Refund Service with Comprehensive Logic

```typescript
interface Transaction {
  id: string;
  status: 'AUTHORIZED' | 'CAPTURED' | 'SETTLED' | 'REFUNDED' | 'VOIDED';
  amount: number;
  capturedAmount: number;
  refundedAmount: number;
  currency: string;
  psp: 'stripe' | 'adyen' | 'cybersource' | 'mpgs';
  pspTransactionId: string;
  capturedAt?: Date;
  settledAt?: Date;
}

interface RefundRequest {
  transactionId: string;
  amount: number;  // In minor units (cents)
  reason?: string;
  requestId: string;  // For idempotency
}

interface RefundResult {
  success: boolean;
  refundId: string;
  amount: number;
  type: 'VOID' | 'REFUND';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  pspRefundId?: string;
  error?: string;
}

class RefundService {
  /**
   * Determine if transaction should be voided or refunded
   */
  private determineRefundType(transaction: Transaction): 'VOID' | 'REFUND' {
    // VOID: Authorization only (not yet captured)
    if (transaction.status === 'AUTHORIZED') {
      return 'VOID';
    }

    // REFUND: Money has moved (captured or settled)
    if (transaction.status === 'CAPTURED' || transaction.status === 'SETTLED') {
      return 'REFUND';
    }

    throw new Error(`Cannot refund transaction in status: ${transaction.status}`);
  }

  /**
   * Validate refund amount
   */
  private validateRefundAmount(
    transaction: Transaction,
    requestedAmount: number
  ): void {
    // Check if amount exceeds available refundable amount
    const availableToRefund = transaction.capturedAmount - transaction.refundedAmount;

    if (requestedAmount > availableToRefund) {
      throw new Error(
        `Refund amount ${requestedAmount} exceeds available amount ${availableToRefund}`
      );
    }

    if (requestedAmount <= 0) {
      throw new Error('Refund amount must be greater than 0');
    }
  }

  /**
   * Check idempotency to prevent duplicate refunds
   */
  private async checkIdempotency(requestId: string): Promise<RefundResult | null> {
    // Check if this requestId has been processed before
    // const existingRefund = await db.refunds.findOne({ requestId });
    // return existingRefund;
    return null;
  }

  /**
   * Execute void (authorization reversal)
   */
  private async executeVoid(
    transaction: Transaction,
    request: RefundRequest
  ): Promise<RefundResult> {
    // Call PSP void API
    switch (transaction.psp) {
      case 'stripe':
        // Stripe: Cancel payment intent
        // const result = await stripe.paymentIntents.cancel(transaction.pspTransactionId);
        break;
      case 'adyen':
        // Adyen: Cancel or reverse authorization
        break;
      case 'cybersource':
        // CyberSource: Auth reversal
        break;
      case 'mpgs':
        // MPGS: Void authorization
        break;
    }

    return {
      success: true,
      refundId: `void_${Date.now()}`,
      amount: request.amount,
      type: 'VOID',
      status: 'COMPLETED',
    };
  }

  /**
   * Execute refund (credit back to customer)
   */
  private async executeRefund(
    transaction: Transaction,
    request: RefundRequest
  ): Promise<RefundResult> {
    // Call PSP refund API
    switch (transaction.psp) {
      case 'stripe':
        // Stripe: Create refund
        // const result = await stripe.refunds.create({
        //   payment_intent: transaction.pspTransactionId,
        //   amount: request.amount,
        //   reason: request.reason
        // });
        break;
      case 'adyen':
        // Adyen: Refund modification
        break;
      case 'cybersource':
        // CyberSource: Credit
        break;
      case 'mpgs':
        // MPGS: Refund
        break;
    }

    return {
      success: true,
      refundId: `rfnd_${Date.now()}`,
      amount: request.amount,
      type: 'REFUND',
      status: 'PENDING',  // Refunds may take days to settle
    };
  }

  /**
   * Update transaction ledger
   */
  private async updateLedger(
    transaction: Transaction,
    refund: RefundResult
  ): Promise<void> {
    // Update transaction record
    // await db.transactions.update(transaction.id, {
    //   refundedAmount: transaction.refundedAmount + refund.amount,
    //   status: refund.type === 'VOID' ? 'VOIDED' : 'REFUNDED'
    // });

    // Create refund record
    // await db.refunds.create({
    //   id: refund.refundId,
    //   transactionId: transaction.id,
    //   amount: refund.amount,
    //   type: refund.type,
    //   status: refund.status,
    //   createdAt: new Date()
    // });
  }

  /**
   * Main refund processing flow
   */
  async processRefund(request: RefundRequest): Promise<RefundResult> {
    try {
      // 1. Check idempotency
      const existingRefund = await this.checkIdempotency(request.requestId);
      if (existingRefund) {
        return existingRefund;
      }

      // 2. Fetch transaction
      // const transaction = await db.transactions.findById(request.transactionId);
      const transaction: Transaction = {
        id: request.transactionId,
        status: 'CAPTURED',
        amount: 10000,
        capturedAmount: 10000,
        refundedAmount: 0,
        currency: 'USD',
        psp: 'stripe',
        pspTransactionId: 'pi_xxx',
      };

      // 3. Determine void vs refund
      const refundType = this.determineRefundType(transaction);

      // 4. Validate amount
      this.validateRefundAmount(transaction, request.amount);

      // 5. Execute refund or void
      let result: RefundResult;
      if (refundType === 'VOID') {
        result = await this.executeVoid(transaction, request);
      } else {
        result = await this.executeRefund(transaction, request);
      }

      // 6. Update ledger
      await this.updateLedger(transaction, result);

      // 7. Trigger notifications
      // await this.notifyCustomer(transaction, result);
      // await this.notifyMerchant(transaction, result);

      return result;
    } catch (error) {
      console.error('Refund processing failed:', error);
      return {
        success: false,
        refundId: '',
        amount: request.amount,
        type: 'REFUND',
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Process partial refund
   */
  async processPartialRefund(
    transactionId: string,
    partialAmount: number,
    requestId: string
  ): Promise<RefundResult> {
    return this.processRefund({
      transactionId,
      amount: partialAmount,
      reason: 'Partial refund requested',
      requestId,
    });
  }

  /**
   * Process full refund
   */
  async processFullRefund(
    transactionId: string,
    requestId: string
  ): Promise<RefundResult> {
    // const transaction = await db.transactions.findById(transactionId);
    // const fullAmount = transaction.capturedAmount - transaction.refundedAmount;

    return this.processRefund({
      transactionId,
      amount: 10000,  // Full amount
      reason: 'Full refund requested',
      requestId,
    });
  }
}
```

---

### Phase 3: Testing & Monitoring

#### Playwright: Refund UI Testing

```typescript
// Test full refund flow
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/admin/transactions/txn_123"
});

// Click refund button
await mcp_playwright.browser_click({
  element: "Refund",
  ref: "refund-btn"
});

// Select full refund
await mcp_playwright.browser_click({
  element: "Full Refund",
  ref: "full-refund-option"
});

// Confirm refund
await mcp_playwright.browser_click({
  element: "Confirm Refund",
  ref: "confirm-btn"
});

// Wait for success message
await mcp_playwright.browser_wait_for({
  text: "Refund processed successfully"
});

// Screenshot confirmation
await mcp_playwright.browser_take_screenshot({
  filename: "refund-success.png"
});

// Test partial refund
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/admin/transactions/txn_456"
});

await mcp_playwright.browser_click({
  element: "Refund",
  ref: "refund-btn"
});

// Enter partial amount
await mcp_playwright.browser_type({
  element: "Refund Amount",
  ref: "refund-amount",
  text: "50.00"
});

await mcp_playwright.browser_click({
  element: "Confirm Partial Refund",
  ref: "confirm-partial"
});

await mcp_playwright.browser_wait_for({
  text: "$50.00 refunded"
});

// Test validation error (amount exceeds available)
await mcp_playwright.browser_type({
  element: "Refund Amount",
  ref: "refund-amount",
  text: "99999.00"
});

await mcp_playwright.browser_click({
  element: "Confirm Partial Refund",
  ref: "confirm-partial"
});

await mcp_playwright.browser_wait_for({
  text: "Amount exceeds available"
});
```

#### Chrome: PSP Dashboard Monitoring

```typescript
// Navigate to Stripe dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/payments"
});

// Search for refunded transaction
await mcp_chrome.use_browser({
  action: "type",
  selector: "#search-input",
  payload: "pi_refunded_transaction\n"
});

// Extract refund status
const refundStatus = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".refund-status",
  payload: "text"
});

// Check settlement report
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/balance/overview"
});

const pendingRefunds = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    document.querySelector('.pending-refunds-amount')?.textContent
  `
});

// Screenshot dashboard
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "refund-dashboard.png"
});
```

#### Serena: Store Refund Decisions

```typescript
// Document refund implementation
await mcp_serena.write_memory({
  memory_file_name: "refund-flow-decisions.md",
  content: `
# Refund Flow Implementation Decisions

## Decision Logic
- AUTHORIZED → VOID (auth reversal, no fees, funds released immediately)
- CAPTURED/SETTLED → REFUND (credit, may lose interchange fees, 5-10 days)

## Amount Validation
- Formula: Requested + Previously Refunded ≤ Captured Amount
- Partial refunds supported (multiple refunds up to original amount)
- Zero or negative amounts rejected

## Idempotency
- Every refund request requires unique requestId
- Duplicate requestId returns original refund result
- Prevents accidental double refunds from retry logic

## PSP-Specific Rules
- Stripe: Supports partial void (uncommon), full refund within 90 days
- Adyen: Separate cancel (void) and refund endpoints
- CyberSource: Auth reversal vs. credit, different settlement times
- MPGS: Void must be same-day, refund can be later

## Edge Cases
- Refund after chargeback: Automatically rejected
- Refund during settlement: May fail, retry after settlement
- Multi-currency refunds: Refund in original currency only
- Expired authorization: Cannot void, must wait for auto-release

## Notifications
- Customer: Email with refund confirmation and timeline
- Merchant: Dashboard notification + webhook event
- Accounting: Ledger update for reconciliation
  `
});
```

---

## MCP Integration Examples

### Serena: Find Refund Logic

```typescript
// Find refund service
const refundService = await mcp_serena.find_symbol({
  name_path_pattern: "RefundService",
  include_body: true
});

// Trace void vs refund decision
const decision = await mcp_serena.find_symbol({
  name_path_pattern: "determineRefundType",
  include_body: true
});

// Find amount validation
const validation = await mcp_serena.search_for_pattern({
  substring_pattern: "validateRefundAmount|refundedAmount.*capturedAmount",
  relative_path: "src/payments"
});
```

### Context7: PSP Refund Patterns

```typescript
// Stripe refund best practices
const stripeRefund = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "refund partial full idempotency key",
  mode: "code"
});

// Adyen refund modifications
const adyenRefund = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/adyen/adyen-node-api-library",
  topic: "Modification refund cancel reversal",
  mode: "code"
});
```

### Playwright: Test Refund Scenarios

```typescript
// Test refund flow end-to-end
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/admin/refunds"
});

// Fill refund form
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Transaction ID", type: "textbox", value: "txn_123" },
    { name: "Amount", type: "textbox", value: "50.00" }
  ]
});

// Submit refund
await mcp_playwright.browser_click({ element: "Process Refund", ref: "submit" });

// Verify success
await mcp_playwright.browser_wait_for({ text: "Refund successful" });
```

### Chrome: Monitor Refund Settlement

```typescript
// Check refund settlement status
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/balance/transactions"
});

const settlements = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".refund-settlements",
  payload: "markdown"
});
```

### Episodic Memory: Learn from Past Refunds

```typescript
// Find past refund edge cases
const edgeCases = await mcp_episodic_memory.search({
  query: ["refund failed", "void error", "settlement pending"],
  mode: "both",
  limit: 5
});

// Recall partial refund issues
const partialIssues = await mcp_episodic_memory.search({
  query: "partial refund amount validation",
  after: "2024-01-01"
});
```

---

## Agent Dispatch Patterns

### Payment Integration: Multi-PSP Refunds

```typescript
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "implement_multi_psp_refunds",
  "payload": {
    "task": "Implement refund logic across all PSPs",
    "psps": ["stripe", "adyen", "cybersource", "mpgs"],
    "requirements": [
      "Unified refund interface",
      "PSP-specific void vs refund logic",
      "Partial refund support",
      "Idempotency handling"
    ]
  }
}
```

### CyberSource Specialist: Auth Reversal

```typescript
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "implement_cybersource_void",
  "payload": {
    "task": "Implement CyberSource authorization reversal",
    "requirements": [
      "Same-day auth reversal",
      "Next-day void handling",
      "Credit for settled transactions"
    ]
  }
}
```

---

## Refund Decision Table

| Transaction Status | Refund Type | PSP Operation | Settlement Time | Fees Recovered |
|-------------------|-------------|---------------|-----------------|----------------|
| AUTHORIZED | VOID | Auth Reversal | Immediate | Yes (no fees yet) |
| CAPTURED (same-day) | VOID | Cancel Capture | 1-2 days | Yes |
| CAPTURED (next-day+) | REFUND | Credit | 5-10 days | No (lose interchange) |
| SETTLED | REFUND | Credit | 5-10 days | No |

---

## Best Practices

### Refund Logic
- **Prefer VOID**: Use void for same-day cancellations (faster, no fees lost)
- **Amount Validation**: Always check available refundable amount
- **Idempotency**: Prevent duplicate refunds with unique requestId
- **PSP Variation**: Different PSPs have different void windows

### Development Workflow
1. **Documentation First**: Check Context7 for PSP-specific refund APIs
2. **Code Analysis**: Use Serena to find existing refund handlers
3. **Historical Context**: Search Episodic Memory for past refund issues
4. **Test Scenarios**: Write tests for full refund, partial refund, validation errors
5. **Monitor**: Use Chrome to verify refunds settle correctly
6. **Document**: Store refund edge cases in Serena memory

### Error Handling
- Distinguish between temporary failures (retry) and permanent failures (notify)
- Log refund attempts with transaction ID, amount, result
- Never log full card numbers in refund logs
- Provide clear error messages to merchants

### Compliance
- PCI DSS: Refund references use tokens only (never PAN)
- Audit trail: Log all refund requests and results
- Customer notifications: Comply with regional requirements
- Chargeback handling: Prevent refund if chargeback filed
