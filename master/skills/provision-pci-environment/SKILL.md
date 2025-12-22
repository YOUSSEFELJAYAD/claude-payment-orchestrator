# Skill: Provision PCI Environment

**Role:** sequential-reasoner (Cloud Architect)
**Domain:** DevOps & Infrastructure
**Objective:** Architect and provision a strictly segmented Network Environment (VPC) that isolates the Cardholder Data Environment (CDE) from non-compliant systems, meeting PCI DSS requirements.

## Available Capabilities

| Category | Capability | PCI Infrastructure Use Case |
|----------|-----------|----------------------------|
| **MCP Servers** | | |
| Serena | IaC Analysis | Analyze Terraform/Pulumi code, network configs |
| Context7 | Documentation | AWS/GCP/Terraform docs, PCI DSS patterns |
| Playwright | Testing | Test provisioned infrastructure endpoints |
| Chrome | Console Access | Access AWS/GCP consoles, verify configs |
| Episodic Memory | Compliance History | Recall past audit findings, remediation |
| **Superpowers** | | |
| writing-plans | Infrastructure Planning | Design multi-tier network architecture |
| verification-before-completion | Compliance Verification | Verify PCI controls before deployment |
| **Agents** | | |
| security-auditor | PCI Audit | Audit network segmentation, access controls |
| penetration-tester | Penetration Testing | Test network isolation, firewall rules |

## Logic Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PCI ENVIRONMENT PROVISIONING                          │
├─────────────────────────────────────────────────────────────────────────┤
│  1. RESEARCH      → Context7: Get AWS/GCP VPC best practices             │
│  2. COMPLIANCE    → Context7: Get PCI DSS network segmentation reqs      │
│  3. ANALYSIS      → Serena: Review existing infrastructure code          │
│  4. MEMORY        → Episodic: Recall past audit findings                 │
│  5. PLAN          → Writing Plans: Design 3-tier network architecture    │
│  6. PROVISION     → Create VPC, subnets, routing tables                  │
│  7. SEGMENT       → Configure Public/Private/Isolated subnets            │
│  8. SECURE        → Apply NACLs, Security Groups, WAF                    │
│  9. CONNECT       → Setup VPN/Transit Gateway for admin access           │
│  10. TEST         → Penetration Testing: Verify isolation                │
│  11. AUDIT        → Security Audit: PCI compliance verification          │
│  12. VERIFY       → Verification: Confirm all controls in place          │
│  13. DOCUMENT     → Serena Memory: Store architecture decisions          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Workflow Integration

### Phase 1: Research & Compliance

```typescript
// Get AWS VPC networking documentation
const awsVpcDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/aws/aws-cdk",
  topic: "VPC subnet NACL security group",
  mode: "code"
});

// Get Terraform AWS provider docs
const terraformDocs = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/hashicorp/terraform",
  topic: "aws_vpc aws_subnet aws_security_group",
  mode: "code"
});

// Search for PCI DSS network segmentation requirements
// (Would use WebSearch for official PCI SSC documentation)

// Recall past audit findings
const auditFindings = await mcp_episodic_memory.search({
  query: ["PCI audit", "network segmentation", "CDE isolation"],
  mode: "both",
  limit: 10
});

// Find existing infrastructure code
const infraFiles = await mcp_serena.search_for_pattern({
  substring_pattern: "resource \"aws_vpc\"|resource \"aws_subnet\"",
  relative_path: "terraform"
});

// Analyze current VPC configuration
const currentVpc = await mcp_serena.find_symbol({
  name_path_pattern: "vpc_main",
  relative_path: "terraform/vpc.tf",
  include_body: true
});
```

### Phase 2: Architecture Design

```typescript
// Create detailed infrastructure plan
const infraPlan = `
# PCI-Compliant VPC Architecture

## Network Tiers

### Tier 1: Public Subnet (Non-CDE)
- **CIDR:** 10.0.1.0/24
- **Resources:** Application Load Balancer, NAT Gateway, Bastion Host
- **Internet Access:** Yes (via Internet Gateway)
- **Data:** No cardholder data allowed

