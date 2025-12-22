# Skill: Perform Penetration Test

**Role:** sequential-reasoner (Security Specialist)
**Domain:** Security & Compliance
**Objective:** Simulate attacks against the Cardholder Data Environment to identify vulnerabilities (injection, XSS, broken access control) before real attackers do. Leverage ALL available capabilities for comprehensive security testing, automated vulnerability scanning, and detailed reporting (PCI DSS Requirement 11.3).

## Available Capabilities

### MCP Servers
| Server | Security Usage |
|--------|----------------|
| **Serena** | Find authentication code for testing, discover API endpoints, analyze input validation, trace authorization logic |
| **Context7** | Get OWASP Top 10 docs, penetration testing methodologies, vulnerability disclosure guidelines, security testing tools |
| **Playwright** | Automated penetration testing, test injection attacks, verify security controls, validate authentication bypasses |
| **Chrome** | Monitor security dashboards during tests, verify WAF blocks attacks, check IDS/IPS alerts, review test impact |
| **Episodic Memory** | Recall past vulnerabilities found, retrieve remediation history, compare test results year-over-year |

### Superpowers Skills
| Skill | Security-Specific Trigger |
|-------|--------------------------|
| `brainstorming` | Before designing comprehensive pen test strategy |
| `systematic-debugging` | When investigating complex vulnerability chains |
| `test-driven-development` | Before implementing automated security tests |
| `verification-before-completion` | Before certifying security posture to auditors |
| `writing-plans` | For annual penetration testing scope and timeline |
| `subagent-driven-development` | Parallel testing across multiple attack vectors |
| `requesting-code-review` | After implementing security fixes for findings |

### Specialized Agents
| Agent | Security Use Case |
|-------|------------------|
| `code-reviewer` | Review code for vulnerabilities found during testing |
| `silent-failure-hunter` | Find authentication bypasses and authorization gaps |
| `code-explorer` | Trace attack paths from input to vulnerability |
| `type-design-analyzer` | Verify type constraints prevent injection |

### Security-Specific Tools
- **WebSearch** - Latest CVEs, exploit techniques, penetration testing methodologies
- **Bash** - Execute security tools (OWASP ZAP, Nuclei, SQLMap), run automated scans
- **elements-of-style:writing-clearly-and-concisely** - Clear vulnerability reports and remediation guidance

## Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│            PENETRATION TESTING WORKFLOW                      │
└─────────────────────────────────────────────────────────────┘

[1] PLANNING & AUTHORIZATION
    ├─→ Episodic Memory: Review past test results
    ├─→ Context7: Get pen testing methodologies
    ├─→ Documentation: Define scope (CDE systems only)
    ├─→ Authorization: AWS pen test approval (if needed)
    ├─→ Timing: Schedule for off-peak hours
    └─→ Communication: Notify security team

[2] RECONNAISSANCE (Information Gathering)
    ├─→ Serena: Map API endpoints and routes
    ├─→ Serena: Find authentication mechanisms
    ├─→ Chrome: Discover exposed services
    ├─→ Bash: DNS enumeration, port scanning
    └─→ Episodic Memory: Compare with previous scans

[3] AUTOMATED VULNERABILITY SCANNING
    ├─→ Bash: Run OWASP ZAP automated scan
    ├─→ Bash: Nuclei template-based scanning
    ├─→ Playwright: Authenticated scanning
    ├─→ Chrome: Monitor WAF for blocked requests
    └─→ Analysis: Triage findings (true vs false positive)

[4] MANUAL EXPLOITATION TESTING
    ├─→ Playwright: Test SQLi in all input fields
    ├─→ Playwright: Test XSS in search/forms
    ├─→ Playwright: Test authentication bypass
    ├─→ Playwright: Test authorization bypass (IDOR)
    ├─→ Playwright: Test CSRF protection
    ├─→ Playwright: Test rate limiting
    └─→ Chrome: Verify WAF blocks (if not, finding!)

[5] BUSINESS LOGIC TESTING
    ├─→ Serena: Analyze payment flow logic
    ├─→ Playwright: Test negative amounts
    ├─→ Playwright: Test 3DS bypass attempts
    ├─→ Playwright: Test refund logic abuse
    ├─→ Playwright: Test race conditions
    └─→ Silent Failure Hunter: Find error handling gaps

[6] REPORTING & REMEDIATION
    ├─→ Documentation: Detailed findings report
    ├─→ CVSS Scoring: Severity classification
    ├─→ Code Review: Review vulnerable code
    ├─→ Systematic Debugging: Root cause analysis
    ├─→ Verification: Confirm fixes work
    └─→ Episodic Memory: Document for next year
