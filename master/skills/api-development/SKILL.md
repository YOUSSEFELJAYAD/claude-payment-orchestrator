# Skill: API Development

**Role:** sequential-reasoner (API Architect)
**Domain:** Backend Engineering
**Objective:** Design, implement, and version robust REST/GraphQL APIs with comprehensive schema validation, idempotency, rate limiting, and documentation using MCP-powered code analysis, real-time framework documentation, automated testing, and cross-session knowledge retention.

## Available Capabilities

### MCP Servers
| Server | Usage in API Development |
|--------|-------------------------|
| **Serena** | Find existing API routes, analyze handler patterns, refactor endpoint logic, trace request/response flows, generate route handlers following codebase conventions |
| **Context7** | Get latest Next.js App Router docs, Express/Hono middleware patterns, OpenAPI specifications, validation library (Zod/Yup) documentation, authentication best practices |
| **Playwright** | API endpoint testing via browser fetch, form submission validation, authentication flow verification, WebSocket connection testing, response format validation |
| **Chrome** | Monitor API requests via Network tab, extract response headers, verify cookie/session handling, debug CORS issues, inspect request payloads |
| **Episodic Memory** | Recall past API design decisions, retrieve versioning strategies, find solutions to similar endpoint issues, reference authentication pattern choices |

### Superpowers Skills
| Skill | When to Invoke |
|-------|----------------|
| `brainstorming` | Before designing new API architecture, endpoint structure, or authentication strategy |
| `systematic-debugging` | When investigating API errors, timeout issues, or unexpected response formats |
| `test-driven-development` | Before implementing new endpoints or middleware |
| `verification-before-completion` | After API changes, before deploying new endpoints |
| `writing-plans` | When implementing complex API features like pagination, filtering, or GraphQL schemas |
| `subagent-driven-development` | For parallel endpoint development or independent middleware implementations |
| `requesting-code-review` | After critical API changes affecting authentication or data access |

### Specialized Agents
| Agent | When to Dispatch |
|-------|-----------------|
| `code-architect` | Designing API architecture, REST/GraphQL schema design, or microservices structure |
| `code-reviewer` | Reviewing endpoint logic for security issues, validation gaps, or performance problems |
| `silent-failure-hunter` | Finding missing error handling in API routes, middleware, or validation logic |
| `pr-test-analyzer` | Verifying test coverage for all API endpoints and error scenarios |

### Other Skills & Tools
- `elements-of-style:writing-clearly-and-concisely` - For API documentation and error messages
- `episodic-memory:remembering-conversations` - For recurring API design patterns
- `dev-browser:dev-browser` - For interactive API testing
- WebSearch - For latest OpenAPI standards and API best practices
- TodoWrite - For tracking multi-endpoint implementation progress

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      COMPREHENSIVE API DEVELOPMENT FLOW                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  PHASE 1: DISCOVERY & PLANNING                                                  │
│  ├─ Episodic Memory: Search past API design patterns and decisions              │
│  ├─ Context7: Get latest framework (Next.js/Express) documentation              │
│  ├─ Serena: Analyze existing endpoint patterns in codebase                      │
│  ├─ Brainstorming: Design endpoint structure, request/response schemas          │
│  └─ WebSearch: Latest OpenAPI 3.1 standards and REST best practices             │
│                                                                                  │
│  PHASE 2: SCHEMA DESIGN                                                         │
│  ├─ Context7: Get Zod/Yup validation library documentation                      │
│  ├─ Define request schemas (body, query, params)                                │
│  ├─ Define response envelopes (success/error formats)                           │
│  ├─ Design pagination, filtering, sorting interfaces                            │
│  └─ Generate TypeScript types from schemas                                      │
│                                                                                  │
│  PHASE 3: IMPLEMENTATION                                                        │
│  ├─ TDD: Write endpoint tests first (request/response validation)               │
│  ├─ Serena: Generate route handlers following codebase patterns                 │
│  ├─ Implement middleware (auth, rate limiting, idempotency)                     │
│  ├─ Add input validation with Zod schemas                                       │
│  ├─ Implement business logic with proper error handling                         │
│  └─ Add logging, metrics, and observability                                     │
│                                                                                  │
│  PHASE 4: TESTING & VERIFICATION                                                │
│  ├─ Playwright: Test endpoints via browser fetch (with auth cookies)            │
│  ├─ Chrome: Verify Network tab shows correct headers, status codes              │
│  ├─ Playwright: Capture and validate network requests                           │
│  ├─ Test error scenarios (validation failures, auth errors, rate limits)        │
│  ├─ Verification skill: Run all tests, check coverage                           │
│  └─ Silent failure hunter: Find missing error handlers                          │
│                                                                                  │
│  PHASE 5: DOCUMENTATION & REVIEW                                                │
│  ├─ Generate OpenAPI/Swagger documentation from schemas                         │
│  ├─ Elements of style: Write clear API documentation                            │
│  ├─ Code reviewer: Review for security, validation, performance                 │
│  ├─ Test analyzer: Verify endpoint and error scenario coverage                  │
│  ├─ Serena memory: Store API design decisions and patterns                      │
│  └─ Requesting code review: Final review before deployment                      │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Discovery & Planning

