# Examples: Mock Scenarios

## 1. Success

Input amount: `100.00`
Response:

```json
{
  "status": "APPROVED",
  "responseCode": "00",
  "transactionId": "mock_txn_123"
}
```

## 2. Insufficient Funds

Input amount: `100.51`
Response:

```json
{
  "status": "DECLINED",
  "responseCode": "51",
  "message": "Insufficient Funds"
}
```

## 3. 3DS Challenge

Input amount: `100.31`
Response:

```json
{
  "status": "PENDING_AUTHENTICATION",
  "redirectUrl": "http://localhost:3000/mock/3ds"
}
```
