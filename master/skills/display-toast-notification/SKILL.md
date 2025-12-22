# Skill: Display Toast Notification

**Role:** sequential-reasoner (UI Feedback Specialist)
**Domain:** UI/UX & Frontend
**Objective:** Provide non-intrusive, accessible feedback using MCP-powered documentation, code analysis, and comprehensive testing.

---

## Available Capabilities

### MCP Servers

| Server | Purpose | Key Operations |
|--------|---------|----------------|
| **Serena** | Semantic code analysis | Find toast implementations, trace notification patterns, analyze timing |
| **Context7** | Real-time documentation | Sonner docs, react-hot-toast patterns, notification UX |
| **Playwright** | E2E testing | Test toast appearance/dismissal, timing verification, stacking behavior |
| **Chrome** | Live browser control | Preview toast notifications, test timing, monitor DOM updates |
| **Episodic Memory** | Cross-session context | Past toast patterns, user feedback, timing decisions |

### Superpowers Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `superpowers:brainstorming` | Before toast design | Explore notification patterns |
| `superpowers:systematic-debugging` | Toast bugs | Debug timing/positioning issues |
| `superpowers:test-driven-development` | Before implementation | Write toast tests first |
| `superpowers:verification-before-completion` | Before claiming done | Verify toast behavior |
| `superpowers:requesting-code-review` | After implementation | Review accessibility |

### Specialized Agents

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React toast implementation |
| `shadcn-ui-architect` | Sonner integration patterns |
| `playwright-testing` | Toast interaction testing |
| `code-reviewer` | Review UX/accessibility |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    TOAST NOTIFICATION FLOW                               │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Context7: Get Sonner/react-hot-toast docs                            │
│  ├─ Serena: Find existing toast usage patterns                           │
│  ├─ Episodic Memory: Recall toast timing decisions                       │
│  └─ Agent Dispatch: frontend-developer for toast architecture            │
│                                                                           │
│  PHASE 2: DESIGN                                                         │
│  ├─ Brainstorming: Explore notification strategy                         │
│  ├─ Define Types: SUCCESS | ERROR | LOADING | INFO | WARNING             │
│  ├─ Timing: Auto-dismiss durations, manual close                         │
│  └─ Positioning: Bottom-right (desktop), top-center (mobile)             │
│                                                                           │
│  PHASE 3: IMPLEMENTATION                                                 │
│  ├─ TDD: Write toast rendering/timing tests                              │
│  ├─ Build: Sonner provider + toast() calls                               │
│  ├─ Accessibility: aria-live regions, screen reader support              │
│  └─ Promise Handling: toast.promise() for async operations               │
│                                                                           │
│  PHASE 4: VERIFICATION                                                   │
│  ├─ Playwright: Test appearance, dismissal, stacking                     │
│  ├─ Chrome: Verify timing, position, mobile behavior                     │
│  ├─ Code Review: Check accessibility patterns                            │
│  └─ Serena Memory: Document toast duration standards                     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Research

**Context7 Documentation Lookup**
```typescript
// Sonner toast library (recommended)
const sonnerDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/emilkowalski/sonner",
  topic: "toast success error loading promise",
  mode: "code"
});

// React Hot Toast alternative
const hotToastDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/timolins/react-hot-toast",
  topic: "toast custom duration position",
  mode: "code"
});

// Shadcn toast integration
const shadcnToastDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "toast sonner toaster",
  mode: "code"
});

// Accessibility best practices
const a11yDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "aria-live role=alert status",
  mode: "info"
});
```

**Serena Code Analysis**
```typescript
// Find toast usage throughout app
const toastUsage = await mcp_serena.search_for_pattern({
  substring_pattern: "toast\\.|toast\\(|useToast",
  relative_path: "src",
  context_lines_before: 2,
  context_lines_after: 2
});

// Find toast configuration/provider
const toastConfig = await mcp_serena.find_symbol({
  name_path_pattern: "Toaster|ToastProvider|ToastContainer",
  include_body: true
});

// Find promise toast patterns
const promiseToasts = await mcp_serena.search_for_pattern({
  substring_pattern: "toast\\.promise",
  relative_path: "src"
});

// Analyze error handling with toasts
const errorToasts = await mcp_serena.search_for_pattern({
  substring_pattern: "toast\\.error|toast.*error",
  relative_path: "src",
  context_lines_before: 3
});
```

