# Reference: Mocking Strategies

## Why Mock?

- **Speed**: Instant feedback.
- **Cost**: No per-call fees.
- **Coverage**: Test edge cases (Timeouts, specific ISO codes) that are hard to reproduce on live sandboxes.

## Implementation Pattern

- **Adapter Level**: Intercept the HTTP Client call.
- **Deterministic**: Input A always leads to Output B.

## Status Codes to Mock

- `200 OK` (Approved)
- `402 Payment Required` (Declined)
- `500 Internal Server Error` (Gateway Down)
- `504 Gateway Timeout`
