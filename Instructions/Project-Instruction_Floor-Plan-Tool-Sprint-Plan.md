```markdown
# LAB Miami Floor Plan Tool Sprint Plan (11:00a–3:00p ET)
Polish + Templates + Dock + Furniture (V0 → Vercel → Supabase)

> Goal today: turn the existing “vibe-coded” floor plan app into a **trustworthy internal sales tool** for larger-budget events, with a clean demo and a clear story.

---

## 0) TL;DR
We are **not** rebuilding the app.
We are **productizing** what exists by:

1) Fixing the few bugs that break the demo  
2) Adding **Templates** (standard layouts)  
3) Adding **Dock floor plan + Furniture assets**  
4) Adding a simple **Share/Export** flow  
5) Packaging it into a clean **demo + presentation**

---

## 1) North Star (What success looks like at 3:00p)
**A sales rep can:**
1. Open the tool
2. Choose a standard template (Theater / Banquet / Cocktail at minimum)
3. Add or adjust key furniture and include the DOCK overlay
4. Save and reload reliably (or at minimum: export/share)
5. Present a clean floor plan artifact to an event host

If the above works, we win.

---

## 2) Definition of Done (MVP)
### Must-have
- ✅ **Happy path works end-to-end** with no crashes:
  - New plan → choose template → add 5+ assets → move/resize → save → reload OR export
- ✅ **Template library exists** (3 templates minimum)
- ✅ **Furniture palette exists** (small, consistent set)
- ✅ **Dock floor plan added** (overlay/background/asset)
- ✅ **Export or Share**:
  - Download PNG at minimum
  - Share link is stretch

### Nice-to-have (Stretch)
- Auto-generated template thumbnails
- Snap-to-grid + alignment helpers
- Role-based save spaces (team layouts library)
- Beehiiv-style clean “proposal export” PDF

---

## 3) Project System (Pipeline View)
This tool is a sales artifact generator:

**Templates** → **Customize** → **Save / Export** → **Share with host**

The user experience must feel:
- predictable
- consistent
- professional

---

## 4) Risks (Anti-Yesman Checklist)
We will actively prevent:
- Scope creep (“Let’s add everything”)
- Fragile canvas bugs
- Broken save/load or inconsistent coordinates
- Asset inconsistency (sizes, scaling, unclear icons)
- Demo failure without a fallback

**Fallback plan:** If save/load is shaky, export PNG is required and becomes the primary output.

---

## 5) “Today’s Demo Script” (Write this early)
We will demo the same flow every time:

1) Select “Dock Venue”  
2) Choose template “Banquet 120”  
3) Add: stage, bar, AV booth, 10 tables (or a subset), seating  
4) Drag a few items to show it’s editable  
5) Export PNG  
6) Close with: “This removes back-and-forth and accelerates large-event deals.”

---

## 6) Timeboxed Sprint Blocks (It is ~11:00a now)
### 11:00–11:20 (20 min) — Lock MVP + Identify Demo Killers
Deliverables:
- Write the demo flow (above) in 5 bullets
- List the **top 3 bugs** that would break the demo
- Decide on output format (PNG export minimum)

### 11:20–12:05 (45 min) — Stabilize the Happy Path
Deliverables:
- Fix only the bugs that break:
  - creating a plan
  - selecting template
  - placing/moving assets
  - export/save
- Add lightweight runtime checks (logging + guards)

### 12:05–12:45 (40 min) — Templates (Core Feature)
Deliverables:
- Create 3 templates:
  - Theater
  - Banquet
  - Cocktail / Standing
- Each template has:
  - a name
  - default set of objects
  - consistent scale and spacing
- Template selection UI exists (even simple list)

### 12:45–1:25 (40 min) — Dock + Furniture Asset Palette
Deliverables:
- Dock floor plan asset added (background overlay or locked layer)
- Furniture palette includes a small set:
  - round table, rectangular table
  - chair
  - stage
  - bar
  - AV booth
  - dance floor (optional)
- Assets have consistent sizing rules (documented)

### 1:25–2:05 (40 min) — Save/Load OR Export/Share Hardening
Minimum acceptable:
- Download PNG works reliably every time

If time permits:
- Save layout to Supabase and reload without distortion

### 2:05–2:35 (30 min) — Polish + UX Reliability Pass
Deliverables:
- Add guardrails:
  - snapping (if quick)
  - grid (if quick)
  - undo (only if already easy)
- Visual cleanup:
  - consistent icons
  - clear labels
  - remove confusing controls

### 2:35–3:00 (25 min) — Presentation + Final Demo Rehearsal
Deliverables:
- 5-slide deck:
  1. Problem (large events need clarity)
  2. Why current process fails (manual + miscommunication)
  3. Solution (templates + dock + assets + export)
  4. Architecture (V0/Vercel/Supabase + canvas)
  5. Next steps (library, analytics, collaboration)
- Rehearse the demo twice
- Prepare fallback output file(s) if live demo fails

---

## 7) Engineering Guardrails (How we work with AI today)
We will use AI to accelerate, not to wander.

### Do
- Ask for targeted patches: “Fix this bug in this component”
- Ask for refactors with constraints: “Do not change behavior, only stabilize state”
- Ask for a template schema and consistent asset modeling
- Ask for tests: “Write a small set of regression checks for save/export”

### Don’t
- Ask AI to “rebuild the whole app”
- Switch stacks mid-sprint
- Accept large diffs without review
- Add features not tied to the demo flow

### Copy integrity rule
No “magic” features.
If we claim “save/load,” it must work.
Otherwise we demo “export/share” honestly.

---

## 8) Data Model (Conceptual)
We need a stable model for layouts.

A “Layout” should contain:
- venue_id (Dock or other)
- template_id (optional)
- canvas settings (width, height, scale)
- objects[]:
  - id
  - type (table, chair, stage, etc.)
  - position (x, y)
  - size (w, h)
  - rotation
  - style (optional)
- metadata:
  - created_by
  - created_at
  - notes

This can live in Supabase or be kept local for MVP.

---

## 9) Export/Share Options (Pick one minimum)
### Minimum: Export PNG
- Button: “Export as PNG”
- File naming convention: `dock_banquet_YYYYMMDD.png`

### Stretch: Share Link
- Save layout to Supabase
- Generate share URL with layout ID

---

## 10) Setup Notes (Immediate Next Step)
Right now, we are in setup mode:
- Confirm Vercel deployment link
- Confirm Supabase keys and tables
- Confirm local dev run steps
- Identify where templates + assets live in the codebase

**Action:** within the next 10 minutes, write down:
- the live URL
- the repo branch
- how to run locally
- where the floor plan canvas component is

---

## 11) Notes on Files

---
```
