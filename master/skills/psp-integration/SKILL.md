# Skill: PSP Integration

**Role:** sequential-reasoner (Gateway Specialist)
**Domain:** Payment Gateway Integration
**Objective:** Design and implement standardized Payment Service Provider (PSP) adapter architecture using IPaymentProvider interface pattern, enabling seamless integration of multiple gateways (Stripe, Adyen, Cybersource, MPGS, etc.) with unified request/response normalization, comprehensive error mapping, and leveraging Context7 for multi-PSP documentation, Serena for adapter analysis, and systematic testing workflows.

## Available Capabilities

### MCP Servers
| Server | Usage in PSP Integration |
|--------|--------------------------|
| **Serena** | Analyze existing adapters, find interface implementations, trace payment flows across PSPs |
| **Context7** | Get documentation for multiple PSPs (Stripe, Adyen, PayPal, etc.), compare API patterns |
| **Playwright** | Test multi-PSP payment flows, verify adapter switching, E2E integration scenarios |
| **Chrome** | Monitor multiple PSP dashboards, verify cross-gateway transactions |
| **Episodic Memory** | Recall adapter design patterns, past integration decisions, error mapping strategies |

### Superpowers Skills
| Skill | PSP Integration Trigger |
|-------|------------------------|
| `brainstorming` | Before designing adapter architecture or routing strategy |
| `systematic-debugging` | When diagnosing adapter failures, routing issues |
| `test-driven-development` | Before implementing new PSP adapters |
| `verification-before-completion` | Before deploying multi-PSP changes |
| `writing-plans` | For complex multi-PSP migration projects |
| `subagent-driven-development` | Parallel implementation of multiple PSP adapters |
| `requesting-code-review` | After implementing adapter pattern or factory logic |

### Specialized Agents
| Agent | PSP Integration Use Case |
|-------|-------------------------|
| `code-architect` | Design adapter pattern, factory pattern, routing logic |
| `code-reviewer` | Review adapter implementations for consistency |
| `silent-failure-hunter` | Find missing error handlers across adapters |
| `pr-test-analyzer` | Verify adapter test coverage completeness |

### Other Capabilities
- `elements-of-style:writing-clearly-and-concisely` - Adapter documentation
- `episodic-memory:remembering-conversations` - Past adapter design decisions
- `dev-browser:dev-browser` - Test payment flows across PSPs
- WebSearch - Latest PSP API changes and new providers
- TodoWrite - Track multi-PSP integration tasks

## Logic Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                      PSP ADAPTER INTEGRATION WORKFLOW                         │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Phase 1: Architecture Design                                                │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Episodic Memory → Context7 → Brainstorming → Code Architect │            │
│  │ Past patterns    Multi-PSP   Design        Interface         │            │
│  │                  docs        approach      definition        │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 2: Interface Definition                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ IPaymentProvider Interface                                   │            │
│  │ ├─ authorize(request) → PaymentResponse                      │            │
│  │ ├─ capture(request) → PaymentResponse                        │            │
│  │ ├─ void(request) → PaymentResponse                           │            │
│  │ ├─ refund(request) → PaymentResponse                         │            │
│  │ └─ normalizeResponse() → Unified format                      │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 3: Adapter Implementation                                             │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Subagent 1: StripeAdapter    implements IPaymentProvider    │            │
│  │ Subagent 2: AdyenAdapter     implements IPaymentProvider    │            │
│  │ Subagent 3: CybersourceAdapter implements IPaymentProvider  │            │
│  │ Subagent 4: MPGSAdapter      implements IPaymentProvider    │            │
│  │ (All parallel development)                                   │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 4: Factory & Router                                                    │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ PaymentProviderFactory.create(psp) → IPaymentProvider       │            │
│  │ SmartRouter.route(request) → Best PSP selection             │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 5: Testing & Verification                                              │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ TDD → Playwright E2E → Code Review → Verification           │            │
│  │ Unit  Multi-PSP       Consistency   All tests                │            │
│  │ tests flows           check         pass                     │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  Request Flow:                                                                │
│  Merchant → Router → Factory → Adapter → PSP API → Normalize → Response      │
│            ↓        ↓          ↓         ↓          ↓           ↓            │
│          Rules   Select    Map to     Gateway   Unified    Standard          │
│          Engine  PSP      PSP format  Call      format     response          │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Architecture Design
```typescript
// Step 1: Search for past adapter design decisions
const adapterPatterns = await mcp_episodic_memory.search({
  query: ["adapter pattern", "PSP integration", "payment provider"],
  mode: "both",
  limit: 10
});

// Step 2: Get documentation for multiple PSPs
const stripeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intents charge capture refund",
  mode: "code"
});

const adyenDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/adyen/adyen-node-api-library",
  topic: "payments authorise capture refund",
  mode: "code"
});

const paypalDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/paypal/paypal-rest-sdk",
  topic: "orders payments capture",
  mode: "code"
});

// Step 3: Analyze existing adapter implementations
const existingAdapters = await mcp_serena.find_symbol({
  name_path_pattern: "IPaymentProvider",
  substring_matching: true,
  include_body: true,
  depth: 3
});

const adapterImplementations = await mcp_serena.search_for_pattern({
  substring_pattern: "implements.*IPaymentProvider|extends.*BaseAdapter",
  paths_include_glob: "**/*.ts",
  context_lines_before: 10,
  context_lines_after: 30
});

// Step 4: Brainstorm architecture
// Invoke superpowers:brainstorming

// Step 5: Design with code architect
// Invoke feature-dev:code-architect
```

