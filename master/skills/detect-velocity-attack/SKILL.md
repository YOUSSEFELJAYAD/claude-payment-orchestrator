# Skill: Detect Velocity Attack

**Role:** sequential-reasoner (Fraud Detection Specialist)
**Domain:** Security & Compliance
**Objective:** Identify and block high-frequency transaction attempts with comprehensive MCP integration, real-time monitoring, and robust testing.

---

## Available Capabilities

### MCP Servers

| Server | Purpose | Key Operations |
|--------|---------|----------------|
| **Serena** | Semantic code analysis | Find rate limiting logic, trace Redis counters, analyze fraud detection |
| **Context7** | Real-time documentation | Redis docs, rate limiting algorithms, ioredis patterns |
| **Playwright** | E2E testing | Test rate limiting behavior, simulate attack patterns |
| **Chrome** | Live browser control | Monitor fraud dashboard, view blocked attempts, inspect metrics |
| **Episodic Memory** | Cross-session context | Past attack patterns, successful blocks, mitigation strategies |

### Superpowers Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `superpowers:brainstorming` | Before fraud system design | Explore detection strategies |
| `superpowers:systematic-debugging` | Rate limiting bugs | Debug counter logic, false positives |
| `superpowers:test-driven-development` | Before implementation | Write rate limit tests |
| `superpowers:verification-before-completion` | Before claiming done | Verify all attack scenarios blocked |
| `superpowers:requesting-code-review` | After implementation | Review fraud logic security |

### Specialized Agents

| Agent | Purpose |
|-------|---------|
| `security-auditor` | Fraud detection architecture |
| `penetration-tester` | Simulate velocity attacks |
| `api-designer` | Rate limiting API design |
| `code-reviewer` | Review security logic |

---

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    VELOCITY ATTACK DETECTION                             │
├─────────────────────────────────────────────────────────────────────────┤
│  PHASE 1: DISCOVERY                                                      │
│  ├─ Context7: Get Redis rate limiting patterns                           │
│  ├─ Serena: Find existing rate limit logic                               │
│  ├─ Episodic Memory: Recall past attack patterns                         │
│  └─ Agent Dispatch: security-auditor for architecture                    │
│                                                                           │
│  PHASE 2: DESIGN                                                         │
│  ├─ Brainstorming: Explore detection strategies                          │
│  ├─ Define Rules: IP, Card, BIN, Device velocity limits                  │
│  ├─ Actions: Block, Allow, Challenge based on score                      │
│  └─ Counters: Redis atomic operations with TTL                           │
│                                                                           │
│  PHASE 3: IMPLEMENTATION                                                 │
│  ├─ TDD: Write attack simulation tests                                   │
│  ├─ Build: Redis rate limiters + fraud rules                             │
│  ├─ Silent Decline: Don't reveal fraud detection                         │
│  └─ Whitelist: Trusted IPs (merchant call centers)                       │
│                                                                           │
│  PHASE 4: VERIFICATION                                                   │
│  ├─ Playwright: Simulate velocity attacks                                │
│  ├─ Chrome: Monitor fraud dashboard metrics                              │
│  ├─ Penetration Test: Attack simulation                                  │
│  └─ Serena Memory: Document attack patterns                              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Integration

### Phase 1: Discovery & Research

**Context7 Documentation Lookup**
```typescript
// Redis rate limiting
const redisDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/redis/redis",
  topic: "rate limiting sliding window incr expire",
  mode: "code"
});

// ioredis atomic operations
const ioredisDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/redis/ioredis",
  topic: "pipeline multi incr ttl",
  mode: "code"
});

// Rate limiting algorithms
const algorithmDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "rate limiting token bucket sliding window",
  mode: "info"
});

// Upstash Redis (serverless)
const upstashDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/upstash/ratelimit",
  topic: "ratelimit sliding window fixed window",
  mode: "code"
});
```

**Serena Code Analysis**
```typescript
// Find rate limiting implementation
const rateLimiting = await mcp_serena.find_symbol({
  name_path_pattern: "RateLimit|VelocityCheck|FraudDetection",
  substring_matching: true,
  include_body: true,
  depth: 2
});

// Find Redis counter logic
const counters = await mcp_serena.search_for_pattern({
  substring_pattern: "incr|incrby|increment|counter.*redis",
  relative_path: "src/lib/fraud",
  context_lines_before: 3,
  context_lines_after: 5
});

// Find velocity rules
const velocityRules = await mcp_serena.search_for_pattern({
  substring_pattern: "velocity|rate.*limit|attempts.*per",
  relative_path: "src/lib/fraud"
});

// Find blocking logic
const blockingLogic = await mcp_serena.find_symbol({
  name_path_pattern: "blockIP|blockCard|blockTransaction",
  include_body: true
});

// Find whitelist implementation
const whitelist = await mcp_serena.search_for_pattern({
  substring_pattern: "whitelist|allowlist|trusted.*ip",
  relative_path: "src/lib"
});
```

