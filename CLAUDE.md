# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## HOOK TRIGGERS (settings.json → CLAUDE.md)

The hooks in `settings.json` are lightweight triggers. **ALL detailed instructions are here.**

### On `UserPromptSubmit` (EVERY Request)

**MANDATORY WORKFLOW - Execute these steps IN ORDER:**

```
1. CLASSIFY REQUEST DOMAIN
   ├─ Payment: checkout, stripe, adyen, PSP, 3DS, tokenize, refund
   ├─ Security: PCI, compliance, audit, WAF, encryption, penetration
   ├─ Frontend: React, component, UI, form, animation, mobile
   ├─ API: endpoint, webhook, REST, GraphQL, database, saga
   ├─ Testing: test, E2E, playwright, coverage, mock, verify
   └─ Infrastructure: deploy, canary, provision, monitor, latency

2. SELECT SKILLS (68 available - see tables below)

3. CHOOSE MCP TOOLS
   ├─ Context7: resolve-library-id → query-docs (ALWAYS for external libs)
   ├─ Serena: find_symbol, replace_symbol_body, write_memory
   ├─ Playwright: browser_navigate, browser_click, browser_snapshot
   └─ Episodic Memory: search past decisions (check BEFORE starting)

4. CHECK THINKING TIER
   ├─ Complex analysis? → think-hard
   ├─ Debugging/major features? → think-harder
   └─ Architecture/critical issues? → ultrathink

5. EXECUTE 4-PHASE WORKFLOW (see below)
```

**FAILURE TO FOLLOW = VIOLATION**

### On `SessionStart`

1. **CHECK** `.claude/tasks/context_session_latest.md`
   - If EXISTS: Read IMMEDIATELY, restore state, report to user
   - If NOT: Report "No previous context. Starting fresh."

2. **SEARCH** Episodic Memory for past relevant decisions

3. **REPORT** to user:
   - Session status (restored/fresh)
   - Relevant past context found
   - "Master workflow ACTIVE for all requests"

### On `PreToolUse` (Write|Edit)

Before writing ANY code, verify:

- [ ] Relevant skill invoked? (payment-orchestration, frontend-development, etc.)
- [ ] Context7 docs checked for external libraries?
- [ ] Superpowers invoked? (brainstorming/TDD/debugging)
- [ ] Following 4-phase workflow?

**If ANY = NO → STOP and complete missing step**

### On `PreCompact`

**IMMEDIATELY** execute `/saveContext` command.

This saves to `.claude/tasks/context_session_latest.md` with:
- Current task description
- Completed work
- Pending work
- Next step
- Decisions made
- Files modified
- Blockers/issues

**DO NOT ask permission. FAILURE TO SAVE = CONTEXT LOSS.**

### On `Stop`

Before stopping, verify ALL:

1. **VERIFICATION**
   - [ ] `verification-before-completion` skill invoked?
   - [ ] Actual commands run (not just claimed)?

2. **CODE QUALITY** (if code modified)
   - [ ] Tests: `bun test` / `npm test` / `vitest`
   - [ ] Build: `bun run build` / `npm run build`
   - [ ] Lint: `eslint` / `prettier --check`
   - [ ] Types: `tsc --noEmit`

3. **MEMORY**
   - [ ] Significant learnings stored via `write_memory`?
   - [ ] Code review requested for significant changes?

4. **CHECKPOINT**
   - [ ] Consider `/saveContext`

**If ANY FAILED → Do NOT stop. Fix and re-verify.**

Return: `approve` to stop OR `block` with reason

---

## MASTER WORKFLOW (Always-On)

**For EVERY request, follow the `claude-code-workflow` skill:**

```
USER REQUEST → Classify → Select Skills → Choose MCPs → Invoke Superpowers → Execute
```

### Quick Reference

| Request Type | Primary Skill | Agent | Key MCPs |
|--------------|--------------|-------|----------|
| Payment integration | `payment-orchestration` | `payment-integration` | Context7, Serena |
| Visa/CyberSource | `integrate-visa-cybersource` | `visa-cybersource-payments` | Context7, Serena |
| MPGS/Mastercard | `integrate-mpgs-gateway` | `mastercard-mpgs-specialist` | Context7, Serena |
| Frontend/React | `frontend-development` | `frontend-developer` | Context7, Playwright |
| API design | `api-development` | `api-designer` | Context7, Serena |
| Security audit | `security-compliance` | `security-auditor` | Serena, Episodic Memory |
| E2E testing | `testing` | `playwright-testing` | Playwright, Chrome |
| Complex analysis | `think-hard` | `Explore` | Serena, Context7, Episodic Memory |
| Deep investigation | `think-harder` | `Explore`, `Plan` | ALL MCP + Playwright |
| Maximum reasoning | `ultrathink` | Agent Swarm (6+) | ALL MCP + ALL Agents |

