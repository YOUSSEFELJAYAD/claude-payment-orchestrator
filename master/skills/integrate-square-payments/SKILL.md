---
name: integrate-square-payments
description: Complete guide for integrating Square payment platform
activation: Use when integrating Square payments or implementing Square features
---

# Integrate Square Payments

**Role:** Square Integration Specialist
**Domain:** Payment Processing, Square Platform
**Objective:** Implement secure Square payment integration

## Quick Start (TL;DR)

**Use when:** Integrating Square payments
**Key steps:** 1. Setup SDK  2. Create payment form  3. Process via API
**Output:** Working Square payment integration

## Web Payments SDK Setup

### Install Dependencies

```bash
npm install square
```

### Frontend Setup

```html
<!-- Include Square Web Payments SDK -->
<script src="https://sandbox.web.squarecdn.com/v1/square.js"></script>

<div id="card-container"></div>
<button id="pay-button" type="button">Pay</button>
```

```typescript
// Initialize Square
async function initializeSquare() {
  if (!window.Square) {
    throw new Error('Square SDK not loaded');
  }

  const payments = window.Square.payments(
    process.env.NEXT_PUBLIC_SQUARE_APP_ID,
    process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
  );

  // Initialize card payment method
  const card = await payments.card();
  await card.attach('#card-container');

  // Handle payment
  document.getElementById('pay-button').addEventListener('click', async () => {
    const result = await card.tokenize();

    if (result.status === 'OK') {
      await processPayment(result.token);
    } else {
      console.error('Tokenization failed:', result.errors);
    }
  });

  return { payments, card };
}

// Add Apple Pay
async function initializeApplePay(payments: Payments, amount: number) {
  const paymentRequest = payments.paymentRequest({
    countryCode: 'US',
    currencyCode: 'USD',
    total: {
      amount: amount.toString(),
      label: 'Total',
    },
  });

  const applePay = await payments.applePay(paymentRequest);

  if (applePay) {
    document.getElementById('apple-pay-button').addEventListener('click', async () => {
      const result = await applePay.tokenize();
      if (result.status === 'OK') {
        await processPayment(result.token);
      }
    });
  }
}

// Add Google Pay
async function initializeGooglePay(payments: Payments, amount: number) {
  const paymentRequest = payments.paymentRequest({
    countryCode: 'US',
    currencyCode: 'USD',
    total: {
      amount: amount.toString(),
      label: 'Total',
    },
  });

  const googlePay = await payments.googlePay(paymentRequest);
  await googlePay.attach('#google-pay-button');

  document.getElementById('google-pay-button').addEventListener('click', async () => {
    const result = await googlePay.tokenize();
    if (result.status === 'OK') {
      await processPayment(result.token);
    }
  });
}
```

## Backend Processing

```typescript
import { Client, Environment, ApiError } from 'square';
import { randomUUID } from 'crypto';

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // or Environment.Production
});

const { paymentsApi, customersApi, cardsApi } = client;

// Process payment
async function processPayment(
  sourceId: string,
  amount: number,
  currency: string = 'USD',
  customerId?: string
): Promise<PaymentResult> {
  try {
    const response = await paymentsApi.createPayment({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount), // Amount in cents
        currency,
      },
      customerId,
      locationId: process.env.SQUARE_LOCATION_ID,
      autocomplete: true, // Auto-capture
      note: 'Online payment',
    });

    return {
      success: true,
      paymentId: response.result.payment?.id,
      status: response.result.payment?.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        errors: error.errors,
      };
    }
    throw error;
  }
}

// Create or get customer
async function getOrCreateCustomer(
  email: string,
  givenName?: string,
  familyName?: string
): Promise<string> {
  // Search for existing customer
  const searchResponse = await customersApi.searchCustomers({
    query: {
      filter: {
        emailAddress: { exact: email },
      },
    },
  });

  if (searchResponse.result.customers?.length > 0) {
    return searchResponse.result.customers[0].id!;
  }

  // Create new customer
  const createResponse = await customersApi.createCustomer({
    idempotencyKey: randomUUID(),
    emailAddress: email,
    givenName,
    familyName,
  });

  return createResponse.result.customer?.id!;
}

// Save card on file
async function saveCardOnFile(
  customerId: string,
  sourceId: string
): Promise<string> {
  const response = await cardsApi.createCard({
    idempotencyKey: randomUUID(),
    sourceId,
    card: {
      customerId,
    },
  });

  return response.result.card?.id!;
}

// Charge saved card
async function chargeCardOnFile(
  customerId: string,
  cardId: string,
  amount: number
): Promise<PaymentResult> {
  const response = await paymentsApi.createPayment({
    sourceId: cardId,
    idempotencyKey: randomUUID(),
    amountMoney: {
      amount: BigInt(amount),
      currency: 'USD',
    },
    customerId,
    locationId: process.env.SQUARE_LOCATION_ID,
  });

  return {
    success: true,
    paymentId: response.result.payment?.id,
  };
}
```

