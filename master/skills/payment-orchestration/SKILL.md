# Skill: Payment Orchestration

**Role:** sequential-reasoner (Payment Systems Architect)
**Domain:** Payment Systems Engineering
**Objective:** Design and operate the central payment orchestration engine that coordinates fraud detection, smart routing, PSP adapters, 3DS authentication, and ledger updates using comprehensive MCP-powered code analysis, real-time documentation, browser automation, and cross-session memory.

## Available Capabilities

### MCP Servers
| Server | Usage in Payment Orchestration |
|--------|-------------------------------|
| **Serena** | Analyze PSP adapter implementations, trace payment flows across modules, refactor orchestration logic, find all IPaymentProvider implementations, verify routing rule coverage |
| **Context7** | Get latest PSP API documentation (Stripe, Adyen, CyberSource, MPGS), 3DS specifications, PCI DSS compliance guides, payment protocol updates |
| **Playwright** | End-to-end payment flow testing, 3DS challenge verification, form submission automation, transaction status validation, multi-PSP failover testing |
| **Chrome** | Real-time PSP dashboard monitoring, transaction metrics extraction, webhook verification, live payment status tracking, decline rate monitoring |
| **Episodic Memory** | Recall past routing decisions, retrieve failure pattern analyses, find similar transaction issues, reference PSP integration learnings, access historical performance data |

### Superpowers Skills
| Skill | When to Invoke |
|-------|----------------|
| `brainstorming` | Before designing new routing strategies, PSP integrations, or orchestration patterns |
| `systematic-debugging` | When investigating payment failures, PSP timeout issues, or routing anomalies |
| `test-driven-development` | Before implementing new PSP adapters or orchestration logic |
| `verification-before-completion` | After orchestration changes, before deploying routing updates |
| `writing-plans` | When implementing multi-PSP failover or complex routing logic |
| `subagent-driven-development` | For parallel PSP adapter development or independent module updates |
| `requesting-code-review` | After critical orchestration changes affecting money flow |

### Specialized Agents
| Agent | When to Dispatch |
|-------|-----------------|
| `code-architect` | Designing new orchestration patterns or PSP adapter architecture |
| `code-reviewer` | Reviewing payment flow logic for race conditions and failure modes |
| `silent-failure-hunter` | Finding missing error handling in PSP adapters and compensation logic |
| `pr-test-analyzer` | Verifying test coverage for all payment paths and failure scenarios |

### Other Skills & Tools
- `elements-of-style:writing-clearly-and-concisely` - For payment API documentation
- `episodic-memory:remembering-conversations` - For recurring payment issues
- `dev-browser:dev-browser` - For PSP sandbox testing
- WebSearch - For latest PCI DSS requirements and PSP API changes
- TodoWrite - For tracking multi-step orchestration implementations

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    COMPREHENSIVE PAYMENT ORCHESTRATION FLOW                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  PHASE 1: DISCOVERY & PLANNING                                                  │
│  ├─ Episodic Memory: Search past similar transaction patterns                   │
│  ├─ Context7: Get latest PSP API requirements & 3DS specs                       │
│  ├─ Serena: Analyze existing adapter implementations                            │
│  └─ Brainstorming: Design routing strategy                                      │
│                                                                                  │
│  PHASE 2: REQUEST RECEPTION                                                     │
│  ├─ Receive `initiatePayment` request                                           │
│  ├─ Schema validation (Zod)                                                     │
│  ├─ Idempotency-Key check (Redis)                                               │
│  └─ Context enrichment (merchant config, card BIN lookup)                       │
│                                                                                  │
│  PHASE 3: FRAUD & ROUTING ANALYSIS                                              │
│  ├─ Call `detect-velocity-attack` skill                                         │
│  ├─ Call `evaluate-routing-rules` skill                                         │
│  ├─ Episodic Memory: Check BIN/merchant past failures                           │
│  ├─ Chrome: Check PSP dashboard health metrics                                  │
│  └─ Select optimal PSP (primary + backup)                                       │
│                                                                                  │
│  PHASE 4: PSP EXECUTION                                                         │
│  ├─ Dispatch to selected PSP Adapter (implements IPaymentProvider)              │
│  ├─ Handle 3DS challenge if triggered:                                          │
│  │  ├─ Playwright: Render & verify 3DS iframe                                   │
│  │  ├─ Playwright: Submit OTP/biometric challenge                               │
│  │  └─ Playwright: Capture authentication result                                │
│  └─ Receive PSP response                                                        │
│                                                                                  │
│  PHASE 5: RESULT HANDLING & FAILOVER                                            │
│  ├─ SUCCESS PATH:                                                               │
│  │  ├─ Update ledger (double-entry accounting)                                  │
│  │  ├─ Emit payment.succeeded event                                             │
│  │  ├─ Store result in idempotency cache                                        │
│  │  └─ Serena: Write memory of successful pattern                               │
│  ├─ FAILURE PATH:                                                               │
│  │  ├─ Systematic Debugging: Analyze failure root cause                         │
│  │  ├─ Episodic Memory: Log failure pattern                                     │
│  │  ├─ FAILOVER: Route to backup PSP if retriable                               │
│  │  ├─ Compensating transaction if partial completion                           │
│  │  └─ Return structured error response                                         │
│  └─ VERIFICATION:                                                               │
│     ├─ Chrome: Verify transaction in PSP dashboard                              │
│     ├─ Playwright: Run E2E test for flow                                        │
│     └─ Verification skill: Confirm all assertions pass                          │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Discovery & Planning

