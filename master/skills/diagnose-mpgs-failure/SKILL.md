# Skill: Diagnose MPGS Failure

**Role:** sequential-reasoner (Gateway Specialist)
**Domain:** Payment Gateway Integration
**Objective:** Systematically analyze MPGS error responses, decode gatewayCode and acquirerCode combinations, map to actionable failure categories (soft/hard decline, system error), provide user-friendly messages, and recommend remediation strategies leveraging Context7 for error code reference, Serena for error handling analysis, Episodic Memory for past failure patterns, and systematic debugging workflows.

## Available Capabilities

### MCP Servers
| Server | Usage in MPGS Diagnosis |
|--------|------------------------|
| **Serena** | Find error handling logic, analyze failure response patterns, trace error mapping code |
| **Context7** | Get MPGS error code reference, gateway codes, acquirer codes documentation |
| **Playwright** | Reproduce failure scenarios in test environment |
| **Chrome** | Check MPGS Merchant Portal for detailed transaction logs |
| **Episodic Memory** | Recall past MPGS failures, successful resolutions, error patterns |

### Superpowers Skills
| Skill | MPGS Diagnosis Trigger |
|-------|------------------------|
| `brainstorming` | Before designing error handling strategy |
| `systematic-debugging` | When diagnosing complex MPGS failure scenarios |
| `test-driven-development` | Before implementing error handling |
| `verification-before-completion` | Before deploying error handling changes |
| `writing-plans` | For comprehensive error handling implementation |
| `subagent-driven-development` | N/A for diagnosis (single-focus task) |
| `requesting-code-review` | After implementing error mapping logic |

### Specialized Agents
| Agent | MPGS Diagnosis Use Case |
|-------|------------------------|
| `code-architect` | Design error handling architecture |
| `code-reviewer` | Review error mapping completeness |
| `silent-failure-hunter` | Find swallowed MPGS errors |
| `pr-test-analyzer` | Verify error scenario test coverage |

### Other Capabilities
- `elements-of-style:writing-clearly-and-concisely` - Error message writing
- `episodic-memory:remembering-conversations` - Past MPGS error resolutions
- `dev-browser:dev-browser` - Test error scenarios
- WebSearch - Latest MPGS error code updates
- TodoWrite - Track error handling implementation tasks

## Logic Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                       MPGS FAILURE DIAGNOSIS WORKFLOW                         │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Phase 1: Error Response Analysis                                            │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Extract Error Fields                                         │            │
│  │ ├─ response.gatewayCode (APPROVED/DECLINED/ERROR)           │            │
│  │ ├─ response.acquirerCode (ISO 8583: 00, 05, 51, etc.)       │            │
│  │ ├─ error.cause (INVALID_REQUEST, SYSTEM_ERROR, etc.)        │            │
│  │ └─ error.explanation (Human readable description)           │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 2: Error Categorization                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Classify Error Type                                          │            │
│  │ ├─ SOFT_DECLINE → Retriable (51, 05, timeout)               │            │
│  │ ├─ HARD_DECLINE → Non-retriable (54, 57, 14)                │            │
│  │ ├─ SYSTEM_ERROR → Gateway/config issue                      │            │
│  │ ├─ REQUIRES_ACTION → 3DS, CVV retry                         │            │
│  │ └─ FRAUD_RISK → Risk/fraud rejection                        │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 3: Code Mapping                                                        │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Map to Internal Status                                       │            │
│  │ ├─ 00 → APPROVED                                             │            │
│  │ ├─ 51 → DECLINED_INSUFFICIENT_FUNDS                          │            │
│  │ ├─ 05 → DECLINED_DO_NOT_HONOR                                │            │
│  │ ├─ 54 → DECLINED_EXPIRED_CARD                                │            │
│  │ ├─ 14 → DECLINED_INVALID_CARD                                │            │
│  │ └─ SYSTEM_ERROR → GATEWAY_ERROR                              │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 4: User Message Generation                                            │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Create User-Friendly Message                                 │            │
│  │ ├─ 51 → "Insufficient funds. Try another card."             │            │
│  │ ├─ 05 → "Payment declined. Contact your bank."              │            │
│  │ ├─ 54 → "Card expired. Please update."                      │            │
│  │ └─ SYSTEM_ERROR → "Please try again later."                 │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 5: Remediation Recommendation                                          │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Suggest Next Steps                                           │            │
│  │ ├─ SOFT_DECLINE → Retry with exponential backoff            │            │
│  │ ├─ HARD_DECLINE → Prompt for different card                 │            │
│  │ ├─ 3DS_REQUIRED → Enable 3DS authentication                 │            │
│  │ └─ SYSTEM_ERROR → Log + alert engineering                   │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  Diagnosis Flow:                                                              │
│  MPGS Response → Parse Codes → Categorize → Map Status → User Message →      │
│  Remediation Recommendation                                                   │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Error Code Discovery
```typescript
// Step 1: Search for past MPGS error patterns
const pastErrors = await mcp_episodic_memory.search({
  query: ["MPGS error", "gatewayCode", "acquirerCode", "declined"],
  mode: "both",
  limit: 10
});

// Step 2: Get MPGS error code documentation
const errorCodeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "error codes response codes gateway codes acquirer codes",
  mode: "info"
});

const gatewayCodeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "gatewayCode values APPROVED DECLINED ERROR PENDING",
  mode: "info"
});

const acquirerCodeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "ISO 8583 response codes 00 05 51 54 57",
  mode: "info"
});

// Step 3: Analyze existing error handling
const errorHandlers = await mcp_serena.search_for_pattern({
  substring_pattern: "diagnose.*mpgs|mpgs.*error|gateway.*code",
  paths_include_glob: "**/*.ts",
  context_lines_before: 10,
  context_lines_after: 20
});
```

