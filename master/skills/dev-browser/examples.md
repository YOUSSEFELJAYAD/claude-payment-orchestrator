# Examples: Dev Browser Automation

## Navigate and Screenshot

```typescript
import { connect, waitForPageLoad } from "@/client.js";

const client = await connect();
const page = await client.page("main");
await page.setViewportSize({ width: 1280, height: 800 });

await page.goto("https://example.com");
await waitForPageLoad(page);
await page.screenshot({ path: "tmp/screenshot.png" });

console.log({ title: await page.title(), url: page.url() });
await client.disconnect();
```

## Form Filling with ARIA Refs

```typescript
import { connect, waitForPageLoad } from "@/client.js";

const client = await connect();
const page = await client.page("login");

await page.goto("https://example.com/login");
await waitForPageLoad(page);

// Discover elements
const snapshot = await client.getAISnapshot("login");
console.log(snapshot);
// Shows: textbox "Email" [ref=e1], textbox "Password" [ref=e2], button "Sign in" [ref=e3]

// Interact using refs
const emailInput = await client.selectSnapshotRef("login", "e1");
await emailInput.fill("user@example.com");

const passwordInput = await client.selectSnapshotRef("login", "e2");
await passwordInput.fill("password123");

const submitBtn = await client.selectSnapshotRef("login", "e3");
await submitBtn.click();

await waitForPageLoad(page);
await client.disconnect();
```

## Extract Data from Page

```typescript
import { connect, waitForPageLoad } from "@/client.js";

const client = await connect();
const page = await client.page("scrape");

await page.goto("https://news.ycombinator.com");
await waitForPageLoad(page);

// Extract using evaluate (plain JS only)
const headlines = await page.evaluate(() => {
  const items = document.querySelectorAll(".titleline > a");
  return Array.from(items).map(a => ({
    title: a.textContent,
    url: a.href
  }));
});

console.log(headlines);
await client.disconnect();
```

## Multi-Page Workflow

```typescript
import { connect, waitForPageLoad } from "@/client.js";

const client = await connect();

// Search page
const searchPage = await client.page("search");
await searchPage.goto("https://example.com/search");
await searchPage.fill('input[name="q"]', "test query");
await searchPage.click('button[type="submit"]');
await waitForPageLoad(searchPage);

// Results in separate page
const resultsPage = await client.page("results");
await resultsPage.goto(searchPage.url());

// List all active pages
const pages = await client.list();
console.log("Active pages:", pages);

await client.disconnect();
```
