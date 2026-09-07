# Ubuntu Finance Society — Project Status

**Status:** Scaffold. Not production-ready.

This file describes what exists in the repository today. Anything not listed under "Implemented" is not built. See `docs/MASTER_PROMPT.md` for the product specification and `docs/DECISIONS.md` for architecture decisions.

> The group keeps the money. Ubuntu Finance Society keeps the record.

## Implemented

- **Prisma schema** (`packages/backend/prisma/schema.prisma`) covering users, roles, groups, membership, constitutions, meetings, resolutions, votes, contributions, withdrawals, expenses, funds, loans, repayments, audit log, deletion log, and an append-only `LedgerEntry` table.
  - All money is integer ZAR cents; interest is integer basis points (ADR-002).
  - No stored balances; balances derive from `LedgerEntry` (ADR-003).
  - Withdrawals and loans are records of offline decisions, never platform-executed payments (ADR-004).
- **Static landing page** in `packages/frontend`.
- **Placeholder API routes** in `packages/backend` for auth and groups. They return `"Coming soon"` and contain no logic.
- **Docker Compose** file for local Postgres.
- **Documentation**: README, ARCHITECTURE, DEVELOPMENT, CONFIG, CONTRIBUTING, NETLIFY_DEPLOYMENT, API. Note that several of these describe planned rather than existing behaviour and will be corrected as features land.

## Not implemented

- Authentication (no JWT, no password hashing, no sessions, no MFA)
- Group creation, joining, invitations, roles
- Constitution builder
- Contribution recording and ledger writes
- Loans, repayments, payouts
- Meetings, polls, resolutions, voting UI
- Announcements / notice board
- Personal command centre
- Reports (monthly / annual)
- Subscription billing
- Stitch webhooks
- Background jobs
- CI/CD workflows (no `.github` directory exists)
- Tests
- Database migrations and seed data

## Roadmap

Ordered by the priority rule in the master prompt (SaaS model → non-FSP compliance → governance → architecture).

1. Migrate the API into the Next.js app (ADR-001) and connect Neon Postgres. Retire `packages/backend` once the schema and reusable logic have moved.
2. Authentication and per-user data scoping.
3. Groups, membership, and invitations.
4. Contributions writing to the ledger; derived balances in the UI.
5. Personal command centre.
6. Governance: constitutions, meetings, resolutions, voting.
7. Reports and exports.
8. Subscription billing.

## Deployment

Target is a single Next.js deployment on Vercel with Neon Postgres (ADR-001). The Netlify and Railway/Render guides in this repo predate that decision and are superseded.
