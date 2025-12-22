# Reference: Webhook Security (HMAC)

## Standard Mechanism

`HMAC-SHA256(Secret, Timestamp + Payload)`

## PSP Variations

- **Stripe**: Header `Stripe-Signature`. Format `t=timestamp,v1=signature`.
- **Adyen**: HMAC in payload or Header. Uses specific field concatenation.
- **MPGS**: `X-Notification-Secret` / `X-Notification-Signature`.

## Best Practices

- **Constant Time Compare**: `crypto.timingSafeEqual(a, b)`
- **Replay Attack Window**: Max 5 minutes tolerance.
- **Secret Rotation**: Support multiple active secrets during rotation.
