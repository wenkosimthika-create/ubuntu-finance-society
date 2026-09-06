# Ubuntu Finance Society

**Community Financial Governance & Audit Platform**

*The group keeps the money. Ubuntu Finance Society keeps the record.*

---

## 📋 Overview

Ubuntu Finance Society is a digital audit platform designed to increase trust and transparency in community financial groups. It provides permanent digital record-keeping, governance tracking, and compliance reporting for:

- **Stokvels** - Traditional savings rotation groups
- **Savings Clubs** - Community-managed savings
- **Lending Pools** - Shared lending circles
- **Emergency Funds** - Collective safety nets
- **Community Investment Clubs** - Group investment initiatives
- **Cooperative Financial Groups** - Formal cooperatives
- **Burial Societies** - Funeral assistance groups

## 🎯 Core Principle

> **The group keeps the money. Ubuntu Finance Society keeps the record.**

This principle guides every architectural decision. The system is a governance, transparency, and audit platform—**never** a money movement system.

## ✨ Key Features

### Governance & Transparency
- Immutable audit trail for all transactions
- Complete member management and roles
- Constitution and bylaws management
- Meeting records and voting outcomes

### Financial Record-Keeping
- Contribution tracking (cannot be modified)
- Withdrawal and payout records
- Loan applications and repayment tracking
- Expense management and categorization

### Compliance & Reporting
- Member statements on demand
- Treasurer reports and summaries
- Audit trail queries for compliance
- Annual and monthly summaries

### User Roles
- **Administrator** - Creates groups, manages settings
- **Treasurer** - Records all financial transactions
- **Committee Member** - Reviews and approves actions
- **Member** - Views personal account and group information

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+ (or use Docker)

### Setup with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/wenkosimthika-create/ubuntu-finance-society.git
cd ubuntu-finance-society

# Create environment file
cp .env.example .env

# Start all services
docker-compose up
```

Access:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **Database**: localhost:5432

### Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate -w packages/backend

# Set up database
npm run migrate -w packages/backend

# Run development servers
npm run dev
```

## 📁 Project Structure

```
ubuntu-finance-society/
├── packages/
│   ├── backend/                 # Node.js/Express API
│   │   ├── src/
│   │   │   ├── index.ts        # Server entry point
│   │   │   ├── routes/         # API endpoints
│   │   │   ├── middleware/     # Express middleware
│   │   │   ├── utils/          # Utilities (logging, etc.)
│   │   │   └── ...
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Database schema
│   │   │   └── migrations/     # Database migrations
│   │   └── package.json
│   └── frontend/                # Next.js/React web app
│       ├── src/
│       │   ├─��� app/            # Next.js app router
│       │   ├── components/     # React components
│       │   ├── store/          # Zustand state management
│       │   ├── lib/            # Utilities
│       │   └── styles/         # Tailwind CSS
│       └── package.json
├── ARCHITECTURE.md              # System design documentation
├── docker-compose.yml           # Docker Compose configuration
├── .env.example                 # Environment variables template
└── README.md                    # This file
```

## 🏗️ Architecture

### Technology Stack

**Backend**
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Logging**: Winston

**Frontend**
- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios

### Database Schema

The database includes:
- **Users & Authentication** - User accounts, roles, permissions
- **Groups** - Group management with settings
- **Members** - Member tracking with roles and status
- **Governance** - Constitutions, meetings, voting
- **Ledger** - Immutable contribution records
- **Loans** - Loan applications and repayments
- **Audit Log** - Complete change history

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed design.

## 📚 Development Phases

### Phase 1 (MVP)
1. Authentication & User Management
2. Group Creation & Configuration
3. Member Management
4. Contribution Ledger
5. Audit Logging
6. Basic Reporting

### Phase 2
7. Lending Module
8. Burial Society Module
9. Governance Workflows
10. Meeting Management

### Phase 3
11. Analytics Dashboard
12. Multi-group Administration
13. Mobile Applications
14. Read-only Banking Reconciliation

## 🎨 Design System

### Color Palette
- **Primary**: Deep Forest Green (#1B5E20)
- **Secondary**: Warm Sand (#D4A373)
- **Accent**: Copper (#B87333)
- **Background**: White

### Mobile-First
All designs are mobile-first, responsive from 320px mobile to desktop.

## 🔐 Security & Compliance

### Core Principles
- **Immutability**: Financial records cannot be modified
- **Audit Trail**: Every action is logged with user, timestamp, and reason
- **Soft Deletes**: Records are marked as deleted, not removed
- **Role-Based Access**: Granular permissions for each role
- **Encryption**: Passwords hashed with bcrypt, sensitive data encrypted

### Compliance Notice
Every screen displays:
> "Ubuntu Finance Society does not hold, manage, invest, lend or transfer funds. Ubuntu Finance Society is a record-keeping and governance platform."

## 📖 API Documentation

See [packages/backend/API.md](./packages/backend/API.md) for complete endpoint documentation.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## 📝 Contributing

1. Create a feature branch from `develop`
2. Make your changes with clear commit messages
3. Write tests for new functionality
4. Submit a PR with description
5. Ensure CI/CD passes

## 📄 License

MIT License - See [LICENSE](./LICENSE) file

## 🤝 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/wenkosimthika-create/ubuntu-finance-society/issues).

---

**Built with 🤎 for African communities**
