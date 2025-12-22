# Examples: MPGS Failure Diagnosis

## Scenario 1: Insufficient Funds

**Raw Response**:

```json
{
  "response": {
    "gatewayCode": "DECLINED",
    "acquirerCode": "51",
    "acquirerMessage": "Decline"
  }
}
```

**Diagnosis**:

- Status: `FAILED_RETRYABLE`
- User Message: "Your card has insufficient funds."
- Action: "Ask user to use another card or top up."

## Scenario 2: System Error

**Raw Response**:

```json
{
  "error": {
    "cause": "INVALID_REQUEST",
    "explanation": "Field 'order.currency' is missing"
  },
  "result": "ERROR"
}
```

**Diagnosis**:

- Status: `ERROR_VALIDATION`
- User Message: "Internal processing error."
- Action: "Developer check required: Fix payload construction."
