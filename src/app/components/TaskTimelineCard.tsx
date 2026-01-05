import { useState } from 'react';
import { MonthlyGoal, Task } from '../types';
import { X } from 'lucide-react';

interface TaskTimelineCardProps {
  monthlyGoal: MonthlyGoal | null;
  tasks: Task[];
  onClose: () => void;
  onUpdateProgress: (monthlyGoalId: string, newProgress: number | string) => Promise<void>;
  onRefreshGoals: () => void;
}

export function TaskTimelineCard({
  monthlyGoal,
  tasks,
  onClose,
  onUpdateProgress,
  onRefreshGoals,
}: TaskTimelineCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!monthlyGoal) return null;

  const dailyTasks = tasks.filter(t => t.frequency === 'daily');
  const weeklyTasks = tasks.filter(t => t.frequency === 'weekly');

  const formatProgressValue = (value: number | string): string => {
    const num = Number(value);
    if (num === 0 || num === 1 || Number.isInteger(num)) {
      return Math.round(num).toString();
    }
    return num.toFixed(2);
  };

  const getTaskDescription = (task: Task): string => {
    if (task.frequency === 'daily') {
      if (task.target === 1) {
        return `Once per day`;
      }
      return `${task.target} ${task.unit} per day`;
    } else {
      const timesText = task.frequency === 'weekly' ? 'times per week' : 'week';
      return `${task.target} ${task.unit} per session`;
    }
  };

  const trackedTasksCount = tasks.length > 0 ? 1 : 0;
  const completionPercentage = tasks.length > 0 ? Math.round((trackedTasksCount / tasks.length) * 100) : 0;

  const monthName = monthlyGoal?.monthDate
    ? new Date(typeof monthlyGoal.monthDate === 'string' ? monthlyGoal.monthDate : monthlyGoal.monthDate).toLocaleDateString(
        'en-US',
        { month: 'long', year: 'numeric' }
      )
    : 'Monthly Goal';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto bg-white rounded-xl shadow-2xl w-96 max-h-[90vh] overflow-y-auto border-2 border-[#805232]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#805232] to-[#6b4427] text-white p-6 flex items-center justify-between sticky top-0">
          <div>
            <h2 className="text-xl font-bold">{monthName}</h2>
            <p className="text-sm text-gray-200 mt-1">Task Timeline</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Monthly Goal Progress Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📋</span>
              <h3 className="font-semibold text-[#805232]">Monthly Goal Progress</h3>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Current:</span>
                <span className="font-bold">{formatProgressValue(monthlyGoal.currentProgress)}</span>
              </div>
              <div className="flex justify-between">
                <span>Target:</span>
                <span className="font-bold">{formatProgressValue(monthlyGoal.target)}</span>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#805232] transition-all duration-300"
                style={{
                  width: `${Math.min(
                    Math.round((Number(monthlyGoal.currentProgress) / Number(monthlyGoal.target)) * 100),
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Daily Tasks Section */}
          {dailyTasks.length > 0 && (
            <div>
              <h3 className="font-bold text-[#805232] mb-3 text-sm uppercase tracking-wide">Daily Routine</h3>
              <div className="space-y-3">
                {dailyTasks.map(task => (
                  <div key={task.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 cursor-pointer accent-[#805232]" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">{task.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{getTaskDescription(task)}</p>
                        <p className="text-xs text-gray-500 mt-1">Last tracked: Never</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly Tasks Section */}
          {weeklyTasks.length > 0 && (
            <div>
              <h3 className="font-bold text-[#805232] mb-3 text-sm uppercase tracking-wide">Weekly Activities</h3>
              <div className="space-y-3">
                {weeklyTasks.map(task => (
                  <div key={task.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 w-4 h-4 cursor-pointer accent-[#805232]" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">{task.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {task.target} {task.unit} per session
                          {(task as any).timesPerWeek && ` · ${(task as any).timesPerWeek}x per week`}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Progress: 0 / {(task as any).timesPerWeek || 1} sessions</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Tasks State */}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No tasks added for this month yet.</p>
            </div>
          )}

          {/* Task Summary Section */}
          {tasks.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-[#805232] mb-3 text-sm">Task Summary</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>✓ Tasks Tracked:</span>
                  <span className="font-bold">{trackedTasksCount} / {tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>✓ Daily Tasks:</span>
                  <span className="font-bold">{dailyTasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>✓ Weekly Tasks:</span>
                  <span className="font-bold">{weeklyTasks.length}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex justify-between font-bold text-[#805232]">
                    <span>Overall Completion:</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium text-sm"
            >
              + Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
