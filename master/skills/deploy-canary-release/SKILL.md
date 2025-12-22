# Skill: Deploy Canary Release

**Role:** sequential-reasoner (Release Engineer)
**Domain:** DevOps & Infrastructure
**Objective:** Safely rollout new Payment Service versions using weighted traffic shifting (Canary) via Istio/Kubernetes, with comprehensive monitoring, automated testing, and rollback capabilities.

## Available Capabilities

| Category | Capability | Infrastructure Use Case |
|----------|-----------|-------------------------|
| **MCP Servers** | | |
| Serena | Code Analysis | Find deployment scripts, analyze manifests, trace config |
| Context7 | Documentation | Kubernetes/Istio docs, deployment patterns, monitoring |
| Playwright | Browser Testing | Automated canary verification, health check testing |
| Chrome | Dashboard Access | Monitor Grafana/K8s dashboards, alert verification |
| Episodic Memory | Incident History | Recall past deployment issues, rollback patterns |
| **Superpowers** | | |
| systematic-debugging | Debug Issues | Root cause canary failures, investigate rollbacks |
| verification-before-completion | Deploy Verification | Verify canary health before promotion |
| writing-plans | Deployment Planning | Create multi-stage rollout plans |
| **Agents** | | |
| security-auditor | Security Review | Audit canary security posture before promotion |
| penetration-tester | Attack Testing | Verify canary defenses under load |

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CANARY DEPLOYMENT WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────┤
│  1. RESEARCH      → Context7: Get Istio/K8s deployment patterns          │
│  2. ANALYSIS      → Serena: Find existing deployment configs             │
│  3. MEMORY CHECK  → Episodic: Recall past deployment issues              │
│  4. PLAN          → Writing Plans: Create staged rollout plan            │
│  5. DEPLOY        → Apply v2 deployment (0% traffic)                     │
│  6. HEALTH CHECK  → Playwright: Automated endpoint verification          │
│  7. SHIFT 1%      → Update VirtualService weight                         │
│  8. MONITOR       → Chrome: Watch Grafana dashboards (5 min)             │
│  9. ANALYZE       → Evaluate error rate, latency, success metrics        │
│  10. DECISION     → Promote (10%→50%→100%) or Rollback (0%)              │
│  11. VERIFY       → Verification: Confirm final state                    │
│  12. DOCUMENT     → Serena Memory: Store deployment outcome              │
└─────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Pre-Deployment Research

```typescript
// Get latest Kubernetes deployment patterns
const k8sDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/kubernetes/kubernetes",
  topic: "deployment strategies canary rolling",
  mode: "code"
});

// Get Istio traffic management patterns
const istioDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/istio/istio",
  topic: "VirtualService weight-based routing",
  mode: "code"
});

// Find existing deployment manifests
const deploymentFiles = await mcp_serena.search_for_pattern({
  substring_pattern: "kind: Deployment|VirtualService|DestinationRule",
  relative_path: "k8s"
});

// Analyze current deployment configuration
const currentDeployment = await mcp_serena.read_file({
  relative_path: "k8s/payment-service-deployment.yaml"
});

// Recall past deployment incidents
const incidents = await mcp_episodic_memory.search({
  query: ["canary deployment", "rollback", "traffic shift failure"],
  mode: "both",
  limit: 5
});
```

### Phase 2: Deployment Execution

```typescript
// Deploy v2 with 0% traffic
await mcp_serena.execute_shell_command({
  command: "kubectl apply -f k8s/payment-service-v2-deployment.yaml"
});

// Wait for pods to be ready
await mcp_serena.execute_shell_command({
  command: "kubectl wait --for=condition=Ready pod -l app=payment-service,version=v2 --timeout=5m"
});

// Apply canary routing (1% traffic to v2)
const virtualService = `
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: payment-service
spec:
  hosts:
  - payment-service
  http:
  - match:
    - headers:
        x-canary:
          exact: "true"
    route:
    - destination:
        host: payment-service
        subset: v2
      weight: 100
  - route:
    - destination:
        host: payment-service
        subset: v1
      weight: 99
    - destination:
        host: payment-service
        subset: v2
      weight: 1
`;

await mcp_serena.replace_content({
  relative_path: "k8s/payment-service-virtualservice.yaml",
  needle: "weight: 100",
  repl: "weight: 99",
  mode: "regex"
});
```

### Phase 3: Automated Verification

