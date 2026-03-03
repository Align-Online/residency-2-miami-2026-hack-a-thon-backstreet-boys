# Floor Plan Tool — Sales Presentation (5-Slide Deck)

*Use these slides to pitch the tool to event hosts and internal stakeholders.*

---

## Slide 1: Problem
### **Event Planning is Chaotic**

**Visual:** Show a chaotic email thread or messy spreadsheet (optional photo)

**Talking points:**
- Large-budget events (100–500+ guests) require **precise layouts** to:
  - Maximize guest experience (sightlines, flow, comfort)
  - Optimize vendor logistics (bars, AV, kitchen access)
  - Reduce setup surprises and cost overruns
- Current process: event hosts and venue teams exchange **rough sketches, Excel spreadsheets, and conflicting PDFs**
- Real cost: **back-and-forth delays = missed deadlines and frustrated clients**

**Close:** *"There's got to be a better way."*

---

## Slide 2: Why the Current Process Fails
### **Manual Floor Plans Don't Scale**

**Visual:** Timeline showing typical vendor → event host feedback loop (3–7 days)

**Talking points:**
- Events with **5+ vendor types** (catering, AV, florist, lighting) each have layout constraints
- Each change requires:
  - Manual re-drawing (Visio, AI, pen-and-paper)
  - Multi-email approval cycles
  - Risk of **coordinate mismatches** (10ft table becomes 8ft in the final plan)
- Scope creep: *"Can we fit one more lounge area? How much space do we have left?"*
  - Answer: "Let me send you a new sketch and get back to you Monday" ❌

**Close:** *"We need a tool that lets event hosts **visualize and iterate in real time**."*

---

## Slide 3: Our Solution
### **The Floor Plan Tool**

**Visual:** Live demo or screenshot showing:
- Template selection (Theater, Banquet, Cocktail)
- Drag-and-drop furniture placement
- Export-to-PDF capability
- Shared layout link (optional)

**Talking points:**
- **Choose a template** in 10 seconds (e.g., "Banquet for 120")
- **Customize in minutes**:
  - Drag tables, chairs, stage, bars, AV booths
  - See the DOCK venue boundaries overlaid
  - Snap-to-grid (coming soon) for pixel-perfect layouts
- **Export a professional PDF / PNG** to share with vendors
  - No ambiguity: "Here's the exact floor plan"
- **Optional: Save & reload** shared layouts (if Supabase is live)

**Close:** *"This removes the back-and-forth and accelerates large-event deals."*

---

## Slide 4: Architecture & Reliability
### **Built for Sales Teams**

**Visual:** Simple tech stack diagram:
```
React/Canvas
    ↓
Next.js (Vercel deployment)
    ↓
Supabase (persistent storage)
```

**Talking points:**
- Deployed on **Vercel** for 99.9% uptime and instant updates
- **Canvas-based rendering** (not slow PDFs) = instant visual feedback
- Layouts stored in **Supabase** (encrypted, backed up, recoverable)
- Mobile-friendly: demo on tablet to event hosts on-site
- Version control included: "See what changed between Draft 1 and Draft 2"

**Close:** *"Reliable enough for your biggest clients."*

---

## Slide 5: Next Steps & Vision
### **Rolling Out to Event Sales**

**Visual:** Roadmap showing:
- ✅ Core feature (today)
- 🚀 Upcoming features (Q2/Q3)

**Talking points:**

**Available now:**
- Template library (Theater, Banquet, Cocktail)
- Drag-and-drop editing
- PNG/PDF export

**Coming soon (Q2):**
- Snap-to-grid + alignment guides
- Automatic capacity calculator ("10 tables + 40 chairs = X max guests")
- Vendor-specific asset library (catering, AV, florist presets)
- Shared team layouts (access controls)

**Down the road (Q3+):**
- 3D visualization
- Real-time collaboration (live editing)
- Analytics: track which layouts convert fastest
- Mobile app for on-site edits

**Call-to-action:**
- **For sales team:** "Start using this tool on 3 large events this month. Report back on time saved and client feedback."
- **For event hosts:** "Send us your guest list and budget; we'll send you a floor plan mockup before our first call."

---

## Presenter Notes

### **Timing**
- Slides 1–2: ~2 min (problem)
- Slide 3: ~3–5 min (LIVE DEMO; pre-record if nervous)
- Slide 4: ~1 min (credibility)
- Slide 5: ~2 min (close + next steps)
- **Total:** ~10 min + Q&A

### **Demo Script (Slide 3)**
1. Show blank canvas → "Start with a template"
2. Click "Banquet 120" → template loads with stage, bar, 12 tables, AV booth
3. Drag a table → "Move furniture in real time, no waiting"
4. Add a chair → "Fine-tune seating"
5. Export PNG → "Download to share with vendors"
6. **Close:** *"No more email chains. Precise planning in minutes."*

### **Backup Plan**
- If the app crashes: show a pre-exported PNG and describe what the user would do
- Emphasize: *"The output is rock-solid; the tool is intuitive."*

---

## Key Messaging
- **Speed:** 10 minutes vs. 3 days
- **Accuracy:** pixel-perfect coordinates for vendors
- **Simplicity:** no Visio/CAD training needed
- **Professionalism:** polished PNG/PDF ready for client presentations

---

## Questions You Might Get

| Q                                                 | A                                                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Can I edit this on my phone?**                  | Yes, the web app is responsive. You can drag furniture on phone/tablet, though desktop is more comfortable for detailed work. |
| **What if I mess up the layout?**                 | Easy—undo (Ctrl+Z) or reload the last saved version. No harm done.                                                            |
| **Does this integrate with our catering system?** | Not yet, but we're building vendor-specific templates. You can at least send them a clear PNG of table positions.             |
| **How much does this cost?**                      | It's an internal tool; no per-event charge. We're rolling it out to all sales teams.                                          |
| **Can I share this with my event host?**          | Absolutely. Export PNG or PDF and email it. (Shared live links coming Q2.)                                                    |

