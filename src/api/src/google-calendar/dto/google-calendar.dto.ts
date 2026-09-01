export class GoogleCalendarStatusDto {
  connected: boolean;
  googleEmail?: string;
}

export class ConnectUrlDto {
  url: string;
}

export class CreateReminderResponseDto {
  eventId: string;
  htmlLink: string;
}

export type ReminderRecurrence = 'none' | 'daily' | 'weekly' | 'monthly';

export class CreateReminderDto {
  date: string; // YYYY-MM-DD, the calendar event's date (defaults to the todo's due date client-side)
  allDay: boolean;
  time?: string; // HH:mm, required when allDay is false
  reminderMinutesBefore: number | null; // null = no notification
  recurrence: ReminderRecurrence;
  timeZone: string; // IANA name, e.g. "Asia/Kolkata" — from the browser
}