### Tier 2: Private Subnet (CDE - Application)
- **CIDR:** 10.0.10.0/24
- **Resources:** Payment API, Tokenization Service, 3DS Server
- **Internet Access:** Outbound only (via NAT Gateway)
- **Data:** Tokenized card data, PCI-compliant operations

### Tier 3: Isolated Subnet (CDE - Data)
- **CIDR:** 10.0.20.0/24
- **Resources:** PostgreSQL (card vault), HSM, Encryption Service
- **Internet Access:** None
- **Data:** Encrypted cardholder data at rest

## Security Controls

### Network ACLs (Stateless)
- Public: Allow HTTP/HTTPS inbound, all outbound
- Private: Allow only from Public subnet, specific ports
- Isolated: Deny all except from Private subnet on DB ports

### Security Groups (Stateful)
- ALB: 80/443 from 0.0.0.0/0
- API: 8443 from ALB security group
- DB: 5432 from API security group only
- HSM: 1792 from API security group only

### Access Controls
- VPN Gateway with MFA for administrator access
- Transit Gateway for inter-VPC communication
- AWS Systems Manager Session Manager (no SSH keys)

### Monitoring
- VPC Flow Logs to S3
- GuardDuty for threat detection
- CloudWatch alarms for unusual traffic patterns
`;

await mcp_serena.write_memory({
  memory_file_name: "pci-vpc-architecture.md",
  content: infraPlan
});
```

### Phase 3: Infrastructure Provisioning

```typescript
// Create Terraform configuration
const vpcConfig = `
# PCI-Compliant VPC
resource "aws_vpc" "pci_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "pci-payment-vpc"
    Environment = "production"
    Compliance  = "PCI-DSS"
  }
}

# Internet Gateway (Public subnet connectivity)
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.pci_vpc.id

  tags = {
    Name = "pci-igw"
  }
}

# Public Subnet (Non-CDE)
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.pci_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "pci-public-subnet"
    Tier = "public"
    CDE  = "false"
  }
}

# Private Subnet (CDE - Application)
resource "aws_subnet" "private_app" {
  vpc_id            = aws_vpc.pci_vpc.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "pci-private-app-subnet"
    Tier = "private"
    CDE  = "true"
  }
}

# Isolated Subnet (CDE - Data)
resource "aws_subnet" "isolated_data" {
  vpc_id            = aws_vpc.pci_vpc.id
  cidr_block        = "10.0.20.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "pci-isolated-data-subnet"
    Tier = "isolated"
    CDE  = "true"
  }
}

# NAT Gateway (Private subnet internet access)
resource "aws_eip" "nat" {
  domain = "vpc"
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public.id

  tags = {
    Name = "pci-nat-gateway"
  }
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.pci_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "pci-public-rt"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.pci_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "pci-private-rt"
  }
}

resource "aws_route_table" "isolated" {
  vpc_id = aws_vpc.pci_vpc.id

  # No internet route - completely isolated

  tags = {
    Name = "pci-isolated-rt"
  }
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  subnet_id      = aws_subnet.private_app.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "isolated" {
  subnet_id      = aws_subnet.isolated_data.id
  route_table_id = aws_route_table.isolated.id
}
`;

await mcp_serena.replace_content({
  relative_path: "terraform/vpc.tf",
  needle: "# VPC Configuration",
  repl: vpcConfig,
  mode: "exact"
});

// Apply infrastructure
await mcp_serena.execute_shell_command({
  command: "cd terraform && terraform plan -out=pci-vpc.tfplan"
});

await mcp_serena.execute_shell_command({
  command: "cd terraform && terraform apply pci-vpc.tfplan"
});
```

### Phase 4: Security Controls

```typescript
// Network ACLs (Stateless firewall)
const naclConfig = `
# Public Subnet NACL
resource "aws_network_acl" "public" {
  vpc_id     = aws_vpc.pci_vpc.id
  subnet_ids = [aws_subnet.public.id]

  # Inbound: Allow HTTP/HTTPS
  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 80
    to_port    = 80
  }

  ingress {
    protocol   = "tcp"
    rule_no    = 110
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 443
    to_port    = 443
  }

  # Outbound: Allow all (stateless, need return traffic)
  egress {
    protocol   = "-1"
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  tags = {
    Name = "pci-public-nacl"
  }
}

# Private Subnet NACL
resource "aws_network_acl" "private" {
  vpc_id     = aws_vpc.pci_vpc.id
  subnet_ids = [aws_subnet.private_app.id]

  # Inbound: Only from public subnet on HTTPS
  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = aws_subnet.public.cidr_block
    from_port  = 8443
    to_port    = 8443
  }

  # Outbound: Allow to isolated subnet (database)
  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = aws_subnet.isolated_data.cidr_block
    from_port  = 5432
    to_port    = 5432
  }

  # Outbound: Allow to internet via NAT
  egress {
    protocol   = "-1"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  tags = {
    Name = "pci-private-nacl"
  }
}

