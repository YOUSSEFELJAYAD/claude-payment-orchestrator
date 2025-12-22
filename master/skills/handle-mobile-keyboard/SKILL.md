# Skill: Handle Mobile Keyboard

**Role:** sequential-reasoner (Mobile UX Specialist)
**Domain:** UI/UX & Frontend
**Objective:** Optimize form inputs for mobile keyboards with comprehensive MCP integration, accessibility-first design, and mobile-specific testing.

---

## Available Capabilities

### MCP Servers

| Server | Purpose | Key Operations |
|--------|---------|----------------|
| **Serena** | Semantic code analysis | Find input configurations, trace inputMode usage, analyze mobile patterns |
| **Context7** | Real-time documentation | MDN inputMode docs, React Native patterns, mobile UX best practices |
| **Playwright** | E2E testing | Test mobile viewport, keyboard types, input behavior |
| **Chrome** | Live browser control | Device emulation, mobile keyboard testing, viewport simulation |
| **Episodic Memory** | Cross-session context | Past mobile UX decisions, keyboard issues, user feedback |

### Superpowers Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `superpowers:brainstorming` | Before mobile design | Explore mobile input UX |
| `superpowers:systematic-debugging` | Keyboard bugs | Debug inputMode/autocomplete issues |
| `superpowers:test-driven-development` | Before implementation | Write mobile input tests |
| `superpowers:verification-before-completion` | Before claiming done | Verify on real mobile devices |
| `superpowers:requesting-code-review` | After implementation | Review mobile patterns |

### Specialized Agents

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React mobile input implementation |
| `nextjs-developer` | Next.js mobile optimization |
| `playwright-testing` | Mobile viewport testing |
| `code-reviewer` | Review mobile UX patterns |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MOBILE KEYBOARD OPTIMIZATION                          │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Context7: Get inputMode/autocomplete docs                            │
│  ├─ Serena: Find existing mobile input patterns                          │
│  ├─ Episodic Memory: Recall mobile UX decisions                          │
│  └─ Agent Dispatch: frontend-developer for mobile strategy               │
│                                                                           │
│  PHASE 2: DESIGN                                                         │
│  ├─ Brainstorming: Explore mobile keyboard UX                            │
│  ├─ Input Types: Card=numeric, OTP=numeric, Email=email, Phone=tel       │
│  ├─ Attributes: inputMode + pattern + autoComplete                       │
│  └─ Avoid: type="number" (spinners!), missing pattern                    │
│                                                                           │
│  PHASE 3: IMPLEMENTATION                                                 │
│  ├─ TDD: Write mobile input tests                                        │
│  ├─ Build: Correct inputMode for each field type                         │
│  ├─ AutoComplete: Enable browser/password manager                        │
│  └─ SMS OTP: Use autoComplete="one-time-code"                            │
│                                                                           │
│  PHASE 4: VERIFICATION                                                   │
│  ├─ Playwright: Test mobile viewport keyboard types                      │
│  ├─ Chrome: Device emulation testing                                     │
│  ├─ Code Review: Mobile patterns check                                   │
│  └─ Serena Memory: Document mobile input patterns                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Research

**Context7 Documentation Lookup**
```typescript
// MDN inputMode reference
const inputModeDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "inputmode attribute numeric decimal tel email url",
  mode: "info"
});

// MDN autocomplete reference
const autocompleteDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "autocomplete cc-number cc-exp cc-csc one-time-code",
  mode: "info"
});

// React Native keyboard types (for reference)
const rnKeyboards = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/facebook/react-native",
  topic: "TextInput keyboardType autoComplete",
  mode: "code"
});

// Mobile UX patterns
const mobileUX = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "mobile forms best practices input types",
  mode: "info"
});
```

**Serena Code Analysis**
```typescript
// Find input configurations
const inputs = await mcp_serena.search_for_pattern({
  substring_pattern: "inputMode|autoComplete|pattern=",
  relative_path: "src/components",
  context_lines_before: 1,
  context_lines_after: 3
});

// Find payment form inputs
const paymentInputs = await mcp_serena.find_symbol({
  name_path_pattern: "PaymentForm|CheckoutForm|CardInput",
  include_body: true
});

// Find mobile-specific utilities
const mobileUtils = await mcp_serena.search_for_pattern({
  substring_pattern: "isMobile|mobile.*keyboard|viewport.*mobile",
  relative_path: "src/lib"
});

// Analyze type="number" usage (anti-pattern)
const numberInputs = await mcp_serena.search_for_pattern({
  substring_pattern: 'type="number"',
  relative_path: "src"
});
```

