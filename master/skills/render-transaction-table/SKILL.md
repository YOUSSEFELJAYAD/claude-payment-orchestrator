# Skill: Render Transaction Table

**Role:** sequential-reasoner (Data Table Specialist)
**Domain:** UI/UX & Frontend
**Objective:** Implement feature-rich, accessible transaction tables using comprehensive MCP integration, real-time documentation, and end-to-end testing.

---

## Available Capabilities

### MCP Servers

| Server | Purpose | Key Operations |
|--------|---------|----------------|
| **Serena** | Semantic code analysis | Find table components, trace data fetching, analyze column definitions |
| **Context7** | Real-time documentation | TanStack Table docs, Shadcn DataTable patterns, virtualization |
| **Playwright** | E2E testing | Test sorting, filtering, pagination, row interactions |
| **Chrome** | Live browser control | Preview tables with real data, test performance, inspect DOM |
| **Episodic Memory** | Cross-session context | Past table implementations, performance optimizations |

### Superpowers Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `superpowers:brainstorming` | Before table design | Explore data visualization approach |
| `superpowers:systematic-debugging` | Table bugs | Debug sorting/filtering issues |
| `superpowers:test-driven-development` | Before implementation | Write table interaction tests |
| `superpowers:verification-before-completion` | Before claiming done | Verify all table features work |
| `superpowers:requesting-code-review` | After implementation | Review performance/accessibility |

### Specialized Agents

| Agent | Purpose |
|-------|---------|
| `frontend-developer` | React table implementation |
| `shadcn-ui-architect` | Shadcn DataTable integration |
| `playwright-testing` | Table interaction testing |
| `code-explorer` | Trace data flow from API to table |
| `code-reviewer` | Review table performance |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    TRANSACTION TABLE RENDERING                           │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Context7: Get TanStack Table v8 patterns                             │
│  ├─ Serena: Find existing table components                               │
│  ├─ Episodic Memory: Recall table performance patterns                   │
│  └─ Agent Dispatch: frontend-developer for architecture                  │
│                                                                           │
│  PHASE 2: DESIGN                                                         │
│  ├─ Brainstorming: Explore table features needed                         │
│  ├─ Define Columns: Status, Amount, Date, Card, PSP, Actions             │
│  ├─ Features: Sorting, pagination, filtering, row actions                │
│  └─ States: Loading (skeleton), empty, error, loaded                     │
│                                                                           │
│  PHASE 3: IMPLEMENTATION                                                 │
│  ├─ TDD: Write table interaction tests                                   │
│  ├─ Build: TanStack Table + Shadcn DataTable                             │
│  ├─ Accessibility: ARIA table roles, keyboard navigation                 │
│  └─ Performance: Virtualization for large datasets                       │
│                                                                           │
│  PHASE 4: VERIFICATION                                                   │
│  ├─ Playwright: Test sorting, filtering, pagination                      │
│  ├─ Chrome: Performance testing with large datasets                      │
│  ├─ Code Review: Check table accessibility                               │
│  └─ Serena Memory: Document column configuration patterns                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Research

**Context7 Documentation Lookup**
```typescript
// TanStack Table v8 (latest)
const tanstackDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/TanStack/table",
  topic: "useReactTable getSortedRowModel getPaginationRowModel",
  mode: "code"
});

// Shadcn DataTable component
const shadcnTableDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "data-table columns sorting filtering",
  mode: "code"
});

// React Virtual for large datasets
const virtualizationDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/TanStack/virtual",
  topic: "useVirtualizer windowing performance",
  mode: "code"
});

// Accessibility best practices
const a11yTableDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "table accessibility aria-sort role=grid",
  mode: "info"
});
```

**Serena Code Analysis**
```typescript
// Find existing table components
const tableComponents = await mcp_serena.find_symbol({
  name_path_pattern: "Table|DataTable|TransactionTable",
  substring_matching: true,
  include_body: true,
  depth: 2
});

// Find column definitions
const columnDefs = await mcp_serena.search_for_pattern({
  substring_pattern: "columnHelper|ColumnDef|createColumnHelper",
  relative_path: "src/components",
  context_lines_after: 5
});

// Find data fetching hooks
const dataHooks = await mcp_serena.find_symbol({
  name_path_pattern: "useTransactions|useFetchTransactions",
  include_body: true
});

// Analyze pagination/filtering logic
const tableLogic = await mcp_serena.search_for_pattern({
  substring_pattern: "pagination|sorting|filtering|useReactTable",
  relative_path: "src/components/tables"
});
```

