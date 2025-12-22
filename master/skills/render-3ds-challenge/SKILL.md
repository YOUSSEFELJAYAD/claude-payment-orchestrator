# Skill: Render 3DS Challenge

**Role:** sequential-reasoner (UI Security)
**Domain:** UI/UX & Frontend
**Objective:** Securely render 3D Secure 2.0 challenges using comprehensive MCP-powered security workflow with browser testing, code analysis, 3DS SDK documentation, and historical challenge patterns.

---

## Available Capabilities

### MCP Servers
| Server | 3DS Challenge Usage | Key Operations |
|--------|-------------------|----------------|
| **Serena** | Find 3DS components, analyze PostMessage handlers, verify origin validation | `find_symbol`, `search_for_pattern` |
| **Context7** | Get 3DS SDK docs, EMV 3DS spec, PSP-specific 3DS patterns | `get_library_docs` |
| **Playwright** | Test 3DS iframe rendering, challenge completion, timeout handling | `browser_navigate`, `browser_wait_for`, `browser_snapshot` |
| **Chrome** | Debug iframe behavior, monitor PostMessage events, verify sandbox | `use_browser` |
| **Episodic Memory** | Recall past 3DS issues, timeout patterns, PSP quirks | `search` |

### Superpowers Skills
| Skill | When to Use |
|-------|-------------|
| `superpowers:systematic-debugging` | When 3DS challenges fail or timeout |
| `superpowers:test-driven-development` | Write 3DS tests before implementation |
| `superpowers:verification-before-completion` | Verify 3DS works across PSPs before deploying |

### Available Agents
| Agent | Dispatch For |
|-------|-------------|
| `frontend-developer` | Complex 3DS modal UI, iframe management |
| `security-auditor` | Verify PostMessage origin validation, CSP headers |
| `playwright-testing` | Comprehensive 3DS E2E test scenarios |
| `visa-cybersource-payments` | CyberSource 3DS integration |
| `mastercard-mpgs-specialist` | MPGS 3DS patterns |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    3DS CHALLENGE RENDERING WORKFLOW                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Episodic Memory: Recall past 3DS challenges, timeout issues         │
│  ├─ Serena: Find existing 3DS components and PostMessage handlers       │
│  └─ Context7: Get latest 3DS SDK docs, EMV 3DS specification            │
│                                                                          │
│  PHASE 2: IFRAME SETUP                                                  │
│  ├─ Receive ACS URL + 3DS session data from backend                     │
│  ├─ Mount secure iframe with sandbox attributes                         │
│  ├─ Set iframe allow="payment" for Payment Request API                  │
│  ├─ Configure referrerPolicy for privacy                                │
│  └─ Show loading state while iframe initializes                         │
│                                                                          │
│  PHASE 3: MESSAGE HANDLING                                              │
│  ├─ Attach PostMessage event listener                                   │
│  ├─ CRITICAL: Verify event.origin against whitelist                     │
│  ├─ Parse message type (ChallengeCompleted, ChallengeFailed, Timeout)   │
│  ├─ Handle success: Finalize payment with PSP                           │
│  ├─ Handle failure: Show retry option, log reason                       │
│  └─ Cleanup: Remove event listener on unmount                           │
│                                                                          │
│  PHASE 4: TESTING & MONITORING                                          │
│  ├─ Playwright: Test challenge flow with 3DS test cards                 │
│  ├─ Playwright: Test timeout handling (5-minute limit)                  │
│  ├─ Chrome: Debug PostMessage events, verify sandbox                    │
│  ├─ Serena: Store 3DS implementation decisions in memory                │
│  └─ Verification: Confirm 3DS works across all PSPs                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery

#### Episodic Memory: 3DS History
```typescript
// Recall past 3DS issues
const threeDSIssues = await mcp_episodic_memory.search({
  query: ["3DS", "challenge timeout", "iframe blocked", "PostMessage"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Find timeout patterns
const timeoutPatterns = await mcp_episodic_memory.search({
  query: "3DS timeout 5 minutes retry",
  mode: "text",
  limit: 5
});

// Recall PSP-specific quirks
const pspQuirks = await mcp_episodic_memory.search({
  query: ["Stripe 3DS", "CyberSource Payer Auth", "MPGS 3DS2"],
  mode: "both",
  limit: 5
});
```