## Refunds

```typescript
async function refundPayment(
  paymentId: string,
  amount?: number,
  reason?: string
): Promise<RefundResult> {
  // Get original payment for amount if not specified
  if (!amount) {
    const payment = await paymentsApi.getPayment(paymentId);
    amount = Number(payment.result.payment?.amountMoney?.amount);
  }

  const response = await paymentsApi.refundPayment({
    idempotencyKey: randomUUID(),
    paymentId,
    amountMoney: {
      amount: BigInt(amount),
      currency: 'USD',
    },
    reason,
  });

  return {
    success: true,
    refundId: response.result.refund?.id,
    status: response.result.refund?.status,
  };
}
```

## Subscriptions

```typescript
import { subscriptionsApi, catalogApi } from './square-client';

// Create subscription plan
async function createSubscriptionPlan(
  name: string,
  amount: number,
  interval: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
): Promise<string> {
  const response = await catalogApi.upsertCatalogObject({
    idempotencyKey: randomUUID(),
    object: {
      type: 'SUBSCRIPTION_PLAN',
      id: `#${name.toLowerCase().replace(/\s/g, '-')}`,
      subscriptionPlanData: {
        name,
        phases: [
          {
            cadence: interval,
            recurringPriceMoney: {
              amount: BigInt(amount),
              currency: 'USD',
            },
          },
        ],
      },
    },
  });

  return response.result.catalogObject?.id!;
}

// Create subscription
async function createSubscription(
  customerId: string,
  planId: string,
  cardId: string
): Promise<string> {
  const response = await subscriptionsApi.createSubscription({
    idempotencyKey: randomUUID(),
    locationId: process.env.SQUARE_LOCATION_ID,
    planId,
    customerId,
    cardId,
    startDate: new Date().toISOString().split('T')[0],
  });

  return response.result.subscription?.id!;
}

// Cancel subscription
async function cancelSubscription(subscriptionId: string): Promise<void> {
  await subscriptionsApi.cancelSubscription(subscriptionId);
}
```

## Webhook Handling

```typescript
import { WebhooksHelper } from 'square';

async function handleSquareWebhook(req: Request): Promise<Response> {
  const body = await req.text();
  const signature = req.headers.get('x-square-hmacsha256-signature');

  // Verify signature
  const isValid = WebhooksHelper.isValidWebhookEventSignature(
    body,
    signature!,
    process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!,
    process.env.SQUARE_WEBHOOK_URL!
  );

  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);

  switch (event.type) {
    case 'payment.completed':
      await handlePaymentCompleted(event.data.object.payment);
      break;

    case 'payment.failed':
      await handlePaymentFailed(event.data.object.payment);
      break;

    case 'refund.created':
      await handleRefundCreated(event.data.object.refund);
      break;

    case 'subscription.created':
      await handleSubscriptionCreated(event.data.object.subscription);
      break;

    case 'invoice.payment_made':
      await handleInvoicePaid(event.data.object.invoice);
      break;
  }

  return new Response('OK', { status: 200 });
}
```

## Test Cards

| Card Number | Result |
|-------------|--------|
| 4532 0123 4567 8901 | Success |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 0010 | CVV failure |
| 4000 0000 0000 0028 | Address mismatch |

## Related Skills

**This skill uses:**
- `handle-webhook-event` - Webhook processing
- `tokenize-card-data` - Card tokenization

**This skill is used by:**
- `payment-orchestration` - Multi-PSP routing

## Best Practices

- Always use idempotency keys
- Store customer IDs for returning customers
- Use Cards on File for subscriptions
- Test webhooks in Sandbox
- Implement proper error handling
- Use location IDs for multi-location businesses
