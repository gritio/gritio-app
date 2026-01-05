import { useState, useEffect } from 'react';
import { Task } from '../types';
import { ChevronLeft, ChevronRight, Check, Plus, Minus, X, ThumbsUp } from 'lucide-react';
import { tasksApi } from '../services/api';

interface WeeklyTaskViewProps {
  tasks: Task[];
  goals: any[];
  onGoalClick?: (goalId: string) => void;
}

export function WeeklyTaskView({ tasks, goals, onGoalClick }: WeeklyTaskViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [completions, setCompletions] = useState<Record<string, Record<number, number>>>(
    tasks.reduce((acc, task) => {
      acc[task.id] = {};
      return acc;
    }, {} as Record<string, Record<number, number>>)
  );
  const [celebrations, setCelebrations] = useState<Set<string>>(new Set());
  const [globalCelebration, setGlobalCelebration] = useState(false);

  const triggerCelebration = (taskId: string, dayIndex: number) => {
    const key = `${taskId}-${dayIndex}`;
    console.log('🎉 Triggering celebration for:', key);
    setCelebrations(prev => new Set(prev).add(key));
    setGlobalCelebration(true);
    setTimeout(() => {
      setCelebrations(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }, 4000);
    setTimeout(() => {
      setGlobalCelebration(false);
    }, 4000);
  };

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  useEffect(() => {
    const fetchWeeklyCompletions = async () => {
      const weekStartDate = getWeekStart(currentDate);
      const newCompletions: Record<string, Record<number, number>> = {};
      
      const promises = tasks.map(async (task) => {
        newCompletions[task.id] = {};
        
        try {
          const history = await tasksApi.getHistory(task.id, 7);
          
          for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const date = new Date(weekStartDate);
            date.setDate(date.getDate() + dayIndex);
            const dateStr = date.toISOString().split('T')[0];
            const completion = history.find(h => h.date.split('T')[0] === dateStr);
            newCompletions[task.id][dayIndex] = completion?.value || 0;
          }
        } catch (error) {
          console.error(`Failed to fetch history for task ${task.id}:`, error);
          for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            newCompletions[task.id][dayIndex] = 0;
          }
        }
      });
      
      await Promise.all(promises);
      setCompletions(newCompletions);
    };
    
    if (tasks.length > 0) {
      fetchWeeklyCompletions();
    }
  }, [currentDate, tasks]);

  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

  const isSimpleTask = (task: Task) => task.type?.toLowerCase() === 'number';

  const toggleCompletion = async (taskId: string, dayIndex: number) => {
    setLoading(true);
    try {
      const date = weekDays[dayIndex];
      const currentValue = completions[taskId]?.[dayIndex] || 0;
      const newValue = currentValue === 1 ? 0 : 1;
      console.log('Toggle completion:', { taskId, dayIndex, currentValue, newValue });
      
      await tasksApi.logCompletion(taskId, date.toISOString().split('T')[0], newValue);
      
      setCompletions(prev => ({
        ...prev,
        [taskId]: { ...prev[taskId], [dayIndex]: newValue }
      }));

      if (newValue === 1) {
        console.log('Calling triggerCelebration because newValue is 1');
        triggerCelebration(taskId, dayIndex);
      }
    } catch (error) {
      console.error('Failed to log completion:', error);
      alert('Failed to log completion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logNumericValue = async (taskId: string, dayIndex: number, value: number) => {
    if (isNaN(value) || value < 0) return;
    
    setLoading(true);
    try {
      const date = weekDays[dayIndex];
      const task = tasks.find(t => t.id === taskId);
      const wasNotCompleted = (completions[taskId]?.[dayIndex] || 0) < (task?.target || 0);
      const isNowCompleted = value >= (task?.target || 0);
      
      await tasksApi.logCompletion(taskId, date.toISOString().split('T')[0], value);
      
      setCompletions(prev => ({
        ...prev,
        [taskId]: { ...prev[taskId], [dayIndex]: value }
      }));

      if (wasNotCompleted && isNowCompleted) {
        triggerCelebration(taskId, dayIndex);
      }
    } catch (error) {
      console.error('Failed to log value:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeekProgress = (task: Task): number => {
    const dayValues = Object.values(completions[task.id] || {}).map(v => Number(v));
    const target = task.frequency === 'daily' ? 7 : (task.timesPerWeek || 5);
    
    if (isSimpleTask(task)) {
      // For simple tasks, count days with value >= 1
      const daysCompleted = dayValues.filter(v => v >= 1).length;
      return Math.round((daysCompleted / target) * 100);
    } else {
      // For numeric tasks, sum values and compare to target
      const totalValue = dayValues.reduce((sum, v) => sum + v, 0);
      const targetValue = task.target * target;
      return Math.round((totalValue / targetValue) * 100);
    }
  };

  const getCompletedCount = (task: Task): number => {
    const dayValues = Object.values(completions[task.id] || {}).map(v => Number(v));
    if (isSimpleTask(task)) {
      return dayValues.filter(v => v >= 1).length;
    } else {
      return dayValues.reduce((sum, v) => sum + v, 0);
    }
  };

  const getStepIncrement = (task: Task): number => {
    if (task.target >= 10000) return 1000;
    if (task.target >= 5000) return 500;
    return 100;
  };

  const getDistanceIncrement = (task: Task): number => {
    return task.target >= 10 ? 1 : 0.5;
  };

  const handleStepChange = (taskId: string, dayIndex: number, delta: number) => {
    const current = completions[taskId]?.[dayIndex] || 0;
    const newValue = Math.max(0, current + delta);
    logNumericValue(taskId, dayIndex, newValue);
  };

  const convertTimeToMinutes = (hours: number, minutes: number): number => {
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (totalMinutes: number): { hours: number; minutes: number } => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return { hours, minutes };
  };

  const goalMap = new Map(goals.map(g => [g.id, g]));

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-2">
      <style>{`
        @keyframes celebrateNumber {
          0% {
            opacity: 1;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
        @keyframes globalCelebrate {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes moveToTop {
          0% {
            transform: translateY(300px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes dance {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(-5deg);
          }
          50% {
            transform: translateY(0) rotate(5deg);
          }
          75% {
            transform: translateY(-8px) rotate(-5deg);
          }
        }
        .celebrate-emoji {
          animation: celebrateNumber 4.5s ease-out forwards;
          pointer-events: none;
          font-weight: bold;
          font-size: 3rem;
          color: #805232;
        }
        .global-celebration {
          position: fixed;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          animation: moveToTop 0.8s ease-out forwards, globalCelebrate 4s ease-out forwards;
          pointer-events: none;
        }
        .celebration-tile {
          background-color: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: none;
        }
        .celebration-number {
          font-size: 3rem;
          font-weight: bold;
          margin: 0;
          letter-spacing: 4px;
        }
        .celebration-number span.number-with-eyes {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 4px;
          position: relative;
          animation: dance 0.6s ease-in-out infinite;
          color: #1E40AF;
          -webkit-text-fill-color: #1E40AF;
          -webkit-text-stroke: 1.5px white;
          text-stroke: 1.5px white;
        }
        .celebration-number span.number-with-eyes:nth-child(2) {
          animation-delay: 0.1s;
        }
        .number-with-eyes {
          color: #1E40AF;
          -webkit-text-fill-color: #1E40AF;
          -webkit-text-stroke: 1.5px white;
          text-stroke: 1.5px white;
        }
        .eye-left {
          position: absolute;
          font-size: 0.6rem;
          color: #1E40AF;
          left: 8px;
          top: 6px;
        }
        .eye-right {
          position: absolute;
          font-size: 0.6rem;
          color: #1E40AF;
          right: 8px;
          top: 6px;
        }
        .pixel-character {
          animation: dance 0.6s ease-in-out infinite;
        }
        .celebration-character {
          font-size: 5rem;
        }
      `}</style>
      
      {/* Global Celebration Tile */}
      {globalCelebration && (
        <div className="global-celebration">
          <div className="celebration-tile">
            <div className="celebration-character">
              🎉
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-[#805232]">Weekly Tasks</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousWeek}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-[#805232]" />
            </button>
            <div className="text-center min-w-64">
              <p className="text-sm text-gray-600">Week of</p>
              <p className="text-lg font-semibold text-[#805232]">
                {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {
                  new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                }
              </p>
            </div>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-[#805232]" />
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Grid with inline headers */}
      <div className="space-y-0">
        {/* Day Names Row with Dates */}
        <div className="flex gap-2 pl-60">
          {dayNames.map((day, dayIndex) => (
            <div key={day} className="flex-1 text-center">
              <p className="text-xs font-bold text-amber-900">{day}</p>
              <p className="text-xs text-gray-600">{weekDays[dayIndex].getDate()}</p>
            </div>
          ))}
        </div>

        {tasks.map((task) => {
          const goal = goalMap.get(task.goalId);
          const progress = getWeekProgress(task);
          const target = task.frequency === 'daily' ? 7 : (task.timesPerWeek || 5);
          const completed = getCompletedCount(task);
          const isSimple = isSimpleTask(task);

          return (
            <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-3 flex gap-4 items-start">
              {/* Progress Circle */}
              <div className="flex-shrink-0 flex flex-col items-center w-16">
                <div className="relative w-12 h-12 rounded-full border-4 border-amber-100 flex items-center justify-center"
                  style={{ 
                    background: `conic-gradient(rgb(217, 119, 6) ${progress}%, transparent ${progress}%)`
                  }}>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-900">{progress}%</span>
                  </div>
                </div>
              </div>

              {/* Task Name and Description */}
              <div className="flex-shrink-0 flex flex-col items-start justify-center w-24">
                <h3 className="font-semibold text-amber-900 text-sm">{task.title}</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  {task.type?.toLowerCase() === 'number' ? '' : task.target}{task.type?.toLowerCase() === 'steps' ? 'K' : task.type?.toLowerCase() === 'distance' ? 'km' : task.type?.toLowerCase() === 'time' ? 'min' : ''} {task.frequency === 'daily' ? 'daily' : `${task.timesPerWeek}x/week`}
                </p>
              </div>

              {/* Days Grid */}
              <div className="flex-1 grid gap-2 pl-4" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
                {dayNames.map((dayName, dayIndex) => {
                  const date = weekDays[dayIndex];
                  const isToday = new Date().toDateString() === date.toDateString();
                  const dayValue = Number(completions[task.id]?.[dayIndex] || 0);
                  const isCompleted = isSimple ? dayValue >= 1 : dayValue >= task.target;
                  const celebrationKey = `${task.id}-${dayIndex}`;
                  const isCelebrating = celebrations.has(celebrationKey);

                  return isSimple ? (
                    // Simple checkbox toggle for "number" type tasks
                    <button
                      key={dayIndex}
                      onClick={() => toggleCompletion(task.id, dayIndex)}
                      disabled={loading}
                      className={`p-2 rounded-lg border-2 transition-all flex flex-col items-center justify-center h-16 relative overflow-hidden ${
                        isCompleted
                          ? 'border-amber-900 bg-amber-900'
                          : isToday
                          ? 'border-amber-900 bg-orange-50 hover:bg-orange-100'
                          : 'border-gray-200 bg-gray-50 hover:border-amber-900 hover:bg-gray-100'
                      } disabled:opacity-50`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <X className={`w-4 h-4 ${isToday ? 'text-amber-900' : 'text-gray-400'}`} />
                      )}
                    </button>
                  ) : task.type?.toLowerCase() === 'steps' ? (
                    // Steps input with text field
                    <div
                      key={dayIndex}
                      className={`p-1 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1 h-16 relative overflow-visible ${
                        isCompleted
                          ? 'border-amber-900 bg-amber-50'
                          : isToday
                          ? 'border-amber-900 bg-orange-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        value={dayValue > 0 ? Math.round(dayValue) : ''}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          logNumericValue(task.id, dayIndex, val);
                        }}
                        disabled={loading}
                        className="w-12 px-1 py-0.5 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-900"
                      />
                      <p className="text-xs text-gray-600">steps</p>
                    </div>
                  ) : task.type?.toLowerCase() === 'time' ? (
                    // Time input with hours and minutes
                    <div
                      key={dayIndex}
                      className={`p-1 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1 h-16 relative overflow-visible ${
                        isCompleted
                          ? 'border-amber-900 bg-amber-50'
                          : isToday
                          ? 'border-amber-900 bg-orange-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-xs">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="0"
                          value={convertMinutesToTime(dayValue).hours}
                          onChange={(e) => {
                            const h = parseInt(e.target.value) || 0;
                            const m = convertMinutesToTime(dayValue).minutes;
                            logNumericValue(task.id, dayIndex, convertTimeToMinutes(h, m));
                          }}
                          disabled={loading}
                          className="w-7 h-6 px-1 py-0.5 text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-900 text-xs"
                        />
                        <span className="text-xs font-bold">h</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="0"
                          value={convertMinutesToTime(dayValue).minutes}
                          onChange={(e) => {
                            const h = convertMinutesToTime(dayValue).hours;
                            const m = parseInt(e.target.value) || 0;
                            logNumericValue(task.id, dayIndex, convertTimeToMinutes(h, m));
                          }}
                          disabled={loading}
                          className="w-7 h-6 px-1 py-0.5 text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-900 text-xs"
                        />
                        <span className="text-xs font-bold">m</span>
                      </div>
                    </div>
                  ) : (
                    // Distance input with text field
                    <div
                      key={dayIndex}
                      className={`p-1 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-1 h-16 relative overflow-visible ${
                        isCompleted
                          ? 'border-amber-900 bg-amber-50'
                          : isToday
                          ? 'border-amber-900 bg-orange-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0"
                        value={dayValue > 0 ? dayValue.toFixed(1) : ''}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          logNumericValue(task.id, dayIndex, val);
                        }}
                        disabled={loading}
                        className="w-12 px-1 py-0.5 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-900"
                      />
                      <p className="text-xs text-gray-600">km</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks yet. Create one from the Goals Overview!</p>
          </div>
        )}
      </div>
    </div>
  );
}
