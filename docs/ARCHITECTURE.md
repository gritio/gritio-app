# Architecture & Data Flow Guide

## 🏗️ Component Hierarchy

```
App.tsx (Main Container)
├── Navigation Bar
│   ├── Title + Logo
│   ├── View Tabs
│   │   ├── Overview
│   │   ├── Detail
│   │   ├── Today
│   │   └── Weekly
│   └── Actions
│
├── Main Content Area
│   ├── GoalsOverview (Overview View) ⭐
│   │   ├── Stats Summary
│   │   │   ├── Total Goals
│   │   │   ├── On Track Count
│   │   │   └── Avg Progress
│   │   │
│   │   └── Goals List
│   │       ├── Group by Area
│   │       │   ├── Health
│   │       │   │   └── Goal Card (with Edit button)
│   │       │   ├── Learning
│   │       │   │   └── Goal Card (with Edit button)
│   │       │   └── Career
│   │       │       └── Goal Card (with Edit button)
│   │       │
│   │       └── Expandable Sections
│   │           └── Monthly Goals (with Expand/Collapse)
│   │               └── Daily/Weekly Tasks
│   │
│   ├── GoalDetail (Detail View)
│   ├── TodayView
│   └── WeeklyReview
│
├── Modals (Overlay)
│   ├── AddGoalModal
│   ├── AddMonthlyGoalModal
│   ├── AddTaskModal
│   └── UpdateProgressModal
│
├── GoalEditPanel ⭐ (Side Panel Overlay)
│   ├── Header (Close Button)
│   ├── Form Content
│   │   ├── Title Input
│   │   ├── Description Textarea
│   │   ├── Area Dropdown
│   │   ├── Yearly Measure Input
│   │   ├── Progress Slider
│   │   ├── Status Dropdown
│   │   ├── Start Date Picker
│   │   └── End Date Picker
│   └── Footer (Save, Delete, Cancel)
│
└── Floating Action Buttons
    └── Add Goal / Add Task / etc.
```

---

## 📊 Data Flow Diagram

### 1. View Goals Flow
```
App.tsx (goals state)
    ↓
GoalsOverview Component
    ↓
Display Goals Grouped by Area
    ↓
User Clicks "Expand"
    ↓
Show Monthly Goals
    ↓
User Clicks "Expand Monthly Goal"
    ↓
Show Tasks
```

### 2. Edit Goal Flow
```
User clicks "Edit" button on Goal Card
    ↓ (stopPropagation to prevent other listeners)
handleEditGoal(goalId) called
    ↓
setEditingGoalId(goalId)
setIsEditPanelOpen(true)
    ↓
GoalEditPanel component receives props:
  - goal (the goal to edit)
  - isOpen = true
    ↓
Panel slides in from right (animate)
    ↓
formData state syncs with goal data
    ↓
User modifies form fields
    ↓
Real-time state updates: formData
    ↓
User clicks "Save Changes"
    ↓
handleSave() → onSave() callback
    ↓
handleSaveEditedGoal() in App.tsx
    ↓
Update goals array:
  setGoals(goals.map(g => 
    g.id === updatedGoal.id ? updatedGoal : g
  ))
    ↓
Panel closes: setIsEditPanelOpen(false)
    ↓
GoalsOverview re-renders with new data
    ↓
User sees updated goal in the list
```

### 3. Delete Goal Flow
```
User clicks "Delete Goal" in panel
    ↓
Show confirmation dialog
  "Are you sure you want to delete [goal name]?"
    ↓
If user confirms:
  handleDelete() → onDelete() callback
    ↓
handleDeleteGoal() in App.tsx
    ↓
Remove from goals array:
  setGoals(goals.filter(g => g.id !== goalId))
    ↓
Clean up related data:
  - Remove monthly goals for this goal
  - Remove tasks for this goal
    ↓
Panel closes automatically
    ↓
GoalsOverview re-renders
    ↓
Goal removed from list
```

