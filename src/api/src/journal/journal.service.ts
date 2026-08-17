import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJournalSectionDto, UpdateJournalSectionDto } from './dto/journal.dto';
import { JournalSection } from '@prisma/client';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async getSectionsByUserId(userId: string): Promise<JournalSection[]> {
    return this.prisma.journalSection.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createSection(userId: string, dto: CreateJournalSectionDto): Promise<JournalSection> {
    return this.prisma.journalSection.create({
      data: {
        userId,
        name: dto.name,
        color: dto.color || '#805232',
      },
    });
  }

  private async getSectionOwned(id: string, userId: string): Promise<JournalSection> {
    const section = await this.prisma.journalSection.findUnique({ where: { id } });
    if (!section) throw new NotFoundException('Section not found');
    if (section.userId !== userId) throw new ForbiddenException('Not your section');
    return section;
  }

  async updateSection(id: string, userId: string, dto: UpdateJournalSectionDto): Promise<JournalSection> {
    await this.getSectionOwned(id, userId);
    // Fields left undefined in dto are skipped by Prisma, not overwritten —
    // this is what lets a rename-only PATCH and a content-only (autosave)
    // PATCH share this same endpoint without clobbering each other.
    return this.prisma.journalSection.update({
      where: { id },
      data: {
        name: dto.name,
        color: dto.color,
        content: dto.content,
      },
    });
  }

  async deleteSection(id: string, userId: string): Promise<JournalSection> {
    await this.getSectionOwned(id, userId);
    return this.prisma.journalSection.delete({ where: { id } });
  }
}
