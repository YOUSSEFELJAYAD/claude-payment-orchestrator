# Skill: Database Operations

**Role:** sequential-reasoner (Database Architect)
**Domain:** Data Persistence & Performance
**Objective:** Design database schemas, optimize queries, manage migrations, and ensure data integrity using MCP-powered code analysis, documentation lookup, and testing for PostgreSQL with Prisma ORM.

## Available Capabilities

### MCP Servers
| Server | Usage in Database Operations |
|--------|------------------------------|
| **Serena** | Find database queries, analyze schema usage, refactor models, trace query dependencies, generate migration files, optimize slow queries |
| **Context7** | Get Prisma ORM docs, PostgreSQL best practices, indexing strategies, transaction patterns, connection pooling documentation |
| **Playwright** | Test database-backed API endpoints, verify data persistence, validate query results, test transaction rollbacks |
| **Chrome** | Monitor database dashboard (pg Admin), view query performance, check connection pools, analyze slow query logs |
| **Episodic Memory** | Recall schema design decisions, retrieve migration patterns, find solutions to similar performance issues |

### Superpowers Skills
| Skill | When to Invoke |
|-------|----------------|
| `brainstorming` | Before designing schemas, indexing strategies, or data models |
| `systematic-debugging` | When investigating query performance, deadlocks, or data inconsistencies |
| `test-driven-development` | Before implementing database operations - write tests first |
| `verification-before-completion` | After migrations, before deploying schema changes |
| `writing-plans` | When planning complex migrations or data transformations |
| `requesting-code-review` | After critical schema changes or query optimizations |

### Specialized Agents
| Agent | When to Dispatch |
|-------|-----------------|
| `code-architect` | Designing database architecture or data model relationships |
| `code-reviewer` | Reviewing queries for N+1 problems, SQL injection, performance issues |
| `silent-failure-hunter` | Finding missing error handling in database operations |

## Logic Flow

```
┌───────────────────────────────────────────────────────────────────────┐
│                 COMPREHENSIVE DATABASE OPERATIONS FLOW                 │
├───────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  PHASE 1: SCHEMA DESIGN                                               │
│  ├─ Episodic Memory: Search past schema decisions                     │
│  ├─ Context7: Get Prisma schema best practices                        │
│  ├─ Brainstorming: Design entities, relationships, indexes            │
│  └─ WebSearch: Latest PostgreSQL performance patterns                 │
│                                                                        │
│  PHASE 2: IMPLEMENTATION                                              │
│  ├─ Serena: Analyze existing schema.prisma structure                  │
│  ├─ Update schema with proper types, relations, indexes               │
│  ├─ Generate migration: prisma migrate dev                            │
│  ├─ Context7: Get transaction and connection pooling docs             │
│  └─ Implement queries with proper error handling                      │
│                                                                        │
│  PHASE 3: OPTIMIZATION                                                │
│  ├─ Serena: Find all database queries in codebase                     │
│  ├─ Analyze for N+1 queries, missing indexes, inefficient joins       │
│  ├─ Chrome: Monitor query performance in pg Admin                     │
│  ├─ Add indexes, optimize queries, implement query caching            │
│  └─ Verification: Run benchmarks, verify performance improvements     │
│                                                                        │
│  PHASE 4: TESTING & VERIFICATION                                      │
│  ├─ TDD: Write database operation tests                               │
│  ├─ Playwright: Test API endpoints that use database                  │
│  ├─ Test transactions, rollbacks, concurrent operations               │
│  ├─ Verification skill: Run all tests, check for errors               │
│  └─ Serena memory: Store schema decisions and patterns                │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Schema Design

```typescript
// 1. Search past schema decisions
const schemaDecisions = await mcp_episodic_memory.search({
  query: ["database schema", "Prisma relations", "indexing strategy"],
  mode: "both",
  limit: 10
});

// 2. Get Prisma documentation
const prismaDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/prisma/prisma",
  topic: "schema relations indexes transactions",
  mode: "code"
});

// 3. Analyze existing schema
const currentSchema = await mcp_serena.read_file({
  relative_path: "prisma/schema.prisma"
});

// 4. Update schema with proper design
await mcp_serena.replace_content({
  relative_path: "prisma/schema.prisma",
  needle: "// Add payment refund model here",
  repl: `model Refund {
  id            String   @id @default(cuid())
  transactionId String
  amount        Decimal  @db.Decimal(10, 2)
  status        RefundStatus
  reason        String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  transaction   Transaction @relation(fields: [transactionId], references: [id])

  @@index([transactionId])
  @@index([status, createdAt])
  @@map("refunds")
}

enum RefundStatus {
  PENDING
  COMPLETED
  FAILED
  CANCELLED
}`,
  mode: "exact"
});

// 5. Generate and apply migration
await mcp_serena.execute_shell_command({
  command: "npx prisma migrate dev --name add_refund_model"
});
```

### Phase 2: Query Implementation

```typescript
// Use TDD - write tests first
// Invoke: superpowers:test-driven-development

