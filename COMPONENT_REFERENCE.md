# GoalEditPanel Component - Complete Reference

## Overview
The `GoalEditPanel` is a slide-out side panel component that allows users to edit goal properties with a smooth animation from the right side of the screen.

## File Location
`src/app/components/GoalEditPanel.tsx`

## Component Props

```typescript
interface GoalEditPanelProps {
  goal: Goal | null;                    // The goal being edited (null = closed)
  isOpen: boolean;                       // Whether the panel is visible
  onClose: () => void;                   // Callback when panel closes
  onSave: (goal: Goal) => void;         // Callback to save edited goal
  onDelete: (goalId: string) => void;   // Callback to delete goal
}
```

## Features

### 1. Slide-Out Animation
- Smooth transition from right to left
- Uses `translate-x-full` and `translate-x-0` CSS transforms
- Overlay backdrop with opacity animation
- Click outside to close

### 2. Editable Fields
- **Title**: Text input for goal name
- **Description**: Textarea for detailed description
- **Area**: Dropdown selection (Health, Learning, Career, Personal, Financial)
- **Yearly Measure**: Text input for target description
- **Current Progress**: Range slider from 0-100%
- **Status**: Dropdown (On Track, Ahead, Behind, At Risk, Completed)
- **Start Date**: Date picker
- **End Date**: Date picker

### 3. Actions
- **Save Changes**: Updates the goal with validation
- **Delete Goal**: Removes goal with confirmation
- **Cancel**: Closes without saving

## Usage Example

### In App.tsx
```tsx
import { GoalEditPanel } from './components/GoalEditPanel';

export default function App() {
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([...]);

  const handleEditGoal = (goalId: string) => {
    setEditingGoalId(goalId);
    setIsEditPanelOpen(true);
  };

  const handleSaveEditedGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  return (
    <>
      {/* Your main content */}
      
      <GoalEditPanel
        goal={editingGoalId ? goals.find(g => g.id === editingGoalId) || null : null}
        isOpen={isEditPanelOpen}
        onClose={() => {
          setIsEditPanelOpen(false);
          setEditingGoalId(null);
        }}
        onSave={handleSaveEditedGoal}
        onDelete={handleDeleteGoal}
      />
    </>
  );
}
```

### In GoalsOverview.tsx
```tsx
interface GoalsOverviewProps {
  // ... other props
  onEditGoal?: (goalId: string) => void;
}

export function GoalsOverview({ 
  // ... other props
  onEditGoal 
}: GoalsOverviewProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onEditGoal?.(goal.id);
      }}
      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Edit
    </button>
  );
}
```

## Component Structure

```
GoalEditPanel
├── Overlay (clickable to close)
├── Side Panel Container
│   ├── Header
│   │   ├── Title "Edit Goal"
│   │   └── Close Button (X)
│   ├── Content (scrollable)
│   │   ├── Form Fields
│   │   │   ├── Title Input
│   │   ├── Description Textarea
│   │   ├── Area Select
│   │   ├── Yearly Measure Input
│   │   ├── Progress Range Slider
│   │   ├── Status Select
│   │   ├── Start Date Input
│   │   ├── End Date Input
│   │   └── Info Box
│   └── Footer
│       ├── Save Changes Button
│       ├── Delete Goal Button
│       └── Cancel Button
```

## Styling Classes

### Panel Animation
```css
/* Closed state */
translate-x-full opacity-0 pointer-events-none

/* Open state */
translate-x-0 opacity-100
```

### Colors
- Header: `border-gray-200`
- Input borders: `border-gray-300`
- Focus ring: `ring-2 focus:ring-blue-500`
- Save button: `bg-blue-600 hover:bg-blue-700`
- Delete button: `bg-red-100 text-red-600 hover:bg-red-200`
- Info box: `bg-blue-50 border-blue-200 text-blue-800`

## State Management

The component uses internal state for form data:
- `formData`: Tracks all edited values
- `isSaving`: Loading state during save

```typescript
const [formData, setFormData] = useState<Goal | null>(goal);
const [isSaving, setIsSaving] = useState(false);
```

## Event Handling

### Save Changes
```typescript
const handleSave = async () => {
  if (!formData) return;
  setIsSaving(true);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulated API call
  onSave(formData);
  setIsSaving(false);
  onClose();
};
```

### Delete Goal
```typescript
const handleDelete = () => {
  if (!formData) return;
  if (window.confirm(`Are you sure you want to delete "${formData.title}"?`)) {
    onDelete(formData.id);
    onClose();
  }
};
```

## Animation Details

### CSS Transitions
```css
transition-transform duration-300 ease-out  /* Panel slide */
transition-opacity                           /* Overlay fade */
transition-colors                            /* Button hover */
```

### Z-Index Stack
- Overlay: `z-40`
- Panel: `z-50`

This ensures the panel and overlay appear above all other content.

## Accessibility Features

- ✅ Keyboard navigation in form fields
- ✅ Semantic HTML (label, input, textarea, select)
- ✅ Clear focus states with `focus:ring-2`
- ✅ Confirmation dialog before deletion
- ✅ Disabled state for save button while saving

## Common Customizations

### Change Panel Width
```tsx
// Default: max-w-md (28rem)
// Change to:
max-w-lg  // 32rem
max-w-xl  // 36rem
```

### Add Validation
```typescript
const handleSave = async () => {
  if (!formData?.title.trim()) {
    alert('Title cannot be empty');
    return;
  }
  // ... rest of save logic
};
```

### Add Toast Notification
```typescript
import { toast } from 'sonner'; // Already installed!

const handleSave = async () => {
  // ... save logic
  toast.success('Goal updated successfully!');
  onClose();
};
```

### Disable Delete for Certain Goals
```tsx
<button
  onClick={handleDelete}
  disabled={formData?.id.startsWith('locked-')}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  Delete Goal
</button>
```

## Performance Tips

1. **Memoization**: Component re-renders only when `isOpen` or `goal` changes
2. **Lazy Form Updates**: Form data only updates on user input
3. **Optimized Animations**: Uses CSS transforms instead of position changes
4. **Scroll Optimization**: Only content area is scrollable, not the whole panel

## Testing Tips

### Manual Testing
1. Click Edit on a goal → Panel should slide in
2. Change a field → Value should update
3. Click outside → Panel should close
4. Delete a goal → Should ask for confirmation
5. Save changes → Goal should update in the list

### Unit Test Example
```typescript
describe('GoalEditPanel', () => {
  it('should slide in when isOpen is true', () => {
    const { getByText } = render(
      <GoalEditPanel
        goal={mockGoal}
        isOpen={true}
        onClose={() => {}}
        onSave={() => {}}
        onDelete={() => {}}
      />
    );
    expect(getByText('Edit Goal')).toBeInTheDocument();
  });
});
```

## Related Files

- `src/app/App.tsx` - Main app that manages edit panel state
- `src/app/components/GoalsOverview.tsx` - Shows Edit button
- `src/app/types.ts` - Defines Goal type
- `src/app/data/mockData.ts` - Sample goal data

---

**Last Updated**: December 2025
**Component Version**: 1.0
**React Version**: 18.3+
