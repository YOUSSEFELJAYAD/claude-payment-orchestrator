---
name: implement-3ds-flow
description: Complete 3D Secure authentication implementation guide
activation: Use when implementing 3DS flows or handling SCA requirements
---

# Implement 3DS Flow

**Role:** 3DS Implementation Specialist
**Domain:** Payment Authentication, SCA Compliance
**Objective:** Implement robust 3D Secure authentication

## Quick Start (TL;DR)

**Use when:** Implementing 3DS authentication
**Key steps:** 1. Check requirement  2. Handle action  3. Complete auth
**Output:** Working 3DS integration

## 3DS Flow Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Payment    │────▶│  3DS Check   │────▶│  Frictionless│
│   Request    │     │  Required?   │     │   or         │
└──────────────┘     └──────────────┘     │  Challenge   │
                           │               └──────────────┘
                           │                     │
                      No   ▼                     ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   Process    │     │   Complete   │
                     │   Payment    │◀────│   Auth       │
                     └──────────────┘     └──────────────┘
```

## Implementation (Stripe)

```typescript
// Create PaymentIntent with 3DS
const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000,
  currency: 'eur',
  payment_method: paymentMethodId,
  confirmation_method: 'manual',
  confirm: true,
  return_url: 'https://yoursite.com/return',
});

// Handle 3DS action
if (paymentIntent.status === 'requires_action') {
  // Frontend handles 3DS challenge
  const { error } = await stripe.confirmCardPayment(
    paymentIntent.client_secret
  );
}
```

## Challenge Handling

```typescript
// Frontend challenge component
function ThreeDSChallenge({ action, onComplete }) {
  useEffect(() => {
    if (action.type === 'redirect_to_url') {
      window.location.href = action.redirect_to_url.url;
    } else if (action.type === 'use_stripe_sdk') {
      stripe.handleCardAction(action.client_secret)
        .then(onComplete);
    }
  }, [action]);

  return <div id="3ds-container" />;
}
```

## SCA Exemptions

| Exemption | Use Case |
|-----------|----------|
| Low value | < €30 transactions |
| Low risk TRA | Based on fraud rates |
| Recurring | Fixed-amount subscriptions |
| Corporate | B2B card payments |
| MIT | Merchant-initiated |

## Related Skills

- `render-3ds-challenge` - UI implementation
- `handle-payment-errors` - Error handling
- `payment-orchestration` - Flow integration

## Best Practices

- Always attempt frictionless first
- Handle all action types
- Store authentication data
- Implement fallback flows
- Test with issuer simulators
