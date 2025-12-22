# Reference: MPGS API

## Endpoints

- **Test**: `https://test-gateway.mastercard.com/api/rest/version/60`
- **Prod**: `https://{region}-gateway.mastercard.com...`

## Authentication

- Basic Auth: `merchant.{TEST_MERCHANT_ID}` : `{API_PASSWORD}`.
- _Note:_ User is `merchant.<MID>`, not just `<MID>`.

## Operations

- `AUTHORIZE`: Hold funds.
- `CAPTURE`: Settle funds.
- `PAY`: Auth + Capture.
- `VOID_AUTH`: Cancel Authorization.
