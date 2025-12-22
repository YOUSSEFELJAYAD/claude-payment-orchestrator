# Skill: Integrate Visa Cybersource

**Role:** sequential-reasoner (Gateway Specialist)
**Domain:** Payment Gateway Integration
**Objective:** Implement comprehensive Visa Cybersource REST API integration leveraging Context7 for real-time documentation, Serena for code analysis, Playwright for testing, Chrome for dashboard monitoring, with complete support for HMAC-SHA256 authentication, Flex Microform tokenization, Decision Manager fraud detection, and all payment operations (authorize, capture, void, refund, reversal).

## Available Capabilities

### MCP Servers
| Server | Usage in Cybersource Integration |
|--------|----------------------------------|
| **Serena** | Find Cybersource adapters, analyze HMAC signature generation, trace payment flows, search Decision Manager rules |
| **Context7** | Get latest Cybersource REST API v2 docs, Flex Microform guides, Decision Manager patterns, error code reference |
| **Playwright** | Test Flex Microform tokenization, verify payment flows, E2E scenarios with fraud rules |
| **Chrome** | Monitor Cybersource Business Center, verify transactions, check Decision Manager outcomes |
| **Episodic Memory** | Recall past Cybersource signature issues, fraud rule configurations, integration decisions |

### Superpowers Skills
| Skill | Cybersource-Specific Trigger |
|-------|------------------------------|
| `brainstorming` | Before designing Cybersource adapter or fraud detection flow |
| `systematic-debugging` | When diagnosing HMAC signature failures, Decision Manager rejections, API errors |
| `test-driven-development` | Before implementing Cybersource adapter methods |
| `verification-before-completion` | Before deploying Cybersource integration changes |
| `writing-plans` | For multi-phase Cybersource migration or fraud rule rollout |
| `subagent-driven-development` | Parallel implementation of adapter + Flex integration + webhooks |
| `requesting-code-review` | After implementing cryptographic or fraud-sensitive code |

### Specialized Agents
| Agent | Cybersource Use Case |
|-------|---------------------|
| `code-architect` | Design Cybersource adapter architecture, plan signature generation |
| `code-reviewer` | Review cryptographic implementation, fraud detection logic |
| `silent-failure-hunter` | Find missing error handlers for API failures, silent fraud rejections |
| `pr-test-analyzer` | Verify Cybersource integration test coverage |

### Other Capabilities
- `elements-of-style:writing-clearly-and-concisely` - Cybersource API documentation
- `episodic-memory:remembering-conversations` - Past signature/fraud issues
- `dev-browser:dev-browser` - Test Flex Microform with persistent state
- WebSearch - Latest Cybersource API changes, security advisories
- TodoWrite - Track multi-phase Cybersource integration tasks

## Logic Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    CYBERSOURCE INTEGRATION WORKFLOW                           │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Phase 1: Discovery & Planning                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Episodic Memory → Context7 → Serena → Brainstorming         │            │
│  │ HMAC issues      REST API v2  Existing  Architecture        │            │
│  │ Fraud patterns   Flex docs    adapters  design              │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 2: Implementation                                                      │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ TDD → HMAC Signature → Adapter Implementation               │            │
│  │ Tests  SHA-256 auth   AUTHORIZE/CAPTURE                     │            │
│  │ first  HTTP headers   VOID/REFUND/REVERSAL                  │            │
│  │                       Flex Microform integration             │            │
│  │                       Decision Manager rules                 │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 3: Testing                                                             │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Playwright → Chrome Dashboard → Silent Failure Hunter       │            │
│  │ Flex tests  Business Center   Error handling               │            │
│  │ E2E flows   DM outcomes       gaps                          │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 4: Review & Deploy                                                     │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Code Review → Verification → Finishing                      │            │
│  │ Crypto audit All tests pass Merge/PR                        │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  Cybersource API Flow:                                                        │
│  Request → HMAC Signature → API Call → Decision Manager → Authorization      │
│          ↓                 ↓          ↓                 ↓                    │
│      Merchant ID      Headers    Fraud check      Payment                    │
│      Shared Secret    Digest     Risk score       Processing                 │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Gateway Discovery
```typescript
// Step 1: Search for past Cybersource issues
const pastIssues = await mcp_episodic_memory.search({
  query: ["Cybersource", "HMAC", "signature", "Decision Manager"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Step 2: Get latest Cybersource REST API documentation
const cyberAPIDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "payments authorization capture void refund",
  mode: "code"
});

const hmacDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "http signature authentication HMAC SHA256",
  mode: "code"
});

const flexDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "flex microform tokenization",
  mode: "info"
});

const dmDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "decision manager fraud detection risk",
  mode: "info"
});

// Step 3: Analyze existing Cybersource code
const existingAdapter = await mcp_serena.find_symbol({
  name_path_pattern: "Cybersource",
  substring_matching: true,
  include_body: true,
  depth: 3
});

const signatureImpl = await mcp_serena.search_for_pattern({
  substring_pattern: "HMAC|signature|digest|SHA-?256",
  paths_include_glob: "**/*cybersource*.ts",
  context_lines_before: 5,
  context_lines_after: 10
});

// Step 4: Brainstorm architecture
// Invoke superpowers:brainstorming for design
```

