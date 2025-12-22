import time

def mock_gateway_response(amount):
    """
    Return mapped response based on penny value of amount.
    """
    cents = int(float(amount) * 100) % 100
    
    # Latency simulation
    time.sleep(0.5) 
    
    if cents == 0:
        return {"result": "APPROVED", "code": "00"}
    elif cents == 51:
        return {"result": "DECLINED", "code": "51", "msg": "Insufficient Funds"}
    elif cents == 5:
        return {"result": "DECLINED", "code": "05", "msg": "Do Not Honor"}
    elif cents == 31:
        return {"result": "3DS_REQUIRED", "url": "http://mock/challenge"}
    elif cents == 99:
        time.sleep(5) # Simulate timeout
        return {"result": "ERROR", "code": "TIMEOUT"}
        
    # Default to Success
    return {"result": "APPROVED", "code": "00"}

# Test
if __name__ == "__main__":
    print(mock_gateway_response("12.51"))