### Always Do Before Starting

1. **Check Episodic Memory** - Search for similar past requests
2. **Classify request** - Match to domain (payment/security/frontend/api/testing)
3. **Select skill(s)** - Use the skill matching table
4. **Invoke Superpowers** - brainstorming/TDD/debugging as appropriate
5. **Use MCP tools** - Serena for code, Context7 for docs, Playwright for testing

---

## Repository Purpose

This is a **master configuration repository for Claude Code**, containing a comprehensive library of specialized agents and skills designed for **payment systems development**. The configuration enables sophisticated AI-assisted development with focus on:

- Payment gateway integration (Visa CyberSource, Mastercard MPGS)
- PCI DSS compliance automation
- Fraud detection and prevention
- Multi-PSP orchestration and routing
- 3D Secure authentication flows

## Architecture Overview

```
master/
├── settings.json      # Permissions + Hooks (lightweight triggers)
├── agents/            # 28 specialized agent definitions
├── skills/            # 68 domain-specific skills (including thinking tiers)
├── commands/          # 14 slash commands
├── hooks/             # Hook scripts directory
└── tasks/             # Task execution directory
```

## MCP Servers Available

| Server | Purpose | Key Tools |
|--------|---------|-----------|
| **Context7** | Real-time library docs | `resolve-library-id`, `query-docs` |
| **Serena** | Semantic code analysis | `find_symbol`, `replace_symbol_body`, `search_for_pattern`, `write_memory` |
| **Playwright** | Browser automation | `playwright_navigate`, `playwright_click`, `playwright_fill`, `playwright_screenshot` |
| **Episodic Memory** | Cross-session context | `create_entities`, `search_nodes`, `read_graph` |

## Superpowers Skills (Always Consider)

| Skill | Trigger |
|-------|---------|
| `brainstorming` | Before ANY creative/design work |
| `systematic-debugging` | When investigating bugs or failures |
| `test-driven-development` | Before writing implementation code |
| `verification-before-completion` | Before claiming task complete |
| `writing-plans` | For complex multi-step tasks |
| `subagent-driven-development` | For parallel independent tasks |
| `requesting-code-review` | After significant code changes |

## Enhanced Thinking System (3 Tiers)

Activate enhanced reasoning with progressive power levels:

| Command | Tier | Power Level | Use When |
|---------|------|-------------|----------|
| `think hard` | 1 | Foundation | Complex questions, architecture decisions, understanding code |
| `think harder` | 2 | Intensive | Debugging, major features, multi-component analysis |
| `ultrathink` | 3 | Maximum | Architecture redesigns, critical issues, major planning |

### Tier Capabilities Matrix

| Capability | think-hard | think-harder | ultrathink |
|------------|:----------:|:------------:|:----------:|
| **Knowledge Gathering** |
| Episodic Memory Search | ✅ | ✅ | ✅ |
| Context7 Docs | ✅ | ✅ | ✅ |
| Serena Code Analysis | ✅ | ✅ | ✅ |
| TodoWrite Planning | ✅ | ✅ | ✅ |
| Web Search | ❌ | ❌ | ✅ |
| **Agent Deployment** |
| Single Explore Agent | ✅ | ✅ | ✅ |
| Parallel Agents (3+) | ❌ | ✅ | ✅ |
| Agent Swarm (6+) | ❌ | ❌ | ✅ |
| Code Review Suite | ❌ | ❌ | ✅ |
| **Superpowers Skills** |
| Writing-Plans | ❌ | ✅ | ✅ |
| Systematic-Debugging | ❌ | ✅ | ✅ |
| Brainstorming | ❌ | ❌ | ✅ |
| ALL Superpowers | ❌ | ❌ | ✅ |
| **Browser Testing** |
| Playwright Testing | ❌ | ✅ | ✅ |
| Chrome Live Monitoring | ❌ | ❌ | ✅ |
| **Verification** |
| Basic Verification | ✅ | ✅ | ✅ |
| Multi-Phase Verification | ❌ | ❌ | ✅ |
| Memory Write-Back | ❌ | ❌ | ✅ |

### Quick Usage