**Episodic Memory Search**
```typescript
// Recall past velocity attacks
const pastAttacks = await mcp_episodic_memory.search({
  query: ["velocity attack", "card testing", "BIN attack", "rate limiting"],
  mode: "both",
  limit: 10
});

// Find successful blocking strategies
const successfulBlocks = await mcp_episodic_memory.search({
  query: ["blocked attack", "fraud detected", "rate limit success"],
  mode: "text",
  after: "2024-01-01"
});

// Recall false positive issues
const falsePositives = await mcp_episodic_memory.search({
  query: "false positive rate limit legitimate merchant",
  mode: "vector"
});
```

### Phase 2: Design & Planning

**Agent Dispatch**
```json
{
  "requesting_agent": "detect-velocity-attack",
  "target_agent": "security-auditor",
  "request_type": "fraud_detection_architecture",
  "payload": {
    "query": "Design velocity attack detection with Redis rate limiting",
    "attack_types": [
      "card_testing",
      "bin_attack",
      "ip_velocity",
      "device_fingerprint_attack"
    ],
    "requirements": {
      "silent_decline": true,
      "whitelist_support": true,
      "real_time": true
    }
  }
}
```

**Brainstorming Skill**
```typescript
// Invoke brainstorming for fraud detection
// Skill: superpowers:brainstorming
// Explores: Detection strategies, false positive reduction, attack patterns
```

### Phase 3: Implementation

**Test-Driven Development**
```typescript
// Write tests FIRST
// Skill: superpowers:test-driven-development

describe('Velocity Attack Detection', () => {
  it('should block IP after 10 distinct cards in 1 minute', async () => {
    const ip = '192.168.1.100';

    // Attempt 10 different cards
    for (let i = 0; i < 10; i++) {
      await processPayment({ ip, cardHash: `card_${i}` });
    }

    // 11th attempt should be blocked
    const result = await processPayment({ ip, cardHash: 'card_11' });

    expect(result.status).toBe('blocked');
    expect(result.reason).toBe('ip_velocity_exceeded');
  });

  it('should block card after 3 failed attempts in 10 minutes', async () => {
    const cardHash = 'card_abc123';

    // Attempt 3 times with failures
    for (let i = 0; i < 3; i++) {
      await processPayment({ cardHash, shouldFail: true });
    }

    // 4th attempt should be blocked
    const result = await processPayment({ cardHash });

    expect(result.status).toBe('blocked');
    expect(result.reason).toBe('card_velocity_exceeded');
  });

  it('should block BIN after 50 attempts in 1 hour', async () => {
    const bin = '411111';

    // Attempt 50 times with same BIN
    for (let i = 0; i < 50; i++) {
      await processPayment({ bin });
    }

    // 51st attempt should be blocked
    const result = await processPayment({ bin });

    expect(result.status).toBe('blocked');
    expect(result.reason).toBe('bin_attack_detected');
  });

  it('should allow whitelisted IPs', async () => {
    const ip = '10.0.0.1'; // Whitelisted

    // Attempt 100 times (way over limit)
    for (let i = 0; i < 100; i++) {
      await processPayment({ ip });
    }

    // Should still be allowed
    const result = await processPayment({ ip });

    expect(result.status).toBe('allowed');
  });

  it('should silently decline without revealing fraud detection', async () => {
    const ip = '192.168.1.100';

    // Trigger rate limit
    for (let i = 0; i < 20; i++) {
      await processPayment({ ip, cardHash: `card_${i}` });
    }

    // Response should look like normal decline
    const result = await processPayment({ ip, cardHash: 'card_21' });

    expect(result.status).toBe('declined');
    expect(result.message).not.toContain('fraud');
    expect(result.message).not.toContain('velocity');
    expect(result.message).not.toContain('blocked');
  });

  it('should reset counters after TTL expires', async () => {
    const ip = '192.168.1.100';

    // Hit limit
    for (let i = 0; i < 10; i++) {
      await processPayment({ ip, cardHash: `card_${i}` });
    }

    // Fast-forward time (mock)
    await advanceTime(61 * 1000); // 61 seconds

    // Should be allowed again
    const result = await processPayment({ ip, cardHash: 'card_new' });

    expect(result.status).toBe('allowed');
  });
});
```

