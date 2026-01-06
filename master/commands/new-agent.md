---
name: new-agent
description: Scaffold a new agent from template with proper structure
arguments:
  - name: name
    description: "Agent name in kebab-case (e.g., 'my-custom-agent')"
    required: true
  - name: domain
    description: "Domain: payment, security, frontend, api, testing, devops, or custom"
    required: false
---

# /new-agent - Agent Scaffolding Command

Creates a new agent file from the template with proper structure and MCP integration.

## Usage

```
/new-agent <name> [domain]

Examples:
/new-agent my-custom-agent
/new-agent stripe-specialist payment
/new-agent react-optimizer frontend
/new-agent audit-logger security
```

## What It Creates

```
master/agents/<name>.md
```

With:
- YAML frontmatter (name, description, tools, model)
- Role/Domain/Objective section
- Available Skills table
- MCP Integration table
- Superpowers Workflow table
- 4-Phase Execution Flow
- Communication Protocol

## Execution Steps

1. **Validate name** - Must be kebab-case, no conflicts
2. **Read template** - Load `templates/agent.template.md`
3. **Replace placeholders** - Fill in name, domain, defaults
4. **Create file** - Write to `master/agents/<name>.md`
5. **Update registry** - Add to appropriate module.json
6. **Report success** - Show created file path

## Template Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{AGENT_NAME}}` | Kebab-case name | `my-custom-agent` |
| `{{AGENT_TITLE}}` | Title case name | `My Custom Agent` |
| `{{DOMAIN}}` | Domain area | `payment` |
| `{{ROLE}}` | Agent role | `Specialist` |
| `{{OBJECTIVE}}` | Main objective | `Handle X tasks` |

## Domain Defaults

| Domain | Module | Default Skills |
|--------|--------|----------------|
| `payment` | payment | payment-orchestration, psp-integration |
| `security` | security | security-compliance, audit-access-logs |
| `frontend` | frontend | frontend-development |
| `api` | core | api-development |
| `testing` | core | testing |
| `devops` | core | deploy-canary-release |
| `custom` | core | claude-code-workflow |

## Post-Creation

After creating the agent:

1. Edit the generated file to customize:
   - Add specific use cases
   - Define related skills
   - Configure MCP tools
   - Set safety rules

2. Test the agent:
   ```
   /think hard about testing the new agent
   ```

3. Add to CLAUDE.md agents table if needed

## Example Output

```
Creating agent: my-custom-agent
Domain: payment
Module: payment

✓ Created: master/agents/my-custom-agent.md
✓ Updated: master/modules/payment/module.json

Next steps:
1. Edit master/agents/my-custom-agent.md to customize
2. Add specific skills and MCP integrations
3. Test with: /think hard about my-custom-agent
```

## Related Commands

- `/new-skill` - Create a new skill
- `/new-command` - Create a new command
