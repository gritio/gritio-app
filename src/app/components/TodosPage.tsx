import { useState, useRef, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Todo } from '../types';
import { CheckCircle, Circle, Plus, X, GripVertical } from 'lucide-react';
import { TodoDetailPanel } from './TodoDetailPanel';

const DRAG_TYPE = 'TODO_ITEM';

function DraggableTodoItem({
  todo,
  index,
  moveItem,
  onToggleDone,
  onDelete,
  onSelect,
}: {
  todo: Todo;
  index: number;
  moveItem: (from: number, to: number) => void;
  onToggleDone: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onSelect: (todo: Todo) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gripRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: { index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop<{ index: number }>({
    accept: DRAG_TYPE,
    hover(item) {
      if (!containerRef.current || item.index === index) return;
      moveItem(item.index, index);
      item.index = index;
    },
  });

  drag(gripRef);
  drop(containerRef);

  return (
    <div
      ref={containerRef}
      className={`flex items-center gap-3 p-3 bg-white border rounded-lg group transition-all ${
        isDragging ? 'opacity-40 shadow-lg border-[#805232]' : 'border-gray-200 hover:shadow-sm'
      }`}
    >
      <div
        ref={gripRef}
        className="flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      <button
        onClick={() => onToggleDone(todo.id, true)}
        className="flex-shrink-0 text-gray-300 hover:text-[#805232] transition-colors"
        title="Mark as done"
      >
        <Circle className="w-5 h-5" />
      </button>

      <span
        onClick={() => onSelect(todo)}
        className="flex-1 min-w-0 text-sm text-gray-800 cursor-pointer hover:text-[#805232] truncate"
      >
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
        title="Delete"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

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
}: TodosPageProps) {
  const [newTitle, setNewTitle] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [inProgressOrder, setInProgressOrder] = useState<string[]>([]);

  useEffect(() => {
    const inProgressIds = todos.filter(t => !t.done).map(t => t.id);
    setInProgressOrder(prev => {
      const kept = prev.filter(id => inProgressIds.includes(id));
      const added = inProgressIds.filter(id => !prev.includes(id));
      return [...kept, ...added];
    });
  }, [todos]);

  const inProgressTodos = inProgressOrder
    .map(id => todos.find(t => t.id === id && !t.done))
    .filter((t): t is Todo => !!t);

  const doneTodos = todos
    .filter(t => t.done)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const moveItem = useCallback((from: number, to: number) => {
    setInProgressOrder(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const handleAdd = () => {
    console.log('Add button clicked. Title:', newTitle);
    if (newTitle.trim()) {
      console.log('Calling onAddTodo with:', newTitle.trim());
      onAddTodo(newTitle.trim());
      setNewTitle('');
    } else {
      console.warn('Title is empty');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-2xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold text-[#805232] mb-4">My Todos</h1>

        {/* Add Todo */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#805232] focus:border-transparent"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {/* In Progress */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">In Progress</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {inProgressTodos.length}
            </span>
          </div>

          {inProgressTodos.length === 0 ? (
            <div className="text-center py-3 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-sm text-gray-400">No tasks in progress. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {inProgressTodos.map((todo, index) => (
                <DraggableTodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  moveItem={moveItem}
                  onToggleDone={onToggleDone}
                  onDelete={onDeleteTodo}
                  onSelect={setSelectedTodo}
                />
              ))}
            </div>
          )}
        </div>

        {/* Done */}
        {doneTodos.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Done</h2>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {doneTodos.length}
              </span>
            </div>
            <div className="space-y-2">
              {doneTodos.map(todo => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg group"
                >
                  <button
                    onClick={() => onToggleDone(todo.id, false)}
                    className="flex-shrink-0 text-[#805232] transition-colors"
                    title="Move back to in progress"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <span
                    onClick={() => setSelectedTodo(todo)}
                    className="flex-1 min-w-0 text-sm text-gray-400 line-through cursor-pointer hover:text-gray-600 truncate"
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
                    title="Delete"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedTodo && (
        <TodoDetailPanel
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdate={updated => {
            onUpdateTodo(updated);
            setSelectedTodo(null);
          }}
          onDelete={() => {
            onDeleteTodo(selectedTodo.id);
            setSelectedTodo(null);
          }}
        />
      )}
    </DndProvider>
  );
}
