# Examples: Terraform NACL

```hcl
resource "aws_network_acl_rule" "block_bad_ip" {
  network_acl_id = aws_network_acl.main.id
  rule_number    = 10
  egress         = false
  protocol       = "-1"
  rule_action    = "deny"
  cidr_block     = "203.0.113.5/32"
}
```

# Examples: Linux Command

```bash
sudo route add -host 203.0.113.5 reject
```
