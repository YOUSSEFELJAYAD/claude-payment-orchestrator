# Skill: Evaluate Routing Rules

**Role:** sequential-reasoner
**Domain:** Core Payments & Logic
**Objective:** Execute deterministic Smart Routing logic to select the optimal PSP (Payment Service Provider) Config based on transaction attributes using comprehensive code analysis and testing.

## Available Capabilities

| Category | Capability | Routing Use Case |
|----------|-----------|------------------|
| **MCP Servers** | | |
| Serena | Code Analysis | Find routing logic, trace rule evaluation, analyze configs |
| Context7 | Documentation | Rule engine patterns, optimization algorithms |
| Playwright | Testing | Automated routing decision testing |
| Chrome | Dashboard | Monitor routing metrics, rule performance |
| Episodic Memory | Decision History | Recall routing changes, A/B test results |
| **Superpowers** | | |
| systematic-debugging | Debug Routing | Trace incorrect routing decisions |
| test-driven-development | Test Rules | Write tests before changing routing logic |
| verification-before-completion | Verify Changes | Confirm routing logic before deployment |
| **Agents** | | |
| fullstack-developer | Implementation | Implement new routing rules |
| api-designer | Rule Design | Design efficient routing algorithms |

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ROUTING RULES EVALUATION WORKFLOW                     │
├─────────────────────────────────────────────────────────────────────────┤
│  1. RESEARCH      → Context7: Get rule engine patterns                   │
│  2. ANALYSIS      → Serena: Find routing logic and rules                 │
│  3. MEMORY        → Episodic: Recall routing decisions, A/B tests        │
│  4. LOAD RULES    → Retrieve active rules for merchant                   │
│  5. FILTER        → Discard PSPs that don't support currency/brand       │
│  6. EVALUATE      → Check BIN, amount, currency conditions               │
│  7. SORT          → Rank by priority or failure_rate                     │
│  8. SELECT        → Return sorted PSP Config IDs (Primary + Failovers)   │
│  9. TEST          → Playwright: Automated routing tests                  │
│  10. MONITOR      → Chrome: Track routing performance dashboard          │
│  11. VERIFY       → Verification: Confirm routing decisions correct      │
│  12. DOCUMENT     → Serena Memory: Store routing rule changes            │
└─────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Research & Analysis

```typescript
// Get rule engine patterns
const ruleEngineDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/json-rules-engine/json-rules-engine",
  topic: "rules conditions facts events",
  mode: "code"
});

// Find existing routing logic
const routingCode = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentRouter/evaluateRules",
  include_body: true,
  depth: 3
});

// Search for routing rules
const routingRules = await mcp_serena.search_for_pattern({
  substring_pattern: "routing.*rule|psp.*select|bin.*range",
  relative_path: "src"
});

// Recall past routing changes
const routingHistory = await mcp_episodic_memory.search({
  query: ["routing rule change", "PSP routing", "smart routing"],
  mode: "both",
  limit: 10
});

// Find A/B test results
const abTests = await mcp_episodic_memory.search({
  query: "routing A/B test success rate conversion",
  mode: "text",
  limit: 5
});
```

### Phase 2: Rule Implementation

```typescript
// Routing rules data structure
const routingRulesSchema = `
interface RoutingRule {
  id: string;
  priority: number;  // 1 = highest
  name: string;
  merchant_id: string;
  conditions: {
    bin_range?: [string, string];  // ["400000", "499999"]
    currency?: string[];           // ["USD", "EUR"]
    min_amount?: number;           // cents
    max_amount?: number;
    card_brand?: string[];         // ["VISA", "MASTERCARD"]
    card_type?: string[];          // ["DEBIT", "CREDIT"]
    country?: string[];            // ["US", "GB"]
  };
  target_psp: string;              // config_id
  failover_psps?: string[];        // fallback config_ids
  active: boolean;
  created_at: Date;
  updated_at: Date;
}
`;

// Routing engine implementation
const routingEngine = `
import { Engine } from 'json-rules-engine';

