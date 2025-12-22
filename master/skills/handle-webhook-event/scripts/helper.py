import hmac
import hashlib
import time

def verify_webhook(secret, signature_header, timestamp, raw_body):
    """
    Verify webhook signature and timestamp.
    """
    # 1. Replay Check (5 min window)
    now = int(time.time())
    if abs(now - int(timestamp)) > 300:
        return {"valid": False, "reason": "Timestamp expired (Replay Risk)"}
        
    # 2. Compute Signature (Example: Stripe-like concat)
    payload_to_sign = f"{timestamp}.{raw_body}".encode('utf-8')
    computed_sig = hmac.new(
        secret.encode('utf-8'), 
        payload_to_sign, 
        hashlib.sha256
    ).hexdigest()
    
    # 3. Constant Time Compare
    if hmac.compare_digest(computed_sig, signature_header):
        return {"valid": True}
    
    return {"valid": False, "reason": "Signature Mismatch"}

# Test
if __name__ == "__main__":
    sec = "secret123"
    body = '{"id":"evt_1"}'
    ts = str(int(time.time()))
    # Generate valid sig
    valid_sig = hmac.new(sec.encode(), f"{ts}.{body}".encode(), hashlib.sha256).hexdigest()
    
    print(verify_webhook(sec, valid_sig, ts, body))
    print(verify_webhook(sec, "bad_sig", ts, body))
