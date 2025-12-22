# Skill: Integrate MPGS Gateway

**Role:** sequential-reasoner (Gateway Specialist)
**Domain:** Payment Gateway Integration
**Objective:** Implement comprehensive Mastercard Payment Gateway Services (MPGS) integration leveraging Context7 for real-time API documentation, Serena for code analysis, Playwright for E2E testing, Chrome for dashboard monitoring, and systematic workflows for robust payment processing including Hosted Sessions, 3DS authentication, and multi-operation flows (authorize, capture, void, refund).

## Available Capabilities

### MCP Servers
| Server | Usage in MPGS Integration |
|--------|---------------------------|
| **Serena** | Find existing MPGS adapters, analyze payment flows, trace session handling, search webhook patterns |
| **Context7** | Get latest MPGS REST API v50+ docs, 3DS patterns, Hosted Session implementation guides |
| **Playwright** | Test Hosted Session flows, verify 3DS challenges, E2E payment scenarios, network monitoring |
| **Chrome** | Monitor MPGS Merchant Portal, verify transactions in real-time, extract dashboard metrics |
| **Episodic Memory** | Recall past MPGS integration issues, error pattern solutions, configuration decisions |

### Superpowers Skills
| Skill | MPGS-Specific Trigger |
|-------|----------------------|
| `brainstorming` | Before designing MPGS adapter architecture or 3DS flow |
| `systematic-debugging` | When diagnosing gateway timeouts, session failures, 3DS rejections |
| `test-driven-development` | Before implementing MPGS adapter methods |
| `verification-before-completion` | Before deploying MPGS integration changes |
| `writing-plans` | For multi-phase MPGS migration from legacy systems |
| `subagent-driven-development` | Parallel implementation of adapter + tests + webhooks |
| `requesting-code-review` | After implementing PCI-sensitive MPGS code |

### Specialized Agents
| Agent | MPGS Use Case |
|-------|--------------|
| `code-architect` | Design MPGS adapter architecture, plan session management |
| `code-reviewer` | Review PCI-sensitive payment code, authentication flows |
| `silent-failure-hunter` | Find swallowed MPGS gateway errors, missing error handlers |
| `pr-test-analyzer` | Verify MPGS integration test coverage completeness |

### Other Capabilities
- `elements-of-style:writing-clearly-and-concisely` - MPGS API documentation
- `episodic-memory:remembering-conversations` - Past MPGS integration issues
- `dev-browser:dev-browser` - Test payment flows with persistent browser state
- WebSearch - Latest MPGS API version changes, security updates
- TodoWrite - Track multi-phase MPGS integration tasks

## Logic Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                       MPGS INTEGRATION WORKFLOW                               │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Phase 1: Discovery & Planning                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Episodic Memory → Context7 → Serena → Brainstorming         │            │
│  │ Past issues      Latest docs  Existing   Design approach    │            │
│  │                              patterns                        │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 2: Implementation                                                      │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ TDD → Adapter Implementation → Webhook Handler              │            │
│  │ Tests  CREATE_SESSION        PAYMENT_RECEIVED               │            │
│  │ first  AUTHORIZE/CAPTURE     REFUND_COMPLETED               │            │
│  │        VOID/REFUND           3DS_CHALLENGE                  │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 3: Testing                                                             │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Playwright → Chrome Dashboard → Silent Failure Hunter       │            │
│  │ E2E flows   Verify tx status   Find error gaps             │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 4: Review & Deploy                                                     │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Code Review → Verification → Finishing                      │            │
│  │ Security     All tests pass  Merge/PR                       │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  MPGS API Flow:                                                               │
│  Request → Session Creation → 3DS Check → Authorization → Capture/Void       │
│          ↓                   ↓           ↓               ↓                   │
│      Credentials         Challenge    Payment         Ledger                 │
│      Basic Auth          Redirect     Processing      Update                 │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Gateway Discovery
```typescript
// Step 1: Search for past MPGS integration issues
const pastIssues = await mcp_episodic_memory.search({
  query: ["MPGS", "integration", "session timeout", "3DS"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Review past solutions and decisions
for (const issue of pastIssues) {
  console.log(`Found: ${issue.summary}`);
}

// Step 2: Get latest MPGS API documentation
const mpgsSessionDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "create session authenticate payer hosted checkout",
  mode: "code"
});

const mpgs3DSDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "3ds authentication challenge redirect",
  mode: "info"
});

const mpgsOperationsDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "authorize capture void refund operations",
  mode: "code"
});

// Step 3: Analyze existing payment adapters
const existingAdapters = await mcp_serena.find_symbol({
  name_path_pattern: "IPaymentProvider",
  substring_matching: true,
  include_body: true,
  depth: 3
});

// Find current MPGS implementation if exists
const mpgsAdapter = await mcp_serena.search_for_pattern({
  substring_pattern: "MPGS|Mastercard.*Gateway|MPGSAdapter",
  paths_include_glob: "**/*.ts",
  context_lines_before: 5,
  context_lines_after: 5
});

// Step 4: Brainstorm integration approach
// Invoke brainstorming skill to design architecture
```