export class PaymentRouter {
  private engine: Engine;

  constructor() {
    this.engine = new Engine();
  }

  async evaluateRules(
    transaction: Transaction,
    merchantId: string
  ): Promise<PSPConfig[]> {
    // 1. Load active rules for merchant
    const rules = await this.loadRules(merchantId);

    // 2. Filter PSPs by basic compatibility
    const compatiblePSPs = await this.filterCompatiblePSPs(
      transaction.currency,
      transaction.card.brand
    );

    if (compatiblePSPs.length === 0) {
      throw new Error(\`No PSP supports \${transaction.currency} \${transaction.card.brand}\`);
    }

    // 3. Evaluate routing rules in priority order
    const matchedRule = await this.findMatchingRule(rules, transaction);

    if (matchedRule) {
      // Return rule-specified PSP + failovers
      return this.buildPSPList(matchedRule, compatiblePSPs);
    }

    // 4. No rule matched - use default (lowest failure rate)
    return this.sortByPerformance(compatiblePSPs);
  }

  private async findMatchingRule(
    rules: RoutingRule[],
    transaction: Transaction
  ): Promise<RoutingRule | null> {
    // Sort by priority (1 = highest)
    const sortedRules = rules
      .filter(r => r.active)
      .sort((a, b) => a.priority - b.priority);

    for (const rule of sortedRules) {
      if (await this.matchesConditions(rule.conditions, transaction)) {
        return rule;
      }
    }

    return null;
  }

  private async matchesConditions(
    conditions: RoutingRule['conditions'],
    transaction: Transaction
  ): boolean {
    // BIN range check
    if (conditions.bin_range) {
      const [min, max] = conditions.bin_range;
      const bin = transaction.card.number.substring(0, 6);
      if (bin < min || bin > max) {
        return false;
      }
    }

    // Currency check
    if (conditions.currency) {
      if (!conditions.currency.includes(transaction.currency)) {
        return false;
      }
    }

    // Amount range check
    if (conditions.min_amount && transaction.amount < conditions.min_amount) {
      return false;
    }

    if (conditions.max_amount && transaction.amount > conditions.max_amount) {
      return false;
    }

    // Card brand check
    if (conditions.card_brand) {
      if (!conditions.card_brand.includes(transaction.card.brand)) {
        return false;
      }
    }

    // Card type check
    if (conditions.card_type) {
      if (!conditions.card_type.includes(transaction.card.type)) {
        return false;
      }
    }

    // Country check
    if (conditions.country) {
      if (!conditions.country.includes(transaction.billing_country)) {
        return false;
      }
    }

    return true;
  }

  private buildPSPList(
    rule: RoutingRule,
    compatible: PSPConfig[]
  ): PSPConfig[] {
    const primary = compatible.find(p => p.id === rule.target_psp);

    if (!primary) {
      throw new Error(\`Rule target PSP \${rule.target_psp} not compatible\`);
    }

    const failovers = (rule.failover_psps || [])
      .map(id => compatible.find(p => p.id === id))
      .filter(Boolean);

    return [primary, ...failovers];
  }

  private sortByPerformance(psps: PSPConfig[]): PSPConfig[] {
    // Sort by lowest failure rate, then lowest latency
    return psps.sort((a, b) => {
      if (a.failure_rate !== b.failure_rate) {
        return a.failure_rate - b.failure_rate;
      }
      return a.avg_latency_ms - b.avg_latency_ms;
    });
  }
}
`;

await mcp_serena.replace_content({
  relative_path: "src/routing/payment-router.ts",
  needle: "// Routing engine",
  repl: routingEngine,
  mode: "exact"
});

// Document routing logic
await mcp_serena.write_memory({
  memory_file_name: "routing-engine-design.md",
  content: `
# Payment Routing Engine Design

## Rule Evaluation Order
1. Load active rules for merchant (sorted by priority)
2. Filter PSPs by currency/brand compatibility
3. Evaluate rules in priority order (1 = highest)
4. First matching rule wins
5. If no match, sort by performance metrics

## Condition Types
- **bin_range**: Card BIN in range [min, max]
- **currency**: Transaction currency in list
- **amount**: Transaction amount in range [min, max]
- **card_brand**: Card brand (VISA, MASTERCARD, etc.)
- **card_type**: DEBIT or CREDIT
- **country**: Billing country code

## Examples
- Local Debit (BIN 400000-499999) → LocalPSP
- High Value (amount > $1000) → CyberSource
- EUR Transactions → AdyenEUR
- Default → Lowest failure rate PSP
  `
});
```

### Phase 3: Automated Testing

```typescript
// Test routing decisions with Playwright
await mcp_playwright.browser_navigate({
  url: "https://payment-admin.internal/routing-test"
});

// Test case 1: Local debit card
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card", value: "4000000000000000" },  // BIN 400000
    { name: "Amount", type: "textbox", ref: "amount", value: "50.00" },
    { name: "Currency", type: "textbox", ref: "currency", value: "USD" }
  ]
});

await mcp_playwright.browser_click({
  element: "Test Routing",
  ref: "test-btn"
});

const result1 = await mcp_playwright.browser_evaluate({
  function: "() => JSON.parse(document.querySelector('#result').textContent)"
});

console.log("Local debit routing:", result1);
// Expected: { primary: "local-psp", failovers: ["stripe"] }

// Test case 2: High value transaction
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Amount", type: "textbox", ref: "amount", value: "5000.00" }
  ]
});

