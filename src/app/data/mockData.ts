import { Goal, Task, MonthlyGoal, WeeklyCheckIn, CompletionRecord } from '../types';

// Helper to generate completion history
const generateHistory = (days: number, avgValue: number, variance: number = 0.2): CompletionRecord[] => {
  const history: CompletionRecord[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const randomFactor = 1 + (Math.random() - 0.5) * variance;
    const value = Math.round(avgValue * randomFactor);
    
    history.push({
      date,
      value,
      completed: value >= avgValue * 0.8
    });
  }
  
  return history;
};

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Reach Target Weight',
    yearlyMeasure: '87',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    target: 100, // 100% completion
    unit: 'Kilogram',
    progress: 5,
    status: 'on-track',
    remarks: 'Focus on consistency over intensity',
    weightGoal: {
      startWeight: 85,
      currentWeight: 80,
      targetWeight: 75
    }
  },
  {
    id: 'goal-2',
    title: 'Read 24 Books',
    yearlyMeasure: '24 Books',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    target: 100,
    unit: 'Count',
    progress: 42,
    status: 'behind',
    remarks: 'Aim for 2 books per month',
    bookGoal: {
      targetBooks: 24,
      booksRead: 10
    }
  },
  {
    id: 'goal-3',
    title: 'Build Side Project',
    yearlyMeasure: 'Launch MVP',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    target: 100,
    unit: 'Count',
    progress: 75,
    status: 'ahead',
    remarks: 'Focus on shipping, not perfection'
  }
];

// Mock Monthly Goals linked to goals
export const mockMonthlyGoals: MonthlyGoal[] = [
  {
    id: 'monthly-1',
    goalId: 'goal-1',
    title: 'January Weight Target',
    month: 'January 2025',
    monthDate: new Date('2025-01-01'),
    target: 90,
    unit: 'KG',
    currentProgress: 63,
    status: 'on-track',
    remarks: 'Focus on consistent gym visits'
  },
  {
    id: 'monthly-2',
    goalId: 'goal-1',
    title: 'February Fitness',
    month: 'February 2025',
    monthDate: new Date('2025-02-01'),
    target: 88,
    unit: 'KG',
    currentProgress: 0,
    status: 'on-track'
  },
  {
    id: 'monthly-3',
    goalId: 'goal-2',
    title: 'January Reading',
    month: 'January 2025',
    monthDate: new Date('2025-01-01'),
    target: 2,
    unit: 'books',
    currentProgress: 1,
    status: 'behind',
    remarks: 'Need to finish current book'
  },
  {
    id: 'monthly-4',
    goalId: 'goal-3',
    title: 'January Sprint',
    month: 'January 2025',
    monthDate: new Date('2025-01-01'),
    target: 80,
    unit: 'hours',
    currentProgress: 65,
    status: 'ahead',
    remarks: 'MVP core features done'
  }
];

// Mock Tasks linked to goals
export const mockTasks: Task[] = [
  // Tasks for monthly-1: January Weight Target
  {
    id: 'task-1',
    goalId: 'goal-1',
    monthlyGoalId: 'monthly-1',
    title: 'Gym Attendance',
    type: 'number',
    frequency: 'weekly',
    target: 5,
    unit: 'days',
    currentProgress: 4,
    lastUpdated: new Date(),
    completionHistory: generateHistory(30, 5, 0.3)
  },
  {
    id: 'task-2',
    goalId: 'goal-1',
    monthlyGoalId: 'monthly-1',
    title: 'Daily Steps',
    type: 'steps',
    frequency: 'daily',
    target: 10000,
    unit: 'steps',
    currentProgress: 8500,
    lastUpdated: new Date(),
    completionHistory: generateHistory(30, 10000, 0.4)
  },
  {
    id: 'task-3',
    goalId: 'goal-1',
    monthlyGoalId: 'monthly-1',
    title: 'Weekly Steps Goal',
    type: 'steps',
    frequency: 'weekly',
    target: 50000,
    unit: 'steps',
    currentProgress: 42000,
    lastUpdated: new Date(),
    completionHistory: generateHistory(12, 50000, 0.3)
  },
  
  // Tasks for monthly-3: January Reading
  {
    id: 'task-4',
    goalId: 'goal-2',
    monthlyGoalId: 'monthly-3',
    title: 'Reading Time',
    type: 'time',
    frequency: 'daily',
    target: 30,
    unit: 'mins',
    currentProgress: 25,
    lastUpdated: new Date(),
    completionHistory: generateHistory(30, 30, 0.5)
  },
  {
    id: 'task-5',
    goalId: 'goal-2',
    monthlyGoalId: 'monthly-3',
    title: 'Books Completed',
    type: 'number',
    frequency: 'weekly',
    target: 2,
    unit: 'books',
    currentProgress: 1,
    lastUpdated: new Date(),
    completionHistory: generateHistory(12, 2, 0.6)
  },
  
  // Tasks for monthly-4: January Sprint
  {
    id: 'task-6',
    goalId: 'goal-3',
    monthlyGoalId: 'monthly-4',
    title: 'Coding Sessions',
    type: 'number',
    frequency: 'weekly',
    target: 4,
    unit: 'sessions',
    currentProgress: 4,
    lastUpdated: new Date(),
    completionHistory: generateHistory(12, 4, 0.3)
  },
  {
    id: 'task-7',
    goalId: 'goal-3',
    monthlyGoalId: 'monthly-4',
    title: 'Deep Work Time',
    type: 'time',
    frequency: 'daily',
    target: 90,
    unit: 'mins',
    currentProgress: 120,
    lastUpdated: new Date(),
    completionHistory: generateHistory(30, 90, 0.4)
  }
];

// Mock Weekly Check-ins
export const mockWeeklyCheckIns: WeeklyCheckIn[] = [
  {
    weekStart: new Date('2025-12-23'),
    weekEnd: new Date('2025-12-29'),
    goalId: 'goal-1',
    tasksCompleted: 2,
    tasksTotal: 3,
    percentageComplete: 67,
    status: 'on-track',
    notes: 'Good progress this week. Gym attendance was consistent.'
  },
  {
    weekStart: new Date('2025-12-23'),
    weekEnd: new Date('2025-12-29'),
    goalId: 'goal-2',
    tasksCompleted: 1,
    tasksTotal: 2,
    percentageComplete: 50,
    status: 'behind',
    notes: 'Need to increase reading time. Only finished 1 book this week.'
  },
  {
    weekStart: new Date('2025-12-23'),
    weekEnd: new Date('2025-12-29'),
    goalId: 'goal-3',
    tasksCompleted: 2,
    tasksTotal: 2,
    percentageComplete: 100,
    status: 'ahead',
    notes: 'Excellent week! Completed all coding sessions and extra work.'
  }
];