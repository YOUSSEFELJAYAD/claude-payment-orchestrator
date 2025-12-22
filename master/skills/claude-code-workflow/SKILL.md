# Skill: Claude Code Workflow

**Role:** Master Orchestrator
**Domain:** AI Agent & Tool Orchestration
**Objective:** Route EVERY request to optimal skills, agents, and MCP tools autonomously. This skill activates for ALL requests and determines the most effective execution path.

## Activation

**Trigger:** EVERY user request (Always-On)
**Mode:** Autonomous (no confirmation needed)

## Core Principle

Before responding to ANY request, Claude Code MUST:
1. **Classify** the request domain
2. **Select** appropriate skills
3. **Choose** MCP tools
4. **Invoke** Superpowers workflows
5. **Dispatch** specialized agents if needed

## Request Classification Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REQUEST CLASSIFICATION                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PAYMENT DOMAIN                                                              │
│  Keywords: payment, checkout, stripe, adyen, PSP, 3DS, tokenize, refund     │
│  Skills: payment-orchestration, tokenize-card-data, process-refund-flow,    │
│          scaffold-payment-form, render-3ds-challenge, calculate-fees        │
│  Agents: payment-integration, visa-cybersource-payments, mastercard-mpgs    │
│                                                                              │
│  SECURITY & COMPLIANCE                                                       │
│  Keywords: PCI, compliance, audit, WAF, encryption, penetration, security   │
│  Skills: security-compliance, verify-pci-scope, audit-access-logs,          │
│          configure-waf-rules, rotate-encryption-keys, blackhole-ip          │
│  Agents: security-auditor, penetration-tester                               │
│                                                                              │
│  FRONTEND & UI                                                               │
│  Keywords: React, component, UI, form, animation, toast, table, mobile      │
│  Skills: frontend-development, validate-card-input-ui, animate-processing,  │
│          display-toast-notification, render-transaction-table               │
│  Agents: frontend-developer, nextjs-developer, shadcn-ui-architect          │
│                                                                              │
│  API & BACKEND                                                               │
│  Keywords: API, endpoint, webhook, REST, GraphQL, database, saga            │
│  Skills: api-development, handle-webhook-event, database-operations,        │
│          saga-management, normalize-payment-status                          │
│  Agents: api-designer, api-documenter, fullstack-developer                  │
│                                                                              │
│  TESTING & QA                                                                │
│  Keywords: test, E2E, playwright, coverage, mock, verify                    │
│  Skills: testing, mock-psp-response, diagnose-mpgs-failure                  │
│  Agents: playwright-testing, sequential-reasoner                            │
│                                                                              │
│  INFRASTRUCTURE & DEVOPS                                                     │
│  Keywords: deploy, canary, provision, monitor, latency, environment         │
│  Skills: deploy-canary-release, provision-pci-environment,                  │
│          monitor-transaction-latency, evaluate-routing-rules                │
│  Agents: memory-context-manager, agent-mcp-discovery                        │
│                                                                              │
│  GATEWAY INTEGRATION                                                         │
│  Keywords: MPGS, CyberSource, Visa, Mastercard, gateway, integration        │
│  Skills: integrate-mpgs-gateway, integrate-visa-cybersource,                │
│          psp-integration, generate-3ds-payload                              │
│  Agents: visa-cybersource-payments, mastercard-mpgs-specialist              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## MCP Selection Rules

| Condition | MCP Server | Usage |
|-----------|------------|-------|
| Need to understand code structure | **Serena** | `find_symbol`, `get_symbols_overview`, `find_referencing_symbols` |
| Need to modify code | **Serena** | `replace_symbol_body`, `insert_after_symbol`, `replace_content` |
| Need library documentation | **Context7** | `resolve_library_id` → `get_library_docs` |
| Need to test in browser | **Playwright** | `browser_navigate`, `browser_fill_form`, `browser_click` |
| Need to monitor dashboards | **Chrome** | `use_browser` with navigate, extract, screenshot |
| Need past decisions/context | **Episodic Memory** | `search` with relevant query terms |
| Need to store learnings | **Serena** | `write_memory` for project decisions |

## Superpowers Workflow Selection

| Situation | Invoke Skill | Why |
|-----------|--------------|-----|
| Creating new feature/component | `brainstorming` | Explore requirements and design before code |
| Investigating bug or failure | `systematic-debugging` | Follow root cause methodology |
| Writing new implementation | `test-driven-development` | Write tests first, then code |
| About to claim task complete | `verification-before-completion` | Run actual commands, verify output |
| Complex multi-step task | `writing-plans` | Create detailed implementation plan |
| Multiple independent subtasks | `subagent-driven-development` | Dispatch parallel agents |
| After significant code changes | `requesting-code-review` | Get thorough review |
| Received review feedback | `receiving-code-review` | Address feedback rigorously |

