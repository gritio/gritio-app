import { useState, useEffect } from 'react';
import { Task } from '../types';
import { ChevronLeft, ChevronRight, Check, Plus, Minus, X, ThumbsUp, Edit2, Trash2 } from 'lucide-react';
import { tasksApi } from '../services/api';
import { EditTaskPanel } from './EditTaskPanel';

interface WeeklyTaskViewProps {
  tasks: Task[];
  goals: any[];
  onGoalClick?: (goalId: string) => void;
  onTasksUpdate?: () => void;
}

export function WeeklyTaskView({ tasks, goals, onGoalClick, onTasksUpdate }: WeeklyTaskViewProps) {
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
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [deleteConfirmTaskId, setDeleteConfirmTaskId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [tempInputs, setTempInputs] = useState<Record<string, Record<number, string>>>({});
  const [dayOffset, setDayOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine number of days to show based on screen width
  const daysToShow = windowWidth < 500 ? 2 : windowWidth < 640 ? 2 : windowWidth < 1024 ? 3 : 7;

  // Calculate which days to display based on current day and screen size
  const getDisplayDayIndices = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get this week's start (Monday)
    const weekStart = (() => {
      const d = new Date(today);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff);
      d.setHours(0, 0, 0, 0);
      return d;
    })();
    
    const currentDayIndex = Math.floor((today.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
    const isSameWeek = currentDayIndex >= 0 && currentDayIndex < 7;

    if (!isSameWeek || daysToShow === 7) {
      // Show first N days if not in current week, or show all 7 if daysToShow is 7
      return Array.from({ length: daysToShow }, (_, i) => i);
    }

    // For mobile/tablet views with offset
    const startIndex = Math.max(0, Math.min(currentDayIndex - Math.floor(daysToShow / 2) + dayOffset, 7 - daysToShow));
    return Array.from({ length: daysToShow }, (_, i) => startIndex + i);
  };

  const displayDayIndices = getDisplayDayIndices();

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

  const handleDeleteTask = async (taskId: string) => {
    try {
      setIsDeleting(true);
      await tasksApi.deleteTask(taskId);
      setDeleteConfirmTaskId(null);
      if (onTasksUpdate) onTasksUpdate();
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full mx-auto px-2 sm:px-4 md:px-6 py-2" style={{ maxWidth: 'fit-content' }}>
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-4 gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#805232]">Weekly Tasks</h1>
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
              className="p-1 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-[#805232]" />
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Grid with inline headers */}
      <div className="space-y-0 overflow-x-hidden">
        {/* Day Names Row with Dates and Navigation */}
        <div className="flex items-center gap-1 sm:gap-4">
          {/* Progress Circle Space */}
          {windowWidth >= 640 && <div className="flex-shrink-0 w-12"></div>}
          
          {/* Task Name Space */}
          <div className={windowWidth < 500 ? 'flex-shrink-0 w-20' : windowWidth < 640 ? 'flex-shrink-0 w-24' : 'flex-shrink-0 w-40'}></div>
          
          {/* Left Arrow */}
          {windowWidth < 1024 && daysToShow < 7 && (
            <button
              onClick={() => setDayOffset(Math.max(-(7 - daysToShow), dayOffset - 1))}
              disabled={dayOffset === -(7 - daysToShow)}
              className="p-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-amber-900" />
            </button>
          )}
          
          {/* Days */}
          <div className="flex-1 grid gap-1 sm:gap-2" style={{ gridTemplateColumns: `repeat(${daysToShow}, minmax(0, 108px))`, paddingLeft: windowWidth < 640 ? '0.25rem' : '1rem' }}>
            {displayDayIndices.map((actualDayIndex) => (
              <div key={dayNames[actualDayIndex]} className="flex-1 text-center">
                <p className="text-xs font-bold text-amber-900">{dayNames[actualDayIndex]}</p>
                <p className="text-xs text-gray-600">{weekDays[actualDayIndex].getDate()}</p>
              </div>
            ))}
          </div>
          
          {/* Right Arrow */}
          {windowWidth < 1024 && daysToShow < 7 && (
            <button
              onClick={() => setDayOffset(Math.min(7 - daysToShow, dayOffset + 1))}
              disabled={dayOffset === 7 - daysToShow}
              className="p-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 text-amber-900" />
            </button>
          )}
        </div>

        {tasks.map((task) => {
          const goal = goalMap.get(task.goalId);
          const progress = getWeekProgress(task);
          const target = task.frequency === 'daily' ? 7 : (task.timesPerWeek || 5);
          const completed = getCompletedCount(task);
          const isSimple = isSimpleTask(task);

          return (
            <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-2 sm:p-3 flex items-center overflow-x-auto">
              <div className="flex gap-1 sm:gap-4 items-center w-full min-w-0">
                {/* Progress Circle and Buttons - Hidden on mobile */}
                {windowWidth >= 640 && (
                  <div className="flex-shrink-0 flex flex-col items-center w-12">
                    <div className="relative w-12 h-12 rounded-full border-4 border-amber-100 flex items-center justify-center"
                      style={{ 
                        background: `conic-gradient(rgb(217, 119, 6) ${progress}%, transparent ${progress}%)`
                      }}>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-900">{progress}%</span>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <button
                        onClick={() => setEditingTaskId(task.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-amber-900"
                        title="Edit task"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmTaskId(task.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors text-gray-600 hover:text-red-600"
                        title="Delete task"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Task Name and Description */}
                <div className={windowWidth < 500 ? 'flex-shrink-0 w-20' : windowWidth < 640 ? 'flex-shrink-0 w-24' : 'flex-shrink-0 w-40'}>
                  <h3 className="font-semibold text-amber-900 text-xs sm:text-sm break-words">{task.title}</h3>
                  {windowWidth >= 640 && (
                    <p className="text-xs text-gray-600 mt-0.5">
                      {task.type?.toLowerCase() === 'number' ? '' : task.target}{task.type?.toLowerCase() === 'steps' ? 'K' : task.type?.toLowerCase() === 'distance' ? 'km' : task.type?.toLowerCase() === 'time' ? 'min' : ''} {task.frequency?.toLowerCase() === 'daily' ? 'daily' : `${task.timesPerWeek || 0}x/week`}
                    </p>
                  )}
                </div>

                {/* Days Grid */}
                <div className="flex-1 grid gap-1 sm:gap-2" style={{ gridTemplateColumns: `repeat(${daysToShow}, minmax(0, 108px))`, paddingLeft: windowWidth < 640 ? '0.25rem' : '1rem' }}>
                {displayDayIndices.map((actualDayIndex) => {
                  const date = weekDays[actualDayIndex];
                  const isToday = new Date().toDateString() === date.toDateString();
                  const dayValue = Number(completions[task.id]?.[actualDayIndex] || 0);
                  const isCompleted = isSimple ? dayValue >= 1 : dayValue >= task.target;
                  const celebrationKey = `${task.id}-${actualDayIndex}`;
                  const isCelebrating = celebrations.has(celebrationKey);

                  return isSimple ? (
                    // Simple checkbox toggle for "number" type tasks
                    <button
                      key={actualDayIndex}
                      onClick={() => toggleCompletion(task.id, actualDayIndex)}
                      disabled={loading}
                      className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center h-16 relative overflow-hidden ${
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
                      key={actualDayIndex}
                      className={`p-2 rounded-lg border-2 transition-all flex flex-col items-center justify-center h-16 relative overflow-visible ${
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
                        value={
                          tempInputs[task.id]?.[actualDayIndex] !== undefined 
                            ? tempInputs[task.id][actualDayIndex] 
                            : dayValue > 0 ? Math.round(dayValue) : ''
                        }
                        onChange={(e) => {
                          setTempInputs(prev => ({
                            ...prev,
                            [task.id]: {
                              ...prev[task.id],
                              [actualDayIndex]: e.target.value
                            }
                          }));
                        }}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          logNumericValue(task.id, actualDayIndex, val);
                          setTempInputs(prev => ({
                            ...prev,
                            [task.id]: {
                              ...prev[task.id],
                              [actualDayIndex]: undefined
                            }
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = parseInt(e.currentTarget.value) || 0;
                            logNumericValue(task.id, actualDayIndex, val);
                            setTempInputs(prev => ({
                              ...prev,
                              [task.id]: {
                                ...prev[task.id],
                                [actualDayIndex]: undefined
                              }
                            }));
                          }
                        }}
                        disabled={loading}
                        className="w-12 px-1 py-0.5 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-900"
                      />
                      <p className="text-xs text-gray-600">steps</p>
                    </div>
                  ) : task.type?.toLowerCase() === 'time' ? (
                    // Time input with hours and minutes
                    <div
                      key={actualDayIndex}
                      className={`p-2 rounded-lg border-2 transition-all flex flex-col items-center justify-center h-16 relative overflow-visible ${
                        isCompleted
                          ? 'border-amber-900 bg-amber-50'
                          : isToday
                          ? 'border-amber-900 bg-orange-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 text-xs w-full">
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="0"
                          value={
                            tempInputs[task.id]?.[`${actualDayIndex}-h`] !== undefined
                              ? tempInputs[task.id][`${actualDayIndex}-h`]
                              : convertMinutesToTime(dayValue).hours
                          }
                          onChange={(e) => {
                            setTempInputs(prev => ({
                              ...prev,
                              [task.id]: {
                                ...prev[task.id],
                                [`${actualDayIndex}-h`]: e.target.value
                              }
                            }));
                          }}
                          onBlur={(e) => {
                            const h = parseInt(e.target.value) || 0;
                            const m = parseInt(tempInputs[task.id]?.[`${actualDayIndex}-m`] || convertMinutesToTime(dayValue).minutes) || 0;
                            logNumericValue(task.id, actualDayIndex, convertTimeToMinutes(h, m));
                            setTempInputs(prev => ({
                              ...prev,
                              [task.id]: {
                                ...prev[task.id],
                                [`${actualDayIndex}-h`]: undefined,
                                [`${actualDayIndex}-m`]: undefined
                              }
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const h = parseInt(e.currentTarget.value) || 0;
                              const m = parseInt(tempInputs[task.id]?.[`${actualDayIndex}-m`] || convertMinutesToTime(dayValue).minutes) || 0;
                              logNumericValue(task.id, actualDayIndex, convertTimeToMinutes(h, m));
                              setTempInputs(prev => ({
                                ...prev,
                                [task.id]: {
                                  ...prev[task.id],
                                  [`${actualDayIndex}-h`]: undefined,
                                  [`${actualDayIndex}-m`]: undefined
                                }
                              }));
                            }
                          }}
                          disabled={loading}
                          className="w-7 h-6 px-1 py-0.5 text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-900 text-xs"
                        />
                        <span className="text-xs font-bold">h</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="0"
                          value={
                            tempInputs[task.id]?.[`${actualDayIndex}-m`] !== undefined
                              ? tempInputs[task.id][`${actualDayIndex}-m`]
                              : convertMinutesToTime(dayValue).minutes
                          }
                          onChange={(e) => {
                            setTempInputs(prev => ({
                              ...prev,
                              [task.id]: {
                                ...prev[task.id],
                                [`${actualDayIndex}-m`]: e.target.value
                              }
                            }));
                          }}
                          onBlur={(e) => {
                            const h = parseInt(tempInputs[task.id]?.[`${actualDayIndex}-h`] || convertMinutesToTime(dayValue).hours) || 0;
                            const m = parseInt(e.target.value) || 0;
                            logNumericValue(task.id, actualDayIndex, convertTimeToMinutes(h, m));
                            setTempInputs(prev => ({
                              ...prev,
                              [task.id]: {
                                ...prev[task.id],
                                [`${actualDayIndex}-h`]: undefined,
                                [`${actualDayIndex}-m`]: undefined
                              }
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const h = parseInt(tempInputs[task.id]?.[`${actualDayIndex}-h`] || convertMinutesToTime(dayValue).hours) || 0;
                              const m = parseInt(e.currentTarget.value) || 0;
                              logNumericValue(task.id, actualDayIndex, convertTimeToMinutes(h, m));
                              setTempInputs(prev => ({
                                ...prev,
                                [task.id]: {
                                  ...prev[task.id],
                                  [`${actualDayIndex}-h`]: undefined,
                                  [`${actualDayIndex}-m`]: undefined
                                }
                              }));
                            }
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
                      key={actualDayIndex}
                      className={`p-2 rounded-lg border-2 transition-all flex flex-col items-center justify-center h-16 relative overflow-visible ${
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
                        value={
                          tempInputs[task.id]?.[actualDayIndex] !== undefined 
                            ? tempInputs[task.id][actualDayIndex] 
                            : dayValue > 0 ? dayValue.toFixed(1) : ''
                        }
                        onChange={(e) => {
                          setTempInputs(prev => ({
                            ...prev,
                            [task.id]: {
                              ...prev[task.id],
                              [actualDayIndex]: e.target.value
                            }
                          }));
                        }}
                        onBlur={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          logNumericValue(task.id, actualDayIndex, val);
                          setTempInputs(prev => ({
                            ...prev,
                            [task.id]: {
                              ...prev[task.id],
                              [actualDayIndex]: undefined
                            }
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = parseFloat(e.currentTarget.value) || 0;
                            logNumericValue(task.id, actualDayIndex, val);
                            setTempInputs(prev => ({
                              ...prev,
                              [task.id]: {
                                ...prev[task.id],
                                [actualDayIndex]: undefined
                              }
                            }));
                          }
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
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks yet. Create one from the Goals Overview!</p>
          </div>
        )}
      </div>

      {/* Edit Task Panel */}
      {editingTaskId && (
        <EditTaskPanel
          isOpen={!!editingTaskId}
          onClose={() => setEditingTaskId(null)}
          task={tasks.find(t => t.id === editingTaskId) || null}
          onSave={(updatedTask) => {
            if (onTasksUpdate) onTasksUpdate();
            setEditingTaskId(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmTaskId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Task?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{tasks.find(t => t.id === deleteConfirmTaskId)?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmTaskId(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTask(deleteConfirmTaskId)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
