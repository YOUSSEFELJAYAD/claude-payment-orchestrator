# Skill: Display Routing Indicator

**Role:** sequential-reasoner (UI Transparency Specialist)
**Domain:** UI/UX & Frontend
**Objective:** Visually communicate Smart Routing decisions with comprehensive MCP integration, real-time documentation, and visual testing capabilities.

---

## Available Capabilities

### MCP Servers

| Server | Purpose | Key Operations |
|--------|---------|----------------|
| **Serena** | Semantic code analysis | Find routing components, trace PSP selection logic, analyze indicator patterns |
| **Context7** | Real-time documentation | Shadcn Badge/Tooltip docs, Lucide icons, UI component patterns |
| **Playwright** | E2E testing | Test indicator rendering, accessibility, interaction states |
| **Chrome** | Live browser control | Preview indicators in admin dashboards, extract routing metadata |
| **Episodic Memory** | Cross-session context | Past routing UI decisions, user feedback patterns |

### Superpowers Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `superpowers:brainstorming` | Before UI design | Explore routing visualization approaches |
| `superpowers:systematic-debugging` | Indicator bugs | Debug routing data flow |
| `superpowers:test-driven-development` | Before implementation | Write indicator tests first |
| `superpowers:verification-before-completion` | Before claiming done | Verify all routing strategies display |
| `superpowers:requesting-code-review` | After implementation | Review UI code quality |

### Specialized Agents

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React component implementation |
| `shadcn-ui-architect` | Shadcn Badge/Tooltip integration |
| `payment-orchestration` | Routing logic expertise |
| `code-explorer` | Trace routing decision flow |
| `code-reviewer` | Review indicator accessibility |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ROUTING INDICATOR DISPLAY                             │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Context7: Get Shadcn Badge/Tooltip docs                              │
│  ├─ Serena: Find existing routing indicator components                   │
│  ├─ Episodic Memory: Recall routing display patterns                     │
│  └─ Agent Dispatch: payment-orchestration for routing metadata           │
│                                                                           │
│  PHASE 2: DESIGN                                                         │
│  ├─ Brainstorming: Explore visualization approach                        │
│  ├─ Define Strategies: COST | PERFORMANCE | GEO | FALLBACK               │
│  ├─ Icon Mapping: 💰⚡🌍🔄 + color coding                                 │
│  └─ Context Levels: Admin (detailed) vs User (subtle)                    │
│                                                                           │
│  PHASE 3: IMPLEMENTATION                                                 │
│  ├─ TDD: Write indicator rendering tests                                 │
│  ├─ Build: Badge component with tooltips                                 │
│  ├─ Accessibility: ARIA labels, semantic HTML                            │
│  └─ Responsive: Mobile-friendly badge sizing                             │
│                                                                           │
│  PHASE 4: VERIFICATION                                                   │
│  ├─ Playwright: Test each routing strategy indicator                     │
│  ├─ Chrome: Preview in admin dashboard context                           │
│  ├─ Code Review: Accessibility and semantic HTML check                   │
│  └─ Serena Memory: Document indicator mapping patterns                   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Research

**Context7 Documentation Lookup**
```typescript
// Shadcn Badge component
const badgeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "badge variants destructive outline",
  mode: "code"
});

// Shadcn Tooltip for hover details
const tooltipDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "tooltip trigger content",
  mode: "code"
});

// Lucide icons for routing strategies
const iconDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/lucide-icons/lucide",
  topic: "DollarSign Zap Globe RefreshCw",
  mode: "code"
});

// Radix Popover for detailed routing info
const popoverDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/radix-ui/primitives",
  topic: "popover trigger content",
  mode: "code"
});
```

**Serena Code Analysis**
```typescript
// Find routing indicator component
const indicatorComponent = await mcp_serena.find_symbol({
  name_path_pattern: "RoutingIndicator|RouteDisplay|PSPBadge",
  substring_matching: true,
  include_body: true
});

// Find routing strategy types
const routingStrategies = await mcp_serena.search_for_pattern({
  substring_pattern: "COST_OPTIMIZATION|PERFORMANCE|GEO_ROUTING|FALLBACK",
  relative_path: "src/lib/routing"
});

// Find routing metadata structure
const routingMetadata = await mcp_serena.find_symbol({
  name_path_pattern: "RoutingMetadata|RouteDecision",
  include_body: true
});

// Analyze admin dashboard usage
const dashboardUsage = await mcp_serena.search_for_pattern({
  substring_pattern: "RoutingIndicator|routing.*badge",
  relative_path: "src/app/admin",
  context_lines_before: 2
});
```

