import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goal.dto';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  // Compute expected YTD count for a task: how many completions would we expect by now
  // if the user perfectly hits the cadence (daily/weekly).
  private computeExpectedYTD(task: any): number {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const msElapsed = now.getTime() - yearStart.getTime();
    const daysElapsed = Math.max(1, Math.floor(msElapsed / (1000 * 60 * 60 * 24)));

    if (task.frequency === 'DAILY') {
      return daysElapsed * (task.target || 1);
    } else {
      // weekly
      const weeksElapsed = Math.max(1, daysElapsed / 7);
      const sessionsPerWeek = task.timesPerWeek || 1;
      return Math.round(weeksElapsed * sessionsPerWeek * (task.target || 1));
    }
  }

  // For TASKS-mode goals: returns per-task progress + Total/Avg.
  private async computeTaskProgress(goalId: string) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const tasks = await this.prisma.task.findMany({ where: { goalId } });
    if (tasks.length === 0) {
      return { taskProgress: [], progressTotal: 0, progressAvg: 0 };
    }

    const taskProgress = await Promise.all(
      tasks.map(async (task) => {
        const aggs = await this.prisma.taskMonthAggregation.findMany({
          where: { taskId: task.id, year: currentYear, month: { lte: currentMonth } },
        });
        const ytdValue = aggs.reduce((s, a) => s + Number(a.totalValue), 0);
        const expected = this.computeExpectedYTD(task);
        const adherence = expected > 0 ? Math.min((ytdValue / expected) * 100, 100) : 0;
        return {
          taskId: task.id,
          title: task.title,
          frequency: task.frequency,
          target: task.target,
          timesPerWeek: task.timesPerWeek,
          unit: task.unit,
          ytdValue,
          expected,
          adherence,
        };
      }),
    );

    const progressTotal = taskProgress.reduce((s, t) => s + t.ytdValue, 0);
    const progressAvg = taskProgress.length > 0
      ? taskProgress.reduce((s, t) => s + t.adherence, 0) / taskProgress.length
      : 0;

    return { taskProgress, progressTotal, progressAvg };
  }

  private async calculateGoalStatus(goal: any): Promise<'COMPLETED' | 'ON_TRACK' | 'AT_RISK' | 'BEHIND'> {
    // LOGS mode: status derived from progress %
    if (goal.progressSource === 'LOGS') {
      const progress = goal.progress || 0;
      if (progress >= 100) return 'COMPLETED';
      // Compare against year elapsed: if you've made <50% of the way through year-proportional pace, behind.
      const now = new Date();
      const monthsElapsed = now.getMonth() + 1;
      const expectedByNow = (monthsElapsed / 12) * 100;
      if (expectedByNow === 0) return 'ON_TRACK';
      const pace = (progress / expectedByNow) * 100;
      if (pace >= 70) return 'ON_TRACK';
      if (pace >= 50) return 'AT_RISK';
      return 'BEHIND';
    }

    // Percentage goals: status compares avg adherence to target threshold.
    if (goal.unit === 'Percentage' && goal.percentageGoal) {
      const { progressAvg } = await this.computeTaskProgress(goal.id);
      const target = goal.percentageGoal.targetPercent;
      if (progressAvg >= target) return 'COMPLETED';
      const pace = target > 0 ? (progressAvg / target) * 100 : 0;
      if (pace >= 70) return 'ON_TRACK';
      if (pace >= 50) return 'AT_RISK';
      return 'BEHIND';
    }

    // TASKS mode: use existing pace-based logic
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const tasks = await this.prisma.task.findMany({
      where: { goalId: goal.id },
      select: { id: true },
    });

    if (tasks.length === 0) return 'BEHIND';

    const taskIds = tasks.map(t => t.id);
    const aggregations = await this.prisma.taskMonthAggregation.findMany({
      where: {
        taskId: { in: taskIds },
        year: currentYear,
        month: { lte: currentMonth },
      },
    });

    if (aggregations.length === 0) return 'BEHIND';

    const totalProgress = aggregations.reduce((sum, agg) => sum + Number(agg.totalValue), 0);

    let yearlyTarget = goal.finalTarget || goal.target || 0;
    if (goal.unit === 'Kilogram' && goal.weightGoal) {
      yearlyTarget = Math.abs(goal.weightGoal.targetWeight - goal.weightGoal.startWeight);
    }

    if (yearlyTarget === 0) return 'BEHIND';

    const monthsElapsed = Math.max(aggregations.length, 1);
    const progressPerMonth = totalProgress / monthsElapsed;
    const projectedYearlyProgress = progressPerMonth * 12;
    const pacePercentage = (projectedYearlyProgress / yearlyTarget) * 100;

    if (currentMonth >= 12) {
      return totalProgress >= yearlyTarget ? 'COMPLETED' : 'BEHIND';
    }

    if (pacePercentage >= 70) return 'ON_TRACK';
    if (pacePercentage >= 50) return 'AT_RISK';
    return 'BEHIND';
  }


  async createGoal(userId: string, dto: CreateGoalDto) {
    console.log('GoalsService.createGoal - userId:', userId);
    console.log('GoalsService.createGoal - title:', dto.title);

    // Unit alone determines progressSource:
    //   Count / Time / Kilogram → LOGS (log-driven progress)
    //   Percentage              → TASKS (adherence-driven progress)
    const progressSource: 'TASKS' | 'LOGS' =
      dto.unit === 'Percentage' ? 'TASKS' : 'LOGS';

    const goal = await this.prisma.goal.create({
      data: {
        userId,
        lifeGoalId: dto.lifeGoalId || null,
        title: dto.title,
        unit: dto.unit,
        yearlyMeasure: '', // deprecated field, keeping for backward compatibility
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        target: 100,
        remarks: dto.remarks,
        distributionStrategy: dto.distributionStrategy || 'SPREAD_EVENLY',
        progressSource,
        startValue: dto.startValue,
        finalTarget: dto.finalTarget,
      },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        percentageGoal: true,
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
    } else if (dto.unit === 'Percentage' && dto.percentageGoal) {
      await this.prisma.percentageGoal.create({
        data: {
          goalId: goal.id,
          targetPercent: dto.percentageGoal.targetPercent,
        },
      });
    }


    return this.getGoalById(goal.id);
  }

  // Decorate a goal with status + taskProgress + (LOGS only) logsTotal.
  // taskProgress is always populated so the frontend can render supporting habits
  // on LOGS goals too. progressTotal/progressAvg stay null in LOGS mode — logs drive
  // the headline progress %. logsTotal is the absolute sum (count or minutes) so
  // the headline can show "3 of 8" instead of "0% of 8".
  private async decorateGoal(goal: any) {
    const status = await this.calculateGoalStatus(goal);
    const { taskProgress, progressTotal, progressAvg } = await this.computeTaskProgress(goal.id);
    if (goal.progressSource === 'TASKS') {
      return { ...goal, status, progressTotal, progressAvg, taskProgress, logsTotal: null };
    }
    const logs = await this.prisma.goalLog.findMany({ where: { goalId: goal.id } });
    const logsTotal = logs.reduce((s, l) => s + l.value, 0);
    return { ...goal, status, progressTotal: null, progressAvg: null, taskProgress, logsTotal };
  }

  async getGoalsByUser(userId: string) {
    console.log('GoalsService.getGoalsByUser - userId:', userId);
    const goals = await this.prisma.goal.findMany({
      where: { userId },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        percentageGoal: true,
        lifeGoal: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log('GoalsService.getGoalsByUser - found goals count:', goals.length);

    return Promise.all(goals.map((goal) => this.decorateGoal(goal)));
  }

  async getGoalById(id: string) {
    const goal = await this.prisma.goal.findUnique({
      where: { id },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        percentageGoal: true,
        lifeGoal: true,
      },
    });

    if (!goal) return null;
    return this.decorateGoal(goal);
  }

  async updateGoal(id: string, userId: string, dto: UpdateGoalDto) {
    // Verify user owns this goal
    const existingGoal = await this.prisma.goal.findUnique({
      where: { id },
    });

    if (!existingGoal || existingGoal.userId !== userId) {
      throw new Error('Goal not found or unauthorized');
    }

    // Unit change handling: if the DTO sends a unit different from the current one,
    // wipe the old sub-goal record and create a fresh one for the new unit.
    const nextUnit = dto.unit && dto.unit !== existingGoal.unit ? dto.unit : undefined;
    const effectiveUnit = nextUnit || existingGoal.unit;
    const nextProgressSource: 'TASKS' | 'LOGS' =
      effectiveUnit === 'Percentage' ? 'TASKS' : 'LOGS';

    if (nextUnit) {
      // Old sub-goals are tied to the previous unit; delete them so they don't leak.
      await this.prisma.weightGoal.deleteMany({ where: { goalId: id } });
      await this.prisma.countGoal.deleteMany({ where: { goalId: id } });
      await this.prisma.timeGoal.deleteMany({ where: { goalId: id } });
      await this.prisma.percentageGoal.deleteMany({ where: { goalId: id } });
    }

    const goal = await this.prisma.goal.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.remarks !== undefined && { remarks: dto.remarks }),
        ...(dto.lifeGoalId !== undefined && { lifeGoalId: dto.lifeGoalId || null }),
        ...(nextUnit && { unit: nextUnit }),
        ...(dto.endDate && { endDate: new Date(dto.endDate) }),
        progressSource: nextProgressSource,
      },
      include: {
        weightGoal: true,
        countGoal: true,
        timeGoal: true,
        percentageGoal: true,
        lifeGoal: true,
      },
    });

    // After possible unit swap, recreate-or-update the matching sub-goal from the DTO.
    if (effectiveUnit === 'Kilogram' && dto.weightGoal) {
      const data = {
        startWeight: dto.weightGoal.startWeight ?? 0,
        currentWeight: dto.weightGoal.currentWeight ?? dto.weightGoal.startWeight ?? 0,
        targetWeight: dto.weightGoal.targetWeight ?? 0,
      };
      await this.prisma.weightGoal.upsert({
        where: { goalId: id },
        update: data,
        create: { goalId: id, ...data },
      });
    } else if (effectiveUnit === 'Count' && dto.countGoal) {
      const data = {
        targetCount: dto.countGoal.targetCount ?? 0,
        ...(dto.countGoal.currentCount !== undefined && { currentCount: dto.countGoal.currentCount }),
      };
      await this.prisma.countGoal.upsert({
        where: { goalId: id },
        update: data,
        create: { goalId: id, ...data },
      });
    } else if (effectiveUnit === 'Time' && dto.timeGoal) {
      const data = {
        targetHours: dto.timeGoal.targetHours ?? 0,
        targetMinutes: dto.timeGoal.targetMinutes ?? 0,
        ...(dto.timeGoal.currentHours !== undefined && { currentHours: dto.timeGoal.currentHours }),
        ...(dto.timeGoal.currentMinutes !== undefined && { currentMinutes: dto.timeGoal.currentMinutes }),
      };
      await this.prisma.timeGoal.upsert({
        where: { goalId: id },
        update: data,
        create: { goalId: id, ...data },
      });
    } else if (effectiveUnit === 'Percentage' && dto.percentageGoal) {
      await this.prisma.percentageGoal.upsert({
        where: { goalId: id },
        update: { targetPercent: dto.percentageGoal.targetPercent ?? 0 },
        create: { goalId: id, targetPercent: dto.percentageGoal.targetPercent ?? 0 },
      });
    }

    // Sub-goal changed → progress needs recompute.
    await this.updateParentGoalProgress(id);

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
        percentageGoal: true,
      },
    });

    if (!goal) return;

    let newProgress = 0;

    if (goal.progressSource === 'LOGS') {
      const logs = await this.prisma.goalLog.findMany({
        where: { goalId },
        orderBy: { loggedAt: 'desc' },
      });

      if (goal.unit === 'Kilogram' && goal.weightGoal) {
        // Latest log determines currentWeight; sync it into WeightGoal.
        const latest = logs[0];
        if (latest) {
          await this.prisma.weightGoal.update({
            where: { goalId },
            data: { currentWeight: latest.value },
          });
        }
        const start = goal.weightGoal.startWeight;
        const target = goal.weightGoal.targetWeight;
        const current = latest ? latest.value : goal.weightGoal.currentWeight;
        const totalToLose = Math.abs(target - start);
        const lostSoFar = Math.abs(current - start);
        newProgress = totalToLose > 0 ? Math.round((lostSoFar / totalToLose) * 100) : 0;
      } else if (goal.unit === 'Count' && goal.countGoal) {
        const total = logs.reduce((s, l) => s + l.value, 0);
        const target = goal.countGoal.targetCount;
        newProgress = target > 0 ? Math.round((total / target) * 100) : 0;
      } else if (goal.unit === 'Time' && goal.timeGoal) {
        const totalMinutes = logs.reduce((s, l) => s + l.value, 0);
        const target = goal.timeGoal.targetHours * 60 + goal.timeGoal.targetMinutes;
        newProgress = target > 0 ? Math.round((totalMinutes / target) * 100) : 0;
      }
    } else if (goal.unit === 'Kilogram' && goal.weightGoal) {
      // Legacy weight goals never used TASKS, but keep this for safety.
      const totalWeightToLose = Math.abs(
        goal.weightGoal.targetWeight - goal.weightGoal.startWeight,
      );
      const weightLostSoFar = Math.abs(
        goal.weightGoal.currentWeight - goal.weightGoal.startWeight,
      );
      newProgress = totalWeightToLose > 0
        ? Math.round((weightLostSoFar / totalWeightToLose) * 100)
        : 0;
    } else {
      // TASKS mode: progress bar uses average adherence (bounded 0-100%).
      const { progressAvg } = await this.computeTaskProgress(goalId);
      // Percentage goals scale against their target adherence threshold (e.g. 80%).
      if (goal.unit === 'Percentage' && goal.percentageGoal) {
        const target = goal.percentageGoal.targetPercent;
        newProgress = target > 0 ? Math.round((progressAvg / target) * 100) : 0;
      } else {
        newProgress = Math.round(progressAvg);
      }
    }

    await this.prisma.goal.update({
      where: { id: goalId },
      data: {
        progress: Math.min(newProgress, 100),
      },
    });

    console.log(`Goal ${goalId}: progress updated to ${newProgress}% (source=${goal.progressSource})`);
  }
}
