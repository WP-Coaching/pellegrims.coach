# Pellegrims Coach Website

Public website and Payload CMS admin for Ward Pellegrims Coaching, built with Next.js App Router, Payload 3, and SQLite (local or Turso/libSQL).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Payload CMS 3.75 with SQLite adapter
- Tailwind CSS 3
- Playwright end-to-end tests (frontend + admin)

## Features

- Localized site content (`en`, `nl`)
- Payload admin at `/admin`
- Contact submissions stored in Payload (`contact-submissions`)
- Media uploads with local storage or optional S3 storage
- Project and sport category collections managed from Payload
- Redirect and legal page routes

## Requirements

- Node.js 20+
- npm 10+

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create your local env file:

```bash
cp .env.local.example .env.local
```

3. Start development:

```bash
npm run dev
```

4. Open:

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

On first run, Payload seeds initial content via `onInit` (`src/scripts/seed.ts`).

## Environment Variables

Use `.env.local.example` as the source of truth.

### Core

```bash
DATABASE_URI=libsql://your-database-url
DATABASE_AUTH_TOKEN=your-auth-token
PAYLOAD_SECRET=your-random-secret-string
PAYLOAD_ADMIN_EMAIL=admin@example.com
PAYLOAD_ADMIN_PASSWORD=change-me
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Notes:

- If `DATABASE_URI` is unset, development defaults to local SQLite file `./payload-local.db`.
- Test runs use `./e2e-test.db`.

### Email (Production)

```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
CONTACT_EMAIL_DESTINATION=ward@example.com
```

In `development` and `test`, Payload uses its default mock email adapter.

### Optional S3 Media Storage

```bash
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_ENDPOINT=https://s3.your-provider.com
S3_REGION=us-east-1
```

If `S3_BUCKET` is not set, uploads stay on local file storage.

### Optional reCAPTCHA

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

## Scripts

```bash
npm run dev                 # next dev (with predev import-map generation)
npm run build               # payload migrate && next build
npm run start               # next start
npm run lint                # eslint .
npm run format              # prettier --write .
npm run format:check        # prettier --check .

npm run test:e2e            # playwright test
npm run test:e2e:headed     # playwright test --headed
npm run test:e2e:ui         # playwright test --ui

npm run generate:types      # payload generate:types
npm run generate:importmap  # payload generate:importmap
npm run generate:migration  # payload migrate:create
npm run migrate             # payload migrate
npm run seed                # payload run src/scripts/seed.ts
```

## Testing

- Playwright config: `playwright.config.ts`
- Tests run against `http://localhost:3005`
- Test server command resets the test DB before startup:
  - `rm -f e2e-test.db && PORT=3005 PAYLOAD_ENV=test ... npm run dev`
- Test specs live in `tests/frontend` and `tests/admin`

## Project Structure

```text
src/
  app/
    (site)/
      (localized)/[locale]/...      # Localized public pages
      (redirects)/...               # Redirect/legal routes
    (payload)/
      admin/[[...segments]]/page.tsx
      api/[...slug]/route.ts
  collections/                      # Payload collections
  components/                       # UI, sections, templates, views
  lib/                              # i18n, constants, utilities
  migrations/                       # Payload migrations
  scripts/                          # Seed and fixtures
tests/
  frontend/
  admin/
```

## Deployment Notes

- Set all required environment variables in your hosting platform.
- `npm run build` runs Payload migrations before creating the Next.js production build.
- `NEXT_PUBLIC_SERVER_URL` should match the deployed site origin for correct CORS/CSRF origin handling in Payload.

## License

See `LICENSE.txt`.
