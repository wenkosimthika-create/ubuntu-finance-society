# Ubuntu Finance Society - System Architecture

## Core Principle

> **The group keeps the money. Ubuntu Finance Society keeps the record.**

This principle guides every architectural decision. The system is purely a governance, transparency, and audit platform—it never processes, holds, or transfers money.

---

## 1. System Overview

Ubuntu Finance Society is a digital audit platform designed for community financial groups. It provides:

- **Permanent Record-Keeping**: Immutable audit trail for all transactions
- **Governance Management**: Constitution, meetings, voting records
- **Member Management**: Roles, status tracking, permissions
- **Financial Transparency**: Complete ledger visibility
- **Compliance Tracking**: Regulatory alignment and reporting

### System Architecture Diagram

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

---

## 2. Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 14+
- **ORM**: Prisma 5.x
- **Authentication**: JWT + bcrypt
- **Logging**: Winston 3.x
- **Testing**: Jest 29.x
- **Validation**: Joi 17.x

### Frontend
- **Framework**: Next.js 14 (Vercel deployment ready)
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand 4.x
- **HTTP Client**: Axios 1.x
- **Forms**: React Hook Form 7.x
- **Testing**: Vitest 0.34.x

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose (dev)
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

---

## 3. Database Architecture

### Design Principles

1. **Immutability**: Financial records cannot be modified after creation
2. **Audit Trail**: Every action logged with user, timestamp, and reason
3. **Soft Deletes**: Records marked as deleted, never removed
4. **Referential Integrity**: Strong foreign key constraints
5. **ACID Compliance**: Full transaction support

### Database Schema Overview

See `packages/backend/prisma/schema.prisma` for complete schema.

**Core Tables:**
- Authentication: `User`, `Role`, `Permission`, `Session`
- Groups: `Group`, `GroupSettings`, `GroupMember`, `GroupRole`
- Governance: `Constitution`, `Meeting`, `Resolution`, `Vote`
- Finance: `Contribution`, `Withdrawal`, `Loan`, `LoanRepayment`, `Expense`, `Fund`
- Audit: `AuditLog`, `DeletionLog`

---

## 4. API Architecture

### REST API Design

All endpoints follow RESTful conventions with consistent response formats.

#### Base URL
```
https://api.ubuntu-finance.example.com/api/v1
```

#### Response Format
```json
{
  "status": "success|error",
  "data": {...},
  "message": "Human-readable message"
}
```

#### Authentication
- JWT tokens in Authorization header: `Bearer <token>`
- Tokens valid for 7 days
- Refresh token mechanism included

See `packages/backend/API.md` for detailed endpoint documentation.

---

## 5. Security Architecture

### Authentication & Authorization

#### JWT Strategy
- Issued on login with 7-day expiry
- Stored in httpOnly cookies (frontend)
- Payload includes userId, email, role

#### RBAC (Role-Based Access Control)
```
Admin - Full system access
Treasurer - Financial transaction recording
Committee - Transaction approval
Member - View personal data
```

### Data Protection

- Passwords hashed with bcrypt (cost: 10)
- Rate limiting: 100 requests per 15 minutes per IP
- SQL injection prevention via Prisma ORM
- CORS restrictions
- HTTPS enforced in production

---

## 6. Frontend Architecture

### Next.js 14 Features

- **App Router**: Modern file-based routing
- **Server Components**: Default for performance
- **API Routes**: Backend endpoints in `/api`
- **Static Generation**: ISR for performance
- **Image Optimization**: Automatic with `next/image`

### Deployment on Netlify/Vercel

#### Environment Configuration
```env
REACT_APP_API_URL=https://api.ubuntu-finance.example.com
```

#### Build Settings
```
Build command: npm run build
Publish directory: .next
Node version: 18
```

### State Management

Zustand stores for:
- Authentication state
- Group selection
- User preferences
- UI state

---

## 7. Deployment Configuration

### Frontend Deployment (Netlify/Vercel)

#### Netlify Configuration
```toml
[build]
  command = "npm run build -w packages/frontend"
  publish = "packages/frontend/.next"

[functions]
  directory = "packages/frontend/api"
```

#### Environment Variables
- `REACT_APP_API_URL` - Backend API URL
- `NEXT_PUBLIC_*` - Public variables

#### Build Logs
- GitHub Actions automatically deploys on push to main
- Netlify/Vercel webhook integration
- Automatic previews for pull requests

### Backend Deployment

#### Docker Image
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY packages/backend/package*.json ./
RUN npm ci --only=production
COPY packages/backend/dist ./dist
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

#### Hosting Options
- **Railway**: `npm start` (automatic Node.js detection)
- **Render**: Web Service with `npm start`
- **Heroku**: Procfile configured

---

## 8. Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Code review completed
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Security audit completed

### Frontend Deployment

1. Push to GitHub `main` branch
2. GitHub Actions triggers build
3. Netlify/Vercel automatically deploys
4. DNS points to deployment URL

### Backend Deployment

1. Build Docker image
2. Push to container registry
3. Deploy to Railway/Render
4. Update database credentials
5. Run migrations: `npm run migrate:deploy`

### Post-Deployment

- [ ] Health check passed
- [ ] API connectivity verified
- [ ] Frontend loads successfully
- [ ] Authentication working
- [ ] Audit logging active

---

## 9. Project File Structure