```typescript
// 1. Search past API design decisions
const apiDecisions = await mcp_episodic_memory.search({
  query: ["API design", "endpoint structure", "authentication pattern"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// 2. Get latest Next.js App Router API documentation
const nextjsRoutes = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "api routes app router middleware",
  mode: "code"
});

// 3. Get validation library docs
const zodDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/colinhacks/zod",
  topic: "schema validation transform coerce",
  mode: "code"
});

// 4. Analyze existing API patterns with Serena
const existingRoutes = await mcp_serena.search_for_pattern({
  substring_pattern: "export (async )?function (GET|POST|PUT|DELETE|PATCH)",
  relative_path: "src/app/api",
  paths_include_glob: "**/route.ts"
});

// 5. Find common middleware patterns
const middlewarePatterns = await mcp_serena.search_for_pattern({
  substring_pattern: "withAuth|withRateLimit|withIdempotency",
  relative_path: "src",
  paths_include_glob: "**/*.ts"
});

// 6. Get existing response envelope structure
const responseTypes = await mcp_serena.find_symbol({
  name_path_pattern: "ApiResponse|SuccessResponse|ErrorResponse",
  substring_matching: true,
  depth: 2
});

// 7. Brainstorm the API design
// Invoke: superpowers:brainstorming
// Topics: Endpoint structure, authentication, versioning, pagination
```

### Phase 2: Implementation

```typescript
// 1. Write implementation plan
// Invoke: superpowers:writing-plans
// Plan: Payment refund API endpoint with validation, auth, idempotency

// 2. Use TDD approach
// Invoke: superpowers:test-driven-development
// Write tests first, then implement endpoint

// 3. Create endpoint with Serena
await mcp_serena.create_text_file({
  relative_path: "src/app/api/v1/refunds/route.ts",
  content: `import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware/auth';
import { withIdempotency } from '@/lib/middleware/idempotency';
import { withRateLimit } from '@/lib/middleware/rate-limit';
import { refundService } from '@/lib/services/refund';

// Request schema
const RefundSchema = z.object({
  transactionId: z.string().uuid('Invalid transaction ID format'),
  amount: z.number().positive('Amount must be positive').max(1000000),
  reason: z.enum(['customer_request', 'fraud', 'duplicate', 'other']),
  metadata: z.record(z.string()).optional()
});

// Response types
type RefundSuccessResponse = {
  success: true;
  data: {
    refundId: string;
    transactionId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    createdAt: string;
  };
  meta: {
    requestId: string;
  };
};

type RefundErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: z.ZodError['errors'];
  };
  meta: {
    requestId: string;
  };
};