### Phase 2: Interface Definition

```typescript
// Standard PaymentRequest interface
export interface PaymentRequest {
  orderId: string;
  amount: string;
  currency: string;
  card?: CardDetails;
  token?: string;
  customerId?: string;
  metadata?: Record<string, any>;
  billingAddress?: Address;
  shippingAddress?: Address;
  returnUrl?: string;
  webhookUrl?: string;
}

// Unified PaymentResponse interface
export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  authorizationCode?: string;
  status: PaymentStatus;
  errorCode?: string;
  errorMessage?: string;
  requiresAction?: boolean;
  actionUrl?: string;
  rawResponse?: any;
}

// Payment status enum
export enum PaymentStatus {
  AUTHORIZED = 'AUTHORIZED',
  CAPTURED = 'CAPTURED',
  DECLINED = 'DECLINED',
  DECLINED_FRAUD = 'DECLINED_FRAUD',
  DECLINED_INSUFFICIENT_FUNDS = 'DECLINED_INSUFFICIENT_FUNDS',
  REQUIRES_3DS = 'REQUIRES_3DS',
  REQUIRES_ACTION = 'REQUIRES_ACTION',
  PENDING = 'PENDING',
  PENDING_REVIEW = 'PENDING_REVIEW',
  FAILED = 'FAILED',
  VOIDED = 'VOIDED',
  REFUNDED = 'REFUNDED',
  REVERSED = 'REVERSED'
}

// Core IPaymentProvider interface
export interface IPaymentProvider {
  // Payment operations
  authorize(request: PaymentRequest): Promise<PaymentResponse>;
  capture(request: CaptureRequest): Promise<PaymentResponse>;
  void(request: VoidRequest): Promise<PaymentResponse>;
  refund(request: RefundRequest): Promise<PaymentResponse>;

  // Query operations
  getTransaction(transactionId: string): Promise<PaymentResponse>;

  // Utility
  normalizeResponse(rawResponse: any): PaymentResponse;
  mapError(error: any): PaymentError;
}

// Base adapter class with common functionality
export abstract class BasePaymentAdapter implements IPaymentProvider {
  protected abstract baseUrl: string;
  protected abstract credentials: Record<string, string>;

  abstract authorize(request: PaymentRequest): Promise<PaymentResponse>;
  abstract capture(request: CaptureRequest): Promise<PaymentResponse>;
  abstract void(request: VoidRequest): Promise<PaymentResponse>;
  abstract refund(request: RefundRequest): Promise<PaymentResponse>;
  abstract getTransaction(transactionId: string): Promise<PaymentResponse>;

  protected async makeRequest(
    method: string,
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await response.json();

    if (!response.ok) {
      throw this.mapError(data);
    }

    return data;
  }

  abstract normalizeResponse(rawResponse: any): PaymentResponse;

  abstract mapError(error: any): PaymentError;

  protected logRequest(operation: string, request: any): void {
    console.log(`[${this.constructor.name}] ${operation}:`, {
      ...request,
      // Mask sensitive data
      card: request.card ? '***MASKED***' : undefined
    });
  }
}
```

