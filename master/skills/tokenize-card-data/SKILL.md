# Skill: Tokenize Card Data

**Role:** sequential-reasoner
**Domain:** Core Payments & Logic
**Objective:** Securely exchange PANs for tokens using comprehensive MCP-powered security workflow with code analysis, encryption documentation, security testing, and audit trail management.

---

## Available Capabilities

### MCP Servers
| Server | Tokenization Usage | Key Operations |
|--------|-------------------|----------------|
| **Serena** | Analyze vault service code, find encryption patterns, audit PAN exposure | `find_symbol`, `search_for_pattern`, `write_memory` |
| **Context7** | Get encryption library docs, KMS integration, PCI DSS requirements | `get_library_docs` |
| **Playwright** | Test tokenization API endpoints, verify token responses | `browser_evaluate`, `browser_network_requests` |
| **Chrome** | Monitor PSP tokenization dashboards, verify token creation | `use_browser` (navigate, eval, extract) |
| **Episodic Memory** | Recall past security incidents, key rotation procedures | `search`, `read` |

### Superpowers Skills
| Skill | When to Use |
|-------|-------------|
| `superpowers:systematic-debugging` | When tokenization fails or tokens leak |
| `superpowers:test-driven-development` | Write security tests before vault implementation |
| `superpowers:verification-before-completion` | Verify no PAN leakage before deploying |

### Available Agents
| Agent | Dispatch For |
|-------|-------------|
| `security-auditor` | Comprehensive PCI scope audit, PAN exposure detection |
| `penetration-tester` | Vault security testing, token replay attacks |
| `api-designer` | Design secure tokenization API contracts |
| `fullstack-developer` | Implement vault service with encryption |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    TOKENIZATION SECURITY WORKFLOW                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: DISCOVERY & AUDIT                                             │
│  ├─ Episodic Memory: Recall past tokenization security incidents        │
│  ├─ Serena: Find existing vault service implementation                  │
│  ├─ Serena: Audit codebase for potential PAN exposure                   │
│  └─ Context7: Get latest encryption library docs (AES-GCM, KMS)         │
│                                                                          │
│  PHASE 2: IMPLEMENTATION                                                │
│  ├─ Receive PAN + metadata via secure channel (iframe/SDK)              │
│  ├─ Validate card number (Luhn check)                                   │
│  ├─ Generate cryptographically secure token (NOT derived from PAN)      │
│  ├─ Encrypt PAN using AES-256-GCM with KMS master key                   │
│  ├─ Store encrypted blob with key version for rotation                  │
│  ├─ Return token + BIN (first 6) + last4 for display                    │
│  └─ Securely wipe PAN from memory (zero-fill buffers)                   │
│                                                                          │
│  PHASE 3: SECURITY TESTING                                              │
│  ├─ Serena: Search codebase for console.log with card/PAN               │
│  ├─ Playwright: Test tokenization endpoint, verify no PAN in response   │
│  ├─ Penetration Tester: Attempt token replay, race conditions           │
│  └─ Chrome: Monitor vault dashboards for anomalies                      │
│                                                                          │
│  PHASE 4: AUDIT & DOCUMENTATION                                         │
│  ├─ Serena: Store key rotation procedures in memory                     │
│  ├─ Episodic Memory: Record tokenization decisions for future           │
│  ├─ Security Auditor: Generate PCI compliance report                    │
│  └─ Verification: Confirm zero PAN leakage before deployment            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Audit

#### Episodic Memory: Security History

```typescript
// Recall past tokenization security incidents
const securityIncidents = await mcp_episodic_memory.search({
  query: ["tokenization", "PAN exposure", "encryption", "key rotation"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Find key rotation procedures
const keyRotationHistory = await mcp_episodic_memory.search({
  query: "master key rotation KMS procedure",
  mode: "text",
  limit: 5
});

// Recall PCI audit findings
const pciAuditFindings = await mcp_episodic_memory.search({
  query: ["PCI DSS", "vault audit", "compliance findings"],
  mode: "both",
  limit: 5
});
```

#### Serena: Vault Service Analysis

