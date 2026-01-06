# Skill: Think Harder

**Role:** Intensive Reasoning Engine (Tier 2)
**Domain:** Deep Analysis, Planning & Verification
**Objective:** Activate intensive enhanced reasoning by combining ALL Tier 1 capabilities with parallel agents, structured planning skills, systematic debugging, and browser-based verification.

## Activation

**Trigger:** User says "think harder" or task requires intensive analysis
**Mode:** Autonomous with comprehensive progress reporting

## What This Enables

Think Harder activates **Tier 2 Intensive Reasoning**:
- Everything from Tier 1 (think-hard)
- PLUS parallel agent dispatch (3+ agents)
- PLUS writing-plans skill for detailed planning
- PLUS systematic-debugging skill for investigation
- PLUS Playwright browser testing for verification
- PLUS verification-before-completion checks

## Execution Protocol

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        THINK HARDER PROTOCOL                                 │
│                        ════════════════════                                  │
│                          Tier 2 Reasoning                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ══════════════════════════════════════════════════════════════════════     │
│  TIER 1 FOUNDATION (Inherited from think-hard)                              │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                              │
│  PHASE 1: MEMORY + DOCS + CODE ANALYSIS                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • Episodic Memory: Search past decisions                             │    │
│  │ • Context7: Get latest documentation                                 │    │
│  │ • Serena: Analyze code structure                                     │    │
│  │ • TodoWrite: Create task breakdown                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  ══════════════════════════════════════════════════════════════════════     │
│  TIER 2 ENHANCEMENTS                                                         │
│  ══════════════════════════════════════════════════════════════════════     │
│                                                                              │
│  PHASE 2: PARALLEL AGENT DISPATCH                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Dispatch 3+ agents IN PARALLEL:                                      │    │
│  │                                                                      │    │
│  │ Agent 1: Explore (subagent_type: "Explore")                         │    │
│  │   → Thoroughness: "very thorough"                                   │    │
│  │   → Purpose: Deep codebase understanding                            │    │
│  │                                                                      │    │
│  │ Agent 2: Plan (subagent_type: "Plan")                               │    │
│  │   → Purpose: Design implementation strategy                         │    │
│  │   → Output: Step-by-step plan with trade-offs                       │    │
│  │                                                                      │    │
│  │ Agent 3: Code Explorer (subagent_type: "feature-dev:code-explorer") │    │
│  │   → Purpose: Trace execution paths and dependencies                 │    │
│  │   → Output: Architecture analysis                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  PHASE 3: SUPERPOWERS SKILLS ACTIVATION                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Invoke Superpowers skills as needed:                                 │    │
│  │                                                                      │    │
│  │ IF planning needed:                                                  │    │
│  │   → Skill: superpowers:writing-plans                                │    │
│  │   → Creates detailed implementation plan                            │    │
│  │                                                                      │    │
│  │ IF debugging/investigating:                                          │    │
│  │   → Skill: superpowers:systematic-debugging                         │    │
│  │   → Root cause analysis methodology                                 │    │
│  │                                                                      │    │
│  │ IF verification needed:                                              │    │
│  │   → Skill: superpowers:verification-before-completion               │    │
│  │   → Run actual commands, confirm output                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  PHASE 4: BROWSER VERIFICATION                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Tool: Playwright MCP                                                 │    │
│  │                                                                      │    │
│  │ Actions:                                                             │    │
│  │   • browser_navigate: Load application                              │    │
│  │   • browser_snapshot: Get accessibility tree                        │    │
│  │   • browser_fill_form: Test form inputs                             │    │
│  │   • browser_click: Test interactions                                │    │
│  │   • browser_console_messages: Check for errors                      │    │
│  │   • browser_network_requests: Verify API calls                      │    │
│  │   • browser_take_screenshot: Document state                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  PHASE 5: SYNTHESIS & CROSS-VALIDATION                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ • Collect all agent outputs                                          │    │
│  │ • Cross-validate findings                                            │    │
│  │ • Identify conflicts or gaps                                         │    │
│  │ • Synthesize comprehensive response                                  │    │
│  │ • Verify claims with actual commands                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│  DELIVER INTENSIVE ANALYSIS                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## MCP Tools Activated

