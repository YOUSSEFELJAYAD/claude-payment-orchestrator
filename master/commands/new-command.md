---
name: new-command
description: Scaffold a new slash command from template
arguments:
  - name: name
    description: "Command name in kebab-case (e.g., 'my-command')"
    required: true
---

# /new-command - Command Scaffolding

Creates a new slash command file from the template.

## Usage

```
/new-command <name>

Examples:
/new-command my-command
/new-command deploy-staging
/new-command run-audit
```

## What It Creates

```
master/commands/<name>.md
```

With:
- YAML frontmatter (name, description, arguments)
- Usage examples
- Workflow steps
- MCP tools used
- Related commands

## Execution Steps

1. **Validate name** - Must be kebab-case, no conflicts
2. **Read template** - Load `templates/command.template.md`
3. **Replace placeholders** - Fill in name, defaults
4. **Create file** - Write to `master/commands/<name>.md`
5. **Report success** - Show created file path

## Template Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{COMMAND_NAME}}` | Kebab-case name | `my-command` |
| `{{COMMAND_TITLE}}` | Title case name | `My Command` |
| `{{ARG_1_NAME}}` | First argument | `target` |
| `{{ARG_1_DESCRIPTION}}` | Argument description | `Target to process` |

## Post-Creation

After creating the command:

1. Edit the generated file to:
   - Define arguments
   - Add workflow steps
   - Configure MCP tools
   - Link related skills/agents

2. Test the command:
   ```
   /my-command test-arg
   ```

## Example Output

```
Creating command: deploy-staging
Location: master/commands/

✓ Created: master/commands/deploy-staging.md

Next steps:
1. Edit master/commands/deploy-staging.md
2. Define arguments and workflow
3. Test with: /deploy-staging
```

## Related Commands

- `/new-agent` - Create a new agent
- `/new-skill` - Create a new skill
