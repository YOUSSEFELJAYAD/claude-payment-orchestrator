# Skill: Mock PSP Response

**Role:** sequential-reasoner (Gateway Specialist)
**Domain:** Payment Gateway Integration
**Objective:** Simulate realistic PSP responses for all payment operations (success, failure, 3DS, timeouts) to enable comprehensive local testing without external API calls, leveraging Context7 for authentic response formats, Serena for mock implementation analysis, TDD workflows, and complete coverage of gateway scenarios including edge cases and error conditions.

## Available Capabilities

### MCP Servers
| Server | Usage in PSP Mocking |
|--------|----------------------|
| **Serena** | Find existing mock implementations, analyze PSP response formats, trace test fixtures |
| **Context7** | Get authentic PSP response structures (Stripe, Cybersource, MPGS) for accurate mocking |
| **Playwright** | Test mock responses in E2E flows, verify UI behavior with different scenarios |
| **Chrome** | N/A for mocking (used for real PSP verification) |
| **Episodic Memory** | Recall real PSP response patterns, edge cases encountered in production |

### Superpowers Skills
| Skill | Mock-Specific Trigger |
|-------|----------------------|
| `brainstorming` | Before designing mock architecture or test scenario coverage |
| `systematic-debugging` | When mocking doesn't match real PSP behavior |
| `test-driven-development` | Before implementing payment features with mocks |
| `verification-before-completion` | Before deploying code tested with mocks |
| `writing-plans` | For comprehensive mock test suite creation |
| `subagent-driven-development` | Parallel mock implementation for multiple PSPs |
| `requesting-code-review` | After implementing complex mock logic |

### Specialized Agents
| Agent | Mock Use Case |
|-------|--------------|
| `code-architect` | Design mock architecture, test fixture organization |
| `code-reviewer` | Review mock accuracy against real PSP responses |
| `silent-failure-hunter` | Find missing test scenarios in mock coverage |
| `pr-test-analyzer` | Verify test coverage using mocks |

### Other Capabilities
- `elements-of-style:writing-clearly-and-concisely` - Mock documentation
- `episodic-memory:remembering-conversations` - Past PSP edge cases
- `dev-browser:dev-browser` - Test UI with mocked responses
- WebSearch - Latest PSP test card numbers, scenarios
- TodoWrite - Track mock scenario coverage tasks

## Logic Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                          MOCK PSP WORKFLOW                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Phase 1: Response Discovery                                                  │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Context7 → Episodic Memory → Real PSP Docs                  │            │
│  │ Get actual   Past responses   Test cards                    │            │
│  │ formats                        scenarios                     │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 2: Trigger Detection                                                   │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Analyze Request Input                                        │            │
│  │ ├─ Magic Amount: X.00=SUCCESS, X.51=INSUFFICIENT_FUNDS      │            │
│  │ ├─ Magic Card: 4000000000000002=DECLINED                    │            │
│  │ ├─ Magic CVV: 999=3DS_REQUIRED                              │            │
│  │ └─ Magic Email: timeout@test.com=TIMEOUT                    │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 3: Response Generation                                                 │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Select Scenario                                              │            │
│  │ ├─ SUCCESS → gatewayCode: APPROVED, status: AUTHORIZED      │            │
│  │ ├─ DECLINED → gatewayCode: DECLINED, acquirerCode: 51       │            │
│  │ ├─ 3DS → redirectUrl, authenticationId                      │            │
│  │ ├─ TIMEOUT → Delay 30s, throw error                         │            │
│  │ └─ FRAUD → Decision Manager REJECT                          │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 4: Latency Simulation                                                  │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Add Realistic Delay                                          │            │
│  │ ├─ SUCCESS: 300-800ms                                        │            │
│  │ ├─ DECLINED: 500-1200ms                                      │            │
│  │ ├─ 3DS: 1000-2000ms (redirect prep)                         │            │
│  │ └─ TIMEOUT: 30000ms                                          │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 5: Response Formatting                                                 │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Build PSP-Specific Response                                  │            │
│  │ ├─ Stripe: { id, status, amount, ...}                       │            │
│  │ ├─ Cybersource: { id, status, processorInformation, ...}    │            │
│  │ ├─ MPGS: { response: { gatewayCode }, transaction: {...}}   │            │
│  │ └─ Adyen: { pspReference, resultCode, ...}                  │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  Mock Flow:                                                                   │
│  Request → Trigger Detection → Scenario Selection → Latency → PSP Format →   │
│  Return Mocked Response                                                       │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Response Discovery
```typescript
// Step 1: Get authentic PSP response formats from Context7
const stripeResponseDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intent response object structure",
  mode: "code"
});

const cybersourceResponseDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "payment response object fields",
  mode: "code"
});

const mpgsResponseDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "response structure gateway code acquirer code",
  mode: "info"
});

// Step 2: Recall real PSP responses from past conversations
const realResponses = await mcp_episodic_memory.search({
  query: ["PSP response", "gateway response", "declined", "3DS"],
  mode: "both",
  limit: 10
});

// Step 3: Analyze existing mock implementations
const existingMocks = await mcp_serena.search_for_pattern({
  substring_pattern: "mock.*psp|mock.*response|test.*fixture",
  paths_include_glob: "**/*.ts",
  context_lines_before: 5,
  context_lines_after: 20
});
```