**Episodic Memory Search**
```typescript
// Recall table performance issues
const perfIssues = await mcp_episodic_memory.search({
  query: ["table performance", "slow rendering", "virtualization"],
  mode: "both",
  limit: 10
});

// Find past table implementations
const tableHistory = await mcp_episodic_memory.search({
  query: ["transaction table", "data table", "tanstack table"],
  mode: "vector",
  after: "2024-01-01"
});

// Recall sorting/filtering decisions
const featureDecisions = await mcp_episodic_memory.search({
  query: "table sorting server-side client-side pagination",
  mode: "text"
});
```

### Phase 2: Design & Planning

**Agent Dispatch**
```json
{
  "requesting_agent": "render-transaction-table",
  "target_agent": "frontend-developer",
  "request_type": "table_architecture",
  "payload": {
    "query": "Design transaction table with sorting, filtering, pagination",
    "requirements": {
      "library": "tanstack-table-v8",
      "data_size": "1000+ transactions",
      "features": ["sorting", "pagination", "filtering", "row_actions"],
      "performance": "virtualization_if_needed"
    }
  }
}
```

**Brainstorming Skill**
```typescript
// Invoke brainstorming for table features
// Skill: superpowers:brainstorming
// Explores: Column selection, sorting strategy, pagination approach, mobile view
```

### Phase 3: Implementation

**Test-Driven Development**
```typescript
// Write tests FIRST
// Skill: superpowers:test-driven-development

describe('TransactionTable', () => {
  const mockTransactions = [
    { id: '1', amount: 100, status: 'success', date: '2024-01-01' },
    { id: '2', amount: 200, status: 'failed', date: '2024-01-02' },
    { id: '3', amount: 150, status: 'pending', date: '2024-01-03' }
  ];

  it('should render all transactions', () => {
    render(<TransactionTable data={mockTransactions} />);

    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
  });

  it('should sort by amount column', async () => {
    render(<TransactionTable data={mockTransactions} />);

    const amountHeader = screen.getByRole('button', { name: /amount/i });
    fireEvent.click(amountHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('$100.00');
    expect(rows[2]).toHaveTextContent('$150.00');
    expect(rows[3]).toHaveTextContent('$200.00');
  });

  it('should paginate results', () => {
    const manyTransactions = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      amount: i * 10,
      status: 'success',
      date: '2024-01-01'
    }));

    render(<TransactionTable data={manyTransactions} />);

    // Should show first 10 by default
    expect(screen.getAllByRole('row')).toHaveLength(11); // +1 for header

    // Click next page
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    // Should show next 10
    expect(screen.queryByText('$0.00')).not.toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('should filter by status', async () => {
    render(<TransactionTable data={mockTransactions} />);

    const statusFilter = screen.getByLabelText(/status/i);
    fireEvent.change(statusFilter, { target: { value: 'success' } });

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2); // 1 data + header
    });
  });

  it('should open row actions menu', async () => {
    render(<TransactionTable data={mockTransactions} />);

    const actionsButton = screen.getAllByRole('button', { name: /actions/i })[0];
    fireEvent.click(actionsButton);

    await waitFor(() => {
      expect(screen.getByText(/refund/i)).toBeVisible();
      expect(screen.getByText(/void/i)).toBeVisible();
    });
  });

  it('should show skeleton loading state', () => {
    render(<TransactionTable data={[]} isLoading={true} />);

    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument();
  });

  it('should show empty state', () => {
    render(<TransactionTable data={[]} isLoading={false} />);

    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });
});
```

