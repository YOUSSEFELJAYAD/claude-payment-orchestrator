# Examples: MCP Tool Usage

## Serena - Code Analysis & Refactoring

### Find All Payment Classes

```typescript
// Find classes with "Payment" in name
const symbols = await mcp_serena.find_symbol({
  name_path_pattern: "Payment",
  substring_matching: true,
  include_body: false,
  depth: 1  // Include methods
});

// Result: PaymentProcessor, PaymentGateway, PaymentService with their methods
```

### Safe Method Refactoring

```typescript
// Step 1: Find all references before changing
const refs = await mcp_serena.find_referencing_symbols({
  name_path: "processPayment",
  relative_path: "src/payments/processor.ts"
});

// Step 2: Review impact, then replace
await mcp_serena.replace_symbol_body({
  name_path: "PaymentProcessor/processPayment",
  relative_path: "src/payments/processor.ts",
  body: `async processPayment(request: PaymentRequest): Promise<PaymentResult> {
    // New implementation with improved error handling
    const validated = await this.validate(request);
    const result = await this.gateway.charge(validated);
    await this.ledger.record(result);
    return result;
  }`
});

// Step 3: Verify no broken references
const verifyRefs = await mcp_serena.find_referencing_symbols({
  name_path: "processPayment",
  relative_path: "src/payments/processor.ts"
});
```

### Add New Method to Class

```typescript
await mcp_serena.insert_after_symbol({
  name_path: "PaymentProcessor/processPayment",
  relative_path: "src/payments/processor.ts",
  body: `
  async refundPayment(transactionId: string, amount: number): Promise<RefundResult> {
    const original = await this.ledger.findTransaction(transactionId);
    if (!original) throw new NotFoundError('Transaction not found');
    return this.gateway.refund(original, amount);
  }`
});
```

### Regex-Based Content Replacement

```typescript
// Replace deprecated API calls across file
await mcp_serena.replace_content({
  relative_path: "src/payments/legacy.ts",
  needle: "gateway\\.charge\\(([^)]+)\\)",  // Regex pattern
  repl: "gateway.processPayment($!1)",      // $!1 = first capture group
  mode: "regex",
  allow_multiple_occurrences: true
});
```

## Playwright - Browser Automation

### Complete Checkout Flow Test

```typescript
// Navigate to checkout
await mcp_playwright.browser_navigate({
  url: "https://checkout.example.com/pay/abc123"
});

// Get page structure
const snapshot = await mcp_playwright.browser_snapshot({});

// Fill payment form
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card-number", value: "4111111111111111" },
    { name: "Expiry Date", type: "textbox", ref: "expiry", value: "12/25" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "123" },
    { name: "Cardholder Name", type: "textbox", ref: "name", value: "John Doe" }
  ]
});

// Submit and wait for result
await mcp_playwright.browser_click({
  element: "Pay Now button",
  ref: "submit-payment"
});

await mcp_playwright.browser_wait_for({
  text: "Payment Successful"
});

// Screenshot confirmation
await mcp_playwright.browser_take_screenshot({
  filename: "payment-confirmation.png"
});
```

### 3D Secure Challenge Handling

```typescript
// Wait for 3DS iframe to appear
await mcp_playwright.browser_wait_for({ text: "Verify your card" });

// Snapshot to find OTP input
const snapshot = await mcp_playwright.browser_snapshot({});

// Enter OTP code
await mcp_playwright.browser_type({
  element: "OTP Input",
  ref: "otp-input",
  text: "123456",
  submit: true
});

// Wait for redirect back
await mcp_playwright.browser_wait_for({ text: "Payment Complete" });
```

### Network Request Monitoring

```typescript
// Navigate and capture API calls
await mcp_playwright.browser_navigate({ url: "https://app.example.com/dashboard" });

// Get all network requests
const requests = await mcp_playwright.browser_network_requests({
  includeStatic: false  // Only API calls
});

// Filter for payment endpoints
const paymentCalls = requests.filter(r => r.url.includes('/api/payments'));
```

## Context7 - Documentation Lookup

### Get Stripe API Documentation

```typescript
// Resolve library
const stripe = await mcp_context7.resolve_library_id({
  libraryName: "stripe"
});

// Get PaymentIntents documentation
const docs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: stripe.libraryId,
  topic: "payment intents",
  mode: "code"  // Code examples
});

// Get conceptual guide
const guide = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: stripe.libraryId,
  topic: "3d secure authentication",
  mode: "info"  // Conceptual information
});
```

### Next.js Server Actions Reference

```typescript
const nextjs = await mcp_context7.resolve_library_id({
  libraryName: "next.js"
});

const serverActions = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: nextjs.libraryId,
  topic: "server actions forms",
  mode: "code",
  page: 1
});
```

## Chrome - Persistent Browser Sessions

### PSP Dashboard Monitoring

```typescript
// Login to PSP dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.psp.com/login"
});

await mcp_chrome.use_browser({
  action: "type",
  selector: "#email",
  payload: "admin@example.com"
});

await mcp_chrome.use_browser({
  action: "type",
  selector: "#password",
  payload: "secure_password\n"  // \n submits form
});

// Wait for dashboard
await mcp_chrome.use_browser({
  action: "await_text",
  payload: "Dashboard",
  timeout: 10000
});

// Extract transaction metrics
const totalVolume = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".total-volume",
  payload: "text"
});

const failureRate = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".failure-rate",
  payload: "text"
});

// Screenshot for reporting
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "psp-dashboard.png"
});
```

## Episodic Memory - Cross-Session Context

### Recall Past Architecture Decisions

```typescript
// Search for payment gateway decisions
const memories = await mcp_episodic_memory.search({
  query: ["payment gateway", "architecture decision"],
  mode: "both",
  limit: 5
});

// Read full context of relevant conversation
if (memories.results.length > 0) {
  const fullContext = await mcp_episodic_memory.read({
    path: memories.results[0].path,
    startLine: 1,
    endLine: 500
  });
}
```

### Search for Previous Bug Fixes

```typescript
const bugFixes = await mcp_episodic_memory.search({
  query: "3DS authentication timeout fix",
  mode: "text",  // Exact text matching
  after: "2024-01-01",
  limit: 10
});
```

## Multi-Tool Workflow: Documentation-Driven Refactoring

```typescript
// 1. Get latest library docs
const stripeLib = await mcp_context7.resolve_library_id({ libraryName: "stripe" });
const latestDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: stripeLib.libraryId,
  topic: "payment intents confirm",
  mode: "code"
});

// 2. Find current implementation
const currentImpl = await mcp_serena.find_symbol({
  name_path_pattern: "confirmPayment",
  include_body: true
});

// 3. Search past decisions about this code
const history = await mcp_episodic_memory.search({
  query: ["confirmPayment", "stripe integration"],
  limit: 3
});

// 4. Update implementation based on latest docs
await mcp_serena.replace_symbol_body({
  name_path: "StripeGateway/confirmPayment",
  relative_path: "src/gateways/stripe.ts",
  body: `// Updated implementation per Stripe docs 2024
  async confirmPayment(intentId: string): Promise<PaymentResult> {
    const intent = await this.stripe.paymentIntents.confirm(intentId, {
      return_url: this.config.returnUrl,
      mandate_data: { customer_acceptance: { type: 'online' } }
    });
    return this.mapToResult(intent);
  }`
});

// 5. Test the change via browser
await mcp_playwright.browser_navigate({ url: "http://localhost:3000/test-payment" });
await mcp_playwright.browser_click({ element: "Test Payment", ref: "test-btn" });
await mcp_playwright.browser_wait_for({ text: "Success" });
```
