# MCP Config Master

> A comprehensive Claude Code configuration repository for payment systems development with seamless session persistence.

## Features

- **15 Specialized Agents** - MCP-integrated specialists for payment, security, frontend, and testing
- **46 Domain Skills** - Payment orchestration, security compliance, API development, and more
- **8 Slash Commands** - Quick access to domain workflows
- **5 Workflow Hooks** - Automatic enforcement and session persistence
- **Seamless Session Persistence** - Auto-save before compact, auto-restore after

---

## Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Session Persistence](#session-persistence)
- [Slash Commands](#slash-commands)
- [Agents](#agents)
- [Skills](#skills)
- [MCP Servers](#mcp-servers)
- [Hooks](#hooks)
- [4-Phase Workflow](#4-phase-workflow)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [Contributing](#contributing)

---

## Quick Start

```bash
# Clone the repository
git clone <your-repo-url> mcp-config-master
cd mcp-config-master

# Copy to your project
cp -r master/ /path/to/your/project/.claude/

# Start Claude Code in your project
cd /path/to/your/project
claude
```

Then use slash commands:
```
/workflow          # See master workflow
/payment integrate Stripe
/frontend build checkout form
/security audit PCI compliance
```

---

## Installation

### Option 1: Copy to Project

```bash
# Copy master config to your project's .claude directory
cp -r master/ /path/to/your/project/.claude/
```

### Option 2: Symlink (for development)

```bash
# Create symlink to share config across projects
ln -s /path/to/mcp-config-master/master /path/to/your/project/.claude
```

### Option 3: Global Installation

```bash
# Copy to global Claude Code config
cp -r master/ ~/.claude/
```

---

## Session Persistence

The killer feature - **never lose context again**.

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                  SEAMLESS SESSION FLOW                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SESSION START                                              │
│  └─► SessionStart Hook                                      │
│      └─► Auto-restore from context file (if exists)        │
│                                                             │
│  WORKING...                                                 │
│                                                             │
│  MEMORY LOW                                                 │
│  └─► PreCompact Hook                                        │
│      └─► Auto-save to .claude/tasks/context_session_latest.md │
│                                                             │
│  COMPACT HAPPENS                                            │
│                                                             │
│  └─► PostCompact Hook                                       │
│      └─► Auto-restore from saved context                   │
│      └─► Continue seamlessly                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Manual Commands

| Command | Description |
|---------|-------------|
| `/saveContext` | Save session state at any checkpoint |
| `/restoreContext` | Force restore from context file |

### Context File Location

```
.claude/tasks/context_session_latest.md
```

### Context File Contents

- Current project state
- Completed work
- Pending work
- Immediate next step
- Architectural decisions
- Files modified
- Resume instructions

---

## Slash Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/workflow` | Show master workflow and routing | `/workflow` |
| `/payment [task]` | Payment integration workflow | `/payment integrate Stripe` |
| `/security [task]` | Security & compliance workflow | `/security audit PCI` |
| `/frontend [task]` | Frontend development workflow | `/frontend build form` |
| `/api [task]` | API development workflow | `/api design REST endpoints` |
| `/testing [task]` | Testing workflow | `/testing e2e checkout` |
| `/saveContext` | Save current session state | `/saveContext` |
| `/restoreContext` | Restore session from file | `/restoreContext` |

---

## Agents

### Payment Domain

| Agent | Description | Key Skills |
|-------|-------------|------------|
| `payment-integration` | Payment flow orchestration | payment-orchestration, psp-integration |
| `visa-cybersource-payments` | Visa CyberSource specialist | integrate-visa-cybersource, diagnose-cybersource-failure |
| `mastercard-mpgs-specialist` | Mastercard MPGS specialist | integrate-mpgs-gateway |

### Development

| Agent | Description | Key Skills |
|-------|-------------|------------|
| `fullstack-developer` | Full-stack development | api-development, frontend-development, database-operations |
| `frontend-developer` | React/Next.js specialist | frontend-development, scaffold-payment-form |
| `nextjs-developer` | Next.js App Router expert | frontend-development |
| `api-designer` | API design & implementation | api-development |
| `api-documenter` | OpenAPI documentation | api-development |

### Security

| Agent | Description | Key Skills |
|-------|-------------|------------|
| `security-auditor` | Security & PCI compliance | security-compliance, verify-pci-scope |
| `penetration-tester` | Security testing | security-compliance |

### Testing & UI

| Agent | Description | Key Skills |
|-------|-------------|------------|
| `playwright-testing` | E2E testing specialist | testing |
| `shadcn-ui-architect` | UI component design | frontend-development |

### Infrastructure

| Agent | Description | Key Skills |
|-------|-------------|------------|
| `sequential-reasoner` | Step-by-step flow validation | Required for payment/security flows |
| `memory-context-manager` | Session state management | Context file management |
| `agent-mcp-discovery` | MCP tool discovery | MCP integration guidance |

---

## Skills

### Payment Skills (12)

| Skill | Use When |
|-------|----------|
| `payment-orchestration` | Designing payment flows, PSP coordination |
| `scaffold-payment-form` | Building checkout forms |
| `tokenize-card-data` | Card tokenization, PCI scope reduction |
| `process-refund-flow` | Refund logic implementation |
| `render-3ds-challenge` | 3D Secure authentication UI |
| `integrate-mpgs-gateway` | Mastercard MPGS integration |
| `integrate-visa-cybersource` | Visa CyberSource integration |
| `diagnose-cybersource-failure` | CyberSource error diagnosis |
| `psp-integration` | Generic PSP patterns |
| `calculate-transaction-fees` | Fee calculation logic |
| `build-payment-link-page` | Payment link pages |
| `animate-processing-state` | Payment processing animations |

### Development Skills (6)

| Skill | Use When |
|-------|----------|
| `api-development` | API design and implementation |
| `frontend-development` | React/Next.js UI development |
| `database-operations` | Schema design, migrations |
| `testing` | Test strategy and implementation |
| `saga-management` | Distributed transactions |
| `deploy-canary-release` | Canary deployments |

### Security Skills (6)

| Skill | Use When |
|-------|----------|
| `security-compliance` | PCI DSS compliance |
| `verify-pci-scope` | Scope assessment |
| `audit-access-logs` | Log analysis |
| `configure-waf-rules` | WAF configuration |
| `blackhole-suspicious-ip` | IP blocking |
| `detect-velocity-attack` | Fraud detection |

### Meta Skills (2)

| Skill | Use When |
|-------|----------|
| `claude-code-workflow` | **EVERY REQUEST** - Master routing |
| `utilize-mcp-agent` | MCP tool reference |

---

## MCP Servers

| Server | Purpose | Key Tools |
|--------|---------|-----------|
| **Serena** | Semantic code analysis | `find_symbol`, `replace_symbol_body`, `search_for_pattern`, `write_memory` |
| **Context7** | Real-time library docs | `resolve_library_id`, `get_library_docs` |
| **Playwright** | Browser automation | `browser_navigate`, `browser_click`, `browser_fill_form`, `browser_snapshot` |
| **Chrome** | Persistent browser | `use_browser` (navigate, click, type, extract, screenshot) |
| **Episodic Memory** | Cross-session context | `search`, `read` |

### MCP Usage Pattern

```typescript
// 1. Get documentation
const docs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intents"
});

// 2. Analyze existing code
const existing = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentService"
});

// 3. Implement
await mcp_serena.replace_symbol_body({...});

// 4. Test
await mcp_playwright.browser_navigate({url: "http://localhost:3000/checkout"});
```

---

## Hooks

| Hook | Trigger | Action |
|------|---------|--------|
| `SessionStart` | New session | Auto-restore context + workflow reminder |
| `PreCompact` | Memory low | Auto-save context (seamless) |
| `PostCompact` | After compact | Auto-restore context (seamless) |
| `PreToolUse` | Before Write/Edit | Skill check reminder |
| `Stop` | Task complete | Verification reminder |

### Hook Configuration

Hooks are defined in `master/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [...],
    "PreCompact": [...],
    "PostCompact": [...],
    "PreToolUse": [...],
    "Stop": [...]
  }
}
```

---

## 4-Phase Workflow

Every task follows this flow:

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
├─ Chrome: Live debugging
├─ Serena: Run test commands
└─ Systematic Debugging: If issues found

PHASE 4: REVIEW & COMPLETION
├─ Verification: Run actual commands
├─ Code Review: Check for issues
├─ Serena Memory: Store learnings
└─ Update documentation
```

---

## Usage Examples

### Example 1: Integrate Stripe Payments

```
User: /payment integrate Stripe for subscription billing

Claude Code:
1. Searches Episodic Memory for past Stripe work
2. Gets latest Stripe docs from Context7
3. Analyzes existing payment code with Serena
4. Creates implementation plan
5. Writes tests first (TDD)
6. Implements PaymentService
7. Tests with Playwright
8. Saves learnings to memory
```

### Example 2: Security Audit

```
User: /security audit PCI DSS compliance

Claude Code:
1. Invokes security-auditor agent
2. Uses Serena to scan for sensitive data handling
3. Checks encryption patterns
4. Audits access logs
5. Generates compliance report
6. Suggests remediation steps
```

### Example 3: Build Checkout Form

```
User: /frontend build checkout form with card validation

Claude Code:
1. Gets React Hook Form + Zod docs from Context7
2. Scaffolds form with scaffold-payment-form skill
3. Implements card validation
4. Tests with Playwright
5. Screenshots with Chrome for review
```

### Example 4: Resume After Restart

```
# Before ending session
User: /saveContext

# Session saved to .claude/tasks/context_session_latest.md

# After restart
User: /restoreContext

Claude Code:
- Reads context file
- Reports: "Restored session. Last state: Implementing PaymentService"
- Asks: "Continue with Step 3: Add webhook handler?"
```

---

## Configuration

### Directory Structure

```
master/
├── settings.json           # Permissions + Hooks
├── agents/                 # 15 agent definitions
│   ├── payment-integration.md
│   ├── visa-cybersource-payments.md
│   └── ...
├── skills/                 # 46 skill definitions
│   ├── payment-orchestration/
│   ├── api-development/
│   └── ...
├── commands/               # 8 slash commands
│   ├── payment.md
│   ├── saveContext.md
│   └── ...
└── hooks/                  # Hook documentation
    └── workflow-enforcement.md
```

### Permissions

`settings.json` restricts bash execution for security:

```json
{
  "permissions": {
    "allow": ["Bash(bun x tsx:*)"]
  }
}
```

### Adding Custom Agents

Create `master/agents/<agent-name>.md`:

```markdown
---
name: my-custom-agent
description: What this agent does
tools: [Read, Write, Edit, Bash, Glob, Grep]
model: sonnet
---

## Available Skills
| Skill | Use When |
|-------|----------|
| skill-name | Description |

## MCP Integration
| Server | Tools | Use When |
|--------|-------|----------|
| Serena | find_symbol | Code analysis |

## Execution Flow
1. Discovery
2. Implementation
3. Testing
4. Review
```

### Adding Custom Skills

Create `master/skills/<skill-name>/SKILL.md`:

```markdown
---
name: my-custom-skill
description: What this skill does
---

## Role
Expert in X domain

## Objective
Achieve Y outcome

## Workflow
1. Step one
2. Step two
3. Step three

## Best Practices
- Practice 1
- Practice 2
```

---

## Superpowers Integration

This config integrates with Claude Code Superpowers:

| Superpower | When to Use |
|------------|-------------|
| `brainstorming` | Before ANY creative/design work |
| `systematic-debugging` | When investigating bugs |
| `test-driven-development` | Before writing implementation |
| `verification-before-completion` | Before claiming task complete |
| `writing-plans` | For complex multi-step tasks |
| `subagent-driven-development` | For parallel independent tasks |
| `requesting-code-review` | After significant changes |

---

## Quality Gates

All implementations must pass:

- **Security-first** - PCI compliant patterns
- **Idempotent payments** - Safe to retry
- **Rollback-capable** - Can undo operations
- **Deterministic orchestration** - Predictable flows
- **Type-safe APIs** - Full TypeScript
- **Audit logging** - Complete trail

---

## Technology Stack

- **Runtime:** Node.js with Bun
- **Language:** TypeScript (strict mode)
- **Frontend:** React, Next.js 14+ (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Forms:** React Hook Form + Zod
- **State:** Zustand
- **Testing:** Vitest, Jest, Playwright
- **Database:** PostgreSQL
- **Queues:** BullMQ, SQS

---

## Troubleshooting

### Session Not Restoring

1. Check if context file exists:
   ```bash
   cat .claude/tasks/context_session_latest.md
   ```

2. Manually restore:
   ```
   /restoreContext
   ```

### Hooks Not Firing

1. Verify hooks in settings:
   ```bash
   cat .claude/settings.json | jq '.hooks'
   ```

2. Restart Claude Code session

### MCP Server Not Available

1. Check MCP configuration
2. Verify server is running
3. Check permissions in settings.json

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Add your agent/skill/command
4. Update this README
5. Submit pull request

### Guidelines

- Follow existing patterns for agents and skills
- Include MCP integration where applicable
- Add examples to skill documentation
- Test with actual Claude Code sessions

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- Built for Claude Code by Anthropic
- MCP (Model Context Protocol) integration
- Superpowers plugin system

---

**Made with Claude Code**
