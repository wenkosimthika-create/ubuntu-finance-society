# Ubuntu Finance Society - Backend API

Node.js/Express backend for Ubuntu Finance Society.

## Setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run migrate
```

## Development

```bash
npm run dev
```

## Testing

```bash
npm test
```

## API Documentation

See [API.md](./API.md) for endpoint documentation.

## Architecture

- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Logging**: Winston
- **Validation**: Joi

## Key Principles

- The group keeps the money
- Ubuntu Finance Society keeps the record
- Full audit trail for all operations
- Immutable financial records
