# Skill: Validate Card Input UI

**Role:** sequential-reasoner (Form Validation Specialist)
**Domain:** UI/UX & Frontend
**Objective:** Provide real-time card validation feedback with comprehensive MCP integration, accessibility-first design, and thorough testing.

---

## Available Capabilities

### MCP Servers

| Server | Purpose | Key Operations |
|--------|---------|----------------|
| **Serena** | Semantic code analysis | Find validation components, trace Luhn algorithm, analyze input masking |
| **Context7** | Real-time documentation | React Hook Form docs, Zod validation, input masking libraries |
| **Playwright** | E2E testing | Test validation behavior, error states, brand detection |
| **Chrome** | Live browser control | Preview card inputs, test validation timing, inspect DOM |
| **Episodic Memory** | Cross-session context | Past validation patterns, UX decisions, performance fixes |

### Superpowers Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `superpowers:brainstorming` | Before validation design | Explore validation UX approach |
| `superpowers:systematic-debugging` | Validation bugs | Debug Luhn/masking issues |
| `superpowers:test-driven-development` | Before implementation | Write validation tests |
| `superpowers:verification-before-completion` | Before claiming done | Verify all validation scenarios |
| `superpowers:requesting-code-review` | After implementation | Review validation logic |

### Specialized Agents

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React form implementation |
| `shadcn-ui-architect` | Shadcn Input integration |
| `playwright-testing` | Input validation testing |
| `code-reviewer` | Review validation performance |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CARD INPUT VALIDATION                                 │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Context7: Get input masking patterns                                 │
│  ├─ Serena: Find existing validation logic                               │
│  ├─ Episodic Memory: Recall validation patterns                          │
│  └─ Agent Dispatch: frontend-developer for form architecture             │
│                                                                           │
│  PHASE 2: DESIGN                                                         │
│  ├─ Brainstorming: Explore real-time validation UX                       │
│  ├─ Validation Steps: Format → Length → Luhn → BIN Detection             │
│  ├─ Visual Feedback: Brand logo, green check, red error                  │
│  └─ Timing: Validate on blur, format on type                             │
│                                                                           │
│  PHASE 3: IMPLEMENTATION                                                 │
│  ├─ TDD: Write validation tests                                          │
│  ├─ Build: React Hook Form + Zod + masking                               │
│  ├─ Luhn Algorithm: Mod-10 checksum validation                           │
│  └─ BIN Detection: First 6 digits → card brand                           │
│                                                                           │
│  PHASE 4: VERIFICATION                                                   │
│  ├─ Playwright: Test valid/invalid cards                                 │
│  ├─ Chrome: Test masking, brand detection                                │
│  ├─ Code Review: Check validation performance                            │
│  └─ Serena Memory: Document validation patterns                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Research

**Context7 Documentation Lookup**
```typescript
// React Hook Form validation
const rhfDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/react-hook-form/react-hook-form",
  topic: "register validation errors setError",
  mode: "code"
});

// Zod card validation schemas
const zodDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/colinhacks/zod",
  topic: "string refine custom validation",
  mode: "code"
});

// Input masking library
const maskDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/sanniassin/react-input-mask",
  topic: "credit card mask format",
  mode: "code"
});

// Shadcn Input component
const inputDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "input form label error",
  mode: "code"
});
```

**Serena Code Analysis**
```typescript
// Find card input components
const cardInputs = await mcp_serena.find_symbol({
  name_path_pattern: "CardInput|CardNumber|CreditCard",
  substring_matching: true,
  include_body: true
});

// Find Luhn validation implementation
const luhnCheck = await mcp_serena.search_for_pattern({
  substring_pattern: "luhn|mod.*10|checksum|validateCard",
  relative_path: "src/lib",
  context_lines_before: 2,
  context_lines_after: 5
});

// Find BIN detection logic
const binDetection = await mcp_serena.search_for_pattern({
  substring_pattern: "BIN|cardBrand|detectBrand|getCardType",
  relative_path: "src/lib"
});

// Find validation schemas
const validationSchemas = await mcp_serena.find_symbol({
  name_path_pattern: "cardSchema|paymentSchema|validation",
  include_body: true
});
```

