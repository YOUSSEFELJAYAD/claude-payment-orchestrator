# Skill: Monitor Transaction Latency

**Role:** sequential-reasoner (SRE)
**Domain:** DevOps & Infrastructure
**Objective:** Track and alert on Payment Gateway latency using comprehensive monitoring tools, browser automation for dashboards, code analysis, and documentation lookup to ensure sub-2-second P99 performance.

## Available Capabilities

| Category | Capability | Monitoring Use Case |
|----------|-----------|---------------------|
| **MCP Servers** | | |
| Serena | Code Analysis | Find instrumentation code, analyze metrics endpoints |
| Context7 | Documentation | Prometheus/Grafana/OpenTelemetry docs, alerting |
| Playwright | Automation | Generate automated dashboard reports |
| Chrome | Dashboard Access | Real-time Grafana/CloudWatch/DataDog monitoring |
| Episodic Memory | Incident History | Recall past latency spikes, root causes |
| **Superpowers** | | |
| systematic-debugging | Debug Latency | Root cause latency issues, trace slow paths |
| verification-before-completion | Verify Metrics | Confirm metrics collecting before deployment |
| **Agents** | | |
| fullstack-developer | Instrumentation | Add timing middleware, metrics collection |
| api-designer | Performance Design | Design low-latency API patterns |

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    LATENCY MONITORING WORKFLOW                           │
├─────────────────────────────────────────────────────────────────────────┤
│  1. RESEARCH      → Context7: Get Prometheus/OpenTelemetry patterns      │
│  2. ANALYSIS      → Serena: Review existing instrumentation code        │
│  3. MEMORY        → Episodic: Recall past latency incidents             │
│  4. INSTRUMENT    → Add timing middleware for PSP requests               │
│  5. EXPOSE        → Create /metrics endpoint (Prometheus format)         │
│  6. CONFIGURE     → Setup Grafana dashboards via Chrome                  │
│  7. ALERT         → Configure PagerDuty/Slack alert rules                │
│  8. MONITOR       → Chrome: Real-time dashboard monitoring               │
│  9. AUTOMATE      → Playwright: Automated daily reports                  │
│  10. INVESTIGATE  → Systematic Debugging: Root cause spikes              │
│  11. DOCUMENT     → Serena Memory: Store incident resolutions            │
└─────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Research & Setup

```typescript
// Get Prometheus client documentation
const promDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/prometheus/prom-client",
  topic: "Histogram histogram register metrics",
  mode: "code"
});

// Get OpenTelemetry tracing patterns
const otelDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/open-telemetry/opentelemetry-js",
  topic: "tracer span attributes metrics",
  mode: "code"
});

// Get Grafana dashboard configuration
const grafanaDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/grafana/grafana",
  topic: "dashboard panels PromQL queries",
  mode: "info"
});

// Find existing metrics instrumentation
const metricsCode = await mcp_serena.search_for_pattern({
  substring_pattern: "histogram|counter|gauge|metrics|prometheus",
  relative_path: "src"
});

// Find PSP request timing
const timingCode = await mcp_serena.search_for_pattern({
  substring_pattern: "startTime|endTime|duration|latency|performance\\.now",
  relative_path: "src/adapters"
});

// Recall past latency incidents
const latencyIncidents = await mcp_episodic_memory.search({
  query: ["latency spike", "P99", "PSP degradation", "timeout"],
  mode: "both",
  limit: 10
});
```

### Phase 2: Instrumentation

```typescript
// Add Prometheus middleware
const metricsMiddleware = `
import { Registry, Histogram } from 'prom-client';

export const register = new Registry();

// Payment request duration histogram
export const paymentDurationHistogram = new Histogram({
  name: 'payment_request_duration_seconds',
  help: 'Payment request duration in seconds',
  labelNames: ['psp', 'operation', 'status', 'error_code'],
  buckets: [0.1, 0.25, 0.5, 1, 2, 5, 10], // seconds
  registers: [register]
});

