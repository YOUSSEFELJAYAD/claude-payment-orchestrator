# Reference: Log Formats

## CloudTrail Event

```json
{
  "eventTime": "2023-01-01T12:00:00Z",
  "eventName": "ConsoleLogin",
  "userIdentity": { "type": "IAMUser", "userName": "admin" },
  "sourceIPAddress": "1.2.3.4"
}
```

## VPC Flow Log

`version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes start end action log-status`

- Action: `ACCEPT` or `REJECT`.
