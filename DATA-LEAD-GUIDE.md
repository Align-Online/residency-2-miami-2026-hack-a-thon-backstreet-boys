# Data Lead: Save/Load Integration (Step-by-Step)

## Overview
Enable persistent storage of floor plans so users can save layouts and reload them later.

**What you're building:**
- Save layout to Supabase when user clicks "Save"
- Fetch layout by ID when user opens a saved plan
- Load list of user's saved layouts

---

## Step 1: Create a Supabase Project

### 1a) Sign up / create project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (or email)
4. Create a new project:
   - **Name:** `floorplan-tool` (or any name)
   - **Region:** Choose closest to you (e.g., us-east-1)
   - Set a strong database password (you'll need it)
5. Wait ~1 minute for project to initialize

### 1b) Collect your keys
Once project is created, go to **Settings → API** and copy:
- **Project URL** (at the top) → save as `NEXT_PUBLIC_SUPABASE_URL`
- **Publishable key** (under "Your new API keys are here") → save as `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- **Secret key** (under "Secret keys") → save as `SUPABASE_SECRET_KEY` (keep private, server-side only)

Note: Supabase recently updated from "anon/service_role" to "publishable/secret" keys. Use the new keys below.

---

## Step 2: Run the SQL Schema

### 2a) Open SQL Editor
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Script** → **New blank query**

### 2b) Copy and run the schema
Copy this entire SQL and paste into the editor:

```sql
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
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

-- indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_layouts_venue ON layouts (venue_id);
CREATE INDEX IF NOT EXISTS idx_layouts_template ON layouts (template_id);

-- Insert a default venue (Dock)
INSERT INTO venues (slug, name) VALUES ('dock', 'The DOCK')
ON CONFLICT DO NOTHING;
```

3. Click **Run** (or Cmd+Enter)
4. Wait for success message ✓

---

## Step 3: Configure Environment Variables

### 3a) Add to `.env.local` (local development)
Create a `.env.local` file in the `web/` folder:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_oZIxOA6Z-BhyrFJK17Y8KA_DJ7EwAwK
SUPABASE_SECRET_KEY=sb_secret_HMtnU••••••••••••••••
```

Replace the values with the **actual keys** from your Supabase Settings → API page.

**Example (from your settings):**
- `NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co` (find under "Project URL")
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_oZIxOA6Z-BhyrFJK17Y8KA_DJ7EwAwK` (your Publishable key)
- `SUPABASE_SECRET_KEY=sb_secret_HMtnU••••••••••••••••` (your Secret key - full value visible only once)

### 3b) Restart dev server
```bash
cd web
# Stop any running dev server (Ctrl+C)
npm run dev
```

---

## Step 4: Update `db.ts` (Client-Safe Version)

Replace the current `src/features/floorplan/db.ts` with this secure version:

```typescript
import { createClient } from "@supabase/supabase-js";
import type { Layout } from "./types";

// Use publishable key for client-side reads/writes
// For admin operations (deletes, batch updates), use server-side API routes with secret key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// create a new layout record
export async function createLayout(layout: Layout) {
  const { data, error } = await supabase
    .from("layouts")
    .insert([layout])
    .select();

  if (error) {
    console.error("createLayout error", error);
    throw error;
  }
  return data?.[0] as Layout | undefined;
}

// fetch layout by id
export async function getLayoutById(id: string): Promise<Layout | null> {
  const { data, error } = await supabase
    .from("layouts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getLayoutById error", error);
    return null;
  }
  return (data as Layout) || null;
}

// fetch all layouts for current user (optional: requires auth)
export async function listLayouts(): Promise<Layout[]> {
  const { data, error } = await supabase
    .from("layouts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("listLayouts error", error);
    return [];
  }
  return (data as Layout[]) || [];
}

// update an existing layout
export async function updateLayout(id: string, partial: Partial<Layout>) {
  const { data, error } = await supabase
    .from("layouts")
    .update(partial)
    .eq("id", id)
    .select();

  if (error) {
    console.error("updateLayout error", error);
    throw error;
  }
  return data as Layout[] | undefined;
}
```

---

## Step 5: Create a Save/Load UI Component

Create `web/app/components/SaveLoadPanel.tsx`:

```typescript
"use client";

import React, { useState } from "react";
import { createLayout, updateLayout, listLayouts, getLayoutById } from "@/../../src/features/floorplan/db";
import type { Layout } from "@/../../src/features/floorplan/types";

interface SaveLoadPanelProps {
  layout: Layout;
  onLoad: (layout: Layout) => void;
}