**Episodic Memory Search**
```typescript
// Recall routing UI patterns
const routingPatterns = await mcp_episodic_memory.search({
  query: ["routing indicator", "PSP badge", "smart routing UI"],
  mode: "both",
  limit: 10
});

// Find user feedback on routing visibility
const userFeedback = await mcp_episodic_memory.search({
  query: ["routing transparency", "why this PSP", "merchant confusion"],
  mode: "text",
  after: "2024-01-01"
});

// Find past design decisions
const designDecisions = await mcp_episodic_memory.search({
  query: "routing indicator color scheme icon selection",
  mode: "vector"
});
```

### Phase 2: Design & Planning

**Agent Dispatch for Routing Logic**
```json
{
  "requesting_agent": "display-routing-indicator",
  "target_agent": "payment-orchestration",
  "request_type": "get_routing_metadata",
  "payload": {
    "query": "What metadata is available for routing decisions?",
    "needed_fields": [
      "strategy",
      "selected_psp",
      "confidence_score",
      "reason",
      "alternatives"
    ]
  }
}
```

**Brainstorming Skill**
```typescript
// Invoke brainstorming for routing visualization
// Skill: superpowers:brainstorming
// Explores: Icon selection, color coding, information density, user context
```

### Phase 3: Implementation

**Test-Driven Development**
```typescript
// Write tests FIRST
// Skill: superpowers:test-driven-development

describe('RoutingIndicator', () => {
  it('should display cost optimization badge', () => {
    const metadata = {
      strategy: 'COST_OPTIMIZATION',
      selected_psp: 'stripe',
      reason: 'Lowest fees for this amount'
    };

    render(<RoutingIndicator metadata={metadata} />);

    expect(screen.getByText(/Best Rate/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Cost optimized');
  });

  it('should show tooltip with routing details on hover', async () => {
    const metadata = {
      strategy: 'PERFORMANCE',
      selected_psp: 'adyen',
      reason: 'Highest success rate in EU'
    };

    render(<RoutingIndicator metadata={metadata} />);

    const badge = screen.getByText(/Fastest/i);
    fireEvent.mouseEnter(badge);

    await waitFor(() => {
      expect(screen.getByText(/Highest success rate/i)).toBeVisible();
    });
  });

  it('should be accessible with screen readers', () => {
    const metadata = { strategy: 'GEO_ROUTING', selected_psp: 'cybersource' };

    render(<RoutingIndicator metadata={metadata} />);

    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label');
  });
});
```

**Implementation Example**
```typescript
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DollarSign, Zap, Globe, RefreshCw } from 'lucide-react';

type RoutingStrategy = 'COST_OPTIMIZATION' | 'PERFORMANCE' | 'GEO_ROUTING' | 'FALLBACK';

interface RoutingMetadata {
  strategy: RoutingStrategy;
  selected_psp: string;
  reason?: string;
  confidence_score?: number;
}

const strategyConfig = {
  COST_OPTIMIZATION: {
    icon: DollarSign,
    label: 'Best Rate',
    color: 'bg-green-100 text-green-800 border-green-300',
    description: 'Optimized for lowest fees'
  },
  PERFORMANCE: {
    icon: Zap,
    label: 'Fastest Route',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Optimized for highest success rate'
  },
  GEO_ROUTING: {
    icon: Globe,
    label: 'Local Acquirer',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Local payment processor for lower fees'
  },
  FALLBACK: {
    icon: RefreshCw,
    label: 'Backup Route',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    description: 'Failover to alternative processor'
  }
} as const;

export function RoutingIndicator({
  metadata,
  showDetails = false
}: {
  metadata: RoutingMetadata;
  showDetails?: boolean;
}) {
  const config = strategyConfig[metadata.strategy];
  const Icon = config.icon;

  const badge = (
    <Badge
      variant="outline"
      className={`${config.color} flex items-center gap-1`}
      role="status"
      aria-label={`Routed via ${metadata.strategy}: ${config.label}`}
    >
      <Icon className="w-3 h-3" aria-hidden="true" />
      {config.label}
    </Badge>
  );

  if (!showDetails) {
    return badge;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <div className="space-y-2">
          <p className="font-semibold">{config.description}</p>
          {metadata.reason && (
            <p className="text-sm text-muted-foreground">{metadata.reason}</p>
          )}
          <div className="text-xs text-muted-foreground">
            <span>PSP: </span>
            <span className="font-mono">{metadata.selected_psp}</span>
          </div>
          {metadata.confidence_score && (
            <div className="text-xs">
              Confidence: {(metadata.confidence_score * 100).toFixed(0)}%
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
```