### Phase 2: Error Diagnosis Implementation

#### MPGS Error Analyzer
```typescript
export class MPGSErrorAnalyzer {
  diagnose(mpgsResponse: any): DiagnosisResult {
    // Step 1: Extract error fields
    const errorContext = this.extractErrorContext(mpgsResponse);

    // Step 2: Categorize error
    const category = this.categorizeError(errorContext);

    // Step 3: Map to internal status
    const internalStatus = this.mapToInternalStatus(errorContext);

    // Step 4: Generate user message
    const userMessage = this.generateUserMessage(errorContext, category);

    // Step 5: Recommend remediation
    const remediation = this.recommendRemediation(category, errorContext);

    return {
      category,
      internalStatus,
      userMessage,
      remediation,
      errorContext,
      retryable: category === 'SOFT_DECLINE' || category === 'SYSTEM_ERROR'
    };
  }

  private extractErrorContext(response: any): ErrorContext {
    return {
      gatewayCode: response.response?.gatewayCode,
      acquirerCode: response.response?.acquirerCode,
      acquirerMessage: response.response?.acquirerMessage,
      errorCause: response.error?.cause,
      errorExplanation: response.error?.explanation,
      errorField: response.error?.field,
      errorValidationCode: response.error?.validationCode,
      result: response.result,
      transactionId: response.transaction?.id,
      orderId: response.order?.reference
    };
  }

  private categorizeError(context: ErrorContext): ErrorCategory {
    const { gatewayCode, acquirerCode, errorCause } = context;

    // System/Configuration Errors
    if (gatewayCode === 'ERROR' || errorCause === 'SYSTEM_ERROR') {
      return 'SYSTEM_ERROR';
    }

    if (errorCause === 'INVALID_REQUEST') {
      return 'CONFIGURATION_ERROR';
    }

    // Check if 3DS required
    if (gatewayCode === 'PENDING' || gatewayCode === 'AUTHENTICATION_REQUIRED') {
      return 'REQUIRES_ACTION';
    }

    // Analyze acquirer code for decline type
    if (gatewayCode === 'DECLINED' && acquirerCode) {
      return this.categorizeByAcquirerCode(acquirerCode);
    }

    // Default to soft decline if unclear
    return 'SOFT_DECLINE';
  }

  private categorizeByAcquirerCode(acquirerCode: string): ErrorCategory {
    const softDeclineCodes = [
      '05',  // Do Not Honor
      '51',  // Insufficient Funds
      '61',  // Exceeds Withdrawal Limit
      '65',  // Exceeds Frequency Limit
      '91',  // Issuer Unavailable
      '96',  // System Error
    ];

    const hardDeclineCodes = [
      '04',  // Pick Up Card
      '07',  // Pick Up Card, Special Condition
      '14',  // Invalid Card Number
      '41',  // Lost Card
      '43',  // Stolen Card
      '54',  // Expired Card
      '57',  // Transaction Not Permitted
    ];

    const fraudCodes = [
      '59',  // Suspected Fraud
      '63',  // Security Violation
    ];

    if (hardDeclineCodes.includes(acquirerCode)) {
      return 'HARD_DECLINE';
    }

    if (fraudCodes.includes(acquirerCode)) {
      return 'FRAUD_RISK';
    }

    if (softDeclineCodes.includes(acquirerCode)) {
      return 'SOFT_DECLINE';
    }

    // Default to soft decline
    return 'SOFT_DECLINE';
  }

  private mapToInternalStatus(context: ErrorContext): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      // Gateway Codes
      'APPROVED': PaymentStatus.AUTHORIZED,
      'DECLINED': PaymentStatus.DECLINED,
      'ERROR': PaymentStatus.FAILED,
      'PENDING': PaymentStatus.PENDING,
      'AUTHENTICATION_REQUIRED': PaymentStatus.REQUIRES_3DS,

      // Acquirer Codes (specific cases)
      '00': PaymentStatus.AUTHORIZED,
      '05': PaymentStatus.DECLINED,
      '14': PaymentStatus.DECLINED_INVALID_CARD,
      '51': PaymentStatus.DECLINED_INSUFFICIENT_FUNDS,
      '54': PaymentStatus.DECLINED_EXPIRED_CARD,
      '57': PaymentStatus.DECLINED_NOT_PERMITTED,
      '59': PaymentStatus.DECLINED_FRAUD,
    };

    // Try gatewayCode first
    if (context.gatewayCode && statusMap[context.gatewayCode]) {
      return statusMap[context.gatewayCode];
    }

    // Try acquirerCode
    if (context.acquirerCode && statusMap[context.acquirerCode]) {
      return statusMap[context.acquirerCode];
    }

    // Default to FAILED
    return PaymentStatus.FAILED;
  }

  private generateUserMessage(context: ErrorContext, category: ErrorCategory): string {
    // Acquirer code specific messages
    const acquirerMessages: Record<string, string> = {
      '00': 'Payment successful.',
      '05': 'Payment declined by your bank. Please contact them for details.',
      '14': 'Invalid card number. Please check and try again.',
      '41': 'Card reported lost. Please use a different card.',
      '43': 'Card reported stolen. Please use a different card.',
      '51': 'Insufficient funds. Please try another card or payment method.',
      '54': 'This card has expired. Please use a different card.',
      '57': 'This transaction is not permitted. Please contact your bank.',
      '59': 'Transaction flagged for suspected fraud. Please contact your bank.',
      '61': 'Withdrawal limit exceeded. Please try a smaller amount or another card.',
      '65': 'Transaction frequency limit exceeded. Please try again later.',
      '91': 'Bank temporarily unavailable. Please try again in a few minutes.',
      '96': 'System error. Please try again.',
    };

    // Try specific acquirer code message
    if (context.acquirerCode && acquirerMessages[context.acquirerCode]) {
      return acquirerMessages[context.acquirerCode];
    }

    // Fallback to category-based messages
    const categoryMessages: Record<ErrorCategory, string> = {
      'SOFT_DECLINE': 'Payment declined. Please try again or use a different card.',
      'HARD_DECLINE': 'Payment cannot be processed with this card. Please use a different card.',
      'SYSTEM_ERROR': 'Payment system temporarily unavailable. Please try again in a moment.',
      'CONFIGURATION_ERROR': 'Payment configuration error. Please contact support.',
      'REQUIRES_ACTION': 'Additional authentication required. Redirecting...',
      'FRAUD_RISK': 'Transaction flagged for review. Please contact your bank.',
    };

    return categoryMessages[category] || 'Payment failed. Please try again.';
  }

  private recommendRemediation(
    category: ErrorCategory,
    context: ErrorContext
  ): RemediationRecommendation {
    const remediation: Record<ErrorCategory, RemediationRecommendation> = {
      'SOFT_DECLINE': {
        action: 'RETRY',
        strategy: 'exponential_backoff',
        maxRetries: 3,
        message: 'Retry payment with exponential backoff (2s, 4s, 8s)',
        enableFallback: true
      },
      'HARD_DECLINE': {
        action: 'REQUEST_NEW_CARD',
        strategy: 'prompt_user',
        message: 'Prompt user for different payment method',
        enableFallback: false
      },
      'SYSTEM_ERROR': {
        action: 'RETRY_LATER',
        strategy: 'exponential_backoff',
        maxRetries: 2,
        message: 'Retry after delay, alert engineering if persistent',
        enableFallback: true
      },
      'CONFIGURATION_ERROR': {
        action: 'ALERT_ENGINEERING',
        strategy: 'immediate',
        message: 'Alert engineering team immediately - configuration issue',
        enableFallback: false
      },
      'REQUIRES_ACTION': {
        action: 'ENABLE_3DS',
        strategy: 'redirect',
        message: 'Redirect to 3DS authentication flow',
        enableFallback: false
      },
      'FRAUD_RISK': {
        action: 'MANUAL_REVIEW',
        strategy: 'queue',
        message: 'Queue for manual fraud review, notify user of delay',
        enableFallback: false
      }
    };

    return remediation[category];
  }
}

// Type definitions
interface ErrorContext {
  gatewayCode?: string;
  acquirerCode?: string;
  acquirerMessage?: string;
  errorCause?: string;
  errorExplanation?: string;
  errorField?: string;
  errorValidationCode?: string;
  result?: string;
  transactionId?: string;
  orderId?: string;
}

type ErrorCategory =
  | 'SOFT_DECLINE'
  | 'HARD_DECLINE'
  | 'SYSTEM_ERROR'
  | 'CONFIGURATION_ERROR'
  | 'REQUIRES_ACTION'
  | 'FRAUD_RISK';

interface DiagnosisResult {
  category: ErrorCategory;
  internalStatus: PaymentStatus;
  userMessage: string;
  remediation: RemediationRecommendation;
  errorContext: ErrorContext;
  retryable: boolean;
}

interface RemediationRecommendation {
  action: string;
  strategy: string;
  maxRetries?: number;
  message: string;
  enableFallback: boolean;
}
```

