# Skill: Security Compliance

**Role:** sequential-reasoner (Security Specialist)
**Domain:** Security & Compliance
**Objective:** Maintain PCI DSS Service Provider Level 1 compliance through automated evidence collection, continuous monitoring, vulnerability management, and regular audits. Leverage ALL available MCP servers, agents, and skills for comprehensive security posture management.

## Available Capabilities

### MCP Servers
| Server | Security Usage |
|--------|----------------|
| **Serena** | Audit code for vulnerabilities, find hardcoded secrets, trace auth flows, discover crypto patterns, analyze data handling |
| **Context7** | Get OWASP Top 10 docs, PCI DSS requirements, security library documentation (bcrypt, jsonwebtoken, helmet), crypto standards |
| **Playwright** | Automated security testing, verify CSP headers, test auth bypasses, validate input sanitization, check CSRF protection |
| **Chrome** | Monitor AWS security dashboards, check WAF logs, verify GuardDuty alerts, review CloudTrail events, inspect security metrics |
| **Episodic Memory** | Recall past security incidents, retrieve audit findings, find previous compliance gaps, reference remediation decisions |

### Superpowers Skills
| Skill | Security-Specific Trigger |
|-------|--------------------------|
| `brainstorming` | Before designing security controls or compliance frameworks |
| `systematic-debugging` | When investigating security incidents or audit failures |
| `test-driven-development` | Before implementing authentication, encryption, or access controls |
| `verification-before-completion` | Before deploying security changes or claiming compliance |
| `writing-plans` | For security remediation projects or compliance initiatives |
| `subagent-driven-development` | Parallel security assessments across multiple domains |
| `requesting-code-review` | After ALL security-critical code changes |
| `episodic-memory:remembering-conversations` | Search past security decisions and compliance discussions |

### Specialized Agents
| Agent | Security Use Case |
|-------|------------------|
| `code-reviewer` | Security-focused code review for vulnerabilities |
| `silent-failure-hunter` | Find auth bypasses, error disclosure, missing validation |
| `type-design-analyzer` | Verify secure type constraints prevent injection |
| `pr-test-analyzer` | Ensure security test coverage for auth/crypto |
| `code-explorer` | Trace data flows to identify PCI scope boundaries |

### Security-Specific Tools
- **WebSearch** - Latest CVEs, security advisories, PCI DSS updates
- **elements-of-style:writing-clearly-and-concisely** - Clear security documentation and runbooks
- **Bash** - Execute security scans, audit tools, compliance checks

## Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  SECURITY COMPLIANCE WORKFLOW                │
└─────────────────────────────────────────────────────────────┘

[1] DAILY AUTOMATED CHECKS
    ├─→ Serena: Scan for hardcoded secrets/API keys
    ├─→ Serena: Search for SQL injection patterns
    ├─→ Chrome: Monitor AWS Inspector scan results
    ├─→ Chrome: Review GuardDuty threat findings
    └─→ Episodic Memory: Check for similar past incidents

[2] WEEKLY SECURITY REVIEWS
    ├─→ Chrome: Analyze WAF logs and blocked requests
    ├─→ Serena: Audit new authentication code
    ├─→ Playwright: Run security regression tests
    ├─→ Context7: Check for updated OWASP guidelines
    └─→ Silent Failure Hunter: Find error handling gaps

[3] MONTHLY COMPLIANCE AUDITS
    ├─→ Code Explorer: Map PCI scope boundaries
    ├─→ Serena: Verify encryption key usage patterns
    ├─→ Chrome: Review IAM policy changes in CloudTrail
    ├─→ Context7: Get latest PCI DSS requirements
    └─→ Verification: Confirm all controls active

[4] QUARTERLY EXTERNAL SCANS
    ├─→ Playwright: Automated external ASV scan
    ├─→ Context7: Get scanning vendor requirements
    ├─→ Chrome: Monitor scan progress dashboard
    ├─→ Episodic Memory: Compare with previous results
    └─→ Code Review: Address all findings

