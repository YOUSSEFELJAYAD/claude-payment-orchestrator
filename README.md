# Claude Payment Orchestrator

> **The most powerful Claude Code plugin for payment systems development** - 28 specialized agents, 68 skills, 3-tier thinking system, and full MCP integration.

[![npm version](https://img.shields.io/npm/v/@youssefeljayad/claude-payment-orchestrator)](https://www.npmjs.com/package/@youssefeljayad/claude-payment-orchestrator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What Is This?

This plugin transforms Claude Code into a **payment systems powerhouse**. It provides:

- **28 Specialized Agents** - Domain experts for payments, security, fraud, webhooks, DevOps
- **68 Domain Skills** - Payment orchestration, PCI compliance, fraud detection, 3-tier thinking
- **14 Slash Commands** - Quick access to workflows + checkpoints + scaffolding
- **MCP Mock Framework** - Full testing infrastructure with mock servers
- **5 MCP Server Integrations** - Serena, Context7, Playwright, Chrome, Episodic Memory
- **3-Tier Thinking System** - `think hard` → `think harder` → `ultrathink`
- **Module System** - Install only what you need (core, payment, security, frontend)
- **Seamless Session Persistence** - Auto-save/restore across compacts

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CLAUDE PAYMENT ORCHESTRATOR                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   USER REQUEST                                                               │
│        │                                                                     │
│        ▼                                                                     │
│   ┌─────────────────┐                                                       │
│   │ claude-code-    │  Classifies request → Selects skills → Routes        │
│   │ workflow skill  │                                                       │
│   └────────┬────────┘                                                       │
│            │                                                                 │
│            ▼                                                                 │
│   ┌─────────────────────────────────────────────────────────┐               │
│   │                    AGENT LAYER                           │               │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │               │
│   │  │ Payment  │ │ Security │ │ Frontend │ │ Testing  │   │               │
│   │  │ Agents   │ │ Agents   │ │ Agents   │ │ Agents   │   │               │
│   │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │               │
│   └───────┼────────────┼────────────┼────────────┼─────────┘               │
│           │            │            │            │                          │
│           ▼            ▼            ▼            ▼                          │
│   ┌─────────────────────────────────────────────────────────┐               │
│   │                    MCP LAYER                             │               │
│   │  ┌────────┐ ┌──────────┐ ┌───────────┐ ┌─────────────┐ │               │
│   │  │ Serena │ │ Context7 │ │ Playwright│ │  Episodic   │ │               │
│   │  │ (Code) │ │ (Docs)   │ │ (Testing) │ │  Memory     │ │               │
│   │  └────────┘ └──────────┘ └───────────┘ └─────────────┘ │               │
│   └─────────────────────────────────────────────────────────┘               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Flow

1. **You make a request** → `/payment integrate Stripe`
2. **Workflow skill classifies** → Payment domain, needs `payment-orchestration` skill
3. **Agents activate** → `payment-integration` agent takes over
4. **MCP tools engaged** → Serena analyzes code, Context7 gets Stripe docs
5. **Skills guide execution** → Step-by-step payment integration
6. **Verification runs** → Tests pass, code reviewed
7. **Memory saved** → Learnings stored for future sessions

---

## Quick Start

### Installation

```bash
# Option 1: npm (recommended)
npm install @youssefeljayad/claude-payment-orchestrator

# Option 2: Clone
git clone https://github.com/YOUSSEFELJAYAD/mcp-config-master.git
cd mcp-config-master
cp -r master/ ~/.claude/
```

### First Commands

```bash
# Start Claude Code
claude

# See what's available
/workflow

# Start thinking hard about a problem
/think hard about how to implement retry logic

# Build something
/payment integrate Stripe
/frontend build checkout form
/security audit PCI compliance
```

---

## 3-Tier Thinking System

The **killer feature** - escalating reasoning power:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THINKING POWER LEVELS                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  TIER 1: think hard                    TIER 2: think harder                 │
│  ─────────────────                     ──────────────────────               │
│  • Episodic Memory search              • Everything in Tier 1               │
│  • Context7 documentation              • 3+ parallel agents                 │
│  • Serena code analysis                • Writing-Plans skill                │
│  • Single Explore agent                • Systematic-Debugging               │
│  • TodoWrite planning                  • Playwright testing                 │
│                                                                              │
│  TIER 3: ultrathink (MAXIMUM POWER)                                         │
│  ──────────────────────────────────                                         │
│  • Everything in Tier 1 & 2                                                 │
│  • 6+ agent swarm deployment                                                │
│  • ALL Superpowers skills                                                   │
│  • Chrome live monitoring                                                   │
│  • Web Search integration                                                   │
│  • Code Review Suite                                                        │
│  • Multi-phase verification                                                 │
│  • Memory write-back                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Usage

```bash
# Tier 1 - Complex questions, understanding code
/think hard about the payment flow architecture

# Tier 2 - Debugging, major features
/think harder about why 3DS authentication is failing

# Tier 3 - Architecture redesigns, critical issues
/think ultrathink about redesigning the entire payment system
```

### Capabilities Matrix

| Capability | think-hard | think-harder | ultrathink |
|------------|:----------:|:------------:|:----------:|
| Episodic Memory | ✅ | ✅ | ✅ |
| Context7 Docs | ✅ | ✅ | ✅ |
| Serena Code Analysis | ✅ | ✅ | ✅ |
| Single Explore Agent | ✅ | ✅ | ✅ |
| Parallel Agents (3+) | ❌ | ✅ | ✅ |
| Agent Swarm (6+) | ❌ | ❌ | ✅ |
| Playwright Testing | ❌ | ✅ | ✅ |
| Chrome Monitoring | ❌ | ❌ | ✅ |
| Web Search | ❌ | ❌ | ✅ |
| ALL Superpowers | ❌ | ❌ | ✅ |

---

## Module System

Install only what you need:

```
┌─────────────────────────────────────────────────────────────────┐
│                         MODULES                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   CORE (Required)                                                │
│   ├── claude-code-workflow      (Master routing)                │
│   ├── think-hard/harder/ultra   (Thinking tiers)                │
│   ├── agent-organizer           (Task decomposition)            │
│   └── memory-context-manager    (Session persistence)           │
│                                                                  │
│   PAYMENT (Optional)                                             │
│   ├── payment-orchestration     (Flow design)                   │
│   ├── integrate-visa-cybersource                                │
│   ├── integrate-mpgs-gateway                                    │
│   └── 9 more payment skills                                     │
│                                                                  │
│   SECURITY (Optional)                                            │
│   ├── security-compliance       (PCI DSS)                       │
│   ├── verify-pci-scope                                          │
│   └── 4 more security skills                                    │
│                                                                  │
│   FRONTEND (Optional)                                            │
│   ├── frontend-development      (React/Next.js)                 │
│   ├── scaffold-payment-form                                     │
│   └── 3 more frontend skills                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Agents (28)

### Payment Domain

| Agent | Purpose | Key Skills |
|-------|---------|------------|
| `payment-integration` | Payment flow orchestration | payment-orchestration, psp-integration |
| `visa-cybersource-payments` | Visa CyberSource specialist | integrate-visa-cybersource |
| `mastercard-mpgs-specialist` | Mastercard MPGS specialist | integrate-mpgs-gateway |
| `stripe-payments-specialist` | Stripe full integration | integrate-stripe-full |
| `paypal-payments-specialist` | PayPal integration | integrate-paypal-full |
| `adyen-payments-specialist` | Adyen integration | integrate-adyen-gateway |
| `square-payments-specialist` | Square integration | integrate-square-payments |
| `3ds-flow-specialist` | 3DS authentication flows | implement-3ds-flow, render-3ds-challenge |

### Fraud & Compliance

| Agent | Purpose | Key Skills |
|-------|---------|------------|
| `fraud-prevention-specialist` | Fraud detection & prevention | analyze-fraud-signals, implement-risk-scoring |
| `pci-compliance-specialist` | PCI DSS compliance | verify-pci-scope, certify-pci-readiness |
| `webhook-orchestrator` | Webhook reliability | implement-webhook-reliability, validate-webhook-signatures |

### Development

| Agent | Purpose | Key Skills |
|-------|---------|------------|
| `fullstack-developer` | Full-stack development | api-development, frontend-development |
| `frontend-developer` | React/Next.js specialist | frontend-development |
| `nextjs-developer` | Next.js App Router expert | frontend-development |
| `api-designer` | API design & implementation | api-development |
| `api-documenter` | OpenAPI documentation | api-development |
| `github-integration-specialist` | GitHub workflows & PR management | github-workflow |

### Security

| Agent | Purpose | Key Skills |
|-------|---------|------------|
| `security-auditor` | Security & PCI compliance | security-compliance, verify-pci-scope |
| `penetration-tester` | Security testing | perform-penetration-test |

### Testing & UI

| Agent | Purpose | Key Skills |
|-------|---------|------------|
| `playwright-testing` | E2E testing specialist | testing |
| `shadcn-ui-architect` | UI component design | frontend-development |

### Infrastructure

| Agent | Purpose | Key Skills |
|-------|---------|------------|
| `agent-organizer` | Task decomposition & orchestration | Meta-orchestrator |
| `sequential-reasoner` | Step-by-step flow validation | Payment/security flows |
| `memory-context-manager` | Session state management | Context file management |
| `agent-mcp-discovery` | MCP tool discovery | MCP integration guidance |
| `error-recovery-specialist` | Error handling & retry strategies | handle-payment-errors |
| `database-specialist` | Database architecture | database-operations |
| `devops-engineer` | CI/CD & infrastructure | deploy-canary-release |

---

## Skills (68)

### Payment Skills (20)

| Skill | Use When |
|-------|----------|
| `payment-orchestration` | Designing payment flows, PSP coordination |
| `scaffold-payment-form` | Building checkout forms |
| `tokenize-card-data` | Card tokenization, PCI scope reduction |
| `process-refund-flow` | Refund logic implementation |
| `render-3ds-challenge` | 3D Secure authentication UI |
| `implement-3ds-flow` | Complete 3DS authentication flow |
| `integrate-mpgs-gateway` | Mastercard MPGS integration |
| `integrate-visa-cybersource` | Visa CyberSource integration |
| `integrate-stripe-full` | Stripe Payment Intents, Subscriptions, Connect |
| `integrate-paypal-full` | PayPal Orders API, Smart Buttons |
| `integrate-adyen-gateway` | Adyen Sessions API, Drop-in |
| `integrate-square-payments` | Square Web Payments SDK |
| `integrate-apple-pay` | Apple Pay JS integration |
| `integrate-google-pay` | Google Pay Web API |
| `diagnose-cybersource-failure` | CyberSource error diagnosis |
| `diagnose-mpgs-failure` | MPGS error diagnosis |
| `psp-integration` | Generic PSP patterns |
| `calculate-transaction-fees` | Fee calculation logic |
| `build-payment-link-page` | Payment link pages |
| `handle-payment-errors` | Error categorization and retry strategies |

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

### Security & Compliance Skills (10)

| Skill | Use When |
|-------|----------|
| `security-compliance` | PCI DSS compliance |
| `verify-pci-scope` | Scope assessment |
| `audit-access-logs` | Log analysis |
| `configure-waf-rules` | WAF configuration |
| `blackhole-suspicious-ip` | IP blocking |
| `detect-velocity-attack` | Velocity attack detection |
| `audit-cardholder-environment` | CDE audit |
| `validate-encryption-standards` | Encryption validation |
| `certify-pci-readiness` | PCI certification readiness |
| `rotate-encryption-keys` | Key rotation procedures |

### Development Skills (8)

| Skill | Use When |
|-------|----------|
| `api-development` | API design and implementation |
| `frontend-development` | React/Next.js UI development |
| `database-operations` | Schema design, migrations |
| `testing` | Test strategy and implementation |
| `saga-management` | Distributed transactions |
| `deploy-canary-release` | Canary deployments |
| `github-workflow` | Git/GitHub best practices |
| `dev-browser` | Browser automation development |

### Thinking Skills (3)

| Skill | Use When |
|-------|----------|
| `think-hard` | Complex questions, architecture decisions (Tier 1) |
| `think-harder` | Debugging, major features, parallel investigation (Tier 2) |
| `ultrathink` | Maximum power: full analysis, agent swarms (Tier 3) |

### Meta Skills (3)

| Skill | Use When |
|-------|----------|
| `claude-code-workflow` | **EVERY REQUEST** - Master routing |
| `utilize-mcp-agent` | MCP tool reference |
| `checkpoint-management` | Save/restore task state |

---

## Commands (14)

### Workflow Commands

| Command | Description |
|---------|-------------|
| `/workflow` | Show master workflow and routing |
| `/payment [task]` | Payment integration workflow |
| `/security [task]` | Security & compliance workflow |
| `/frontend [task]` | Frontend development workflow |
| `/api [task]` | API development workflow |
| `/testing [task]` | Testing workflow |

### Thinking Commands

| Command | Description |
|---------|-------------|
| `/think [level] [topic]` | Smart routing to thinking tier |
| `/debug [issue]` | Systematic debugging workflow |

### Session Commands

| Command | Description |
|---------|-------------|
| `/saveContext` | Save current session state |
| `/restoreContext` | Restore session from file |
| `/checkpoint [action]` | Save/list/restore/diff/delete checkpoints |

### Scaffolding Commands

| Command | Description |
|---------|-------------|
| `/new-agent [name]` | Create new agent from template |
| `/new-skill [name]` | Create new skill from template |
| `/new-command [name]` | Create new command from template |

---

## MCP Integration

### Available Servers

| Server | Purpose | Key Tools |
|--------|---------|-----------|
| **Serena** | Semantic code analysis | `find_symbol`, `replace_symbol_body`, `search_for_pattern`, `write_memory` |
| **Context7** | Real-time library docs | `resolve_library_id`, `query_docs` |
| **Playwright** | Browser automation | `browser_navigate`, `browser_click`, `browser_fill_form`, `browser_snapshot` |
| **Chrome** | Persistent browser | `use_browser` (navigate, click, type, extract, screenshot) |
| **Episodic Memory** | Cross-session context | `search`, `read` |

### MCP-First Development Pattern

```typescript
// 1. Get docs first
const docs = await mcp_context7.query_docs({
  libraryId: "/stripe/stripe-node",
  query: "payment intents create"
});

// 2. Analyze existing code
const existing = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentService"
});

