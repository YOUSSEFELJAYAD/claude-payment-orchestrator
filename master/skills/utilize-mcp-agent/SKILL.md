# Skill: Utilize MCP Agent

**Role:** sequential-reasoner (MCP Orchestration Architect)
**Domain:** AI Agent Integration & Orchestration
**Objective:** Master the Model Context Protocol ecosystem to orchestrate powerful multi-tool workflows combining semantic code analysis, browser automation, real-time documentation lookup, and cross-session knowledge management for maximum development productivity.

## Available Capabilities

### MCP Servers
| Server | Purpose | Key Use Cases |
|--------|---------|---------------|
| **Serena** | Semantic code analysis & modification | Find symbols, refactor code, trace dependencies, generate files, execute shell commands, project-level memory |
| **Context7** | Real-time library documentation | Get latest API docs for React, Next.js, Stripe, Prisma, Zod, Tailwind, etc. Always up-to-date |
| **Playwright** | Browser automation & E2E testing | Navigate pages, fill forms, click elements, take screenshots, capture network requests, accessibility snapshots |
| **Chrome** | Persistent browser control via CDP | Multi-tab management, live debugging, extract data, monitor dashboards, screenshot generation |
| **Episodic Memory** | Cross-session conversation search | Find past decisions, recall solutions, retrieve patterns, access historical context |

### All Available Tools

#### Serena Tools
- `find_symbol` - Semantic symbol search (classes, functions, methods)
- `get_symbols_overview` - Get file structure overview
- `find_referencing_symbols` - Find all references to a symbol
- `replace_symbol_body` - Safely refactor symbol implementation
- `insert_after_symbol` - Add code after a symbol
- `replace_content` - Find and replace with regex
- `rename_symbol` - Rename across all references
- `search_for_pattern` - Search code with regex patterns
- `list_dir` - List directory contents
- `read_file` - Read file contents
- `create_text_file` - Create new files
- `write_memory` - Store project-level decisions
- `read_memory` - Retrieve project decisions
- `list_memories` - List all memory files
- `execute_shell_command` - Run shell commands

#### Context7 Tools
- `resolve_library_id` - Get library ID from name
- `get_library_docs` - Get documentation for topic (code/info mode)

#### Playwright Tools
- `browser_navigate` - Navigate to URL
- `browser_click` - Click element
- `browser_type` - Type text and optionally submit
- `browser_fill_form` - Fill entire form
- `browser_select_option` - Select from dropdown
- `browser_snapshot` - Get accessibility tree
- `browser_take_screenshot` - Capture screenshot
- `browser_wait_for` - Wait for text/element/timeout
- `browser_console_messages` - Get console logs
- `browser_network_requests` - Capture HTTP requests
- `browser_evaluate` - Execute JavaScript
- `browser_run_code` - Run async code with page access
- `browser_tabs` - Manage multiple tabs
- `browser_resize` - Change viewport size
- `browser_press_key` - Keyboard input
- `browser_navigate_back` - Go back in history

#### Chrome Tools
- `use_browser` - Single tool with action parameter:
  - `navigate` - Go to URL (auto-screenshots)
  - `click` - Click selector
  - `type` - Type text (\\n to submit)
  - `extract` - Extract text/markdown from selector
  - `screenshot` - Take screenshot
  - `eval` - Execute JavaScript
  - `new_tab` - Open new tab
  - `list_tabs` - List all tabs
  - `close_tab` - Close tab by index
  - `await_element` - Wait for selector
  - `await_text` - Wait for text

#### Episodic Memory Tools
- `search` - Search conversations (vector, text, or both mode)
- `read` - Read full conversation with line range

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MCP ORCHESTRATION FLOW                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. DISCOVER    → Identify task requirements and available tools    │
│  2. RESEARCH    → Context7 for docs + Episodic Memory for history   │
│  3. ANALYZE     → Serena for code understanding and structure        │
│  4. PLAN        → Design multi-tool workflow with dependencies      │
│  5. EXECUTE     → Chain tools: output of one feeds into next        │
│  6. VERIFY      → Playwright/Chrome for testing and validation      │
│  7. STORE       → Serena memory + Episodic Memory for future        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Multi-Tool Workflows

### 1. Documentation-Driven Development

```typescript
// Step 1: Get latest API documentation
const library = await mcp_context7.resolve_library_id({
  libraryName: "stripe"
});

const docs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: library.id, // "/stripe/stripe-node"
  topic: "payment intents create confirm",
  mode: "code"
});

// Step 2: Find existing implementation with Serena
const existingImpl = await mcp_serena.find_symbol({
  name_path_pattern: "StripeAdapter/processPayment",
  include_body: true
});

// Step 3: Update implementation based on latest docs
await mcp_serena.replace_symbol_body({
  name_path: "StripeAdapter/processPayment",
  relative_path: "src/adapters/stripe.ts",
  body: updatedCodeFromDocs
});

// Step 4: Test with Playwright
await mcp_playwright.browser_navigate({ url: "http://localhost:3000/checkout" });
// ... test payment flow

// Step 5: Store decision
await mcp_serena.write_memory({
  memory_file_name: "stripe-integration.md",
  content: "Updated to Stripe API v2024.12..."
});
```

