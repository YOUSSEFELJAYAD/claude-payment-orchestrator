# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
├── settings.json      # Permissions config
├── agents/            # 15 specialized agent definitions
├── skills/            # 45 domain-specific skills (including claude-code-workflow)
└── tasks/             # Task execution directory
```

## MCP Servers Available

| Server | Purpose | Key Tools |
|--------|---------|-----------|
| **Serena** | Semantic code analysis | `find_symbol`, `replace_symbol_body`, `search_for_pattern`, `write_memory` |
| **Context7** | Real-time library docs | `resolve_library_id`, `get_library_docs` |
| **Playwright** | Browser automation | `browser_navigate`, `browser_click`, `browser_fill_form`, `browser_snapshot` |
| **Chrome** | Persistent browser | `use_browser` (navigate, click, type, extract, screenshot) |
| **Episodic Memory** | Cross-session context | `search`, `read` |

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

## Agents (15)

Agents are MCP-integrated specialists with linked skills:

| Category | Agents |
|----------|--------|
| **Payment Domain** | `visa-cybersource-payments`, `mastercard-mpgs-specialist`, `payment-integration` |
| **Development** | `fullstack-developer`, `frontend-developer`, `nextjs-developer`, `api-designer`, `api-documenter` |
| **Security** | `security-auditor`, `penetration-tester` |
| **Testing & UI** | `playwright-testing`, `shadcn-ui-architect` |
| **Infrastructure** | `sequential-reasoner`, `memory-context-manager`, `agent-mcp-discovery` |

## Skills (45)

### Payment Skills
| Skill | Use When |
|-------|----------|
| `payment-orchestration` | Designing payment flows, PSP coordination |
| `scaffold-payment-form` | Building checkout forms |
| `tokenize-card-data` | Card tokenization, PCI scope |
| `process-refund-flow` | Refund logic |
| `render-3ds-challenge` | 3DS authentication UI |
| `integrate-mpgs-gateway` | Mastercard MPGS |
| `integrate-visa-cybersource` | Visa CyberSource |
| `psp-integration` | Generic PSP patterns |

### Development Skills
| Skill | Use When |
|-------|----------|
| `api-development` | API design and implementation |
| `frontend-development` | React/Next.js UI |
| `database-operations` | Schema, migrations |
| `testing` | Test strategy |
| `saga-management` | Distributed transactions |

### Security Skills
| Skill | Use When |
|-------|----------|
| `security-compliance` | PCI DSS compliance |
| `verify-pci-scope` | Scope assessment |
| `audit-access-logs` | Log analysis |
| `configure-waf-rules` | WAF configuration |

### Meta Skills
| Skill | Use When |
|-------|----------|
| `claude-code-workflow` | **EVERY REQUEST** - Master routing |
| `utilize-mcp-agent` | MCP tool reference |

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

### MCP Discovery & Tooling

**Agent:** `agent-mcp-discovery` (MCP Compass)

Use when:
- Selecting MCP tools
- Integrating MCP servers
- Validating tool limits

**Rules:**
- No assumed capabilities
- MCP usage must be verified

### Sequential Reasoning & Flow Validation

**Agent:** `sequential-reasoner` (MANDATORY)

Required for:
- Payment flows
- Security logic
- State transitions

**Rules:**
- Every step explicit
- No hidden assumptions

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
const docs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intents"
});

// 2. Analyze existing code
const existing = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentService"
});

// 3. Implement based on docs
await mcp_serena.replace_symbol_body({...});

// 4. Test with Playwright
await mcp_playwright.browser_navigate({...});
```

### Agent Communication Protocol

```json
{
  "requesting_agent": "fullstack-developer",
  "request_type": "get_fullstack_context",
  "payload": { "query": "..." }
}
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

`settings.json` restricts bash execution:
```json
{
  "permissions": {
    "allow": ["Bash(bun x tsx:*)"]
  }
}
```
