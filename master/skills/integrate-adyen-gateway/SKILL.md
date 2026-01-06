---
name: integrate-adyen-gateway
description: Complete guide for integrating Adyen payment gateway
activation: Use when integrating Adyen payments or implementing Adyen features
---

# Integrate Adyen Gateway

**Role:** Adyen Integration Specialist
**Domain:** Payment Processing, Adyen Platform
**Objective:** Implement secure Adyen payment integration

## Quick Start (TL;DR)

**Use when:** Integrating Adyen payments
**Key steps:** 1. Setup credentials  2. Implement flow  3. Handle webhooks
**Output:** Working Adyen payment integration

## Integration Options

| Method | Complexity | Customization | Best For |
|--------|------------|---------------|----------|
| Sessions + Drop-in | Low | Limited | Quick integration |
| Sessions + Components | Medium | Moderate | Custom UI with simplicity |
| Advanced Flow | High | Full | Complete control |

## Sessions API (Recommended)

### Backend Setup

```typescript
import { Client, CheckoutAPI } from '@adyen/api-library';

const client = new Client({
  apiKey: process.env.ADYEN_API_KEY,
  environment: 'TEST', // or 'LIVE'
});

const checkout = new CheckoutAPI(client);

async function createSession(order: Order): Promise<SessionResponse> {
  const session = await checkout.PaymentsApi.sessions({
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
    amount: {
      value: order.amount, // Minor units (cents)
      currency: order.currency,
    },
    reference: order.id,
    returnUrl: `${process.env.APP_URL}/checkout/result`,
    countryCode: order.countryCode,
    shopperEmail: order.customerEmail,
    shopperReference: order.customerId,
    channel: 'Web',
    // Enable specific payment methods
    allowedPaymentMethods: ['scheme', 'ideal', 'applepay', 'googlepay'],
    // Store payment method for recurring
    storePaymentMethodMode: 'askForConsent',
  });

  return {
    id: session.id,
    sessionData: session.sessionData,
  };
}
```

### Frontend Drop-in

```typescript
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';

async function initializeCheckout(sessionData: SessionResponse) {
  const checkout = await AdyenCheckout({
    environment: 'test',
    clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
    session: {
      id: sessionData.id,
      sessionData: sessionData.sessionData,
    },
    onPaymentCompleted: (result, component) => {
      handlePaymentResult(result);
    },
    onError: (error, component) => {
      console.error('Payment error:', error);
      showError(error.message);
    },
    paymentMethodsConfiguration: {
      card: {
        hasHolderName: true,
        holderNameRequired: true,
        billingAddressRequired: true,
      },
      applepay: {
        amount: sessionData.amount,
        countryCode: 'US',
      },
    },
  });

  checkout.create('dropin').mount('#dropin-container');
}

function handlePaymentResult(result: PaymentResult) {
  switch (result.resultCode) {
    case 'Authorised':
      window.location.href = '/checkout/success';
      break;
    case 'Pending':
    case 'Received':
      window.location.href = '/checkout/pending';
      break;
    case 'Refused':
      showError('Payment was refused');
      break;
    default:
      showError('Payment failed');
  }
}
```

## Advanced Flow (API-Only)

```typescript
// For full control without Drop-in
async function processPayment(paymentData: PaymentData): Promise<PaymentResponse> {
  const response = await checkout.PaymentsApi.payments({
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
    amount: {
      value: paymentData.amount,
      currency: paymentData.currency,
    },
    reference: paymentData.orderId,
    paymentMethod: paymentData.paymentMethod,
    returnUrl: `${process.env.APP_URL}/checkout/result`,
    shopperReference: paymentData.customerId,
    shopperInteraction: 'Ecommerce',
    recurringProcessingModel: 'CardOnFile',
    // 3DS configuration
    authenticationData: {
      threeDSRequestData: {
        nativeThreeDS: 'preferred',
      },
    },
    // Browser info for 3DS
    browserInfo: paymentData.browserInfo,
    // Risk data
    riskData: {
      clientData: paymentData.riskData,
    },
  });

  return handlePaymentResponse(response);
}

function handlePaymentResponse(response: PaymentsResponse): PaymentResponse {
  switch (response.resultCode) {
    case 'Authorised':
      return {
        success: true,
        pspReference: response.pspReference,
        resultCode: response.resultCode,
      };

    case 'RedirectShopper':
      return {
        success: false,
        action: response.action,
        requiresRedirect: true,
      };

    case 'IdentifyShopper':
    case 'ChallengeShopper':
      return {
        success: false,
        action: response.action,
        requires3DS: true,
      };

    case 'Pending':
      return {
        success: false,
        pending: true,
        pspReference: response.pspReference,
      };

    default:
      return {
        success: false,
        error: response.refusalReason,
        resultCode: response.resultCode,
      };
  }
}
```