### Phase 2: Mock Implementation

#### Trigger Map Configuration
```typescript
export const TRIGGER_MAP = {
  // Amount-based triggers (decimal pattern: X.YY)
  amounts: {
    '00': 'APPROVED',        // X.00 → Success
    '51': 'INSUFFICIENT_FUNDS', // X.51 → Declined (Insufficient Funds)
    '05': 'DO_NOT_HONOR',    // X.05 → Declined (Do Not Honor)
    '31': '3DS_REQUIRED',    // X.31 → 3DS Challenge
    '57': 'EXPIRED_CARD',    // X.57 → Expired Card
    '14': 'INVALID_CARD',    // X.14 → Invalid Card Number
    '99': 'TIMEOUT'          // X.99 → Timeout (30s)
  },

  // Test card numbers (standard testing cards)
  cards: {
    '4111111111111111': 'SUCCESS',           // Visa success
    '5555555555554444': 'SUCCESS',           // Mastercard success
    '4000000000000002': 'DECLINED',          // Generic decline
    '4000000000009995': '3DS_REQUIRED',      // 3DS authentication
    '4000000000000069': 'EXPIRED_CARD',      // Expired
    '4000000000000127': 'INVALID_CVV',       // Incorrect CVV
    '4000000000000119': 'PROCESSING_ERROR',  // Processing error
    '5123456789012346': 'SUCCESS',           // MPGS test card
  },

  // CVV-based triggers
  cvv: {
    '999': '3DS_REQUIRED',
    '000': 'INVALID_CVV'
  },

  // Email-based triggers
  email: {
    'timeout@test.com': 'TIMEOUT',
    'fraud@test.com': 'FRAUD_REJECT',
    '3ds@test.com': '3DS_REQUIRED'
  }
};
```

