import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMonthlyGoalDto, UpdateMonthlyGoalDto } from './dto/monthly-goal.dto';
import { GoalsService } from '../goals/goals.service';

@Injectable()
export class MonthlyGoalsService {
  constructor(private prisma: PrismaService, private goalsService: GoalsService) {}

  async createMonthlyGoal(dto: CreateMonthlyGoalDto, userId: string) {
    // Verify user owns the goal
    const goal = await this.prisma.goal.findUnique({
      where: { id: dto.goalId },
      include: { weightGoal: true },
    });

    if (!goal || goal.userId !== userId) {
      throw new Error('Goal not found or unauthorized');
    }
    
    const result = await this.prisma.monthlyGoal.create({
      data: {
        goalId: dto.goalId,
        title: dto.title,
        month: dto.month,
        monthDate: new Date(dto.monthDate),
        target: dto.target,
        unit: dto.unit,
        remarks: dto.remarks,
      },
    });

    // If this is a weight goal and currentProgress was set, update parent goal's currentWeight
    if (goal.unit === 'Kilogram' && goal.weightGoal && result.currentProgress && Number(result.currentProgress) > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const monthDate = new Date(result.monthDate);
      monthDate.setHours(0, 0, 0, 0);
      
      // Only update if this month is today or earlier
      if (monthDate <= today) {
        await this.prisma.weightGoal.update({
          where: { goalId: dto.goalId },
          data: { currentWeight: Number(result.currentProgress) },
        });
        console.log(`Updated parent goal weight on creation: ${result.currentProgress}kg`);
      }
    }

    return result;
  }

  async getMonthlyGoalsByUser(userId: string) {
    const result = await this.prisma.monthlyGoal.findMany({
      where: {
        goal: {
          userId,
        },
      },
      include: {
        goal: true,
      },
      orderBy: { monthDate: 'asc' },
    });
    console.log('getMonthlyGoalsByUser - fetched results:');
    result.forEach(mg => {
      console.log(`  ID: ${mg.id}, target: ${mg.target}, type: ${typeof mg.target}`);
    });
    return result;
  }

  async getMonthlyGoalsByGoal(goalId: string) {
    const result = await this.prisma.monthlyGoal.findMany({
      where: { goalId },
      orderBy: { monthDate: 'asc' },
    });
    console.log('getMonthlyGoalsByGoal - result:', JSON.stringify(result, null, 2));
    result.forEach(mg => {
      console.log(`Monthly Goal ${mg.id}: target=${mg.target}, type=${typeof mg.target}`);
    });
    return result;
  }

  async getMonthlyGoalById(id: string) {
    const result = await this.prisma.monthlyGoal.findUnique({
      where: { id },
      include: {
        goal: true,
      },
    });
    if (result) {
      console.log('getMonthlyGoalById - result:', JSON.stringify(result, null, 2));
      console.log(`Monthly Goal ${result.id}: target=${result.target}, type=${typeof result.target}`);
    }
    return result;
  }

  async updateMonthlyGoal(id: string, dto: UpdateMonthlyGoalDto, userId: string) {
    console.log('updateMonthlyGoal - Received DTO:', dto);
    
    // Verify user owns the monthly goal
    const monthlyGoal = await this.prisma.monthlyGoal.findUnique({
      where: { id },
      include: { goal: { include: { weightGoal: true } } },
    });

    if (!monthlyGoal || monthlyGoal.goal.userId !== userId) {
      throw new Error('Monthly goal not found or unauthorized');
    }

    console.log('updateMonthlyGoal - Current monthly goal:', {
      id: monthlyGoal.id,
      target: monthlyGoal.target,
      currentProgress: monthlyGoal.currentProgress,
    });

    const result = await this.prisma.monthlyGoal.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.target && { target: dto.target }),
        ...(dto.currentProgress !== undefined && {
          currentProgress: dto.currentProgress,
        }),
        ...(dto.status && { status: dto.status as any }),
        ...(dto.remarks !== undefined && { remarks: dto.remarks }),
      },
    });
    
    console.log('updateMonthlyGoal - After update:', {
      id: result.id,
      target: result.target,
      currentProgress: result.currentProgress,
    });

    // If this is a weight goal and currentProgress was updated, update parent goal's currentWeight
    if (dto.currentProgress !== undefined && monthlyGoal.goal.unit === 'Kilogram' && monthlyGoal.goal.weightGoal) {
      // Get all monthly goals for this goal
      const allMonthlyGoals = await this.prisma.monthlyGoal.findMany({
        where: { goalId: monthlyGoal.goalId },
        orderBy: { monthDate: 'asc' },
      });

      // Find the most recent month based on current date (today or earlier)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let mostRecentMonthlyGoal: any = null;
      for (let i = allMonthlyGoals.length - 1; i >= 0; i--) {
        const monthDate = new Date(allMonthlyGoals[i].monthDate);
        monthDate.setHours(0, 0, 0, 0);
        if (monthDate <= today) {
          mostRecentMonthlyGoal = allMonthlyGoals[i];
          break;
        }
      }

      if (mostRecentMonthlyGoal) {
        const currentWeight = Number(mostRecentMonthlyGoal.currentProgress);
        await this.prisma.weightGoal.update({
          where: { goalId: monthlyGoal.goalId },
          data: { currentWeight },
        });
        console.log(`Updated parent goal weight: ${currentWeight}kg from month ${mostRecentMonthlyGoal.month}`);
      }
    }

    // Update parent goal progress
    await this.goalsService.updateParentGoalProgress(monthlyGoal.goalId);

    return result;
  }

  async deleteMonthlyGoal(id: string, userId: string) {
    // Verify user owns the monthly goal
    const monthlyGoal = await this.prisma.monthlyGoal.findUnique({
      where: { id },
      include: { goal: true },
    });

    if (!monthlyGoal || monthlyGoal.goal.userId !== userId) {
      throw new Error('Monthly goal not found or unauthorized');
    }

    return this.prisma.monthlyGoal.delete({
      where: { id },
    });
  }
}
