---
name: handle-payment-errors
description: Comprehensive payment error handling, categorization, and recovery strategies
activation: Use when implementing error handling or debugging payment failures
---

# Handle Payment Errors

**Role:** Error Recovery Engineer
**Domain:** Payment Processing, Reliability
**Objective:** Implement robust payment error handling

## Quick Start (TL;DR)

**Use when:** Implementing error handling or debugging failures
**Key steps:** 1. Categorize error  2. Apply strategy  3. Log and alert
**Output:** Resilient payment error handling

## Error Categorization

```typescript
enum ErrorCategory {
  TRANSIENT = 'transient',       // Retry with backoff
  PERMANENT = 'permanent',        // Don't retry
  ACTIONABLE = 'actionable',      // User action needed
  UNKNOWN = 'unknown',            // Log and investigate
}

interface PaymentError {
  code: string;
  category: ErrorCategory;
  message: string;
  retryable: boolean;
  userMessage?: string;
  suggestedAction?: string;
}

const errorMappings: Record<string, PaymentError> = {
  // Transient - Retry
  'network_error': {
    code: 'network_error',
    category: ErrorCategory.TRANSIENT,
    message: 'Network connection failed',
    retryable: true,
  },
  'rate_limit': {
    code: 'rate_limit',
    category: ErrorCategory.TRANSIENT,
    message: 'Rate limit exceeded',
    retryable: true,
  },
  'timeout': {
    code: 'timeout',
    category: ErrorCategory.TRANSIENT,
    message: 'Request timed out',
    retryable: true,
  },
  'server_error': {
    code: 'server_error',
    category: ErrorCategory.TRANSIENT,
    message: 'Payment provider server error',
    retryable: true,
  },

  // Permanent - Don't retry
  'invalid_card': {
    code: 'invalid_card',
    category: ErrorCategory.PERMANENT,
    message: 'Invalid card number',
    retryable: false,
    userMessage: 'Please check your card number',
  },
  'expired_card': {
    code: 'expired_card',
    category: ErrorCategory.PERMANENT,
    message: 'Card has expired',
    retryable: false,
    userMessage: 'This card has expired. Please use a different card.',
  },
  'insufficient_funds': {
    code: 'insufficient_funds',
    category: ErrorCategory.PERMANENT,
    message: 'Insufficient funds',
    retryable: false,
    userMessage: 'Payment declined. Please try a different payment method.',
  },
  'fraud_decline': {
    code: 'fraud_decline',
    category: ErrorCategory.PERMANENT,
    message: 'Transaction declined for fraud',
    retryable: false,
    userMessage: 'Payment could not be processed. Please contact your bank.',
  },

  // Actionable - User intervention
  'authentication_required': {
    code: 'authentication_required',
    category: ErrorCategory.ACTIONABLE,
    message: '3DS authentication required',
    retryable: false,
    suggestedAction: 'INITIATE_3DS',
  },
  'update_card': {
    code: 'update_card',
    category: ErrorCategory.ACTIONABLE,
    message: 'Card needs to be updated',
    retryable: false,
    userMessage: 'Please update your payment method',
    suggestedAction: 'SHOW_UPDATE_CARD_FORM',
  },
};
```

## Error Handler

```typescript
class PaymentErrorHandler {
  private retryConfig = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 30000,
    backoffMultiplier: 2,
  };

  async handleError(
    error: any,
    context: PaymentContext
  ): Promise<ErrorHandlingResult> {
    const normalizedError = this.normalizeError(error);
    const paymentError = this.categorizeError(normalizedError);

    // Log error with context
    await this.logError(paymentError, context);

    // Apply strategy based on category
    switch (paymentError.category) {
      case ErrorCategory.TRANSIENT:
        return this.handleTransientError(paymentError, context);

      case ErrorCategory.PERMANENT:
        return this.handlePermanentError(paymentError, context);

      case ErrorCategory.ACTIONABLE:
        return this.handleActionableError(paymentError, context);

      default:
        return this.handleUnknownError(paymentError, context);
    }
  }

  private async handleTransientError(
    error: PaymentError,
    context: PaymentContext
  ): Promise<ErrorHandlingResult> {
    const attempt = context.attemptNumber || 0;

    if (attempt >= this.retryConfig.maxAttempts) {
      // Exhausted retries - escalate or fail
      await this.alertOnExhaustedRetries(error, context);
      return {
        action: 'FAIL',
        message: 'Payment failed after multiple attempts',
        userMessage: 'We were unable to process your payment. Please try again later.',
      };
    }

    const delay = this.calculateBackoff(attempt);

    return {
      action: 'RETRY',
      delay,
      attemptNumber: attempt + 1,
    };
  }

  private handlePermanentError(
    error: PaymentError,
    context: PaymentContext
  ): ErrorHandlingResult {
    return {
      action: 'FAIL',
      message: error.message,
      userMessage: error.userMessage || 'Payment could not be processed',
      errorCode: error.code,
    };
  }

  private handleActionableError(
    error: PaymentError,
    context: PaymentContext
  ): ErrorHandlingResult {
    return {
      action: error.suggestedAction || 'USER_ACTION',
      message: error.message,
      userMessage: error.userMessage,
      metadata: error,
    };
  }

  private calculateBackoff(attempt: number): number {
    const delay = Math.min(
      this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt),
      this.retryConfig.maxDelay
    );
    // Add jitter
    return delay + Math.random() * delay * 0.1;
  }

  private normalizeError(error: any): NormalizedError {
    // Handle different PSP error formats
    if (error.type === 'StripeCardError') {
      return this.normalizeStripeError(error);
    }
    if (error.errorCode && error.pspReference) {
      return this.normalizeAdyenError(error);
    }
    if (error.name === 'INSTRUMENT_DECLINED') {
      return this.normalizePayPalError(error);
    }

    return {
      code: error.code || 'unknown',
      message: error.message || 'Unknown error',
      originalError: error,
    };
  }
}
```

