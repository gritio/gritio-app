import { Task, GoalStatus } from '../types';

export const calculateTaskCompletionToday = (task: Task): number => {
  return Math.min((task.currentProgress / task.target) * 100, 100);
};

export const getTaskStatus = (completionPercentage: number): GoalStatus => {
  if (completionPercentage >= 100) return 'ahead';
  if (completionPercentage >= 70) return 'on-track';
  return 'behind';
};

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
