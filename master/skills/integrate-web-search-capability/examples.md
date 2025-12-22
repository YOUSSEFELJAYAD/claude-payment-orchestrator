# Examples: Python Search Wrapper

```python
def search_and_summarize(query, domain=None):
    if domain:
        query += f" site:{domain}"

    results = search_tool.search(query)

    summary = ""
    for r in results[:3]:
        summary += f"- [{r['title']}]({r['link']}): {r['snippet']}\n"

    return summary
```
