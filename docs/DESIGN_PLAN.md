# Gritio — Design Simplification Plan

## Phase 0 — New User Onboarding (do this first)

A new user who lands on "Today" with no data has no idea they need to set up Life Goals before anything makes sense. The hierarchy is invisible. This phase fixes that before anything else.

### What changes

**1. "Get started" nav item appears at the top of the sidebar for new users**
- Sits above everything else under a "Setup" section label
- Shows a progress badge: `1/4`, `2/4` etc.
- Disappears entirely once all 4 steps are complete and the normal nav takes over

**2. Other nav items are visually dimmed until relevant**
- "This week" and "Today" are greyed out until at least one task exists
- Prevents users landing on empty pages with no guidance

**3. The Get Started page has two parts:**

**A — The hierarchy chain** (visual, at the top):
```
[ ♥ Life goals ]  →  [ ◎ Yearly goals ]  →  [ 📅 Weekly tasks ]  →  [ ☀ Today ]
   Your why           What this year         How to get there        Log & track
```
- Current step highlighted in brown
- Completed steps shown in green with a checkmark
- Future steps greyed out

**B — The step checklist** (below the chain):
- Step 1: Define your life goals — CTA: "Set life goals"
- Step 2: Create a yearly goal (linked to a life goal) — CTA: "Create yearly goal"
- Step 3: Add a weekly task — CTA: "Add a task"
- Step 4: Start logging on Today — CTA: "Go to Today"
- Each step only becomes active after the previous one is complete
- Each step has a one-line description explaining WHY it matters

### Sidebar order for new users
```
SETUP
  Get started  [1/4]     ← highlighted, takes them to onboarding page

GOALS
  Life goals             ← unlocked first
  Yearly goals           ← dimmed until life goal exists

DAILY
  This week              ← dimmed until a task exists
  Today                  ← dimmed until a task exists

──────
  Todos                  ← always available (unrelated)
```

### Sidebar order for returning users (setup complete)
```
DAILY
  Today
  This week

GOALS
  Yearly goals
  Life goals

──────
  Todos
```

### Implementation notes
- Store onboarding state in user profile (e.g. `onboardingStep: 0–4`)
- `onboardingStep` increments automatically when each entity is created
- At `onboardingStep === 4`, hide "Get started" from nav permanently
- The chain diagram and step checklist live in a single new component: `OnboardingPage`

---

## Mental Model (the north star)

The app follows a clear hierarchy:

```
Life Goals  →  Yearly Goals  →  Monthly targets  →  Weekly tasks  →  Today
   (why)         (what)           (milestones)        (logging)       (action)
```

Every design decision should reinforce this hierarchy. Month is not a separate destination — it's a drill-down within Year. Life Goals are context for Yearly Goals, not a separate workflow.

---

## 1. Navigation Restructure

### Current (problems)
```
Goals | Weekly Check-in | Task Timeline | Today Tasks | Todos | Profile
```
- Flat — no sense of hierarchy or daily workflow
- "Weekly Check-in" and "Today Tasks" are peers of "Goals" even though they're sub-views
- "Task Timeline" is a useful overview but doesn't need prime nav real estate

### Proposed
```
Today          ← what do I do right now?
This Week      ← active logging, week at a glance
Goals          ← yearly goals with monthly breakdown (Life Goal shown as context)
───────────    ← divider
Todos          ← separate, unrelated bucket
───────────
Profile / Logout
```

### Implementation notes
- Rename `Weekly Check-in` → `This Week` (nav label + page title must match)
- Rename `Today Tasks` → `Today`
- Remove `Task Timeline` from sidebar — fold it into Goals page as a secondary view or kill it
- Life Goals: remove from sidebar, show life goal name as a small label on each yearly goal card
- Goal Hierarchy: move behind a button on the Goals page (e.g. a "view hierarchy" icon), not a main tab
- Sidebar sections use small uppercase labels: **DAILY**, **GOALS**, **OTHER**
- Count badges on Goals and Todos show live counts
- Active item: white/semi-transparent background, brown icon tint
- User avatar + name at bottom, Settings · Logout inline

---

## 2. Background / Global

### Problem
The right side of every page has a visible spotted gradient texture that competes with the content area.

### Fix
- Reduce the decorative background texture opacity to near zero, or replace with a flat warm off-white (`#f7f3ef`)
- Content cards should be white (`#ffffff`) with a subtle `0.5px` border
- The sidebar keeps its dark brown (`#3d2210`) background — that's working well

---

## 3. Today Page