### Phase 2: Implementation
```typescript
// Step 1: Write tests first (TDD)
// Invoke test-driven-development skill

// Step 2: Implement MPGS adapter
const adapterImplementation = `
export class MPGSAdapter implements IPaymentProvider {
  private readonly baseUrl: string;
  private readonly merchantId: string;
  private readonly apiPassword: string;

  constructor(config: MPGSConfig) {
    this.baseUrl = config.environment === 'production'
      ? 'https://api.mastercard.com/gateway/api'
      : 'https://test-gateway.mastercard.com/api';
    this.merchantId = config.merchantId;
    this.apiPassword = config.apiPassword;
  }

  async createSession(request: SessionRequest): Promise<SessionResponse> {
    const sessionPayload = {
      apiOperation: 'CREATE_CHECKOUT_SESSION',
      interaction: {
        operation: 'PURCHASE',
        returnUrl: request.returnUrl
      },
      order: {
        amount: request.amount,
        currency: request.currency,
        reference: request.orderId
      }
    };

    const response = await this.makeRequest(
      'POST',
      \`/api/rest/version/73/merchant/\${this.merchantId}/session\`,
      sessionPayload
    );

    return {
      sessionId: response.session.id,
      sessionVersion: response.session.version
    };
  }

  async authorize(request: PaymentRequest): Promise<PaymentResponse> {
    const payload = {
      apiOperation: 'AUTHORIZE',
      order: {
        amount: request.amount,
        currency: request.currency,
        reference: request.orderId
      },
      sourceOfFunds: {
        type: 'CARD',
        provided: {
          card: {
            number: request.card.number,
            expiry: {
              month: request.card.expiryMonth,
              year: request.card.expiryYear
            },
            securityCode: request.card.cvv
          }
        }
      },
      authentication: request.authenticationId ? {
        transactionId: request.authenticationId
      } : undefined
    };

    const response = await this.makeRequest(
      'PUT',
      \`/api/rest/version/73/merchant/\${this.merchantId}/order/\${request.orderId}/transaction/\${request.transactionId}\`,
      payload
    );

    return this.normalizeResponse(response);
  }

  async capture(request: CaptureRequest): Promise<PaymentResponse> {
    const payload = {
      apiOperation: 'CAPTURE',
      transaction: {
        amount: request.amount,
        currency: request.currency
      }
    };

    const response = await this.makeRequest(
      'PUT',
      \`/api/rest/version/73/merchant/\${this.merchantId}/order/\${request.orderId}/transaction/\${request.transactionId}\`,
      payload
    );

    return this.normalizeResponse(response);
  }

  private async makeRequest(method: string, path: string, body?: any) {
    const auth = Buffer.from(\`merchant.\${this.merchantId}:\${this.apiPassword}\`).toString('base64');

    const response = await fetch(\`\${this.baseUrl}\${path}\`, {
      method,
      headers: {
        'Authorization': \`Basic \${auth}\`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new MPGSError(await response.json());
    }

    return response.json();
  }

  private normalizeResponse(mpgsResponse: any): PaymentResponse {
    // Map MPGS-specific response to unified format
    const gatewayCode = mpgsResponse.response?.gatewayCode;

    return {
      success: gatewayCode === 'APPROVED',
      transactionId: mpgsResponse.transaction?.id,
      authorizationCode: mpgsResponse.response?.acquirerCode,
      status: this.mapStatus(gatewayCode),
      rawResponse: mpgsResponse
    };
  }

  private mapStatus(gatewayCode: string): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      'APPROVED': PaymentStatus.AUTHORIZED,
      'DECLINED': PaymentStatus.DECLINED,
      'PENDING': PaymentStatus.PENDING,
      'AUTHENTICATION_REQUIRED': PaymentStatus.REQUIRES_3DS
    };
    return statusMap[gatewayCode] || PaymentStatus.FAILED;
  }
}
`;

// Use Serena to insert the new adapter
await mcp_serena.write_file({
  relative_path: 'src/adapters/mpgs/MPGSAdapter.ts',
  content: adapterImplementation
});

// Step 3: Use subagents for parallel development
// Agent 1: Implement adapter
// Agent 2: Implement webhook handler
// Agent 3: Create integration tests
```

### Phase 3: Testing

#### Playwright E2E Testing
```typescript
// Test MPGS Hosted Session flow
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Wait for MPGS Hosted Session to load
await mcp_playwright.browser_wait_for({ text: "Card Number" });

// Take snapshot to understand ARIA structure
const snapshot = await mcp_playwright.browser_snapshot({});

// Fill payment form
await mcp_playwright.browser_fill_form({
  fields: [
    {
      name: "Card Number",
      type: "textbox",
      ref: "card-number",
      value: "5123456789012346" // MPGS test card
    },
    {
      name: "Expiry Date",
      type: "textbox",
      ref: "card-expiry",
      value: "05/25"
    },
    {
      name: "CVV",
      type: "textbox",
      ref: "card-cvv",
      value: "100"
    }
  ]
});

// Submit payment
await mcp_playwright.browser_click({
  element: "Pay Now",
  ref: "submit-payment"
});

// Monitor network requests to verify MPGS API calls
const networkRequests = await mcp_playwright.browser_network_requests({
  includeStatic: false
});

// Verify session creation
const sessionRequest = networkRequests.find(r =>
  r.url.includes('/session') && r.method === 'POST'
);
console.log('Session created:', sessionRequest?.status === 200);

// Check for 3DS challenge
const has3DS = await mcp_playwright.browser_wait_for({
  text: "Verify Your Identity",
  time: 3
}).catch(() => false);

if (has3DS) {
  // Handle 3DS challenge
  await mcp_playwright.browser_type({
    element: "OTP",
    ref: "3ds-code",
    text: "123456"
  });

  await mcp_playwright.browser_click({
    element: "Submit",
    ref: "3ds-submit"
  });
}

// Verify success
await mcp_playwright.browser_wait_for({
  text: "Payment Successful"
});

// Check console for errors
const consoleErrors = await mcp_playwright.browser_console_messages({
  level: "error"
});

if (consoleErrors.length > 0) {
  console.error('Console errors detected:', consoleErrors);
}

// Take final screenshot
await mcp_playwright.browser_take_screenshot({
  filename: "mpgs-payment-success.png",
  fullPage: true
});
```

#### Chrome Dashboard Monitoring
```typescript
// Navigate to MPGS Merchant Portal
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://merchant.mastercard.com/portal"
});

// Login (if not already authenticated)
await mcp_chrome.use_browser({
  action: "await_element",
  selector: "#username",
  timeout: 5000
});

// Search for recent transaction
await mcp_chrome.use_browser({
  action: "type",
  selector: "#order-search",
  payload: "ORD-12345\n" // \n submits the form
});

// Wait for results
await mcp_chrome.use_browser({
  action: "await_text",
  payload: "Transaction Details",
  timeout: 10000
});

// Extract transaction status
const status = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".transaction-status",
  payload: "text"
});

