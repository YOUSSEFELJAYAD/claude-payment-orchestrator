---
name: integrate-apple-pay
description: Complete Apple Pay integration guide for web and mobile
activation: Use when implementing Apple Pay in checkout flows
---

# Integrate Apple Pay

**Role:** Digital Wallet Specialist
**Domain:** Payment Processing, Apple Pay
**Objective:** Implement Apple Pay for seamless checkout

## Quick Start (TL;DR)

**Use when:** Adding Apple Pay to checkout
**Key steps:** 1. Verify domain  2. Create session  3. Process payment
**Output:** Working Apple Pay integration

## Prerequisites

1. Apple Developer Account
2. Merchant ID registered with Apple
3. Payment processing certificate
4. Domain verification file hosted

## Domain Verification

```bash
# Host this file at:
# https://yourdomain.com/.well-known/apple-developer-merchantid-domain-association

# Get the file from Apple Developer Portal
# Merchant IDs > Your Merchant ID > Domains
```

## Web Integration (Apple Pay JS)

### Check Availability

```typescript
async function checkApplePayAvailability(): Promise<boolean> {
  if (!window.ApplePaySession) {
    return false;
  }

  try {
    return await ApplePaySession.canMakePaymentsWithActiveCard(
      'merchant.com.yourcompany.yourapp'
    );
  } catch {
    return false;
  }
}
```

### Create Payment Request

```typescript
function createApplePayRequest(order: Order): ApplePayJS.ApplePayPaymentRequest {
  return {
    countryCode: 'US',
    currencyCode: order.currency,
    supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
    merchantCapabilities: ['supports3DS', 'supportsDebit', 'supportsCredit'],
    total: {
      label: 'Your Store',
      amount: order.total.toFixed(2),
      type: 'final',
    },
    lineItems: order.items.map(item => ({
      label: item.name,
      amount: item.price.toFixed(2),
      type: 'final',
    })),
    requiredBillingContactFields: ['postalAddress', 'name'],
    requiredShippingContactFields: ['postalAddress', 'name', 'phone', 'email'],
    shippingMethods: [
      {
        label: 'Standard Shipping',
        detail: '5-7 business days',
        amount: '5.00',
        identifier: 'standard',
      },
      {
        label: 'Express Shipping',
        detail: '2-3 business days',
        amount: '15.00',
        identifier: 'express',
      },
    ],
  };
}
```

### Handle Payment

```typescript
async function handleApplePay(order: Order): Promise<void> {
  const request = createApplePayRequest(order);
  const session = new ApplePaySession(6, request); // API version 6

  // Validate merchant
  session.onvalidatemerchant = async (event) => {
    try {
      const merchantSession = await fetch('/api/applepay/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          validationURL: event.validationURL,
        }),
      }).then(r => r.json());

      session.completeMerchantValidation(merchantSession);
    } catch (error) {
      session.abort();
    }
  };

  // Handle shipping method selection
  session.onshippingmethodselected = (event) => {
    const method = event.shippingMethod;
    const newTotal = calculateTotal(order, method);

    session.completeShippingMethodSelection({
      newTotal: {
        label: 'Your Store',
        amount: newTotal.toFixed(2),
        type: 'final',
      },
      newLineItems: order.items.map(item => ({
        label: item.name,
        amount: item.price.toFixed(2),
        type: 'final',
      })),
    });
  };

  // Handle shipping address change
  session.onshippingcontactselected = (event) => {
    const contact = event.shippingContact;

    // Validate shipping address
    if (!isValidShippingAddress(contact)) {
      session.completeShippingContactSelection({
        errors: [
          new ApplePayError(
            'shippingContactInvalid',
            'postalAddress',
            'We cannot ship to this address'
          ),
        ],
        newShippingMethods: [],
        newTotal: request.total,
        newLineItems: request.lineItems,
      });
      return;
    }

    session.completeShippingContactSelection({
      newShippingMethods: request.shippingMethods,
      newTotal: request.total,
      newLineItems: request.lineItems,
    });
  };

  // Handle payment authorization
  session.onpaymentauthorized = async (event) => {
    const payment = event.payment;

    try {
      const result = await fetch('/api/applepay/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: payment.token,
          billingContact: payment.billingContact,
          shippingContact: payment.shippingContact,
          orderId: order.id,
        }),
      }).then(r => r.json());

      if (result.success) {
        session.completePayment({
          status: ApplePaySession.STATUS_SUCCESS,
        });
        window.location.href = '/checkout/success';
      } else {
        session.completePayment({
          status: ApplePaySession.STATUS_FAILURE,
          errors: [
            new ApplePayError('unknown', undefined, result.message),
          ],
        });
      }
    } catch (error) {
      session.completePayment({
        status: ApplePaySession.STATUS_FAILURE,
      });
    }
  };

  session.oncancel = () => {
    console.log('Apple Pay cancelled');
  };

  session.begin();
}
```

## Backend - Merchant Validation

```typescript
import fs from 'fs';
import https from 'https';

async function validateMerchant(validationURL: string): Promise<any> {
  const cert = fs.readFileSync('path/to/merchant.pem');
  const key = fs.readFileSync('path/to/merchant.key');

  const body = JSON.stringify({
    merchantIdentifier: 'merchant.com.yourcompany.yourapp',
    displayName: 'Your Store',
    initiative: 'web',
    initiativeContext: 'yourdomain.com',
  });

  return new Promise((resolve, reject) => {
    const url = new URL(validationURL);

    const req = https.request({
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      cert,
      key,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}
```

## Processing with PSPs

### Stripe

```typescript
async function processApplePayWithStripe(
  token: ApplePayJS.ApplePayPaymentToken,
  amount: number
): Promise<PaymentResult> {
  // Token is already in correct format for Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_data: {
      type: 'card',
      card: {
        token: token.paymentData,
      },
    },
    confirm: true,
  });

  return {
    success: paymentIntent.status === 'succeeded',
    paymentIntentId: paymentIntent.id,
  };
}
```

### Adyen

```typescript
async function processApplePayWithAdyen(
  token: ApplePayJS.ApplePayPaymentToken,
  amount: number
): Promise<PaymentResult> {
  const response = await checkout.payments({
    amount: { value: amount, currency: 'USD' },
    paymentMethod: {
      type: 'applepay',
      applePayToken: JSON.stringify(token.paymentData),
    },
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
  });

  return {
    success: response.resultCode === 'Authorised',
    pspReference: response.pspReference,
  };
}
```

## Apple Pay Button Styling

```css
/* Standard Apple Pay button */
.apple-pay-button {
  -webkit-appearance: -apple-pay-button;
  -apple-pay-button-type: buy; /* buy, donate, plain, set-up, etc. */
  -apple-pay-button-style: black; /* black, white, white-outline */
  width: 100%;
  height: 44px;
  border-radius: 4px;
  cursor: pointer;
}

/* Custom fallback for non-Safari */
.apple-pay-button-fallback {
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
```

## Related Skills

**This skill is used by:**
- `integrate-stripe-full` - Stripe Apple Pay
- `integrate-adyen-gateway` - Adyen Apple Pay
- `payment-orchestration` - Multi-method checkout

## Best Practices

- Always check `canMakePaymentsWithActiveCard` before showing button
- Use proper Apple Pay button styling (required by guidelines)
- Handle all session events properly
- Validate shipping addresses server-side
- Test with Apple Pay Sandbox
- Keep merchant validation certificate updated
