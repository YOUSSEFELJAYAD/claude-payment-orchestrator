# Examples: Segmentation Verification

## Nmap (Outside In)

```bash
nmap -Pn -sS -p 80,443,22,5432 10.0.20.5
# Expected: All Filtered (if targeted directly from unauthorized zone)
```

## Netcat (Egress Check)

```bash
nc -vz google.com 80
# Expected: Connection timed out (if Egress filtering is working)
```
