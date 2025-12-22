# Examples: IAM Policy Check (Terraform)

```hcl
# GOOD
resource "aws_iam_policy" "example" {
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = ["s3:GetObject"]
        Effect = "Allow"
        Resource = "arn:aws:s3:::my-bucket/*"
      }
    ]
  })
}

# BAD (Violation)
# Action = "*"
# Resource = "*"
```
