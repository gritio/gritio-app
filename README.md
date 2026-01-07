# 🎯 Goal Tracker - Complete Setup & Reference

## 📦 What You Have

A **production-ready Goal Tracking application** with:
- ✅ Slide-out side panel for editing goals
- ✅ Fully functional React + TypeScript + Tailwind CSS
- ✅ Beautiful UI with animations
- ✅ Ready for Claude Code modifications
- ✅ All source files included

---

## 🚀 Quick Start with Docker (2 Minutes)

### Prerequisites
- Docker installed (Docker Desktop or Colima)
- docker-compose installed

### Step 1: Clone Repository
```bash
git clone git@github.com:gritio/gritio-app.git
cd gritio-app
```

### Step 2: Start with Docker Compose
```bash
docker-compose up --build
```

This starts:
- ✅ **Frontend** on http://localhost:5173
- ✅ **Backend** on http://localhost:3000
- ✅ **PostgreSQL** database (with data persistence)
- ✅ **pgAdmin** on http://localhost:5050 (for viewing database)

### Step 3: View Database (Optional)
Access pgAdmin at: http://localhost:5050
- Email: `admin@example.com`
- Password: `admin`

Register server:
1. Right-click "Servers" → Register → Server
2. Name: `gritio-postgres`
3. Host: `postgres`, Port: `5432`
4. Username: `postgres`, Password: `postgres`

### Step 4: Stop Services
```bash
docker-compose down
```

Data persists! Next time you run `docker-compose up`, everything will be restored.

---

## 🖥️ Alternative: Local Development (Without Docker)

### Step 1: Clone Repository
```bash
git clone git@github.com:gritio/gritio-app.git
cd gritio-app
```

### Step 2: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd src/api
npm install
cd ../..
```

### Step 3: Setup Database
Create `.env` in project root:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/gritio_db"
```

Then run:
```bash
cd src/api
npx prisma generate
npx prisma migrate dev
npm run seed
cd ../..
```

### Step 4: Start Backend Server
```bash
cd src/api
npm run start:dev
```
Backend will run on: `http://localhost:3000`

### Step 5: Start Frontend Dev Server (in another terminal)
```bash
npm run dev
```
Frontend will run on: `http://localhost:5173`

### Step 6: Open in Browser
Visit: `http://localhost:5173`

---

## 📁 Project Files Structure

```
outputs/
├── src/                                # All source code
│   └── app/
│       ├── components/
│       │   ├── GoalsOverview.tsx       ⭐ Main list view
│       │   ├── GoalEditPanel.tsx       ⭐ Side panel editing
│       │   ├── GoalDetail.tsx
│       │   ├── TodayView.tsx
│       │   ├── WeeklyReview.tsx
│       │   ├── StatusBadge.tsx
│       │   ├── ProgressBar.tsx
│       │   ├── Add*Modal.tsx           # Modal components
│       │   └── ui/                     # Shadcn UI components
│       ├── App.tsx                     ⭐ Main app file
│       ├── types.ts                    ⭐ TypeScript definitions
│       ├── data/
│       │   └── mockData.ts             # Sample data
│       ├── utils/
│       │   └── calculations.ts         # Helper functions
│       └── styles/                     # CSS files
├── package.json                        # Dependencies
├── vite.config.ts                      # Build config
├── index.html                          # HTML entry
├── SETUP_GUIDE.md                      📖 Full setup guide
├── COMPONENT_REFERENCE.md              📖 Component details
├── CLAUDE_CODE_GUIDE.md                📖 How to use Claude Code
└── README.md                           📖 This file
```

---

<details>
<summary><h2>🎯 Key Features</h2></summary>

### Feature #1: Goals Overview
- All goals grouped by area (Health, Learning, Career, etc.)
- Status badges (On Track, Ahead, Behind, At Risk, Completed)
- Progress bars with percentage
- Expandable cards to view monthly goals
- Stats summary at top

### Feature #2: Edit Side Panel ⭐ NEW
- **Slides in from the right** with smooth animation
- Edit any goal property:
  - Title
  - Description
  - Area
  - Yearly Target
  - Current Progress (slider 0-100%)
  - Status
  - Start & End dates
- **Save**, **Delete**, or **Cancel**
- Click overlay to close
- Real-time validation

### Feature #3: Hierarchical Structure
- Goals → Monthly Goals → Tasks
- Expandable sections for easy navigation
- Daily and weekly task tracking

### Feature #4: Navigation
- Overview (main dashboard)
- Detail (individual goal view)
- Today (daily tasks)
- Weekly (weekly review)

</details>

---

<details>
<summary><h2>💻 Using with Claude Code</h2></summary>

