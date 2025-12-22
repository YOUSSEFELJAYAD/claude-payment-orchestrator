# Skill: Verify PCI Scope

**Role:** sequential-reasoner (Security Specialist)
**Domain:** Security & Compliance
**Objective:** Validate that the Cardholder Data Environment (CDE) is truly isolated through automated network scanning, code analysis, and continuous boundary verification. Ensure no out-of-scope systems can communicate with in-scope systems (PCI DSS Requirement 11) using ALL available capabilities.

## Available Capabilities

### MCP Servers
| Server | Security Usage |
|--------|----------------|
| **Serena** | Trace data flows for cardholder data, map API boundaries, find database queries handling PAN/CVV, discover network calls to payment systems |
| **Context7** | Get PCI DSS Requirement 11 docs, network segmentation best practices, DLP tool documentation, nmap security scanning guides |
| **Playwright** | Automated boundary testing, verify authentication on CDE endpoints, test cross-boundary API calls, validate network isolation |
| **Chrome** | Monitor AWS VPC flow logs, review Security Group rules, check NACL configurations, inspect network topology diagrams |
| **Episodic Memory** | Recall past scope creep incidents, retrieve previous boundary definitions, compare quarterly scope changes |

### Superpowers Skills
| Skill | Security-Specific Trigger |
|-------|--------------------------|
| `brainstorming` | Before defining CDE boundaries or designing network segmentation |
| `systematic-debugging` | When investigating scope violations or boundary breaches |
| `test-driven-development` | Before implementing network isolation or firewall rules |
| `verification-before-completion` | Before certifying PCI scope to auditors |
| `writing-plans` | For CDE redesign or scope reduction initiatives |
| `subagent-driven-development` | Parallel boundary scanning across multiple environments |
| `requesting-code-review` | After changes to payment API endpoints or data handling |

### Specialized Agents
| Agent | Security Use Case |
|-------|------------------|
| `code-explorer` | Trace complete data flows from payment input to storage/transmission |
| `code-reviewer` | Review payment code for scope boundary violations |
| `silent-failure-hunter` | Find missing authorization checks on CDE endpoints |
| `type-design-analyzer` | Verify types enforce PAN/CVV constraints |

### Security-Specific Tools
- **WebSearch** - Latest PCI scope validation techniques, network segmentation tools
- **Bash** - Execute nmap scans, AWS CLI for VPC inspection, DLP scanning
- **elements-of-style:writing-clearly-and-concisely** - Clear scope documentation for auditors

## Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│               PCI SCOPE VERIFICATION WORKFLOW                │
└─────────────────────────────────────────────────────────────┘

[1] DEFINE BOUNDARIES
    ├─→ Episodic Memory: Review past scope definitions
    ├─→ Code Explorer: Trace all cardholder data flows
    ├─→ Serena: Map CDE subnets and IP ranges in infrastructure code
    ├─→ Chrome: Visualize VPC topology and Security Groups
    └─→ Context7: Get PCI DSS network segmentation requirements

[2] EXTERNAL BOUNDARY TESTING (Outside → CDE)
    ├─→ Playwright: Scan CDE from public internet
    ├─→ Bash: Run nmap from non-CDE environment
    ├─→ Verification: ALL ports should be CLOSED/FILTERED
    └─→ Exception: Only allowed ingress (443 on LB with WAF)

[3] INTERNAL BOUNDARY TESTING (CDE → Outside)
    ├─→ Playwright: Test egress from CDE to internet
    ├─→ Bash: Attempt outbound connections from CDE
    ├─→ Verification: ALL egress should be DENIED
    └─→ Exception: Only whitelisted Payment Gateway IPs

[4] CROSS-BOUNDARY API TESTING
    ├─→ Playwright: Test unauthenticated API calls to CDE
    ├─→ Serena: Audit authentication middleware on CDE endpoints
    ├─→ Silent Failure Hunter: Find missing auth checks
    └─→ Verification: No data leakage across boundaries

[5] DATA DISCOVERY (Out-of-Scope Systems)
    ├─→ Serena: Search for PAN patterns in non-CDE code
    ├─→ Bash: Run DLP scans on logs and databases
    ├─→ Chrome: Check CloudWatch logs for PAN leakage
    └─→ Verification: No cardholder data in out-of-scope systems

[6] CONTINUOUS MONITORING
    ├─→ Chrome: Monitor VPC flow logs daily
    ├─→ Episodic Memory: Compare with baseline
    ├─→ Automated: Trigger on infrastructure changes
    └─→ Documentation: Update scope boundary diagrams