### 2. Debug Workflow

```typescript
// Step 1: Search past similar issues
const pastIssues = await mcp_episodic_memory.search({
  query: ["payment timeout", "3DS failure"],
  mode: "both",
  limit: 5
});

// Step 2: Trace code execution with Serena
const paymentFlow = await mcp_serena.find_symbol({
  name_path_pattern: "processPayment",
  include_body: true
});

const callers = await mcp_serena.find_referencing_symbols({
  name_path: "processPayment",
  relative_path: "src/payments/processor.ts"
});

// Step 3: Reproduce in browser with Playwright
await mcp_playwright.browser_navigate({ url: "http://localhost:3000" });
// ... reproduce error

const consoleErrors = await mcp_playwright.browser_console_messages({
  level: "error"
});

// Step 4: Live debug with Chrome
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000"
});

const debugInfo = await mcp_chrome.use_browser({
  action: "eval",
  payload: "window.__DEBUG_STATE__"
});
```

### 3. Code Analysis + Refactoring

```typescript
// Step 1: Get file overview
const overview = await mcp_serena.get_symbols_overview({
  relative_path: "src/payments/orchestrator.ts",
  depth: 2
});

// Step 2: Find all callers before changing
const refs = await mcp_serena.find_referencing_symbols({
  name_path: "PaymentOrchestrator/execute",
  relative_path: "src/payments/orchestrator.ts"
});

// Step 3: Safe refactor
await mcp_serena.replace_symbol_body({
  name_path: "PaymentOrchestrator/execute",
  relative_path: "src/payments/orchestrator.ts",
  body: newImplementation
});

// Step 4: Verify no breakage
await mcp_serena.execute_shell_command({
  command: "bun test src/payments/__tests__"
});
```

### 4. Payment Flow Verification

```typescript
// Step 1: Navigate to checkout
await mcp_playwright.browser_navigate({ url: "http://localhost:3000/checkout" });

// Step 2: Fill form
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card", type: "textbox", ref: "card", value: "4111111111111111" }
  ]
});

// Step 3: Submit and capture network
await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

const requests = await mcp_playwright.browser_network_requests({});
const paymentRequest = requests.find(r => r.url.includes('/api/payments'));

// Step 4: Verify in dashboard with Chrome
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/test/payments"
});

await mcp_chrome.use_browser({
  action: "await_element",
  selector: ".PaymentsList",
  timeout: 10000
});

const latestPayment = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".PaymentsList tr:first-child",
  payload: "text"
});
```

## Best Practices

### Tool Selection
- **Serena**: Use for all code operations (read, write, search, refactor)
- **Context7**: Use before implementing any library integration
- **Playwright**: Use for automated testing and E2E flows
- **Chrome**: Use for live debugging and dashboard monitoring
- **Episodic Memory**: Use before making major decisions

### Chaining Patterns
- Output of Context7 docs → Input to Serena code generation
- Output of Serena find_symbol → Input to replace_symbol_body
- Output of Playwright test → Input to Chrome debugging
- Output of all tools → Input to Serena write_memory

### Error Handling
- MCP tools can fail - always have fallback strategies
- Validate inputs before passing to MCP tools
- Chain with try-catch for resilience

### Performance
- Parallel execution: Run independent MCP calls concurrently
- Context7 caches responses for 15 minutes
- Playwright maintains page state between calls
- Serena executes in project context

## Development Workflow

1. **Research**: Context7 + Episodic Memory + WebSearch
2. **Analyze**: Serena code analysis and structure mapping
3. **Design**: Brainstorming + Code Architect agent
4. **Implement**: Serena code generation + modification
5. **Test**: Playwright E2E + Chrome monitoring
6. **Verify**: Verification skill + actual command execution
7. **Review**: Code reviewer + Silent failure hunter
8. **Store**: Serena memory + Episodic Memory for future

## Popular Library IDs for Context7

```typescript
// Payments
"/stripe/stripe-node"
"/adyen/adyen-node-api-library"

// Frontend
"/facebook/react"
"/vercel/next.js"
"/tailwindlabs/tailwindcss"
"/shadcn-ui/ui"
"/tanstack/table"

// Backend
"/expressjs/express"
"/honojs/hono"
"/prisma/prisma"

// Validation & Forms
"/colinhacks/zod"
"/react-hook-form/react-hook-form"

// State Management
"/pmndrs/zustand"
"/tanstack/query"
```

## Integration Patterns

Every skill should leverage ALL MCP servers:
- Start with **Episodic Memory** to learn from past
- Use **Context7** for latest documentation
- Use **Serena** for code operations
- Use **Playwright** for automated testing
- Use **Chrome** for live debugging
- Store learnings back to **Serena memory**