await mcp_playwright.browser_click({
  element: "Test Routing",
  ref: "test-btn"
});

const result2 = await mcp_playwright.browser_evaluate({
  function: "() => JSON.parse(document.querySelector('#result').textContent)"
});

console.log("High value routing:", result2);
// Expected: { primary: "cybersource", failovers: ["adyen"] }
```

### Phase 4: Monitoring & Optimization

```typescript
// Monitor routing dashboard with Chrome
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://grafana.internal:3000/d/payment-routing"
});

// Extract routing metrics
const routingMetrics = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".routing-metrics",
  payload: "markdown"
});

// Extract PSP distribution
const pspDistribution = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".psp-distribution-chart",
  payload: "text"
});

// Check rule performance
const rulePerformance = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".rule-performance-table tbody",
  payload: "markdown"
});

console.log("Routing Metrics:", routingMetrics);
console.log("PSP Distribution:", pspDistribution);
console.log("Rule Performance:", rulePerformance);

// Screenshot dashboard
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "tmp/routing-dashboard.png"
});
```

## MCP Integration Examples

### Serena: Trace Routing Logic

```typescript
// Find routing engine implementation
const router = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentRouter",
  include_body: true,
  depth: 3
});

// Find all routing rule definitions
const rules = await mcp_serena.search_for_pattern({
  substring_pattern: "RoutingRule|routing_rules",
  relative_path: "src"
});

// Find where routing decisions are made
const routingCalls = await mcp_serena.find_referencing_symbols({
  name_path: "evaluateRules",
  relative_path: "src/routing/payment-router.ts"
});

// Trace rule evaluation logic
const matchLogic = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentRouter/matchesConditions",
  include_body: true
});

// Document current routing configuration
const currentRules = await mcp_serena.read_file({
  relative_path: "config/routing-rules.json"
});

await mcp_serena.write_memory({
  memory_file_name: "current-routing-config.md",
  content: `
# Current Routing Configuration

\`\`\`json
${currentRules}
\`\`\`

## Active Rules Summary
- Rule 1: Local Debit → LocalPSP
- Rule 2: High Value → CyberSource
- Rule 3: EUR → AdyenEUR
- Default: Performance-based (lowest failure rate)
  `
});
```

### Context7: Routing Patterns

```typescript
// Rule engine documentation
const jsonRulesEngine = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/cachecontrol/json-rules-engine",
  topic: "Engine Rule Fact Event",
  mode: "code"
});