**Serena Memory Storage**
```typescript
// Store routing indicator patterns
await mcp_serena.write_memory({
  memory_file_name: "routing-indicator-mapping.md",
  content: `
# Routing Indicator Mapping

## Strategy Icons & Colors
- COST_OPTIMIZATION: 💰 DollarSign, Green
- PERFORMANCE: ⚡ Zap, Blue
- GEO_ROUTING: 🌍 Globe, Purple
- FALLBACK: 🔄 RefreshCw, Orange

## Badge Text
- Admin View: Detailed (show strategy + PSP)
- User View: Subtle (show only icon + "Optimized")

## Accessibility
- Always include aria-label with strategy name
- Use role="status" for badge
- Tooltip provides detailed routing reason
`
});
```

### Phase 4: Testing & Verification

**Playwright Visual Testing**
```typescript
// Test each routing strategy indicator
const strategies = ['cost', 'performance', 'geo', 'fallback'];

for (const strategy of strategies) {
  await mcp_playwright.browser_navigate({
    url: `http://localhost:3000/admin/transactions?filter=strategy:${strategy}`
  });

  // Wait for table to load
  await mcp_playwright.browser_wait_for({ text: "Transactions" });

  // Verify badge appears
  const snapshot = await mcp_playwright.browser_snapshot({});

  // Screenshot indicator in context
  await mcp_playwright.browser_take_screenshot({
    filename: `routing-indicator-${strategy}.png`
  });

  // Test tooltip interaction
  await mcp_playwright.browser_click({
    element: "badge",
    ref: `routing-badge-${strategy}`
  });

  await mcp_playwright.browser_wait_for({ time: 0.5 });

  // Screenshot tooltip
  await mcp_playwright.browser_take_screenshot({
    filename: `routing-tooltip-${strategy}.png`
  });
}

// Test accessibility
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/admin/transactions"
});

const snapshot = await mcp_playwright.browser_snapshot({});
// Verify ARIA labels present in accessibility tree
```

**Chrome Dashboard Preview**
```typescript
// Navigate to admin dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/admin/transactions"
});

// Extract routing indicators from page
const indicators = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    Array.from(document.querySelectorAll('[role="status"]')).map(badge => ({
      text: badge.textContent,
      ariaLabel: badge.getAttribute('aria-label'),
      classes: badge.className
    }))
  `
});

// Screenshot full dashboard with indicators
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "admin-dashboard-routing.png"
});

// Hover over indicator to test tooltip
await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    const badge = document.querySelector('[role="status"]');
    badge.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  `
});

await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "routing-tooltip-preview.png"
});
```

**Code Review**
```json
{
  "requesting_agent": "display-routing-indicator",
  "target_agent": "code-reviewer",
  "request_type": "accessibility_review",
  "payload": {
    "file_path": "src/components/RoutingIndicator.tsx",
    "focus_areas": ["aria_labels", "semantic_html", "color_contrast"]
  }
}
```

**Verification Skill**
```typescript
// Skill: superpowers:verification-before-completion
// Verify:
// ✓ All routing strategies render correctly
// ✓ Tooltips display routing details
// ✓ ARIA labels present and descriptive
// ✓ Color contrast meets WCAG AAA
// ✓ Mobile responsive badge sizing
```

---

## MCP Integration Examples

### Serena: Find Routing Logic
```typescript
// Find routing decision logic
const routingLogic = await mcp_serena.find_symbol({
  name_path_pattern: "selectPSP|routePayment|calculateRouting",
  include_body: true,
  depth: 2
});

// Find metadata construction
const metadataBuilder = await mcp_serena.search_for_pattern({
  substring_pattern: "RoutingMetadata|routing.*metadata",
  relative_path: "src/lib/routing"
});

