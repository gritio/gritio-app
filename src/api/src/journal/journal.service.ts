import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateJournalNotebookDto,
  UpdateJournalNotebookDto,
  CreateJournalPageDto,
  UpdateJournalPageDto,
} from './dto/journal.dto';
import { JournalNotebook, JournalPage } from '@prisma/client';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async getNotebooksByUserId(userId: string): Promise<JournalNotebook[]> {
    return this.prisma.journalNotebook.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createNotebook(userId: string, dto: CreateJournalNotebookDto): Promise<JournalNotebook> {
    return this.prisma.journalNotebook.create({
      data: {
        userId,
        name: dto.name,
        color: dto.color || '#805232',
      },
    });
  }

  private async getNotebookOwned(id: string, userId: string): Promise<JournalNotebook> {
    const notebook = await this.prisma.journalNotebook.findUnique({ where: { id } });
    if (!notebook) throw new NotFoundException('Notebook not found');
    if (notebook.userId !== userId) throw new ForbiddenException('Not your notebook');
    return notebook;
  }

  async updateNotebook(id: string, userId: string, dto: UpdateJournalNotebookDto): Promise<JournalNotebook> {
    await this.getNotebookOwned(id, userId);
    return this.prisma.journalNotebook.update({
      where: { id },
      data: {
        name: dto.name,
        color: dto.color,
      },
    });
  }

  async deleteNotebook(id: string, userId: string): Promise<JournalNotebook> {
    await this.getNotebookOwned(id, userId);
    return this.prisma.journalNotebook.delete({ where: { id } });
  }

  async getPagesByNotebookId(notebookId: string, userId: string): Promise<JournalPage[]> {
    await this.getNotebookOwned(notebookId, userId);
    return this.prisma.journalPage.findMany({
      where: { notebookId },
      orderBy: { date: 'desc' },
    });
  }

  async createPage(notebookId: string, userId: string, dto: CreateJournalPageDto): Promise<JournalPage> {
    await this.getNotebookOwned(notebookId, userId);
    return this.prisma.journalPage.create({
      data: {
        notebookId,
        date: dto.date ? new Date(dto.date) : new Date(),
        title: dto.title,
        content: dto.content || '',
      },
    });
  }

  private async getPageOwned(id: string, userId: string): Promise<JournalPage> {
    const page = await this.prisma.journalPage.findUnique({ where: { id } });
    if (!page) throw new NotFoundException('Page not found');
    await this.getNotebookOwned(page.notebookId, userId);
    return page;
  }

  async updatePage(id: string, userId: string, dto: UpdateJournalPageDto): Promise<JournalPage> {
    await this.getPageOwned(id, userId);
    return this.prisma.journalPage.update({
      where: { id },
      data: {
        date: dto.date ? new Date(dto.date) : undefined,
        title: dto.title,
        content: dto.content,
      },
    });
  }

  async deletePage(id: string, userId: string): Promise<JournalPage> {
    await this.getPageOwned(id, userId);
    return this.prisma.journalPage.delete({ where: { id } });
  }
}