---

## 🔄 State Management

### State in App.tsx

```typescript
// View Management
const [currentView, setCurrentView] = useState<'overview' | 'detail' | 'today' | 'weekly'>();

// Edit Panel State ⭐
const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

// Selection State
const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
const [selectedMonthlyGoalId, setSelectedMonthlyGoalId] = useState<string | null>(null);

// Modal States
const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
const [isAddMonthlyGoalModalOpen, setIsAddMonthlyGoalModalOpen] = useState(false);
const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
const [isUpdateProgressModalOpen, setIsUpdateProgressModalOpen] = useState(false);

// Data States
const [goals, setGoals] = useState<Goal[]>(mockGoals);
const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoal[]>(mockMonthlyGoals);
const [tasks, setTasks] = useState<Task[]>(mockTasks);
const [checkIns, setCheckIns] = useState<WeeklyCheckIn[]>(mockWeeklyCheckIns);
```

### State in GoalEditPanel.tsx

```typescript
// Form Data
const [formData, setFormData] = useState<Goal | null>(goal);

// Loading State
const [isSaving, setIsSaving] = useState(false);

// Form updates whenever a field changes
const handleTitleChange = (e) => {
  setFormData({...formData, title: e.target.value});
};
```

---

## 🎬 Animation Details

### Side Panel Slide Animation

#### CSS Classes Used
```css
/* Closed State */
transform: translateX(100%)        /* Off-screen right */
opacity: 0
pointer-events: none

/* Open State */
transform: translateX(0)           /* Visible */
opacity: 100

/* Overlay */
bg-black bg-opacity-50            /* Semitransparent black */
transition-opacity                /* Fade in/out */
```

#### Tailwind Implementation
```tsx
// Panel when closed
<div className={`translate-x-full opacity-0 pointer-events-none`}>

// Panel when open
<div className={`translate-x-0 opacity-100`}>

// Transition applied to both
<div className={`transition-transform duration-300 ease-out`}>
```

#### Animation Timeline
```
User clicks Edit
  ↓ (instant)
State updates: isEditPanelOpen = true
  ↓ (instant)
CSS updates to translate-x-0
  ↓ (300ms animation)
Panel slides in smoothly
  ↓ (at 300ms)
Animation complete
```

---

## 📝 Types & Interfaces

### Goal Type
```typescript
interface Goal {
  id: string;                                    // Unique identifier
  title: string;                                 // Goal name
  description: string;                           // Goal description
  area: 'Health' | 'Learning' | 'Career' | 'Personal' | 'Financial';
  yearlyMeasure: string;                        // Target description
  progress: number;                             // 0-100 percentage
  status: 'on-track' | 'ahead' | 'behind' | 'at-risk' | 'completed';
  startDate: Date;                              // Goal start
  endDate: Date;                                // Goal end
}
```

### MonthlyGoal Type
```typescript
interface MonthlyGoal {
  id: string;
  goalId: string;                               // Reference to parent Goal
  title: string;
  month: string;                                // e.g., "January"
  monthDate: Date;
  target: number;                               // Numeric target
  unit: string;                                 // e.g., "km", "books", "hours"
  currentProgress: number;
  status: StatusType;
}
```

### Task Type
```typescript
interface Task {
  id: string;
  goalId: string;
  monthlyGoalId: string;
  title: string;
  target: number;
  unit: string;
  currentProgress: number;
  frequency: 'daily' | 'weekly';
  lastUpdated: Date;
  completionHistory: Array<{
    date: Date;
    value: number;
    completed: boolean;
  }>;
}
```

---

## 🔌 Props Flow

### GoalsOverview Props

