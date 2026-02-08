import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goal.dto';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  private calculateGoalStatus(monthlyGoals: any[]): 'COMPLETED' | 'ON_TRACK' | 'AT_RISK' | 'BEHIND' {
    const currentMonth = new Date();
    currentMonth.setHours(0, 0, 0, 0);
    
    let cumulativeProgress = 0;
    let cumulativeTarget = 0;
    let totalYearlyTarget = 0;
    let monthsCompletedUpToCurrent = 0;
    
    monthlyGoals.forEach(mg => {
      const mgDate = new Date(mg.monthDate);
      mgDate.setHours(0, 0, 0, 0);
      
      totalYearlyTarget += Number(mg.target);
      
      if (mgDate <= currentMonth) {
        cumulativeProgress += Number(mg.currentProgress);
        cumulativeTarget += Number(mg.target);
        monthsCompletedUpToCurrent++;
      }
    });
    
    if (cumulativeTarget === 0) {
      return 'BEHIND';
    }
    
    // Calculate pace: if we maintain current progress rate, will we hit the yearly target?
    const progressPerMonth = monthsCompletedUpToCurrent > 0 ? cumulativeProgress / monthsCompletedUpToCurrent : 0;
    const projectedYearlyProgress = progressPerMonth * 12;
    const pacePercentage = (projectedYearlyProgress / totalYearlyTarget) * 100;
    
    // If we've completed the full year
    if (monthsCompletedUpToCurrent === 12) {
      if (cumulativeProgress >= totalYearlyTarget) {
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

  private calculateMonthlyDistribution(
    target: number,
    strategy: 'SPREAD_EVENLY' | 'EQUAL_DISTRIBUTION' | 'FRONT_LOAD' | 'PROGRESSIVE',
    startValue?: number
  ): number[] {
    const months: number[] = Array(12).fill(0);

    if (target <= 0) return months;

    if (strategy === 'SPREAD_EVENLY') {
      // Distribute evenly across quarters (Jan, Apr, Jul, Oct)
      const remainder = target % 4;
      const basePerMonth = Math.floor(target / 4);
      
      months[0] = basePerMonth + (remainder > 0 ? 1 : 0);
      months[3] = basePerMonth + (remainder > 1 ? 1 : 0);
      months[6] = basePerMonth + (remainder > 2 ? 1 : 0);
      months[9] = basePerMonth + (remainder > 3 ? 1 : 0);
    } else if (strategy === 'EQUAL_DISTRIBUTION') {
      // Divide equally across all 12 months
      const monthlyTarget = parseFloat((target / 12).toFixed(2));
      for (let i = 0; i < 12; i++) {
        months[i] = monthlyTarget;
      }
    } else if (strategy === 'FRONT_LOAD') {
      // Fill first N months
      const wholePart = Math.floor(target);
      const fractionalPart = target - wholePart;
      
      for (let i = 0; i < wholePart; i++) {
        months[i] = 1;
      }
      if (fractionalPart > 0 && wholePart < 12) {
        months[wholePart] = fractionalPart;
      }
    } else if (strategy === 'PROGRESSIVE') {
      // Ramp from startValue to target linearly over all 12 months
      const start = Math.round(startValue || 0);
      const incrementPerMonth = (target - start) / 12;
      
      for (let i = 0; i < 12; i++) {
        months[i] = Math.round(start + (i + 1) * incrementPerMonth);
      }
    }

    return months;
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

    // Create monthly goals if auto-create is enabled
    if (dto.autoCreateMonthly && dto.distributionStrategy) {
      const startDate = new Date(dto.startDate);
      let target = 0;

      // Determine the target value based on unit
      if (dto.unit === 'Kilogram' && dto.weightGoal) {
        // For weight goals, calculate absolute difference (weight to lose/gain)
        target = Math.abs(parseFloat(String(dto.weightGoal.targetWeight)) - parseFloat(String(dto.weightGoal.startWeight)));
      } else if (dto.unit === 'Count' && dto.countGoal) {
        target = parseFloat(String(dto.countGoal.targetCount));
      } else if (dto.unit === 'Time' && dto.timeGoal) {
        // For time goals, convert hours and minutes to total minutes
        const hours = parseFloat(String(dto.timeGoal.targetHours)) || 0;
        const minutes = parseFloat(String(dto.timeGoal.targetMinutes)) || 0;
        target = hours * 60 + minutes;
      }

      const distribution = this.calculateMonthlyDistribution(
        target,
        (dto.distributionStrategy as 'SPREAD_EVENLY' | 'EQUAL_DISTRIBUTION' | 'FRONT_LOAD' | 'PROGRESSIVE') || 'SPREAD_EVENLY',
        dto.startValue
      );

      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthIndex, 1);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[monthDate.getMonth()];
        const year = monthDate.getFullYear();

        let monthlyTarget = distribution[monthIndex];
        
        // For weight goals, compute the target weight (not the amount to lose)
        if (dto.unit === 'Kilogram' && dto.weightGoal) {
          const startWeight = parseFloat(String(dto.weightGoal.startWeight));
          const targetWeight = parseFloat(String(dto.weightGoal.targetWeight));
          
          // Calculate cumulative weight lost up to this month
          let cumulativeWeightLost = 0;
          for (let i = 0; i <= monthIndex; i++) {
            cumulativeWeightLost += distribution[i];
          }
          
          // Target for this month is: start weight - cumulative weight lost
          const direction = targetWeight < startWeight ? -1 : 1; // -1 for weight loss, 1 for weight gain
          monthlyTarget = parseFloat((startWeight + (direction * cumulativeWeightLost)).toFixed(2));
          
          console.log(`INSERT Weight Goal: month=${monthName}, startWeight=${startWeight}, cumulativeWeightLost=${cumulativeWeightLost}, monthlyTarget=${monthlyTarget}`);
        } else {
          console.log(`INSERT: month=${monthName}, target=${monthlyTarget}, targetString=${monthlyTarget.toString()}`);
        }
        
        // Use executeRawUnsafe to properly handle decimal values
        await this.prisma.executeRawUnsafe(
          `INSERT INTO "MonthlyGoal" ("id", "goalId", "title", "month", "monthDate", "target", "unit", "remarks", "status", "createdAt", "updatedAt") 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          require('crypto').randomUUID(),
          goal.id,
          `${dto.title} - ${monthName}`,
          `${monthName} ${year}`,
          monthDate,
          monthlyTarget,
          dto.unit,
          `Monthly target for ${monthName}`,
          'ON_TRACK',
          new Date(),
          new Date()
        );
      }
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
        monthlyGoals: true,
        lifeGoal: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log('GoalsService.getGoalsByUser - found goals count:', goals.length);
    
    const goalsWithStatus = goals.map(goal => ({
      ...goal,
      status: this.calculateGoalStatus(goal.monthlyGoals),
    }));
    
    return goalsWithStatus;
  }

  async getGoalById(id: string) {
    const goal = await this.prisma.goal.findUnique({
      where: { id },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        monthlyGoals: true,
        lifeGoal: true,
      },
    });
    
    if (!goal) return null;
    
    return {
      ...goal,
      status: this.calculateGoalStatus(goal.monthlyGoals),
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

    if (dto.autoCreateMonthly && dto.distributionStrategy) {
      await this.prisma.monthlyGoal.deleteMany({
        where: { goalId: id }
      });

      const startDate = new Date(goal.startDate);
      let target = 0;

      if (goal.unit === 'Kilogram' && goal.weightGoal) {
        target = Math.abs(parseFloat(String(goal.weightGoal.targetWeight)) - parseFloat(String(goal.weightGoal.startWeight)));
      } else if (goal.unit === 'Count' && goal.countGoal) {
        target = parseFloat(String(goal.countGoal.targetCount));
      } else if (goal.unit === 'Time' && goal.timeGoal) {
        const hours = parseFloat(String(goal.timeGoal.targetHours)) || 0;
        const minutes = parseFloat(String(goal.timeGoal.targetMinutes)) || 0;
        target = hours * 60 + minutes;
      }

      const distribution = this.calculateMonthlyDistribution(
        target,
        (dto.distributionStrategy as 'SPREAD_EVENLY' | 'EQUAL_DISTRIBUTION' | 'FRONT_LOAD' | 'PROGRESSIVE') || 'SPREAD_EVENLY',
        dto.startValue
      );

      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + monthIndex, 1);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthNames[monthDate.getMonth()];
        const year = monthDate.getFullYear();

        let monthlyTarget = distribution[monthIndex];
        
        if (goal.unit === 'Kilogram' && goal.weightGoal) {
          const startWeight = parseFloat(String(goal.weightGoal.startWeight));
          const targetWeight = parseFloat(String(goal.weightGoal.targetWeight));
          
          let cumulativeWeightLost = 0;
          for (let i = 0; i <= monthIndex; i++) {
            cumulativeWeightLost += distribution[i];
          }
          
          const direction = targetWeight < startWeight ? -1 : 1;
          monthlyTarget = parseFloat((startWeight + (direction * cumulativeWeightLost)).toFixed(2));
          
          console.log(`INSERT Weight Goal: month=${monthName}, startWeight=${startWeight}, cumulativeWeightLost=${cumulativeWeightLost}, monthlyTarget=${monthlyTarget}`);
        } else {
          console.log(`INSERT: month=${monthName}, target=${monthlyTarget}, targetString=${monthlyTarget.toString()}`);
        }
        
        await this.prisma.executeRawUnsafe(
          `INSERT INTO "MonthlyGoal" ("id", "goalId", "title", "month", "monthDate", "target", "unit", "remarks", "status", "createdAt", "updatedAt") 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          require('crypto').randomUUID(),
          goal.id,
          `${goal.title} - ${monthName}`,
          `${monthName} ${year}`,
          monthDate,
          monthlyTarget,
          goal.unit,
          `Monthly target for ${monthName}`,
          'ON_TRACK',
          new Date(),
          new Date()
        );
      }
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
    // Fetch the goal with related data
    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId },
      include: {
        monthlyGoals: true,
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
      },
    });

    if (!goal) return;

    let newProgress = 0;

    if (goal.unit === 'Kilogram' && goal.weightGoal) {
      // For weight goals: currentProgress is now the latest current weight
      // Get the most recent current weight from monthly goals
      let currentWeightFromMonthly = goal.weightGoal.startWeight;
      if (goal.monthlyGoals.length > 0) {
        // The most recent monthly goal's currentProgress represents the current weight
        const mostRecentMonthly = goal.monthlyGoals[goal.monthlyGoals.length - 1];
        currentWeightFromMonthly = Number(mostRecentMonthly.currentProgress);
      }
      
      const totalWeightToLose = Math.abs(
        goal.weightGoal.targetWeight - goal.weightGoal.startWeight
      );
      const weightLostSoFar = Math.abs(
        currentWeightFromMonthly - goal.weightGoal.startWeight
      );
      newProgress =
        totalWeightToLose > 0
          ? Math.round((weightLostSoFar / totalWeightToLose) * 100)
          : 0;

      console.log(`updateParentGoalProgress - Weight Goal ${goalId}:`, {
        startWeight: goal.weightGoal.startWeight,
        targetWeight: goal.weightGoal.targetWeight,
        currentWeight: currentWeightFromMonthly,
        totalWeightToLose,
        weightLostSoFar,
        progress: newProgress,
      });
    } else {
      // For other goals: sum all progress across monthly goals
      const totalProgress = goal.monthlyGoals.reduce(
        (sum, mg) => sum + Number(mg.currentProgress),
        0
      );
      const totalTarget = goal.monthlyGoals.reduce(
        (sum, mg) => sum + Number(mg.target),
        0
      );
      newProgress =
        totalTarget > 0 ? Math.round((totalProgress / totalTarget) * 100) : 0;

      console.log(`updateParentGoalProgress - Regular Goal ${goalId}:`, {
        totalProgress,
        totalTarget,
        progress: newProgress,
      });
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