// Extract authorization code
const authCode = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".auth-code",
  payload: "text"
});

// Take screenshot for documentation
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "mpgs-dashboard-verification.png"
});

// Get full page content for analysis
const dashboardContent = await mcp_chrome.use_browser({
  action: "extract",
  payload: "markdown"
});

console.log('Transaction verified:', { status, authCode });
```

### Phase 4: Review & Deploy

```typescript
// Step 1: Run silent-failure-hunter to find error handling gaps
// Invoke pr-review-toolkit:silent-failure-hunter

// Step 2: Request code review
// Invoke superpowers:requesting-code-review

// Step 3: Verify all tests pass
// Invoke superpowers:verification-before-completion

// Step 4: Finish development
// Invoke superpowers:finishing-a-development-branch
```

## MCP Integration Examples

### Serena: Analyze Gateway Adapters
```typescript
// Find all payment provider implementations
const providers = await mcp_serena.find_symbol({
  name_path_pattern: "IPaymentProvider",
  substring_matching: true,
  depth: 2
});

// Get detailed MPGS adapter implementation
const mpgsImpl = await mcp_serena.find_symbol({
  name_path_pattern: "MPGSAdapter/authorize",
  include_body: true
});

// Find all webhook handlers
const webhookHandlers = await mcp_serena.search_for_pattern({
  substring_pattern: "webhook.*handler|processWebhook",
  paths_include_glob: "**/*.ts",
  context_lines_before: 3,
  context_lines_after: 10
});

