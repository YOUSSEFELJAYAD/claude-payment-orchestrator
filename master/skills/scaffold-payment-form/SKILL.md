# Skill: Scaffold Payment Form

**Role:** sequential-reasoner (UI Specialist)
**Domain:** UI/UX & Frontend
**Objective:** Construct accessible, PCI-compliant payment forms using comprehensive MCP-powered development workflow with real-time documentation, code analysis, browser testing, and historical context retrieval.

---

## Available Capabilities

### MCP Servers
| Server | Payment Form Usage | Key Operations |
|--------|-------------------|----------------|
| **Serena** | Find existing form components, analyze validation patterns, trace field rendering logic | `find_symbol`, `search_for_pattern`, `get_symbols_overview` |
| **Context7** | Get React Hook Form, Zod, Shadcn UI docs | `resolve_library_id`, `get_library_docs` |
| **Playwright** | Test form validation, submission flows, autofill behavior | `browser_fill_form`, `browser_snapshot`, `browser_wait_for` |
| **Chrome** | Preview forms live, test browser autofill, debug field masking | `use_browser` (navigate, type, screenshot) |
| **Episodic Memory** | Recall past form issues, accessibility fixes, validation patterns | `search`, `read` |

### Superpowers Skills
| Skill | When to Use |
|-------|-------------|
| `superpowers:brainstorming` | Before creating new form components, explore validation approaches |
| `superpowers:test-driven-development` | Write Playwright tests for form before implementing |
| `superpowers:systematic-debugging` | When form validation fails or autofill breaks |
| `superpowers:verification-before-completion` | Verify form works across browsers before finishing |