**Implementation Example**
```typescript
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  date: string;
  card_last4: string;
  psp: string;
}

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant = {
        success: 'default',
        failed: 'destructive',
        pending: 'secondary'
      }[status];

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount / 100);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: 'card_last4',
    header: 'Card',
    cell: ({ row }) => {
      return <div className="font-mono">•••• {row.getValue('card_last4')}</div>;
    },
  },
  {
    accessorKey: 'psp',
    header: 'PSP',
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('psp')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleRefund(transaction.id)}>
              Refund
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleVoid(transaction.id)}>
              Void
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleView(transaction.id)}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TransactionTable({
  data,
  isLoading = false,
}: {
  data: Transaction[];
  isLoading?: boolean;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} total rows
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**Serena Memory Storage**
```typescript
// Store table configuration patterns
await mcp_serena.write_memory({
  memory_file_name: "transaction-table-config.md",
  content: `
# Transaction Table Configuration

## Column Definitions
- Status: Badge with color coding (success=green, failed=red, pending=gray)
- Amount: Right-aligned, USD formatted
- Date: Sortable, localized date format
- Card: Masked (•••• 4242)
- PSP: Capitalized PSP name
- Actions: Dropdown with Refund, Void, View Details

## Pagination
- Default page size: 10
- Options: 10, 20, 50, 100
- Server-side pagination for >1000 rows

## Sorting
- Client-side for <1000 rows
- Server-side for >1000 rows
- Default sort: Date descending

## States
- Loading: Skeleton rows (5 rows)
- Empty: "No transactions found" message
- Error: Error message + retry button
- Loaded: Data rows with pagination

## Performance
- Use virtualization (TanStack Virtual) for >1000 rows
- Memoize column definitions
- Debounce search/filter inputs (300ms)
`
});
```

### Phase 4: Testing & Verification

**Playwright Table Testing**
```typescript
// Navigate to transactions page
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/admin/transactions"
});

// Wait for table to load
await mcp_playwright.browser_wait_for({ text: "Transactions" });

// Test sorting by amount
await mcp_playwright.browser_click({
  element: "Amount",
  ref: "th-amount"
});

await mcp_playwright.browser_wait_for({ time: 0.5 });

// Screenshot sorted table
await mcp_playwright.browser_take_screenshot({
  filename: "table-sorted-amount.png"
});

// Test pagination
await mcp_playwright.browser_click({
  element: "Next",
  ref: "pagination-next"
});

await mcp_playwright.browser_wait_for({ time: 0.3 });

// Screenshot page 2
await mcp_playwright.browser_take_screenshot({
  filename: "table-page-2.png"
});

// Test row actions
await mcp_playwright.browser_click({
  element: "Actions menu",
  ref: "row-actions-0"
});

const snapshot = await mcp_playwright.browser_snapshot({});
// Verify actions menu items present

// Screenshot actions menu
await mcp_playwright.browser_take_screenshot({
  filename: "table-row-actions.png"
});

// Test filtering
await mcp_playwright.browser_type({
  element: "Search",
  ref: "table-search",
  text: "success"
});

await mcp_playwright.browser_wait_for({ time: 0.5 });

// Verify filtered results
const filteredSnapshot = await mcp_playwright.browser_snapshot({});

// Test accessibility
const a11ySnapshot = await mcp_playwright.browser_snapshot({});
// Verify ARIA table roles, sortable headers
```

**Chrome Performance Testing**
```typescript
// Navigate to table with large dataset
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/admin/transactions?limit=1000"
});

// Measure initial render time
const renderTime = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    performance.measure('table-render', 'navigationStart');
    performance.getEntriesByName('table-render')[0].duration;
  `
});

// Test sorting performance
const sortTime = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    const start = performance.now();
    document.querySelector('[data-column="amount"]').click();
    const end = performance.now();
    end - start;
  `
});

// Check memory usage
const memory = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    if (performance.memory) {
      ({
        used: performance.memory.usedJSHeapSize / 1048576,
        total: performance.memory.totalJSHeapSize / 1048576
      })
    }
  `
});

// Screenshot large table
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "table-large-dataset.png"
});
```

**Code Review**
```json
{
  "requesting_agent": "render-transaction-table",
  "target_agent": "code-reviewer",
  "request_type": "table_performance_review",
  "payload": {
    "file_path": "src/components/TransactionTable.tsx",
    "focus_areas": ["render_performance", "memoization", "accessibility"]
  }
}
```

**Verification Skill**
```typescript
// Skill: superpowers:verification-before-completion
// Verify:
// ✓ Sorting works on all sortable columns
// ✓ Pagination controls work correctly
// ✓ Row actions menu opens and works
// ✓ Filtering/search works
// ✓ Loading skeleton shows during fetch
// ✓ Empty state shows when no data
// ✓ Accessibility: ARIA table roles present
// ✓ Performance: <100ms render for 1000 rows
```

