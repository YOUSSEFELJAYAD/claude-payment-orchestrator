# Skill: Configure WAF Rules

**Role:** sequential-reasoner (Security Specialist)
**Domain:** Security & Compliance
**Objective:** Deploy and tune a Web Application Firewall (WAF) to protect payment APIs from OWASP Top 10 threats (SQLi, XSS, bot attacks) using automated rule management, threat intelligence, and comprehensive testing with ALL available capabilities.

## Available Capabilities

### MCP Servers
| Server | Security Usage |
|--------|----------------|
| **Serena** | Find WAF configurations, audit rule definitions, discover managed rule implementations, analyze rate limiting logic |
| **Context7** | Get AWS WAFv2 docs, OWASP Top 10 guidance, Mod Security rules, rate limiting best practices |
| **Playwright** | Test WAF rules, verify SQLi/XSS blocking, validate rate limiting, test geo-blocking effectiveness |
| **Chrome** | Monitor WAF dashboards, review blocked requests, analyze traffic patterns, tune false positives |
| **Episodic Memory** | Recall past WAF tuning decisions, retrieve false positive patterns, find attack signatures |

### Superpowers Skills
| Skill | Security-Specific Trigger |
|-------|--------------------------|
| `brainstorming` | Before designing WAF ruleset architecture |
| `systematic-debugging` | When investigating false positives or bypass attempts |
| `test-driven-development` | Before implementing custom WAF rules |
| `verification-before-completion` | Before switching from Count to Block mode |
| `writing-plans` | For comprehensive WAF deployment strategy |
| `requesting-code-review` | After implementing custom WAF rules |

### Specialized Agents
| Agent | Security Use Case |
|-------|------------------|
| `code-reviewer` | Review WAF configuration for completeness |
| `silent-failure-hunter` | Find rules that fail silently or allow bypasses |

### Security-Specific Tools
- **WebSearch** - Latest OWASP Top 10, CVE advisories, WAF bypass techniques
- **Bash** - AWS CLI for WAF management, rule testing, log analysis
- **elements-of-style:writing-clearly-and-concisely** - Clear WAF documentation and runbooks

## Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│               WAF CONFIGURATION WORKFLOW                     │
└─────────────────────────────────────────────────────────────┘

[1] ENABLE AWS MANAGED RULES
    ├─→ Serena: Find existing WAF configuration
    ├─→ Context7: Get AWS Managed Rules documentation
    ├─→ Bash: Enable Core Rule Set (CRS)
    ├─→ Bash: Enable SQL Injection Rule Set
    ├─→ Bash: Enable Known Bad Inputs Rule Set
    └─→ Mode: Start in COUNT (tuning) mode

[2] IMPLEMENT CUSTOM RULES
    ├─→ Brainstorming: Design custom rule requirements
    ├─→ Rate Limiting: 100 req/5min per IP
    ├─→ Geo-Blocking: Block sanctioned countries
    ├─→ Token Validation: Require auth headers on sensitive endpoints
    ├─→ Bot Detection: Challenge suspicious user agents
    └─→ IP Reputation: Block known malicious IPs

[3] TUNING PHASE (24-48 hours)
    ├─→ Chrome: Monitor blocked requests in COUNT mode
    ├─→ Bash: Analyze WAF logs for false positives
    ├─→ Episodic Memory: Check past tuning decisions
    ├─→ Playwright: Test legitimate traffic patterns
    └─→ Adjust: Whitelist internal IPs, tune thresholds

[4] TESTING & VALIDATION
    ├─→ TDD: Write security tests first
    ├─→ Playwright: Test SQLi payloads get blocked
    ├─→ Playwright: Test XSS payloads get blocked
    ├─→ Playwright: Verify rate limiting works
    ├─→ Verification: Confirm legitimate traffic passes
    └─→ Code Review: Review custom rule logic

[5] PRODUCTION DEPLOYMENT
    ├─→ Bash: Switch rules from COUNT to BLOCK mode
    ├─→ Chrome: Monitor dashboard for spikes
    ├─→ Episodic Memory: Document deployment
    ├─→ Alerting: Set up CloudWatch alarms
    └─→ Verification: Confirm WAF is blocking attacks