// 3. Implement based on docs
await mcp_serena.replace_symbol_body({...});

// 4. Test with Playwright
await mcp_playwright.browser_navigate({url: "http://localhost:3000/checkout"});

// 5. Save learnings
await mcp_serena.write_memory({
  memory_file_name: "stripe-integration.md",
  content: "..."
});
```

---

## Session Persistence

**Never lose context again** - automatic save/restore across compacts.

```
┌─────────────────────────────────────────────────────────────┐
│                  SEAMLESS SESSION FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SESSION START                                               │
│  └─► SessionStart Hook                                       │
│      └─► Auto-restore from context file (if exists)         │
│                                                              │
│  WORKING...                                                  │
│                                                              │
│  MEMORY LOW                                                  │
│  └─► PreCompact Hook                                         │
│      └─► Auto-save to .claude/tasks/context_session_latest.md│
│                                                              │
│  COMPACT HAPPENS                                             │
│  └─► PostCompact Hook                                        │
│      └─► Auto-restore + Continue seamlessly                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Context File Contents

```markdown
# Session Context
- Current task description
- Architectural decisions made
- Agent outputs and recommendations
- Trade-offs and risks identified
- Current state
- Immediate next step
- Outstanding TODOs
```

---

## 4-Phase Execution Workflow

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

