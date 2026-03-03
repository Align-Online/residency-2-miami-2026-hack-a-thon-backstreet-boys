# TEAM ROLES + BRANCH SYNC (Floor Plan Tool Sprint)
**Project:** LAB Miami Floor Plan Tool (V0 + Vercel + Supabase)  
**Sprint Window:** ~11:00a–3:00p ET  
**Goal:** Polish internal sales tool with Templates + Dock + Furniture + Export/Share (MVP)

---

## 1) North Star (Read This First)
By 3:00p, a sales rep can:
1) Open the tool  
2) Choose a standard template (Theater / Banquet / Cocktail)  
3) Add or adjust Dock + key furniture assets  
4) Export a clean PNG (minimum) and optionally Save/Load  
5) Present a professional floor plan artifact to an event host

**If the demo flow is reliable, we win.**

---

## 2) Roles (Everyone’s Mission + Deliverables)
### A) Emmanuel — Sprint Lead + Integrator (Main Branch Owner)
**Mission:** keep scope tight, integrate PRs, protect demo flow.

**Owns:**
- MVP scope + Definition of Done
- Integration + merges into `main`
- Demo script + presentation narrative
- Final stability check + fallback plan

**Deliverables by 2:45p:**
- Live demo flow works twice in a row
- Slides ready (5 slides)
- README quickstart updated

---

### B) Vercel / Deploy Lead
**Mission:** ensure the app deploys reliably from GitHub and everyone has preview links.

**Owns:**
- Vercel project setup + GitHub connection
- Preview deployments for PRs
- Env vars in Vercel (Supabase keys, public vars)
- Confirm live URL + backup plan

**Deliverables by 11:30a:**
- Vercel project connected
- `main` deploy succeeds
- PRs create preview deploys

---

### C) Supabase / Data Lead
**Mission:** enable persistence (Save/Load), or declare the fastest fallback early.

**Owns:**
- Supabase project setup
- Minimal tables/schema (layouts/templates)
- API access pattern (client vs server)
- Confirm one write + one read works

**Deliverables by 11:30a:**
- Supabase project created
- Keys stored safely (no secrets committed)
- Minimal schema plan drafted (even if not yet deployed)

**Important:** If Save/Load becomes risky, escalate immediately.
Our MVP can still win with Export PNG.

---

### D) Templates + Assets + QA + Slides Support (Polish Lead)
**Mission:** make it look professional and demo-ready.

**Owns:**
- 3 templates defined and implemented (minimum)
- Furniture palette assets + consistent sizing
- Dock overlay integration (asset + behavior)
- Manual QA checklist for demo flow
- Slides skeleton (support Emmanuel)

**Deliverables by 11:30a:**
- Template list finalized (names + contents)
- Furniture list finalized (first 8 assets)
- Dock overlay spec decided (background layer vs locked object)

---

## 3) “What to Work On” (Concrete Tasks)
### Vercel / Deploy Lead tasks
- Connect GitHub repo → Vercel project
- Set env vars
- Confirm `main` builds
- Confirm preview deploys appear on PRs
- Post the live URL in team chat

### Supabase / Data Lead tasks
- Create project
- Draft schema:
  - `layouts` table (id, name, venue_id, objects_json, created_at)
  - optional `templates` table (id, name, objects_json)
- Confirm one layout can be inserted and fetched
- Share connection details securely

### Templates / Assets / QA tasks
- Implement template picker UI
- Add initial templates (3)
- Add furniture palette
- Add Dock overlay as background / locked layer
- Write manual QA checklist (demo flow)

---

## 4) Agentic Coding: Starter Prompts (Use These)
Use short, precise prompts. Always include: **file path + desired behavior + constraints**.

### For Vercel / Deploy Lead
**Prompt 1**
> We have a Next.js app deployed on Vercel. Give me the exact steps to connect a GitHub repo to Vercel, enable preview deployments for PRs, and set environment variables safely. Assume we use Supabase. Keep it short and actionable.

**Prompt 2**
> Here is our build error output: [paste]. Diagnose the likely cause in a Vercel Next.js deploy and list the top 3 fixes in priority order.

### For Supabase / Data Lead
**Prompt 1**
> Design the minimal Supabase schema for a floor plan tool: layouts (objects on canvas), templates, and venues. Output SQL + recommended indexes. Objects can be stored as JSON. Keep it MVP-only.

**Prompt 2**
> Given this TypeScript Layout type: [paste], write Supabase client functions: createLayout, getLayoutById, updateLayout. Include error handling.

### For Templates / Assets / QA Lead
**Prompt 1**
> We need 3 floor plan templates (Theater, Banquet, Cocktail). Propose object lists for each using a consistent coordinate system and sizing rules. Output JSON arrays of objects with x,y,w,h,rotation,type.

**Prompt 2**
> Implement a furniture palette UI for a canvas editor in Next.js. Requirements: click an asset to add it to the canvas center, draggable, resizable, consistent sizing defaults. Minimize code churn.

**Prompt 3**
> Create a manual QA checklist for our demo flow: new plan → template → add assets → move/resize → export PNG → (optional) save/load. Include expected results and common failure modes.

---

## 5) Branch Workflow Rules (So We Don’t Break Main)
1) Only **Emmanuel merges to `main`**.
2) Everyone else works in a branch and opens a PR.
3) Each PR should be small and focused.
4) Share the Vercel preview link in chat for review.

---

## 6) How To Sync Your Branch With Main (Easiest Methods)
If you don’t have the new folders/files yet, you must bring in Emmanuel’s latest `main`.

### Option A (recommended): merge `main` into your branch
From your branch:
```bash
git checkout your-branch
git fetch origin
git merge origin/main
# resolve conflicts if any
git push