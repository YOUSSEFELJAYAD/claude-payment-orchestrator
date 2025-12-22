# Skill: Audit Access Logs

**Role:** sequential-reasoner (Security Specialist)
**Domain:** Security & Compliance
**Objective:** Centralize and analyze access logs to detect unauthorized access to the Cardholder Data Environment (PCI DSS Requirement 10). Leverage automated log analysis, anomaly detection, and comprehensive monitoring using ALL available capabilities.

## Available Capabilities

### MCP Servers
| Server | Security Usage |
|--------|----------------|
| **Serena** | Find logging configurations, audit log retention policies, discover logging gaps in code, analyze CloudTrail setup |
| **Context7** | Get AWS CloudTrail docs, CloudWatch Logs best practices, SIEM configuration guides, PCI DSS Requirement 10 |
| **Playwright** | Automated testing of audit log generation, verify logging on API calls, test authentication logging |
| **Chrome** | Monitor CloudWatch dashboards, review CloudTrail events, analyze VPC flow logs, inspect ALB access logs, check GuardDuty alerts |
| **Episodic Memory** | Recall past security incidents, retrieve anomaly patterns, find previous audit violations, compare historical baselines |

### Superpowers Skills
| Skill | Security-Specific Trigger |
|-------|--------------------------|
| `brainstorming` | Before designing centralized logging architecture |
| `systematic-debugging` | When investigating log tampering or missing audit trails |
| `test-driven-development` | Before implementing audit logging middleware |
| `verification-before-completion` | Before certifying log coverage to auditors |
| `writing-plans` | For SIEM integration or log analysis automation projects |
| `subagent-driven-development` | Parallel log analysis across multiple sources |
| `requesting-code-review` | After implementing audit logging code |

### Specialized Agents
| Agent | Security Use Case |
|-------|------------------|
| `code-reviewer` | Review logging implementations for completeness |
| `silent-failure-hunter` | Find missing error logging or silent audit failures |
| `code-explorer` | Trace logging flows from action to storage |
| `pr-test-analyzer` | Ensure audit logging test coverage |

### Security-Specific Tools
- **WebSearch** - Latest SIEM best practices, log analysis tools, threat intelligence
- **Bash** - Execute AWS CLI for log queries, run log analysis scripts, Athena queries
- **elements-of-style:writing-clearly-and-concisely** - Clear incident reports and audit documentation

## Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 ACCESS LOG AUDIT WORKFLOW                    │
└─────────────────────────────────────────────────────────────┘

[1] ENABLE COMPREHENSIVE LOGGING
    ├─→ Serena: Audit logging configuration in code
    ├─→ Context7: Get AWS logging best practices
    ├─→ CloudTrail: API activity logging (ALL regions)
    ├─→ VPC Flow Logs: Network traffic monitoring
    ├─→ ALB Access Logs: HTTP request logging
    ├─→ Application Logs: Business logic audit trail
    └─→ Database Logs: Query audit logging

[2] CENTRALIZE LOG STORAGE
    ├─→ Chrome: Configure S3 bucket for log aggregation
    ├─→ Chrome: Set up CloudWatch Logs for real-time monitoring
    ├─→ Serena: Verify log shipping configuration
    ├─→ Episodic Memory: Review past centralization decisions
    └─→ Verification: Confirm all sources shipping logs

[3] AUTOMATED ANALYSIS
    ├─→ Chrome: Configure CloudWatch Insights queries
    ├─→ Bash: Run Athena queries for anomaly detection
    ├─→ Chrome: Set up GuardDuty threat detection
    ├─→ Playwright: Test automated alerting
    └─→ Episodic Memory: Compare with historical patterns

[4] ANOMALY DETECTION
    ├─→ Chrome: Monitor for root user login
    ├─→ Chrome: Detect unusual API calls
    ├─→ Bash: Query for failed authentication attempts
    ├─→ Chrome: Check for Security Group changes
    └─→ Alert on suspicious patterns

[5] INTEGRITY & RETENTION
    ├─→ Chrome: Enable S3 Object Lock (WORM)
    ├─→ Chrome: Configure log file validation
    ├─→ Serena: Verify retention policy code
    ├─→ Verification: Confirm 1-year retention
    └─→ Documentation: Evidence of tamper-proof logging

[6] CONTINUOUS MONITORING
    ├─→ Chrome: Daily dashboard review
    ├─→ Episodic Memory: Track incident patterns
    ├─→ Automated: Real-time alerting on critical events
    └─→ Documentation: Incident response runbooks
