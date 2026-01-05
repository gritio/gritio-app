# 📑 Complete File Index & Navigation Guide

## 📍 Getting Started - Read These First

| File | Purpose | Time |
|------|---------|------|
| **README.md** | Quick overview and getting started | 5 min |
| **SETUP_GUIDE.md** | Detailed installation instructions | 10 min |
| **CLAUDE_CODE_GUIDE.md** | How to use Claude Code to modify the app | 15 min |

## 📚 Documentation Files

### For Understanding the Project
```
SETUP_GUIDE.md                     ← Full setup & configuration
COMPONENT_REFERENCE.md             ← Detailed GoalEditPanel docs
ARCHITECTURE.md                    ← Data flow & technical design
CLAUDE_CODE_GUIDE.md               ← How to use Claude Code effectively
README.md                          ← Quick reference (this folder!)
```

### What Each Doc Covers

**SETUP_GUIDE.md**
- Prerequisites and installation
- Project structure explanation
- Feature overview
- Customization guide
- Troubleshooting

**COMPONENT_REFERENCE.md**
- GoalEditPanel component details
- Props and usage examples
- State management
- Styling and customization
- Testing tips

**ARCHITECTURE.md**
- Component hierarchy diagram
- Data flow diagrams
- State management structure
- Event handling flow
- Type definitions
- Performance considerations

**CLAUDE_CODE_GUIDE.md**
- How to use Claude Code
- Common tasks and examples
- Debugging tips
- Git workflow
- Backend integration

---

## 🏗️ Source Code Files

### Main Application Files (Start Here!)

```
src/app/
├── App.tsx                     ⭐ MAIN FILE
│   Purpose: Central state management, routing, handlers
│   Key: All state lives here (goals, isEditPanelOpen, etc.)
│   Edit: When adding new views or state
│
├── types.ts                    ⭐ TYPE DEFINITIONS
│   Purpose: TypeScript interfaces for all data
│   Key: Goal, MonthlyGoal, Task, WeeklyCheckIn types
│   Edit: When adding new fields to data
│
└── data/
    └── mockData.ts             ⭐ SAMPLE DATA
        Purpose: Demo data for the app
        Key: 3 sample goals with monthly goals
        Edit: When testing with different data
```

### Component Files

```
src/app/components/

🎯 MAIN FEATURES
├── GoalsOverview.tsx           ⭐ MAIN DISPLAY
│   Purpose: Shows all goals grouped by area
│   Features: Expandable cards, Edit buttons
│   Edit: To change layout or styling
│
└── GoalEditPanel.tsx           ⭐ SIDE PANEL (YOUR NEW FEATURE!)
    Purpose: Slide-out panel for editing goals
    Features: Form fields, Save, Delete, Cancel
    Edit: To add/remove fields or change styling

MODALS & DIALOGS
├── AddGoalModal.tsx
│   Purpose: Modal to add new goals
│
├── AddMonthlyGoalModal.tsx
│   Purpose: Modal to add monthly goals
│
├── AddTaskModal.tsx
│   Purpose: Modal to add tasks
│
└── UpdateProgressModal.tsx
    Purpose: Modal to update task progress

VIEWS
├── GoalDetail.tsx
│   Purpose: Detailed view of a single goal
│
├── TodayView.tsx
│   Purpose: Show today's tasks
│
└── WeeklyReview.tsx
    Purpose: Weekly checkin view

UI COMPONENTS (Reusable)
├── StatusBadge.tsx
│   Purpose: Color-coded status indicator
│   Used in: GoalsOverview, GoalEditPanel
│
├── ProgressBar.tsx
│   Purpose: Visual progress representation
│   Used in: GoalsOverview, GoalDetail
│
├── figma/
│   └── ImageWithFallback.tsx
│       Purpose: Image with fallback handling

UI LIBRARY (Shadcn - Already Installed!)
├── ui/
│   ├── accordion.tsx
│   ├── alert.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── popover.tsx
│   ├── scroll-area.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── slider.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   ├── toggle.tsx
│   └── ... (and many more)
```

### Utilities & Styles

```
src/app/
├── utils/
│   └── calculations.ts
│       Purpose: Helper functions for calculations
│       Functions: formatTaskValue, calculateProgress, etc.
│
└── styles/
    ├── index.css               ← Main CSS entry
    ├── tailwind.css            ← Tailwind config
    ├── fonts.css               ← Font definitions
    └── theme.css               ← Custom theme
```

---

## ⚙️ Configuration Files

```
Root Directory:
├── package.json                ← Dependencies & scripts
├── vite.config.ts              ← Vite build config
├── postcss.config.mjs           ← PostCSS setup
├── tailwind.config.js           ← Tailwind configuration
└── index.html                  ← HTML entry point
```

