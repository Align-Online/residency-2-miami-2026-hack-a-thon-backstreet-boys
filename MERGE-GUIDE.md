# Merge Guide: Safe Integration to Main (Sprint Lead)

**Role:** Emmanuel (Sprint Lead + Integrator)
**Goal:** Merge all branch PRs to `main` safely, verify demo works, deploy to production.

---

## Overview: Merge Workflow

```
Everyone's Branch → PR → Review → Merge Preview → QA Test → Merge to Main → Deploy
     (Dev)           (Code)    (Code Review)   (on Vercel)  (Live Demo)   (Production)
```

---

## Pre-Merge Checklist (Before Accepting Any PR)

### For Each PR:
- [ ] Branch is up-to-date with `main` (no conflicts)
- [ ] `npm run dev` or `npm run build` succeeds locally
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Changes match the assigned role/task (no scope creep)
- [ ] Code follows existing patterns (no random refactors)

---

## Step 1: Review & Request Changes

### 1a) Vercel Preview Link
Each PR should have a **Vercel preview deployment** auto-generated.

**Where to find it:**
1. Open the PR in GitHub
2. Scroll down to **Deployments** section
3. Click the preview URL link
4. **Test the feature** on the live preview (don't rely on local-only testing)

**What to test on preview:**
- Template Lead: Can I select all 3 templates? Do objects appear?
- Palette: Can I add all 8 assets? Do they place at canvas center?
- Export: Does PNG export work? Is quality good?
- Save/Load: Does save succeed? Can I list and load?

### 1b) Request Changes (if needed)
Comment on the PR with specific issues:
```
❌ Issue: PNG export produces blank image
🔧 Fix: Ensure all objects have z-index layers. See commit abc123 for reference.
📋 Acceptance: Test export on tablet before re-requesting review.
```

### 1c) Approve PR
Once preview tests pass and code looks good:
```
✅ Approved! Ready to merge.
- ✓ Preview tested on desktop + tablet
- ✓ No TypeScript errors
- ✓ Feature works as described in role
```

---

## Step 2: Merge Strategy (Recommended)

### Option A: Squash Merge (Recommended for Clean History)
Combines all commits into one clean commit on `main`.

```bash
# Via GitHub UI:
# 1. Open PR → Click "Squash and merge" dropdown
# 2. Edit commit message to be clear (e.g., "feature: add template picker UI")
# 3. Click "Squash and merge"
```

**Pros:**
- Clean, linear history on `main`
- Easy to revert if needed (one commit = one feature)
- No merge commits cluttering the log

**Cons:**
- Loses individual commit history (not usually a problem for this sprint)

### Option B: Create a Merge Commit (if you want full history)
```bash
# Via GitHub UI:
# Click "Create a merge commit" dropdown
```

**Pros:** Preserves full commit history from the branch

**Cons:** More cluttered git log, harder to bisect

### Option C: Rebase and Merge (Advanced)
```bash
# Via GitHub UI:
# Click "Rebase and merge" dropdown
```

---

## Step 3: Merge Order (Critical!)

**Merge in this order to avoid conflicts:**

1. **Data Lead** (Supabase schema + db.ts)
   - Establishes the data layer that others depend on
   - Command: `Squash and merge`

2. **Vercel / Deploy Lead** (Env vars, build config)
   - Configures the build and deployment
   - Command: `Squash and merge`

3. **Templates Lead** (templates.ts, Palette, CanvasEditor)
   - No dependencies other than data layer
   - Command: `Squash and merge`

4. **Optional:** Manual Integration Branch (if conflicts arise)
   - Cherry-pick fixes if multiple people edited the same file
   - See "Conflict Resolution" section below

---

## Step 4: Local Verification After Each Merge

After merging each PR to `main`, pull and test locally:

```bash
# Pull latest main
git checkout main
git pull origin main

# Install any new deps
cd web
npm install

# Build & test
npm run dev
# Test in browser: http://localhost:3001

# Type check
npx tsc --noEmit
```

**Checkpoints:**
- ✓ No TypeScript errors
- ✓ App starts without crashes
- ✓ Previously merged features still work
- ✓ No regressions

---

## Step 5: Run the Full Demo Flow

After **all PRs are merged** to `main`, run the complete demo script once locally:

```
1. Open http://localhost:3001
2. Select Template (Theater / Banquet / Cocktail)
3. Add 5+ objects from Palette
4. Drag/resize 2-3 objects to show interactivity
5. Click "Export to PNG" → confirm download
6. (Optional) Click "Save Layout" → enter name → confirm ✓
7. (Optional) Click "Load Saved Layouts" → load previous → confirm restore
8. Close with: "This removes back-and-forth and accelerates large-event deals."
```

**Expected Results:**
- [ ] Template loads in < 2 sec
- [ ] All 8 palette assets appear and add to canvas
- [ ] Drag/resize is smooth (no lag)
- [ ] PNG exports with all objects visible (high quality)
- [ ] Save/load works (if implemented)
- [ ] No console errors (open DevTools → Console)

**If anything fails:** do NOT proceed to production. Revert the last merge and fix.

---

## Step 6: Conflict Resolution

If you encounter merge conflicts:

### Conflict Example:
```
<<<<<<< HEAD (main)
const color = "#FF6B6B";  // Emmanuel's version
=======
const color = "#FF8C42";  // incoming PR branch
>>>>>>> feature-branch
```

### Resolution Steps:
1. **Identify the conflict** (GitHub shows conflicting files)
2. **Understand the intent:**
   - Ask the PR author: "Are both changes needed?"
   - If they're independent, keep both
   - If one is a refactor, keep the newest
3. **Edit locally and resolve:**
   ```bash
   git checkout --theirs src/features/floorplan/templates.ts  # use PR version
   # OR
   git checkout --ours src/features/floorplan/templates.ts    # use main version
   # OR manually edit and choose the correct code

   git add src/features/floorplan/templates.ts
   git commit -m "resolve: merge conflict in templates"
   git push origin main
   ```

---

## Step 7: Deploy to Production (Vercel)

Once `main` is stable and demo passes:

### 7a) Trigger Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) dashboard
2. Click your project (floor-plan-tool or similar)
3. Go to **Deployments**
4. Click "Deploy" → select `main` branch
5. **Confirm production env vars are set:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY`
6. Click "Deploy"
7. Wait ~2 min for build
8. Once complete, test the production URL

### 7b) Test on Production
- [ ] Open production URL in browser
- [ ] Run the demo flow (template → add assets → export)
- [ ] Verify all objects render correctly
- [ ] Check console for errors in DevTools
- [ ] If Save/Load is implemented, test one save + load cycle

### 7c) Rollback Plan (if production breaks)
```bash
# Revert the last commit
git revert HEAD
git push origin main

# Vercel auto-detects and redeploys main
# (Usually within 1-2 minutes)
```

---

## Step 8: Final Handoff & Documentation

After successful production deployment:

### Update README
```bash
# Edit web/README.md or root README.md
```

Add:
```markdown
## Deployment Status
- **Demo:** ✅ Complete (all features working)
- **Production URL:** https://your-vercel-url.vercel.app
- **Last Deployed:** March 3, 2026 at 2:45 PM ET

## Features Implemented
- ✅ Template picker (3 templates)
- ✅ Canvas editor with drag/resize
- ✅ Furniture palette (8 assets)
- ✅ Export to PNG
- ✅ Save/Load with Supabase (optional)

## How to Run Locally
1. Clone repo: `git clone ...`
2. Install deps: `npm install` (root and web/)
3. Setup env vars: create `web/.env.local` with Supabase keys
4. Start server: `cd web && npm run dev`
5. Open http://localhost:3001
```

### Team Communication
Send a Slack/email to the team:
```
🎉 Floor Plan Tool is LIVE!

Production URL: [link]

Features deployed:
✅ Template selection (Theater, Banquet, Cocktail)
✅ Drag/drop canvas editor
✅ Export floor plans as PNG
✅ Save & load layouts (with Supabase)

Next steps:
- Sales team: Start testing on 3 large events
- Product: Gather feedback on UX/speed
- Engineering: Monitor Vercel logs for errors

Thanks to the team for the sprint effort! 🚀
```

---

## Safe Merge Checklist (Final)

Before clicking "Merge" on any PR:

- [ ] **Code Review**: Feature matches role description, no scope creep
- [ ] **Preview Test**: Tested on Vercel preview link (desktop + tablet if possible)
- [ ] **Build**: No errors running `npm run dev` or `npm run build`
- [ ] **TypeScript**: No errors on `npx tsc --noEmit`
- [ ] **No Conflicts**: Branch is up-to-date with main, no merge conflicts
- [ ] **Merge Strategy**: Squash merge (recommended) to keep history clean
- [ ] **Local Verification**: After merge, pull main and verify app still runs

---

## CI/CD Best Practices (If You Add Them Later)

For future sprints, automate these checks:

```yaml
# .github/workflows/test.yml (Example)
name: Test & Build
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npx tsc --noEmit
      - run: npm run build
```

This auto-runs tests on every PR and blocks merge if tests fail.

---

## Summary: Merge Timeline

```
Time          Action                          Owner
────────────────────────────────────────────────────────
11:30 AM      PRs open from all teams         Everyone
11:45 AM      Data Lead PR review             Emmanuel
12:00 PM      Data + Deploy lead merge        Emmanuel
12:15 PM      Templates PR review             Emmanuel
12:30 PM      All PRs merged to main          Emmanuel
12:45 PM      Full demo flow test (local)     Emmanuel
 1:00 PM      Deploy to production (Vercel)   Emmanuel
 1:15 PM      Production testing              Emmanuel + team
 2:00 PM      Rehearse presentation           Emmanuel
 2:45 PM      Live demo for stakeholders      Emmanuel
```

---

## If Something Goes Wrong During Demo

**Live Demo Crashes?**
1. Stay calm, acknowledge issue to audience
2. Say: "Let me reload that..." (reload page, try again)
3. If still broken, fall back to pre-recorded PNG export:
   - Show the export image on a slide
   - Describe what users can do: "This tool lets your team move furniture in real-time, see exact positions, and share with vendors instantly."
4. Emphasize: "The output (PNG) is rock-solid. The tool's UI is intuitive."

**Backup Plan:**
- Keep a screenshot of a completed floor plan (Template: Banquet, 12 tables, stage, bars)
- Have the PNG export ready to show
- Practice the verbal demo (can describe the tool without running it)

---

## Final Notes

- **Trust your team.** Each role owner is responsible for their piece.
- **Review, don't block.** Ask for changes if needed, but don't nitpick style.
- **Test, don't assume.** Always verify on the preview link before merge.
- **Simple merges.** Use squash merge to keep history clean.
- **Document handoff.** Update README so the next team can maintain it.

Good luck with the sprint! 🚀
