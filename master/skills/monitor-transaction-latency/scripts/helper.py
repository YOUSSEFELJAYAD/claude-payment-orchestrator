import random
import time

def simulate_latency(psp_name):
    """
    Simulate latency based on PSP profile.
    Returns: duration in seconds.
    """
    base = 0.2
    jitter = random.random() * 0.5
    
    if psp_name == "LegacyBank":
        base = 1.0 # Slower
        
    duration = base + jitter
    
    # Simulate outlier (1% chance)
    if random.random() > 0.99:
        duration += 2.0
        
    return round(duration, 3)

if __name__ == "__main__":
    for _ in range(5):
        print(f"Adyen Latency: {simulate_latency('Adyen')}s")
