# Skill: Manage Payment Session

**Role:** sequential-reasoner
**Domain:** Core Payments & Logic
**Objective:** Securely generate, validate, and expire TTL tokens for payment links using comprehensive MCP-powered session management workflow with security analysis, documentation, monitoring, and historical session patterns.

---

## Available Capabilities

### MCP Servers
| Server | Session Management Usage | Key Operations |
|--------|-------------------|----------------|
| **Serena** | Find session handlers, analyze token generation, audit security | `find_symbol`, `search_for_pattern` |
| **Context7** | Get Redis TTL, JWT, session security docs | `get_library_docs` |
| **Playwright** | Test session expiry, invalid token handling | `browser_navigate`, `browser_wait_for` |
| **Chrome** | Monitor session dashboards, check Redis | `use_browser` |
| **Episodic Memory** | Recall past session security issues, replay attacks | `search` |

### Superpowers Skills
| Skill | When to Use |
|-------|-------------|
| `superpowers:systematic-debugging` | When sessions expire prematurely or persist too long |
| `superpowers:verification-before-completion` | Verify no session leakage before deployment |

### Available Agents
| Agent | Dispatch For |
|-------|-------------|
| `security-auditor` | Audit session security, token entropy |
| `fullstack-developer` | Implement session service with Redis |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   SESSION MANAGEMENT WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Episodic Memory: Recall past session security incidents             │
│  ├─ Serena: Find existing session handlers                              │
│  └─ Context7: Get Redis TTL, crypto.randomBytes docs                    │
│                                                                          │
│  PHASE 2: GENERATION                                                    │
│  ├─ Generate cryptographically secure token (32-byte hex)               │
│  ├─ Store in Redis with TTL (15 minutes)                                │
│  ├─ Payload: { orderId, amount, currency, merchantId }                  │
│  └─ Return opaque token (NOT JWT in URL)                                │
│                                                                          │
│  PHASE 3: VALIDATION                                                    │
│  ├─ Check token existence in Redis                                      │
│  ├─ Expired/missing → 410 Gone                                          │
│  ├─ Valid → Return session data                                         │
│  └─ Bind to merchant (verify ownership)                                 │
│                                                                          │
│  PHASE 4: REVOCATION                                                    │
│  ├─ On successful payment: DELETE token immediately                     │
│  ├─ Prevent replay attacks                                              │
│  └─ Log session lifecycle (create, use, expire)                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## MCP Integration Examples

### Episodic Memory: Security History
```typescript
const sessionIssues = await mcp_episodic_memory.search({
  query: ["session replay", "token expired", "session fixation"],
  mode: "both",
  limit: 5
});
```

### Serena: Find Session Logic
```typescript
const sessionService = await mcp_serena.find_symbol({
  name_path_pattern: "SessionService|PaymentSession",
  include_body: true
});

const tokenGen = await mcp_serena.search_for_pattern({
  substring_pattern: "crypto\\.randomBytes|generateToken",
  relative_path: "src/session"
});
```

### Context7: Redis Documentation
```typescript
const redisDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/redis/node-redis",
  topic: "SETEX expire TTL key value",
  mode: "code"
});
```

### Playwright: Test Expiry
```typescript
// Test expired session
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/pay/expired_token"
});

await mcp_playwright.browser_wait_for({
  text: "Link Expired"
});

// Test valid session
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/pay/valid_token"
});

await mcp_playwright.browser_wait_for({
  text: "Complete your payment"
});
```

---

## Implementation Pattern

```typescript
class PaymentSessionService {
  async createSession(orderData: {
    orderId: string;
    amount: number;
    currency: string;
    merchantId: string;
  }): Promise<string> {
    // Generate cryptographically secure token
    const token = crypto.randomBytes(32).toString('hex');

    // Store in Redis with TTL (15 minutes = 900 seconds)
    await redis.setex(
      `session:${token}`,
      900,
      JSON.stringify(orderData)
    );

    return token;
  }

  async validateSession(token: string): Promise<OrderData | null> {
    const data = await redis.get(`session:${token}`);
    return data ? JSON.parse(data) : null;
  }

  async revokeSession(token: string): Promise<void> {
    await redis.del(`session:${token}`);
  }
}
```

---

## Security Rules

- **Opaque Tokens**: Use `crypto.randomBytes(32)`, NOT JWTs in URL
- **Short TTL**: Maximum 15-20 minutes
- **One-Time Use**: Delete token after successful payment
- **Merchant Binding**: Verify session belongs to requesting merchant
- **No Sensitive Data in URL**: Token is reference, not data container

---

## Best Practices

1. **Documentation**: Check Context7 for Redis TTL patterns
2. **Security Audit**: Use Serena to find token generation logic
3. **Historical Context**: Search Episodic Memory for session attacks
4. **Test Expiry**: Verify TTL works correctly with Playwright
5. **Monitor**: Use Chrome to check Redis session counts
6. **Store Decisions**: Document session security in Serena memory
