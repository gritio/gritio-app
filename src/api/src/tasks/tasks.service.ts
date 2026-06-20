import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Verifies the given task belongs to the given user. Throws on missing/foreign.
  private async assertTaskOwnership(taskId: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { goal: true },
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.goal.userId !== userId) throw new ForbiddenException('Not your task');
    return task;
  }

  // Verifies the given goal belongs to the given user.
  private async assertGoalOwnership(goalId: string, userId: string) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });
    if (!goal) throw new NotFoundException('Goal not found');
    if (goal.userId !== userId) throw new ForbiddenException('Not your goal');
    return goal;
  }

  async createTask(dto: CreateTaskDto, userId: string) {
    // Verify user owns the goal
    const goal = await this.prisma.goal.findUnique({
      where: { id: dto.goalId },
    });

    if (!goal || goal.userId !== userId) {
      throw new Error('Goal not found or unauthorized');
    }

    const taskData = {
      goalId: dto.goalId,
      title: dto.title,
      type: dto.type.toUpperCase() as any,
      frequency: dto.frequency.toUpperCase() as any,
      target: dto.target,
      unit: dto.unit,
      timesPerWeek: dto.timesPerWeek,
      months: dto.months || [0,1,2,3,4,5,6,7,8,9,10,11], // Default to all months if not specified
    };
    return this.prisma.task.create({
      data: taskData,
      include: {
        completionRecords: {
          orderBy: { date: 'desc' },
        },
      },
    });
  }

  async getAllTasksByUser(userId: string) {
    const goals = await this.prisma.goal.findMany({
      where: { userId },
      select: { id: true },
    });
    const goalIds = goals.map(g => g.id);

    // Get current month (0-11)
    const currentMonth = new Date().getMonth();

    // Fetch all tasks and filter by current month in memory
    const allTasks = await this.prisma.task.findMany({
      where: { goalId: { in: goalIds } },
      include: {
        completionRecords: {
          orderBy: { date: 'desc' },
        },
      },
    });

    // Filter tasks that apply to current month
    return allTasks.filter(task => {
      const months = (task as any).months as number[];
      return months && months.includes(currentMonth);
    });
  }

  async getTasksByGoal(goalId: string, userId: string) {
    await this.assertGoalOwnership(goalId, userId);
    return this.prisma.task.findMany({
      where: { goalId },
      include: {
        completionRecords: {
          orderBy: { date: 'desc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getTaskById(id: string, userId: string) {
    await this.assertTaskOwnership(id, userId);
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        completionRecords: {
          orderBy: { date: 'desc' },
        },
        goal: true,
      },
    });
  }

  async updateTask(id: string, dto: UpdateTaskDto, userId: string) {
    // Verify user owns the task
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { goal: true },
    });

    if (!task || task.goal.userId !== userId) {
      throw new Error('Task not found or unauthorized');
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.target && { target: dto.target }),
        ...(dto.unit && { unit: dto.unit }),
        ...(dto.timesPerWeek !== undefined && { timesPerWeek: dto.timesPerWeek }),
      },
      include: {
        completionRecords: true,
      },
    });
  }

  async logTaskCompletion(taskId: string, date: Date, value: number, userId: string) {
    // Verify user owns the task
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { goal: true },
    });

    if (!task || task.goal.userId !== userId) {
      throw new Error('Task not found or unauthorized');
    }

    // Time values are already in minutes from frontend
    const storedValue = value;
    const completed = storedValue >= task.target;

    // Normalize date to UTC midnight
    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const result = await this.prisma.taskCompletion.upsert({
      where: {
        taskId_date: {
          taskId,
          date: normalizedDate,
        },
      },
      update: {
        value: storedValue,
        completed,
      },
      create: {
        taskId,
        date: normalizedDate,
        value: storedValue,
        completed,
      },
    });

    // Update month aggregation
    await this.updateTaskMonthAggregation(taskId, normalizedDate);

    return result;
  }

  async getCompletionHistory(taskId: string, userId: string, days: number = 30) {
    await this.assertTaskOwnership(taskId, userId);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setUTCHours(0, 0, 0, 0);

    return this.prisma.taskCompletion.findMany({
      where: {
        taskId,
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
    });
  }

  async deleteTask(id: string, userId: string) {
    // Verify user owns the task
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { goal: true },
    });

    if (!task || task.goal.userId !== userId) {
      throw new Error('Task not found or unauthorized');
    }

    return this.prisma.task.delete({
      where: { id },
    });
  }

  async getMonthCompletions(taskId: string, year: number, month: number, userId: string) {
    await this.assertTaskOwnership(taskId, userId);
    // Query the pre-computed aggregation
    const aggregation = await this.prisma.taskMonthAggregation.findUnique({
      where: {
        taskId_year_month: {
          taskId,
          year,
          month,
        },
      },
    });

    if (aggregation) {
      return {
        totalValue: aggregation.totalValue,
        daysWithActivity: aggregation.daysWithActivity,
        target: aggregation.target,
      };
    }

    return {
      totalValue: 0,
      daysWithActivity: 0,
      target: 0,
    };
  }

  async updateTaskMonthAggregation(taskId: string, date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0, 23, 59, 59, 999);

    // Get the task to access its target
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return;
    }

    // Calculate aggregations
    const [totalSum, daysWithActivity] = await Promise.all([
      this.prisma.taskCompletion.aggregate({
        where: {
          taskId,
          date: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
        _sum: {
          value: true,
        },
      }),
      this.prisma.taskCompletion.count({
        where: {
          taskId,
          date: {
            gte: monthStart,
            lte: monthEnd,
          },
          value: {
            gt: 0,
          },
        },
      }),
    ]);

    const totalValue = totalSum._sum.value || 0;

    // Calculate monthly target based on frequency and type
    let monthlyTarget = 0;
    if (task.frequency === 'DAILY') {
      monthlyTarget = task.target * 30;
    } else {
      monthlyTarget = task.target * (task.timesPerWeek || 5) * 4;
    }
    
    // For time tasks, convert target from minutes to match stored values
    if (task.type === 'TIME') {
      monthlyTarget = monthlyTarget; // Already in minutes
    }

    // Upsert the aggregation
    await this.prisma.taskMonthAggregation.upsert({
      where: {
        taskId_year_month: {
          taskId,
          year,
          month,
        },
      },
      update: {
        totalValue,
        daysWithActivity,
        target: monthlyTarget,
      },
      create: {
        taskId,
        year,
        month,
        totalValue,
        daysWithActivity,
        target: monthlyTarget,
      },
    });
  }
}
