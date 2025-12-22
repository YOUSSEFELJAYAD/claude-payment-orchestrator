# Skill: Generate 3DS Payload

**Role:** mastercard-mpgs-specialist (Gateway Specialist)
**Domain:** Payment Gateway Integration
**Objective:** Construct strictly valid 3D Secure 2.0 authentication payloads for MPGS/Cybersource with comprehensive browser/device fingerprinting, challenge flow support, frictionless authentication data, leveraging Context7 for 3DS 2.0 specifications, Serena for existing 3DS implementations, and complete validation workflows for PSD2/SCA compliance.

## Available Capabilities

### MCP Servers
| Server | Usage in 3DS Generation |
|--------|------------------------|
| **Serena** | Find existing 3DS payload builders, analyze authentication flows, trace challenge handling |
| **Context7** | Get 3DS 2.0 specification, MPGS 3DS API, browser fingerprinting requirements |
| **Playwright** | Test 3DS flows, capture browser fingerprints, verify challenge handling |
| **Chrome** | Monitor 3DS redirects, ACS challenge flows, verify authentication completion |
| **Episodic Memory** | Recall past 3DS issues, authentication failures, liability shift problems |

### Superpowers Skills
| Skill | 3DS Generation Trigger |
|-------|----------------------|
| `brainstorming` | Before designing 3DS architecture or flow |
| `systematic-debugging` | When diagnosing 3DS authentication failures |
| `test-driven-development` | Before implementing 3DS handlers |
| `verification-before-completion` | Before deploying 3DS changes |
| `writing-plans` | For comprehensive 3DS 2.0 implementation |
| `subagent-driven-development` | Parallel 3DS + fallback implementation |
| `requesting-code-review` | After implementing security-critical 3DS code |

### Specialized Agents
| Agent | 3DS Use Case |
|-------|-------------|
| `code-architect` | Design 3DS flow architecture, challenge handling |
| `code-reviewer` | Review PSD2 compliance, liability shift logic |
| `silent-failure-hunter` | Find missing 3DS error handlers |
| `pr-test-analyzer` | Verify 3DS test scenario coverage |

### Other Capabilities
- `elements-of-style:writing-clearly-and-concisely` - 3DS documentation
- `episodic-memory:remembering-conversations` - Past 3DS authentication issues
- `dev-browser:dev-browser` - Test 3DS flows with persistent browser state
- WebSearch - Latest 3DS 2.0 changes, PSD2 updates
- TodoWrite - Track 3DS implementation tasks

## Logic Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                       3DS PAYLOAD GENERATION WORKFLOW                         │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Phase 1: Channel Determination                                              │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Detect Authentication Channel                                │            │
│  │ ├─ PAYER_BROWSER → Web checkout (most common)               │            │
│  │ ├─ SDK → Mobile app integration                             │            │
│  │ ├─ MERCHANT_REQUESTED → Manual trigger                      │            │
│  │ └─ RECURRING → Subscription/MIT                             │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 2: Browser Fingerprinting                                             │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Collect Browser Data (PAYER_BROWSER only)                   │            │
│  │ ├─ User-Agent → Browser type/version                        │            │
│  │ ├─ Accept Headers → Content types                           │            │
│  │ ├─ IP Address → Cardholder location                         │            │
│  │ ├─ Screen Size → Device fingerprint                         │            │
│  │ ├─ Color Depth → Display capabilities                       │            │
│  │ ├─ Timezone → User location verification                    │            │
│  │ ├─ Language → Browser locale                                │            │
│  │ └─ JavaScript Enabled → Browser capabilities                │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 3: Payload Assembly                                                    │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Build 3DS 2.0 Structure                                      │            │
│  │ ├─ order → amount, currency                                 │            │
│  │ ├─ sourceOfFunds → card/token details                       │            │
│  │ ├─ authentication → channel, redirectResponseUrl            │            │
│  │ ├─ 3ds2 → browserInfo, challengeIndicator                   │            │
│  │ ├─ billing/shipping → address data                          │            │
│  │ └─ merchant → category code, name                           │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 4: Validation                                                          │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Validate Payload                                             │            │
│  │ ├─ Required fields present                                   │            │
│  │ ├─ Format validation (ISO formats)                          │            │
│  │ ├─ Field length limits                                       │            │
│  │ └─ Enum values valid                                         │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                           ↓                                                   │
│  Phase 5: API Submission                                                      │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │ Send to PSP                                                   │            │
│  │ ├─ MPGS: INITIATE_AUTHENTICATION                            │            │
│  │ ├─ Cybersource: Setup Payer Auth                            │            │
│  │ └─ Receive authenticationId + redirect URL                  │            │
│  └─────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  3DS Flow:                                                                    │
│  Channel Detection → Browser Fingerprint → Payload Build → Validate →        │
│  API Call → Frictionless/Challenge → Liability Shift                         │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: 3DS Specification Discovery
```typescript
// Step 1: Search for past 3DS issues
const past3DSIssues = await mcp_episodic_memory.search({
  query: ["3DS", "authentication", "challenge", "liability shift"],
  mode: "both",
  limit: 10
});

// Step 2: Get 3DS 2.0 documentation
const threeDSv2Docs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "3DS 2.0 authentication initiate payer browser",
  mode: "code"
});

const browserInfoDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "3ds2 browserInfo fingerprinting requirements",
  mode: "info"
});

const challengeIndicatorDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "challengeIndicator values no preference challenge mandate",
  mode: "info"
});

// Step 3: Analyze existing 3DS implementations
const existing3DS = await mcp_serena.search_for_pattern({
  substring_pattern: "3ds|threeds|authenticate.*payer|browserInfo",
  paths_include_glob: "**/*.ts",
  context_lines_before: 10,
  context_lines_after: 30
});
```

