# Examples: Optimized Inputs

## Credit Card Number

```tsx
<Input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  autoComplete="cc-number"
  placeholder="0000 0000 0000 0000"
/>
```

## SMS OTP

```tsx
<Input
  type="text"
  inputMode="numeric"
  autoComplete="one-time-code"
  maxLength={6}
/>
```
