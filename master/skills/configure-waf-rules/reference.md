# Reference: AWS WAF Rules

## Managed Rule Groups

- `AWS-AWSManagedRulesCommonRuleSet`: Generic exploits (CSRF, RFI).
- `AWS-AWSManagedRulesSQLiRuleSet`: SQL Injection patterns.
- `AWS-AWSManagedRulesKnownBadInputsRuleSet`: Bad user agents, Java deserialization.

## Fintech Custom Rules

- **High Velocity**: Limit Login attempts.
- **Card Testing**: Limit distinct card numbers per IP (requires specialized logic or Lambda @ Edge).
- **Sensitive Paths**: Stricter rules for `/v1/transactions`.