// PSP upstream duration (separate from internal processing)
export const pspUpstreamDurationHistogram = new Histogram({
  name: 'psp_upstream_duration_seconds',
  help: 'PSP upstream request duration in seconds',
  labelNames: ['psp', 'operation'],
  buckets: [0.05, 0.1, 0.25, 0.5, 1, 2, 3],
  registers: [register]
});

// Middleware to track timing
export const metricsMiddleware = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - startTime) / 1000;
    const labels = {
      psp: req.psp || 'unknown',
      operation: req.operation || req.path,
      status: res.statusCode >= 200 && res.statusCode < 300 ? 'success' : 'failure',
      error_code: res.errorCode || 'none'
    };

    paymentDurationHistogram.observe(labels, duration);
  });

  next();
};
`;

await mcp_serena.replace_content({
  relative_path: "src/middleware/metrics.ts",
  needle: "// Metrics middleware",
  repl: metricsMiddleware,
  mode: "exact"
});

// Add metrics endpoint
const metricsEndpoint = `
import { register } from './middleware/metrics';

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
`;

await mcp_serena.insert_after_symbol({
  name_path: "setupRoutes",
  relative_path: "src/app.ts",
  body: metricsEndpoint
});
```

### Phase 3: Dashboard Configuration

```typescript
// Access Grafana to create dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://grafana.internal:3000/dashboard/new"
});

// Wait for dashboard editor
await mcp_chrome.use_browser({
  action: "await_text",
  payload: "Add visualization",
  timeout: 5000
});

// Click add panel
await mcp_chrome.use_browser({
  action: "click",
  selector: "button[aria-label='Add visualization']"
});

// Add P99 Latency panel
await mcp_chrome.use_browser({
  action: "type",
  selector: "textarea[data-testid='query-editor']",
  payload: `histogram_quantile(0.99, sum(rate(payment_request_duration_seconds_bucket[5m])) by (le, psp))\n`
});

// Set panel title
await mcp_chrome.use_browser({
  action: "type",
  selector: "input[placeholder='Panel title']",
  payload: "Payment P99 Latency by PSP"
});

// Screenshot dashboard
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "tmp/grafana-latency-dashboard.png"
});

// Save dashboard
await mcp_chrome.use_browser({
  action: "click",
  selector: "button[aria-label='Save dashboard']"
});
```

### Phase 4: Automated Reporting

```typescript
// Generate daily latency report with Playwright
await mcp_playwright.browser_navigate({
  url: "http://grafana.internal:3000/d/payments?from=now-24h&to=now"
});

await mcp_playwright.browser_wait_for({
  text: "Payment Latency Dashboard"
});

// Take screenshots of each panel
const panels = [
  { name: "request-rate", title: "Request Rate" },
  { name: "latency-p99", title: "P99 Latency" },
  { name: "latency-p50", title: "P50 Latency" },
  { name: "error-rate", title: "Error Rate" },
  { name: "psp-breakdown", title: "PSP Breakdown" }
];

for (const panel of panels) {
  await mcp_playwright.browser_take_screenshot({
    filename: `tmp/daily-report-${panel.name}.png`,
    element: `Panel ${panel.title}`,
    ref: `panel-${panel.name}`
  });
}

// Extract metrics as text
const snapshot = await mcp_playwright.browser_snapshot({});

// Generate report
const report = `
# Daily Latency Report - ${new Date().toISOString().split('T')[0]}

## Key Metrics (24h)
${snapshot}

## Alerts Fired
- [List from PagerDuty API]

## Recommendations
- [Based on metric analysis]
`;

await mcp_serena.write_memory({
  memory_file_name: `latency-report-${new Date().toISOString().split('T')[0]}.md`,
  content: report
});
```

## MCP Integration Examples

### Serena: Code Analysis & Instrumentation