# Isolated Subnet NACL
resource "aws_network_acl" "isolated" {
  vpc_id     = aws_vpc.pci_vpc.id
  subnet_ids = [aws_subnet.isolated_data.id]

  # Inbound: Only from private subnet on PostgreSQL port
  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = aws_subnet.private_app.cidr_block
    from_port  = 5432
    to_port    = 5432
  }

  # Outbound: Only to private subnet (response traffic)
  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = aws_subnet.private_app.cidr_block
    from_port  = 1024
    to_port    = 65535
  }

  tags = {
    Name = "pci-isolated-nacl"
  }
}

# Security Groups (Stateful firewall)
resource "aws_security_group" "alb" {
  name        = "pci-alb-sg"
  description = "Security group for Application Load Balancer"
  vpc_id      = aws_vpc.pci_vpc.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS from internet"
  }

  egress {
    from_port       = 8443
    to_port         = 8443
    protocol        = "tcp"
    security_groups = [aws_security_group.api.id]
    description     = "To payment API"
  }

  tags = {
    Name = "pci-alb-sg"
  }
}

resource "aws_security_group" "api" {
  name        = "pci-api-sg"
  description = "Security group for Payment API (CDE)"
  vpc_id      = aws_vpc.pci_vpc.id

  ingress {
    from_port       = 8443
    to_port         = 8443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
    description     = "From ALB"
  }

  egress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.db.id]
    description     = "To PostgreSQL"
  }

  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "To PSPs (Stripe, Adyen, etc.)"
  }

  tags = {
    Name = "pci-api-sg"
    CDE  = "true"
  }
}

resource "aws_security_group" "db" {
  name        = "pci-db-sg"
  description = "Security group for PostgreSQL (CDE)"
  vpc_id      = aws_vpc.pci_vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.api.id]
    description     = "From API only"
  }

  # No egress rules - database should not initiate outbound connections

  tags = {
    Name = "pci-db-sg"
    CDE  = "true"
  }
}
`;

await mcp_serena.replace_content({
  relative_path: "terraform/security.tf",
  needle: "# Security Configuration",
  repl: naclConfig,
  mode: "exact"
});
```

## MCP Integration Examples

### Serena: Infrastructure Code Analysis

```typescript
// Find all VPC-related resources
const vpcResources = await mcp_serena.search_for_pattern({
  substring_pattern: "resource \"aws_vpc\"|resource \"aws_subnet\"|resource \"aws_security_group\"",
  relative_path: "terraform"
});

// Analyze security group rules
const securityGroups = await mcp_serena.find_symbol({
  name_path_pattern: "aws_security_group.*",
  include_body: true,
  depth: 2
});

// Find hardcoded CIDR blocks
const cidrBlocks = await mcp_serena.search_for_pattern({
  substring_pattern: "cidr_block\\s*=\\s*\"\\d+\\.\\d+\\.\\d+\\.\\d+/\\d+\"",
  relative_path: "terraform"
});

// Verify no CDE resources in public subnet
const publicResources = await mcp_serena.search_for_pattern({
  substring_pattern: "subnet_id\\s*=\\s*aws_subnet\\.public",
  relative_path: "terraform"
});

// Document architecture decisions
await mcp_serena.write_memory({
  memory_file_name: "pci-architecture-decisions.md",
  content: `
## PCI VPC Architecture Decisions

### Network Segmentation
- 3-tier architecture: Public, Private (CDE), Isolated (CDE)
- Public subnet: ALB, NAT, Bastion only
- Private subnet: Payment API, Tokenization
- Isolated subnet: Database, HSM (no internet)