```

## Workflow Integration

### Phase 1: Scope Definition
- **Episodic Memory**: Review historical scope boundaries
  ```typescript
  const pastScopes = await mcp_episodic_memory.search({
    query: ["PCI scope", "CDE boundary", "cardholder data environment"],
    mode: "both",
    after: "2024-01-01"
  });

  // Compare with previous quarterly audits
  const previousAudits = await mcp_episodic_memory.search({
    query: "quarterly PCI scope verification",
    after: "2024-01-01",
    before: "2024-12-31"
  });
  ```

- **Context7**: Get PCI DSS network segmentation requirements
  ```typescript
  const pciSegmentation = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/pcisecuritystandards/pci-dss",
    topic: "requirement 11 network segmentation validation",
    mode: "info"
  });

  const nmapDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/nmap/nmap",
    topic: "network scanning security audit firewall testing",
    mode: "code"
  });
  ```

- **Code Explorer**: Trace all cardholder data flows
  ```typescript
  Task(subagent_type="feature-dev:code-explorer", {
    instruction: "Trace complete data flow from payment form submission through processing, storage, and transmission. Identify ALL systems that touch cardholder data.",
    entrypoint: "src/payment/submit-payment.ts"
  }) → Complete CDE boundary map
  ```

- **Serena**: Map CDE infrastructure in code
  ```typescript
  // Find all subnet definitions
  const subnets = await mcp_serena.search_for_pattern({
    substring_pattern: "subnet.*cde|cardholder.*subnet|payment.*vpc",
    paths_include_glob: "infrastructure/**/*.{tf,yml,yaml}",
    context_lines_after: 10
  });

  // Find Security Group rules for CDE
  const securityGroups = await mcp_serena.search_for_pattern({
    substring_pattern: "security_group.*cde|ingress.*payment|egress.*gateway",
    paths_include_glob: "infrastructure/**/*.tf",
    context_lines_before: 5,
    context_lines_after: 15
  });

  // Find all PAN/CVV handling code
  const cardDataHandling = await mcp_serena.search_for_pattern({
    substring_pattern: "cardNumber|cvv|pan|primaryAccountNumber",
    paths_include_glob: "src/**/*.ts",
    context_lines_before: 3,
    context_lines_after: 3
  });
  ```

### Phase 2: External Boundary Testing
- **Brainstorming**: Design comprehensive scanning strategy
  ```
  Invoke: superpowers:brainstorming
  Goal: Design external boundary testing that covers all ingress points to CDE
  ```

- **Playwright**: Automated boundary scanning from public internet
  ```typescript
  // Test that admin endpoints are not accessible externally
  await mcp_playwright.browser_navigate({
    url: "https://payment-api.example.com/admin/debug"
  });
  await mcp_playwright.browser_wait_for({ text: "404 Not Found" });

  // Test that internal APIs are not exposed
  await mcp_playwright.browser_navigate({
    url: "https://payment-api.example.com/internal/health"
  });
  const response = await mcp_playwright.browser_network_requests({});
  // Verify: Should return 404 or 403, not 200

  // Test that database ports are filtered
  const portScan = await mcp_playwright.browser_evaluate({
    function: `async () => {
      try {
        await fetch('https://cde-rds.internal:5432', { mode: 'no-cors' });
        return 'PORT_OPEN';
      } catch (e) {
        return 'PORT_FILTERED';
      }
    }`
  });
  // Verify: Should timeout/error (port filtered)
  ```

- **Bash**: Network scanning with nmap from non-CDE environment
  ```bash
  # Port scan CDE subnet from office VPN
  nmap -sS -p- -T4 10.0.100.0/24 -oN cde-external-scan.txt

  # Expected: All ports closed/filtered except:
  # - 443/tcp on Load Balancer (with WAF)

  # Verify no direct database access
  nmap -p 5432,3306,6379 10.0.100.0/24

  # Expected: All database ports filtered
  ```

### Phase 3: Internal Boundary Testing (Egress)
- **Playwright**: Test egress restrictions from CDE
  ```typescript
  // Simulate request from CDE application to external internet
  // (requires running test from within CDE or using proxy)

  const egressTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const blockedHosts = [
        'https://google.com',
        'https://attacker.com',
        'https://pastebin.com'
      ];

      const results = [];
      for (const host of blockedHosts) {
        try {
          const res = await fetch(host, { signal: AbortSignal.timeout(5000) });
          results.push({ host, status: 'ALLOWED - VIOLATION!' });
        } catch (e) {
          results.push({ host, status: 'BLOCKED - OK' });
        }
      }

      // Only payment gateway should be allowed
      try {
        const gatewayRes = await fetch('https://secure.cybersource.com');
        results.push({ host: 'CyberSource', status: gatewayRes.ok ? 'ALLOWED - OK' : 'ERROR' });
      } catch (e) {
        results.push({ host: 'CyberSource', status: 'BLOCKED - VIOLATION!' });
      }

      return results;
    }`
  });
  ```

