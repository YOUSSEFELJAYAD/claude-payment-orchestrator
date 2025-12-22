# Skill: Diagnose CyberSource Failure

**Role:** sequential-reasoner (Gateway Specialist)
**Domain:** Payment Gateway Integration
**Objective:** Systematically analyze CyberSource error responses, decode reasonCode and decision combinations, map to actionable failure categories (soft/hard decline, system error), provide user-friendly messages, and recommend remediation strategies leveraging Context7 for error code reference, Serena for error handling analysis, Episodic Memory for past failure patterns, and systematic debugging workflows.

## Available Capabilities

### MCP Servers
| Server | Usage in CyberSource Diagnosis |
|--------|-------------------------------|
| **Serena** | Find error handling logic, analyze failure response patterns, trace error mapping code |
| **Context7** | Get CyberSource reason codes, decision codes, error documentation |
| **Playwright** | Reproduce failure scenarios in test environment |
| **Chrome** | Check CyberSource Business Center for detailed transaction logs |
| **Episodic Memory** | Recall past CyberSource failures, successful resolutions, error patterns |

### Superpowers Skills
| Skill | CyberSource Diagnosis Trigger |
|-------|------------------------------|
| `brainstorming` | Before designing error handling strategy |
| `systematic-debugging` | When diagnosing complex CyberSource failure scenarios |
| `test-driven-development` | Before implementing error handling |
| `verification-before-completion` | Before deploying error handling changes |
| `writing-plans` | For comprehensive error handling implementation |
| `requesting-code-review` | After implementing error mapping logic |

### Specialized Agents
| Agent | CyberSource Diagnosis Use Case |
|-------|-------------------------------|
| `code-architect` | Design error handling architecture |
| `code-reviewer` | Review error mapping completeness |
| `silent-failure-hunter` | Find swallowed CyberSource errors |
| `pr-test-analyzer` | Verify error scenario test coverage |

## Logic Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                   CYBERSOURCE FAILURE DIAGNOSIS WORKFLOW                      │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Phase 1: Error Response Analysis                                            │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Extract Error Fields                                         │            │
│  │ ├─ decision (ACCEPT/REJECT/ERROR/REVIEW)                    │            │
│  │ ├─ reasonCode (100, 101, 102, 203, 204, etc.)               │            │
│  │ ├─ errorInformation.reason (field-specific errors)          │            │
│  │ └─ errorInformation.message (Human readable description)    │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 2: Error Categorization                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Classify Error Type                                          │            │
│  │ ├─ SOFT_DECLINE → Retriable (203, 204, 207, 236)            │            │
│  │ ├─ HARD_DECLINE → Non-retriable (202, 211, 231, 232)        │            │
│  │ ├─ SYSTEM_ERROR → Gateway/config issue (150, 151)           │            │
│  │ ├─ REQUIRES_ACTION → 3DS, AVS retry (475, 476)              │            │
│  │ └─ FRAUD_RISK → Decision Manager rejection (480, 481)       │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 3: Code Mapping                                                        │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Map to Internal Status                                       │            │
│  │ ├─ 100 → APPROVED                                            │            │
│  │ ├─ 203 → DECLINED_DO_NOT_HONOR                               │            │
│  │ ├─ 204 → DECLINED_INSUFFICIENT_FUNDS                         │            │
│  │ ├─ 211 → DECLINED_INVALID_CVV                                │            │
│  │ ├─ 202 → DECLINED_EXPIRED_CARD                               │            │
│  │ └─ 150 → GATEWAY_ERROR                                       │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 4: User Message Generation                                            │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Create User-Friendly Message                                 │            │
│  │ ├─ 204 → "Insufficient funds. Try another card."            │            │
│  │ ├─ 203 → "Payment declined. Contact your bank."             │            │
│  │ ├─ 202 → "Card expired. Please update."                     │            │
│  │ └─ 150 → "Please try again later."                          │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 5: Remediation Recommendation                                          │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Suggest Next Steps                                           │            │
│  │ ├─ SOFT_DECLINE → Retry with exponential backoff            │            │
│  │ ├─ HARD_DECLINE → Prompt for different card                 │            │
│  │ ├─ 3DS_REQUIRED → Enable Payer Authentication               │            │
│  │ └─ SYSTEM_ERROR → Log + alert engineering                   │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  Diagnosis Flow:                                                              │
│  CyberSource Response → Parse Codes → Categorize → Map Status → User Message │
│  → Remediation Recommendation                                                 │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Error Code Discovery
```typescript
// Step 1: Search for past CyberSource error patterns
const pastErrors = await mcp_episodic_memory.search({
  query: ["CyberSource error", "reasonCode", "decision", "declined"],
  mode: "both",
  limit: 10
});

// Step 2: Get CyberSource error code documentation
const errorCodeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/rest-client-node",
  topic: "error codes reason codes decision codes",
  mode: "info"
});

const reasonCodeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/rest-client-node",
  topic: "reasonCode values 100 200 203 204 211 231",
  mode: "info"
});

const decisionDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cybersource/rest-client-node",
  topic: "decision ACCEPT REJECT ERROR REVIEW",
  mode: "info"
});

// Step 3: Analyze existing error handling
const errorHandlers = await mcp_serena.search_for_pattern({
  substring_pattern: "diagnose.*cybersource|cybersource.*error|reason.*code",
  paths_include_glob: "**/*.ts",
  context_lines_before: 10,
  context_lines_after: 20
});
```