### Security Controls
- NACLs for stateless packet filtering
- Security Groups for stateful firewall
- VPN with MFA for administrator access
- VPC Flow Logs enabled

### Compliance
- CDE scope: Private + Isolated subnets only
- No cardholder data in public subnet
- Database encryption at rest (AWS KMS)
- TLS 1.2+ for all communications
  `
});
```

### Context7: Cloud Documentation

```typescript
// AWS VPC documentation
const awsVpc = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/aws/aws-cdk",
  topic: "VPC PrivateSubnet PublicSubnet IsolatedSubnet",
  mode: "code"
});

// Security Group best practices
const awsSecurity = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/aws/aws-cdk",
  topic: "SecurityGroup ingress egress rules",
  mode: "code"
});

// Terraform AWS provider
const terraform = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/hashicorp/terraform",
  topic: "aws_vpc aws_subnet aws_route_table",
  mode: "code"
});

// Pulumi AWS
const pulumi = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/pulumi/pulumi",
  topic: "aws VPC Subnet SecurityGroup",
  mode: "code"
});

// Google Cloud VPC (for GCP deployments)
const gcpVpc = await mcp_context7.get_library_docs({
  context7CompatibleLibraryID: "/googleapis/google-cloud-node",
  topic: "VPC firewall rules subnetwork",
  mode: "code"
});
```

### Chrome: AWS Console Verification

```typescript
// Access AWS VPC console
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/vpc/home?region=us-east-1#vpcs:"
});

// Verify VPC created
const vpcList = await mcp_chrome.use_browser({
  action: "extract",
  selector: "#vpc-grid tbody",
  payload: "text"
});

// Navigate to subnets
await mcp_chrome.use_browser({
  action: "click",
  selector: "a[href*='subnets']"
});

// Verify subnet configuration
const subnets = await mcp_chrome.use_browser({
  action: "extract",
  selector: "#subnet-grid tbody",
  payload: "markdown"
});

// Check security groups
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/vpc/home?region=us-east-1#SecurityGroups:"
});

const securityGroups = await mcp_chrome.use_browser({
  action: "extract",
  selector: "#securityGroup-grid tbody",
  payload: "markdown"
});

// Screenshot current state
await mcp_chrome.use_browser({
  action: "screenshot",
  payload: "tmp/aws-vpc-configuration.png"
});

// Verify VPC Flow Logs enabled
await mcp_chrome.use_browser({
  action: "navigate",
  payload: "https://console.aws.amazon.com/vpc/home?region=us-east-1#FlowLogs:"
});

const flowLogs = await mcp_chrome.use_browser({
  action: "extract",
  selector: ".flow-logs-table",
  payload: "text"
});
```

### Playwright: Infrastructure Testing

```typescript
// Test public endpoint accessibility
await mcp_playwright.browser_navigate({
  url: "https://api.payment.example.com/health"
});

const healthCheck = await mcp_playwright.browser_evaluate({
  function: "() => JSON.parse(document.body.textContent)"
});

// Verify TLS configuration
const tlsInfo = await mcp_playwright.browser_run_code({
  code: `async (page) => {
    const response = await page.request.get('https://api.payment.example.com/health');
    const securityDetails = await response.securityDetails();
    return {
      protocol: securityDetails.protocol(),
      issuer: securityDetails.issuer(),
      validFrom: securityDetails.validFrom(),
      validTo: securityDetails.validTo()
    };
  }`
});

console.log("TLS Configuration:", tlsInfo);

// Test that database is NOT accessible from internet
try {
  await mcp_playwright.browser_navigate({
    url: "http://10.0.20.10:5432"  // Isolated subnet IP
  });
  console.log("❌ ERROR: Database accessible from internet!");
} catch (error) {
  console.log("✅ Database correctly isolated");
}

// Test VPN access (would require VPN connection)
// This would typically be run from a machine connected to the VPN
```

### Episodic Memory: Audit History