```

## Workflow Integration

### Phase 1: Planning & Authorization
- **Episodic Memory**: Review past penetration tests
  ```typescript
  const pastTests = await mcp_episodic_memory.search({
    query: ["penetration test", "pen test results", "vulnerability scan", "security assessment"],
    mode: "both",
    after: "2023-01-01"
  });

  // Find past vulnerabilities to retest
  const pastVulns = await mcp_episodic_memory.search({
    query: ["SQL injection", "XSS", "authentication bypass", "IDOR"],
    mode: "both",
    after: "2023-01-01"
  });
  ```

- **Context7**: Get pen testing methodology
  ```typescript
  const owaspTesting = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/owasp/testing-guide",
    topic: "penetration testing methodology web application",
    mode: "info"
  });

  const pciTesting = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/pcisecuritystandards/pci-dss",
    topic: "requirement 11.3 penetration testing",
    mode: "info"
  });
  ```

- **Writing Plans**: Create comprehensive test plan
  ```
  Invoke: superpowers:writing-plans
  Task: Design annual penetration testing plan covering OWASP Top 10 and PCI-specific tests
  ```

### Phase 2: Reconnaissance
- **Serena**: Map attack surface
  ```typescript
  // Find all API endpoints
  const apiEndpoints = await mcp_serena.search_for_pattern({
    substring_pattern: "router\\.(get|post|put|delete|patch)\\(['\"]",
    paths_include_glob: "src/api/**/*.ts",
    context_lines_after: 5
  });

  // Find authentication mechanisms
  const authMechanisms = await mcp_serena.search_for_pattern({
    substring_pattern: "passport|jwt|session|authenticate|verifyToken",
    paths_include_glob: "src/**/*.ts",
    context_lines_after: 10
  });

  // Find input validation
  const validation = await mcp_serena.search_for_pattern({
    substring_pattern: "z\\..*\\(|validate|sanitize|escape|schema",
    paths_include_glob: "src/**/*.ts",
    context_lines_after: 5
  });

  // Find database queries (potential SQLi targets)
  const dbQueries = await mcp_serena.search_for_pattern({
    substring_pattern: "query\\(|execute\\(|raw\\(|findOne|findMany",
    paths_include_glob: "src/**/*.ts",
    context_lines_after: 3
  });
  ```

- **Bash**: Network reconnaissance
  ```bash
  # Port scan (external view)
  nmap -sV -p- payment-api.example.com -oN pentest-portscan.txt

  # DNS enumeration
  dig payment-api.example.com ANY
  dig @8.8.8.8 payment-api.example.com

  # SSL/TLS testing
  bun x tsx scripts/test-ssl.ts --host payment-api.example.com
  # Check for weak ciphers, expired certs, missing HSTS
  ```

### Phase 3: Automated Scanning
- **Bash**: OWASP ZAP automated scan
  ```bash
  # Start ZAP in daemon mode
  zap.sh -daemon -port 8080 -config api.key=your-api-key

  # Spider the application
  bun x tsx scripts/zap-spider.ts --target https://payment-api.example.com

  # Active scan
  bun x tsx scripts/zap-scan.ts --target https://payment-api.example.com

  # Generate report
  bun x tsx scripts/zap-report.ts --format html --output pentest-report.html
  ```

- **Bash**: Nuclei vulnerability scanning
  ```bash
  # Run Nuclei with all templates
  nuclei -u https://payment-api.example.com \
    -t ~/nuclei-templates/ \
    -severity critical,high,medium \
    -o nuclei-findings.txt

  # Check for specific vulnerabilities
  nuclei -u https://payment-api.example.com \
    -t ~/nuclei-templates/cves/ \
    -t ~/nuclei-templates/vulnerabilities/ \
    -json -o nuclei-results.json
  ```

- **Chrome**: Monitor WAF during scanning
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/wafv2/home#/webacl/PaymentAPIWAF/sampled-requests"
  });

  // Monitor blocked requests during scan
  const blockedRequests = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".sampled-requests-table",
    payload: "markdown"
  });
  // Verify: Attack payloads should be blocked by WAF
  ```