### Phase 2: Implementation

#### HMAC Signature Generation
```typescript
import crypto from 'crypto';

export class CybersourceSignature {
  static generateSignature(
    method: string,
    resourcePath: string,
    body: any,
    merchantId: string,
    secretKey: string
  ): Record<string, string> {
    const timestamp = Date.now();
    const digest = this.generateDigest(JSON.stringify(body));

    const signatureParams = [
      `host: apitest.cybersource.com`,
      `date: ${new Date(timestamp).toUTCString()}`,
      `(request-target): ${method.toLowerCase()} ${resourcePath}`,
      `digest: SHA-256=${digest}`,
      `v-c-merchant-id: ${merchantId}`
    ].join('\n');

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(signatureParams)
      .digest('base64');

    return {
      'v-c-merchant-id': merchantId,
      'Date': new Date(timestamp).toUTCString(),
      'Host': 'apitest.cybersource.com',
      'Digest': `SHA-256=${digest}`,
      'Signature': this.buildSignatureHeader(signature, merchantId)
    };
  }

  private static generateDigest(payload: string): string {
    return crypto
      .createHash('sha256')
      .update(payload, 'utf8')
      .digest('base64');
  }

  private static buildSignatureHeader(signature: string, merchantId: string): string {
    return [
      `keyid="${merchantId}"`,
      `algorithm="HmacSHA256"`,
      `headers="host date (request-target) digest v-c-merchant-id"`,
      `signature="${signature}"`
    ].join(', ');
  }
}
```

