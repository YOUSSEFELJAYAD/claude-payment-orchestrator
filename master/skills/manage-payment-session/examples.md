# Examples: Session Token Lifecycle

## 1. Generation

Input: `Create Link for Order #1234`
Output: `pl_8f7d9a...` (32 chars)
Redis: `SETEX session:pl_8f7d9a... 900 { "amt": "100.00" }`

## 2. Access (Active)

Request: `GET /pay/pl_8f7d9a...`
Redis: `GET session:pl_8f7d9a...` -> Returns Data.
Result: Render Payment Page.

## 3. Access (Expired)

Request: `GET /pay/pl_8f7d9a...` (after 20 mins)
Redis: `GET` -> `nil`
Result: Render "Link Expired" Error Page.

## 4. Completion

Event: "Payment Success"
Action: `DEL session:pl_8f7d9a...`
Result: Token invalid for future use.

## Code Example

```typescript
import { randomBytes } from "crypto";
import { Redis } from "ioredis";

const redis = new Redis();
const SESSION_TTL = 900; // 15 minutes

interface SessionData {
  orderId: string;
  amount: number;
  currency: string;
}

async function createSession(data: SessionData): Promise<string> {
  const token = `pl_${randomBytes(16).toString("hex")}`;
  await redis.setex(`session:${token}`, SESSION_TTL, JSON.stringify(data));
  return token;
}

async function getSession(token: string): Promise<SessionData | null> {
  const data = await redis.get(`session:${token}`);
  return data ? JSON.parse(data) : null;
}

async function completeSession(token: string): Promise<void> {
  await redis.del(`session:${token}`);
}

// Usage
const token = await createSession({ orderId: "1234", amount: 10000, currency: "USD" });
const session = await getSession(token);
if (!session) throw new Error("Session expired");
await completeSession(token);
```