#### Usage Example
```typescript
import { MPGSErrorAnalyzer } from './MPGSErrorAnalyzer';

const analyzer = new MPGSErrorAnalyzer();

// Example MPGS error response
const mpgsErrorResponse = {
  result: 'ERROR',
  response: {
    gatewayCode: 'DECLINED',
    acquirerCode: '51',
    acquirerMessage: 'Insufficient Funds'
  },
  transaction: {
    id: 'TXN-12345'
  },
  order: {
    reference: 'ORD-67890'
  }
};

// Diagnose the error
const diagnosis = analyzer.diagnose(mpgsErrorResponse);

console.log('Error Category:', diagnosis.category);
// Output: SOFT_DECLINE

console.log('User Message:', diagnosis.userMessage);
// Output: Insufficient funds. Please try another card or payment method.

console.log('Remediation:', diagnosis.remediation);
// Output: { action: 'RETRY', strategy: 'exponential_backoff', ... }

console.log('Retryable:', diagnosis.retryable);
// Output: true

// In your payment handler
if (diagnosis.retryable && diagnosis.remediation.strategy === 'exponential_backoff') {
  // Implement retry logic
  await retryPayment(diagnosis.remediation.maxRetries);
} else if (diagnosis.category === 'HARD_DECLINE') {
  // Prompt for new card
  await requestNewPaymentMethod(diagnosis.userMessage);
}
```