#### Cybersource Adapter Implementation
```typescript
export class CybersourceAdapter implements IPaymentProvider {
  private readonly baseUrl: string;
  private readonly merchantId: string;
  private readonly secretKey: string;

  constructor(config: CybersourceConfig) {
    this.baseUrl = config.environment === 'production'
      ? 'https://api.cybersource.com'
      : 'https://apitest.cybersource.com';
    this.merchantId = config.merchantId;
    this.secretKey = config.secretKey;
  }

  async authorize(request: PaymentRequest): Promise<PaymentResponse> {
    const payload = {
      clientReferenceInformation: {
        code: request.orderId
      },
      processingInformation: {
        capture: false, // Auth only
        commerceIndicator: request.eciIndicator || 'internet'
      },
      paymentInformation: {
        card: {
          number: request.card.number,
          expirationMonth: request.card.expiryMonth.padStart(2, '0'),
          expirationYear: request.card.expiryYear,
          securityCode: request.card.cvv
        }
      },
      orderInformation: {
        amountDetails: {
          totalAmount: request.amount,
          currency: request.currency
        },
        billTo: request.billingAddress
      },
      // Enable Decision Manager
      riskInformation: {
        profile: {
          name: 'default'
        }
      }
    };

    const response = await this.makeRequest(
      'POST',
      '/pts/v2/payments',
      payload
    );

    return this.normalizeResponse(response);
  }

  async capture(request: CaptureRequest): Promise<PaymentResponse> {
    const payload = {
      clientReferenceInformation: {
        code: request.orderId
      },
      orderInformation: {
        amountDetails: {
          totalAmount: request.amount,
          currency: request.currency
        }
      }
    };

    const response = await this.makeRequest(
      'POST',
      `/pts/v2/payments/${request.authorizationId}/captures`,
      payload
    );

    return this.normalizeResponse(response);
  }

  async void(request: VoidRequest): Promise<PaymentResponse> {
    const payload = {
      clientReferenceInformation: {
        code: request.orderId
      }
    };

    const response = await this.makeRequest(
      'POST',
      `/pts/v2/payments/${request.authorizationId}/voids`,
      payload
    );

    return this.normalizeResponse(response);
  }

  async refund(request: RefundRequest): Promise<PaymentResponse> {
    const payload = {
      clientReferenceInformation: {
        code: request.orderId
      },
      orderInformation: {
        amountDetails: {
          totalAmount: request.amount,
          currency: request.currency
        }
      }
    };

    const response = await this.makeRequest(
      'POST',
      `/pts/v2/payments/${request.captureId}/refunds`,
      payload
    );

    return this.normalizeResponse(response);
  }

  private async makeRequest(
    method: string,
    path: string,
    body: any
  ): Promise<any> {
    const headers = CybersourceSignature.generateSignature(
      method,
      path,
      body,
      this.merchantId,
      this.secretKey
    );

    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new CybersourceError(responseData);
    }

    return responseData;
  }

  private normalizeResponse(cyberResponse: any): PaymentResponse {
    const status = cyberResponse.status;

    return {
      success: status === 'AUTHORIZED' || status === 'PENDING',
      transactionId: cyberResponse.id,
      authorizationCode: cyberResponse.processorInformation?.approvalCode,
      status: this.mapStatus(status),
      decisionManagerResult: cyberResponse.riskInformation,
      rawResponse: cyberResponse
    };
  }

  private mapStatus(cyberStatus: string): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      'AUTHORIZED': PaymentStatus.AUTHORIZED,
      'AUTHORIZED_RISK_DECLINED': PaymentStatus.DECLINED_FRAUD,
      'DECLINED': PaymentStatus.DECLINED,
      'PENDING_AUTHENTICATION': PaymentStatus.REQUIRES_3DS,
      'PENDING_REVIEW': PaymentStatus.PENDING_REVIEW,
      'REVERSED': PaymentStatus.REVERSED
    };
    return statusMap[cyberStatus] || PaymentStatus.FAILED;
  }
}
```

### Phase 3: Testing

#### Playwright E2E Testing with Flex Microform
```typescript
// Test Cybersource Flex Microform integration
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Wait for Flex Microform to load
await mcp_playwright.browser_wait_for({
  text: "Card Information"
});

// Flex Microform uses iframe, so we need to handle it
const snapshot = await mcp_playwright.browser_snapshot({});
console.log('Page structure:', snapshot);

// Fill payment form (Flex handles card data in iframe)
await mcp_playwright.browser_fill_form({
  fields: [
    {
      name: "Card Number",
      type: "textbox",
      ref: "flex-card-number",
      value: "4111111111111111" // Visa test card
    },
    {
      name: "Expiry",
      type: "textbox",
      ref: "flex-expiry",
      value: "12/25"
    },
    {
      name: "CVV",
      type: "textbox",
      ref: "flex-cvv",
      value: "123"
    }
  ]
});

// Submit payment
await mcp_playwright.browser_click({
  element: "Pay Now",
  ref: "submit-payment"
});

// Monitor network for Cybersource API calls
const networkRequests = await mcp_playwright.browser_network_requests({
  includeStatic: false
});

// Verify token generation
const flexTokenRequest = networkRequests.find(r =>
  r.url.includes('flex/v2/tokens')
);
console.log('Flex token generated:', flexTokenRequest?.status === 201);

// Verify payment authorization
const authRequest = networkRequests.find(r =>
  r.url.includes('/pts/v2/payments') && r.method === 'POST'
);
console.log('Payment authorized:', authRequest?.status === 201);

// Check Decision Manager outcome
await mcp_playwright.browser_wait_for({
  text: "Payment Successful",
  time: 5
});

// Check for fraud review
const hasFraudReview = await mcp_playwright.browser_wait_for({
  text: "Under Review",
  time: 2
}).catch(() => false);

if (hasFraudReview) {
  console.log('Transaction flagged for manual review');
}

// Verify no console errors
const consoleErrors = await mcp_playwright.browser_console_messages({
  level: "error"
});

if (consoleErrors.length > 0) {
  console.error('Console errors:', consoleErrors);
}

// Take screenshot
await mcp_playwright.browser_take_screenshot({
  filename: "cybersource-payment-success.png",
  fullPage: true
});
```

