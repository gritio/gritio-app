import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JournalService } from './journal.service';
import {
  CreateJournalNotebookDto,
  UpdateJournalNotebookDto,
  CreateJournalPageDto,
  UpdateJournalPageDto,
} from './dto/journal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('journal')
@UseGuards(JwtAuthGuard)
export class JournalController {
  constructor(private journalService: JournalService) {}

  @Get('notebooks')
  async getNotebooks(@Request() req) {
    return this.journalService.getNotebooksByUserId(req.user.userId);
  }

  @Post('notebooks')
  async createNotebook(@Request() req, @Body() dto: CreateJournalNotebookDto) {
    return this.journalService.createNotebook(req.user.userId, dto);
  }

  @Patch('notebooks/:id')
  async updateNotebook(@Request() req, @Param('id') id: string, @Body() dto: UpdateJournalNotebookDto) {
    return this.journalService.updateNotebook(id, req.user.userId, dto);
  }

  @Delete('notebooks/:id')
  async deleteNotebook(@Request() req, @Param('id') id: string) {
    return this.journalService.deleteNotebook(id, req.user.userId);
  }

  @Get('notebooks/:notebookId/pages')
  async getPages(@Request() req, @Param('notebookId') notebookId: string) {
    return this.journalService.getPagesByNotebookId(notebookId, req.user.userId);
  }

  @Post('notebooks/:notebookId/pages')
  async createPage(@Request() req, @Param('notebookId') notebookId: string, @Body() dto: CreateJournalPageDto) {
    return this.journalService.createPage(notebookId, req.user.userId, dto);
  }

  @Patch('pages/:id')
  async updatePage(@Request() req, @Param('id') id: string, @Body() dto: UpdateJournalPageDto) {
    return this.journalService.updatePage(id, req.user.userId, dto);
  }

  @Delete('pages/:id')
  async deletePage(@Request() req, @Param('id') id: string) {
    return this.journalService.deletePage(id, req.user.userId);
  }
}