// Implement repository with optimized queries
await mcp_serena.create_text_file({
  relative_path: "src/repositories/refund-repository.ts",
  content: `import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class RefundRepository {
  async create(data: Prisma.RefundCreateInput) {
    // Use transaction for consistency
    return await prisma.$transaction(async (tx) => {
      const refund = await tx.refund.create({ data });

      // Update transaction refunded amount
      await tx.transaction.update({
        where: { id: data.transactionId },
        data: {
          refundedAmount: {
            increment: data.amount
          }
        }
      });

      return refund;
    });
  }

  async findByTransactionId(transactionId: string) {
    // Optimized with proper index
    return await prisma.refund.findMany({
      where: { transactionId },
      orderBy: { createdAt: 'desc' },
      // Use select to avoid over-fetching
      select: {
        id: true,
        amount: true,
        status: true,
        createdAt: true
      }
    });
  }

  async getPendingRefunds(limit: number = 100) {
    // Uses compound index on (status, createdAt)
    return await prisma.refund.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: limit,
      // Include relation efficiently
      include: {
        transaction: {
          select: {
            id: true,
            merchantId: true,
            amount: true
          }
        }
      }
    });
  }

  async updateStatus(id: string, status: RefundStatus) {
    // Optimistic locking with version field
    return await prisma.refund.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date()
      }
    });
  }
}`
});
```

### Phase 3: Performance Optimization

```typescript
// 1. Find all database queries
const allQueries = await mcp_serena.search_for_pattern({
  substring_pattern: "prisma\\.[a-z]+\\.(find|create|update|delete)",
  relative_path: "src",
  paths_include_glob: "**/*.ts"
});

// 2. Analyze for N+1 queries
const nPlusOneQueries = await mcp_serena.search_for_pattern({
  substring_pattern: "for.*await.*prisma\\.",
  relative_path: "src"
});

// 3. Check for missing indexes
const whereClauseFields = await mcp_serena.search_for_pattern({
  substring_pattern: "where:\\s*{\\s*([a-zA-Z]+):",
  relative_path: "src"
});

// 4. Monitor query performance with Chrome
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:5050" // pgAdmin
});

await mcp_chrome.use_browser({
  action: "await_element",
  selector: ".slow-queries-panel",
  timeout: 5000
});

const slowQueries = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".slow-queries-list",
  payload: "text"
});

// 5. Add indexes to schema
await mcp_serena.replace_content({
  relative_path: "prisma/schema.prisma",
  needle: "model Transaction {",
  repl: `model Transaction {
  id           String   @id @default(cuid())
  merchantId   String
  amount       Decimal  @db.Decimal(10, 2)
  status       PaymentStatus
  createdAt    DateTime @default(now())

  @@index([merchantId, createdAt(sort: Desc)])
  @@index([status, createdAt])
  @@index([merchantId, status])
  @@map("transactions")
}`,
  mode: "exact"
});

await mcp_serena.execute_shell_command({
  command: "npx prisma migrate dev --name add_performance_indexes"
});
```

### Phase 4: Testing & Verification

```typescript
// 1. Test database operations
await mcp_serena.create_text_file({
  relative_path: "tests/repositories/refund-repository.test.ts",
  content: `import { RefundRepository } from '@/repositories/refund-repository';
import { prisma } from '@/lib/prisma';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';

describe('RefundRepository', () => {
  let repository: RefundRepository;

  beforeEach(async () => {
    // Clean database before each test
    await prisma.refund.deleteMany();
    await prisma.transaction.deleteMany();
    repository = new RefundRepository();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should create refund and update transaction atomically', async () => {
    const transaction = await prisma.transaction.create({
      data: {
        merchantId: 'merchant_123',
        amount: 100,
        status: 'COMPLETED'
      }
    });

    const refund = await repository.create({
      transactionId: transaction.id,
      amount: 50,
      status: 'PENDING',
      reason: 'customer_request'
    });

    expect(refund.amount).toBe(50);

    const updatedTx = await prisma.transaction.findUnique({
      where: { id: transaction.id }
    });

    expect(updatedTx.refundedAmount).toBe(50);
  });

  it('should rollback on transaction failure', async () => {
    // Test that partial failures don't corrupt data
    // ...
  });
});`
});

// 2. Test API endpoints with Playwright
await mcp_playwright.browser_navigate({ url: "http://localhost:3000/api/refunds" });

// 3. Run verification
// Invoke: superpowers:verification-before-completion

// 4. Store database patterns
await mcp_serena.write_memory({
  memory_file_name: "database-patterns.md",
  content: `# Database Patterns

## Schema Design
- Always add indexes for foreign keys
- Compound indexes for common WHERE + ORDER BY combinations
- Use enums for status fields (type-safe + performant)
- Decimal type for currency (never float)

## Query Optimization
- Use select to fetch only needed fields
- Include relations sparingly (N+1 trap)
- Implement pagination with cursor-based approach
- Use transactions for multi-table updates

## Connection Management
- PgBouncer for connection pooling in serverless
- Transaction mode for short-lived connections
- Session mode for long-lived connections

## Performance
- Analyze slow queries monthly
- Add indexes based on query patterns
- Use EXPLAIN ANALYZE for optimization
`
});
```

## Best Practices

### Schema Design
- Foreign keys always indexed
- Compound indexes for common query patterns
- Proper data types (Decimal for money, DateTime for timestamps)
- Enums for constrained values

### Query Patterns
- Use transactions for multi-table operations
- Select only needed fields (avoid SELECT *)
- Implement proper pagination
- Avoid N+1 queries with include/select

### Performance
- Index foreign keys and WHERE clause fields
- Use connection pooling (PgBouncer)
- Implement query result caching (Redis)
- Monitor slow queries regularly

### Development Workflow
1. Research: Context7 + Episodic Memory
2. Design: Brainstorming + Code Architect
3. Implement: TDD + Serena code generation
4. Optimize: Query analysis + Chrome monitoring
5. Verify: Verification skill + benchmarks
6. Document: Store patterns in Serena memory