```typescript
// Test canary health endpoints
await mcp_playwright.browser_navigate({
  url: "https://payment-api.internal/health"
});

const healthStatus = await mcp_playwright.browser_evaluate({
  function: `() => JSON.parse(document.body.textContent)`
});

// Test canary with internal header
await mcp_playwright.browser_run_code({
  code: `async (page) => {
    const response = await page.request.post('https://payment-api.internal/authorize', {
      headers: { 'x-canary': 'true' },
      data: {
        amount: 1000,
        currency: 'USD',
        card: { number: '4111111111111111', exp: '12/25', cvv: '123' }
      }
    });
    return await response.json();
  }`
});

// Screenshot health dashboard
await mcp_playwright.browser_take_screenshot({
  filename: "tmp/canary-health-check.png",
  fullPage: true
});
```

### Phase 4: Monitoring & Decision

```typescript
// Access Grafana canary dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://grafana.internal:3000/d/canary-deployment"
});

// Wait for metrics to load
await mcp_chrome.use_browser({
  action: "await_text",
  payload: "Canary Metrics",
  timeout: 10000
});

// Extract canary metrics
const canaryErrorRate = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".panel-canary-errors .metric-value",
  payload: "text"
});

const canaryLatencyP99 = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".panel-canary-p99 .metric-value",
  payload: "text"
});

const canarySuccessRate = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".panel-canary-success .metric-value",
  payload: "text"
});

// Screenshot current dashboard state
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "tmp/grafana-canary-metrics.png"
});

// Decision logic
const errorRateThreshold = 1.0; // 1%
const latencyP99Threshold = 2000; // 2s
const successRateThreshold = 99.0; // 99%

const metrics = {
  errorRate: parseFloat(canaryErrorRate),
  latencyP99: parseFloat(canaryLatencyP99),
  successRate: parseFloat(canarySuccessRate)
};

if (
  metrics.errorRate <= errorRateThreshold &&
  metrics.latencyP99 <= latencyP99Threshold &&
  metrics.successRate >= successRateThreshold
) {
  console.log("✅ Canary healthy - proceeding to 10% traffic");
  // Update VirtualService weight to 10%
} else {
  console.log("❌ Canary unhealthy - initiating rollback");
  // Rollback to 0% traffic
}
```

## MCP Integration Examples

### Serena: Deployment Manifest Management

```typescript
// Find all deployment-related files
const deploymentAssets = await mcp_serena.list_dir({
  relative_path: "k8s",
  recursive: true
});

// Get deployment manifest structure
const manifestSymbols = await mcp_serena.get_symbols_overview({
  relative_path: "k8s/payment-service-deployment.yaml",
  depth: 2
});

// Update deployment image tag
await mcp_serena.replace_content({
  relative_path: "k8s/payment-service-deployment.yaml",
  needle: "image: payment-service:v1.2.3",
  repl: "image: payment-service:v1.2.4",
  mode: "exact"
});

// Find all VirtualService weight configurations
const weightConfigs = await mcp_serena.search_for_pattern({
  substring_pattern: "weight:\\s*\\d+",
  relative_path: "k8s"
});

// Store deployment decision in project memory
await mcp_serena.write_memory({
  memory_file_name: "deployment-history.md",
  content: `
## Deployment: v1.2.4 Canary (${new Date().toISOString()})

**Decision:** Promoted to 100% after successful 1% → 10% → 50% progression

**Metrics:**
- Error Rate: 0.12% (threshold: 1%)
- P99 Latency: 1.2s (threshold: 2s)
- Success Rate: 99.88% (threshold: 99%)

**Duration:** 45 minutes
**Rollback:** None required
  `
});
```

### Context7: Deployment Documentation

```typescript
// Kubernetes deployment strategies
const k8sStrategies = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/kubernetes/kubernetes",
  topic: "Deployment RollingUpdate strategy maxSurge maxUnavailable",
  mode: "code"
});

// Istio traffic management
const istioTraffic = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/istio/istio",
  topic: "VirtualService HTTPRoute weight mirror",
  mode: "code"
});

// Helm chart deployment
const helmDeploy = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/helm/helm",
  topic: "upgrade --install --wait --atomic",
  mode: "code"
});

// ArgoCD progressive delivery
const argocdCanary = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/argoproj/argo-cd",
  topic: "Rollout canary steps",
  mode: "info"
});
```

### Playwright: Automated Canary Testing