export const SaveLoadPanel: React.FC<SaveLoadPanelProps> = ({ layout, onLoad }) => {
  const [layoutName, setLayoutName] = useState(layout.metadata?.notes || "My Floor Plan");
  const [savedLayouts, setSavedLayouts] = useState<Layout[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLoadMenu, setShowLoadMenu] = useState(false);
  const [message, setMessage] = useState("");

  // Save current layout
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      const layoutToSave = {
        ...layout,
        name: layoutName,
        metadata: {
          ...layout.metadata,
          notes: layoutName,
          createdAt: layout.metadata.createdAt, // preserve original creation time
        },
      };

      // If layout already has an ID, update it; otherwise create new
      let result;
      if (layout.id && layout.id.startsWith("layout-")) {
        result = await updateLayout(layout.id, layoutToSave);
      } else {
        result = await createLayout(layoutToSave);
      }

      setMessage(`✓ Saved as "${layoutName}"`);
    } catch (err) {
      setMessage(`✗ Save failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  // Load saved layouts
  const handleShowLoadMenu = async () => {
    setLoading(true);
    try {
      const layouts = await listLayouts();
      setSavedLayouts(layouts);
      setShowLoadMenu(true);
    } catch (err) {
      setMessage(`✗ Failed to load layouts: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  // Load a specific layout
  const handleLoadLayout = async (id: string) => {
    setLoading(true);
    try {
      const loaded = await getLayoutById(id);
      if (loaded) {
        onLoad(loaded);
        setShowLoadMenu(false);
        setMessage(`✓ Loaded "${loaded.name || "Layout"}"`);
      }
    } catch (err) {
      setMessage(`✗ Load failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded mb-4">
      <h3 className="text-lg font-semibold mb-4">Save / Load Layout</h3>

      {/* Save section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Layout Name
        </label>
        <input
          type="text"
          value={layoutName}
          onChange={(e) => setLayoutName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-700"
          placeholder="My Floor Plan"
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Layout"}
        </button>
      </div>

      {/* Load section */}
      <div>
        <button
          onClick={handleShowLoadMenu}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load Saved Layouts"}
        </button>

        {showLoadMenu && savedLayouts.length > 0 && (
          <div className="mt-4 border border-gray-300 rounded p-3 bg-gray-50 max-h-48 overflow-y-auto">
            {savedLayouts.map((saved) => (
              <div key={saved.id} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
                <div className="text-sm font-medium text-gray-800">{saved.name || "Unnamed"}</div>
                <div className="text-xs text-gray-500">
                  {new Date(saved.metadata.createdAt).toLocaleString()}
                </div>
                <button
                  onClick={() => handleLoadLayout(saved.id)}
                  className="mt-1 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Load
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status message */}
      {message && (
        <div className="mt-4 text-sm p-2 bg-gray-100 border border-gray-300 rounded text-gray-700">
          {message}
        </div>
      )}
    </div>
  );
};
```

---

## Step 6: Wire SaveLoadPanel into the App

Update `web/app/page.tsx` to include the save/load panel:

```tsx
// Add this import at the top
import { SaveLoadPanel } from "./components/SaveLoadPanel";

// Inside the editor section (after PaletteBar), add:
<SaveLoadPanel layout={currentLayout} onLoad={handleSelectTemplate} />
```

---

## Step 7: Test Save/Load

### 7a) Open the app
```bash
# Make sure dev server is running
cd web
npm run dev
# Open http://localhost:3001
```

### 7b) Test flow
1. **Save a layout:**
   - Select a template
   - Add 2-3 objects
   - Enter a name (e.g., "Test Banquet")
   - Click "Save Layout"
   - Confirm ✓ message

2. **Verify in Supabase:**
   - Go to Supabase dashboard → **Table Editor**
   - Click `layouts` table
   - You should see your saved layout in the rows

3. **Load a layout:**
   - Click "Load Saved Layouts"
   - See your saved layout listed
   - Click "Load" to restore it
   - Verify objects and position are correct

4. **Update a layout:**
   - Load a saved layout
   - Move/add objects
   - Change the title
   - Click "Save Layout" again
   - Confirm it overwrites the previous version

---

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
cd web
npm install @supabase/supabase-js
```

### "NEXT_PUBLIC_SUPABASE_URL is empty"
- Check `.env.local` exists in `web/` folder
- Verify exact key names (no typos)
- Restart dev server after adding env vars

### "Error: relation 'layouts' doesn't exist"
- Go back to Supabase SQL editor
- Re-run the schema SQL (Step 2)
- Confirm "Query executed successfully"

### "403 Forbidden" on save
- Check publishable key is correct (copy from Supabase Settings → API)
- In Supabase → **Authentication → Policies**, confirm default policies allow inserts (or create custom RLS policies)
- For now, disable RLS if just testing:
  - Go to **Tables** (left sidebar) → right-click `layouts` table → **Disable RLS**

### Data not appearing in table
- Check console for error messages (open browser DevTools → Console)
- Verify layout object matches the schema (canvas and objects must be jsonb)
- Try manually inserting a test row in Supabase to confirm table is writable

---

## Optional: Role-Based Access (Advanced)

If you want only the current user to see their layouts:

1. Enable Supabase Auth in your app
2. Update schema to add `created_by` trigger:

```sql
-- Set created_by to current user
ALTER TABLE layouts ADD CONSTRAINT created_by_not_null CHECK (created_by IS NOT NULL);

-- Create a trigger to auto-populate created_by
CREATE OR REPLACE FUNCTION set_created_by()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_created_by_trigger
  BEFORE INSERT ON layouts
  FOR EACH ROW
  EXECUTE FUNCTION set_created_by();
```

3. Implement Supabase Auth in your Next.js app (see `@supabase/auth-helpers-nextjs`)

---

## Summary Checklist
- [ ] Create Supabase project and collect API keys
- [ ] Run SQL schema in Supabase SQL editor
- [ ] Add `.env.local` with Supabase keys in `web/` folder
- [ ] Update `src/features/floorplan/db.ts` with anon key version
- [ ] Create `SaveLoadPanel.tsx` component
- [ ] Wire `SaveLoadPanel` into `web/app/page.tsx`
- [ ] Test save/load flow end-to-end
- [ ] Verify data appears in Supabase **Table Editor**
- [ ] Test load across browser refreshes

---

## Next: For Your Team
- Share the **Supabase project URL** + **API keys** with Deploy Lead (for Vercel env vars)
- Confirm save/load works in dev before handoff to Deploy Lead
- Document any custom RLS policies if implemented