### Phase 2: 3DS Payload Generator Implementation

#### Browser Fingerprint Collector
```typescript
export class BrowserFingerprintCollector {
  collect(request: Request): BrowserInfo {
    const headers = request.headers;

    return {
      // User Agent (required)
      userAgent: headers['user-agent'] || '',

      // Accept header (required)
      acceptHeader: headers['accept'] || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',

      // IP Address (required for MPGS)
      ipAddress: this.extractIPAddress(request),

      // Screen dimensions (collected client-side, passed in request)
      screenWidth: request.body?.browserData?.screenWidth || 1920,
      screenHeight: request.body?.browserData?.screenHeight || 1080,
      colorDepth: request.body?.browserData?.colorDepth || 24,

      // Timezone offset in minutes (collected client-side)
      timezoneOffset: request.body?.browserData?.timezoneOffset || new Date().getTimezoneOffset(),

      // Language (from Accept-Language header)
      language: this.extractLanguage(headers['accept-language'] || 'en-US'),

      // JavaScript enabled (always true if we got this far)
      javaEnabled: request.body?.browserData?.javaEnabled || false,
      javascriptEnabled: true
    };
  }

  private extractIPAddress(request: Request): string {
    // Check for forwarded IP first (load balancer/proxy)
    const forwarded = request.headers['x-forwarded-for'];
    if (forwarded) {
      const ips = forwarded.split(',');
      return ips[0].trim();
    }

    // Fallback to direct connection IP
    return request.ip || request.connection.remoteAddress || '';
  }

  private extractLanguage(acceptLanguage: string): string {
    // Parse Accept-Language header
    const languages = acceptLanguage.split(',');
    if (languages.length > 0) {
      const primary = languages[0].split(';')[0].trim();
      return primary;
    }
    return 'en-US';
  }
}

interface BrowserInfo {
  userAgent: string;
  acceptHeader: string;
  ipAddress: string;
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  timezoneOffset: number;
  language: string;
  javaEnabled: boolean;
  javascriptEnabled: boolean;
}
```

