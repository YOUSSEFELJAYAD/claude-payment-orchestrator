# Skill: Testing

**Role:** sequential-reasoner (QA Architect)
**Domain:** Quality Assurance & Test Engineering
**Objective:** Implement comprehensive testing strategy spanning unit, integration, E2E, and visual regression testing using MCP-powered browser automation, code coverage analysis, and documentation-driven test patterns.

## Available Capabilities

### MCP Servers
| Server | Usage in Testing |
|--------|------------------|
| **Playwright** | E2E browser testing, visual regression, form automation, 3DS flows, network request validation, accessibility testing via snapshots |
| **Serena** | Find untested code paths, analyze test coverage gaps, generate test scaffolds, trace execution flows, refactor test utilities |
| **Context7** | Get Vitest/Jest/Playwright docs, testing library patterns, mocking strategies, assertion best practices |
| **Chrome** | Persistent session testing, cookie/storage verification, live debugging, performance profiling, manual exploratory testing |
| **Episodic Memory** | Recall flaky test patterns, retrieve past test fixes, find solutions to similar failures, reference testing decisions |

### Superpowers Skills
| Skill | When to Invoke |
|-------|----------------|
| `test-driven-development` | ALWAYS before implementing features - write tests first |
| `systematic-debugging` | When investigating test failures, flaky tests, or unexpected behavior |
| `verification-before-completion` | Before claiming tests pass - run actual commands and verify output |
| `brainstorming` | Before designing test strategies for complex features |
| `writing-plans` | When implementing comprehensive test suites across multiple layers |
| `subagent-driven-development` | For parallel test implementation across different test types |
| `requesting-code-review` | After implementing critical test infrastructure |

### Specialized Agents
| Agent | When to Dispatch |
|-------|-----------------|
| `pr-test-analyzer` | Analyzing test coverage and identifying missing test scenarios |
| `silent-failure-hunter` | Finding tests that silently pass despite errors |
| `code-reviewer` | Reviewing test quality, assertions, and edge case coverage |
| `code-architect` | Designing test infrastructure and framework patterns |

### Other Skills & Tools
- `elements-of-style:writing-clearly-and-concisely` - For test descriptions and documentation
- `episodic-memory:remembering-conversations` - For recurring test patterns
- `dev-browser:dev-browser` - For interactive browser testing
- WebSearch - For latest testing best practices and patterns
- TodoWrite - For tracking test implementation progress

## Logic Flow

```
┌───────────────────────────────────────────────────────────────────────────┐
│                    COMPREHENSIVE TESTING FLOW                              │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  PHASE 1: TEST DISCOVERY                                                  │
│  ├─ Serena: Find all testable entry points (functions, endpoints, UI)     │
│  ├─ Serena: Analyze existing test coverage and identify gaps              │
│  ├─ Episodic Memory: Search past test failures and flaky test patterns    │
│  ├─ Context7: Get latest testing framework documentation                  │
│  └─ Brainstorming: Design test strategy for feature                       │
│                                                                            │
│  PHASE 2: TEST PLANNING (TDD Approach)                                    │
│  ├─ TDD skill: Write tests BEFORE implementation                          │
│  ├─ Define test scenarios (happy path + edge cases + errors)              │
│  ├─ Plan test layers: Unit → Integration → E2E → Visual                   │
│  ├─ Setup test fixtures, mocks, and test data                             │
│  └─ Writing Plans: Document comprehensive test plan                       │
│                                                                            │
│  PHASE 3: UNIT TESTING                                                    │
│  ├─ Context7: Get Vitest/Jest mocking patterns                            │
│  ├─ Serena: Generate test scaffolds for untested functions                │
│  ├─ Test individual functions with mocked dependencies                    │
│  ├─ Aim for 100% code path coverage                                       │
│  └─ Serena: Verify all branches covered                                   │
│                                                                            │
│  PHASE 4: INTEGRATION TESTING                                             │
│  ├─ Test API endpoints with real database                                 │
│  ├─ Playwright: Test API via browser fetch (with auth)                    │
│  ├─ Test service interactions without mocks                               │
│  ├─ Verify data persistence and side effects                              │
│  └─ Chrome: Monitor network requests                                      │
│                                                                            │
│  PHASE 5: E2E TESTING                                                     │
│  ├─ Playwright: Full user flows in browser                                │
│  ├─ Test payment flows, auth flows, multi-step processes                  │
│  ├─ Playwright: Network request validation                                │
│  ├─ Playwright: Console error checking                                    │
│  └─ Visual regression with screenshots                                    │
│                                                                            │
│  PHASE 6: VERIFICATION & ANALYSIS                                         │
│  ├─ Verification skill: Run ALL tests and verify pass                     │
│  ├─ pr-test-analyzer: Analyze coverage gaps                               │
│  ├─ silent-failure-hunter: Find silently passing tests                    │
│  ├─ Systematic debugging: Investigate any failures                        │
│  └─ Serena memory: Store test patterns and decisions                      │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Test Discovery & Planning

```typescript
// 1. Find all untested code with Serena
const allMethods = await mcp_serena.find_symbol({
  name_path_pattern: "Payment",
  relative_path: "src/payments",
  substring_matching: true,
  depth: 2,
  include_kinds: [6]  // Methods
});