#### Serena: 3DS Component Analysis
```typescript
// Find existing 3DS components
const threeDSComponents = await mcp_serena.find_symbol({
  name_path_pattern: "ThreeDS|PayerAuth|SecureChallenge",
  substring_matching: true,
  include_body: true,
  depth: 2
});

// Analyze PostMessage handling
const messageHandlers = await mcp_serena.search_for_pattern({
  substring_pattern: "addEventListener.*message|postMessage|MessageEvent",
  relative_path: "src/components",
  context_lines_before: 3,
  context_lines_after: 3
});

// Find origin validation logic
const originValidation = await mcp_serena.search_for_pattern({
  substring_pattern: "event\\.origin|allowedOrigins|origin.*===",
  relative_path: "src/components"
});

// Find iframe configuration
const iframeConfig = await mcp_serena.search_for_pattern({
  substring_pattern: "iframe.*sandbox|allow=.*payment|referrerPolicy",
  relative_path: "src/components"
});

// Find timeout handling
const timeoutHandling = await mcp_serena.search_for_pattern({
  substring_pattern: "setTimeout.*3ds|challenge.*timeout|5.*minute",
  relative_path: "src"
});
```

#### Context7: 3DS Documentation
```typescript
// Get 3DS SDK documentation
const threeDSDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-js",
  topic: "3D Secure 2 handleCardAction confirmCardPayment",
  mode: "code"
});

// EMV 3DS specification
const emvDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/EMVCo/3ds-specification",
  topic: "challenge flow authentication ACS",
  mode: "info"
});

// CyberSource Payer Authentication
const cyberSourceDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/CyberSource/cybersource-rest-client-node",
  topic: "payer authentication 3DS cardinal commerce",
  mode: "code"
});

// MPGS 3DS integration
const mpgsDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/Mastercard/gateway-nodejs-sdk",
  topic: "3D Secure authentication initiate check",
  mode: "code"
});
```

---

### Phase 2: Implementation

#### 3DS Challenge Component

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

interface ThreeDSChallengeProps {
  acsUrl: string;
  sessionData: string;
  allowedOrigins: string[];
  onSuccess: (transactionId: string) => void;
  onError: (reason: string) => void;
  onTimeout: () => void;
}

export function ThreeDSChallenge({
  acsUrl,
  sessionData,
  allowedOrigins,
  onSuccess,
  onError,
  onTimeout,
}: ThreeDSChallengeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set 5-minute timeout
    timeoutRef.current = setTimeout(() => {
      onTimeout();
    }, 5 * 60 * 1000);

    // PostMessage handler
    const handleMessage = (event: MessageEvent) => {
      // CRITICAL: Verify origin
      if (!allowedOrigins.includes(event.origin)) {
        console.warn('[3DS] Rejected message from untrusted origin:', event.origin);
        return;
      }

      console.log('[3DS] Received message:', event.data);

      const { type, data } = event.data;

      switch (type) {
        case 'ChallengeCompleted':
          clearTimeout(timeoutRef.current);
          onSuccess(data.transactionId);
          break;

        case 'ChallengeFailed':
          clearTimeout(timeoutRef.current);
          onError(data.reason || 'Authentication failed');
          break;

        case 'ChallengeLoaded':
          setIsLoading(false);
          break;
      }
    };

    // Attach listener
    window.addEventListener('message', handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [allowedOrigins, onSuccess, onError, onTimeout]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Bank Authentication Required</h2>
          {isLoading && (
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
          )}
        </div>

        {/* 3DS Challenge Iframe */}
        <iframe
          ref={iframeRef}
          src={acsUrl}
          sandbox="allow-scripts allow-forms allow-same-origin"
          allow="payment"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-[500px] border-0"
          title="3D Secure Authentication"
          onLoad={() => {
            console.log('[3DS] Iframe loaded');
            // Some ACS pages send ChallengeLoaded message, others don't
            setTimeout(() => setIsLoading(false), 1000);
          }}
        />

        {/* Footer */}
        <div className="p-4 border-t text-sm text-gray-600">
          <p>Secure authentication provided by your bank</p>
          <p className="text-xs mt-1">This window will close automatically after authentication</p>
        </div>
      </div>
    </div>
  );
}
```

---

### Phase 3: Testing

#### Playwright: 3DS Challenge Flow

```typescript
// Test 1: Successful 3DS challenge
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Use Stripe 3DS test card
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card", value: "4000 0000 0000 3220" },
    { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "123" }
  ]
});

await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

// Wait for 3DS modal to appear
await mcp_playwright.browser_wait_for({ text: "Bank Authentication Required" });

// Take snapshot of modal
const modalSnapshot = await mcp_playwright.browser_snapshot({});

// Wait for iframe to load
await mcp_playwright.browser_wait_for({ text: "Verify your identity" });

// Screenshot 3DS challenge
await mcp_playwright.browser_take_screenshot({
  filename: "3ds-challenge-modal.png"
});

// Complete challenge (in test environment, auto-completes)
await mcp_playwright.browser_wait_for({ text: "Payment Complete", timeout: 10000 });

// Screenshot success
await mcp_playwright.browser_take_screenshot({
  filename: "3ds-success.png"
});