Before implementing orchestration changes:

```typescript
// 1. Brainstorm the approach
// Invoke: superpowers:brainstorming
// Topics: Routing strategy, failover logic, PSP selection criteria

// 2. Search for similar past implementations
const pastOrchestrations = await mcp_episodic_memory.search({
  query: ["payment orchestration", "PSP failover", "routing decision"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// 3. Get latest PSP documentation
const stripeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intents confirm idempotency",
  mode: "code"
});

const adyenDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/adyen/adyen-node-api-library",
  topic: "payments authorisation 3ds2",
  mode: "code"
});

// 4. Analyze existing adapter patterns with Serena
const allAdapters = await mcp_serena.find_symbol({
  name_path_pattern: "IPaymentProvider",
  substring_matching: true,
  depth: 2,
  include_body: false
});

// Find specific adapter implementation
const stripeAdapter = await mcp_serena.find_symbol({
  name_path_pattern: "StripeAdapter/processPayment",
  relative_path: "src/adapters/stripe.ts",
  include_body: true
});

// Find all callers of orchestrator
const orchestratorRefs = await mcp_serena.find_referencing_symbols({
  name_path: "PaymentOrchestrator/execute",
  relative_path: "src/orchestration/orchestrator.ts"
});
```

### Phase 2: Implementation

Use Test-Driven Development and subagents:

```typescript
// 1. Write plan for implementation
// Invoke: superpowers:writing-plans
// Plan: Multi-PSP adapter implementation with failover logic

// 2. Use TDD for adapter development
// Invoke: superpowers:test-driven-development
// Write tests for StripeAdapter, AdyenAdapter, then implement

// 3. Dispatch parallel subagents for independent adapters
// Invoke: superpowers:subagent-driven-development
// Task 1: Implement StripeAdapter
// Task 2: Implement AdyenAdapter
// Task 3: Implement routing logic

// 4. Implement with Serena code generation
await mcp_serena.create_text_file({
  relative_path: "src/adapters/adyen-adapter.ts",
  content: `import { IPaymentProvider, PaymentRequest, PaymentResult } from '../types';
import { Client, CheckoutAPI } from '@adyen/api-library';

export class AdyenAdapter implements IPaymentProvider {
  private client: Client;
  private checkout: CheckoutAPI;

  constructor(config: AdyenConfig) {
    this.client = new Client({
      apiKey: config.apiKey,
      environment: config.environment
    });
    this.checkout = new CheckoutAPI(this.client);
  }

  async processPayment(request: PaymentRequest): Promise<PaymentResult> {
    try {
      const response = await this.checkout.payments({
        amount: { currency: request.currency, value: request.amount },
        reference: request.idempotencyKey,
        merchantAccount: this.config.merchantAccount,
        paymentMethod: {
          type: 'scheme',
          encryptedCardNumber: request.cardToken,
          encryptedExpiryMonth: request.expiryMonth,
          encryptedExpiryYear: request.expiryYear,
          encryptedSecurityCode: request.cvv
        },
        returnUrl: request.returnUrl,
        shopperInteraction: 'Ecommerce',
        channel: 'Web',
        authenticationData: {
          threeDSRequestData: { nativeThreeDS: 'preferred' }
        }
      });

      if (response.action?.type === 'threeDS2') {
        return {
          status: 'requires_action',
          requires3DS: true,
          challengeUrl: response.action.url,
          pspReference: response.pspReference
        };
      }

      return {
        status: response.resultCode === 'Authorised' ? 'success' : 'failed',
        transactionId: response.pspReference,
        pspReference: response.pspReference
      };
    } catch (error) {
      return {
        status: 'failed',
        error: { code: 'PSP_ERROR', message: error.message }
      };
    }
  }
}`
});
```

