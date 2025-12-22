def get_routing_explanation(strategy, savings=None):
    """
    Generate human-readable explanation for routing.
    """
    if strategy == "COST_OPTIMIZATION":
        msg = "Routed to minimize transaction fees."
        if savings:
            msg += f" Estimated savings: {savings}."
        return msg
        
    if strategy == "FAILOVER":
        return "Primary gateway failed. Rerouted to backup to ensure success."
        
    return "Standard routing applied."

if __name__ == "__main__":
    print(get_routing_explanation("COST_OPTIMIZATION", "$0.30"))