## Specialized Agent Dispatch Rules

| Request Type | Dispatch Agent | With Skills |
|--------------|----------------|-------------|
| Payment gateway integration | `payment-integration` | payment-orchestration, psp-integration |
| Visa/CyberSource specific | `visa-cybersource-payments` | integrate-visa-cybersource |
| Mastercard/MPGS specific | `mastercard-mpgs-specialist` | integrate-mpgs-gateway |
| React/Next.js frontend | `frontend-developer` | frontend-development |
| Next.js App Router | `nextjs-developer` | frontend-development |
| Shadcn UI components | `shadcn-ui-architect` | frontend-development |
| API design | `api-designer` | api-development |
| API documentation | `api-documenter` | api-development |
| Full-stack features | `fullstack-developer` | api-development, frontend-development |
| E2E test automation | `playwright-testing` | testing |
| Security audit | `security-auditor` | security-compliance |
| Penetration testing | `penetration-tester` | security-compliance |
| Complex workflow analysis | `sequential-reasoner` | saga-management |
| Context/memory management | `memory-context-manager` | utilize-mcp-agent |
| MCP tool discovery | `agent-mcp-discovery` | utilize-mcp-agent |

## Execution Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MASTER WORKFLOW EXECUTION                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  USER REQUEST RECEIVED                                                       │
│         ↓                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ STEP 1: CONTEXT RETRIEVAL                                            │    │
│  │ • Episodic Memory: Search for similar past requests                  │    │
│  │ • Serena: Read any relevant memories                                 │    │
│  │ • Identify: What did we learn last time?                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ STEP 2: REQUEST CLASSIFICATION                                       │    │
│  │ • Parse request keywords                                             │    │
│  │ • Match to domain (payment/security/frontend/api/testing/infra)     │    │
│  │ • Select primary skill(s)                                           │    │
│  │ • Identify supporting skills                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ STEP 3: SUPERPOWERS WORKFLOW CHECK                                   │    │
│  │ • Is this creative work? → brainstorming                            │    │
│  │ • Is this debugging? → systematic-debugging                         │    │
│  │ • Is this new code? → test-driven-development                       │    │
│  │ • Is this complex? → writing-plans                                  │    │
│  │ • INVOKE the appropriate Superpowers skill FIRST                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ STEP 4: MCP TOOL SELECTION                                          │    │
│  │ • Code understanding needed? → Serena                               │    │
│  │ • Library docs needed? → Context7                                   │    │
│  │ • Browser testing needed? → Playwright                              │    │
│  │ • Dashboard monitoring? → Chrome                                    │    │
│  │ • Configure tools for the task                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ STEP 5: AGENT DISPATCH (if needed)                                  │    │
│  │ • Does task require specialized expertise?                          │    │
│  │ • Match to appropriate agent                                        │    │
│  │ • Dispatch with skill + MCP context                                 │    │
│  │ • For parallel tasks, dispatch multiple agents                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ STEP 6: EXECUTE WITH 4-PHASE WORKFLOW                               │    │
│  │ • Phase 1: Discovery (Context7 + Episodic Memory + Serena)          │    │
│  │ • Phase 2: Implementation (Serena + TDD)                            │    │
│  │ • Phase 3: Testing (Playwright + Chrome)                            │    │
│  │ • Phase 4: Review (verification + code-review)                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ STEP 7: VERIFICATION & STORAGE                                      │    │
│  │ • Invoke verification-before-completion                             │    │
│  │ • Run actual commands to verify                                     │    │
│  │ • Store learnings in Serena memory                                  │    │
│  │ • Update Episodic Memory through conversation                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  TASK COMPLETE                                                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Quick Reference: Skill Directory

### Payment Skills (15)
| Skill | Use When |
|-------|----------|
| `payment-orchestration` | Designing payment flows, PSP coordination |
| `scaffold-payment-form` | Building checkout forms |
| `tokenize-card-data` | Card tokenization, PCI scope reduction |
| `process-refund-flow` | Refund logic implementation |
| `render-3ds-challenge` | 3DS authentication UI |
| `calculate-transaction-fees` | Fee calculation logic |
| `manage-payment-session` | Session state management |
| `build-payment-link-page` | Payment link generation |
| `detect-velocity-attack` | Fraud detection |
| `integrate-mpgs-gateway` | Mastercard MPGS integration |
| `integrate-visa-cybersource` | Visa CyberSource integration |
| `psp-integration` | Generic PSP adapter patterns |
| `handle-webhook-event` | Webhook processing |
| `mock-psp-response` | Test mocking |
| `generate-3ds-payload` | 3DS data generation |