**Episodic Memory Search**
```typescript
// Recall mobile keyboard issues
const keyboardIssues = await mcp_episodic_memory.search({
  query: ["mobile keyboard", "inputMode", "wrong keyboard", "user complaint"],
  mode: "both",
  limit: 10
});

// Find autocomplete decisions
const autocompleteHistory = await mcp_episodic_memory.search({
  query: ["autocomplete", "autofill", "password manager", "one-time-code"],
  mode: "text",
  after: "2024-01-01"
});

// Recall conversion rate impacts
const conversionImpact = await mcp_episodic_memory.search({
  query: "mobile conversion rate keyboard optimization",
  mode: "vector"
});
```

### Phase 2: Design & Planning

**Agent Dispatch**
```json
{
  "requesting_agent": "handle-mobile-keyboard",
  "target_agent": "frontend-developer",
  "request_type": "mobile_input_optimization",
  "payload": {
    "query": "Optimize all form inputs for mobile keyboards",
    "fields": [
      "card_number",
      "otp",
      "expiry",
      "cvv",
      "email",
      "phone",
      "zip_code"
    ],
    "requirements": {
      "correct_keyboards": true,
      "autocomplete": true,
      "avoid_type_number": true
    }
  }
}
```

**Brainstorming Skill**
```typescript
// Invoke brainstorming for mobile keyboard UX
// Skill: superpowers:brainstorming
// Explores: Keyboard types, autocomplete strategy, reducing friction
```

### Phase 3: Implementation

**Test-Driven Development**
```typescript
// Write tests FIRST
// Skill: superpowers:test-driven-development

describe('Mobile Keyboard Optimization', () => {
  it('should use numeric keyboard for card number', () => {
    render(<CardInput />);
    const input = screen.getByLabelText(/card number/i);

    expect(input).toHaveAttribute('inputMode', 'numeric');
    expect(input).toHaveAttribute('pattern', '[0-9\\s]*');
    expect(input).toHaveAttribute('autoComplete', 'cc-number');
  });

  it('should use email keyboard for email input', () => {
    render(<EmailInput />);
    const input = screen.getByLabelText(/email/i);

    expect(input).toHaveAttribute('inputMode', 'email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('autoComplete', 'email');
  });

  it('should use tel keyboard for phone number', () => {
    render(<PhoneInput />);
    const input = screen.getByLabelText(/phone/i);

    expect(input).toHaveAttribute('inputMode', 'tel');
    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('autoComplete', 'tel');
  });

  it('should NOT use type=number for credit cards', () => {
    render(<CardInput />);
    const input = screen.getByLabelText(/card/i);

    expect(input).not.toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputMode', 'numeric');
  });

  it('should enable SMS OTP autofill', () => {
    render(<OTPInput />);
    const input = screen.getByLabelText(/code/i);

    expect(input).toHaveAttribute('autoComplete', 'one-time-code');
    expect(input).toHaveAttribute('inputMode', 'numeric');
  });
});
```

**Implementation Example**
```typescript
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Card Number Input
export function CardNumberInput() {
  return (
    <div>
      <Label htmlFor="cardNumber">Card Number</Label>
      <Input
        id="cardNumber"
        type="text"  // NOT type="number"!
        inputMode="numeric"  // Shows numeric keyboard on mobile
        pattern="[0-9\s]*"  // iOS needs this to show numeric keyboard
        autoComplete="cc-number"  // Enable browser autofill
        placeholder="4111 1111 1111 1111"
        maxLength={19}
      />
    </div>
  );
}

// OTP Input (SMS autofill)
export function OTPInput() {
  return (
    <div>
      <Label htmlFor="otp">Verification Code</Label>
      <Input
        id="otp"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"  // Enables SMS OTP autofill!
        placeholder="123456"
        maxLength={6}
      />
    </div>
  );
}

// Expiry Date Input
export function ExpiryInput() {
  return (
    <div>
      <Label htmlFor="expiry">Expiry</Label>
      <Input
        id="expiry"
        type="text"
        inputMode="numeric"
        pattern="[0-9/]*"
        autoComplete="cc-exp"  // MM/YY autofill
        placeholder="MM/YY"
        maxLength={5}
      />
    </div>
  );
}

// CVV Input
export function CVVInput() {
  return (
    <div>
      <Label htmlFor="cvv">CVV</Label>
      <Input
        id="cvv"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="cc-csc"  // Security code autofill
        placeholder="123"
        maxLength={4}
      />
    </div>
  );
}

// Email Input
export function EmailInput() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"  // Shows @ and .com on keyboard
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
      />
    </div>
  );
}

// Phone Input
export function PhoneInput() {
  return (
    <div>
      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        type="tel"  // Shows phone keyboard
        inputMode="tel"
        autoComplete="tel"
        placeholder="(555) 123-4567"
      />
    </div>
  );
}

// Zip Code Input
export function ZipCodeInput() {
  return (
    <div>
      <Label htmlFor="zip">Zip Code</Label>
      <Input
        id="zip"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="postal-code"
        placeholder="12345"
        maxLength={5}
      />
    </div>
  );
}
```