#### 3DS Payload Generator
```typescript
export class ThreeDSPayloadGenerator {
  private readonly fingerprintCollector: BrowserFingerprintCollector;

  constructor() {
    this.fingerprintCollector = new BrowserFingerprintCollector();
  }

  generateMPGSPayload(
    request: ThreeDSRequest,
    browserRequest?: Request
  ): MPGSThreeDSPayload {
    // Step 1: Validate input
    this.validateInput(request);

    // Step 2: Determine channel
    const channel = this.determineChannel(request);

    // Step 3: Build base payload
    const payload: MPGSThreeDSPayload = {
      apiOperation: 'INITIATE_AUTHENTICATION',
      authentication: {
        channel,
        purpose: 'PAYMENT_TRANSACTION'
      },
      order: {
        amount: request.amount,
        currency: request.currency,
        reference: request.orderId
      },
      sourceOfFunds: this.buildSourceOfFunds(request)
    };

    // Step 4: Add channel-specific data
    if (channel === 'PAYER_BROWSER' && browserRequest) {
      const browserInfo = this.fingerprintCollector.collect(browserRequest);
      payload.authentication.redirectResponseUrl = request.redirectResponseUrl;

      // Add 3DS 2.0 browser info
      payload['3ds2'] = {
        browserInfo: {
          javaEnabled: browserInfo.javaEnabled,
          javascriptEnabled: browserInfo.javascriptEnabled,
          language: browserInfo.language,
          screenHeight: browserInfo.screenHeight,
          screenWidth: browserInfo.screenWidth,
          timeZone: browserInfo.timezoneOffset,
          colorDepth: browserInfo.colorDepth,
          acceptHeaders: browserInfo.acceptHeader,
          userAgent: browserInfo.userAgent
        },
        challengeIndicator: request.challengeIndicator || 'NO_PREFERENCE'
      };

      // Add cardholder info
      payload.device = {
        ipAddress: browserInfo.ipAddress,
        browser: browserInfo.userAgent
      };
    }

    // Step 5: Add billing/shipping address
    if (request.billingAddress) {
      payload.billing = {
        address: {
          street: request.billingAddress.street,
          city: request.billingAddress.city,
          stateProvince: request.billingAddress.state,
          postcodeZip: request.billingAddress.postalCode,
          country: request.billingAddress.country
        }
      };
    }

    if (request.shippingAddress) {
      payload.shipping = {
        address: {
          street: request.shippingAddress.street,
          city: request.shippingAddress.city,
          stateProvince: request.shippingAddress.state,
          postcodeZip: request.shippingAddress.postalCode,
          country: request.shippingAddress.country
        }
      };
    }

    // Step 6: Add customer info
    if (request.customer) {
      payload.customer = {
        email: request.customer.email,
        phone: request.customer.phone,
        firstName: request.customer.firstName,
        lastName: request.customer.lastName
      };
    }

    return payload;
  }

  generateCybersourcePayload(
    request: ThreeDSRequest,
    browserRequest?: Request
  ): CybersourceThreeDSPayload {
    const channel = this.determineChannel(request);

    const payload: CybersourceThreeDSPayload = {
      clientReferenceInformation: {
        code: request.orderId
      },
      orderInformation: {
        amountDetails: {
          totalAmount: request.amount,
          currency: request.currency
        }
      },
      paymentInformation: {
        card: {
          number: request.card.number,
          expirationMonth: request.card.expiryMonth.padStart(2, '0'),
          expirationYear: request.card.expiryYear
        }
      }
    };

    // Add Payer Authentication (3DS) info
    if (channel === 'PAYER_BROWSER' && browserRequest) {
      const browserInfo = this.fingerprintCollector.collect(browserRequest);

      payload.consumerAuthenticationInformation = {
        returnUrl: request.redirectResponseUrl,
        referenceId: request.orderId
      };

      payload.deviceInformation = {
        ipAddress: browserInfo.ipAddress,
        httpBrowserJavaEnabled: browserInfo.javaEnabled,
        httpBrowserJavaScriptEnabled: browserInfo.javascriptEnabled,
        httpBrowserLanguage: browserInfo.language,
        httpBrowserColorDepth: browserInfo.colorDepth.toString(),
        httpBrowserScreenHeight: browserInfo.screenHeight.toString(),
        httpBrowserScreenWidth: browserInfo.screenWidth.toString(),
        httpBrowserTimeDifference: browserInfo.timezoneOffset.toString(),
        userAgentBrowserValue: browserInfo.userAgent
      };
    }

    return payload;
  }

  private validateInput(request: ThreeDSRequest): void {
    const errors: string[] = [];

    if (!request.amount || parseFloat(request.amount) <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (!request.currency || !/^[A-Z]{3}$/.test(request.currency)) {
      errors.push('Currency must be 3-letter ISO code');
    }

    if (!request.orderId) {
      errors.push('Order ID is required');
    }

    if (!request.card && !request.token) {
      errors.push('Either card or token must be provided');
    }

    if (request.card) {
      if (!request.card.number || !/^\d{13,19}$/.test(request.card.number)) {
        errors.push('Invalid card number');
      }

      if (!request.card.expiryMonth || !request.card.expiryYear) {
        errors.push('Card expiry is required');
      }
    }

    const validChannels = ['PAYER_BROWSER', 'SDK', 'MERCHANT_REQUESTED', 'RECURRING'];
    if (request.channel && !validChannels.includes(request.channel)) {
      errors.push(`Invalid channel. Must be one of: ${validChannels.join(', ')}`);
    }

    const validChallengeIndicators = [
      'NO_PREFERENCE',
      'NO_CHALLENGE_REQUESTED',
      'CHALLENGE_REQUESTED',
      'CHALLENGE_MANDATED'
    ];
    if (request.challengeIndicator && !validChallengeIndicators.includes(request.challengeIndicator)) {
      errors.push(`Invalid challengeIndicator. Must be one of: ${validChallengeIndicators.join(', ')}`);
    }

    if (errors.length > 0) {
      throw new ValidationError('3DS payload validation failed', errors);
    }
  }

  private determineChannel(request: ThreeDSRequest): string {
    if (request.channel) {
      return request.channel;
    }

    // Default to PAYER_BROWSER for web checkout
    return 'PAYER_BROWSER';
  }

  private buildSourceOfFunds(request: ThreeDSRequest): any {
    if (request.token) {
      return {
        type: 'SCHEME_TOKEN',
        token: request.token
      };
    }

    if (request.card) {
      return {
        type: 'CARD',
        provided: {
          card: {
            number: request.card.number,
            expiry: {
              month: request.card.expiryMonth,
              year: request.card.expiryYear
            }
          }
        }
      };
    }

    throw new Error('Either card or token must be provided');
  }
}

// Type definitions
interface ThreeDSRequest {
  orderId: string;
  amount: string;
  currency: string;
  card?: {
    number: string;
    expiryMonth: string;
    expiryYear: string;
  };
  token?: string;
  channel?: 'PAYER_BROWSER' | 'SDK' | 'MERCHANT_REQUESTED' | 'RECURRING';
  challengeIndicator?: 'NO_PREFERENCE' | 'NO_CHALLENGE_REQUESTED' | 'CHALLENGE_REQUESTED' | 'CHALLENGE_MANDATED';
  redirectResponseUrl?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  customer?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
}

interface MPGSThreeDSPayload {
  apiOperation: string;
  authentication: {
    channel: string;
    purpose: string;
    redirectResponseUrl?: string;
  };
  order: {
    amount: string;
    currency: string;
    reference: string;
  };
  sourceOfFunds: any;
  '3ds2'?: any;
  device?: any;
  billing?: any;
  shipping?: any;
  customer?: any;
}

interface CybersourceThreeDSPayload {
  clientReferenceInformation: {
    code: string;
  };
  orderInformation: {
    amountDetails: {
      totalAmount: string;
      currency: string;
    };
  };
  paymentInformation: {
    card: {
      number: string;
      expirationMonth: string;
      expirationYear: string;
    };
  };
  consumerAuthenticationInformation?: any;
  deviceInformation?: any;
}

class ValidationError extends Error {
  constructor(
    message: string,
    public errors: string[]
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### Phase 3: Testing

#### Playwright 3DS Flow Testing
```typescript
// Test 3DS challenge flow
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/checkout"
});

