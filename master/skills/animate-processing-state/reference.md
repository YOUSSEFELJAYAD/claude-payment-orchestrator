# Reference: Framer Motion Patterns

## AnimatePresence

Allows components to animate out when removed from the React tree.

```tsx
<AnimatePresence mode="wait">
  {status === 'processing' && <motion.div key="proc" ...exit={{ opacity: 0 }} />}
</AnimatePresence>
```

## layout Prop

Use `layout` prop on the container to automatically animate height/width changes if content size changes (common in error messages).

## Variants

Define states (`hidden`, `visible`, `exit`) to keep JSX clean.

```ts
const variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};
```