```typescript
interface GoalsOverviewProps {
  goals: Goal[];                               // All goals to display
  monthlyGoals: MonthlyGoal[];                // All monthly goals
  tasks: Task[];                              // All tasks
  onSelectGoal: (goalId: string) => void;    // Goal click handler
  onAddMonthlyGoal: (goalId: string) => void;
  onAddTask: (monthlyGoalId: string) => void;
  onEditGoal?: (goalId: string) => void;     // ⭐ NEW
}
```

### GoalEditPanel Props

```typescript
interface GoalEditPanelProps {
  goal: Goal | null;                          // Current goal being edited
  isOpen: boolean;                            // Panel visibility
  onClose: () => void;                        // Close handler
  onSave: (goal: Goal) => void;              // Save handler
  onDelete: (goalId: string) => void;        // Delete handler
}
```

---

## 🎯 Event Handling Flow

### Button Click → State Update → Re-render

```
[Edit Button]
  ↓ onClick event
handleEditGoal(goal.id)
  ↓ calls
setEditingGoalId(goalId)     // State update 1
setIsEditPanelOpen(true)     // State update 2
  ↓ React batches updates
React re-renders
  ↓ passes new props
GoalEditPanel receives:
  - goal = goals.find(g => g.id === editingGoalId)
  - isOpen = true
  ↓
Component renders with new props
  ↓ (CSS transition)
Panel slides in over 300ms
```

---

## 🎨 Styling Strategy

### Tailwind CSS Approach

```
Colors:
- Blue (#3b82f6)   → Primary actions, default status
- Green (#16a34a)  → Ahead status, success
- Orange (#f97316) → Behind status, warning
- Red (#dc2626)    → At-risk status, danger
- Purple (#9333ea) → Completed status

Spacing:
- p-4, p-6        → Padding
- gap-4, gap-2    → Gaps between items
- mb-2, mb-4      → Margins

Typography:
- text-sm, text-lg, text-xl
- font-medium, font-semibold
- text-gray-600   → Secondary text

Layout:
- flex items-center justify-between
- grid grid-cols-1 md:grid-cols-3
- space-y-4       → Vertical spacing

Responsive:
- md:grid-cols-3  → Tablet and up
- lg:max-w-lg     → Large screens
```

---

## 🔍 Key Code Patterns

### Pattern 1: Conditional Rendering
```typescript
{isEditPanelOpen && (
  <GoalEditPanel {...props} />
)}

{/* or */}

<div className={isEditPanelOpen ? 'opacity-100' : 'opacity-0'}>
```

### Pattern 2: Event Propagation Control
```typescript
const handleClickButton = (e: React.MouseEvent) => {
  e.stopPropagation();  // Prevent parent handlers from firing
  // Your logic here
};
```

### Pattern 3: Map with Filter
```typescript
const filteredGoals = goals
  .filter(g => g.status === 'on-track')
  .map(g => <GoalCard key={g.id} goal={g} />);
```

### Pattern 4: Conditional Class Names
```typescript
className={`
  base-classes
  ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  ${isDark ? 'dark:bg-gray-900' : 'bg-white'}
`}
```

---

## 📈 Performance Considerations

### Why This Architecture Works Well

1. **Single Source of Truth** → App.tsx holds all state
2. **Unidirectional Data Flow** → Parent → Child → Events → Parent
3. **Minimal Re-renders** → Only affected components update
4. **CSS Animations** → GPU-accelerated, smooth performance
5. **Lazy Rendering** → Modals/panels only render when open

### Future Optimizations

When you add more features:
- Use `React.memo()` for list items
- Use `useCallback()` for event handlers
- Consider `useContext()` for deeply nested state
- Implement `useMemo()` for expensive calculations

---

## 🔗 File Dependencies

