import json

def generate_3ds_payload(transaction_id, amount, currency, card_data, merchant_config, browser_info=None):
    """
    Generates a compliant MPGS 3DS 2.0 Initiate Authentication payload.
    """
    
    payload = {
        "apiOperation": "INITIATE_AUTHENTICATION",
        "order": {
            "amount": str(amount),
            "currency": currency,
            "reference": transaction_id
        },
        "sourceOfFunds": {
            "provided": {
                "card": {
                    "number": card_data['pan'],
                    "expiry": {
                        "month": card_data['expiry_month'],
                        "year": card_data['expiry_year'][-2:] # Ensure 2 digit
                    }
                }
            },
            "type": "CARD"
        },
        "authentication": {
            "channel": "PAYER_BROWSER", # Default to browser for now
            "purpose": "PAYMENT_TRANSACTION",
            "redirectResponseUrl": merchant_config['response_url']
        }
    }

    # Add browser info if available (High importance for 2.0)
    if browser_info:
        payload["device"] = {
            "browser": {
                "userAgent": browser_info.get('user_agent', ''),
                "acceptHeaders": browser_info.get('accept_header', '*/*'),
                "language": browser_info.get('language', 'en'),
                "colorDepth": browser_info.get('color_depth', 24),
                "screenHeight": browser_info.get('screen_height', 1080),
                "screenWidth": browser_info.get('screen_width', 1920),
                "timeZone": browser_info.get('timezone_offset', 0),
                "javaEnabled": browser_info.get('java_enabled', False)
            }
        }
        
    return json.dumps(payload, indent=2)

# Self-test
if __name__ == "__main__":
    t_card = {"pan": "5123456789012345", "expiry_month": "12", "expiry_year": "2025"}
    t_config = {"response_url": "https://example.com/callback"}
    t_browser = {
        "user_agent": "Mozilla/5.0 Test", 
        "language": "en-US", 
        "screen_height": 1080, 
        "screen_width": 1920
    }
    print(generate_3ds_payload("TXN-123", "100.00", "USD", t_card, t_config, t_browser))
