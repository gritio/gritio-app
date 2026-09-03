import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { GoogleCalendarService } from './google-calendar.service';
import { CreateReminderDto } from './dto/google-calendar.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

const STATE_PURPOSE = 'google-calendar-connect';

@ApiBearerAuth()
@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(
    private googleCalendarService: GoogleCalendarService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getStatus(@Request() req) {
    return this.googleCalendarService.getStatus(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('connect')
  async getConnectUrl(@Request() req, @Query('platform') platform: string) {
    const state = this.jwtService.sign(
      { sub: req.user.id, purpose: STATE_PURPOSE, platform: platform === 'native' ? 'native' : 'web' },
      { expiresIn: '10m' },
    );
    return { url: this.googleCalendarService.getAuthUrl(state) };
  }

  private redirectBaseFor(platform: string): string {
    if (platform === 'native') {
      return 'gritio://calendar-callback';
    }
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return `${frontendUrl}/`;
  }

  // Hit directly by Google's redirect — no Authorization header available here,
  // so the signed `state` param (not a guard) is what authenticates the user.
  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Query('error') error: string,
    @Res() res: Response,
  ) {
    // Decode (without trusting yet) just to pick the right redirect target —
    // the actual security check happens via jwtService.verify below.
    let redirectBase = this.redirectBaseFor('web');
    let payload: any;
    if (state) {
      try {
        payload = this.jwtService.verify(state);
        redirectBase = this.redirectBaseFor(payload.platform);
      } catch {
        // Falls through to the web default; the error branch below still fires.
      }
    }

    if (error || !code || !payload || payload.purpose !== STATE_PURPOSE || !payload.sub) {
      return res.redirect(`${redirectBase}?calendar=error`);
    }

    try {
      await this.googleCalendarService.handleCallback(code, payload.sub);
      return res.redirect(`${redirectBase}?calendar=connected`);
    } catch (err) {
      console.error('Google Calendar connect callback failed:', err);
      return res.redirect(`${redirectBase}?calendar=error`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('connection')
  async disconnect(@Request() req) {
    await this.googleCalendarService.disconnect(req.user.id);
    return { disconnected: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('todos/:id/reminder')
  async createReminder(@Request() req, @Param('id') id: string, @Body() dto: CreateReminderDto) {
    return this.googleCalendarService.createReminder(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('todos/:id/reminder')
  async updateReminder(@Request() req, @Param('id') id: string, @Body() dto: CreateReminderDto) {
    return this.googleCalendarService.updateReminder(req.user.id, id, dto);
  }
}
