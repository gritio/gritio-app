export type DueDatePreset = 'today' | 'tomorrow' | 'weekend';

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getPresetISODate(preset: DueDatePreset): string {
  const date = new Date();

  if (preset === 'tomorrow') {
    date.setDate(date.getDate() + 1);
  } else if (preset === 'weekend') {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    const isAlreadyWeekend = day === 0 || day === 6;
    if (!isAlreadyWeekend) {
      const daysUntilSaturday = (6 - day + 7) % 7;
      date.setDate(date.getDate() + daysUntilSaturday);
    }
  }

  return toISODate(date);
}

export interface DueDateStatus {
  kind: 'overdue' | 'today' | 'upcoming';
  label: string;
}

export function getDueDateStatus(dueDate: Date | string): DueDateStatus {
  const due = new Date(dueDate);
  const dueMidnight = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffDays = Math.round((dueMidnight.getTime() - todayMidnight.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { kind: 'today', label: 'Today' };
  }
  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return { kind: 'overdue', label: `${overdueDays}d overdue` };
  }
  return {
    kind: 'upcoming',
    label: dueMidnight.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  };
}