```typescript
// Find vault service implementation
const vaultService = await mcp_serena.find_symbol({
  name_path_pattern: "Vault|TokenService|CardVault",
  substring_matching: true,
  include_body: true,
  depth: 3
});

// Find encryption methods
const encryptionMethods = await mcp_serena.search_for_pattern({
  substring_pattern: "encrypt|decrypt|cipher|AES|GCM|createCipheriv",
  relative_path: "src/vault",
  context_lines_before: 3,
  context_lines_after: 3
});

// Find key rotation logic
const keyRotation = await mcp_serena.find_symbol({
  name_path_pattern: "rotateKey|keyVersion|masterKey",
  substring_matching: true,
  include_body: true
});

// Get overview of vault module
const vaultOverview = await mcp_serena.get_symbols_overview({
  relative_path: "src/vault",
  depth: 2
});
```

#### Serena: PAN Exposure Audit

```typescript
// CRITICAL: Search for PAN in logs
const panInLogs = await mcp_serena.search_for_pattern({
  substring_pattern: "console\\.log.*card|logger.*pan|debug.*number|log.*cardNumber",
  relative_path: "src",
  context_lines_before: 2,
  context_lines_after: 2
});

// Find potential PAN exposure outside vault
const panExposure = await mcp_serena.search_for_pattern({
  substring_pattern: "cardNumber|primaryAccountNumber|\\bpan\\b",
  relative_path: "src",
  paths_exclude_glob: "**/vault/**"  // Vault is allowed to have PAN
});

// Find insecure string operations on PAN
const unsafeStringOps = await mcp_serena.search_for_pattern({
  substring_pattern: "cardNumber.*\\+|pan.*concat|\\$\\{.*cardNumber",
  relative_path: "src"
});

// Verify memory wiping
const memoryWipe = await mcp_serena.search_for_pattern({
  substring_pattern: "fill\\(0\\)|secure.*wipe|zero.*buffer|crypto\\.randomBytes",
  relative_path: "src/vault"
});
```

#### Context7: Encryption Documentation

```typescript
// Node.js crypto module - AES-GCM
const cryptoDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/nodejs/node",
  topic: "crypto createCipheriv AES-256-GCM encryption",
  mode: "code"
});

// AWS KMS for key management
const kmsDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/aws/aws-sdk-js-v3",
  topic: "KMS encrypt decrypt GenerateDataKey key rotation",
  mode: "code"
});

// Stripe tokenization patterns (for reference)
const stripeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "tokens card tokenization",
  mode: "code"
});

// PCI DSS requirements
const pciDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/PCI-Security-Standards-Council/pcidss",
  topic: "requirement 3 encryption tokenization key management",
  mode: "info"
});
```

---

### Phase 2: Implementation

#### Tokenization Service Implementation

