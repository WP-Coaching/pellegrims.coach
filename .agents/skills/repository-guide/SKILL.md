---
name: repository-guide
description: Comprehensive guide for the pellegrims.coach repository. Use this to orient yourself in the codebase, understand the tech stack (Next.js, Payload CMS), check coding standards, find build/test commands, and review project architecture.
---

# Repository Guidelines

## Project Structure & Module Organization

- **Tech Stack**: Next.js 15, Payload CMS 3.0, React 19, Tailwind CSS.
- **Source**: `src/` directory.
  - `src/app/(site)/`: Public website pages (App Router).
  - `src/app/(payload)/`: Payload CMS admin and API routes.
  - `src/collections/`: Payload CMS collection definitions (`Users`, `ContactSubmissions`).
  - `src/components/`: React components. `PayloadBranding.tsx` contains custom CMS branding.
  - `src/lib/`: Utilities, including `translations/` and `i18n`.
  - `src/context/`: Client-side contexts (e.g., `TranslationContext`).
  - `src/scripts/`: Database seeding and maintenance scripts.
  - `src/globals.css`: Global styles and Tailwind directives.
  - `src/payload.config.ts`: Main Payload CMS configuration.
- **Assets**: Public assets in `public/`.
- **Tests**: End-to-end tests in `tests/` using Playwright.

## Build, Test, and Development Commands

```bash
# Development server with Turbopack & Payload CMS
# Starts Next.js and Payload at http://localhost:3000
npm run dev

# Production build
# Runs payload migrate && next build
npm run build

# Production server
npm start

# Payload CMS Commands
npm run generate:types      # Generate TypeScript types from Payload config
npm run generate:migration  # Create a new migration based on schema changes
npm run migrate             # Run pending migrations
npm run seed                # Seed the database with initial data

# Linting & Formatting
npm run lint           # ESLint
npm run format         # Prettier write
npm run format:check   # Prettier check

# E2E Testing
npm run test:e2e          # Run all tests headless
npm run test:e2e:headed   # Run tests with browser window
npm run test:e2e:ui       # Open Playwright UI mode
```

## Coding Style & Naming Conventions

- **Language**: TypeScript (strict). Import via path alias `@/*` (see `tsconfig.json`).
- **CMS Integration**:
  - Define collections in `src/collections/`.
  - Run `npm run generate:types` after modifying collections to update `payload-types.ts`.
  - Use generated types for type-safe CMS interactions.
- **Linting**: ESLint with `next/core-web-vitals` and TypeScript rules. Fix issues before PRs.
- **Indentation**: 2 spaces.
- **Components**: PascalCase files in `src/components`.
- **Hooks**: Prefix with `use`.

## Testing Guidelines

- **Framework**: Playwright (`@playwright/test`). Tests live in `tests/*.spec.ts`.
- **Strategy**:
  - Integration tests for standard user flows.
  - Verify CMS content rendering where applicable.
- **Execution**: Run `npm run test:e2e` locally before pushing.

## Project Architecture

Ward Pellegrims' coaching website, built with Next.js 15 and Payload CMS 3.0.

### Payload CMS Integration

- **Role**: Headless CMS for managing content and form submissions.
- **Database**: SQLite (via `@libsql/client` and `@payloadcms/db-sqlite`).
- **Admin UI**: Accessible at `/admin` (locally).
- **Collections**:
  - `Users`: Admin access and authentication.
  - `ContactSubmissions`: Stores messages labeled as 'contact_request' or 'discovery_call'.
- **Authentication**: Native Payload auth.
- **Database Changes**: Follow the **Expand and Contract** pattern to avoid breaking changes in production.
  1.  **Expand**: Add new columns/tables. Deploy.
  2.  **Migrate**: Backfill data.
  3.  **Contract**: Remove old columns/tables (after code stops using them).

### Internationalization System

- Dual i18n approach: static generation + client-side switching.
- Translations in `src/lib/translations/` (JSON/TS).
- Helper: `getTranslations()` for server-side.
- Context: `TranslationContext.tsx` for client-side state.
- supported locales: `en` (default), `nl`.

### Deployment Configuration

- **Platform**: Vercel.
- **Build**: Static/Dynamic hybrid (Next.js).
- **Env Vars**: Managed in Vercel. Sensitive keys (DB_URI, PAYLOAD_SECRET) must be set.

### Key Technical Details

- **App Router**: Uses Route Groups `(site)` and `(payload)` to separate concerns.
- **React 19**: Uses latest React features.
- **Email**: Nodemailer adapter for sending emails (e.g. from contact forms).

## Security & Configuration Tips

- **Secrets**: Never commit `.env` or `.env.local`.
- **Payload Secret**: Ensure `PAYLOAD_SECRET` is strong in production.
- **Database**: `DATABASE_URI` should be secured.