// 2. Find existing tests
const existingTests = await mcp_serena.search_for_pattern({
  substring_pattern: "describe.*Payment|test.*payment|it\\('.*payment",
  relative_path: "tests",
  paths_include_glob: "**/*.test.ts"
});

// 3. Search for past flaky test solutions
const flakyTestSolutions = await mcp_episodic_memory.search({
  query: ["flaky test", "intermittent failure", "timeout"],
  mode: "both",
  limit: 10
});

// 4. Get testing framework docs
const vitestDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/vitest-dev/vitest",
  topic: "mocking async functions assertions",
  mode: "code"
});

const playwrightDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/microsoft/playwright",
  topic: "page object model assertions",
  mode: "code"
});

// 5. Brainstorm test strategy
// Invoke: superpowers:brainstorming
// Topics: Test layers, mocking strategy, fixture design
```

### Phase 2: TDD Implementation

```typescript
// 1. ALWAYS use TDD skill before implementing
// Invoke: superpowers:test-driven-development

// 2. Write tests FIRST with Serena
await mcp_serena.create_text_file({
  relative_path: "tests/payments/refund-processor.test.ts",
  content: `import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RefundProcessor } from '@/payments/refund-processor';
import { mockPSPAdapter } from './fixtures/psp-adapter';

describe('RefundProcessor', () => {
  let processor: RefundProcessor;
  let mockAdapter: ReturnType<typeof mockPSPAdapter>;

  beforeEach(() => {
    mockAdapter = mockPSPAdapter();
    processor = new RefundProcessor(mockAdapter);
  });

  describe('processRefund', () => {
    it('should successfully process valid refund', async () => {
      const result = await processor.processRefund({
        transactionId: 'tx_123',
        amount: 100,
        reason: 'customer_request'
      });

      expect(result.status).toBe('completed');
      expect(result.refundId).toBeDefined();
      expect(mockAdapter.refund).toHaveBeenCalledWith({
        transactionId: 'tx_123',
        amount: 100
      });
    });

    it('should reject negative amounts', async () => {
      await expect(
        processor.processRefund({
          transactionId: 'tx_123',
          amount: -50,
          reason: 'fraud'
        })
      ).rejects.toThrow('Amount must be positive');
    });

    it('should handle PSP timeouts with retry', async () => {
      mockAdapter.refund
        .mockRejectedValueOnce(new Error('Timeout'))
        .mockResolvedValueOnce({ refundId: 'ref_123', status: 'completed' });

      const result = await processor.processRefund({
        transactionId: 'tx_123',
        amount: 100,
        reason: 'duplicate'
      });

      expect(result.status).toBe('completed');
      expect(mockAdapter.refund).toHaveBeenCalledTimes(2); // Retried
    });

    it('should fail after max retries', async () => {
      mockAdapter.refund.mockRejectedValue(new Error('PSP Error'));

      await expect(
        processor.processRefund({
          transactionId: 'tx_123',
          amount: 100,
          reason: 'other'
        })
      ).rejects.toThrow('Refund failed after 3 attempts');
    });

    it('should validate transaction exists before refunding', async () => {
      mockAdapter.getTransaction.mockResolvedValue(null);

      await expect(
        processor.processRefund({
          transactionId: 'invalid_tx',
          amount: 100,
          reason: 'customer_request'
        })
      ).rejects.toThrow('Transaction not found');
    });
  });

  describe('partial refunds', () => {
    it('should allow refund less than original amount', async () => {
      mockAdapter.getTransaction.mockResolvedValue({
        id: 'tx_123',
        amount: 200,
        refunded: 0
      });

      const result = await processor.processRefund({
        transactionId: 'tx_123',
        amount: 50,
        reason: 'customer_request'
      });

      expect(result.status).toBe('completed');
      expect(result.refundedAmount).toBe(50);
    });

    it('should reject refund exceeding original amount', async () => {
      mockAdapter.getTransaction.mockResolvedValue({
        id: 'tx_123',
        amount: 100,
        refunded: 0
      });

      await expect(
        processor.processRefund({
          transactionId: 'tx_123',
          amount: 150,
          reason: 'fraud'
        })
      ).rejects.toThrow('Refund amount exceeds transaction amount');
    });
  });
});`
});

