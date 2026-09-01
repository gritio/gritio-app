import { Todo, ReminderRecurrence } from '../types';

const RECURRENCE_LABEL: Record<ReminderRecurrence, string | null> = {
  none: null,
  daily: 'Repeats daily',
  weekly: 'Repeats weekly',
  monthly: 'Repeats monthly',
};

export function formatReminderSchedule(todo: Todo): string | null {
  if (!todo.googleEventId || !todo.googleEventStart) return null;

  const start = new Date(todo.googleEventStart);
  const datePart = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const base = todo.googleEventAllDay
    ? datePart
    : `${datePart} at ${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;

  const recurrenceLabel = todo.googleEventRecurrence ? RECURRENCE_LABEL[todo.googleEventRecurrence] : null;
  return recurrenceLabel ? `${base} · ${recurrenceLabel}` : base;
}
