import { useState } from 'react';
import { X, CalendarPlus, ExternalLink } from 'lucide-react';
import { Todo, ReminderOptions, ReminderRecurrence } from '../types';
import { formatReminderSchedule } from '../utils/reminder';

const ALL_DAY_REMINDER_OPTIONS: { label: string; value: number | null }[] = [
  { label: 'No notification', value: null },
  { label: 'Same day', value: 0 },
  { label: '1 day before', value: 1440 },
  { label: '2 days before', value: 2880 },
  { label: '1 week before', value: 10080 },
];

const TIMED_REMINDER_OPTIONS: { label: string; value: number | null }[] = [
  { label: 'No notification', value: null },
  { label: 'At start time', value: 0 },
  { label: '10 minutes before', value: 10 },
  { label: '30 minutes before', value: 30 },
  { label: '1 hour before', value: 60 },
  { label: '1 day before', value: 1440 },
];

const RECURRENCE_OPTIONS: { label: string; value: ReminderRecurrence }[] = [
  { label: 'Does not repeat', value: 'none' },
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toHHMM(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

interface ReminderOptionsPanelProps {
  todo: Todo;
  onClose: () => void;
  onSubmit: (options: ReminderOptions) => void;
  isSubmitting: boolean;
}

export function ReminderOptionsPanel({ todo, onClose, onSubmit, isSubmitting }: ReminderOptionsPanelProps) {
  const isEditing = !!todo.googleEventId;
  const eventStart = todo.googleEventStart ? new Date(todo.googleEventStart) : null;

  const [date, setDate] = useState(
    isEditing && eventStart ? toISODate(eventStart) : toISODate(new Date(todo.dueDate)),
  );
  const [allDay, setAllDay] = useState(isEditing ? todo.googleEventAllDay ?? true : true);
  const [time, setTime] = useState(
    isEditing && eventStart && !(todo.googleEventAllDay ?? true) ? toHHMM(eventStart) : '09:00',
  );
  const [reminderMinutesBefore, setReminderMinutesBefore] = useState<number | null>(
    isEditing ? todo.googleEventReminderMinutes ?? null : 0,
  );
  const [recurrence, setRecurrence] = useState<ReminderRecurrence>(
    isEditing ? todo.googleEventRecurrence ?? 'none' : 'none',
  );

  const reminderOptions = allDay ? ALL_DAY_REMINDER_OPTIONS : TIMED_REMINDER_OPTIONS;
  const scheduleSummary = formatReminderSchedule(todo);

  const handleAllDayChange = (nextAllDay: boolean) => {
    setAllDay(nextAllDay);
    setReminderMinutesBefore(nextAllDay ? 0 : 30);
  };

  const handleSubmit = () => {
    onSubmit({
      date,
      allDay,
      time: allDay ? undefined : time,
      reminderMinutesBefore,
      recurrence,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1" onClick={onClose} />

      <div className="w-full sm:w-96 bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-base font-semibold text-[#805232] flex items-center gap-2">
            <CalendarPlus className="w-4 h-4" />
            {isEditing ? 'Edit Calendar Reminder' : 'Add to Google Calendar'}
          </h2>
          <div className="flex items-center gap-3">
            {isEditing && todo.googleEventLink && (
              <a
                href={todo.googleEventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#805232] transition-colors"
                title="Open in Google Calendar"
              >
                <ExternalLink className="w-[18px] h-[18px]" />
              </a>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <p className="text-sm text-gray-700 truncate">{todo.title}</p>

          {isEditing && scheduleSummary && (
            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
              <span className="font-medium text-gray-600">Currently scheduled:</span> {scheduleSummary}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="reminder-all-day"
              type="checkbox"
              checked={allDay}
              onChange={e => handleAllDayChange(e.target.checked)}
              className="w-4 h-4 accent-[#805232]"
            />
            <label htmlFor="reminder-all-day" className="text-sm text-gray-700">
              All day
            </label>
          </div>

          {!allDay && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Notification</label>
            <select
              value={reminderMinutesBefore === null ? 'none' : String(reminderMinutesBefore)}
              onChange={e => setReminderMinutesBefore(e.target.value === 'none' ? null : Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm bg-white"
            >
              {reminderOptions.map(opt => (
                <option key={opt.label} value={opt.value === null ? 'none' : opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Repeat</label>
            <select
              value={recurrence}
              onChange={e => setRecurrence(e.target.value as ReminderRecurrence)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm bg-white"
            >
              {RECURRENCE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t border-gray-200 p-5 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {isSubmitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Add to Calendar'}
          </button>
        </div>
      </div>
    </div>
  );
}
