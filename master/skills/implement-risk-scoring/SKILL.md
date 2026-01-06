---
name: implement-risk-scoring
description: Build and deploy machine learning or rule-based risk scoring models
activation: Use when creating or updating fraud risk scoring systems
---

# Implement Risk Scoring

**Role:** Risk Engineering Specialist
**Domain:** Fraud Prevention, Machine Learning
**Objective:** Build accurate risk scoring models for payment fraud detection

## Quick Start (TL;DR)

**Use when:** Building or updating risk scoring models
**Key steps:** 1. Define features  2. Build model  3. Calibrate thresholds  4. Deploy
**Output:** Production-ready risk scoring system

## Model Types

### Rule-Based Scoring
```typescript
interface Rule {
  id: string;
  name: string;
  condition: (signals: Signals) => boolean;
  score: number;
  category: 'device' | 'velocity' | 'behavior' | 'transaction';
}

const rules: Rule[] = [
  {
    id: 'R001',
    name: 'New device high amount',
    condition: (s) => !s.device.isKnown && s.transaction.amount > 500,
    score: 25,
    category: 'device',
  },
  {
    id: 'R002',
    name: 'Velocity spike',
    condition: (s) => s.velocity.txnCountLast1h > 5,
    score: 30,
    category: 'velocity',
  },
];

function evaluateRules(signals: Signals): RuleResult[] {
  return rules
    .filter(rule => rule.condition(signals))
    .map(rule => ({
      ruleId: rule.id,
      ruleName: rule.name,
      score: rule.score,
      category: rule.category,
    }));
}
```

### ML-Based Scoring
```typescript
interface MLModel {
  version: string;
  features: string[];
  predict: (features: number[]) => number;
}

async function mlRiskScore(signals: Signals): Promise<number> {
  const features = extractFeatures(signals);
  const prediction = await model.predict(features);
  return Math.round(prediction * 100); // 0-100 score
}

function extractFeatures(signals: Signals): number[] {
  return [
    signals.device.isKnown ? 0 : 1,
    signals.device.deviceAge,
    signals.velocity.txnCountLast24h,
    signals.velocity.failedAttemptsLast1h,
    signals.behavior.sessionDuration,
    signals.transaction.amount,
    signals.transaction.isFirstTransaction ? 1 : 0,
  ];
}
```

## Threshold Calibration

```typescript
interface ThresholdConfig {
  approve: number;    // Score below this: auto-approve
  review: number;     // Score between approve and review: manual review
  decline: number;    // Score above this: auto-decline
}

// Conservative thresholds (fewer false positives, more fraud)
const conservative: ThresholdConfig = {
  approve: 40,
  review: 70,
  decline: 90,
};

// Aggressive thresholds (more false positives, less fraud)
const aggressive: ThresholdConfig = {
  approve: 20,
  review: 50,
  decline: 70,
};

function makeDecision(score: number, config: ThresholdConfig): Decision {
  if (score <= config.approve) return 'approve';
  if (score <= config.review) return 'review';
  if (score <= config.decline) return 'decline';
  return 'decline';
}
```

## A/B Testing Framework

```typescript
interface Experiment {
  id: string;
  name: string;
  variants: Variant[];
  allocation: number[]; // Percentage per variant
}

interface Variant {
  id: string;
  thresholds: ThresholdConfig;
}

function assignVariant(userId: string, experiment: Experiment): Variant {
  const hash = hashUserId(userId);
  const bucket = hash % 100;

  let cumulative = 0;
  for (let i = 0; i < experiment.variants.length; i++) {
    cumulative += experiment.allocation[i];
    if (bucket < cumulative) {
      return experiment.variants[i];
    }
  }
  return experiment.variants[0];
}
```

## Monitoring & Metrics

```typescript
interface RiskMetrics {
  approvalRate: number;
  reviewRate: number;
  declineRate: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  averageScore: number;
  scoreDistribution: number[];
}

async function calculateMetrics(
  timeRange: { start: Date; end: Date }
): Promise<RiskMetrics> {
  const decisions = await getDecisions(timeRange);
  const outcomes = await getOutcomes(timeRange);

  return {
    approvalRate: decisions.filter(d => d === 'approve').length / decisions.length,
    reviewRate: decisions.filter(d => d === 'review').length / decisions.length,
    declineRate: decisions.filter(d => d === 'decline').length / decisions.length,
    falsePositiveRate: calculateFPR(decisions, outcomes),
    falseNegativeRate: calculateFNR(decisions, outcomes),
    averageScore: average(decisions.map(d => d.score)),
    scoreDistribution: histogram(decisions.map(d => d.score), 10),
  };
}
```

## Related Skills

**This skill uses:**
- `analyze-fraud-signals` - Signal collection

**This skill is used by:**
- `manage-fraud-rules` - Rule configuration

## Best Practices

- Start with rules, add ML when you have sufficient data
- Monitor false positive rates daily
- Use shadow mode for new models
- Document all threshold changes
- Keep model versions for rollback
