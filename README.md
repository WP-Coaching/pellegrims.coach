# Ward Pellegrims Coaching Website

This is Ward Pellegrims' coaching website built with [Next.js](https://nextjs.org) and Tailwind CSS. The site has been modernized from static HTML to a modern React application.

## Features

- **Modern React/Next.js Architecture**: Component-based structure with TypeScript
- **Tailwind CSS Styling**: Utility-first CSS framework for consistent styling
- **Responsive Design**: Mobile-first approach with responsive navigation
- **Internationalization**: Support for English and Dutch languages
- **Contact Form**: Server-side processing with PayloadCMS & SMTP
- **Modern Deployment**: Optimized for modern hosting platforms

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/[locale]/page.tsx`. The page auto-updates as you edit the file.

## Environment Variables

The application supports optional environment variables for enhanced functionality:

### Database & PayloadCMS

To enable the backend and contact form, set these variables:

```bash
# Database (Turso or Local)
# Leave empty to use local file: ./payload-local.db
DATABASE_URI=libsql://...
DATABASE_AUTH_TOKEN=...

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_USER=user@example.com
SMTP_PASS=password

# Payload Security
PAYLOAD_SECRET=your-secret-key-here
```

### reCAPTCHA (Optional)

To enable reCAPTCHA spam protection on the contact form:

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### Media Storage (Optional)

Uploads use local file storage by default. To store media in S3 (or S3-compatible)
set these variables:

```bash
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_ENDPOINT=https://s3.your-provider.com
```

### Setup

1. Create a `.env.local` file in the root directory
2. Add your environment variables
3. Restart the development server

**Note:** The application will work without these variables, but the contact form will be disabled.

## Development Commands

```bash
# Development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# E2E Testing (builds first, then runs tests)
npm run test:e2e

# E2E Testing with browser UI
npm run test:e2e:headed

# E2E Testing with Playwright UI
npm run test:e2e:ui
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add the same variables from your `.env.local` file:
     - `DATABASE_URI`
     - `DATABASE_AUTH_TOKEN`
     - `SMTP_HOST`
     - `SMTP_USER`
     - `SMTP_PASS`
     - `PAYLOAD_SECRET`
     - `S3_BUCKET` (optional)
     - `S3_ACCESS_KEY_ID` (optional)
     - `S3_SECRET_ACCESS_KEY` (optional)
     - `S3_REGION` (optional)
     - `S3_ENDPOINT` (optional)
     - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (optional)
3. Vercel will automatically build and deploy

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

This Next.js application can be deployed to any modern hosting platform that supports Node.js applications.

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── [locale]/       # Internationalized routes
│   │   ├── layout.tsx  # Locale-specific layout
│   │   └── page.tsx    # Locale-specific pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Root page (redirects to locale)
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── About.tsx       # About section
│   ├── Coaching.tsx    # Coaching services
│   ├── Projects.tsx    # Projects showcase
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── context/           # React contexts
│   └── TranslationContext.tsx  # i18n context
├── lib/               # Utilities and configurations
│   ├── i18n.ts        # Internationalization utilities
│   └── translations/  # Translation files
│       ├── en.ts      # English translations
│       ├── nl.ts      # Dutch translations
│       └── index.ts   # Translation helpers
└── globals.css        # Global styles
```

## Key Technologies

- **Next.js 15**: React framework with App Router and Turbopack
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **PayloadCMS**: Headless CMS for backend & database
- **Turso (LibSQL)**: Edge-ready SQLite database
- **React Icons**: Comprehensive icon library
- **Playwright**: End-to-end testing framework
- **Custom i18n**: Internationalization with English/Dutch support

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
