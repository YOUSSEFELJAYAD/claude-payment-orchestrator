---
name: frontend
description: Start frontend development workflow with skills, MCPs, and agents
arguments:
  - name: task
    description: Frontend task description (e.g., "payment form", "dashboard", "animations")
    required: false
---

# Frontend Development Workflow

You are starting a **frontend domain** task. Follow the master workflow:

## Step 1: Context Gathering

1. **Check Episodic Memory** for past frontend decisions:
```
Search: frontend, React, Next.js, component, $ARGUMENTS.task
```

2. **Identify the specific frontend area:**
- React/Next.js components
- Payment forms and checkout UI
- Data tables and dashboards
- Animations and loading states
- Form validation
- Mobile responsiveness
- Accessibility

## Step 2: Select Skills

| Task Type | Primary Skill | Supporting Skills |
|-----------|--------------|-------------------|
| React/Next.js | `frontend-development` | `testing` |
| Payment forms | `scaffold-payment-form` | `validate-card-input-ui` |
| Card validation | `validate-card-input-ui` | `handle-mobile-keyboard` |
| Loading states | `animate-processing-state` | `display-toast-notification` |
| Data tables | `render-transaction-table` | `frontend-development` |
| Notifications | `display-toast-notification` | `frontend-development` |
| Routing indicators | `display-routing-indicator` | `animate-processing-state` |

## Step 3: Select MCP Servers

- **Context7**: Get React, Next.js, Tailwind, Shadcn documentation
- **Serena**: Find components, trace props/state, refactor UI code
- **Playwright**: E2E test UI flows, verify responsive design
- **Chrome**: Debug UI issues, test responsive layouts, verify animations
- **Episodic Memory**: Recall past component patterns and decisions

## Step 4: Invoke Superpowers

- **brainstorming**: Before designing component architecture
- **test-driven-development**: Before implementing components
- **systematic-debugging**: When investigating UI bugs
- **verification-before-completion**: Before claiming UI complete

## Step 5: Dispatch Agent (if needed)

| Specialization | Agent |
|---------------|-------|
| React development | `frontend-developer` |
| Next.js App Router | `nextjs-developer` |
| Shadcn UI | `shadcn-ui-architect` |
| E2E testing | `playwright-testing` |
| Full-stack features | `fullstack-developer` |

## Step 6: Execute 4-Phase Workflow

### Phase 1: Discovery
- Search Episodic Memory for past UI patterns
- Get framework documentation from Context7
- Analyze existing components with Serena
- Review design requirements

### Phase 2: Implementation
- Invoke TDD skill
- Use frontend skills for implementation
- Follow framework patterns from Context7

### Phase 3: Testing
- Component tests with Playwright
- Visual inspection with Chrome
- Responsive testing at multiple viewports
- Accessibility testing

### Phase 4: Review
- Invoke verification-before-completion
- Lighthouse performance check
- Store patterns in Serena memory

---

**Task:** $ARGUMENTS.task

Now proceed with the frontend workflow for this task.
