# Reference: Prisma Operations

## schema.prisma

```prisma
model Transaction {
  id        String   @id @default(uuid())
  amount    Decimal  @db.Decimal(10, 2)
  version   Int      @default(0) // Optimistic Lock
  createdAt DateTime @default(now())

  @@index([createdAt])
}
```

## Commands

- `prisma generate`: Update Client.
- `prisma db push`: Protoyping (dangerous in prod).
- `prisma migrate deploy`: Production.
