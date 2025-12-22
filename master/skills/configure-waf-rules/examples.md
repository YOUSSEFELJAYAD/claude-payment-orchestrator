# Examples: WAF Configuration

## Rate Limit Rule (JSON)

```json
{
  "Name": "RateLimit-API",
  "Priority": 100,
  "Statement": {
    "RateBasedStatement": {
      "Limit": 500,
      "AggregateKeyType": "IP",
      "ScopeDownStatement": {
        "ByteMatchStatement": {
          "SearchString": "/api",
          "FieldToMatch": { "UriPath": {} },
          "PositionalConstraint": "STARTS_WITH"
        }
      }
    }
  },
  "Action": { "Block": {} },
  "VisibilityConfig": {
    "SampledRequestsEnabled": true,
    "CloudWatchMetricsEnabled": true,
    "MetricName": "RateLimit"
  }
}
```
