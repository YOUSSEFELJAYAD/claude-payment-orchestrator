# Skill: Frontend Development

**Role:** sequential-reasoner (Frontend Architect)
**Domain:** UI/UX Engineering
**Objective:** Build accessible, performant, responsive user interfaces using React, Next.js, Tailwind CSS, and Shadcn UI with MCP-powered browser testing, component analysis, real-time documentation, and visual development workflows.

## Available Capabilities

### MCP Servers
| Server | Usage in Frontend Development |
|--------|------------------------------|
| **Playwright** | Component testing, visual regression, accessibility audits via snapshots, form validation, responsive testing, user flow verification |
| **Chrome** | Live development preview, responsive design testing, DevTools integration, CSS debugging, performance profiling, network waterfall analysis |
| **Serena** | Find component dependencies, analyze component structure, refactor patterns, generate components following codebase conventions, trace prop flows |
| **Context7** | Get React 19 docs, Next.js App Router patterns, Tailwind CSS utilities, Shadcn UI components, React Hook Form + Zod integration, Zustand state management |
| **Episodic Memory** | Recall UI design decisions, retrieve component patterns, find solutions to similar styling issues, reference accessibility implementations |

### Superpowers Skills
| Skill | When to Invoke |
|-------|----------------|
| `brainstorming` | Before designing component architecture, state management, or complex UI patterns |
| `systematic-debugging` | When investigating rendering issues, state bugs, or hydration errors |
| `test-driven-development` | Before implementing components - write component tests first |
| `verification-before-completion` | After UI changes - verify responsiveness, accessibility, no console errors |
| `writing-plans` | When implementing complex features with multiple components |
| `subagent-driven-development` | For parallel component development (atoms, molecules, organisms) |
| `requesting-code-review` | After implementing critical UI components or state management |

### Specialized Agents
| Agent | When to Dispatch |
|-------|-----------------|
| `code-architect` | Designing component architecture, state management strategy, or design system |
| `code-reviewer` | Reviewing component quality, accessibility, performance, prop types |
| `silent-failure-hunter` | Finding missing error boundaries, uncaught errors, silent failures in async operations |
| `pr-test-analyzer` | Verifying component test coverage and edge cases |

### Other Skills & Tools
- `elements-of-style:writing-clearly-and-concisely` - For component documentation and error messages
- `episodic-memory:remembering-conversations` - For UI pattern decisions
- `dev-browser:dev-browser` - For interactive UI testing
- WebSearch - For latest React patterns, accessibility standards, design trends
- TodoWrite - For tracking component implementation progress

## Logic Flow

```
┌───────────────────────────────────────────────────────────────────────────┐
│                 COMPREHENSIVE FRONTEND DEVELOPMENT FLOW                    │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  PHASE 1: DISCOVERY & DESIGN                                              │
│  ├─ Episodic Memory: Search past component patterns and design decisions  │
│  ├─ Context7: Get latest React, Next.js, Tailwind documentation           │
│  ├─ Serena: Analyze existing components, identify reusable patterns       │
│  ├─ Brainstorming: Design component hierarchy (Atomic Design)             │
│  └─ WebSearch: Latest accessibility standards (WCAG 2.1 AA)               │
│                                                                            │
│  PHASE 2: IMPLEMENTATION                                                  │
│  ├─ TDD: Write component tests first (render, interactions, states)       │
│  ├─ Serena: Generate components following existing patterns               │
│  ├─ Context7: Get Shadcn UI component docs for base components            │
│  ├─ Implement with TypeScript, Tailwind, proper ARIA attributes           │
│  └─ Chrome: Live preview and CSS debugging                                │
│                                                                            │
│  PHASE 3: TESTING & ACCESSIBILITY                                         │
│  ├─ Playwright: Render component, verify all states visible               │
│  ├─ Playwright: Accessibility snapshot - verify ARIA tree                 │
│  ├─ Playwright: Keyboard navigation testing (Tab, Enter, Escape)          │
│  ├─ Playwright: Visual regression - screenshot all states                 │
│  ├─ Playwright: Responsive testing - mobile, tablet, desktop              │
│  └─ Chrome: Check console for React warnings, hydration errors            │
│                                                                            │
│  PHASE 4: VERIFICATION & REVIEW                                           │
│  ├─ Verification skill: Run all tests, no console errors                  │
│  ├─ Code reviewer: Check prop types, accessibility, performance           │
│  ├─ Silent failure hunter: Find missing error boundaries                  │
│  ├─ PR test analyzer: Verify component coverage                           │
│  └─ Serena memory: Store component patterns and decisions                 │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Discovery & Design

```typescript
// 1. Search past UI decisions
const uiPatterns = await mcp_episodic_memory.search({
  query: ["payment form", "component design", "state management"],
  mode: "both",
  limit: 10
});