[6] CONTINUOUS MONITORING
    ├─→ Chrome: Daily review of blocked requests
    ├─→ WebSearch: Check for new attack patterns
    ├─→ Bash: Query WAF logs for anomalies
    ├─→ Episodic Memory: Track attack trends
    └─→ Updates: Adjust rules based on threat intel
```

## Workflow Integration

### Phase 1: Enable Managed Rules
- **Context7**: Get AWS WAF documentation
  ```typescript
  const wafDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/aws/aws-sdk-js",
    topic: "WAFv2 managed rules WebACL",
    mode: "code"
  });

  const owaspDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/owasp/top-ten",
    topic: "SQL injection XSS CSRF",
    mode: "info"
  });
  ```

- **Serena**: Find existing WAF configuration
  ```typescript
  const wafConfig = await mcp_serena.search_for_pattern({
    substring_pattern: "aws_wafv2_web_acl|WAFv2.*WebACL|managedRuleGroupStatement",
    paths_include_glob: "infrastructure/**/*.{tf,ts,yml}",
    context_lines_after: 20
  });
  ```

- **Bash**: Deploy managed rule sets
  ```bash
  # Create WAF Web ACL with managed rules
  aws wafv2 create-web-acl \
    --name "PaymentAPIWAF" \
    --scope REGIONAL \
    --default-action Allow={} \
    --rules file://waf-rules.json \
    --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=PaymentAPIWAF

  # Example waf-rules.json for managed rules
  cat > waf-rules.json <<'EOF'
  [
    {
      "Name": "AWSManagedRulesCommonRuleSet",
      "Priority": 1,
      "Statement": {
        "ManagedRuleGroupStatement": {
          "VendorName": "AWS",
          "Name": "AWSManagedRulesCommonRuleSet"
        }
      },
      "OverrideAction": { "Count": {} },
      "VisibilityConfig": {
        "SampledRequestsEnabled": true,
        "CloudWatchMetricsEnabled": true,
        "MetricName": "CommonRuleSet"
      }
    },
    {
      "Name": "AWSManagedRulesSQLiRuleSet",
      "Priority": 2,
      "Statement": {
        "ManagedRuleGroupStatement": {
          "VendorName": "AWS",
          "Name": "AWSManagedRulesSQLiRuleSet"
        }
      },
      "OverrideAction": { "Count": {} },
      "VisibilityConfig": {
        "SampledRequestsEnabled": true,
        "CloudWatchMetricsEnabled": true,
        "MetricName": "SQLiRuleSet"
      }
    }
  ]
  EOF
  ```

### Phase 2: Custom Rules
- **Brainstorming**: Design custom security rules
  ```
  Invoke: superpowers:brainstorming
  Goal: Design rate limiting and geo-blocking strategy for payment API
  ```

- **Serena**: Implement custom rules in infrastructure code
  ```typescript
  const customRules = await mcp_serena.search_for_pattern({
    substring_pattern: "RateBasedStatement|GeoMatchStatement|ByteMatchStatement",
    paths_include_glob: "infrastructure/waf/**/*.{tf,ts}",
    context_lines_after: 15
  });
  ```

- **Bash**: Deploy custom WAF rules
  ```bash
  # Rate limiting rule (100 req/5min)
  cat > rate-limit-rule.json <<'EOF'
  {
    "Name": "RateLimitRule",
    "Priority": 10,
    "Statement": {
      "RateBasedStatement": {
        "Limit": 100,
        "AggregateKeyType": "IP"
      }
    },
    "Action": { "Block": {} },
    "VisibilityConfig": {
      "SampledRequestsEnabled": true,
      "CloudWatchMetricsEnabled": true,
      "MetricName": "RateLimit"
    }
  }
  EOF

  # Geo-blocking rule (block sanctioned countries)
  cat > geo-block-rule.json <<'EOF'
  {
    "Name": "GeoBlockRule",
    "Priority": 11,
    "Statement": {
      "GeoMatchStatement": {
        "CountryCodes": ["KP", "IR", "SY", "CU"]
      }
    },
    "Action": { "Block": {} },
    "VisibilityConfig": {
      "SampledRequestsEnabled": true,
      "CloudWatchMetricsEnabled": true,
      "MetricName": "GeoBlock"
    }
  }
  EOF

  # Token validation rule (require auth on /api/pay)
  cat > token-check-rule.json <<'EOF'
  {
    "Name": "RequireAuthToken",
    "Priority": 12,
    "Statement": {
      "AndStatement": {
        "Statements": [
          {
            "ByteMatchStatement": {
              "SearchString": "/api/pay",
              "FieldToMatch": { "UriPath": {} },
              "TextTransformations": [{ "Priority": 0, "Type": "LOWERCASE" }],
              "PositionalConstraint": "STARTS_WITH"
            }
          },
          {
            "NotStatement": {
              "Statement": {
                "ByteMatchStatement": {
                  "SearchString": "Bearer ",
                  "FieldToMatch": { "SingleHeader": { "Name": "authorization" } },
                  "TextTransformations": [{ "Priority": 0, "Type": "NONE" }],
                  "PositionalConstraint": "STARTS_WITH"
                }
              }
            }
          }
        ]
      }
    },
    "Action": { "Block": {} },
    "VisibilityConfig": {
      "SampledRequestsEnabled": true,
      "CloudWatchMetricsEnabled": true,
      "MetricName": "TokenCheck"
    }
  }
  EOF
  ```

### Phase 3: Tuning (COUNT mode)
- **Chrome**: Monitor WAF metrics in Count mode
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/wafv2/home#/webacl/PaymentAPIWAF/metrics"
  });

  const countedRequests = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".counted-requests-chart",
    payload: "markdown"
  });

  // Check for false positives
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/wafv2/home#/webacl/PaymentAPIWAF/sampled-requests"
  });

  const sampledRequests = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".sampled-requests-table",
    payload: "markdown"
  });
  ```