### Open in VS Code
```bash
# In the goal-tracker folder
code .
```

### Open Claude Code Terminal
1. Press `Ctrl+`` (backtick) to open terminal
2. Click dropdown at right of terminal
3. Select "Claude Code"

### Make Changes
Simply ask Claude Code to modify the app:

**Examples:**
```
"Add dark mode support"
"Change the Edit button color to green"
"Add a search/filter for goals"
"Add a duplicate goal feature"
"Make the panel wider"
"Add priority field to goals"
```

Claude Code will:
1. Understand your request
2. Modify the necessary files
3. Keep the app running
4. See changes live at `http://localhost:5173`

</details>

---

<details>
<summary><h2>📝 File Reference Guide</h2></summary>

### Most Important Files

#### 1. **App.tsx** - Main Application
```
Location: src/app/App.tsx
Purpose: Central state management, routing, modals
Edit: Add new views or state properties here
```

#### 2. **GoalsOverview.tsx** - Goal List Display
```
Location: src/app/components/GoalsOverview.tsx
Purpose: Display all goals with Edit buttons
Edit: Change layout, styling, or add new actions
```

#### 3. **GoalEditPanel.tsx** - Side Panel Editor ⭐
```
Location: src/app/components/GoalEditPanel.tsx
Purpose: Slide-out panel for editing goals
Edit: Add/remove fields, change styling, modify animation
```

#### 4. **types.ts** - TypeScript Types
```
Location: src/app/types.ts
Purpose: Defines Goal, MonthlyGoal, Task, etc.
Edit: Add new fields or change structure
```

#### 5. **mockData.ts** - Sample Data
```
Location: src/app/data/mockData.ts
Purpose: Provides demo data for the app
Edit: Change goal names, add more goals, etc.
```

</details>

---

<details>
<summary><h2>🔧 Common Modifications</h2></summary>

### Change Colors
In `GoalEditPanel.tsx`:
```typescript
// Blue theme (default)
className="bg-blue-600"

// Change to purple
className="bg-purple-600"

// Available colors: blue, green, red, purple, yellow, pink, etc.
```

### Add a New Field to Goals
1. Edit `src/app/types.ts`:
```typescript
interface Goal {
  // ... existing fields
  priority: 'low' | 'medium' | 'high';  // Add this
}
```

2. Edit `src/app/components/GoalEditPanel.tsx`:
```jsx
<div>
  <label>Priority</label>
  <select
    value={formData.priority}
    onChange={(e) => setFormData({...formData, priority: e.target.value})}
  >
    <option>Low</option>
    <option>Medium</option>
    <option>High</option>
  </select>
</div>
```

3. Update `src/app/data/mockData.ts` with priority values

### Change Panel Width
In `GoalEditPanel.tsx`:
```typescript
// Default: md (28rem)
<div className="w-full max-w-md">

// Wider: lg (32rem)
<div className="w-full max-w-lg">

// Extra wide: xl (36rem)
<div className="w-full max-w-xl">
```

### Change Animation Speed
In `GoalEditPanel.tsx`:
```typescript
// Default: 300ms
transition-transform duration-300

// Faster: 200ms
transition-transform duration-200

// Slower: 500ms
transition-transform duration-500
```

</details>

---

<details>
<summary><h2>🐛 Troubleshooting</h2></summary>

### Problem: Port 5173 already in use
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Problem: Changes not showing up
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

### Problem: Module not found error
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Problem: TypeScript errors
```bash
# Update TypeScript
npm install typescript@latest
```

</details>

---

<details>
<summary><h2>🧪 Testing the App</h2></summary>

### Manual Checklist
- [ ] App loads at localhost:5173
- [ ] Can see all goals in overview
- [ ] Click Edit on a goal → Panel slides in
- [ ] Can type in title field
- [ ] Can drag progress slider
- [ ] Can select status from dropdown
- [ ] Click Save → Panel closes, changes shown
- [ ] Click Edit again → Values are saved
- [ ] Click overlay → Panel closes
- [ ] Click Cancel → Panel closes without saving

</details>

---

<details>
<summary><h2>📚 Code Examples</h2></summary>

### How Edit Panel Works
```typescript
// 1. User clicks Edit button
<button onClick={() => handleEditGoal(goal.id)}>
  Edit
</button>

// 2. Parent component opens panel
const handleEditGoal = (goalId: string) => {
  setEditingGoalId(goalId);        // Set which goal to edit
  setIsEditPanelOpen(true);        // Show the panel
};

// 3. Panel receives the goal
<GoalEditPanel
  goal={editingGoal}
  isOpen={isEditPanelOpen}
  onSave={handleSaveEditedGoal}
/>

// 4. User saves changes
const handleSaveEditedGoal = (updatedGoal: Goal) => {
  setGoals(goals.map(g => 
    g.id === updatedGoal.id ? updatedGoal : g
  ));
};
```

