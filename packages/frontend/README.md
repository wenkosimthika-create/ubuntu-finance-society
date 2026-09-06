# Ubuntu Finance Society - Frontend

Next.js/React frontend for Ubuntu Finance Society.

## Setup

```bash
npm install
cp .env.example .env.local
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

```bash
npm test
```

## Build

```bash
npm run build
npm run start
```

## Architecture

- **Framework**: Next.js 14
- **UI Library**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Authentication**: NextAuth.js

## Design System

### Colors
- **Primary**: Deep Forest Green (#1B5E20)
- **Secondary**: Warm Sand (#D4A373)
- **Accent**: Copper (#B87333)
- **Background**: White

### Mobile-First
Designed and tested from 320px mobile up.

## Key Principles

- The group keeps the money
- Ubuntu Finance Society keeps the record
- Every feature reinforces this principle
- Compliance banner visible on all screens