// Analyze indicator usage in admin
const adminUsage = await mcp_serena.search_for_pattern({
  substring_pattern: "RoutingIndicator",
  relative_path: "src/app/admin",
  context_lines_before: 3,
  context_lines_after: 3
});
```

### Context7: UI Component Docs
```typescript
// Get Shadcn Badge variants
const badgeVariants = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "badge default destructive outline secondary",
  mode: "code"
});

// Get tooltip positioning
const tooltipPositioning = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "tooltip side align offset",
  mode: "code"
});

// Color contrast accessibility
const contrastDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "WCAG color contrast accessibility",
  mode: "info"
});
```

### Playwright: Interaction Testing
```typescript
// Test indicator in transaction table
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/admin/transactions"
});

// Verify badge renders
await mcp_playwright.browser_wait_for({ text: "Best Rate" });

// Test hover interaction
const badge = await mcp_playwright.browser_snapshot({});

// Click to open details
await mcp_playwright.browser_click({
  element: "routing badge",
  ref: "routing-indicator-0"
});

// Verify tooltip content
await mcp_playwright.browser_wait_for({ text: "Optimized for lowest fees" });
```

### Chrome: Real-time Preview
```typescript
// Load transaction detail page
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/admin/transactions/txn_123"
});

// Extract routing metadata from page
const routingData = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".routing-metadata",
  payload: "text"
});

// Hover badge to preview tooltip
await mcp_chrome.use_browser({
  action: "click",
  selector: "[role='status']"
});

// Screenshot indicator
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "routing-badge-detail.png"
});
```

### Episodic Memory: Design History
```typescript
// Recall past routing UI iterations
const pastDesigns = await mcp_episodic_memory.search({
  query: ["routing indicator", "badge design", "merchant feedback"],
  mode: "both",
  limit: 5
});

// Find color scheme decisions
const colorDecisions = await mcp_episodic_memory.search({
  query: "routing indicator color accessibility contrast",
  mode: "text"
});
```

---

## Agent Dispatch Patterns

### Routing Logic Consultation
```json
{
  "requesting_agent": "display-routing-indicator",
  "target_agent": "payment-orchestration",
  "request_type": "routing_metadata_schema",
  "payload": {
    "query": "What routing metadata fields are available for display?",
    "context": "Building UI indicator component"
  }
}
```

### UI Architecture
```json
{
  "requesting_agent": "display-routing-indicator",
  "target_agent": "shadcn-ui-architect",
  "request_type": "badge_tooltip_pattern",
  "payload": {
    "query": "Best practice for badge with tooltip in data table",
    "constraints": ["mobile_friendly", "accessible"]
  }
}
```

### Testing Strategy
```json
{
  "requesting_agent": "display-routing-indicator",
  "target_agent": "playwright-testing",
  "request_type": "indicator_test_strategy",
  "payload": {
    "component": "RoutingIndicator",
    "test_scenarios": [
      "all_strategies_render",
      "tooltip_interaction",
      "accessibility_tree"
    ]
  }
}
```

---

## Best Practices

### UX Principles
- **Transparency**: Show routing decisions to build merchant trust
- **Progressive Disclosure**: Badge first, tooltip for details
- **Context-Aware**: Detailed for admin, subtle for end-users
- **Visual Hierarchy**: Color-coded for quick scanning

### Accessibility
- **ARIA Labels**: Descriptive labels for all badges
- **Semantic HTML**: Use role="status" for routing indicators
- **Color Contrast**: WCAG AAA compliance (7:1 ratio)
- **Keyboard Navigation**: Tooltips accessible via keyboard

### Performance
- **Lazy Tooltips**: Only render tooltip content on hover
- **Memoization**: Memoize indicator component to prevent re-renders
- **SVG Icons**: Use Lucide SVG icons for crisp rendering

### Data Integrity
- **Type Safety**: Strong typing for routing metadata
- **Fallback Handling**: Default indicator for unknown strategies
- **Null Safety**: Handle missing routing metadata gracefully

### Testing
- **Visual Regression**: Screenshot each strategy indicator
- **Interaction Testing**: Hover, click, keyboard navigation
- **Accessibility Audit**: Verify ARIA tree structure
- **Mobile Testing**: Test on small viewports

### Documentation
- **Context7**: Always check latest Shadcn/Lucide docs
- **Serena Memory**: Store icon/color mapping for consistency
- **Code Comments**: Document strategy selection rationale
