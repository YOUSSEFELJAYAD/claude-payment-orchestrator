# Reference: Saga Pattern

## Choreography vs Orchestration

- **Choreography**: Events drive action. Decentralized. Hard to trace.
- **Orchestration**: Central coordinator (`SagaOrchestrator`). Easier to manage, used here.

## State Machine

- `CREATED`
- `ROUTING_STARTED`
- `PSP_SELECTED`
- `AUTHORIZED`
- `CAPTURED` (Terminal)
- `FAILED` (Terminal)

## Recovery

- **Forward Recovery**: Retry until success.
- **Backward Recovery**: Undo changes (Compensating Transactions).
