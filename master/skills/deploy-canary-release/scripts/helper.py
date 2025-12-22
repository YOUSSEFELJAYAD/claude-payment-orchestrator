def generate_traffic_weights(canary_percentage):
    """
    Generate stable vs canary weights.
    """
    if not (0 <= canary_percentage <= 100):
        raise ValueError("Percentage must be 0-100")
        
    stable = 100 - canary_percentage
    return {
        "stable": stable,
        "canary": canary_percentage
    }

if __name__ == "__main__":
    print(generate_traffic_weights(15))