#### Chrome Business Center Monitoring
```typescript
// Navigate to Cybersource Business Center
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://businesscenter.cybersource.com"
});

// Login (if needed)
await mcp_chrome.use_browser({
  action: "await_element",
  selector: "#username"
});

// Navigate to transaction search
await mcp_chrome.use_browser({
  action: "click",
  selector: "a[href*='transactions']"
});

// Search for transaction
await mcp_chrome.use_browser({
  action: "type",
  selector: "#request-id",
  payload: "REQ-12345\n"
});

// Wait for results
await mcp_chrome.use_browser({
  action: "await_text",
  payload: "Transaction Details"
});

// Extract transaction status
const txStatus = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".transaction-status",
  payload: "text"
});

// Extract Decision Manager outcome
const dmOutcome = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".dm-decision",
  payload: "text"
});

// Extract risk score
const riskScore = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".risk-score",
  payload: "text"
});

// Take screenshot for verification
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "cybersource-tx-details.png"
});

console.log('Transaction verified:', {
  status: txStatus,
  dmOutcome,
  riskScore
});
```

### Phase 4: Review & Deploy
```typescript
// Invoke code review for cryptographic implementation
// Invoke pr-review-toolkit:code-reviewer

// Invoke silent failure hunter for error handling
// Invoke pr-review-toolkit:silent-failure-hunter

// Verify all tests pass
// Invoke superpowers:verification-before-completion

// Finish development
// Invoke superpowers:finishing-a-development-branch
```

## MCP Integration Examples

### Serena: Analyze Cybersource Code
```typescript
// Find signature generation implementation
const signatureCode = await mcp_serena.search_for_pattern({
  substring_pattern: "generateSignature|HMAC|SHA-?256",
  paths_include_glob: "**/*cybersource*.ts",
  context_lines_before: 10,
  context_lines_after: 20
});

// Find Decision Manager integration
const dmIntegration = await mcp_serena.search_for_pattern({
  substring_pattern: "riskInformation|decisionManager|fraud",
  relative_path: "src/adapters/cybersource"
});

// Get adapter interface
const adapterInterface = await mcp_serena.find_symbol({
  name_path_pattern: "IPaymentProvider",
  include_body: true
});

// Find Flex Microform implementation
const flexImpl = await mcp_serena.search_for_pattern({
  substring_pattern: "flex.*microform|tokenize",
  paths_include_glob: "**/*.ts"
});
```

### Context7: Get Cybersource Documentation
```typescript
// Get comprehensive REST API docs
const apiDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "REST API v2 payments operations",
  mode: "code"
});

// Get HMAC signature generation guide
const hmacGuide = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "HTTP signature HMAC SHA256 authentication headers",
  mode: "code"
});

// Get Flex Microform integration
const flexGuide = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "flex microform integration tokenization iframe",
  mode: "info"
});

// Get Decision Manager documentation
const dmDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "decision manager fraud detection rules profiles",
  mode: "info"
});

// Get error code reference
const errorDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/cybersource-rest-client-node",
  topic: "error codes reason codes response codes",
  mode: "info"
});
```

### Episodic Memory: Recall Past Issues
```typescript
// Search for signature failures
const signatureIssues = await mcp_episodic_memory.search({
  query: ["Cybersource", "HMAC", "signature", "invalid"],
  mode: "both",
  limit: 5
});

// Search for Decision Manager configurations
const dmConfigs = await mcp_episodic_memory.search({
  query: "Cybersource Decision Manager rules configuration",
  mode: "vector",
  after: "2024-01-01"
});

// Find Flex integration solutions
const flexSolutions = await mcp_episodic_memory.search({
  query: ["Flex Microform", "tokenization", "iframe"],
  mode: "both"
});

// Search for fraud rule patterns
const fraudPatterns = await mcp_episodic_memory.search({
  query: "Cybersource fraud velocity rules AVS CVV",
  mode: "text"
});
```

