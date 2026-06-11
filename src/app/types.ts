// Core data types for the goal tracking system

export type MeasurementType = 'number' | 'time' | 'steps' | 'distance';
export type Frequency = 'daily' | 'weekly';
export type GoalStatus = 'on-track' | 'behind' | 'ahead';

export interface LifeGoal {
  id: string;
  title: string;
  description?: string;
  goals?: Goal[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WeightGoal {
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
}

export interface BookGoal {
  targetBooks: number;
  booksRead: number;
}

export type ProgressSource = 'TASKS' | 'LOGS';

export interface TaskProgressEntry {
  taskId: string;
  title: string;
  frequency: 'DAILY' | 'WEEKLY';
  target: number;
  timesPerWeek?: number | null;
  unit: string;
  ytdValue: number;
  expected: number;
  adherence: number;
}

export interface Goal {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  target: number;
  unit: string; // e.g., "Count", "Time", "Kilogram"
  progress: number; // Calculated from linked monthly goals
  status: GoalStatus;
  remarks?: string;
  lifeGoalId?: string; // Link to life goal
  lifeGoal?: LifeGoal;
  weightGoal?: WeightGoal;
  countGoal?: {
    targetCount: number;
    currentCount: number;
  };
  timeGoal?: {
    targetHours: number;
    targetMinutes: number;
    currentHours: number;
    currentMinutes: number;
  };
  percentageGoal?: {
    targetPercent: number;
  };
  bookGoal?: BookGoal;
  monthlyGoals?: any[];
  progressSource: ProgressSource;
  progressTotal?: number | null;
  progressAvg?: number | null;
  logsTotal?: number | null;
  taskProgress?: TaskProgressEntry[];
}

export interface GoalLog {
  id: string;
  goalId: string;
  value: number;
  remarks?: string | null;
  loggedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MonthlyGoal {
  id: string;
  goalId: string; // Links to parent yearly goal
  title: string;
  month: string; // e.g., "January 2025", "Feb 2025"
  monthDate: Date; // First day of the month
  target: number | string; // Monthly target value (Decimal from API, number on frontend)
  unit: string; // e.g., "KG", "books", "pages"
  currentProgress: number | string;
  status: GoalStatus;
  remarks?: string;
  goal?: Goal; // Optional parent goal data
}

export interface Task {
  id: string;
  goalId: string; // Links to parent goal (for backward compatibility)
  monthlyGoalId: string; // Links to parent monthly goal
  title: string;
  type: MeasurementType;
  frequency: Frequency;
  target: number; // Target per day/week
  unit: string; // e.g., "days", "steps", "mins", "km"
  timesPerWeek?: number;
  currentProgress: number;
  lastUpdated: Date;
  completionHistory: CompletionRecord[];
}

export interface CompletionRecord {
  date: Date;
  value: number;
  completed: boolean;
}

export interface WeeklyCheckIn {
  weekStart: Date;
  weekEnd: Date;
  goalId: string;
  tasksCompleted: number;
  tasksTotal: number;
  percentageComplete: number;
  status: GoalStatus;
  notes?: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  priority: boolean;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}