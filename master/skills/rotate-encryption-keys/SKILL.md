# Skill: Rotate Encryption Keys

**Role:** sequential-reasoner (Security Specialist)
**Domain:** Security & Compliance
**Objective:** Implement automated, annual rotation of Data Encryption Keys (DEK) and Key Encryption Keys (KEK) to meet PCI DSS Requirement 3.6.4. Leverage ALL available capabilities for secure key management, rotation automation, and comprehensive audit trails.

## Available Capabilities

### MCP Servers
| Server | Security Usage |
|--------|----------------|
| **Serena** | Find KMS key configurations, discover encryption key usage, audit key rotation policies, analyze data re-encryption logic |
| **Context7** | Get AWS KMS docs, encryption best practices, AES-256-GCM standards, key rotation requirements |
| **Playwright** | Test encrypted data access after rotation, verify application handles key rotation gracefully |
| **Chrome** | Monitor KMS dashboard, review key usage metrics, check CloudTrail for key operations, verify rotation schedules |
| **Episodic Memory** | Recall past key rotation incidents, retrieve rotation decisions, track key lifecycle history |

### Superpowers Skills
| Skill | Security-Specific Trigger |
|-------|--------------------------|
| `brainstorming` | Before designing key rotation architecture |
| `systematic-debugging` | When investigating key rotation failures or data access issues |
| `test-driven-development` | Before implementing automated rotation logic |
| `verification-before-completion` | Before certifying rotation compliance to auditors |
| `writing-plans` | For comprehensive key migration strategy |
| `subagent-driven-development` | Parallel data re-encryption across multiple databases |

### Specialized Agents
| Agent | Security Use Case |
|-------|------------------|
| `code-reviewer` | Review key rotation automation for correctness |
| `silent-failure-hunter` | Find cases where old keys still decrypt data |
| `code-explorer` | Trace key usage from application through KMS |

### Security-Specific Tools
- **WebSearch** - Latest NIST encryption standards, key management best practices
- **Bash** - AWS CLI for KMS management, key rotation scripts, re-encryption automation
- **elements-of-style:writing-clearly-and-concisely** - Clear key rotation documentation

## Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│            ENCRYPTION KEY ROTATION WORKFLOW                  │
└─────────────────────────────────────────────────────────────┘

[1] ENABLE AUTOMATIC KEY ROTATION
    ├─→ Serena: Find KMS key configurations
    ├─→ Context7: Get KMS rotation best practices
    ├─→ Bash: Enable automatic annual rotation
    ├─→ Chrome: Verify rotation schedule in console
    └─→ Episodic Memory: Document rotation decision

[2] IMPLEMENT KEY ALIASING
    ├─→ Serena: Update application to use key aliases
    ├─→ Application: Uses alias/payment-key (not key ID)
    ├─→ KMS: Alias points to current key version
    ├─→ Benefit: Transparent rotation without code changes
    └─→ Code Review: Verify all code uses aliases

[3] DATA RE-ENCRYPTION STRATEGY
    ├─→ Brainstorming: Design re-encryption approach
    ├─→ Option A: Lazy re-encryption (on write)
    ├─→ Option B: Batch re-encryption (scheduled)
    ├─→ Option C: Hybrid approach
    └─→ Writing Plans: Detail migration strategy

[4] IMPLEMENT LAZY RE-ENCRYPTION
    ├─→ TDD: Write re-encryption tests
    ├─→ Read: Decrypt with old key version
    ├─→ Update: Encrypt with new key version
    ├─→ Automatic: Happens on normal data access
    └─→ Track: Monitor key usage degradation

[5] AUDIT KEY USAGE
    ├─→ Chrome: Monitor KMS key usage metrics
    ├─→ Bash: Query CloudTrail for Decrypt operations
    ├─→ Verify: Old key usage decreases over time
    ├─→ Threshold: <1% after 90 days
    └─→ Retirement: Disable old keys after confirmation

