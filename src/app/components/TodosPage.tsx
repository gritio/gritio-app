import { useState, useRef, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Todo, ReminderOptions } from '../types';
import {
  CheckCircle,
  Circle,
  Plus,
  X,
  GripVertical,
  Calendar,
  ListTodo,
  AlertTriangle,
  Sun,
  CalendarClock,
  CalendarPlus,
  CalendarCheck,
  LucideIcon,
} from 'lucide-react';
import { TodoDetailPanel } from './TodoDetailPanel';
import { DueDatePreset, getPresetISODate, getDueDateStatus } from '../utils/dueDate';
import { ReminderOptionsPanel } from './ReminderOptionsPanel';
import { formatReminderSchedule } from '../utils/reminder';

const DRAG_TYPE = 'TODO_ITEM';

const PRESETS: { key: DueDatePreset; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' },
  { key: 'weekend', label: 'Weekend' },
];

function DueDateChip({ dueDate }: { dueDate: Date }) {
  const status = getDueDateStatus(dueDate);
  const kindClasses = {
    overdue: 'bg-red-50 text-red-600',
    today: 'bg-amber-50 text-amber-700',
    upcoming: 'bg-gray-100 text-gray-500',
  } as const;

  return (
    <span
      className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${kindClasses[status.kind]}`}
    >
      {status.label}
    </span>
  );
}

function CalendarReminderButton({
  todo,
  calendarConnected,
  isPending,
  onOpenReminderPanel,
  onConnectCalendar,
}: {
  todo: Todo;
  calendarConnected: boolean;
  isPending: boolean;
  onOpenReminderPanel: () => void;
  onConnectCalendar: () => void;
}) {
  if (todo.googleEventId && todo.googleEventLink) {
    const schedule = formatReminderSchedule(todo);
    return (
      <button
        onClick={e => {
          e.stopPropagation();
          onOpenReminderPanel();
        }}
        className="flex-shrink-0 text-green-600 hover:text-green-700 transition-colors"
        title={schedule ? `${schedule} — click to edit` : 'On Google Calendar — click to edit'}
      >
        <CalendarCheck className="w-4 h-4" />
      </button>
    );
  }

  if (!calendarConnected) {
    return (
      <button
        onClick={e => {
          e.stopPropagation();
          onConnectCalendar();
        }}
        className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors"
        title="Connect Google Calendar to add reminders"
      >
        <CalendarPlus className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={e => {
        e.stopPropagation();
        if (!isPending) onOpenReminderPanel();
      }}
      disabled={isPending}
      className="flex-shrink-0 text-gray-300 hover:text-[#805232] transition-colors disabled:opacity-50"
      title="Add to Google Calendar"
    >
      <CalendarPlus className="w-4 h-4" />
    </button>
  );
}

type StatTone = 'brand' | 'overdue' | 'today' | 'upcoming';

const TONE_CLASSES: Record<StatTone, { active: string; inactive: string; iconInactive: string }> = {
  brand: {
    active: 'bg-[#805232] border-[#805232] text-white',
    inactive: 'bg-white border-gray-200 text-[#805232] hover:border-[#805232]/40',
    iconInactive: 'text-[#805232]/50',
  },
  overdue: {
    active: 'bg-red-600 border-red-600 text-white',
    inactive: 'bg-red-50/70 border-red-100 text-red-700 hover:border-red-300',
    iconInactive: 'text-red-400',
  },
  today: {
    active: 'bg-amber-500 border-amber-500 text-white',
    inactive: 'bg-amber-50/70 border-amber-100 text-amber-700 hover:border-amber-300',
    iconInactive: 'text-amber-400',
  },
  upcoming: {
    active: 'bg-slate-600 border-slate-600 text-white',
    inactive: 'bg-slate-50/70 border-slate-100 text-slate-700 hover:border-slate-300',
    iconInactive: 'text-slate-400',
  },
};

function StatTile({
  label,
  value,
  icon: Icon,
  tone,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tone: StatTone;
  active: boolean;
  onClick: () => void;
}) {
  const c = TONE_CLASSES[tone];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-3 p-4 rounded-xl border text-left transition-all ${active ? c.active + ' shadow-sm' : c.inactive}`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-semibold uppercase tracking-wide ${active ? 'text-white/75' : 'opacity-70'}`}>
          {label}
        </span>
        <Icon className={`w-4 h-4 ${active ? 'text-white/70' : c.iconInactive}`} />
      </div>
      <span className="text-2xl font-bold leading-none tabular-nums">{value}</span>
    </button>
  );
}

function DraggableTodoItem({
  todo,
  index,
  moveItem,
  onDragEnd,
  onToggleDone,
  onDelete,
  onSelect,
  calendarConnected,
  isReminderPending,
  onOpenReminderPanel,
  onConnectCalendar,
}: {
  todo: Todo;
  index: number;
  moveItem: (from: number, to: number) => void;
  onDragEnd: () => void;
  onToggleDone: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onSelect: (todo: Todo) => void;
  calendarConnected: boolean;
  isReminderPending: boolean;
  onOpenReminderPanel: () => void;
  onConnectCalendar: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gripRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: { index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
    end: () => onDragEnd(),
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
      className={`flex items-center gap-3 p-3.5 bg-white border rounded-lg shadow-sm group transition-all ${
        isDragging ? 'opacity-40 shadow-lg border-[#805232]' : 'border-gray-200 hover:shadow-md hover:border-gray-300'
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

      <DueDateChip dueDate={todo.dueDate} />

      <CalendarReminderButton
        todo={todo}
        calendarConnected={calendarConnected}
        isPending={isReminderPending}
        onOpenReminderPanel={onOpenReminderPanel}
        onConnectCalendar={onConnectCalendar}
      />

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

function StaticTodoItem({
  todo,
  onToggleDone,
  onDelete,
  onSelect,
  calendarConnected,
  isReminderPending,
  onOpenReminderPanel,
  onConnectCalendar,
}: {
  todo: Todo;
  onToggleDone: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onSelect: (todo: Todo) => void;
  calendarConnected: boolean;
  isReminderPending: boolean;
  onOpenReminderPanel: () => void;
  onConnectCalendar: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-md hover:border-gray-300 transition-all">
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

      <DueDateChip dueDate={todo.dueDate} />

      <CalendarReminderButton
        todo={todo}
        calendarConnected={calendarConnected}
        isPending={isReminderPending}
        onOpenReminderPanel={onOpenReminderPanel}
        onConnectCalendar={onConnectCalendar}
      />

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

type DueDateFilter = 'all' | 'today' | 'overdue' | 'upcoming';

interface TodosPageProps {
  todos: Todo[];
  onAddTodo: (title: string, dueDate: string) => void;
  onUpdateTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  onToggleDone: (id: string, done: boolean) => void;
  onTogglePriority: (id: string, priority: boolean) => void;
  onReorder: (orderedIds: string[]) => void;
  calendarConnected: boolean;
  onCreateReminder: (todoId: string, options: ReminderOptions) => Promise<void>;
  onUpdateReminder: (todoId: string, options: ReminderOptions) => Promise<void>;
  onConnectCalendar: () => void;
}

export function TodosPage({
  todos,
  onAddTodo,
  onUpdateTodo,
  onDeleteTodo,
  onToggleDone,
  onReorder,
  calendarConnected,
  onCreateReminder,
  onUpdateReminder,
  onConnectCalendar,
}: TodosPageProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState(getPresetISODate('today'));
  const [selectedPreset, setSelectedPreset] = useState<DueDatePreset | null>('today');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [inProgressOrder, setInProgressOrder] = useState<string[]>([]);
  const [filter, setFilter] = useState<DueDateFilter>('all');
  const [pendingReminderIds, setPendingReminderIds] = useState<Set<string>>(new Set());
  const [reminderPanelTodo, setReminderPanelTodo] = useState<Todo | null>(null);

  const handleSaveReminder = async (todoId: string, options: ReminderOptions, isEditing: boolean) => {
    setPendingReminderIds(prev => new Set(prev).add(todoId));
    try {
      if (isEditing) {
        await onUpdateReminder(todoId, options);
      } else {
        await onCreateReminder(todoId, options);
      }
    } finally {
      setPendingReminderIds(prev => {
        const next = new Set(prev);
        next.delete(todoId);
        return next;
      });
    }
  };

  const handleSubmitReminder = (options: ReminderOptions) => {
    if (!reminderPanelTodo) return;
    const todoId = reminderPanelTodo.id;
    const isEditing = !!reminderPanelTodo.googleEventId;
    setReminderPanelTodo(null);
    handleSaveReminder(todoId, options, isEditing);
  };

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

  const overdueCount = inProgressTodos.filter(t => getDueDateStatus(t.dueDate).kind === 'overdue').length;
  const todayCount = inProgressTodos.filter(t => getDueDateStatus(t.dueDate).kind === 'today').length;
  const upcomingCount = inProgressTodos.filter(t => getDueDateStatus(t.dueDate).kind === 'upcoming').length;

  const visibleTodos = inProgressTodos.filter(t => {
    if (filter === 'all') return true;
    return getDueDateStatus(t.dueDate).kind === filter;
  });

  const doneTodos = todos
    .filter(t => t.done)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const inProgressOrderRef = useRef(inProgressOrder);
  inProgressOrderRef.current = inProgressOrder;

  const moveItem = useCallback((from: number, to: number) => {
    setInProgressOrder(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const handleDragEnd = useCallback(() => {
    onReorder(inProgressOrderRef.current);
  }, [onReorder]);

  const handleAdd = () => {
    if (newTitle.trim()) {
      onAddTodo(newTitle.trim(), newDueDate);
      setNewTitle('');
      setNewDueDate(getPresetISODate('today'));
      setSelectedPreset('today');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#805232] mb-6">My Todos</h1>

        {/* Add Todo */}
        <div className="mb-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#805232] focus:border-transparent"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2.5 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors flex items-center gap-1.5 text-sm font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {PRESETS.map(preset => (
              <button
                key={preset.key}
                type="button"
                onClick={() => {
                  setNewDueDate(getPresetISODate(preset.key));
                  setSelectedPreset(preset.key);
                }}
                className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
                  selectedPreset === preset.key
                    ? 'bg-[#805232] text-white border-[#805232]'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-[#805232] hover:text-[#805232]'
                }`}
              >
                {preset.label}
              </button>
            ))}
            <label
              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer transition-colors ${
                selectedPreset !== null
                  ? 'bg-white text-gray-500 border-gray-300 hover:border-[#805232] hover:text-[#805232]'
                  : 'bg-[#805232] text-white border-[#805232]'
              }`}
            >
              <Calendar className="w-3 h-3" />
              {selectedPreset !== null
                ? 'Pick date'
                : new Date(newDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              <input
                type="date"
                value={newDueDate}
                onChange={e => {
                  if (!e.target.value) return;
                  setNewDueDate(e.target.value);
                  setSelectedPreset(null);
                }}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* Stat tiles — also the In Progress filter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatTile
            label="Total"
            value={inProgressTodos.length}
            icon={ListTodo}
            tone="brand"
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <StatTile
            label="Overdue"
            value={overdueCount}
            icon={AlertTriangle}
            tone="overdue"
            active={filter === 'overdue'}
            onClick={() => setFilter('overdue')}
          />
          <StatTile
            label="Today"
            value={todayCount}
            icon={Sun}
            tone="today"
            active={filter === 'today'}
            onClick={() => setFilter('today')}
          />
          <StatTile
            label="Upcoming"
            value={upcomingCount}
            icon={CalendarClock}
            tone="upcoming"
            active={filter === 'upcoming'}
            onClick={() => setFilter('upcoming')}
          />
        </div>

        {/* In Progress */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {filter === 'all' ? 'In Progress' : `In Progress · ${filter[0].toUpperCase()}${filter.slice(1)}`}
          </h2>

          {visibleTodos.length === 0 ? (
            <div className="text-center py-3 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-sm text-gray-400">
                {inProgressTodos.length === 0
                  ? 'No tasks in progress. Add one above!'
                  : 'Nothing here for this filter.'}
              </p>
            </div>
          ) : filter === 'all' ? (
            <div className="space-y-2">
              {visibleTodos.map((todo, index) => (
                <DraggableTodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                  moveItem={moveItem}
                  onDragEnd={handleDragEnd}
                  onToggleDone={onToggleDone}
                  onDelete={onDeleteTodo}
                  onSelect={setSelectedTodo}
                  calendarConnected={calendarConnected}
                  isReminderPending={pendingReminderIds.has(todo.id)}
                  onOpenReminderPanel={() => setReminderPanelTodo(todo)}
                  onConnectCalendar={onConnectCalendar}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {visibleTodos.map(todo => (
                <StaticTodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleDone={onToggleDone}
                  onDelete={onDeleteTodo}
                  onSelect={setSelectedTodo}
                  calendarConnected={calendarConnected}
                  isReminderPending={pendingReminderIds.has(todo.id)}
                  onOpenReminderPanel={() => setReminderPanelTodo(todo)}
                  onConnectCalendar={onConnectCalendar}
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
          calendarConnected={calendarConnected}
          isReminderPending={pendingReminderIds.has(selectedTodo.id)}
          onOpenReminderPanel={() => setReminderPanelTodo(selectedTodo)}
          onConnectCalendar={onConnectCalendar}
        />
      )}

      {reminderPanelTodo && (
        <ReminderOptionsPanel
          todo={reminderPanelTodo}
          onClose={() => setReminderPanelTodo(null)}
          onSubmit={handleSubmitReminder}
          isSubmitting={false}
        />
      )}
    </DndProvider>
  );
}
