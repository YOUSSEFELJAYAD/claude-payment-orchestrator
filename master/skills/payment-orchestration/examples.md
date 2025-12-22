# Examples: Orchestrator Logic

```typescript
class PaymentOrchestrator {
  async process(req: PaymentRequest) {
    // 1. Routing
    const providerConfig = await this.router.route(req);
    const provider = this.factory.get(providerConfig.name);

    // 2. Execution
    try {
      const result = await provider.authorize(req);
      if (result.status === "AUTHORIZED") {
        await this.ledger.record(req, result);
        return { status: "SUCCESS" };
      }
    } catch (error) {
      // 3. Failover
      if (this.shouldFailover(error)) {
        return this.processBackup(req);
      }
      throw error;
    }
  }
}
```
