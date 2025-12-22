---
name: workflow
description: Show master workflow summary and available commands
arguments: []
---

# Master Workflow Summary

## Quick Commands

| Command | Domain | Usage |
|---------|--------|-------|
| `/payment [task]` | Payment integration | Gateway, 3DS, tokenization, refunds |
| `/security [task]` | Security & compliance | PCI audit, pentest, WAF, fraud |
| `/frontend [task]` | Frontend development | React, Next.js, components, UI |
| `/api [task]` | API development | REST, GraphQL, webhooks, docs |
| `/testing [task]` | Testing | E2E, unit, integration, coverage |

## Master Workflow (Always-On)

```
USER REQUEST
    ↓
1. CLASSIFY domain (payment/security/frontend/api/testing)
    ↓
2. SELECT skills (from 46 available)
    ↓
3. CHOOSE MCPs (Serena/Context7/Playwright/Chrome/Episodic Memory)
    ↓
4. INVOKE Superpowers (brainstorming/TDD/debugging/verification)
    ↓
5. DISPATCH agent if needed (15 specialized agents)
    ↓
6. EXECUTE 4-phase workflow
    ↓
TASK COMPLETE
```

## 4-Phase Execution Flow

### Phase 1: Discovery
- Check **Episodic Memory** for past decisions
- Get **Context7** documentation
- Analyze code with **Serena**
- Invoke **brainstorming** if designing

### Phase 2: Implementation
- Invoke **test-driven-development**
- Use relevant skills
- Follow patterns from Context7
- Code with Serena assistance

### Phase 3: Testing
- E2E test with **Playwright**
- Debug with **Chrome**
- Invoke **systematic-debugging** if issues

### Phase 4: Review
- Invoke **verification-before-completion**
- Run actual commands (tests, build)
- Store learnings in **Serena memory**
- Request code review if significant

## Available Resources

### Skills (46)
- Payment: 15 skills (orchestration, tokenization, 3DS, refunds, etc.)
- Development: 12 skills (API, frontend, database, testing, etc.)
- Security: 9 skills (compliance, audit, WAF, keys, etc.)
- UI: 8 skills (animations, tables, toasts, validation, etc.)
- Infrastructure: 4 skills (deploy, provision, monitor, etc.)

### Agents (15)
- Payment: `payment-integration`, `visa-cybersource-payments`, `mastercard-mpgs-specialist`
- Development: `fullstack-developer`, `frontend-developer`, `nextjs-developer`, `api-designer`, `api-documenter`
- Security: `security-auditor`, `penetration-tester`
- Testing: `playwright-testing`, `shadcn-ui-architect`
- Infrastructure: `sequential-reasoner`, `memory-context-manager`, `agent-mcp-discovery`

### MCP Servers (5)
- **Serena**: Code analysis, refactoring, memory
- **Context7**: Library documentation
- **Playwright**: Browser automation, E2E testing
- **Chrome**: Live debugging, dashboard monitoring
- **Episodic Memory**: Cross-session context

### Superpowers (7)
- `brainstorming`: Before design work
- `test-driven-development`: Before implementation
- `systematic-debugging`: When investigating issues
- `verification-before-completion`: Before claiming done
- `writing-plans`: For complex multi-step tasks
- `subagent-driven-development`: For parallel tasks
- `requesting-code-review`: After significant changes

---

**Start with:** `/payment`, `/security`, `/frontend`, `/api`, or `/testing`

Or describe your task and the workflow will automatically route to the right skills, MCPs, and agents.
