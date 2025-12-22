from datetime import datetime, timedelta

def check_key_age(creation_date_iso):
    """
    Check if key needs rotation (older than 365 days).
    """
    created = datetime.fromisoformat(creation_date_iso.replace('Z', '+00:00'))
    now = datetime.now(created.tzinfo)
    age = now - created
    
    needs_rotation = age > timedelta(days=365)
    
    return {
        "age_days": age.days,
        "needs_rotation": needs_rotation,
        "deadline": (created + timedelta(days=365)).isoformat()
    }

if __name__ == "__main__":
    # Mock old date
    print(check_key_age("2023-01-01T00:00:00Z"))
