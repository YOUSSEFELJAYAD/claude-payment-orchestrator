from decimal import Decimal, ROUND_HALF_UP

def calculate_fees(amount_cents, model_config):
    """
    Calculate fees based on model. Amount in cents.
    """
    amount = Decimal(amount_cents)
    
    if model_config['type'] == 'BLENDED':
        variable = Decimal(model_config['percent']) / 100
        fixed = Decimal(model_config['fixed_cents'])
        
        fee = (amount * variable) + fixed
        
    elif model_config['type'] == 'IC_PLUS':
        # Simple simulation of sum(components)
        ic = Decimal(model_config['interchange_percent']) / 100
        scheme = Decimal(model_config['scheme_percent']) / 100
        markup = Decimal(model_config['markup_percent']) / 100
        
        total_rate = ic + scheme + markup
        fee = amount * total_rate
        # + Fixed? Usually markup has fixed.
        if 'markup_fixed' in model_config:
             fee += Decimal(model_config['markup_fixed'])

    # Rounding
    total_fee = fee.quantize(Decimal('1'), rounding=ROUND_HALF_UP)
    net = amount - total_fee
    
    return {
        "gross": int(amount),
        "fee": int(total_fee),
        "net": int(net)
    }

# Test
if __name__ == "__main__":
    # $100.00, Blended 2.9% + 30c
    conf = {"type": "BLENDED", "percent": "2.9", "fixed_cents": "30"}
    print(calculate_fees(10000, conf)) 