## Hooks (2)

| Hook | Trigger | Action |
|------|---------|--------|
| `session-context` | SessionStart, PreCompact | Auto-save/restore context across sessions |
| `post-task-verification` | PostToolUse (Write, Edit, Bash) | Auto-verify builds, tests, PCI compliance |

---

## Security

### Bash Restrictions

`settings.json` enforces security:

```json
{
  "permissions": {
    "allow": [
      "Bash(bun:*)",
      "Bash(npm:*)",
      "Bash(node:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Bash(rm -rf /:*)",
      "Bash(curl * | sh:*)",
      "Bash(wget * | bash:*)",
      "Bash(chmod 777:*)",
      "Bash(> /etc/*:*)"
    ]
  }
}
```

### Quality Gates

All implementations must pass:

- **Security-first** - PCI compliant patterns
- **Idempotent payments** - Safe to retry
- **Rollback-capable** - Can undo operations
- **Type-safe APIs** - Full TypeScript
- **Audit logging** - Complete trail

---

## Scaffolding

Create new components quickly:

```bash
# Create new agent
/new-agent fraud-detector

# Create new skill
/new-skill detect-card-testing

# Create new command
/new-command fraud
```

Templates are in `templates/` directory.

---

## Development & Testing

### Validation

```bash
# Validate all configuration
npm run validate

# Count components
npm run count

# Run tests
npm test
```