// 3. Then implement the feature (not shown here)
```

### Phase 3: E2E Testing with Playwright

```typescript
// Complete payment flow testing
const testScenarios = [
  {
    name: "Successful payment",
    card: "4111111111111111",
    expectedResult: "Payment successful",
    screenshot: "payment-success.png"
  },
  {
    name: "3DS challenge flow",
    card: "4000000000003220",
    requiresOTP: true,
    expectedResult: "Payment complete",
    screenshot: "payment-3ds-success.png"
  },
  {
    name: "Declined card",
    card: "4000000000000002",
    expectedResult: "Payment declined",
    expectedError: "CARD_DECLINED",
    screenshot: "payment-declined.png"
  },
  {
    name: "Insufficient funds",
    card: "4000000000009995",
    expectedResult: "Insufficient funds",
    expectedError: "INSUFFICIENT_FUNDS",
    screenshot: "payment-insufficient-funds.png"
  }
];

for (const scenario of testScenarios) {
  // Navigate to checkout
  await mcp_playwright.browser_navigate({
    url: "http://localhost:3000/checkout"
  });

  // Fill payment form
  await mcp_playwright.browser_fill_form({
    fields: [
      { name: "Card Number", type: "textbox", ref: "card", value: scenario.card },
      { name: "Expiry", type: "textbox", ref: "expiry", value: "12/26" },
      { name: "CVV", type: "textbox", ref: "cvv", value: "123" },
      { name: "Amount", type: "textbox", ref: "amount", value: "100" }
    ]
  });

  // Submit payment
  await mcp_playwright.browser_click({ element: "Pay Now", ref: "submit" });

  // Handle 3DS if required
  if (scenario.requiresOTP) {
    await mcp_playwright.browser_wait_for({ text: "Verify your identity" });

    // Get accessibility snapshot to verify 3DS iframe present
    const snapshot = await mcp_playwright.browser_snapshot({});

    // Complete OTP challenge
    await mcp_playwright.browser_type({
      element: "OTP", ref: "otp-input", text: "123456", submit: true
    });
  }

  // Wait for result
  await mcp_playwright.browser_wait_for({ text: scenario.expectedResult });

  // Capture network requests
  const requests = await mcp_playwright.browser_network_requests({});
  const paymentRequest = requests.find(r => r.url.includes('/api/payments'));

  // Verify idempotency header present
  expect(paymentRequest.headers['idempotency-key']).toBeDefined();

  // Check for console errors
  const consoleErrors = await mcp_playwright.browser_console_messages({
    level: "error"
  });

  // Filter out expected errors
  const unexpectedErrors = consoleErrors.filter(
    e => !e.includes('Expected error:')
  );
  expect(unexpectedErrors).toHaveLength(0);

  // Visual regression screenshot
  await mcp_playwright.browser_take_screenshot({
    filename: scenario.screenshot,
    fullPage: true
  });
}

// Test accessibility
await mcp_playwright.browser_navigate({ url: "http://localhost:3000/checkout" });
const a11ySnapshot = await mcp_playwright.browser_snapshot({});

// Verify critical accessibility requirements
// - All form fields have labels
// - Buttons have accessible names
// - Error messages are announced
// (Snapshot contains accessibility tree with roles and names)
```

### Phase 4: Verification & Analysis

```typescript
// 1. Run all tests and verify
// Invoke: superpowers:verification-before-completion

// 2. Analyze coverage gaps
// Dispatch: pr-test-analyzer
// Expected output: List of untested code paths and scenarios

