# Examples: 3DS Payload generation

## Scenario 1: Standard Browser Checkout (Frictionless Goal)

### Input

- Amount: 100.00 USD
- Card: 512345...0008 (Mastercard)
- Browser: Chrome Desktop

### Output JSON

```json
{
  "apiOperation": "INITIATE_AUTHENTICATION",
  "order": {
    "amount": "100.00",
    "currency": "USD",
    "reference": "ORDER-12345"
  },
  "sourceOfFunds": {
    "provided": {
      "card": {
        "number": "5123450000000008",
        "expiry": {
          "month": "12",
          "year": "25"
        }
      }
    },
    "type": "CARD"
  },
  "authentication": {
    "channel": "PAYER_BROWSER",
    "purpose": "PAYMENT_TRANSACTION",
    "redirectResponseUrl": "https://mysite.com/api/3ds/callback"
  },
  "device": {
    "browser": {
      "userAgent": "Mozilla/5.0 ...",
      "acceptHeaders": "text/html,application/xhtml+xml...",
      "language": "en-US",
      "colorDepth": 24,
      "screenHeight": 1080,
      "screenWidth": 1920,
      "timeZone": -60,
      "javaEnabled": false
    }
  }
}
```
