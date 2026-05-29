-- ────────────────────────────────────────────────────────────────
-- MINI JOB BOARD · DATABASE SCHEMA
-- ────────────────────────────────────────────────────────────────

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PROFILES TABLE ──────────────────────────────────────────────
-- Mirrors auth.users with public fields
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  full_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ── JOBS TABLE ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.jobs (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title        TEXT NOT NULL CHECK (char_length(title) >= 3 AND char_length(title) <= 120),
  company      TEXT NOT NULL CHECK (char_length(company) >= 2 AND char_length(company) <= 80),
  location     TEXT NOT NULL CHECK (char_length(location) >= 2 AND char_length(location) <= 80),
  type         TEXT NOT NULL CHECK (type IN ('Remote', 'On-site', 'Hybrid')),
  description  TEXT NOT NULL CHECK (char_length(description) >= 20 AND char_length(description) <= 5000),
  salary_range TEXT,
  tags         TEXT[] DEFAULT '{}',
  apply_url    TEXT,
  posted_by    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ── FULL TEXT SEARCH INDEX ────────────────────────────────────────
CREATE INDEX IF NOT EXISTS jobs_fts_idx
  ON public.jobs
  USING GIN (to_tsvector('english', title || ' ' || company || ' ' || location || ' ' || description));

CREATE INDEX IF NOT EXISTS jobs_type_idx ON public.jobs (type);
CREATE INDEX IF NOT EXISTS jobs_created_idx ON public.jobs (created_at DESC);
CREATE INDEX IF NOT EXISTS jobs_active_idx ON public.jobs (is_active);

-- ── UPDATED_AT TRIGGER ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ── PROFILE AUTO-CREATE TRIGGER ───────────────────────────────────
-- Automatically creates a profile when a user signs up via OAuth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs     ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own profile
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Jobs: anyone can read active jobs
CREATE POLICY "jobs_select_active"
  ON public.jobs FOR SELECT
  USING (is_active = TRUE);

-- Jobs: authenticated users can insert
CREATE POLICY "jobs_insert_authenticated"
  ON public.jobs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = posted_by);

-- Jobs: only the poster can update their job
CREATE POLICY "jobs_update_own"
  ON public.jobs FOR UPDATE
  USING (auth.uid() = posted_by);

-- Jobs: only the poster can delete their job
CREATE POLICY "jobs_delete_own"
  ON public.jobs FOR DELETE
  USING (auth.uid() = posted_by);

-- ── SEED DATA (demo jobs) ──────────────────────────────────────────
-- These are inserted without a posted_by (NULL = system seed)
INSERT INTO public.jobs (title, company, location, type, description, salary_range, tags, apply_url)
VALUES
  (
    'Senior Frontend Engineer',
    'Stripe',
    'San Francisco, CA',
    'Hybrid',
    'Join our payments infrastructure team to build world-class financial tooling. You will architect scalable React component systems, own the developer dashboard, and collaborate directly with product and design. We care deeply about performance and craft.',
    '$160,000 – $220,000',
    ARRAY['React', 'TypeScript', 'GraphQL', 'Design Systems'],
    'https://stripe.com/jobs'
  ),
  (
    'Full Stack Developer',
    'Vercel',
    'Remote',
    'Remote',
    'Build and maintain the Vercel platform used by millions of developers. Work across Next.js, edge runtime, and our CLI toolchain. You will ship features end-to-end, from API design to UI polish, with a team that moves fast and values quality.',
    '$140,000 – $185,000',
    ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'Rust'],
    'https://vercel.com/careers'
  ),
  (
    'Backend Engineer — Infra',
    'Linear',
    'Remote',
    'Remote',
    'Linear is looking for a backend engineer to help scale our real-time collaboration infrastructure. You will work on WebSocket systems, conflict resolution algorithms, and database performance at scale. We are a small team with enormous impact.',
    '$130,000 – $175,000',
    ARRAY['Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    'https://linear.app/careers'
  ),
  (
    'Product Designer',
    'Figma',
    'New York, NY',
    'On-site',
    'Design the next generation of Figma''s core product experience. You will own end-to-end design for major features, run user research, and work closely with engineering to ship pixel-perfect interfaces. Strong portfolio demonstrating complex system design required.',
    '$145,000 – $195,000',
    ARRAY['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    'https://figma.com/careers'
  ),
  (
    'DevOps Engineer',
    'PlanetScale',
    'Remote',
    'Remote',
    'Help us build and maintain the infrastructure powering the world''s fastest MySQL-compatible database. Work with Kubernetes, Terraform, and Vitess at scale. You will own deployment pipelines, SLOs, and incident response.',
    '$135,000 – $180,000',
    ARRAY['Kubernetes', 'Terraform', 'MySQL', 'Go'],
    'https://planetscale.com/careers'
  ),
  (
    'iOS Engineer',
    'Notion',
    'San Francisco, CA',
    'Hybrid',
    'Build the Notion iOS app used by 30M+ people globally. Own feature development from design handoff to App Store release. Work with Swift, SwiftUI, and our cross-platform sync engine. You will set the bar for mobile product quality.',
    '$150,000 – $200,000',
    ARRAY['Swift', 'SwiftUI', 'iOS', 'Core Data'],
    'https://notion.com/careers'
  );
