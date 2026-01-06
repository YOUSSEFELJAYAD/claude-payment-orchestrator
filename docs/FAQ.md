# Frequently Asked Questions

## General

### What is Claude Payment Orchestrator?

A comprehensive Claude Code plugin providing specialized agents, skills, and commands for payment systems development. It includes:
- 28 specialized agents for different domains (payment, security, fraud, webhooks, DevOps)
- 68 skills covering payment flows, security, fraud detection, and testing
- 14 slash commands for quick access to workflows
- 3-tier thinking system for complex problem solving
- 2 hooks for auto-verification and session persistence
- MCP mock framework for testing without external dependencies
- Full MCP integration (Serena, Context7, Playwright, Chrome, Episodic Memory)

### How is this different from using Claude Code directly?

This plugin adds:
1. **Domain expertise** - Pre-built knowledge for payments, PCI compliance, fraud detection
2. **Structured workflows** - Consistent patterns for common tasks
3. **MCP integration** - Automatic tool selection and coordination
4. **Enhanced reasoning** - 3-tier thinking system for complex problems

### What MCP servers are supported?

| Server | Purpose |
|--------|---------|
| Serena | Semantic code analysis, symbol navigation |
| Context7 | Real-time library documentation |
| Playwright | Browser automation and E2E testing |
| Chrome | Persistent browser control |
| Episodic Memory | Cross-session context |

---

## Installation

### How do I install the plugin?

**Option 1: npm (Recommended)**
```bash
npm install -g @youssefeljayad/claude-payment-orchestrator
```

**Option 2: Clone repository**
```bash
git clone https://github.com/YOUSSEFELJAYAD/mcp-config-master.git
cd mcp-config-master
cp -r master/ ~/.claude/
```

**Option 3: Symlink for development**
```bash
ln -s /path/to/mcp-config-master/master ~/.claude
```

### How do I verify installation?

```bash
# Run validation
npm run validate

# Check counts (should show 28 agents, 68 skills, 14 commands)
find master/agents -name "*.md" | wc -l
find master/skills -name "SKILL.md" | wc -l
find master/commands -name "*.md" | wc -l
```

### Can I use this with an existing Claude Code setup?

Yes. The plugin installs alongside your existing configuration. Your `.claude/` directory structure remains intact.

---

## Agents

### How do I choose the right agent?

Use this quick reference:

| Task | Agent |
|------|-------|
| Visa/CyberSource integration | `visa-cybersource-payments` |
| Mastercard MPGS | `mastercard-mpgs-specialist` |
| Stripe integration | `stripe-payments-specialist` |
| PayPal integration | `paypal-payments-specialist` |
| Adyen integration | `adyen-payments-specialist` |
| Square integration | `square-payments-specialist` |
| Generic payment flow | `payment-integration` |
| 3DS authentication | `3ds-flow-specialist` |
| Fraud detection | `fraud-prevention-specialist` |
| PCI compliance | `pci-compliance-specialist` |
| Webhook reliability | `webhook-orchestrator` |
| React/Next.js frontend | `frontend-developer` |
| API design | `api-designer` |
| Security audit | `security-auditor` |
| E2E testing | `playwright-testing` |
| Database work | `database-specialist` |
| GitHub workflows | `github-integration-specialist` |
| Error handling | `error-recovery-specialist` |

### Can I use multiple agents together?

Yes! The `agent-organizer` coordinates multi-agent workflows. Example:

```
User: Build a payment form with fraud detection

Claude:
1. Uses `frontend-developer` for form UI
2. Uses `payment-integration` for backend
3. Uses `fraud-prevention-specialist` for risk scoring
```

### How do agents differ from skills?

- **Agents** = Who does the work (specialists with tool access)
- **Skills** = How they do it (documented procedures)

An agent typically uses multiple skills to complete a task.

---

## Skills

### How many skills are included?

