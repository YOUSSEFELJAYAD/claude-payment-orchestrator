# Skill: Blackhole Suspicious IP

**Role:** sequential-reasoner (Security Specialist)
**Domain:** Security & Compliance
**Objective:** Immediately drop all traffic from identified malicious IPs at the network boundary (NACL/Route Table/WAF) to protect the application layer. Automate threat response using ALL available capabilities for real-time detection and blocking.

## Available Capabilities

### MCP Servers
| Server | Security Usage |
|--------|----------------|
| **Serena** | Find NACL/firewall configurations, discover IP blocking logic, audit threat intelligence integrations, analyze WAF rule definitions |
| **Context7** | Get AWS WAF docs, Network Firewall guides, NACL best practices, threat intelligence feed integration |
| **Playwright** | Test IP blocking effectiveness, verify blocked requests return timeout, automate block verification |
| **Chrome** | Monitor WAF blocked requests, review GuardDuty findings, manage IP block lists, inspect VPC flow logs for blocked traffic |
| **Episodic Memory** | Recall past attack patterns, retrieve previously blocked IPs, find threat intelligence decisions |

### Superpowers Skills
| Skill | Security-Specific Trigger |
|-------|--------------------------|
| `brainstorming` | Before designing automated IP blocking architecture |
| `systematic-debugging` | When investigating why malicious IPs aren't being blocked |
| `test-driven-development` | Before implementing IP blocking automation |
| `verification-before-completion` | Before deploying IP blocking rules to production |
| `writing-plans` | For automated threat response system implementation |
| `subagent-driven-development` | Parallel threat analysis and blocking across multiple sources |

### Specialized Agents
| Agent | Security Use Case |
|-------|------------------|
| `code-reviewer` | Review IP blocking automation code for reliability |
| `silent-failure-hunter` | Find cases where IP blocking fails silently |
| `code-explorer` | Trace IP blocking flow from detection to enforcement |

### Security-Specific Tools
- **WebSearch** - Latest threat intelligence feeds, IP reputation services, attack patterns
- **Bash** - AWS CLI for NACL updates, WAF rule management, Lambda deployment
- **elements-of-style:writing-clearly-and-concisely** - Clear incident response documentation

## Logic Flow

```
┌─────────────────────────────────────────────────────────────┐
│              SUSPICIOUS IP BLACKHOLE WORKFLOW                │
└─────────────────────────────────────────────────────────────┘

[1] THREAT DETECTION
    ├─→ Chrome: Monitor GuardDuty for malicious IPs
    ├─→ Chrome: Review WAF rate limit violations
    ├─→ Bash: Query VPC flow logs for attack patterns
    ├─→ Episodic Memory: Check against known attack IPs
    └─→ WebSearch: Lookup IP reputation databases

[2] AUTOMATED BLOCKING (Layer 7 - WAF)
    ├─→ Chrome: Add IP to WAF IP set
    ├─→ Bash: AWS CLI WAF update
    ├─→ Serena: Verify WAF block rule configuration
    ├─→ Verification: Confirm IP added to block list
    └─→ Response Time: < 1 minute

[3] NETWORK BLOCKING (Layer 4 - NACL)
    ├─→ Bash: Add DENY rule to NACL
    ├─→ Serena: Check NACL rule count (max 20)
    ├─→ Chrome: Verify NACL rule in AWS console
    ├─→ Verification: Stateless DROP (not REJECT)
    └─→ Capacity: Migrate to Network Firewall if full

[4] ROUTE BLACKHOLING (Layer 3)
    ├─→ Bash: Add route to null interface
    ├─→ Chrome: Verify route table entry
    ├─→ Playwright: Test connection timeout
    ├─→ Verification: Packets dropped at network layer
    └─→ Advanced: BGP blackhole for DDoS

[5] TESTING & VERIFICATION
    ├─→ Playwright: Attempt connection from blocked IP
    ├─→ Verification: Connection should TIMEOUT (not RST)
    ├─→ Chrome: Monitor VPC flow logs for blocked packets
    ├─→ Episodic Memory: Document block decision
    └─→ Code Review: Review automation reliability

[6] AUTOMATED WORKFLOW
    ├─→ Lambda: Trigger on GuardDuty finding
    ├─→ EventBridge: WAF rate limit event
    ├─→ SNS: Alert security team
    ├─→ Serena: Update threat intelligence database
    └─→ Documentation: Incident timeline
```

## Workflow Integration

### Phase 1: Threat Detection
- **Chrome**: Monitor threat intelligence sources
  ```typescript
  // Check GuardDuty for malicious IPs
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/guardduty/home#/findings"
  });

  const findings = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".findings-table",
    payload: "markdown"
  });
  // Extract malicious IPs from findings

  // Check WAF for rate limit violations
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/wafv2/home#/webacl"
  });

  const blockedIPs = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".rate-limited-ips",
    payload: "markdown"
  });
  ```

