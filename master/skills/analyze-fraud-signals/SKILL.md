---
name: analyze-fraud-signals
description: Evaluate risk indicators and fraud signals from payment transactions
activation: Use when analyzing transactions for fraud patterns or building risk assessment logic
---

# Analyze Fraud Signals

**Role:** Fraud Detection Analyst
**Domain:** Payment Security, Risk Assessment
**Objective:** Identify and evaluate fraud indicators in payment transactions

## Quick Start (TL;DR)

**Use when:** Evaluating transaction risk or building fraud detection
**Key steps:** 1. Collect signals  2. Score risk  3. Make decision
**Output:** Risk score with decision (approve/review/decline)

## Available Capabilities

### MCP Servers

| Server | Tools | Purpose |
|--------|-------|---------|
| **Serena** | `find_symbol`, `search_for_pattern` | Find existing fraud detection code |
| **Context7** | `query_docs` | Get fraud library documentation |
| **Episodic Memory** | `search` | Find past fraud patterns |

### Superpowers

| Skill | When |
|-------|------|
| `systematic-debugging` | Investigating false positives |
| `test-driven-development` | Building fraud detection tests |

## Fraud Signal Categories

### Device Signals
```typescript
interface DeviceSignals {
  fingerprint: string;
  isKnownDevice: boolean;
  deviceAge: number;           // Days since first seen
  deviceRiskScore: number;     // 0-100
  isEmulator: boolean;
  isRooted: boolean;
  timezone: string;
  language: string;
}
```

### Behavioral Signals
```typescript
interface BehavioralSignals {
  sessionDuration: number;     // Seconds
  pagesVisited: number;
  formFillTime: number;        // Seconds
  mouseMovement: 'human' | 'bot' | 'unknown';
  copyPasteDetected: boolean;
  typingPattern: 'normal' | 'suspicious';
}
```

### Transaction Signals
```typescript
interface TransactionSignals {
  amount: number;
  currency: string;
  isFirstTransaction: boolean;
  merchantCategory: string;
  isHighRiskMCC: boolean;
  isRecurring: boolean;
  billingMatchesShipping: boolean;
}
```

### Velocity Signals
```typescript
interface VelocitySignals {
  txnCountLast1h: number;
  txnCountLast24h: number;
  txnAmountLast24h: number;
  uniqueCardsLast24h: number;
  uniqueDevicesLast24h: number;
  failedAttemptsLast1h: number;
}
```

## Risk Scoring Model

```typescript
function calculateRiskScore(signals: AllSignals): RiskScore {
  let score = 0;
  const factors: RiskFactor[] = [];

  // Device risk (0-25 points)
  if (!signals.device.isKnownDevice) {
    score += 10;
    factors.push({ type: 'device', reason: 'New device', points: 10 });
  }
  if (signals.device.isEmulator) {
    score += 25;
    factors.push({ type: 'device', reason: 'Emulator detected', points: 25 });
  }

  // Velocity risk (0-30 points)
  if (signals.velocity.txnCountLast1h > 3) {
    score += 15;
    factors.push({ type: 'velocity', reason: 'High transaction frequency', points: 15 });
  }
  if (signals.velocity.failedAttemptsLast1h > 2) {
    score += 20;
    factors.push({ type: 'velocity', reason: 'Multiple failed attempts', points: 20 });
  }

  // Behavioral risk (0-25 points)
  if (signals.behavior.formFillTime < 5) {
    score += 15;
    factors.push({ type: 'behavior', reason: 'Form filled too quickly', points: 15 });
  }
  if (signals.behavior.mouseMovement === 'bot') {
    score += 20;
    factors.push({ type: 'behavior', reason: 'Bot-like mouse movement', points: 20 });
  }

  // Transaction risk (0-20 points)
  if (signals.transaction.isFirstTransaction && signals.transaction.amount > 500) {
    score += 15;
    factors.push({ type: 'transaction', reason: 'High first transaction', points: 15 });
  }

  // Determine decision
  let decision: 'approve' | 'review' | 'decline';
  if (score < 30) decision = 'approve';
  else if (score < 60) decision = 'review';
  else decision = 'decline';

  return { score, decision, factors };
}
```

## Integration Example

```typescript
// Middleware for payment endpoint
async function fraudCheck(req: Request, res: Response, next: NextFunction) {
  const signals = await collectSignals(req);
  const riskScore = calculateRiskScore(signals);

  // Log for analysis
  await logFraudCheck({
    transactionId: req.body.transactionId,
    signals,
    riskScore,
    timestamp: new Date(),
  });

  if (riskScore.decision === 'decline') {
    return res.status(400).json({
      error: 'Transaction declined',
      code: 'FRAUD_RISK_HIGH',
    });
  }

  if (riskScore.decision === 'review') {
    req.requiresManualReview = true;
  }

  next();
}
```

## Related Skills

**This skill uses:**
- `detect-velocity-attack` - For velocity signal collection

**This skill is used by:**
- `payment-orchestration` - Fraud check in payment flow

**Alternatives:**
- Use `detect-velocity-attack` if you only need velocity checks

## Best Practices

- Collect signals without blocking payment flow
- Use async logging for fraud data
- Tune thresholds based on false positive rates
- A/B test scoring changes before full rollout
- Maintain separate thresholds for different merchant categories