**Episodic Memory Search**
```typescript
// Recall card validation patterns
const validationHistory = await mcp_episodic_memory.search({
  query: ["card validation", "Luhn algorithm", "real-time validation"],
  mode: "both",
  limit: 10
});

// Find UX decisions on validation timing
const uxDecisions = await mcp_episodic_memory.search({
  query: ["validate on blur", "validate on type", "user frustration"],
  mode: "text",
  after: "2024-01-01"
});

// Recall performance issues
const perfIssues = await mcp_episodic_memory.search({
  query: "card input slow validation debounce",
  mode: "vector"
});
```

### Phase 2: Design & Planning

**Agent Dispatch**
```json
{
  "requesting_agent": "validate-card-input-ui",
  "target_agent": "frontend-developer",
  "request_type": "card_validation_architecture",
  "payload": {
    "query": "Design real-time card validation with Luhn check and BIN detection",
    "requirements": {
      "library": "react-hook-form",
      "validation": "zod",
      "masking": true,
      "brand_detection": true,
      "realtime_feedback": true
    }
  }
}
```

**Brainstorming Skill**
```typescript
// Invoke brainstorming for validation UX
// Skill: superpowers:brainstorming
// Explores: Validation timing, error messaging, visual feedback, brand logos
```

### Phase 3: Implementation

**Test-Driven Development**
```typescript
// Write tests FIRST
// Skill: superpowers:test-driven-development

describe('CardInput Validation', () => {
  it('should format card number with spaces', () => {
    render(<CardInput />);
    const input = screen.getByLabelText(/card number/i);

    fireEvent.change(input, { target: { value: '4111111111111111' } });

    expect(input).toHaveValue('4111 1111 1111 1111');
  });

  it('should detect Visa card brand', async () => {
    render(<CardInput />);
    const input = screen.getByLabelText(/card number/i);

    fireEvent.change(input, { target: { value: '4111' } });

    await waitFor(() => {
      expect(screen.getByAltText(/visa/i)).toBeInTheDocument();
    });
  });

  it('should validate correct Luhn checksum', async () => {
    render(<CardInput />);
    const input = screen.getByLabelText(/card number/i);

    fireEvent.change(input, { target: { value: '4111111111111111' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
    });
  });

  it('should show error for invalid Luhn checksum', async () => {
    render(<CardInput />);
    const input = screen.getByLabelText(/card number/i);

    fireEvent.change(input, { target: { value: '4111111111111112' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText(/invalid card number/i)).toBeInTheDocument();
    });
  });

  it('should show error for incomplete card number', async () => {
    render(<CardInput />);
    const input = screen.getByLabelText(/card number/i);

    fireEvent.change(input, { target: { value: '4111 11' } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText(/incomplete/i)).toBeInTheDocument();
    });
  });

  it('should be accessible with aria-describedby for errors', () => {
    render(<CardInput />);
    const input = screen.getByLabelText(/card number/i);

    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.blur(input);

    expect(input).toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
```

**Implementation Example**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

// Luhn algorithm implementation
function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// BIN detection
type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

function detectCardBrand(cardNumber: string): CardBrand {
  const digits = cardNumber.replace(/\D/g, '');

  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^6(?:011|5)/.test(digits)) return 'discover';

  return 'unknown';
}

// Zod validation schema
const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Card number is required')
    .transform(val => val.replace(/\s/g, ''))
    .refine(val => val.length >= 13 && val.length <= 19, {
      message: 'Card number must be between 13-19 digits'
    })
    .refine(val => /^\d+$/.test(val), {
      message: 'Card number must contain only digits'
    })
    .refine(luhnCheck, {
      message: 'Invalid card number'
    })
});