**Implementation Example**
```typescript
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

interface VelocityRule {
  key: string;
  limit: number;
  windowSeconds: number;
}

// Velocity rules
const RULES = {
  IP_MINUTE: { key: 'velocity:ip:{ip}:1m', limit: 10, windowSeconds: 60 },
  IP_HOUR: { key: 'velocity:ip:{ip}:1h', limit: 50, windowSeconds: 3600 },
  CARD_FAILS: { key: 'velocity:card:{hash}:fails', limit: 3, windowSeconds: 600 },
  CARD_DAILY: { key: 'velocity:card:{hash}:24h', limit: 20, windowSeconds: 86400 },
  BIN_HOUR: { key: 'velocity:bin:{bin}:1h', limit: 50, windowSeconds: 3600 },
  DEVICE_HOUR: { key: 'velocity:device:{id}:1h', limit: 20, windowSeconds: 3600 }
};

// Whitelist (merchant call centers, trusted IPs)
const WHITELIST_IPS = new Set([
  '10.0.0.1',
  '203.0.113.0/24',
  // ... merchant IPs
]);

async function checkVelocity(
  rule: VelocityRule,
  identifier: string
): Promise<{ allowed: boolean; current: number }> {
  const key = rule.key.replace(/{.*}/, identifier);

  // Atomic increment and get
  const current = await redis.incr(key);

  // Set TTL on first increment
  if (current === 1) {
    await redis.expire(key, rule.windowSeconds);
  }

  return {
    allowed: current <= rule.limit,
    current
  };
}

export async function detectVelocityAttack({
  ip,
  cardHash,
  bin,
  deviceId,
  failed = false
}: {
  ip: string;
  cardHash: string;
  bin: string;
  deviceId?: string;
  failed?: boolean;
}): Promise<{
  blocked: boolean;
  reason?: string;
  score: number;
}> {
  // Check whitelist
  if (WHITELIST_IPS.has(ip)) {
    return { blocked: false, score: 0 };
  }

  let score = 0;
  const reasons: string[] = [];

  // Check IP velocity (per minute)
  const ipMinute = await checkVelocity(RULES.IP_MINUTE, ip);
  if (!ipMinute.allowed) {
    score += 100;
    reasons.push('ip_velocity_1m_exceeded');
  }

  // Check IP velocity (per hour)
  const ipHour = await checkVelocity(RULES.IP_HOUR, ip);
  if (!ipHour.allowed) {
    score += 50;
    reasons.push('ip_velocity_1h_exceeded');
  }

  // Check card failures
  if (failed) {
    const cardFails = await checkVelocity(RULES.CARD_FAILS, cardHash);
    if (!cardFails.allowed) {
      score += 100;
      reasons.push('card_fails_exceeded');
    }
  }

  // Check card daily limit
  const cardDaily = await checkVelocity(RULES.CARD_DAILY, cardHash);
  if (!cardDaily.allowed) {
    score += 75;
    reasons.push('card_daily_exceeded');
  }

  // Check BIN attack
  const binHour = await checkVelocity(RULES.BIN_HOUR, bin);
  if (!binHour.allowed) {
    score += 100;
    reasons.push('bin_attack_detected');
  }

  // Check device velocity
  if (deviceId) {
    const deviceHour = await checkVelocity(RULES.DEVICE_HOUR, deviceId);
    if (!deviceHour.allowed) {
      score += 75;
      reasons.push('device_velocity_exceeded');
    }
  }

  // Block if score >= 100
  return {
    blocked: score >= 100,
    reason: reasons[0],
    score
  };
}

// Silent decline (don't reveal fraud detection)
export function getFraudDeclineMessage(): string {
  // Generic decline message (don't mention fraud/velocity/blocking)
  return 'Payment declined';
}
```

**Serena Memory Storage**
```typescript
// Store velocity patterns
await mcp_serena.write_memory({
  memory_file_name: "velocity-attack-patterns.md",
  content: `
# Velocity Attack Patterns

## Attack Types

### Card Testing
- **Pattern**: Many different cards from same IP in short time
- **Detection**: IP velocity > 10 cards/min
- **Action**: Block IP for 1 hour

