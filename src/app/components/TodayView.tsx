import { useState, useEffect } from 'react';
import { Task, Goal } from '../types';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { formatTaskValue, calculateTaskCompletionToday, getTaskStatus } from '../utils/calculations';
import { CheckCircle, Circle, Edit } from 'lucide-react';
import { tasksApi } from '../services/api';
import { authApi } from '../services/api';

interface TodayViewProps {
  tasks: Task[];
  goals: Goal[];
  onUpdateProgress: (taskId: string) => void;
}

export function TodayView({ tasks, goals, onUpdateProgress }: TodayViewProps) {
  const [todayCompletions, setTodayCompletions] = useState<Record<string, any>>({});

  const dailyTasks = tasks.filter(task => task.frequency === 'daily');

  // Fetch today's completions for all daily tasks
  useEffect(() => {
    const fetchTodayCompletions = async () => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const completions: Record<string, any> = {};

      const promises = dailyTasks.map(async (task) => {
        try {
          const history = await tasksApi.getHistory(task.id, 1);
          if (history.length > 0) {
            completions[task.id] = history[0];
          }
        } catch (error) {
          console.error(`Failed to fetch today's completion for task ${task.id}:`, error);
        }
      });

      await Promise.all(promises);
      setTodayCompletions(completions);
    };

    if (dailyTasks.length > 0) {
      fetchTodayCompletions();
    }
  }, [dailyTasks]);

  const todayTasks = dailyTasks;

  // Create a map of goalId to goal for quick lookup
  const goalMap = new Map(goals.map(g => [g.id, g]));

  const handleToggleComplete = (taskId: string) => {
    console.log('Toggle task:', taskId);
    onUpdateProgress(taskId);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const user = authApi.getStoredUser();
  const userName = user?.name?.split(' ')[0] || 'there';

  // Calculate week so far (7 dots for each day of the week)
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);

  const getWeekDot = (dayIndex: number) => {
    // dayIndex 0 = Sunday, 1 = Monday, etc.
    const checkDate = new Date(weekStart);
    checkDate.setDate(weekStart.getDate() + dayIndex);
    checkDate.setUTCHours(0, 0, 0, 0);

    // For now, mark as "logged" if it's today or before (simplified)
    // In a real app, you'd check actual completion data
    return checkDate <= today ? dayIndex < dayOfWeek : false;
  };

  const daysLogged = [...Array(7)].filter((_, i) => getWeekDot(i)).length;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1009] mb-1">{getGreeting()}, {userName}</h1>
        <p className="text-sm text-[#7a6a5a]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Week So Far Row */}
      <div className="mb-6 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#7a6a5a]">Week so far</span>
          <div className="flex items-center gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  getWeekDot(i)
                    ? 'bg-[#805232]'
                    : 'bg-[rgba(0,0,0,0.1)]'
                }`}
              />
            ))}
            <span className="text-xs text-[#7a6a5a] ml-2">{daysLogged}/7 days logged</span>
          </div>
        </div>
      </div>

      {/* Tasks to Log Today Header */}
      {todayTasks.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-[#7a6a5a] uppercase tracking-wide">Tasks to log today</h2>
        </div>
      )}

      {/* Task List */}
      <div className="grid grid-cols-1 gap-3">
        {todayTasks.map(task => {
          const todayData = todayCompletions[task.id];
          const todayValue = todayData?.value || 0;
          const completion = todayValue >= task.target ? 100 : (task.target > 0 ? Math.round((todayValue / task.target) * 100) : 0);
          const status = getTaskStatus(completion);
          const parentGoal = goalMap.get(task.goalId);
          const isComplete = completion >= 100;

          return (
            <div
              key={task.id}
              className="bg-white border border-[rgba(0,0,0,0.08)] rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                {/* Completion Toggle */}
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className="flex-shrink-0"
                >
                  {isComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#805232] hover:text-[#805232]" />
                  )}
                </button>

                {/* Task Title */}
                <h3 className={`text-sm font-medium ${isComplete ? 'line-through text-[#7a6a5a]' : 'text-[#1a1009]'}`}>
                  {task.title}
                </h3>

                {/* Parent Goal */}
                {parentGoal && (
                  <span className="text-xs text-[#7a6a5a]">
                    {parentGoal.title}
                  </span>
                )}
              </div>

              {/* Target and Input */}
              <div className="flex items-center gap-4 ml-8">
                <div className="text-xs text-[#7a6a5a]">
                  Target: {formatTaskValue(task.target, task.unit)}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-xs text-[#7a6a5a]">[</span>
                  <input
                    type="text"
                    placeholder="0"
                    defaultValue={todayValue > 0 ? todayValue : ''}
                    className="w-20 px-2 py-1 text-xs border border-[#805232] rounded text-center"
                  />
                  <span className="text-xs text-[#7a6a5a]">] {task.unit || 'units'} today</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {todayTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white border-2 border-dashed border-[rgba(0,0,0,0.1)] rounded-lg p-12">
            <h3 className="mb-2 text-[#805232] font-semibold">No tasks yet</h3>
            <p className="text-[#7a6a5a] text-sm">Create a goal and add tasks to get started</p>
          </div>
        </div>
      )}
    </div>
  );
}