### Available Agents
| Agent | Dispatch For |
|-------|-------------|
| `frontend-developer` | Complex form state management, custom hooks |
| `shadcn-ui-architect` | Shadcn component patterns, theming |
| `security-auditor` | Verify autoComplete attributes, input sanitization |
| `playwright-testing` | Comprehensive E2E form testing scenarios |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PAYMENT FORM SCAFFOLDING WORKFLOW                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Episodic Memory: Search for past form patterns, validation issues   │
│  ├─ Serena: Find existing PaymentForm components                        │
│  └─ Context7: Get latest React Hook Form + Zod + Shadcn docs            │
│                                                                          │
│  PHASE 2: SCHEMA DESIGN                                                 │
│  ├─ Define Zod schema with Luhn validation                              │
│  ├─ Add expiry date validation (not expired, valid format)              │
│  ├─ CVV validation (3-4 digits based on card type)                      │
│  └─ Cardholder name validation                                          │
│                                                                          │
│  PHASE 3: COMPONENT IMPLEMENTATION                                      │
│  ├─ Initialize useForm with zodResolver                                 │
│  ├─ Render Shadcn FormField components                                  │
│  ├─ Add input masking (card: #### #### #### ####, expiry: ##/##)        │
│  ├─ Configure autoComplete attributes (cc-number, cc-exp, cc-csc)       │
│  ├─ Implement real-time validation on blur                              │
│  └─ Add ARIA labels and error announcements                             │
│                                                                          │
│  PHASE 4: TESTING & VALIDATION                                          │
│  ├─ Playwright: Test form filling, validation triggers                  │
│  ├─ Playwright: Test error states, submission flow                      │
│  ├─ Chrome: Verify browser autofill behavior                            │
│  ├─ Chrome: Screenshot form states (empty, filled, error)               │
│  └─ Serena: Store form decisions in project memory                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery

#### Episodic Memory Integration
```typescript
// Search for past payment form implementations
const formHistory = await mcp_episodic_memory.search({
  query: ["payment form", "card validation", "React Hook Form"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Find accessibility issues we've solved before
const a11yFixes = await mcp_episodic_memory.search({
  query: ["form accessibility", "ARIA labels", "screen reader"],
  mode: "text",
  limit: 5
});
```

#### Serena Code Analysis
```typescript
// Find all existing payment form components
const existingForms = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentForm|CheckoutForm|CardInput",
  substring_matching: true,
  include_body: true,
  depth: 2
});

// Analyze validation schema patterns
const validationSchemas = await mcp_serena.search_for_pattern({
  substring_pattern: "z\\.object.*cardNumber|paymentSchema|luhn",
  relative_path: "src",
  context_lines_before: 2,
  context_lines_after: 2
});

// Find form field component patterns
const formFieldPatterns = await mcp_serena.find_symbol({
  name_path_pattern: "FormField|FormItem|FormControl",
  include_body: true
});

// List all validation utilities
const validators = await mcp_serena.get_symbols_overview({
  relative_path: "src/lib/validation.ts",
  depth: 1
});
```

#### Context7 Documentation Lookup
```typescript
// React Hook Form - Latest patterns
const rhfDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/react-hook-form/react-hook-form",
  topic: "useForm zodResolver validation errors",
  mode: "code"
});

// Zod - Schema refinement and transformation
const zodDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/colinhacks/zod",
  topic: "refine transform custom validation",
  mode: "code"
});

// Shadcn Form components
const shadcnFormDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "form input label error message",
  mode: "code"
});

// Input masking library
const maskDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/sanniassin/react-input-mask",
  topic: "credit card number masking",
  mode: "code"
});
```

---

### Phase 2: Schema Design

#### Payment Form Schema with Comprehensive Validation

```typescript
import { z } from 'zod';

// Luhn algorithm validator
const luhnCheck = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\s/g, '').split('').map(Number);
  const checksum = digits.reduceRight((acc, digit, idx) => {
    if ((digits.length - idx) % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    return acc + digit;
  }, 0);
  return checksum % 10 === 0;
};

// Expiry date validator
const isNotExpired = (expiry: string): boolean => {
  const [month, year] = expiry.split('/');
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  return expiryDate > new Date();
};

// Card type detector
const detectCardType = (cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'unknown' => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  return 'unknown';
};

export const PaymentFormSchema = z.object({
  cardNumber: z.string()
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number must be at most 19 digits")
    .regex(/^[\d\s]+$/, "Card number must contain only digits")
    .transform(val => val.replace(/\s/g, ''))
    .refine(luhnCheck, "Invalid card number"),

  expiry: z.string()
    .regex(/^\d{2}\/\d{2}$/, "Use MM/YY format")
    .refine(isNotExpired, "Card has expired"),

  cvv: z.string()
    .min(3, "CVV must be 3-4 digits")
    .max(4, "CVV must be 3-4 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),

  holderName: z.string()
    .min(2, "Cardholder name is required")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s-']+$/, "Invalid characters in name"),

  billingZip: z.string()
    .min(3, "Postal code required")
    .max(10, "Invalid postal code")
    .optional()
});

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;
```

---

### Phase 3: Component Implementation

#### Shadcn Form Component with All Capabilities

```typescript
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PaymentFormSchema, type PaymentFormData } from '@/lib/validation/payment';

// Input masking utilities
const formatCardNumber = (value: string): string => {
  return value
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
    .slice(0, 19); // Max 16 digits + 3 spaces
};

const formatExpiry = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 5);
};

export function PaymentForm({ onSubmit }: { onSubmit: (data: PaymentFormData) => void }) {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
    mode: 'onBlur',
    defaultValues: {
      cardNumber: '',
      expiry: '',
      cvv: '',
      holderName: '',
      billingZip: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Card Number Field */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    field.onChange(formatted);
                  }}
                  aria-label="Credit card number"
                  aria-describedby={form.formState.errors.cardNumber ? "card-error" : undefined}
                />
              </FormControl>
              <FormMessage id="card-error" />
            </FormItem>
          )}
        />

        {/* Expiry and CVV Row */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      field.onChange(formatted);
                    }}
                    aria-label="Card expiry date"
                    aria-describedby={form.formState.errors.expiry ? "expiry-error" : undefined}
                  />
                </FormControl>
                <FormMessage id="expiry-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    maxLength={4}
                    aria-label="Card security code"
                    aria-describedby={form.formState.errors.cvv ? "cvv-error" : undefined}
                  />
                </FormControl>
                <FormMessage id="cvv-error" />
              </FormItem>
            )}
          />
        </div>

        {/* Cardholder Name */}
        <FormField
          control={form.control}
          name="holderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="cc-name"
                  placeholder="JOHN DOE"
                  aria-label="Name on card"
                  aria-describedby={form.formState.errors.holderName ? "name-error" : undefined}
                />
              </FormControl>
              <FormMessage id="name-error" />
            </FormItem>
          )}
        />

        {/* Billing Postal Code */}
        <FormField
          control={form.control}
          name="billingZip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Postal Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="postal-code"
                  placeholder="12345"
                  aria-label="Billing postal code"
                  aria-describedby={form.formState.errors.billingZip ? "zip-error" : undefined}
                />
              </FormControl>
              <FormMessage id="zip-error" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
          aria-label="Submit payment"
        >
          {form.formState.isSubmitting ? 'Processing...' : 'Pay Now'}
        </Button>
      </form>
    </Form>
  );
}
```

---

### Phase 4: Testing & Validation

#### Playwright E2E Testing

```typescript
// Test 1: Full form validation flow
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Test empty form submission (should show errors)
await mcp_playwright.browser_click({
  element: "Pay Now button",
  ref: "submit-btn"
});

const emptyFormSnapshot = await mcp_playwright.browser_snapshot({});
// Verify error messages appear

// Test 2: Fill valid card details
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card-number", value: "4111 1111 1111 1111" },
    { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "123" },
    { name: "Cardholder", type: "textbox", ref: "name", value: "JOHN DOE" },
    { name: "Postal Code", type: "textbox", ref: "zip", value: "12345" }
  ]
});

// Test 3: Validation on blur
await mcp_playwright.browser_click({ element: "Card Number", ref: "card-number" });
await mcp_playwright.browser_type({ element: "Card Number", ref: "card-number", text: "1234" });
await mcp_playwright.browser_click({ element: "Expiry", ref: "expiry" }); // Blur card field

await mcp_playwright.browser_wait_for({ text: "Invalid card number" });

// Test 4: Invalid Luhn check
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card-number", value: "4111 1111 1111 1112" }
  ]
});
await mcp_playwright.browser_click({ element: "CVV", ref: "cvv" });
await mcp_playwright.browser_wait_for({ text: "Invalid card number" });

// Test 5: Expired card
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Expiry", type: "textbox", ref: "expiry", value: "01/20" }
  ]
});
await mcp_playwright.browser_click({ element: "CVV", ref: "cvv" });
await mcp_playwright.browser_wait_for({ text: "Card has expired" });

// Test 6: Successful submission
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card-number", value: "4111 1111 1111 1111" },
    { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "123" },
    { name: "Cardholder", type: "textbox", ref: "name", value: "JOHN DOE" }
  ]
});

await mcp_playwright.browser_click({ element: "Pay Now", ref: "submit-btn" });
await mcp_playwright.browser_wait_for({ text: "Processing" });

// Screenshot final state
await mcp_playwright.browser_take_screenshot({
  filename: "payment-form-submitted.png",
  fullPage: true
});

// Test 7: Check console for errors
const consoleErrors = await mcp_playwright.browser_console_messages({ level: "error" });
// Verify no console errors during form interaction
```

#### Chrome Browser Testing

```typescript
// Test browser autofill behavior
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Trigger autofill with test data
await mcp_chrome.use_browser({
  action: "type",
  selector: "#card-number",
  payload: "4111111111111111"
});

// Wait for masking to apply
await mcp_chrome.use_browser({
  action: "await_element",
  selector: "#card-number[value*=' ']",
  timeout: 2000
});

// Extract formatted value
const formattedValue = await mcp_chrome.use_browser({
  action: "eval",
  payload: "document.querySelector('#card-number').value"
});
// Should return: "4111 1111 1111 1111"

// Screenshot form with autofilled data
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "autofilled-payment-form.png"
});

// Test different card types
const cardTypes = [
  { number: "4111111111111111", type: "Visa" },
  { number: "5555555555554444", type: "Mastercard" },
  { number: "378282246310005", type: "Amex" }
];

for (const card of cardTypes) {
  await mcp_chrome.use_browser({
    action: "type",
    selector: "#card-number",
    payload: card.number
  });

  await mcp_chrome.use_browser({
    action: "screenshot",
    payload: `card-${card.type.toLowerCase()}.png`
  });
}
```

#### Serena Memory Storage

```typescript
// Store form implementation decisions
await mcp_serena.write_memory({
  memory_file_name: "payment-form-decisions.md",
  content: `
# Payment Form Implementation Decisions

## Validation Strategy
- Using React Hook Form with Zod for schema validation
- Validation triggers on blur for better UX
- Luhn algorithm for card number validation
- Real-time expiry date validation

## Accessibility
- All inputs have proper ARIA labels
- Error messages linked via aria-describedby
- Form submits disabled while processing
- Screen reader announcements for validation errors

## Browser Compatibility
- autoComplete attributes set per HTML spec
- inputMode for mobile keyboard optimization
- Input masking works across Chrome, Safari, Firefox

## Testing Coverage
- Playwright E2E tests for full form flow
- Chrome testing for autofill behavior
- Visual regression tests for form states
  `
});
```

---

## MCP Integration Examples

### Serena: Find Payment Form Components

```typescript
// Find all form components
const formComponents = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentForm",
  include_body: true
});

// Trace validation flow
const validationFlow = await mcp_serena.find_referencing_symbols({
  name_path: "PaymentFormSchema",
  relative_path: "src/lib/validation/payment.ts"
});

// Find input masking utilities
const maskingUtils = await mcp_serena.search_for_pattern({
  substring_pattern: "formatCardNumber|formatExpiry",
  relative_path: "src"
});
```

### Context7: Get Latest Documentation

```typescript
// React Hook Form patterns
const rhfPatterns = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/react-hook-form/react-hook-form",
  topic: "field validation custom errors",
  mode: "code"
});

// Zod refinement examples
const zodRefinement = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/colinhacks/zod",
  topic: "refine custom validation messages",
  mode: "code"
});
```

### Playwright: Comprehensive Form Testing

```typescript
// Test form accessibility
const snapshot = await mcp_playwright.browser_snapshot({});
// Analyze accessibility tree for proper ARIA labels

// Test keyboard navigation
await mcp_playwright.browser_press_key({ key: "Tab" }); // Move to next field
await mcp_playwright.browser_press_key({ key: "Enter" }); // Submit form

// Test mobile viewport
await mcp_playwright.browser_take_screenshot({
  filename: "mobile-payment-form.png",
  fullPage: true
});
```

### Chrome: Live Form Preview

```typescript
// Monitor real-time validation
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Extract error messages
const errors = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".form-error",
  payload: "text"
});
```

### Episodic Memory: Learn from History

```typescript
// Find past form validation issues
const validationIssues = await mcp_episodic_memory.search({
  query: ["payment form", "validation error", "false positive"],
  mode: "both",
  limit: 5
});

// Recall accessibility improvements
const a11yImprovements = await mcp_episodic_memory.search({
  query: "form accessibility ARIA screen reader",
  after: "2024-06-01"
});
```

---

## Agent Dispatch Patterns

### When to Dispatch Specialized Agents

```typescript
// Frontend Developer: Complex form state
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "implement_custom_hook",
  "payload": {
    "task": "Create usePaymentForm hook with multi-step validation",
    "requirements": [
      "Support progressive disclosure",
      "Handle async card type detection",
      "Integrate with payment gateway SDK"
    ]
  }
}

// Shadcn UI Architect: Component styling
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "theme_form_components",
  "payload": {
    "task": "Apply merchant branding to payment form",
    "requirements": [
      "Custom color scheme",
      "Dark mode support",
      "Accessible contrast ratios"
    ]
  }
}

// Security Auditor: Verify security attributes
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "audit_form_security",
  "payload": {
    "task": "Audit payment form for PCI compliance",
    "checks": [
      "Verify autoComplete attributes",
      "Check input sanitization",
      "Validate HTTPS enforcement",
      "Review CSP headers"
    ]
  }
}

// Playwright Testing: E2E test suite
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "generate_e2e_tests",
  "payload": {
    "task": "Create comprehensive payment form test suite",
    "scenarios": [
      "Valid submission flow",
      "All validation error states",
      "Browser autofill behavior",
      "Mobile keyboard interactions"
    ]
  }
}
```

---

## Field Configuration

| Field | autoComplete | inputMode | Pattern | Masking |
|-------|--------------|-----------|---------|---------|
| Card Number | `cc-number` | `numeric` | `[\d\s]{13,19}` | `#### #### #### ####` |
| Expiry | `cc-exp` | `numeric` | `\d{2}/\d{2}` | `##/##` |
| CVV | `cc-csc` | `numeric` | `\d{3,4}` | `###` or `####` |
| Name | `cc-name` | `text` | `[a-zA-Z\s-']+` | None |
| Postal Code | `postal-code` | `text` | Varies by region | None |

---

## Accessibility Requirements

### ARIA Attributes
- All inputs have `aria-label` describing the field
- Error messages linked via `aria-describedby`
- Required fields marked with `aria-required="true"`
- Invalid fields marked with `aria-invalid="true"`

### Screen Reader Support
- Error messages announced on validation
- Submit button state changes announced
- Loading state communicated clearly

### Keyboard Navigation
- Tab order follows visual flow
- Enter key submits form from any field
- Escape key clears errors (if applicable)

---

## Best Practices

### Development Workflow
1. **Documentation First**: Check Context7 for latest library patterns
2. **Code Analysis**: Use Serena to find existing implementations
3. **Historical Context**: Search Episodic Memory for past issues
4. **Test-Driven**: Write Playwright tests before implementation
5. **Live Preview**: Use Chrome to verify autofill behavior
6. **Memory Storage**: Store decisions in Serena memory

### Validation Strategy
- Trigger validation on blur, not on every keystroke
- Show success states (green checkmark) for valid fields
- Clear, actionable error messages
- Disable submit while validation running

### Security
- Correct autoComplete attributes for browser autofill
- inputMode for mobile keyboard optimization
- Never log card numbers or CVV
- Sanitize all input before submission

### Performance
- Debounce validation for expensive checks
- Memoize validation functions
- Lazy-load heavy dependencies

### Testing
- Every form change requires Playwright test update
- Test all validation error states
- Test keyboard navigation flow
- Test mobile viewport behavior
- Verify autofill across browsers