```typescript
// Find all PSP adapter files
const adapters = await mcp_serena.list_dir({
  relative_path: "src/adapters",
  recursive: true
});

// Analyze existing timing code
const stripeAdapter = await mcp_serena.find_symbol({
  name_path_pattern: "StripeAdapter/authorize",
  include_body: true,
  depth: 2
});

// Find all places where PSP requests are made
const pspCalls = await mcp_serena.search_for_pattern({
  substring_pattern: "await.*\\.post\\(|await.*\\.get\\(|axios\\.|fetch\\(",
  relative_path: "src/adapters"
});

// Add timing wrapper to each PSP call
const timingWrapper = `
async function measurePSPCall<T>(
  psp: string,
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const startTime = Date.now();

  try {
    const result = await fn();
    const duration = (Date.now() - startTime) / 1000;

    pspUpstreamDurationHistogram.observe(
      { psp, operation },
      duration
    );

    return result;
  } catch (error) {
    const duration = (Date.now() - startTime) / 1000;

    pspUpstreamDurationHistogram.observe(
      { psp, operation },
      duration
    );

    throw error;
  }
}
`;

await mcp_serena.insert_after_symbol({
  name_path: "imports",
  relative_path: "src/adapters/base.ts",
  body: timingWrapper
});

// Document instrumentation
await mcp_serena.write_memory({
  memory_file_name: "metrics-instrumentation.md",
  content: `
# Payment Latency Instrumentation

## Metrics Collected

### payment_request_duration_seconds
- **Type:** Histogram
- **Labels:** psp, operation, status, error_code
- **Buckets:** [0.1, 0.25, 0.5, 1, 2, 5, 10]
- **Measures:** Total request duration (including internal processing)

### psp_upstream_duration_seconds
- **Type:** Histogram
- **Labels:** psp, operation
- **Buckets:** [0.05, 0.1, 0.25, 0.5, 1, 2, 3]
- **Measures:** PSP API call duration (upstream only)

## Instrumentation Points
- \`src/middleware/metrics.ts\` - Request middleware
- \`src/adapters/base.ts\` - PSP timing wrapper
- \`src/app.ts\` - /metrics endpoint
  `
});
```

### Context7: Monitoring Documentation

```typescript
// Prometheus query patterns
const promQLDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/prometheus/prometheus",
  topic: "histogram_quantile rate sum by",
  mode: "code"
});

// Grafana alerting
const grafanaAlerts = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/grafana/grafana",
  topic: "alerting rules thresholds notification channels",
  mode: "info"
});

// OpenTelemetry instrumentation
const otelInstrumentation = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/open-telemetry/opentelemetry-js",
  topic: "http instrumentation middleware automatic",
  mode: "code"
});

// DataDog APM (alternative)
const datadogDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/datadog/dd-trace-js",
  topic: "tracer init middleware latency",
  mode: "code"
});

// BullMQ queue metrics
const bullmqDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/taskforcesh/bullmq",
  topic: "metrics queue jobs completed failed",
  mode: "code"
});
```

### Chrome: Real-Time Dashboard Monitoring

```typescript
// Access Grafana dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://grafana.internal:3000/d/payment-latency"
});

// Wait for dashboard to load
await mcp_chrome.use_browser({
  action: "await_text",
  payload: "Payment Latency Dashboard",
  timeout: 10000
});

// Extract current P99 latency
const p99Latency = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".panel-latency-p99 .singlestat-panel-value",
  payload: "text"
});

console.log("Current P99:", p99Latency);

// Extract P50 latency
const p50Latency = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".panel-latency-p50 .singlestat-panel-value",
  payload: "text"
});

// Extract error rate
const errorRate = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".panel-error-rate .singlestat-panel-value",
  payload: "text"
});

// Extract PSP breakdown
const pspBreakdown = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".panel-psp-breakdown tbody",
  payload: "markdown"
});

// Screenshot current state
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "tmp/grafana-current-metrics.png"
});

