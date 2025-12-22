# Reference: Secure Payment Sessions

## Token Type: Opaque vs JWT

For "Pay by Link", **Opaque Tokens** are preferred in the URL.

- **Opaque**: Random string (e.g., `a7f9...`). Requires DB lookup. Revocable instantly.
- **JWT**: Self-contained. Harder to revoke. Claims visible if not encrypted.

## TTL Best Practices

- **Standard**: 15 minutes.
- **Absolute Timeout**: Force expiry even if user is active? (Usually for links, it's absolute).
- **Idle Timeout**: Not applicable for single-page checkout link usually.

## Storage

- **Redis**: Ideal for ephemeral keys with native TTL support (`SETEX`).
- **Database**: Acceptable with clean-up jobs.

## OWASP Guidelines

- Use CSPRNG for generation.
- Prevent caching of link pages containing sensitive info (though the link itself is just the entry).