### Phase 2: Error Diagnosis Implementation

#### CyberSource Error Analyzer
```typescript
export class CyberSourceErrorAnalyzer {
  diagnose(cyberSourceResponse: any): DiagnosisResult {
    // Step 1: Extract error fields
    const errorContext = this.extractErrorContext(cyberSourceResponse);

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
      decision: response.status,
      reasonCode: response.processorInformation?.responseCode ||
                  response.errorInformation?.reason,
      avsCode: response.processorInformation?.avs?.code,
      cvvCode: response.processorInformation?.cardVerification?.resultCode,
      errorMessage: response.errorInformation?.message,
      errorDetails: response.errorInformation?.details,
      transactionId: response.id,
      reconciliationId: response.reconciliationId,
      processorTransactionId: response.processorInformation?.transactionId
    };
  }

  private categorizeError(context: ErrorContext): ErrorCategory {
    const { decision, reasonCode } = context;

    // System/Configuration Errors
    if (decision === 'ERROR' || ['150', '151', '152'].includes(reasonCode)) {
      return 'SYSTEM_ERROR';
    }

    // Check if 3DS required
    if (['475', '476', '478'].includes(reasonCode)) {
      return 'REQUIRES_ACTION';
    }

    // Decision Manager review
    if (decision === 'REVIEW' || ['480', '481'].includes(reasonCode)) {
      return 'FRAUD_RISK';
    }

    // Analyze reason code for decline type
    if (decision === 'REJECT' || decision === 'DECLINED') {
      return this.categorizeByReasonCode(reasonCode);
    }

    // Default to soft decline if unclear
    return 'SOFT_DECLINE';
  }

  private categorizeByReasonCode(reasonCode: string): ErrorCategory {
    const softDeclineCodes = [
      '203',  // General decline
      '204',  // Insufficient funds
      '207',  // Issuer unavailable
      '208',  // Inactive card
      '210',  // Credit limit reached
      '236',  // Processor failure
      '240',  // Card type not accepted
    ];

    const hardDeclineCodes = [
      '201',  // Call processor - bad check
      '202',  // Expired card
      '205',  // Stolen/lost card
      '211',  // Invalid CVV
      '221',  // Honor with ID - customer present
      '230',  // Invalid account number
      '231',  // Invalid account number
      '232',  // Invalid card type
      '233',  // General decline by processor
      '234',  // Processor problem
    ];

    const fraudCodes = [
      '200',  // AVS failed
      '520',  // Soft AVS decline
      '481',  // Decision Manager reject
    ];

    if (hardDeclineCodes.includes(reasonCode)) {
      return 'HARD_DECLINE';
    }

    if (fraudCodes.includes(reasonCode)) {
      return 'FRAUD_RISK';
    }

    if (softDeclineCodes.includes(reasonCode)) {
      return 'SOFT_DECLINE';
    }

    // Default to soft decline
    return 'SOFT_DECLINE';
  }

  private mapToInternalStatus(context: ErrorContext): PaymentStatus {
    const statusMap: Record<string, PaymentStatus> = {
      // Decision values
      'AUTHORIZED': PaymentStatus.AUTHORIZED,
      'ACCEPT': PaymentStatus.AUTHORIZED,
      'PENDING': PaymentStatus.PENDING,
      'DECLINED': PaymentStatus.DECLINED,
      'REJECT': PaymentStatus.DECLINED,
      'ERROR': PaymentStatus.FAILED,
      'REVIEW': PaymentStatus.PENDING_REVIEW,

      // Reason Codes
      '100': PaymentStatus.AUTHORIZED,
      '101': PaymentStatus.AUTHORIZATION_MISSING_FIELDS,
      '102': PaymentStatus.INVALID_DATA,
      '150': PaymentStatus.GATEWAY_ERROR,
      '151': PaymentStatus.GATEWAY_TIMEOUT,
      '200': PaymentStatus.DECLINED_AVS,
      '201': PaymentStatus.DECLINED,
      '202': PaymentStatus.DECLINED_EXPIRED_CARD,
      '203': PaymentStatus.DECLINED,
      '204': PaymentStatus.DECLINED_INSUFFICIENT_FUNDS,
      '205': PaymentStatus.DECLINED_STOLEN_CARD,
      '207': PaymentStatus.DECLINED_ISSUER_UNAVAILABLE,
      '211': PaymentStatus.DECLINED_INVALID_CVV,
      '231': PaymentStatus.DECLINED_INVALID_CARD,
      '475': PaymentStatus.REQUIRES_3DS,
      '476': PaymentStatus.REQUIRES_3DS,
      '480': PaymentStatus.DECLINED_FRAUD,
      '481': PaymentStatus.DECLINED_FRAUD,
    };

    // Try decision first
    if (context.decision && statusMap[context.decision]) {
      return statusMap[context.decision];
    }

    // Try reasonCode
    if (context.reasonCode && statusMap[context.reasonCode]) {
      return statusMap[context.reasonCode];
    }

    // Default to FAILED
    return PaymentStatus.FAILED;
  }

  private generateUserMessage(context: ErrorContext, category: ErrorCategory): string {
    // Reason code specific messages
    const reasonMessages: Record<string, string> = {
      '100': 'Payment successful.',
      '101': 'Missing required information. Please check your details.',
      '102': 'Invalid data provided. Please check your card details.',
      '150': 'Payment system temporarily unavailable. Please try again.',
      '200': 'Address verification failed. Please check your billing address.',
      '202': 'This card has expired. Please use a different card.',
      '203': 'Payment declined by your bank. Please contact them for details.',
      '204': 'Insufficient funds. Please try another card or payment method.',
      '205': 'This card cannot be used. Please use a different card.',
      '207': 'Bank temporarily unavailable. Please try again in a few minutes.',
      '211': 'Invalid security code (CVV). Please check and try again.',
      '231': 'Invalid card number. Please check and try again.',
      '232': 'This card type is not accepted. Please use a different card.',
      '475': 'Additional authentication required. Redirecting...',
      '476': 'Authentication required. Please complete verification.',
      '480': 'Transaction flagged for review. Please contact support.',
      '481': 'Transaction declined by fraud detection. Please contact support.',
    };

    // Try specific reason code message
    if (context.reasonCode && reasonMessages[context.reasonCode]) {
      return reasonMessages[context.reasonCode];
    }

    // Fallback to category-based messages
    const categoryMessages: Record<ErrorCategory, string> = {
      'SOFT_DECLINE': 'Payment declined. Please try again or use a different card.',
      'HARD_DECLINE': 'Payment cannot be processed with this card. Please use a different card.',
      'SYSTEM_ERROR': 'Payment system temporarily unavailable. Please try again in a moment.',
      'CONFIGURATION_ERROR': 'Payment configuration error. Please contact support.',
      'REQUIRES_ACTION': 'Additional authentication required. Redirecting...',
      'FRAUD_RISK': 'Transaction flagged for review. Please contact support.',
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
        message: 'Redirect to Payer Authentication (Cardinal Commerce) flow',
        enableFallback: false
      },
      'FRAUD_RISK': {
        action: 'MANUAL_REVIEW',
        strategy: 'queue',
        message: 'Queue for manual fraud review via Decision Manager, notify user of delay',
        enableFallback: false
      }
    };

    return remediation[category];
  }
}

// Type definitions
interface ErrorContext {
  decision?: string;
  reasonCode?: string;
  avsCode?: string;
  cvvCode?: string;
  errorMessage?: string;
  errorDetails?: any[];
  transactionId?: string;
  reconciliationId?: string;
  processorTransactionId?: string;
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
import { CyberSourceErrorAnalyzer } from './CyberSourceErrorAnalyzer';

const analyzer = new CyberSourceErrorAnalyzer();

// Example CyberSource error response
const cyberSourceErrorResponse = {
  id: 'TXN-12345',
  status: 'DECLINED',
  processorInformation: {
    responseCode: '204',
    avs: { code: 'Y' },
    cardVerification: { resultCode: 'M' }
  },
  reconciliationId: 'REC-67890'
};

// Diagnose the error
const diagnosis = analyzer.diagnose(cyberSourceErrorResponse);

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
  await retryPayment(diagnosis.remediation.maxRetries);
} else if (diagnosis.category === 'HARD_DECLINE') {
  await requestNewPaymentMethod(diagnosis.userMessage);
}
```

