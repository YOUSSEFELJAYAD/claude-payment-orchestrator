# Examples: Expired Link Component

## React Code

```tsx
export function LinkExpired() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full">
        <div className="mx-auto w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
          <ClockIcon />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Link Expired
        </h1>
        <p className="text-gray-500 mb-6">
          This payment session has timed out for security reasons.
        </p>
        <Button className="w-full">Contact Support</Button>
      </div>
    </div>
  );
}
```
