---
name: integrate-stripe-full
description: Complete Stripe integration guide covering all payment methods and features
activation: Use when integrating Stripe or implementing any Stripe feature
---

# Integrate Stripe Full

**Role:** Stripe Integration Specialist
**Domain:** Payment Processing, Stripe Platform
**Objective:** Implement comprehensive Stripe payment integration

## Quick Start (TL;DR)

**Use when:** Any Stripe integration
**Key steps:** 1. Setup Payment Intent  2. Collect payment  3. Handle webhooks
**Output:** Full-featured Stripe integration

## Payment Element (Recommended)

### Backend - Create Payment Intent

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(
  amount: number,
  currency: string,
  customerId?: string,
  metadata?: Record<string, string>
): Promise<{ clientSecret: string; paymentIntentId: string }> {
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // In cents
    currency,
    customer: customerId,
    metadata,
    automatic_payment_methods: {
      enabled: true, // Enable all eligible payment methods
    },
    // For subscriptions, save the payment method
    setup_future_usage: 'off_session',
  });

  return {
    clientSecret: paymentIntent.client_secret!,
    paymentIntentId: paymentIntent.id,
  };
}
```

### Frontend - Payment Element

```typescript
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Wrapper component
function CheckoutPage({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0066cc',
          },
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}

// Payment form
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'An error occurred');
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/complete`,
      },
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <div className="error">{error}</div>}
      <button disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
}
```

## Checkout Sessions (Hosted Page)

```typescript
// Create Checkout Session
async function createCheckoutSession(
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  customerId?: string
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment', // or 'subscription'
    customer: customerId,
    line_items: lineItems,
    success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/cancel`,
    // Collect shipping address
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB'],
    },
    // Enable promotions
    allow_promotion_codes: true,
    // Collect phone
    phone_number_collection: { enabled: true },
  });

  return session.url!;
}

// Example line items
const lineItems = [
  {
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Product Name',
        images: ['https://example.com/image.jpg'],
      },
      unit_amount: 2000, // $20.00
    },
    quantity: 1,
  },
];
```

## Subscriptions

```typescript
// Create subscription
async function createSubscription(
  customerId: string,
  priceId: string,
  paymentMethodId?: string
): Promise<Stripe.Subscription> {
  // Attach payment method if provided
  if (paymentMethodId) {
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
  }

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: {
      save_default_payment_method: 'on_subscription',
    },
    expand: ['latest_invoice.payment_intent'],
  });

  return subscription;
}

// Update subscription
async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  return stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'create_prorations',
  });
}

// Cancel subscription
async function cancelSubscription(
  subscriptionId: string,
  immediately: boolean = false
): Promise<Stripe.Subscription> {
  if (immediately) {
    return stripe.subscriptions.cancel(subscriptionId);
  }

  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}
```

## Connect (Marketplace)

```typescript
// Create connected account
async function createConnectedAccount(
  email: string,
  country: string
): Promise<Stripe.Account> {
  return stripe.accounts.create({
    type: 'express', // or 'standard', 'custom'
    email,
    country,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
}

// Create account onboarding link
async function createAccountLink(accountId: string): Promise<string> {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.APP_URL}/reauth`,
    return_url: `${process.env.APP_URL}/return`,
    type: 'account_onboarding',
  });

  return accountLink.url;
}

// Create payment with application fee
async function createConnectPayment(
  amount: number,
  connectedAccountId: string,
  applicationFeeAmount: number
): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    application_fee_amount: applicationFeeAmount,
    transfer_data: {
      destination: connectedAccountId,
    },
  });
}

// Transfer to connected account
async function transferToAccount(
  amount: number,
  connectedAccountId: string
): Promise<Stripe.Transfer> {
  return stripe.transfers.create({
    amount,
    currency: 'usd',
    destination: connectedAccountId,
  });
}
```

## Webhook Handling

```typescript
import { buffer } from 'micro';

export const config = {
  api: { bodyParser: false },
};

async function handleStripeWebhook(req: NextApiRequest, res: NextApiResponse) {
  const buf = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed');
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handlePaymentSuccess(paymentIntent);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      await handlePaymentFailure(failedPayment);
      break;

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription;
      await syncSubscription(subscription);
      break;

    case 'customer.subscription.deleted':
      const canceledSub = event.data.object as Stripe.Subscription;
      await handleSubscriptionCanceled(canceledSub);
      break;

    case 'invoice.paid':
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaid(invoice);
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaymentFailed(failedInvoice);
      break;

    case 'charge.dispute.created':
      const dispute = event.data.object as Stripe.Dispute;
      await handleDispute(dispute);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
}
```

## Refunds

```typescript
async function createRefund(
  paymentIntentId: string,
  amount?: number,
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
): Promise<Stripe.Refund> {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount, // Partial refund if specified, full if omitted
    reason,
  });
}
```

## Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0025 0000 3155 | Requires 3DS authentication |
| 4000 0000 0000 9995 | Insufficient funds decline |
| 4000 0000 0000 0002 | Generic decline |
| 4000 0000 0000 3220 | 3DS2 required |

## Related Skills

**This skill uses:**
- `render-3ds-challenge` - 3DS handling
- `handle-webhook-event` - Webhook processing

**This skill is used by:**
- `payment-orchestration` - Multi-PSP routing

## Best Practices

- Use Payment Intents API, not Charges
- Always handle webhooks for async events
- Implement idempotency keys
- Use Stripe CLI for local webhook testing
- Handle SCA/3DS for European cards
- Store Stripe customer IDs for returning customers
