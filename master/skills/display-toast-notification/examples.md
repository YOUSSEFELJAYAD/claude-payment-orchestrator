# Examples: Toast Code

## Promise Flow

```tsx
import { toast } from "sonner";

const handlePay = async () => {
  const promise = payApi(); // Returns Promise

  toast.promise(promise, {
    loading: "Processing payment...",
    success: (data) => `Payment successful! ID: ${data.id}`,
    error: "Payment failed. Please try again.",
  });
};
```

## Simple Success

```tsx
toast.success("Link copied to clipboard");
```