// 2. Get React 19 and Next.js docs
const reactDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/facebook/react",
  topic: "use hook server actions transitions",
  mode: "code"
});

const nextjsDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "server components client components app router",
  mode: "code"
});

// 3. Get Shadcn UI patterns
const shadcnDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "form dialog sheet command",
  mode: "code"
});

// 4. Analyze existing components with Serena
const existingComponents = await mcp_serena.find_symbol({
  name_path_pattern: "Component|Form|Button",
  relative_path: "src/components",
  substring_matching: true,
  depth: 2
});

// 5. Find component dependencies
const formDeps = await mcp_serena.find_referencing_symbols({
  name_path: "PaymentForm",
  relative_path: "src/components/PaymentForm.tsx"
});
```

### Phase 2: Implementation

```typescript
// Use TDD - write component test first
// Invoke: superpowers:test-driven-development

// Generate PaymentForm component with Serena
await mcp_serena.create_text_file({
  relative_path: "src/components/PaymentForm.tsx",
  content: `'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const PaymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^\d{16}$/, 'Card number must be 16 digits')
    .transform(val => val.replace(/(\d{4})/g, '$1 ').trim()),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Invalid month'),
  expiryYear: z.string().regex(/^\d{2}$/, 'Invalid year'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3-4 digits'),
  amount: z.number().positive('Amount must be positive').max(1000000)
});

type PaymentFormData = z.infer<typeof PaymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  isLoading?: boolean;
}

export function PaymentForm({ onSubmit, isLoading = false }: PaymentFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      amount: 0
    }
  });

  const handleSubmit = async (data: PaymentFormData) => {
    setSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                        aria-label="Card number"
                        aria-required="true"
                        className="pl-10"
                      />
                      <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Month</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="MM"
                          maxLength={2}
                          aria-label="Expiry month"
                          aria-required="true"
                          className="pl-10"
                        />
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Year</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="YY"
                        maxLength={2}
                        aria-label="Expiry year"
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        aria-label="Card security code"
                        aria-required="true"
                        className="pl-10"
                      />
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || submitting}
              aria-busy={isLoading || submitting}
            >
              {isLoading || submitting ? 'Processing...' : 'Pay Now'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}`
});

// Live preview with Chrome
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/payment-form-preview"
});

// Extract computed styles
const styles = await mcp_chrome.use_browser({
  action: "eval",
  payload: "getComputedStyle(document.querySelector('.payment-form')).cssText"
});
```

### Phase 3: Testing & Accessibility

```typescript
// 1. Component render testing
await mcp_playwright.browser_navigate({
  url: "http://localhost:6006/?path=/story/paymentform--default"
});

// 2. Accessibility snapshot
const a11ySnapshot = await mcp_playwright.browser_snapshot({});
// Verify: All form fields have labels, proper ARIA attributes

// 3. Test form interactions
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card-number", value: "4111111111111111" },
    { name: "Expiry Month", type: "textbox", ref: "expiry-month", value: "12" },
    { name: "Expiry Year", type: "textbox", ref: "expiry-year", value: "26" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "123" }
  ]
});

await mcp_playwright.browser_click({ element: "Pay Now", ref: "submit" });

// 4. Test validation errors
await mcp_playwright.browser_navigate({
  url: "http://localhost:6006/?path=/story/paymentform--default"
});

await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card-number", value: "invalid" }
  ]
});

await mcp_playwright.browser_click({ element: "Pay Now", ref: "submit" });
await mcp_playwright.browser_wait_for({ text: "Card number must be 16 digits" });

