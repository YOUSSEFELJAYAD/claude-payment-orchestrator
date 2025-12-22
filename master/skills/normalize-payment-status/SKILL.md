# Skill: Normalize Payment Status

**Role:** sequential-reasoner
**Domain:** Core Payments & Logic
**Objective:** Map disparate PSP-specific status strings to a unified, rigorous Platform Enum state machine, ensuring consistent status across all payment gateways using code analysis and comprehensive testing.

## Available Capabilities

| Category | Capability | Status Normalization Use Case |
|----------|-----------|-------------------------------|
| **MCP Servers** | | |
| Serena | Code Analysis | Find status mapping code, trace state transitions |
| Context7 | Documentation | PSP API documentation, status codes |
| Playwright | Testing | Automated status normalization tests |
| Chrome | Dashboard | Monitor status distribution, mapping errors |
| Episodic Memory | Mapping History | Recall status mapping issues, edge cases |
| **Superpowers** | | |
| systematic-debugging | Debug Mapping | Trace incorrect status mappings |
| test-driven-development | Test Mappings | Write tests for all PSP status codes |
| verification-before-completion | Verify Mappings | Confirm all statuses map correctly |
| **Agents** | | |
| fullstack-developer | Implementation | Implement status normalization logic |

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                STATUS NORMALIZATION WORKFLOW                             │
├─────────────────────────────────────────────────────────────────────────┤
│  1. RESEARCH      → Context7: Get PSP API status documentation          │
│  2. ANALYSIS      → Serena: Find existing status mapping code           │
│  3. MEMORY        → Episodic: Recall mapping issues, edge cases         │
│  4. INGEST        → Receive raw PSP status string                       │
│  5. LOOKUP        → Check PSP-specific dictionary                       │
│  6. MAP           → Convert to platform enum                            │
│  7. VALIDATE      → Ensure valid state transition                       │
│  8. RETURN        → Platform status enum                                │
│  9. TEST          → Playwright: Test all status mappings                │
│  10. MONITOR      → Chrome: Track unmapped statuses                     │
│  11. DOCUMENT     → Serena Memory: Store mapping decisions              │
└─────────────────────────────────────────────────────────────────────────┘
```

## Platform Status Enum

```typescript
enum PaymentStatus {
  AUTHORIZED = 'AUTHORIZED',    // Money held, not captured
  CAPTURED = 'CAPTURED',        // Money taken from card
  SETTLED = 'SETTLED',          // Money in merchant bank account
  FAILED = 'FAILED',            // Hard failure (invalid card, etc.)
  DECLINED = 'DECLINED',        // Soft failure (insufficient funds, etc.)
  VOIDED = 'VOIDED',            // Authorization reversed before capture
  REFUNDED = 'REFUNDED',        // Money returned to customer
  PENDING = 'PENDING',          // Async operation (3DS, manual review)
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED'  // Partial refund
}
```

## PSP Status Mappings

```typescript
const STATUS_MAPPINGS = {
  stripe: {
    'succeeded': 'CAPTURED',
    'requires_payment_method': 'PENDING',
    'requires_confirmation': 'PENDING',
    'requires_action': 'PENDING',
    'processing': 'PENDING',
    'canceled': 'VOIDED',
    'requires_capture': 'AUTHORIZED'
  },
  adyen: {
    'Authorised': 'AUTHORIZED',
    'Refused': 'DECLINED',
    'Error': 'FAILED',
    'Cancelled': 'VOIDED',
    'Received': 'PENDING',
    'RedirectShopper': 'PENDING'
  },
  mpgs: {
    'APPROVED': 'AUTHORIZED',
    'CAPTURED': 'CAPTURED',
    'DECLINED': 'DECLINED',
    'FAILED': 'FAILED',
    'VOIDED': 'VOIDED',
    'REFUNDED': 'REFUNDED',
    'PARTIALLY_REFUNDED': 'PARTIALLY_REFUNDED'
  },
  cybersource: {
    'AUTHORIZED': 'AUTHORIZED',
    'PENDING_AUTHENTICATION': 'PENDING',
    'AUTHORIZED_PENDING_REVIEW': 'PENDING',
    'DECLINED': 'DECLINED',
    'INVALID_REQUEST': 'FAILED',
    'REVERSED': 'VOIDED'
  }
};
```

## Workflow Integration

```typescript
// Status normalizer implementation
export class PaymentStatusNormalizer {
  normalize(psp: string, rawStatus: string, context?: any): PaymentStatus {
    const pspMap = STATUS_MAPPINGS[psp.toLowerCase()];

    if (!pspMap) {
      throw new Error(`Unknown PSP: ${psp}`);
    }

    const platformStatus = pspMap[rawStatus];

    if (!platformStatus) {
      // Log unmapped status for monitoring
      console.error(`Unmapped status for ${psp}: ${rawStatus}`);

      // Store in Serena memory for analysis
      this.logUnmappedStatus(psp, rawStatus, context);

      // Fallback logic based on context
      return this.inferStatus(rawStatus, context);
    }

    return platformStatus as PaymentStatus;
  }