// Find session management logic
const sessionLogic = await mcp_serena.search_for_pattern({
  substring_pattern: "createSession|CREATE_CHECKOUT_SESSION",
  relative_path: "src/adapters/mpgs"
});

// Analyze error handling patterns
const errorHandling = await mcp_serena.search_for_pattern({
  substring_pattern: "MPGSError|catch.*mpgs|gateway.*error",
  paths_include_glob: "**/*.ts"
});

// Read existing MPGS configuration
const config = await mcp_serena.read_file({
  relative_path: "src/config/mpgs.ts"
});
```

### Context7: Get PSP Documentation
```typescript
// Get comprehensive MPGS REST API documentation
const mpgsAPIDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "REST API version 73 operations",
  mode: "code"
});

// Get Hosted Session implementation guide
const hostedSessionDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "hosted checkout session integration",
  mode: "info"
});

// Get 3DS 2.0 authentication patterns
const threeDSDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "3ds2 authentication initiate check",
  mode: "code"
});

// Get webhook signature verification
const webhookDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "webhook notification signature verification",
  mode: "code"
});

// Get error code reference
const errorCodes = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "response codes gateway codes acquirer codes",
  mode: "info"
});
```

### Episodic Memory: Recall Past Issues
```typescript
// Search for MPGS timeout issues
const timeoutIssues = await mcp_episodic_memory.search({
  query: ["MPGS", "timeout", "session expired"],
  mode: "both",
  limit: 5
});

// Search for 3DS integration problems
const threeDSIssues = await mcp_episodic_memory.search({
  query: "MPGS 3DS authentication failed challenge",
  mode: "vector",
  after: "2024-06-01"
});

// Find past configuration decisions
const configDecisions = await mcp_episodic_memory.search({
  query: ["MPGS", "configuration", "merchant ID", "API version"],
  mode: "both",
  limit: 3
});

// Search for webhook handling solutions
const webhookSolutions = await mcp_episodic_memory.search({
  query: "MPGS webhook signature validation",
  mode: "text"
});

// Read full conversation about MPGS integration
const fullConversation = await mcp_episodic_memory.read({
  path: "/conversations/2024-11/mpgs-integration.jsonl",
  startLine: 1,
  endLine: 100
});
```

## Agent Dispatch Patterns

### Multi-Component MPGS Implementation
```typescript
// Dispatch parallel agents for simultaneous development
Task({
  content: "Implement MPGSAdapter with all CRUD operations",
  activeForm: "Implementing MPGS adapter",
  status: "in_progress"
}) → Agent 1

Task({
  content: "Create MPGS webhook handler with signature verification",
  activeForm: "Creating webhook handler",
  status: "pending"
}) → Agent 2

Task({
  content: "Write comprehensive MPGS integration tests",
  activeForm: "Writing integration tests",
  status: "pending"
}) → Agent 3

// All agents work in parallel
```

### Gateway Code Review Workflow
```typescript
// Dispatch specialized review agents
Task({
  subagent_type: "feature-dev:code-reviewer"
}) → Security review of payment code

Task({
  subagent_type: "pr-review-toolkit:silent-failure-hunter"
}) → Find missing error handlers

