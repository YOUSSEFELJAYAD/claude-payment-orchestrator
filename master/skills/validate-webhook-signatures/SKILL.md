---
name: validate-webhook-signatures
description: Verify webhook authenticity using HMAC signatures and timestamps
activation: Use when implementing webhook signature verification or debugging auth issues
---

# Validate Webhook Signatures

**Role:** Webhook Security Engineer
**Domain:** Cryptography, API Security
**Objective:** Ensure webhook authenticity and integrity through signature validation

## Quick Start (TL;DR)

**Use when:** Implementing or debugging webhook signature verification
**Key steps:** 1. Validate timestamp  2. Compute signature  3. Compare securely
**Output:** Secure webhook verification implementation

## Standard Signature Schemes

### HMAC-SHA256 (Most Common)

```typescript
import crypto from 'crypto';

interface SignatureConfig {
  headerName: string;
  timestampHeader?: string;
  algorithm: 'sha256' | 'sha512';
  encoding: 'hex' | 'base64';
  tolerance: number; // Timestamp tolerance in seconds
}

const stripeConfig: SignatureConfig = {
  headerName: 'stripe-signature',
  algorithm: 'sha256',
  encoding: 'hex',
  tolerance: 300, // 5 minutes
};

const webhookSignatureConfigs: Record<string, SignatureConfig> = {
  stripe: {
    headerName: 'stripe-signature',
    algorithm: 'sha256',
    encoding: 'hex',
    tolerance: 300,
  },
  github: {
    headerName: 'x-hub-signature-256',
    algorithm: 'sha256',
    encoding: 'hex',
    tolerance: 0, // No timestamp
  },
  shopify: {
    headerName: 'x-shopify-hmac-sha256',
    algorithm: 'sha256',
    encoding: 'base64',
    tolerance: 0,
  },
};
```

### Core Verification Logic

```typescript
class WebhookSignatureValidator {
  constructor(
    private secret: string,
    private config: SignatureConfig
  ) {}

  verify(payload: string | Buffer, headers: Record<string, string>): ValidationResult {
    const signatureHeader = headers[this.config.headerName.toLowerCase()];

    if (!signatureHeader) {
      return {
        valid: false,
        error: 'MISSING_SIGNATURE',
        message: `Missing ${this.config.headerName} header`,
      };
    }

    // Parse signature header (varies by provider)
    const parsed = this.parseSignatureHeader(signatureHeader);

    // Validate timestamp if present
    if (parsed.timestamp && this.config.tolerance > 0) {
      const timestampResult = this.validateTimestamp(parsed.timestamp);
      if (!timestampResult.valid) {
        return timestampResult;
      }
    }

    // Compute expected signature
    const signedPayload = parsed.timestamp
      ? `${parsed.timestamp}.${payload}`
      : payload;

    const expectedSignature = crypto
      .createHmac(this.config.algorithm, this.secret)
      .update(signedPayload)
      .digest(this.config.encoding);

    // Constant-time comparison to prevent timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(parsed.signature)
    );

    if (!isValid) {
      return {
        valid: false,
        error: 'INVALID_SIGNATURE',
        message: 'Signature verification failed',
      };
    }

    return { valid: true };
  }

  private parseSignatureHeader(header: string): ParsedSignature {
    // Stripe format: t=timestamp,v1=signature
    if (header.includes(',')) {
      const parts = header.split(',');
      const parsed: Record<string, string> = {};

      for (const part of parts) {
        const [key, value] = part.split('=');
        parsed[key] = value;
      }

      return {
        timestamp: parsed.t ? parseInt(parsed.t, 10) : undefined,
        signature: parsed.v1 || parsed.signature,
      };
    }

    // Simple format: sha256=signature or just signature
    if (header.startsWith('sha256=')) {
      return { signature: header.slice(7) };
    }

    return { signature: header };
  }

  private validateTimestamp(timestamp: number): ValidationResult {
    const now = Math.floor(Date.now() / 1000);
    const diff = Math.abs(now - timestamp);

    if (diff > this.config.tolerance) {
      return {
        valid: false,
        error: 'TIMESTAMP_EXPIRED',
        message: `Timestamp outside tolerance (${diff}s > ${this.config.tolerance}s)`,
      };
    }

    return { valid: true };
  }
}
```

## Provider-Specific Implementations

### Stripe

```typescript
class StripeSignatureValidator {
  static verify(
    payload: string,
    header: string,
    secret: string,
    tolerance: number = 300
  ): { eventId: string } {
    const parts = header.split(',').reduce((acc, part) => {
      const [key, value] = part.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const timestamp = parseInt(parts.t, 10);
    const signatures = Object.entries(parts)
      .filter(([k]) => k.startsWith('v'))
      .map(([, v]) => v);

    // Check timestamp
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > tolerance) {
      throw new SignatureVerificationError('Timestamp outside tolerance');
    }

    // Compute expected signature
    const signedPayload = `${timestamp}.${payload}`;
    const expected = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');

    // Check if any signature matches
    const isValid = signatures.some(sig =>
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
    );

    if (!isValid) {
      throw new SignatureVerificationError('Invalid signature');
    }

    const event = JSON.parse(payload);
    return { eventId: event.id };
  }
}
```