```

## Workflow Integration

### Phase 1: Enable Logging
- **Episodic Memory**: Review past logging incidents
  ```typescript
  const logIncidents = await mcp_episodic_memory.search({
    query: ["missing logs", "audit trail", "logging failure", "log tampering"],
    mode: "both",
    after: "2024-01-01"
  });
  ```

- **Context7**: Get AWS logging best practices
  ```typescript
  const cloudTrailDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/aws/aws-sdk-js",
    topic: "CloudTrail logging trail configuration",
    mode: "code"
  });

  const cloudWatchDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/aws/aws-sdk-js",
    topic: "CloudWatch Logs log groups streams",
    mode: "code"
  });

  const pciLogging = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/pcisecuritystandards/pci-dss",
    topic: "requirement 10 audit logs monitoring",
    mode: "info"
  });
  ```

- **Serena**: Audit logging configuration
  ```typescript
  // Find CloudTrail configuration
  const cloudTrailConfig = await mcp_serena.search_for_pattern({
    substring_pattern: "CloudTrail|createTrail|isMultiRegionTrail|enableLogFileValidation",
    paths_include_glob: "infrastructure/**/*.{tf,yml,yaml,ts}",
    context_lines_after: 10
  });

  // Find application logging middleware
  const loggingMiddleware = await mcp_serena.search_for_pattern({
    substring_pattern: "logger|winston|pino|log\\.(info|warn|error)|auditLog",
    paths_include_glob: "src/**/*.ts",
    context_lines_after: 5
  });

  // Check for sensitive data logging violations
  const sensitiveLogging = await mcp_serena.search_for_pattern({
    substring_pattern: "log.*password|logger.*secret|console\\.log.*token|log.*cvv",
    paths_include_glob: "src/**/*.ts",
    context_lines_before: 2,
    context_lines_after: 2
  });

  // Find database query logging
  const dbLogging = await mcp_serena.search_for_pattern({
    substring_pattern: "log_statement|pgaudit|general_log|slow_query_log",
    paths_include_glob: "infrastructure/**/*",
    context_lines_after: 5
  });
  ```

### Phase 2: Centralize Logs
- **Chrome**: Configure log aggregation
  ```typescript
  // Navigate to S3 for log storage bucket
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://s3.console.aws.amazon.com/s3/buckets/security-logs-bucket"
  });

  // Verify bucket policy enforces encryption and retention
  const bucketPolicy = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".bucket-policy",
    payload: "markdown"
  });

  // Check CloudWatch log groups
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/cloudwatch/home#logsV2:log-groups"
  });

  const logGroups = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".log-groups-table",
    payload: "markdown"
  });
  ```

- **Verification**: Confirm all log sources are shipping
  ```
  Invoke: superpowers:verification-before-completion
  Verify:
    - CloudTrail enabled in ALL regions
    - VPC Flow Logs active for CDE subnets
    - ALB Access Logs shipping to S3
    - Application logs sending to CloudWatch
    - Database audit logs enabled
  ```

### Phase 3: Automated Analysis
- **Chrome**: Set up CloudWatch Insights queries
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/cloudwatch/home#logsV2:logs-insights"
  });

  // Query for failed authentication attempts
  await mcp_chrome.use_browser({
    action: "type",
    selector: ".query-editor",
    payload: `fields @timestamp, userIdentity.principalId, errorCode
| filter eventName = "ConsoleLogin" and errorMessage like "Failed"
| stats count() by userIdentity.principalId
| sort count desc`
  });

  await mcp_chrome.use_browser({
    action: "click",
    selector: ".run-query-button"
  });

  const failedLogins = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".query-results",
    payload: "markdown"
  });
  ```

- **Bash**: Run Athena queries for anomaly detection
  ```bash
  # Query CloudTrail logs for root user activity
  bun x tsx scripts/athena-query.ts --query "
    SELECT eventtime, eventsource, eventname, useridentity.principalid
    FROM cloudtrail_logs
    WHERE useridentity.type = 'Root'
    AND eventtime > current_timestamp - interval '24' hour
  "

  # Query for Security Group modifications
  bun x tsx scripts/athena-query.ts --query "
    SELECT eventtime, eventname, requestparameters
    FROM cloudtrail_logs
    WHERE eventname IN ('AuthorizeSecurityGroupIngress', 'RevokeSecurityGroupIngress')
    AND eventtime > current_timestamp - interval '7' day
  "

  # Query VPC Flow Logs for denied connections to CDE
  bun x tsx scripts/athena-query.ts --query "
    SELECT srcaddr, dstaddr, dstport, action, bytes
    FROM vpc_flow_logs
    WHERE dstaddr LIKE '10.0.100.%'  -- CDE subnet
    AND action = 'REJECT'
    AND date > current_date - interval '1' day
    ORDER BY bytes DESC
  "
  ```

