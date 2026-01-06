---
name: debug
description: Systematic debugging workflow with MCP-powered investigation
arguments:
  - name: issue
    description: "Description of the issue or error to debug"
    required: true
  - name: scope
    description: "Scope: file path, component name, or 'full' for system-wide"
    required: false
---

# /debug - Systematic Debugging Command

Invokes systematic debugging methodology with full MCP tool integration.

## Usage

```
/debug <issue> [scope]

Examples:
/debug "payments failing with timeout error"
/debug "3DS challenge not rendering" src/components/payment
/debug "memory leak in checkout flow" full
```

## Debugging Protocol

### Phase 1: Gather Evidence

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ EVIDENCE COLLECTION                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ 1. EPISODIC MEMORY                                                           │
│    → Search for similar past issues                                          │
│    → Query: issue keywords + "error" + "fix"                                │
│                                                                              │
│ 2. CODE ANALYSIS (Serena)                                                    │
│    → search_for_pattern: error messages, stack traces                       │
│    → find_symbol: related functions/classes                                 │
│    → find_referencing_symbols: trace call paths                             │
│                                                                              │
│ 3. DOCUMENTATION (Context7)                                                  │
│    → Get docs for relevant libraries                                        │
│    → Search for known issues/solutions                                      │
│                                                                              │
│ 4. BROWSER STATE (Playwright)                                                │
│    → browser_console_messages: JavaScript errors                            │
│    → browser_network_requests: Failed API calls                             │
│    → browser_snapshot: Current DOM state                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 2: Form Hypotheses

Based on evidence, generate ranked hypotheses:

| Priority | Hypothesis | Evidence | Test |
|----------|------------|----------|------|
| H1 | Most likely cause | Supporting evidence | How to verify |
| H2 | Second possibility | Supporting evidence | How to verify |
| H3 | Edge case | Weak evidence | How to verify |

### Phase 3: Test Hypotheses

For each hypothesis (highest priority first):

1. **Design test** - Minimal reproduction
2. **Execute test** - Use Playwright/Chrome
3. **Observe result** - Compare expected vs actual
4. **Update hypothesis** - Confirm or reject

### Phase 4: Implement Fix

Once root cause confirmed:

1. **Design fix** - Minimal change
2. **Write tests first** - TDD approach
3. **Implement fix** - Use Serena
4. **Verify fix** - Run tests + manual check
5. **Check for regressions** - Run full test suite

### Phase 5: Document

- Store learnings in Serena memory
- Update documentation if needed
- Create regression test

## MCP Tools Used

| Phase | Tools |
|-------|-------|
| Evidence | `episodic_memory.search`, `serena.search_for_pattern`, `serena.find_symbol` |
| Test | `playwright.browser_navigate`, `playwright.browser_console_messages` |
| Fix | `serena.replace_symbol_body`, `serena.replace_content` |
| Verify | `serena.execute_shell_command`, `playwright.*` |

## Output Format

```markdown
## Debug Report: [Issue]

### Evidence Collected
- **Past Issues:** [similar issues found]
- **Code Analysis:** [relevant code paths]
- **Console Errors:** [JavaScript errors]
- **Network Failures:** [failed requests]

### Hypotheses
1. **[H1]** - [description] - Confidence: HIGH
2. **[H2]** - [description] - Confidence: MEDIUM

### Root Cause
[Confirmed root cause with evidence]

### Fix Applied
- File: [path]
- Change: [description]
- Tests: [test file]

### Verification
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual verification complete
- [ ] No regressions detected
```

## Integration with Superpowers

This command automatically invokes:
- `superpowers:systematic-debugging` - Core methodology
- `superpowers:verification-before-completion` - Before claiming fixed

## Escalation

If debugging doesn't resolve issue:
- `/think harder <issue>` - Activate Tier 2 reasoning
- `/think ultra <issue>` - Activate Tier 3 with full agent swarm

## Examples

### Example 1: API Error
```
User: /debug "POST /api/payments returns 500"

Debug:
1. Searching episodic memory for "payments 500 error"...
2. Analyzing payment API code with Serena...
3. Found: Null pointer in PaymentService.process()
4. Root cause: Missing null check for optional field
5. Fix applied and verified
```

### Example 2: UI Issue
```
User: /debug "checkout button not responding" src/components/Checkout

Debug:
1. Getting Playwright snapshot of checkout page...
2. Console errors: "Cannot read property 'submit' of undefined"
3. Tracing: useCheckout hook not initialized
4. Root cause: Missing provider wrapper
5. Fix applied and verified
```