[5] ANNUAL ASSESSMENTS
    ├─→ Penetration Test: Full security assessment
    ├─→ QSA Audit: Third-party compliance audit
    ├─→ Episodic Memory: Review year-over-year changes
    ├─→ Documentation: Update compliance artifacts
    └─→ Verification: Evidence package complete
```

## Workflow Integration

### Phase 1: Security Assessment
- **Episodic Memory**: Search past security incidents and compliance gaps
  ```typescript
  const incidents = await mcp_episodic_memory.search({
    query: ["PCI audit", "security finding", "vulnerability"],
    mode: "both",
    after: "2024-01-01"
  });
  ```

- **Context7**: Get latest OWASP Top 10 and PCI DSS requirements
  ```typescript
  const owaspDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/owasp/top-ten",
    topic: "injection broken authentication",
    mode: "info"
  });

  const pciDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/pcisecuritystandards/pci-dss",
    topic: "requirement 3 6 encryption key management",
    mode: "info"
  });
  ```

- **Serena**: Analyze codebase for security vulnerabilities
  ```typescript
  // Find hardcoded secrets
  const secrets = await mcp_serena.search_for_pattern({
    substring_pattern: "(api_key|secret|password|token)\\s*=\\s*['\"][^'\"]+['\"]",
    paths_exclude_glob: "*.test.*",
    context_lines_before: 2,
    context_lines_after: 2
  });

  // Find SQL injection risks
  const sqlInjection = await mcp_serena.search_for_pattern({
    substring_pattern: "(query|execute).*\\$\\{.*\\}|\\+.*req\\.(body|query|params)",
    paths_include_glob: "**/*.ts",
    context_lines_after: 5
  });

  // Audit authentication code
  const authCode = await mcp_serena.find_symbol({
    name_path_pattern: "authenticate|verify.*token|check.*permission",
    include_body: true
  });
  ```

### Phase 2: Implementation
- **Brainstorming**: Design security controls before implementation
  ```
  Invoke: superpowers:brainstorming
  Goal: Design encryption key rotation strategy for PCI DSS 3.6.4
  ```

- **TDD**: Write security tests FIRST
  ```
  Invoke: superpowers:test-driven-development
  Goal: Implement role-based access control with test coverage
  ```

- **Subagents**: Parallel security domain assessments
  ```typescript
  // Launch parallel security audits
  Task(subagent_type="feature-dev:code-reviewer") → Auth code review
  Task(subagent_type="pr-review-toolkit:silent-failure-hunter") → Error handling audit
  Task(subagent_type="pr-review-toolkit:type-design-analyzer") → Type safety verification
  ```

### Phase 3: Verification
- **Playwright**: Automated security testing
  ```typescript
  // Test XSS protection
  await mcp_playwright.browser_navigate({
    url: `${baseUrl}/search?q=<script>alert('XSS')</script>`
  });
  const snapshot = await mcp_playwright.browser_snapshot({});
  // Verify script tag is escaped in output

  // Test CSRF protection
  await mcp_playwright.browser_evaluate({
    function: `() => fetch('/api/transfer', {
      method: 'POST',
      body: JSON.stringify({ amount: 1000, to: 'attacker' })
    })`
  });
  // Verify 403 Forbidden without CSRF token

  // Verify security headers
  const response = await mcp_playwright.browser_network_requests({});
  // Check for CSP, X-Frame-Options, HSTS, etc.
  ```

- **Chrome**: Monitor AWS security dashboards
  ```typescript
  // Check GuardDuty findings
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/guardduty"
  });

  const findings = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".findings-critical",
    payload: "text"
  });

  // Monitor AWS Inspector scans
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/inspector/v2"
  });

  const vulnerabilities = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".vulnerability-list",
    payload: "markdown"
  });
  ```

- **Verification**: Confirm ALL controls before claiming compliance
  ```
  Invoke: superpowers:verification-before-completion
  Verify: All security controls active, tests passing, evidence collected
  ```

### Phase 4: Audit & Documentation
- **Code Review**: Security-focused review for all changes
  ```
  Invoke: superpowers:requesting-code-review
  Focus: Authentication, encryption, access control, data handling
  ```

- **Silent Failure Hunter**: Find authentication gaps and error disclosure
  ```typescript
  Task(subagent_type="pr-review-toolkit:silent-failure-hunter") → {
    target: "src/auth/**/*.ts",
    focus: "authentication bypass, token validation, error messages"
  }
  ```

- **Documentation**: Clear security documentation using Elements of Style
  ```
  Invoke: elements-of-style:writing-clearly-and-concisely
  Document: Security controls, compliance evidence, incident runbooks
  ```

## MCP Integration Examples

### Serena: Comprehensive Security Code Audit

```typescript
// 1. Find all authentication and authorization code
const authHandlers = await mcp_serena.search_for_pattern({
  substring_pattern: "authenticate|authorize|verify.*token|check.*permission|validate.*session",
  paths_include_glob: "**/*.ts",
  context_lines_after: 10
});