### Phase 3: Testing & Verification

Comprehensive testing with Playwright and Chrome:

```typescript
// 1. E2E payment flow test with Playwright
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Fill payment form
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card-input", value: "4111111111111111" },
    { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "123" }
  ]
});

// Submit payment
await mcp_playwright.browser_click({ element: "Pay Now", ref: "submit-btn" });

// Wait for processing
await mcp_playwright.browser_wait_for({ text: "Processing payment" });

// Capture network requests
const requests = await mcp_playwright.browser_network_requests({});
const paymentRequests = requests.filter(r => r.url.includes('/api/payments'));

// Verify idempotency header present
for (const req of paymentRequests) {
  if (req.method === 'POST') {
    assert(req.headers['idempotency-key'], 'Missing Idempotency-Key header');
  }
}

// Wait for success
await mcp_playwright.browser_wait_for({ text: "Payment successful" });

// Screenshot for visual regression
await mcp_playwright.browser_take_screenshot({
  filename: "payment-success.png",
  fullPage: true
});

// 2. Test 3DS challenge flow
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card", type: "textbox", ref: "card", value: "4000000000003220" } // 3DS test card
  ]
});

await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });
await mcp_playwright.browser_wait_for({ text: "3D Secure" });

// Capture 3DS iframe
const snapshot = await mcp_playwright.browser_snapshot({});
// Verify challenge iframe is present in accessibility tree

// Complete challenge
await mcp_playwright.browser_type({
  element: "OTP", ref: "otp-input", text: "123456", submit: true
});

await mcp_playwright.browser_wait_for({ text: "Payment Complete" });

// 3. Verify in PSP dashboard with Chrome
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/payments"
});

// Wait for dashboard to load
await mcp_chrome.use_browser({
  action: "await_element",
  selector: ".payments-table",
  timeout: 10000
});

// Extract decline rate metric
const declineRate = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".metric-decline-rate",
  payload: "text"
});

// Alert if decline rate too high
if (parseFloat(declineRate) > 5.0) {
  console.warn(`High decline rate: ${declineRate}% - consider PSP failover`);
}

// Screenshot dashboard state
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "stripe-dashboard-state.png"
});

// 4. Run verification skill
// Invoke: superpowers:verification-before-completion
// Verify: All tests pass, no console errors, PSP dashboards show transactions
```

### Phase 4: Review & Completion

Code review and finalization:

```typescript
// 1. Find silent failures
// Dispatch: silent-failure-hunter
// Focus: PSP adapter error handling, compensation logic, timeout handling

// 2. Review test coverage
// Dispatch: pr-test-analyzer
// Verify: All payment paths tested, failure scenarios covered

// 3. Code review
// Invoke: superpowers:requesting-code-review
// Areas: Orchestration logic, adapter implementations, failover strategy

// 4. Store learnings in memory
await mcp_serena.write_memory({
  memory_file_name: "orchestration-patterns.md",
  content: `# Payment Orchestration Learnings

## Date: ${new Date().toISOString()}

### PSP Adapter Patterns
- Always implement exponential backoff for network errors
- 3DS challenge requires iframe handling with Playwright
- Idempotency keys must be PSP-specific (different per adapter)

### Routing Decisions
- Stripe: Best for US/EU, lowest decline rate for Visa
- Adyen: Best for APAC, supports local payment methods
- Failover threshold: 3 consecutive failures within 5 minutes

### Performance
- Average orchestration latency: 250ms (excluding PSP time)
- 3DS adds 5-10s to flow (user interaction time)
`
});
```

## MCP Integration Examples

### Serena Code Analysis

```typescript
// Find all payment flow entry points
const entryPoints = await mcp_serena.search_for_pattern({
  substring_pattern: "initiatePayment|processPayment|executePayment",
  relative_path: "src",
  paths_include_glob: "**/*.ts"
});

// Trace payment flow dependencies
const orchestratorSymbols = await mcp_serena.get_symbols_overview({
  relative_path: "src/orchestration/orchestrator.ts",
  depth: 2
});

// Find all implementations of payment provider interface
const providers = await mcp_serena.find_symbol({
  name_path_pattern: "IPaymentProvider",
  substring_matching: true,
  depth: 3
});

// Safely refactor adapter method
const refs = await mcp_serena.find_referencing_symbols({
  name_path: "StripeAdapter/processPayment",
  relative_path: "src/adapters/stripe.ts"
});

// Update implementation with latest API
await mcp_serena.replace_symbol_body({
  name_path: "StripeAdapter/processPayment",
  relative_path: "src/adapters/stripe.ts",
  body: updatedImplementation
});

// Verify no references broken
await mcp_serena.execute_shell_command({
  command: "bun test src/adapters/__tests__/stripe.test.ts"
});
```

