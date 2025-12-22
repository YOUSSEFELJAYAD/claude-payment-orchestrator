# Skill: Integrate Web Search Capability

**Role:** sequential-reasoner (Researcher)
**Domain:** Agentic & Integrations
**Objective:** Empower the AI agent with real-time web access to fetch up-to-date documentation, resolve unknown errors, and verify current standards using web search and browser automation.

## Available Capabilities

| Category | Capability | Research Use Case |
|----------|-----------|-------------------|
| **Built-in Tools** | | |
| WebSearch | Real-time Search | Find latest API documentation, error messages |
| WebFetch | URL Content | Fetch specific documentation pages |
| **MCP Servers** | | |
| Chrome | Browser Access | Navigate PSP portals, extract documentation |
| Playwright | Page Interaction | Test documentation examples, verify code |
| Context7 | Library Docs | Get real-time library documentation |
| Episodic Memory | Past Searches | Recall previous search results, solutions |
| **Superpowers** | | |
| brainstorming | Research Planning | Plan research strategy before searching |

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                  WEB SEARCH RESEARCH WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────┤
│  1. MEMORY        → Episodic: Check for past similar searches           │
│  2. CONTEXT7      → Try library docs first (faster, structured)         │
│  3. QUERY FORM    → Convert intent to specific search query             │
│  4. WEB SEARCH    → Search web with domain restrictions                 │
│  5. FETCH         → WebFetch top 3-5 results                            │
│  6. EXTRACT       → Chrome/Playwright: Extract relevant content         │
│  7. VERIFY        → Cross-check multiple sources                        │
│  8. SYNTHESIZE    → Combine findings with citations                     │
│  9. TEST          → Playwright: Test code examples from docs            │
│  10. DOCUMENT     → Store findings in Episodic Memory                   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

```typescript
// Research workflow
async function researchPaymentAPI(topic: string) {
  // 1. Check episodic memory first
  const pastResearch = await mcp_episodic_memory.search({
    query: topic,
    mode: "both",
    limit: 3
  });

  if (pastResearch.length > 0) {
    console.log("Found past research:", pastResearch);
  }

  // 2. Try Context7 (structured library docs)
  try {
    const libDocs = await mcp_context7.get_library_docs({
      context7CompatibleLibraryID: "/stripe/stripe-node",
      topic: topic,
      mode: "code"
    });
    return libDocs;  // Prefer structured docs
  } catch (e) {
    // Context7 didn't have it, use WebSearch
  }

  // 3. Web search with domain restrictions
  const searchResults = await WebSearch({
    query: `${topic} site:stripe.com OR site:docs.stripe.com`,
    allowed_domains: ["stripe.com", "docs.stripe.com"]
  });

  // 4. Fetch top results
  const topUrls = searchResults.results.slice(0, 3).map(r => r.url);

  for (const url of topUrls) {
    const content = await WebFetch({
      url: url,
      prompt: `Extract API documentation for: ${topic}`
    });

    console.log(`Content from ${url}:`, content);
  }

  // 5. Use Chrome for interactive navigation
  await mcp_chrome.use_browser({
    action: "navigate",
    payload: searchResults.results[0].url
  });

  const docContent = await mcp_chrome.use_browser({
    action: "extract",
    payload: "markdown"
  });

  return docContent;
}
```

## MCP Integration Examples

### WebSearch with Domain Restrictions

```typescript
// Search official documentation only
const stripeDocs = await WebSearch({
  query: "Stripe PaymentIntent capture API 2025",
  allowed_domains: ["stripe.com"]
});

// Exclude community forums (official docs only)
const adyenDocs = await WebSearch({
  query: "Adyen payment authorisation",
  blocked_domains: ["stackoverflow.com", "reddit.com"]
});

// Payment gateway comparison
const comparison = await WebSearch({
  query: "Stripe vs Adyen vs CyberSource fees 2025"
});

// Error message research
const errorSolution = await WebSearch({
  query: "Stripe error card_declined insufficient_funds"
});
```

### WebFetch for Specific Pages

```typescript
// Fetch specific documentation page
const paymentIntentDocs = await WebFetch({
  url: "https://docs.stripe.com/api/payment_intents",
  prompt: "Extract the structure of PaymentIntent object and all status values"
});

// Fetch changelog
const changelog = await WebFetch({
  url: "https://docs.stripe.com/changelog",
  prompt: "List all breaking changes in the last 6 months"
});
```

### Chrome for Interactive Research

```typescript
// Navigate to PSP dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://dashboard.stripe.com/developers"
});

// Extract API keys documentation
const apiKeysDocs = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".api-keys-documentation",
  payload: "markdown"
});

// Take screenshot
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "tmp/stripe-dashboard.png"
});
```

### Playwright for Testing Documentation Examples

```typescript
// Test code example from documentation
await mcp_playwright.browser_navigate({
  url: "https://docs.stripe.com/api/payment_intents/create"
});

// Extract code example
const codeExample = await mcp_playwright.browser_evaluate({
  function: "() => document.querySelector('pre code').textContent"
});

// Test the example
console.log("Testing code example:", codeExample);
```

## Best Practices

### Domain Restriction

```typescript
// Official docs only
const officialOnly = {
  stripe: ["stripe.com", "docs.stripe.com"],
  adyen: ["adyen.com", "docs.adyen.com"],
  cybersource: ["developer.cybersource.com"],
  mastercard: ["developer.mastercard.com"]
};

// Search with restrictions
await WebSearch({
  query: "Stripe 3D Secure 2",
  allowed_domains: officialOnly.stripe
});
```

### Fact Checking

```typescript
// Cross-check multiple sources
const source1 = await WebFetch({
  url: "https://docs.stripe.com/3d-secure",
  prompt: "How to implement 3D Secure 2?"
});

const source2 = await WebFetch({
  url: "https://stripe.com/blog/3d-secure-2",
  prompt: "How to implement 3D Secure 2?"
});

// Compare and synthesize
if (source1 !== source2) {
  console.log("Conflicting information - verify manually");
}
```

### Citation

```typescript
// Always cite sources in responses
const response = `
According to Stripe documentation:
"3D Secure 2 authentication..." [1]

According to Adyen documentation:
"EMV 3DS implementation requires..." [2]

Sources:
[1] https://docs.stripe.com/3d-secure
[2] https://docs.adyen.com/online-payments/3d-secure
`;
```

### Store Findings

```typescript
// Store research in Serena memory for future reference
await mcp_serena.write_memory({
  memory_file_name: "stripe-3ds-research.md",
  content: `
# Stripe 3D Secure 2 Implementation

## Research Date: 2024-12-18

## Key Findings
- Stripe supports 3DS2 by default
- No additional integration required
- Handled automatically via PaymentIntent

## Sources
- https://docs.stripe.com/3d-secure
- https://stripe.com/blog/3d-secure-2

## Code Example
[Include tested example]
  `
});
```