export function CardInput() {
  const [cardBrand, setCardBrand] = useState<CardBrand>('unknown');
  const {
    register,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(cardSchema),
    mode: 'onBlur'
  });

  const cardNumber = watch('cardNumber');

  // Format card number with spaces as user types
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const brand = detectCardBrand(digits);
    setCardBrand(brand);

    // Amex: 4-6-5 format, Others: 4-4-4-4
    if (brand === 'amex') {
      return digits.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, g1, g2, g3) => {
        let result = g1;
        if (g2) result += ` ${g2}`;
        if (g3) result += ` ${g3}`;
        return result;
      });
    } else {
      return digits.match(/.{1,4}/g)?.join(' ') || digits;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="cardNumber">
        Card Number
      </Label>
      <div className="relative">
        <Input
          id="cardNumber"
          {...register('cardNumber')}
          type="text"
          inputMode="numeric"
          pattern="[0-9\s]*"
          autoComplete="cc-number"
          placeholder="4111 1111 1111 1111"
          maxLength={19}
          onChange={(e) => {
            e.target.value = formatCardNumber(e.target.value);
          }}
          aria-invalid={!!errors.cardNumber}
          aria-describedby={errors.cardNumber ? 'card-error' : undefined}
          className={errors.cardNumber ? 'border-red-500' : ''}
        />

        {/* Card brand logo */}
        {cardBrand !== 'unknown' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <img
              src={`/card-brands/${cardBrand}.svg`}
              alt={cardBrand}
              className="h-6 w-auto"
            />
          </div>
        )}

        {/* Validation checkmark */}
        {cardNumber && !errors.cardNumber && cardNumber.length >= 13 && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        )}
      </div>

      {/* Error message */}
      {errors.cardNumber && (
        <p id="card-error" className="text-sm text-red-600">
          {errors.cardNumber.message}
        </p>
      )}
    </div>
  );
}
```

**Serena Memory Storage**
```typescript
// Store validation patterns
await mcp_serena.write_memory({
  memory_file_name: "card-validation-patterns.md",
  content: `
# Card Validation Patterns

## Luhn Algorithm (Mod-10 Checksum)
1. Start from rightmost digit
2. Double every second digit
3. If doubled digit > 9, subtract 9
4. Sum all digits
5. Valid if sum % 10 === 0

## BIN Detection (First 6 digits)
- Visa: Starts with 4
- Mastercard: 51-55 or 2221-2720
- Amex: 34 or 37
- Discover: 6011 or 65

## Formatting
- Visa/MC/Discover: 4-4-4-4
- Amex: 4-6-5
- Use inputMode="numeric" and pattern="[0-9\s]*"

## Validation Timing
- Format: onChange (immediate)
- Luhn Check: onBlur (avoid interrupting typing)
- Brand Detection: onChange (as soon as BIN entered)

## Error Messages
- Empty: "Card number is required"
- Too Short: "Card number incomplete"
- Invalid Luhn: "Invalid card number"
- Non-numeric: "Only digits allowed"

## Accessibility
- Use aria-invalid for error state
- Link error message with aria-describedby
- Announce errors to screen readers
- Clear focus indicators
`
});
```

### Phase 4: Testing & Verification

**Playwright Card Validation Testing**
```typescript
// Test valid Visa card
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

await mcp_playwright.browser_type({
  element: "Card Number",
  ref: "card-input",
  text: "4111111111111111",
  slowly: true
});

// Verify brand logo appears
await mcp_playwright.browser_wait_for({ time: 0.5 });

const snapshot = await mcp_playwright.browser_snapshot({});
// Should show Visa logo

// Screenshot valid state
await mcp_playwright.browser_take_screenshot({
  filename: "card-valid-visa.png"
});

// Test invalid Luhn
await mcp_playwright.browser_type({
  element: "Card Number",
  ref: "card-input",
  text: "4111111111111112"  // Invalid
});

