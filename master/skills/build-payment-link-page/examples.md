# Examples: Tailwind Layout

## Split Layout (Responsive)

```tsx
<div className="min-h-screen flex flex-col md:flex-row">
  {/* Left: Summary (Dark) */}
  <div className="w-full md:w-1/2 bg-gray-900 text-white p-8 order-1 md:order-0">
    <Logo />
    <OrderSummary />
  </div>

  {/* Right: Form (Light) */}
  <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center order-0 md:order-1">
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm">
      <PaymentForm />
    </div>
  </div>
</div>
```
