# Reference: Unified Status Mapping

## Stripe

- `requires_payment_method` -> `FAILED`
- `requires_action` -> `PENDING` (3DS)
- `succeeded` (capture=false) -> `AUTHORIZED`
- `succeeded` (capture=true) -> `CAPTURED`

## MPGS

- `APPROVED` -> `AUTHORIZED`
- `CAPTURED` -> `CAPTURED`
- `DECLINED` -> `DECLINED`
- `CANCELLED` -> `VOIDED`

## Adyen

- `Authorised` -> `AUTHORIZED`
- `Refused` -> `DECLINED`
- `Cancelled` -> `VOIDED`
