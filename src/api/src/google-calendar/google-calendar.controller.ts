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
  async getConnectUrl(@Request() req) {
    const state = this.jwtService.sign(
      { sub: req.user.id, purpose: STATE_PURPOSE },
      { expiresIn: '10m' },
    );
    return { url: this.googleCalendarService.getAuthUrl(state) };
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
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const redirectBase = `${frontendUrl}/`;

    if (error || !code || !state) {
      return res.redirect(`${redirectBase}?calendar=error`);
    }

    try {
      const payload = this.jwtService.verify(state);
      if (payload.purpose !== STATE_PURPOSE || !payload.sub) {
        throw new Error('Invalid state token');
      }
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
