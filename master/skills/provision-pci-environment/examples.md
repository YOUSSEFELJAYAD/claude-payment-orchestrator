# Examples: Terraform VPC

## Terraform Snippet

```hcl
resource "aws_vpc" "pci_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "PCI-CDE"
    Compliance = "PCI-DSS"
  }
}

resource "aws_subnet" "isolated_data" {
  vpc_id = aws_vpc.pci_vpc.id
  cidr_block = "10.0.20.0/24"
  availability_zone = "us-east-1a"

  # No MapPublicIpOnLaunch
}
```
