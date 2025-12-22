# Skill: Render Expired Link State

**Role:** sequential-reasoner (UX Error State Specialist)
**Domain:** UI/UX & Frontend
**Objective:** Handle expired payment sessions gracefully with empathetic error messaging, clear actions, and comprehensive testing.

---

## Available Capabilities

### MCP Servers

| Server | Purpose | Key Operations |
|--------|---------|----------------|
| **Serena** | Semantic code analysis | Find error page components, trace session validation, analyze error states |
| **Context7** | Real-time documentation | Next.js error handling, UX writing patterns, empathetic error messages |
| **Playwright** | E2E testing | Test error states, user flows from expired links, accessibility |
| **Chrome** | Live browser control | Preview error pages, test different scenarios, user flow |
| **Episodic Memory** | Cross-session context | Past error handling decisions, user feedback on error pages |

### Superpowers Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `superpowers:brainstorming` | Before error page design | Explore empathetic error messaging |
| `superpowers:systematic-debugging` | Error flow bugs | Debug session expiration logic |
| `superpowers:test-driven-development` | Before implementation | Write error state tests |
| `superpowers:verification-before-completion` | Before claiming done | Verify all error scenarios |
| `superpowers:requesting-code-review` | After implementation | Review UX copy and flow |

### Specialized Agents

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React error page implementation |
| `nextjs-developer` | Next.js error handling patterns |
| `playwright-testing` | Error flow testing |
| `code-reviewer` | Review error messaging UX |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXPIRED LINK STATE RENDERING                          │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Context7: Get error page UX patterns                                 │
│  ├─ Serena: Find existing error components                               │
│  ├─ Episodic Memory: Recall error messaging decisions                    │
│  └─ Agent Dispatch: nextjs-developer for error handling                  │
│                                                                           │
│  PHASE 2: DESIGN                                                         │
│  ├─ Brainstorming: Explore empathetic messaging                          │
│  ├─ Error Types: Expired | Already Paid | Not Found | Invalid            │
│  ├─ Visual Design: Neutral colors, clear hierarchy, helpful icons        │
│  └─ Actions: Contact Merchant | Go Home | View Receipt                   │
│                                                                           │
│  PHASE 3: IMPLEMENTATION                                                 │
│  ├─ TDD: Write error state tests                                         │
│  ├─ Build: Error page component with different states                    │
│  ├─ Accessibility: Screen reader friendly, clear focus                   │
│  └─ Copy: Empathetic, non-blaming error messages                         │
│                                                                           │
│  PHASE 4: VERIFICATION                                                   │
│  ├─ Playwright: Test each error scenario                                 │
│  ├─ Chrome: Preview error pages in context                               │
│  ├─ Code Review: UX copy and accessibility check                         │
│  └─ Serena Memory: Document error messaging patterns                     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Research

**Context7 Documentation Lookup**
```typescript
// Next.js error handling
const nextjsErrors = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "error handling not-found error.tsx",
  mode: "code"
});

// UX writing for error messages
const uxWriting = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "error messages user experience empathy",
  mode: "info"
});

// Lucide icons for error states
const iconDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/lucide-icons/lucide",
  topic: "Clock XCircle AlertCircle Link",
  mode: "code"
});

// Shadcn Alert component
const alertDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "alert alert-title alert-description",
  mode: "code"
});
```

**Serena Code Analysis**
```typescript
// Find error page components
const errorPages = await mcp_serena.find_symbol({
  name_path_pattern: "Error|NotFound|Expired|error.tsx|not-found.tsx",
  substring_matching: true,
  include_body: true
});

// Find session validation logic
const sessionValidation = await mcp_serena.search_for_pattern({
  substring_pattern: "expired|isValid|checkSession|410|404",
  relative_path: "src/app",
  context_lines_before: 3,
  context_lines_after: 3
});

// Find error handling utilities
const errorUtils = await mcp_serena.find_symbol({
  name_path_pattern: "getErrorMessage|ErrorBoundary|ErrorPage",
  include_body: true
});

// Analyze redirect logic
const redirects = await mcp_serena.search_for_pattern({
  substring_pattern: "redirect|notFound|permanentRedirect",
  relative_path: "src/app"
});
```

