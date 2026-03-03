# Build Different Framework
Lecture Notes Summary (AI-Native, Production-Grade Building)

> Purpose of this document: capture the lecture’s framework and key concepts as a shared reference.  
> This file summarizes what the lecture taught. It does NOT yet turn it into our sprint roadmap.

---

## Core Thesis
- **Clarity = Speed.**
- AI accelerates whatever system you already have.
  - Weak system → faster chaos
  - Strong system → compounding leverage
- The lecture’s big idea: **front-load thinking and constraints, then use AI to ship inside guardrails.**

---

## The 12 Stages of Production-Grade Building
### 1) Problem Analysis & Clarification
**Goal:** fall in love with the problem before building a solution.

Key prompts:
- Who has the problem?
- Why does it persist?
- What is failing them today?

Output artifacts:
- Problem statement (1 sentence)
- Target user description
- Current workflow and friction points
- Constraints and context (time, money, environment)

---

### 2) The North Star Vision (1-Page Product Manifesto)
**Goal:** create a “compass” so every decision points back to the same success definition.

Includes:
- Elevator pitch (1–2 sentences)
- Core problem solved
- Target audience
- Why it’s unique
- Success metric (what “good” looks like)

Output artifacts:
- 1-page manifesto that can be read aloud to align the team

---

### 3) MVP Feature Definition (User Stories)
**Goal:** define the smallest demoable product through user stories.

User story format:
- As a **[user]**
- I want to **[goal]**
- So I can **[benefit]**

Each story should include:
- Acceptance criteria
- Dependencies
- Constraints
- UX notes

Output artifacts:
- MVP user stories (prioritized)
- Acceptance criteria for each story

---

### 4) Requirements Documentation
**Goal:** where product meets engineering. Convert ideas into buildable specs.

Split requirements into:

**Functional**
- Flows
- APIs
- Data models

**Non-functional**
- Performance
- Scalability
- Security

Output artifacts:
- Requirements list organized by the above categories
- Interfaces and data structures that engineering can implement

---

### 5) Gap Analysis & The Anti-Yesman
**Goal:** stress test the plan before coding.

Anti-Yesman prompt:
- Challenge every assumption in the plan.
- What’s missing, wrong, or risky?

Output artifacts:
- Risk list
- Missing requirements list
- Demo failure points
- Mitigations and simplifications

---

### 6) Choose Your Tools Intentionally (3-Prompt System)
**Goal:** select tools that turn the plan into a product, not tech debt.

The lecture’s 3-step approach:
1. Research
2. Refine
3. Infuse

Toolchain categories to decide intentionally:
- Frontend
- Backend
- AI layer
- Agent framework
- Infrastructure
- DevOps / version control
- UI/UX tools

Output artifacts:
- Tool decisions with rationale (why this tool, what it owns, how it scales)
- Clear boundary lines for responsibilities

---

### 7) Design System
**Goal:** define consistency before building surfaces.

Design system components:
- Typography
- Color palette
- UI components
- Spacing and grid
- Tone and voice
- Iconography
- Constraints
- UX notes

Output artifacts:
- Design tokens and basic UI primitives
- Rules for consistency across pages

---

### 8) Frontend UX + Clickable Prototype
**Goal:** convert concept into a clickable demo flow before deep engineering.

Lecture guidance:
- Pick a generator (examples mentioned: v0.dev, Base44, Lovable, Replit)
- Scaffold like a frontend developer
  - routes, layouts, theming
  - design tokens baked in
- Compose app surfaces
  - examples: Auth, Dashboard, Item Detail, Settings
  - reusable primitives: Buttons, Inputs, Cards, Tables, Modals, Toasts
- Systematize early using the design system
- Wire navigation and state for demo flows
- Ensure production hygiene
  - responsive layout, accessibility (ARIA, focus states), semantic HTML
- Export clean code

Output artifacts:
- Clickable prototype representing the main user flow
- Demo-ready pages and navigation

---

### 9) AI IDE = Production Mode
**Goal:** move from prototype to production workflows with guardrails.

Lecture idea:
- Treat the AI IDE like a lead engineer.
- Set guardrails so edits stay inside standards.

Examples of guardrails mentioned:
- TypeScript strict (or equivalent strictness)
- Linting
- Tests

Output artifacts:
- Repo standards enforced (lint/tests)
- Reviewable, scripted workflow for AI-assisted edits

---

### 10) AI Agents & MCPs
**Goal:** build an “autonomous workforce” that can execute specialized tasks.

Definitions from lecture:
- **AI Agents:** specialized teammates, each trained or configured for a single purpose
- **MCPs:** how agents talk, think, and execute
- **Orchestration layer:** manages multiple agents, priorities, and dependencies

Output artifacts:
- Agent roles and responsibilities
- Communication pattern between agents and systems (backend, DB, APIs)

---

### 11) Roadmap of Epics + TDD (Inside the IDE)
**Goal:** convert PRD into structured work and enforce quality through TDD.

Lecture workflow:
- PRD → Epics → Issues → Assignments (automated)
- Decompose into epics (examples mentioned: Auth, Inventory, Payments, Search, Admin)
- Each epic → user stories → tasks → test matrix
- Auto-create issues in Linear or GitHub Projects via CLI or API
- Bake Definition of Done into each issue

TDD loop:
1. Write test
2. Write minimal code
3. Refactor

Output artifacts:
- Epic breakdown and issue list
- Test matrix aligned to user stories
- Definition of Done attached to each issue

---

### 12) Testing & Refinement
**Goal:** transform testing into a continuous learning loop between users and the AI development stack.

How it works (as taught):
1. User testing: invite early users to explore and try to break things
2. Bug discovery: every interaction, error, delay, edge case is valuable
3. AI feedback records: detailed bug reports (screenshots, steps, behavior)
4. AI fix loop: route records through agents to classify, replicate, patch
5. Continuous deployment: verified fixes merged and redeployed with version tracking

Output artifacts:
- Bug report format and feedback intake process
- Fix loop pipeline (triage → reproduce → patch → verify → deploy)
- Versioning discipline

---

## Framework Recap (Lifecycle)
The lecture’s end-to-end cycle:
- Idea
- Research
- PRD
- Refinement
- Features
- Tools and stack
- Design system
- Roadmap
- TDD framework
- Frontend UX/UI
- Agents and MCPs
- Testing and feedback

---

## Key Terms (Shared Vocabulary)
- **MVP:** minimum viable product, smallest version that proves value
- **PRD:** product requirements document, structured description of what to build and why
- **DoD (Definition of Done):** criteria that must be true before a task is considered complete
- **TDD:** test-driven development, tests first then minimal code then refactor
- **Agent:** an AI configured for a specific purpose, like a specialized teammate
- **MCP:** protocol layer for how agents communicate with tools, systems, and each other
- **Non-functional requirements:** performance, scalability, security constraints that shape the build

---

## What This Framework Optimizes For
- Faster decisions through explicit success metrics
- Less rework through early risk stress testing
- Higher build speed through prototypes and guardrails
- Better quality through TDD and DoD
- Continuous improvement through user feedback loops and automated triage

---