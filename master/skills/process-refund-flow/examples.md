# Examples: Refund Logic

## Scenario 1: Same day cancellation

**Input**:

- Transaction Status: `AUTHORIZED`
- Amount: 100.00
- Request: Cancel

**Decision**:

- Action: **VOID**
- Reason: Transaction not yet captured. Void is faster and cheaper.

## Scenario 2: Partial Refund after shipping

**Input**:

- Transaction Status: `CAPTURED`
- Captured Amount: 100.00
- Previously Refunded: 0.00
- Request: Refund 20.00

**Decision**:

- Action: **REFUND**
- Amount: 20.00
- Valid? Yes (20 <= 100).

## Code Example

```typescript
type RefundAction = "VOID" | "REFUND" | "REJECTED";

interface Transaction {
  status: "AUTHORIZED" | "CAPTURED";
  capturedAmount: number;
  refundedAmount: number;
}

interface RefundRequest {
  amount: number;
}

interface RefundDecision {
  action: RefundAction;
  amount: number;
  reason: string;
}

function processRefund(tx: Transaction, request: RefundRequest): RefundDecision {
  // If not yet captured, void instead
  if (tx.status === "AUTHORIZED") {
    return {
      action: "VOID",
      amount: tx.capturedAmount,
      reason: "Transaction not captured - void is faster and cheaper",
    };
  }

  // Check refund eligibility
  const maxRefundable = tx.capturedAmount - tx.refundedAmount;
  if (request.amount > maxRefundable) {
    return {
      action: "REJECTED",
      amount: 0,
      reason: `Requested ${request.amount} exceeds refundable amount ${maxRefundable}`,
    };
  }

  return {
    action: "REFUND",
    amount: request.amount,
    reason: "Partial refund approved",
  };
}

// Usage
const tx = { status: "CAPTURED" as const, capturedAmount: 10000, refundedAmount: 0 };
processRefund(tx, { amount: 2000 }); // { action: "REFUND", amount: 2000, ... }
```
