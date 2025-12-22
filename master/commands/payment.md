---
name: payment
description: Start payment integration workflow with skills, MCPs, and agents
arguments:
  - name: task
    description: Payment task description (e.g., "integrate Stripe", "add refunds", "fix 3DS")
    required: false
---

# Payment Integration Workflow

You are starting a **payment domain** task. Follow the master workflow:

## Step 1: Context Gathering

1. **Check Episodic Memory** for past payment decisions:
```
Search: payment integration, PSP, gateway, $ARGUMENTS.task
```

2. **Identify the specific payment area:**
- Gateway integration (Visa CyberSource, Mastercard MPGS, Stripe, Adyen)
- 3D Secure / SCA authentication
- Tokenization / PCI compliance
- Refunds / Chargebacks
- Webhooks / Async notifications
- Payment orchestration / Routing

## Step 2: Select Skills

| Task Type | Primary Skill | Supporting Skills |
|-----------|--------------|-------------------|
| Gateway setup | `integrate-visa-cybersource` or `integrate-mpgs-gateway` | `psp-integration` |
| 3DS flows | `render-3ds-challenge`, `generate-3ds-payload` | `scaffold-payment-form` |
| Tokenization | `tokenize-card-data` | `verify-pci-scope` |
| Refunds | `process-refund-flow` | `handle-webhook-event` |
| Orchestration | `payment-orchestration` | `evaluate-routing-rules`, `saga-management` |
| Error handling | `diagnose-mpgs-failure` or `diagnose-cybersource-failure` | `normalize-payment-status` |

## Step 3: Select MCP Servers

- **Context7**: Get Stripe/Adyen/CyberSource/MPGS documentation
- **Serena**: Find payment code, trace PSP flows, refactor handlers
- **Playwright**: Test payment forms, 3DS challenges, webhook delivery
- **Chrome**: Monitor PSP dashboards, check transaction logs
- **Episodic Memory**: Recall past payment patterns and decisions

## Step 4: Invoke Superpowers

- **brainstorming**: Before designing payment architecture
- **test-driven-development**: Before implementing payment logic
- **systematic-debugging**: When investigating payment failures
- **verification-before-completion**: Before claiming payment feature complete

## Step 5: Dispatch Agent (if needed)

| Specialization | Agent |
|---------------|-------|
| Visa/CyberSource | `visa-cybersource-payments` |
| Mastercard/MPGS | `mastercard-mpgs-specialist` |
| General payment | `payment-integration` |
| Full-stack payment feature | `fullstack-developer` |

## Step 6: Execute 4-Phase Workflow

### Phase 1: Discovery
- Search Episodic Memory for past payment patterns
- Get PSP documentation from Context7
- Analyze existing payment code with Serena
- Review PCI compliance requirements

### Phase 2: Implementation
- Invoke TDD skill
- Use payment skills for implementation
- Follow PSP SDK patterns from Context7

### Phase 3: Testing
- E2E test with Playwright (card forms, 3DS, webhooks)
- Verify in PSP dashboard with Chrome
- Test error scenarios

### Phase 4: Review
- Invoke verification-before-completion
- Check PCI compliance
- Store patterns in Serena memory

---

**Task:** $ARGUMENTS.task

Now proceed with the payment workflow for this task.