### Add a Toast Notification (Already installed!)
```typescript
import { toast } from 'sonner';

const handleSave = () => {
  // ... save logic
  toast.success('Goal updated! 🎉');
};

const handleDelete = () => {
  // ... delete logic
  toast.error('Goal deleted');
};
```

</details>

---

<details>
<summary><h2>🚀 Next Steps</h2></summary>

### For Beginners
1. ✅ Get the app running locally
2. ✅ Explore the folder structure
3. ✅ Open files and read comments
4. ✅ Make a simple CSS change with Claude Code
5. ✅ Try adding a new field

### For Intermediate
1. ✅ Understand the state management in App.tsx
2. ✅ Learn how props flow between components
3. ✅ Practice making multiple related changes
4. ✅ Add form validation
5. ✅ Add toast notifications

### For Advanced
1. ✅ Connect to a backend API
2. ✅ Add database persistence
3. ✅ Implement authentication
4. ✅ Add real-time updates with WebSockets
5. ✅ Deploy to production

</details>

---

<details>
<summary><h2>📖 Documentation Files</h2></summary>

| File | Purpose |
|------|---------|
| `SETUP_GUIDE.md` | Complete installation & configuration |
| `COMPONENT_REFERENCE.md` | Detailed component documentation |
| `CLAUDE_CODE_GUIDE.md` | How to use Claude Code effectively |
| `README.md` | Quick overview (this file) |

</details>

---

<details>
<summary><h2>🎓 Learning Resources</h2></summary>

### React Concepts Used
- ✅ Functional components with hooks
- ✅ useState for state management
- ✅ Event handling and propagation
- ✅ Conditional rendering
- ✅ List rendering with map()

### Tailwind CSS
- ✅ Utility-first CSS
- ✅ Responsive design with breakpoints
- ✅ Dark mode support
- ✅ Animations and transitions

### TypeScript
- ✅ Interfaces for props
- ✅ Type definitions
- ✅ Optional properties
- ✅ Union types

</details>

---

<details>
<summary><h2>🤝 Getting Help</h2></summary>

### With Claude Code
Just ask naturally:
```
"How do I add a new field to the form?"
"Can you show me how the side panel animation works?"
"Help me understand the state flow in App.tsx"
```

### Common Questions
**Q: How do I deploy this?**
A: Build with `npm run build`, then deploy the `dist/` folder

**Q: Can I add a backend?**
A: Yes! Use fetch() to connect to your API

**Q: How do I make it look different?**
A: Modify Tailwind classes - they're named and simple

**Q: Can I use this commercially?**
A: Yes, it's yours to use as you like!

</details>

---

<details>
<summary><h2>📋 Checklist Before You Start</h2></summary>

- [ ] Node.js 18+ installed
- [ ] npm or yarn working
- [ ] VS Code installed
- [ ] Claude Code extension installed
- [ ] All files extracted/copied
- [ ] Ran `npm install`
- [ ] Ran `npm run dev`
- [ ] Tested the app in browser
- [ ] Read through this guide

</details>

---

<details>
<summary><h2>💡 Pro Tips</h2></summary>

1. **Keep dev server running** - Changes hot-reload automatically
2. **Use browser DevTools** - F12 for debugging
3. **Check console for errors** - First troubleshooting step
4. **Ask Claude Code specifically** - "Change the save button color to green" works better than "make it prettier"
5. **Git commit often** - Easy to roll back if needed

</details>

---

## 🎉 You're Ready!

Everything is set up. Now you can:
- ✅ Run the app locally
- ✅ See the side panel in action
- ✅ Make modifications with Claude Code
- ✅ Build amazing features

**Start with:** `npm run dev`

Then visit: `http://localhost:5173`

**Click Edit on any goal to see the side panel!**

---

## 📞 Support

- Check documentation files for detailed info
- Use Claude Code to ask questions
- Look at component comments for hints
- Review mock data for examples

**Happy coding! 🚀**

---
 Frontend

  React 18 + TypeScript
  Tailwind CSS + Lucide React
  Axios + TanStack Query
  React Router

  Backend

  Nest.js + TypeScript
  Prisma (ORM)
  PostgreSQL (Database)
  Auth0 (Authentication)
  Vitest (Testing - Modern & Fast)
  
*Generated: December 2025*
*React 18.3+ | TypeScript | Tailwind CSS | Vite*
