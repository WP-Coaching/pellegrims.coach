# Repository Guidelines

## Project Structure & Module Organization

This repo is a Next.js App Router site with Payload CMS. Main source lives in `src/`.

- `src/app/(site)/`: public pages and localized routes.
- `src/app/(payload)/`: Payload admin UI and API routes.
- `src/collections/`: Payload collections and auth models.
- `src/components/`: UI, layout, sections, and page templates.
- `src/lib/`: shared utilities, i18n helpers, constants, and data access.
- `src/migrations/`: Payload database migrations.
- `src/scripts/`: maintenance and seed scripts.
- `tests/`: Playwright coverage for frontend and admin flows.
- `public/`: static assets.

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npm run dev`: start local development on `localhost:3000`; runs Payload import map generation first.
- `npm run build`: run Payload migrations, then create the production build.
- `npm start`: serve the production build.
- `npm run lint`: run ESLint.
- `npm run format` / `npm run format:check`: apply or verify Prettier formatting.
- `npm run test:e2e`: run Playwright tests.
- `npm run test:e2e:headed` / `npm run test:e2e:ui`: debug E2E tests interactively.
- `npm run generate:types`, `npm run generate:migration`, `npm run migrate`, `npm run seed`: maintain Payload schema and content data.

## Coding Style & Naming Conventions

Use TypeScript with the `@/*` path alias. Prettier enforces 2-space indentation, semicolons, double quotes, trailing commas (`es5`), and Tailwind class sorting. Use PascalCase for React component files, `use-*.ts` or `use*.ts` for hooks, and keep collection definitions in `src/collections/`. After schema changes, run `npm run generate:types`.

## Testing Guidelines

E2E tests use Playwright and live in `tests/**/*.spec.ts`. Prefer feature-oriented names such as `contact.spec.ts` or `projects.spec.ts`. The Playwright config starts a dedicated app instance on port `3005` with test env vars; keep tests isolated and safe against a fresh local DB. Run `npm run test:e2e` before opening a PR.

## Commit & Pull Request Guidelines

Recent history mixes short imperative subjects with Conventional Commit prefixes, for example `refactor: remove hardcoded...`, `chore: add skills`, and `Revalidate localized homepages`. Prefer concise, imperative subjects; use prefixes when they add clarity. PRs should include a clear summary, linked issue when relevant, screenshots for UI/admin changes, and notes about migrations or env var changes.

## Security & Configuration Tips

Keep secrets in `.env.local` or Vercel project settings, never in git. Key vars include `PAYLOAD_SECRET`, database credentials, SMTP settings, optional S3 config, and reCAPTCHA keys. Review migrations carefully and avoid destructive schema changes without a safe rollout plan.