---

## 🎯 What Each File Does

### Core Logic
| File | What It Does | When to Edit |
|------|--------------|--------------|
| App.tsx | Manages all state, routes views | Adding new views/state |
| types.ts | Defines all data types | Adding new fields |
| mockData.ts | Provides sample data | Testing with different data |
| GoalsOverview.tsx | Displays goal list | Changing layout/styling |
| GoalEditPanel.tsx | Edit form & side panel | Modifying edit features |

### User Interactions
| File | What It Does | When to Edit |
|------|--------------|--------------|
| AddGoalModal.tsx | Create new goal | Changing form fields |
| AddMonthlyGoalModal.tsx | Create monthly goal | Changing form fields |
| AddTaskModal.tsx | Create task | Changing form fields |
| UpdateProgressModal.tsx | Update progress | Changing form fields |

### Reusable Components
| File | What It Does | When to Use |
|------|--------------|------------|
| StatusBadge.tsx | Shows status color | Already used in multiple places |
| ProgressBar.tsx | Shows progress bar | Already used in multiple places |
| ui/*.tsx | Pre-built components | For advanced customization |

---

## 🔄 File Dependency Map

### What Imports What

```
App.tsx (imports)
  ├─ GoalsOverview.tsx (from components)
  ├─ GoalEditPanel.tsx (from components) ⭐
  ├─ GoalDetail.tsx (from components)
  ├─ TodayView.tsx (from components)
  ├─ WeeklyReview.tsx (from components)
  ├─ Add*Modal.tsx components
  ├─ mockData.ts (from data)
  ├─ types.ts (from types)
  └─ lucide-react (icons)

GoalsOverview.tsx (imports)
  ├─ types.ts
  ├─ StatusBadge.tsx
  ├─ ProgressBar.tsx
  └─ lucide-react

GoalEditPanel.tsx (imports) ⭐
  ├─ types.ts
  └─ lucide-react

StatusBadge.tsx (imports)
  └─ lucide-react (maybe)

ProgressBar.tsx (imports)
  └─ (pure component, no imports)
```

---

## 📂 Quick Navigation

### "I want to edit the [X]"

**The goal title field in the edit panel:**
→ `src/app/components/GoalEditPanel.tsx` (Line ~70)

**The progress slider:**
→ `src/app/components/GoalEditPanel.tsx` (Line ~110)

**The goal list display:**
→ `src/app/components/GoalsOverview.tsx` (Line ~116)

**The status badge styling:**
→ `src/app/components/StatusBadge.tsx`

**The colors/theme:**
→ `src/styles/tailwind.css` or search for `bg-blue-600`

**The data structure:**
→ `src/app/types.ts`

**Sample goal data:**
→ `src/app/data/mockData.ts`

**State management logic:**
→ `src/app/App.tsx` (look for `const [` for state)

---

## 🚀 File Reading Order

### If You're New to the Project
1. **README.md** - Understand what it does
2. **src/app/types.ts** - See the data structure
3. **src/app/data/mockData.ts** - See sample data
4. **src/app/App.tsx** - Understand state management
5. **src/app/components/GoalsOverview.tsx** - See how it displays
6. **src/app/components/GoalEditPanel.tsx** - See the edit feature

### If You Want to Add a Feature
1. **CLAUDE_CODE_GUIDE.md** - Learn how to ask
2. **ARCHITECTURE.md** - Understand the flow
3. **COMPONENT_REFERENCE.md** - See component API
4. Open the relevant files above

### If You Want to Customize Styling
1. **src/app/components/GoalEditPanel.tsx** - Look for `className=`
2. **src/app/components/GoalsOverview.tsx** - Look for `className=`
3. **src/styles/tailwind.css** - See color definitions
4. Replace color classes (e.g., `bg-blue-600` → `bg-purple-600`)

---

## 📖 How to Use This Index

### Quick Links by Task

**"I need to understand the app"**
```
→ README.md (5 min)
→ ARCHITECTURE.md (15 min)
→ SETUP_GUIDE.md (10 min)
```

**"I want to modify the edit panel"**
```
→ COMPONENT_REFERENCE.md
→ src/app/components/GoalEditPanel.tsx
→ src/app/types.ts
```

**"I want to use Claude Code"**
```
→ CLAUDE_CODE_GUIDE.md
→ SETUP_GUIDE.md (Setup section)
```

**"I want to add a new field"**
```
→ src/app/types.ts (Add to interface)
→ src/app/components/GoalEditPanel.tsx (Add form field)
→ src/app/data/mockData.ts (Add to sample data)
```

**"I want to change colors"**
```
→ Search for "bg-blue-600" in any .tsx file
→ Replace with "bg-purple-600" (or any color)
→ See Tailwind docs for color options
```

---

## 🔍 Search Tips in VS Code

### Find Component by Name
Press `Ctrl+P` (or `Cmd+P` on Mac), type:
```
GoalEditPanel          → src/app/components/GoalEditPanel.tsx
GoalsOverview          → src/app/components/GoalsOverview.tsx
App.tsx                → src/app/App.tsx
types.ts               → src/app/types.ts
```

### Find by Content
Press `Ctrl+F` (or `Cmd+F`), search for:
```
"bg-blue-600"          → Find all blue colored elements
"onClick"              → Find click handlers
"useState"             → Find state declarations
"interface Goal"       → Find type definitions
"handleEditGoal"       → Find edit handler
```

### Find Across Project
Press `Ctrl+Shift+F` (or `Cmd+Shift+F`), search for:
```
"GoalEditPanel"        → Find all uses of the panel
"onEditGoal"           → Find edit event handler
"Edit"                 → Find Edit button text
```

---

## 📋 File Checklist

### Essential Files (Must Have)
- [ ] src/app/App.tsx
- [ ] src/app/types.ts
- [ ] src/app/components/GoalsOverview.tsx
- [ ] src/app/components/GoalEditPanel.tsx
- [ ] package.json
- [ ] index.html
- [ ] vite.config.ts

### Configuration Files (Must Have)
- [ ] tailwind.config.js
- [ ] postcss.config.mjs

### Documentation (Very Helpful)
- [ ] README.md
- [ ] SETUP_GUIDE.md
- [ ] CLAUDE_CODE_GUIDE.md

### Nice to Have (Reference)
- [ ] ARCHITECTURE.md
- [ ] COMPONENT_REFERENCE.md

---

## 🎓 Learning Path

### Level 1: Beginner
- Read README.md
- Run `npm install && npm run dev`
- Open app in browser
- Click Edit on a goal
- Look at GoalEditPanel.tsx code

### Level 2: Intermediate
- Read ARCHITECTURE.md
- Understand state flow in App.tsx
- Modify styling with Claude Code
- Add a simple field (like "priority")

### Level 3: Advanced
- Understand component hierarchy
- Modify state management
- Add new views or features
- Connect to backend API

---

## 💾 File Sizes (Approximate)

```
Large Files (Most Important)
  App.tsx                    ~10-15 KB
  GoalsOverview.tsx          ~12-15 KB
  GoalEditPanel.tsx          ~6-8 KB
  types.ts                   ~2-3 KB

UI Component Library
  ui/ directory              ~100+ KB (but pre-built)
  
Configuration
  package.json               ~2 KB
  tailwind.config.js         ~1 KB
  vite.config.ts             <1 KB

Documentation
  *.md files                 ~50 KB total
```

---

## 🔗 Related Files Quick Reference

### If you're editing GoalEditPanel.tsx
Also check:
- `src/app/types.ts` - For Goal interface
- `src/app/App.tsx` - For state management
- `src/app/components/GoalsOverview.tsx` - Where Edit button is

### If you're editing GoalsOverview.tsx
Also check:
- `src/app/types.ts` - For Goal interface
- `src/app/components/StatusBadge.tsx` - Status display
- `src/app/components/ProgressBar.tsx` - Progress display

### If you're editing types.ts
Also check:
- `src/app/data/mockData.ts` - Update sample data
- `src/app/components/GoalEditPanel.tsx` - Update form fields
- `src/app/components/GoalsOverview.tsx` - Update display

---

## ❓ FAQ

**Q: Where is the edit panel code?**
A: `src/app/components/GoalEditPanel.tsx`

**Q: Where do I change the colors?**
A: Search for color class names like `bg-blue-600` and replace with `bg-purple-600`

**Q: Where is the main app code?**
A: `src/app/App.tsx`

**Q: Where is the sample data?**
A: `src/app/data/mockData.ts`

**Q: Where are the types/interfaces?**
A: `src/app/types.ts`

**Q: How do I run the app?**
A: `npm install` then `npm run dev`

**Q: How do I use Claude Code?**
A: Open Claude Code terminal, ask it to make changes

**Q: How do I build for production?**
A: `npm run build`

---

## 📞 Finding Help

**In this project:**
- Look at SETUP_GUIDE.md for common issues
- Check COMPONENT_REFERENCE.md for component details
- Review ARCHITECTURE.md for understanding flows
- Use CLAUDE_CODE_GUIDE.md for modification tips

**Online resources:**
- React docs: https://react.dev
- TypeScript: https://typescriptlang.org
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev

---

**You now have all the files and documentation you need!** 

Start with **README.md** then **npm run dev**

Good luck! 🚀

---

*Generated: December 2025*
*All files ready for VS Code with Claude Code*
