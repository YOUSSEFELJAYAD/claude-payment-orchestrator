def evaluate_routing(transaction, rules):
    """
    Evaluate transaction against a list of routing rules.
    Returns list of PSP Config IDs in order of preference.
    """
    eligible_psps = []
    
    # Sort rules by priority (ascending)
    sorted_rules = sorted(rules, key=lambda x: x.get('priority', 999))
    
    for rule in sorted_rules:
        conditions = rule.get('conditions', {})
        match = True
        
        # Check Currency
        if 'currency' in conditions:
            if transaction['currency'] not in conditions['currency']:
                match = False
                
        # Check Min Amount
        if 'min_amount' in conditions and match:
            if float(transaction['amount']) < float(conditions['min_amount']):
                match = False

        # Check BIN (Simplified prefix match)
        if 'bin_prefix' in conditions and match:
            card_bin = transaction['card_bin']
            if not any(card_bin.startswith(p) for p in conditions['bin_prefix']):
                match = False
                
        if match:
            eligible_psps.append(rule['target_psp'])
            # If we only want the FIRST match logic:
            # break 
            # But usually we want to build a failover chain, so we might keep collecting or have a different strategy.
            # Here assuming specific rules imply preference.
            
    # Add a default if nothing matched or to ensure coverage?
    # For now, return matches.
    return eligible_psps

# Test
if __name__ == "__main__":
    tx = {"amount": "1500.00", "currency": "USD", "card_bin": "411111"}
    r = [
        {"priority": 1, "target_psp": "cybersource-01", "conditions": {"min_amount": 1000, "currency": ["USD"]}},
        {"priority": 2, "target_psp": "stripe-01", "conditions": {"currency": ["USD"]}},
        {"priority": 10, "target_psp": "fallback-mpgs", "conditions": {}}
    ]
    print(evaluate_routing(tx, r))