```typescript
// Recall past PCI audit findings
const auditHistory = await mcp_episodic_memory.search({
  query: ["PCI audit findings", "network segmentation", "remediation"],
  mode: "both",
  limit: 10,
  after: "2024-01-01"
});

// Find compliance violations
const violations = await mcp_episodic_memory.search({
  query: "PCI DSS violation CDE scope",
  mode: "text",
  limit: 5
});

// Recall remediation patterns
const remediations = await mcp_episodic_memory.search({
  query: ["security group misconfiguration fix", "NACL rule correction"],
  mode: "both"
});

// Learn from past incidents
const incidents = await mcp_episodic_memory.search({
  query: "CDE data leak network misconfiguration",
  mode: "both"
});
```

## Agent Dispatch Patterns

### Security Audit

```json
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "pci_compliance_audit",
  "target_agent": "security-auditor",
  "payload": {
    "scope": "network_infrastructure",
    "vpc_id": "vpc-12345",
    "checks": [
      "CDE segmentation verification",
      "Security group rule validation",
      "NACL configuration review",
      "VPC Flow Logs enabled",
      "No public IPs in CDE",
      "Encryption in transit (TLS 1.2+)",
      "Admin access via VPN only"
    ]
  }
}
```

### Penetration Testing

```json
{
  "requesting_agent": "sequential-reasoner",
  "request_type": "network_penetration_test",
  "target_agent": "penetration-tester",
  "payload": {
    "targets": [
      "Public subnet ALB",
      "Private subnet API (via ALB)",
      "Database isolation verification"
    ],
    "tests": [
      "Port scanning",
      "Firewall rule bypass attempts",
      "SQL injection from internet",
      "Direct database access attempts",
      "VPN authentication bypass"
    ],
    "expected_results": {
      "alb_accessible": true,
      "api_via_alb": true,
      "api_direct": false,
      "database_accessible": false
    }
  }
}
```

## PCI DSS Requirements Mapping

### Requirement 1: Firewall Configuration

| Control | Implementation |
|---------|----------------|
| 1.1.6 | Network diagram documented in Serena memory |
| 1.2.1 | Inbound/outbound traffic restricted to necessary |
| 1.2.3 | No direct access to CDE from internet |
| 1.3.1 | DMZ (public subnet) separates CDE |
| 1.3.2 | Inbound internet traffic limited to DMZ |

### Requirement 2: Secure Configuration

| Control | Implementation |
|---------|----------------|
| 2.2.2 | Only necessary services enabled |
| 2.2.3 | Implement additional security features |
| 2.2.4 | Configure security parameters |

### Monitoring & Logging

```typescript
// Enable VPC Flow Logs
const flowLogs = `
resource "aws_flow_log" "pci_vpc" {
  vpc_id          = aws_vpc.pci_vpc.id
  traffic_type    = "ALL"
  iam_role_arn    = aws_iam_role.flow_logs.arn
  log_destination = aws_s3_bucket.flow_logs.arn

  tags = {
    Name = "pci-vpc-flow-logs"
  }
}

resource "aws_s3_bucket" "flow_logs" {
  bucket = "pci-vpc-flow-logs-${data.aws_caller_identity.current.account_id}"

  lifecycle_rule {
    enabled = true

    transition {
      days          = 30
      storage_class = "GLACIER"
    }

    expiration {
      days = 365
    }
  }

  tags = {
    Name = "pci-flow-logs"
  }
}
`;

// Enable GuardDuty
const guardDuty = `
resource "aws_guardduty_detector" "pci" {
  enable = true

  finding_publishing_frequency = "FIFTEEN_MINUTES"

  datasources {
    s3_logs {
      enable = true
    }
  }

  tags = {
    Name = "pci-guardduty"
  }
}
`;

// CloudWatch alarms
const alarms = `
resource "aws_cloudwatch_metric_alarm" "unusual_traffic" {
  alarm_name          = "pci-unusual-traffic-pattern"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "BytesIn"
  namespace           = "AWS/VPC"
  period              = "300"
  statistic           = "Sum"
  threshold           = "1000000000"  # 1GB
  alarm_description   = "Unusual traffic pattern detected"
  alarm_actions       = [aws_sns_topic.pci_alerts.arn]

  dimensions = {
    VpcId = aws_vpc.pci_vpc.id
  }
}
`;
```

## Best Practices

### Scope Reduction

**Minimize CDE:**
- Only systems that store, process, or transmit CHD are in CDE
- Tokenization reduces scope significantly
- Public subnet has ZERO cardholder data

