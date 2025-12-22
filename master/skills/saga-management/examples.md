# Examples: Saga Step Definition

```typescript
class AuthorizeStep implements SagaStep {
  async execute(context: SagaContext): Promise<Result> {
    const psp = context.selectedPsp;
    try {
      const response = await psp.authorize(context.payment);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  }

  async compensate(context: SagaContext): Promise<void> {
    // If auth happened but saga failed later
    await context.selectedPsp.void(context.payment.id);
  }
}
```
