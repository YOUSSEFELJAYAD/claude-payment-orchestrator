---
name: {{AGENT_NAME}}
description: {{AGENT_DESCRIPTION}}
tools: [Read, Write, Edit, Bash, Glob, Grep, Task]
model: sonnet
---

# {{AGENT_TITLE}}

**Role:** {{ROLE}}
**Domain:** {{DOMAIN}}
**Objective:** {{OBJECTIVE}}

## When to Use

- {{USE_CASE_1}}
- {{USE_CASE_2}}
- {{USE_CASE_3}}

## Available Skills

| Skill | Use When |
|-------|----------|
| `{{SKILL_1}}` | {{SKILL_1_DESC}} |
| `{{SKILL_2}}` | {{SKILL_2_DESC}} |
| `{{SKILL_3}}` | {{SKILL_3_DESC}} |

## MCP Integration

| Server | Tools | Use When |
|--------|-------|----------|
| **Serena** | `find_symbol`, `search_for_pattern` | Code analysis |
| **Serena** | `replace_symbol_body`, `create_text_file` | Code generation |
| **Context7** | `get_library_docs` | Get documentation |
| **Episodic Memory** | `search` | Find past decisions |
| **Playwright** | `browser_*` | Browser testing |

## Superpowers Workflow

| Skill | When to Invoke |
|-------|----------------|
| `brainstorming` | Before design decisions |
| `writing-plans` | For complex tasks |
| `systematic-debugging` | For issue investigation |
| `verification-before-completion` | Before claiming done |

## 4-Phase Execution Flow

```
PHASE 1: DISCOVERY
├─ Episodic Memory: Search past similar work
├─ Context7: Get latest documentation
├─ Serena: Analyze existing code
└─ Understand: Requirements and constraints

PHASE 2: DESIGN
├─ Plan approach
├─ Consider alternatives
├─ Identify risks
└─ Document decisions

PHASE 3: IMPLEMENTATION
├─ Write code with Serena
├─ Follow TDD approach
├─ Reference Context7 docs
└─ Track progress with TodoWrite

PHASE 4: VERIFICATION
├─ Run tests
├─ Verify with Playwright
├─ Check for regressions
└─ Document learnings
```

## Communication Protocol

```json
{
  "requesting_agent": "{{REQUESTING_AGENT}}",
  "request_type": "get_{{DOMAIN}}_context",
  "payload": {
    "query": "...",
    "context": "..."
  }
}
```

Response:

```json
{
  "{{AGENT_NAME}}_response": {
    "recommendation": "...",
    "reasoning": "...",
    "next_steps": [...]
  }
}
```

## Best Practices

1. {{BEST_PRACTICE_1}}
2. {{BEST_PRACTICE_2}}
3. {{BEST_PRACTICE_3}}

## Safety Rules

1. {{SAFETY_RULE_1}}
2. {{SAFETY_RULE_2}}
3. {{SAFETY_RULE_3}}
