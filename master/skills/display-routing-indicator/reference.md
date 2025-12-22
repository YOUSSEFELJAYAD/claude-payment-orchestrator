# Reference: Routing Indicator Patterns

## Strategy Labels

- **Lowest Fee**: "Cost Saver" / "Best Rate".
- **Highest Auth Rate**: "Reliability" / "Smart Retry".
- **Failover**: "Backup Route" (Warn user if primary failed?).

## UI Components

- **Badge**: `<Badge variant="outline" className="bg-green-50 text-green-700">Bit Rate</Badge>`
- **Tooltip**: Hover to see "Saved est. $0.40 on this txn".
- **Timeline**: Show "Attempt 1 (Stripe) -> Failed -> Attempt 2 (Adyen) -> Success".
