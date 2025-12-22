# Examples: Tokenization Flow

## 1. Tokenize Request

Input (Secure Field): `4111 1111 1111 1111` (PAN)
Action: Vault encrypts -> `Standard-AES-Blob`
Storage: `INSERT INTO vault (id, data) VALUES ('tok_123', 'blob')`
Output: `tok_123` (Safe to log/store in Orchestrator)

## 2. Use Token (Payment)

Input: `tok_123`
Action: Orchestrator calls Vault `detokenize('tok_123')`
Vault: Decrypts `blob` -> Returns PAN (in memory stream to PSP Connector).
Result: PAN sent to Gateway.

## Code Example

```typescript
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(process.env.VAULT_KEY!, "hex"); // 32 bytes

interface TokenizedCard {
  token: string;
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
}

async function tokenize(pan: string, expiry: string): Promise<TokenizedCard> {
  const token = `tok_${randomBytes(16).toString("hex")}`;
  const iv = randomBytes(16);

  const cipher = createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(pan, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  // Store encrypted data (implementation depends on your vault)
  await vault.store(token, { iv, encrypted, authTag });

  return {
    token,
    lastFour: pan.slice(-4),
    expiryMonth: expiry.slice(0, 2),
    expiryYear: expiry.slice(2),
  };
}

async function detokenize(token: string): Promise<string> {
  const { iv, encrypted, authTag } = await vault.retrieve(token);

  const decipher = createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);
  return decipher.update(encrypted) + decipher.final("utf8");
}

// Usage - PAN never logged or stored in plain text
const card = await tokenize("4111111111111111", "1225");
// { token: "tok_abc123...", lastFour: "1111", expiryMonth: "12", expiryYear: "25" }
```