## PSP-Specific Error Mapping

```typescript
// Stripe error mapping
const stripeErrorMap: Record<string, string> = {
  'card_declined': 'insufficient_funds',
  'expired_card': 'expired_card',
  'incorrect_cvc': 'invalid_card',
  'processing_error': 'server_error',
  'rate_limit': 'rate_limit',
  'authentication_required': 'authentication_required',
};

// Adyen error mapping
const adyenErrorMap: Record<string, string> = {
  'Refused': 'fraud_decline',
  'Cancelled': 'user_cancelled',
  'Error': 'server_error',
  'RedirectShopper': 'authentication_required',
  'ChallengeShopper': 'authentication_required',
};

// PayPal error mapping
const paypalErrorMap: Record<string, string> = {
  'INSTRUMENT_DECLINED': 'insufficient_funds',
  'PAYER_ACTION_REQUIRED': 'authentication_required',
  'INTERNAL_SERVER_ERROR': 'server_error',
};
```

## Circuit Breaker

```typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailure: number | null = null;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  private readonly threshold = 5;
  private readonly resetTimeout = 60000; // 1 minute

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure! > this.resetTimeout) {
        this.state = 'half-open';
      } else {
        throw new CircuitOpenError('Circuit breaker is open');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailure = Date.now();

    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }
}
```

## Error Logging

```typescript
interface ErrorLog {
  timestamp: Date;
  errorCode: string;
  errorCategory: ErrorCategory;
  message: string;
  context: {
    transactionId?: string;
    paymentIntentId?: string;
    customerId?: string;
    amount?: number;
    currency?: string;
    psp?: string;
  };
  stack?: string;
  attemptNumber?: number;
  resolution?: string;
}

async function logPaymentError(
  error: PaymentError,
  context: PaymentContext
): Promise<void> {
  const log: ErrorLog = {
    timestamp: new Date(),
    errorCode: error.code,
    errorCategory: error.category,
    message: error.message,
    context: {
      transactionId: context.transactionId,
      paymentIntentId: context.paymentIntentId,
      customerId: context.customerId,
      amount: context.amount,
      currency: context.currency,
      psp: context.psp,
    },
    attemptNumber: context.attemptNumber,
  };

  // Log to observability platform
  await logger.error('payment_error', log);

  // Alert on critical errors
  if (shouldAlert(error)) {
    await alerting.send({
      severity: 'high',
      title: `Payment Error: ${error.code}`,
      details: log,
    });
  }
}
```

## User-Friendly Messages

```typescript
const userMessages: Record<string, string> = {
  'insufficient_funds': 'Your payment was declined. Please try a different payment method.',
  'expired_card': 'This card has expired. Please use a different card.',
  'invalid_card': 'Please check your card details and try again.',
  'fraud_decline': 'Your payment could not be processed. Please contact your bank.',
  'authentication_required': 'Additional verification is required.',
  'network_error': 'Connection issue. Please check your internet and try again.',
  'server_error': 'We\'re experiencing technical difficulties. Please try again in a few minutes.',
  'default': 'Something went wrong. Please try again.',
};

function getUserMessage(errorCode: string): string {
  return userMessages[errorCode] || userMessages['default'];
}
```

## Related Skills

**This skill is used by:**
- `payment-orchestration` - Error handling in flows
- `implement-webhook-reliability` - Webhook error handling
- `saga-management` - Distributed error recovery

## Best Practices

- Categorize all errors consistently
- Never expose internal errors to users
- Log with full context for debugging
- Use circuit breakers for external services
- Alert on unusual error patterns
- Provide actionable user messages
- Test error scenarios thoroughly