**Episodic Memory Search**
```typescript
// Recall toast timing decisions
const timingDecisions = await mcp_episodic_memory.search({
  query: ["toast duration", "too fast", "dismissal timing"],
  mode: "both",
  limit: 10
});

// Find user feedback on notifications
const userFeedback = await mcp_episodic_memory.search({
  query: ["notification annoying", "toast position", "mobile toast"],
  mode: "text",
  after: "2024-01-01"
});

// Recall accessibility improvements
const a11yImprovements = await mcp_episodic_memory.search({
  query: "toast screen reader aria-live announcement",
  mode: "vector"
});
```

### Phase 2: Design & Planning

**Agent Dispatch**
```json
{
  "requesting_agent": "display-toast-notification",
  "target_agent": "frontend-developer",
  "request_type": "toast_architecture",
  "payload": {
    "query": "Design toast notification system for payment app",
    "requirements": {
      "library": "sonner",
      "accessibility": true,
      "mobile_friendly": true,
      "promise_support": true
    }
  }
}
```

**Brainstorming Skill**
```typescript
// Invoke brainstorming for notification strategy
// Skill: superpowers:brainstorming
// Explores: Toast vs modal, timing, positioning, stacking limits
```

### Phase 3: Implementation

**Test-Driven Development**
```typescript
// Write tests FIRST
// Skill: superpowers:test-driven-development

describe('Toast Notifications', () => {
  it('should display success toast on payment completion', async () => {
    render(<PaymentForm />);

    fireEvent.click(screen.getByRole('button', { name: /pay/i }));

    await waitFor(() => {
      expect(screen.getByText(/payment successful/i)).toBeInTheDocument();
    });

    // Verify toast has success styling
    const toast = screen.getByRole('status');
    expect(toast).toHaveClass('toast-success');
  });

  it('should display error toast on payment failure', async () => {
    server.use(
      http.post('/api/payments', () => {
        return HttpResponse.json({ error: 'Card declined' }, { status: 400 });
      })
    );

    render(<PaymentForm />);
    fireEvent.click(screen.getByRole('button', { name: /pay/i }));

    await waitFor(() => {
      expect(screen.getByText(/card declined/i)).toBeInTheDocument();
    });
  });

  it('should auto-dismiss after specified duration', async () => {
    render(<TestToast />);

    const toast = screen.getByText('Test message');
    expect(toast).toBeInTheDocument();

    // Wait for auto-dismiss (4s default)
    await waitFor(() => {
      expect(toast).not.toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('should stack multiple toasts', () => {
    const { rerender } = render(<App />);

    toast('First message');
    toast('Second message');
    toast('Third message');

    expect(screen.getAllByRole('status')).toHaveLength(3);
  });

  it('should announce to screen readers', () => {
    render(<App />);

    toast.success('Payment complete');

    const liveRegion = screen.getByRole('status', {
      name: /payment complete/i
    });
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
  });
});
```

**Implementation Example**
```typescript
import { Toaster, toast } from 'sonner';

// Provider setup (in root layout)
export function RootLayout({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        expand={true}
        richColors={true}
        closeButton={true}
      />
    </>
  );
}

// Usage examples
export function PaymentForm() {
  const handlePayment = async (data: PaymentData) => {
    // Loading toast with promise
    const paymentPromise = processPayment(data);

    toast.promise(paymentPromise, {
      loading: 'Processing payment...',
      success: (result) => `Payment successful! Ref: ${result.id}`,
      error: (err) => err.message || 'Payment failed',
      duration: 4000,
    });

    try {
      const result = await paymentPromise;
      // Success toast shown automatically
      return result;
    } catch (error) {
      // Error toast shown automatically
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(handlePayment)}>
      {/* form fields */}
    </form>
  );
}

// Manual toast types
export function usePaymentToasts() {
  return {
    success: (message: string) => {
      toast.success(message, {
        duration: 4000,
        icon: '✓',
      });
    },

    error: (message: string) => {
      toast.error(message, {
        duration: 6000, // Longer for errors
        icon: '✕',
      });
    },

    loading: (message: string) => {
      return toast.loading(message); // Returns ID for dismissal
    },

    info: (message: string) => {
      toast.info(message, {
        duration: 4000,
        icon: 'ℹ',
      });
    },

    warning: (message: string) => {
      toast.warning(message, {
        duration: 5000,
        icon: '⚠',
      });
    },

    dismiss: (toastId?: string | number) => {
      toast.dismiss(toastId); // Dismiss specific or all toasts
    },
  };
}
```

