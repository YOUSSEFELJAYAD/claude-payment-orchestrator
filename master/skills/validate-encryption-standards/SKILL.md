---
name: validate-encryption-standards
description: Verify encryption implementations meet PCI DSS requirements
activation: Use when validating cryptographic implementations for PCI compliance
---

# Validate Encryption Standards

**Role:** Cryptography Compliance Specialist
**Domain:** PCI DSS, Encryption, Key Management
**Objective:** Ensure encryption meets PCI DSS requirements

## Quick Start (TL;DR)

**Use when:** Validating encryption for PCI compliance
**Key steps:** 1. Check algorithms  2. Verify key lengths  3. Review key management
**Output:** Encryption compliance report

## PCI DSS Encryption Requirements

### Approved Algorithms

| Purpose | Approved Algorithms | Min Key Length |
|---------|---------------------|----------------|
| Symmetric | AES | 128-bit (256 recommended) |
| Symmetric | TDEA (3DES) | 112-bit (deprecated) |
| Asymmetric | RSA | 2048-bit |
| Asymmetric | ECC | 224-bit |
| Hashing | SHA-2 (256, 384, 512) | N/A |
| Hashing | SHA-3 | N/A |

### Deprecated (Do Not Use)
- DES
- RC4
- MD5
- SHA-1 (for signatures)
- RSA < 2048-bit

## Encryption Validation Checklist

### Data at Rest
- [ ] AES-256 for stored cardholder data
- [ ] Keys stored separately from data
- [ ] Key encryption key (KEK) protection
- [ ] Hardware Security Module (HSM) for key storage

### Data in Transit
- [ ] TLS 1.2 or higher
- [ ] Strong cipher suites only
- [ ] Valid certificates
- [ ] Certificate pinning (mobile apps)

### Key Management
- [ ] Documented key lifecycle
- [ ] Split knowledge / dual control
- [ ] Key rotation schedule
- [ ] Secure key destruction

## Code Validation Patterns

```typescript
// Check for weak algorithms
const WEAK_ALGORITHMS = [
  /DES(?!3)/i,
  /RC4/i,
  /MD5/i,
  /SHA-?1(?![\d])/i,
  /createCipher\(/,  // Node.js deprecated
  /Blowfish/i,
];

const APPROVED_ALGORITHMS = [
  /AES-?256/i,
  /AES-?128/i,
  /createCipheriv\(/,  // Node.js approved
  /SHA-?256/i,
  /SHA-?384/i,
  /SHA-?512/i,
  /RSA.*2048/i,
  /RSA.*4096/i,
];

async function validateEncryption(): Promise<ValidationResult> {
  const findings: Finding[] = [];

  // Search for weak algorithms
  for (const pattern of WEAK_ALGORITHMS) {
    const matches = await serena.search_for_pattern({
      substring_pattern: pattern.source,
    });
    findings.push(...matches.map(m => ({
      severity: 'critical',
      type: 'WEAK_ALGORITHM',
      pattern: pattern.source,
      ...m,
    })));
  }

  return { findings, passed: findings.length === 0 };
}
```

## TLS Configuration Validation

```typescript
// Check TLS configuration
interface TLSConfig {
  minVersion: 'TLSv1.2' | 'TLSv1.3';
  cipherSuites: string[];
  certificateValid: boolean;
  certificateExpiry: Date;
}

const APPROVED_CIPHER_SUITES = [
  'TLS_AES_256_GCM_SHA384',
  'TLS_AES_128_GCM_SHA256',
  'TLS_CHACHA20_POLY1305_SHA256',
  'ECDHE-RSA-AES256-GCM-SHA384',
  'ECDHE-RSA-AES128-GCM-SHA256',
];

const DEPRECATED_CIPHER_SUITES = [
  'TLS_RSA_WITH_AES_256_CBC_SHA',
  'TLS_RSA_WITH_3DES_EDE_CBC_SHA',
  'TLS_RSA_WITH_RC4_128_SHA',
];
```

## Key Management Validation

```typescript
interface KeyManagementAudit {
  keyInventory: KeyInfo[];
  rotationSchedule: RotationPolicy;
  accessControls: AccessControl[];
  destructionProcedure: boolean;
}

interface KeyInfo {
  keyId: string;
  algorithm: string;
  keyLength: number;
  purpose: string;
  createdAt: Date;
  expiresAt: Date;
  rotationDue: Date;
  custodians: string[];
}

function validateKeyManagement(audit: KeyManagementAudit): Finding[] {
  const findings: Finding[] = [];

  for (const key of audit.keyInventory) {
    // Check key length
    if (key.algorithm === 'AES' && key.keyLength < 128) {
      findings.push({
        severity: 'critical',
        keyId: key.keyId,
        issue: 'Key length below minimum',
      });
    }

    // Check expiration
    if (key.expiresAt < new Date()) {
      findings.push({
        severity: 'high',
        keyId: key.keyId,
        issue: 'Key expired',
      });
    }

    // Check rotation
    if (key.rotationDue < new Date()) {
      findings.push({
        severity: 'medium',
        keyId: key.keyId,
        issue: 'Key rotation overdue',
      });
    }
  }

  return findings;
}
```

## Related Skills

**This skill uses:**
- `audit-cardholder-environment` - CDE identification

**This skill is used by:**
- `certify-pci-readiness` - Final certification

## Best Practices

- Use AES-256 for new implementations
- Prefer GCM mode over CBC
- Store keys in HSM when possible
- Rotate keys annually at minimum
- Document all cryptographic decisions