### Phase 3: Adapter Implementation

#### Stripe Adapter Example
```typescript
export class StripeAdapter extends BasePaymentAdapter {
  protected baseUrl = 'https://api.stripe.com/v1';
  protected credentials: Record<string, string>;

  constructor(config: StripeConfig) {
    super();
    this.credentials = {
      secretKey: config.secretKey
    };
  }

  async authorize(request: PaymentRequest): Promise<PaymentResponse> {
    this.logRequest('authorize', request);

    const payload = {
      amount: Math.round(parseFloat(request.amount) * 100), // Stripe uses cents
      currency: request.currency.toLowerCase(),
      payment_method: request.token,
      capture_method: 'manual',
      metadata: {
        orderId: request.orderId,
        ...request.metadata
      },
      return_url: request.returnUrl
    };

    const response = await this.makeRequest(
      'POST',
      '/payment_intents',
      payload,
      {
        'Authorization': `Bearer ${this.credentials.secretKey}`
      }
    );

    return this.normalizeResponse(response);
  }

  async capture(request: CaptureRequest): Promise<PaymentResponse> {
    const payload = {
      amount_to_capture: Math.round(parseFloat(request.amount) * 100)
    };

    const response = await this.makeRequest(
      'POST',
      `/payment_intents/${request.authorizationId}/capture`,
      payload,
      {
        'Authorization': `Bearer ${this.credentials.secretKey}`
      }
    );

    return this.normalizeResponse(response);
  }

  normalizeResponse(stripeResponse: any): PaymentResponse {
    return {
      success: stripeResponse.status === 'succeeded' || stripeResponse.status === 'requires_capture',
      transactionId: stripeResponse.id,
      status: this.mapStatus(stripeResponse.status),
      requiresAction: stripeResponse.status === 'requires_action',
      actionUrl: stripeResponse.next_action?.redirect_to_url?.url,
      rawResponse: stripeResponse
    };
  }

  private mapStatus(stripeStatus: string): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      'requires_capture': PaymentStatus.AUTHORIZED,
      'succeeded': PaymentStatus.CAPTURED,
      'requires_payment_method': PaymentStatus.DECLINED,
      'requires_action': PaymentStatus.REQUIRES_3DS,
      'canceled': PaymentStatus.VOIDED,
      'processing': PaymentStatus.PENDING
    };
    return statusMap[stripeStatus] || PaymentStatus.FAILED;
  }

  mapError(error: any): PaymentError {
    const errorMap: Record<string, string> = {
      'card_declined': 'DECLINED',
      'insufficient_funds': 'DECLINED_INSUFFICIENT_FUNDS',
      'expired_card': 'DECLINED_EXPIRED_CARD',
      'incorrect_cvc': 'DECLINED_INVALID_CVV',
      'processing_error': 'GATEWAY_ERROR'
    };

    return new PaymentError(
      errorMap[error.code] || 'UNKNOWN_ERROR',
      error.message,
      error
    );
  }
}
```

#### Adyen Adapter Example
```typescript
export class AdyenAdapter extends BasePaymentAdapter {
  protected baseUrl: string;
  protected credentials: Record<string, string>;

  constructor(config: AdyenConfig) {
    super();
    this.baseUrl = config.environment === 'production'
      ? 'https://checkout-live.adyen.com/v70'
      : 'https://checkout-test.adyen.com/v70';
    this.credentials = {
      apiKey: config.apiKey,
      merchantAccount: config.merchantAccount
    };
  }

  async authorize(request: PaymentRequest): Promise<PaymentResponse> {
    this.logRequest('authorize', request);

    const payload = {
      amount: {
        value: Math.round(parseFloat(request.amount) * 100),
        currency: request.currency
      },
      reference: request.orderId,
      paymentMethod: {
        type: 'scheme',
        encryptedCardNumber: request.card?.encryptedNumber,
        encryptedExpiryMonth: request.card?.encryptedExpiryMonth,
        encryptedExpiryYear: request.card?.encryptedExpiryYear,
        encryptedSecurityCode: request.card?.encryptedSecurityCode
      },
      merchantAccount: this.credentials.merchantAccount,
      captureDelayHours: 0, // Manual capture
      returnUrl: request.returnUrl
    };

    const response = await this.makeRequest(
      'POST',
      '/payments',
      payload,
      {
        'X-API-Key': this.credentials.apiKey
      }
    );

    return this.normalizeResponse(response);
  }

  normalizeResponse(adyenResponse: any): PaymentResponse {
    return {
      success: adyenResponse.resultCode === 'Authorised',
      transactionId: adyenResponse.pspReference,
      status: this.mapStatus(adyenResponse.resultCode),
      requiresAction: adyenResponse.resultCode === 'RedirectShopper',
      actionUrl: adyenResponse.action?.url,
      rawResponse: adyenResponse
    };
  }

  private mapStatus(resultCode: string): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      'Authorised': PaymentStatus.AUTHORIZED,
      'Refused': PaymentStatus.DECLINED,
      'RedirectShopper': PaymentStatus.REQUIRES_3DS,
      'Pending': PaymentStatus.PENDING,
      'Cancelled': PaymentStatus.VOIDED
    };
    return statusMap[resultCode] || PaymentStatus.FAILED;
  }

  mapError(error: any): PaymentError {
    return new PaymentError(
      error.errorCode || 'UNKNOWN_ERROR',
      error.message,
      error
    );
  }
}
```

