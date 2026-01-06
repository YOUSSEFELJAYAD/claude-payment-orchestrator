# Claude Payment Orchestrator - Implementation Plan v2.0

> Comprehensive roadmap from ULTRATHINK analysis (2026-01-05)

---

## Overview

| Phase | Focus | Deliverables | Files Changed |
|-------|-------|--------------|---------------|
| P0 | Critical Foundations | 3 agents, 3 features, 3 docs | ~15 files |
| P1 | PSP & Testing | 5 PSPs, 3 agents, tests | ~25 files |
| P2 | Digital Payments & Polish | 5 wallets/BNPL, skill fixes | ~60 files |
| P3 | Advanced Features | GitHub, async, more PSPs | ~20 files |

---

## Phase 0: Critical Foundations

### P0.1: New Agents (3)

#### P0.1.1: Fraud Prevention Specialist Agent

**File:** `master/agents/fraud-prevention-specialist.md`

```yaml
---
name: fraud-prevention-specialist
description: Specialized agent for fraud detection, velocity checks, risk scoring, and chargeback prevention
tools: [Read, Write, Edit, Bash, Glob, Grep, Task, WebFetch]
model: sonnet
---
```

**Sections to include:**
- [ ] YAML frontmatter (name, description, tools, model)
- [ ] Available Skills table
  - detect-velocity-attack
  - analyze-fraud-signals (new skill)
  - implement-risk-scoring (new skill)
  - manage-fraud-rules (new skill)
- [ ] MCP Integration table (Serena, Context7, Episodic Memory)
- [ ] Superpowers Workflow table
- [ ] 4-Phase Execution Flow
- [ ] Example usage scenarios

**Dependencies:** Create 3 new skills first

---

#### P0.1.2: PCI Compliance Specialist Agent

**File:** `master/agents/pci-compliance-specialist.md`

```yaml
---
name: pci-compliance-specialist
description: PCI DSS compliance expert for scope assessment, encryption validation, and certification readiness
tools: [Read, Write, Edit, Bash, Glob, Grep, Task]
model: sonnet
---
```

**Sections to include:**
- [ ] YAML frontmatter
- [ ] Available Skills table
  - verify-pci-scope (existing)
  - audit-cardholder-environment (new)
  - validate-encryption-standards (new)
  - certify-pci-readiness (new)
- [ ] MCP Integration table
- [ ] Superpowers Workflow table
- [ ] 4-Phase Execution Flow
- [ ] PCI DSS requirement mapping

---

#### P0.1.3: Webhook Orchestrator Agent

**File:** `master/agents/webhook-orchestrator.md`

```yaml
---
name: webhook-orchestrator
description: Webhook reliability specialist for event processing, retry logic, and signature validation
tools: [Read, Write, Edit, Bash, Glob, Grep, Task, WebFetch]
model: sonnet
---
```

**Sections to include:**
- [ ] YAML frontmatter
- [ ] Available Skills table
  - handle-webhook-event (existing)
  - implement-webhook-reliability (new)
  - manage-event-queuing (new)
  - validate-webhook-signatures (new)
- [ ] MCP Integration table
- [ ] Superpowers Workflow table
- [ ] 4-Phase Execution Flow

---

### P0.2: New Features (3)

#### P0.2.1: Post-Task Verification Hook

**File:** `master/settings.json` (modify)

**Add to hooks section:**
```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "VERIFICATION CHECKPOINT:\n\n1. Did you run tests? (bun test)\n2. Did you verify the implementation works?\n3. Did you check for regressions?\n\nIf not, run verification now before claiming completion."
          }
        ]
      }
    ]
  }
}
```

**Tasks:**
- [ ] Update Stop hook in settings.json
- [ ] Create verification prompt template
- [ ] Document in hooks/workflow-enforcement.md

---

#### P0.2.2: Checkpoint/Rollback System

**New Files:**
- `master/hooks/checkpoint-system.md`
- `master/skills/checkpoint-management/SKILL.md`

**Checkpoint Structure:**
```
.claude/tasks/checkpoints/
├── checkpoint_001_discovery.md
├── checkpoint_002_implementation.md
├── checkpoint_003_testing.md
└── checkpoint_latest.md
```

