def diagnose_mpgs(response):
    """
    Diagnose MPGS response JSON.
    """
    gateway_code = response.get('response', {}).get('gatewayCode')
    if not gateway_code and 'error' in response:
        return {
            "status": "SYSTEM_ERROR",
            "message": response['error'].get('explanation', "Unknown Error"),
            "action": "Investigate Request Format"
        }

    if gateway_code == "APPROVED":
        return {"status": "SUCCESS", "message": "Transaction Approved", "action": "None"}

    if gateway_code == "DECLINED":
        acq_code = response.get('response', {}).get('acquirerCode')
        
        # Map ISO codes
        if acq_code == "51":
            return {"status": "FAILED_FUNDS", "message": "Insufficient Funds", "action": "Retry with different card"}
        elif acq_code == "05":
            return {"status": "FAILED_GENERIC", "message": "Do Not Honor (Generic Decline)", "action": "Retry or contact bank"}
        elif acq_code == "54":
            return {"status": "FAILED_EXPIRED", "message": "Card Expired", "action": "Update exp date"}
        else:
            return {"status": "FAILED_DECLINE", "message": f"Declined by bank (Code {acq_code})", "action": "Contact Issuer"}

    return {"status": "UNKNOWN", "message": "Unknown State", "action": "Manual Review"}

# Test
if __name__ == "__main__":
    r = {"response": {"gatewayCode": "DECLINED", "acquirerCode": "51"}}
    print(diagnose_mpgs(r))
