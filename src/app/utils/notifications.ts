import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Todo, Task } from '../types';
import { tasksApi } from '../services/api';
import { getDueDateStatus } from './dueDate';

const DAILY_DIGEST_ID = 1001; // fixed ids so each reschedule replaces, never stacks
const WEEKLY_DIGEST_ID = 1002;

const TODOS_NOTIFY_KEY = 'todosNotifyEnabled';
const DAILY_TIME_KEY = 'dailyReminderTime'; // "HH:mm"
const WEEKLY_DAY_KEY = 'weeklyReminderDay'; // 0=Sun..6=Sat
const WEEKLY_TIME_KEY = 'weeklyReminderTime'; // "HH:mm"

export function getTodosNotifyEnabled(): boolean {
  return localStorage.getItem(TODOS_NOTIFY_KEY) !== 'false'; // on by default
}

export function setTodosNotifyEnabled(enabled: boolean): void {
  localStorage.setItem(TODOS_NOTIFY_KEY, String(enabled));
}

function parseTimeOfDay(value: string | null, fallback: { hour: number; minute: number }) {
  if (!value) return fallback;
  const [hourStr, minuteStr] = value.split(':');
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return fallback;
  return { hour, minute };
}

export function getDailyReminderTime(): string {
  return localStorage.getItem(DAILY_TIME_KEY) || '08:00';
}

export function setDailyReminderTime(time: string): void {
  localStorage.setItem(DAILY_TIME_KEY, time);
}

export function getWeeklyReminderDay(): number {
  const stored = localStorage.getItem(WEEKLY_DAY_KEY);
  const day = stored !== null ? Number(stored) : NaN;
  return Number.isNaN(day) || day < 0 || day > 6 ? 3 : day; // default Wednesday
}

export function setWeeklyReminderDay(day: number): void {
  localStorage.setItem(WEEKLY_DAY_KEY, String(day));
}

export function getWeeklyReminderTime(): string {
  return localStorage.getItem(WEEKLY_TIME_KEY) || '08:00';
}

export function setWeeklyReminderTime(time: string): void {
  localStorage.setItem(WEEKLY_TIME_KEY, time);
}

let permissionRequested = false;

async function ensurePermission(): Promise<boolean> {
  const status = await LocalNotifications.checkPermissions();
  if (status.display === 'granted') return true;
  if (permissionRequested) return false;
  permissionRequested = true;
  const result = await LocalNotifications.requestPermissions();
  return result.display === 'granted';
}

// Due today or overdue, not done — same classification the Overdue/Today stat tiles use.
function isTodoRelevant(todo: Todo): boolean {
  if (todo.done) return false;
  const kind = getDueDateStatus(todo.dueDate).kind;
  return kind === 'today' || kind === 'overdue';
}

function isTaskApplicableThisMonth(task: Task): boolean {
  const currentMonth = new Date().getMonth();
  return !task.months || task.months.includes(currentMonth);
}

async function isTaskDoneToday(taskId: string): Promise<boolean> {
  try {
    const history = await tasksApi.getHistory(taskId, 1);
    return history.length > 0 && !!history[0]?.completed;
  } catch {
    return false; // fail open — better a stale reminder than a silently dropped one
  }
}

function getWeekStartMonday(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffFromMonday = (d.getDay() + 6) % 7; // getDay(): 0=Sun..6=Sat
  d.setDate(d.getDate() - diffFromMonday);
  return d;
}

// Sum of this week's logged value (Mon–Sun) — a reasonable proxy for "how much
// of the weekly target is done" across both checkbox-style and numeric tasks.
async function getWeekCompletedValue(taskId: string): Promise<number> {
  try {
    const history = await tasksApi.getHistory(taskId, 8);
    const weekStart = getWeekStartMonday(new Date()).getTime();
    const weekEnd = weekStart + 7 * 24 * 60 * 60 * 1000;
    return history
      .filter((h: any) => {
        const t = new Date(h.date).getTime();
        return t >= weekStart && t < weekEnd;
      })
      .reduce((sum: number, h: any) => sum + (Number(h.value) || 0), 0);
  } catch {
    return 0; // fail open
  }
}

function getWeeklyFireDate(now: Date): Date {
  const { hour, minute } = parseTimeOfDay(getWeeklyReminderTime(), { hour: 8, minute: 0 });
  const targetDay = getWeeklyReminderDay(); // 0=Sun..6=Sat

  const target = getWeekStartMonday(now); // Monday of this week
  const mondayBasedOffset = (targetDay + 6) % 7; // days after Monday
  target.setDate(target.getDate() + mondayBasedOffset);
  target.setHours(hour, minute, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 7); // this week's slot has passed — wait for next week
  }
  return target;
}

function buildBody(items: string[]): string {
  return items.slice(0, 3).join(', ') + (items.length > 3 ? `, +${items.length - 3} more` : '');
}

// Recomputes and reschedules the single daily digest: due/overdue todos
// (if notifications aren't muted) + daily tasks explicitly opted in that
// aren't done yet today. Silent if empty. Safe to call on every data load.
export async function scheduleTodayDigest(todos: Todo[], tasks: Task[]): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  if (!(await ensurePermission())) return;

  const todosToday = getTodosNotifyEnabled() ? todos.filter(isTodoRelevant) : [];

  const eligibleDaily = tasks.filter(t => t.frequency === 'daily' && t.notifyEnabled && isTaskApplicableThisMonth(t));
  const doneFlags = await Promise.all(eligibleDaily.map(t => isTaskDoneToday(t.id)));
  const tasksToday = eligibleDaily.filter((_, i) => !doneFlags[i]);

  await LocalNotifications.cancel({ notifications: [{ id: DAILY_DIGEST_ID }] });

  const items = [...todosToday.map(t => t.title), ...tasksToday.map(t => t.title)];
  if (items.length === 0) return;

  const now = new Date();
  const { hour, minute } = parseTimeOfDay(getDailyReminderTime(), { hour: 8, minute: 0 });
  let fireAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);
  if (fireAt <= now) {
    fireAt = new Date(now.getTime() + 60_000); // already past today's time — fire shortly instead of skipping today
  }

  await LocalNotifications.schedule({
    notifications: [
      {
        id: DAILY_DIGEST_ID,
        title: `${items.length} thing${items.length === 1 ? '' : 's'} due today`,
        body: buildBody(items),
        schedule: { at: fireAt },
      },
    ],
  });
}

// Separate midweek digest for weekly tasks opted into notifications that
// haven't hit their weekly target yet. Day/time come from user settings
// (Profile → Notifications), defaulting to Wednesday 8am. Safe to call on
// every data load.
export async function scheduleWeekDigest(tasks: Task[]): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  if (!(await ensurePermission())) return;

  const eligibleWeekly = tasks.filter(t => t.frequency === 'weekly' && t.notifyEnabled && isTaskApplicableThisMonth(t));
  const completedValues = await Promise.all(eligibleWeekly.map(t => getWeekCompletedValue(t.id)));
  const outstanding = eligibleWeekly.filter((t, i) => completedValues[i] < t.target);

  await LocalNotifications.cancel({ notifications: [{ id: WEEKLY_DIGEST_ID }] });

  if (outstanding.length === 0) return;

  const fireAt = getWeeklyFireDate(new Date());
  const items = outstanding.map(t => t.title);

  await LocalNotifications.schedule({
    notifications: [
      {
        id: WEEKLY_DIGEST_ID,
        title: `${items.length} weekly goal${items.length === 1 ? '' : 's'} still open`,
        body: buildBody(items),
        schedule: { at: fireAt },
      },
    ],
  });
}
