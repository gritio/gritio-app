import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoalsService } from '../goals/goals.service';
import { CreateGoalLogDto, UpdateGoalLogDto } from './dto/goal-log.dto';

@Injectable()
export class GoalLogsService {
  constructor(
    private prisma: PrismaService,
    private goalsService: GoalsService,
  ) {}

  private async assertOwnership(goalId: string, userId: string) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });
    if (!goal) throw new NotFoundException('Goal not found');
    if (goal.userId !== userId) throw new ForbiddenException('Not your goal');
  }

  async create(userId: string, dto: CreateGoalLogDto) {
    await this.assertOwnership(dto.goalId, userId);

    const log = await this.prisma.goalLog.create({
      data: {
        goalId: dto.goalId,
        value: dto.value,
        remarks: dto.remarks ?? null,
        loggedAt: dto.loggedAt ? new Date(dto.loggedAt) : new Date(),
      },
    });

    await this.goalsService.updateParentGoalProgress(dto.goalId);
    return log;
  }

  async listByGoal(goalId: string, userId: string) {
    await this.assertOwnership(goalId, userId);
    return this.prisma.goalLog.findMany({
      where: { goalId },
      orderBy: { loggedAt: 'desc' },
    });
  }

  async update(id: string, userId: string, dto: UpdateGoalLogDto) {
    const existing = await this.prisma.goalLog.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Log not found');
    await this.assertOwnership(existing.goalId, userId);

    const updated = await this.prisma.goalLog.update({
      where: { id },
      data: {
        ...(dto.value !== undefined && { value: dto.value }),
        ...(dto.remarks !== undefined && { remarks: dto.remarks }),
        ...(dto.loggedAt && { loggedAt: new Date(dto.loggedAt) }),
      },
    });

    await this.goalsService.updateParentGoalProgress(existing.goalId);
    return updated;
  }

  async delete(id: string, userId: string) {
    const existing = await this.prisma.goalLog.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Log not found');
    await this.assertOwnership(existing.goalId, userId);

    await this.prisma.goalLog.delete({ where: { id } });
    await this.goalsService.updateParentGoalProgress(existing.goalId);
    return { success: true };
  }
}
