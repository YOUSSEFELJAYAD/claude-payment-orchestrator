# Reference: PCI Vault Standards

## Isolation

- The Vault Service should run on separate infrastructure or strictly segmented network.
- Restricted Access: Only specific Services can call `detokenize`.

## Encryption

- **Algorithm**: AES-256 (GCM mode preferred for integrity).
- **Key Management**: Keys must be rotated. Use a Key Management Service (KMS).

## Token Format

- **Reference Token**: Random pointer. Database stateful. Safest.
- **Format Preserving Token (FPE)**: Keeps 16-digit format. Algorithm based. Easier for legacy systems but riskier if key leaked.
- **Choice**: Reference Token (UUID) for greenfield.

## Lifecycle

- **TTL**: Tokens can be permanent (Saved Cards) or ephemeral (One-time auth).