### Phase 4: Anomaly Detection
- **Chrome**: Monitor security dashboards
  ```typescript
  // Check GuardDuty findings
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/guardduty/home#/findings"
  });

  const findings = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".findings-table",
    payload: "markdown"
  });

  // Monitor CloudTrail for suspicious API calls
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/cloudtrail/home#/events"
  });

  await mcp_chrome.use_browser({
    action: "type",
    selector: ".event-filter",
    payload: "eventName=DeleteTrail OR eventName=StopLogging OR eventName=PutBucketLogging\n"
  });

  const suspiciousEvents = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".events-table",
    payload: "markdown"
  });
  ```

- **Episodic Memory**: Compare with historical patterns
  ```typescript
  const historicalIncidents = await mcp_episodic_memory.search({
    query: ["unauthorized access", "anomalous behavior", "suspicious activity"],
    mode: "both",
    after: "2024-01-01"
  });

  // Search for past alerting patterns
  const pastAlerts = await mcp_episodic_memory.search({
    query: "GuardDuty finding CloudTrail alert",
    mode: "both",
    limit: 20
  });
  ```

### Phase 5: Integrity & Retention
- **Chrome**: Configure log protection
  ```typescript
  // Enable S3 Object Lock for WORM storage
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://s3.console.aws.amazon.com/s3/buckets/security-logs-bucket"
  });

  await mcp_chrome.use_browser({
    action: "click",
    selector: ".object-lock-settings"
  });

  // Verify Object Lock is enabled
  const objectLock = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".object-lock-config",
    payload: "text"
  });

  // Check lifecycle policies for retention
  await mcp_chrome.use_browser({
    action: "click",
    selector: ".lifecycle-tab"
  });

  const retention = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".lifecycle-rules",
    payload: "markdown"
  });
  // Verify: Hot storage 90 days, archive 1 year minimum
  ```

- **Serena**: Verify CloudTrail log file validation
  ```typescript
  const logValidation = await mcp_serena.search_for_pattern({
    substring_pattern: "enableLogFileValidation.*true|logFileValidationEnabled",
    paths_include_glob: "infrastructure/**/*.{tf,yml,yaml}",
    context_lines_after: 5
  });
  ```

### Phase 6: Testing & Verification
- **Playwright**: Test audit log generation
  ```typescript
  // Test that authentication attempts are logged
  await mcp_playwright.browser_navigate({ url: `${baseUrl}/login` });
  await mcp_playwright.browser_fill_form({
    fields: [
      { name: "Email", type: "textbox", ref: "email", value: "test@example.com" },
      { name: "Password", type: "textbox", ref: "password", value: "WrongPassword" }
    ]
  });
  await mcp_playwright.browser_click({ element: "Login button", ref: "login-btn" });

  // Verify failed login was logged
  // (requires querying CloudWatch/DB within test)

  // Test that API calls are logged
  const apiTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer invalid-token' },
        body: JSON.stringify({ amount: 100 })
      });
      return response.status;
    }`
  });

  // Verify unauthorized API call was logged to CloudWatch
  ```

- **Code Review**: Review logging implementation
  ```
  Invoke: superpowers:requesting-code-review
  Focus: Audit logging completeness, sensitive data redaction, log integrity
  ```

## MCP Integration Examples

### Serena: Comprehensive Logging Audit

```typescript
// 1. Find all logger instances
const loggerUsage = await mcp_serena.search_for_pattern({
  substring_pattern: "logger\\.|log\\.(info|warn|error|debug)|console\\.log",
  paths_include_glob: "src/**/*.ts",
  context_lines_before: 2,
  context_lines_after: 2
});

// 2. Check for sensitive data in logs
const sensitiveLogging = await mcp_serena.search_for_pattern({
  substring_pattern: "log.*\\.(password|secret|token|cvv|pan|ssn)|logger.*cardNumber",
  paths_include_glob: "src/**/*.ts"
});

// 3. Verify audit log retention configuration
const retentionConfig = await mcp_serena.search_for_pattern({
  substring_pattern: "retentionInDays|retention_in_days|lifecyclePolicy",
  paths_include_glob: "infrastructure/**/*.{tf,ts,yml}",
  context_lines_after: 10
});

// 4. Find CloudTrail setup
const cloudTrailSetup = await mcp_serena.search_for_pattern({
  substring_pattern: "aws_cloudtrail|CloudTrail|createTrail",
  paths_include_glob: "infrastructure/**/*",
  context_lines_after: 15
});

