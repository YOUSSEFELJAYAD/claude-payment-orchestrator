---
name: security
description: Start security audit/compliance workflow with skills, MCPs, and agents
arguments:
  - name: task
    description: Security task description (e.g., "PCI audit", "pentest", "WAF config")
    required: false
---

# Security & Compliance Workflow

You are starting a **security domain** task. Follow the master workflow:

## Step 1: Context Gathering

1. **Check Episodic Memory** for past security decisions:
```
Search: security audit, PCI compliance, vulnerability, $ARGUMENTS.task
```

2. **Identify the specific security area:**
- PCI DSS compliance
- Security audit
- Penetration testing
- WAF configuration
- Access log analysis
- Key rotation
- Fraud detection

## Step 2: Select Skills

| Task Type | Primary Skill | Supporting Skills |
|-----------|--------------|-------------------|
| PCI compliance | `security-compliance` | `verify-pci-scope` |
| Security audit | `audit-access-logs` | `security-compliance` |
| Penetration test | `perform-penetration-test` | `blackhole-suspicious-ip` |
| WAF setup | `configure-waf-rules` | `blackhole-suspicious-ip` |
| Key management | `rotate-encryption-keys` | `security-compliance` |
| Fraud prevention | `detect-velocity-attack` | `blackhole-suspicious-ip` |

## Step 3: Select MCP Servers

- **Context7**: Get OWASP, PCI DSS, ISO 27001 documentation
- **Serena**: Scan for vulnerabilities, trace auth flows, find secrets
- **Playwright**: Test authentication, validate XSS/CSRF protections
- **Chrome**: Monitor security dashboards, review WAF logs
- **Episodic Memory**: Recall past audit findings and resolutions

## Step 4: Invoke Superpowers

- **brainstorming**: Before designing security architecture
- **systematic-debugging**: When investigating security incidents
- **test-driven-development**: Before implementing security controls
- **verification-before-completion**: Before claiming audit complete

## Step 5: Dispatch Agent (if needed)

| Specialization | Agent |
|---------------|-------|
| Security audit | `security-auditor` |
| Penetration testing | `penetration-tester` |
| Complex workflow analysis | `sequential-reasoner` |

## Step 6: Execute 4-Phase Workflow

### Phase 1: Discovery
- Search Episodic Memory for past security patterns
- Get compliance documentation from Context7
- Scan codebase for vulnerabilities with Serena
- Review current security posture

### Phase 2: Implementation
- Invoke relevant security skills
- Implement security controls
- Document compliance evidence

### Phase 3: Testing
- Run security tests with Playwright
- Monitor dashboards with Chrome
- Validate controls are effective

### Phase 4: Review
- Invoke verification-before-completion
- Generate audit report
- Store findings in Serena memory

---

**Task:** $ARGUMENTS.task

Now proceed with the security workflow for this task.
