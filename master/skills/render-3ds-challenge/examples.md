# Examples: 3DS Challenge Component

## React Implementation

```tsx
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    // 1. Verify Origin (Mock example)
    if (event.origin !== "https://acs.visa.com") return;

    // 2. Parse Data
    const data = JSON.parse(event.data);

    if (data.status === "COMPLETED") {
      onSuccess(data.transId);
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);

return (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
    <iframe
      src={acsUrl}
      className="w-[600px] h-[400px] bg-white rounded-lg"
      sandbox="allow-forms allow-scripts allow-same-origin"
    />
  </div>
);
```
