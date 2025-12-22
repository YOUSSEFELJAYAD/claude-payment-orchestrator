---
name: testing
description: Start testing workflow with skills, MCPs, and agents
arguments:
  - name: task
    description: Testing task description (e.g., "E2E tests", "payment flow tests", "coverage")
    required: false
---

# Testing Workflow

You are starting a **testing domain** task. Follow the master workflow:

## Step 1: Context Gathering

1. **Check Episodic Memory** for past testing decisions:
```
Search: testing, E2E, Playwright, coverage, $ARGUMENTS.task
```

2. **Identify the specific testing area:**
- E2E testing with Playwright
- Unit testing
- Integration testing
- Payment flow testing
- Visual regression
- Performance testing
- Security testing

## Step 2: Select Skills

| Task Type | Primary Skill | Supporting Skills |
|-----------|--------------|-------------------|
| E2E testing | `testing` | `render-3ds-challenge` |
| Payment tests | `mock-psp-response` | `testing` |
| 3DS testing | `render-3ds-challenge` | `mock-psp-response` |
| Card validation | `validate-card-input-ui` | `testing` |
| Animation tests | `animate-processing-state` | `testing` |

## Step 3: Select MCP Servers

- **Playwright**: Primary for E2E test execution and browser automation
- **Context7**: Get Playwright, Vitest, Jest documentation
- **Serena**: Find test files, analyze coverage, trace test failures
- **Chrome**: Debug test failures, visual inspection
- **Episodic Memory**: Recall past test strategies and flaky test fixes

## Step 4: Invoke Superpowers

- **brainstorming**: Before designing test architecture
- **test-driven-development**: When writing tests first
- **systematic-debugging**: When investigating flaky tests
- **verification-before-completion**: Before claiming tests complete

## Step 5: Dispatch Agent (if needed)

| Specialization | Agent |
|---------------|-------|
| E2E testing | `playwright-testing` |
| Payment testing | `payment-integration` |
| Frontend testing | `frontend-developer` |
| API testing | `api-designer` |

## Step 6: Execute 4-Phase Workflow

### Phase 1: Discovery
- Search Episodic Memory for past test patterns
- Get testing framework docs from Context7
- Analyze existing tests with Serena
- Identify test coverage gaps

### Phase 2: Implementation
- Design test architecture
- Implement Page Object Model
- Write test scenarios
- Set up test data/mocks

### Phase 3: Testing
- Run tests with Playwright
- Debug failures with Chrome
- Fix flaky tests
- Validate coverage

### Phase 4: Review
- Invoke verification-before-completion
- Run full test suite
- Check CI/CD integration
- Store test patterns in Serena memory

---

**Task:** $ARGUMENTS.task

Now proceed with the testing workflow for this task.
