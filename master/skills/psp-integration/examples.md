# Examples: Stripe Adapter

```typescript
class StripeProvider implements IPaymentProvider {
  name = "Stripe";

  async authorize(req: PaymentRequest): Promise<PaymentResponse> {
    try {
      const intent = await stripe.paymentIntents.create({
        amount: req.amount,
        currency: req.currency,
        capture_method: "manual",
      });
      return this.mapResponse(intent);
    } catch (err) {
      throw this.mapError(err);
    }
  }
}
```