```
ubuntu-finance-society/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml              # CI/CD pipeline
│       ├── code-quality.yml       # Code quality checks
│       └── deploy.yml             # Deployment workflow
│
├── packages/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── index.ts           # Server entry point
│   │   │   ├── routes/            # API endpoints
│   │   │   ├── middleware/        # Express middleware
│   │   │   └── utils/             # Utilities
│   │   ├── prisma/
│   │   │   ├── schema.prisma      # Database schema
│   │   │   └── migrations/        # Database migrations
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── Dockerfile
│   │   └── .env.example
│   │
│   └── frontend/
│       ├── src/
│       │   ├── app/               # Next.js App Router
│       │   ├── components/        # React components
│       │   ├── store/             # Zustand state
│       │   ├── lib/               # Utilities
│       │   └── styles/            # Tailwind CSS
│       ├── public/                # Static assets
│       ├── package.json
│       ├── next.config.js
│       ├── tsconfig.json
│       ├── Dockerfile
│       └── netlify.toml           # Netlify config
│
├── docker-compose.yml             # Local development
├── .env.example                   # Environment template
├── .editorconfig                  # Editor configuration
├── .gitignore                     # Git ignore rules
├── LICENSE                        # MIT License
├── README.md                      # Project overview
├── ARCHITECTURE.md                # This file
├── DEVELOPMENT.md                 # Development guide
├── CONTRIBUTING.md                # Contribution guidelines
└── CONFIG.md                      # Configuration guide
```

---

## 10. Quick Start Guide

### Local Development

```bash
# Clone repository
git clone https://github.com/wenkosimthika-create/ubuntu-finance-society.git
cd ubuntu-finance-society

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start with Docker Compose
docker-compose up

# Access:
# Frontend: http://localhost:3000
# API: http://localhost:3001
# Database: localhost:5432
```

### Netlify Deployment

1. **Connect GitHub Repository**
   - Go to app.netlify.com
   - Click "New site from Git"
   - Select GitHub repository
   - Select branch: `main`

2. **Configure Build Settings**
   - Build command: `npm run build -w packages/frontend`
   - Publish directory: `packages/frontend/.next`
   - Node version: 18

3. **Set Environment Variables**
   - In Netlify dashboard → Site settings → Build & deploy → Environment
   - Add: `REACT_APP_API_URL` with backend API URL

4. **Deploy**
   - Netlify automatically builds and deploys
   - Custom domain configuration available

### Backend Deployment (Railway)

1. **Connect GitHub Repository**
   - Go to railway.app
   - Create new project
   - Select GitHub repository

2. **Configure**
   - Add PostgreSQL database
   - Set environment variables
   - Configure root directory: `packages/backend`

3. **Deploy**
   - Railway automatically detects Node.js
   - Builds and deploys automatically
   - Provides public API URL

---

## 11. Monitoring & Maintenance

### Health Checks

```bash
# Frontend health
curl https://your-frontend.netlify.app/api/health

# Backend health
curl https://your-api.railway.app/health
```

### Log Monitoring

- **Frontend**: Netlify deployment logs
- **Backend**: Railway logs
- **Database**: PostgreSQL logs
- **Audit Trail**: Query `AuditLog` table

### Regular Maintenance

- Weekly: Review audit logs
- Monthly: Check security updates
- Quarterly: Database optimization
- Annually: Backup verification

---

## 12. Support & Resources

### Documentation
- **API Documentation**: `packages/backend/API.md`
- **Development Guide**: `DEVELOPMENT.md`
- **Architecture Guide**: `ARCHITECTURE.md`
- **Configuration Guide**: `CONFIG.md`

### GitHub Repository
- URL: https://github.com/wenkosimthika-create/ubuntu-finance-society
- Issues: Bug reports and feature requests
- Discussions: Questions and ideas

### Deployment Providers
- **Frontend**: Netlify (app.netlify.com)
- **Backend**: Railway (railway.app)
- **Database**: PostgreSQL (managed service)

---

## 13. Project Status

### Completed ✅
- [x] Project setup and configuration
- [x] Backend structure (Express.js + TypeScript)
- [x] Frontend structure (Next.js + React)
- [x] Database schema (Prisma + PostgreSQL)
- [x] Docker configuration
- [x] GitHub Actions CI/CD
- [x] API documentation
- [x] Development guide
- [x] Architecture documentation
- [x] Contributing guidelines

### Ready for Phase 1 Development
1. Authentication & User Management
2. Group Creation & Configuration
3. Member Management
4. Contribution Ledger
5. Audit Logging
6. Basic Reporting

---

## Final Summary

**Ubuntu Finance Society** is now ready for deployment and phase 1 development. The project includes:

✅ **Complete Backend**
- Node.js/Express API server
- PostgreSQL database with Prisma ORM
- JWT authentication with RBAC
- Comprehensive audit logging
- API documentation

✅ **Complete Frontend**
- Next.js React application
- Tailwind CSS styling
- Zustand state management
- Netlify deployment ready
- Mobile-first responsive design

✅ **DevOps & Deployment**
- Docker containerization
- GitHub Actions CI/CD
- Netlify frontend deployment
- Railway backend deployment
- Environment configuration

✅ **Documentation**
- Architecture guide
- API documentation
- Development guide
- Configuration guide
- Contributing guidelines

### Next Steps for Production

1. **Frontend (Netlify)**
   - Go to app.netlify.com
   - Connect GitHub repository
   - Configure build settings
   - Set environment variables
   - Deploy

2. **Backend (Railway)**
   - Go to railway.app
   - Connect GitHub repository
   - Add PostgreSQL database
   - Set environment variables
   - Deploy

3. **Database**
   - Configure PostgreSQL connection
   - Run migrations
   - Seed initial data

4. **Configuration**
   - Update API URLs
   - Configure authentication
   - Set up monitoring
   - Configure backups

---

**The group keeps the money. Ubuntu Finance Society keeps the record.** 🚀
