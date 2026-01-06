---
name: audit-cardholder-environment
description: Review and audit the Cardholder Data Environment (CDE) for PCI compliance
activation: Use when assessing PCI scope or auditing cardholder data handling
---

# Audit Cardholder Environment

**Role:** PCI Compliance Auditor
**Domain:** PCI DSS, Security Compliance
**Objective:** Identify and document all systems handling cardholder data

## Quick Start (TL;DR)

**Use when:** Assessing PCI scope or preparing for audit
**Key steps:** 1. Identify data flows  2. Map systems  3. Document boundaries
**Output:** CDE inventory and scope documentation

## Cardholder Data Elements

| Data Element | Storage Permitted | Protection Required |
|--------------|-------------------|---------------------|
| PAN (Primary Account Number) | Yes | Encrypt or truncate |
| Cardholder Name | Yes | Protect if stored with PAN |
| Service Code | Yes | Protect if stored with PAN |
| Expiration Date | Yes | Protect if stored with PAN |
| CVV/CVC | **NO** | Never store |
| PIN | **NO** | Never store |
| Full Magnetic Stripe | **NO** | Never store |

## Data Flow Mapping

```typescript
interface DataFlowNode {
  id: string;
  name: string;
  type: 'application' | 'database' | 'service' | 'network' | 'external';
  handlesCardholder: boolean;
  dataElements: ('pan' | 'name' | 'expiry' | 'cvv')[];
  encryptionMethod?: string;
  inScope: boolean;
}

interface DataFlow {
  source: DataFlowNode;
  destination: DataFlowNode;
  protocol: string;
  encrypted: boolean;
  dataElements: string[];
}
```

## Scope Assessment Checklist

### Systems in Scope
- [ ] Payment application servers
- [ ] Database servers storing cardholder data
- [ ] Web servers hosting payment pages
- [ ] API gateways processing payments
- [ ] Log servers containing cardholder data
- [ ] Backup systems with cardholder data
- [ ] Network devices in CDE

### Systems Potentially Out of Scope
- [ ] Servers using only tokenized data
- [ ] Systems behind proper segmentation
- [ ] Applications with no payment functionality

## Code Audit Patterns

```typescript
// Search for cardholder data patterns
const PAN_PATTERNS = [
  /\b(?:4[0-9]{12}(?:[0-9]{3})?)\b/,         // Visa
  /\b(?:5[1-5][0-9]{14})\b/,                   // Mastercard
  /\b(?:3[47][0-9]{13})\b/,                    // Amex
  /\b(?:6(?:011|5[0-9]{2})[0-9]{12})\b/,       // Discover
];

const CVV_PATTERNS = [
  /cvv/i,
  /cvc/i,
  /security.?code/i,
  /card.?verification/i,
];

async function auditCodeForCardholderData(codebase: string): Promise<Finding[]> {
  const findings: Finding[] = [];

  // Use Serena to search
  for (const pattern of PAN_PATTERNS) {
    const matches = await serena.search_for_pattern({
      substring_pattern: pattern.source,
      restrict_search_to_code_files: true,
    });
    findings.push(...matches.map(m => ({
      type: 'PAN_PATTERN',
      location: m.file,
      line: m.line,
      severity: 'high',
    })));
  }

  return findings;
}
```

## Documentation Template

```markdown
# Cardholder Data Environment Inventory

## Date: [Date]
## Assessor: [Name]

### 1. System Inventory

| System Name | Type | In Scope | Data Elements | Encryption |
|-------------|------|----------|---------------|------------|
| payment-api | App  | Yes      | PAN (tokenized) | N/A |
| card-vault  | DB   | Yes      | PAN, Expiry | AES-256 |

### 2. Data Flow Diagram

[Attach diagram]

### 3. Network Segmentation

| Zone | Purpose | Firewall Rules |
|------|---------|----------------|
| CDE  | Payment processing | Restricted ingress |
| Corp | General business | No CDE access |

### 4. Findings

| ID | Severity | Description | Remediation |
|----|----------|-------------|-------------|
| F1 | High     | CVV logged  | Remove logging |

### 5. Recommendations

1. [Recommendation 1]
2. [Recommendation 2]
```

## Related Skills

**This skill uses:**
- `verify-pci-scope` - Scope determination

**This skill is used by:**
- `certify-pci-readiness` - Certification prep

## Best Practices

- Update CDE inventory quarterly
- Document all data flows
- Verify segmentation controls
- Review access controls
- Test encryption implementations
