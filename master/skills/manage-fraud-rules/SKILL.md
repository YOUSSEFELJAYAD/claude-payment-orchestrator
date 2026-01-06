---
name: manage-fraud-rules
description: Configure and manage fraud detection rules engine
activation: Use when adding, modifying, or tuning fraud detection rules
---

# Manage Fraud Rules

**Role:** Fraud Rules Administrator
**Domain:** Fraud Prevention, Rules Engine
**Objective:** Configure and maintain fraud detection rule sets

## Quick Start (TL;DR)

**Use when:** Managing fraud detection rules
**Key steps:** 1. Define rule  2. Test in shadow mode  3. Deploy  4. Monitor
**Output:** Active fraud rules with monitoring

## Rule Structure

```typescript
interface FraudRule {
  id: string;
  name: string;
  description: string;
  version: number;
  status: 'active' | 'shadow' | 'disabled';
  priority: number;
  condition: RuleCondition;
  action: RuleAction;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    expiresAt?: Date;
  };
}

interface RuleCondition {
  type: 'simple' | 'compound';
  operator?: 'AND' | 'OR';
  conditions?: RuleCondition[];
  field?: string;
  comparator?: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'contains';
  value?: any;
}

interface RuleAction {
  type: 'score' | 'flag' | 'block' | 'review';
  score?: number;
  flag?: string;
  metadata?: Record<string, any>;
}
```

## Rule Examples

### Velocity Rule
```typescript
const velocityRule: FraudRule = {
  id: 'FR-001',
  name: 'High velocity transactions',
  description: 'Flag accounts with >5 transactions in 1 hour',
  version: 1,
  status: 'active',
  priority: 100,
  condition: {
    type: 'simple',
    field: 'velocity.txnCountLast1h',
    comparator: '>',
    value: 5,
  },
  action: {
    type: 'score',
    score: 30,
  },
  metadata: {
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'fraud-team',
  },
};
```

### Compound Rule
```typescript
const compoundRule: FraudRule = {
  id: 'FR-002',
  name: 'New device high amount',
  description: 'Review new devices with transactions over $500',
  version: 1,
  status: 'active',
  priority: 90,
  condition: {
    type: 'compound',
    operator: 'AND',
    conditions: [
      {
        type: 'simple',
        field: 'device.isKnown',
        comparator: '=',
        value: false,
      },
      {
        type: 'simple',
        field: 'transaction.amount',
        comparator: '>',
        value: 500,
      },
    ],
  },
  action: {
    type: 'review',
  },
  metadata: {
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'fraud-team',
  },
};
```

## Rules Engine

```typescript
class FraudRulesEngine {
  private rules: FraudRule[] = [];

  async loadRules(): Promise<void> {
    this.rules = await db.fraudRules
      .find({ status: { $in: ['active', 'shadow'] } })
      .sort({ priority: -1 })
      .toArray();
  }

  evaluate(signals: Signals): RuleEvaluation {
    const results: RuleResult[] = [];
    let totalScore = 0;
    const flags: string[] = [];
    let blocked = false;
    let requiresReview = false;

    for (const rule of this.rules) {
      if (this.matchesCondition(signals, rule.condition)) {
        const result: RuleResult = {
          ruleId: rule.id,
          ruleName: rule.name,
          matched: true,
          isShadow: rule.status === 'shadow',
        };

        if (rule.status === 'active') {
          switch (rule.action.type) {
            case 'score':
              totalScore += rule.action.score!;
              break;
            case 'flag':
              flags.push(rule.action.flag!);
              break;
            case 'block':
              blocked = true;
              break;
            case 'review':
              requiresReview = true;
              break;
          }
        }

        results.push(result);
      }
    }

    return { results, totalScore, flags, blocked, requiresReview };
  }

  private matchesCondition(signals: Signals, condition: RuleCondition): boolean {
    if (condition.type === 'compound') {
      const matches = condition.conditions!.map(c =>
        this.matchesCondition(signals, c)
      );
      return condition.operator === 'AND'
        ? matches.every(m => m)
        : matches.some(m => m);
    }

    const value = this.getNestedValue(signals, condition.field!);
    return this.compare(value, condition.comparator!, condition.value);
  }
}
```

## Rule Lifecycle

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌──────────┐
│  Draft  │───▶│ Shadow  │───▶│ Active  │───▶│ Disabled │
└─────────┘    └─────────┘    └─────────┘    └──────────┘
                    │              │
                    ▼              ▼
              ┌─────────┐    ┌─────────┐
              │ Monitor │    │ Monitor │
              │ Metrics │    │ Metrics │
              └─────────┘    └─────────┘
```

## Best Practices

- Always test in shadow mode first
- Set expiration dates on temporary rules
- Document rule rationale
- Monitor rule hit rates
- Review disabled rules quarterly
