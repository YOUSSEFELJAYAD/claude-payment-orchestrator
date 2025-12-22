import time

class MockRedis:
    def __init__(self):
        self.data = {}
        
    def incr(self, key):
        self.data[key] = self.data.get(key, 0) + 1
        return self.data[key]
        
    def expire(self, key, seconds):
        pass # Mock

def simulate_attack(count=20):
    redis = MockRedis()
    ip = "192.168.1.50"
    
    blocked_at = None
    
    for i in range(count):
        count = redis.incr(f"velocity:{ip}")
        if count > 10:
            if not blocked_at:
                blocked_at = i + 1
            print(f"Request {i+1}: BLOCKED")
        else:
            print(f"Request {i+1}: Allowed")
            
    return blocked_at

if __name__ == "__main__":
    simulate_attack()
