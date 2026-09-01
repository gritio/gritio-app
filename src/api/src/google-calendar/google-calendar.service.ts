import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
import { PrismaService } from '../prisma/prisma.service';
import { encryptToken, decryptToken } from './token-crypto.util';
import { CreateReminderDto, ReminderRecurrence } from './dto/google-calendar.dto';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/userinfo.email',
];

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function parseISODate(dateStr: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, month, day };
}

// Combines a date + time as plain wall-clock components — no timezone math here,
// the resulting dateTime is paired with an explicit `timeZone` field for Google to interpret.
function combineDateTime(dateStr: string, timeStr: string): Date {
  const { year, month, day } = parseISODate(dateStr);
  const [hour, minute] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

function toLocalDateTimeString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
}

const RECURRENCE_RULES: Record<ReminderRecurrence, string[] | undefined> = {
  none: undefined,
  daily: ['RRULE:FREQ=DAILY'],
  weekly: ['RRULE:FREQ=WEEKLY'],
  monthly: ['RRULE:FREQ=MONTHLY'],
};

const DEFAULT_EVENT_DURATION_MINUTES = 30;

interface BuiltEvent {
  requestBody: calendar_v3.Schema$Event;
  eventStart: Date;
}

function buildEvent(title: string, description: string | null, options: CreateReminderDto): BuiltEvent {
  let start: calendar_v3.Schema$EventDateTime;
  let end: calendar_v3.Schema$EventDateTime;
  let eventStart: Date;

  if (options.allDay) {
    const { year, month, day } = parseISODate(options.date);
    const startDate = new Date(year, month - 1, day);
    start = { date: toISODate(startDate) };
    end = { date: toISODate(addDays(startDate, 1)) };
    eventStart = startDate;
  } else {
    const startDateTime = combineDateTime(options.date, options.time!);
    const endDateTime = new Date(startDateTime.getTime() + DEFAULT_EVENT_DURATION_MINUTES * 60_000);
    start = { dateTime: toLocalDateTimeString(startDateTime), timeZone: options.timeZone };
    end = { dateTime: toLocalDateTimeString(endDateTime), timeZone: options.timeZone };
    eventStart = startDateTime;
  }

  const reminders: calendar_v3.Schema$Event['reminders'] =
    options.reminderMinutesBefore === null
      ? { useDefault: false, overrides: [] }
      : { useDefault: false, overrides: [{ method: 'popup', minutes: options.reminderMinutesBefore }] };

  return {
    requestBody: {
      summary: title,
      description: description || undefined,
      start,
      end,
      recurrence: RECURRENCE_RULES[options.recurrence],
      reminders,
    },
    eventStart,
  };
}

@Injectable()
export class GoogleCalendarService {
  constructor(private prisma: PrismaService) {}

  private getRedirectUri(): string {
    return process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/google-calendar/callback';
  }