### Phase 3: Testing

#### Playwright Error Scenario Testing
```typescript
// Test all CyberSource error scenarios
const errorScenarios = [
  { card: '4000000000000002', expectedCode: '204', expectedMessage: 'Insufficient funds' },
  { card: '4000000000000069', expectedCode: '202', expectedMessage: 'expired' },
  { card: '4000000000000127', expectedCode: '211', expectedMessage: 'CVV' },
  { card: '4000000000000101', expectedCode: '203', expectedMessage: 'declined' },
];

for (const scenario of errorScenarios) {
  await mcp_playwright.browser_navigate({
    url: "http://localhost:3000/checkout"
  });

  await mcp_playwright.browser_fill_form({
    fields: [
      { name: "Card", type: "textbox", ref: "card", value: scenario.card },
      { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
      { name: "CVV", type: "textbox", ref: "cvv", value: "123" }
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
// Verify error in CyberSource Business Center
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://ebc2.cybersource.com/ebc2"
});

// Search for transaction
await mcp_chrome.use_browser({
  action: "type",
  selector: "#searchTransactionId",
  payload: "TXN-12345\n"
});

// Extract error details
const reasonCode = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".reason-code",
  payload: "text"
});

const decision = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".decision",
  payload: "text"
});

console.log('CyberSource Business Center verification:', { reasonCode, decision });
```

