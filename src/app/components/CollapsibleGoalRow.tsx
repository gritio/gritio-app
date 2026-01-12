import { useState, useEffect } from 'react';
import { Goal, MonthlyGoal } from '../types';
import { ChevronDown, ChevronRight, ArrowLeft, ArrowRight, Edit, Trash2, Plus, Eye, X, Calendar } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { tasksApi } from '../services/api';

interface CollapsibleGoalRowProps {
  goal: Goal;
  monthlyGoals: MonthlyGoal[];
  isExpanded: boolean;
  onToggle: () => void;
  onEditMonthlyGoal: (monthlyGoalId: string) => void;
  onUpdateProgress: (monthlyGoalId: string, newProgress: number | string) => Promise<void>;
  onEditGoal?: (goalId: string) => void;
  onDeleteGoal?: (goalId: string) => void;
  onAddTask?: (goalId: string) => void;
  onGenerateMonthlyGoals?: (goalId: string) => void;
  tasks?: any[];
}

export function CollapsibleGoalRow({
  goal,
  monthlyGoals,
  isExpanded,
  onToggle,
  onEditMonthlyGoal,
  onUpdateProgress,
  onEditGoal,
  onDeleteGoal,
  onAddTask,
  onGenerateMonthlyGoals,
  tasks = [],
}: CollapsibleGoalRowProps) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [celebrations, setCelebrations] = useState<Set<string>>(new Set());
  const [globalCelebration, setGlobalCelebration] = useState(false);
  const [monthCompletions, setMonthCompletions] = useState<Record<string, any[]>>({});
  const [loadingMonths, setLoadingMonths] = useState<Set<string>>(new Set());
  const [selectedIconMonthId, setSelectedIconMonthId] = useState<string | null>(null);

  const goalMonthlyGoals = monthlyGoals
    .filter(mg => mg.goalId === goal.id)
    .sort((a, b) => {
      const dateA = typeof a.monthDate === 'string' ? new Date(a.monthDate).getTime() : a.monthDate.getTime();
      const dateB = typeof b.monthDate === 'string' ? new Date(b.monthDate).getTime() : b.monthDate.getTime();
      return dateA - dateB;
    });

  const visibleMonths = goalMonthlyGoals.slice(monthOffset, monthOffset + 6);
  const canGoBack = monthOffset > 0;
  const canGoForward = monthOffset + 6 < goalMonthlyGoals.length;

  const formatProgressValue = (value: number | string): string => {
    const num = Number(value);
    if (num === 0 || num === 1 || Number.isInteger(num)) {
      return Math.round(num).toString();
    }
    return num.toFixed(2);
  };

  const handleEditStart = (monthlyGoal: MonthlyGoal) => {
    setEditingId(monthlyGoal.id);
    setEditValue(String(monthlyGoal.currentProgress));
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const triggerCelebration = (monthlyGoalId: string) => {
    const key = `${monthlyGoalId}`;
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

  const handleEditSave = async (monthlyGoalId: string) => {
    try {
      setIsSaving(true);
      const newValue = parseFloat(editValue) || 0;
      const monthlyGoal = goalMonthlyGoals.find(mg => mg.id === monthlyGoalId);
      
      // Check if we just reached the target
      const wasNotCompleted = (monthlyGoal?.currentProgress || 0) < (monthlyGoal?.target || 0);
      const isNowCompleted = newValue >= (monthlyGoal?.target || 0);
      
      await onUpdateProgress(monthlyGoalId, newValue);
      
      if (wasNotCompleted && isNowCompleted && monthlyGoal) {
        triggerCelebration(monthlyGoalId);
      }
      
      setEditingId(null);
      setEditValue('');
    } finally {
      setIsSaving(false);
    }
  };

  const getMonthlyTaskProgress = (monthDate: Date | string) => {
    // Filter tasks that belong to this goal
    const goalTasks = tasks.filter(t => t.goalId === goal.id);
    
    if (goalTasks.length === 0) {
      return [];
    }
    
    const dateObj = typeof monthDate === 'string' ? new Date(monthDate) : monthDate;
    const year = dateObj.getFullYear();
    const monthNum = dateObj.getMonth() + 1;
    
    // Return task summaries with cached completion data
    return goalTasks.map(task => {
      const completionData = monthCompletions[`${task.id}-${year}-${monthNum}`] || { totalValue: 0, daysWithActivity: 0 };
      const totalValue = Number(completionData.totalValue || 0);
      const daysWithProgress = Number(completionData.daysWithActivity || 0);
      
      let progressText = '';
      if (task.type?.toLowerCase() === 'number') {
        progressText = `${totalValue} / ${task.target * (task.frequency === 'daily' ? 30 : (task.timesPerWeek || 5) * 4)}`;
      } else {
        progressText = `${daysWithProgress} days`;
      }
      
      return {
        id: task.id,
        title: task.title,
        type: task.type,
        target: task.target,
        progress: progressText,
      };
    });
  };

  // Fetch month completions on component mount for all months
  useEffect(() => {
    const goalTasks = tasks.filter(t => t.goalId === goal.id);
    
    goalMonthlyGoals.forEach(mg => {
      const dateObj = typeof mg.monthDate === 'string' ? new Date(mg.monthDate) : mg.monthDate;
      const year = dateObj.getFullYear();
      const monthNum = dateObj.getMonth() + 1;
      const monthKey = `${year}-${monthNum}`;
      
      // Check if all tasks for this month are already cached
      const allCached = goalTasks.every(task => monthCompletions[`${task.id}-${year}-${monthNum}`]);
      if (allCached) {
        return;
      }
      
      setLoadingMonths(prev => new Set(prev).add(monthKey));
      
      Promise.all(
        goalTasks.map(async (task) => {
          try {
            const completions = await tasksApi.getMonthCompletions(task.id, year, monthNum);
            setMonthCompletions(prev => ({
              ...prev,
              [`${task.id}-${year}-${monthNum}`]: completions,
            }));
          } catch (error) {
            console.error(`Failed to fetch completions for task ${task.id}:`, error);
          }
        })
      ).finally(() => {
        setLoadingMonths(prev => {
          const newSet = new Set(prev);
          newSet.delete(monthKey);
          return newSet;
        });
      });
    });
  }, [tasks, goal.id]);

  return (
    <div className="mb-6">
      <style>{`
        @keyframes moveToTop {
          0% {
            transform: translateY(300px);
          }
          100% {
            transform: translateY(0);
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
        .global-celebration {
          position: fixed;
          top: 10%;
          left: 50%;
          z-index: 9999;
          animation: moveToTop 0.8s ease-out forwards, globalCelebrate 4s ease-out forwards;
          pointer-events: none;
        }
        .celebration-character {
          font-size: 5rem;
        }
      `}</style>

      {/* Global Celebration */}
      {globalCelebration && (
        <div className="global-celebration">
          <div className="celebration-character">
            🎉
          </div>
        </div>
      )}

      {/* Goal Header */}
      <div className="bg-[#DCDCDC] border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={onToggle}
              className="text-[#805232] hover:text-[#805232] flex-shrink-0"
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            <div className="flex-shrink-0">
              <h3 className="text-sm font-bold text-[#805232]">{goal.title}</h3>
              <p className="text-xs text-[#805232]">{goal.area}</p>
            </div>

            {goal.unit === 'Kilogram' && goal.weightGoal ? (
              // Weight goal - show start and target weight
              (() => {
                // Get the latest non-zero current weight from monthly goals (from all months, not just past)
                let currentWeightDisplay = goal.weightGoal.currentWeight;
                if (goalMonthlyGoals.length > 0) {
                  // Find the most recent month with non-zero currentProgress
                  for (let i = goalMonthlyGoals.length - 1; i >= 0; i--) {
                    const progress = Number(goalMonthlyGoals[i].currentProgress);
                    if (progress !== 0) {
                      currentWeightDisplay = progress;
                      break;
                    }
                  }
                }
                
                const progressPercent = Math.min(Math.max(
                  ((goal.weightGoal.startWeight - currentWeightDisplay) / (goal.weightGoal.startWeight - goal.weightGoal.targetWeight)) * 100, 
                  0
                ), 100);
                
                return (
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-xs font-semibold text-[#805232]">
                      {goal.weightGoal.startWeight}kg
                    </span>
                    <span className="text-xs font-semibold text-[#805232]">
                      →
                    </span>
                    <span className="text-xs font-semibold text-[#805232]">
                      {goal.weightGoal.targetWeight}kg
                    </span>
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden w-24">
                      <div
                        className="h-full bg-cyan-500 transition-all duration-300"
                        style={{
                          width: `${progressPercent}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#805232]">
                      {currentWeightDisplay}kg
                    </span>
                  </div>
                );
              })()
            ) : (
              // Other goals - show progress bar
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden w-24">
                  <div
                    className={`h-full transition-all duration-300 ${
                      goal.progress >= 100 ? 'bg-green-500' :
                      goal.progress >= 70 ? 'bg-green-500' :
                      goal.progress >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{
                      width: `${Math.min(goal.progress, 100)}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#805232] flex-shrink-0">
                  {goal.progress}%
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-shrink-0">
            {onAddTask && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddTask(goal.id);
                }}
                className="p-1 text-[#805232] hover:text-[#805232] transition-colors"
                title="Add task"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
            {onGenerateMonthlyGoals && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerateMonthlyGoals(goal.id);
                }}
                className="p-1 text-[#805232] hover:text-[#805232] transition-colors"
                title="Generate monthly goals"
              >
                <Calendar className="w-4 h-4" />
              </button>
            )}
            {onEditGoal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditGoal(goal.id);
                }}
                className="p-1 text-[#805232] hover:text-[#805232] transition-colors"
                title="Edit goal"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onDeleteGoal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteGoal(goal.id);
                }}
                className="p-1 text-[#805232] hover:text-[#805232] transition-colors"
                title="Delete goal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Tiles Grid (Expanded) */}
      {isExpanded && (
        <div className="space-y-1">
          {/* Navigation */}
          <div className="flex items-center justify-between px-2 py-0 h-4">
            <button
              onClick={() => setMonthOffset(Math.max(0, monthOffset - 6))}
              disabled={!canGoBack}
              className="p-0 text-[#805232] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMonthOffset(monthOffset + 6)}
              disabled={!canGoForward}
              className="p-0 text-[#805232] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tiles Grid */}
          <div className="grid grid-cols-6 gap-3">
            {visibleMonths.map((mg) => {
              const monthName = new Date(typeof mg.monthDate === 'string' ? mg.monthDate : mg.monthDate.toString()).toLocaleDateString('en-US', { month: 'short' });
              
              let progressPercent = 0;
              let displayText = '';
              
              if (goal.unit === 'Kilogram' && goal.weightGoal) {
                // For weight goals: show parent start weight → monthly target weight
                const currentWeight = Number(mg.currentProgress);
                const targetWeight = Number(mg.target);
                // If current weight is 0 or equals start weight, treat as not started (0%)
                const isNotStarted = currentWeight === 0 || currentWeight === goal.weightGoal.startWeight;
                const weightLost = isNotStarted ? 0 : Math.abs(goal.weightGoal.startWeight - currentWeight);
                const totalWeightToLose = Math.abs(goal.weightGoal.startWeight - goal.weightGoal.targetWeight);
                progressPercent = totalWeightToLose > 0 ? Math.round((weightLost / totalWeightToLose) * 100) : 0;
                displayText = `${formatProgressValue(goal.weightGoal.startWeight)} → ${formatProgressValue(targetWeight)}kg`;
              } else if (goal.unit === 'Count') {
                // For count goals (including book goals): calculate cumulative progress from all months up to this one
                let yearlyTarget = goal.countGoal?.targetCount || goal.bookGoal?.targetBooks;
                
                // If yearlyTarget is not available, calculate from sum of all monthly targets
                if (!yearlyTarget) {
                  yearlyTarget = goalMonthlyGoals.reduce((sum, m) => sum + Number(m.target), 0);
                }
                
                let cumulativeProgress = 0;
                // Find the actual index of this month in goalMonthlyGoals
                const actualIndex = goalMonthlyGoals.findIndex(m => m.id === mg.id);
                // Sum up all progress from the beginning up to this month (including this month)
                if (actualIndex >= 0) {
                  for (let i = 0; i <= actualIndex; i++) {
                    cumulativeProgress += Number(goalMonthlyGoals[i].currentProgress);
                  }
                }
                progressPercent = yearlyTarget > 0 ? Math.round((cumulativeProgress / yearlyTarget) * 100) : 0;
                displayText = `${formatProgressValue(cumulativeProgress)} / ${formatProgressValue(yearlyTarget)}`;
              } else {
                // For other goals: currentProgress / target
                progressPercent = Number(mg.target) > 0 ? Math.round((Number(mg.currentProgress) / Number(mg.target)) * 100) : 0;
                displayText = `${formatProgressValue(mg.currentProgress)} / ${formatProgressValue(mg.target)}`;
              }

              const getBarColor = () => {
                // If no progress, show white (not started)
                if (progressPercent === 0) {
                  return 'bg-white';
                }
                // For weight goals, check against monthly target weight
                if (goal.unit === 'Kilogram' && goal.weightGoal) {
                  const currentWeight = Number(mg.currentProgress);
                  const targetWeight = Number(mg.target);
                  // For weight loss, current should be <= target (i.e., lower weight is better)
                  if (currentWeight <= targetWeight) {
                    return 'bg-green-500';
                  } else {
                    return 'bg-red-500';
                  }
                }
                // For count goals (including book goals), check against monthly target
                if (goal.unit === 'Count') {
                  const monthlyProgress = Number(mg.currentProgress);
                  const monthlyTarget = Number(mg.target);
                  if (monthlyProgress >= monthlyTarget) {
                    return 'bg-green-500';
                  } else {
                    return 'bg-red-500';
                  }
                }
                // For other goals, use color based on progress
                if (progressPercent >= 100) return 'bg-green-500';
                if (progressPercent >= 70) return 'bg-green-500';
                if (progressPercent >= 50) return 'bg-yellow-500';
                return 'bg-red-500';
              };

              const isCompleted = progressPercent >= 100;

              const getIncrement = () => {
                if (goal.unit === 'Kilogram') return 0.1;
                if (goal.unit === 'Count') return 1;
                return 0.1;
              };

              const handleValueSave = async (newVal: string) => {
                const newValue = Math.round(parseFloat(newVal) * 100) / 100;
                if (isNaN(newValue)) return;
                
                const currentVal = Number(mg.currentProgress);
                const wasNotCompleted = currentVal < Number(mg.target);
                const isNowCompleted = newValue >= Number(mg.target);
                
                try {
                  await onUpdateProgress(mg.id, newValue);
                  
                  if (wasNotCompleted && isNowCompleted) {
                    triggerCelebration(mg.id);
                  }
                } catch (error) {
                  console.error('Failed to update value:', error);
                }
              };

              return (
                <div
                  key={mg.id}
                  data-month-id={mg.id}
                  className="bg-white rounded-lg border-2 border-gray-300 p-4 hover:shadow-md transition-all flex flex-col items-center justify-center relative"
                >
                  {/* Header: Month Name */}
                  <div className="w-full text-center mb-3">
                    <div className="text-xs font-bold text-gray-600">
                      {monthName}
                    </div>
                  </div>

                  {/* Value Input */}
                  <div className="mb-2">
                    {editingId === mg.id ? (
                      <input
                        type="number"
                        step={goal.unit === 'Kilogram' ? "0.1" : "1"}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => {
                          handleValueSave(editValue);
                          setEditingId(null);
                          setEditValue('');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleValueSave(editValue);
                            setEditingId(null);
                            setEditValue('');
                          } else if (e.key === 'Escape') {
                            handleEditCancel();
                          }
                        }}
                        className="text-3xl font-bold text-amber-900 w-16 text-center border-2 border-amber-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-900 px-2 py-1"
                        placeholder="0"
                        autoFocus
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEditStart(mg)}
                        className="text-3xl font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer"
                      >
                        {formatProgressValue(Number(mg.currentProgress))}
                      </button>
                    )}
                  </div>

                  {/* Target Label */}
                  <div className="text-xs text-gray-600 font-medium text-center">
                    {formatProgressValue(Number(mg.target))}{goal.unit === 'Kilogram' ? 'kg' : ''}
                  </div>

                  {/* Progress Icon - Bottom Right with Click Dialog */}
                  <div className="absolute bottom-3 right-3">
                    <button
                      className="p-1 text-gray-600 hover:text-[#805232] transition-colors flex-shrink-0"
                      title="View task progress"
                      onClick={() => setSelectedIconMonthId(selectedIconMonthId === mg.id ? null : mg.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Show dialog on click of this specific month tile - centered on page */}
                  {selectedIconMonthId === mg.id && (
                    <div 
                      className="fixed z-50 inset-0 flex items-center justify-center pointer-events-none" 
                      style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                      onClick={() => setSelectedIconMonthId(null)}
                    >
                      <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                      {/* Dialog appears on icon hover */}
                      {(() => {
                        const taskSummaries = getMonthlyTaskProgress(mg.monthDate);
                        return (
                          <div className="bg-white rounded-lg w-80 shadow-2xl border border-gray-200 pointer-events-auto max-h-96 overflow-y-auto flex flex-col">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0 flex items-start justify-between">
                              <div>
                                <h2 className="text-lg font-bold text-[#805232]">Tasks for {monthName}</h2>
                                <p className="text-xs text-gray-600 mt-1">Progress: {mg.currentProgress} / {mg.target}</p>
                              </div>
                              <button
                                onClick={() => setSelectedIconMonthId(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Content */}
                            <div className="px-4 py-3 flex-1 overflow-y-auto">
                            
                            {taskSummaries.length > 0 ? (
                              <div className="space-y-4">
                                {taskSummaries.map((task, idx) => {
                                  const monthDate = new Date(mg.monthDate);
                                  const year = monthDate.getFullYear();
                                  const monthNum = monthDate.getMonth() + 1;
                                  const completionData = monthCompletions[`${task.id}-${year}-${monthNum}`] || { totalValue: 0, daysWithActivity: 0, target: 1 };
                                  const totalValue = Number(completionData.totalValue || 0);
                                  const monthlyTarget = Number(completionData.target || 1);
                                  let progress = 0;
                                  let progressText = '';
                                  
                                  progress = monthlyTarget > 0 ? Math.round((totalValue / monthlyTarget) * 100) : 0;
                                  progressText = `${progress}%`;
                                  
                                  const isLoading = loadingMonths.has(`${new Date(mg.monthDate).getFullYear()}-${new Date(mg.monthDate).getMonth() + 1}`);
                                  
                                  return (
                                    <div key={idx} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                                      <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-amber-900">{task.title}</h3>
                                        <span className="text-xs font-bold text-amber-900">
                                          {isLoading ? '...' : `${progress}%`}
                                        </span>
                                      </div>
                                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                                        <div
                                          className="h-full bg-amber-900 transition-all duration-300"
                                          style={{ width: `${Math.min(progress, 100)}%` }}
                                        />
                                      </div>
                                      <p className="text-xs text-gray-600">
                                        {isLoading ? 'Loading...' : progressText}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-gray-600">No tasks</p>
                            )}
                            </div>
                          </div>
                        );
                      })()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