### Phase 3: Testing

#### Playwright Error Scenario Testing
```typescript
// Test all MPGS error scenarios
const errorScenarios = [
  { amount: '10.51', expectedCode: '51', expectedMessage: 'Insufficient funds' },
  { amount: '10.05', expectedCode: '05', expectedMessage: 'Payment declined' },
  { amount: '10.54', expectedCode: '54', expectedMessage: 'expired' },
  { amount: '10.14', expectedCode: '14', expectedMessage: 'Invalid card' },
];

for (const scenario of errorScenarios) {
  await mcp_playwright.browser_navigate({
    url: "http://localhost:3000/checkout"
  });

  await mcp_playwright.browser_fill_form({
    fields: [
      { name: "Amount", type: "textbox", ref: "amount", value: scenario.amount },
      { name: "Card", type: "textbox", ref: "card", value: "5123456789012346" },
      { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
      { name: "CVV", type: "textbox", ref: "cvv", value: "100" }
    ]
  });

  await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

  // Verify error message
  const hasError = await mcp_playwright.browser_wait_for({
    text: scenario.expectedMessage,
    time: 5
  });

  console.log(`Error scenario ${scenario.expectedCode}: ${hasError ? 'PASSED' : 'FAILED'}`);
}
```

#### Chrome Dashboard Verification
```typescript
// Verify error in MPGS Merchant Portal
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://merchant.mastercard.com/portal"
});

// Search for transaction
await mcp_chrome.use_browser({
  action: "type",
  selector: "#order-id",
  payload: "ORD-67890\n"
});

// Extract error details
const gatewayCode = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".gateway-code",
  payload: "text"
});

const acquirerCode = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".acquirer-code",
  payload: "text"
});

console.log('MPGS Portal verification:', { gatewayCode, acquirerCode });
```