## CyberSource Error Code Reference

### Decision Values
| Decision | Meaning | Category |
|----------|---------|----------|
| AUTHORIZED | Transaction approved | SUCCESS |
| ACCEPT | Transaction approved | SUCCESS |
| DECLINED | Transaction declined | SOFT/HARD_DECLINE |
| REJECT | Transaction rejected | SOFT/HARD_DECLINE |
| ERROR | System/configuration error | SYSTEM_ERROR |
| REVIEW | Decision Manager review | FRAUD_RISK |
| PENDING | Awaiting action | REQUIRES_ACTION |

### Common Reason Codes
| Code | Meaning | Retry? |
|------|---------|--------|
| 100 | Successful transaction | N/A |
| 101 | Missing required fields | No (fix data) |
| 102 | Invalid data | No (fix data) |
| 150 | System error | Yes |
| 151 | Timeout | Yes |
| 200 | AVS failed | No |
| 202 | Expired card | No |
| 203 | General decline | Yes |
| 204 | Insufficient funds | Yes |
| 205 | Stolen/lost card | No |
| 207 | Issuer unavailable | Yes |
| 211 | Invalid CVV | No |
| 231 | Invalid account number | No |
| 232 | Invalid card type | No |
| 475 | 3DS required | N/A (redirect) |
| 476 | Payer authentication required | N/A (redirect) |
| 480 | Decision Manager review | No (manual) |
| 481 | Decision Manager reject | No |

## Best Practices

### Error Handling
- Always check `status` (decision) first, then `processorInformation.responseCode`
- Log full error context including AVS/CVV codes
- Never expose raw error messages to users
- Implement exponential backoff for soft declines
- Alert on system errors immediately (150, 151)

### User Experience
- Provide clear, actionable error messages
- Suggest alternative payment methods for hard declines
- Show retry countdown for soft declines
- Guide users through 3DS authentication smoothly
- Offer support contact for fraud-flagged transactions

### Monitoring
- Track decline rates by reason code
- Alert on system error spikes (150, 151)
- Monitor soft vs hard decline ratio
- Track 3DS completion rates
- Log all unrecognized reason codes
- Monitor Decision Manager review queue

## Troubleshooting Guide

### Unknown Reason Code
1. Search Episodic Memory for past occurrences
2. Use Context7 to get latest CyberSource documentation
3. Check CyberSource Business Center for details
4. Default to SOFT_DECLINE category (safer)
5. Log for engineering investigation

### High Decline Rate
1. Analyze decline distribution by reason code
2. Check for configuration issues (150, 151 errors)
3. Verify Payer Authentication is enabled for high-risk
4. Review Decision Manager rules (may be too aggressive)
5. Compare against CyberSource dashboard metrics

### 3DS Authentication Failures
1. Check Cardinal Commerce integration
2. Verify Payer Authentication setup
3. Review 475/476 response handling
4. Test with 3DS test cards
5. Check for browser/device compatibility issues
