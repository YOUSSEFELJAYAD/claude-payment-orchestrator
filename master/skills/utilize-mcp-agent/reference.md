# Reference: Model Context Protocol

## Core Primitives

| Primitive | Purpose | Access Pattern |
|-----------|---------|----------------|
| **Resources** | Passive data sources (files, logs, DB rows) | `read_resource(uri)` |
| **Tools** | Executable functions (API calls, mutations) | `call_tool(name, args)` |
| **Prompts** | Pre-defined templates | `get_prompt(name, args)` |

## Available MCP Servers & Tools

### Serena (Semantic Code Analysis)

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `find_symbol` | Locate code symbols by name pattern | `name_path_pattern`, `relative_path`, `include_body`, `depth` |
| `find_referencing_symbols` | Find all references to a symbol | `name_path`, `relative_path` |
| `get_symbols_overview` | High-level view of file symbols | `relative_path`, `depth` |
| `replace_symbol_body` | Refactor a symbol's implementation | `name_path`, `relative_path`, `body` |
| `insert_after_symbol` | Add code after a symbol | `name_path`, `relative_path`, `body` |
| `insert_before_symbol` | Add code before a symbol | `name_path`, `relative_path`, `body` |
| `rename_symbol` | Rename across entire codebase | `name_path`, `relative_path`, `new_name` |
| `search_for_pattern` | Regex search in codebase | `substring_pattern`, `relative_path`, `context_lines_before/after` |
| `replace_content` | Regex-based file editing | `relative_path`, `needle`, `repl`, `mode` |
| `read_file` | Read file contents | `relative_path`, `start_line`, `end_line` |
| `create_text_file` | Create or overwrite file | `relative_path`, `content` |
| `list_dir` | List directory contents | `relative_path`, `recursive` |
| `find_file` | Find files by mask | `file_mask`, `relative_path` |
| `execute_shell_command` | Run shell commands | `command`, `cwd` |

### Playwright (Browser Automation)

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `browser_navigate` | Navigate to URL | `url` |
| `browser_snapshot` | Capture accessibility tree | `filename` (optional) |
| `browser_click` | Click element | `element`, `ref` |
| `browser_type` | Type text into element | `element`, `ref`, `text`, `submit` |
| `browser_fill_form` | Fill multiple form fields | `fields[]` with `name`, `type`, `ref`, `value` |
| `browser_select_option` | Select dropdown option | `element`, `ref`, `values[]` |
| `browser_take_screenshot` | Capture visual screenshot | `filename`, `fullPage`, `element`, `ref` |
| `browser_evaluate` | Execute JavaScript | `function`, `element`, `ref` |
| `browser_wait_for` | Wait for condition | `text`, `textGone`, `time` |
| `browser_press_key` | Press keyboard key | `key` |
| `browser_tabs` | Manage browser tabs | `action` (list/new/close/select), `index` |
| `browser_network_requests` | Get network activity | `includeStatic` |
| `browser_console_messages` | Get console output | `level` |
| `browser_handle_dialog` | Handle alerts/confirms | `accept`, `promptText` |
| `browser_drag` | Drag and drop | `startElement`, `startRef`, `endElement`, `endRef` |
| `browser_hover` | Hover over element | `element`, `ref` |
| `browser_file_upload` | Upload files | `paths[]` |
| `browser_resize` | Resize window | `width`, `height` |
| `browser_close` | Close page | - |
| `browser_install` | Install browser | - |
| `browser_run_code` | Run Playwright code | `code` |

### Context7 (Documentation Lookup)

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `resolve-library-id` | Find library ID | `libraryName` |
| `get-library-docs` | Fetch documentation | `context7CompatibleLibraryID`, `topic`, `mode` (code/info), `page` |

### Chrome (Persistent Browser)

| Action | Purpose | Parameters |
|--------|---------|------------|
| `navigate` | Load URL | `payload`: URL |
| `click` | Click element | `selector`: CSS/XPath |
| `type` | Enter text | `selector`, `payload`: text (append `\n` to submit) |
| `extract` | Extract content | `selector`, `payload`: format (text/html/markdown) |
| `screenshot` | Capture image | `payload`: filename |
| `eval` | Execute JavaScript | `payload`: JS code |
| `select` | Select option | `selector`, `payload`: option value |
| `attr` | Get attribute | `selector`, `payload`: attribute name |
| `await_element` | Wait for element | `selector`, `timeout` |
| `await_text` | Wait for text | `payload`: text, `timeout` |
| `new_tab` | Open new tab | - |
| `close_tab` | Close tab | `tab_index` |
| `list_tabs` | List open tabs | - |

### Episodic Memory

| Tool | Purpose | Key Parameters |
|------|---------|----------------|
| `search` | Search past conversations | `query` (string or array), `mode`, `limit`, `before`, `after` |
| `read` | Read full conversation | `path`, `startLine`, `endLine` |

## JSON-RPC 2.0 Protocol

MCP uses JSON-RPC for Client (Agent) ↔ Server communication:

```json
// Request
{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "find_symbol",
    "arguments": { "name_path_pattern": "Payment" }
  },
  "id": 1
}

// Response
{
  "jsonrpc": "2.0",
  "result": { "symbols": [...] },
  "id": 1
}
```

## Symbol Path Patterns

Serena uses name paths to identify code symbols:

| Pattern | Matches |
|---------|---------|
| `MyClass` | Any symbol named `MyClass` |
| `MyClass/method` | Method inside `MyClass` |
| `/MyClass/method` | Exact path (absolute) |
| `MyClass/method[0]` | First overload of method |

## Best Practices

1. **Parallel Calls**: Independent MCP calls can run simultaneously
2. **Error Recovery**: Always handle tool failures gracefully
3. **Resource Efficiency**: Use `depth` and `include_body` judiciously
4. **Browser State**: Playwright maintains state between calls
5. **Documentation Cache**: Context7 caches for 15 minutes
6. **Memory Search**: Use array queries for precise AND matching
