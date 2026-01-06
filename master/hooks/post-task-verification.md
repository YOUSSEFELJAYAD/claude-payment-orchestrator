---
name: post-task-verification
description: Automatic verification hook that runs after major task completions
type: PostToolUse
tools: [Write, Edit, Bash]
---

# Post-Task Verification Hook

Automatically verifies work completion before finalizing tasks.

## Trigger Conditions

This hook activates after:
- File writes to source code (`*.ts`, `*.tsx`, `*.js`, `*.jsx`)
- Edit operations on critical files
- Bash commands that modify state (build, test, deploy)

## Verification Checklist

When triggered, enforce these checks:

### For Code Changes
```
□ TypeScript compiles without errors
□ Affected tests pass
□ No new linting errors introduced
□ Type safety maintained
```

### For Payment Code
```
□ PCI compliance patterns followed
□ No sensitive data logged
□ Idempotency keys implemented
□ Error handling complete
□ Rollback capability exists
```

### For Webhook Code
```
□ Signature validation implemented
□ Retry logic in place
□ Dead letter queue configured
□ Idempotency handling present
```

## Implementation

```typescript
// Hook logic (conceptual)
interface PostTaskVerification {
  taskType: 'code' | 'payment' | 'webhook' | 'config';
  checksRequired: string[];
  autoFix: boolean;
}

const verificationMatrix: Record<string, PostTaskVerification> = {
  'payment-integration': {
    taskType: 'payment',
    checksRequired: [
      'pci-compliance-check',
      'idempotency-check',
      'error-handling-check',
      'logging-safety-check',
    ],
    autoFix: false,
  },
  'webhook-implementation': {
    taskType: 'webhook',
    checksRequired: [
      'signature-validation-check',
      'retry-logic-check',
      'dlq-configuration-check',
    ],
    autoFix: false,
  },
  'general-code': {
    taskType: 'code',
    checksRequired: [
      'typescript-compile',
      'lint-check',
      'test-affected',
    ],
    autoFix: true,
  },
};

async function runPostTaskVerification(
  taskType: string,
  changedFiles: string[]
): Promise<VerificationResult> {
  const config = verificationMatrix[taskType] || verificationMatrix['general-code'];
  const results: CheckResult[] = [];

  for (const check of config.checksRequired) {
    const result = await runCheck(check, changedFiles);
    results.push(result);

    if (!result.passed && config.autoFix) {
      await attemptAutoFix(check, changedFiles);
    }
  }

  return {
    passed: results.every(r => r.passed),
    results,
    recommendations: results
      .filter(r => !r.passed)
      .map(r => r.recommendation),
  };
}
```

## Usage

The hook is automatically invoked. To manually trigger:

```
User: verify my changes
Claude: *runs post-task-verification hook*
```

## Bypass (Emergency Only)

```
User: skip verification for this change
Claude: *bypasses hook with warning logged*
```

## Integration with Checkpoint System

After successful verification:
1. Auto-checkpoint created
2. State saved to `.claude/checkpoints/`
3. Rollback point established

## Related

- `checkpoint-management` skill
- `verification-before-completion` superpower
