# Goal Tracker with Side Panel - Complete Project Setup

This is a complete, production-ready Goal Tracking application with a slide-out side panel for editing goals.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- VS Code with Claude Code extension

### Installation

1. **Clone/Extract the project:**
```bash
# If you have the tar.gz file
tar -xzf goal-tracker-complete.tar.gz
cd goal-tracker

# Or create a new directory and copy the files
mkdir goal-tracker
cd goal-tracker
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start the development server:**
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

4. **Build for production:**
```bash
npm run build
```

## 📁 Project Structure

```
goal-tracker/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── GoalsOverview.tsx          # Main overview with edit buttons
│   │   │   ├── GoalEditPanel.tsx          # Side panel for editing goals
│   │   │   ├── GoalDetail.tsx
│   │   │   ├── TodayView.tsx
│   │   │   ├── WeeklyReview.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── AddGoalModal.tsx
│   │   │   ├── AddMonthlyGoalModal.tsx
│   │   │   ├── AddTaskModal.tsx
│   │   │   ├── UpdateProgressModal.tsx
│   │   │   ├── ui/                       # Shadcn UI components
│   │   │   └── figma/
│   │   ├── App.tsx                       # Main app with state management
│   │   ├── types.ts                      # TypeScript types
│   │   ├── data/
│   │   │   └── mockData.ts               # Mock data for demo
│   │   ├── utils/
│   │   │   └── calculations.ts           # Utility functions
│   │   └── styles/
│   │       ├── index.css
│   │       ├── tailwind.css
│   │       ├── fonts.css
│   │       └── theme.css
│   └── main.tsx                          # React entry point
├── index.html                            # HTML template
├── package.json                          # Dependencies
├── vite.config.ts                        # Vite configuration
├── postcss.config.mjs                    # PostCSS configuration
├── tailwind.config.js                    # Tailwind CSS configuration
└── README.md                             # This file
```

## 🎯 Key Features

### 1. Goals Overview
- Display all yearly goals grouped by area
- Stats summary (Total, On Track, Average Progress)
- Expandable goal cards
- Status badges with color coding
- Progress bars for visualization

### 2. Goal Edit Side Panel ⭐
- **Slide-out panel** from the right side
- Edit all goal properties:
  - Title
  - Description
  - Area (Health, Learning, Career, Personal, Financial)
  - Yearly measure/target
  - Current progress (0-100%)
  - Status (On Track, Ahead, Behind, At Risk, Completed)
  - Start & End dates
- Save changes with validation
- Delete goals with confirmation
- Smooth animations and transitions
- Overlay to close on click outside

### 3. Monthly Goals & Tasks
- Hierarchical structure: Goals → Monthly Goals → Tasks
- Expandable monthly goals view
- Daily and weekly task tracking
- Progress calculations

### 4. Navigation
- Overview view (main dashboard)
- Detail view for individual goals
- Today view for daily tasks
- Weekly review for weekly check-ins

## 📝 Usage Guide

### Editing a Goal
1. Click the **"Edit"** button on any goal card
2. A side panel slides in from the right
3. Modify any fields you want:
   - Use the slider for progress
   - Select from dropdown for status and area
   - Type text for title and description
4. Click **"Save Changes"** to update
5. Click **"Cancel"** or click outside to close without saving

### Deleting a Goal
1. Open the edit panel for the goal
2. Click **"Delete Goal"**
3. Confirm the deletion in the popup

### Expanding Goals
- Click the **chevron icon** (>) to expand and see monthly goals
- Click again to collapse

## 🔧 Using with Claude Code in VS Code

### Setup Claude Code
1. Install the Claude Code extension in VS Code
2. Open the goal-tracker folder
3. Open the Claude Code terminal

### Common Commands

**Start development:**
```bash
npm run dev
```

**Ask Claude Code to make changes:**
```
"Add a new field for goal category"
"Change the edit panel color to purple"
"Add a duplicate goal feature"
"Make the progress slider more visible"
```

**View the running app:**
- Open `http://localhost:5173` in your browser
- Keep the dev server running while making changes

## 🎨 Customization

### Colors & Styling
All colors are defined in `src/styles/tailwind.css` and use Tailwind CSS classes.

Key color classes:
- `blue-600` - Primary actions
- `green-600` - Success states
- `orange-500` - Warning states
- `red-600` - Danger states
- `purple-600` - Completed states

### Adding New Fields
1. Update the `Goal` type in `src/app/types.ts`
2. Add the field to `GoalEditPanel.tsx`
3. Update mock data in `src/app/data/mockData.ts`

### Modifying the Layout
- Main component: `src/app/components/GoalsOverview.tsx`
- Edit panel: `src/app/components/GoalEditPanel.tsx`
- App wrapper: `src/app/App.tsx`

## 📦 Dependencies

Key libraries:
- **React 18.3+** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool & dev server
- **Radix UI** - Accessible component primitives

## 🚨 Troubleshooting

### Port 5173 already in use
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9
# Or use a different port
npm run dev -- --port 3000
```

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Ensure TypeScript is up to date
npm install typescript@latest
```

## 🔄 State Management Flow

```
App.tsx (main state)
  ├── goals state
  ├── monthlyGoals state
  ├── tasks state
  └── edit panel state
      └── GoalsOverview.tsx (display)
          └── GoalEditPanel.tsx (edit modal)
```

### State Updates
- Click Edit → `handleEditGoal()` → Set `editingGoalId` & open panel
- Save changes → `handleSaveEditedGoal()` → Update goals array
- Delete goal → `handleDeleteGoal()` → Remove from goals array

## 📚 Component API

### GoalsOverview
```tsx
<GoalsOverview 
  goals={goals}
  monthlyGoals={monthlyGoals}
  tasks={tasks}
  onSelectGoal={handleSelectGoal}
  onAddMonthlyGoal={handleAddMonthlyGoalFromOverview}
  onAddTask={handleAddTaskFromOverview}
  onEditGoal={handleEditGoal}  // NEW
/>
```

### GoalEditPanel
```tsx
<GoalEditPanel
  goal={editingGoal}
  isOpen={isEditPanelOpen}
  onClose={() => setIsEditPanelOpen(false)}
  onSave={handleSaveEditedGoal}
  onDelete={handleDeleteGoal}
/>
```

## 🎓 Learning Resources

### TypeScript
- Learn more about types in `src/app/types.ts`
- Custom hooks patterns in utilities

### React Patterns
- State management with `useState`
- Event handling and propagation
- Component composition

### Tailwind CSS
- Responsive design with `md:` breakpoints
- Utility-first CSS approach
- Custom animations in config

## 📄 License

This project is provided as-is for educational and development purposes.

---

## 💡 Next Steps

1. **Run the project** locally
2. **Test the edit panel** functionality
3. **Use Claude Code** to make modifications
4. **Customize** for your needs
5. **Deploy** when ready

Happy coding! 🚀