**Episodic Memory Search**
```typescript
// Recall error messaging decisions
const errorDecisions = await mcp_episodic_memory.search({
  query: ["error message", "expired link", "user friendly", "empathetic"],
  mode: "both",
  limit: 10
});

// Find user feedback on error pages
const userFeedback = await mcp_episodic_memory.search({
  query: ["confusing error", "expired link", "what do I do", "dead end"],
  mode: "text",
  after: "2024-01-01"
});

// Recall past error page iterations
const errorHistory = await mcp_episodic_memory.search({
  query: "error page design 410 404 UX improvement",
  mode: "vector"
});
```

### Phase 2: Design & Planning

**Agent Dispatch**
```json
{
  "requesting_agent": "render-expired-link-state",
  "target_agent": "nextjs-developer",
  "request_type": "error_handling_architecture",
  "payload": {
    "query": "Design error page for expired payment links",
    "scenarios": [
      "link_expired",
      "already_paid",
      "not_found",
      "invalid_link"
    ],
    "requirements": {
      "empathetic_copy": true,
      "clear_actions": true,
      "no_dead_ends": true
    }
  }
}
```

**Brainstorming Skill**
```typescript
// Invoke brainstorming for error messaging
// Skill: superpowers:brainstorming
// Explores: Tone (empathetic vs technical), visual design, action hierarchy
```

### Phase 3: Implementation

**Test-Driven Development**
```typescript
// Write tests FIRST
// Skill: superpowers:test-driven-development

describe('ExpiredLinkPage', () => {
  it('should display expired link message', () => {
    render(<ExpiredLinkPage reason="expired" />);

    expect(screen.getByText(/link expired/i)).toBeInTheDocument();
    expect(screen.getByText(/no longer valid/i)).toBeInTheDocument();
  });

  it('should display already paid message', () => {
    render(<ExpiredLinkPage reason="already_paid" paymentId="pay_123" />);

    expect(screen.getByText(/already paid/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view receipt/i })).toBeInTheDocument();
  });

  it('should display not found message', () => {
    render(<ExpiredLinkPage reason="not_found" />);

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument();
  });

  it('should have accessible error message', () => {
    render(<ExpiredLinkPage reason="expired" />);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  it('should provide contact merchant button', () => {
    render(<ExpiredLinkPage reason="expired" merchantEmail="support@merchant.com" />);

    const contactButton = screen.getByRole('link', { name: /contact merchant/i });
    expect(contactButton).toHaveAttribute('href', 'mailto:support@merchant.com');
  });

  it('should not blame user for expired link', () => {
    render(<ExpiredLinkPage reason="expired" />);

    // Should not contain blaming language
    expect(screen.queryByText(/you/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/your error/i)).not.toBeInTheDocument();
  });
});
```

