# Reference: Smart Routing Strategies

## 1. Static Rules (Attribute-Based)

The most common and predictable method.

- **BIN Routing**: Route 4xxx (Visa) to Acquirer A, 5xxx (Mastercard) to Acquirer B.
  - _Why?_ Volume discounts or technical specialization.
- **Currency Routing**: Route USD to US Acquirer, EUR to EU Acquirer.
  - _Why?_ Avoid FX conversion fees (up to 3%).
- **Amount Routing**: Route <$10 microtxns to Aggregator (Stripe), >$100 to Merchant Account (WorldPay).
  - _Why?_ Fee structure optimization (Fixed vs %).

## 2. Dynamic Rules (Performance-Based)

Real-time decisioning based on recent health.

- **Success Rate**: If PSP A has >5% failure rate in last 10 mins, demote to failover.
- **Latency**: If PSP B takes >3s avg, avoid for time-sensitive flows.

## 3. Geo-Routing

- Route based on Billing Country or IP Address to local acquirers to increase auth rates ("On-us" transactions).
