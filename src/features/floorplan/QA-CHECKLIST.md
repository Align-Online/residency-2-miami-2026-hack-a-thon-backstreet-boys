# Manual QA Checklist for Floor Plan Tool Demo

## Demo Flow: New Plan → Template → Assets → Move/Resize → Export PNG

---

## Pre-Demo Setup
- [ ] Browser cache cleared (reload in incognito if needed)
- [ ] Vercel preview URL is live and responds in < 3 sec
- [ ] Test environment has no console errors
- [ ] Screenshot or fallback export file ready as backup

---

## 1) New Plan Creation
**Expected:** User can create a new layout without errors

- [ ] Click "New Plan" button
- [ ] App renders blank canvas with controls
- [ ] No crashes or error messages appear
- [ ] Canvas is responsive and clickable

**Failure mode:** Layout ID not generated, canvas stuck on load

---

## 2) Select "Dock Venue"
**Expected:** Dock background/boundary appears as reference layer

- [ ] "Dock Venue" option appears in venue selector
- [ ] Selecting "Dock" shows floor boundary (non-interactive)
- [ ] Grid or boundary visualization is visible but non-selectable
- [ ] No errors in console

**Failure mode:** Dock doesn't render, venue selector broken

---

## 3) Choose Template ("Banquet 120")
**Expected:** Template loads with pre-populated assets and correct layout

- [ ] "Banquet 120" template loads in < 1 second
- [ ] Stage, bar, AV booth, and 12 tables appear at correct positions
- [ ] Objects are correctly sized and evenly spaced
- [ ] Canvas zooms/pans to show all objects
- [ ] Template name displayed in header/info panel

**Failure mode:** Template loads but objects overlap, off-canvas, or missing

---

## 4) Add Additional Assets (Stage, Bar, AV Booth, Seating)
**Expected:** Palette works and new objects appear on canvas

- [ ] Furniture palette appears (8+ asset types visible)
- [ ] Click "Stage" → Stage object appears at canvas center
- [ ] Click "Bar" → Bar object appears without overlapping existing objects
- [ ] Click "AV Booth" → AV Booth appears
- [ ] Add 3–5 "Chair" objects individually
  - [ ] Each chair has unique ID (shown in inspector if applicable)
  - [ ] Objects stack without errors
- [ ] Canvas auto-scrolls if new objects go off-screen (or warns user)

**Failure mode:** Click doesn't add object, object duplicates, canvas freezes

---

## 5) Drag & Resize Objects
**Expected:** User can move and resize objects freely

- [ ] Click on any object (e.g., a table) → object highlights/selects
- [ ] Drag table across canvas → positions update smoothly
  - [ ] Coordinates reflect new position (visible in inspector if shown)
  - [ ] No lag or stutter
- [ ] Double-click or grab corner → resize handle appears (if supported)
- [ ] Drag resize handle → object grows/shrinks without distortion
- [ ] Undo works (if implemented) or confirm user is aware it's not available

**Failure mode:** Drag doesn't work, object goes off-canvas or freezes, resize breaks proportions

---

## 6) Save Layout (Optional / If Implemented)
**Expected:** Layout persists after save

- [ ] Click "Save" button
- [ ] Success message or ID appears (e.g., "Saved as layout-abc123")
- [ ] Wait 2 seconds
- [ ] Refresh page (Cmd+R / Ctrl+R)
- [ ] Same layout reappears with all objects intact

**Failure mode:** Save silently fails, layout doesn't reload, layout is corrupted

---

## 7) Export to PNG
**Expected:** High-quality PNG export of current layout

- [ ] Click "Export PNG" button
- [ ] Browser triggers download within 3 seconds
- [ ] File is named meaningfully (e.g., `floor-plan-banquet-120.png`)
- [ ] Exported PNG shows:
  - [ ] All objects visible and in correct positions
  - [ ] Dock background (if enabled) shows faintly
  - [ ] Text labels readable
  - [ ] No artifacts, rendering glitches, or missing elements

**Failure mode:** Export button missing/broken, PNG is blank, file size unreasonably large

---

## Post-Export / Demo Closure
- [ ] Share the PNG with hypothetical "event host" (another team member)
- [ ] Close with message: *"This removes back-and-forth on layouts and accelerates large-event deals."*
- [ ] Confirm no follow-up questions or console errors

---

## Common Failure Modes & Quick Fixes

| Issue                       | Check First              | Fix                                    |
| --------------------------- | ------------------------ | -------------------------------------- |
| Objects not appearing       | Developer console errors | Hard refresh, check Palette component  |
| Canvas unresponsive         | Browser tabs hogging RAM | Close other tabs, restart browser      |
| Dock doesn't show           | Venue selector not wired | Verify DockOverlay component imported  |
| Export produces blank image | Canvas z-index issues    | Ensure all objects have z-index layers |
| Save/Load broken            | No Supabase connection   | Check env vars, confirm tables exist   |

---

## Notes for Sales Use

- Keep a **PNG export** from a successful demo as a fallback
- If production has a critical bug, fall back to showing the export + explaining features verbally
- Always demo on **main branch's Vercel preview** (not local)
- Test on both **desktop and tablet** if event host may use mobile

---

## Checklist Sign-Off

| Task                  | Owner       | Status     | Date  |
| --------------------- | ----------- | ---------- | ----- |
| Pre-demo setup        | ___________ | ☐ Complete | _____ |
| Demo run-through      | ___________ | ☐ Complete | _____ |
| Export file ready     | ___________ | ☐ Complete | _____ |
| Backup plan confirmed | ___________ | ☐ Complete | _____ |