- **Bash**: Analyze WAF logs for patterns
  ```bash
  # Query WAF logs for counted requests
  bun x tsx scripts/athena-query.ts --query "
    SELECT terminatingRuleId, COUNT(*) as count,
           array_agg(DISTINCT httpRequest.clientIp) as ips
    FROM waf_logs
    WHERE action = 'COUNT'
    AND timestamp > current_timestamp - interval '24' hour
    GROUP BY terminatingRuleId
    ORDER BY count DESC
  "

  # Find false positives (internal IPs being counted)
  bun x tsx scripts/analyze-waf-logs.ts --internal-ips "10.0.0.0/8,172.16.0.0/12"
  ```

- **Episodic Memory**: Check past tuning decisions
  ```typescript
  const pastTuning = await mcp_episodic_memory.search({
    query: ["WAF tuning", "false positive", "whitelist decision"],
    mode: "both",
    after: "2024-01-01"
  });
  ```

### Phase 4: Testing & Validation
- **TDD**: Write security tests before deploying
  ```
  Invoke: superpowers:test-driven-development
  Goal: Implement comprehensive WAF security tests
  ```

- **Playwright**: Test WAF rule effectiveness
  ```typescript
  // Test SQL injection blocking
  await mcp_playwright.browser_navigate({
    url: `${baseUrl}/api/users?id=1' OR '1'='1`
  });
  const sqliResponse = await mcp_playwright.browser_network_requests({});
  // Verify: 403 Forbidden response

  // Test XSS blocking
  await mcp_playwright.browser_navigate({
    url: `${baseUrl}/search?q=<script>alert(document.cookie)</script>`
  });
  const xssResponse = await mcp_playwright.browser_network_requests({});
  // Verify: 403 Forbidden response

  // Test rate limiting
  const rateLimitTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const results = [];
      for (let i = 0; i < 150; i++) {
        const res = await fetch('/api/endpoint');
        results.push(res.status);
      }
      return results;
    }`
  });
  // Verify: Should see 429 or 403 after 100 requests

  // Test geo-blocking (requires proxy or header spoofing)
  await mcp_playwright.browser_navigate({
    url: baseUrl,
    // Note: Actual geo-blocking test requires VPN or CloudFront test headers
  });

  // Verify legitimate traffic passes
  await mcp_playwright.browser_navigate({
    url: `${baseUrl}/api/products`
  });
  await mcp_playwright.browser_wait_for({ text: "products" });
  // Verify: Normal response (200 OK)
  ```

- **Verification**: Confirm WAF ready for production
  ```
  Invoke: superpowers:verification-before-completion
  Verify:
    - All managed rules enabled
    - Custom rules tested and tuned
    - False positive rate < 0.1%
    - Legitimate traffic unaffected
    - Monitoring and alerting configured
  ```

### Phase 5: Production Deployment
- **Bash**: Switch from COUNT to BLOCK mode
  ```bash
  # Update WAF rules to Block mode
  aws wafv2 update-web-acl \
    --name "PaymentAPIWAF" \
    --scope REGIONAL \
    --id "abc123..." \
    --rules file://waf-rules-block.json \
    --lock-token "$(aws wafv2 get-web-acl --name PaymentAPIWAF --scope REGIONAL --id abc123 --query LockToken --output text)"

  # Example: Update rule to Block instead of Count
  # Change "OverrideAction": { "Count": {} } to "OverrideAction": { "None": {} }
  # And ensure "Action": { "Block": {} } is set
  ```

- **Chrome**: Monitor for immediate issues
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/wafv2/home#/webacl/PaymentAPIWAF/overview"
  });

  // Monitor blocked requests spike
  const blockedCount = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".blocked-requests-count",
    payload: "text"
  });

  // Check for error rate increase
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/cloudwatch/home#dashboards"
  });
  ```