// 5. Check for log tampering protection
const logProtection = await mcp_serena.search_for_pattern({
  substring_pattern: "enableLogFileValidation|objectLockEnabled|versioning.*Enabled",
  paths_include_glob: "infrastructure/**/*",
  context_lines_after: 5
});
```

### Chrome: Log Analysis Dashboards

```typescript
// Monitor CloudWatch Logs Insights
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/cloudwatch/home#logsV2:logs-insights"
});

// Query for authentication events
await mcp_chrome.use_browser({
  action: "type",
  selector: ".query-editor",
  payload: `fields @timestamp, eventName, userIdentity.principalId, sourceIPAddress, errorCode
| filter eventName in ["ConsoleLogin", "AssumeRole", "GetSessionToken"]
| sort @timestamp desc
| limit 100`
});

const authEvents = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".query-results",
  payload: "markdown"
});

// Query for Security Group changes
await mcp_chrome.use_browser({
  action: "type",
  selector: ".query-editor",
  payload: `fields @timestamp, eventName, requestParameters, userIdentity.principalId
| filter eventName like /SecurityGroup/
| sort @timestamp desc`
});

const sgChanges = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".query-results",
  payload: "markdown"
});
```

### Bash: Advanced Log Queries

```bash
# Query for root user activity
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=Username,AttributeValue=root \
  --max-results 50 \
  --query 'Events[*].[EventTime,EventName,Username]' \
  --output table

# Athena query for failed API calls
bun x tsx scripts/athena-query.ts --query "
  SELECT eventtime, eventsource, eventname, errorcode, errormessage, sourceipaddress
  FROM cloudtrail_logs
  WHERE errorcode IS NOT NULL
  AND eventtime > current_timestamp - interval '24' hour
  ORDER BY eventtime DESC
  LIMIT 100
"

# Query VPC Flow Logs for suspicious traffic
bun x tsx scripts/athena-query.ts --query "
  SELECT srcaddr, dstaddr, srcport, dstport, protocol, bytes, action
  FROM vpc_flow_logs
  WHERE action = 'REJECT'
  AND date = current_date
  ORDER BY bytes DESC
  LIMIT 50
"
```

## Agent Dispatch Patterns

### Parallel Log Analysis
```typescript
await Promise.all([
  Task(subagent_type="feature-dev:code-reviewer", {
    instruction: "Review all logging middleware for completeness and sensitive data redaction",
    files: "src/middleware/logging.ts"
  }),

  Task(subagent_type="pr-review-toolkit:silent-failure-hunter", {
    instruction: "Find any critical operations that are missing audit logging",
    files: "src/api/**/*.ts"
  }),

  Task(subagent_type="feature-dev:code-explorer", {
    instruction: "Trace logging flow from API call through CloudWatch",
    entrypoint: "src/middleware/audit-logger.ts"
  })
]);
```

## Best Practices

### Logging Requirements (PCI DSS Requirement 10)
- **User Access**: Log all access to cardholder data
- **Admin Actions**: Log all actions by users with admin privileges
- **Audit Trail**: Log all audit trail access
- **Invalid Access**: Log all invalid logical access attempts
- **Authentication**: Log all use of authentication mechanisms
- **Audit Log Changes**: Log initialization, stopping, or pausing of audit logs
- **System Changes**: Log creation and deletion of system-level objects

### Log Protection
- **Integrity**: Enable CloudTrail log file validation (SHA-256 hashing)
- **Immutability**: Use S3 Object Lock (WORM) for tamper-proof storage
- **Encryption**: Encrypt logs at rest (SSE-S3 or SSE-KMS)
- **Access Control**: Restrict log access with IAM policies (least privilege)
- **Retention**: Keep logs for minimum 1 year (hot for 3 months)

### Workflow Requirements
- **ALWAYS** invoke `code-explorer` to trace complete logging flows
- **ALWAYS** invoke `systematic-debugging` when logs are missing or tampered
- **ALWAYS** invoke `verification-before-completion` before claiming log coverage
- **ALWAYS** search Episodic Memory for past logging incidents
- **ALWAYS** get latest AWS logging docs from Context7
- **ALWAYS** run silent-failure-hunter on critical API endpoints
- **NEVER** log sensitive data (PAN, CVV, passwords, secrets)
- **NEVER** allow log deletion without audit trail

### Monitoring & Alerting
- **Daily**: Review GuardDuty findings and CloudWatch alarms
- **Weekly**: Query for anomalous patterns and failed authentications
- **Monthly**: Verify log retention compliance and integrity
- **Quarterly**: Test log restoration and analysis procedures
- **Alert On**: Root user login, security group changes, log deletion attempts, high failed auth rate