## MCP Integration Examples

### Serena: Analyze Error Handling
```typescript
// Find error diagnosis logic
const diagnosisCode = await mcp_serena.search_for_pattern({
  substring_pattern: "diagnose.*error|categorize.*error|mpgs.*analyzer",
  paths_include_glob: "**/*.ts"
});

// Find error mapping
const errorMapping = await mcp_serena.search_for_pattern({
  substring_pattern: "acquirerCode.*map|gatewayCode.*status",
  paths_include_glob: "**/*.ts"
});
```

### Context7: Get Error Code Documentation
```typescript
// Get MPGS error code reference
const mpgsErrors = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "complete error code list gateway acquirer",
  mode: "info"
});

// Get ISO 8583 reference
const iso8583 = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "ISO 8583 response codes complete reference",
  mode: "info"
});
```

### Episodic Memory: Recall Past Errors
```typescript
// Search for past MPGS error resolutions
const pastResolutions = await mcp_episodic_memory.search({
  query: ["MPGS error 51", "insufficient funds", "resolution"],
  mode: "both",
  limit: 5
});

// Search for system error patterns
const systemErrors = await mcp_episodic_memory.search({
  query: "MPGS SYSTEM_ERROR gateway timeout",
  mode: "vector"
});
```

## MPGS Error Code Reference

### Gateway Codes
| Code | Meaning | Category |
|------|---------|----------|
| APPROVED | Transaction approved | SUCCESS |
| DECLINED | Transaction declined | SOFT/HARD_DECLINE |
| ERROR | System/configuration error | SYSTEM_ERROR |
| PENDING | Awaiting action | REQUIRES_ACTION |
| AUTHENTICATION_REQUIRED | 3DS required | REQUIRES_ACTION |

### Common Acquirer Codes (ISO 8583)
| Code | Meaning | Retry? |
|------|---------|--------|
| 00 | Approved | N/A |
| 05 | Do Not Honor | Yes |
| 14 | Invalid Card Number | No |
| 41 | Lost Card | No |
| 43 | Stolen Card | No |
| 51 | Insufficient Funds | Yes |
| 54 | Expired Card | No |
| 57 | Transaction Not Permitted | No |
| 59 | Suspected Fraud | No |
| 61 | Exceeds Withdrawal Limit | Yes |
| 91 | Issuer Unavailable | Yes |
| 96 | System Error | Yes |

## Best Practices

### Error Handling
- Always check `gatewayCode` first, then `acquirerCode`
- Log full error context (not just codes)
- Never expose raw error messages to users
- Implement exponential backoff for soft declines
- Alert on system errors immediately

### User Experience
- Provide clear, actionable error messages
- Suggest alternative payment methods for hard declines
- Show retry countdown for soft declines
- Never blame the customer in error messages
- Offer support contact for unclear errors

### Monitoring
- Track decline rates by acquirer code
- Alert on system error spikes
- Monitor soft vs hard decline ratio
- Track retry success rates
- Log all unrecognized error codes

## Troubleshooting Guide

### Unknown Acquirer Code
1. Search Episodic Memory for past occurrences
2. Use Context7 to get latest ISO 8583 reference
3. Check MPGS Merchant Portal for details
4. Default to SOFT_DECLINE category (safer)
5. Log for engineering investigation

### Conflicting Error Signals
1. Prioritize `gatewayCode` over `acquirerCode`
2. If `gatewayCode=ERROR`, always treat as SYSTEM_ERROR
3. If `errorCause=INVALID_REQUEST`, configuration issue
4. Check `error.explanation` for additional context

### High Decline Rate
1. Analyze decline distribution by acquirer code
2. Check for configuration issues (system errors)
3. Verify 3DS is enabled for high-risk transactions
4. Review fraud rules (may be too aggressive)
5. Compare against PSP dashboard metrics