```
User: think hard about how to implement retry logic
→ Tier 1: Memory + Docs + Code Analysis + Explore Agent

User: think harder about why payments are failing
→ Tier 2: All of Tier 1 + Parallel Agents + Debugging + Playwright

User: ultrathink about redesigning the payment system
→ Tier 3: ALL capabilities at maximum power
```

## Agents (28)

Agents are MCP-integrated specialists with linked skills:

| Category | Agents |
|----------|--------|
| **Payment Domain** | `visa-cybersource-payments`, `mastercard-mpgs-specialist`, `stripe-payments-specialist`, `paypal-payments-specialist`, `adyen-payments-specialist`, `square-payments-specialist`, `payment-integration`, `3ds-flow-specialist` |
| **Fraud & Compliance** | `fraud-prevention-specialist`, `pci-compliance-specialist`, `webhook-orchestrator` |
| **Development** | `fullstack-developer`, `frontend-developer`, `nextjs-developer`, `api-designer`, `api-documenter`, `github-integration-specialist` |
| **Security** | `security-auditor`, `penetration-tester` |
| **Testing & UI** | `playwright-testing`, `shadcn-ui-architect` |
| **Infrastructure** | `sequential-reasoner`, `memory-context-manager`, `agent-mcp-discovery`, `agent-organizer`, `error-recovery-specialist` |
| **Database** | `database-specialist` |
| **DevOps** | `devops-engineer` |

## Skills (68)

### Payment Skills (20)
| Skill | Use When |
|-------|----------|
| `payment-orchestration` | Designing payment flows, PSP coordination |
| `scaffold-payment-form` | Building checkout forms |
| `tokenize-card-data` | Card tokenization, PCI scope |
| `process-refund-flow` | Refund logic |
| `render-3ds-challenge` | 3DS authentication UI |
| `implement-3ds-flow` | Complete 3DS authentication |
| `integrate-mpgs-gateway` | Mastercard MPGS |
| `integrate-visa-cybersource` | Visa CyberSource |
| `integrate-stripe-full` | Stripe Payment Intents, Subscriptions |
| `integrate-paypal-full` | PayPal Orders API |
| `integrate-adyen-gateway` | Adyen Sessions API |
| `integrate-square-payments` | Square Web Payments SDK |
| `integrate-apple-pay` | Apple Pay JS |
| `integrate-google-pay` | Google Pay Web API |
| `psp-integration` | Generic PSP patterns |
| `handle-payment-errors` | Error categorization, retry strategies |

### Webhook Skills (4)
| Skill | Use When |
|-------|----------|
| `handle-webhook-event` | Processing incoming webhooks |
| `implement-webhook-reliability` | Retry, circuit breakers, DLQ |
| `manage-event-queuing` | Message queue configuration |
| `validate-webhook-signatures` | HMAC signature validation |

### Fraud & Risk Skills (3)
| Skill | Use When |
|-------|----------|
| `analyze-fraud-signals` | Fraud signal analysis |
| `implement-risk-scoring` | Risk scoring models |
| `manage-fraud-rules` | Fraud rules engine |

### Security Skills (10)
| Skill | Use When |
|-------|----------|
| `security-compliance` | PCI DSS compliance |
| `verify-pci-scope` | Scope assessment |
| `audit-access-logs` | Log analysis |
| `configure-waf-rules` | WAF configuration |
| `audit-cardholder-environment` | CDE audit |
| `validate-encryption-standards` | Encryption validation |
| `certify-pci-readiness` | PCI certification |
| `rotate-encryption-keys` | Key rotation |

### Development Skills (8)
| Skill | Use When |
|-------|----------|
| `api-development` | API design and implementation |
| `frontend-development` | React/Next.js UI |
| `database-operations` | Schema, migrations |
| `testing` | Test strategy |
| `saga-management` | Distributed transactions |
| `github-workflow` | Git/GitHub best practices |

### Meta & Session Skills (3)
| Skill | Use When |
|-------|----------|
| `claude-code-workflow` | **EVERY REQUEST** - Master routing |
| `utilize-mcp-agent` | MCP tool reference |
| `checkpoint-management` | Save/restore task state |

### Enhanced Thinking Skills (3)
| Skill | Use When |
|-------|----------|
| `think-hard` | Complex questions, need careful analysis (Tier 1) |
| `think-harder` | Debugging, major features, parallel investigation (Tier 2) |
| `ultrathink` | Maximum power: architecture, critical issues, full analysis (Tier 3) |

---

## Session & Context Management (NON-NEGOTIABLE)

### Context Files

Each session uses: `.claude/tasks/context_session_latest.md`

