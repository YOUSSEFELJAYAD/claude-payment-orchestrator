---
name: integrate-paypal-full
description: Complete PayPal integration guide covering all payment methods and features
activation: Use when integrating PayPal or implementing PayPal features
---

# Integrate PayPal Full

**Role:** PayPal Integration Specialist
**Domain:** Payment Processing, PayPal Platform
**Objective:** Implement comprehensive PayPal payment integration

## Quick Start (TL;DR)

**Use when:** Any PayPal integration
**Key steps:** 1. Create order  2. Capture payment  3. Handle webhooks
**Output:** Full-featured PayPal integration

## Smart Payment Buttons (Recommended)

### Frontend Setup

```html
<!-- PayPal SDK -->
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD&intent=capture"></script>

<div id="paypal-button-container"></div>
```

```typescript
// Initialize PayPal Buttons
function initPayPalButtons() {
  paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'gold',
      shape: 'rect',
      label: 'paypal',
    },

    // Create order on server
    createOrder: async () => {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items,
          amount: cart.total,
        }),
      });
      const order = await response.json();
      return order.id;
    },

    // Capture payment on server
    onApprove: async (data) => {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.orderID }),
      });

      const result = await response.json();

      if (result.status === 'COMPLETED') {
        window.location.href = '/checkout/success';
      } else {
        showError('Payment failed');
      }
    },

    onError: (err) => {
      console.error('PayPal error:', err);
      showError('Payment could not be processed');
    },

    onCancel: () => {
      showMessage('Payment cancelled');
    },
  }).render('#paypal-button-container');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initPayPalButtons);
```

## Backend - Orders API

```typescript
import fetch from 'node-fetch';

const PAYPAL_API = process.env.PAYPAL_SANDBOX === 'true'
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com';

// Get access token
async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Create order
async function createOrder(
  amount: string,
  currency: string,
  items: OrderItem[]
): Promise<PayPalOrder> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
            breakdown: {
              item_total: {
                currency_code: currency,
                value: amount,
              },
            },
          },
          items: items.map(item => ({
            name: item.name,
            unit_amount: {
              currency_code: currency,
              value: item.price,
            },
            quantity: item.quantity.toString(),
          })),
        },
      ],
      application_context: {
        return_url: `${process.env.APP_URL}/checkout/success`,
        cancel_url: `${process.env.APP_URL}/checkout/cancel`,
        brand_name: 'Your Store',
        shipping_preference: 'NO_SHIPPING',
      },
    }),
  });

  return response.json();
}

// Capture order
async function captureOrder(orderId: string): Promise<CaptureResult> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const result = await response.json();

  if (result.status === 'COMPLETED') {
    const capture = result.purchase_units[0].payments.captures[0];
    return {
      success: true,
      captureId: capture.id,
      amount: capture.amount.value,
      currency: capture.amount.currency_code,
    };
  }

  return {
    success: false,
    error: result.details?.[0]?.description || 'Capture failed',
  };
}

// Get order details
async function getOrder(orderId: string): Promise<PayPalOrder> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_API}/v2/checkout/orders/${orderId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  return response.json();
}
```

## Refunds

```typescript
async function refundCapture(
  captureId: string,
  amount?: string,
  currency?: string,
  note?: string
): Promise<RefundResult> {
  const accessToken = await getAccessToken();

  const body: any = {};
  if (amount) {
    body.amount = {
      value: amount,
      currency_code: currency || 'USD',
    };
  }
  if (note) {
    body.note_to_payer = note;
  }

  const response = await fetch(
    `${PAYPAL_API}/v2/payments/captures/${captureId}/refund`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: Object.keys(body).length ? JSON.stringify(body) : undefined,
    }
  );

  const result = await response.json();

  return {
    success: result.status === 'COMPLETED',
    refundId: result.id,
    status: result.status,
  };
}
```

## Subscriptions

