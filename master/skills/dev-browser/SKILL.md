# Skill: Dev Browser

**Role:** sequential-reasoner (Browser Automation Specialist)
**Domain:** Agentic & Integrations
**Objective:** Provide browser automation with persistent page state across script executions for testing payment flows, extracting web data, and automating browser workflows.

## Available Capabilities

| Category | Capability | Browser Automation Use Case |
|----------|-----------|---------------------------|
| **Dev Browser** | | |
| Playwright Server | Page Management | Persistent browser pages across runs |
| ARIA Snapshots | Element Discovery | Semantic element discovery without selectors |
| REST API | Page Control | HTTP API for browser operations |
| Client SDK | TypeScript Client | Type-safe browser automation |
| **MCP Servers** | | |
| Serena | Script Management | Store/retrieve automation scripts |
| Episodic Memory | Automation History | Recall past automation patterns |
| **Superpowers** | | |
| test-driven-development | Test Automation | Write browser tests |
| verification-before-completion | Verify Results | Confirm automation worked |

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   BROWSER AUTOMATION WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────┤
│  1. START SERVER  → ./skills/dev-browser/server.sh &                    │
│  2. CONNECT       → import { connect } from "@/client.js"               │
│  3. GET PAGE      → await client.page("name")                           │
│  4. NAVIGATE      → await page.goto(url)                                │
│  5. DISCOVER      → await client.getAISnapshot("name")                  │
│  6. INTERACT      → await client.selectSnapshotRef("name", "e5")        │
│  7. EXTRACT       → await page.textContent(selector)                    │
│  8. SCREENSHOT    → await page.screenshot({ path })                     │
│  9. VERIFY        → Check results, confirm success                      │
│  10. DISCONNECT   → await client.disconnect()                           │
└─────────────────────────────────────────────────────────────────────────┘
```

## Setup

```bash
# Start dev-browser server (background)
cd /Users/jd/Documents/mcp-config-master/master/skills/dev-browser
./server.sh &

# Wait for "Ready" message
# Server starts at http://localhost:9222
```

## Workflow Integration

### Basic Template

```bash
cd /Users/jd/Documents/mcp-config-master/master/skills/dev-browser && bun x tsx <<'EOF'
import { connect, waitForPageLoad } from "@/client.js";

const client = await connect();
const page = await client.page("main");

await page.setViewportSize({ width: 1280, height: 800 });
await page.goto("https://example.com");
await waitForPageLoad(page);

const title = await page.title();
console.log("Page title:", title);

await client.disconnect();
EOF
```

### Payment Form Automation

```bash
cd /Users/jd/Documents/mcp-config-master/master/skills/dev-browser && bun x tsx <<'EOF'
import { connect, waitForPageLoad } from "@/client.js";

const client = await connect();
const page = await client.page("payment-test");

// Navigate to payment page
await page.goto("https://checkout.example.com");
await waitForPageLoad(page);

// Get ARIA snapshot to discover form fields
const snapshot = await client.getAISnapshot("payment-test");
console.log("Form structure:", snapshot);

// Fill payment form using refs from snapshot
const cardNumberField = await client.selectSnapshotRef("payment-test", "e10");
await cardNumberField.fill("4111111111111111");

const expiryField = await client.selectSnapshotRef("payment-test", "e11");
await expiryField.fill("12/25");

const cvvField = await client.selectSnapshotRef("payment-test", "e12");
await cvvField.fill("123");

// Submit
const submitButton = await client.selectSnapshotRef("payment-test", "e15");
await submitButton.click();

// Wait for success
await page.waitForSelector(".success-message");

const result = await page.textContent(".success-message");
console.log("Payment result:", result);

await page.screenshot({ path: "tmp/payment-success.png" });

await client.disconnect();
EOF
```

### PSP Dashboard Monitoring

```bash
cd /Users/jd/Documents/mcp-config-master/master/skills/dev-browser && bun x tsx <<'EOF'
import { connect, waitForPageLoad } from "@/client.js";

const client = await connect();
const page = await client.page("stripe-dashboard");

// Login to Stripe dashboard
await page.goto("https://dashboard.stripe.com");
await waitForPageLoad(page);

// Extract metrics
const snapshot = await client.getAISnapshot("stripe-dashboard");

// Find transaction count
const transactionCount = await page.textContent(".transaction-count");
console.log("Transactions today:", transactionCount);

// Screenshot dashboard
await page.screenshot({ path: "tmp/stripe-dashboard.png", fullPage: true });

await client.disconnect();
EOF
```

### 3D Secure Flow Testing

```bash
cd /Users/jd/Documents/mcp-config-master/master/skills/dev-browser && bun x tsx <<'EOF'
import { connect, waitForPageLoad } from "@/client.js";

const client = await connect();
const page = await client.page("3ds-test");

// Initiate payment with 3DS card
await page.goto("https://checkout.example.com");
await waitForPageLoad(page);

// Fill with 3DS test card
await page.fill("#card-number", "4000000000003220");
await page.fill("#expiry", "12/25");
await page.fill("#cvv", "123");
await page.click("#submit");