- **Bash**: Query logs for attack patterns
  ```bash
  # Query VPC flow logs for brute force attempts
  bun x tsx scripts/athena-query.ts --query "
    SELECT srcaddr, COUNT(*) as attempts
    FROM vpc_flow_logs
    WHERE dstport = 22 OR dstport = 3389
    AND action = 'REJECT'
    AND date = current_date
    GROUP BY srcaddr
    HAVING attempts > 100
    ORDER BY attempts DESC
  "

  # Query ALB logs for suspicious requests
  bun x tsx scripts/analyze-alb-logs.ts --pattern "sql-injection" --threshold 50
  ```

- **Episodic Memory**: Check past attack patterns
  ```typescript
  const pastAttacks = await mcp_episodic_memory.search({
    query: ["DDoS attack", "brute force", "suspicious IP", "blocked IP"],
    mode: "both",
    after: "2024-01-01"
  });
  ```

### Phase 2: WAF Blocking (Layer 7)
- **Context7**: Get WAF documentation
  ```typescript
  const wafDocs = await mcp_context7.get_library_docs({
    context7CompatibleLibraryID: "/aws/aws-sdk-js",
    topic: "WAFv2 IPSet update IP blocking",
    mode: "code"
  });
  ```

- **Bash**: Add IP to WAF block list
  ```bash
  # Add IP to WAF IP set
  aws wafv2 update-ip-set \
    --name "BlockedIPs" \
    --scope REGIONAL \
    --id "abc123..." \
    --addresses "192.0.2.44/32" "198.51.100.0/24" \
    --lock-token "$(aws wafv2 get-ip-set --name BlockedIPs --scope REGIONAL --id abc123 --query LockToken --output text)"

  # Verify IP was added
  aws wafv2 get-ip-set --name "BlockedIPs" --scope REGIONAL --id "abc123..." --query Addresses
  ```

- **Serena**: Audit WAF automation code
  ```typescript
  const wafAutomation = await mcp_serena.find_symbol({
    name_path_pattern: "blockSuspiciousIP|updateWAFIPSet",
    include_body: true
  });

  // Check Lambda function for IP blocking
  const lambdaConfig = await mcp_serena.search_for_pattern({
    substring_pattern: "wafv2.*update.*ip.*set|blockIP|addToBlocklist",
    paths_include_glob: "functions/**/*.ts",
    context_lines_after: 10
  });
  ```

### Phase 3: NACL Blocking (Layer 4)
- **Bash**: Add DENY rule to Network ACL
  ```bash
  # Create NACL deny rule
  aws ec2 create-network-acl-entry \
    --network-acl-id "acl-abc123" \
    --rule-number 10 \
    --protocol -1 \
    --rule-action deny \
    --cidr-block "192.0.2.44/32" \
    --ingress

  # Verify rule was added
  aws ec2 describe-network-acls --network-acl-ids "acl-abc123" \
    --query 'NetworkAcls[0].Entries' --output table
  ```

- **Serena**: Check NACL capacity
  ```typescript
  // Find existing NACL rules to check capacity
  const naclRules = await mcp_serena.search_for_pattern({
    substring_pattern: "aws_network_acl_rule|createNetworkAclEntry",
    paths_include_glob: "infrastructure/**/*.{tf,ts}",
    context_lines_after: 5
  });
  // NACLs have a limit of ~20 rules per direction
  ```

- **Chrome**: Verify NACL rule
  ```typescript
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: "https://console.aws.amazon.com/vpc/home#NACLs"
  });

  const naclRules = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".nacl-rules-table",
    payload: "markdown"
  });
  ```

### Phase 4: Testing & Verification
- **Playwright**: Test IP block effectiveness
  ```typescript
  // Test that blocked IP gets timeout (not reset)
  const blockTest = await mcp_playwright.browser_evaluate({
    function: `async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch('https://api.example.com', {
          signal: controller.signal,
          headers: { 'X-Forwarded-For': '192.0.2.44' }  // Spoofed IP
        });

        clearTimeout(timeout);
        return { status: 'ALLOWED - VIOLATION!', code: response.status };
      } catch (e) {
        if (e.name === 'AbortError') {
          return { status: 'BLOCKED - TIMEOUT - OK' };
        }
        return { status: 'ERROR', error: e.message };
      }
    }`
  });
  ```

- **Verification**: Confirm block before claiming success
  ```
  Invoke: superpowers:verification-before-completion
  Verify:
    - IP added to WAF IP set
    - NACL DENY rule active
    - Test connection from IP times out
    - VPC flow logs show blocked packets
    - Incident documented in Serena memory
  ```

### Phase 5: Automated Response System
- **Brainstorming**: Design automated blocking architecture
  ```
  Invoke: superpowers:brainstorming
  Goal: Design Lambda-based automated IP blocking triggered by GuardDuty
  ```

- **TDD**: Write tests for automation
  ```
  Invoke: superpowers:test-driven-development
  Goal: Implement automated IP blocking with comprehensive test coverage
  ```

- **Serena**: Implement Lambda automation
  ```typescript
  // Find Lambda function for automated blocking
  const blockingLambda = await mcp_serena.find_symbol({
    name_path_pattern: "handleGuardDutyFinding|autoBlockIP",
    include_body: true
  });

  // EventBridge rule configuration
  const eventBridgeRule = await mcp_serena.search_for_pattern({
    substring_pattern: "GuardDuty.*Finding|EventBridge.*rule.*guardduty",
    paths_include_glob: "infrastructure/**/*.{tf,ts}",
    context_lines_after: 10
  });
  ```