### BIN Attack
- **Pattern**: Many cards with same BIN (first 6 digits)
- **Detection**: BIN velocity > 50/hour
- **Action**: Block BIN for 24 hours

### Device Fingerprint Attack
- **Pattern**: Many cards from same device fingerprint
- **Detection**: Device velocity > 20/hour
- **Action**: Block device for 6 hours

### Repeated Failures
- **Pattern**: Same card failing repeatedly
- **Detection**: Card fails > 3/10min
- **Action**: Block card for 24 hours

## Velocity Rules

| Rule | Limit | Window | Action |
|------|-------|--------|--------|
| IP Velocity (minute) | 10 | 60s | Block IP |
| IP Velocity (hour) | 50 | 1h | Block IP |
| Card Fails | 3 | 10m | Block Card |
| Card Daily | 20 | 24h | Block Card |
| BIN Hour | 50 | 1h | Block BIN |
| Device Hour | 20 | 1h | Block Device |

## Redis Key Patterns

\`\`\`
velocity:ip:{ip}:1m          TTL: 60s
velocity:ip:{ip}:1h          TTL: 3600s
velocity:card:{hash}:fails   TTL: 600s
velocity:card:{hash}:24h     TTL: 86400s
velocity:bin:{bin}:1h        TTL: 3600s
velocity:device:{id}:1h      TTL: 3600s
\`\`\`

## Response Strategy

### Silent Decline
- Don't reveal fraud detection to attacker
- Return generic "Payment declined" message
- Log details internally for analysis

### Whitelist
- Merchant call center IPs
- Known trusted sources
- Skip all velocity checks

## Monitoring

- Real-time dashboard showing blocked attempts
- Alert on spike in velocity blocks
- Track false positive rate
- Analyze attack patterns for improvements
`
});
```

### Phase 4: Testing & Verification

**Playwright Attack Simulation**
```typescript
// Simulate card testing attack
await mcp_playwright.browser_navigate({
  url: "http://localhost:3000/api/test-fraud"
});

// Rapid-fire 15 payment attempts
for (let i = 0; i < 15; i++) {
  const response = await mcp_playwright.browser_evaluate({
    function: `async () => {
      return fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 100,
          cardToken: 'tok_test_${i}',
          ip: '192.168.1.100'
        })
      }).then(r => ({ status: r.status, body: r.json() }));
    }`
  });
}

// Verify rate limit triggered
const blockedResponse = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const r = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 100,
        cardToken: 'tok_test_16'
      })
    });
    return { status: r.status, body: await r.json() };
  }`
});

// Should be blocked (429 or silent decline)
await mcp_playwright.browser_take_screenshot({
  filename: "velocity-attack-blocked.png"
});
```

**Chrome Fraud Dashboard Monitoring**
```typescript
// Navigate to fraud dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://admin.internal/fraud-dashboard"
});

// Extract blocked attempts count
const blockedToday = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".blocked-count-today",
  payload: "text"
});

// View recent velocity blocks
await mcp_chrome.use_browser({
  action: "click",
  selector: "#velocity-blocks-tab"
});

const recentBlocks = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".velocity-blocks-list",
  payload: "text"
});

// Screenshot dashboard
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "fraud-dashboard-velocity.png"
});

// Extract metrics
const metrics = await mcp_chrome.use_browser({
  action: "eval",
  payload: `
    ({
      blockedToday: document.querySelector('.blocked-today').textContent,
      falsePositives: document.querySelector('.false-positives').textContent,
      topAttackIPs: Array.from(document.querySelectorAll('.top-ips li')).map(li => li.textContent)
    })
  `
});
```

**Penetration Testing**
```json
{
  "requesting_agent": "detect-velocity-attack",
  "target_agent": "penetration-tester",
  "request_type": "simulate_velocity_attack",
  "payload": {
    "attack_types": ["card_testing", "bin_attack", "distributed_attack"],
    "verify_blocking": true,
    "check_false_positives": true
  }
}
```

**Code Review**
```json
{
  "requesting_agent": "detect-velocity-attack",
  "target_agent": "security-auditor",
  "request_type": "fraud_logic_review",
  "payload": {
    "file_path": "src/lib/fraud/velocityDetection.ts",
    "focus_areas": ["race_conditions", "atomic_operations", "whitelist_bypass"]
  }
}
```

