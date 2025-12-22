# Workflow Enforcement Hooks

This document describes the hooks that enforce the master workflow system and session persistence.

## Hook 1: SessionStart - Auto Restore + Workflow Reminder

**Purpose:**
1. Auto-restore session state from context file
2. Remind Claude Code about the master workflow

### Behavior

On session start:
1. CHECK if `.claude/tasks/context_session_latest.md` exists
2. If YES: Read and restore session state, report to user
3. If NO: Inform user no previous context found
4. Apply master workflow rules

### Configuration

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "SESSION START - AUTO RESTORE:\n\n1. CHECK if .claude/tasks/context_session_latest.md exists\n2. If YES: Read it and restore session state, report status to user\n3. If NO: Inform user no previous context found\n\nThen apply MASTER WORKFLOW..."
          }
        ]
      }
    ]
  }
}
```

## Hook 2: PreCompact - Auto Save (Seamless)

**Purpose:** Automatically save session state before compact - NO user interaction.

### Behavior

```
Memory Low → PreCompact fires → Auto-save → Compact proceeds → PostCompact → Auto-restore → Continue
```

1. Save state immediately (no asking)
2. Let compact proceed
3. After compact, auto-restore from saved file
4. Continue working seamlessly

### Configuration

```json
{
  "hooks": {
    "PreCompact": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "AUTO-SAVE BEFORE COMPACT:\n\n1. IMMEDIATELY save session state to .claude/tasks/context_session_latest.md\n2. Include: current state, completed work, pending work, next step, decisions, files modified\n3. DO NOT ask user - just save and proceed\n4. After compact completes, you MUST read .claude/tasks/context_session_latest.md to restore full context\n\nProceed with compact after saving."
          }
        ]
      }
    ],
    "PostCompact": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "POST-COMPACT AUTO-RESTORE:\n\nCompact completed. IMMEDIATELY:\n1. Read .claude/tasks/context_session_latest.md\n2. Restore full session context from saved state\n3. Report to user: 'Context restored after compact. Continuing from: [next step]'\n4. Continue working on the task seamlessly\n\nDo NOT ask permission - just restore and continue."
          }
        ]
      }
    ]
  }
}
```

## Hook 3: PreToolUse - Skill Check Reminder

**Purpose:** When using Serena or starting code work, remind about skill invocation.

### Configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Before writing code:\n- Did you invoke the relevant skill? (payment-orchestration, frontend-development, api-development, etc.)\n- Did you check Context7 for latest documentation?\n- Did you invoke brainstorming or TDD skills if appropriate?\n- Are you following the 4-phase workflow?"
          }
        ]
      }
    ]
  }
}
```

## Hook 4: Stop - Verification Reminder

**Purpose:** Before claiming task complete, remind about verification.

### Configuration

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Before claiming complete:\n- Did you invoke verification-before-completion skill?\n- Did you run actual commands to verify (tests, build, etc.)?\n- Did you store learnings in Serena memory?\n- Did you update Episodic Memory through conversation?"
          }
        ]
      }
    ]
  }
}
```

## Complete Settings Configuration

Create or update `.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(bun x tsx:*)"]
  },
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "MASTER WORKFLOW ACTIVE: Follow claude-code-workflow skill for every request. Classify → Select Skills → Choose MCPs → Invoke Superpowers → Execute 4-Phase Workflow. Always check Episodic Memory first."
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "CODE WORKFLOW CHECK: Did you invoke relevant skills (payment-orchestration, frontend-development, api-development)? Did you check Context7? Are you following TDD/brainstorming?"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "COMPLETION CHECK: Did you invoke verification-before-completion? Did you run tests/build? Did you store learnings in Serena memory?"
          }
        ]
      }
    ]
  }
}
```

## Installation

1. Copy the hooks configuration to your project's `.claude/settings.json`
2. Restart Claude Code
3. The hooks will automatically activate

## Testing Hooks

To verify hooks are working:

1. Start a new session - should see workflow reminder
2. Try to write code - should see skill check reminder
3. Complete a task - should see verification reminder

## Customization

### Disable Specific Hooks

Remove the hook entry from the configuration to disable it.

### Modify Prompts

Edit the `prompt` field to customize the reminder messages.

### Add Domain-Specific Hooks

Add new matchers for specific domains:

```json
{
  "PreToolUse": [
    {
      "matcher": "mcp_serena",
      "hooks": [
        {
          "type": "prompt",
          "prompt": "Using Serena: Did you check Episodic Memory for past code patterns first?"
        }
      ]
    }
  ]
}
```
