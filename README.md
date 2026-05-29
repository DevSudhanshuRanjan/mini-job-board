# Mini Job Board

A full-stack job listing application built for the FolioCustoms 2026 Intern Assessment.

**Stack:** React + Vite · Node.js + Express · Supabase (PostgreSQL + Google Auth)

---

## Quick Start (3 Steps)

### Prerequisites
- Node.js 18+
- A Supabase project with Google OAuth configured
- npm or yarn

### Step 1 · Clone & Install

```bash
git clone https://github.com/your-username/mini-job-board.git
cd mini-job-board

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Step 2 · Configure Environment Variables

Copy the example env files and fill in your values:

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your Supabase credentials

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your Supabase credentials
```

### Step 3 · Run

In two separate terminals:

```bash
# Terminal 1 — Backend (port 4000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Architecture

```
mini-job-board/
├── frontend/     React + Vite SPA
│   └── src/
│       ├── pages/        Route-level page components
│       ├── components/   Reusable UI, job, auth, layout components
│       ├── hooks/        TanStack Query data-fetching hooks
│       ├── context/      Auth context (Supabase)
│       └── utils/        API client, validators, formatters
└── backend/      Node.js + Express REST API
    └── src/
        ├── routes/       Express route definitions
        ├── controllers/  Business logic
        ├── middleware/    Auth, validation, error handling
        ├── config/       Supabase client, env validation
        └── utils/        Standardized response helpers
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/jobs` | Public | List jobs (filter + search + paginate) |
| GET | `/api/jobs/:id` | Public | Get single job |
| GET | `/api/jobs/mine` | Required | Get current user's jobs |
| POST | `/api/jobs` | Required | Create a new job |
| DELETE | `/api/jobs/:id` | Required (owner) | Soft-delete a job |
| GET | `/health` | Public | Server health check |

## Features

- Browse and filter jobs by Remote / On-site / Hybrid
- Live debounced search across title, company, location, description
- Post jobs with client + server-side validation
- Google OAuth authentication via Supabase
- Paginated results (12 per page)
- Responsive design — works on mobile and desktop
- Shimmer loading skeletons
- Row Level Security — users can only modify their own jobs
- Rate limiting on POST endpoint (10 posts/hour)

## Bonus Features Implemented

- [x] Live search with 380ms debounce
- [x] Deployed: Frontend on Vercel, Backend on Railway
- [x] Google OAuth authentication (Supabase)

## Design System

Notion-inspired editorial aesthetic — clean white canvas with brand navy hero band, signature purple CTA (#5645d4), and pastel-tinted feature cards. Typography: Inter (Notion Sans) across all surfaces. Geometry: 8px-rounded buttons, 12px-rounded cards — sober editorial, not pill-shaped.

## Interview Notes

**Architecture decisions:**
- Separate `frontend/` and `backend/` for clean concerns, independent deployment, and to mirror production monorepos.
- Supabase chosen for zero-infrastructure Postgres + built-in Google OAuth.
- TanStack Query for smart caching and stale-while-revalidate behaviour.
- Backend uses service role key (bypasses RLS) for flexibility while enforcing ownership checks manually in the controller.
- Rate limiting on POST to prevent abuse without requiring a full queue.

**What would break first under load:**
- The `/api/jobs` GET endpoint hitting Supabase directly — would need edge caching (Cloudflare/Vercel Edge) and connection pooling via PgBouncer (Supabase's pooler mode).

**What I would add next:**
- Job edit functionality (PUT /jobs/:id)
- Email notifications on new applications
- Admin moderation dashboard
- Full-text search index tuning for better ranking
