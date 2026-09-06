# Database Migrations

This directory contains Prisma migrations for Ubuntu Finance Society.

## Running Migrations

### Development
```bash
npm run migrate
```

### Production
```bash
npm run migrate:deploy
```

## Creating Migrations

After modifying `schema.prisma`, create a new migration:

```bash
prisma migrate dev --name <migration_name>
```

## Viewing Migration Status

```bash
prisma migrate status
```

## Migration Strategy

Each migration:
1. Is idempotent and reversible
2. Preserves existing data
3. Maintains referential integrity
4. Includes comprehensive comments

## Key Principles

- **Immutability**: Financial records cannot be modified
- **Audit Trail**: All changes are logged in `AuditLog`
- **Soft Deletes**: Use `DeletionLog` instead of hard deletion
- **Compliance**: Every action is tracked with user, timestamp, and reason
