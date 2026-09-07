# Architecture Decisions

These decisions supplement `MASTER_PROMPT.md`. Where the two disagree, this file wins because it records choices made after the prompt was written.

## ADR-001: Single Next.js application deployed on Vercel

**Status:** Accepted

**Context:** The repo was scaffolded as a monorepo with a separate Express backend (`packages/backend`) and Next.js frontend (`packages/frontend`). Vercel cannot host a long-running Express server, and this project deploys to Vercel.

**Decision:** The API moves into the Next.js app as Route Handlers and Server Actions. Prisma is called from the server side of Next.js. The Express package is retired once its schema and any reusable logic have been migrated. Redis/BullMQ from the master prompt is deferred; scheduled work uses Vercel Cron.

**Consequences:** One deployable, one preview URL, no CORS layer. The `src/app.js` folder structure in the master prompt is superseded by the Next.js App Router layout.

## ADR-002: Money is stored as integer minor units

**Status:** Accepted

**Context:** The original schema used `Float` for every monetary column. The master prompt forbids floating-point money.

**Decision:** All monetary columns are `Int` and named `*Cents` (ZAR cents). Interest rates are stored as integer basis points (`interestRateBps`, 1 bps = 0.01%). Formatting to Rands happens only at the presentation layer.

## ADR-003: Balances are derived, never stored

**Status:** Accepted

**Context:** `Fund.currentAmount` stored a running balance, which drifts from the underlying records and violates the master prompt's ledger rules.

**Decision:** An append-only `LedgerEntry` table is the single source of truth. Every contribution, expense, loan disbursement, repayment, and payout record produces exactly one ledger entry. Corrections are new reversing entries that reference the original. Balances are computed by summing ledger entries. `Fund.currentAmount` is removed.

## ADR-004: Record-keeping only, never fund movement

**Status:** Accepted

**Context:** The platform is not a Financial Services Provider and must not hold, move, or instruct movement of member funds.

**Decision:** `Withdrawal` and `Loan` models record decisions the group has already made offline. No status or field on any model implies that the platform executed a payment. Any future UI copy that suggests the platform pays out, lends, or invests must be flagged **LEGAL REVIEW REQUIRED** before shipping.

## ADR-005: Documentation must reflect actual code

**Status:** Accepted

**Context:** `PROJECT_COMPLETION.md` described a finished product while the codebase contained placeholder routes.

**Decision:** Status documents only claim what is implemented and verifiable in the repository. Planned work lives under a "Roadmap" heading, never under "Complete".