// Fill payment form
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Amount", type: "textbox", ref: "amount", value: "10.31" }, // Trigger 3DS
    { name: "Card", type: "textbox", ref: "card", value: "5123456789012346" },
    { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "100" }
  ]
});

// Submit payment
await mcp_playwright.browser_click({ element: "Pay", ref: "submit" });

// Wait for 3DS redirect
await mcp_playwright.browser_wait_for({
  text: "3D Secure",
  time: 5
});

// Take screenshot of 3DS challenge
await mcp_playwright.browser_take_screenshot({
  filename: "3ds-challenge.png"
});

// Complete challenge (test environment)
await mcp_playwright.browser_type({
  element: "OTP",
  ref: "3ds-code",
  text: "123456"
});

await mcp_playwright.browser_click({
  element: "Submit",
  ref: "3ds-submit"
});

// Verify return to merchant
await mcp_playwright.browser_wait_for({
  text: "Payment Successful"
});
```

## MCP Integration Examples

### Serena: Analyze 3DS Implementations
```typescript
// Find 3DS payload builders
const threeDSBuilders = await mcp_serena.search_for_pattern({
  substring_pattern: "generate.*3ds|build.*3ds.*payload|browserInfo",
  paths_include_glob: "**/*.ts"
});

// Find challenge handlers
const challengeHandlers = await mcp_serena.search_for_pattern({
  substring_pattern: "handle.*challenge|3ds.*redirect|authentication.*response",
  paths_include_glob: "**/*.ts"
});
```

### Context7: Get 3DS Documentation
```typescript
// Get 3DS 2.0 specification
const threeDSSpec = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/emvco/3ds",
  topic: "3D Secure 2.0 browser info requirements",
  mode: "info"
});