export const POST = withAuth(
  withRateLimit({ max: 10, window: '1m' })(
    withIdempotency(async (request: NextRequest): Promise<NextResponse<RefundSuccessResponse | RefundErrorResponse>> => {
      const requestId = crypto.randomUUID();

      try {
        // Parse and validate request body
        const body = await request.json();
        const validated = RefundSchema.parse(body);

        // Process refund
        const result = await refundService.process({
          ...validated,
          userId: request.user.id, // from withAuth middleware
          requestId
        });

        return NextResponse.json({
          success: true,
          data: {
            refundId: result.id,
            transactionId: result.transactionId,
            amount: result.amount,
            status: result.status,
            createdAt: result.createdAt.toISOString()
          },
          meta: { requestId }
        }, { status: 201 });

      } catch (error) {
        // Validation errors
        if (error instanceof z.ZodError) {
          return NextResponse.json({
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid request parameters',
              details: error.errors
            },
            meta: { requestId }
          }, { status: 400 });
        }

        // Business logic errors
        if (error.code === 'TRANSACTION_NOT_FOUND') {
          return NextResponse.json({
            success: false,
            error: {
              code: 'TRANSACTION_NOT_FOUND',
              message: 'Transaction not found or already refunded'
            },
            meta: { requestId }
          }, { status: 404 });
        }

        // Unknown errors
        console.error('[Refund API Error]', { requestId, error });
        return NextResponse.json({
          success: false,
          error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred'
          },
          meta: { requestId }
        }, { status: 500 });
      }
    })
  )
);

// Rate limit: 10 requests per minute per user
export const config = {
  runtime: 'nodejs',
  maxDuration: 30
};`
});

// 4. Create middleware if not exists
await mcp_serena.create_text_file({
  relative_path: "src/lib/middleware/idempotency.ts",
  content: `import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export function withIdempotency<T>(
  handler: (request: NextRequest) => Promise<NextResponse<T>>
) {
  return async (request: NextRequest): Promise<NextResponse<T>> => {
    const idempotencyKey = request.headers.get('Idempotency-Key');

    if (!idempotencyKey) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_IDEMPOTENCY_KEY',
          message: 'Idempotency-Key header is required for POST requests'
        }
      } as any, { status: 400 });
    }

    // Check for cached response
    const cacheKey = \`idem:\${idempotencyKey}\`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      const response = JSON.parse(cached);
      return NextResponse.json(response, {
        status: response.success ? 200 : 400,
        headers: { 'X-Idempotency-Cached': 'true' }
      });
    }

    // Execute handler
    const response = await handler(request);
    const responseData = await response.json();

    // Cache successful responses for 24 hours
    if (responseData.success) {
      await redis.setex(cacheKey, 86400, JSON.stringify(responseData));
    }

    return NextResponse.json(responseData, {
      status: response.status,
      headers: response.headers
    });
  };
}`
});
```

### Phase 3: Testing & Verification

```typescript
// 1. Test endpoint with Playwright
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/login"
});

// Authenticate first to get session cookie
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Email", type: "textbox", ref: "email", value: "test@example.com" },
    { name: "Password", type: "textbox", ref: "password", value: "testpass123" }
  ]
});
await mcp_playwright.browser_click({ element: "Login", ref: "submit" });
await mcp_playwright.browser_wait_for({ text: "Dashboard" });

// Test API endpoint via browser fetch (includes auth cookies)
const testRefundAPI = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const response = await fetch('/api/v1/refunds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID()
      },
      body: JSON.stringify({
        transactionId: '123e4567-e89b-12d3-a456-426614174000',
        amount: 100.50,
        reason: 'customer_request',
        metadata: { requestedBy: 'customer-portal' }
      })
    });

    return {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      data: await response.json()
    };
  }`
});

console.log('Refund API Response:', testRefundAPI);

// 2. Test validation errors
const testValidation = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const response = await fetch('/api/v1/refunds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID()
      },
      body: JSON.stringify({
        transactionId: 'invalid-uuid',
        amount: -50,  // Invalid: negative amount
        reason: 'invalid_reason'  // Invalid: not in enum
      })
    });

    return {
      status: response.status,
      data: await response.json()
    };
  }`
});