#### Mock PSP Response Generator
```typescript
export class MockPSPResponse {
  async generateResponse(
    psp: string,
    operation: 'authorize' | 'capture' | 'void' | 'refund',
    request: any
  ): Promise<any> {
    // Step 1: Detect trigger
    const scenario = this.detectScenario(request);

    // Step 2: Add realistic latency
    await this.simulateLatency(scenario);

    // Step 3: Generate PSP-specific response
    return this.buildResponse(psp, operation, scenario, request);
  }

  private detectScenario(request: any): string {
    // Check amount trigger (e.g., 10.51 → INSUFFICIENT_FUNDS)
    const amount = parseFloat(request.amount);
    const cents = Math.round((amount * 100) % 100);
    const centsStr = cents.toString().padStart(2, '0');

    if (TRIGGER_MAP.amounts[centsStr]) {
      return TRIGGER_MAP.amounts[centsStr];
    }

    // Check card number trigger
    if (request.card?.number && TRIGGER_MAP.cards[request.card.number]) {
      return TRIGGER_MAP.cards[request.card.number];
    }

    // Check CVV trigger
    if (request.card?.cvv && TRIGGER_MAP.cvv[request.card.cvv]) {
      return TRIGGER_MAP.cvv[request.card.cvv];
    }

    // Check email trigger
    if (request.email && TRIGGER_MAP.email[request.email]) {
      return TRIGGER_MAP.email[request.email];
    }

    // Default to success
    return 'APPROVED';
  }

  private async simulateLatency(scenario: string): Promise<void> {
    const latencyMap: Record<string, [number, number]> = {
      'APPROVED': [300, 800],
      'INSUFFICIENT_FUNDS': [500, 1200],
      '3DS_REQUIRED': [1000, 2000],
      'TIMEOUT': [30000, 30000],
      'FRAUD_REJECT': [800, 1500],
      'DEFAULT': [400, 900]
    };

    const [min, max] = latencyMap[scenario] || latencyMap['DEFAULT'];
    const delay = Math.random() * (max - min) + min;

    await new Promise(resolve => setTimeout(resolve, delay));
  }

  private buildResponse(
    psp: string,
    operation: string,
    scenario: string,
    request: any
  ): any {
    switch (psp.toLowerCase()) {
      case 'stripe':
        return this.buildStripeResponse(operation, scenario, request);
      case 'cybersource':
        return this.buildCybersourceResponse(operation, scenario, request);
      case 'mpgs':
        return this.buildMPGSResponse(operation, scenario, request);
      case 'adyen':
        return this.buildAdyenResponse(operation, scenario, request);
      default:
        throw new Error(`Unsupported PSP: ${psp}`);
    }
  }

  private buildStripeResponse(operation: string, scenario: string, request: any): any {
    const baseResponse = {
      id: `pi_${this.generateId()}`,
      object: 'payment_intent',
      amount: Math.round(parseFloat(request.amount) * 100),
      currency: request.currency.toLowerCase(),
      created: Math.floor(Date.now() / 1000),
      livemode: false
    };

    switch (scenario) {
      case 'APPROVED':
        return {
          ...baseResponse,
          status: operation === 'authorize' ? 'requires_capture' : 'succeeded',
          charges: {
            data: [{
              id: `ch_${this.generateId()}`,
              status: 'succeeded'
            }]
          }
        };

      case 'INSUFFICIENT_FUNDS':
      case 'DO_NOT_HONOR':
        return {
          ...baseResponse,
          status: 'requires_payment_method',
          last_payment_error: {
            code: scenario === 'INSUFFICIENT_FUNDS' ? 'insufficient_funds' : 'card_declined',
            decline_code: scenario === 'INSUFFICIENT_FUNDS' ? 'insufficient_funds' : 'generic_decline',
            message: scenario === 'INSUFFICIENT_FUNDS'
              ? 'Your card has insufficient funds.'
              : 'Your card was declined.'
          }
        };

      case '3DS_REQUIRED':
        return {
          ...baseResponse,
          status: 'requires_action',
          next_action: {
            type: 'redirect_to_url',
            redirect_to_url: {
              url: `https://hooks.stripe.com/3d_secure_2/${this.generateId()}`,
              return_url: request.returnUrl
            }
          }
        };

      case 'TIMEOUT':
        throw new Error('Request timeout');

      case 'INVALID_CVV':
        return {
          ...baseResponse,
          status: 'requires_payment_method',
          last_payment_error: {
            code: 'incorrect_cvc',
            message: 'Your card\'s security code is incorrect.'
          }
        };

      default:
        return {
          ...baseResponse,
          status: 'succeeded'
        };
    }
  }

  private buildCybersourceResponse(operation: string, scenario: string, request: any): any {
    const baseResponse = {
      id: this.generateId(),
      submitTimeUtc: new Date().toISOString(),
      clientReferenceInformation: {
        code: request.orderId
      }
    };

    switch (scenario) {
      case 'APPROVED':
        return {
          ...baseResponse,
          status: operation === 'authorize' ? 'AUTHORIZED' : 'PENDING',
          processorInformation: {
            approvalCode: this.generateApprovalCode(),
            responseCode: '00',
            avs: { code: 'Y' },
            cardVerification: { resultCode: 'M' }
          }
        };

      case 'INSUFFICIENT_FUNDS':
        return {
          ...baseResponse,
          status: 'DECLINED',
          errorInformation: {
            reason: 'INSUFFICIENT_FUNDS',
            message: 'Insufficient funds in the account.'
          },
          processorInformation: {
            responseCode: '51'
          }
        };

      case '3DS_REQUIRED':
        return {
          ...baseResponse,
          status: 'PENDING_AUTHENTICATION',
          consumerAuthenticationInformation: {
            authenticationTransactionId: this.generateId(),
            acsUrl: 'https://centinelapi.cardinalcommerce.com/V2/Cruise/StepUp'
          }
        };

      case 'FRAUD_REJECT':
        return {
          ...baseResponse,
          status: 'AUTHORIZED_RISK_DECLINED',
          riskInformation: {
            score: {
              result: 85
            },
            profile: {
              decision: 'REJECT'
            }
          }
        };

      case 'TIMEOUT':
        throw new Error('Gateway timeout');

      default:
        return {
          ...baseResponse,
          status: 'AUTHORIZED'
        };
    }
  }

  private buildMPGSResponse(operation: string, scenario: string, request: any): any {
    const baseResponse = {
      gatewayEntryPoint: 'WEB_SERVICES_API',
      merchant: 'TEST_MERCHANT',
      order: {
        amount: request.amount,
        currency: request.currency,
        reference: request.orderId
      },
      transaction: {
        id: this.generateId(),
        type: operation.toUpperCase()
      }
    };

    switch (scenario) {
      case 'APPROVED':
        return {
          ...baseResponse,
          response: {
            gatewayCode: 'APPROVED',
            acquirerCode: '00'
          },
          transaction: {
            ...baseResponse.transaction,
            authorizationCode: this.generateApprovalCode()
          }
        };

      case 'INSUFFICIENT_FUNDS':
        return {
          ...baseResponse,
          response: {
            gatewayCode: 'DECLINED',
            acquirerCode: '51',
            acquirerMessage: 'Insufficient Funds'
          }
        };

      case '3DS_REQUIRED':
        return {
          ...baseResponse,
          response: {
            gatewayCode: 'PENDING'
          },
          authentication: {
            redirect: {
              html: '<html>3DS Challenge</html>',
              customized: {
                acsUrl: 'https://acs.test.com/3ds'
              }
            },
            transactionId: this.generateId()
          }
        };

      case 'TIMEOUT':
        throw new Error('MPGS gateway timeout');

      default:
        return {
          ...baseResponse,
          response: {
            gatewayCode: 'APPROVED'
          }
        };
    }
  }

  private buildAdyenResponse(operation: string, scenario: string, request: any): any {
    const baseResponse = {
      pspReference: this.generateId(),
      merchantReference: request.orderId
    };

    switch (scenario) {
      case 'APPROVED':
        return {
          ...baseResponse,
          resultCode: operation === 'authorize' ? 'Authorised' : 'Received'
        };

      case 'INSUFFICIENT_FUNDS':
        return {
          ...baseResponse,
          resultCode: 'Refused',
          refusalReason: 'Insufficient Balance'
        };

      case '3DS_REQUIRED':
        return {
          ...baseResponse,
          resultCode: 'RedirectShopper',
          action: {
            type: 'redirect',
            url: 'https://test.adyen.com/hpp/3d/validate.shtml'
          }
        };

      default:
        return {
          ...baseResponse,
          resultCode: 'Authorised'
        };
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }

  private generateApprovalCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}