**Serena Memory Storage**
```typescript
// Store toast duration standards
await mcp_serena.write_memory({
  memory_file_name: "toast-notification-standards.md",
  content: `
# Toast Notification Standards

## Duration Guidelines
- Success: 4000ms (4s)
- Error: 6000ms (6s) - longer for users to read/screenshot
- Loading: Until resolved (no timeout)
- Info: 4000ms (4s)
- Warning: 5000ms (5s)

## Positioning
- Desktop: bottom-right (less intrusive)
- Mobile: top-center (easier to reach for manual dismiss)

## Stacking
- Max visible: 3 toasts
- Older toasts auto-dismiss when limit reached

## Accessibility
- Use aria-live="polite" for non-critical messages
- Use role="alert" for errors
- Include close button for keyboard users
- Screen reader announcements enabled

## Promise Pattern
Always use toast.promise() for async operations:
- Shows loading state immediately
- Automatically transitions to success/error
- Better UX than manual state management
`
});
```

### Phase 4: Testing & Verification

**Playwright Toast Testing**
```typescript
// Test success toast appearance
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card", type: "textbox", ref: "card", value: "4111111111111111" },
    { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "123" }
  ]
});

await mcp_playwright.browser_click({
  element: "Pay",
  ref: "submit-btn"
});

// Wait for success toast
await mcp_playwright.browser_wait_for({ text: "Payment Successful" });

// Screenshot toast
await mcp_playwright.browser_take_screenshot({
  filename: "toast-success.png"
});

// Verify toast auto-dismisses
await mcp_playwright.browser_wait_for({
  textGone: "Payment Successful",
  timeout: 6000
});

// Test error toast
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card", type: "textbox", ref: "card", value: "4000000000000002" }
  ]
});

await mcp_playwright.browser_click({
  element: "Pay",
  ref: "submit-btn"
});

await mcp_playwright.browser_wait_for({ text: "Declined" });

// Screenshot error toast
await mcp_playwright.browser_take_screenshot({
  filename: "toast-error.png"
});

// Test manual dismissal
await mcp_playwright.browser_click({
  element: "Close button",
  ref: "toast-close"
});

await mcp_playwright.browser_wait_for({ textGone: "Declined" });

// Test accessibility tree
const snapshot = await mcp_playwright.browser_snapshot({});
// Verify aria-live regions present
```

**Chrome Live Testing**
```typescript
// Navigate to payment page
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Trigger toast via console for testing
await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    toast.success('Test success message', { duration: 4000 });
  `
});

// Screenshot toast
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "toast-preview.png"
});

// Test mobile positioning
await mcp_chrome.use_browser({
  action: "eval",
  payload: "window.innerWidth = 375; window.innerHeight = 667;"
});

await mcp_chrome.use_browser({
  action: "eval",
  payload: `toast.error('Mobile error test');`
});

// Verify mobile position
const toastPosition = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    const toast = document.querySelector('[data-sonner-toast]');
    const rect = toast.getBoundingClientRect();
    return { top: rect.top, left: rect.left };
  `
});

// Test stacking behavior
await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    toast('First');
    toast('Second');
    toast('Third');
    toast('Fourth'); // Should start dismissing earlier toasts
  `
});

const toastCount = await mcp_chrome.use_browser({
  action: "eval",
  payload: "document.querySelectorAll('[data-sonner-toast]').length"
});
```

**Code Review**
```json
{
  "requesting_agent": "display-toast-notification",
  "target_agent": "code-reviewer",
  "request_type": "accessibility_review",
  "payload": {
    "file_path": "src/components/Toaster.tsx",
    "focus_areas": ["aria_live", "keyboard_dismissal", "screen_reader_support"]
  }
}
```

**Verification Skill**
```typescript
// Skill: superpowers:verification-before-completion
// Verify:
// ✓ All toast types render correctly
// ✓ Auto-dismiss timing works
// ✓ Manual dismissal (close button) works
// ✓ Stacking behavior correct (max 3)
// ✓ Screen reader announcements work
// ✓ Mobile positioning correct
// ✓ Promise pattern works for async ops
```

---

## MCP Integration Examples

### Serena: Find Toast Patterns
```typescript
// Find all toast calls
const toastCalls = await mcp_serena.search_for_pattern({
  substring_pattern: "toast\\.",
  relative_path: "src"
});