// 2. Analyze password hashing implementation
const passwordCode = await mcp_serena.find_symbol({
  name_path_pattern: "hashPassword|comparePassword|validatePassword",
  include_body: true
});

// 3. Find SQL queries (injection risk)
const sqlQueries = await mcp_serena.search_for_pattern({
  substring_pattern: "query\\(.*\\$\\{|execute.*\\+|raw.*\\`.*\\$\\{",
  paths_include_glob: "**/*.ts",
  context_lines_before: 3,
  context_lines_after: 3
});

// 4. Check for hardcoded secrets
const secrets = await mcp_serena.search_for_pattern({
  substring_pattern: "(api_key|secret|password|private_key|token)\\s*=\\s*['\"][^'\"]{8,}['\"]",
  paths_exclude_glob: "*.test.*,*.spec.*,*.mock.*"
});

// 5. Audit encryption key usage
const encryptionCode = await mcp_serena.search_for_pattern({
  substring_pattern: "encrypt|decrypt|cipher|KMS|createCipheriv",
  paths_include_glob: "**/*.ts",
  context_lines_before: 5,
  context_lines_after: 5
});

// 6. Find eval/Function usage (code injection risk)
const codeInjection = await mcp_serena.search_for_pattern({
  substring_pattern: "eval\\(|Function\\(|setTimeout\\(.*\\+|setInterval\\(.*\\+",
  paths_include_glob: "**/*.{ts,js}"
});

// 7. Analyze JWT token handling
const jwtCode = await mcp_serena.find_symbol({
  name_path_pattern: "verify.*jwt|sign.*jwt|decode.*token",
  include_body: true
});

// 8. Check for proper input validation
const validationCode = await mcp_serena.search_for_pattern({
  substring_pattern: "z\\..*\\(|validate|sanitize|escape",
  paths_include_glob: "src/api/**/*.ts",
  context_lines_after: 3
});
```

### Context7: Security Documentation & Best Practices

```typescript
// Get OWASP guidelines
const owaspAuth = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/owasp/cheatsheetseries",
  topic: "authentication session management jwt",
  mode: "info"
});

const owaspCrypto = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/owasp/cheatsheetseries",
  topic: "cryptographic storage key management",
  mode: "info"
});

// Get bcrypt best practices
const bcryptDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/kelektiv/node.bcrypt.js",
  topic: "hash rounds salt secure password",
  mode: "code"
});

// Get JWT security guidelines
const jwtDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/auth0/node-jsonwebtoken",
  topic: "verify algorithm none attack secure",
  mode: "code"
});

// Get helmet.js security headers
const helmetDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/helmetjs/helmet",
  topic: "CSP content security policy HSTS",
  mode: "code"
});

// Get crypto library best practices
const cryptoDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/nodejs/node",
  topic: "crypto createCipheriv AES-256-GCM",
  mode: "code"
});

// Get AWS KMS encryption
const kmsDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/aws/aws-sdk-js",
  topic: "KMS encrypt decrypt key rotation",
  mode: "code"
});
```

### Playwright: Automated Security Testing

```typescript
// 1. Test XSS protection
await mcp_playwright.browser_navigate({
  url: `${baseUrl}/search?q=<script>alert(1)</script>`
});
const xssSnapshot = await mcp_playwright.browser_snapshot({});
// Verify: Script tag should be escaped as &lt;script&gt;

