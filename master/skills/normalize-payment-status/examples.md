# Examples: Status Mapping

## Scenario 1: Stripe 3DS

Input: `status: "requires_action"`
Mapped: `PENDING`
Reason: User needs to perform challenge.

## Scenario 2: MPGS Success

Input: `gatewayCode: "APPROVED"`
Mapped: `AUTHORIZED` (Default assumption unless auto-capture is on)

## Scenario 3: Custom PSP Fail

Input: `status: "DoNotHonor"`
Mapped: `DECLINED`

## Code Example

```typescript
enum NormalizedStatus {
  PENDING = "PENDING",
  AUTHORIZED = "AUTHORIZED",
  CAPTURED = "CAPTURED",
  DECLINED = "DECLINED",
  FAILED = "FAILED",
}

type PSPStatusMap = Record<string, NormalizedStatus>;

const STRIPE_MAP: PSPStatusMap = {
  requires_action: NormalizedStatus.PENDING,
  requires_payment_method: NormalizedStatus.PENDING,
  succeeded: NormalizedStatus.CAPTURED,
  canceled: NormalizedStatus.FAILED,
};

const MPGS_MAP: PSPStatusMap = {
  APPROVED: NormalizedStatus.AUTHORIZED,
  CAPTURED: NormalizedStatus.CAPTURED,
  DECLINED: NormalizedStatus.DECLINED,
  ERROR: NormalizedStatus.FAILED,
};

function normalizeStatus(psp: "stripe" | "mpgs", rawStatus: string): NormalizedStatus {
  const map = psp === "stripe" ? STRIPE_MAP : MPGS_MAP;
  return map[rawStatus] ?? NormalizedStatus.FAILED;
}

// Usage
normalizeStatus("stripe", "requires_action"); // PENDING
normalizeStatus("mpgs", "APPROVED");          // AUTHORIZED
```