### Context7 Documentation

```typescript
// Get Stripe PaymentIntents API latest patterns
const stripePaymentIntents = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intents create confirm capture",
  mode: "code"
});

// Get Adyen 3DS2 implementation guide
const adyen3DS = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/adyen/adyen-node-api-library",
  topic: "3d secure 2 authentication challenge",
  mode: "info"
});

// Get CyberSource tokenization docs
const cyberSourceDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client",
  topic: "payment token creation",
  mode: "code"
});

// Get PCI DSS compliance requirements
// Use WebSearch for latest PCI DSS 4.0 requirements
const pciRequirements = await WebSearch({
  query: "PCI DSS 4.0 payment tokenization requirements 2025"
});
```

### Playwright E2E Testing

```typescript
// Complete payment flow with multiple scenarios
const scenarios = [
  { card: "4111111111111111", expected: "success", name: "Visa Success" },
  { card: "4000000000003220", expected: "3ds_required", name: "3DS Challenge" },
  { card: "4000000000000002", expected: "card_declined", name: "Declined Card" },
  { card: "4000000000009995", expected: "insufficient_funds", name: "Insufficient Funds" }
];

for (const scenario of scenarios) {
  await mcp_playwright.browser_navigate({ url: "http://localhost:3000/checkout" });

  await mcp_playwright.browser_fill_form({
    fields: [
      { name: "Card", type: "textbox", ref: "card", value: scenario.card },
      { name: "Expiry", type: "textbox", ref: "expiry", value: "12/26" },
      { name: "CVV", type: "textbox", ref: "cvv", value: "123" }
    ]
  });

  await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

  if (scenario.expected === "3ds_required") {
    await mcp_playwright.browser_wait_for({ text: "Verify" });
    await mcp_playwright.browser_type({ element: "OTP", ref: "otp", text: "123456", submit: true });
  }

  await mcp_playwright.browser_wait_for({
    text: scenario.expected === "success" ? "Success" : "Failed"
  });

  await mcp_playwright.browser_take_screenshot({
    filename: `payment-${scenario.name}.png`
  });
}

// Test PSP failover
await mcp_playwright.browser_navigate({ url: "http://localhost:3000/admin/psp-health" });

// Disable primary PSP
await mcp_playwright.browser_click({ element: "Disable Stripe", ref: "disable-stripe" });

// Attempt payment (should failover to Adyen)
await mcp_playwright.browser_navigate({ url: "http://localhost:3000/checkout" });
await mcp_playwright.browser_fill_form({
  fields: [{ name: "Card", type: "textbox", ref: "card", value: "4111111111111111" }]
});
await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

// Verify routed to Adyen
const requests = await mcp_playwright.browser_network_requests({});
const adyenCall = requests.find(r => r.url.includes('adyen.com'));
assert(adyenCall, "Should failover to Adyen when Stripe disabled");
```

### Chrome Dashboard Monitoring

```typescript
// Monitor Stripe dashboard in real-time
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/test/payments"
});

await mcp_chrome.use_browser({
  action: "await_element",
  selector: ".PaymentsList",
  timeout: 10000
});

// Extract key metrics
const successRate = await mcp_chrome.use_browser({
  action: "eval",
  payload: `document.querySelector('.metric-success-rate').textContent`
});

const avgLatency = await mcp_chrome.use_browser({
  action: "eval",
  payload: `document.querySelector('.metric-avg-latency').textContent`
});

const declineReasons = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".decline-reasons-chart",
  payload: "text"
});

// Screenshot for reporting
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "stripe-metrics.png"
});

// Check Adyen dashboard
await mcp_chrome.use_browser({ action: "new_tab" });
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://ca-test.adyen.com/ca/ca/accounts/showTx.shtml"
});

const adyenMetrics = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".transaction-overview",
  payload: "markdown"
});

// Compare PSP performance
const comparison = {
  stripe: { successRate, avgLatency },
  adyen: { metrics: adyenMetrics }
};
```

### Episodic Memory

