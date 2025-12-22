# Examples: Fee Calculation

## Scenario 1: Blended

Transaction: $100.00
Rate: 2.9% + 0.30
Calculation:

- Var: 100 \* 0.029 = 2.90
- Fixed: 0.30
- Total Fee: $3.20
- Net: $96.80

## Scenario 2: IC++ (EU Debit)

Transaction: €100.00
Rates:

- IC (EU Debit): 0.20%
- Scheme: 0.02%
- Markup: 0.50%
  Calculation:
- Total Rate: 0.72%
- Fee: €0.72
- Net: €99.28
  _Saving vs Blended: ~€2.48_

## Code Example

```typescript
interface FeeConfig {
  type: "blended" | "icpp";
  variableRate: number; // decimal (0.029 = 2.9%)
  fixedFee: number;     // in minor units
}

interface FeeResult {
  grossAmount: number;
  fee: number;
  netAmount: number;
}

function calculateFee(amountCents: number, config: FeeConfig): FeeResult {
  const variableFee = Math.round(amountCents * config.variableRate);
  const totalFee = variableFee + config.fixedFee;

  return {
    grossAmount: amountCents,
    fee: totalFee,
    netAmount: amountCents - totalFee,
  };
}

// Usage
const result = calculateFee(10000, { type: "blended", variableRate: 0.029, fixedFee: 30 });
// { grossAmount: 10000, fee: 320, netAmount: 9680 }
```