### Phase 4: Factory & Router Implementation

```typescript
// Payment Provider Factory
export class PaymentProviderFactory {
  private static providers: Map<string, IPaymentProvider> = new Map();

  static register(pspName: string, provider: IPaymentProvider): void {
    this.providers.set(pspName.toLowerCase(), provider);
  }

  static create(pspName: string, config?: any): IPaymentProvider {
    const pspKey = pspName.toLowerCase();

    // Return existing instance if available
    if (this.providers.has(pspKey)) {
      return this.providers.get(pspKey)!;
    }

    // Create new instance based on PSP name
    let provider: IPaymentProvider;

    switch (pspKey) {
      case 'stripe':
        provider = new StripeAdapter(config);
        break;
      case 'adyen':
        provider = new AdyenAdapter(config);
        break;
      case 'cybersource':
        provider = new CybersourceAdapter(config);
        break;
      case 'mpgs':
        provider = new MPGSAdapter(config);
        break;
      case 'paypal':
        provider = new PayPalAdapter(config);
        break;
      default:
        throw new Error(`Unsupported PSP: ${pspName}`);
    }

    this.providers.set(pspKey, provider);
    return provider;
  }

  static get(pspName: string): IPaymentProvider {
    const provider = this.providers.get(pspName.toLowerCase());
    if (!provider) {
      throw new Error(`Provider not initialized: ${pspName}`);
    }
    return provider;
  }
}

// Smart Router for PSP selection
export class SmartPaymentRouter {
  async route(request: PaymentRequest): Promise<string> {
    // Routing logic based on multiple factors
    const factors = {
      currency: request.currency,
      amount: parseFloat(request.amount),
      country: request.billingAddress?.country,
      cardBrand: request.card?.brand,
      merchantPreference: await this.getMerchantPreference()
    };

    // Example routing rules
    if (factors.currency === 'EUR' && factors.country === 'NL') {
      return 'adyen'; // Adyen for European transactions
    }

    if (factors.amount > 10000) {
      return 'cybersource'; // Cybersource for high-value
    }

    if (factors.currency === 'SGD' || factors.currency === 'MYR') {
      return 'mpgs'; // MPGS for APAC
    }

    return 'stripe'; // Default fallback
  }

  private async getMerchantPreference(): Promise<string> {
    // Load from configuration or database
    return 'stripe';
  }
}
```

### Phase 5: Testing

#### Playwright Multi-PSP Testing
```typescript
// Test payment flow across multiple PSPs
const psps = ['stripe', 'adyen', 'cybersource', 'mpgs'];

for (const psp of psps) {
  await mcp_playwright.browser_navigate({
    url: `http://localhost:3000/checkout?psp=${psp}`
  });

  await mcp_playwright.browser_fill_form({
    fields: [
      { name: "Card", type: "textbox", ref: "card", value: "4111111111111111" },
      { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
      { name: "CVV", type: "textbox", ref: "cvv", value: "123" }
    ]
  });

  await mcp_playwright.browser_click({
    element: "Pay",
    ref: "submit"
  });

  await mcp_playwright.browser_wait_for({
    text: "Success"
  });

  console.log(`${psp} payment flow: PASSED`);
}
```

#### Serena Adapter Analysis
```typescript
// Find all adapter implementations
const adapters = await mcp_serena.search_for_pattern({
  substring_pattern: "implements IPaymentProvider",
  paths_include_glob: "**/*.ts"
});