// 5. Visual regression - all states
const states = ['default', 'loading', 'error', 'success'];
for (const state of states) {
  await mcp_playwright.browser_navigate({
    url: `http://localhost:6006/?path=/story/paymentform--${state}`
  });

  await mcp_playwright.browser_take_screenshot({
    filename: `PaymentForm-${state}.png`,
    fullPage: false
  });
}

// 6. Responsive testing
const viewports = [
  { width: 375, height: 667, name: "mobile" },
  { width: 768, height: 1024, name: "tablet" },
  { width: 1440, height: 900, name: "desktop" }
];

for (const viewport of viewports) {
  await mcp_playwright.browser_resize(viewport);
  await mcp_playwright.browser_take_screenshot({
    filename: `PaymentForm-${viewport.name}.png`
  });
}

// 7. Keyboard navigation
await mcp_playwright.browser_press_key({ key: "Tab" }); // Focus card number
await mcp_playwright.browser_press_key({ key: "Tab" }); // Focus expiry month
await mcp_playwright.browser_press_key({ key: "Tab" }); // Focus expiry year
await mcp_playwright.browser_press_key({ key: "Tab" }); // Focus CVV
await mcp_playwright.browser_press_key({ key: "Tab" }); // Focus submit button
await mcp_playwright.browser_press_key({ key: "Enter" }); // Submit

// 8. Check console errors
const consoleErrors = await mcp_playwright.browser_console_messages({
  level: "error"
});

const reactWarnings = consoleErrors.filter(e =>
  e.includes('Warning:') || e.includes('Hydration')
);

expect(reactWarnings).toHaveLength(0);
```

### Phase 4: Verification & Review

```typescript
// 1. Verification skill
// Invoke: superpowers:verification-before-completion
// Verify: All tests pass, no console errors, responsive works

// 2. Code review
// Dispatch: code-reviewer
// Focus: Accessibility, prop types, performance

// 3. Find silent failures
// Dispatch: silent-failure-hunter
// Focus: Missing error boundaries, uncaught promise rejections

// 4. Store UI patterns
await mcp_serena.write_memory({
  memory_file_name: "ui-component-patterns.md",
  content: `# UI Component Patterns

## Date: ${new Date().toISOString()}

### Component Structure
- Atomic Design: Atoms (Button, Input) → Molecules (FormField) → Organisms (PaymentForm)
- Always use TypeScript with strict prop types
- Export both component and prop types

### Accessibility
- All form fields must have aria-label or associated label
- Interactive elements must be keyboard accessible
- Use semantic HTML (button, not div with onClick)
- Error messages must have aria-live="polite"

### State Management
- Local state: useState for component-specific state
- Form state: React Hook Form + Zod for validation
- Global state: Zustand for cart, session, user preferences
- Server state: TanStack Query for API data

### Styling
- Tailwind CSS for all styling (no CSS modules)
- Shadcn UI for base components
- Use cn() utility to merge class names
- Dark mode support via Tailwind dark: prefix

### Performance
- Server Components by default (mark 'use client' only when needed)
- Dynamic imports for heavy components (charts, editors)
- Image optimization via next/image
- Code splitting at route level
`
});
```

## MCP Integration Examples

See full examples above. Key patterns:

- **Serena**: Find components, generate new components following patterns
- **Context7**: Get React, Next.js, Tailwind, Shadcn docs
- **Playwright**: Component testing, accessibility, visual regression
- **Chrome**: Live preview, CSS debugging, performance profiling
- **Episodic Memory**: Recall UI patterns and design decisions

## Best Practices

### Component Design
- Server Components by default, client components only when needed
- Proper TypeScript types for all props
- Accessibility built in from the start (ARIA, keyboard, focus)
- Responsive design (mobile-first with Tailwind)

### State Management
- Server State: TanStack Query
- Global State: Zustand
- Form State: React Hook Form + Zod
- URL State: nuqs

### Development Workflow
1. Research: Context7 + Episodic Memory + WebSearch
2. Design: Brainstorming + Atomic Design principles
3. Implement: TDD + Serena component generation
4. Preview: Chrome live development
5. Test: Playwright accessibility + visual regression
6. Verify: Verification skill + Code reviewer
7. Document: Store patterns in Serena memory