// Load balancing algorithms
const loadBalancing = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/nodejs/node",
  topic: "cluster round robin load balancing",
  mode: "info"
});
```

### Episodic Memory: Routing Decisions

```typescript
// Recall routing rule changes
const ruleChanges = await mcp_episodic_memory.search({
  query: ["routing rule update", "PSP added", "rule priority changed"],
  mode: "both",
  limit: 15
});

// Find A/B test results
const abTestResults = await mcp_episodic_memory.search({
  query: "routing A/B test Stripe vs Adyen success rate",
  mode: "text"
});

// Learn from routing failures
const routingFailures = await mcp_episodic_memory.search({
  query: "incorrect routing wrong PSP selected",
  mode: "both"
});
```

## Agent Dispatch Patterns

### Request New Routing Rule

```json
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "implement_routing_rule",
  "target_agent": "fullstack-developer",
  "payload": {
    "rule_name": "UK Debit Cards",
    "priority": 5,
    "conditions": {
      "bin_range": ["400000", "499999"],
      "country": ["GB"],
      "card_type": ["DEBIT"]
    },
    "target_psp": "uk-local-psp",
    "failover_psps": ["stripe", "adyen"]
  }
}
```

### Optimize Routing Algorithm

```json
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "optimize_routing",
  "target_agent": "api-designer",
  "payload": {
    "current_issue": "Rule evaluation takes 50ms",
    "target_performance": "<10ms",
    "optimization_ideas": [
      "Cache PSP compatibility matrix",
      "Index rules by currency/brand",
      "Precompile rule conditions",
      "Use binary search for BIN ranges"
    ]
  }
}
```

## Best Practices

### Rule Priority Design

```
Priority 1-10:   Compliance (e.g., EU cards → EU PSP)
Priority 11-50:  Optimization (e.g., High value → Low fee PSP)
Priority 51-100: Experimentation (e.g., A/B tests)
Default:         Performance-based (lowest failure rate)
```

### Condition Specificity

```typescript
// More specific rules have higher priority
// Example:
// Priority 1: BIN=400000-499999 AND Country=GB AND Type=DEBIT → UK-PSP
// Priority 2: Country=GB → Stripe-GB
// Priority 3: Type=DEBIT → Local-PSP
// Default: Performance-based
```

### Failover Strategy

```typescript
// Always provide 2+ failover PSPs
const routingResult = {
  primary: "stripe",
  failovers: ["adyen", "cybersource"],
  reason: "Rule: High Value Transactions"
};

// Attempt in order:
// 1. stripe (rule target)
// 2. adyen (failover 1)
// 3. cybersource (failover 2)
```

### Testing Checklist

```typescript
const routingTests = [
  "✅ BIN range routing works",
  "✅ Currency routing works",
  "✅ Amount thresholds work",
  "✅ Card brand routing works",
  "✅ Failover PSPs returned",
  "✅ No matching rule uses default (performance-based)",
  "✅ Incompatible PSPs filtered out",
  "✅ Rule priority ordering correct",
  "✅ All conditions evaluated properly",
  "✅ Edge cases handled (empty rules, no compatible PSPs)"
];
```

### Documentation

```typescript
await mcp_serena.write_memory({
  memory_file_name: "routing-rules-changelog.md",
  content: `
# Routing Rules Changelog

## 2024-12-18: Added UK Debit Rule
- **Priority:** 5
- **Condition:** BIN 400000-499999, UK, Debit
- **Target:** uk-local-psp
- **Reason:** Lower fees for UK debit cards
- **Impact:** 15% of UK transactions now routed to local PSP
- **Success Rate:** 99.5% (vs 99.2% with Stripe)

## 2024-12-10: Increased High Value Threshold
- **Changed:** min_amount from $500 to $1000
- **Reason:** CyberSource fees too high for mid-value
- **Impact:** 8% fewer transactions to CyberSource
- **Result:** $2,500/month fee reduction

## 2024-12-01: Added EUR Currency Rule
- **Priority:** 10
- **Condition:** Currency = EUR
- **Target:** adyen-eur
- **Reason:** Better EUR conversion rates
- **Impact:** All EUR now via Adyen
  `
});
```