**Implementation Example**
```typescript
import { Clock, CheckCircle, XCircle, Link2Off } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ErrorReason = 'expired' | 'already_paid' | 'not_found' | 'invalid';

interface ExpiredLinkPageProps {
  reason: ErrorReason;
  merchantEmail?: string;
  merchantName?: string;
  paymentId?: string;
}

const errorConfig = {
  expired: {
    icon: Clock,
    title: 'Link Expired',
    description: 'This payment link is no longer valid. Payment links typically expire after 24 hours for security.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  already_paid: {
    icon: CheckCircle,
    title: 'Already Paid',
    description: 'This payment has already been completed. No further action is needed.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  not_found: {
    icon: XCircle,
    title: 'Link Not Found',
    description: 'We couldn\'t find this payment link. It may have been removed or the link might be incorrect.',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  },
  invalid: {
    icon: Link2Off,
    title: 'Invalid Link',
    description: 'This link appears to be broken or incomplete. Please check the link and try again.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  }
} as const;

export default function ExpiredLinkPage({
  reason,
  merchantEmail,
  merchantName = 'the merchant',
  paymentId
}: ExpiredLinkPageProps) {
  const config = errorConfig[reason];
  const Icon = config.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className={`${config.bgColor} p-4 rounded-full`}>
            <Icon className={`w-12 h-12 ${config.color}`} aria-hidden="true" />
          </div>
        </div>

        {/* Error Message */}
        <Alert
          className={`${config.bgColor} ${config.borderColor}`}
          role="alert"
          aria-live="polite"
        >
          <AlertTitle className={`text-lg font-semibold ${config.color}`}>
            {config.title}
          </AlertTitle>
          <AlertDescription className="mt-2 text-gray-700">
            {config.description}
          </AlertDescription>
        </Alert>

        {/* Context-specific information */}
        {reason === 'already_paid' && paymentId && (
          <div className="text-center text-sm text-gray-600">
            <p>Payment ID: <span className="font-mono">{paymentId}</span></p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          {reason === 'already_paid' && paymentId && (
            <Button asChild className="w-full" size="lg">
              <Link href={`/receipt/${paymentId}`}>
                View Receipt
              </Link>
            </Button>
          )}

          {reason === 'expired' && merchantEmail && (
            <Button asChild className="w-full" size="lg">
              <Link href={`mailto:${merchantEmail}?subject=Payment Link Expired`}>
                Contact {merchantName}
              </Link>
            </Button>
          )}

          {(reason === 'not_found' || reason === 'invalid') && (
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/">
                Go Home
              </Link>
            </Button>
          )}

          {merchantEmail && reason !== 'already_paid' && (
            <Button asChild variant="outline" className="w-full">
              <Link href={`mailto:${merchantEmail}`}>
                Contact Support
              </Link>
            </Button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          {reason === 'expired' && (
            <p>
              If you need a new payment link, please contact {merchantName}.
              They can generate a fresh link for you.
            </p>
          )}
          {reason === 'invalid' && (
            <p>
              Double-check the link sent to you or contact support for
              assistance.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Next.js App Router Integration**
```typescript
// app/pay/[id]/page.tsx
import { notFound } from 'next/navigation';
import ExpiredLinkPage from '@/components/ExpiredLinkPage';

export default async function PaymentPage({
  params
}: {
  params: { id: string }
}) {
  const payment = await getPayment(params.id);

  // Payment not found
  if (!payment) {
    return <ExpiredLinkPage reason="not_found" />;
  }

  // Payment already completed
  if (payment.status === 'paid') {
    return (
      <ExpiredLinkPage
        reason="already_paid"
        paymentId={payment.id}
        merchantName={payment.merchant_name}
      />
    );
  }

  // Payment link expired
  if (payment.expires_at < new Date()) {
    return (
      <ExpiredLinkPage
        reason="expired"
        merchantEmail={payment.merchant_email}
        merchantName={payment.merchant_name}
      />
    );
  }

  // Valid payment - render payment form
  return <PaymentForm payment={payment} />;
}
```

**Serena Memory Storage**
```typescript
// Store error messaging patterns
await mcp_serena.write_memory({
  memory_file_name: "error-page-messaging.md",
  content: `
# Error Page Messaging Standards

## Tone Guidelines
- **Empathetic**: Never blame the user
- **Clear**: Explain what happened in simple terms
- **Helpful**: Always provide next steps
- **Honest**: Don't hide behind technical jargon

## Error Types

### Expired Link
- **Title**: "Link Expired"
- **Message**: "This payment link is no longer valid. Payment links typically expire after 24 hours for security."
- **Action**: Contact Merchant button (mailto)
- **Icon**: Clock (orange)

### Already Paid
- **Title**: "Already Paid"
- **Message**: "This payment has already been completed. No further action is needed."
- **Action**: View Receipt button
- **Icon**: CheckCircle (green)

### Not Found
- **Title**: "Link Not Found"
- **Message**: "We couldn't find this payment link. It may have been removed or the link might be incorrect."
- **Action**: Go Home + Contact Support
- **Icon**: XCircle (gray)

### Invalid Link
- **Title**: "Invalid Link"
- **Message**: "This link appears to be broken or incomplete. Please check the link and try again."
- **Action**: Contact Support
- **Icon**: Link2Off (red)

## Visual Design
- Centered layout with max-width 28rem
- Large icon in colored circle background
- Alert component with color-coded borders
- Primary CTA button, secondary outline button
- Help text below actions (gray, smaller)

## Accessibility
- role="alert" on error message
- aria-live="polite" for screen reader announcements
- Clear focus indicators on action buttons
- Semantic HTML hierarchy (h1 for title)
`
});
```

### Phase 4: Testing & Verification

**Playwright Error State Testing**
```typescript
// Test expired link scenario
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/pay/exp_expired_link_id"
});