### GitHub

```typescript
class GitHubSignatureValidator {
  static verify(
    payload: string | Buffer,
    signature: string,
    secret: string
  ): boolean {
    if (!signature.startsWith('sha256=')) {
      return false;
    }

    const expected = 'sha256=' + crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  }
}
```

### PayPal

```typescript
class PayPalSignatureValidator {
  private static readonly PAYPAL_CERT_URL = 'https://api.paypal.com/v1/notifications/certs/';

  static async verify(
    headers: Record<string, string>,
    body: string,
    webhookId: string
  ): Promise<boolean> {
    const transmissionId = headers['paypal-transmission-id'];
    const timestamp = headers['paypal-transmission-time'];
    const certUrl = headers['paypal-cert-url'];
    const signature = headers['paypal-transmission-sig'];
    const algo = headers['paypal-auth-algo'];

    // Validate cert URL
    if (!certUrl.startsWith(this.PAYPAL_CERT_URL)) {
      return false;
    }

    // Fetch PayPal certificate
    const cert = await this.fetchCertificate(certUrl);

    // Compute CRC32 of body
    const crc = this.computeCRC32(body);

    // Build signed message
    const message = `${transmissionId}|${timestamp}|${webhookId}|${crc}`;

    // Verify signature
    const verifier = crypto.createVerify(algo);
    verifier.update(message);

    return verifier.verify(cert, signature, 'base64');
  }
}
```

## Middleware Integration

### Express Middleware

```typescript
function webhookSignatureMiddleware(config: {
  secret: string;
  provider: 'stripe' | 'github' | 'shopify';
}): RequestHandler {
  const validator = new WebhookSignatureValidator(
    config.secret,
    webhookSignatureConfigs[config.provider]
  );

  return (req, res, next) => {
    // Get raw body (important: must be raw, not parsed JSON)
    const rawBody = req.rawBody || req.body;

    if (!rawBody) {
      return res.status(400).json({
        error: 'RAW_BODY_REQUIRED',
        message: 'Raw request body is required for signature verification',
      });
    }

    const result = validator.verify(rawBody, req.headers as Record<string, string>);

    if (!result.valid) {
      console.warn('Webhook signature verification failed:', result);
      return res.status(401).json({
        error: result.error,
        message: result.message,
      });
    }

    // Attach verification result to request
    (req as any).webhookVerified = true;
    next();
  };
}

// Usage
app.post('/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  webhookSignatureMiddleware({ secret: process.env.STRIPE_WEBHOOK_SECRET!, provider: 'stripe' }),
  stripeWebhookHandler
);
```

### Next.js API Route

```typescript
export const config = {
  api: {
    bodyParser: false, // Disable body parsing to get raw body
  },
};

async function buffer(readable: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const rawBody = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;

  try {
    StripeSignatureValidator.verify(
      rawBody.toString(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Signature verification failed:', error);
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process webhook...
  const event = JSON.parse(rawBody.toString());
  await processWebhookEvent(event);

  res.status(200).json({ received: true });
}
```

## Security Considerations

### Prevent Replay Attacks

```typescript
class ReplayProtection {
  constructor(private cache: Cache, private ttl: number = 300) {}

  async checkAndRecord(eventId: string, timestamp: number): Promise<boolean> {
    const key = `webhook:${eventId}`;

    // Check if already processed
    const exists = await this.cache.exists(key);
    if (exists) {
      return false; // Replay detected
    }

    // Record with TTL matching signature tolerance
    await this.cache.set(key, timestamp, this.ttl);
    return true;
  }
}
```

### Logging for Debugging

```typescript
function logSignatureVerification(
  success: boolean,
  details: {
    provider: string;
    eventId?: string;
    error?: string;
    headers: Record<string, string>;
  }
): void {
  const log = {
    type: 'webhook_signature_verification',
    success,
    provider: details.provider,
    eventId: details.eventId,
    error: details.error,
    // Never log the full signature, only first/last chars
    signaturePreview: maskSignature(details.headers),
    timestamp: new Date().toISOString(),
  };

  if (success) {
    console.info(JSON.stringify(log));
  } else {
    console.warn(JSON.stringify(log));
  }
}

function maskSignature(headers: Record<string, string>): string {
  const sig = headers['stripe-signature'] || headers['x-hub-signature-256'] || '';
  if (sig.length < 10) return '***';
  return `${sig.slice(0, 4)}...${sig.slice(-4)}`;
}
```

## Related Skills

**This skill is used by:**
- `implement-webhook-reliability` - Delivery pipeline
- `handle-webhook-event` - Event processing

## Best Practices

- Always use constant-time comparison (timingSafeEqual)
- Validate timestamps to prevent replay attacks
- Use raw request body, not parsed JSON
- Store webhook secrets in environment variables
- Rotate secrets periodically
- Log verification failures (without exposing secrets)
- Implement replay protection for critical webhooks
- Handle multiple signature versions (like Stripe's v1, v2)