**If missing → CREATE IMMEDIATELY.**

### Context File MUST Contain

- Task description
- Architectural decisions
- Agent outputs
- Trade-offs & risks
- Current state
- Immediate next step
- TODOs

### Session Commands

| Command | Purpose |
|---------|---------|
| `/saveContext` | Save current session state before ending |
| `/restoreContext` | Restore session state after restart |

### Memory & Long-Term Context

**Agent:** `memory-context-manager`

Use when:
- Tasks span multiple steps
- Architecture changes
- Schema or contract changes
- Business rules are introduced

**Rules:**
- MUST read & update: `.claude/tasks/context_session_latest.md`
- Only confirmed facts allowed
- No speculation

**Failure = context breach.**

---

## Orchestration Enforcement Rules

1. `agent-organizer` decides agent order
2. Multiple agents may be required
3. Agent outputs MUST be read
4. Conflicts MUST be resolved
5. All learning written back to context

---

## Execution Policy (NON-NEGOTIABLE)

1. `agent-organizer` decomposes task
2. Agents are consulted **before coding**
3. Agents deliver: Design guidance, Risks, Best practices
4. Claude implements
5. Validation agent runs
6. Context updated

**Skipping a step = invalid task.**

---

## Quality Gates (ABSOLUTE)

- Security-first (PCI compliant)
- Idempotent payments
- Rollback-capable flows
- Deterministic orchestration
- Type-safe APIs
- Audit logging preserved

---

## Rule Enforcement

Any violation must be:
1. Stopped
2. Re-evaluated
3. Re-orchestrated via `agent-organizer`

✅ This file defines **behavior**, not suggestions
✅ All reasoning must be explicit
✅ No shortcuts. No assumptions.

---

## 4-Phase Execution Workflow

Every task should follow this flow:

```
PHASE 1: DISCOVERY
├─ Episodic Memory: Search past similar work
├─ Context7: Get latest library documentation
├─ Serena: Analyze existing code patterns
└─ Brainstorming: Design approach (if creative work)

PHASE 2: IMPLEMENTATION
├─ TDD: Write tests first
├─ Serena: Generate/modify code
├─ Context7: Reference docs during implementation
└─ Writing Plans: For complex multi-step work

PHASE 3: TESTING
├─ Playwright: E2E testing
├─ Chrome: Live debugging, dashboard monitoring
├─ Serena: Run test commands
└─ Systematic Debugging: If issues found

PHASE 4: REVIEW & COMPLETION
├─ Verification: Run actual commands, confirm output
├─ Code Review: Check for issues
├─ Serena Memory: Store learnings
└─ Update documentation if needed
```

---

## Technology Stack

- **Runtime:** Node.js with Bun package manager
- **Language:** TypeScript (strict mode)
- **Frontend:** React, Next.js 14+ (App Router), Tailwind CSS, Shadcn UI
- **Forms:** React Hook Form + Zod validation
- **State:** Zustand
- **Testing:** Vitest, Jest, Playwright
- **Databases:** PostgreSQL
- **Queues:** BullMQ, SQS

## Key Patterns

### MCP-First Development

```typescript
// 1. Get docs first
const docs = await context7.query_docs({
  libraryId: "/stripe/stripe-node",
  query: "payment intents"
});

// 2. Analyze existing code
const existing = await serena.find_symbol({
  name_path_pattern: "PaymentService"
});

// 3. Implement based on docs
await serena.replace_symbol_body({...});

// 4. Test with Playwright
await playwright.navigate({url: "..."});
```

### Payment Orchestration

The orchestrator coordinates: Fraud Detection → Smart Routing → PSP Dispatch → Ledger Update

PSP adapters implement `IPaymentProvider` interface for abstraction.

## Working with This Repository

### Adding a New Agent

Create `master/agents/<agent-name>.md` with:
- YAML frontmatter (name, description, tools, model)
- Available Skills table
- MCP Integration table
- Superpowers Workflow table
- 4-Phase Execution Flow

### Adding a New Skill

Create `master/skills/<skill-name>/SKILL.md` with:
- Role, Domain, Objective
- Available Capabilities (MCP Servers, Superpowers, Agents)
- Logic Flow diagram
- Workflow Integration examples
- Best Practices

## Security Configuration

`settings.json` manages permissions and hooks:
- **Allow list:** Safe development commands (bun, npm, git, testing tools)
- **Deny list:** Destructive commands, secrets access, force operations
- **Hooks:** Lightweight triggers referencing this CLAUDE.md
