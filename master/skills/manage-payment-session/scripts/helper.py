import secrets
import time

# Mock Redis
redis_mock = {}

def create_payment_session(order_id, amount, ttl_seconds=900):
    """
    Generate Opaque Token and store with TTL.
    """
    token = secrets.token_urlsafe(32)
    expiry = time.time() + ttl_seconds
    
    session_data = {
        "order_id": order_id,
        "amount": amount,
        "exp": expiry
    }
    
    # Store
    redis_mock[token] = session_data
    return token

def validate_session(token):
    """
    Check availability and expiration.
    """
    data = redis_mock.get(token)
    if not data:
        return {"valid": False, "reason": "Not Found"}
        
    if time.time() > data['exp']:
        del redis_mock[token] # Lazy cleanup
        return {"valid": False, "reason": "Expired"}
        
    return {"valid": True, "data": data}

# Test
if __name__ == "__main__":
    t = create_payment_session("ORD-1", "50.00")
    print(f"Token: {t}")
    print(validate_session(t))
