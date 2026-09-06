# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or use Docker)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/wenkosimthika-create/ubuntu-finance-society.git
cd ubuntu-finance-society

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Generate Prisma client
npm run prisma:generate -w packages/backend

# Setup database
npm run migrate -w packages/backend

# Start development servers
npm run dev
```

## Project Structure

### Backend

```
packages/backend/
├── src/
│   ├── index.ts              # Server entry point
│   ├── middleware/           # Express middleware
│   │   └── errorHandler.ts  # Global error handling
│   ├── routes/              # API route handlers
│   │   ├── auth.ts
│   │   ├── groups.ts
│   │   └── ...
│   ├── services/            # Business logic (to be added)
│   ├── utils/               # Utility functions
│   │   └��─ logger.ts        # Winston logger
│   └── types/               # TypeScript types (to be added)
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── package.json
├── tsconfig.json
├── jest.config.js
└── Dockerfile
```

### Frontend

```
packages/frontend/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── ...
│   ├── components/          # React components
│   │   ├── AppLayout.tsx
│   │   ├── ComplianceBanner.tsx
│   │   └── ...
│   ├── store/              # Zustand state stores
│   │   └── auth.ts
│   ├── lib/                # Utilities
│   │   └── api.ts          # Axios instance
│   └── styles/             # Tailwind CSS
│       └── globals.css
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── Dockerfile
```

## Development Workflow

### Creating a Feature

1. Create feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make changes following coding standards

3. Test locally:
   ```bash
   npm run test
   npm run lint
   ```

4. Commit with clear messages:
   ```bash
   git commit -m "feat: add new feature"
   ```

5. Push and create PR:
   ```bash
   git push origin feature/my-feature
   ```

### Database Changes

1. Modify `packages/backend/prisma/schema.prisma`

2. Create migration:
   ```bash
   npm run migrate -w packages/backend -- --name my_migration_name
   ```

3. Review generated SQL

4. Commit migration files

### Testing

#### Backend Tests
```bash
# Run all tests
npm test -w packages/backend

# Run with coverage
npm test -w packages/backend -- --coverage

# Watch mode
npm test -w packages/backend -- --watch
```

#### Frontend Tests
```bash
# Run tests
npm test -w packages/frontend

# UI mode
npm run test:ui -w packages/frontend
```

## Coding Standards

### TypeScript
- Strict mode enabled
- Explicit return types for functions
- Use interfaces for object types
- Use enums for fixed sets of values

### Naming Conventions
- **Files**: kebab-case (e.g., `auth-middleware.ts`)
- **Classes**: PascalCase (e.g., `UserService`)
- **Functions**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **React Components**: PascalCase (e.g., `UserCard`)

### Components
```typescript
import React from 'react';

interface Props {
  name: string;
  onSubmit: (data: any) => void;
}

const MyComponent: React.FC<Props> = ({ name, onSubmit }) => {
  return <div>{name}</div>;
};

export default MyComponent;
```

### API Handlers
```typescript
import { Router } from 'express';

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    // Handle request
    res.json({ status: 'success', data: {} });
  } catch (error) {
    next(error);
  }
});

export default router;
```

## Debugging

### Backend
```bash
# Run with debug logging
DEBUG=ubuntu-finance:* npm run dev
```

### Frontend
- Use Chrome DevTools
- Check browser console for errors
- Use React DevTools extension

## Git Commit Messages

Use conventional commits:
```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

## Common Tasks

### Reset Database
```bash
npm run migrate:reset -w packages/backend
```

### Generate Types
```bash
npm run prisma:generate -w packages/backend
```

### Lint Code
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## Troubleshooting

### Database Connection Issues
1. Check `.env` file has correct `DATABASE_URL`
2. Ensure PostgreSQL is running
3. Run migrations: `npm run migrate -w packages/backend`

### Port Already in Use
```bash
# Kill process on port
lsof -ti:3001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
