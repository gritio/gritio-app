import { Goal, Task, GoalStatus } from '../types';

/**
 * Calculate overall goal progress based on linked tasks
 * Progress is the average completion percentage of all tasks
 */
export const calculateGoalProgress = (goal: Goal, tasks: Task[]): number => {
  const goalTasks = tasks.filter(task => task.goalId === goal.id);
  
  if (goalTasks.length === 0) return 0;
  
  const totalProgress = goalTasks.reduce((sum, task) => {
    const taskCompletion = (task.currentProgress / task.target) * 100;
    return sum + Math.min(taskCompletion, 100);
  }, 0);
  
  return Math.round(totalProgress / goalTasks.length);
};

/**
 * Determine goal status based on progress and time elapsed
 */
export const calculateGoalStatus = (goal: Goal): GoalStatus => {
  const now = new Date();
  const totalDuration = goal.endDate.getTime() - goal.startDate.getTime();
  const elapsed = now.getTime() - goal.startDate.getTime();
  const expectedProgress = (elapsed / totalDuration) * 100;
  
  const difference = goal.progress - expectedProgress;
  
  if (difference > 10) return 'ahead';
  if (difference < -10) return 'behind';
  return 'on-track';
};

/**
 * Calculate task completion percentage for today
 */
export const calculateTaskCompletionToday = (task: Task): number => {
  return Math.min((task.currentProgress / task.target) * 100, 100);
};

/**
 * Determine task status based on completion percentage
 */
export const getTaskStatus = (completionPercentage: number): GoalStatus => {
  if (completionPercentage >= 100) return 'ahead';
  if (completionPercentage >= 70) return 'on-track';
  return 'behind';
};

/**
 * Get today's tasks (tasks with daily frequency)
 */
export const getTodaysTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(task => task.frequency === 'daily');
};

/**
 * Get this week's tasks (tasks with weekly frequency)
 */
export const getWeeklyTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(task => task.frequency === 'weekly');
};

/**
 * Format task value with unit
 */
export const formatTaskValue = (value: number, unit: string): string => {
  if (unit === 'mins') {
    const hours = Math.floor(value / 60);
    const mins = value % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${value} mins`;
  }
  
  if (unit === 'steps') {
    return value.toLocaleString() + ' steps';
  }
  
  return `${value} ${unit}`;
};