```

#### Mock Adapter Implementation
```typescript
export class MockPSPAdapter implements IPaymentProvider {
  private readonly mockGenerator: MockPSPResponse;
  private readonly psp: string;

  constructor(psp: string) {
    this.psp = psp;
    this.mockGenerator = new MockPSPResponse();
  }

  async authorize(request: PaymentRequest): Promise<PaymentResponse> {
    const mockResponse = await this.mockGenerator.generateResponse(
      this.psp,
      'authorize',
      request
    );

    return this.normalizeResponse(mockResponse);
  }

  async capture(request: CaptureRequest): Promise<PaymentResponse> {
    const mockResponse = await this.mockGenerator.generateResponse(
      this.psp,
      'capture',
      request
    );

    return this.normalizeResponse(mockResponse);
  }

  async void(request: VoidRequest): Promise<PaymentResponse> {
    const mockResponse = await this.mockGenerator.generateResponse(
      this.psp,
      'void',
      request
    );

    return this.normalizeResponse(mockResponse);
  }

  async refund(request: RefundRequest): Promise<PaymentResponse> {
    const mockResponse = await this.mockGenerator.generateResponse(
      this.psp,
      'refund',
      request
    );

    return this.normalizeResponse(mockResponse);
  }

  normalizeResponse(rawResponse: any): PaymentResponse {
    // PSP-specific normalization logic
    // (Implementation depends on PSP)
    return {
      success: true,
      transactionId: rawResponse.id || rawResponse.pspReference,
      status: PaymentStatus.AUTHORIZED,
      rawResponse
    };
  }

  mapError(error: any): PaymentError {
    return new PaymentError('MOCK_ERROR', error.message, error);
  }