  private getOAuthClient() {
    return new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      this.getRedirectUri(),
    );
  }

  getAuthUrl(state: string): string {
    const client = this.getOAuthClient();
    return client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: SCOPES,
      state,
    });
  }

  async handleCallback(code: string, userId: string): Promise<void> {
    const client = this.getOAuthClient();
    const { tokens } = await client.getToken(code);

    if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
      throw new UnauthorizedException(
        'Google did not return the expected tokens — make sure to approve calendar access when connecting.',
      );
    }

    client.setCredentials(tokens);

    // Best-effort — the calendar connection itself must not fail just because
    // this display-only lookup couldn't run (e.g. email scope not granted).
    let googleEmail = '';
    try {
      const oauth2 = google.oauth2({ auth: client, version: 'v2' });
      const { data: profile } = await oauth2.userinfo.get();
      googleEmail = profile.email || '';
    } catch (error) {
      console.error('Failed to fetch Google profile email (non-fatal):', error);
    }

    await this.prisma.googleCalendarConnection.upsert({
      where: { userId },
      create: {
        userId,
        googleEmail,
        accessTokenEnc: encryptToken(tokens.access_token),
        refreshTokenEnc: encryptToken(tokens.refresh_token),
        expiresAt: new Date(tokens.expiry_date),
        scope: tokens.scope || SCOPES.join(' '),
      },
      update: {
        googleEmail,
        accessTokenEnc: encryptToken(tokens.access_token),
        refreshTokenEnc: encryptToken(tokens.refresh_token),
        expiresAt: new Date(tokens.expiry_date),
        scope: tokens.scope || SCOPES.join(' '),
      },
    });
  }

  async getStatus(userId: string): Promise<{ connected: boolean; googleEmail?: string }> {
    const connection = await this.prisma.googleCalendarConnection.findUnique({ where: { userId } });
    return connection ? { connected: true, googleEmail: connection.googleEmail } : { connected: false };
  }

  async disconnect(userId: string): Promise<void> {
    await this.prisma.googleCalendarConnection.deleteMany({ where: { userId } });
  }

  private async getAuthorizedClient(userId: string) {
    const connection = await this.prisma.googleCalendarConnection.findUnique({ where: { userId } });
    if (!connection) {
      throw new NotFoundException('Google Calendar is not connected for this user');
    }

    const client = this.getOAuthClient();
    client.setCredentials({
      access_token: decryptToken(connection.accessTokenEnc),
      refresh_token: decryptToken(connection.refreshTokenEnc),
      expiry_date: connection.expiresAt.getTime(),
    });

    try {
      // Transparently refreshes the access token via the stored refresh_token
      // when it's expired or close to it; client.credentials reflects the result.
      await client.getAccessToken();
    } catch (error) {
      await this.prisma.googleCalendarConnection.deleteMany({ where: { userId } });
      throw new UnauthorizedException('Google Calendar access was revoked. Please reconnect.');
    }

    const refreshed = client.credentials;
    if (
      refreshed.access_token &&
      refreshed.expiry_date &&
      refreshed.expiry_date !== connection.expiresAt.getTime()
    ) {
      await this.prisma.googleCalendarConnection.update({
        where: { userId },
        data: {
          accessTokenEnc: encryptToken(refreshed.access_token),
          expiresAt: new Date(refreshed.expiry_date),
        },
      });
    }

    return client;
  }

  async createReminder(
    userId: string,
    todoId: string,
    options: CreateReminderDto,
  ): Promise<{ eventId: string; htmlLink: string }> {
    const todo = await this.prisma.todo.findFirst({ where: { id: todoId, userId } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (todo.googleEventId && todo.googleEventLink) {
      return { eventId: todo.googleEventId, htmlLink: todo.googleEventLink };
    }

    if (!options.allDay && !options.time) {
      throw new Error('time is required when allDay is false');
    }

    const client = await this.getAuthorizedClient(userId);
    const calendar = google.calendar({ version: 'v3', auth: client });
    const { requestBody, eventStart } = buildEvent(todo.title, todo.description, options);

    const { data } = await calendar.events.insert({ calendarId: 'primary', requestBody });

    if (!data.id || !data.htmlLink) {
      throw new Error('Google Calendar did not return an event id');
    }

    await this.prisma.todo.update({
      where: { id: todoId },
      data: {
        googleEventId: data.id,
        googleEventLink: data.htmlLink,
        googleEventStart: eventStart,
        googleEventAllDay: options.allDay,
        googleEventRecurrence: options.recurrence,
        googleEventReminderMinutes: options.reminderMinutesBefore,
      },
    });

    return { eventId: data.id, htmlLink: data.htmlLink };
  }

  async updateReminder(
    userId: string,
    todoId: string,
    options: CreateReminderDto,
  ): Promise<{ eventId: string; htmlLink: string }> {
    const todo = await this.prisma.todo.findFirst({ where: { id: todoId, userId } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    if (!todo.googleEventId) {
      throw new NotFoundException('This todo has no calendar reminder to update yet');
    }

    if (!options.allDay && !options.time) {
      throw new Error('time is required when allDay is false');
    }

    const client = await this.getAuthorizedClient(userId);
    const calendar = google.calendar({ version: 'v3', auth: client });
    const { requestBody, eventStart } = buildEvent(todo.title, todo.description, options);

    const { data } = await calendar.events.patch({
      calendarId: 'primary',
      eventId: todo.googleEventId,
      requestBody,
    });

    if (!data.id || !data.htmlLink) {
      throw new Error('Google Calendar did not return an event id');
    }

    await this.prisma.todo.update({
      where: { id: todoId },
      data: {
        googleEventId: data.id,
        googleEventLink: data.htmlLink,
        googleEventStart: eventStart,
        googleEventAllDay: options.allDay,
        googleEventRecurrence: options.recurrence,
        googleEventReminderMinutes: options.reminderMinutesBefore,
      },
    });

    return { eventId: data.id, htmlLink: data.htmlLink };
  }
}
