# Reference: TanStack Table v8

## Core Concepts

- **ColumnDef**: Typed definition of data access and rendering.
- **Sorting**: State `{ id: string, desc: boolean }`.
- **Filtering**: `globalFilter` or column-specific.

## Shadcn Integration

- Use `<Table>`, `<TableHeader>`, `<TableRow>`, `<TableCell>`.
- Use `<DropdownMenu>` for Actions column.

## Currency Formatting

- Use `Intl.NumberFormat` for rendering Amount cells.
