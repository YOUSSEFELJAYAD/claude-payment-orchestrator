# Reference: Payment Adapter Interface

## IPaymentProvider

```typescript
interface IPaymentProvider {
  name: string;
  authorize(req: PaymentRequest): Promise<PaymentResponse>;
  capture(req: CaptureRequest): Promise<PaymentResponse>;
  void(req: VoidRequest): Promise<PaymentResponse>;
  refund(req: RefundRequest): Promise<PaymentResponse>;
}
```

## Standardized Enums

- `TransactionStatus`: PENDING, AUTHORIZED, COMPLETED, DECLINED, FAILED, CANCELLED.
