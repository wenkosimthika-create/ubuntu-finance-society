# Ubuntu Finance Society - System Architecture

## Core Principle

**The group keeps the money. Ubuntu Finance Society keeps the record.**

This principle guides every architectural decision. The system is a governance, transparency, and audit platform—never a money movement system.

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React/Next.js)              │
│              Mobile-First PWA Application                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  API Gateway (Express.js)                │
│              Authentication & Authorization              │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Core Business Logic Layer                    │
│  ┌──────────┬──────────┬──────────┬──────────┐          │
│  │ Groups   │ Members  │ Ledger   │ Lending  │          │
│  └──────────┴──────────┴──────────┴──────────┘          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Audit & Logging Layer                       │
│  Immutable event store with full transaction history    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            PostgreSQL Database                           │
│  ┌──────────┬──────────┬──────────┬──────────┐          │
│  │ Entities │  Ledger  │  Audit   │ Reference│          │
│  └──────────┴──────────┴──────────┴──────────┘          │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Authentication**: JWT with bcrypt
- **Validation**: Joi/Yup
- **Logging**: Winston
- **Testing**: Jest, Supertest

### Frontend
- **Framework**: Next.js 14+ (React 18+)
- **UI Library**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Testing**: Vitest, React Testing Library

### DevOps & Tools
- **Package Manager**: pnpm (monorepo)
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Docker**: Containerization
- **Database Migrations**: Prisma Migrate

## Database Schema - Core Entities

### Authentication & Users
- `users` - System users with roles
- `roles` - Role definitions (Admin, Treasurer, Committee, Member)
- `permissions` - Permission matrix
- `sessions` - Active user sessions

### Groups (Stokvels, Savings Clubs, etc.)
- `groups` - Group metadata
- `group_settings` - Configuration
- `group_members` - Membership tracking
- `group_roles` - Role assignments per member

### Governance
- `constitutions` - Group rules & bylaws
- `meetings` - Meeting records
- `meeting_agendas` - Agenda items
- `meeting_resolutions` - Voting outcomes
- `voting_records` - Individual votes

### Financial Records (READ-ONLY RECORDS ONLY)
- `contributions` - Member contributions
- `contribution_ledger` - Complete history
- `withdrawals` - Withdrawal records
- `loans` - Loan applications & records
- `loan_repayments` - Repayment history
- `expenses` - Group expenses

### Audit & Compliance
- `audit_log` - Immutable change log
- `audit_events` - Transaction events
- `deletion_log` - Soft deletion tracking

## API Architecture

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh

### Group Management
- `POST /api/groups` - Create group
- `GET /api/groups/:id` - Get group details
- `PATCH /api/groups/:id` - Update group settings
- `GET /api/groups/:id/members` - List members

### Member Management
- `POST /api/groups/:id/members` - Add member
- `PATCH /api/groups/:id/members/:memberId` - Update member
- `DELETE /api/groups/:id/members/:memberId` - Remove member (soft)

### Contribution Ledger
- `POST /api/groups/:id/contributions` - Record contribution
- `GET /api/groups/:id/contributions` - Ledger history
- `GET /api/groups/:id/members/:memberId/statement` - Member statement

### Reports
- `GET /api/groups/:id/reports/summary` - Monthly summary
- `GET /api/groups/:id/reports/treasurer` - Treasurer report
- `GET /api/groups/:id/reports/member/:memberId` - Member report
- `GET /api/groups/:id/reports/audit` - Audit trail

## Security Principles

1. **Authentication**: JWT with secure storage (httpOnly cookies)
2. **Authorization**: Role-based access control (RBAC)
3. **Data Validation**: Input validation on all endpoints
4. **Immutability**: No deletion of financial records
5. **Audit Logging**: Every action tracked with user, timestamp, delta
6. **Encryption**: Sensitive data encrypted at rest
7. **Rate Limiting**: Prevent abuse
8. **CORS**: Restrict cross-origin requests

## Audit Logging Strategy

Every record change creates an entry in `audit_log`:

```sql
{
  audit_id: UUID,
  user_id: UUID,
  action: 'CREATE' | 'UPDATE' | 'DELETE' (soft),
  table_name: string,
  record_id: UUID,
  previous_values: JSON,
  new_values: JSON,
  change_reason: string,
  timestamp: timestamp,
  ip_address: string,
  user_agent: string
}
```

This creates an immutable, queryable history of all changes.

## Phase 1 Implementation (MVP)

Priority order:

1. Authentication & User Management
2. Group Creation & Configuration
3. Member Management
4. Contribution Ledger (immutable)
5. Audit Logging
6. Basic Reporting
7. Member Dashboard

## Phase 2 Implementation

8. Lending Module
9. Burial Society Module
10. Governance Workflows
11. Meeting Management

## Phase 3 Implementation

12. Analytics Dashboard
13. Multi-group Administration
14. Mobile Applications
15. Read-only Banking Reconciliation

## Compliance & Messaging

Every screen must clearly display:

> "Ubuntu Finance Society does not hold, manage, invest, lend or transfer funds. Ubuntu Finance Society is a record-keeping and governance platform."

This message appears:
- On login screen
- On main dashboard
- On all financial record screens
- In help/about section
- On printed reports

## Design System

### Color Palette
- **Primary**: Deep Forest Green (#1B5E20)
- **Secondary**: Warm Sand (#D4A373)
- **Accent**: Copper (#B87333)
- **Background**: White (#FFFFFF)
- **Text**: Dark Gray (#2C2C2C)

### Typography
- **Headings**: Sans-serif, bold
- **Body**: Sans-serif, regular
- **Monospace**: For transaction IDs, codes

### Mobile-First Approach
- Base design for 320px mobile
- Scale up to tablet (768px)
- Scale up to desktop (1024px+)
- Touch-friendly targets (min 44x44px)

## Deployment Architecture

```
Git (GitHub)
    ↓
GitHub Actions (CI/CD)
    ↓ (on merge to main)
Docker Build
    ↓
Docker Registry
    ↓
Kubernetes / Docker Compose
    ↓
PostgreSQL (managed database)
```

## Development Workflow

1. Create feature branch from `develop`
2. Implement with tests
3. Submit PR with clear description
4. Code review (2+ approvals)
5. Merge to `develop`
6. Stage testing
7. Merge to `main` for production

## Monitoring & Logging

- **Application Logs**: Winston (JSON format)
- **Error Tracking**: Sentry (optional)
- **Performance**: Application Performance Monitoring
- **Audit Access**: Query audit_log for compliance reports