  private inferStatus(rawStatus: string, context?: any): PaymentStatus {
    const lower = rawStatus.toLowerCase();

    // Inference rules (last resort)
    if (lower.includes('auth')) return PaymentStatus.AUTHORIZED;
    if (lower.includes('capture')) return PaymentStatus.CAPTURED;
    if (lower.includes('void') || lower.includes('cancel')) return PaymentStatus.VOIDED;
    if (lower.includes('refund')) return PaymentStatus.REFUNDED;
    if (lower.includes('decline') || lower.includes('refuse')) return PaymentStatus.DECLINED;
    if (lower.includes('pending') || lower.includes('processing')) return PaymentStatus.PENDING;

    // Conservative default
    return PaymentStatus.FAILED;
  }

  private logUnmappedStatus(psp: string, status: string, context: any) {
    // Implement logging/alerting
  }
}
```

## MCP Integration Examples

### Serena: Find Status Mapping Code

```typescript
// Find status normalizer
const normalizer = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentStatusNormalizer",
  include_body: true,
  depth: 2
});

// Find all status mapping dictionaries
const mappings = await mcp_serena.search_for_pattern({
  substring_pattern: "STATUS_MAPPINGS|statusMap|normalizeStatus",
  relative_path: "src"
});

// Document mappings
await mcp_serena.write_memory({
  memory_file_name: "status-mappings.md",
  content: `# Payment Status Mappings

## Platform Enum
AUTHORIZED, CAPTURED, SETTLED, FAILED, DECLINED, VOIDED, REFUNDED, PENDING, PARTIALLY_REFUNDED

## PSP Mappings
[Complete mapping table]
  `
});
```

### Context7: PSP Documentation

```typescript
// Stripe status documentation
const stripeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "PaymentIntent status",
  mode: "code"
});

// Adyen result codes
const adyenDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/adyen/adyen-node-api-library",
  topic: "resultCode payment response",
  mode: "code"
});
```

### Playwright: Test All Mappings

```typescript
// Test Stripe mappings
const stripeStatuses = ['succeeded', 'requires_capture', 'canceled'];

for (const status of stripeStatuses) {
  const result = await mcp_playwright.browser_run_code({
    code: `async () => {
      const normalizer = new PaymentStatusNormalizer();
      return normalizer.normalize('stripe', '${status}');
    }`
  });

  console.log(`Stripe ${status} →`, result);
}
```

### Episodic Memory: Mapping Issues

```typescript
// Recall past mapping issues
const mappingIssues = await mcp_episodic_memory.search({
  query: ["status mapping incorrect", "unknown status", "PSP status"],
  mode: "both",
  limit: 10
});
```

## Best Practices

### Complete Coverage

```typescript
// Test all PSP statuses
const allStatuses = {
  stripe: ['succeeded', 'requires_payment_method', 'requires_confirmation', ...],
  adyen: ['Authorised', 'Refused', 'Error', ...],
  mpgs: ['APPROVED', 'CAPTURED', 'DECLINED', ...],
  cybersource: ['AUTHORIZED', 'DECLINED', ...]
};

// Ensure 100% mapping coverage
```

### State Machine Validation

```typescript
// Valid state transitions
const VALID_TRANSITIONS = {
  PENDING: ['AUTHORIZED', 'DECLINED', 'FAILED'],
  AUTHORIZED: ['CAPTURED', 'VOIDED', 'FAILED'],
  CAPTURED: ['REFUNDED', 'PARTIALLY_REFUNDED', 'SETTLED'],
  SETTLED: ['REFUNDED', 'PARTIALLY_REFUNDED'],
  // Terminal states cannot transition
  FAILED: [],
  DECLINED: [],
  VOIDED: [],
  REFUNDED: []
};
```

### Documentation

```typescript
await mcp_serena.write_memory({
  memory_file_name: "status-mapping-decisions.md",
  content: `
# Status Mapping Decisions

## Edge Cases
- **Stripe "canceled"**: Maps to VOIDED (not DECLINED)
- **Adyen "Received"**: Maps to PENDING (payment received, processing)
- **MPGS "PARTIALLY_REFUNDED"**: Separate from REFUNDED

## Rationale
- AUTHORIZED vs CAPTURED: AUTHORIZED = held, CAPTURED = taken
- DECLINED vs FAILED: DECLINED = soft (retry possible), FAILED = hard (no retry)
- VOIDED vs REFUNDED: VOIDED = pre-capture reversal, REFUNDED = post-capture return
  `
});
```
