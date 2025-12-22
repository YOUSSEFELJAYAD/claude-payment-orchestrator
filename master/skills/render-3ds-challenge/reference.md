# Reference: 3DS Iframe Security

## Sandbox Attribute

- `allow-scripts`: Required for ACS JS.
- `allow-forms`: Required for OTP submission.
- `allow-same-origin`: Required for cookies/session storage.
- **Avoid**: `allow-top-navigation` (prevents ACS from breaking out of iframe).

## PostMessage

- **Event Name**: Often custom per Gateway (e.g. `3DS_COMPLETED`, `emv3ds-challenge-complete`).
- **Target Origin**: Always specify target when sending. Check origin when receiving.

## Responsive/Size

- 3DS 2.0 defines standard sizes: `250x400`, `390x400`, `500x600`, `600x400`, `Full`.
- Start with `600x400` in a centered Modal.