```typescript
// Navigate to canary endpoint
await mcp_playwright.browser_navigate({
  url: "https://payment-api.internal/v2/health"
});

// Verify health response
await mcp_playwright.browser_wait_for({
  text: "healthy"
});

// Test payment authorization on canary
await mcp_playwright.browser_navigate({
  url: "https://payment-test-ui.internal"
});

// Fill test payment form
await mcp_playwright.browser_fill_form({
  fields: [
    { name: "Card Number", type: "textbox", ref: "card-number", value: "4111111111111111" },
    { name: "Expiry", type: "textbox", ref: "expiry", value: "12/25" },
    { name: "CVV", type: "textbox", ref: "cvv", value: "123" },
    { name: "Amount", type: "textbox", ref: "amount", value: "10.00" }
  ]
});

// Force canary routing via header injection
await mcp_playwright.browser_run_code({
  code: `async (page) => {
    await page.route('**/authorize', route => {
      const headers = route.request().headers();
      headers['x-canary'] = 'true';
      route.continue({ headers });
    });
  }`
});

// Submit payment
await mcp_playwright.browser_click({
  element: "Submit Payment",
  ref: "submit-btn"
});

// Wait for success
await mcp_playwright.browser_wait_for({
  text: "Payment Successful"
});

// Get transaction ID
const snapshot = await mcp_playwright.browser_snapshot({});
console.log("Canary transaction completed:", snapshot);
```

### Chrome: Dashboard Monitoring

```typescript
// Access Kubernetes dashboard
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://kubernetes-dashboard.internal:8001"
});

// Check canary pod status
await mcp_chrome.use_browser({
  action: "click",
  selector: "a[href='/workloads/deployments/default/payment-service-v2']"
});

const podStatus = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".deployment-status .replicas",
  payload: "text"
});

// Navigate to Grafana
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "http://grafana.internal:3000/d/canary"
});

// Monitor for 5 minutes, taking snapshots every 30 seconds
for (let i = 0; i < 10; i++) {
  await new Promise(resolve => setTimeout(resolve, 30000));

  await mcp_chrome.use_browser({
    action: "screenshot",
    payload: `tmp/canary-monitor-${i}.png`
  });

  const currentMetrics = await mcp_chrome.use_browser({
    action: "extract",
    selector: ".metrics-panel",
    payload: "markdown"
  });

  console.log(`Checkpoint ${i + 1}/10:`, currentMetrics);
}
```

### Episodic Memory: Incident Learning

```typescript
// Search for past canary failures
const pastFailures = await mcp_episodic_memory.search({
  query: ["canary failed", "rollback", "deployment abort"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Find successful deployment patterns
const successPatterns = await mcp_episodic_memory.search({
  query: "canary deployment successful promoted 100%",
  mode: "text",
  limit: 5
});

// Recall specific incident details
const incidentDetails = await mcp_episodic_memory.read({
  path: pastFailures[0].path,
  startLine: 1,
  endLine: 100
});

// Learn from past metrics thresholds
const metricLearnings = await mcp_episodic_memory.search({
  query: ["error rate threshold", "latency threshold", "canary metrics"],
  mode: "both"
});
```

## Agent Dispatch Patterns

### Security Review Before Promotion

```json
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "security_audit",
  "target_agent": "security-auditor",
  "payload": {
    "scope": "canary_deployment",
    "version": "v1.2.4",
    "checks": [
      "TLS configuration",
      "Secret rotation",
      "Network policies",
      "RBAC permissions",
      "Container image vulnerabilities"
    ]
  }
}
```

### Load Testing Under Attack Scenarios

```json
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "penetration_test",
  "target_agent": "penetration-tester",
  "payload": {
    "target": "payment-service-v2-canary",
    "scenarios": [
      "DDoS simulation (10k req/s)",
      "SQL injection attempts",
      "Card testing velocity attacks",
      "Auth bypass attempts"
    ],
    "traffic_percentage": 1,
    "duration_minutes": 10
  }
}
```

## Deployment Stages

### Stage 1: Internal Testing (x-canary header)

```yaml
# 0% production traffic, 100% via header
- match:
  - headers:
      x-canary:
        exact: "true"
  route:
  - destination:
      host: payment-service
      subset: v2
    weight: 100
```

**Verification:**
- Playwright automated test suite
- Manual QA team testing
- Security team penetration testing

### Stage 2: 1% Production Traffic

```yaml
# Shift 1% of real traffic to v2
- route:
  - destination:
      host: payment-service
      subset: v1
    weight: 99
  - destination:
      host: payment-service
      subset: v2
    weight: 1
```

**Monitor Duration:** 15 minutes
**Success Criteria:**
- Error rate < 1%
- P99 latency < 2s
- Success rate > 99%
- No critical alerts

### Stage 3: 10% Production Traffic