[6] KEY LIFECYCLE MANAGEMENT
    ├─→ Year 0: Key created and enabled
    ├─→ Year 1: Rotation (new key version created)
    ├─→ Year 1+90d: Old key disabled (if usage <1%)
    ├─→ Year 1+365d: Old key scheduled for deletion
    ├─→ Verification: Test recovery before deletion
    └─→ Documentation: Complete audit trail
```

## Workflow Integration

### Phase 1: Enable Automatic Rotation
- **Context7**: Get KMS documentation
  ```typescript
  const kmsDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/aws/aws-sdk-js",
    topic: "KMS key rotation automatic enableKeyRotation",
    mode: "code"
  });

  const pciKeyRotation = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/pcisecuritystandards/pci-dss",
    topic: "requirement 3.6.4 key rotation",
    mode: "info"
  });
  ```

- **Serena**: Find existing KMS configuration
  ```typescript
  const kmsKeys = await mcp_serena.search_for_pattern({
    substring_pattern: "aws_kms_key|enableKeyRotation|enable_key_rotation",
    paths_include_glob: "infrastructure/**/*.{tf,ts,yml}",
    context_lines_after: 10
  });

  // Find key aliases
  const keyAliases = await mcp_serena.search_for_pattern({
    substring_pattern: "aws_kms_alias|createAlias|alias/payment",
    paths_include_glob: "infrastructure/**/*",
    context_lines_after: 5
  });
  ```

- **Bash**: Enable automatic rotation
  ```bash
  # Enable automatic annual rotation
  aws kms enable-key-rotation --key-id "arn:aws:kms:us-east-1:123456789012:key/abc123..."

  # Verify rotation is enabled
  aws kms get-key-rotation-status --key-id "abc123..."
  # Output: {"KeyRotationEnabled": true}

  # Check rotation schedule
  aws kms describe-key --key-id "abc123..." \
    --query 'KeyMetadata.{Created:CreationDate,NextRotation:NextRotationDate}'
  ```

- **Chrome**: Verify in AWS console
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/kms/home#/kms/keys"
  });

  // Filter for payment encryption keys
  await mcp_chrome.use_browser({
    action: "type",
    selector: ".filter-input",
    payload: "payment\n"
  });

  const keyDetails = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".key-table",
    payload: "markdown"
  });
  ```

### Phase 2: Implement Key Aliasing
- **Serena**: Audit application key usage
  ```typescript
  // Find hardcoded key IDs (anti-pattern)
  const hardcodedKeys = await mcp_serena.search_for_pattern({
    substring_pattern: "arn:aws:kms.*:key/[a-f0-9-]{36}|KeyId.*=.*['\"][a-f0-9-]{36}",
    paths_include_glob: "src/**/*.ts",
    context_lines_before: 2,
    context_lines_after: 2
  });

  // Find key alias usage (correct pattern)
  const aliasUsage = await mcp_serena.search_for_pattern({
    substring_pattern: "alias/payment|alias/data-encryption|KMS_KEY_ALIAS",
    paths_include_glob: "src/**/*.ts",
    context_lines_after: 5
  });

  // Find encryption operations
  const encryptCalls = await mcp_serena.search_for_pattern({
    substring_pattern: "kms\\.encrypt|encrypt.*KeyId|generateDataKey",
    paths_include_glob: "src/**/*.ts",
    context_lines_after: 8
  });
  ```

- **Code Review**: Verify alias usage
  ```
  Invoke: superpowers:requesting-code-review
  Focus: Ensure all encryption code uses key aliases, not hardcoded key IDs
  ```

### Phase 3: Re-Encryption Strategy
- **Brainstorming**: Design migration approach
  ```
  Invoke: superpowers:brainstorming
  Goal: Design data re-encryption strategy for annual key rotation
  Options:
    - Lazy re-encryption on write (low risk, gradual)
    - Batch re-encryption (fast, requires downtime)
    - Hybrid (critical data batch, rest lazy)
  ```