### Phase 4: Manual Exploitation Testing
- **Playwright**: Test SQL Injection
  ```typescript
  // Test SQLi in query parameters
  const sqliTests = [
    "1' OR '1'='1",
    "1' UNION SELECT NULL, NULL, NULL--",
    "1'; DROP TABLE users--",
    "1' AND 1=CONVERT(int, (SELECT @@version))--"
  ];

  for (const payload of sqliTests) {
    await mcp_playwright.browser_navigate({
      url: `${baseUrl}/api/users?id=${encodeURIComponent(payload)}`
    });

    const response = await mcp_playwright.browser_network_requests({});
    // Verify: Should return 403 (blocked) or 400 (validated), NOT 200 with data leak
  }

  // Test SQLi in POST body
  const postSQLi = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: "' OR '1'='1" })
      });
      return { status: response.status, body: await response.text() };
    }`
  });
  ```

- **Playwright**: Test Cross-Site Scripting (XSS)
  ```typescript
  const xssPayloads = [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "javascript:alert('XSS')",
    "<svg onload=alert('XSS')>",
    "'\"><script>alert(String.fromCharCode(88,83,83))</script>"
  ];

  for (const payload of xssPayloads) {
    await mcp_playwright.browser_navigate({
      url: `${baseUrl}/search?q=${encodeURIComponent(payload)}`
    });

    const snapshot = await mcp_playwright.browser_snapshot({});
    const pageContent = await mcp_playwright.browser_evaluate({
      function: "() => document.body.innerHTML"
    });

    // Verify: Script should be escaped, not executed
    // Check for: &lt;script&gt; instead of <script>
  }
  ```

- **Playwright**: Test Authentication Bypass
  ```typescript
  // Test accessing admin without authentication
  await mcp_playwright.browser_navigate({
    url: `${baseUrl}/admin/dashboard`
  });
  await mcp_playwright.browser_wait_for({ text: "Login required" });
  // Verify: Should redirect to login

  // Test JWT bypass (missing signature verification)
  const jwtBypass = await mcp_playwright.browser_evaluate({
    function: `async () => {
      // Attempt unsigned JWT
      const fakeJWT = btoa(JSON.stringify({ alg: "none" })) + "." +
                      btoa(JSON.stringify({ userId: 1, role: "admin" })) + ".";

      const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': 'Bearer ' + fakeJWT }
      });
      return response.status;
    }`
  });
  // Verify: Should return 401 Unauthorized, not 200
  ```

- **Playwright**: Test Authorization Bypass (IDOR)
  ```typescript
  // Test accessing another user's data
  await mcp_playwright.browser_navigate({ url: `${baseUrl}/login` });
  // Login as user ID 100
  await mcp_playwright.browser_fill_form({
    fields: [
      { name: "Email", type: "textbox", ref: "email", value: "user100@test.com" },
      { name: "Password", type: "textbox", ref: "password", value: "password123" }
    ]
  });
  await mcp_playwright.browser_click({ element: "Login", ref: "login-btn" });

  // Attempt to access user ID 101's data
  const idorTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const response = await fetch('/api/users/101/profile');
      return { status: response.status, body: await response.text() };
    }`
  });
  // Verify: Should return 403 Forbidden, not 200 with user 101's data
  ```

- **Playwright**: Test CSRF Protection
  ```typescript
  const csrfTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      // Attempt state-changing operation without CSRF token
      const response = await fetch('/api/payment/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: 'attacker', amount: 1000 })
      });
      return response.status;
    }`
  });
  // Verify: Should return 403 Forbidden (CSRF token missing)
  ```

### Phase 5: Business Logic Testing
- **Serena**: Analyze payment logic
  ```typescript
  const paymentLogic = await mcp_serena.find_symbol({
    name_path_pattern: "processPayment|createPayment|authorizePayment",
    include_body: true
  });
  ```

- **Playwright**: Test negative amounts
  ```typescript
  const negativeAmountTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: -100,
          cardNumber: '4111111111111111',
          cvv: '123'
        })
      });
      return { status: response.status, body: await response.json() };
    }`
  });
  // Verify: Should reject negative amounts (not credit attacker's account!)
  ```

- **Playwright**: Test 3D Secure bypass
  ```typescript
  const bypass3DS = await mcp_playwright.browser_evaluate({
    function: `async () => {
      // Attempt to skip 3DS step
      const response = await fetch('/api/payment/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: 'pay_123',
          skip3DS: true  // Should be rejected
        })
      });
      return response.status;
    }`
  });
  // Verify: Cannot bypass 3DS authentication
  ```

- **Silent Failure Hunter**: Find error handling gaps
  ```typescript
  Task(subagent_type="pr-review-toolkit:silent-failure-hunter", {
    instruction: "Find all payment processing code that might fail silently or leak sensitive information in error messages",
    files: "src/payment/**/*.ts"
  }) → Error handling analysis
  ```

### Phase 6: Reporting & Remediation
- **Documentation**: Generate findings report
  ```
  Invoke: elements-of-style:writing-clearly-and-concisely
  Document: Penetration test findings with CVSS scores, evidence, and remediation steps
  ```

