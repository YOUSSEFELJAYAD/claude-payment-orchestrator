---
name: {{COMMAND_NAME}}
description: {{COMMAND_DESCRIPTION}}
arguments:
  - name: {{ARG_1_NAME}}
    description: "{{ARG_1_DESCRIPTION}}"
    required: {{ARG_1_REQUIRED}}
  - name: {{ARG_2_NAME}}
    description: "{{ARG_2_DESCRIPTION}}"
    required: {{ARG_2_REQUIRED}}
---

# /{{COMMAND_NAME}} - {{COMMAND_TITLE}}

{{COMMAND_OVERVIEW}}

## Usage

```
/{{COMMAND_NAME}} <{{ARG_1_NAME}}> [{{ARG_2_NAME}}]

Examples:
/{{COMMAND_NAME}} {{EXAMPLE_1}}
/{{COMMAND_NAME}} {{EXAMPLE_2}}
/{{COMMAND_NAME}} {{EXAMPLE_3}}
```

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `{{ARG_1_NAME}}` | {{ARG_1_REQUIRED}} | {{ARG_1_DESCRIPTION}} |
| `{{ARG_2_NAME}}` | {{ARG_2_REQUIRED}} | {{ARG_2_DESCRIPTION}} |

## Workflow

### Step 1: {{STEP_1_NAME}}
{{STEP_1_DESCRIPTION}}

### Step 2: {{STEP_2_NAME}}
{{STEP_2_DESCRIPTION}}

### Step 3: {{STEP_3_NAME}}
{{STEP_3_DESCRIPTION}}

## MCP Tools Used

| Tool | Server | Purpose |
|------|--------|---------|
| `{{TOOL_1}}` | {{SERVER_1}} | {{TOOL_1_PURPOSE}} |
| `{{TOOL_2}}` | {{SERVER_2}} | {{TOOL_2_PURPOSE}} |

## Skills Invoked

- `{{SKILL_1}}` - {{SKILL_1_PURPOSE}}
- `{{SKILL_2}}` - {{SKILL_2_PURPOSE}}

## Output Format

```markdown
## {{COMMAND_NAME}} Results

### Summary
{{OUTPUT_SUMMARY}}

### Details
{{OUTPUT_DETAILS}}

### Next Steps
{{OUTPUT_NEXT_STEPS}}
```

## Examples

### Example 1: {{EXAMPLE_1_TITLE}}
```
User: /{{COMMAND_NAME}} {{EXAMPLE_1_INPUT}}

Claude:
{{EXAMPLE_1_OUTPUT}}
```

### Example 2: {{EXAMPLE_2_TITLE}}
```
User: /{{COMMAND_NAME}} {{EXAMPLE_2_INPUT}}

Claude:
{{EXAMPLE_2_OUTPUT}}
```

## Related Commands

- `/{{RELATED_CMD_1}}` - {{RELATED_CMD_1_DESC}}
- `/{{RELATED_CMD_2}}` - {{RELATED_CMD_2_DESC}}

## See Also

- [{{SKILL_1}}](../skills/{{SKILL_1}}/SKILL.md)
- [{{AGENT_1}}](../agents/{{AGENT_1}}.md)