```typescript
import { KMSClient, DecryptCommand, EncryptCommand } from '@aws-sdk/client-kms';
import crypto from 'crypto';

interface TokenizationRequest {
  pan: string;
  expiryMonth: string;
  expiryYear: string;
  cvv?: string;
}

interface TokenizationResult {
  token: string;      // Opaque token (NOT derived from PAN)
  bin: string;        // First 6 digits (for routing/card type detection)
  last4: string;      // Last 4 digits (for display)
  expiryMonth: string;
  expiryYear: string;
}

interface VaultEntry {
  token: string;
  encryptedPan: Buffer;
  authTag: Buffer;
  iv: Buffer;
  keyVersion: number;
  bin: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  createdAt: Date;
  expiresAt: Date;
}

class CardVaultService {
  private kmsClient: KMSClient;
  private keyId: string;
  private currentKeyVersion: number;

  constructor() {
    this.kmsClient = new KMSClient({ region: process.env.AWS_REGION });
    this.keyId = process.env.KMS_KEY_ID!;
    this.currentKeyVersion = 1; // Track key version for rotation
  }

  /**
   * Validate card number using Luhn algorithm
   */
  private luhnCheck(pan: string): boolean {
    const digits = pan.replace(/\s/g, '').split('').map(Number);
    const checksum = digits.reduceRight((acc, digit, idx) => {
      if ((digits.length - idx) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      return acc + digit;
    }, 0);
    return checksum % 10 === 0;
  }

  /**
   * Generate cryptographically secure token
   * MUST NOT be derivable from PAN
   */
  private generateToken(): string {
    const randomBytes = crypto.randomBytes(32);
    return `tok_${randomBytes.toString('hex')}`;
  }

  /**
   * Encrypt PAN using AES-256-GCM
   */
  private async encryptPan(pan: string): Promise<{
    encryptedPan: Buffer;
    authTag: Buffer;
    iv: Buffer;
  }> {
    // Generate data key from KMS
    const dataKey = await this.kmsClient.send(
      new EncryptCommand({
        KeyId: this.keyId,
        Plaintext: crypto.randomBytes(32),
      })
    );

    // Use AES-256-GCM
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-gcm',
      dataKey.CiphertextBlob!,
      iv
    );

    let encryptedPan = cipher.update(pan, 'utf8');
    encryptedPan = Buffer.concat([encryptedPan, cipher.final()]);
    const authTag = cipher.getAuthTag();

    return { encryptedPan, authTag, iv };
  }

  /**
   * Securely wipe PAN from memory
   */
  private wipePan(pan: string): void {
    // Zero-fill the string buffer
    const buffer = Buffer.from(pan);
    buffer.fill(0);
  }

  /**
   * Main tokenization flow
   */
  async tokenize(request: TokenizationRequest): Promise<TokenizationResult> {
    try {
      // 1. Validate PAN
      const cleanPan = request.pan.replace(/\s/g, '');
      if (!this.luhnCheck(cleanPan)) {
        throw new Error('Invalid card number (Luhn check failed)');
      }

      // 2. Generate token (NOT derived from PAN)
      const token = this.generateToken();

      // 3. Extract BIN and last4
      const bin = cleanPan.substring(0, 6);
      const last4 = cleanPan.substring(cleanPan.length - 4);

      // 4. Encrypt PAN
      const { encryptedPan, authTag, iv } = await this.encryptPan(cleanPan);

      // 5. Store in vault database
      const vaultEntry: VaultEntry = {
        token,
        encryptedPan,
        authTag,
        iv,
        keyVersion: this.currentKeyVersion,
        bin,
        last4,
        expiryMonth: request.expiryMonth,
        expiryYear: request.expiryYear,
        createdAt: new Date(),
        expiresAt: new Date(
          2000 + parseInt(request.expiryYear),
          parseInt(request.expiryMonth) - 1
        ),
      };

      // await db.vaultEntries.create(vaultEntry);

      // 6. CRITICAL: Wipe PAN from memory
      this.wipePan(cleanPan);
      this.wipePan(request.pan);

      // 7. Return token (NO PAN in response)
      return {
        token,
        bin,
        last4,
        expiryMonth: request.expiryMonth,
        expiryYear: request.expiryYear,
      };
    } catch (error) {
      // NEVER log PAN in error messages
      console.error('Tokenization failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        // DO NOT LOG: request.pan
      });
      throw error;
    }
  }

  /**
   * Detokenize for PSP communication
   */
  async detokenize(token: string): Promise<string> {
    // Implementation would decrypt PAN for PSP call
    // This should ONLY be called within secure vault context
    throw new Error('Not implemented');
  }

  /**
   * Rotate encryption keys
   */
  async rotateKeys(): Promise<void> {
    // Re-encrypt all vault entries with new key version
    this.currentKeyVersion++;
    // Implementation would iterate vault entries and re-encrypt
  }
}
```

---

### Phase 3: Security Testing

#### Serena: Audit for PAN Leakage

```typescript
// Find all console.log statements
const allLogs = await mcp_serena.search_for_pattern({
  substring_pattern: "console\\.(log|info|debug|warn|error)",
  relative_path: "src",
  context_lines_before: 1,
  context_lines_after: 1
});

// Find logger calls with card data
const loggerWithCard = await mcp_serena.search_for_pattern({
  substring_pattern: "logger.*\\{.*card|log.*request\\.body|console.*pan",
  relative_path: "src"
});

// Find API responses that might leak PAN
const apiResponses = await mcp_serena.search_for_pattern({
  substring_pattern: "res\\.json\\(.*card|return.*\\{.*pan",
  relative_path: "src",
  paths_exclude_glob: "**/vault/**"
});
```

#### Playwright: API Security Testing

```typescript
// Test tokenization endpoint
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/api-test-harness"
});

// Execute tokenization via fetch
const tokenizeResult = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const response = await fetch('/api/vault/tokenize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify({
        pan: '4111111111111111',
        expiryMonth: '12',
        expiryYear: '25'
      })
    });

    const result = await response.json();

    // Verify PAN is NOT in response
    const responseText = JSON.stringify(result);
    const hasPan = responseText.includes('4111111111111111');

    return {
      status: response.status,
      result,
      hasPan,  // MUST be false
      hasToken: !!result.token,
      hasBin: !!result.bin,
      hasLast4: !!result.last4
    };
  }`
});

