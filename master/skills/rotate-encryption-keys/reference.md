# Reference: Key Rotation Lifecycle

## AWS KMS

- **Customer Managed Key (CMK)**: Can enable automatic rotation (rotates backing material every 365 days).
- **Key ID**: Stays the same. Backing key changes.
- **Symmetric**: Supported.
- **Asymmetric**: NOT supported for auto-rotation (Manual only).

## HashiCorp Vault

- `vault write -f transit/keys/my-key/rotate`
- supports versioning.