### Development Skills (12)
| Skill | Use When |
|-------|----------|
| `api-development` | API design and implementation |
| `frontend-development` | React/Next.js UI development |
| `database-operations` | Schema, migrations, queries |
| `testing` | Test strategy and implementation |
| `saga-management` | Distributed transactions |
| `normalize-payment-status` | Status mapping |
| `evaluate-routing-rules` | Routing logic |
| `diagnose-mpgs-failure` | Gateway debugging |

### Security Skills (9)
| Skill | Use When |
|-------|----------|
| `security-compliance` | PCI DSS compliance |
| `verify-pci-scope` | Scope assessment |
| `audit-access-logs` | Log analysis |
| `configure-waf-rules` | WAF configuration |
| `rotate-encryption-keys` | Key rotation |
| `blackhole-suspicious-ip` | IP blocking |
| `perform-penetration-test` | Security testing |

### UI Skills (8)
| Skill | Use When |
|-------|----------|
| `animate-processing-state` | Loading animations |
| `display-routing-indicator` | Routing UI |
| `display-toast-notification` | Notifications |
| `render-transaction-table` | Data tables |
| `render-expired-link-state` | Error states |
| `validate-card-input-ui` | Card validation |
| `handle-mobile-keyboard` | Mobile UX |

### Infrastructure Skills (4)
| Skill | Use When |
|-------|----------|
| `deploy-canary-release` | Safe deployments |
| `provision-pci-environment` | Environment setup |
| `monitor-transaction-latency` | Performance monitoring |
| `integrate-web-search-capability` | Web search integration |

### Meta Skills (3)
| Skill | Use When |
|-------|----------|
| `utilize-mcp-agent` | MCP tool orchestration reference |
| `enforce-claude-rules` | Claude Code conventions |
| `dev-browser` | Browser automation server |

## MCP Integration Patterns

### Pattern 1: Documentation-First Development
```typescript
// 1. Get latest docs
const docs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "payment intents",
  mode: "code"
});

// 2. Analyze existing code
const existing = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentService",
  include_body: true
});

// 3. Implement based on docs
await mcp_serena.replace_symbol_body({...});

// 4. Test with Playwright
await mcp_playwright.browser_navigate({...});
```

### Pattern 2: Debug Workflow
```typescript
// 1. Check past similar issues
const past = await mcp_episodic_memory.search({
  query: ["payment error", "timeout"],
  mode: "both"
});

// 2. Trace code path
const refs = await mcp_serena.find_referencing_symbols({...});

// 3. Reproduce in browser
await mcp_playwright.browser_navigate({...});
const errors = await mcp_playwright.browser_console_messages({ level: "error" });

// 4. Monitor live
await mcp_chrome.use_browser({ action: "navigate", payload: "..." });
```

### Pattern 3: Security Audit
```typescript
// 1. Scan for vulnerabilities
const secrets = await mcp_serena.search_for_pattern({
  substring_pattern: "apiKey|secret|password|token",
  relative_path: "src"
});

// 2. Check compliance docs
const pciDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/pcisecuritystandards/pci-dss",
  topic: "requirement 3 stored data",
  mode: "info"
});

// 3. Test security controls
await mcp_playwright.browser_navigate({ url: "..." });
// Test auth bypass, XSS, etc.
```

## Best Practices

### Always Do
1. **Check Episodic Memory first** - Learn from past decisions
2. **Use Context7 before implementing** - Get latest library patterns
3. **Invoke Superpowers skills** - Follow established workflows
4. **Use Serena for code operations** - Don't manually read/write files
5. **Test with Playwright** - Verify in browser
6. **Store learnings** - Write to Serena memory

### Never Do
1. Skip the classification step
2. Implement without checking documentation
3. Claim completion without verification
4. Ignore past decisions in Episodic Memory
5. Manually edit code when Serena can do it
6. Forget to invoke Superpowers workflows

## Integration with CLAUDE.md

This skill extends the base CLAUDE.md instructions by providing:
- Specific routing rules for the 44 skills
- MCP tool selection criteria
- Agent dispatch rules
- 4-phase execution workflow

All requests should flow through this skill's logic before execution.
