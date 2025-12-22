# Reference: Sonner API

## Setup

Add `<Toaster />` to root layout.

## Methods

- `toast('Message')`: Default.
- `toast.success('Message')`: Green.
- `toast.error('Message')`: Red.
- `toast.loading('Message')`: Persists until dismissed/updated.
- `toast.promise(promise, { loading: '...', success: '...', error: '...' })`: Auto-handling.

## Customization

- `richColors`: Enable semantic background colors.
- `position`: `top-center`, `bottom-right`.