// Verify all implement required methods
for (const adapter of adapters) {
  const methods = await mcp_serena.find_symbol({
    name_path_pattern: `${adapter.name}/(authorize|capture|void|refund)`,
    include_body: true
  });

  console.log(`${adapter.name}: ${methods.length}/4 methods implemented`);
}
```

## MCP Integration Examples

### Serena: Analyze Adapter Patterns
```typescript
// Find interface definition
const paymentInterface = await mcp_serena.find_symbol({
  name_path_pattern: "IPaymentProvider",
  include_body: true
});

// Find all implementations
const implementations = await mcp_serena.search_for_pattern({
  substring_pattern: "implements IPaymentProvider|extends BasePaymentAdapter",
  paths_include_glob: "**/*.ts",
  context_lines_before: 5,
  context_lines_after: 50
});

// Find factory pattern usage
const factoryUsage = await mcp_serena.search_for_pattern({
  substring_pattern: "PaymentProviderFactory\\.create|getProvider",
  paths_include_glob: "**/*.ts"
});
```

### Context7: Multi-PSP Documentation
```typescript
// Get Stripe documentation
const stripeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intents authorize capture",
  mode: "code"
});

// Get Adyen documentation
const adyenDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/adyen/adyen-node-api-library",
  topic: "payments authorisation capture",
  mode: "code"
});

// Compare API patterns
console.log('Analyzing API differences...');
```

### Episodic Memory: Adapter Design Decisions
```typescript
// Search for past adapter implementations
const pastAdapters = await mcp_episodic_memory.search({
  query: ["adapter pattern", "payment provider", "factory"],
  mode: "both",
  limit: 10
});

// Search for routing decisions
const routingDecisions = await mcp_episodic_memory.search({
  query: "PSP routing strategy selection criteria",
  mode: "vector"
});
```

## Agent Dispatch Patterns

### Parallel Adapter Implementation
```typescript
Task({
  content: "Implement StripeAdapter with full IPaymentProvider interface",
  activeForm: "Implementing Stripe adapter",
  status: "in_progress"
}) → Agent 1

Task({
  content: "Implement AdyenAdapter with full IPaymentProvider interface",
  activeForm: "Implementing Adyen adapter",
  status: "pending"
}) → Agent 2

Task({
  content: "Implement PayPalAdapter with full IPaymentProvider interface",
  activeForm: "Implementing PayPal adapter",
  status: "pending"
}) → Agent 3
```

## Best Practices

### Interface Design
- Keep interface minimal and focused (SOLID principles)
- Use consistent method signatures across all adapters
- Return unified response format from all adapters
- Implement proper error mapping for each PSP

### Adapter Implementation
- Extend BasePaymentAdapter for common functionality
- Log all requests (with sensitive data masked)
- Implement idempotency at adapter level
- Handle PSP-specific quirks internally

### Factory Pattern
- Use singleton pattern for provider instances
- Support lazy initialization of adapters
- Allow runtime provider registration
- Throw clear errors for unsupported PSPs

### Error Handling
- Map all PSP-specific errors to unified error codes
- Preserve original error in `rawResponse` field
- Implement retry logic for transient errors
- Log all errors with correlation IDs

### Testing Strategy
- Write adapter tests using mock PSP responses
- Test factory creation for all supported PSPs
- Verify error mapping comprehensively
- Run E2E tests with actual PSP sandboxes

### Configuration Management
- Store credentials in environment variables
- Support multiple environments (sandbox, production)
- Allow per-PSP configuration overrides
- Validate configuration at startup

### Monitoring & Logging
- Track success rate per PSP
- Monitor response times per adapter
- Alert on provider-specific failures
- Log all declined transactions with codes

## Security Checklist

- [ ] All credentials stored securely (not in code)
- [ ] Sensitive data masked in logs
- [ ] TLS enforced for all PSP communication
- [ ] Input validation on all requests
- [ ] Error messages don't leak sensitive info
- [ ] Idempotency prevents duplicate charges
- [ ] Rate limiting on payment endpoints
- [ ] Audit trail for all transactions
