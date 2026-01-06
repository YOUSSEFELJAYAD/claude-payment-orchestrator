---
name: integrate-google-pay
description: Complete Google Pay integration guide for web and mobile
activation: Use when implementing Google Pay in checkout flows
---

# Integrate Google Pay

**Role:** Digital Wallet Specialist
**Domain:** Payment Processing, Google Pay
**Objective:** Implement Google Pay for seamless checkout

## Quick Start (TL;DR)

**Use when:** Adding Google Pay to checkout
**Key steps:** 1. Configure client  2. Check availability  3. Process payment
**Output:** Working Google Pay integration

## Prerequisites

1. Google Pay merchant account
2. Payment processor gateway ID
3. SSL-enabled website

## Web Integration

### Load Google Pay Library

```html
<script src="https://pay.google.com/gp/p/js/pay.js"></script>
```

### Configuration

```typescript
const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
};

const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    gateway: 'stripe', // or 'adyen', 'braintree', etc.
    'stripe:version': '2020-08-27',
    'stripe:publishableKey': process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};

const allowedCardNetworks = ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks,
    billingAddressRequired: true,
    billingAddressParameters: {
      format: 'FULL',
      phoneNumberRequired: true,
    },
  },
};

const cardPaymentMethod = {
  ...baseCardPaymentMethod,
  tokenizationSpecification,
};
```

### Initialize and Check Availability

```typescript
let paymentsClient: google.payments.api.PaymentsClient | null = null;

function getGooglePaymentsClient(): google.payments.api.PaymentsClient {
  if (!paymentsClient) {
    paymentsClient = new google.payments.api.PaymentsClient({
      environment: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'TEST',
      merchantInfo: {
        merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID,
        merchantName: 'Your Store',
      },
      paymentDataCallbacks: {
        onPaymentAuthorized: onPaymentAuthorized,
        onPaymentDataChanged: onPaymentDataChanged,
      },
    });
  }
  return paymentsClient;
}

async function checkGooglePayAvailability(): Promise<boolean> {
  const client = getGooglePaymentsClient();

  const isReadyToPayRequest = {
    ...baseRequest,
    allowedPaymentMethods: [baseCardPaymentMethod],
  };

  try {
    const response = await client.isReadyToPay(isReadyToPayRequest);
    return response.result;
  } catch {
    return false;
  }
}
```

### Create Payment Button

```typescript
async function createGooglePayButton(container: HTMLElement): Promise<void> {
  const isAvailable = await checkGooglePayAvailability();
  if (!isAvailable) return;

  const client = getGooglePaymentsClient();

  const button = client.createButton({
    onClick: onGooglePayClick,
    buttonColor: 'black',
    buttonType: 'buy',
    buttonRadius: 4,
    buttonSizeMode: 'fill',
  });

  container.appendChild(button);
}
```

### Handle Payment

