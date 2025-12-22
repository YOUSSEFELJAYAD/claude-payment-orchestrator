def decide_refund_action(tx_status, captured_amount, refunded_amount, request_amount):
    """
    Decide whether to Void or Refund and validate limits.
    """
    if tx_status == "AUTHORIZED":
        # Usually can only void full amount
        if request_amount != captured_amount: # Assuming authorized amount = captured_amount placeholder
             return {"action": "VOID", "warning": "Partial void might not be supported"}
        return {"action": "VOID", "valid": True}
        
    if tx_status in ["CAPTURED", "SETTLED"]:
        remaining = float(captured_amount) - float(refunded_amount)
        if float(request_amount) > remaining:
            return {
                "action": "REFUND", 
                "valid": False, 
                "error": f"Exceeds remaining amount ({remaining})"
            }
        return {"action": "REFUND", "valid": True}
        
    return {"action": "NONE", "valid": False, "error": "Invalid state for refund"}

# Test
if __name__ == "__main__":
    print(decide_refund_action("CAPTURED", 100, 20, 50)) # Refund 50, 80 remaining. OK.
    print(decide_refund_action("AUTHORIZED", 100, 0, 100)) # Void. OK.
