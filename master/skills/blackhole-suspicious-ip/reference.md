# Reference: Blackhole Strategies

## Null Route (Linux)

`ip route add 1.2.3.4/32 via 127.0.0.1` (lo) or `blackhole`.

## AWS NACL

- **Stateless**: Rule #100 DENY 1.2.3.4/32. Rule #200 ALLOW 0.0.0.0/0.
- **Order matters**: Lower number = Higher priority.

## AWS WAF vs NACL

- **WAF**: Layer 7 (HTTP). Expensive for volumetric attacks.
- **NACL**: Layer 4 (TCP/IP). Cheap, fast, best for DDoS IP floods.
