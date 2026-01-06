# Skill: {{SKILL_TITLE}}

**Role:** {{ROLE}}
**Domain:** {{DOMAIN}}
**Objective:** {{OBJECTIVE}}

## Activation

**Trigger:** {{TRIGGER_CONDITIONS}}
**Mode:** {{MODE}} (Autonomous / Interactive / Guided)

## What This Enables

{{SKILL_DESCRIPTION}}

## Execution Protocol

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         {{SKILL_TITLE}} PROTOCOL                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  STEP 1: {{STEP_1_NAME}}                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ {{STEP_1_DESCRIPTION}}                                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  STEP 2: {{STEP_2_NAME}}                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ {{STEP_2_DESCRIPTION}}                                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  STEP 3: {{STEP_3_NAME}}                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ {{STEP_3_DESCRIPTION}}                                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  DELIVER RESULTS                                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## MCP Tools Used

| Tool | Server | Purpose |
|------|--------|---------|
| `{{TOOL_1}}` | {{SERVER_1}} | {{TOOL_1_PURPOSE}} |
| `{{TOOL_2}}` | {{SERVER_2}} | {{TOOL_2_PURPOSE}} |
| `{{TOOL_3}}` | {{SERVER_3}} | {{TOOL_3_PURPOSE}} |

## Related Agents

| Agent | When to Dispatch |
|-------|------------------|
| `{{AGENT_1}}` | {{AGENT_1_CONDITION}} |
| `{{AGENT_2}}` | {{AGENT_2_CONDITION}} |

## Example Usage

```
User: {{EXAMPLE_TRIGGER}}

Claude (activating {{SKILL_NAME}}):
1. {{EXAMPLE_STEP_1}}
2. {{EXAMPLE_STEP_2}}
3. {{EXAMPLE_STEP_3}}

[Result delivered]
```

## Best Practices

- {{BEST_PRACTICE_1}}
- {{BEST_PRACTICE_2}}
- {{BEST_PRACTICE_3}}

## Integration with Superpowers

This skill integrates with:
- `superpowers:{{SUPERPOWER_1}}` - {{SUPERPOWER_1_PURPOSE}}
- `superpowers:{{SUPERPOWER_2}}` - {{SUPERPOWER_2_PURPOSE}}
