# Examples: Optimistic Locking

```typescript
async function updateLedger(
  id: string,
  amount: number,
  currentVersion: number,
) {
  try {
    await prisma.ledger.update({
      where: { id, version: currentVersion },
      data: {
        balance: { increment: amount },
        version: { increment: 1 },
      },
    });
  } catch (e) {
    if (e.code === "P2025") throw new Error("Race Condition Detected");
    throw e;
  }
}
```