// Get MPGS 3DS API
const mpgs3DS = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mastercard/gateway-api",
  topic: "3ds2 initiate authentication complete reference",
  mode: "code"
});
```

### Episodic Memory: Recall 3DS Issues
```typescript
// Search for past 3DS failures
const past3DSFailures = await mcp_episodic_memory.search({
  query: ["3DS failed", "authentication declined", "liability not shift"],
  mode: "both",
  limit: 5
});
```

## Best Practices

### Payload Construction
- Always collect browser fingerprint for PAYER_BROWSER channel
- Include complete billing/shipping address for risk assessment
- Use challengeIndicator wisely (NO_PREFERENCE for best UX)
- Set redirectResponseUrl to HTTPS endpoint
- Include customer email for frictionless flow

### Browser Fingerprinting
- Collect data client-side (JavaScript)
- Pass via hidden form fields or API
- Validate all required fields present
- Use correct timezone offset format (minutes)
- Ensure IP address is real cardholder IP

### Challenge Handling
- Always handle redirect gracefully
- Store payment context before redirect
- Verify authentication result after return
- Implement timeout handling (5 min max)
- Support both frictionless and challenge flows

### Liability Shift
- Verify liability shift occurred (check ECI indicator)
- ECI 5 (Mastercard) = full liability shift
- ECI 6 (Mastercard) = attempted, merchant liable
- Log all liability shift statuses
- Don't process without shift for high-risk transactions

## 3DS 2.0 Field Reference

### Challenge Indicator Values
| Value | Meaning | Use Case |
|-------|---------|----------|
| NO_PREFERENCE | Issuer decides | Default (best UX) |
| NO_CHALLENGE_REQUESTED | Prefer frictionless | Low-risk, returning customer |
| CHALLENGE_REQUESTED | Request challenge | High-risk transaction |
| CHALLENGE_MANDATED | Force challenge | Regulatory requirement |

### Channel Values
| Value | Description |
|-------|-------------|
| PAYER_BROWSER | Web browser checkout |
| SDK | Mobile app (3DS SDK) |
| MERCHANT_REQUESTED | Merchant-initiated |
| RECURRING | Subscription payment |

### ECI (Electronic Commerce Indicator)
| ECI | Network | Liability |
|-----|---------|----------|
| 5 | Mastercard | Issuer (full shift) |
| 6 | Mastercard | Merchant (attempted) |
| 7 | Mastercard | Merchant (no auth) |
| 5 | Visa | Issuer (full shift) |
| 6 | Visa | Merchant (attempted) |
| 7 | Visa | Merchant (no auth) |

## Security Checklist

- [ ] Browser fingerprint collected for all PAYER_BROWSER
- [ ] redirectResponseUrl is HTTPS
- [ ] Customer IP address is real (not proxy/VPN)
- [ ] All required fields validated before submission
- [ ] Challenge timeout handled (max 5 min)
- [ ] Liability shift verified before authorization
- [ ] Authentication results logged for PSD2 compliance
- [ ] No sensitive data in redirect URLs

## Troubleshooting Guide

### 3DS Authentication Fails
1. Search Episodic Memory for similar failures
2. Use Context7 to verify payload format
3. Check browser fingerprint completeness
4. Verify redirectResponseUrl is accessible
5. Test with different challengeIndicator values

### Liability Shift Not Occurring
1. Check ECI value in response (must be 5)
2. Verify complete browser fingerprint sent
3. Confirm billing/shipping address included
4. Check if card enrolled in 3DS
5. Review issuer rules (may require challenge)

### Challenge Never Appears
1. Verify redirectResponseUrl is correct
2. Check browser console for errors
3. Test with CHALLENGE_MANDATED indicator
4. Verify ACS URL is accessible
5. Check timeout settings (may be too short)