// Verify expired message
await mcp_playwright.browser_wait_for({ text: "Link Expired" });

// Screenshot expired state
await mcp_playwright.browser_take_screenshot({
  filename: "error-expired-link.png"
});

// Verify contact button present
const snapshot = await mcp_playwright.browser_snapshot({});

// Test contact merchant button
await mcp_playwright.browser_click({
  element: "Contact Merchant",
  ref: "contact-btn"
});

// Test already paid scenario
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/pay/pay_already_paid_id"
});

await mcp_playwright.browser_wait_for({ text: "Already Paid" });

// Screenshot already paid state
await mcp_playwright.browser_take_screenshot({
  filename: "error-already-paid.png"
});

// Verify View Receipt button
await mcp_playwright.browser_wait_for({ text: "View Receipt" });

// Test not found scenario
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/pay/nonexistent_id"
});

await mcp_playwright.browser_wait_for({ text: "Link Not Found" });

// Screenshot not found state
await mcp_playwright.browser_take_screenshot({
  filename: "error-not-found.png"
});

// Test accessibility
const a11ySnapshot = await mcp_playwright.browser_snapshot({});
// Verify role="alert" and aria-live present
```

**Chrome Error Page Preview**
```typescript
// Preview expired link
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/pay/exp_test_expired"
});

// Screenshot error page
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "expired-link-preview.png"
});

// Extract error message
const errorMessage = await mcp_chrome.use_browser({
  action: "extract",
  selector: "[role='alert']",
  payload: "text"
});

// Test mobile view
await mcp_chrome.use_browser({
  action: "eval",
  payload: "window.innerWidth = 375; window.innerHeight = 667;"
});

await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "expired-link-mobile.png"
});

// Verify no dead ends
const links = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    Array.from(document.querySelectorAll('a')).map(a => ({
      text: a.textContent,
      href: a.href
    }))
  `
});
```

**Code Review**
```json
{
  "requesting_agent": "render-expired-link-state",
  "target_agent": "code-reviewer",
  "request_type": "ux_copy_review",
  "payload": {
    "file_path": "src/components/ExpiredLinkPage.tsx",
    "focus_areas": ["error_messaging", "empathy", "clear_actions", "accessibility"]
  }
}
```

**Verification Skill**
```typescript
// Skill: superpowers:verification-before-completion
// Verify:
// ✓ All error scenarios render correctly
// ✓ Error messages are empathetic, not blaming
// ✓ Action buttons are clear and functional
// ✓ No dead ends (always provide way out)
// ✓ Accessibility: role="alert", aria-live
// ✓ Mobile responsive layout
// ✓ Help text provides context
```

---

## MCP Integration Examples

