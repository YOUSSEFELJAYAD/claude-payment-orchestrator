# Reference: Dev Browser API

## Client Methods

| Method | Description |
|--------|-------------|
| `connect(url?)` | Connect to server (default: `http://localhost:9222`) |
| `client.page(name)` | Get or create named page |
| `client.list()` | List all page names |
| `client.close(name)` | Close a named page |
| `client.disconnect()` | Disconnect (pages persist) |
| `client.getAISnapshot(name)` | Get ARIA accessibility tree |
| `client.selectSnapshotRef(name, ref)` | Get element by ref (e.g., "e5") |

## ARIA Snapshot Format

```yaml
- role "accessible name" [ref=eN] [state]:
  - child elements
```

**Roles:** button, link, textbox, heading, listitem, checkbox, radio, combobox
**States:** [checked], [disabled], [expanded], [level=N]
**Properties:** /url:, /placeholder:, /value:

## Playwright Page Methods

| Method | Use Case |
|--------|----------|
| `page.goto(url)` | Navigate |
| `page.click(selector)` | Click element |
| `page.fill(selector, text)` | Fill input |
| `page.screenshot({ path })` | Capture screenshot |
| `page.evaluate(fn)` | Run JS in browser (plain JS only) |
| `page.waitForSelector(sel)` | Wait for element |
| `page.waitForURL(pattern)` | Wait for navigation |
| `page.textContent(sel)` | Get element text |

## Server Flags

- `--headless` - Run browser without visible window
- Default port: 9222
- Profiles stored in: `profiles/`
- Scripts stored in: `tmp/`