### Current problems
- Shows "0 Tasks / Completed 0 / In Progress 0" stat card — noisy for what it communicates
- Daily tasks (e.g. Daily Steps) do NOT appear here even though they are daily tasks — confusing
- Empty state says "Great! You've completed all your daily tasks" when there are no tasks at all

### Proposed layout

```
Good morning, Sharath                    [date]
───────────────────────────────────────────────
Week so far: ○ ○ ○ ● ○ ○ ○   0/7 days logged
───────────────────────────────────────────────

TASKS TO LOG TODAY
┌──────────────────────────────────────────────┐
│  [icon]  Daily Steps              [⋯]        │
│          Target: 10,000 steps                │
│          [  0   ] steps today                │
└──────────────────────────────────────────────┘
```

### Changes
- Replace the 3-column stat card with a compact "Week so far" dot row (7 dots, filled = logged)
- Daily recurring tasks MUST appear here — this is the primary place to log daily values
- Greeting: "Good morning / afternoon / evening, [name]" based on time of day
- Task card shows: icon, task name, target, inline input field for logging
- After logging, the input turns into a completion indicator (green checkmark or filled dot)
- Empty state (no tasks): "No tasks yet — create a goal and add tasks to get started" with a CTA

---

## 4. This Week Page

### Current problems
- Task name column is narrow; edit/delete icons sit below the row and are easy to miss
- The 0% circle on the far left is small and easy to overlook
- The blue/teal progress bar in the weekly view is inconsistent with the brown brand colour
- "10000K daily" text is truncated-looking ("K" is unusual — should be "10,000 steps")

### Proposed layout

```
This Week                        [← May 25–31 →]     [+ Add task]
──────────────────────────────────────────────────────────────────
               Mon   Tue   Wed   Thu   Fri   Sat   Sun
               25    26    27    28    29    30    31
──────────────────────────────────────────────────────────────────
┌─────────────────────────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┐
│ Daily Steps             │ [0]  │ [0]  │ [0]  │ [0]  │ [0]  │ [0]  │ [0] │
│ 10,000 steps · daily    │steps │steps │steps │steps │steps │steps │steps│
│ ████░░░░░░░ 0%    [⋯]  │      │      │      │      │      │      │     │
└─────────────────────────┴──────┴──────┴──────┴──────┴──────┴──────┴─────┘
```

### Changes
- Task info column: name (bold) + target + horizontal progress bar + percentage + `⋯` menu
- Edit / Delete move into the `⋯` overflow menu — no more exposed icons
- Today's column: tinted background (`#fff8f3`) + brown border on input
- Progress bar colour: brown (`#805232`), not the current teal/blue
- Format numbers consistently: "10,000 steps" not "10000K daily"
- Week navigation (← →) top right, always visible

---

## 5. Goals Page (Yearly + Life + Monthly)

### Current problems
- Three large stat cards with identical bullseye icons — same icon for all three is redundant
- Goal row has 4 exposed action icons (+, ⚡, ✏️, 🗑) — too many, purpose of ⚡ unclear
- "No Life Goal" text reads like a system error, not useful UI
- Monthly tiles: horizontal scroll (6 visible at a time) makes it impossible to see the full year
- Progress bar is teal/blue — inconsistent with brand
- "Goal Hierarchy" and "Life Goals" as primary tabs add navigation weight

### Proposed layout

```
Yearly Goals          1 goal · 0 on track · 100% avg    [+ Add goal]
──────────────────────────────────────────────────────────────────────
┌─────────────────────────────────────────────────────────────────────┐
│ ∨  Reach target weight                    94.5 kg → 90 kg    [⋯]   │
│    ↑ Health and Wellness                  ████░░░░░░░░  0 kg logged │
│    [Health] [Behind]                                                 │
│                                                                      │
│  Jan   Feb   Mar   Apr  [May]  Jun   Jul   Aug   Sep   Oct   Nov  Dec│
│   –     –     –     –    0     –     –     –     –     –     –    –  │
│  92.5  92.5  92.5  92.5 92.5  92.5  91.5  91.5  91.5  91.0  91.0  90│
└─────────────────────────────────────────────────────────────────────┘
```

### Changes

**Stats bar:**
- Remove the 3 large cards — replace with a single summary line under the page title:
  `1 goal · 0 on track · 100% avg progress`

**Goal card header:**
- Life Goal shown as `↑ Health and Wellness` (small, brown text) — if unlinked, show nothing (not "No Life Goal")
- 4 action icons → 1 `⋯` menu containing: Add task, Edit goal, Delete
- Progress bar colour: brown (`#805232`)

