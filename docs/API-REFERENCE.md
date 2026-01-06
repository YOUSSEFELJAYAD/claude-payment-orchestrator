# API Reference

Complete reference for all agents, skills, commands, and MCP integrations.

---

## Table of Contents

1. [Agents](#agents)
2. [Skills](#skills)
3. [Commands](#commands)
4. [MCP Servers](#mcp-servers)
5. [Hooks](#hooks)
6. [Configuration](#configuration)

---

## Agents

### Agent Structure

Every agent follows this structure:

```yaml
---
name: agent-name
description: What the agent does
tools: [Tool1, Tool2, ...]
model: sonnet | opus | haiku
color: red | blue | green | yellow | purple
---

# Agent Name

[Agent documentation and capabilities]
```

### Agent Reference

#### Payment Agents (11)

| Agent | Description | Tools | Model |
|-------|-------------|-------|-------|
| `visa-cybersource-payments` | Visa CyberSource integration | All + WebFetch | sonnet |
| `mastercard-mpgs-specialist` | Mastercard MPGS integration | All + WebFetch | sonnet |
| `stripe-payments-specialist` | Stripe full integration | All + WebFetch | sonnet |
| `paypal-payments-specialist` | PayPal integration | All + WebFetch | sonnet |
| `adyen-payments-specialist` | Adyen integration | All + WebFetch | sonnet |
| `square-payments-specialist` | Square integration | All + WebFetch | sonnet |
| `payment-integration` | Generic payment flows | All | sonnet |
| `3ds-flow-specialist` | 3DS authentication flows | All | sonnet |
| `fraud-prevention-specialist` | Fraud detection & prevention | All + WebSearch | sonnet |
| `pci-compliance-specialist` | PCI DSS compliance | All | sonnet |
| `webhook-orchestrator` | Webhook reliability | All | sonnet |

#### Development Agents (8)

| Agent | Description | Tools | Model |
|-------|-------------|-------|-------|
| `fullstack-developer` | Full-stack development | All | sonnet |
| `frontend-developer` | React/Next.js UI | All + Playwright | sonnet |
| `nextjs-developer` | Next.js specialist | All | sonnet |
| `api-designer` | API design & docs | All | sonnet |
| `api-documenter` | OpenAPI documentation | All | sonnet |
| `github-integration-specialist` | GitHub workflows & PR management | All | sonnet |
| `database-specialist` | Database operations | All | sonnet |
| `devops-engineer` | DevOps & CI/CD | All + Bash | sonnet |

#### Testing & Security Agents (4)

| Agent | Description | Tools | Model |
|-------|-------------|-------|-------|
| `security-auditor` | Security review | All | sonnet |
| `penetration-tester` | Security testing | All | sonnet |
| `playwright-testing` | E2E testing | All + Playwright | sonnet |
| `shadcn-ui-architect` | UI component design | All | sonnet |

#### Infrastructure Agents (5)

| Agent | Description | Tools | Model |
|-------|-------------|-------|-------|
| `sequential-reasoner` | Step-by-step reasoning | All | sonnet |
| `memory-context-manager` | Session context | All + Memory | sonnet |
| `agent-mcp-discovery` | MCP tool selection | All | haiku |
| `agent-organizer` | Multi-agent coordination | All | sonnet |
| `error-recovery-specialist` | Error handling & retry strategies | All | sonnet |

---

## Skills

### Skill Structure

```yaml
---
name: skill-name
description: What the skill does
activation: When to use this skill
---

# Skill Name

**Role:** The persona
**Domain:** Category
**Objective:** Goal

## Quick Start (TL;DR)
...

## Detailed Content
...

## Related Skills
...
```

### Skills by Category (68 Total)

#### Payment Skills (20)

| Skill | Activation Trigger |
|-------|-------------------|
| `payment-orchestration` | "payment flow", "orchestrate payments" |
| `scaffold-payment-form` | "payment form", "checkout form" |
| `tokenize-card-data` | "tokenize", "card tokenization" |
| `process-refund-flow` | "refund", "process refund" |
| `render-3ds-challenge` | "3DS", "3D Secure" |
| `implement-3ds-flow` | "3DS flow", "SCA" |
| `integrate-mpgs-gateway` | "MPGS", "Mastercard gateway" |
| `integrate-visa-cybersource` | "CyberSource", "Visa integration" |
| `integrate-stripe-full` | "Stripe", "Payment Intents" |
| `integrate-paypal-full` | "PayPal", "Orders API" |
| `integrate-adyen-gateway` | "Adyen", "Sessions API" |
| `integrate-square-payments` | "Square", "Web Payments SDK" |
| `integrate-apple-pay` | "Apple Pay" |
| `integrate-google-pay` | "Google Pay" |
| `psp-integration` | "PSP", "payment provider" |
| `handle-payment-errors` | "payment error", "retry" |
| `diagnose-cybersource-failure` | "CyberSource error" |
| `diagnose-mpgs-failure` | "MPGS error" |
| `calculate-transaction-fees` | "transaction fees" |
| `build-payment-link-page` | "payment link" |

#### Webhook Skills (4)

| Skill | Activation Trigger |
|-------|-------------------|
| `handle-webhook-event` | "webhook handler" |
| `implement-webhook-reliability` | "webhook retry", "reliability" |
| `manage-event-queuing` | "event queue", "message queue" |
| `validate-webhook-signatures` | "webhook signature", "HMAC" |

#### Fraud & Risk Skills (3)

| Skill | Activation Trigger |
|-------|-------------------|
| `analyze-fraud-signals` | "fraud signals", "risk signals" |
| `implement-risk-scoring` | "risk score", "fraud scoring" |
| `manage-fraud-rules` | "fraud rules", "rules engine" |

#### Security Skills (10)

| Skill | Activation Trigger |
|-------|-------------------|
| `security-compliance` | "security", "compliance" |
| `verify-pci-scope` | "PCI scope", "cardholder data" |
| `audit-access-logs` | "access logs", "audit logs" |
| `configure-waf-rules` | "WAF", "web firewall" |
| `audit-cardholder-environment` | "CDE audit", "cardholder environment" |
| `validate-encryption-standards` | "encryption validation", "cryptography" |
| `certify-pci-readiness` | "PCI certification", "SAQ" |
| `rotate-encryption-keys` | "key rotation", "key management" |
| `perform-penetration-test` | "pentest", "security testing" |
| `blackhole-suspicious-ip` | "block IP", "suspicious IP" |

#### Development Skills (8)

| Skill | Activation Trigger |
|-------|-------------------|
| `api-development` | "API", "REST", "endpoint" |
| `frontend-development` | "React", "Next.js", "UI" |
| `database-operations` | "database", "schema", "migration" |
| `testing` | "test", "testing strategy" |
| `saga-management` | "saga", "distributed transaction" |
| `deploy-canary-release` | "canary", "deployment" |
| `github-workflow` | "git", "GitHub", "PR" |
| `dev-browser` | "browser automation" |

#### Thinking Skills (3)

| Skill | Trigger | Power Level |
|-------|---------|-------------|
| `think-hard` | "think hard about" | Tier 1 |
| `think-harder` | "think harder about" | Tier 2 |
| `ultrathink` | "ultrathink about" | Tier 3 |

#### Meta Skills (3)

| Skill | Purpose |
|-------|---------|
| `claude-code-workflow` | Master routing workflow |
| `utilize-mcp-agent` | MCP tool reference |
| `checkpoint-management` | Save/restore task state |

---

## Commands

### Command Structure

```yaml
---
name: command-name
description: What the command does
arguments:
  - name: arg1
    description: Argument description
    required: true/false
---

# /command-name

[Command documentation]
```

### Command Reference

#### Payment Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `/integrate-visa` | `environment` | Start Visa CyberSource integration |
| `/integrate-mpgs` | `environment` | Start MPGS integration |
| `/payment-flow` | `type` | Design payment flow |
| `/refund` | `transaction_id` | Process refund |
| `/3ds-flow` | `version` | Implement 3DS |

#### Security Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `/security-audit` | `scope` | Run security audit |
| `/pci-check` | `level` | PCI compliance check |
| `/encrypt` | `algorithm` | Set up encryption |
| `/rotate-keys` | `service` | Key rotation |

#### Development Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `/api` | `method`, `path` | Create API endpoint |
| `/component` | `name` | Create React component |
| `/test` | `type` | Generate tests |
| `/migrate` | `direction` | Database migration |

#### Session Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `/saveContext` | - | Save session state |
| `/restoreContext` | - | Restore session state |
| `/checkpoint` | `action`, `id` | Manage checkpoints |
| `/compact` | - | Summarize context |

---

## MCP Servers

### Serena (Code Analysis)

```typescript
interface SerenaTools {
  // Symbol operations
  find_symbol(pattern: string): Symbol[];
  replace_symbol_body(path: string, body: string): void;
  get_symbols_overview(file: string): SymbolOverview;

  // Search
  search_for_pattern(pattern: string): SearchResult[];
  find_referencing_symbols(symbol: string): Reference[];

  // File operations
  read_file(path: string): string;
  create_text_file(path: string, content: string): void;
  replace_content(path: string, needle: string, replacement: string): void;

  // Memory
  write_memory(name: string, content: string): void;
  read_memory(name: string): string;
  list_memories(): string[];
}
```

### Context7 (Documentation)

```typescript
interface Context7Tools {
  // Library resolution
  resolve_library_id(name: string): LibraryInfo;

  // Documentation
  query_docs(libraryId: string, query: string): Documentation;
}
```

### Playwright (Browser Automation)

```typescript
interface PlaywrightTools {
  // Navigation
  browser_navigate(url: string): void;
  browser_navigate_back(): void;

  // Interaction
  browser_click(selector: string): void;
  browser_type(selector: string, text: string): void;
  browser_fill_form(fields: FormField[]): void;
  browser_select_option(selector: string, value: string): void;

  // Inspection
  browser_snapshot(): Snapshot;
  browser_take_screenshot(path?: string): string;
  browser_console_messages(): ConsoleMessage[];
  browser_network_requests(): NetworkRequest[];

  // Control
  browser_close(): void;
  browser_resize(width: number, height: number): void;
  browser_wait_for(condition: WaitCondition): void;
}
```

### Chrome (Persistent Browser)

```typescript
interface ChromeTools {
  use_browser(params: {
    action: 'navigate' | 'click' | 'type' | 'extract' | 'screenshot' | 'eval';
    payload?: string;
    selector?: string;
    tab_index?: number;
    timeout?: number;
  }): BrowserResult;
}
```

### Episodic Memory

```typescript
interface EpisodicMemoryTools {
  // Search past conversations
  search(query: string | string[], options?: SearchOptions): SearchResult[];

  // Read conversation details
  read(path: string, startLine?: number, endLine?: number): string;
}
```

---

## Hooks

### Hook Types

| Type | Trigger | Purpose |
|------|---------|---------|
| `PreToolUse` | Before tool execution | Validate, block unsafe ops |
| `PostToolUse` | After tool execution | Verify, log, checkpoint |
| `Stop` | Session end | Cleanup, save state |
| `SessionStart` | Session begin | Load context, check config |
| `UserPromptSubmit` | Before processing | Validate input |

### Available Hooks

#### post-task-verification

```yaml
type: PostToolUse
tools: [Write, Edit, Bash]
```

Automatically verifies:
- TypeScript compiles
- Tests pass
- No PCI violations
- Security patterns followed

---

## Configuration

### plugin.json

```json
{
  "name": "claude-payment-orchestrator",
  "version": "1.1.0",
  "description": "Comprehensive Claude Code plugin for payment systems with 28 agents, 68 skills, modular architecture, MCP mock framework, and 3-tier thinking system",
  "author": "YOUSSEFELJAYAD",
  "main": "master/",
  "engines": {
    "claude-code": ">=1.0.0"
  },
  "capabilities": {
    "agents": 28,
    "skills": 68,
    "commands": 14,
    "hooks": 2
  }
}
```

### settings.json

```json
{
  "permissions": {
    "allow": [
      "Bash(bun x tsx:*)",
      "Bash(npm:*)",
      "Bash(git:*)"
    ],
    "deny": [
      "Bash(rm -rf /)",
      "Bash(sudo:*)"
    ]
  },
  "mcp": {
    "serena": { "enabled": true },
    "context7": { "enabled": true },
    "playwright": { "enabled": true },
    "chrome": { "enabled": true },
    "episodic-memory": { "enabled": true }
  }
}
```

### CLAUDE.md Integration

The plugin extends CLAUDE.md with:
- Workflow definitions
- Agent routing tables
- Skill activation patterns
- MCP usage guidelines

---

## Type Definitions

### Common Types

```typescript
// Payment types
interface PaymentRequest {
  amount: number;
  currency: string;
  merchantId: string;
  customerId?: string;
  metadata?: Record<string, any>;
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  authCode?: string;
  errorCode?: string;
  errorMessage?: string;
}

// Webhook types
interface WebhookPayload {
  id: string;
  type: string;
  timestamp: Date;
  data: Record<string, any>;
  signature?: string;
}

// Checkpoint types
interface Checkpoint {
  id: string;
  name: string;
  timestamp: Date;
  state: CheckpointState;
  metadata: CheckpointMetadata;
}

// Agent types
interface AgentConfig {
  name: string;
  description: string;
  tools: string[];
  model: 'sonnet' | 'opus' | 'haiku';
  skills: string[];
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial release with 18 agents, 49 skills |
| 1.1.0 | 2025-01 | Added 28 agents, 68 skills, 14 commands, 2 hooks |
|        |         | + New PSP integrations: Stripe, PayPal, Adyen, Square |
|        |         | + Wallet integrations: Apple Pay, Google Pay |
|        |         | + Webhook reliability skills |
|        |         | + MCP mock framework for testing |
|        |         | + Checkpoint system and verification hooks |
