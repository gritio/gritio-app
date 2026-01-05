# Claude Code Workflow Guide

## Getting Started with Claude Code in VS Code

### Installation
1. Open VS Code
2. Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)
3. Search for "Claude Code"
4. Click Install
5. Open the project folder in VS Code

### Opening Claude Code Terminal
- Use the terminal dropdown and select "Claude Code"
- Or press Ctrl+` and type "claude" in the dropdown

---

## Common Tasks & Commands

### ✅ Task 1: Start Development Server
```bash
npm install
npm run dev
```
Browser opens at `http://localhost:5173`

**When to use**: First time setup or after major dependency changes

---

### ✅ Task 2: Modify the Edit Panel Color Scheme
**Say to Claude Code:**
```
Change the GoalEditPanel colors to use purple instead of blue. 
Update the buttons and input focus states to match.
```

**What Claude Code will do:**
- Open `src/app/components/GoalEditPanel.tsx`
- Replace `bg-blue-600` with `bg-purple-600`
- Replace `focus:ring-blue-500` with `focus:ring-purple-500`
- Update button hover states accordingly

---

### ✅ Task 3: Add a New Field to Goals
**Say to Claude Code:**
```
Add a "priority" field to goals. It should be a dropdown with 
values: Low, Medium, High. Add it to the GoalEditPanel and 
the Goal type. Update mock data.
```

**Files that will be modified:**
1. `src/app/types.ts` - Add `priority: 'low' | 'medium' | 'high'`
2. `src/app/components/GoalEditPanel.tsx` - Add select dropdown
3. `src/app/data/mockData.ts` - Add priority to mock goals
4. `src/app/components/GoalsOverview.tsx` - Display priority

---

### ✅ Task 4: Change Panel Width
**Say to Claude Code:**
```
Make the edit panel wider - change from md (28rem) to lg (32rem)
```

**Single line change in GoalEditPanel.tsx:**
```tsx
// From: max-w-md
// To: max-w-lg
<div className={`... w-full max-w-lg ...`}
```

---

### ✅ Task 5: Add Toast Notifications (Already installed!)
**Say to Claude Code:**
```
Add success toast notification when a goal is saved.
Add error toast if there's a problem deleting.
Use the 'sonner' library that's already installed.
```

**What Claude Code will do:**
- Import `toast` from 'sonner'
- Add `toast.success('Goal updated!')` after save
- Add `toast.error('Could not delete goal')` on error

---

### ✅ Task 6: Disable Edit Button for Completed Goals
**Say to Claude Code:**
```
In GoalsOverview, disable the Edit button for goals with 
status 'completed'. Make it grayed out and show a tooltip 
saying "Completed goals cannot be edited".
```

**Changes:**
- Add `disabled` attribute when `status === 'completed'`
- Add opacity and cursor-not-allowed classes
- Wrap in Tooltip component from Radix UI

---

### ✅ Task 7: Add Validation to the Edit Form
**Say to Claude Code:**
```
Add validation to GoalEditPanel:
- Title must not be empty
- Yearly Measure must not be empty
- Progress must be between 0-100
Show error messages if validation fails
```

**Implementation:**
```typescript
const validate = () => {
  if (!formData?.title.trim()) {
    setError('Title is required');
    return false;
  }
  if (!formData?.yearlyMeasure.trim()) {
    setError('Yearly measure is required');
    return false;
  }
  if (formData.progress < 0 || formData.progress > 100) {
    setError('Progress must be between 0-100');
    return false;
  }
  return true;
};

const handleSave = () => {
  if (!validate()) return;
  // ... save logic
};
```

---

### ✅ Task 8: Add Undo/Redo Functionality
**Say to Claude Code:**
```
Add undo and redo buttons to the GoalEditPanel footer.
Keep a history of changes as the user edits.
Show keyboard shortcuts Ctrl+Z and Ctrl+Y.
```

**Implementation:**
- Use `useReducer` for change history
- Store before/after states
- Add keyboard event listeners

---

### ✅ Task 9: Export Goals as JSON
**Say to Claude Code:**
```
Add an "Export" button in GoalsOverview that downloads 
all goals as a JSON file named goals-backup.json
```

**Implementation:**
```typescript
const handleExport = () => {
  const data = JSON.stringify(goals, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'goals-backup.json';
  a.click();
};
```

---