  async getTransaction(transactionId: string): Promise<PaymentResponse> {
    throw new Error('Not implemented in mock');
  }
}
```

### Phase 3: Testing

#### Playwright E2E Testing with Mocks
```typescript
// Test all scenarios using mock triggers
const scenarios = [
  { amount: '10.00', card: '4111111111111111', expected: 'SUCCESS' },
  { amount: '10.51', card: '4111111111111111', expected: 'INSUFFICIENT_FUNDS' },
  { amount: '10.31', card: '4111111111111111', expected: '3DS_REQUIRED' },
  { amount: '10.00', card: '4000000000000002', expected: 'DECLINED' },
];

for (const scenario of scenarios) {
  await mcp_playwright.browser_navigate({
    url: "http://localhost:3000/checkout?mock=true"
  });

  await mcp_playwright.browser_fill_form({
    fields: [
      { name: "Amount", type: "textbox", ref: "amount", value: scenario.amount },
      { name: "Card", type: "textbox", ref: "card", value: scenario.card },
      { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
      { name: "CVV", type: "textbox", ref: "cvv", value: "123" }
    ]
  });

  await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

  // Verify expected outcome
  const hasExpected = await mcp_playwright.browser_wait_for({
    text: scenario.expected,
    time: 5
  });

  console.log(`Scenario ${scenario.expected}: ${hasExpected ? 'PASSED' : 'FAILED'}`);
}
```

### Phase 4: Verification
```typescript
// Invoke TDD for mock-driven development
// Invoke superpowers:test-driven-development

// Verify all scenarios covered
// Invoke superpowers:verification-before-completion
```

## MCP Integration Examples

### Serena: Analyze Mock Implementations
```typescript
// Find existing mock patterns
const mocks = await mcp_serena.search_for_pattern({
  substring_pattern: "mock.*response|test.*fixture|generateResponse",
  paths_include_glob: "**/*.ts"
});

// Find trigger map
const triggers = await mcp_serena.search_for_pattern({
  substring_pattern: "TRIGGER_MAP|magic.*amount|test.*card",
  paths_include_glob: "**/*.ts"
});
```

### Context7: Get Authentic Response Formats
```typescript
// Get Stripe response structure
const stripeFormat = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intent object complete structure",
  mode: "code"
});

// Get Cybersource response structure
const cyberFormat = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "payment response complete object",
  mode: "code"
});
```

### Episodic Memory: Recall Real Responses
```typescript
// Search for real PSP responses
const realResponses = await mcp_episodic_memory.search({
  query: ["Stripe response", "Cybersource declined", "MPGS 3DS"],
  mode: "both",
  limit: 10
});
```

## Mock Scenario Coverage

### Standard Scenarios
- [ ] Successful authorization
- [ ] Successful capture
- [ ] Successful void
- [ ] Successful refund
- [ ] Card declined (generic)
- [ ] Insufficient funds
- [ ] Expired card
- [ ] Invalid CVV
- [ ] 3DS required
- [ ] 3DS challenge flow

### Edge Cases
- [ ] Gateway timeout (30s)
- [ ] Network error
- [ ] Fraud rejection
- [ ] Partial capture
- [ ] Multiple captures
- [ ] Reversal within 30min
- [ ] Idempotency check
- [ ] Concurrent requests

### Best Practices

- Use realistic latencies (300-800ms for success)
- Match exact PSP response structures from documentation
- Support all trigger types (amount, card, CVV, email)
- Include complete response objects (not just minimal data)
- Simulate network failures realistically
- Test with mocks before hitting real PSP sandbox
- Document all magic triggers in README
- Update mocks when PSP API changes

## Security Checklist

- [ ] Never include real credentials in mocks
- [ ] Never log real card numbers (use test cards)
- [ ] Mocks disabled in production
- [ ] Test cards clearly documented
- [ ] Trigger map externalized
- [ ] Mock responses validated against real PSP docs

## Troubleshooting Guide

### Mock Doesn't Match Real PSP
1. Use Context7 to get latest PSP response format
2. Compare mock response to real PSP documentation
3. Search Episodic Memory for real response examples
4. Update mock to match exact structure

### Test Passes with Mock but Fails with Real PSP
1. Verify mock latency matches real PSP (check if timeout handling works)
2. Check for fields missing in mock that real PSP returns
3. Verify error codes match real PSP error codes
4. Test with real PSP sandbox to identify differences