- **Code Review**: Review vulnerable code
  ```
  Invoke: superpowers:requesting-code-review
  Focus: Review all code paths identified in pen test findings
  ```

- **Systematic Debugging**: Root cause analysis
  ```
  Invoke: superpowers:systematic-debugging
  Goal: Investigate root cause of authentication bypass vulnerability
  ```

- **Verification**: Confirm fixes
  ```
  Invoke: superpowers:verification-before-completion
  Verify: Re-test all findings to confirm remediation is effective
  ```

- **Episodic Memory**: Document for next year
  ```typescript
  await mcp_serena.write_memory({
    memory_file_name: "pentest-2024-results.md",
    content: `# Penetration Test Results - 2024

## Summary
- Test Date: 2024-10-15
- Scope: Payment API, CDE endpoints
- Methodology: OWASP Testing Guide v4
- Tools: OWASP ZAP, Nuclei, Playwright

## Findings
### Critical (CVSS 9.0+)
- None

### High (CVSS 7.0-8.9)
- [FIXED] SQL Injection in /api/search endpoint
- [FIXED] IDOR in /api/users/:id/profile endpoint

### Medium (CVSS 4.0-6.9)
- [FIXED] Missing rate limiting on /api/login
- [ACCEPTED RISK] Geo-blocking not enabled (business decision)

### Low (CVSS 0.1-3.9)
- [FIXED] Server version disclosure in HTTP headers

## Remediation
- All critical and high findings remediated within 30 days
- Retested on 2024-11-15 - all fixes confirmed effective

## Compliance
- PCI DSS 11.3: ✓ Annual penetration test completed
- Report delivered to QSA on 2024-11-20
`
  });
  ```

## Best Practices

### Testing Scope (PCI DSS 11.3)
- **In Scope**: All CDE systems, segmentation controls, critical systems
- **Test Frequency**: Annual minimum, plus after significant infrastructure changes
- **Methodology**: OWASP Testing Guide, PTES, or industry-standard framework
- **Authorization**: AWS pen test approval (for network-layer testing)
- **Timing**: Off-peak hours to minimize business impact

### Attack Vectors to Test
- **Injection**: SQLi, NoSQLi, Command Injection, XPath Injection
- **Broken Authentication**: Brute force, session hijacking, JWT bypass
- **Sensitive Data Exposure**: Unencrypted transmission, weak crypto
- **XML External Entities (XXE)**: XML parser attacks
- **Broken Access Control**: IDOR, privilege escalation, forced browsing
- **Security Misconfiguration**: Default credentials, verbose errors
- **Cross-Site Scripting (XSS)**: Reflected, stored, DOM-based
- **Insecure Deserialization**: Object injection attacks
- **Using Components with Known Vulnerabilities**: Outdated libraries
- **Insufficient Logging & Monitoring**: Missing audit trails

### CVSS Scoring
- **Critical (9.0-10.0)**: Remote code execution, authentication bypass
- **High (7.0-8.9)**: SQL injection, privilege escalation
- **Medium (4.0-6.9)**: CSRF, information disclosure
- **Low (0.1-3.9)**: Verbose errors, version disclosure

### Remediation Timeline
- **Critical**: Immediate (within 24 hours)
- **High**: Within 30 days
- **Medium**: Within 90 days
- **Low**: Next release cycle

### Workflow Requirements
- **ALWAYS** invoke `writing-plans` before annual pen test
- **ALWAYS** invoke `systematic-debugging` for root cause analysis
- **ALWAYS** invoke `verification-before-completion` after remediation
- **ALWAYS** search Episodic Memory for past vulnerabilities
- **ALWAYS** get latest OWASP docs from Context7
- **ALWAYS** run silent-failure-hunter on payment code
- **NEVER** test production without authorization
- **NEVER** exfiltrate real customer data during testing
- **NEVER** perform destructive tests without approval

### Reporting Requirements
- **Executive Summary**: Business impact, risk rating, remediation timeline
- **Technical Details**: Vulnerability description, CVSS score, evidence (screenshots/logs)
- **Reproduction Steps**: Clear steps to reproduce each finding
- **Remediation Guidance**: Specific code fixes or configuration changes
- **Retest Results**: Confirmation that fixes are effective
- **Compliance Mapping**: How findings relate to PCI DSS requirements

### Tool Recommendations
- **OWASP ZAP**: Free, automated web app scanning
- **Nuclei**: Template-based vulnerability scanning
- **Playwright**: Automated browser-based testing
- **Burp Suite**: Manual testing and proxy
- **SQLMap**: Advanced SQL injection testing
- **Nmap**: Network mapping and port scanning
