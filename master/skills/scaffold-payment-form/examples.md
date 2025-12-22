# Examples: Form Schema (Zod)

## Typescript Definition

```typescript
const paymentSchema = z.object({
  cardHolder: z.string().min(2, "Name required"),
  cardNumber: z
    .string()
    .transform((v) => v.replace(/\s/g, ""))
    .refine(luhnCheck, "Invalid Card"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
  cvc: z.string().min(3).max(4),
});
```

## UI Structure

```tsx
<FormField
  control={form.control}
  name="cardNumber"
  render={({ field }) => (
    <FormItem>
      <Label>Card Number</Label>
      <FormControl>
        <Input placeholder="0000 0000 0000 0000" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```