**Monthly tiles:**
- Show ALL 12 months in a single row — no horizontal scroll
- Current month: brown border + warm tint
- Past months with no data: neutral grey
- Future months: dimmed opacity (0.4)
- Each tile: month name (top), logged value (centre, bold), target value (bottom, small grey)
- Click any tile → opens the task breakdown modal (same as the current eye icon, but on the whole tile)

**Tabs (Goals Overview / Life Goals / Goal Hierarchy):**
- Remove all three tabs from the page header
- Life Goals → accessible via a small "life goals" link at the top of the page or a secondary button
- Goal Hierarchy → move behind a `[⋯]` icon button on the page header

**Life Goals sub-page:**
- Keep the existing card list design — it's clean
- Add a visual indicator on each life goal showing how many yearly goals are linked

---

## 6. Monthly Task Modal (the eye icon / tile click)

### Current
- Pops up as a floating modal: "Tasks for May / Progress: 0 / 92.5"
- Shows task name + progress bar + percentage
- Functional but minimal

### Proposed improvements
- Show target for the month alongside progress: "0 of 92.5 kg · 0%"
- Show the weekly breakdown within the month (4-5 mini bars, one per week)
- Keep the modal small and dismissible — don't over-engineer it

---

## 7. Task Timeline Page

### Current
Good bones — shows: Task | Goal | Freq | Progress | Week pattern | Status

### Issues
- "Freq" column header is abbreviated — spell out "Frequency" or rename to "Schedule"
- The week day indicators (M T W T F S S) are a great idea but unclear whether filled = completed or filled = scheduled
- Page is called "Task Timeline" but it's a table, not a timeline — misleading name
- Lives in the main nav, which adds clutter

### Proposed
- Rename to "Task Overview" or remove from nav and fold into the Goals page as a sub-view
- Rename "Freq" → "Schedule"
- Week day indicators: filled circle = logged that day, empty = not logged, grey = not scheduled

---

## 8. Todos Page

### Current
Works well — "In Progress" and "Done" grouping with counts is clean.

### Minor tweaks
- The drag handle (⠿) on each todo item is a bit small — increase touch target
- No connection to goals (and there shouldn't be — this is intentionally separate)
- Keep as-is structurally, just inherits the nav and background fixes

---

## 9. Colour & Style Consistency

| Element | Current | Fix |
|---|---|---|
| Progress bars | Teal/blue | Brown `#805232` |
| Sidebar background | Dark brown `#3d2210` | Keep |
| Highlight/active colour | Brown | Keep `#805232` |
| Page background (right) | Spotted texture gradient | Flat warm off-white `#f7f3ef` |
| Stats icons | Same bullseye for all | Distinct icons per stat |
| Action buttons | 3–4 exposed icons | Collapse into `⋯` menu |

---

## 10. Implementation Priority

Work in this order — each phase is independently shippable:

### Phase 0 — New User Onboarding (highest user value, build first)
1. Add `onboardingStep` field to user profile (0–4)
2. Build `OnboardingPage` component with hierarchy chain + step checklist
3. Add "Get started" nav item that appears when `onboardingStep < 4`
4. Dim "This week" and "Today" nav items when no tasks exist
5. Auto-increment `onboardingStep` when life goal / yearly goal / task is created
6. Hide "Get started" and restore normal nav order when `onboardingStep === 4`

### Phase 1 — Nav + Background (biggest visual impact, low risk)
1. Restructure sidebar: new order, section labels, rename items
2. Remove decorative background texture / flatten to `#f7f3ef`
3. Fix progress bar colour to brown everywhere

### Phase 2 — Goals Page
4. Replace 3 stat cards with summary line
5. Collapse 4 action icons into `⋯` menu; fix "No Life Goal" label
6. Replace horizontal-scroll monthly tiles with 12-month grid
7. Remove "Life Goals" and "Goal Hierarchy" as primary tabs

### Phase 3 — Weekly Tasks
8. Widen task info column; add progress bar + % inside it
9. Move edit/delete into `⋯` menu
10. Tint today's column; fix progress bar colour

### Phase 4 — Today Page
11. Add daily recurring tasks to Today view
12. Replace stat card with "Week so far" dot row
13. Add inline log input on each task card

### Phase 5 — Polish
14. Task Timeline: rename, fix "Freq" label, clarify day indicators
15. Standardise empty states across all pages
16. Life Goals: add linked goal count per life goal card
17. Monthly modal: add weekly breakdown within month
