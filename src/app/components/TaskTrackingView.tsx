import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Task, Goal } from '../types';
import { tasksApi } from '../services/api';
import { RingProgress } from './RingProgress';
import { TRACKING_COLORS, GOAL_DOT_COLORS } from '../constants/colors';
import { toast } from 'sonner';

interface TaskTrackingViewProps {
  tasks: Task[];
  goals: Goal[];
  defaultTab?: 'today' | 'weekly' | 'monthly';
  onTasksUpdate?: () => void;
}

type Tab = 'today' | 'weekly' | 'monthly';

// Returns Monday-based week dates for the given offset (0 = this week)
function getWeekDates(weekOffset: number): Date[] {
  const today = new Date();
  const dow = today.getUTCDay(); // 0=Sun, 1=Mon...
  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - ((dow + 6) % 7) + weekOffset * 7);
  monday.setUTCHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    return d;
  });
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function todayKey(): string {
  return toDateKey(new Date());
}

function isToday(date: Date): boolean {
  return toDateKey(date) === todayKey();
}

function isPast(date: Date): boolean {
  const d = new Date(date);
  d.setUTCHours(23, 59, 59, 999);
  return d < new Date();
}

// True for checkbox-style tasks (NUMBER type = done/not-done per occurrence)
function isCheckbox(task: Task): boolean {
  return task.type?.toLowerCase() === 'number';
}

// Weekly target: how many times/days should this task be done in a week
function getWeeklyTarget(task: Task): number {
  if (task.timesPerWeek) return task.timesPerWeek;
  if (task.frequency?.toLowerCase() === 'weekly') return task.target; // aggregate target
  return 7; // daily task: 7 days per week
}

// For ring numerator: for checkbox/daily tasks count days done; for time/weekly aggregate sum values
function getWeeklyValue(task: Task, completions: Record<string, number>): number {
  const vals = Object.values(completions);
  if (task.frequency?.toLowerCase() === 'weekly' && !isCheckbox(task)) {
    return vals.reduce((s, v) => s + v, 0);
  }
  return vals.filter(v => v > 0).length;
}

function getGoalColor(goalId: string, goals: Goal[]): string {
  const idx = goals.findIndex(g => g.id === goalId);
  return GOAL_DOT_COLORS[idx % GOAL_DOT_COLORS.length];
}

