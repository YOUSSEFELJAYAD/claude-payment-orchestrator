---
name: certify-pci-readiness
description: Prepare and validate readiness for PCI DSS certification
activation: Use when preparing for PCI assessment or self-assessment questionnaire
---

# Certify PCI Readiness

**Role:** PCI Certification Coordinator
**Domain:** PCI DSS, Compliance Certification
**Objective:** Ensure organization is ready for PCI DSS certification

## Quick Start (TL;DR)

**Use when:** Preparing for PCI audit or SAQ
**Key steps:** 1. Complete all requirements  2. Gather evidence  3. Internal audit
**Output:** PCI-ready organization with documentation

## SAQ Types

| SAQ | Merchant Type | Requirements |
|-----|---------------|--------------|
| A | Card-not-present, fully outsourced | 22 questions |
| A-EP | E-commerce, partial outsource | 191 questions |
| B | Imprint or standalone dial-out | 41 questions |
| B-IP | Standalone IP terminals | 82 questions |
| C | Payment app connected to internet | 160 questions |
| C-VT | Web-based virtual terminal | 79 questions |
| D | All other merchants | 329 questions |
| D (SP) | Service providers | 329 questions |

## Readiness Checklist by Requirement

### Req 1: Firewall Configuration
- [ ] Firewall rules documented
- [ ] Network diagram current
- [ ] Rule review completed (last 6 months)
- [ ] Default deny configured
- [ ] DMZ properly configured

### Req 2: No Vendor Defaults
- [ ] Default passwords changed
- [ ] Unnecessary services disabled
- [ ] Security parameters documented
- [ ] Hardening standards applied

### Req 3: Protect Stored Data
- [ ] Data retention policy defined
- [ ] PAN rendered unreadable
- [ ] Encryption keys protected
- [ ] CVV/PIN never stored

### Req 4: Encrypt Transmission
- [ ] TLS 1.2+ only
- [ ] Strong ciphers configured
- [ ] Certificates valid
- [ ] No PAN in email/IM

### Req 5: Anti-Malware
- [ ] AV on all systems
- [ ] Regular updates configured
- [ ] Logs retained
- [ ] Periodic scans scheduled

### Req 6: Secure Development
- [ ] SDLC documented
- [ ] Code reviews performed
- [ ] Security training current
- [ ] Patch management process

### Req 7: Restrict Access
- [ ] Need-to-know enforced
- [ ] Access control system
- [ ] Default deny
- [ ] Documented access matrix

### Req 8: Unique IDs
- [ ] Unique user IDs
- [ ] MFA for remote access
- [ ] Password policy enforced
- [ ] Account lockout configured

### Req 9: Physical Access
- [ ] Facility entry controls
- [ ] Visitor procedures
- [ ] Media handling procedures
- [ ] Device inventory maintained

### Req 10: Logging
- [ ] Audit logs enabled
- [ ] Time sync configured
- [ ] Log retention (1 year)
- [ ] Daily log review

### Req 11: Security Testing
- [ ] Quarterly vulnerability scans
- [ ] Annual penetration test
- [ ] IDS/IPS configured
- [ ] File integrity monitoring

### Req 12: Security Policies
- [ ] Information security policy
- [ ] Annual risk assessment
- [ ] Security awareness training
- [ ] Incident response plan

## Evidence Collection

```typescript
interface PCIEvidence {
  requirement: string;
  evidenceType: 'document' | 'screenshot' | 'log' | 'config' | 'interview';
  description: string;
  dateCollected: Date;
  collector: string;
  filePath: string;
  notes?: string;
}

const evidenceMatrix: Record<string, string[]> = {
  'Req 1': [
    'Network diagram',
    'Firewall configuration export',
    'Rule review documentation',
    'Change management tickets',
  ],
  'Req 3': [
    'Data retention policy',
    'Encryption configuration',
    'Key management procedures',
    'Data discovery scan results',
  ],
  // ... for all 12 requirements
};
```

## Internal Audit Template

```markdown
# PCI DSS Internal Audit Report

## Executive Summary
- Assessment Date: [Date]
- Scope: [Systems in scope]
- Overall Status: [Compliant/Non-Compliant]

## Findings Summary
| Requirement | Status | Findings | Remediation Due |
|-------------|--------|----------|-----------------|
| Req 1       | Pass   | 0        | N/A             |
| Req 3       | Fail   | 2        | [Date]          |

## Detailed Findings

### Finding 1
- **Requirement:** 3.4
- **Severity:** High
- **Description:** [Description]
- **Evidence:** [Evidence]
- **Remediation:** [Steps]
- **Due Date:** [Date]

## Attestation
This assessment was conducted in accordance with PCI DSS v4.0.
```

## Timeline Template

```
12 Weeks Before Assessment:
├── Week 12: Scope validation
├── Week 11: Gap assessment
├── Week 10-8: Remediation
├── Week 7: Internal audit
├── Week 6-5: Evidence collection
├── Week 4: Documentation review
├── Week 3: Mock assessment
├── Week 2: Final remediation
├── Week 1: Assessor preparation
└── Assessment Week
```

## Related Skills

**This skill uses:**
- `verify-pci-scope` - Scope determination
- `audit-cardholder-environment` - CDE audit
- `validate-encryption-standards` - Encryption validation

## Best Practices

- Start preparation 3-6 months before assessment
- Maintain compliance year-round
- Use automated compliance tools
- Keep evidence organized and current
- Conduct quarterly internal reviews
