# tution-tracker-backend

REST API for Tuition Tracker — authentication, student management, and tuition session tracking. Built with Express 5 + TypeScript + Prisma 6 (PostgreSQL).

## Tech Stack

- **Runtime:** Node.js (ESM, `"type": "module"`)
- **Framework:** Express 5
- **Database:** PostgreSQL via Prisma 6 (`@prisma/client`)
- **Auth:** JWT (`jsonwebtoken`) + `bcrypt` password hashing
- **Docs:** Scalar API reference + `swagger-jsdoc` (OpenAPI 3.1)
- **Dev/build:** `tsx`, `typescript`, `tsc-alias`
- **Misc:** `cors`, `dotenv`, `express-rate-limit`

## Prerequisites

- Node.js 18+ (20+ recommended)
- A PostgreSQL database (e.g. Supabase — needs both a pooled and a direct connection URL)
- `npm`

## Getting Started

```bash
npm install
```

Create a `.env` file in this directory (there is no `.env.example`):

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
JWT_SECRET=your-secret-here
PORT=5000
```

Then sync the database and start the dev server:

```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```

The API listens on `http://localhost:5000` by default.

## Scripts

| Command         | What it does                                      |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Start dev server with hot reload (`tsx watch`)    |
| `npm run build` | Compile TypeScript and resolve `@/*` (`tsc-alias`) |
| `npm start`     | Run the compiled output (`node dist/index.js`)    |

> `npm run build` must run `tsc && tsc-alias` — plain `tsc` output is broken because the `@/*` path alias is only rewritten by `tsc-alias`.

There are no test or lint scripts.

## Environment Variables

| Variable       | Required | Description                                              |
| -------------- | -------- | -------------------------------------------------------- |
| `DATABASE_URL` | Yes      | Pooled Postgres connection URL (used by Prisma at runtime) |
| `DIRECT_URL`   | Yes      | Direct Postgres connection URL (used for migrations)     |
| `JWT_SECRET`   | Yes      | Secret used to sign/verify JWTs                          |
| `PORT`         | No       | Port to listen on (defaults to `5000`)                   |

## API Reference

Interactive docs are served at `GET /reference` (Scalar). The OpenAPI spec lives in `src/docs/openapi.ts` with schemas in `src/docs/schema/` — update them when adding or changing endpoints.

All responses are JSON shaped as `{ success, message?, data? }`. Protected routes require `Authorization: Bearer <token>`.

| Method | Path               | Auth | Description                  | Rate limit |
| ------ | ------------------ | ---- | ---------------------------- | ---------- |
| GET    | `/health`          | No   | Health check                 | None       |
| GET    | `/reference`       | No   | Interactive API docs         | None       |
| POST   | `/auth/register`   | No   | Register (`name, email, password`, min length 8) | 5 / 15 min |
| POST   | `/auth/login`      | No   | Login (`email, password` → JWT) | 5 / 15 min |
| GET    | `/auth/me`         | Yes  | Current user profile         | 5 / 15 min |
| POST   | `/students`        | Yes  | Create student               | 100 / 15 min |
| GET    | `/students`        | Yes  | List own students            | 100 / 15 min |
| GET    | `/students/:id`    | Yes  | Get one student              | 100 / 15 min |
| PATCH  | `/students/:id`    | Yes  | Update student               | 100 / 15 min |
| DELETE | `/students/:id`    | Yes  | Delete student               | 100 / 15 min |
| POST   | `/session`         | Yes  | Create session (`studentId, startTime, notes?`) | 100 / 15 min |
| GET    | `/session`         | Yes  | List own sessions            | 100 / 15 min |
| GET    | `/session/:id`     | Yes  | Get one session              | 100 / 15 min |
| PATCH  | `/session/:id`     | Yes  | Update / complete a session  | 100 / 15 min |
| DELETE | `/session/:id`     | Yes  | Delete session               | 100 / 15 min |

> Note: the session resource is mounted at singular `/session` (see `src/app.ts`), even though the OpenAPI annotations say `/sessions`.

### Key models

- **User** — `id, name, email (unique), password (hashed)`
- **Student** — `studentCode (unique), name, parentName?, phone?, address?, subject, billingType (HOURLY | MONTHLY), rate?, status (ACTIVE | INACTIVE)`, belongs to a `User`
- **Session** — `studentId, startTime, endTime?, duration (minutes)?, notes?, status (ONGOING | COMPLETED | CANCELLED)`, belongs to a `Student` and a `User`

See `prisma/schema.prisma` for the full schema.

## Project Structure

```text
src/
├── index.ts            # Entry: loads dotenv, starts server
├── app.ts              # Express app, route mounting, rate limiters
├── config/env.ts       # Typed env access
├── routes/             # auth.route.ts, student.route.ts, session.route.ts (with @openapi annotations)
├── controllers/        # Thin handlers (asyncHandler wrapper)
├── services/           # Business logic
├── mappers/            # DB ↔ API shape mapping
├── middleware/         # auth (JWT), rate-limit, error, student
├── docs/               # openapi.ts spec + schema/ definitions
├── lib/prisma.ts       # PrismaClient singleton
├── utils/              # helpers (asyncHandler, etc.)
└── types/              # shared TypeScript types
prisma/
├── schema.prisma
└── migrations/
```

Layering convention: `routes/` → `controllers/` → `services/` → `mappers/`.

## Prisma Workflow

```bash
npx prisma migrate dev   # after editing prisma/schema.prisma
npx prisma generate      # after pulling or migrating
```

## Import Convention

TypeScript uses `module: nodenext` with `@/*` mapped to `src/*`. All internal imports must use the `.js` suffix even though sources are `.ts`:

```ts
import app from "@/app.js";
```

## License

ISC
