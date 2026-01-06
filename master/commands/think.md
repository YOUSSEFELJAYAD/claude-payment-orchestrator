---
name: think
description: Smart routing to thinking tiers based on complexity
arguments:
  - name: level
    description: "Thinking level: hard, harder, or ultra (default: auto-detect)"
    required: false
  - name: topic
    description: "What to think about"
    required: true
---

# /think - Intelligent Thinking Router

Routes to the appropriate thinking tier based on task complexity.

## Usage

```
/think [level] <topic>

Examples:
/think how to implement retry logic
/think hard about the payment flow
/think harder why payments are failing
/think ultra redesign the entire payment system
```

## Tier Selection

### Auto-Detection (default)
When no level specified, analyze the request:
- **Simple questions** → `think-hard` (Tier 1)
- **Debugging/investigation** → `think-harder` (Tier 2)
- **Architecture/redesign** → `ultrathink` (Tier 3)

### Manual Selection
| Command | Tier | Power Level |
|---------|------|-------------|
| `/think hard <topic>` | 1 | Foundation |
| `/think harder <topic>` | 2 | Intensive |
| `/think ultra <topic>` | 3 | Maximum |

## What Each Tier Activates

### Tier 1: think-hard
- Episodic Memory search
- Context7 documentation
- Serena code analysis
- TodoWrite planning
- Single Explore agent

### Tier 2: think-harder
- All of Tier 1
- 3+ parallel agents (Explore, Plan, code-explorer)
- Writing-plans skill
- Systematic-debugging skill
- Playwright browser testing
- Verification checks

### Tier 3: ultrathink
- All of Tier 1 + 2
- 6+ agent swarm
- ALL Superpowers skills
- Chrome live monitoring
- Full code review suite
- Web search
- Memory write-back
- Multi-phase verification

## Execution

When invoked:

1. **Parse the command** to extract level and topic
2. **If no level specified**, analyze topic complexity:
   - Contains "why", "debug", "failing", "error" → Tier 2
   - Contains "redesign", "architecture", "system", "critical" → Tier 3
   - Otherwise → Tier 1
3. **Invoke the appropriate skill**:
   - Tier 1: Invoke `think-hard` skill
   - Tier 2: Invoke `think-harder` skill
   - Tier 3: Invoke `ultrathink` skill
4. **Execute the full protocol** as defined in the skill
5. **Report results** with tier indicator

## Examples

```
User: /think how does the payment flow work?
→ Auto-selects Tier 1 (think-hard)
→ Searches memory, gets docs, analyzes code

User: /think harder why are 3DS challenges timing out?
→ Explicitly uses Tier 2 (think-harder)
→ Parallel agents + debugging + Playwright testing

User: /think ultra about migrating to a new PSP architecture
→ Explicitly uses Tier 3 (ultrathink)
→ Full agent swarm + all superpowers + comprehensive analysis
```

## Integration with Superpowers

This command integrates with:
- `superpowers:brainstorming` (Tier 3)
- `superpowers:systematic-debugging` (Tier 2+)
- `superpowers:writing-plans` (Tier 2+)
- `superpowers:verification-before-completion` (Tier 2+)

## MCP Tools Used

| Tier | MCP Servers |
|------|-------------|
| 1 | Episodic Memory, Context7, Serena |
| 2 | + Playwright |
| 3 | + Chrome, Web Search |
