# Skill: Think Hard

**Role:** Enhanced Reasoning Engine (Tier 1)
**Domain:** Deep Analysis & Problem Solving
**Objective:** Activate foundational enhanced reasoning by leveraging MCP tools, episodic memory, and structured exploration before responding to complex requests.

## Activation

**Trigger:** User says "think hard" or task requires careful analysis
**Mode:** Autonomous with progress reporting

## What This Enables

Think Hard activates **Tier 1 Enhanced Reasoning**:
- Searches past conversations for relevant context
- Retrieves up-to-date library documentation
- Analyzes code structure semantically
- Plans approach with TodoWrite
- Dispatches exploration agent for codebase understanding

## Execution Protocol

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         THINK HARD PROTOCOL                                  │
│                         ═══════════════════                                  │
│                           Tier 1 Reasoning                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1: MEMORY RETRIEVAL                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Tool: mcp_episodic_memory.search                                     │    │
│  │ Purpose: Find past decisions, solutions, patterns                    │    │
│  │ Query: Extract key concepts from user request                        │    │
│  │ Mode: "both" (vector + text search)                                  │    │
│  │ Limit: 10 results                                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  PHASE 2: DOCUMENTATION LOOKUP                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Tool: mcp_context7.resolve_library_id + get_library_docs             │    │
│  │ Purpose: Get latest API patterns and best practices                  │    │
│  │ Mode: "code" for implementation, "info" for concepts                 │    │
│  │ Topics: Extract relevant libraries from request                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  PHASE 3: CODE ANALYSIS                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Tool: mcp_serena.find_symbol / get_symbols_overview                  │    │
│  │ Purpose: Understand existing code structure                          │    │
│  │ Actions:                                                             │    │
│  │   • Get overview of relevant files                                   │    │
│  │   • Find symbols related to the task                                 │    │
│  │   • Trace references if needed                                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  PHASE 4: STRUCTURED PLANNING                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Tool: TodoWrite                                                      │    │
│  │ Purpose: Break down task into trackable steps                        │    │
│  │ Actions:                                                             │    │
│  │   • Identify all subtasks                                            │    │
│  │   • Order by dependencies                                            │    │
│  │   • Set status tracking                                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  PHASE 5: EXPLORATION (if needed)                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Tool: Task (subagent_type: "Explore")                                │    │
│  │ Purpose: Deep codebase exploration                                   │    │
│  │ Thoroughness: "medium"                                               │    │
│  │ Focus: Answer specific questions about architecture                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  SYNTHESIZE & RESPOND                                                        │
│  • Combine all gathered context                                              │
│  • Form comprehensive understanding                                          │
│  • Provide well-reasoned response                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## MCP Tools Activated

| Tool | Server | Purpose |
|------|--------|---------|
| `search` | Episodic Memory | Find past relevant conversations |
| `read` | Episodic Memory | Read full conversation context |
| `resolve_library_id` | Context7 | Get library identifiers |
| `get_library_docs` | Context7 | Retrieve documentation |
| `find_symbol` | Serena | Search code symbols |
| `get_symbols_overview` | Serena | Get file structure |
| `find_referencing_symbols` | Serena | Trace dependencies |
| `search_for_pattern` | Serena | Regex code search |
| `read_file` | Serena | Read specific files |
| `list_dir` | Serena | Explore directories |
| `read_memory` | Serena | Read project memories |

## Agents Activated

| Agent | Purpose |
|-------|---------|
| `Explore` | Codebase exploration and understanding |

## Example Usage

```
User: think hard about how to add retry logic to the payment processor

Claude (activating think-hard):
1. Searching episodic memory for "retry logic payment"...
2. Getting Context7 docs for retry patterns...
3. Analyzing PaymentProcessor with Serena...
4. Creating todo list for implementation...
5. Dispatching Explore agent for architecture understanding...

[Synthesized response with full context]
```

## When to Use

- Complex implementation questions
- Architecture decisions
- Debugging unclear issues
- Understanding unfamiliar code
- Planning multi-step tasks

## Comparison to Higher Tiers

| Capability | think-hard | think-harder | ultrathink |
|------------|:----------:|:------------:|:----------:|
| Episodic Memory | ✅ | ✅ | ✅ |
| Context7 Docs | ✅ | ✅ | ✅ |
| Serena Analysis | ✅ | ✅ | ✅ |
| TodoWrite | ✅ | ✅ | ✅ |
| Single Explore Agent | ✅ | ✅ | ✅ |
| Parallel Agents | ❌ | ✅ | ✅ |
| Playwright Testing | ❌ | ✅ | ✅ |
| Full Superpowers | ❌ | ❌ | ✅ |

**Need more power?** Say "think harder" or "ultrathink"