Currently 68 skills across these categories:
- Payment (20): PSP integration (Stripe, PayPal, Adyen, Square, Apple Pay, Google Pay), tokenization, 3DS, refunds
- Webhook (4): Event handling, reliability, queuing, signature validation
- Fraud & Risk (3): Signal analysis, risk scoring, rules engine
- Security (10): PCI compliance, encryption, access control, key rotation
- Development (8): API, frontend, testing, GitHub workflows
- Thinking (3): think-hard, think-harder, ultrathink
- Meta & UI (20): Workflows, checkpoints, browser automation, UI components

### How do I invoke a skill?

Skills are automatically selected based on your request. You can also:

1. **Explicitly reference**: "Use the `payment-orchestration` skill to..."
2. **Use commands**: `/integrate-visa` triggers the Visa integration skill
3. **Use thinking tiers**: "think hard about..." activates thinking skills

### Can I create custom skills?

Yes. Create a new directory under `master/skills/`:

```
master/skills/my-custom-skill/
└── SKILL.md
```

Format:
```markdown
---
name: my-custom-skill
description: What this skill does
activation: When to use this skill
---

# My Custom Skill

[Skill content...]
```

---

## Thinking System

### What are the thinking tiers?

| Tier | Command | Power Level |
|------|---------|-------------|
| 1 | `think hard` | Single agent + memory + docs |
| 2 | `think harder` | Parallel agents + debugging |
| 3 | `ultrathink` | Agent swarm + all superpowers |

### When should I use each tier?

- **think hard**: Understanding code, planning approach
- **think harder**: Debugging issues, multi-component analysis
- **ultrathink**: Architecture redesign, critical production issues

### How do I activate a thinking tier?

Simply include the phrase in your request:

```
User: think hard about how to implement retry logic
User: think harder about why payments are failing
User: ultrathink about redesigning the payment architecture
```

---

## Commands

### What commands are available?

Run `/help` to see all commands, or refer to `docs/GETTING-STARTED.md`.

Key commands:
- `/integrate-visa`, `/integrate-mpgs` - PSP integration
- `/payment-flow` - Design payment flows
- `/security-audit` - Run security checks
- `/checkpoint` - Save/restore state
- `/saveContext`, `/restoreContext` - Session management

### Can I chain commands?

Yes. Commands can trigger other commands or skills:

```
/payment-flow → triggers → security-audit (automatically)
```

---

## Troubleshooting

### Where is the troubleshooting guide?

See `docs/TROUBLESHOOTING.md` for common issues and solutions.

### How do I report bugs?

1. Check existing issues on GitHub
2. Include error messages and context
3. Describe expected vs actual behavior
4. Submit at: https://github.com/anthropics/claude-code/issues

---

## Development

### How do I contribute?

1. Fork the repository
2. Create a feature branch
3. Follow existing patterns for agents/skills
4. Run `npm run validate` before submitting
5. Create a pull request

### What's the code style?

- TypeScript with strict mode
- ESLint + Prettier formatting
- SKILL.md files use standard markdown
- Agent files use YAML frontmatter

### How do I test my changes?

```bash
# Validate configuration
npm run validate

# Run all tests
npm test

# Test specific skill
npm test -- --grep "payment-orchestration"
```

---

## Security

### Is cardholder data stored?

No. The plugin follows PCI DSS guidelines:
- No PAN storage in logs
- No CVV storage ever
- Tokenization preferred
- Encryption enforced

### How are secrets handled?

- Secrets stored in environment variables
- Never committed to git
- `.env` files in `.gitignore`
- Skills validate no secrets in code

### What security checks are automatic?

The `post-task-verification` hook checks:
- No sensitive data in logs
- Encryption properly configured
- PCI patterns followed
- OWASP Top 10 mitigations

---

## Updates

### How do I update the plugin?

```bash
# npm installation
npm update -g @youssefeljayad/claude-payment-orchestrator

# Git clone
cd /path/to/mcp-config-master
git pull origin main
cp -r master/ ~/.claude/
```

### Are updates backward compatible?

Major versions may have breaking changes. Check `CHANGELOG.md` before updating.

### How often is the plugin updated?

- Security patches: As needed
- Features: Monthly releases
- Documentation: Continuous

---

## Getting Help

- **Documentation**: `docs/` directory
- **Examples**: `docs/GETTING-STARTED.md`
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
