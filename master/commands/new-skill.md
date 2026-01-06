---
name: new-skill
description: Scaffold a new skill from template with proper structure
arguments:
  - name: name
    description: "Skill name in kebab-case (e.g., 'my-custom-skill')"
    required: true
  - name: domain
    description: "Domain: payment, security, frontend, api, testing, devops, or custom"
    required: false
---

# /new-skill - Skill Scaffolding Command

Creates a new skill directory with SKILL.md, examples.md, and reference.md from templates.

## Usage

```
/new-skill <name> [domain]

Examples:
/new-skill my-custom-skill
/new-skill handle-subscription payment
/new-skill validate-input frontend
/new-skill scan-vulnerabilities security
```

## What It Creates

```
master/skills/<name>/
├── SKILL.md           # Main skill definition
├── examples.md        # Usage examples
├── reference.md       # API reference
└── scripts/
    └── helper.py      # Optional helper script
```

## Execution Steps

1. **Validate name** - Must be kebab-case, no conflicts
2. **Create directory** - `master/skills/<name>/`
3. **Read templates** - Load from `templates/skill/`
4. **Replace placeholders** - Fill in name, domain, defaults
5. **Create files** - Write SKILL.md, examples.md, reference.md
6. **Update registry** - Add to appropriate module.json
7. **Report success** - Show created files

## Template Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{SKILL_NAME}}` | Kebab-case name | `my-custom-skill` |
| `{{SKILL_TITLE}}` | Title case name | `My Custom Skill` |
| `{{DOMAIN}}` | Domain area | `payment` |
| `{{ROLE}}` | Skill role | `Handler` |
| `{{OBJECTIVE}}` | Main objective | `Process X` |

## Domain Defaults

| Domain | Module | Default MCP Tools |
|--------|--------|-------------------|
| `payment` | payment | Serena, Context7 |
| `security` | security | Serena |
| `frontend` | frontend | Playwright, Context7 |
| `api` | core | Serena, Context7 |
| `testing` | core | Playwright |
| `devops` | core | Serena |
| `custom` | core | Serena |

## Post-Creation

After creating the skill:

1. Edit SKILL.md:
   - Define execution protocol
   - List MCP tools used
   - Add related agents

2. Add examples to examples.md:
   - Common use cases
   - Code patterns
   - Anti-patterns

3. Complete reference.md:
   - Parameters
   - Return values
   - Error handling

4. Test the skill:
   ```
   /think hard about testing the new skill
   ```

## Example Output

```
Creating skill: handle-subscription
Domain: payment
Module: payment

✓ Created: master/skills/handle-subscription/SKILL.md
✓ Created: master/skills/handle-subscription/examples.md
✓ Created: master/skills/handle-subscription/reference.md
✓ Created: master/skills/handle-subscription/scripts/
✓ Updated: master/modules/payment/module.json

Next steps:
1. Edit SKILL.md to define execution protocol
2. Add examples to examples.md
3. Complete reference.md documentation
4. Test with: /think hard about handle-subscription
```

## Related Commands

- `/new-agent` - Create a new agent
- `/new-command` - Create a new command