**Tasks:**
- [ ] Create checkpoint skill with save/restore commands
- [ ] Add checkpoint markers to 4-phase workflow
- [ ] Create checkpoint directory structure
- [ ] Document rollback procedure

---

#### P0.2.3: Verification Subagent

**File:** `master/agents/verification-agent.md`

```yaml
---
name: verification-agent
description: Lightweight verification subagent for post-task validation
tools: [Read, Bash, Grep]
model: haiku
---
```

**Tasks:**
- [ ] Create minimal verification agent (haiku model for speed)
- [ ] Define verification checklist by task type
- [ ] Integrate with Stop hook
- [ ] Add to agent-organizer dispatch patterns

---

### P0.3: Critical Documentation (3)

#### P0.3.1: FAQ Document

**File:** `docs/FAQ.md`

**Structure:**
```markdown
# Frequently Asked Questions

## Installation & Setup
- How do I install this plugin?
- What MCP servers are required vs optional?
- Can I use this without all MCP servers?

## Usage
- What's the difference between think hard/harder/ultrathink?
- How do I integrate a custom payment provider?
- How do I create a new agent/skill/command?

## Troubleshooting
- Plugin not loading - what do I check?
- Skills not working as expected?
- Session not persisting?

## Advanced
- How do I contribute?
- How do I extend MCP integration?
- What's the module system?
```

**Tasks:**
- [ ] Write 20+ FAQ entries
- [ ] Include code examples where helpful
- [ ] Cross-reference to other docs

---

#### P0.3.2: Troubleshooting Guide

**File:** `docs/TROUBLESHOOTING.md`

**Structure:**
```markdown
# Troubleshooting Guide

## Installation Issues
### Plugin not loading
### MCP server connection failed
### Permission denied errors

## Runtime Issues
### Skill execution fails
### Agent not responding
### Session context lost

## Performance Issues
### Slow response times
### Memory issues
### MCP timeout errors

## Common Error Messages
### [Error code] - Explanation and fix
```

**Tasks:**
- [ ] Document 15+ common issues
- [ ] Provide step-by-step solutions
- [ ] Include diagnostic commands

---

#### P0.3.3: API Reference

**File:** `docs/API-REFERENCE.md`

**Structure:**
```markdown
# API Reference

## Agent Schema
- Frontmatter fields
- Required sections
- MCP integration format

## Skill Schema
- SKILL.md structure
- examples.md format
- reference.md format

## Command Schema
- Frontmatter fields
- Argument definitions
- Execution flow

## Hook Schema
- Event types
- Matcher patterns
- Hook types (prompt, command)

## MCP Tool Reference
- Serena tools
- Context7 tools
- Playwright tools
- Chrome tools
- Episodic Memory tools
```

**Tasks:**
- [ ] Document all schemas with examples
- [ ] Include validation rules
- [ ] Add JSON schema files if possible

---

### P0 Checklist Summary

```
P0.1 Agents:
[ ] fraud-prevention-specialist.md
[ ] pci-compliance-specialist.md
[ ] webhook-orchestrator.md
[ ] 9 new supporting skills

P0.2 Features:
[ ] Post-Task verification hook (settings.json)
[ ] Checkpoint system (skill + hook)
[ ] Verification subagent

P0.3 Documentation:
[ ] docs/FAQ.md
[ ] docs/TROUBLESHOOTING.md
[ ] docs/API-REFERENCE.md

P0 Validation:
[ ] npm run validate passes
[ ] All new agents have MCP tables
[ ] All new skills have SKILL.md
[ ] Documentation links work
```

---

## Phase 1: PSP & Testing

### P1.1: New PSP Integrations (5)

#### P1.1.1: Adyen Integration

**Files to create:**
```
master/agents/adyen-specialist.md
master/skills/integrate-adyen/
├── SKILL.md
├── examples.md
├── reference.md
└── scripts/helper.py
master/skills/diagnose-adyen-failure/
└── SKILL.md
```

**SKILL.md sections:**
- [ ] Adyen API authentication (API key + HMAC)
- [ ] 3DS2 implementation patterns
- [ ] Webhook setup and validation
- [ ] Multi-merchant routing
- [ ] Error code reference

