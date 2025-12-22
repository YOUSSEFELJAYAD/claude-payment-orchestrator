# Examples: Jest Unit Test

```typescript
import { calculateFee } from "./fees";

describe("Fee Calculation", () => {
  it("should apply 2.9% + 30c", () => {
    const amount = 10000; // $100.00
    const fee = calculateFee(amount);
    expect(fee).toBe(320); // $3.20
  });
});
```

# Examples: Playwright E2E

```typescript
test("should complete payment", async ({ page }) => {
  await page.goto("/pay/LINK-123");
  await page.fill("#cardAttributes_number", "4111111111111111");
  await page.click('button[type="submit"]');
  await expect(page.locator("text=Payment Successful")).toBeVisible();
});
```
