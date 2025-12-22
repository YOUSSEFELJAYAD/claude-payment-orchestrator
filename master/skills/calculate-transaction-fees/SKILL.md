# Skill: Calculate Transaction Fees

**Role:** sequential-reasoner
**Domain:** Core Payments & Logic
**Objective:** Accurate computation of platform fees, commissions, and interchange costs using comprehensive MCP-powered calculation workflow with fee table analysis, PSP documentation, reconciliation testing, and historical fee patterns.

---

## Available Capabilities

### MCP Servers
| Server | Fee Calculation Usage | Key Operations |
|--------|-------------------|----------------|
| **Serena** | Find fee calculation logic, interchange tables, pricing models | `find_symbol`, `search_for_pattern` |
| **Context7** | Get Stripe/Adyen pricing docs, interchange rate guides | `get_library_docs` |
| **Playwright** | Test fee display UI, verify calculations | `browser_evaluate` |
| **Chrome** | Monitor PSP dashboards for fee breakdowns | `use_browser` |
| **Episodic Memory** | Recall past fee disputes, rounding issues | `search` |

### Superpowers Skills
| Skill | When to Use |
|-------|-------------|
| `superpowers:systematic-debugging` | When fee calculations don't reconcile |
| `superpowers:verification-before-completion` | Verify fee accuracy before deployment |

### Available Agents
| Agent | Dispatch For |
|-------|-------------|
| `fullstack-developer` | Implement fee calculation engine |
| `api-designer` | Design fee breakdown API responses |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   FEE CALCULATION WORKFLOW                               │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Episodic Memory: Recall past fee calculation issues                 │
│  ├─ Serena: Find existing fee calculation logic                         │
│  └─ Context7: Get PSP pricing documentation                             │
│                                                                          │
│  PHASE 2: MODEL IDENTIFICATION                                          │
│  ├─ Blended: Simple percentage + fixed fee                              │
│  └─ Interchange++: IC + Scheme Fee + Markup                             │
│                                                                          │
│  PHASE 3: CALCULATION                                                   │
│  ├─ Fetch base costs (interchange table by card type/region)            │
│  ├─ Apply scheme fees (Visa/Mastercard assessment)                      │
│  ├─ Add platform markup                                                 │
│  ├─ Calculate in minor units (cents) to avoid rounding errors           │
│  └─ Compute settlement amount                                           │
│                                                                          │
│  PHASE 4: VERIFICATION                                                  │
│  ├─ Playwright: Test fee display accuracy                               │
│  ├─ Chrome: Verify against PSP dashboard                                │
│  └─ Serena: Store fee model decisions in memory                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## MCP Integration Examples

### Episodic Memory: Fee Issues
```typescript
const feeDisputes = await mcp_episodic_memory.search({
  query: ["fee mismatch", "rounding error", "interchange calculation"],
  mode: "both",
  limit: 5
});
```

### Serena: Find Fee Logic
```typescript
const feeEngine = await mcp_serena.find_symbol({
  name_path_pattern: "FeeCalculator|calculateFees",
  include_body: true
});

const interchangeTables = await mcp_serena.search_for_pattern({
  substring_pattern: "interchangeRate|cardType.*fee",
  relative_path: "src/fees"
});
```

### Context7: Pricing Documentation
```typescript
const stripePricing = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-node",
  topic: "pricing interchange plus plus fees",
  mode: "info"
});
```

### Chrome: Verify Fees
```typescript
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/settings/pricing"
});

const feeStructure = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".pricing-breakdown",
  payload: "text"
});
```

---

## Fee Models

### Blended Pricing
```typescript
// Simple: 2.9% + $0.30
const fee = Math.round(amount * 0.029 + 30);
const settlement = amount - fee;
```

### Interchange++ Pricing
```typescript
// Complex: Interchange + Scheme + Markup
const interchange = getInterchangeRate(cardType, region);
const schemeFee = getSchemeFee(network);
const markup = 0.005; // 0.5%

const fee = Math.round(amount * (interchange + schemeFee + markup));
const settlement = amount - fee;
```

---

## Precision Rules

- **Always use minor units** (cents) for calculations
- **Rounding**: Half-up (`Math.round`) or floor (`Math.floor`) per policy
- **Never use floats** for money calculations
- **Validate totals**: `settlement + fee === amount`

---

## Best Practices

1. **Documentation**: Check Context7 for latest PSP pricing
2. **Code Analysis**: Use Serena to find fee calculation patterns
3. **Historical Context**: Search Episodic Memory for rounding issues
4. **Test Accuracy**: Verify calculations match PSP dashboard
5. **Minor Units**: Always calculate in cents, never dollars
6. **Store Decisions**: Document fee model choices in Serena memory