```
App.tsx (imports)
├── GoalsOverview.tsx
│   ├── StatusBadge.tsx
│   ├── ProgressBar.tsx
│   └── lucide-react (icons)
├── GoalEditPanel.tsx ⭐
│   ├── lucide-react (icons)
│   └── types.ts
├── GoalDetail.tsx
├── TodayView.tsx
├── WeeklyReview.tsx
├── Modal components (Add/Update)
├── mockData.ts
└── types.ts

GoalEditPanel.tsx (imports)
├── types.ts
├── lucide-react (X, Save, Trash2 icons)
└── styles (via Tailwind)

GoalsOverview.tsx (imports)
├── types.ts
├── StatusBadge.tsx
├── ProgressBar.tsx
├── lucide-react (icons)
└── styles (via Tailwind)
```

---

## 🚀 Execution Flow Example

### Complete User Journey: Edit a Goal

```
1. USER ACTION
   └─ Clicks Edit button on "Run a Half Marathon" goal

2. EVENT HANDLING (GoalsOverview.tsx)
   └─ onClick={(e) => {
        e.stopPropagation();
        onEditGoal?.(goal.id);  // goal.id = 'goal-1'
      }}

3. CALLBACK (App.tsx)
   └─ handleEditGoal('goal-1')
      ├─ setEditingGoalId('goal-1')
      └─ setIsEditPanelOpen(true)

4. STATE UPDATE
   └─ React re-renders entire App

5. COMPONENT RECEIVE NEW PROPS
   └─ GoalEditPanel receives:
      ├─ goal = goals.find(g => g.id === 'goal-1') ✓
      └─ isOpen = true ✓

6. RENDERING (GoalEditPanel.tsx)
   └─ Renders form with current goal data
   └─ formData state = {...goal}

7. ANIMATION
   └─ CSS: translate-x-full → translate-x-0
   └─ Duration: 300ms
   └─ Panel slides in

8. USER INTERACTION
   └─ Changes title field
   └─ onChange → setFormData({...formData, title: newTitle})

9. USER SAVES
   └─ Clicks "Save Changes"
   └─ handleSave() called
   └─ onSave(formData) callback

10. UPDATE STATE (App.tsx)
    └─ handleSaveEditedGoal(updatedGoal)
    └─ setGoals(goals.map(g => 
         g.id === updatedGoal.id ? updatedGoal : g
       ))

11. RE-RENDER
    └─ React updates goals state
    └─ All components re-render
    └─ GoalsOverview shows new goal data

12. CLOSE PANEL
    └─ onClose() called automatically in handleSave
    └─ setIsEditPanelOpen(false)
    └─ CSS: translate-x-0 → translate-x-full
    └─ Panel slides out

13. FINAL STATE
    └─ Goal is updated in the list
    └─ Panel is closed
    └─ User sees the changes
```

---

## 📊 Memory & Performance

### Component Render Counts (Initial Load)
```
App.tsx                    1x
├─ GoalsOverview           1x
│  └─ GoalCard (×3)        3x
├─ Modals                  0x (not visible)
└─ GoalEditPanel           0x (not visible)

Total Renders: ~7
```

### Component Render Counts (After Edit Save)
```
Only re-renders:
├─ App.tsx                 1x (state changed)
├─ GoalsOverview           1x (props changed)
└─ GoalCard (×1)           1x (one goal updated)

Optimized: Other components unchanged
Total Re-renders: ~3
```

---

## 🎓 Understanding the Code

### Start Here
1. `App.tsx` - Understand state management
2. `GoalsOverview.tsx` - See how goals display
3. `GoalEditPanel.tsx` - Learn the edit feature
4. `types.ts` - Know the data structure

### Then Explore
5. `AddGoalModal.tsx` - See modal pattern
6. `StatusBadge.tsx` - Learn reusable components
7. `mockData.ts` - Understand sample data
8. `styles/` - CSS and Tailwind

---

**This architecture is scalable and ready for backend integration!**

When you're ready, replace mock data with API calls:
```typescript
useEffect(() => {
  fetch('/api/goals')
    .then(r => r.json())
    .then(data => setGoals(data));
}, []);
```

---

*Last Updated: December 2025*