**Network Segmentation:**
```
Internet → [Public Subnet] → [Private Subnet CDE] → [Isolated Subnet CDE]
           ↑               ↑                        ↑
           ALB only        Payment API only         Database only
           No CHD          Tokenized CHD            Encrypted CHD
```

### Deny All Default

Security Groups default to deny all:

```hcl
# WRONG: Allow all, then restrict
egress {
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
}

# CORRECT: No default egress, explicitly allow needed
# (Omit egress block, then add specific rules)
```

### Connectivity Patterns

**Administrator Access:**
- VPN with MFA required
- Bastion host in public subnet (non-CDE)
- Systems Manager Session Manager (no SSH keys)

```hcl
resource "aws_vpn_gateway" "pci" {
  vpc_id = aws_vpc.pci_vpc.id

  tags = {
    Name = "pci-vpn-gateway"
  }
}

resource "aws_customer_gateway" "office" {
  bgp_asn    = 65000
  ip_address = "203.0.113.1"  # Office public IP
  type       = "ipsec.1"

  tags = {
    Name = "office-vpn"
  }
}
```

### Multi-AZ Deployment

```hcl
# Create subnets in multiple AZs
resource "aws_subnet" "private_app_az1" {
  vpc_id            = aws_vpc.pci_vpc.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "private_app_az2" {
  vpc_id            = aws_vpc.pci_vpc.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "us-east-1b"
}

resource "aws_subnet" "isolated_data_az1" {
  vpc_id            = aws_vpc.pci_vpc.id
  cidr_block        = "10.0.20.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "isolated_data_az2" {
  vpc_id            = aws_vpc.pci_vpc.id
  cidr_block        = "10.0.21.0/24"
  availability_zone = "us-east-1b"
}
```

### Documentation Requirements

Store all architecture decisions:

```typescript
await mcp_serena.write_memory({
  memory_file_name: "pci-network-diagram.md",
  content: `
# PCI Network Architecture

## Network Diagram
\`\`\`
Internet
  │
  ├─[Internet Gateway]
  │
┌─▼────────────────────────────────────────┐
│ Public Subnet (10.0.1.0/24)             │
│ - Application Load Balancer              │
│ - NAT Gateway                             │
│ - Bastion Host (VPN access only)         │
│ CDE: NO                                   │
└─┬────────────────────────────────────────┘
  │
┌─▼────────────────────────────────────────┐
│ Private Subnet (10.0.10.0/24)           │
│ - Payment API                             │
│ - Tokenization Service                    │
│ - 3DS Server                              │
│ CDE: YES (Application Layer)             │
└─┬────────────────────────────────────────┘
  │
┌─▼────────────────────────────────────────┐
│ Isolated Subnet (10.0.20.0/24)          │
│ - PostgreSQL (encrypted CHD)             │
│ - HSM                                     │
│ - No internet access                      │
│ CDE: YES (Data Layer)                    │
└──────────────────────────────────────────┘
\`\`\`

## Firewall Rules Summary
- Public → Private: HTTPS (8443) only
- Private → Isolated: PostgreSQL (5432) only
- Isolated → Internet: DENIED
- Internet → Isolated: DENIED
  `
});
```

### Verification Checklist

```typescript
const verificationChecklist = [
  "✅ VPC created with correct CIDR",
  "✅ 3 subnets: Public, Private, Isolated",
  "✅ Internet Gateway attached to public subnet",
  "✅ NAT Gateway in public subnet",
  "✅ Route tables configured correctly",
  "✅ NACLs deny all by default, then allow specific",
  "✅ Security Groups deny all by default",
  "✅ No public IPs in CDE subnets",
  "✅ VPC Flow Logs enabled",
  "✅ GuardDuty enabled",
  "✅ VPN Gateway configured with MFA",
  "✅ CloudWatch alarms for unusual traffic",
  "✅ Database in isolated subnet (no internet)",
  "✅ All communications TLS 1.2+",
  "✅ Architecture documented in Serena memory"
];

// Store checklist
await mcp_serena.write_memory({
  memory_file_name: "pci-deployment-checklist.md",
  content: verificationChecklist.join("\n")
});
```
