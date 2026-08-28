# CivicPulse

Full-stack civic issue reporting platform: Next.js frontend + Express/Prisma/PostgreSQL backend.

## Run the application

Terminal 1 — database:

```bash
docker compose up -d database
```

Terminal 2 — backend:

```bash
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Terminal 3 — frontend:

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. The frontend will send reports to `http://localhost:4000/api/v1`.

## Backend layout

- `backend/prisma/schema.prisma` — PostgreSQL domain model
- `backend/src/routes` — HTTP routes only
- `backend/src/controllers` — request/response handling
- `backend/src/services` — civic-issue business logic and responsible AI adapter
- `backend/src/validators` — Zod request validation
- `backend/src/middleware` — CORS, request IDs, uploads, and error responses

## API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Backend health check |
| `POST` | `/api/v1/uploads` | Upload a JPEG, PNG, or WebP (5 MB max) |
| `GET` | `/api/v1/issues` | List issues; supports category, status, minSeverity, page, limit |
| `POST` | `/api/v1/issues` | Create an issue and preliminary AI-assisted assessment |
| `GET` | `/api/v1/issues/:publicId` | Get issue, lifecycle, reports, and resolution |
| `PATCH` | `/api/v1/issues/:publicId` | Assign a team and/or update status |
| `POST` | `/api/v1/issues/:publicId/resolution` | Record resolution evidence |

The AI service is intentionally an adapter and labels its output as preliminary estimates. It must be replaced with an evaluated model and human review workflow before production use.