**Serena Memory Storage**
```typescript
// Store mobile keyboard patterns
await mcp_serena.write_memory({
  memory_file_name: "mobile-keyboard-patterns.md",
  content: `
# Mobile Keyboard Patterns

## Input Configurations

| Field Type | type | inputMode | pattern | autoComplete |
|------------|------|-----------|---------|--------------|
| Credit Card | text | numeric | [0-9\\s]* | cc-number |
| OTP | text | numeric | [0-9]* | one-time-code |
| Expiry | text | numeric | [0-9/]* | cc-exp |
| CVV | text | numeric | [0-9]* | cc-csc |
| Email | email | email | - | email |
| Phone | tel | tel | - | tel |
| Zip Code | text | numeric | [0-9]* | postal-code |

## Anti-Patterns (AVOID)

### ❌ type="number" for credit cards
**Problem**: Shows spinners, allows decimals, wrong semantic meaning
**Solution**: Use type="text" with inputMode="numeric"

### ❌ type="tel" for credit cards
**Problem**: May show + / ( ) characters on some keyboards
**Solution**: Use type="text" with inputMode="numeric" + pattern="[0-9\s]*"

### ❌ Missing pattern attribute
**Problem**: iOS may not show numeric keyboard
**Solution**: Always include pattern="[0-9]*" with inputMode="numeric"

## Mobile UX Benefits

- **Faster Input**: Correct keyboard reduces typing time by 40%
- **Fewer Errors**: Numeric-only keyboards prevent letter typos
- **Higher Conversion**: Better UX = higher mobile conversion rates
- **SMS OTP Autofill**: one-time-code enables instant code paste

## iOS vs Android

### iOS
- Requires pattern="[0-9]*" for numeric keyboard
- one-time-code works in Safari 12+
- type="number" shows decimal point (bad!)

### Android
- inputMode alone is usually sufficient
- one-time-code works in Chrome/WebView
- More forgiving with missing pattern

## Best Practices

1. **Always use inputMode** (not just type)
2. **Include pattern for iOS** numeric keyboards
3. **Enable autoComplete** for better UX
4. **Test on real devices** (emulators aren't perfect)
5. **Avoid type="number"** for non-numeric data
`
});
```

### Phase 4: Testing & Verification

**Playwright Mobile Testing**
```typescript
// Set mobile viewport
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Resize to mobile (iPhone 12)
const viewport = { width: 390, height: 844 };

// Test card input keyboard type
await mcp_playwright.browser_click({
  element: "Card Number",
  ref: "card-input"
});

// Verify inputMode in accessibility tree
const snapshot = await mcp_playwright.browser_snapshot({});
// Should show inputMode="numeric"

// Screenshot mobile keyboard
await mcp_playwright.browser_take_screenshot({
  filename: "mobile-card-keyboard.png"
});

// Test OTP input
await mcp_playwright.browser_click({
  element: "Verification Code",
  ref: "otp-input"
});

const otpSnapshot = await mcp_playwright.browser_snapshot({});
// Should show autoComplete="one-time-code"

// Test email input
await mcp_playwright.browser_click({
  element: "Email",
  ref: "email-input"
});

const emailSnapshot = await mcp_playwright.browser_snapshot({});
// Should show inputMode="email"

// Screenshot each input type
await mcp_playwright.browser_take_screenshot({
  filename: "mobile-email-keyboard.png"
});
```

**Chrome Device Emulation**
```typescript
// Emulate iPhone 12
await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    Object.defineProperty(navigator, 'userAgent', {
      get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
    });
  `
});

// Navigate to form
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Inspect card input attributes
const cardAttrs = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    const input = document.querySelector('#cardNumber');
    ({
      type: input.type,
      inputMode: input.inputMode,
      pattern: input.pattern,
      autoComplete: input.autoComplete
    })
  `
});

// Screenshot mobile view
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "mobile-checkout-form.png"
});

// Test all inputs
const allInputs = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    Array.from(document.querySelectorAll('input')).map(input => ({
      id: input.id,
      type: input.type,
      inputMode: input.inputMode,
      autoComplete: input.autoComplete,
      pattern: input.pattern
    }))
  `
});
```

**Code Review**
```json
{
  "requesting_agent": "handle-mobile-keyboard",
  "target_agent": "code-reviewer",
  "request_type": "mobile_input_review",
  "payload": {
    "file_path": "src/components/PaymentForm.tsx",
    "focus_areas": ["inputMode_usage", "autocomplete_attrs", "type_number_antipattern"]
  }
}
```

**Verification Skill**
```typescript
// Skill: superpowers:verification-before-completion
// Verify:
// ✓ All inputs have correct inputMode
// ✓ Pattern attribute present for iOS
// ✓ autoComplete enabled for all fields
// ✓ NO type="number" used for cards/OTP
// ✓ SMS OTP autofill configured
// ✓ Tested on real iOS and Android devices
```

---

## MCP Integration Examples

### Serena: Find Input Patterns
```typescript
// Find all input configurations
const inputs = await mcp_serena.search_for_pattern({
  substring_pattern: "inputMode|autoComplete",
  relative_path: "src/components"
});

