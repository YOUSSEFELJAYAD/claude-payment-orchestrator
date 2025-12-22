# Skill: Build Payment Link Page

**Role:** sequential-reasoner (Frontend Architect)
**Domain:** UI/UX & Frontend
**Objective:** Assemble high-conversion, mobile-responsive "Pay by Link" pages using comprehensive MCP-powered design workflow with UI documentation, component analysis, conversion testing, and historical UX patterns.

---

## Available Capabilities

### MCP Servers
| Server | Payment Link Usage | Key Operations |
|--------|-------------------|----------------|
| **Serena** | Find payment page layouts, analyze order summary components | `find_symbol`, `search_for_pattern` |
| **Context7** | Get Next.js App Router, Tailwind, Shadcn UI docs | `get_library_docs` |
| **Playwright** | Test mobile/desktop layouts, form submission flows | `browser_navigate`, `browser_take_screenshot` |
| **Chrome** | Preview pages, test responsive breakpoints | `use_browser` |
| **Episodic Memory** | Recall past UX decisions, conversion optimization patterns | `search` |

### Superpowers Skills
| Skill | When to Use |
|-------|-------------|
| `superpowers:brainstorming` | Before designing payment link layout |
| `superpowers:test-driven-development` | Write responsive layout tests first |

### Available Agents
| Agent | Dispatch For |
|-------|-------------|
| `nextjs-developer` | Server-side rendering, dynamic routing |
| `shadcn-ui-architect` | Component theming, design system |
| `frontend-developer` | Complex layouts, animations |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   PAYMENT LINK PAGE WORKFLOW                             │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Episodic Memory: Recall high-converting payment page patterns       │
│  ├─ Serena: Find existing payment link components                       │
│  └─ Context7: Get Next.js dynamic routes, Shadcn layout docs            │
│                                                                          │
│  PHASE 2: LAYOUT DESIGN                                                 │
│  ├─ Desktop: Split screen (Order Summary | Payment Form)                │
│  ├─ Mobile: Single column, sticky payment button                        │
│  ├─ Branding: Dynamic logo, colors from merchant config                 │
│  └─ Components: OrderSummary, PaymentForm, SecureBadge                  │
│                                                                          │
│  PHASE 3: IMPLEMENTATION                                                │
│  ├─ Next.js dynamic route: /pay/[sessionToken]                          │
│  ├─ Server-side: Validate session, fetch order details                  │
│  ├─ Client-side: Render responsive layout with Tailwind                 │
│  └─ Accessibility: Focus management, ARIA labels, skip links            │
│                                                                          │
│  PHASE 4: TESTING                                                       │
│  ├─ Playwright: Test desktop/mobile layouts                             │
│  ├─ Chrome: Verify responsive breakpoints (375px, 768px, 1440px)        │
│  └─ Serena: Store layout decisions in memory                            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## MCP Integration Examples

### Episodic Memory: UX Patterns
```typescript
const uxPatterns = await mcp_episodic_memory.search({
  query: ["payment page", "conversion rate", "mobile checkout"],
  mode: "both",
  limit: 10
});
```

### Serena: Find Components
```typescript
const paymentPages = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentLinkPage|OrderSummary",
  include_body: true
});
```

### Context7: Documentation
```typescript
const nextjsDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "app router dynamic routes server components",
  mode: "code"
});
```

### Playwright: Responsive Testing
```typescript
// Test mobile layout
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/pay/sess_test123"
});

await mcp_playwright.browser_take_screenshot({
  filename: "payment-link-mobile.png",
  fullPage: true
});

// Test desktop layout
await mcp_playwright.browser_take_screenshot({
  filename: "payment-link-desktop.png",
  fullPage: true
});
```

---

## Layout Patterns

### Desktop (≥768px)
- Split screen: 40% order summary (left), 60% payment form (right)
- Fixed order summary, scrollable payment form
- Merchant logo in header
- Trust badges in footer

### Mobile (<768px)
- Single column layout
- Sticky header with amount
- Collapsible order summary
- Sticky "Pay Now" button at bottom

---

## UX Principles

- **Distraction-Free**: No navigation links, focused checkout
- **Auto-Focus**: Card number field on load (desktop only)
- **High Contrast**: Readable in bright light
- **Loading States**: Skeleton screens while fetching order
- **Error Handling**: Clear messages for expired/invalid links

---

## Best Practices

1. **Documentation First**: Check Context7 for Next.js RSC patterns
2. **Code Analysis**: Use Serena to find existing layouts
3. **Historical UX**: Search Episodic Memory for conversion wins
4. **Test Responsive**: Verify all breakpoints with Playwright
5. **Optimize Performance**: Use Next.js Image, lazy loading
6. **Store Decisions**: Document layout choices in Serena memory