// Check alerts
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://grafana.internal:3000/alerting/list"
});

const activeAlerts = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".alert-list .firing",
  payload: "markdown"
});

console.log("Active alerts:", activeAlerts);

// Monitor CloudWatch (AWS)
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#dashboards:name=PaymentMetrics"
});

// Extract CloudWatch metrics
const cloudwatchMetrics = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".dashboard-container",
  payload: "text"
});

// Continuous monitoring loop (5 min interval)
for (let i = 0; i < 12; i++) {
  await new Promise(resolve => setTimeout(resolve, 300000)); // 5 min

  const currentP99 = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".panel-latency-p99 .singlestat-panel-value",
    payload: "text"
  });

  const p99Value = parseFloat(currentP99);

  if (p99Value > 2.0) {
    console.log(`🚨 ALERT: P99 latency ${p99Value}s exceeds 2s threshold`);

    // Take screenshot for incident
    await mcp_chrome.use_browser({
      action: "screenshot",
      payload: `tmp/latency-spike-${new Date().toISOString()}.png`
    });
  }
}
```

### Playwright: Automated Test & Report Generation

```typescript
// Test payment latency under load
await mcp_playwright.browser_navigate({
  url: "https://payment-api.internal/health"
});

// Warm up
for (let i = 0; i < 10; i++) {
  await mcp_playwright.browser_run_code({
    code: `async (page) => {
      const start = Date.now();
      const response = await page.request.post('https://payment-api.internal/authorize', {
        data: {
          amount: 1000,
          currency: 'USD',
          card: { number: '4111111111111111', exp: '12/25', cvv: '123' }
        }
      });
      const duration = Date.now() - start;
      console.log(\`Request \${${i}}: \${duration}ms\`);
      return duration;
    }`
  });
}

// Generate weekly report
const reportDate = new Date();
const weekAgo = new Date(reportDate.getTime() - 7 * 24 * 60 * 60 * 1000);

await mcp_playwright.browser_navigate({
  url: `http://grafana.internal:3000/d/payments?from=${weekAgo.getTime()}&to=${reportDate.getTime()}`
});

// Export dashboard as PDF
await mcp_playwright.browser_run_code({
  code: `async (page) => {
    await page.pdf({
      path: 'tmp/weekly-latency-report.pdf',
      format: 'A4',
      landscape: true
    });
  }`
});

// Take panel screenshots
const panels = [
  "Request Rate (7d trend)",
  "P99 Latency (7d trend)",
  "Error Rate by PSP",
  "Slowest Endpoints"
];

for (const panelName of panels) {
  const element = await mcp_playwright.browser_snapshot({});
  // Find panel in snapshot, take screenshot
}
```

### Episodic Memory: Incident Analysis

```typescript
// Recall past latency spikes
const latencySpikes = await mcp_episodic_memory.search({
  query: ["latency spike", "P99 exceeded", "performance degradation"],
  mode: "both",
  limit: 20,
  after: "2024-01-01"
});

// Find root causes
const rootCauses = await mcp_episodic_memory.search({
  query: "payment latency root cause database|PSP|network|timeout",
  mode: "text",
  limit: 10
});

// Recall PSP-specific issues
const stripeIssues = await mcp_episodic_memory.search({
  query: ["Stripe latency", "Stripe timeout", "Stripe degradation"],
  mode: "both"
});

const adyenIssues = await mcp_episodic_memory.search({
  query: ["Adyen latency", "Adyen timeout", "Adyen degradation"],
  mode: "both"
});

// Find successful optimizations
const optimizations = await mcp_episodic_memory.search({
  query: "latency optimization reduced improved performance",
  mode: "text",
  limit: 5
});