Task({
  subagent_type: "pr-review-toolkit:pr-test-analyzer"
}) → Verify test coverage
```

## API Endpoints Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Create Session | POST | `/api/rest/version/73/merchant/{mid}/session` |
| Update Session | PUT | `/api/rest/version/73/merchant/{mid}/session/{sid}` |
| Authorize | PUT | `/api/rest/version/73/merchant/{mid}/order/{oid}/transaction/{tid}` |
| Capture | PUT | Same as Authorize, `apiOperation: CAPTURE` |
| Void | PUT | Same as Authorize, `apiOperation: VOID` |
| Refund | PUT | Same as Authorize, `apiOperation: REFUND` |
| Verify Payment | GET | `/api/rest/version/73/merchant/{mid}/order/{oid}` |
| Initiate 3DS | POST | `/api/rest/version/73/merchant/{mid}/order/{oid}/transaction/{tid}` |

## MPGS-Specific Best Practices

### API Version Management
- Always use explicit version in URL: `/api/rest/version/73/...`
- Monitor MPGS changelog via Context7 for breaking changes
- Test version upgrades in sandbox before production

### Authentication
- Use Basic Auth: `merchant.{merchantId}:{apiPassword}`
- Never log credentials or include in error messages
- Rotate API passwords quarterly per PCI requirements

### 3DS Integration
- Always check `authentication.required` in response
- Store `authentication.transactionId` for authorize step
- Handle both frictionless and challenge flows
- Set `authentication.redirectResponseUrl` for browser flow

### Session Management
- Sessions expire after 30 minutes (configurable)
- Use `session.updateStatus` to check validity
- Include `interaction.returnUrl` for hosted checkout
- Validate `session.version` to prevent replay attacks

### Error Handling
- Check `response.gatewayCode` first (APPROVED/DECLINED/ERROR)
- Parse `response.acquirerCode` for ISO 8583 details
- Log `error.explanation` for debugging
- Implement exponential backoff for SYSTEM_ERROR responses

### Webhook Processing
- Verify signature using shared secret
- Implement idempotency check on `transaction.id`
- Process events: PAYMENT_RECEIVED, REFUND_COMPLETED, etc.
- Return 200 immediately, process asynchronously

### Testing Strategy
- Use MPGS test cards: 5123456789012346 (success)
- Test 3DS with amount triggers: X.31 for challenge flow
- Verify all operations in Merchant Portal via Chrome
- Run Playwright tests for every MPGS code change

### Monitoring
- Track authorization rate (target: >95%)
- Monitor average response time (<2s for authorize)
- Alert on session creation failures
- Log all declined transactions with codes

## Security Checklist

- [ ] Credentials stored in environment variables, not code
- [ ] TLS 1.2+ enforced for all MPGS communication
- [ ] Webhook signatures verified using constant-time comparison
- [ ] No card data logged or stored (use tokenization)
- [ ] PCI DSS scope minimized (use Hosted Session)
- [ ] Error messages don't leak sensitive information
- [ ] Rate limiting implemented on payment endpoints
- [ ] Idempotency keys prevent duplicate charges

## Troubleshooting Guide

### Session Creation Fails
1. Search Episodic Memory for past session issues
2. Use Context7 to verify current session API format
3. Check credentials via Chrome in Merchant Portal
4. Verify merchant ID format: `merchant.{mid}:{password}`
5. Test with curl to isolate client/server issue

### 3DS Challenge Not Appearing
1. Verify `authentication.redirectResponseUrl` is set
2. Check browser console via Playwright for JavaScript errors
3. Confirm 3DS is enabled in MPGS merchant settings
4. Test with amount trigger: X.31 to force challenge

### Authorization Declined
1. Use `diagnose-mpgs-failure` skill on raw response
2. Check `response.acquirerCode` for ISO reason
3. Verify 3DS was completed if required
4. Test with different test cards to isolate issue
5. Monitor dashboard via Chrome for decline patterns

### Webhook Not Received
1. Verify webhook URL is publicly accessible
2. Check signature validation logic
3. Use ngrok for local testing
4. Review MPGS webhook logs in Merchant Portal
5. Confirm event types are subscribed in settings
