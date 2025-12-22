# Examples: Processing Button

## React Component

```tsx
<Button disabled={isLoading}>
  <AnimatePresence mode="wait">
    {isLoading ? (
      <motion.div
        key="spinner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex gap-2"
      >
        <Spinner />
        <span>Processing</span>
      </motion.div>
    ) : (
      <motion.span key="label">Pay Now</motion.span>
    )}
  </AnimatePresence>
</Button>
```

## Success Checkmark (SVG Path)

Animate `pathLength` from 0 to 1 for a "drawing" effect.

```tsx
<motion.path
  d="M5 13l4 4L19 7"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 0.5 }}
/>
```
