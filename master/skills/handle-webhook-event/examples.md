# Examples: Webhook Verification

## Scenario: Valid Webhook

**Header**:
`X-Signature: 5b1...f2a`
`X-Timestamp: 1678886400`

**Local Computation**:

1. Base = "1678886400" + "." + "{\"event\":\"charged\"...}"
2. Key = "whsec\_..."
3. Hash = HMAC-SHA256(Key, Base) -> "5b1...f2a"

**Result**: Match. Process event.

## Scenario: Replay Attack

**Header**:
`X-Timestamp: 1678880000` (1 hour ago)

**Result**: Reject. Timestamp outside tolerance window.

## Code Example

```typescript
import { createHmac, timingSafeEqual } from "crypto";

const TOLERANCE_SECONDS = 300; // 5 minutes

interface WebhookHeaders {
  signature: string;
  timestamp: string;
}

function verifyWebhook(payload: string, headers: WebhookHeaders, secret: string): boolean {
  const timestamp = parseInt(headers.timestamp, 10);
  const now = Math.floor(Date.now() / 1000);

  // Check replay attack
  if (Math.abs(now - timestamp) > TOLERANCE_SECONDS) {
    throw new Error("Webhook timestamp outside tolerance window");
  }

  // Compute signature
  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac("sha256", secret).update(signedPayload).digest("hex");

  // Timing-safe comparison
  return timingSafeEqual(Buffer.from(expected), Buffer.from(headers.signature));
}

// Usage in Express handler
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const isValid = verifyWebhook(
    req.body.toString(),
    { signature: req.headers["x-signature"], timestamp: req.headers["x-timestamp"] },
    process.env.WEBHOOK_SECRET
  );
  if (!isValid) return res.status(401).send("Invalid signature");

  // Process event...
  res.status(200).send("OK");
});
```