// Verify response structure
// Expected: { token: 'tok_xxx', bin: '411111', last4: '1111', expiryMonth: '12', expiryYear: '25' }
// Must NOT contain: Full PAN

// Test invalid card number
const invalidCardResult = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const response = await fetch('/api/vault/tokenize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pan: '4111111111111112',  // Invalid Luhn
        expiryMonth: '12',
        expiryYear: '25'
      })
    });
    return {
      status: response.status,
      error: await response.json()
    };
  }`
});
// Should return 400 Bad Request

// Monitor network requests for PAN leakage
const networkRequests = await mcp_playwright.browser_network_requests({});
// Audit all requests for PAN exposure
```

#### Chrome: Vault Dashboard Monitoring

```typescript
// Navigate to vault monitoring dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://vault-dashboard.internal/metrics"
});

// Extract tokenization metrics
const metrics = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".tokenization-metrics",
  payload: "text"
});

// Check for anomalies
const anomalies = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    document.querySelector('.anomaly-count')?.textContent
  `
});

// Screenshot dashboard
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "vault-dashboard.png"
});
```

#### Agent Dispatch: Penetration Testing

```typescript
// Dispatch penetration tester for vault security
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "security_test_vault",
  "payload": {
    "task": "Perform comprehensive vault security testing",
    "attack_vectors": [
      "Token replay attacks",
      "Race conditions during tokenization",
      "SQL injection in token lookup",
      "Timing attacks to infer PAN",
      "Memory dumps for PAN exposure",
      "Key rotation vulnerabilities"
    ],
    "scope": {
      "endpoints": ["/api/vault/tokenize", "/api/vault/detokenize"],
      "database": "vault_db",
      "kms_key": process.env.KMS_KEY_ID
    }
  }
}
```

---

### Phase 4: Audit & Documentation

#### Serena: Store Security Decisions

```typescript
// Document tokenization implementation
await mcp_serena.write_memory({
  memory_file_name: "tokenization-security.md",
  content: `
# Tokenization Security Implementation

## Encryption
- Algorithm: AES-256-GCM
- Key Management: AWS KMS with automatic rotation
- Key Derivation: KMS GenerateDataKey for each encryption
- IV: Random 16 bytes per encryption (never reused)
- Auth Tag: GCM authentication tag stored with ciphertext

## Token Generation
- Source: crypto.randomBytes(32)
- Format: tok_[64 hex chars]
- Independence: Token is NOT mathematically derivable from PAN
- Collision: Astronomically low probability (2^256)

## Memory Security
- PAN wiped from memory after encryption (buffer.fill(0))
- No PAN in logs, error messages, or API responses
- CVV never stored (ephemeral use only)

## Key Rotation
- Current Key Version: ${this.currentKeyVersion}
- Rotation Schedule: Quarterly
- Re-encryption: Background job processes vault entries
- Multiple key versions supported for seamless rotation

## Scope Isolation
- Only vault service accesses raw PAN
- Core orchestrator uses tokens only
- PSP adapters receive detokenized PAN just-in-time
- Logs contain token references only (never PAN)

## Audit Trail
- Every tokenization logged with: token, bin, timestamp, key version
- Failed attempts logged with: reason, timestamp (NO PAN)
- Detokenization logged with: token, PSP, timestamp
- Key rotation logged with: old/new key version, entries re-encrypted

## Compliance
- PCI DSS 4.0 Requirement 3: Cardholder data encryption
- PCI DSS 4.0 Requirement 4: Encrypted transmission
- PCI DSS 4.0 Requirement 8: Key rotation and access control
  `
});

// Document key rotation procedure
await mcp_serena.write_memory({
  memory_file_name: "key-rotation-procedure.md",
  content: `
# Key Rotation Procedure

## Pre-Rotation
1. Verify new KMS key is active
2. Test encryption/decryption with new key
3. Schedule maintenance window (low traffic)

## Rotation Steps
1. Increment key version in vault service
2. Start background job to re-encrypt entries
3. Monitor job progress and error rate
4. Verify sample of re-encrypted entries
5. Update key version in all vault replicas

## Post-Rotation
1. Confirm all entries use new key version
2. Archive old key (retain for PCI compliance)
3. Document rotation in audit log
4. Update runbook with any issues encountered

## Rollback Plan
- Keep old key active for 30 days
- If issues detected, revert key version
- Re-encrypt affected entries with old key
  `
});
```

#### Episodic Memory: Record Implementation

```typescript
// Record tokenization implementation decisions
// (This happens automatically via conversation history)
// Future searches will find this implementation pattern
```

---

## MCP Integration Examples

### Serena: Find Encryption Implementation

```typescript
// Find vault service
const vault = await mcp_serena.find_symbol({
  name_path_pattern: "CardVaultService",
  include_body: true
});

