# Production Person App

Week 3 deliverable app built with Next.js App Router, Prisma, and TypeScript.

## Features

- Full CRUD for person records (create, read, update, delete)
- Route handlers under `app/api/persons` and `app/api/persons/[id]`
- Prisma schema and migration for `Person`
- Seed script with sample data for testing
- Responsive UI for desktop and mobile
- Required documentation pages:
	- `/about`
	- `/github`
	- `/database`

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma ORM
- SQLite (local development)
- Tailwind CSS 4

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment

```bash
cp .env.example .env
```

If `.env.example` is not present, create `.env` with:

```bash
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_GITHUB_URL="https://github.com/your-username/your-public-repo"
```

3. Generate Prisma client, apply migration, and seed sample data

```bash
npm run db:generate
npm run db:migrate -- --name init_person_model
npm run db:seed
```

4. Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - lint checks
- `npm run db:generate` - generate Prisma client
- `npm run db:migrate` - apply Prisma migrations
- `npm run db:seed` - seed sample data
- `npm run db:studio` - open Prisma Studio

## API Endpoints

- `GET /api/persons` - list all people
- `POST /api/persons` - create a person
- `GET /api/persons/[id]` - fetch one person
- `PUT /api/persons/[id]` - update one person
- `DELETE /api/persons/[id]` - delete one person

## Week 3 Submission Checklist

- Deploy to Vercel and submit one production URL
- Ensure all CRUD operations succeed in production
- Set `NEXT_PUBLIC_GITHUB_URL` to your real public repository
- Ensure `/about`, `/github`, and `/database` routes are available
- Ensure sample data exists in the deployed database

## Deployment Note

SQLite is used for local development. For a stable Vercel production deployment with persistent write support, use a hosted production database and matching Prisma provider configuration.
