def normalize_status(psp_name, raw_status):
    """
    Normalize PSP status to Platform Enum.
    """
    raw = raw_status.upper()
    
    # MPGS Maps
    if psp_name == "MPGS":
        if raw == "APPROVED": return "AUTHORIZED"
        if raw == "DECLINED": return "DECLINED"
        if raw == "CAPTURED": return "CAPTURED"
        
    # Stripe Maps
    if psp_name == "STRIPE":
        if raw == "SUCCEEDED": return "CAPTURED" # Simple assumption
        if raw == "REQUIRES_ACTION": return "PENDING"
        
    # Fallback
    return "UNKNOWN"

# Test
if __name__ == "__main__":
    print(normalize_status("MPGS", "Approved"))