---

#### P1.1.2: Square Integration

**Files to create:**
```
master/agents/square-specialist.md
master/skills/integrate-square/
├── SKILL.md
├── examples.md
├── reference.md
└── scripts/helper.py
master/skills/diagnose-square-failure/
└── SKILL.md
```

**SKILL.md sections:**
- [ ] Square OAuth flow
- [ ] Locations and merchant setup
- [ ] Payment processing patterns
- [ ] Inventory sync (optional)
- [ ] Error handling

---

#### P1.1.3: Stripe Full Integration

**Files to create:**
```
master/agents/stripe-specialist.md
master/skills/integrate-stripe/
├── SKILL.md
├── examples.md
├── reference.md
└── scripts/helper.py
master/skills/diagnose-stripe-failure/
└── SKILL.md
```

**SKILL.md sections:**
- [ ] Stripe API patterns
- [ ] Payment Intents flow
- [ ] Subscription management
- [ ] Webhook signature validation
- [ ] Connect platform patterns

---

#### P1.1.4: Braintree Integration

**Files to create:**
```
master/agents/braintree-specialist.md
master/skills/integrate-braintree/
├── SKILL.md
├── examples.md
├── reference.md
└── scripts/helper.py
```

**SKILL.md sections:**
- [ ] Braintree GraphQL API
- [ ] Venmo integration
- [ ] Vault tokenization
- [ ] 3DS implementation

---

#### P1.1.5: PayPal Full Integration

**Files to create:**
```
master/agents/paypal-specialist.md
master/skills/integrate-paypal/
├── SKILL.md
├── examples.md
├── reference.md
└── scripts/helper.py
```

**SKILL.md sections:**
- [ ] PayPal REST API v2
- [ ] Express Checkout flow
- [ ] Subscriptions (Billing Plans)
- [ ] Dispute handling

---

### P1.2: Additional Agents (3)

#### P1.2.1: 3DS Flow Specialist

**File:** `master/agents/3ds-flow-specialist.md`

**Skills:**
- render-3ds-challenge (existing)
- generate-3ds-payload (existing)
- handle-3ds-exemptions (new)
- validate-3ds-results (new)

---

#### P1.2.2: Error Recovery & Resilience Agent

**File:** `master/agents/error-recovery-resilience.md`

**Skills:**
- implement-retry-logic (new)
- design-circuit-breaker (new)
- manage-timeout-handling (new)
- establish-fallback-patterns (new)

---

#### P1.2.3: Subscription Billing Agent

**File:** `master/agents/subscription-billing.md`

**Skills:**
- manage-billing-cycles (new)
- handle-dunning (new)
- process-upgrades-downgrades (new)
- calculate-proration (new)

---

### P1.3: Testing Infrastructure

#### P1.3.1: MCP Mock Tests

**Files to create:**
```
tests/
├── serena.test.ts
├── context7.test.ts
├── playwright.test.ts
├── episodic-memory.test.ts
└── integration/
    ├── payment-flow.test.ts
    ├── skill-execution.test.ts
    └── agent-dispatch.test.ts
```

**Test cases per mock:**
```typescript
// tests/serena.test.ts
describe('MockSerena', () => {
  test('find_symbol returns mocked response', async () => {});
  test('replace_symbol_body modifies code', async () => {});
  test('search_for_pattern finds matches', async () => {});
  test('write_memory persists data', async () => {});
});
```

---

#### P1.3.2: CI Test Integration

**File:** `.github/workflows/ci.yml` (modify)

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
      - run: bun test --coverage
```

---

### P1 Checklist Summary

```
P1.1 PSP Integrations:
[ ] Adyen (agent + 2 skills)
[ ] Square (agent + 2 skills)
[ ] Stripe (agent + 2 skills)
[ ] Braintree (agent + 1 skill)
[ ] PayPal (agent + 1 skill)

P1.2 Agents:
[ ] 3ds-flow-specialist
[ ] error-recovery-resilience
[ ] subscription-billing
[ ] Supporting skills (12 new)

P1.3 Testing:
[ ] MCP mock tests (4 files)
[ ] Integration tests (3 files)
[ ] CI test job
[ ] Coverage reporting