### Phase 6: Continuous Monitoring
- **Chrome**: Daily WAF dashboard review
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/wafv2/home#/webacl/PaymentAPIWAF/metrics"
  });

  const dailyMetrics = await mcp_chrome.use_browser({
    action: "screenshot",
    payload: "waf-metrics-daily.png"
  });
  ```

- **WebSearch**: Stay updated on new threats
  ```typescript
  // Search for latest OWASP Top 10 updates
  // Search for new WAF bypass techniques
  // Search for CVEs affecting AWS WAF
  ```

## Best Practices

### Managed Rules (AWS)
- **Core Rule Set**: Protects against OWASP Top 10
- **SQL Injection**: Detects SQLi in query strings, body, headers
- **Known Bad Inputs**: Blocks known malicious patterns
- **IP Reputation**: Blocks known malicious IPs (Amazon threat intelligence)
- **Bot Control**: Detects and blocks automated bots

### Custom Rules
- **Rate Limiting**: 100 requests per 5 minutes per IP (tune for API)
- **Geo-Blocking**: Block OFAC-sanctioned countries (KP, IR, SY, CU)
- **Token Validation**: Require Authorization header on `/api/pay/*`
- **Bot Detection**: Challenge suspicious user agents
- **IP Reputation**: Integration with threat intelligence feeds

### Tuning Strategy
- **Count Mode First**: Run in COUNT mode for 24-48 hours before blocking
- **Analyze Logs**: Use Athena to query WAF logs for false positives
- **Whitelist**: Exception rules for internal IPs, monitoring tools, CI/CD
- **Thresholds**: Adjust rate limits based on legitimate traffic patterns
- **Gradual Rollout**: Enable rules one at a time, monitor impact

### Workflow Requirements
- **ALWAYS** invoke `test-driven-development` before custom rules
- **ALWAYS** invoke `verification-before-completion` before switching to Block mode
- **ALWAYS** search Episodic Memory for past tuning decisions
- **ALWAYS** get latest OWASP docs from Context7
- **ALWAYS** test with Playwright before production
- **NEVER** skip COUNT mode tuning period
- **NEVER** deploy rules without testing legitimate traffic

### Monitoring & Alerting
- **CloudWatch Alarms**: Alert on >10% increase in blocked requests
- **Daily Review**: Check WAF dashboard for anomalies
- **Log Analysis**: Weekly Athena queries for attack patterns
- **Threat Intel**: Monthly review of new attack signatures
- **False Positive Tracking**: Document and review exceptions quarterly
