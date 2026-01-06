---
name: checkpoint
description: Manage task checkpoints for save/restore capability
arguments:
  - name: action
    description: "Action to perform: save, list, restore, diff, delete"
    required: true
  - name: target
    description: "Checkpoint ID or name (for restore/diff/delete)"
    required: false
---

# /checkpoint - Task Checkpoint Manager

Manage checkpoints for saving and restoring task state.

## Usage

```
/checkpoint save [name]     - Create new checkpoint
/checkpoint list            - List all checkpoints
/checkpoint restore <id>    - Restore to checkpoint
/checkpoint diff <id>       - Show changes since checkpoint
/checkpoint delete <id>     - Remove checkpoint
```

## Examples

### Save Progress
```
/checkpoint save before-refactor
→ ✓ Checkpoint created: cp_1704567890_abc123
  Name: before-refactor
  Files: 5 modified, 2 staged
  Context: Saved
```

### List Checkpoints
```
/checkpoint list
→ Available Checkpoints:
  ID                        Name              Age      Files
  cp_1704567890_abc123     before-refactor   5m ago   5
  cp_1704567800_def456     tests-passing     10m ago  3
  cp_1704567700_ghi789     session-start     20m ago  0
```

### Restore Checkpoint
```
/checkpoint restore cp_1704567890_abc123
→ ⚠️  This will restore to checkpoint "before-refactor"
  Changes since checkpoint:
  - M src/payment.ts
  - A src/utils/helper.ts

  Continue? [y/N]
```

### Show Diff
```
/checkpoint diff cp_1704567890_abc123
→ Changes since "before-refactor":

  src/payment.ts:
  + line 45: added error handling
  - line 52: removed old validation

  src/utils/helper.ts: (new file)
```

## Workflow

```
1. Start task
   ↓
2. /checkpoint save task-start
   ↓
3. Make changes
   ↓
4. /checkpoint save mid-progress
   ↓
5. Something breaks?
   ├─ Yes → /checkpoint restore mid-progress
   └─ No  → Continue working
   ↓
6. Complete task
   ↓
7. Auto-checkpoint created: task-complete-{timestamp}
```

## Auto-Checkpoints

These are created automatically:
- `session-start-*` - When Claude Code starts
- `verified-*` - After successful verification
- `pre-deploy-*` - Before deployments
- `pre-restore-safety-*` - Before any restore operation

## Related

- `checkpoint-management` skill
- `post-task-verification` hook
- `/saveContext` command