// Should return 400 with validation errors
assert(testValidation.status === 400);
assert(testValidation.data.error.code === 'VALIDATION_ERROR');

// 3. Test idempotency
const idempotencyKey = crypto.randomUUID();
const firstRequest = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const response = await fetch('/api/v1/refunds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': '${idempotencyKey}'
      },
      body: JSON.stringify({
        transactionId: '123e4567-e89b-12d3-a456-426614174000',
        amount: 100,
        reason: 'customer_request'
      })
    });
    return await response.json();
  }`
});

// Second request with same idempotency key should return cached response
const secondRequest = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const response = await fetch('/api/v1/refunds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': '${idempotencyKey}'
      },
      body: JSON.stringify({
        transactionId: '123e4567-e89b-12d3-a456-426614174000',
        amount: 100,
        reason: 'customer_request'
      })
    });

    return {
      data: await response.json(),
      cached: response.headers.get('X-Idempotency-Cached')
    };
  }`
});

assert(secondRequest.cached === 'true');
assert.deepEqual(firstRequest, secondRequest.data);

// 4. Monitor API with Chrome Network tab
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/admin/api-monitor"
});

// Capture all API requests
await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    window.apiCalls = [];
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      window.apiCalls.push({ url: args[0], time: Date.now() });
      return originalFetch.apply(this, args);
    };
  `
});

// Make test request
await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    fetch('/api/v1/refunds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': crypto.randomUUID()
      },
      body: JSON.stringify({ transactionId: 'test', amount: 50, reason: 'fraud' })
    });
  `
});

// Extract captured requests
const capturedRequests = await mcp_chrome.use_browser({
  action: "eval",
  payload: "JSON.stringify(window.apiCalls)"
});

// 5. Run verification skill
// Invoke: superpowers:verification-before-completion
// Verify: All endpoint tests pass, validation works, idempotency correct
```

### Phase 4: Review & Completion

```typescript
// 1. Find silent failures
// Dispatch: silent-failure-hunter
// Focus: Missing try-catch, unhandled promise rejections, swallowed errors

// 2. Review test coverage
// Dispatch: pr-test-analyzer
// Verify: All endpoints tested, error scenarios covered, edge cases handled

// 3. Code review
// Invoke: superpowers:requesting-code-review
// Areas: Security, validation logic, error handling, rate limiting

// 4. Store API design decisions
await mcp_serena.write_memory({
  memory_file_name: "api-design-patterns.md",
  content: `# API Design Patterns

## Date: ${new Date().toISOString()}

### Endpoint Structure
- URL versioning: /api/v1/resource
- REST conventions: GET (list/get), POST (create), PUT (update), DELETE (remove)
- Always return structured response envelope { success, data/error, meta }

### Validation
- Use Zod for runtime type validation
- Validate at API boundary, not in business logic
- Return 400 with detailed validation errors

### Middleware Stack
1. Authentication (withAuth) - verify JWT/session
2. Rate Limiting (withRateLimit) - prevent abuse
3. Idempotency (withIdempotency) - prevent duplicate operations
4. Request ID - for tracing and debugging

### Error Handling
- 400: Client errors (validation, bad request)
- 401: Unauthorized (missing/invalid auth)
- 403: Forbidden (valid auth, insufficient permissions)
- 404: Not found
- 429: Rate limited
- 500: Server errors (never expose internals)

### Performance
- Database query optimization: Use indexes, limit results
- Response compression: gzip for responses > 1KB
- Caching: Redis for idempotency (24h), frequently accessed data (5m)
`
});
```

## MCP Integration Examples

### Serena Code Analysis

```typescript
// Find all API routes
const allRoutes = await mcp_serena.search_for_pattern({
  substring_pattern: "export.*function.*(GET|POST|PUT|DELETE|PATCH)",
  relative_path: "src/app/api",
  paths_include_glob: "**/route.ts"
});

