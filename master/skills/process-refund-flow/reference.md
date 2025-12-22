# Reference: Refund vs Void

## Void (Authorization Reversal)

- **Timing**: Pre-settlement (usually < 24 hrs).
- **Effect**: Releases the hold on customer funds. No money changes hands.
- **Fees**: Typically free.
- **API**: `Void` / `AuthReversal`.

## Refund (Credit)

- **Timing**: Post-settlement.
- **Effect**: Moves money back from Merchant Acquirer to Customer Issuer.
- **Fees**: Interchange fees often NOT returned. Processing fees apply.
- **API**: `Refund` / `Return`.

## Idempotency

- Always generate a unique `refundRequestId` UUID.
- Store this UUID in the `Refunds` table before calling the PSP.
