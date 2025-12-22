# Examples: Validation Code

## Zod Refinement (React Hook Form)

```ts
const luhnCheck = (val: string) => {
  let checksum = 0;
  let j = 1;
  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0;
    calc = Number(val.charAt(i)) * j;
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }
    checksum = checksum + calc;
    if (j == 1) {
      j = 2;
    } else {
      j = 1;
    }
  }
  return checksum % 10 == 0;
};

const schema = z.object({
  cardNumber: z
    .string()
    .transform((v) => v.replace(/\s/g, ""))
    .refine(luhnCheck, "Invalid Checksum"),
});
```