## MCP Integration Examples

### Serena: IP Blocking Infrastructure Analysis

```typescript
// 1. Find WAF IP set configuration
const wafIPSets = await mcp_serena.search_for_pattern({
  substring_pattern: "aws_wafv2_ip_set|IPSet|BlockedIPs",
  paths_include_glob: "infrastructure/**/*.tf",
  context_lines_after: 10
});

// 2. Find NACL rules
const naclRules = await mcp_serena.search_for_pattern({
  substring_pattern: "aws_network_acl_rule|rule_action.*deny",
  paths_include_glob: "infrastructure/**/*.tf",
  context_lines_after: 8
});

// 3. Find IP blocking Lambda function
const blockingLogic = await mcp_serena.find_symbol({
  name_path_pattern: "blockSuspiciousIP|addIPToBlocklist",
  include_body: true
});

// 4. Check threat intelligence integration
const threatIntel = await mcp_serena.search_for_pattern({
  substring_pattern: "abuseipdb|threatfox|ipqualityscore|virustotal",
  paths_include_glob: "src/**/*.ts",
  context_lines_after: 5
});
```

### Chrome: Real-time Blocking Management

```typescript
// Add IP to WAF via console (for manual testing)
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/wafv2/home#/webacl/BlockedIPs/ipset"
});

await mcp_chrome.use_browser({
  action: "click",
  selector: ".add-ip-button"
});

await mcp_chrome.use_browser({
  action: "type",
  selector: ".ip-address-input",
  payload: "192.0.2.44/32\n"
});

// Monitor blocked requests
const blockedCount = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".blocked-requests-count",
  payload: "text"
});
```

### Bash: Automated IP Blocking Script

```bash
#!/bin/bash
# Automated IP blocking script

MALICIOUS_IP=$1
REASON=$2

# Add to WAF
aws wafv2 update-ip-set \
  --name "BlockedIPs" \
  --scope REGIONAL \
  --id "abc123" \
  --addresses "${MALICIOUS_IP}/32" \
  --lock-token "$(aws wafv2 get-ip-set --name BlockedIPs --scope REGIONAL --id abc123 --query LockToken --output text)"

# Add to NACL (find next available rule number)
NEXT_RULE=$(aws ec2 describe-network-acls --network-acl-ids acl-abc123 \
  --query 'NetworkAcls[0].Entries[?Egress==`false`].RuleNumber | max(@)' --output text)
NEXT_RULE=$((NEXT_RULE + 1))

aws ec2 create-network-acl-entry \
  --network-acl-id "acl-abc123" \
  --rule-number ${NEXT_RULE} \
  --protocol -1 \
  --rule-action deny \
  --cidr-block "${MALICIOUS_IP}/32" \
  --ingress

# Log to incident database
bun x tsx scripts/log-incident.ts --ip "${MALICIOUS_IP}" --reason "${REASON}"

echo "IP ${MALICIOUS_IP} blocked successfully"
```

## Agent Dispatch Patterns

### Parallel Threat Analysis
```typescript
await Promise.all([
  Task(subagent_type="feature-dev:code-reviewer", {
    instruction: "Review IP blocking Lambda function for reliability and error handling",
    files: "functions/block-ip/handler.ts"
  }),

  Task(subagent_type="pr-review-toolkit:silent-failure-hunter", {
    instruction: "Find cases where IP blocking might fail silently",
    files: "functions/**/*.ts"
  })
]);
```

## Best Practices

### Blocking Strategy
- **Layer 7 (WAF)**: Fast, application-aware, limited to HTTP/HTTPS, capacity: 10,000 IPs per IP set
- **Layer 4 (NACL)**: Stateless, all protocols, capacity: ~20 rules per NACL
- **Layer 3 (Route)**: Network-level drop, use for large-scale DDoS
- **Timeout vs Reset**: Use DROP (timeout) not REJECT (reset) to slow attackers

### Automation Requirements
- **Response Time**: Block within 1 minute of detection
- **Monitoring**: Alert on block failures
- **Capacity**: Migrate to AWS Network Firewall when NACL capacity reached
- **Testing**: Verify blocks don't affect legitimate traffic
- **Documentation**: Record all blocked IPs with reason and timestamp

### Workflow Requirements
- **ALWAYS** invoke `verification-before-completion` before deploying blocking rules
- **ALWAYS** invoke `systematic-debugging` when blocks fail
- **ALWAYS** search Episodic Memory for past attack patterns
- **ALWAYS** test block effectiveness with Playwright
- **ALWAYS** document block decision in Serena memory
- **NEVER** block without verification (false positive risk)
- **NEVER** exceed NACL capacity (20 rules)

### Threat Intelligence
- Use WebSearch to lookup IP reputation before blocking
- Integrate with AbuseIPDB, ThreatFox, IPQualityScore
- Check Episodic Memory for previously seen attack IPs
- Automate unblocking after time period (e.g., 24 hours for rate limit violations)