await mcp_playwright.browser_navigate({
  url: `${baseUrl}/profile?name=<img src=x onerror=alert(1)>`
});
const xssImgSnapshot = await mcp_playwright.browser_snapshot({});
// Verify: No alert execution

// 2. Test authentication bypass
await mcp_playwright.browser_navigate({ url: `${baseUrl}/admin` });
await mcp_playwright.browser_wait_for({ text: "Login required" });
// Verify: Redirected to login without valid session

// 3. Test CSRF protection
const csrfResult = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const response = await fetch('/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000, to: 'attacker' })
    });
    return response.status;
  }`
});
// Verify: Should return 403 Forbidden without CSRF token

// 4. Test SQL injection
await mcp_playwright.browser_navigate({
  url: `${baseUrl}/users?id=1' OR '1'='1`
});
const sqlSnapshot = await mcp_playwright.browser_snapshot({});
// Verify: Should not expose database error or return all users

// 5. Verify security headers
await mcp_playwright.browser_navigate({ url: baseUrl });
const networkRequests = await mcp_playwright.browser_network_requests({});
// Check for:
// - Content-Security-Policy
// - X-Frame-Options: DENY
// - X-Content-Type-Options: nosniff
// - Strict-Transport-Security
// - X-XSS-Protection: 1; mode=block

// 6. Test session timeout
await mcp_playwright.browser_navigate({ url: `${baseUrl}/login` });
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Email", type: "textbox", ref: "email", value: "test@example.com" },
    { name: "Password", type: "textbox", ref: "password", value: "ValidPass123!" }
  ]
});
await mcp_playwright.browser_click({ element: "Login button", ref: "login-btn" });
await mcp_playwright.browser_wait_for({ time: 1800 }); // 30 min
await mcp_playwright.browser_navigate({ url: `${baseUrl}/dashboard` });
await mcp_playwright.browser_wait_for({ text: "Session expired" });

// 7. Test rate limiting
const rateLimitTest = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const results = [];
    for (let i = 0; i < 150; i++) {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@test.com', password: 'wrong' })
      });
      results.push(res.status);
    }
    return results;
  }`
});
// Verify: Should see 429 Too Many Requests after threshold
```

### Chrome: Security Dashboard Monitoring

```typescript
// 1. Monitor AWS GuardDuty findings
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/guardduty/home#/findings"
});

const guardDutyFindings = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".findings-table",
  payload: "markdown"
});

const criticalFindings = await mcp_chrome.use_browser({
  action: "eval",
  payload: "document.querySelectorAll('.severity-critical').length"
});

// 2. Check AWS WAF blocked requests
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/wafv2/home#/webacl"
});

const blockedRequests = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".blocked-requests-metric",
  payload: "text"
});

// 3. Review CloudTrail security events
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/cloudtrail/home#/events"
});

await mcp_chrome.use_browser({
  action: "type",
  selector: ".event-filter",
  payload: "eventName=DeleteTrail OR eventName=StopLogging OR eventName=AuthorizeSecurityGroupIngress\n"
});

const securityEvents = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".events-list",
  payload: "markdown"
});

// 4. Monitor AWS Inspector vulnerability scans
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/inspector/v2/home#/findings"
});

const vulnerabilities = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".vulnerability-summary",
  payload: "markdown"
});

// 5. Check IAM Access Analyzer findings
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/access-analyzer/home#/findings"
});

const accessFindings = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".findings-list",
  payload: "markdown"
});

// 6. Monitor Security Hub compliance scores
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/securityhub/home#/summary"
});

const complianceScore = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".compliance-score",
  payload: "text"
});
```

### Episodic Memory: Past Security Context

```typescript
// Search past security incidents
const incidents = await mcp_episodic_memory.search({
  query: ["security incident", "breach", "vulnerability", "exploit"],
  mode: "both",
  limit: 20,
  after: "2024-01-01"
});

