import { useState, useEffect } from 'react';
import { Task, Goal } from '../types';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { tasksApi } from '../services/api';

interface TaskTimelinePageProps {
  tasks: Task[];
  goals: Goal[];
}

interface TaskProgress {
  task: Task;
  goal: Goal | undefined;
  progress: number;
  completedDays: number[];
  lastCompletionDate: string | null;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
}

export function TaskTimelinePage({ tasks, goals }: TaskTimelinePageProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'table' | 'heatmap'>('heatmap');
  const [taskProgress, setTaskProgress] = useState<TaskProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const weekStart = getWeekStart(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function getWeekStart(date: Date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  useEffect(() => {
    const fetchTaskProgress = async () => {
      try {
        setLoading(true);
        const progressData: TaskProgress[] = await Promise.all(
          tasks.map(async (task) => {
            const goal = goals.find(g => g.id === task.goalId);
            const history = await tasksApi.getHistory(task.id, 7);

            const completedDays: number[] = [];
            let lastCompletionDate: string | null = null;

            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
              const date = new Date(weekStart);
              date.setDate(date.getDate() + dayIndex);
              const dateStr = date.toISOString().split('T')[0];
              const completion = history.find(h => h.date.split('T')[0] === dateStr);

              if (completion && completion.value > 0) {
                completedDays.push(dayIndex);
                lastCompletionDate = dateStr;
              }
            }

            const target = task.frequency === 'daily' ? 7 : (task.timesPerWeek || 5);
            const progress = Math.round((completedDays.length / target) * 100);

            let status: 'on-track' | 'at-risk' | 'behind' | 'completed' = 'behind';
            if (progress >= 100) status = 'completed';
            else if (progress >= 70) status = 'on-track';
            else if (progress >= 50) status = 'at-risk';

            return {
              task,
              goal,
              progress,
              completedDays,
              lastCompletionDate,
              status,
            };
          })
        );

        setTaskProgress(progressData);
      } catch (error) {
        console.error('Failed to fetch task progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskProgress();
  }, [tasks, goals]);

  const filteredTasks = taskProgress.filter(tp => {
    if (selectedGoal && tp.task.goalId !== selectedGoal) return false;
    if (selectedType && tp.task.type?.toLowerCase() !== selectedType.toLowerCase()) return false;
    if (searchTerm && !tp.task.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const groupedByGoal = filteredTasks.reduce((acc, tp) => {
    const goalId = tp.task.goalId;
    if (!acc[goalId]) {
      acc[goalId] = [];
    }
    acc[goalId].push(tp);
    return acc;
  }, {} as Record<string, TaskProgress[]>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'on-track':
        return 'bg-green-100 text-green-700';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-700';
      case 'behind':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'on-track':
        return 'On Track';
      case 'at-risk':
        return 'At Risk';
      case 'behind':
        return 'Behind';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#805232] mb-4"></div>
          <p className="text-[#805232] font-medium">Loading task timeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#805232] mb-2">Task Timeline</h1>
        <p className="text-[#805232]">View all your tasks and their progress at a glance</p>
      </div>

      {/* Filters */}
      <div className="bg-white border-2 border-[#D0D0D0] rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-[#805232]" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232]"
              />
            </div>
          </div>

          <select
            value={selectedGoal || ''}
            onChange={(e) => setSelectedGoal(e.target.value || null)}
            className="px-4 py-2 border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232] cursor-pointer"
          >
            <option value="">All Goals</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.title}</option>
            ))}
          </select>

          <select
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="px-4 py-2 border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232] cursor-pointer"
          >
            <option value="">All Types</option>
            <option value="number">Number</option>
            <option value="time">Time</option>
            <option value="steps">Steps</option>
            <option value="distance">Distance</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b-2 border-[#D0D0D0]">
        <button
          onClick={() => setActiveTab('summary')}
          className={`pb-3 px-4 font-semibold transition-colors ${
            activeTab === 'summary'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Summary View
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`pb-3 px-4 font-semibold transition-colors ${
            activeTab === 'table'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => setActiveTab('heatmap')}
          className={`pb-3 px-4 font-semibold transition-colors ${
            activeTab === 'heatmap'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Weekly Heatmap
        </button>
      </div>

      {/* Summary View */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {Object.entries(groupedByGoal).map(([goalId, goalTasks]) => {
            const goal = goals.find(g => g.id === goalId);
            return (
              <div key={goalId} className="bg-white border-2 border-[#D0D0D0] rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#805232] mb-4">
                  {goal?.title || 'Unknown Goal'} ({goalTasks.length} tasks)
                </h2>
                <div className="space-y-3">
                  {goalTasks.map(tp => (
                    <div key={tp.task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#805232]">{tp.task.title}</h3>
                        <p className="text-sm text-gray-600">
                          {tp.task.frequency?.toLowerCase() === 'daily' ? 'daily' : `${tp.task.timesPerWeek || 0}x/week`}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32">
                          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                tp.status === 'completed' ? 'bg-green-500' :
                                tp.status === 'on-track' ? 'bg-green-500' :
                                tp.status === 'at-risk' ? 'bg-yellow-500' :
                                'bg-orange-500'
                              }`}
                              style={{ width: `${Math.min(tp.progress, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{tp.progress}%</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(tp.status)}`}>
                          {getStatusLabel(tp.status)}
                        </span>
                        {tp.lastCompletionDate && (
                          <span className="text-xs text-gray-600">Last: {new Date(tp.lastCompletionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {activeTab === 'table' && (
        <div className="bg-white border-2 border-[#D0D0D0] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-[#D0D0D0]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#805232]">Task Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#805232]">Goal</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#805232]">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#805232]">Frequency</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#805232]">Progress</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#805232]">This Week</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#805232]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((tp, index) => (
                <tr key={tp.task.id} className={`border-b border-[#D0D0D0] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 text-sm font-medium text-[#805232]">{tp.task.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tp.goal?.title || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{tp.task.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tp.task.frequency?.toLowerCase() === 'daily' ? 'daily' : `${tp.task.timesPerWeek || 0}x/week`}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            tp.status === 'completed' ? 'bg-green-500' :
                            tp.status === 'on-track' ? 'bg-green-500' :
                            tp.status === 'at-risk' ? 'bg-yellow-500' :
                            'bg-orange-500'
                          }`}
                          style={{ width: `${Math.min(tp.progress, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 w-8">{tp.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {tp.completedDays.length > 0 ? (
                      <div className="flex gap-1">
                        {dayNames.map((day, i) => (
                          <span
                            key={day}
                            className={`w-6 h-6 flex items-center justify-center text-xs font-semibold rounded ${
                              tp.completedDays.includes(i)
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {day.charAt(0)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(tp.status)}`}>
                      {getStatusLabel(tp.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Weekly Heatmap */}
      {activeTab === 'heatmap' && (
        <div className="bg-white border-2 border-[#D0D0D0] rounded-lg p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-semibold text-[#805232] pb-3 pr-6">Task Name</th>
                {dayNames.map((day, i) => (
                  <th key={day} className="text-center text-sm font-semibold text-[#805232] pb-3">
                    <div>{day}</div>
                    <div className="text-xs text-gray-600">{weekDays[i].getDate()}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((tp, index) => (
                <tr key={tp.task.id} className={`border-t border-[#D0D0D0] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="py-3 pr-6 text-sm font-medium text-[#805232]">{tp.task.title}</td>
                  {dayNames.map((_, dayIndex) => (
                    <td key={dayIndex} className="py-3 text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded flex items-center justify-center text-sm font-semibold ${
                          tp.completedDays.includes(dayIndex)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {tp.completedDays.includes(dayIndex) ? '✓' : '○'}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white border-2 border-[#D0D0D0] rounded-lg p-12">
            <p className="text-[#805232] text-lg mb-4">No tasks found</p>
            <p className="text-gray-600">Try adjusting your filters or search</p>
          </div>
        </div>
      )}
    </div>
  );
}