### ✅ Task 10: Add Dark Mode
**Say to Claude Code:**
```
Add dark mode toggle to the navigation bar.
Use Tailwind's dark: prefix to style dark mode.
Save the preference to localStorage.
```

**Implementation:**
- Add dark mode provider from next-themes
- Add toggle button in nav
- Apply `dark:` classes throughout

---

## Debugging Tips

### Check the Console
- Press F12 to open DevTools
- Check for errors in Console tab
- View Network requests if making API calls

### Common Issues

**Port 5173 in use:**
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9
```

**Styles not updating:**
```bash
# Clear browser cache
# Ctrl+Shift+R (hard refresh)
```

**Module not found:**
```bash
# Reinstall node_modules
rm -rf node_modules
npm install
```

---

## Working with File Structure

### File Naming Conventions
- Components: PascalCase (e.g., `GoalEditPanel.tsx`)
- Utilities: camelCase (e.g., `calculations.ts`)
- Types: Define in `types.ts` file
- Styles: Keep with component or in `styles/`

### Quick Navigation
- `Ctrl+P` - Open file by name
- `Ctrl+F` - Find in current file
- `Ctrl+H` - Find and replace
- `Ctrl+Shift+F` - Find across project

---

## Git & Version Control

### Committing Changes
```bash
git status              # See what changed
git add .              # Stage all changes
git commit -m "Add edit panel feature"
git push               # Push to remote
```

### Useful Commit Messages
```
✨ Add goal edit panel feature
🐛 Fix date picker issue
📝 Update documentation
🎨 Improve UI styling
♻️ Refactor edit panel component
```

---

## Performance Optimization

### When to Optimize
1. **Large lists** - Use React.memo or useMemo
2. **Frequent re-renders** - Move state higher or use context
3. **Heavy computations** - Use useCallback with dependencies

### Check Performance
```
Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
Search: "Developer: Toggle Developer Tools"
Go to Performance tab, record, then interact with app
```

---

## Testing Commands

### Run Tests (if configured)
```bash
npm test              # Run all tests
npm test -- --watch  # Watch mode
```

### Manual Testing Checklist
- [ ] Can open edit panel
- [ ] Can edit all fields
- [ ] Can save changes
- [ ] Can delete goals
- [ ] Panel closes on overlay click
- [ ] Panel closes on cancel
- [ ] Changes reflect in main view
- [ ] Data persists on page reload (if backend added)

---

## Integration with Backend

### When Ready to Add Backend

**Say to Claude Code:**
```
Add API integration to save goals to a backend.
Use fetch() or axios to:
1. POST /api/goals - Create new goal
2. PUT /api/goals/:id - Update goal
3. DELETE /api/goals/:id - Delete goal
4. GET /api/goals - Fetch all goals

Add loading states and error handling.
```

### Example API Integration
```typescript
const handleSaveEditedGoal = async (updatedGoal: Goal) => {
  try {
    const response = await fetch(`/api/goals/${updatedGoal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGoal)
    });
    if (response.ok) {
      setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
    }
  } catch (error) {
    console.error('Failed to save goal:', error);
  }
};
```

---

## Keyboard Shortcuts for VS Code

```
Cmd+S / Ctrl+S       - Save file
Cmd+Shift+S / Ctrl+Shift+S - Save all
Cmd+K Cmd+C / Ctrl+K Ctrl+C - Comment line
Cmd+/ / Ctrl+/       - Toggle comment
F2                   - Rename symbol
Cmd+D / Ctrl+D       - Select word
Cmd+U / Ctrl+U       - Undo select
```

---

## Common Claude Code Requests

### Request Template
```
"In [component/file name], [action]
  - [specific change 1]
  - [specific change 2]
  
Context: [why you're making this change]
Use: [specific libraries/patterns if applicable]"
```

### Example Request
```
"In GoalEditPanel.tsx, improve the UX:
  - Add success feedback when goal is saved
  - Disable save button while saving
  - Show validation errors inline
  
Context: Users want to know when changes are saved
Use: Toast notifications from sonner library"
```

---

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)
- [Radix UI Components](https://www.radix-ui.com)

---

## Workflow Checklist

- [ ] Project installed and running
- [ ] Understand the component structure
- [ ] Can make simple UI changes
- [ ] Can add new fields to types
- [ ] Can use Claude Code effectively
- [ ] Know how to debug issues
- [ ] Ready to build more features

---

**Remember:** Always have `npm run dev` running in a terminal while developing. Changes hot-reload automatically!

Happy coding with Claude Code! 🚀