- **Episodic Memory**: Review past rotation experiences
  ```typescript
  const pastRotations = await mcp_episodic_memory.search({
    query: ["key rotation", "re-encryption", "KMS migration"],
    mode: "both",
    after: "2024-01-01"
  });
  ```

- **Writing Plans**: Detail re-encryption strategy
  ```
  Invoke: superpowers:writing-plans
  Task: Create detailed plan for database column re-encryption with rollback strategy
  ```

### Phase 4: Implement Lazy Re-Encryption
- **TDD**: Write tests first
  ```
  Invoke: superpowers:test-driven-development
  Goal: Implement lazy re-encryption with comprehensive test coverage
  ```

- **Serena**: Implement re-encryption logic
  ```typescript
  // Find existing encryption service
  const encryptionService = await mcp_serena.find_symbol({
    name_path_pattern: "EncryptionService|encrypt|decrypt",
    include_body: true
  });

  // Example lazy re-encryption pattern:
  // async function updateSensitiveData(id, data) {
  //   const existing = await db.findById(id);
  //
  //   // Decrypt with old key (KMS handles version automatically)
  //   const decrypted = await kms.decrypt({ CiphertextBlob: existing.encryptedData });
  //
  //   // Encrypt with current key (via alias)
  //   const reEncrypted = await kms.encrypt({
  //     KeyId: 'alias/payment-key',  // Always uses current version
  //     Plaintext: data || decrypted.Plaintext
  //   });
  //
  //   await db.update(id, { encryptedData: reEncrypted.CiphertextBlob });
  // }
  ```

- **Playwright**: Test application handles rotation
  ```typescript
  // Test that data encrypted with old key is still accessible
  await mcp_playwright.browser_navigate({ url: `${baseUrl}/admin/test-rotation` });

  // Trigger decryption of old data
  const oldDataTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const response = await fetch('/api/encrypted-data/old-record');
      return response.ok;
    }`
  });
  // Verify: Should still decrypt successfully

  // Test that new data uses new key
  const newDataTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const response = await fetch('/api/encrypted-data', {
        method: 'POST',
        body: JSON.stringify({ data: 'sensitive info' })
      });
      return response.ok;
    }`
  });
  ```

### Phase 5: Audit Key Usage
- **Chrome**: Monitor KMS metrics
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/cloudwatch/home#metricsV2:graph"
  });

  // Add KMS Decrypt metric
  await mcp_chrome.use_browser({
    action: "type",
    selector: ".metric-search",
    payload: "KMS Decrypt\n"
  });

  // Group by key version
  const keyUsage = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".metrics-chart",
    payload: "markdown"
  });
  ```

- **Bash**: Query CloudTrail for key operations
  ```bash
  # Query Decrypt operations by key ID
  bun x tsx scripts/athena-query.ts --query "
    SELECT DATE_TRUNC('day', eventtime) as date,
           requestparameters.keyId as key_version,
           COUNT(*) as decrypt_operations
    FROM cloudtrail_logs
    WHERE eventname = 'Decrypt'
    AND eventsource = 'kms.amazonaws.com'
    AND eventtime > current_timestamp - interval '90' day
    GROUP BY DATE_TRUNC('day', eventtime), requestparameters.keyId
    ORDER BY date DESC, decrypt_operations DESC
  "

  # Calculate percentage of old key usage
  bun x tsx scripts/calculate-key-usage.ts --old-key-id "abc123-old" --threshold 1
  ```

- **Verification**: Confirm safe to disable old key
  ```
  Invoke: superpowers:verification-before-completion
  Verify:
    - Automatic rotation enabled
    - New key version created
    - Old key usage < 1% for 90 days
    - No decrypt errors in logs
    - Test recovery with old key before disabling
  ```

### Phase 6: Key Lifecycle Management
- **Bash**: Disable old key version
  ```bash
  # Disable old key (after verification)
  aws kms disable-key --key-id "old-key-id-abc123"

  # Verify disabled
  aws kms describe-key --key-id "old-key-id-abc123" \
    --query 'KeyMetadata.Enabled'

  # Schedule deletion (7-30 day waiting period)
  aws kms schedule-key-deletion --key-id "old-key-id-abc123" --pending-window-in-days 30

  # Cancel deletion if needed (within waiting period)
  # aws kms cancel-key-deletion --key-id "old-key-id-abc123"
  ```

- **Chrome**: Document key lifecycle
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/kms/home#/kms/keys/old-key-id/keyPolicy"
  });

  await mcp_chrome.use_browser({
    action: "screenshot",
    payload: "key-lifecycle-audit.png"
  });
  ```