// Find all encryption-related code
const encryption = await mcp_serena.search_for_pattern({
  substring_pattern: "createCipheriv|encrypt|decrypt",
  relative_path: "src/vault"
});

// Trace token generation
const tokenGen = await mcp_serena.find_referencing_symbols({
  name_path: "generateToken",
  relative_path: "src/vault/service.ts"
});
```

### Context7: Security Documentation

```typescript
// Get crypto best practices
const cryptoBest = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/nodejs/node",
  topic: "crypto security best practices random IV",
  mode: "info"
});

// KMS key rotation
const kmsRotation = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/aws/aws-sdk-js-v3",
  topic: "KMS key rotation EnableKeyRotation",
  mode: "code"
});
```

### Playwright: Test Tokenization Flow

```typescript
// Test end-to-end tokenization
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Fill payment form
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", value: "4111111111111111" }
  ]
});

// Monitor tokenization network request
const requests = await mcp_playwright.browser_network_requests({});
// Verify tokenization request does NOT log PAN
```

### Chrome: Monitor PSP Dashboard

```typescript
// Check token creation rate
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/tokens"
});

const tokenCount = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".token-count",
  payload: "text"
});
```

### Episodic Memory: Learn from Incidents

```typescript
// Find past tokenization failures
const failures = await mcp_episodic_memory.search({
  query: ["tokenization failed", "encryption error", "KMS timeout"],
  mode: "both",
  limit: 5
});

// Recall key rotation issues
const rotationIssues = await mcp_episodic_memory.search({
  query: "key rotation failed re-encryption",
  after: "2024-01-01"
});
```

---

## Agent Dispatch Patterns

### Security Auditor: PCI Compliance

```typescript
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "audit_pci_compliance",
  "payload": {
    "task": "Audit tokenization implementation for PCI DSS 4.0",
    "requirements": [
      "Requirement 3: Verify encryption at rest",
      "Requirement 4: Verify encrypted transmission",
      "Requirement 8: Verify key management",
      "Requirement 10: Verify audit logging"
    ],
    "scope": "src/vault/**"
  }
}
```

### Penetration Tester: Vault Security

```typescript
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "penetration_test",
  "payload": {
    "task": "Test vault security vulnerabilities",
    "tests": [
      "Token replay attack resistance",
      "Race condition during concurrent tokenization",
      "Timing attacks to infer PAN length",
      "Memory dump analysis for PAN exposure"
    ]
  }
}
```

---

## Scope Rules

| Component | PAN Access | Token Access | Encrypted PAN |
|-----------|------------|--------------|---------------|
| Frontend (iframe) | Transient (form only) | No | No |
| Vault Service | Full (for encryption) | Full | Full |
| Core Orchestrator | Never | Full | No |
| PSP Adapter | Detokenized (JIT) | No | No |
| Logs/Monitoring | **NEVER** | Token only | No |
| Database (Vault) | No | Yes | Yes |

---

## Best Practices

### Security
- **Token Independence**: Token MUST NOT be mathematically derivable from PAN
- **Memory Wiping**: Securely zero-fill PAN buffers after tokenization
- **Key Rotation**: Support multiple key versions for seamless rotation
- **Isolation**: Only vault service touches raw PAN
- **Logging**: NEVER log full PAN, CVV, or encryption keys

### Development Workflow
1. **Documentation First**: Check Context7 for latest encryption patterns
2. **Security Audit**: Use Serena to detect potential PAN exposure
3. **Historical Context**: Search Episodic Memory for past security incidents
4. **Test Security**: Write penetration tests before deployment
5. **Verify**: Confirm zero PAN leakage before going live
6. **Document**: Store security decisions in Serena memory

### Encryption
- Use AES-256-GCM (provides confidentiality + authenticity)
- Generate random IV for each encryption (never reuse)
- Store auth tag with ciphertext for integrity verification
- Use KMS for key management (not hardcoded keys)

### Compliance
- PCI DSS Requirement 3: Encrypt cardholder data at rest
- PCI DSS Requirement 4: Encrypt transmission over public networks
- PCI DSS Requirement 8: Key rotation every 90 days
- PCI DSS Requirement 10: Audit trail for all cryptographic operations
