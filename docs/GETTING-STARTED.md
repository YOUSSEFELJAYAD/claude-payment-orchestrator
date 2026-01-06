# Getting Started with Claude Payment Orchestrator

A simple guide to install, configure, and use all features of this plugin.

---

## Table of Contents

1. [Installation](#installation)
2. [First Steps](#first-steps)
3. [Using Commands](#using-commands)
4. [Using Skills](#using-skills)
5. [Using Agents](#using-agents)
6. [Using MCP Servers](#using-mcp-servers)
7. [Using Thinking Tiers](#using-thinking-tiers)
8. [Complete Command Reference](#complete-command-reference)

---

## Installation

### Option 1: npm (Recommended)

```bash
# Install globally
npm install -g @youssefeljayad/claude-payment-orchestrator

# Or add to your project
npm install @youssefeljayad/claude-payment-orchestrator
```

### Option 2: Clone & Copy

```bash
# Clone the repository
git clone https://github.com/YOUSSEFELJAYAD/mcp-config-master.git

# Copy to your project's .claude directory
cp -r mcp-config-master/master/ /path/to/your/project/.claude/

# Or copy to global Claude config
cp -r mcp-config-master/master/ ~/.claude/
```

### Option 3: Symlink (For Development)

```bash
# Create symlink to share config across projects
ln -s /path/to/mcp-config-master/master ~/.claude
```

### Verify Installation

```bash
# Start Claude Code
cd /path/to/your/project
claude

# Check if plugin is loaded
/workflow
```

---

## First Steps

### 1. Start Claude Code

```bash
cd your-project
claude
```

### 2. See Available Commands

```
/workflow
```

This shows the master workflow and available routing.

### 3. Try Your First Command

```
/payment list available integrations
```

---

## Using Commands

### Workflow Commands

```bash
# Show master workflow
/workflow

# Payment tasks
/payment integrate Stripe
/payment add refund support
/payment implement 3DS authentication

# Security tasks
/security audit PCI compliance
/security check for vulnerabilities
/security review authentication flow

# Frontend tasks
/frontend build checkout form
/frontend create payment confirmation page
/frontend add card validation

# API tasks
/api design REST endpoints
/api document OpenAPI spec
/api implement webhooks

# Testing tasks
/testing e2e checkout flow
/testing unit tests for PaymentService
/testing integration tests
```

### Thinking Commands

```bash
# Tier 1: Foundation reasoning
/think hard about how to implement retry logic

# Tier 2: Intensive reasoning
/think harder about why payments are failing

# Tier 3: Maximum power
/think ultrathink about redesigning the payment architecture
```

### Debug Command

```bash
# Systematic debugging
/debug 3DS authentication not completing
/debug payment timeout errors
/debug webhook not receiving events
```

### Session Commands

```bash
# Save current session state
/saveContext

# Restore session after restart
/restoreContext
```

### Scaffolding Commands

```bash
# Create new agent
/new-agent fraud-detector

# Create new skill
/new-skill detect-card-testing

# Create new command
/new-command fraud
```

---

## Using Skills

Skills are automatically invoked by the workflow. You can also request them directly:

### Payment Skills

```
# Payment orchestration
"Design a payment flow with Stripe and PayPal fallback"
→ Uses: payment-orchestration skill

# Checkout form
"Build a checkout form with card validation"
→ Uses: scaffold-payment-form skill

# Tokenization
"Implement card tokenization to reduce PCI scope"
→ Uses: tokenize-card-data skill

# Refunds
"Add refund support to the payment service"
→ Uses: process-refund-flow skill

# 3D Secure
"Implement 3DS authentication challenge"
→ Uses: render-3ds-challenge skill

# Visa CyberSource
"Integrate Visa CyberSource for payments"
→ Uses: integrate-visa-cybersource skill

# Mastercard MPGS
"Integrate Mastercard Payment Gateway"
→ Uses: integrate-mpgs-gateway skill

# Transaction fees
"Calculate transaction fees for different PSPs"
→ Uses: calculate-transaction-fees skill
```

### Security Skills

```
# PCI Compliance
"Audit the codebase for PCI DSS compliance"
→ Uses: security-compliance skill

# Scope verification
"Check what's in PCI scope"
→ Uses: verify-pci-scope skill

# Log auditing
"Review access logs for suspicious activity"
→ Uses: audit-access-logs skill

# WAF configuration
"Configure WAF rules for payment endpoints"
→ Uses: configure-waf-rules skill

# Fraud detection
"Detect velocity attacks on the checkout"
→ Uses: detect-velocity-attack skill
```

### Development Skills

```
# API development
"Design REST API for payment service"
→ Uses: api-development skill

# Frontend development
"Build React component for card input"
→ Uses: frontend-development skill

# Database operations
"Design schema for transactions table"
→ Uses: database-operations skill

# Testing
"Write E2E tests for checkout flow"
→ Uses: testing skill

# Distributed transactions
"Implement saga for order + payment"
→ Uses: saga-management skill
```

---

## Using Agents

Agents are specialized experts. The workflow automatically selects the right agent:

### Payment Agents

```
# Generic payment integration
"Help me integrate a new payment provider"
→ Agent: payment-integration

# Visa CyberSource specialist
"Configure CyberSource for recurring payments"
→ Agent: visa-cybersource-payments

# Mastercard MPGS specialist
"Set up MPGS hosted checkout"
→ Agent: mastercard-mpgs-specialist
```

### Development Agents

```
# Full-stack development
"Build a complete checkout feature"
→ Agent: fullstack-developer

# Frontend specialist
"Create React payment form with animations"
→ Agent: frontend-developer

# Next.js expert
"Implement server actions for payments"
→ Agent: nextjs-developer

# API design
"Design payment API with versioning"
→ Agent: api-designer
```

### Security Agents

```
# Security audit
"Review code for security vulnerabilities"
→ Agent: security-auditor

# Penetration testing
"Test payment endpoints for vulnerabilities"
→ Agent: penetration-tester
```

### Infrastructure Agents

```
# Task orchestration
"Plan a complex payment integration"
→ Agent: agent-organizer

# Database architecture
"Design database for high-volume transactions"
→ Agent: database-specialist

# DevOps
"Set up CI/CD for payment service"
→ Agent: devops-engineer
```

---

## Using MCP Servers

MCP servers provide powerful capabilities. Here's how to use each:

### Serena (Code Analysis)

```
# Find a symbol in codebase
"Find the PaymentService class"
→ MCP: Serena find_symbol

# Search for patterns
"Find all places where we handle card numbers"
→ MCP: Serena search_for_pattern

# Modify code
"Update the processPayment method"
→ MCP: Serena replace_symbol_body

# Save learnings
"Remember this integration pattern"
→ MCP: Serena write_memory
```

### Context7 (Documentation)

```
# Get library docs
"How do I use Stripe Payment Intents?"
→ MCP: Context7 query_docs (Stripe)

# Get framework docs
"Show me Next.js server actions examples"
→ MCP: Context7 query_docs (Next.js)

# Get SDK docs
"How to use CyberSource REST SDK?"
→ MCP: Context7 query_docs (CyberSource)
```

### Playwright (Browser Testing)

```
# Navigate to page
"Test the checkout page"
→ MCP: Playwright browser_navigate

# Fill forms
"Fill in the payment form with test data"
→ MCP: Playwright browser_fill_form

# Click elements
"Click the submit payment button"
→ MCP: Playwright browser_click

# Take screenshot
"Screenshot the confirmation page"
→ MCP: Playwright browser_take_screenshot
```

### Chrome (Persistent Browser)

```
# Live debugging
"Open the dashboard and monitor transactions"
→ MCP: Chrome use_browser (navigate)

# Extract content
"Get the transaction details from the page"
→ MCP: Chrome use_browser (extract)

# Interactive testing
"Log into the admin panel"
→ MCP: Chrome use_browser (type, click)
```

### Episodic Memory (Cross-Session)

```
# Search past work
"Have we integrated Stripe before?"
→ MCP: Episodic Memory search

# Read past conversation
"What did we decide about retry logic?"
→ MCP: Episodic Memory read
```

---

## Using Thinking Tiers

### Tier 1: think hard

**Best for:** Complex questions, understanding code, architecture decisions

```bash
/think hard about the payment flow architecture
/think hard about how retry logic should work
/think hard about database schema design
```

**What happens:**
1. Searches Episodic Memory for past related work
2. Gets documentation from Context7
3. Analyzes code with Serena
4. Deploys single Explore agent
5. Creates plan with TodoWrite

### Tier 2: think harder

**Best for:** Debugging, major features, multi-component analysis

```bash
/think harder about why 3DS is failing
/think harder about implementing multi-PSP routing
/think harder about the performance bottleneck
```

**What happens:**
1. Everything from Tier 1
2. Deploys 3+ parallel agents
3. Uses Writing-Plans skill
4. Uses Systematic-Debugging skill
5. Runs Playwright for E2E testing

### Tier 3: ultrathink

**Best for:** Architecture redesigns, critical issues, comprehensive analysis

```bash
/think ultrathink about redesigning the payment system
/think ultrathink about the security architecture
/think ultrathink about scaling to 10x traffic
```

**What happens:**
1. Everything from Tier 1 & 2
2. Deploys 6+ agent swarm
3. Uses ALL Superpowers skills
4. Chrome live monitoring
5. Web Search for latest info
6. Code Review Suite
7. Multi-phase verification
8. Writes findings to memory

---

## Example Workflows

### Example 1: Integrate Stripe

```bash
# Step 1: Think about the approach
/think hard about integrating Stripe for subscriptions

# Step 2: Start the integration
/payment integrate Stripe subscription billing

# Step 3: Build the UI
/frontend build subscription checkout form

# Step 4: Test it
/testing e2e subscription flow

# Step 5: Save context
/saveContext
```

### Example 2: Debug Payment Failure

```bash
# Step 1: Debug systematically
/debug payments failing with error code 401

# Or use think harder for deeper analysis
/think harder about why payments are being rejected

# Step 2: Check security
/security audit authentication flow

# Step 3: Test the fix
/testing payment success scenarios
```

### Example 3: Build Complete Feature

```bash
# Step 1: Plan with ultrathink
/think ultrathink about adding Apple Pay support

# Step 2: Review the plan and proceed
/payment integrate Apple Pay

# Step 3: Build UI
/frontend add Apple Pay button to checkout

# Step 4: Security check
/security verify Apple Pay implementation

# Step 5: Full testing
/testing e2e Apple Pay flow
```

---

## Complete Command Reference (14 Commands)

| Command | Description | Example |
|---------|-------------|---------|
| `/workflow` | Show master workflow and routing | `/workflow` |
| `/payment [task]` | Payment integration tasks | `/payment integrate Stripe` |
| `/security [task]` | Security & compliance tasks | `/security audit PCI` |
| `/frontend [task]` | Frontend development tasks | `/frontend build form` |
| `/api [task]` | API development tasks | `/api design endpoints` |
| `/testing [task]` | Testing tasks | `/testing e2e checkout` |
| `/think [level] [topic]` | Thinking tiers (hard/harder/ultrathink) | `/think hard about retry logic` |
| `/debug [issue]` | Systematic debugging | `/debug payment timeout` |
| `/saveContext` | Save session state | `/saveContext` |
| `/restoreContext` | Restore session state | `/restoreContext` |
| `/checkpoint [action]` | Manage checkpoints (save/list/restore/diff/delete) | `/checkpoint save pre-refactor` |
| `/new-agent [name]` | Create new agent | `/new-agent fraud-detector` |
| `/new-skill [name]` | Create new skill | `/new-skill detect-fraud` |
| `/new-command [name]` | Create new command | `/new-command fraud` |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    QUICK REFERENCE                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  THINKING TIERS                                              │
│  ─────────────                                               │
│  /think hard      → Complex questions, understanding         │
│  /think harder    → Debugging, major features                │
│  /think ultrathink→ Architecture, critical issues            │
│                                                              │
│  DOMAIN COMMANDS                                             │
│  ───────────────                                             │
│  /payment         → Payment integrations                     │
│  /security        → Security & compliance                    │
│  /frontend        → UI development                           │
│  /api             → API design                               │
│  /testing         → Test creation                            │
│                                                              │
│  SESSION                                                     │
│  ───────                                                     │
│  /saveContext     → Save before ending                       │
│  /restoreContext  → Restore after restart                    │
│                                                              │
│  SCAFFOLDING                                                 │
│  ───────────                                                 │
│  /new-agent       → Create agent template                    │
│  /new-skill       → Create skill template                    │
│  /new-command     → Create command template                  │
│                                                              │
│  MCP SERVERS                                                 │
│  ───────────                                                 │
│  Serena           → Code analysis & modification             │
│  Context7         → Library documentation                    │
│  Playwright       → Browser testing                          │
│  Chrome           → Live browser debugging                   │
│  Episodic Memory  → Cross-session context                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Plugin Not Loading

```bash
# Check if files exist
ls ~/.claude/settings.json
ls ~/.claude/agents/
ls ~/.claude/skills/

# Restart Claude Code
claude --clear-cache
```

### Commands Not Working

```bash
# Verify command files
ls ~/.claude/commands/

# Check for syntax errors
cat ~/.claude/commands/payment.md
```

### MCP Server Errors

```bash
# Verify MCP configuration
cat ~/.mcp.json

# Check server status
# (depends on your MCP setup)
```

### Session Not Persisting

```bash
# Check context file
cat .claude/tasks/context_session_latest.md

# Manually save
/saveContext
```

---

## Next Steps

1. **Explore Skills**: Browse `master/skills/` to see all available capabilities
2. **Customize Agents**: Modify agents in `master/agents/` for your needs
3. **Add Your Own**: Use `/new-agent`, `/new-skill`, `/new-command` to extend
4. **Read CLAUDE.md**: Full documentation of the orchestration system

---

**Happy Building!**