### MCP Mock Framework

For testing without real MCP servers:

```typescript
import { createMockMcpContext } from './tests/mcp-mocks';

const mcp = createMockMcpContext();

// Mock responses
mcp.serena.setMockResponse('find_symbol', {...});
mcp.context7.setMockResponse('query_docs', {...});

// Use in tests
const result = await mcp.serena.find_symbol({...});
```

---

## Repository Structure

```
mcp-config-master/
├── plugin.json              # Plugin manifest
├── package.json             # npm package config
├── LICENSE                  # MIT license
├── CHANGELOG.md             # Version history
├── CONTRIBUTING.md          # Contribution guide
├── master/
│   ├── settings.json        # Permissions + Hooks
│   ├── agents/              # 28 agent definitions
│   ├── skills/              # 68 skill definitions
│   ├── commands/            # 14 slash commands
│   ├── hooks/               # 2 hooks
│   ├── core/                # Core module
│   └── modules/             # Optional modules
│       ├── payment/
│       ├── security/
│       └── frontend/
├── templates/               # Scaffolding templates
│   ├── agent.template.md
│   ├── skill/
│   └── command.template.md
├── tests/
│   ├── mcp-mocks/           # MCP mock framework
│   ├── skills/              # Skill tests
│   ├── agents/              # Agent tests
│   └── integration/         # Integration tests
├── docs/
│   ├── GETTING-STARTED.md   # Full tutorial
│   ├── FAQ.md               # Common questions
│   ├── TROUBLESHOOTING.md   # Error diagnosis
│   └── API-REFERENCE.md     # Complete API reference
├── scripts/
│   └── validate-config.cjs  # Validation script
└── .github/
    └── workflows/           # CI/CD
```

