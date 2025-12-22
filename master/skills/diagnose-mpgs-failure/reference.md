# Reference: MPGS & ISO Response Codes

## Gateway Codes

- `APPROVED`: Success.
- `DECLINED`: Financial refusal. Check acquirerCode.
- `PENDING`: Async flow (e.g. 3DS).
- `ERROR`: Validation or System error.

## Common ISO 8583 Acquirer Codes

| Code | Meaning            | Category | Action               |
| ---- | ------------------ | -------- | -------------------- |
| `00` | Approved           | Success  | None                 |
| `05` | Do Not Honor       | Hard     | Ask for new card     |
| `14` | Invalid Card       | Hard     | Validation check     |
| `51` | Insufficient Funds | Soft     | Retry / Lower amount |
| `54` | Expired Card       | Hard     | Update Expiry        |
| `91` | Issuer Down        | Soft     | Retry later          |

## 3DS Specific Errors

- `VERIFICATION_FAILED`: 3DS Auth failed (wrong OTP).
- `NOT_ENROLLED`: Card doesn't support 3DS.
