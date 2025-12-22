# Reference: Search APIs

## SERP API / Google Search

- **q**: Query string.
- **num**: Number of results (default 10).
- **siteSearch**: Restrict to domain.

## Parsing Strategy

- **Snippets**: Often sufficient for quick answers.
- **Full Text**: Required for code examples or deep technical details.
- **Markdown Conversion**: Use `read_url_content` to get clean markdown from HTML.
