---
name: api
description: Start API development workflow with skills, MCPs, and agents
arguments:
  - name: task
    description: API task description (e.g., "design endpoints", "webhooks", "documentation")
    required: false
---

# API Development Workflow

You are starting an **API domain** task. Follow the master workflow:

## Step 1: Context Gathering

1. **Check Episodic Memory** for past API decisions:
```
Search: API, REST, GraphQL, endpoint, webhook, $ARGUMENTS.task
```

2. **Identify the specific API area:**
- REST API design
- GraphQL schema
- Webhook implementation
- API documentation
- Authentication/authorization
- Rate limiting
- Error handling

## Step 2: Select Skills

| Task Type | Primary Skill | Supporting Skills |
|-----------|--------------|-------------------|
| API design | `api-development` | `database-operations` |
| Webhooks | `handle-webhook-event` | `api-development` |
| Status mapping | `normalize-payment-status` | `api-development` |
| Database | `database-operations` | `api-development` |
| Transactions | `saga-management` | `evaluate-routing-rules` |
| Testing | `testing` | `api-development` |

## Step 3: Select MCP Servers

- **Context7**: Get OpenAPI, REST, GraphQL, framework documentation
- **Serena**: Find endpoints, trace handlers, refactor API code
- **Playwright**: Test API endpoints, verify responses
- **Chrome**: Debug API calls, inspect network requests
- **Episodic Memory**: Recall past API patterns and decisions

## Step 4: Invoke Superpowers

- **brainstorming**: Before designing API architecture
- **test-driven-development**: Before implementing endpoints
- **systematic-debugging**: When investigating API issues
- **verification-before-completion**: Before claiming API complete

## Step 5: Dispatch Agent (if needed)

| Specialization | Agent |
|---------------|-------|
| API design | `api-designer` |
| API documentation | `api-documenter` |
| Full-stack features | `fullstack-developer` |
| Complex workflows | `sequential-reasoner` |

## Step 6: Execute 4-Phase Workflow

### Phase 1: Discovery
- Search Episodic Memory for past API patterns
- Get framework documentation from Context7
- Analyze existing endpoints with Serena
- Review API requirements

### Phase 2: Implementation
- Invoke TDD skill
- Use API skills for implementation
- Create OpenAPI specification
- Implement validation (Zod)

### Phase 3: Testing
- API tests with Playwright
- Test error scenarios
- Verify webhook delivery
- Load testing if needed

### Phase 4: Review
- Invoke verification-before-completion
- Validate OpenAPI spec
- Generate documentation
- Store patterns in Serena memory

---

**Task:** $ARGUMENTS.task

Now proceed with the API workflow for this task.