P1 Validation:
[ ] All PSP agents have complete skills
[ ] Tests pass (bun test)
[ ] Coverage > 50%
```

---

## Phase 2: Digital Payments & Polish

### P2.1: Digital Wallets (2)

#### P2.1.1: Apple Pay Integration

**Files:**
```
master/agents/apple-pay-specialist.md
master/skills/integrate-apple-pay/
├── SKILL.md
├── examples.md
└── reference.md
```

**Key topics:**
- [ ] Apple Pay JS setup
- [ ] Merchant validation
- [ ] Payment token handling
- [ ] Server-side decryption

---

#### P2.1.2: Google Pay Integration

**Files:**
```
master/agents/google-pay-specialist.md
master/skills/integrate-google-pay/
├── SKILL.md
├── examples.md
└── reference.md
```

**Key topics:**
- [ ] Google Pay API setup
- [ ] Payment data handling
- [ ] Token processing

---

### P2.2: BNPL Providers (3)

#### P2.2.1: Klarna Integration

**Files:**
```
master/skills/integrate-klarna/
├── SKILL.md
├── examples.md
└── reference.md
```

---

#### P2.2.2: Affirm Integration

**Files:**
```
master/skills/integrate-affirm/
├── SKILL.md
├── examples.md
└── reference.md
```

---

#### P2.2.3: Afterpay Integration

**Files:**
```
master/skills/integrate-afterpay/
├── SKILL.md
├── examples.md
└── reference.md
```

---

### P2.3: Skill Quality Fixes

#### P2.3.1: Add "Related Skills" to All Skills

**Task:** Update all 49 SKILL.md files

**Template addition:**
```markdown
## Related Skills

**This skill uses:**
- [skill-name] - [why]

**This skill is used by:**
- [skill-name] - [when]

