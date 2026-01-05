import { useState } from 'react';
import { Goal, Task, WeeklyCheckIn } from '../types';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { TrendingUp, CheckSquare, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeeklyReviewProps {
  goals: Goal[];
  tasks: Task[];
  checkIns: WeeklyCheckIn[];
}

type TimeRange = 'week' | 'month' | 'custom';
type ViewType = 'carousel' | 'grid';

export function WeeklyReview({ goals, tasks, checkIns }: WeeklyReviewProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [startDate, setStartDate] = useState<string>(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const getDateRange = () => {
    let start: Date, end: Date;
    
    if (timeRange === 'week') {
      start = new Date();
      start.setDate(start.getDate() - start.getDay());
      end = new Date(start);
      end.setDate(start.getDate() + 6);
    } else if (timeRange === 'month') {
      const [year, month] = selectedMonth.split('-').map(Number);
      start = new Date(year, month - 1, 1);
      end = new Date(year, month, 0);
    } else {
      start = new Date(startDate);
      end = new Date(endDate);
    }
    
    return { start, end };
  };

  const { start: rangeStart, end: rangeEnd } = getDateRange();
  const rangeLabel = `${rangeStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${rangeEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#DCDCDC] border border-[#805232] p-2 rounded-lg">
            <TrendingUp className="w-6 h-6 text-[#805232]" />
          </div>
          <h1 className="text-[#805232]">Progress Review</h1>
        </div>
        <p className="text-[#805232] mb-4">{rangeLabel}</p>
        
        {/* View Type Toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setViewType('grid')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-[#805232] hover:bg-gray-300'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => {
              setViewType('carousel');
              setCarouselIndex(0);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === 'carousel'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-[#805232] hover:bg-gray-300'
            }`}
          >
            Carousel View
          </button>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-[#805232] mb-2">
              Time Range
            </label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
            >
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="custom">Custom Date Range</option>
            </select>
          </div>
          
          {timeRange === 'month' && (
            <div>
              <label className="block text-sm font-medium text-[#805232] mb-2">
                Month
              </label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
            </div>
          )}
          
          {timeRange === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#805232] mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#805232] mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Goal Reviews - Grid View */}
      {viewType === 'grid' && (
        <div className="space-y-6">
          {checkIns.map(checkIn => {
          const goal = goals.find(g => g.id === checkIn.goalId);
          if (!goal) return null;
          
          const goalTasks = tasks.filter(t => t.goalId === goal.id);
          const weeklyTasks = goalTasks.filter(t => t.frequency === 'weekly');
          
          return (
            <div key={checkIn.goalId} className="bg-[#DCDCDC] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              {/* Goal Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-[#805232] mb-1">{goal.area}</div>
                  <h2 className="mb-1 text-[#805232]">{goal.title}</h2>
                  <p className="text-sm text-[#805232]">Target: {goal.yearlyMeasure}</p>
                </div>
                <StatusBadge status={checkIn.status} size="md" />
              </div>
              
              {/* Week Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-[#805232]">Weekly Progress</span>
                  <span className="text-[#805232]">
                    {checkIn.tasksCompleted} / {checkIn.tasksTotal} tasks completed
                  </span>
                </div>
                <ProgressBar 
                  progress={checkIn.percentageComplete} 
                  status={checkIn.status}
                  showLabel={false}
                  height="md"
                />
              </div>
              
              {/* Daily Progress Chart */}
              <div className="mb-4">
                <h3 className="mb-3 text-sm text-[#805232]">Daily Progress</h3>
                {(() => {
                  const chartData = [];
                  const diffTime = Math.abs(rangeEnd.getTime() - rangeStart.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                  
                  for (let i = 0; i < diffDays; i++) {
                    const date = new Date(rangeStart);
                    date.setDate(rangeStart.getDate() + i);
                    
                    const dayLabel = timeRange === 'month' 
                      ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
                    
                    const dayTasks = goalTasks.filter(t => {
                      const lastUpdated = new Date(t.lastUpdated);
                      return lastUpdated.toDateString() === date.toDateString();
                    });
                    
                    const avgProgress = dayTasks.length > 0
                      ? Math.round(dayTasks.reduce((sum, t) => sum + ((t.currentProgress / t.target) * 100), 0) / dayTasks.length)
                      : 0;
                    
                    chartData.push({
                      day: dayLabel,
                      progress: avgProgress
                    });
                  }
                  
                  return (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="day" 
                          angle={diffDays > 10 ? -45 : 0}
                          textAnchor={diffDays > 10 ? "end" : "middle"}
                          height={diffDays > 10 ? 80 : 30}
                        />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Bar 
                          dataKey="progress" 
                          fill="#3b82f6" 
                          name="Daily Progress %"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  );
                })()}
              </div>
              
              {/* Task Breakdown */}
              <div className="mb-4">
                <h3 className="mb-3 text-sm text-[#805232]">This Week's Tasks</h3>
                <div className="space-y-2">
                  {weeklyTasks.map(task => {
                    const completion = (task.currentProgress / task.target) * 100;
                    const isComplete = completion >= 100;
                    
                    return (
                      <div key={task.id} className="flex items-center gap-3 text-sm">
                        {isComplete ? (
                          <CheckSquare className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        )}
                        <span className={isComplete ? 'text-[#805232] line-through' : 'text-[#805232]'}>
                          {task.title}
                        </span>
                        <span className="ml-auto text-[#805232]">
                          {Math.round(completion)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Notes Section */}
              {checkIn.notes && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-[#805232] mb-1">Reflection</div>
                  <p className="text-sm text-[#805232]">{checkIn.notes}</p>
                </div>
              )}
              
              {/* Comparison: Actual vs Expected */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="text-blue-600 mb-1">Expected Progress</div>
                  <div className="text-[#805232]">
                    {Math.round((new Date().getTime() - goal.startDate.getTime()) / 
                      (goal.endDate.getTime() - goal.startDate.getTime()) * 100)}%
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <div className="text-green-600 mb-1">Actual Progress</div>
                  <div className="text-green-900">{goal.progress}%</div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}
      
      {/* Goal Reviews - Carousel View */}
      {viewType === 'carousel' && checkIns.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCarouselIndex((prev) => (prev - 1 + checkIns.length) % checkIns.length)}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1 px-6">
              {(() => {
                const checkIn = checkIns[carouselIndex];
                const goal = goals.find(g => g.id === checkIn.goalId);
                if (!goal) return null;
                
                const goalTasks = tasks.filter(t => t.goalId === goal.id);
                const weeklyTasks = goalTasks.filter(t => t.frequency === 'weekly');
                
                return (
                  <div className="bg-[#DCDCDC] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    {/* Goal Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-[#805232] mb-1">{goal.area}</div>
                        <h2 className="mb-1 text-[#805232]">{goal.title}</h2>
                        <p className="text-sm text-[#805232]">Target: {goal.yearlyMeasure}</p>
                      </div>
                      <StatusBadge status={checkIn.status} size="md" />
                    </div>
                    
                    {/* Week Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-[#805232]">Weekly Progress</span>
                        <span className="text-[#805232]">
                          {checkIn.tasksCompleted} / {checkIn.tasksTotal} tasks completed
                        </span>
                      </div>
                      <ProgressBar 
                        progress={checkIn.percentageComplete} 
                        status={checkIn.status}
                        showLabel={false}
                        height="md"
                      />
                    </div>
                    
                    {/* Daily Progress Chart */}
                    <div className="mb-4">
                      <h3 className="mb-3 text-sm text-[#805232]">Daily Progress</h3>
                      {(() => {
                        const chartData = [];
                        const diffTime = Math.abs(rangeEnd.getTime() - rangeStart.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                        
                        for (let i = 0; i < diffDays; i++) {
                          const date = new Date(rangeStart);
                          date.setDate(rangeStart.getDate() + i);
                          
                          const dayLabel = timeRange === 'month' 
                            ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
                          
                          const dayTasks = goalTasks.filter(t => {
                            const lastUpdated = new Date(t.lastUpdated);
                            return lastUpdated.toDateString() === date.toDateString();
                          });
                          
                          const avgProgress = dayTasks.length > 0
                            ? Math.round(dayTasks.reduce((sum, t) => sum + ((t.currentProgress / t.target) * 100), 0) / dayTasks.length)
                            : 0;
                          
                          chartData.push({
                            day: dayLabel,
                            progress: avgProgress
                          });
                        }
                        
                        return (
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis 
                                dataKey="day" 
                                angle={diffDays > 10 ? -45 : 0}
                                textAnchor={diffDays > 10 ? "end" : "middle"}
                                height={diffDays > 10 ? 80 : 30}
                              />
                              <YAxis domain={[0, 100]} />
                              <Tooltip formatter={(value) => `${value}%`} />
                              <Legend />
                              <Bar 
                                dataKey="progress" 
                                fill="#3b82f6" 
                                name="Daily Progress %"
                                radius={[8, 8, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        );
                      })()}
                    </div>
                    
                    {/* Task Breakdown */}
                    <div className="mb-4">
                      <h3 className="mb-3 text-sm text-[#805232]">This Week's Tasks</h3>
                      <div className="space-y-2">
                        {weeklyTasks.map(task => {
                          const completion = (task.currentProgress / task.target) * 100;
                          const isComplete = completion >= 100;
                          
                          return (
                            <div key={task.id} className="flex items-center gap-3 text-sm">
                              {isComplete ? (
                                <CheckSquare className="w-4 h-4 text-green-600 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                              )}
                              <span className={isComplete ? 'text-[#805232] line-through' : 'text-[#805232]'}>
                                {task.title}
                              </span>
                              <span className="ml-auto text-[#805232]">
                                {Math.round(completion)}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Comparison: Actual vs Expected */}
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-blue-50 rounded">
                        <div className="text-blue-600 mb-1">Expected Progress</div>
                        <div className="text-[#805232]">
                          {Math.round((new Date().getTime() - goal.startDate.getTime()) / 
                            (goal.endDate.getTime() - goal.startDate.getTime()) * 100)}%
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <div className="text-green-600 mb-1">Actual Progress</div>
                        <div className="text-green-900">{goal.progress}%</div>
                      </div>
                    </div>
                    
                    {/* Carousel Counter */}
                    <div className="text-center mt-6 text-sm text-[#805232]">
                      Goal {carouselIndex + 1} of {checkIns.length}
                    </div>
                  </div>
                );
              })()}
            </div>
            
            <button
              onClick={() => setCarouselIndex((prev) => (prev + 1) % checkIns.length)}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      
      {/* Annotations */}
      <div className="mt-8 p-6 bg-[#DCDCDC] rounded-lg shadow-md border-l-4 border-amber-700">
        <h3 className="mb-3 text-[#805232] font-semibold">📈 Weekly Review & Check-in</h3>
        <div className="space-y-2 text-sm text-[#805232]">
          <p>• <strong>Weekly reviews</strong> aggregate all tasks for each goal to show overall progress</p>
          <p>• <strong>Actual vs Expected</strong> comparison shows if you're ahead or behind schedule</p>
          <p>• Expected progress is calculated based on time elapsed (days passed / total days in year)</p>
          <p>• <strong>Task completion tracking</strong>: Shows which weekly tasks were completed vs total</p>
          <p>• <strong>Reflection notes</strong> allow you to record insights and adjustments for next week</p>
          <p>• This view helps identify goals that need more attention and celebrate wins</p>
        </div>
      </div>
    </div>
  );
}