// Analyze specific route handler
const refundHandler = await mcp_serena.find_symbol({
  name_path_pattern: "POST",
  relative_path: "src/app/api/v1/refunds/route.ts",
  include_body: true
});

// Find all middleware usage
const middlewareUsage = await mcp_serena.search_for_pattern({
  substring_pattern: "with(Auth|RateLimit|Idempotency|Validation)",
  relative_path: "src",
  paths_include_glob: "**/*.ts"
});

// Refactor common error handling into utility
const errorHandlers = await mcp_serena.search_for_pattern({
  substring_pattern: "catch.*error.*NextResponse\\.json",
  relative_path: "src/app/api"
});

// Replace duplicate error handling with shared utility
await mcp_serena.create_text_file({
  relative_path: "src/lib/api/error-handler.ts",
  content: `// Centralized API error handling...`
});
```

### Context7 Documentation

```typescript
// Get Next.js middleware documentation
const nextjsMiddleware = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/vercel/next.js",
  topic: "middleware edge runtime",
  mode: "code"
});

// Get OpenAPI spec generation docs
const openApiDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/swagger-api/swagger-ui",
  topic: "openapi 3.1 specification",
  mode: "info"
});

// Get rate limiting library docs
const rateLimitDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/upstash/ratelimit",
  topic: "sliding window rate limit",
  mode: "code"
});
```

### Playwright E2E Testing

```typescript
// Test complete API workflow
const scenarios = [
  { name: "Valid request", body: { transactionId: 'valid-uuid', amount: 100, reason: 'customer_request' }, expectedStatus: 201 },
  { name: "Missing idempotency key", headers: {}, expectedStatus: 400 },
  { name: "Invalid amount", body: { amount: -50 }, expectedStatus: 400 },
  { name: "Unauthorized", skipAuth: true, expectedStatus: 401 },
  { name: "Rate limited", repeat: 15, expectedStatus: 429 }
];

for (const scenario of scenarios) {
  // Execute test scenario...
}
```

### Chrome Dashboard Monitoring

```typescript
// Monitor API health dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/admin/api-health"
});

// Extract metrics
const metrics = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".api-metrics",
  payload: "text"
});
```

### Episodic Memory

```typescript
// Recall API versioning decisions
const versioningStrategy = await mcp_episodic_memory.search({
  query: ["API versioning", "breaking changes", "deprecation strategy"],
  mode: "both",
  limit: 5
});

// Find JWT authentication patterns
const authPatterns = await mcp_episodic_memory.search({
  query: "JWT authentication refresh token rotation",
  mode: "text"
});
```

## Agent Dispatch Patterns

When to dispatch specialized agents:

1. **code-architect**: Designing new API architecture or microservices structure
2. **code-reviewer**: Reviewing endpoint security, validation, and error handling
3. **silent-failure-hunter**: Finding missing error handlers and promise rejections
4. **pr-test-analyzer**: Verifying endpoint test coverage and edge cases

## Best Practices

### API Design
- **Versioning**: URL-based versioning (/api/v1/) for breaking changes
- **Idempotency**: Require Idempotency-Key for state-changing operations
- **Validation**: Fail fast with detailed validation errors
- **Pagination**: Cursor-based for large datasets, offset for simple lists
- **Rate Limiting**: Per-user limits to prevent abuse

### Security
- **Authentication**: JWT with short expiry + refresh token rotation
- **Authorization**: Role-based access control (RBAC)
- **Input Validation**: Never trust client input, validate everything
- **Output Sanitization**: Never expose internal errors or stack traces

### Development Workflow
1. Research: Context7 + Episodic Memory + WebSearch
2. Design: Brainstorming + Code Architect
3. Plan: Writing Plans skill
4. Implement: TDD + Serena code generation
5. Test: Playwright + Chrome monitoring
6. Review: Code reviewer + Silent failure hunter
7. Verify: Verification skill
8. Document: OpenAPI generation + Elements of style
