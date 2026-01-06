# Test Suite

This directory contains tests for the Claude Payment Orchestrator plugin.

## Structure

```
tests/
├── mcp-mocks/          # Mock MCP server implementations
│   ├── index.ts        # Main exports
│   ├── types.ts        # Type definitions
│   ├── serena.ts       # Mock Serena server
│   ├── context7.ts     # Mock Context7 server
│   ├── playwright.ts   # Mock Playwright server
│   ├── episodic-memory.ts  # Mock Episodic Memory server
│   └── client.ts       # Unified mock client
├── skills/             # Skill-specific tests
│   ├── payment-orchestration.test.ts
│   └── pci-compliance.test.ts
├── agents/             # Agent behavior tests
└── integration/        # Integration tests
```

## Running Tests

```bash
# Run all tests
bun test

# Run specific test file
bun test tests/skills/payment-orchestration.test.ts

# Run with coverage
bun test --coverage

# Watch mode
bun test --watch
```

## MCP Mocks

The mock framework provides simulated MCP servers for testing without external dependencies.

### Basic Usage

```typescript
import { createMockMCP } from './mcp-mocks';

const mcp = createMockMCP();

// Use mock Serena
const result = await mcp.serena.find_symbol({
  name_path_pattern: 'MyClass',
});

// Use mock Context7
const docs = await mcp.context7.query_docs({
  libraryId: '/stripe/stripe-node',
  query: 'payment intents',
});

// Use mock Playwright
await mcp.playwright.browser_navigate({
  url: 'https://example.com',
});
```

### Pre-configured Mocks

```typescript
import { createPaymentTestMocks, createPCITestMocks } from './mcp-mocks';

// Payment integration testing
const paymentMocks = createPaymentTestMocks();

// PCI compliance testing
const pciMocks = createPCITestMocks();
```

### Adding Custom Data

```typescript
const mcp = createMockMCP();

// Add files
mcp.serena.addFile('src/service.ts', 'export class Service {}');

// Add symbols
mcp.serena.addSymbol('src/service.ts', {
  name: 'Service',
  kind: 'class',
  location: { file: 'src/service.ts', line: 1, column: 0 },
});

// Add pages
mcp.playwright.addPage('https://myapp.com', {
  url: 'https://myapp.com',
  title: 'My App',
  content: '<html>...</html>',
  elements: [{ ref: 'btn', type: 'button', text: 'Click' }],
});

// Add conversations
mcp.episodicMemory.addConversation({
  id: 'conv-001',
  date: '2024-01-01',
  project: 'test',
  content: 'Previous conversation...',
  snippets: ['relevant', 'snippets'],
});
```

## Writing Tests

### Skill Tests

```typescript
describe('My Skill', () => {
  let mcp: MockMCPClient;

  beforeEach(() => {
    mcp = createMockMCP();
    // Set up test data
  });

  it('should find relevant symbols', async () => {
    mcp.serena.addFile('src/test.ts', '...');

    const result = await mcp.serena.find_symbol({
      name_path_pattern: 'TestClass',
    });

    expect(result.success).toBe(true);
  });
});
```

### Agent Tests

```typescript
describe('My Agent', () => {
  it('should use correct MCP tools', async () => {
    const mcp = createMockMCP();

    // Simulate agent workflow
    const docs = await mcp.context7.query_docs({...});
    const code = await mcp.serena.find_symbol({...});

    // Verify behavior
    expect(docs.success).toBe(true);
    expect(code.success).toBe(true);
  });
});
```

## Best Practices

1. **Reset between tests**: Call `mcp.reset()` or create new instance in `beforeEach`
2. **Use typed responses**: All mock methods return `MockResponse<T>`
3. **Add realistic data**: Use `createPaymentTestMocks()` for common setups
4. **Test error cases**: Mock servers can return errors
5. **Keep tests focused**: One assertion per test when possible