## API Endpoints Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Authorize | POST | `/pts/v2/payments` |
| Sale (Auth+Capture) | POST | `/pts/v2/payments` (with `capture: true`) |
| Capture | POST | `/pts/v2/payments/{id}/captures` |
| Void | POST | `/pts/v2/payments/{id}/voids` |
| Refund | POST | `/pts/v2/payments/{id}/refunds` |
| Reversal | POST | `/pts/v2/payments/{id}/reversals` |
| Token Creation | POST | `/tms/v2/tokens` |
| Flex Token | POST | `/flex/v2/tokens` |

## Cybersource-Specific Best Practices

### HMAC Signature Authentication
- Use HMAC-SHA256 algorithm (not SHA512)
- Include headers in exact order: host, date, (request-target), digest, v-c-merchant-id
- Generate digest from request body using SHA-256
- Use lowercase for (request-target): `post /pts/v2/payments`
- Signature must be regenerated for every request

### Flex Microform Integration
- Load Flex SDK from Cybersource CDN
- Use captureContext for iframe initialization
- Never access card data directly (PCI scope reduction)
- Implement token-based processing after successful tokenization
- Handle iframe communication events properly

### Decision Manager
- Enable by including `riskInformation` in request
- Default profile: `default` (configure in Business Center)
- Review scores: 0-100 (higher = riskier)
- Actions: ACCEPT, REVIEW, REJECT
- Always log DM decisions for audit trail

### Idempotency
- Use `clientReferenceInformation.code` as idempotency key
- Must be unique per transaction
- Prevents duplicate charges on network retries
- Cybersource deduplicates for 24 hours

### Error Handling
- Check `status` field: AUTHORIZED, DECLINED, INVALID_REQUEST, etc.
- Parse `errorInformation.reason` for specific error code
- Log `errorInformation.message` for debugging
- Implement retry logic for transient errors (5xx)
- Never retry declined transactions automatically

### Reversal Pattern
- Always void/reverse if authorization succeeds but local save fails
- Use within 30 minutes for reversals (not voids)
- Prevents merchant liability for failed transactions
- Critical for transaction integrity

### Testing Strategy
- Use test cards: 4111111111111111 (Visa success)
- Trigger Decision Manager: specific amounts or patterns
- Test signature generation independently
- Verify all headers in network tab
- Run Playwright tests for Flex integration

### Monitoring
- Track authorization rate (target: >95%)
- Monitor signature failures (<0.1%)
- Alert on Decision Manager REJECT spikes
- Track average response time (<1.5s)
- Log all declined transactions with reason codes

## Security Checklist

- [ ] Shared secret stored securely (environment variables)
- [ ] HMAC signature verified on every request
- [ ] TLS 1.2+ enforced
- [ ] Flex Microform used (no direct card handling)
- [ ] Decision Manager enabled for fraud detection
- [ ] No sensitive data logged (card numbers, secrets)
- [ ] Constant-time comparison for signatures
- [ ] Rate limiting on payment endpoints
- [ ] Idempotency keys prevent duplicate charges

## Troubleshooting Guide

### Signature Validation Fails
1. Search Episodic Memory for past signature issues
2. Use Context7 to verify current HMAC algorithm
3. Log signature components (headers, digest, params)
4. Verify header order matches documentation
5. Check date format (must be UTC string)
6. Test with curl to isolate issue

### Decision Manager Rejects Valid Transactions
1. Review DM rules in Business Center via Chrome
2. Check risk score and triggered rules
3. Adjust velocity rules if too aggressive
4. Whitelist known good customers
5. Use test mode to validate rules before production

### Flex Microform Not Loading
1. Check browser console via Playwright
2. Verify captureContext is valid (<15min expiry)
3. Confirm Flex SDK loaded from CDN
4. Check CSP headers allow Cybersource domain
5. Test with different browser/device

### Reversal Fails
1. Check if authorization is still valid (<30min)
2. Verify using correct transaction ID
3. Use void instead if outside reversal window
4. Check Business Center for transaction state
5. Ensure idempotency key matches original

### API Returns 401 Unauthorized
1. Verify merchant ID and secret key
2. Check signature generation logic
3. Confirm timestamp is current (not >5min old)
4. Test credentials in Business Center
5. Verify environment (test vs production)
