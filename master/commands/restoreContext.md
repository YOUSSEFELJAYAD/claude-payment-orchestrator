---
name: restoreContext
description: Restore session state from context file after restart
---

**[SYSTEM RESTART]: Fresh session initialized.**

Execute via `agent-organizer`:

1. **Read the context file** `.claude/tasks/context_session_latest.md` immediately.

2. **Restore state** based only on that file:
   - Project location
   - Current status
   - Completed work
   - Pending work
   - Architectural decisions
   - Active agents/skills

3. **Do NOT attempt to guess** previous conversation history; rely solely on the context file.

4. **Report status** to user:
   - Tell me exactly where we left off
   - Summarize what was completed
   - Summarize what remains
   - State the immediate next step

5. **Ask for approval** to proceed with the 'Next Step' defined in the file.

**Output Format:**

```
## Session State Restored

**Project:** [name]
**Status:** [status]

---

### Where We Left Off

[Summary of current state]

---

### Completed Work

| Task | Status |
|------|--------|
| ... | ✅ |

---

### Pending Work

| Task | Status |
|------|--------|
| ... | ⏳ |

---

### Immediate Next Step

[The next action from the context file]

---

**Awaiting your approval to proceed with: [next step]**
```

**Rules:**
- Do NOT make assumptions about work not documented in the context file
- Do NOT start executing until user approves
- If context file is missing or corrupted, inform user and ask for guidance
