-- Minimal Supabase/Postgres schema for the floor plan tool

-- venues table (could store Dock and others)
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- templates library: predefined layouts that users can start from
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  canvas jsonb NOT NULL,
  objects jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- user-generated layouts
CREATE TABLE IF NOT EXISTS layouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid REFERENCES venues(id) ON DELETE SET NULL,
  template_id uuid REFERENCES templates(id) ON DELETE SET NULL,
  name text,
  canvas jsonb NOT NULL,
  objects jsonb NOT NULL,
  metadata jsonb,
  created_by uuid, -- could reference auth.users
  created_at timestamptz DEFAULT now()
);

-- indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_layouts_venue ON layouts (venue_id);
CREATE INDEX IF NOT EXISTS idx_layouts_template ON layouts (template_id);