// Find type="number" anti-pattern
const antipatterns = await mcp_serena.search_for_pattern({
  substring_pattern: 'type="number"',
  relative_path: "src"
});

// Find mobile-specific utilities
const mobileCode = await mcp_serena.search_for_pattern({
  substring_pattern: "mobile|viewport|keyboard",
  relative_path: "src/lib"
});
```

### Context7: Mobile Docs
```typescript
// inputMode reference
const inputModeRef = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "inputmode global attribute",
  mode: "info"
});

// autocomplete values
const autocompleteRef = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "autocomplete attribute values",
  mode: "info"
});
```

### Playwright: Mobile Testing
```typescript
// Test on mobile viewport
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Click each input and verify keyboard
const inputs = ['card', 'otp', 'email', 'phone'];

for (const input of inputs) {
  await mcp_playwright.browser_click({ element: input, ref: `${input}-input` });

  const snapshot = await mcp_playwright.browser_snapshot({});

  await mcp_playwright.browser_take_screenshot({
    filename: `mobile-${input}-keyboard.png`
  });
}
```

### Chrome: Device Emulation
```typescript
// Emulate mobile device
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Extract all input configs
const configs = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    Array.from(document.querySelectorAll('input')).map(i => ({
      label: i.labels[0]?.textContent,
      inputMode: i.inputMode,
      type: i.type,
      autoComplete: i.autoComplete
    }))
  `
});

// Screenshot
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "mobile-form.png"
});
```

### Episodic Memory: Mobile UX History
```typescript
// Recall mobile keyboard improvements
const improvements = await mcp_episodic_memory.search({
  query: ["mobile keyboard", "inputMode fix", "conversion increase"],
  mode: "both"
});

// Find user complaints
const complaints = await mcp_episodic_memory.search({
  query: "mobile form wrong keyboard frustrating",
  mode: "text"
});
```

---

## Agent Dispatch Patterns

### Mobile Optimization
```json
{
  "requesting_agent": "handle-mobile-keyboard",
  "target_agent": "frontend-developer",
  "request_type": "optimize_mobile_inputs",
  "payload": {
    "audit": "all_form_inputs",
    "fix": ["add_inputMode", "add_pattern", "add_autocomplete", "remove_type_number"]
  }
}
```

### Mobile Testing
```json
{
  "requesting_agent": "handle-mobile-keyboard",
  "target_agent": "playwright-testing",
  "request_type": "mobile_keyboard_tests",
  "payload": {
    "devices": ["iPhone 12", "Pixel 5"],
    "test_scenarios": ["card_numeric", "otp_sms_autofill", "email_keyboard"]
  }
}
```

---

## Best Practices

### Input Configuration
- **Card Number**: type="text" + inputMode="numeric" + pattern="[0-9\s]*"
- **OTP**: autoComplete="one-time-code" for SMS autofill
- **Email**: type="email" + inputMode="email"
- **Phone**: type="tel" + inputMode="tel"

### Anti-Patterns
- **❌ type="number"**: Shows spinners, allows decimals
- **❌ Missing pattern**: iOS won't show numeric keyboard
- **❌ No autoComplete**: Missed opportunity for better UX

### Mobile UX
- **Fewer Keystrokes**: Correct keyboard = faster input
- **Fewer Errors**: Numeric keyboard prevents letter typos
- **SMS OTP**: one-time-code enables instant paste from SMS
- **Autocomplete**: Password managers and browser autofill

### Testing
- **Real Devices**: Emulators don't show keyboards perfectly
- **Both Platforms**: iOS and Android behave differently
- **Screenshot**: Visual regression for keyboard states
- **Accessibility**: Verify attributes in a11y tree

### Performance
- **No Impact**: inputMode/autoComplete are HTML attributes
- **Better UX**: Faster input = higher mobile conversion
- **Reduced Errors**: Fewer form validation errors

### Conversion Impact
- **40% Faster Input**: Correct keyboard reduces typing time
- **15% Fewer Errors**: Numeric keyboards prevent typos
- **5-10% Higher Conversion**: Better mobile UX improves rates
- **SMS OTP**: Instant autofill increases completion
