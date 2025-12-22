# Examples: Smart Routing Evaluation

## Scenario 1: High Value USD Transaction

**Input**: { Amount: 1500.00, Currency: USD, Card: 4242... }

**Rules Config**:

1. (Priority 1) If Amount > 1000 AND Currency = USD -> Use `CyberSource`
2. (Priority 2) If Currency = USD -> Use `Stripe`
3. (Priority 3) Default -> `MPGS`

**Evaluation**:

- Rule 1 matches? YES (1500 > 1000, USD=USD).
- **Result**: Primary: CyberSource. Failover: Stripe (next best match).

## Scenario 2: UK Debit Card (Geo-Routing)

**Input**: { BIN: 432100 (UK Debit), Currency: GBP }

**Rules Config**:

1. (Priority 1) If BIN_COUNTRY = GB -> Use `WorldPay-UK`
2. (Priority 99) Default -> `Stripe`

**Result**: Primary: WorldPay-UK.

## Code Example

```typescript
interface RoutingRule {
  priority: number;
  condition: (tx: Transaction) => boolean;
  psp: string;
}

interface Transaction {
  amount: number;
  currency: string;
  binCountry?: string;
}

interface RoutingResult {
  primary: string;
  failover: string | null;
}

function evaluateRouting(tx: Transaction, rules: RoutingRule[]): RoutingResult {
  const sorted = [...rules].sort((a, b) => a.priority - b.priority);
  const matches = sorted.filter(rule => rule.condition(tx));

  return {
    primary: matches[0]?.psp ?? "default",
    failover: matches[1]?.psp ?? null,
  };
}

// Usage
const rules: RoutingRule[] = [
  { priority: 1, condition: tx => tx.amount > 100000 && tx.currency === "USD", psp: "CyberSource" },
  { priority: 2, condition: tx => tx.currency === "USD", psp: "Stripe" },
  { priority: 99, condition: () => true, psp: "MPGS" },
];

const result = evaluateRouting({ amount: 150000, currency: "USD" }, rules);
// { primary: "CyberSource", failover: "Stripe" }
```
