# Examples: Key Re-wrapping (Python)

```python
import boto3

kms = boto3.client('kms')

def reencrypt_data(ciphertext_blob, new_key_id):
    """
    Decrypt with implicit key (embedded in blob),
    re-encrypt with new specific key.
    """
    # 1. Decrypt (KMS finds the right key version in metadata)
    decrypted = kms.decrypt(CiphertextBlob=ciphertext_blob)
    plaintext = decrypted['Plaintext']

    # 2. Encrypt with NEW key
    new_ciphertext = kms.encrypt(
        KeyId=new_key_id,
        Plaintext=plaintext
    )

    return new_ciphertext['CiphertextBlob']
```
