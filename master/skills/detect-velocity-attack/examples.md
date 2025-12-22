# Examples: Redis Velocity Logic

```python
def check_velocity(redis, ip_address):
    key = f"velocity:ip:{ip_address}"

    # 1. Increment
    current = redis.incr(key)

    # 2. Set Expiry if new
    if current == 1:
        redis.expire(key, 60) # 1 minute window

    # 3. Check Limit
    if current > 10:
        return False, "Too many requests from this IP"

    return True, "OK"
```
