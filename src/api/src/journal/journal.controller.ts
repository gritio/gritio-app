import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalSectionDto, UpdateJournalSectionDto } from './dto/journal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('journal')
@UseGuards(JwtAuthGuard)
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Get('sections')
  async getSections(@Request() req) {
    return this.journalService.getSectionsByUserId(req.user.userId);
  }

  @Post('sections')
  async createSection(@Request() req, @Body() dto: CreateJournalSectionDto) {
    return this.journalService.createSection(req.user.userId, dto);
  }

  @Patch('sections/:id')
  async updateSection(@Request() req, @Param('id') id: string, @Body() dto: UpdateJournalSectionDto) {
    return this.journalService.updateSection(id, req.user.userId, dto);
  }

  @Delete('sections/:id')
  async deleteSection(@Request() req, @Param('id') id: string) {
    return this.journalService.deleteSection(id, req.user.userId);
  }
}