- **Episodic Memory**: Record rotation completion
  ```typescript
  // Document in Serena memory
  await mcp_serena.write_memory({
    memory_file_name: "key-rotation-2024.md",
    content: `# Key Rotation - 2024

## Timeline
- 2024-01-15: Automatic rotation triggered
- 2024-01-15: New key version created
- 2024-04-15: Old key usage <1% (90 days)
- 2024-04-16: Old key disabled
- 2024-05-16: Old key deletion scheduled (30 day window)

## Metrics
- Total encrypted records: 1,245,789
- Re-encrypted: 1,245,789 (100%)
- Old key decrypt operations (last 7 days): 12 (0.0001%)
- Errors: 0

## Compliance
- PCI DSS 3.6.4: ✓ Annual rotation completed
- Audit trail: CloudTrail logs archived
- Evidence: KMS metrics, re-encryption logs
`
  });
  ```

## Best Practices

### Key Rotation Strategy
- **Automatic Rotation**: Enable for ALL customer-managed keys
- **Annual Schedule**: AWS KMS rotates automatically every 365 days
- **Key Aliasing**: Application uses `alias/payment-key`, not key ID
- **Lazy Re-encryption**: Decrypt with old, encrypt with new on write
- **Monitoring**: Track old key usage degradation via CloudTrail

### Re-Encryption Approaches
- **Lazy (Recommended)**: Re-encrypt on natural data access/updates
  - Pros: No downtime, gradual, low risk
  - Cons: Takes time (months), old keys stay enabled longer
- **Batch**: Scheduled job re-encrypts all data
  - Pros: Fast (hours/days), predictable timeline
  - Cons: Resource intensive, may require maintenance window
- **Hybrid**: Critical data batch, rest lazy
  - Pros: Balance of speed and risk
  - Cons: More complex to implement

### Key Lifecycle
1. **Year 0**: Key created, automatic rotation enabled
2. **Year 1**: New key version generated automatically
3. **Year 1 + 90 days**: Verify old key usage <1%, disable old key
4. **Year 1 + 365 days**: Schedule old key deletion (30-day window)
5. **Before deletion**: Test recovery, verify no dependencies
6. **Documentation**: Audit trail in Serena memory + CloudTrail

### Compliance Requirements (PCI DSS 3.6.4)
- **Frequency**: Annual rotation minimum
- **Audit Trail**: CloudTrail logs of all key operations
- **Evidence**: KMS metrics showing rotation, re-encryption progress
- **Testing**: Verify encrypted data accessible before/after rotation
- **Documentation**: Key lifecycle timeline, rotation procedures

### Workflow Requirements
- **ALWAYS** invoke `test-driven-development` before rotation code
- **ALWAYS** invoke `verification-before-completion` before disabling old keys
- **ALWAYS** search Episodic Memory for past rotation issues
- **ALWAYS** get latest KMS docs from Context7
- **ALWAYS** monitor key usage for 90 days before retiring old keys
- **NEVER** disable old keys without verification
- **NEVER** delete keys without 30-day waiting period
- **NEVER** hardcode key IDs - always use aliases

### Monitoring & Alerting
- **Daily**: Check KMS metrics for decrypt errors
- **Weekly**: Review old key usage percentage
- **Monthly**: Verify rotation schedules are active
- **Quarterly**: Test key recovery procedures
- **Alert On**: Decrypt errors, rotation failures, unexpected old key usage spike