## 3D Secure Handling

```typescript
// Handle 3DS action from Drop-in
checkout.createFromAction(action).mount('#action-container');

// Or handle manually
async function handle3DSAction(action: PaymentAction): Promise<PaymentResponse> {
  // For redirect-based 3DS
  if (action.type === 'redirect') {
    // Store payment data in session
    sessionStorage.setItem('adyen_md', action.paymentData);
    // Redirect to issuer
    window.location.href = action.url;
    return;
  }

  // For native 3DS (fingerprint/challenge)
  if (action.type === 'threeDS2') {
    const threeDS2Component = checkout.create('threeDS2', {
      challengeWindowSize: '05', // Full screen
      onComplete: async (state) => {
        const result = await submitDetails(state.data);
        handlePaymentResult(result);
      },
      onError: (error) => {
        showError(error.message);
      },
    });

    threeDS2Component.mount('#threeds-container');
  }
}

// Submit additional details after 3DS
async function submitDetails(details: any): Promise<PaymentResponse> {
  const response = await fetch('/api/payments/details', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ details }),
  });

  return response.json();
}
```

## Webhook Handling

```typescript
import { hmacValidator } from '@adyen/api-library';

const validator = new hmacValidator();

async function handleAdyenWebhook(req: Request): Promise<Response> {
  const body = await req.text();
  const notificationItems = JSON.parse(body).notificationItems;

  for (const item of notificationItems) {
    const notification = item.NotificationRequestItem;

    // Verify HMAC signature
    const isValid = validator.validateHMAC(
      notification,
      process.env.ADYEN_HMAC_KEY
    );

    if (!isValid) {
      console.error('Invalid webhook signature');
      continue;
    }

    await processNotification(notification);
  }

  // Always return [accepted] to acknowledge
  return new Response('[accepted]', { status: 200 });
}

async function processNotification(notification: NotificationItem): Promise<void> {
  const { eventCode, pspReference, merchantReference, success } = notification;

  switch (eventCode) {
    case 'AUTHORISATION':
      if (success === 'true') {
        await db.orders.update({
          where: { id: merchantReference },
          data: {
            status: 'authorized',
            pspReference,
          },
        });
      } else {
        await db.orders.update({
          where: { id: merchantReference },
          data: { status: 'failed' },
        });
      }
      break;

    case 'CAPTURE':
      await db.orders.update({
        where: { pspReference },
        data: { status: 'captured' },
      });
      break;

    case 'REFUND':
      await db.refunds.update({
        where: { pspReference: notification.originalReference },
        data: { status: success === 'true' ? 'completed' : 'failed' },
      });
      break;

    case 'CHARGEBACK':
      await handleChargeback(notification);
      break;
  }
}
```

## Modifications (Capture, Refund, Cancel)

```typescript
// Capture payment
async function capturePayment(
  pspReference: string,
  amount: number,
  currency: string
): Promise<ModificationResponse> {
  return checkout.ModificationsApi.captureAuthorisedPayment(pspReference, {
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
    amount: { value: amount, currency },
  });
}

// Refund payment
async function refundPayment(
  pspReference: string,
  amount: number,
  currency: string
): Promise<ModificationResponse> {
  return checkout.ModificationsApi.refundCapturedPayment(pspReference, {
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
    amount: { value: amount, currency },
  });
}

// Cancel payment
async function cancelPayment(
  pspReference: string
): Promise<ModificationResponse> {
  return checkout.ModificationsApi.cancelAuthorisedPaymentByPspReference(pspReference, {
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
  });
}
```

## Test Cards

| Card Number | Type | Result |
|-------------|------|--------|
| 4111 1111 1111 1111 | Visa | Success |
| 5500 0000 0000 0004 | Mastercard | Success |
| 4000 0000 0000 3220 | Visa | 3DS2 Challenge |
| 4000 0000 0000 3063 | Visa | 3DS2 Fingerprint |
| 4000 0000 0000 0002 | Visa | Refused |

## Related Skills

**This skill uses:**
- `render-3ds-challenge` - 3DS flows
- `handle-webhook-event` - Webhook processing
- `tokenize-card-data` - Card tokenization

**This skill is used by:**
- `payment-orchestration` - Multi-PSP routing

## Best Practices

- Always use Sessions API for new integrations
- Implement comprehensive webhook handling
- Store pspReference for all transactions
- Use idempotency keys for modifications
- Test all payment methods before go-live
- Enable RevenueProtect for fraud prevention