```yaml
- route:
  - destination:
      host: payment-service
      subset: v1
    weight: 90
  - destination:
      host: payment-service
      subset: v2
    weight: 10
```

**Monitor Duration:** 30 minutes
**Additional Checks:**
- Database connection pool stability
- Redis cache hit rates
- PSP adapter error rates

### Stage 4: 50% Production Traffic

```yaml
- route:
  - destination:
      host: payment-service
      subset: v1
    weight: 50
  - destination:
      host: payment-service
      subset: v2
    weight: 50
```

**Monitor Duration:** 60 minutes
**Business Metrics:**
- Authorization success rate by PSP
- 3DS completion rate
- Refund processing success

### Stage 5: 100% Production Traffic

```yaml
- route:
  - destination:
      host: payment-service
      subset: v2
    weight: 100
```

**Post-Deployment:**
- Keep v1 pods running for 24h (fast rollback)
- Document deployment in Serena memory
- Update runbooks
- Team retrospective

## Rollback Procedure

### Automated Rollback Triggers

```typescript
// Monitor canary metrics continuously
const shouldRollback = (metrics: CanaryMetrics): boolean => {
  return (
    metrics.errorRate > 1.0 ||          // Error rate > 1%
    metrics.latencyP99 > 2000 ||        // P99 > 2s
    metrics.successRate < 99.0 ||       // Success < 99%
    metrics.criticalAlerts > 0          // Any critical alerts
  );
};

// Immediate rollback to 0%
if (shouldRollback(currentMetrics)) {
  await mcp_serena.execute_shell_command({
    command: "kubectl apply -f k8s/payment-service-virtualservice-rollback.yaml"
  });

  // Verify rollback
  const rollbackStatus = await mcp_serena.execute_shell_command({
    command: "kubectl get virtualservice payment-service -o yaml"
  });

  // Alert team
  console.log("🚨 CANARY ROLLBACK INITIATED - v2 set to 0% traffic");

  // Document incident
  await mcp_serena.write_memory({
    memory_file_name: "deployment-incidents.md",
    content: `## Rollback: v1.2.4 (${new Date().toISOString()})

**Reason:** ${JSON.stringify(currentMetrics)}
**Action:** Traffic reverted to v1 (100%)
**Investigation:** In progress
    `
  });
}
```

### Manual Rollback

```bash
# Instant rollback command
kubectl patch virtualservice payment-service --type=json -p='[
  {"op": "replace", "path": "/spec/http/0/route/0/weight", "value": 100},
  {"op": "replace", "path": "/spec/http/0/route/1/weight", "value": 0}
]'

# Verify
kubectl get virtualservice payment-service -o jsonpath='{.spec.http[0].route[*].weight}'
```

## Best Practices

### Sticky Sessions

Ensure user sessions remain on same version during checkout:

```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: payment-service
spec:
  host: payment-service
  trafficPolicy:
    loadBalancer:
      consistentHash:
        httpCookie:
          name: payment-session
          ttl: 3600s
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
```

### Header-Based Testing

Enable QA testing before traffic shift:

```yaml
# Priority route: header match
- match:
  - headers:
      x-canary:
        exact: "true"
  route:
  - destination:
      host: payment-service
      subset: v2
```

### Monitoring Windows

- **1% traffic:** 15 min (detect immediate issues)
- **10% traffic:** 30 min (observe patterns)
- **50% traffic:** 60 min (validate scale)
- **100% traffic:** Keep v1 for 24h (fast rollback)

### Metric Thresholds

```typescript
const CANARY_THRESHOLDS = {
  errorRate: 1.0,        // Max 1% error rate
  latencyP99: 2000,      // Max 2s P99 latency
  successRate: 99.0,     // Min 99% success
  latencyP50: 500,       // Max 500ms P50 latency
  criticalAlerts: 0      // Zero critical alerts allowed
};
```

### Scope Reduction

Only canary the specific service changed:
- Database migrations run separately (before canary)
- Config changes applied to both v1 and v2
- Feature flags control new features
- Shared dependencies (Redis, queues) unchanged

### Documentation

After every deployment, update:

```markdown
# Deployment Log: v1.2.4

**Date:** 2024-12-18
**Result:** Success - Promoted to 100%
**Duration:** 2h 15min
**Issues:** None
**Metrics:** Error 0.15%, P99 1.8s, Success 99.85%
**Rollback:** Not required
```

Store in Serena memory:

```typescript
await mcp_serena.write_memory({
  memory_file_name: "deployment-log-2024-12.md",
  content: deploymentLog
});
```
