# Examples: Grafana Panel JSON

```json
{
  "type": "timeseries",
  "title": "PSP Latency (P99)",
  "targets": [
    {
      "expr": "histogram_quantile(0.99, rate(psp_duration_seconds_bucket[5m]))",
      "legendFormat": "{{psp}}"
    }
  ],
  "fieldConfig": {
    "defaults": {
      "unit": "s",
      "thresholds": {
        "steps": [
          { "color": "green", "value": null },
          { "color": "red", "value": 2 }
        ]
      }
    }
  }
}
```
