# Reference: PCI VPC Architecture

## Subnets

- **Public**: `10.0.1.0/24`, `10.0.2.0/24` (AZ A/B)
- **Private App**: `10.0.10.0/24`, `10.0.11.0/24`
- **Isolated Data**: `10.0.20.0/24`, `10.0.21.0/24`

## Security Groups

- **WebSG**: Allow HTTP/S (80/443) from 0.0.0.0/0.
- **AppSG**: Allow TCP 8080 from WebSG ONLY.
- **DataSG**: Allow TCP 5432 from AppSG ONLY.

## NACLs

- Stateless boundary protection.
- Deny traffic from known malicious IPs at subnet level.
