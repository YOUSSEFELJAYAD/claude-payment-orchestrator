---
name: checkpoint-management
description: Save, restore, and manage task checkpoints for rollback capability
activation: Use when saving progress, restoring state, or managing rollback points
---

# Checkpoint Management

**Role:** Session State Manager
**Domain:** State Management, Disaster Recovery
**Objective:** Enable reliable save/restore of task state with rollback capability

## Quick Start (TL;DR)

**Use when:** Saving progress, restoring state, or needing rollback
**Key steps:** 1. Create checkpoint  2. Continue work  3. Restore if needed
**Output:** Recoverable task state with full rollback capability

## Commands

| Command | Description |
|---------|-------------|
| `/checkpoint save` | Create checkpoint of current state |
| `/checkpoint list` | List available checkpoints |
| `/checkpoint restore <id>` | Restore to specific checkpoint |
| `/checkpoint diff <id>` | Show changes since checkpoint |
| `/checkpoint delete <id>` | Remove checkpoint |

## Checkpoint Structure

```typescript
interface Checkpoint {
  id: string;
  name: string;
  timestamp: Date;
  description: string;
  state: {
    gitRef: string;           // Git commit/stash reference
    modifiedFiles: FileState[];
    stagedFiles: string[];
    contextFile: string;      // Session context snapshot
    todoState: TodoItem[];
    environmentSnapshot?: Record<string, string>;
  };
  metadata: {
    createdBy: string;
    taskDescription: string;
    parentCheckpoint?: string;
    tags: string[];
  };
}

interface FileState {
  path: string;
  status: 'modified' | 'added' | 'deleted';
  originalContent?: string;
  currentContent?: string;
  diff?: string;
}
```

## Implementation

### Safe Command Execution

```typescript
import { execFileNoThrow } from '../utils/execFileNoThrow.js';

// Safe git operations using execFileNoThrow
async function safeGitCommand(
  args: string[]
): Promise<{ stdout: string; stderr: string; status: number }> {
  return execFileNoThrow('git', args);
}

// Examples:
// await safeGitCommand(['status', '--porcelain']);
// await safeGitCommand(['rev-parse', 'HEAD']);
// await safeGitCommand(['stash', 'create']);
// await safeGitCommand(['reset', '--hard', commitRef]);
```

### Create Checkpoint

```typescript
async function createCheckpoint(
  name: string,
  description: string
): Promise<Checkpoint> {
  const id = `cp_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

  // 1. Get git status (safe execution)
  const gitStatusResult = await safeGitCommand(['status', '--porcelain']);
  const gitRefResult = await safeGitCommand(['rev-parse', 'HEAD']);

  // 2. Capture modified files
  const modifiedFiles = await captureModifiedFiles(gitStatusResult.stdout);

  // 3. Stash changes (keeps working directory)
  const stashResult = await safeGitCommand(['stash', 'create']);

  // 4. Capture session context
  const contextFile = await readFile('.claude/tasks/context_session_latest.md');

  // 5. Capture todo state
  const todoState = await getTodoState();

  const checkpoint: Checkpoint = {
    id,
    name,
    timestamp: new Date(),
    description,
    state: {
      gitRef: gitRefResult.stdout.trim(),
      modifiedFiles,
      stagedFiles: parseStaged(gitStatusResult.stdout),
      contextFile,
      todoState,
    },
    metadata: {
      createdBy: 'claude',
      taskDescription: description,
      tags: [],
    },
  };

  // 6. Save checkpoint
  await saveCheckpoint(checkpoint);

  console.log(`✓ Checkpoint created: ${id}`);
  return checkpoint;
}
```

### Restore Checkpoint

```typescript
async function restoreCheckpoint(checkpointId: string): Promise<RestoreResult> {
  const checkpoint = await loadCheckpoint(checkpointId);

  if (!checkpoint) {
    throw new Error(`Checkpoint ${checkpointId} not found`);
  }

  // 1. Confirm with user (destructive operation)
  const confirmed = await confirmRestore(checkpoint);
  if (!confirmed) {
    return { restored: false, reason: 'User cancelled' };
  }

  // 2. Create safety checkpoint of current state
  const safetyCheckpoint = await createCheckpoint(
    'pre-restore-safety',
    `Auto-created before restoring to ${checkpointId}`
  );

  try {
    // 3. Reset to checkpoint git state (safe execution)
    await safeGitCommand(['reset', '--hard', checkpoint.state.gitRef]);

    // 4. Apply stashed changes
    for (const file of checkpoint.state.modifiedFiles) {
      if (file.currentContent) {
        await writeFile(file.path, file.currentContent);
      }
    }

    // 5. Restore session context
    await writeFile(
      '.claude/tasks/context_session_latest.md',
      checkpoint.state.contextFile
    );

    // 6. Restore todo state
    await setTodoState(checkpoint.state.todoState);

    return {
      restored: true,
      checkpointId,
      safetyCheckpointId: safetyCheckpoint.id,
    };
  } catch (error) {
    // Rollback to safety checkpoint
    await restoreCheckpoint(safetyCheckpoint.id);
    throw error;
  }
}
```

### List Checkpoints

```typescript
async function listCheckpoints(): Promise<CheckpointSummary[]> {
  const checkpointsDir = '.claude/checkpoints';
  const files = await readdir(checkpointsDir);

  const checkpoints = await Promise.all(
    files
      .filter(f => f.endsWith('.json'))
      .map(async f => {
        const data = await readFile(join(checkpointsDir, f));
        return JSON.parse(data) as Checkpoint;
      })
  );

  return checkpoints
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .map(cp => ({
      id: cp.id,
      name: cp.name,
      timestamp: cp.timestamp,
      description: cp.description,
      fileCount: cp.state.modifiedFiles.length,
    }));
}
```

### Diff Against Checkpoint

```typescript
async function diffCheckpoint(checkpointId: string): Promise<DiffResult> {
  const checkpoint = await loadCheckpoint(checkpointId);
  const currentFiles = await getCurrentFileStates();

  const diffs: FileDiff[] = [];

  for (const cpFile of checkpoint.state.modifiedFiles) {
    const currentFile = currentFiles.find(f => f.path === cpFile.path);

    if (!currentFile) {
      diffs.push({
        path: cpFile.path,
        status: 'deleted_since_checkpoint',
      });
    } else if (currentFile.currentContent !== cpFile.currentContent) {
      diffs.push({
        path: cpFile.path,
        status: 'modified_since_checkpoint',
        diff: createDiff(cpFile.currentContent, currentFile.currentContent),
      });
    }
  }

  // Find new files not in checkpoint
  for (const currentFile of currentFiles) {
    if (!checkpoint.state.modifiedFiles.find(f => f.path === currentFile.path)) {
      diffs.push({
        path: currentFile.path,
        status: 'new_since_checkpoint',
      });
    }
  }

  return { checkpointId, diffs };
}
```

## Storage Location

```
.claude/
├── checkpoints/
│   ├── cp_1704567890_abc123.json
│   ├── cp_1704567891_def456.json
│   └── index.json
└── tasks/
    └── context_session_latest.md