**Alternatives:**
- Use [X] if you only need [Y]
```

**Batch script approach:**
```bash
# For each skill directory
for skill in master/skills/*/; do
  # Append Related Skills section if missing
done
```

---

#### P2.3.2: Add "Activation Trigger" to Skills

**Task:** Update 35 skills missing activation trigger

**Template:**
```yaml
---
name: skill-name
description: ...
activation: "Use when [specific trigger condition]"
---
```

---

#### P2.3.3: Add TL;DR to Long Skills

**Skills >300 lines:**
- payment-orchestration (700+ lines)
- verify-pci-scope (545 lines)
- ultrathink (415 lines)
- frontend-development (400+ lines)

**Template:**
```markdown
## Quick Start (TL;DR)

**Use when:** [one line]
**Key steps:** 1. X  2. Y  3. Z
**Output:** [what you get]
**Time:** [estimate]
```

---

#### P2.3.4: Fix/Remove helper.py Files

**Options:**
1. **Upgrade:** Make production-grade with docstrings, error handling
2. **Remove:** Delete if not useful
3. **Document:** If keeping, reference in SKILL.md

**Recommendation:** Remove most, keep only truly useful ones

---

### P2.4: Additional Documentation (4)

#### P2.4.1: Architecture Document

**File:** `docs/ARCHITECTURE.md`

**Sections:**
- System overview diagram
- Agent layer explanation
- Skill layer explanation
- MCP layer explanation
- Data flow diagrams
- Component relationships

---

#### P2.4.2: MCP Integration Guide

**File:** `docs/MCP-INTEGRATION.md`

**Sections:**
- MCP server setup
- When to use each server
- Tool reference by server
- Custom MCP integration

---

#### P2.4.3: Examples Document

**File:** `docs/EXAMPLES.md`

**Sections:**
- Complete payment integration workflow
- Security audit workflow
- Frontend development workflow
- Testing workflow
- Multi-PSP routing example

---

#### P2.4.4: Modules Document

**File:** `docs/MODULES.md`

**Sections:**
- Module architecture
- Core module (required)
- Optional modules
- Creating custom modules
- Module dependencies

---

### P2 Checklist Summary

```
P2.1 Digital Wallets:
[ ] Apple Pay (agent + skill)
[ ] Google Pay (agent + skill)

P2.2 BNPL:
[ ] Klarna skill
[ ] Affirm skill
[ ] Afterpay skill

P2.3 Skill Fixes:
[ ] Related Skills added to 49 skills
[ ] Activation Trigger added to 35 skills
[ ] TL;DR added to 5+ long skills
[ ] helper.py files cleaned up

P2.4 Documentation:
[ ] docs/ARCHITECTURE.md
[ ] docs/MCP-INTEGRATION.md
[ ] docs/EXAMPLES.md
[ ] docs/MODULES.md

P2 Validation:
[ ] All skills have Related Skills
[ ] All skills have Activation Trigger
[ ] Documentation complete
```

---

## Phase 3: Advanced Features

### P3.1: GitHub Integration

#### P3.1.1: GitHub App Handler

**Files:**
```
master/skills/github-app-integration/
├── SKILL.md
├── examples.md
└── reference.md
master/commands/github.md
```

**Capabilities:**
- [ ] /github install-app
- [ ] /github setup-checks
- [ ] /github create-pr

---

#### P3.1.2: PR Review Automation

**Files:**
```
master/skills/create-pr-with-review/
├── SKILL.md
├── examples.md
└── reference.md
master/agents/pr-automation-agent.md
```

---

### P3.2: Long-Running Tasks

#### P3.2.1: Async Task Queue

**Files:**
```
master/skills/background-task-management/
├── SKILL.md
└── examples.md
master/commands/background.md
master/hooks/task-status-tracking.md
```

**Features:**
- [ ] /background [command] - submit background task
- [ ] Task status tracking in context file
- [ ] Polling mechanism
- [ ] Timeout handling

---

### P3.3: Additional PSPs (2)

#### P3.3.1: Checkout.com

**Files:**
```
master/agents/checkoutcom-specialist.md
master/skills/integrate-checkoutcom/
├── SKILL.md
└── examples.md
```

---

#### P3.3.2: WorldPay

**Files:**
```
master/agents/worldpay-specialist.md
master/skills/integrate-worldpay/
├── SKILL.md
└── examples.md
```

---

### P3 Checklist Summary

```
P3.1 GitHub:
[ ] GitHub App skill
[ ] /github command
[ ] PR automation agent

P3.2 Async:
[ ] Background task skill
[ ] /background command
[ ] Status tracking hook

P3.3 PSPs:
[ ] Checkout.com (agent + skill)
[ ] WorldPay (agent + skill)

P3 Validation:
[ ] GitHub integration works
[ ] Background tasks execute
[ ] New PSPs validated
```

---

## Final Metrics

### Before Implementation

| Metric | Count |
|--------|-------|
| Agents | 18 |
| Skills | 49 |
| Commands | 13 |
| PSP Coverage | ~30% |
| Test Coverage | ~0% |
| Documentation | 5 pages |

### After Full Implementation

| Metric | Count | Change |
|--------|-------|--------|
| Agents | 32 | +14 |
| Skills | 75+ | +26 |
| Commands | 17 | +4 |
| PSP Coverage | ~85% | +55% |
| Test Coverage | 70%+ | +70% |
| Documentation | 15+ pages | +10 |

---

## Execution Commands

### Start P0
```bash
# Create P0 structure
mkdir -p master/skills/{analyze-fraud-signals,implement-risk-scoring,manage-fraud-rules}
mkdir -p master/skills/{audit-cardholder-environment,validate-encryption-standards,certify-pci-readiness}
mkdir -p master/skills/{implement-webhook-reliability,manage-event-queuing,validate-webhook-signatures}
mkdir -p master/skills/checkpoint-management
mkdir -p .claude/tasks/checkpoints

# Validate after each addition
npm run validate
```

### Start P1
```bash
# Create PSP structure
for psp in adyen square stripe braintree paypal; do
  mkdir -p master/skills/integrate-$psp
  mkdir -p master/skills/diagnose-$psp-failure
done

# Create test structure
mkdir -p tests/integration
```

### Validate Everything
```bash
npm run validate && npm run count && bun test
```

---

## Next Steps

To begin implementation, run:
```
/payment implement P0.1.1 (fraud-prevention-specialist agent)
```

Or start with quick wins:
```
/think hard about adding Related Skills to all 49 skills
```