**Verification Skill**
```typescript
// Skill: superpowers:verification-before-completion
// Verify:
// ✓ All velocity rules work correctly
// ✓ Redis counters atomic and have TTL
// ✓ Whitelist bypasses all checks
// ✓ Silent decline doesn't reveal fraud
// ✓ No race conditions in counter logic
// ✓ False positive rate < 0.1%
// ✓ Real attacks blocked in <100ms
```

---

## MCP Integration Examples

### Serena: Find Rate Limiting
```typescript
// Find rate limiting code
const rateLimit = await mcp_serena.find_symbol({
  name_path_pattern: "rateLimit|velocityCheck|checkVelocity",
  include_body: true
});

// Find Redis operations
const redisOps = await mcp_serena.search_for_pattern({
  substring_pattern: "redis\\.incr|redis\\.get|redis\\.expire",
  relative_path: "src/lib/fraud"
});

// Find whitelist logic
const whitelist = await mcp_serena.search_for_pattern({
  substring_pattern: "whitelist|allowlist|trusted",
  relative_path: "src"
});
```

### Context7: Rate Limiting Docs
```typescript
// Redis patterns
const redisPatterns = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/redis/ioredis",
  topic: "incr expire pipeline atomic operations",
  mode: "code"
});

// Rate limiting algorithms
const algorithms = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/mdn/content",
  topic: "rate limiting sliding window token bucket",
  mode: "info"
});
```

### Playwright: Attack Simulation
```typescript
// Simulate rapid requests
for (let i = 0; i < 20; i++) {
  await mcp_playwright.browser_evaluate({
    function: `async () => {
      return fetch('/api/payments', {
        method: 'POST',
        body: JSON.stringify({ cardToken: 'tok_${i}' })
      }).then(r => r.status);
    }`
  });
}

// Verify block
const status = await mcp_playwright.browser_evaluate({
  function: `async () => {
    const r = await fetch('/api/payments', { method: 'POST' });
    return r.status;
  }`
});
// Should be 429
```

### Chrome: Dashboard Monitoring
```typescript
// Load fraud dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://admin/fraud"
});

// Extract block count
const count = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".velocity-blocks-count",
  payload: "text"
});

// Screenshot
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "fraud-dash.png"
});
```

### Episodic Memory: Attack History
```typescript
// Recall past attacks
const attacks = await mcp_episodic_memory.search({
  query: ["velocity attack", "BIN attack", "card testing", "blocked"],
  mode: "both"
});

// Find mitigation strategies
const mitigations = await mcp_episodic_memory.search({
  query: "velocity attack successful block mitigation",
  mode: "vector"
});
```

---

## Agent Dispatch Patterns

### Security Architecture
```json
{
  "requesting_agent": "detect-velocity-attack",
  "target_agent": "security-auditor",
  "request_type": "design_velocity_detection",
  "payload": {
    "attack_types": ["card_testing", "bin_attack", "device_attack"],
    "requirements": ["real_time", "low_false_positives", "whitelist_support"]
  }
}
```

### Penetration Testing
```json
{
  "requesting_agent": "detect-velocity-attack",
  "target_agent": "penetration-tester",
  "request_type": "test_rate_limiting",
  "payload": {
    "scenarios": ["rapid_fire", "distributed", "whitelist_bypass_attempt"]
  }
}
```

---

## Best Practices

### Detection Strategy
- **Multiple Signals**: IP, Card, BIN, Device combined
- **Scoring**: Cumulative score vs single threshold
- **Granular Rules**: Different limits for different time windows
- **Whitelist**: Always allow trusted sources

### Implementation
- **Atomic Operations**: Use Redis INCR (atomic)
- **TTL**: Always set expiry on counters
- **No Race Conditions**: Pipeline multiple operations
- **Silent Decline**: Don't reveal fraud detection

### Performance
- **Redis**: <5ms per check
- **Async**: Don't block payment processing
- **Caching**: Cache whitelist in memory
- **Target**: <100ms total fraud check time

### False Positives
- **Monitor**: Track false positive rate
- **Whitelist**: Merchants, call centers
- **Generous Limits**: Start conservative
- **Adjust**: Based on attack patterns

### Response Strategy
- **Silent**: Generic "declined" message
- **Log**: Detailed internal logs
- **Alert**: Real-time alerts on spikes
- **Analysis**: Daily review of blocked attempts

### Testing
- **Simulation**: Test all attack scenarios
- **Load Testing**: Verify performance under load
- **Penetration Testing**: Red team attacks
- **Monitoring**: Real-time fraud dashboard
