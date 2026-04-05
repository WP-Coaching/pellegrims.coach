# AGENTS.md

## Purpose

This file defines how coding agents should work in this repository.

Primary goals:

- keep changes safe and easy to review
- preserve production behavior unless explicitly requested
- ship complete, tested changes (not partial edits)

---

## Tech Stack Snapshot

- Next.js App Router (`src/app`)
- Payload CMS v3 (`src/app/(payload)`, `src/collections`)
- TypeScript + React 19
- Tailwind CSS + Prettier + ESLint
- Playwright E2E test suite

---

## Repository Layout

Main source code is under `src/`.

- `src/app/(site)/`: public-facing routes, including localized pages.
- `src/app/(payload)/`: Payload admin UI, API routes, and CMS integration points.
- `src/collections/`: Payload collection configs, access rules, hooks, fields.
- `src/components/`: reusable UI, sections, templates, and layout components.
- `src/lib/`: shared helpers (i18n, constants, utils, data helpers).
- `src/migrations/`: Payload DB migrations.
- `src/scripts/`: operational scripts (including seed scripts).
- `tests/`: Playwright E2E tests (`tests/frontend`, `tests/admin`).
- `public/`: static files.

---

## Core Commands

### Development

- `npm install`
- `npm run dev` (runs Payload import map generation before Next dev server)

### Build & Run

- `npm run build` (runs migrations, then production build)
- `npm start`

### Quality

- `npm run lint`
- `npm run format`
- `npm run format:check`

### Testing

- `npm run test:e2e`
- `npm run test:e2e:headed`
- `npm run test:e2e:ui`

### Payload Schema & Data

- `npm run generate:types`
- `npm run generate:importmap`
- `npm run generate:migration`
- `npm run migrate`
- `npm run seed`

---

## Working Agreement for Agents

### 1) Understand Before Editing

- Read the target files and adjacent modules first.
- Trace imports/usages before changing component or schema contracts.
- Match existing patterns in the edited area unless there is a clear reason not to.

### 2) Keep Changes Focused

- Make the smallest coherent change that solves the request fully.
- Avoid drive-by refactors in unrelated files.
- Do not rename/move files unless it materially improves the result.

### 3) Validate Locally

Run the narrowest useful checks first, then broader checks when appropriate.

Minimum expectations:

- for code changes: `npm run lint`
- for formatting-sensitive edits: `npm run format:check`
- for user-flow or admin-impacting edits: relevant Playwright tests

### 4) Schema Changes Require Extra Care

If you change anything in `src/collections` or other Payload schema/config:

- generate migration (`npm run generate:migration`)
- regenerate types (`npm run generate:types`)
- verify migration safety (no destructive behavior unless explicitly requested)
- mention migration implications in your final summary

### 5) E2E Expectations

- E2E tests run against a dedicated production build on port `3005`.
- Keep tests deterministic and isolated.
- For frontend behavior changes, prefer updating/adding feature-oriented specs.

---

## Code Style Conventions

- TypeScript-first; use `@/*` alias for internal imports when appropriate.
- Do not hand-format style details. Run Prettier and follow its output.
- Naming:
  - React component files: PascalCase
  - hooks: `use-*.ts` or `use*.ts`
  - tests: `*.spec.ts` with feature-centric names

---

## Next.js + Payload Guardrails

- Prefer Server Components by default; only use Client Components when needed.
- Keep server-only logic out of client bundles.
- Do not expose secrets or private keys to client-side code.
- Preserve i18n and localized routing behavior in `src/app/(site)`.
- For Payload access/auth changes, ensure deny-by-default assumptions still hold.

---

## Security & Config

- Never commit secrets. Use `.env.local` for local development.
- Typical sensitive values:
  - `PAYLOAD_SECRET`
  - database credentials
  - SMTP credentials
  - S3 credentials
  - reCAPTCHA keys
- Avoid logging sensitive fields in API routes, hooks, or scripts.

---

## PR & Commit Guidance

### Commits

- Always use Conventional Commit format (e.g. `fix: ...`, `feat: ...`, `refactor: ...`, `chore: ...`).

### Pull Requests

Include:

- what changed and why, in client-friendly language
- linked issue (if applicable)
- screenshots for UI/admin visual changes
- explicit notes for migrations, env vars, or manual rollout steps
- a clear "How to test in preview" checklist describing exactly what the client should validate

---

## Agent Handoff Checklist

Before handing work back, confirm:

- code compiles and lint/format checks pass (or explain why not run)
- tests relevant to the change were run (or explain why not run)
- migrations/types are generated when schema changed
- no secrets were introduced
- summary clearly lists changed files, behavior impact, and any follow-up actions