### From Tier 1 (think-hard)
| Tool | Server | Purpose |
|------|--------|---------|
| `search` | Episodic Memory | Find past conversations |
| `resolve_library_id` | Context7 | Get library IDs |
| `get_library_docs` | Context7 | Retrieve documentation |
| `find_symbol` | Serena | Search code symbols |
| `get_symbols_overview` | Serena | Get file structure |
| `search_for_pattern` | Serena | Regex code search |

### Tier 2 Additions
| Tool | Server | Purpose |
|------|--------|---------|
| `browser_navigate` | Playwright | Load pages |
| `browser_snapshot` | Playwright | Get accessibility tree |
| `browser_fill_form` | Playwright | Test forms |
| `browser_click` | Playwright | Test interactions |
| `browser_console_messages` | Playwright | Check errors |
| `browser_network_requests` | Playwright | Verify API calls |
| `browser_take_screenshot` | Playwright | Document state |
| `browser_evaluate` | Playwright | Run JavaScript |
| `execute_shell_command` | Serena | Run verification commands |

## Agents Activated

| Agent | Type | Purpose |
|-------|------|---------|
| `Explore` | general-purpose | Deep codebase exploration |
| `Plan` | Plan | Implementation strategy design |
| `code-explorer` | feature-dev | Execution path tracing |

## Superpowers Skills Activated

| Skill | Purpose |
|-------|---------|
| `writing-plans` | Detailed implementation planning |
| `systematic-debugging` | Root cause analysis |
| `verification-before-completion` | Command-based verification |
| `test-driven-development` | Write tests first |

## Example Usage

```
User: think harder about why payments are failing intermittently

Claude (activating think-harder):

[TIER 1: Foundation]
1. Searching episodic memory for "payment failure intermittent"...
2. Getting Context7 docs for payment retry patterns...
3. Analyzing payment code with Serena...

[TIER 2: Intensive]
4. Dispatching parallel agents:
   - Explore agent: investigating payment flow...
   - Plan agent: designing debug strategy...
   - Code-explorer: tracing execution paths...

5. Activating systematic-debugging skill...
   - Hypothesis: Network timeout issues
   - Evidence gathering...

6. Browser verification with Playwright:
   - Testing checkout flow...
   - Capturing network requests...
   - Checking console errors...

[SYNTHESIS]
Found root cause: Race condition in payment confirmation...
Verified with actual test run...
```

## When to Use

- Debugging complex issues
- Planning major features
- Understanding intricate systems
- Investigating intermittent failures
- Designing architecture changes
- Multi-component analysis

## Comparison to Other Tiers

| Capability | think-hard | think-harder | ultrathink |
|------------|:----------:|:------------:|:----------:|
| Episodic Memory | ✅ | ✅ | ✅ |
| Context7 Docs | ✅ | ✅ | ✅ |
| Serena Analysis | ✅ | ✅ | ✅ |
| TodoWrite | ✅ | ✅ | ✅ |
| Single Explore Agent | ✅ | ✅ | ✅ |
| **Parallel Agents (3+)** | ❌ | ✅ | ✅ |
| **Writing-Plans Skill** | ❌ | ✅ | ✅ |
| **Systematic-Debugging** | ❌ | ✅ | ✅ |
| **Playwright Testing** | ❌ | ✅ | ✅ |
| **Verification Skill** | ❌ | ✅ | ✅ |
| Brainstorming | ❌ | ❌ | ✅ |
| Chrome Monitoring | ❌ | ❌ | ✅ |
| Full Code Review Suite | ❌ | ❌ | ✅ |
| Agent Swarm (6+) | ❌ | ❌ | ✅ |
| Web Search | ❌ | ❌ | ✅ |
| Memory Write-Back | ❌ | ❌ | ✅ |

**Need maximum power?** Say "ultrathink"
