# Reference: Payment Form Best Practices

## Input Masking

- **Card**: `0000 0000 0000 0000` (Spaces every 4).
- **Expiry**: `MM/YY` (Slash auto-insert).
- **CVC**: `000` or `0000`.

## Shadcn UI Components

- `<Form>` context provider.
- `<Input>` styled component.
- `<FormMessage>` for error text (Red).

## Zod Validation

```ts
z.string().regex(/^\d{16}$/, "Invalid card number");
```

## Security

- Never use `GET` for form submission.
- Ensure HTTPS context.
