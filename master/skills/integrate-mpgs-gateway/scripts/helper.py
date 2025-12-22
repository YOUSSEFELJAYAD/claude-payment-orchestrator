import requests
from requests.auth import HTTPBasicAuth

def execute_mpgs_transaction(gateway_url, merchant_id, api_password, order_id, txn_id, payload):
    """
    Execute MPGS Transaction.
    """
    url = f"{gateway_url}/merchant/{merchant_id}/order/{order_id}/transaction/{txn_id}"
    user = f"merchant.{merchant_id}"
    
    response = requests.put(
        url, 
        json=payload, 
        auth=HTTPBasicAuth(user, api_password)
    )
    
    return response.json()

if __name__ == "__main__":
    print("MPGS Helper Ready")
