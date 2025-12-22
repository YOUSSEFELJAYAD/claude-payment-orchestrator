import uuid
import base64

# Mock Vault DB
vault_db = {}

def tokenize(pan):
    """
    Simulate Vault Tokenization.
    In real life: Encrypt PAN with AES-256.
    """
    # 1. Generate Token ID
    token_id = f"tok_{uuid.uuid4().hex[:16]}"
    
    # 2. "Encrypt" (Mock)
    encrypted_blob = base64.b64encode(pan.encode()).decode() 
    
    # 3. Store
    vault_db[token_id] = encrypted_blob
    
    # 4. Return safe view
    return {
        "token": token_id,
        "last4": pan[-4:],
        "bin": pan[:6]
    }

def detokenize(token_id):
    """
    Simulate Detokenize.
    """
    blob = vault_db.get(token_id)
    if not blob:
        return None
    return base64.b64decode(blob).decode()

# Test
if __name__ == "__main__":
    res = tokenize("4111111111111111")
    print(res)
    print(f"Detokenized: {detokenize(res['token'])}")
