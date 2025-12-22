# Reference: MPGS 3DS 2.0 Interface

Based on detailed analysis of Mastercard Gateway API v60+.

## API Operation

`apiOperation`: `INITIATE_AUTHENTICATION`

## Core Fields

### Authentication Object

| Field                                | Requirement        | Description                               |
| ------------------------------------ | ------------------ | ----------------------------------------- |
| `authentication.channel`             | REQUIRED           | `PAYER_BROWSER` (e-com) or `SDK` (in-app) |
| `authentication.purpose`             | OPTIONAL           | `PAYMENT_TRANSACTION`                     |
| `authentication.redirectResponseUrl` | REQUIRED (Browser) | Your backend URL receiving the POST back  |

### 3DS2 Object (`authentication.3ds2`)

| Field               | Requirement | Description            |
| ------------------- | ----------- | ---------------------- |
| `directoryServerId` | CONDITIONAL | Required for App flows |
| `sdk.appId`         | CONDITIONAL | Required for App flows |

### Browser Details (`device.browser`)

Required for `PAYER_BROWSER` channel to maximize friction-less flow.

- `acceptHeaders`: Standard HTTP headers
- `userAgent`: Full UA string
- `screenHeight`: integer
- `screenWidth`: integer
- `timeZone`: offset integer
- `javaEnabled`: boolean
- `language`: IETF BCP47 (e.g. "en-US")
- `colorDepth`: bits (e.g. 24)

## Security

- PAN data should be passed securely or tokenized via `sourceOfFunds.provided.card.number`.
