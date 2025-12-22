# Reference: Cybersource REST API

## Host

- Sandbox: `apitest.cybersource.com`
- Production: `api.cybersource.com`

## Authentication Headers

- `v-c-merchant-id`
- `Date` (HTTP 1.1)
- `Host`
- `Signature`: keyId="...", alogithm="HmacSHA256", headers="host date (request-target) v-c-merchant-id", signature="..."

## Error Handling

- HTTP 201: Success (`status`: `AUTHORIZED`)
- HTTP 400: Validation Error (`message`: `INVALID_FIELD`)
- HTTP 502: Gateway Error