// Test 2: Failed 3DS challenge
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Use card that fails 3DS
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", value: "4000 0000 0000 0002" }
  ]
});

await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

await mcp_playwright.browser_wait_for({ text: "Authentication failed" });

// Test 3: Check console for PostMessage events
const consoleMessages = await mcp_playwright.browser_console_messages({
  level: "log"
});

// Verify PostMessage events logged
const threeDSMessages = consoleMessages.filter(m =>
  m.includes('[3DS]') || m.includes('ChallengeCompleted')
);

// Test 4: Verify no security warnings
const securityWarnings = await mcp_playwright.browser_console_messages({
  level: "warning"
});

const crossOriginWarnings = securityWarnings.filter(m =>
  m.includes('cross-origin') || m.includes('sandbox')
);
// Should be empty or contain only expected warnings
```

#### Chrome: Debug 3DS Flow

```typescript
// Navigate to checkout
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Trigger 3DS with test card
await mcp_chrome.use_browser({
  action: "type",
  selector: "#card-number",
  payload: "4000000000003220"
});

await mcp_chrome.use_browser({
  action: "click",
  selector: "#submit-button"
});

// Wait for 3DS iframe
await mcp_chrome.use_browser({
  action: "await_element",
  selector: "iframe[title='3D Secure Authentication']",
  timeout: 10000
});

// Extract iframe attributes
const iframeSandbox = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    document.querySelector("iframe[title='3D Secure Authentication']")?.getAttribute('sandbox')
  `
});
// Should be: "allow-scripts allow-forms allow-same-origin"

// Monitor PostMessage events
const messageLog = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    window.threeDSMessages = [];
    window.addEventListener('message', (e) => {
      window.threeDSMessages.push({ origin: e.origin, data: e.data });
    });
    'Monitoring PostMessage events'
  `
});

// Screenshot 3DS modal
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "3ds-challenge-chrome.png"
});
```

#### Serena: Store 3DS Decisions

```typescript
// Document 3DS implementation
await mcp_serena.write_memory({
  memory_file_name: "3ds-implementation.md",
  content: `
# 3D Secure Implementation Decisions

## Iframe Security
- Sandbox: allow-scripts allow-forms allow-same-origin
- Allow: payment (for Payment Request API)
- Referrer Policy: strict-origin-when-cross-origin
- CSP: frame-ancestors 'self' https://*.stripe.com

## PostMessage Validation
- Origin Whitelist: Maintained per PSP
  - Stripe: https://hooks.stripe.com, https://js.stripe.com
  - CyberSource: https://centinelapi.cardinalcommerce.com
  - MPGS: https://ap-gateway.mastercard.com
- Message Types: ChallengeCompleted, ChallengeFailed, ChallengeLoaded, Timeout

## Timeout Handling
- Default Timeout: 5 minutes (EMV spec recommendation)
- User Experience: Show retry button after timeout
- Logging: Log timeout with transaction ID for investigation

## PSP-Specific Patterns
- Stripe: Uses Stripe.js handleCardAction(), auto-manages iframe
- CyberSource: Cardinal Commerce Cruise, manual iframe + postMessage
- MPGS: 3DS2 initiate → check → authenticate flow
- Adyen: Drop-in handles 3DS automatically, custom integration uses iframe

## Error Handling
- Network Errors: Retry with exponential backoff
- ACS Unavailable: Fallback to non-3DS if issuer supports
- Browser Blocking Iframe: Detect and show manual verification option
- PostMessage Not Received: Timeout triggers retry flow

## Testing Strategy
- Test Cards: Use PSP test cards for each 3DS scenario
- Automated E2E: Playwright tests for success, failure, timeout
- Manual Testing: Real cards in test mode for UX validation
- Cross-Browser: Chrome, Safari, Firefox, Edge
  `
});
```

---

## MCP Integration Examples

### Serena: Find 3DS Components
```typescript
// Find all 3DS-related components
const threeDSComponents = await mcp_serena.find_symbol({
  name_path_pattern: "ThreeDS|PayerAuth|Challenge",
  include_body: true
});

// Trace PostMessage handling
const postMessageFlow = await mcp_serena.find_referencing_symbols({
  name_path: "handleMessage",
  relative_path: "src/components/ThreeDSChallenge.tsx"
});
```

### Context7: Get 3DS Documentation
```typescript
// Stripe 3DS patterns
const stripe3DS = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/stripe/stripe-js",
  topic: "handleCardAction 3D Secure payment intent",
  mode: "code"
});

// EMV 3DS spec
const emv3DS = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/EMVCo/3ds-specification",
  topic: "3DS2 challenge flow",
  mode: "info"
});
```

### Playwright: Test 3DS Scenarios
```typescript
// Test successful authentication
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