// Wait for 3DS challenge iframe
await page.waitForSelector("iframe[name='3DS-challenge']");

// Switch to iframe
const challengeFrame = page.frameLocator("iframe[name='3DS-challenge']");

// Get snapshot of 3DS challenge
const snapshot = await client.getAISnapshot("3ds-test");
console.log("3DS challenge:", snapshot);

// Complete 3DS
await challengeFrame.locator("#password").fill("password");
await challengeFrame.locator("#submit").click();

// Wait for redirect back
await page.waitForURL("**/success");

console.log("3DS flow completed successfully");

await client.disconnect();
EOF
```

## MCP Integration Examples

### Serena: Store Automation Scripts

```typescript
// Save reusable automation script
const paymentTestScript = `
import { connect, waitForPageLoad } from "@/client.js";

export async function testPaymentFlow(cardNumber, expiry, cvv) {
  const client = await connect();
  const page = await client.page("payment-test");

  await page.goto("https://checkout.example.com");
  await waitForPageLoad(page);

  await page.fill("#card-number", cardNumber);
  await page.fill("#expiry", expiry);
  await page.fill("#cvv", cvv);
  await page.click("#submit");

  await page.waitForSelector(".result");
  const result = await page.textContent(".result");

  await client.disconnect();
  return result;
}
`;

await mcp_serena.replace_content({
  relative_path: "master/skills/dev-browser/tmp/payment-test.ts",
  needle: "// Payment test",
  repl: paymentTestScript,
  mode: "exact"
});
```

### Episodic Memory: Automation Patterns

```typescript
// Recall past automation patterns
const patterns = await mcp_episodic_memory.search({
  query: ["browser automation", "payment form fill", "3DS testing"],
  mode: "both",
  limit: 5
});

// Find successful automation scripts
const successfulScripts = await mcp_episodic_memory.search({
  query: "dev-browser automation success",
  mode: "text"
});
```

## Key Concepts

### ARIA Snapshots

ARIA snapshots provide semantic element discovery:

```yaml
- banner:
  - link "Hacker News" [ref=e1]
  - navigation:
    - link "new" [ref=e2]
    - link "comments" [ref=e3]
- main:
  - list:
    - listitem:
      - link "Article Title" [ref=e8]
```

Use refs for interaction:

```typescript
const element = await client.selectSnapshotRef("main", "e2");
await element.click();
```

### Persistent Pages

Pages persist across script executions:

```bash
# Script 1: Navigate
cd dev-browser && bun x tsx <<'EOF'
const page = await client.page("checkout");
await page.goto("https://checkout.example.com");
await client.disconnect();  // Page stays alive
EOF

# Script 2: Fill form (same page state)
cd dev-browser && bun x tsx <<'EOF'
const page = await client.page("checkout");  // Reuses existing page
await page.fill("#email", "test@test.com");
await client.disconnect();
EOF
```

### Incremental Workflow

Small scripts for complex tasks:

```bash
# 1. Navigate
page.goto(url)

# 2. Discover elements
getAISnapshot()

# 3. Interact
element.click()

# 4. Extract data
page.textContent()

# 5. Verify
screenshot()
```

## Best Practices

### Always Run from dev-browser Directory

```bash
# CORRECT
cd /Users/jd/Documents/mcp-config-master/master/skills/dev-browser && bun x tsx script.ts

# WRONG - will fail with ERR_MODULE_NOT_FOUND
cd /some/other/dir && bun x tsx script.ts
```

### Use HEREDOC for Inline Scripts

```bash
# Preferred: Inline with heredoc
cd dev-browser && bun x tsx <<'EOF'
import { connect } from "@/client.js";
// script here
EOF

# Only write files for reusable scripts
```

### Wait for Page Load

```typescript
import { waitForPageLoad } from "@/client.js";

await page.goto(url);
await waitForPageLoad(page);  // Wait for readyState and network idle
```

### Plain JavaScript in evaluate()

```typescript
// ✅ Correct
await page.evaluate(() => {
  return document.title;
});

// ❌ Wrong - TypeScript syntax fails in browser
await page.evaluate(() => {
  const el: HTMLElement = document.body;  // Don't use TS syntax
  return el.textContent;
});
```

### Error Recovery

```typescript
// Take screenshot on error
try {
  await element.click();
} catch (error) {
  await page.screenshot({ path: "tmp/error.png" });
  console.error("Error:", error);
  throw error;
}
```

## Documentation

```typescript
await mcp_serena.write_memory({
  memory_file_name: "dev-browser-automation-log.md",
  content: `
# Dev Browser Automation Log

## 2024-12-18: Payment Flow Test
- **Objective:** Test Stripe checkout flow
- **Result:** Success
- **Duration:** 3.2s
- **Screenshot:** tmp/payment-success.png
- **Notes:** 3DS challenge completed successfully

## 2024-12-17: PSP Dashboard Scraping
- **Objective:** Extract transaction metrics
- **Result:** Success
- **Data:** 1,234 transactions, $45,678 volume
- **Screenshot:** tmp/dashboard-metrics.png
  `
});
```