// Trigger blur to validate
await mcp_playwright.browser_click({
  element: "Expiry",
  ref: "expiry-input"
});

// Wait for error message
await mcp_playwright.browser_wait_for({ text: "Invalid card number" });

// Screenshot error state
await mcp_playwright.browser_take_screenshot({
  filename: "card-invalid-luhn.png"
});

// Test Mastercard detection
await mcp_playwright.browser_type({
  element: "Card Number",
  ref: "card-input",
  text: "5555555555554444"
});

await mcp_playwright.browser_wait_for({ time: 0.5 });

// Verify Mastercard logo
const mcSnapshot = await mcp_playwright.browser_snapshot({});

// Test Amex formatting (4-6-5)
await mcp_playwright.browser_type({
  element: "Card Number",
  ref: "card-input",
  text: "378282246310005"
});

// Verify Amex formatting
const amexValue = await mcp_playwright.browser_evaluate({
  function: `() => document.querySelector('[data-testid="card-input"]').value`
});
// Should be: "3782 822463 10005"
```

**Chrome Live Testing**
```typescript
// Navigate to checkout
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Type card number
await mcp_chrome.use_browser({
  action: "type",
  selector: "#cardNumber",
  payload: "4111111111111111"
});

// Check brand detection
const brand = await mcp_chrome.use_browser({
  action: "eval",
  payload: `document.querySelector('img[alt]').alt`
});

// Screenshot card input
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "card-input-visa.png"
});

// Test validation timing
const validationTime = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    const start = performance.now();
    const input = document.querySelector('#cardNumber');
    input.value = '4111111111111112';
    input.dispatchEvent(new Event('blur'));
    const end = performance.now();
    end - start;
  `
});
```

**Code Review**
```json
{
  "requesting_agent": "validate-card-input-ui",
  "target_agent": "code-reviewer",
  "request_type": "validation_logic_review",
  "payload": {
    "file_path": "src/components/CardInput.tsx",
    "focus_areas": ["luhn_algorithm", "performance", "accessibility"]
  }
}
```

**Verification Skill**
```typescript
// Skill: superpowers:verification-before-completion
// Verify:
// ✓ Luhn algorithm works correctly
// ✓ Brand detection accurate (Visa, MC, Amex, Discover)
// ✓ Formatting correct (4-4-4-4 or 4-6-5)
// ✓ Real-time feedback doesn't interrupt typing
// ✓ Error messages clear and helpful
// ✓ Accessibility: aria-invalid, aria-describedby
// ✓ Performance: <100ms validation
```

---

## MCP Integration Examples

### Serena: Find Validation Logic
```typescript
// Find Luhn implementations
const luhn = await mcp_serena.search_for_pattern({
  substring_pattern: "luhn|mod10|checksum",
  relative_path: "src/lib"
});

// Find BIN detection
const binLogic = await mcp_serena.find_symbol({
  name_path_pattern: "detectBrand|getCardType|cardBrand",
  include_body: true
});

// Find validation schemas
const schemas = await mcp_serena.search_for_pattern({
  substring_pattern: "cardSchema|z\\.string|refine",
  relative_path: "src/schemas"
});
```

### Context7: Validation Docs
```typescript
// React Hook Form
const rhfValidation = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/react-hook-form/react-hook-form",
  topic: "validation mode onBlur onChange",
  mode: "code"
});

// Zod custom validation
const zodRefine = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/colinhacks/zod",
  topic: "refine superRefine custom error",
  mode: "code"
});
```

### Playwright: Validation Tests
```typescript
// Test all major card brands
const testCards = [
  { brand: 'Visa', number: '4111111111111111' },
  { brand: 'Mastercard', number: '5555555555554444' },
  { brand: 'Amex', number: '378282246310005' },
  { brand: 'Discover', number: '6011111111111117' }
];

for (const card of testCards) {
  await mcp_playwright.browser_type({
    element: "Card",
    ref: "card-input",
    text: card.number
  });

  // Verify brand detected
  await mcp_playwright.browser_wait_for({ text: card.brand });

  // Screenshot
  await mcp_playwright.browser_take_screenshot({
    filename: `card-${card.brand.toLowerCase()}.png`
  });
}
```