### Serena: Find Error Handling
```typescript
// Find error pages
const errorPages = await mcp_serena.find_symbol({
  name_path_pattern: "error|not-found|ExpiredLinkPage",
  include_body: true
});

// Find session validation
const validation = await mcp_serena.search_for_pattern({
  substring_pattern: "expired|isExpired|checkExpiration",
  relative_path: "src/lib"
});

// Find error utilities
const utils = await mcp_serena.search_for_pattern({
  substring_pattern: "notFound|redirect.*error",
  relative_path: "src/app"
});
```

### Context7: Error Page Docs
```typescript
// Next.js error handling
const nextjsErrors = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "app router error.tsx not-found.tsx",
  mode: "code"
});

// UX writing best practices
const uxDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "error messages empathy user experience",
  mode: "info"
});
```

### Playwright: Error Flows
```typescript
// Test complete error flow
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/pay/expired_link"
});

await mcp_playwright.browser_wait_for({ text: "Link Expired" });
await mcp_playwright.browser_click({ element: "Contact Merchant", ref: "contact" });

// Verify email client opens (mailto link)
```

### Chrome: Visual Preview
```typescript
// Load error page
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/pay/expired"
});

// Extract all text
const pageText = await mcp_chrome.use_browser({
  action: "extract",
  payload: "text"
});

// Screenshot
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "error-page.png"
});
```

### Episodic Memory: Error Messaging History
```typescript
// Recall error page improvements
const improvements = await mcp_episodic_memory.search({
  query: ["error page", "empathetic", "user feedback", "confusing"],
  mode: "both"
});

// Find past copy decisions
const copyDecisions = await mcp_episodic_memory.search({
  query: "error message tone friendly vs technical",
  mode: "text"
});
```

---

## Agent Dispatch Patterns

### Error Page Architecture
```json
{
  "requesting_agent": "render-expired-link-state",
  "target_agent": "nextjs-developer",
  "request_type": "implement_error_pages",
  "payload": {
    "scenarios": ["expired", "already_paid", "not_found", "invalid"],
    "requirements": ["empathetic_copy", "clear_actions", "accessible"]
  }
}
```

### UX Copy Review
```json
{
  "requesting_agent": "render-expired-link-state",
  "target_agent": "code-reviewer",
  "request_type": "review_error_messaging",
  "payload": {
    "file_path": "src/components/ExpiredLinkPage.tsx",
    "focus": ["tone", "clarity", "empathy", "actionability"]
  }
}
```

---

## Best Practices

### UX Writing
- **Never Blame**: Avoid "you" language in error context
- **Be Clear**: Explain what happened in simple terms
- **Be Helpful**: Always provide next steps
- **Be Honest**: Don't hide behind technical jargon

### Visual Design
- **Neutral Colors**: Not "critical red" for all errors
- **Clear Hierarchy**: Title → Description → Actions
- **Helpful Icons**: Visual cues that match error type
- **White Space**: Don't crowd the error page

### Actions
- **Primary CTA**: Most likely user action (prominent button)
- **Secondary CTA**: Alternative action (outline button)
- **No Dead Ends**: Always provide way out (Home, Support)
- **Context-Aware**: "View Receipt" for already paid, etc.

### Accessibility
- **role="alert"**: For error messages
- **aria-live="polite"**: Screen reader announcements
- **Clear Focus**: Visible focus indicators on buttons
- **Semantic HTML**: Proper heading hierarchy

### Testing
- **All Scenarios**: Test each error type
- **Visual Regression**: Screenshot each error state
- **User Flow**: Test complete journey from error to resolution
- **Mobile**: Test on small viewports

### Copy Patterns
- **Expired**: "Link expired" not "Your link expired"
- **Already Paid**: "Payment completed" not "You already paid"
- **Not Found**: "Link not found" not "You entered wrong link"
- **Invalid**: "Link broken" not "You made a mistake"
