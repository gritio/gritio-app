import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goal.dto';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  private async calculateGoalStatus(goal: any): Promise<'COMPLETED' | 'ON_TRACK' | 'AT_RISK' | 'BEHIND'> {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-12

    // Get all tasks for this goal
    const tasks = await this.prisma.task.findMany({
      where: { goalId: goal.id },
      select: { id: true },
    });

    if (tasks.length === 0) {
      return 'BEHIND';
    }

    const taskIds = tasks.map(t => t.id);

    // Get all TaskMonthAggregation records up to current month for this year
    const aggregations = await this.prisma.taskMonthAggregation.findMany({
      where: {
        taskId: { in: taskIds },
        year: currentYear,
        month: { lte: currentMonth },
      },
    });

    if (aggregations.length === 0) {
      return 'BEHIND';
    }

    // Sum total progress across all months up to now
    const totalProgress = aggregations.reduce((sum, agg) => sum + Number(agg.totalValue), 0);

    // Get yearly target - for weight goals, use the difference; otherwise use finalTarget
    let yearlyTarget = goal.finalTarget || goal.target || 0;
    if (goal.unit === 'Kilogram' && goal.weightGoal) {
      yearlyTarget = Math.abs(goal.weightGoal.targetWeight - goal.weightGoal.startWeight);
    }

    if (yearlyTarget === 0) {
      return 'BEHIND';
    }

    // Calculate pace: if we maintain current progress rate, will we hit the yearly target?
    const monthsElapsed = aggregations.length > 0 ? Math.max(aggregations.length, 1) : 1;
    const progressPerMonth = totalProgress / monthsElapsed;
    const projectedYearlyProgress = progressPerMonth * 12;
    const pacePercentage = (projectedYearlyProgress / yearlyTarget) * 100;

    // If we've completed 12 months
    if (currentMonth >= 12) {
      if (totalProgress >= yearlyTarget) {
        return 'COMPLETED';
      } else {
        return 'BEHIND';
      }
    }

    // Based on pace, determine status
    if (pacePercentage >= 100) {
      return 'ON_TRACK';
    } else if (pacePercentage >= 70) {
      return 'ON_TRACK';
    } else if (pacePercentage >= 50) {
      return 'AT_RISK';
    } else {
      return 'BEHIND';
    }
  }


  async createGoal(userId: string, dto: CreateGoalDto) {
    console.log('GoalsService.createGoal - userId:', userId);
    console.log('GoalsService.createGoal - title:', dto.title);
    const goal = await this.prisma.goal.create({
      data: {
        userId,
        lifeGoalId: dto.lifeGoalId || null,
        title: dto.title,
        area: dto.area,
        unit: dto.unit,
        yearlyMeasure: '', // deprecated field, keeping for backward compatibility
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        target: 100,
        remarks: dto.remarks,
        distributionStrategy: dto.distributionStrategy || 'SPREAD_EVENLY',
        startValue: dto.startValue,
        finalTarget: dto.finalTarget,
      },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        lifeGoal: true,
      },
    });
    console.log('GoalsService.createGoal - goal created with id:', goal.id);

    if (dto.unit === 'Kilogram' && dto.weightGoal) {
      await this.prisma.weightGoal.create({
        data: {
          goalId: goal.id,
          startWeight: dto.weightGoal.startWeight,
          currentWeight: dto.weightGoal.currentWeight,
          targetWeight: dto.weightGoal.targetWeight,
        },
      });
    } else if (dto.unit === 'Count' && dto.countGoal) {
      await this.prisma.countGoal.create({
        data: {
          goalId: goal.id,
          targetCount: dto.countGoal.targetCount,
        },
      });
    } else if (dto.unit === 'Time' && dto.timeGoal) {
      await this.prisma.timeGoal.create({
        data: {
          goalId: goal.id,
          targetHours: dto.timeGoal.targetHours,
          targetMinutes: dto.timeGoal.targetMinutes || 0,
        },
      });
    }


    return this.getGoalById(goal.id);
  }

  async getGoalsByUser(userId: string) {
    console.log('GoalsService.getGoalsByUser - userId:', userId);
    const goals = await this.prisma.goal.findMany({
      where: { userId },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        lifeGoal: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log('GoalsService.getGoalsByUser - found goals count:', goals.length);

    const goalsWithStatus = await Promise.all(
      goals.map(async (goal) => ({
        ...goal,
        status: await this.calculateGoalStatus(goal),
      }))
    );

    return goalsWithStatus;
  }

  async getGoalById(id: string) {
    const goal = await this.prisma.goal.findUnique({
      where: { id },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        lifeGoal: true,
      },
    });

    if (!goal) return null;

    return {
      ...goal,
      status: await this.calculateGoalStatus(goal),
    };
  }

  async updateGoal(id: string, userId: string, dto: UpdateGoalDto) {
    // Verify user owns this goal
    const existingGoal = await this.prisma.goal.findUnique({
      where: { id },
    });

    if (!existingGoal || existingGoal.userId !== userId) {
      throw new Error('Goal not found or unauthorized');
    }

    const goal = await this.prisma.goal.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.remarks !== undefined && { remarks: dto.remarks }),
        ...(dto.lifeGoalId !== undefined && { lifeGoalId: dto.lifeGoalId || null }),
      },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        lifeGoal: true,
      },
    });

    if (dto.weightGoal) {
      const weightGoalData: any = {};
      if (dto.weightGoal.startWeight !== undefined) weightGoalData.startWeight = dto.weightGoal.startWeight;
      if (dto.weightGoal.currentWeight !== undefined) weightGoalData.currentWeight = dto.weightGoal.currentWeight;
      if (dto.weightGoal.targetWeight !== undefined) weightGoalData.targetWeight = dto.weightGoal.targetWeight;
      
      await this.prisma.weightGoal.update({
        where: { goalId: id },
        data: weightGoalData,
      });
    }

    if (dto.countGoal) {
      const countGoalData: any = {};
      if (dto.countGoal.targetCount !== undefined) countGoalData.targetCount = dto.countGoal.targetCount;
      if (dto.countGoal.currentCount !== undefined) countGoalData.currentCount = dto.countGoal.currentCount;
      
      await this.prisma.countGoal.update({
        where: { goalId: id },
        data: countGoalData,
      });
    }

    if (dto.timeGoal) {
      const timeGoalData: any = {};
      if (dto.timeGoal.targetHours !== undefined) timeGoalData.targetHours = dto.timeGoal.targetHours;
      if (dto.timeGoal.targetMinutes !== undefined) timeGoalData.targetMinutes = dto.timeGoal.targetMinutes;
      if (dto.timeGoal.currentHours !== undefined) timeGoalData.currentHours = dto.timeGoal.currentHours;
      if (dto.timeGoal.currentMinutes !== undefined) timeGoalData.currentMinutes = dto.timeGoal.currentMinutes;
      
      await this.prisma.timeGoal.update({
        where: { goalId: id },
        data: timeGoalData,
      });
    }


    return this.getGoalById(id);
  }

  async deleteGoal(id: string, userId: string) {
    // Verify user owns this goal
    const existingGoal = await this.prisma.goal.findUnique({
      where: { id },
    });

    if (!existingGoal || existingGoal.userId !== userId) {
      throw new Error('Goal not found or unauthorized');
    }

    return this.prisma.goal.delete({
      where: { id },
    });
  }

  async updateParentGoalProgress(goalId: string) {
    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
      },
    });

    if (!goal) return;

    let newProgress = 0;

    if (goal.unit === 'Kilogram' && goal.weightGoal) {
      // For weight goals: compare current weight against start and target
      const totalWeightToLose = Math.abs(
        goal.weightGoal.targetWeight - goal.weightGoal.startWeight
      );
      const weightLostSoFar = Math.abs(
        goal.weightGoal.currentWeight - goal.weightGoal.startWeight
      );
      newProgress =
        totalWeightToLose > 0
          ? Math.round((weightLostSoFar / totalWeightToLose) * 100)
          : 0;

      console.log(`updateParentGoalProgress - Weight Goal ${goalId}:`, {
        startWeight: goal.weightGoal.startWeight,
        targetWeight: goal.weightGoal.targetWeight,
        currentWeight: goal.weightGoal.currentWeight,
        totalWeightToLose,
        weightLostSoFar,
        progress: newProgress,
      });
    } else {
      // For other goals: sum all progress from TaskMonthAggregation across all tasks
      const tasks = await this.prisma.task.findMany({
        where: { goalId },
        select: { id: true },
      });

      if (tasks.length === 0) {
        newProgress = 0;
      } else {
        const taskIds = tasks.map(t => t.id);
        const aggregations = await this.prisma.taskMonthAggregation.findMany({
          where: { taskId: { in: taskIds } },
        });

        const totalProgress = aggregations.reduce((sum, agg) => sum + Number(agg.totalValue), 0);
        const totalTarget = aggregations.reduce((sum, agg) => sum + Number(agg.target), 0);

        newProgress =
          totalTarget > 0 ? Math.round((totalProgress / totalTarget) * 100) : 0;

        console.log(`updateParentGoalProgress - Regular Goal ${goalId}:`, {
          totalProgress,
          totalTarget,
          progress: newProgress,
        });
      }
    }

    // Update parent goal progress
    await this.prisma.goal.update({
      where: { id: goalId },
      data: {
        progress: Math.min(newProgress, 100),
      },
    });

    console.log(`Goal ${goalId}: progress updated to ${newProgress}%`);
  }
}
