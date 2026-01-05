import { useState } from 'react';
import { Todo } from '../types';
import { CheckCircle, Circle, Star, Plus, X } from 'lucide-react';
import { TodoDetailPanel } from './TodoDetailPanel';

interface TodosPageProps {
  todos: Todo[];
  onAddTodo: (title: string) => void;
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleDone: (id: string, done: boolean) => void;
  onTogglePriority: (id: string, priority: boolean) => void;
}

export function TodosPage({
  todos,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleDone,
  onTogglePriority,
}: TodosPageProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Section 1: Today's tasks (not done)
  const todayTodos = todos
    .filter(t => {
      const todoDate = new Date(t.dueDate);
      todoDate.setHours(0, 0, 0, 0);
      return todoDate.getTime() === today.getTime() && !t.done;
    })
    .sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0));

  // Section 2: All tasks (including overdue, excluding today, not done)
  const allTodos = todos
    .filter(t => {
      const todoDate = new Date(t.dueDate);
      todoDate.setHours(0, 0, 0, 0);
      return todoDate.getTime() >= tomorrow.getTime() && !t.done;
    })
    .sort((a, b) => {
      // Sort by priority first, then by date
      if (a.priority !== b.priority) {
        return b.priority ? 1 : -1;
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  // Section 3: Completed tasks
  const completedTodos = todos
    .filter(t => t.done)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      onAddTodo(newTodoTitle);
      setNewTodoTitle('');
    }
  };

  const handleBulkMarkDone = () => {
    selectedIds.forEach(id => {
      onToggleDone(id, true);
    });
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  /**
   * TodoItem: A reusable component for rendering individual todo items
   * 
   * This demonstrates:
   * - Component composition (nested components)
   * - Conditional rendering with ternary operators
   * - Icon components from lucide-react
   * - Tailwind CSS for styling and hover effects
   */
  const TodoItem = ({ todo, isSelected = false }: { todo: Todo; isSelected?: boolean }) => (
    <div
      key={todo.id}
      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all group"
    >
      {/* Checkbox for bulk select */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleSelect(todo.id)}
        className="w-4 h-4 cursor-pointer accent-[#805232]"
      />

      {/* Done/Not Done Toggle - Shows different icon based on todo.done state */}
      <button
        onClick={() => onToggleDone(todo.id, !todo.done)}
        className="flex-shrink-0 text-[#805232] hover:text-[#805232] transition-colors"
      >
        {todo.done ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      {/* Priority Star - TODO for you */}
      {/*
       * TASK: Implement the priority star button
       * Current state: Empty button with Star icon
       * Requirements:
       * 1. onClick should call: onTogglePriority(todo.id, !todo.priority)
       * 2. Show filled star when todo.priority is true (use fill="#805232")
       * 3. Show empty star when todo.priority is false (use fill="none")
       * 4. Use same className styling for consistency
       * 
       * Hint: Look at the "Done/Not Done Toggle" button above for the pattern
       * The Star icon already has fill and stroke props available
       */}
      {/* START YOUR CODE HERE */}
      <button
        className="flex-shrink-0 text-gray-400 hover:text-[#805232] transition-colors"
      >
        {/* TODO: Add Star icon with conditional fill here */}
      </button>
      {/* END YOUR CODE HERE */}

      {/* Todo Title and Date - Clickable to open detail panel */}
      <div
        onClick={() => setSelectedTodo(todo)}
        className="flex-1 min-w-0 cursor-pointer"
      >
        <h3
          className={`text-sm font-medium ${
            todo.done
              ? 'line-through text-gray-400'
              : 'text-gray-900'
          }`}
        >
          {todo.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(todo.dueDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Delete Button - appears on hover */}
      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="flex-shrink-0 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#805232] mb-2">My Todos</h1>
        <p className="text-gray-600">Stay organized and productive</p>
      </div>

      {/* Quick Add Input */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">
            {selectedIds.size} selected
          </span>
          <button
            onClick={handleBulkMarkDone}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Mark as Done
          </button>
        </div>
      )}

      {/* Today Section */}
      {todayTodos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#805232] mb-4">Today</h2>
          <div className="space-y-3">
            {todayTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isSelected={selectedIds.has(todo.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Tasks Section */}
      {allTodos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#805232] mb-4">All Tasks</h2>
          <div className="space-y-3">
            {allTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isSelected={selectedIds.has(todo.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Section */}
      {completedTodos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#805232] mb-4">Completed</h2>
          <div className="space-y-3">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {todayTodos.length === 0 && allTodos.length === 0 && completedTodos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No todos yet. Add one to get started!</p>
        </div>
      )}

      {/* Todo Detail Panel */}
      {selectedTodo && (
        <TodoDetailPanel
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdate={(updatedTodo) => {
            onUpdateTodo(updatedTodo);
            setSelectedTodo(null);
          }}
          onDelete={() => {
            onDeleteTodo(selectedTodo.id);
            setSelectedTodo(null);
          }}
        />
      )}
    </div>
  );
}
