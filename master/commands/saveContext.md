---
name: saveContext
description: Save current session state to context file for persistence across restarts
---

Execute via `memory-context-manager` agent:

Review the entire current session state, including all architectural decisions made and code changes pending.

Update/Overwrite the file `.claude/tasks/context_session_latest.md`.

**ENSURE this file contains:**

1. **Session Header**
   - Project path
   - Last updated timestamp
   - Current status (In Progress / Completed / Blocked)

2. **Current State**
   - Exact last known state of the project
   - What has been completed
   - What is pending

3. **Immediate Next Step**
   - The exact next action to take
   - Any blockers or dependencies

4. **Architectural Decisions**
   - Key decisions made during session
   - Trade-offs considered
   - Risks identified

5. **Agent Instructions**
   - Any specific agent instructions that must persist
   - MCP tools in use
   - Skills being followed

6. **Files Modified**
   - List of all files created/modified
   - Status of each (complete/partial)

7. **Resume Command**
   - Clear instructions for next session
   - What to read first
   - What to execute

**Format Template:**

```markdown
# Session State: [Project Name]

**Last Updated:** [YYYY-MM-DD HH:MM]
**Project:** [/path/to/project]
**Status:** [In Progress | Completed | Blocked]

---

## CURRENT STATE

[Describe exactly where we are]

---

## COMPLETED WORK

[List what's done]

---

## PENDING WORK

[List what remains]

---

## IMMEDIATE NEXT STEP

[Exact next action to take]

---

## ARCHITECTURAL DECISIONS

[Key decisions and rationale]

---

## FILES MODIFIED

```
path/to/file1.ts  ✅ COMPLETE
path/to/file2.ts  🔄 PARTIAL
path/to/file3.ts  ⏳ PENDING
```

---

## RESUME COMMAND

[Instructions for next session]
```

**Confirm when the file is saved so I can restart.**