// Search for past PCI audit findings
const pciFindings = await mcp_episodic_memory.search({
  query: "PCI audit finding remediation",
  mode: "both",
  after: "2024-01-01"
});

// Search for authentication issues
const authIssues = await mcp_episodic_memory.search({
  query: ["authentication", "bypass", "broken access control"],
  mode: "both",
  limit: 10
});

// Search for encryption decisions
const cryptoDecisions = await mcp_episodic_memory.search({
  query: ["encryption", "KMS", "key rotation", "AES-256"],
  mode: "both"
});

// Compare with previous quarterly scans
const previousScans = await mcp_episodic_memory.search({
  query: "quarterly ASV scan results",
  after: "2024-01-01",
  before: "2024-12-31"
});
```

## Agent Dispatch Patterns

### Comprehensive Security Review
```typescript
// Launch parallel security audits across multiple domains
const securityReview = await Promise.all([
  Task(subagent_type="feature-dev:code-reviewer", {
    instruction: "Review all authentication code for security vulnerabilities",
    files: "src/auth/**/*.ts"
  }),

  Task(subagent_type="pr-review-toolkit:silent-failure-hunter", {
    instruction: "Find authentication bypasses and error disclosure issues",
    files: "src/api/**/*.ts"
  }),

  Task(subagent_type="pr-review-toolkit:type-design-analyzer", {
    instruction: "Verify type constraints prevent injection attacks",
    files: "src/types/**/*.ts"
  }),

  Task(subagent_type="pr-review-toolkit:pr-test-analyzer", {
    instruction: "Ensure security test coverage for auth and crypto",
    files: "src/**/*.test.ts"
  })
]);
```

### PCI Scope Boundary Analysis
```typescript
Task(subagent_type="feature-dev:code-explorer", {
  instruction: "Trace all data flows that handle cardholder data",
  entrypoint: "src/payment/process-payment.ts"
}) → Map PCI scope boundaries
```

## Best Practices

### Compliance Requirements
- **Least Privilege**: IAM roles must have ZERO wildcards (`*`). Verify with Serena code search.
- **Data Minimization**: NEVER store raw PAN or CVV. Search codebase with Serena for violations.
- **Encryption Standards**: AES-256-GCM for storage, TLS 1.3 for transit. Verify with Context7 docs.
- **Key Rotation**: Annual rotation via AWS KMS. Monitor with Chrome dashboard.
- **Access Logging**: CloudTrail, VPC Flow Logs, ALB logs. Analyze with Chrome and Athena.
- **Audit Retention**: Keep logs for minimum 1 year (hot for 3 months).

### Development Workflow
- **ALWAYS** invoke `systematic-debugging` when investigating security incidents
- **ALWAYS** invoke `test-driven-development` before implementing auth/crypto
- **ALWAYS** invoke `requesting-code-review` after ALL security-critical changes
- **ALWAYS** invoke `verification-before-completion` before deploying security updates
- **ALWAYS** search Episodic Memory before starting security work
- **ALWAYS** get latest OWASP/PCI docs from Context7
- **ALWAYS** run silent-failure-hunter on authentication code
- **NEVER** skip security tests or code review

### Security Testing
- Run Playwright security tests on EVERY pull request
- Monitor Chrome dashboards DAILY for security alerts
- Execute quarterly ASV scans with Playwright automation
- Perform annual penetration testing with comprehensive scope
- Verify security headers on ALL endpoints

### Documentation
- Use `elements-of-style:writing-clearly-and-concisely` for security docs
- Document ALL security decisions in Serena memory
- Maintain clear incident response runbooks
- Track compliance evidence systematically
- Update security architecture diagrams quarterly

### Continuous Monitoring
- **Daily**: Serena secret scans, Chrome GuardDuty checks
- **Weekly**: WAF log analysis, security regression tests
- **Monthly**: PCI scope verification, encryption key audits
- **Quarterly**: External ASV scans, compliance reviews
- **Annually**: Penetration tests, third-party QSA audits
