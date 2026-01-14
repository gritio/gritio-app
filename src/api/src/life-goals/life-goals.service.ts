import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LifeGoalsService {
  constructor(private prisma: PrismaService) {}

  async createLifeGoal(userId: string, data: { title: string; description?: string }) {
    const count = await this.prisma.lifeGoal.count({ where: { userId } });
    
    if (count >= 5) {
      throw new BadRequestException('Maximum 5 life goals allowed');
    }

    return this.prisma.lifeGoal.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
      },
    });
  }

  async getLifeGoals(userId: string) {
    return this.prisma.lifeGoal.findMany({
      where: { userId },
      include: {
        goals: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getLifeGoal(id: string, userId: string) {
    return this.prisma.lifeGoal.findUniqueOrThrow({
      where: { id },
      include: {
        goals: true,
      },
    });
  }

  async updateLifeGoal(id: string, userId: string, data: { title?: string; description?: string }) {
    return this.prisma.lifeGoal.update({
      where: { id },
      data,
      include: {
        goals: true,
      },
    });
  }

  async deleteLifeGoal(id: string, userId: string) {
    return this.prisma.lifeGoal.delete({
      where: { id },
    });
  }
}
