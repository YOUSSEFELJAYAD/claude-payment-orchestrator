import hmac
import hashlib
import base64
from datetime import datetime

def generate_cybersource_signature(merchant_id, key_id, secret_key, host, resource, payload):
    """
    Generate HTTP Signature for Cybersource REST API.
    """
    date = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')
    target = f"post {resource}"
    digest = base64.b64encode(hashlib.sha256(payload.encode('utf-8')).digest()).decode('utf-8')
    
    sig_string = f"host: {host}\ndate: {date}\n(request-target): {target}\ndigest: SHA-256={digest}\nv-c-merchant-id: {merchant_id}"
    
    signature = base64.b64encode(hmac.new(
        base64.b64decode(secret_key), 
        sig_string.encode('utf-8'), 
        hashlib.sha256
    ).digest()).decode('utf-8')
    
    auth_header = f'keyid="{key_id}", algorithm="HmacSHA256", headers="host date (request-target) digest v-c-merchant-id", signature="{signature}"'
    
    return {
        "Date": date,
        "Digest": f"SHA-256={digest}",
        "v-c-merchant-id": merchant_id,
        "Signature": auth_header
    }

if __name__ == "__main__":
    print(generate_cybersource_signature("mid", "kid", "c2VjcmV0", "apitest.cybersource.com", "/pts/v2/payments", "{}"))
