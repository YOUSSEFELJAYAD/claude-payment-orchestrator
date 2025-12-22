# Reference: Card Validation Patterns

## Regex Patterns

- **Visa**: `^4[0-9]{12}(?:[0-9]{3})?$`
- **Mastercard**: `^5[1-5][0-9]{14}$`
- **Amex**: `^3[47][0-9]{13}$`

## Luhn Algorithm (Mod 10)

Standard check digit verification. Detects typos.

## UI States

- **Empty**: Placeholder `0000...`
- **Typing**: Formatting `4242 42...`
- **Valid**: Green border / Icon.
- **Error**: Red text below input. Aria-invalid="true".