// Read incident details
for (const incident of latencySpikes) {
  const details = await mcp_episodic_memory.read({
    path: incident.path,
    startLine: 1,
    endLine: 100
  });

  console.log(`Incident: ${incident.path}`);
  console.log(details);
}
```

## Agent Dispatch Patterns

### Request Instrumentation Development

```json
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "add_instrumentation",
  "target_agent": "fullstack-developer",
  "payload": {
    "scope": "payment_latency_tracking",
    "requirements": [
      "Add Prometheus metrics middleware",
      "Instrument all PSP adapters with timing",
      "Separate upstream vs internal processing time",
      "Add /metrics endpoint",
      "Include error_code in labels"
    ]
  }
}
```

### Performance Optimization

```json
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "optimize_latency",
  "target_agent": "api-designer",
  "payload": {
    "current_p99": "3.2s",
    "target_p99": "2.0s",
    "bottlenecks": [
      "Database connection pool exhaustion",
      "Synchronous PSP calls",
      "No response caching"
    ],
    "optimizations_needed": [
      "Implement connection pooling",
      "Add response caching with Redis",
      "Parallelize PSP calls where possible",
      "Implement circuit breaker pattern"
    ]
  }
}
```

## Dashboard Panels

### Panel 1: Request Rate

```promql
# Requests per second
rate(payment_request_duration_seconds_count[5m])
```

### Panel 2: P99 Latency by PSP

```promql
# 99th percentile latency by PSP
histogram_quantile(0.99,
  sum(rate(payment_request_duration_seconds_bucket[5m])) by (le, psp)
)
```

### Panel 3: P50 Latency by Operation

```promql
# 50th percentile (median) latency by operation
histogram_quantile(0.50,
  sum(rate(payment_request_duration_seconds_bucket[5m])) by (le, operation)
)
```

### Panel 4: Error Rate

```promql
# Error percentage
(
  sum(rate(payment_request_duration_seconds_count{status="failure"}[5m]))
  /
  sum(rate(payment_request_duration_seconds_count[5m]))
) * 100
```

### Panel 5: PSP Upstream vs Total Latency

```promql
# Compare upstream PSP time vs total request time
histogram_quantile(0.99,
  sum(rate(psp_upstream_duration_seconds_bucket[5m])) by (le, psp)
)

# vs

histogram_quantile(0.99,
  sum(rate(payment_request_duration_seconds_bucket[5m])) by (le, psp)
)
```

### Panel 6: Slowest Endpoints

```promql
# Top 10 slowest endpoints
topk(10,
  histogram_quantile(0.99,
    sum(rate(payment_request_duration_seconds_bucket[5m])) by (le, operation)
  )
)
```

## Alert Rules

### Critical: High P99 Latency

```yaml
alert: HighP99Latency
expr: |
  histogram_quantile(0.99,
    sum(rate(payment_request_duration_seconds_bucket[5m])) by (le)
  ) > 2
for: 5m
labels:
  severity: critical
annotations:
  summary: "Payment P99 latency above 2s"
  description: "P99 latency is {{ $value }}s (threshold: 2s)"
```

### Warning: PSP Degradation

```yaml
alert: PSPDegradation
expr: |
  histogram_quantile(0.99,
    sum(rate(psp_upstream_duration_seconds_bucket[5m])) by (le, psp)
  ) > 3
for: 3m
labels:
  severity: warning
annotations:
  summary: "PSP {{ $labels.psp }} latency degraded"
  description: "{{ $labels.psp }} P99 latency is {{ $value }}s"
```

### Critical: Error Spike

```yaml
alert: ErrorSpike
expr: |
  (
    sum(rate(payment_request_duration_seconds_count{status="failure"}[5m]))
    /
    sum(rate(payment_request_duration_seconds_count[5m]))
  ) > 0.05
for: 2m
labels:
  severity: critical
annotations:
  summary: "Payment error rate above 5%"
  description: "Error rate is {{ $value | humanizePercentage }}"