```typescript
// Create product
async function createProduct(
  name: string,
  description: string
): Promise<string> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API}/v1/catalogs/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      type: 'SERVICE',
      category: 'SOFTWARE',
    }),
  });

  const product = await response.json();
  return product.id;
}

// Create billing plan
async function createPlan(
  productId: string,
  name: string,
  amount: string,
  interval: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
): Promise<string> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API}/v1/billing/plans`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      name,
      billing_cycles: [
        {
          frequency: {
            interval_unit: interval,
            interval_count: 1,
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0, // Infinite
          pricing_scheme: {
            fixed_price: {
              value: amount,
              currency_code: 'USD',
            },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        payment_failure_threshold: 3,
      },
    }),
  });

  const plan = await response.json();
  return plan.id;
}

// Create subscription
async function createSubscription(planId: string): Promise<PayPalSubscription> {
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plan_id: planId,
      application_context: {
        brand_name: 'Your Store',
        return_url: `${process.env.APP_URL}/subscription/success`,
        cancel_url: `${process.env.APP_URL}/subscription/cancel`,
      },
    }),
  });

  return response.json();
}

// Cancel subscription
async function cancelSubscription(
  subscriptionId: string,
  reason: string
): Promise<void> {
  const accessToken = await getAccessToken();

  await fetch(
    `${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}/cancel`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason }),
    }
  );
}
```

## Webhook Handling

```typescript
import crypto from 'crypto';

async function handlePayPalWebhook(req: Request): Promise<Response> {
  const body = await req.text();
  const headers = Object.fromEntries(req.headers);

  // Verify webhook signature
  const isValid = await verifyWebhookSignature(body, headers);
  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);

  switch (event.event_type) {
    case 'CHECKOUT.ORDER.APPROVED':
      // Order approved, capture it
      await captureOrder(event.resource.id);
      break;

    case 'PAYMENT.CAPTURE.COMPLETED':
      await handleCaptureCompleted(event.resource);
      break;

    case 'PAYMENT.CAPTURE.REFUNDED':
      await handleRefundCompleted(event.resource);
      break;

    case 'BILLING.SUBSCRIPTION.ACTIVATED':
      await handleSubscriptionActivated(event.resource);
      break;

    case 'BILLING.SUBSCRIPTION.CANCELLED':
      await handleSubscriptionCancelled(event.resource);
      break;

    case 'PAYMENT.SALE.COMPLETED':
      await handleSubscriptionPayment(event.resource);
      break;

    case 'CUSTOMER.DISPUTE.CREATED':
      await handleDisputeCreated(event.resource);
      break;
  }

  return new Response('OK', { status: 200 });
}

async function verifyWebhookSignature(
  body: string,
  headers: Record<string, string>
): Promise<boolean> {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_API}/v1/notifications/verify-webhook-signature`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth_algo: headers['paypal-auth-algo'],
        cert_url: headers['paypal-cert-url'],
        transmission_id: headers['paypal-transmission-id'],
        transmission_sig: headers['paypal-transmission-sig'],
        transmission_time: headers['paypal-transmission-time'],
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: JSON.parse(body),
      }),
    }
  );

  const result = await response.json();
  return result.verification_status === 'SUCCESS';
}
```

## Advanced Card Fields

```typescript
// For PCI-compliant card collection
function initAdvancedCardFields() {
  paypal.HostedFields.render({
    createOrder: async () => {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
      });
      const order = await response.json();
      return order.id;
    },
    styles: {
      input: {
        'font-size': '16px',
        'font-family': 'system-ui',
      },
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: 'Card Number',
      },
      cvv: {
        selector: '#cvv',
        placeholder: 'CVV',
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: 'MM/YY',
      },
    },
  }).then((hostedFields) => {
    document.getElementById('pay-button').addEventListener('click', () => {
      hostedFields.submit();
    });
  });
}
```

## Related Skills

**This skill uses:**
- `handle-webhook-event` - Webhook processing

**This skill is used by:**
- `payment-orchestration` - Multi-PSP routing

## Best Practices

- Use Orders API v2 for all new integrations
- Always verify webhook signatures
- Implement idempotency with PayPal-Request-Id header
- Test thoroughly in Sandbox
- Handle all order and subscription states
- Use Smart Payment Buttons for best conversion