// 3. Find silent failures
// Dispatch: silent-failure-hunter
// Expected output: Tests that pass despite errors

// 4. Debug any failures
// Invoke: superpowers:systematic-debugging

// 5. Store test patterns in memory
await mcp_serena.write_memory({
  memory_file_name: "testing-patterns.md",
  content: `# Testing Patterns

## Date: ${new Date().toISOString()}

### Flaky Test Solutions
- 3DS iframe loading: Use \`browser_wait_for\` with selector, not fixed timeout
- Network race conditions: Capture requests AFTER navigation completes
- Database state: Always reset DB in beforeEach, never rely on previous tests

### Mocking Strategies
- PSP adapters: Mock at interface boundary (IPaymentProvider)
- External APIs: Use nock for HTTP mocking, not fetch mocks
- Time-dependent tests: Mock Date.now(), not sleep()

### Test Coverage Goals
- Unit tests: 100% of business logic functions
- Integration tests: All API endpoints + database operations
- E2E tests: Critical user flows (payment, auth, signup)
- Visual regression: All component states (loading, error, success)
`
});
```

## MCP Integration Examples

### Serena Test Generation

```typescript
// Find all functions needing tests
const untestedFunctions = await mcp_serena.find_symbol({
  name_path_pattern: "process|calculate|validate",
  relative_path: "src",
  substring_matching: true,
  depth: 3
});

// Generate test scaffold
for (const fn of untestedFunctions) {
  const testPath = fn.path.replace('src/', 'tests/').replace('.ts', '.test.ts');
  await mcp_serena.create_text_file({
    relative_path: testPath,
    content: generateTestScaffold(fn)
  });
}
```

### Context7 Testing Docs

```typescript
// Get mocking patterns
const mockingDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/vitest-dev/vitest",
  topic: "vi.mock vi.spyOn async functions",
  mode: "code"
});

// Get Playwright best practices
const playwrightBest = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/microsoft/playwright",
  topic: "best practices flaky tests",
  mode: "info"
});
```

### Playwright Visual Regression

```typescript
// Test all component states
const states = ['default', 'loading', 'success', 'error', 'empty'];

for (const state of states) {
  await mcp_playwright.browser_navigate({
    url: `http://localhost:6006/?path=/story/paymentform--${state}`
  });

  await mcp_playwright.browser_take_screenshot({
    filename: `PaymentForm-${state}.png`,
    element: "Story preview",
    ref: "storybook-preview"
  });
}

// Compare with baselines (would use image diff tool)
```

### Chrome Debug Testing

```typescript
// Live debug failing test
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Set breakpoint via eval
await mcp_chrome.use_browser({
  action: "eval",
  payload: "debugger;"
});

// Inspect state
const state = await mcp_chrome.use_browser({
  action: "eval",
  payload: "window.__PAYMENT_STATE__"
});
```

### Episodic Memory Test Patterns

```typescript
// Find past solutions to similar test failures
const pastSolutions = await mcp_episodic_memory.search({
  query: ["playwright timeout", "iframe not loading", "3DS challenge"],
  mode: "both",
  limit: 5
});

// Recall testing decisions
const testDecisions = await mcp_episodic_memory.search({
  query: ["test strategy", "mocking approach", "coverage goals"],
  mode: "text"
});
```

## Best Practices

### Test Pyramid
- **70% Unit Tests**: Fast, isolated, test business logic
- **20% Integration Tests**: API endpoints, database operations
- **10% E2E Tests**: Critical user flows only

### TDD Discipline
- **Red**: Write failing test first
- **Green**: Implement minimum code to pass
- **Refactor**: Improve code while keeping tests green

### Flaky Test Prevention
- Never use fixed timeouts (sleep)
- Always wait for specific conditions
- Reset state before each test
- Avoid test interdependencies

### Coverage Goals
- Business logic: 100%
- API endpoints: 100%
- UI components: 80%+
- E2E critical flows: 100%

### Development Workflow
1. Research: Context7 + Episodic Memory
2. Discovery: Serena to find untested code
3. Plan: Brainstorming + Writing Plans
4. Implement: TDD skill (tests first!)
5. Execute: Playwright + Chrome testing
6. Verify: Verification skill
7. Analyze: PR test analyzer + Silent failure hunter
8. Document: Store patterns in Serena memory