// Find toast configuration
const config = await mcp_serena.find_symbol({
  name_path_pattern: "Toaster",
  include_body: true
});

// Find custom toast hooks
const hooks = await mcp_serena.search_for_pattern({
  substring_pattern: "useToast|useNotification",
  relative_path: "src/hooks"
});
```

### Context7: Library Docs
```typescript
// Sonner API reference
const sonnerAPI = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/emilkowalski/sonner",
  topic: "toast options duration position action",
  mode: "code"
});

// Accessibility patterns
const a11yPatterns = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "notifications toast aria-live best practices",
  mode: "info"
});
```

### Playwright: Timing Tests
```typescript
// Test auto-dismiss timing
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/test-toast"
});

const startTime = Date.now();

await mcp_playwright.browser_click({
  element: "Show toast",
  ref: "trigger-btn"
});

await mcp_playwright.browser_wait_for({ text: "Test message" });

// Wait for dismissal
await mcp_playwright.browser_wait_for({ textGone: "Test message" });

const duration = Date.now() - startTime;
// Should be ~4000ms
```

### Chrome: Visual Preview
```typescript
// Test all toast types
const types = ['success', 'error', 'loading', 'info', 'warning'];

for (const type of types) {
  await mcp_chrome.use_browser({
    action: "eval",
    payload: `toast.${type}('${type} message');`
  });

  await mcp_chrome.use_browser({
    action: "screenshot",
    payload: `toast-${type}.png`
  });

  // Dismiss before next
  await mcp_chrome.use_browser({
    action: "eval",
    payload: "toast.dismiss();"
  });
}
```

### Episodic Memory: Past Decisions
```typescript
// Recall toast timing discussions
const timingHistory = await mcp_episodic_memory.search({
  query: ["toast too fast", "error duration", "auto-dismiss"],
  mode: "both"
});

// Find UX feedback
const uxFeedback = await mcp_episodic_memory.search({
  query: "toast notification user complaint annoying",
  mode: "text"
});
```

---

## Agent Dispatch Patterns

### Toast Architecture
```json
{
  "requesting_agent": "display-toast-notification",
  "target_agent": "frontend-developer",
  "request_type": "implement_toast_system",
  "payload": {
    "library": "sonner",
    "features": ["promise_support", "stacking", "accessibility"]
  }
}
```

### Accessibility Review
```json
{
  "requesting_agent": "display-toast-notification",
  "target_agent": "code-reviewer",
  "request_type": "a11y_audit",
  "payload": {
    "component": "Toaster",
    "focus": ["screen_reader", "keyboard_nav", "aria_labels"]
  }
}
```

---

## Best Practices

### UX Principles
- **Non-intrusive**: Bottom-right positioning on desktop
- **Contextual Duration**: Errors longer than success
- **Progressive Disclosure**: Important info first, details in action button
- **Stacking Limits**: Max 3 visible toasts
- **Manual Override**: Always include close button

### Accessibility
- **aria-live**: Use "polite" for info/success, "assertive" for errors
- **role="alert"**: For critical error messages
- **Keyboard Dismissal**: Close button must be keyboard accessible
- **Screen Reader**: Ensure messages announced clearly

### Performance
- **Portal Rendering**: Render toasts in portal to avoid layout shifts
- **Lazy Mounting**: Only mount Toaster when first toast appears
- **Animation**: Use CSS transforms for smooth entrance/exit

### Error Handling
- **Clear Messages**: Specific, actionable error messages
- **Action Buttons**: Provide retry/contact support options
- **Longer Duration**: 6s for errors vs 4s for success

### Promise Pattern
- **Async Operations**: Always use toast.promise() for async work
- **State Transitions**: Loading → Success/Error automatically
- **User Feedback**: Immediate loading state improves perceived performance

### Mobile Optimization
- **Top-center**: Easier to reach for manual dismissal
- **Touch Target**: Minimum 44x44px close button
- **Swipe Dismiss**: Support swipe to dismiss on mobile

### Testing
- **Visual Regression**: Screenshot each toast type
- **Timing Tests**: Verify auto-dismiss durations
- **Stacking Tests**: Test max toast limit
- **Accessibility**: Verify screen reader announcements
