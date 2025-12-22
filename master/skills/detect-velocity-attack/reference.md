# Reference: Velocity Metrics

## Key Dimensions

- **By IP Address**: Detects single source attacks (Botnet node).
- **By Device Fingerprint**: Detects sophisticated bots rotating IPs.
- **By BIN (Bank ID Number)**: Detects attacks targeting specific issuing banks.
- **By Amount**: Detects "Testing" (small amounts like $1.00 or $0.00).

## Thresholds (Example)

- **High Risk**: > 10 txns/min per IP.
- **Medium Risk**: > 5 txns/min per IP.