- **Chrome**: Review VPC Flow Logs for egress violations
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/vpc/home#FlowLogs"
  });

  // Filter for egress from CDE subnet to internet
  await mcp_chrome.use_browser({
    action: "type",
    selector: ".log-filter",
    payload: "srcAddr=10.0.100.0/24 AND dstAddr!=10.0.0.0/8 AND action=ACCEPT\n"
  });

  const egressViolations = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".flow-logs-table",
    payload: "markdown"
  });
  // Verify: Should only see allowed payment gateway IPs
  ```

### Phase 4: Cross-Boundary API Testing
- **Serena**: Audit authentication on CDE API endpoints
  ```typescript
  // Find all payment API routes
  const paymentRoutes = await mcp_serena.search_for_pattern({
    substring_pattern: "router\\.(get|post|put|delete)\\(['\"].*payment|/api/pay",
    paths_include_glob: "src/api/**/*.ts",
    context_lines_after: 10
  });

  // Check for authentication middleware
  const authMiddleware = await mcp_serena.search_for_pattern({
    substring_pattern: "authenticate|requireAuth|verifyToken|checkPermission",
    paths_include_glob: "src/middleware/**/*.ts",
    context_lines_after: 5
  });

  // Verify all CDE endpoints use auth
  const unprotectedEndpoints = await mcp_serena.search_for_pattern({
    substring_pattern: "router\\.(get|post)\\(['\"].*payment.*(?!authenticate|requireAuth)",
    paths_include_glob: "src/api/**/*.ts"
  });
  ```

- **Silent Failure Hunter**: Find missing authorization checks
  ```typescript
  Task(subagent_type="pr-review-toolkit:silent-failure-hunter", {
    instruction: "Find all payment API endpoints that might be missing authentication or authorization checks. Look for routes that accept sensitive data without proper validation.",
    files: "src/api/payment/**/*.ts"
  }) → Authentication gap analysis
  ```

- **Playwright**: Test unauthenticated access to CDE APIs
  ```typescript
  // Test payment API without auth token
  const unauthTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber: '4111111111111111',
          cvv: '123',
          amount: 100
        })
      });
      return { status: response.status, body: await response.text() };
    }`
  });
  // Verify: Should return 401 Unauthorized, not process payment
  ```

### Phase 5: Data Discovery (Out-of-Scope)
- **Serena**: Search for cardholder data in non-CDE systems
  ```typescript
  // Search for PAN patterns in logs or non-CDE code
  const panInLogs = await mcp_serena.search_for_pattern({
    substring_pattern: "4[0-9]{12,15}|5[1-5][0-9]{14}|3[47][0-9]{13}",
    paths_include_glob: "logs/**/*,analytics/**/*",
    paths_exclude_glob: "cde/**/*"
  });

  // Check for CVV in non-secure storage
  const cvvStorage = await mcp_serena.search_for_pattern({
    substring_pattern: "cvv|cardVerificationValue|securityCode",
    paths_include_glob: "**/*.ts",
    paths_exclude_glob: "cde/**/*,**/*.test.*"
  });

  // Find any direct database queries for card data outside CDE
  const cardQueries = await mcp_serena.search_for_pattern({
    substring_pattern: "SELECT.*card_number|INSERT.*pan|UPDATE.*cvv",
    paths_include_glob: "src/**/*.ts",
    paths_exclude_glob: "src/cde/**/*"
  });
  ```

- **Bash**: Run Data Loss Prevention scans
  ```bash
  # Scan application logs for PAN patterns
  bun x tsx scripts/dlp-scan.ts --target logs/ --pattern "card-number"

  # Scan non-CDE database for cardholder data
  bun x tsx scripts/dlp-scan.ts --database analytics_db --pattern "pan,cvv"

  # Check S3 buckets for PAN leakage
  aws s3 cp s3://analytics-bucket/ /tmp/scan-data/ --recursive
  bun x tsx scripts/dlp-scan.ts --target /tmp/scan-data/
  ```