### Chrome: Visual Preview
```typescript
// Test card input states
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Empty state
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "card-empty.png"
});

// Typing state
await mcp_chrome.use_browser({
  action: "type",
  selector: "#cardNumber",
  payload: "4111"
});

await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "card-typing.png"
});

// Valid state
await mcp_chrome.use_browser({
  action: "type",
  selector: "#cardNumber",
  payload: "1111111111111"
});

await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "card-valid.png"
});
```

### Episodic Memory: Validation History
```typescript
// Recall validation improvements
const improvements = await mcp_episodic_memory.search({
  query: ["card validation", "Luhn bug", "performance improvement"],
  mode: "both"
});

// Find UX feedback
const uxFeedback = await mcp_episodic_memory.search({
  query: "card input frustrating validate too early",
  mode: "text"
});
```

---

## Agent Dispatch Patterns

### Validation Architecture
```json
{
  "requesting_agent": "validate-card-input-ui",
  "target_agent": "frontend-developer",
  "request_type": "implement_card_validation",
  "payload": {
    "features": ["luhn_check", "bin_detection", "realtime_formatting", "brand_logos"],
    "timing": "validate_on_blur",
    "library": "react-hook-form-zod"
  }
}
```

### Performance Review
```json
{
  "requesting_agent": "validate-card-input-ui",
  "target_agent": "code-reviewer",
  "request_type": "validation_performance",
  "payload": {
    "file_path": "src/lib/cardValidation.ts",
    "focus": ["luhn_algorithm_efficiency", "debounce_strategy"]
  }
}
```

---

## Best Practices

### Validation Timing
- **Format**: onChange (immediate visual feedback)
- **Luhn Check**: onBlur (don't interrupt typing)
- **Brand Detection**: onChange (as soon as BIN available)
- **Debounce**: Not needed for onBlur validation

### Visual Feedback
- **Brand Logo**: Show as soon as BIN detected (first 6 digits)
- **Green Check**: Valid Luhn + correct length
- **Red Border**: Invalid on blur
- **Error Message**: Below input, linked with aria-describedby

### Formatting
- **Visa/MC/Discover**: 4-4-4-4 format
- **Amex**: 4-6-5 format
- **Auto-format**: As user types
- **Preserve Cursor**: Don't jump cursor on format

### Error Messages
- **Clear**: "Invalid card number" not "Luhn check failed"
- **Helpful**: "Card number incomplete" with expected length
- **Specific**: Different messages for different errors
- **Non-technical**: Avoid jargon like "checksum" or "Mod-10"

### Accessibility
- **inputMode="numeric"**: Mobile numeric keyboard
- **pattern="[0-9\s]*"**: Filter out non-digits on mobile
- **autoComplete="cc-number"**: Enable browser autofill
- **aria-invalid**: Mark invalid state
- **aria-describedby**: Link to error message

### Performance
- **Memoize**: Luhn function if re-rendering frequently
- **Avoid**: Running Luhn on every keystroke
- **Target**: <100ms validation time
- **Debounce**: Only if validation is expensive (not needed for Luhn)

### Security
- **Never Log**: Full card numbers (PCI compliance)
- **Mask in DOM**: For screenshots/screen sharing
- **Client-side Only**: Validation is UX, not security
- **Always Validate**: Server-side as well

### Testing
- **All Brands**: Visa, MC, Amex, Discover
- **Valid Cards**: Test valid Luhn checksums
- **Invalid Cards**: Test invalid checksums
- **Edge Cases**: Too short, too long, non-numeric
- **Accessibility**: Screen reader announcements
