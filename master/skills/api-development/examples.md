# Examples: Next.js API Route

```typescript
import { z } from "zod";

const schema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),
});

export async function POST(req: Request) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return Response.json(
      { success: false, error: validation.error },
      { status: 400 },
    );
  }

  return Response.json({ success: true, data: { id: "tx_123" } });
}
```
