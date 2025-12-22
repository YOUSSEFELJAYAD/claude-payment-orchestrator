import random
import uuid
import json

def generate_mock_transactions(count=10):
    """
    Generate mock JSON data for table testing.
    """
    statuses = ["success", "failed", "pending", "refunded"]
    data = []
    
    for _ in range(count):
        data.append({
            "id": str(uuid.uuid4()),
            "amount": round(random.uniform(10.0, 500.0), 2),
            "status": random.choice(statuses),
            "date": "2023-01-01T12:00:00Z",
            "email": "user@example.com"
        })
        
    return json.dumps(data, indent=2)

if __name__ == "__main__":
    print(generate_mock_transactions(5))