```typescript
async function onGooglePayClick(): Promise<void> {
  const client = getGooglePaymentsClient();

  const paymentDataRequest = {
    ...baseRequest,
    allowedPaymentMethods: [cardPaymentMethod],
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPrice: '99.99',
      currencyCode: 'USD',
      countryCode: 'US',
    },
    merchantInfo: {
      merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID,
      merchantName: 'Your Store',
    },
    callbackIntents: ['SHIPPING_ADDRESS', 'SHIPPING_OPTION', 'PAYMENT_AUTHORIZATION'],
    shippingAddressRequired: true,
    shippingAddressParameters: {
      phoneNumberRequired: true,
      allowedCountryCodes: ['US', 'CA', 'GB'],
    },
    shippingOptionRequired: true,
    shippingOptionParameters: {
      defaultSelectedOptionId: 'standard',
      shippingOptions: [
        {
          id: 'standard',
          label: 'Standard Shipping',
          description: '5-7 business days',
        },
        {
          id: 'express',
          label: 'Express Shipping',
          description: '2-3 business days',
        },
      ],
    },
  };

  try {
    const paymentData = await client.loadPaymentData(paymentDataRequest);
    await processPayment(paymentData);
  } catch (error) {
    if (error.statusCode === 'CANCELED') {
      console.log('Payment cancelled by user');
    } else {
      console.error('Google Pay error:', error);
    }
  }
}

// Callback for payment authorization
function onPaymentAuthorized(
  paymentData: google.payments.api.PaymentData
): google.payments.api.PaymentAuthorizationResult {
  return new Promise(async (resolve) => {
    try {
      const result = await processPaymentWithBackend(paymentData);

      if (result.success) {
        resolve({ transactionState: 'SUCCESS' });
      } else {
        resolve({
          transactionState: 'ERROR',
          error: {
            intent: 'PAYMENT_AUTHORIZATION',
            message: result.error,
            reason: 'PAYMENT_DATA_INVALID',
          },
        });
      }
    } catch (error) {
      resolve({
        transactionState: 'ERROR',
        error: {
          intent: 'PAYMENT_AUTHORIZATION',
          message: 'Payment failed',
          reason: 'OTHER_ERROR',
        },
      });
    }
  });
}

// Callback for shipping/payment data changes
function onPaymentDataChanged(
  intermediatePaymentData: google.payments.api.IntermediatePaymentData
): google.payments.api.PaymentDataRequestUpdate {
  return new Promise((resolve) => {
    const { callbackTrigger, shippingAddress, shippingOptionData } = intermediatePaymentData;

    let update: google.payments.api.PaymentDataRequestUpdate = {};

    if (callbackTrigger === 'SHIPPING_ADDRESS') {
      // Validate shipping address
      if (!isValidAddress(shippingAddress)) {
        update.error = {
          reason: 'SHIPPING_ADDRESS_UNSERVICEABLE',
          message: 'Cannot ship to this address',
          intent: 'SHIPPING_ADDRESS',
        };
      } else {
        // Update shipping options based on address
        update.newShippingOptionParameters = getShippingOptions(shippingAddress);
      }
    }

    if (callbackTrigger === 'SHIPPING_OPTION') {
      // Update total based on shipping selection
      const shippingCost = getShippingCost(shippingOptionData.id);
      update.newTransactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: (99.99 + shippingCost).toFixed(2),
        currencyCode: 'USD',
        countryCode: 'US',
      };
    }

    resolve(update);
  });
}
```

## Backend Processing

### Process with Stripe

```typescript
async function processGooglePayWithStripe(
  paymentData: google.payments.api.PaymentData
): Promise<PaymentResult> {
  const token = JSON.parse(
    paymentData.paymentMethodData.tokenizationData.token
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(parseFloat(paymentData.transactionInfo.totalPrice) * 100),
    currency: paymentData.transactionInfo.currencyCode.toLowerCase(),
    payment_method_data: {
      type: 'card',
      card: {
        token: token.id,
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

### Process with Adyen

```typescript
async function processGooglePayWithAdyen(
  paymentData: google.payments.api.PaymentData
): Promise<PaymentResult> {
  const response = await checkout.payments({
    amount: {
      value: Math.round(parseFloat(paymentData.transactionInfo.totalPrice) * 100),
      currency: paymentData.transactionInfo.currencyCode,
    },
    paymentMethod: {
      type: 'googlepay',
      googlePayToken: paymentData.paymentMethodData.tokenizationData.token,
    },
    merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
  });

  return {
    success: response.resultCode === 'Authorised',
    pspReference: response.pspReference,
  };
}
```

## React Component

```tsx
import { useEffect, useRef, useState } from 'react';

export function GooglePayButton({ amount, onSuccess, onError }: GooglePayButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const init = async () => {
      const available = await checkGooglePayAvailability();
      setIsAvailable(available);

      if (available && containerRef.current) {
        await createGooglePayButton(containerRef.current);
      }
    };

    init();
  }, []);

  if (!isAvailable) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="google-pay-button-container"
      style={{ minHeight: 48 }}
    />
  );
}
```

## Gateway-Specific Configuration

```typescript
// Stripe
const stripeTokenization = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    gateway: 'stripe',
    'stripe:version': '2020-08-27',
    'stripe:publishableKey': 'pk_...',
  },
};

// Adyen
const adyenTokenization = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    gateway: 'adyen',
    gatewayMerchantId: 'YourAdyenMerchantAccount',
  },
};

// Braintree
const braintreeTokenization = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    gateway: 'braintree',
    'braintree:apiVersion': 'v1',
    'braintree:sdkVersion': '3.x',
    'braintree:merchantId': 'your_merchant_id',
    'braintree:clientKey': 'your_client_key',
  },
};
```

## Related Skills

**This skill is used by:**
- `integrate-stripe-full` - Stripe Google Pay
- `integrate-adyen-gateway` - Adyen Google Pay
- `payment-orchestration` - Multi-method checkout

## Best Practices

- Always check `isReadyToPay` before showing button
- Use official Google Pay button styling
- Handle shipping callbacks for dynamic pricing
- Test in TEST environment first
- Register for production in Google Pay Console
- Handle all error cases gracefully