---

## Technology Stack

- **Runtime:** Node.js 20+ with Bun
- **Language:** TypeScript (strict mode)
- **Frontend:** React, Next.js 14+ (App Router)
- **Styling:** Tailwind CSS, Shadcn UI
- **Forms:** React Hook Form + Zod
- **State:** Zustand
- **Testing:** Vitest, Jest, Playwright
- **Database:** PostgreSQL
- **Queues:** BullMQ, SQS

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

### Example 2: Debug 3DS Failure

```
User: /think harder about why 3DS authentication is failing

Claude Code (Tier 2):
1. Searches memory for past 3DS issues
2. Deploys 3 parallel agents:
   - Code analysis agent
   - Log analysis agent
   - Documentation agent
3. Uses systematic-debugging skill
4. Runs Playwright to reproduce issue
5. Identifies root cause
6. Proposes fix
```

### Example 3: Architecture Redesign

```
User: /think ultrathink about redesigning the payment system

Claude Code (Tier 3 - MAXIMUM POWER):
1. Deploys 6+ agent swarm
2. Searches all memory sources
3. Fetches latest docs for all payment providers
4. Analyzes entire codebase
5. Uses brainstorming for design options
6. Creates comprehensive plan
7. Multi-phase verification
8. Writes findings to memory
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

```bash
# Setup
git clone https://github.com/YOUSSEFELJAYAD/mcp-config-master.git
cd mcp-config-master
bun install

# Validate before PR
npm run validate
npm run lint
npm test
```

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Links

- [Getting Started Guide](docs/GETTING-STARTED.md) - Full tutorial with examples
- [FAQ](docs/FAQ.md) - Common questions answered
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Error diagnosis and solutions
- [API Reference](docs/API-REFERENCE.md) - Complete API documentation
- [GitHub Repository](https://github.com/YOUSSEFELJAYAD/mcp-config-master)
- [npm Package](https://www.npmjs.com/package/@youssefeljayad/claude-payment-orchestrator)
- [Issue Tracker](https://github.com/YOUSSEFELJAYAD/mcp-config-master/issues)
- [Changelog](CHANGELOG.md)

---

**Made with Claude Code**