```

### Info: Traffic Anomaly

```yaml
alert: TrafficAnomaly
expr: |
  abs(
    rate(payment_request_duration_seconds_count[5m])
    -
    rate(payment_request_duration_seconds_count[5m] offset 1h)
  ) / rate(payment_request_duration_seconds_count[5m] offset 1h) > 0.5
for: 10m
labels:
  severity: info
annotations:
  summary: "Traffic changed by >50% vs 1h ago"
```

## Best Practices

### Metric Granularity

**DO:**
- Separate upstream (PSP) time from internal processing time
- Use histogram buckets appropriate for payment latency (100ms - 10s)
- Track by PSP, operation, status

**DON'T:**
- Include transaction IDs in labels (high cardinality)
- Track individual user IDs
- Use too many buckets (impacts storage)

### Label Design

```typescript
// Good: Low cardinality labels
{
  psp: "stripe",           // ~5-10 values
  operation: "authorize",  // ~5-10 values
  status: "success",       // 2 values
  error_code: "timeout"    // ~20 values
}

// Bad: High cardinality labels
{
  transaction_id: "txn_12345",  // ❌ Millions of values
  user_id: "usr_67890",         // ❌ Millions of values
  card_bin: "411111"            // ❌ Thousands of values
}
```

### Dashboard Organization

```
Payment Latency Dashboard
├─ Overview (single page)
│  ├─ Request Rate
│  ├─ P99 Latency
│  ├─ Error Rate
│  └─ Success Rate
├─ PSP Breakdown
│  ├─ Latency by PSP
│  ├─ Error Rate by PSP
│  └─ PSP Status Comparison
└─ Deep Dive
   ├─ Latency Distribution (heatmap)
   ├─ Slowest Endpoints
   └─ Error Codes Breakdown
```

### Alerting Hierarchy

1. **Critical** (PagerDuty) - P99 > 2s for 5min, Error > 5%
2. **Warning** (Slack) - Single PSP degraded, Traffic anomaly
3. **Info** (Email) - Trend changes, capacity planning

### Documentation

After every latency incident:

```typescript
await mcp_serena.write_memory({
  memory_file_name: `incident-latency-${new Date().toISOString()}.md`,
  content: `
# Latency Incident - ${new Date().toISOString()}

## Timeline
- 14:32 UTC: P99 latency spike to 5.2s detected
- 14:35 UTC: Investigation started
- 14:42 UTC: Root cause identified (database connection pool exhaustion)
- 14:50 UTC: Mitigation applied (increased pool size)
- 15:10 UTC: Latency returned to normal (1.8s P99)

## Root Cause
Database connection pool exhausted due to long-running queries from analytics dashboard.

## Resolution
1. Increased connection pool from 10 to 50
2. Added query timeout to analytics queries
3. Separated analytics DB from transactional DB

## Prevention
- Add alert for connection pool usage > 80%
- Implement read replica for analytics
- Add circuit breaker for slow queries

## Metrics During Incident
- P99: 5.2s (normal: 1.8s)
- Error Rate: 0.3% (normal: 0.1%)
- Request Rate: 150/s (normal)
  `
});
```

### Continuous Monitoring Checklist

```typescript
const monitoringChecklist = [
  "✅ Prometheus metrics exposed at /metrics",
  "✅ Grafana dashboard configured with all panels",
  "✅ PagerDuty alerts for critical thresholds",
  "✅ Slack notifications for warnings",
  "✅ Daily automated reports via Playwright",
  "✅ Episodic memory search for past incidents",
  "✅ Chrome dashboard monitoring setup",
  "✅ PSP upstream latency separated from total",
  "✅ Low-cardinality labels only",
  "✅ Histogram buckets tuned for payment latency",
  "✅ Circuit breaker pattern implemented",
  "✅ Connection pooling optimized",
  "✅ Response caching with Redis",
  "✅ All incidents documented in Serena memory"
];

await mcp_serena.write_memory({
  memory_file_name: "monitoring-checklist.md",
  content: monitoringChecklist.join("\n")
});
```