```typescript
// Before making routing decision, check past learnings
const routingHistory = await mcp_episodic_memory.search({
  query: ["payment routing", "PSP selection", "high decline rate"],
  mode: "both",
  limit: 10,
  after: "2024-06-01"
});

// Find solutions to similar 3DS timeout issues
const threeDSIssues = await mcp_episodic_memory.search({
  query: "3DS timeout challenge iframe not loading",
  mode: "text",
  limit: 5
});

// Recall past Stripe API migration learnings
const stripeMigrations = await mcp_episodic_memory.search({
  query: ["Stripe API migration", "breaking changes", "payment intents"],
  mode: "both",
  limit: 5
});

// Read full conversation about specific issue
if (routingHistory.results.length > 0) {
  const conversation = await mcp_episodic_memory.read({
    path: routingHistory.results[0].path,
    startLine: 1,
    endLine: 500
  });
}
```

## Agent Dispatch Patterns

### When to Dispatch Specialized Agents

```typescript
// 1. Architecture Design - Dispatch code-architect
// When: Designing new orchestration flow or multi-PSP strategy
// Context: Share existing orchestrator code, requirements, constraints
// Expected Output: Detailed architecture proposal with tradeoffs

// 2. Code Review - Dispatch code-reviewer
// When: After implementing critical orchestration logic
// Focus: Race conditions, idempotency, error handling, compensation logic
// Expected Output: List of issues with severity and recommendations

// 3. Silent Failure Detection - Dispatch silent-failure-hunter
// When: After adding new PSP adapter or payment flow
// Focus: Missing try-catch, unhandled promises, swallowed errors
// Expected Output: All locations where errors are silently ignored

// 4. Test Analysis - Dispatch pr-test-analyzer
// When: Before merging orchestration changes
// Focus: Payment path coverage, failure scenario tests, edge cases
// Expected Output: Coverage gaps and missing test scenarios
```

## Best Practices

### Orchestration Design
- **Isolation**: Orchestrator never knows which PSP runs, only IPaymentProvider interface
- **Async**: Use queues (BullMQ/SQS) for high-latency operations like webhooks
- **Idempotency**: Every payment operation must be safely retriable
- **Compensation**: Always define rollback logic for partial completions
- **Observability**: Log every routing decision with context for debugging

### MCP Integration
- **Memory First**: Always check episodic memory before major routing decisions
- **Documentation Driven**: Use Context7 before implementing PSP API changes
- **Test Everything**: Every orchestration change must pass Playwright E2E tests
- **Monitor Continuously**: Chrome automation for real-time PSP health checks
- **Trace Code**: Use Serena to understand impact before refactoring

### Development Workflow
1. **Research**: Context7 + Episodic Memory + WebSearch for latest patterns
2. **Design**: Brainstorming skill + Code Architect agent for complex flows
3. **Plan**: Writing Plans skill for multi-step implementations
4. **Implement**: TDD skill + Serena code generation + Subagent development
5. **Test**: Playwright E2E + Chrome monitoring + Network validation
6. **Review**: Code reviewer + Silent failure hunter + Test analyzer
7. **Verify**: Verification skill with actual command execution
8. **Document**: Elements of style + Store learnings in Serena memory

### Failover Strategy

```
Primary PSP Fails
  ↓
1. Episodic Memory: Check if known failure pattern
  ↓
2. Systematic Debugging: Analyze root cause
  ↓
3. Context7: Get backup PSP integration requirements
  ↓
4. Serena: Verify backup adapter implementation exists
  ↓
5. Route to Backup PSP
  ↓
6. Playwright: Verify payment completes E2E
  ↓
7. Chrome: Monitor backup PSP dashboard
  ↓
8. Serena Memory: Store failover decision and outcome
```

### Performance Optimization

```typescript
// Use TodoWrite to track optimization tasks
// Invoke: TodoWrite
const optimizationTasks = [
  { content: "Profile orchestration latency with Chrome DevTools", status: "pending" },
  { content: "Implement Redis caching for routing rules", status: "pending" },
  { content: "Add database indexes for transaction lookups", status: "pending" },
  { content: "Test PSP connection pooling under load", status: "pending" }
];

// Use WebSearch for latest optimization techniques
const performancePatterns = await WebSearch({
  query: "payment gateway orchestration performance optimization 2025"
});

// Use Serena to find bottlenecks
const slowPaths = await mcp_serena.search_for_pattern({
  substring_pattern: "await.*timeout|sleep\\(|delay\\(",
  relative_path: "src/orchestration"
});
```