await mcp_playwright.browser_fill_form({
  fields: [{ name: "Card", type: "textbox", value: "4000000000003220" }]
});

await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

await mcp_playwright.browser_wait_for({ text: "Payment Complete" });
```

### Chrome: Monitor 3DS Events
```typescript
// Navigate and trigger 3DS
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://localhost:3000/checkout"
});

// Check iframe loaded
const iframeLoaded = await mcp_chrome.use_browser({
  action: "await_element",
  selector: "iframe[title*='3D']",
  timeout: 10000
});
```

### Episodic Memory: Learn from 3DS Issues
```typescript
// Find past 3DS timeout issues
const timeouts = await mcp_episodic_memory.search({
  query: ["3DS timeout", "challenge expired", "ACS timeout"],
  mode: "both",
  limit: 5
});

// Recall PostMessage problems
const postMessageIssues = await mcp_episodic_memory.search({
  query: "PostMessage origin validation 3DS",
  after: "2024-01-01"
});
```

---

## Agent Dispatch Patterns

### Frontend Developer: Complex 3DS UI
```typescript
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "implement_3ds_modal",
  "payload": {
    "task": "Create responsive 3DS challenge modal",
    "requirements": [
      "Mobile-optimized iframe rendering",
      "Loading states during iframe load",
      "Timeout countdown display",
      "Retry mechanism for failed challenges"
    ]
  }
}
```

### Security Auditor: Verify 3DS Security
```typescript
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "audit_3ds_security",
  "payload": {
    "task": "Audit 3DS implementation for security vulnerabilities",
    "checks": [
      "Verify PostMessage origin validation",
      "Check iframe sandbox attributes",
      "Validate CSP frame-ancestors",
      "Test for XSS in message handling"
    ]
  }
}
```

---

## Secure Iframe Configuration

```typescript
// Required attributes
<iframe
  src={acsUrl}
  sandbox="allow-scripts allow-forms allow-same-origin"  // Minimum required
  allow="payment"                                        // For Payment Request API
  referrerPolicy="strict-origin-when-cross-origin"      // Privacy
  title="3D Secure Authentication"                      // Accessibility
  className="w-full h-[500px]"
/>
```

---

## PostMessage Security

### Origin Validation Pattern
```typescript
const ALLOWED_ORIGINS = {
  stripe: [
    'https://hooks.stripe.com',
    'https://js.stripe.com'
  ],
  cybersource: [
    'https://centinelapi.cardinalcommerce.com'
  ],
  mpgs: [
    'https://ap-gateway.mastercard.com',
    'https://eu-gateway.mastercard.com'
  ]
};

function isOriginAllowed(origin: string, psp: string): boolean {
  return ALLOWED_ORIGINS[psp]?.includes(origin) ?? false;
}
```

---

## UX Guidelines

| Element | Requirement |
|---------|-------------|
| Modal | Full-screen or centered modal with overlay |
| Header | "Bank Authentication Required" with bank logo if available |
| Loader | Spinner while iframe loads |
| Iframe | 500px height minimum, responsive width |
| Timeout | Show countdown after 4 minutes, retry after 5 |
| Branding | Keep merchant logo visible for trust |
| Accessibility | Announce challenge to screen readers |
| Error Messages | Clear, actionable (e.g., "Authentication timed out. Retry?") |

---

## Best Practices

### Security
- **Origin Validation**: ALWAYS verify `event.origin` before processing PostMessage
- **Sandbox**: Use strictest sandbox that allows 3DS to function
- **CSP**: Set `frame-ancestors` to prevent embedding attacks
- **HTTPS Only**: 3DS must be served over HTTPS

### Development Workflow
1. **Documentation First**: Check Context7 for PSP-specific 3DS patterns
2. **Code Analysis**: Use Serena to find existing 3DS components
3. **Historical Context**: Search Episodic Memory for past 3DS issues
4. **Test All Scenarios**: Success, failure, timeout with Playwright
5. **Debug PostMessage**: Use Chrome to verify message flow
6. **Store Decisions**: Document 3DS patterns in Serena memory

### Timeout Handling
- Set max timeout (5 min per EMV spec)
- Show countdown after 4 minutes
- Provide retry option on timeout
- Log timeouts for investigation

### Testing
- Every 3DS change requires E2E test
- Test with multiple PSP test cards
- Verify iframe sandbox in DevTools
- Check console for PostMessage events
- Test timeout scenario manually

### Error Handling
- Distinguish network errors from auth failures
- Provide clear retry mechanisms
- Log all 3DS events for debugging
- Never show raw error messages to users

### Compliance
- Follow EMV 3DS specification
- Support both frictionless and challenge flows
- Log 3DS attempts for chargeback disputes
- Maintain PCI DSS compliance (3DS is out of scope)
