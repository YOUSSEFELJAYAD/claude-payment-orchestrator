# Reference: Prometheus Queries (PromQL)

## Request Rate

```promql
rate(payment_requests_total[5m])
```

## Latency P99

```promql
histogram_quantile(0.99, rate(payment_request_duration_seconds_bucket[5m]))
```

## Error Ratio

```promql
rate(payment_requests_total{status="5xx"}[5m]) / rate(payment_requests_total[5m])
```