// Groups tasks by goalId, preserving goal order
function groupTasksByGoal(tasks: Task[], goals: Goal[]): { goal: Goal; tasks: Task[] }[] {
  const goalMap = new Map(goals.map(g => [g.id, g]));
  const groups: Map<string, Task[]> = new Map();
  for (const task of tasks) {
    const gid = task.goalId;
    if (!groups.has(gid)) groups.set(gid, []);
    groups.get(gid)!.push(task);
  }
  return Array.from(groups.entries())
    .map(([gid, ts]) => ({ goal: goalMap.get(gid)!, tasks: ts }))
    .filter(g => g.goal);
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function TaskTrackingView({ tasks, goals, defaultTab = 'today', onTasksUpdate }: TaskTrackingViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  // { taskId: { dateKey: value } }
  const [weekCompletions, setWeekCompletions] = useState<Record<string, Record<string, number>>>({});
  // { taskId: { dateKey: value } }
  const [monthCompletions, setMonthCompletions] = useState<Record<string, Record<string, number>>>({});
  const [monthLoaded, setMonthLoaded] = useState(false);

  // Today tab inputs: { taskId: string (number input) | boolean (checkbox) }
  const [todayInputs, setTodayInputs] = useState<Record<string, string | boolean>>({});
  const [loadingWeek, setLoadingWeek] = useState(false);

  const weekDates = getWeekDates(weekOffset);

  const fetchWeekCompletions = useCallback(async () => {
    if (tasks.length === 0) return;
    setLoadingWeek(true);
    const daysNeeded = 7 + Math.abs(weekOffset) * 7 + 7;
    try {
      const results = await Promise.all(
        tasks.map(async (task) => {
          try {
            const history = await tasksApi.getHistory(task.id, daysNeeded);
            const map: Record<string, number> = {};
            for (const rec of history) {
              const key = rec.date ? rec.date.slice(0, 10) : null;
              if (key) map[key] = rec.value !== undefined && rec.value !== null ? Number(rec.value) : (rec.completed ? 1 : 0);
            }
            return { taskId: task.id, map };
          } catch {
            return { taskId: task.id, map: {} };
          }
        })
      );
      const comp: Record<string, Record<string, number>> = {};
      for (const { taskId, map } of results) comp[taskId] = map;
      setWeekCompletions(comp);
    } finally {
      setLoadingWeek(false);
    }
  }, [tasks, weekOffset]);

  useEffect(() => {
    fetchWeekCompletions();
  }, [fetchWeekCompletions]);

  const fetchMonthCompletions = useCallback(async () => {
    if (tasks.length === 0) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 + monthOffset;
    const adjYear = year + Math.floor((month - 1) / 12);
    const adjMonth = ((month - 1 + 12) % 12) + 1;
    try {
      const results = await Promise.all(
        tasks.map(async (task) => {
          try {
            const data = await tasksApi.getMonthCompletions(task.id, adjYear, adjMonth);
            const map: Record<string, number> = {};
            for (const rec of data) {
              const key = rec.date ? rec.date.slice(0, 10) : null;
              if (key) map[key] = rec.value !== undefined && rec.value !== null ? Number(rec.value) : (rec.completed ? 1 : 0);
            }
            return { taskId: task.id, map };
          } catch {
            return { taskId: task.id, map: {} };
          }
        })
      );
      const comp: Record<string, Record<string, number>> = {};
      for (const { taskId, map } of results) comp[taskId] = map;
      setMonthCompletions(comp);
      setMonthLoaded(true);
    } catch {
      setMonthLoaded(true);
    }
  }, [tasks, monthOffset]);

  useEffect(() => {
    if (activeTab === 'monthly') {
      setMonthLoaded(false);
      fetchMonthCompletions();
    }
  }, [activeTab, fetchMonthCompletions]);

  // Seed todayInputs from fetched completions
  useEffect(() => {
    const key = todayKey();
    const inputs: Record<string, string | boolean> = {};
    for (const task of tasks) {
      const val = weekCompletions[task.id]?.[key];
      if (isCheckbox(task)) {
        inputs[task.id] = val !== undefined && val !== null ? val > 0 : false;
      } else {
        inputs[task.id] = val !== undefined && val !== null ? String(val) : '';
      }
    }
    setTodayInputs(inputs);
  }, [weekCompletions, tasks]);

  // --- Header metrics ---
  const today = new Date();
  const thisWeekDates = getWeekDates(0);

  const todayCompletedCount = tasks.filter(t => {
    const val = weekCompletions[t.id]?.[todayKey()];
    return val && val > 0;
  }).length;

  const weekPct = tasks.length === 0 ? 0 : Math.round(
    tasks.reduce((sum, t) => {
      const comp = weekCompletions[t.id] || {};
      const weekComp: Record<string, number> = {};
      for (const d of thisWeekDates) {
        const k = toDateKey(d);
        if (comp[k]) weekComp[k] = comp[k];
      }
      const val = getWeeklyValue(t, weekComp);
      const max = getWeeklyTarget(t);
      return sum + Math.min(val / Math.max(max, 1), 1);
    }, 0) / tasks.length * 100
  );

  // --- Auto-save today (checkbox toggle or numeric blur) ---
  const handleTodaySave = async (task: Task, value: number) => {
    const key = todayKey();

    // Optimistic update — instant UI response
    setWeekCompletions(prev => ({
      ...prev,
      [task.id]: { ...prev[task.id], [key]: value }
    }));

    try {
      await tasksApi.logCompletion(task.id, key, value);
      // Refetch in background to catch any server-side changes
      fetchWeekCompletions();
      onTasksUpdate?.();
    } catch {
      // Revert on error
      await fetchWeekCompletions();
      toast.error('Failed to save.');
    }
  };

  // --- Inline weekly cell save ---
  const handleWeeklyCellSave = async (task: Task, date: Date, value: number) => {
    const key = toDateKey(date);

    // Optimistic update — instant UI response
    setWeekCompletions(prev => ({
      ...prev,
      [task.id]: { ...prev[task.id], [key]: value }
    }));

    try {
      await tasksApi.logCompletion(task.id, key, value);
      // Refetch in background to catch any server-side changes
      fetchWeekCompletions();
      onTasksUpdate?.();
    } catch {
      // Revert on error
      await fetchWeekCompletions();
      toast.error('Failed to save.');
    }
  };

  const groups = groupTasksByGoal(tasks, goals);

  const now = new Date();
  const monthDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const monthName = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // Build month calendar days
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const firstDow = (monthDate.getDay() + 6) % 7; // 0=Mon offset

  // Compute per-day stats for month view
  const monthDayStats: { day: number; completed: number; total: number }[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
    const key = toDateKey(date);
    let completed = 0;
    for (const task of tasks) {
      const val = monthCompletions[task.id]?.[key];
      if (val && val > 0) completed++;
    }
    monthDayStats.push({ day: d, completed, total: tasks.length });
  }

  // --- Render ---
  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '1.5rem 1.5rem' }}>

      {/* Persistent Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', gap: 16 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>
            {today.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#6b7280', marginTop: 3 }}>
            {today.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, minWidth: 270 }}>
          <MetricCard label="Today" value={`${todayCompletedCount}`} suffix={`/${tasks.length}`} />
          <MetricCard label="Week" value={`${weekPct}`} suffix="%" />
          <MetricCard label="Month" value="–" suffix="" />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 10, padding: 3, marginBottom: '1.5rem', gap: 2 }}>
        {(['today', 'weekly', 'monthly'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '7px 0',
              fontSize: 13,
              fontWeight: activeTab === tab ? 600 : 500,
              cursor: 'pointer',
              background: activeTab === tab ? '#fff' : 'transparent',
              color: activeTab === tab ? '#185FA5' : '#6b7280',
              border: 'none',
              borderRadius: 8,
              boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              outline: 'none',
              transition: 'all 0.15s',
            }}
          >
            {tab === 'today' ? 'Today' : tab === 'weekly' ? 'This week' : 'This month'}
          </button>
        ))}
      </div>

      {/* TODAY TAB */}
      {activeTab === 'today' && (
        <div>
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            groups.map(({ goal, tasks: gtasks }, gi) => (
              <div key={goal.id}>
                <GoalGroupHeader goal={goal} color={GOAL_DOT_COLORS[gi % GOAL_DOT_COLORS.length]} />
                {gtasks.map(task => {
                  const comp = weekCompletions[task.id] || {};
                  const weekComp: Record<string, number> = {};
                  for (const d of thisWeekDates) {
                    const k = toDateKey(d);
                    if (comp[k]) weekComp[k] = comp[k];
                  }
                  const ringVal = getWeeklyValue(task, weekComp);
                  const ringMax = getWeeklyTarget(task);
                  const doneCount = Object.values(weekComp).filter(v => v > 0).length;
                  const checkbox = isCheckbox(task);
                  const inputVal = todayInputs[task.id];
                  const isChecked = checkbox && Boolean(inputVal);

                  return (
                    <div key={task.id} style={{
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: 12,
                      padding: '12px 16px',
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}>
                      <RingProgress value={ringVal} max={ringMax} size="lg" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 3 }}>
                          {task.title}
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>
                          {checkbox
                            ? `${doneCount} done this week · target ${ringMax}`
                            : `${ringVal} ${task.unit || ''} logged · target ${ringMax}`}
                        </div>
                      </div>
                      {checkbox ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                          <button
                            onClick={async () => {
                              const newChecked = !isChecked;
                              setTodayInputs(prev => ({ ...prev, [task.id]: newChecked }));
                              await handleTodaySave(task, newChecked ? 1 : 0);
                            }}
                            style={{
                              width: 34, height: 34, borderRadius: '50%',
                              border: isChecked ? 'none' : '2px solid #d1d5db',
                              background: isChecked ? TRACKING_COLORS.ringGreen : '#f9fafb',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', flexShrink: 0,
                              color: isChecked ? '#fff' : '#9ca3af',
                              transition: 'all 0.15s',
                            }}
                          >
                            <Check size={15} strokeWidth={isChecked ? 2.5 : 1.5} />
                          </button>
                          <span style={{ fontSize: 12, fontWeight: 500, color: isChecked ? TRACKING_COLORS.ringGreen : '#6b7280' }}>
                            {isChecked ? 'Done' : 'Mark done'}
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                          <input
                            type="number"
                            value={String(inputVal || '')}
                            onChange={e => setTodayInputs(prev => ({ ...prev, [task.id]: e.target.value }))}
                            onBlur={async e => {
                              const n = parseFloat(e.target.value);
                              if (!isNaN(n) && n >= 0) await handleTodaySave(task, n);
                            }}
                            onKeyDown={async e => {
                              if (e.key === 'Enter') {
                                const n = parseFloat(String(inputVal || ''));
                                if (!isNaN(n) && n >= 0) await handleTodaySave(task, n);
                                (e.target as HTMLInputElement).blur();
                              }
                            }}
                            placeholder="0"
                            style={{
                              width: 72, height: 34, fontSize: 14, fontWeight: 500,
                              textAlign: 'center',
                              border: '1.5px solid #e5e7eb',
                              borderRadius: 8,
                              background: '#f9fafb',
                              color: '#1f2937',
                              outline: 'none',
                            }}
                          />
                          <span style={{ fontSize: 12, fontWeight: 500, color: '#6b7280' }}>
                            {task.unit || 'units'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}

      {/* WEEKLY TAB */}
      {activeTab === 'weekly' && (
        <div>
          {/* Week navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button
              onClick={() => setWeekOffset(w => w - 1)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)' }}
            >
              <ChevronLeft size={16} /> prev
            </button>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>
              {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} –{' '}
              {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <button
              onClick={() => setWeekOffset(w => w + 1)}
              disabled={weekOffset >= 0}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, fontSize: 13,
                background: 'none', border: 'none',
                cursor: weekOffset >= 0 ? 'not-allowed' : 'pointer',
                color: weekOffset >= 0 ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
                opacity: weekOffset >= 0 ? 0.4 : 1,
              }}
            >
              next <ChevronRight size={16} />
            </button>
          </div>

          {/* Grid header */}
          <WeeklyGridRow isHeader weekDates={weekDates} />

          {tasks.length === 0 ? <EmptyState /> : groups.map(({ goal, tasks: gtasks }, gi) => (
            <div key={goal.id}>
              <GoalGroupHeader goal={goal} color={GOAL_DOT_COLORS[gi % GOAL_DOT_COLORS.length]} />
              {gtasks.map(task => {
                const comp = weekCompletions[task.id] || {};
                const weekComp: Record<string, number> = {};
                for (const d of weekDates) {
                  const k = toDateKey(d);
                  if (comp[k]) weekComp[k] = comp[k];
                }
                const ringVal = getWeeklyValue(task, weekComp);
                const ringMax = getWeeklyTarget(task);
                const checkbox = isCheckbox(task);

                return (
                  <div key={task.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '32px minmax(0,160px) repeat(7,1fr) 48px',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: '0.5px solid var(--color-border-tertiary)',
                    gap: 0,
                  }}>
                    {/* Ring */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <RingProgress value={ringVal} max={ringMax} size="sm" />
                    </div>
                    {/* Task name */}
                    <div style={{ fontSize: 13, color: 'var(--color-text-primary)', paddingLeft: 4 }}>
                      {task.title}{' '}
                      <span style={{ color: 'var(--color-text-tertiary)', fontSize: 11 }}>
                        {task.timesPerWeek ? `${task.timesPerWeek}x/wk` : task.frequency?.toLowerCase() === 'daily' ? 'daily' : ''}
                      </span>
                    </div>
                    {/* Day cells */}
                    {weekDates.map((date, di) => {
                      const key = toDateKey(date);
                      const val = comp[key];
                      const today_ = isToday(date);
                      const past = isPast(date) && !today_;
                      const future = !today_ && !past;
                      // For checkboxes: done if val > 0. For numeric: never "done" (val is just a number)
                      const done = checkbox && val !== undefined && val > 0;
                      const missed = past && !done;

                      return (
                        <div key={di} style={{ display: 'flex', justifyContent: 'center' }}>
                          {future ? (
                            <span style={{
                              width: 22, height: 22, borderRadius: '50%',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              background: 'var(--color-background-secondary)',
                              border: '0.5px solid var(--color-border-tertiary)',
                              fontSize: 9, color: 'var(--color-text-tertiary)',
                            }}>·</span>
                          ) : today_ ? (
                            checkbox ? (
                              <button
                                onClick={async () => {
                                  const newVal = done ? 0 : 1;
                                  await handleWeeklyCellSave(task, date, newVal);
                                }}
                                style={{
                                  width: 22, height: 22, borderRadius: '50%',
                                  background: done ? TRACKING_COLORS.doneDot : 'var(--color-background-secondary)',
                                  border: done ? 'none' : `2px solid ${TRACKING_COLORS.todayBlue}`,
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  cursor: 'pointer',
                                  color: done ? '#fff' : 'transparent',
                                }}
                              >
                                {done && <Check size={10} />}
                              </button>
                            ) : (
                              <WeeklyNumInput
                                value={val}
                                onSave={v => handleWeeklyCellSave(task, date, v)}
                                active
                              />
                            )
                          ) : done ? (
                            <span style={{
                              width: 22, height: 22, borderRadius: '50%',
                              background: TRACKING_COLORS.doneDot,
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 10, color: '#fff',
                            }}>
                              <Check size={10} />
                            </span>
                          ) : missed ? (
                            checkbox ? (
                              <button
                                onClick={async () => handleWeeklyCellSave(task, date, done ? 0 : 1)}
                                style={{
                                  width: 22, height: 22, borderRadius: '50%',
                                  background: TRACKING_COLORS.missedDot,
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: 10, color: '#A32D2D', border: 'none', cursor: 'pointer',
                                }}
                              >
                                <X size={10} />
                              </button>
                            ) : (
                              <WeeklyNumInput
                                value={undefined}
                                onSave={v => handleWeeklyCellSave(task, date, v)}
                                missed
                              />
                            )
                          ) : null}
                        </div>
                      );
                    })}
                    {/* Week pill */}
                    <div style={{ textAlign: 'right', paddingRight: 4 }}>
                      <WeekPill value={ringVal} max={ringMax} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* MONTHLY TAB */}
      {activeTab === 'monthly' && (
        <div>
          {/* Month navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button
              onClick={() => { setMonthOffset(m => m - 1); setMonthLoaded(false); }}
              style={{ fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              <ChevronLeft size={16} /> {new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1).toLocaleString('en-US', { month: 'short' })}
            </button>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{monthName}</span>
            <button
              onClick={() => { setMonthOffset(m => m + 1); setMonthLoaded(false); }}
              disabled={monthOffset >= 0}
              style={{
                fontSize: 13, background: 'none', border: 'none',
                cursor: monthOffset >= 0 ? 'not-allowed' : 'pointer',
                color: monthOffset >= 0 ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
                opacity: monthOffset >= 0 ? 0.4 : 1,
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              {new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1).toLocaleString('en-US', { month: 'short' })} <ChevronRight size={16} />
            </button>
          </div>

          {/* Day-of-week headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
            {DAY_LABELS.map((l, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-text-tertiary)' }}>{l}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {/* Empty cells before first day */}
            {Array.from({ length: firstDow }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {monthDayStats.map(({ day, completed, total }) => {
              const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
              const today_ = isToday(date);
              const past = isPast(date) && !today_;
              const future = !today_ && !past;
              const pct = total > 0 ? completed / total : 0;
              const bg = future
                ? 'var(--color-background-secondary)'
                : today_ && !monthLoaded
                ? 'var(--color-background-secondary)'
                : pct === 1 ? TRACKING_COLORS.monthFull
                : pct > 0 ? TRACKING_COLORS.monthPartial
                : past ? TRACKING_COLORS.monthMissed
                : 'var(--color-background-secondary)';
              const textColor = pct === 1 ? '#04342C' : pct > 0 ? '#085041' : past ? '#791F1F' : 'var(--color-text-secondary)';

              return (
                <div
                  key={day}
                  style={{
                    borderRadius: 'var(--border-radius-md)',
                    padding: '5px 3px',
                    textAlign: 'center',
                    minHeight: 46,
                    background: bg,
                    boxShadow: today_ ? `0 0 0 2px ${TRACKING_COLORS.todayBlue}` : 'none',
                    opacity: future ? 0.35 : 1,
                    cursor: past ? 'pointer' : 'default',
                  }}
                >
                  <div style={{ fontSize: 11, color: textColor }}>{day}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, marginTop: 3, color: textColor }}>
                    {future ? '–' : monthLoaded ? `${completed}/${total}` : '…'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12, fontSize: 12, color: 'var(--color-text-secondary)', flexWrap: 'wrap' }}>
            <span><LegendDot color={TRACKING_COLORS.monthFull} /> All done</span>
            <span><LegendDot color={TRACKING_COLORS.monthPartial} /> Partial</span>
            <span><LegendDot color={TRACKING_COLORS.monthMissed} /> Missed</span>
            <span style={{ marginLeft: 'auto' }}>Tap any past day to view or edit</span>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sub-components ---

function MetricCard({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 10,
      padding: '10px 14px',
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#1f2937', lineHeight: 1 }}>
        {value}<span style={{ fontSize: 13, fontWeight: 400, color: '#9ca3af' }}>{suffix}</span>
      </div>
    </div>
  );
}

function GoalGroupHeader({ goal, color }: { goal: Goal; color: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      margin: '20px 0 6px',
      padding: '6px 10px',
      background: 'rgba(0,0,0,0.03)',
      borderRadius: 8,
      borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {goal.title}
      </span>
    </div>
  );
}

function WeeklyGridRow({ isHeader, weekDates }: { isHeader: true; weekDates: Date[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '32px minmax(0,160px) repeat(7,1fr) 48px',
      alignItems: 'center',
      padding: '5px 0',
      borderBottom: '0.5px solid var(--color-border-tertiary)',
      marginBottom: 4,
      gap: 0,
    }}>
      <div />
      <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', paddingLeft: 4 }}>Task</div>
      {weekDates.map((d, i) => {
        const today_ = isToday(d);
        return (
          <div key={i} style={{
            display: 'flex', justifyContent: 'center',
            fontSize: 12,
            fontWeight: today_ ? 500 : 400,
            color: today_ ? '#185FA5' : 'var(--color-text-secondary)',
          }}>
            {DAY_LABELS[i]}
          </div>
        );
      })}
      <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)', textAlign: 'right', paddingRight: 4 }}>Wk</div>
    </div>
  );
}

function WeekPill({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? value / max : 0;
  const [bg, text] = pct >= 0.75
    ? [TRACKING_COLORS.pillGreenBg, TRACKING_COLORS.pillGreenText]
    : pct > 0
    ? [TRACKING_COLORS.pillAmberBg, TRACKING_COLORS.pillAmberText]
    : [TRACKING_COLORS.pillRedBg, TRACKING_COLORS.pillRedText];
  return (
    <span style={{
      fontSize: 11, padding: '2px 6px', borderRadius: 20,
      fontWeight: 500, background: bg, color: text,
      whiteSpace: 'nowrap',
    }}>
      {value}/{max}
    </span>
  );
}

function WeeklyNumInput({
  value,
  onSave,
  active,
  missed,
}: {
  value?: number;
  onSave: (v: number) => void;
  active?: boolean;
  missed?: boolean;
}) {
  const [localVal, setLocalVal] = useState(value !== undefined ? String(value) : '');

  return (
    <input
      type="number"
      value={localVal}
      placeholder="–"
      onChange={e => setLocalVal(e.target.value)}
      onBlur={() => {
        const n = parseFloat(localVal);
        if (!isNaN(n) && n >= 0) onSave(n);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          const n = parseFloat(localVal);
          if (!isNaN(n) && n >= 0) onSave(n);
          (e.target as HTMLInputElement).blur();
        }
      }}
      style={{
        width: 36, height: 22, fontSize: 11,
        textAlign: 'center',
        border: `1px solid ${active ? TRACKING_COLORS.todayBlue : missed ? TRACKING_COLORS.missedDot : 'var(--color-border-secondary)'}`,
        borderRadius: 4,
        background: 'var(--color-background-primary)',
        color: 'var(--color-text-primary)',
        padding: 0,
        outline: 'none',
      }}
    />
  );
}

function LegendDot({ color }: { color: string }) {
  return (
    <span style={{
      display: 'inline-block', width: 10, height: 10,
      borderRadius: 2, background: color,
      marginRight: 4, verticalAlign: 'middle',
    }} />
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
      <div style={{
        background: 'var(--color-background-secondary)',
        border: '2px dashed var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '3rem 2rem',
      }}>
        <p style={{ fontWeight: 600, color: '#805232', marginBottom: 8 }}>No tasks yet</p>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Create a goal and add tasks to get started</p>
      </div>
    </div>
  );
}
