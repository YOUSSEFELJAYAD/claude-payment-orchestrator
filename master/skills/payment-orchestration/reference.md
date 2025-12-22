# Reference: Transaction Lifecycle

## States

1. `CREATED`: Initial record.
2. `ROUTING`: Selecting provider.
3. `PENDING_PSP`: Sent to adapter, waiting for sync/async response.
4. `AUTHORIZED`: Funds held.
5. `CAPTURED`: Funds taken.
6. `FAILED`: Terminal error (after retries).
7. `CANCELLED`: User flow aborted.

## Events

- `3DS_CHALLENGE_REQUIRED`: Orchestrator pauses, returns URL to frontend.
- `WEBHOOK_RECEIVED`: Orchestrator wakes up to process async result.