---

## MCP Integration Examples

### Serena: Find Table Components
```typescript
// Find all table implementations
const tables = await mcp_serena.find_symbol({
  name_path_pattern: "Table|DataTable",
  substring_matching: true,
  include_body: true
});

// Find column helper usage
const columnHelpers = await mcp_serena.search_for_pattern({
  substring_pattern: "createColumnHelper|ColumnDef",
  relative_path: "src"
});

// Analyze table performance
const perfPatterns = await mcp_serena.search_for_pattern({
  substring_pattern: "useMemo|memo\\(|React\\.memo",
  relative_path: "src/components/tables"
});
```

### Context7: Table Libraries
```typescript
// TanStack Table API
const tableAPI = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/TanStack/table",
  topic: "column helpers sorting filtering pagination",
  mode: "code"
});

// Virtualization for large datasets
const virtualDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/TanStack/virtual",
  topic: "useVirtualizer windowScroll",
  mode: "code"
});

// Shadcn Table components
const shadcnTable = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/shadcn-ui/ui",
  topic: "table data-table",
  mode: "code"
});
```

### Playwright: Interaction Testing
```typescript
// Test complete table workflow
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/admin/transactions"
});

// Sort, then filter, then paginate
await mcp_playwright.browser_click({ element: "Amount", ref: "th-amount" });
await mcp_playwright.browser_type({ element: "Search", ref: "search", text: "success" });
await mcp_playwright.browser_click({ element: "Next", ref: "next-btn" });

// Verify final state
const finalSnapshot = await mcp_playwright.browser_snapshot({});
```

### Chrome: Real-time Preview
```typescript
// Load table in browser
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/admin/transactions"
});

// Extract table data
const tableData = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    Array.from(document.querySelectorAll('tbody tr')).map(row => ({
      cells: Array.from(row.querySelectorAll('td')).map(cell => cell.textContent)
    }))
  `
});

// Screenshot table
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "transaction-table.png"
});
```

### Episodic Memory: Performance History
```typescript
// Recall table performance issues
const perfHistory = await mcp_episodic_memory.search({
  query: ["table slow", "virtualization", "pagination performance"],
  mode: "both"
});

// Find past optimizations
const optimizations = await mcp_episodic_memory.search({
  query: "tanstack table memoization performance improvement",
  mode: "vector"
});
```

---

## Agent Dispatch Patterns

### Table Architecture
```json
{
  "requesting_agent": "render-transaction-table",
  "target_agent": "frontend-developer",
  "request_type": "implement_data_table",
  "payload": {
    "library": "tanstack-table-v8",
    "features": ["sorting", "pagination", "filtering", "row_actions"],
    "data_source": "server_paginated"
  }
}
```

### Testing Strategy
```json
{
  "requesting_agent": "render-transaction-table",
  "target_agent": "playwright-testing",
  "request_type": "table_test_strategy",
  "payload": {
    "component": "TransactionTable",
    "scenarios": ["sort_all_columns", "paginate", "filter", "row_actions"]
  }
}
```

---

## Best Practices

### Performance
- **Memoization**: Memoize column definitions, row data
- **Virtualization**: Use for >1000 rows
- **Server Pagination**: For >10k total records
- **Debounce**: Search/filter inputs (300ms)

### Accessibility
- **ARIA Roles**: role="table", aria-sort for sortable columns
- **Keyboard Navigation**: Arrow keys for navigation
- **Screen Reader**: Announce sort state changes
- **Focus Management**: Maintain focus during pagination

### UX
- **Loading States**: Skeleton rows during fetch
- **Empty States**: Clear "no data" message
- **Error Handling**: Retry button on error
- **Responsive**: Mobile-friendly column priority

### Data Management
- **Type Safety**: Strong typing for row data
- **Null Handling**: Graceful null/undefined values
- **Date Formatting**: Localized date/time
- **Currency**: Proper currency formatting

### Testing
- **Visual Regression**: Screenshot table states
- **Interaction Tests**: Sort, filter, paginate
- **Performance Tests**: Render time benchmarks
- **Accessibility**: ARIA structure verification
