import { useState, useEffect } from 'react';
import { Task, Goal } from '../types';
import { ChevronDown, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
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
  completionValues: Record<number, number>;
  lastCompletionDate: string | null;
  status: 'on-track' | 'at-risk' | 'behind' | 'completed';
}

export function TaskTimelinePage({ tasks, goals }: TaskTimelinePageProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'summary' | 'table' | 'heatmap'>('table');
  const [taskProgress, setTaskProgress] = useState<TaskProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine number of days to show based on screen width
  const daysToShow = windowWidth < 500 ? 1 : windowWidth < 640 ? 2 : windowWidth < 1024 ? 3 : 7;

  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const visibleDayIndices = Array.from({ length: daysToShow }, (_, i) => i);
  const visibleDayNames = visibleDayIndices.map(i => dayNames[i]);
  const visibleWeekDays = visibleDayIndices.map(i => weekDays[i]);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

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
            const completionValues: Record<number, number> = {};
            let lastCompletionDate: string | null = null;

            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
              const date = new Date(weekStart);
              date.setDate(date.getDate() + dayIndex);
              const dateStr = date.toISOString().split('T')[0];
              const completion = history.find(h => h.date.split('T')[0] === dateStr);

              if (completion) {
                completionValues[dayIndex] = Number(completion.value) || 0;
                if (completion.value > 0) {
                  completedDays.push(dayIndex);
                  lastCompletionDate = dateStr;
                }
              } else {
                completionValues[dayIndex] = 0;
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
              completionValues,
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
  }, [tasks, goals, currentDate]);

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
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-8">
      {/* Header with Week Navigation */}
      <div className="mb-2 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 gap-2">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-[#805232] mb-1 sm:mb-2">Task Timeline</h1>
            <p className="text-xs sm:text-base text-[#805232]">View all your tasks and their progress at a glance</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-4">
            <button
              onClick={handlePreviousWeek}
              className="p-1 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-[#805232]" />
            </button>
            <div className="text-center min-w-40 sm:min-w-64">
              <p className="text-xs sm:text-sm text-gray-600">Week of</p>
              <p className="text-sm sm:text-lg font-semibold text-[#805232]">
                {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={handleNextWeek}
              className="p-1 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-[#805232]" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-2 border-[#D0D0D0] rounded-lg p-2 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
          <div className="flex-1 min-w-40 sm:min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-[#805232]" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-2 sm:pr-4 py-1 sm:py-2 text-sm border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232]"
              />
            </div>
          </div>

          <select
            value={selectedGoal || ''}
            onChange={(e) => setSelectedGoal(e.target.value || null)}
            className="px-2 sm:px-4 py-1 sm:py-2 text-sm border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232] cursor-pointer"
          >
            <option value="">All Goals</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.title}</option>
            ))}
          </select>

          <select
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="px-2 sm:px-4 py-1 sm:py-2 text-sm border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232] cursor-pointer"
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
      <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 border-b-2 border-[#D0D0D0] overflow-x-auto">
        <button
          onClick={() => setActiveTab('summary')}
          className={`pb-2 sm:pb-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap ${
            activeTab === 'summary'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`pb-2 sm:pb-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap ${
            activeTab === 'table'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Table
        </button>
        <button
          onClick={() => setActiveTab('heatmap')}
          className={`pb-2 sm:pb-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap ${
            activeTab === 'heatmap'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Heatmap
        </button>
      </div>

      {/* Summary View */}
      {activeTab === 'summary' && (
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {Object.entries(groupedByGoal).map(([goalId, goalTasks]) => {
            const goal = goals.find(g => g.id === goalId);
            return (
              <div key={goalId} className="bg-white border-2 border-[#D0D0D0] rounded-lg p-2 sm:p-4 md:p-6">
                <h2 className="text-sm sm:text-base md:text-xl font-bold text-[#805232] mb-2 sm:mb-3 md:mb-4">
                  {goal?.title || 'Unknown Goal'} ({goalTasks.length})
                </h2>
                <div className="space-y-2 sm:space-y-2 md:space-y-3">
                  {goalTasks.map(tp => (
                    <div key={tp.task.id} className="flex flex-col gap-2 p-2 sm:p-2 md:p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#805232] text-xs sm:text-sm md:text-base truncate">{tp.task.title}</h3>
                          <p className="text-xs text-gray-600">
                            {tp.task.frequency?.toLowerCase() === 'daily' ? 'Daily' : `${tp.task.timesPerWeek || 0}x/week`}
                          </p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 ${getStatusColor(tp.status)}`}>
                          {getStatusLabel(tp.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
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
                        </div>
                        <span className="text-xs font-semibold text-gray-600 w-10 text-right">{tp.progress}%</span>
                        {windowWidth >= 768 && tp.lastCompletionDate && (
                          <span className="text-xs text-gray-600 whitespace-nowrap ml-2">Last: {new Date(tp.lastCompletionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
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
        <div className="bg-white border-2 border-[#D0D0D0] rounded-lg overflow-x-auto">
          {windowWidth < 768 ? (
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b-2 border-[#D0D0D0]">
                <tr>
                  <th className="px-2 py-2 text-left font-semibold text-[#805232] whitespace-nowrap">Task</th>
                  <th className="px-2 py-2 text-left font-semibold text-[#805232] whitespace-nowrap">Type</th>
                  <th className="px-2 py-2 text-left font-semibold text-[#805232] whitespace-nowrap">Freq</th>
                  <th className="px-2 py-2 text-left font-semibold text-[#805232] whitespace-nowrap">Progress</th>
                  <th className="px-2 py-2 text-left font-semibold text-[#805232] whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((tp, index) => (
                  <tr key={tp.task.id} className={`border-b border-[#D0D0D0] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-2 py-2 font-medium text-[#805232] max-w-20 truncate text-xs">{tp.task.title}</td>
                    <td className="px-2 py-2 text-gray-600 text-xs capitalize">{tp.task.type}</td>
                    <td className="px-2 py-2 text-gray-600 text-xs">{tp.task.frequency?.toLowerCase() === 'daily' ? 'Daily' : `${tp.task.timesPerWeek || 0}x/wk`}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-0.5">
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
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
                        <span className="text-xs font-semibold text-gray-600 w-6 text-right">{tp.progress}%</span>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap ${getStatusColor(tp.status)}`}>
                        {getStatusLabel(tp.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b-2 border-[#D0D0D0]">
                <tr>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-[#805232] whitespace-nowrap">Task</th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-[#805232] whitespace-nowrap">Goal</th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-[#805232] whitespace-nowrap">Type</th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-[#805232] whitespace-nowrap">Freq</th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-[#805232] whitespace-nowrap">Progress</th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-[#805232] whitespace-nowrap">Week</th>
                  <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-[#805232] whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((tp, index) => (
                  <tr key={tp.task.id} className={`border-b border-[#D0D0D0] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-3 md:px-4 py-2 md:py-4 font-medium text-[#805232] max-w-32 truncate">{tp.task.title}</td>
                    <td className="px-3 md:px-4 py-2 md:py-4 text-gray-600 max-w-24 truncate">{tp.goal?.title || '-'}</td>
                    <td className="px-3 md:px-4 py-2 md:py-4 text-gray-600 capitalize">{tp.task.type}</td>
                    <td className="px-3 md:px-4 py-2 md:py-4 text-gray-600">{tp.task.frequency?.toLowerCase() === 'daily' ? 'Daily' : `${tp.task.timesPerWeek || 0}x/wk`}</td>
                    <td className="px-3 md:px-4 py-2 md:py-4">
                      <div className="flex items-center gap-1">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
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
                        <span className="text-xs font-semibold text-gray-600 w-8 text-right">{tp.progress}%</span>
                      </div>
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-4 text-gray-600">
                      {tp.completedDays.length > 0 ? (
                        <div className="flex gap-0.5">
                          {visibleDayNames.map((day, i) => {
                            const dayIndex = visibleDayIndices[i];
                            return (
                              <span
                                key={day}
                                className={`w-5 h-5 flex items-center justify-center text-xs font-semibold rounded ${
                                  tp.completedDays.includes(dayIndex)
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                {day.charAt(0)}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 md:px-4 py-2 md:py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(tp.status)}`}>
                        {getStatusLabel(tp.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Weekly Heatmap */}
      {activeTab === 'heatmap' && (
        <div className="bg-white border-2 border-[#D0D0D0] rounded-lg p-2 sm:p-4 md:p-6 overflow-x-auto">
          <div style={{ display: 'grid', gridTemplateColumns: `auto repeat(${daysToShow}, minmax(0, 1fr))`, gap: '0.5rem' }}>
            {/* Header */}
            <div className="text-left text-xs sm:text-sm font-semibold text-[#805232] pb-3 pr-2 sm:pr-6 whitespace-nowrap">Task Name</div>
            {visibleDayNames.map((day, i) => (
              <div key={day} className="text-center text-xs sm:text-sm font-semibold text-[#805232] pb-3">
                <div>{day}</div>
                <div className="text-xs text-gray-600">{visibleWeekDays[i].getDate()}</div>
              </div>
            ))}
            
            {/* Task rows */}
            {filteredTasks.map((tp) => (
              <>
                <div key={`${tp.task.id}-name`} className="py-2 sm:py-3 pr-2 sm:pr-6 text-xs sm:text-sm font-medium text-[#805232] whitespace-nowrap">
                  {tp.task.title}
                </div>
                {visibleDayIndices.map((dayIndex) => {
                  const value = tp.completionValues[dayIndex] || 0;
                  const isCompleted = tp.completedDays.includes(dayIndex);
                  return (
                    <div key={`${tp.task.id}-${dayIndex}`} className="py-2 sm:py-3 text-center flex items-center justify-center">
                      <div
                        className={`w-6 sm:w-8 h-6 sm:h-8 rounded flex items-center justify-center text-xs font-semibold cursor-pointer transition-colors ${
                          isCompleted
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                        title={`${tp.task.title}: ${value} ${tp.task.unit}`}
                      >
                        {tp.task.type?.toLowerCase() === 'number' ? (isCompleted ? '✓' : '○') : (value > 0 ? '✓' : '○')}
                      </div>
                    </div>
                  );
                })}
              </>
            ))}
          </div>
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