```

## Auto-Checkpoint Triggers

Checkpoints are automatically created:

| Trigger | Checkpoint Name |
|---------|-----------------|
| Before major refactor | `pre-refactor-{timestamp}` |
| After successful test | `tests-passing-{timestamp}` |
| Before deployment | `pre-deploy-{timestamp}` |
| Post-verification hook | `verified-{timestamp}` |
| Session end | `session-end-{timestamp}` |

## Integration with Git

```typescript
// Enhanced git integration using safe execution
async function createGitBackedCheckpoint(name: string): Promise<string> {
  // Create a lightweight tag for the checkpoint
  const tagName = `checkpoint/${name}`;

  // Stash any uncommitted changes (safe execution)
  const stashResult = await safeGitCommand(['stash', 'create']);
  const stashRef = stashResult.stdout.trim();

  // Create checkpoint tag (safe execution)
  await safeGitCommand(['tag', tagName]);

  // Store stash reference in checkpoint metadata
  return `${tagName}:${stashRef}`;
}

async function restoreGitBackedCheckpoint(ref: string): Promise<void> {
  const [tagName, stashRef] = ref.split(':');

  // Reset to tag (safe execution)
  await safeGitCommand(['reset', '--hard', tagName]);

  // Apply stash if exists (safe execution)
  if (stashRef) {
    await safeGitCommand(['stash', 'apply', stashRef]);
  }
}
```

## Retention Policy

```typescript
const retentionPolicy = {
  maxCheckpoints: 50,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  keepVerified: true,              // Always keep verified checkpoints
  keepNamed: true,                 // Keep explicitly named checkpoints
};

async function pruneCheckpoints(): Promise<PruneResult> {
  const checkpoints = await listCheckpoints();
  const now = Date.now();
  const toDelete: string[] = [];

  for (const cp of checkpoints) {
    const age = now - cp.timestamp.getTime();

    if (age > retentionPolicy.maxAge) {
      if (cp.name.startsWith('verified-') && retentionPolicy.keepVerified) {
        continue;
      }
      if (!cp.name.startsWith('auto-') && retentionPolicy.keepNamed) {
        continue;
      }
      toDelete.push(cp.id);
    }
  }

  // Keep within max limit
  const remaining = checkpoints.length - toDelete.length;
  if (remaining > retentionPolicy.maxCheckpoints) {
    const excess = remaining - retentionPolicy.maxCheckpoints;
    // Delete oldest auto-checkpoints first
    const autoCheckpoints = checkpoints
      .filter(cp => cp.name.startsWith('auto-') && !toDelete.includes(cp.id))
      .slice(-excess);
    toDelete.push(...autoCheckpoints.map(cp => cp.id));
  }

  for (const id of toDelete) {
    await deleteCheckpoint(id);
  }

  return { deleted: toDelete.length };
}
```

## Related Skills

**This skill uses:**
- `verification-before-completion` - Verification triggers

**This skill is used by:**
- All payment skills (rollback capability)
- `saga-management` - Distributed transaction recovery

## Best Practices

- Create checkpoints before risky operations
- Name important checkpoints descriptively
- Use auto-checkpoints for routine saves
- Test restore procedure periodically
- Keep checkpoint storage clean
- Include context file in checkpoints
- Document checkpoint purpose in description
- Always use `execFileNoThrow` for shell commands (prevents injection)
