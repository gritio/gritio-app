import { useState } from 'react';
import { Todo } from '../types';
import { X, Trash2 } from 'lucide-react';

interface TodoDetailPanelProps {
  todo: Todo;
  onClose: () => void;
  onUpdate: (todo: Todo) => void;
  onDelete: () => void;
}

/**
 * TodoDetailPanel: A side panel that slides in from the right when a todo is clicked
 * 
 * This component demonstrates:
 * - State management with useState
 * - TypeScript interfaces for prop typing
 * - Controlled form inputs
 * - Event handling (onChange, onClick)
 * - Conditional rendering
 * - Tailwind CSS for styling and animations
 */
export function TodoDetailPanel({
  todo,
  onClose,
  onUpdate,
  onDelete,
}: TodoDetailPanelProps) {
  // State: Local form values (similar to EditMonthlyGoal in CollapsibleGoalRow)
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [dueDate, setDueDate] = useState(
    new Date(todo.dueDate).toISOString().split('T')[0]
  );
  const [isSaving, setIsSaving] = useState(false);

  // TODO: Add a state for tracking if there are unsaved changes
  // Hint: Use a boolean state to show a "you have unsaved changes" warning
  // Similar pattern: Look at how 'editingId' is used in CollapsibleGoalRow.tsx line 33

  const handleSave = async () => {
    // TODO: Add validation before saving
    // Requirements:
    // 1. Check if title is not empty (trim it first)
    // 2. Show an error toast/alert if invalid
    // Hint: Look at how handleAddTodo validates in TodosPage.tsx
    
    setIsSaving(true);
    try {
      // Create updated todo object with new values
      const updatedTodo: Todo = {
        ...todo,
        title,
        description,
        dueDate: new Date(dueDate),
      };
      onUpdate(updatedTodo);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    // Confirmation dialog before deleting
    if (confirm('Are you sure you want to delete this todo?')) {
      onDelete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay: Semi-transparent dark background that dismisses the panel on click */}
      <div
        className="flex-1 bg-black bg-opacity-60"
        onClick={onClose}
      />

      {/* Side Panel: Slides in from the right */}
      <div className="w-96 bg-white shadow-2xl flex flex-col">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#805232]">Edit Todo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ===== SCROLLABLE CONTENT AREA ===== */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
            />
          </div>

          {/* Description Input - TODO for you */}
          {/* 
           * TASK: Create a textarea for description similar to the title input above
           * Requirements:
           * 1. Add a label "Description (optional)"
           * 2. Create a textarea with:
           *    - value={description}
           *    - onChange={(e) => setDescription(e.target.value)}
           *    - rows={4} (to make it tall enough)
           *    - placeholder="Add more details..."
           *    - Same className styling as title input
           * 
           * Hint: Look at WeightProgressModal.tsx or UpdateProgressPanel.tsx for textarea examples
           * You can also look at TodosPage.tsx quickAdd section for pattern
           */}
          {/* START YOUR CODE HERE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            {/* TODO: Add textarea here */}
          </div>
          {/* END YOUR CODE HERE */}

          {/* Due Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date *
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
            />
          </div>

          {/* Status Info - Read-only display */}
          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 space-y-2">
            <p>
              <strong>Status:</strong>{' '}
              {todo.done ? (
                <span className="text-green-600 font-medium">✓ Completed</span>
              ) : (
                <span className="text-amber-600 font-medium">○ Pending</span>
              )}
            </p>
            <p>
              <strong>Priority:</strong>{' '}
              {todo.priority ? (
                <span className="text-[#805232] font-medium">⭐ High</span>
              ) : (
                <span>Normal</span>
              )}
            </p>
          </div>
        </div>

        {/* ===== FOOTER WITH ACTION BUTTONS ===== */}
        <div className="border-t border-gray-200 p-6 space-y-3">
          {/* Save Button - disabled while saving */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors disabled:opacity-50 font-medium"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>

          {/* Delete Button - TODO for you */}
          {/*
           * TASK: Create a delete button similar to the save button above
           * Requirements:
           * 1. onClick should call handleDelete()
           * 2. Use red colors for danger action (border-red-300, text-red-600, hover:bg-red-50)
           * 3. Include Trash2 icon from lucide-react (already imported)
           * 4. Add gap-2 for spacing between icon and text
           * 5. Add text "Delete Todo"
           * 
           * Hint: Look at any delete buttons in GoalDetail.tsx or CollapsibleGoalRow.tsx
           * The structure should be: flex items-center justify-center gap-2
           */}
          {/* START YOUR CODE HERE */}
          {/* TODO: Add delete button here */}
          {/* END YOUR CODE HERE */}
        </div>
      </div>
    </div>
  );
}