- **Chrome**: Check CloudWatch logs for PAN exposure
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/cloudwatch/home#logsV2:log-groups"
  });

  // Search for PAN patterns in application logs
  await mcp_chrome.use_browser({
    action: "type",
    selector: ".log-query-editor",
    payload: 'fields @message | filter @message like /4[0-9]{12,15}|5[1-5][0-9]{14}/'
  });

  const panMatches = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".query-results",
    payload: "markdown"
  });
  // Verify: Should return zero matches in non-CDE logs
  ```

### Phase 6: Verification & Documentation
- **Verification**: Confirm all scope boundaries before certification
  ```
  Invoke: superpowers:verification-before-completion
  Verify:
    - External scans show no unauthorized ingress
    - Egress is limited to payment gateways only
    - All CDE APIs require authentication
    - No cardholder data in out-of-scope systems
    - VPC flow logs show proper segmentation
  ```

- **Code Review**: Review any infrastructure or boundary changes
  ```
  Invoke: superpowers:requesting-code-review
  Focus: Network segmentation, firewall rules, API authentication
  ```

- **Documentation**: Clear scope documentation for auditors
  ```
  Invoke: elements-of-style:writing-clearly-and-concisely
  Document:
    - CDE boundary definitions
    - Network topology diagrams
    - Segmentation test results
    - Scope validation evidence
  ```

## MCP Integration Examples

### Serena: Code-Based Scope Analysis

```typescript
// 1. Find all systems that handle cardholder data
const cardDataSystems = await mcp_serena.search_for_pattern({
  substring_pattern: "cardNumber|cvv|pan|expiryDate|track.*data",
  paths_include_glob: "**/*.ts",
  context_lines_before: 5,
  context_lines_after: 5
});

// 2. Trace payment gateway integrations
const gatewayIntegrations = await mcp_serena.find_symbol({
  name_path_pattern: "cybersource|mastercard|paymentGateway",
  include_body: true
});

// 3. Map database schemas for cardholder data
const dbSchemas = await mcp_serena.search_for_pattern({
  substring_pattern: "CREATE TABLE.*card|ALTER TABLE.*payment.*ADD.*pan",
  paths_include_glob: "migrations/**/*.sql",
  context_lines_after: 20
});

// 4. Find tokenization boundaries
const tokenization = await mcp_serena.search_for_pattern({
  substring_pattern: "tokenize|detokenize|vault.*token",
  paths_include_glob: "src/**/*.ts",
  context_lines_after: 10
});

// 5. Audit API endpoints in CDE
const cdeEndpoints = await mcp_serena.search_for_pattern({
  substring_pattern: "router\\.(get|post|put|delete)",
  paths_include_glob: "src/api/payment/**/*.ts",
  context_lines_after: 15
});
```

### Chrome: Network Monitoring

```typescript
// Review Security Group configurations
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/vpc/home#SecurityGroups"
});

await mcp_chrome.use_browser({
  action: "type",
  selector: ".filter-input",
  payload: "cde-security-group\n"
  });

const sgRules = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".security-group-rules",
  payload: "markdown"
});

// Check Network ACLs
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/vpc/home#NACLs"
});

const naclRules = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".nacl-rules-table",
  payload: "markdown"
});

// Visualize VPC network topology
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/vpc/home#VpcTopology"
});

await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "cde-network-topology.png"
});
```

## Agent Dispatch Patterns

### Parallel Scope Verification
```typescript
// Launch parallel verification across different boundaries
await Promise.all([
  Task(subagent_type="feature-dev:code-explorer", {
    instruction: "Trace payment data flows from frontend to database",
    entrypoint: "src/payment/submit-payment.ts"
  }),

  Task(subagent_type="pr-review-toolkit:code-reviewer", {
    instruction: "Review all payment API endpoints for proper authentication",
    files: "src/api/payment/**/*.ts"
  }),

  Task(subagent_type="pr-review-toolkit:silent-failure-hunter", {
    instruction: "Find any missing authorization checks on CDE endpoints",
    files: "src/api/**/*.ts"
  })
]);
```

## Best Practices

### Scope Validation
- **Automated Verification**: Run boundary tests weekly or after EVERY infrastructure change
- **Data Discovery**: Run DLP scans monthly to ensure no PANs in out-of-scope systems
- **Network Monitoring**: Review VPC flow logs daily for unexpected CDE traffic
- **Code Analysis**: Scan for cardholder data patterns on every commit
- **Documentation**: Maintain current network diagrams and data flow maps

### Testing Strategy
- **External Scans**: nmap from public internet and office VPN
- **Internal Scans**: Egress testing from CDE to verify blocked destinations
- **API Testing**: Unauthenticated requests to all CDE endpoints
- **Database Scans**: DLP scans on non-CDE databases for PAN/CVV
- **Log Analysis**: Search CloudWatch and application logs for PAN patterns

### Workflow Requirements
- **ALWAYS** invoke `code-explorer` to trace complete data flows
- **ALWAYS** invoke `systematic-debugging` when scope violations found
- **ALWAYS** invoke `verification-before-completion` before QSA audit
- **ALWAYS** search Episodic Memory for past scope definitions
- **ALWAYS** get latest PCI DSS docs from Context7
- **NEVER** assume scope without verification
- **NEVER** skip automated boundary testing

### Compliance Evidence
- External nmap scan results (quarterly minimum)
- VPC flow log analysis showing proper segmentation
- DLP scan results showing no PAN in out-of-scope systems
- API authentication test results
- Network topology diagrams with CDE boundaries marked
- Code analysis reports showing data flow boundaries
