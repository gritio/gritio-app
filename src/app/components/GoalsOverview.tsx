import { useState } from 'react';
import { Goal, MonthlyGoal, Task } from '../types';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { WeightProgressModal } from './WeightProgressModal';
import { formatTaskValue, calculateTaskCompletionToday, getTaskStatus } from '../utils/calculations';
import { Target, TrendingUp, Calendar, ChevronDown, ChevronRight, Clock, Plus, Edit, Trash2, X } from 'lucide-react';

interface GoalsOverviewProps {
  goals: Goal[];
  monthlyGoals: MonthlyGoal[];
  tasks: Task[];
  onSelectGoal: (goalId: string) => void;
  onAddMonthlyGoal: (goalId: string) => void;
  onAddTask: (monthlyGoalId: string) => void;
  onEditGoal?: (goalId: string) => void;
  onEditMonthlyGoal?: (monthlyGoalId: string) => void;
  onUpdateGoal?: (updatedGoal: Goal) => void;
  onDeleteGoal?: (goalId: string) => void;
}

export function GoalsOverview({ goals, monthlyGoals, tasks, onSelectGoal, onAddMonthlyGoal, onAddTask, onEditGoal, onEditMonthlyGoal, onUpdateGoal, onDeleteGoal }: GoalsOverviewProps) {
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [weightUpdateGoalId, setWeightUpdateGoalId] = useState<string | null>(null);
  const [deleteConfirmGoalId, setDeleteConfirmGoalId] = useState<string | null>(null);
  
  const getTargetValue = (goal: Goal): number => {
    if (goal.unit === 'Count' && goal.countGoal) {
      return goal.countGoal.targetCount;
    }
    if (goal.unit === 'Time' && goal.timeGoal) {
      return goal.timeGoal.targetHours;
    }
    return 0;
  };
  
  const formatProgressValue = (value: number | string): string => {
    const num = Number(value);
    if (num === 0 || num === 1 || Number.isInteger(num)) {
      return Math.round(num).toString();
    }
    return num.toFixed(2);
  };
  
  // Group goals by area
  const groupedGoals = goals.reduce((acc, goal) => {
    if (!acc[goal.area]) {
      acc[goal.area] = [];
    }
    acc[goal.area].push(goal);
    return acc;
  }, {} as Record<string, Goal[]>);
  
  const toggleGoal = (goalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedGoals);
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId);
    } else {
      newExpanded.add(goalId);
    }
    setExpandedGoals(newExpanded);
  };
  
  const toggleMonth = (monthlyGoalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthlyGoalId)) {
      newExpanded.delete(monthlyGoalId);
    } else {
      newExpanded.add(monthlyGoalId);
    }
    setExpandedMonths(newExpanded);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="mb-2 text-[#805232]">Goals Overview</h1>
      </div>
      
      {/* Stats Summary */}
      <div className="bg-[#DCDCDC] border border-gray-400 rounded-lg p-6 mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-[#DCDCDC] border border-[#805232] p-3 rounded-lg">
              <Target className="w-6 h-6 text-[#805232]" />
            </div>
            <div>
              <div className="text-[#805232] text-sm">Total Goals</div>
              <div className="text-2xl text-[#805232]">{goals.length}</div>
            </div>
          </div>
          
          <div className="w-px h-16 bg-gray-400"></div>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-[#DCDCDC] border border-[#805232] p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#805232]" />
            </div>
            <div>
              <div className="text-[#805232] text-sm">On Track</div>
              <div className="text-2xl text-[#805232]">
                {goals.filter(g => g.status === 'on-track' || g.status === 'ahead').length}
              </div>
            </div>
          </div>
          
          <div className="w-px h-16 bg-gray-400"></div>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-[#DCDCDC] border border-[#805232] p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-[#805232]" />
            </div>
            <div>
              <div className="text-[#805232] text-sm">Avg. Progress</div>
              <div className="text-2xl text-[#805232]">
                {goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Empty State */}
      {goals.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-[#DCDCDC] border-2 border-dashed border-gray-200 rounded-lg p-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-[#805232]" />
            <h3 className="mb-2 text-[#805232]">No Goals Yet</h3>
            <p className="text-[#805232] mb-6">Get started by creating your first yearly goal</p>
            <p className="text-sm text-[#805232]">Click the "+ Add Goal" button below to begin</p>
          </div>
        </div>
      )}
      
      {/* Goals Grid */}
      <div className="grid grid-cols-1 gap-3">
        {goals.map(goal => {
              const isGoalExpanded = expandedGoals.has(goal.id);
              const goalMonthlyGoals = monthlyGoals
                .filter(mg => mg.goalId === goal.id)
                .sort((a, b) => {
                  const dateA = typeof a.monthDate === 'string' ? new Date(a.monthDate).getTime() : a.monthDate.getTime();
                  const dateB = typeof b.monthDate === 'string' ? new Date(b.monthDate).getTime() : b.monthDate.getTime();
                  return dateA - dateB;
                });
              
              return (
                <div 
                  key={goal.id}
                  className="bg-[#DCDCDC] border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1"
                >
                  {/* Goal Header */}
                  <div className="p-4 flex items-center justify-between gap-4">
                    {/* Expand/Collapse Icon */}
                    <button 
                      onClick={(e) => toggleGoal(goal.id, e)}
                      className="text-[#805232] hover:text-[#805232] flex-shrink-0"
                    >
                      {isGoalExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    
                    {/* Goal Title */}
                    <div className="flex-1 flex items-center gap-3">
                      <h3 className="text-sm font-bold text-[#805232] cursor-pointer hover:text-[#805232] transition-colors">{goal.title}</h3>
                    </div>
                    
                    {/* Progress Tiles/Slider on Right */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {goal.unit === 'Kilogram' && goal.weightGoal ? (
                        /* Weight Goal - Progress Bar Slider */
                        <div className="border border-gray-400 rounded-lg p-2 w-max bg-[#DCDCDC]">
                          <div className="flex items-center gap-2">
                            {/* Start Weight */}
                            <span className="text-xs font-semibold text-[#805232]">{goal.weightGoal.startWeight}kg</span>
                            
                            {/* Slider Container */}
                            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden hover:bg-gray-300 transition-colors cursor-pointer w-32">
                              <div
                                className={`h-full rounded-full transition-all duration-500 bg-cyan-500`}
                                style={{ 
                                  width: `${Math.min(Math.max(((goal.weightGoal.startWeight - goal.weightGoal.currentWeight) / (goal.weightGoal.startWeight - goal.weightGoal.targetWeight)) * 100, 0), 100)}%` 
                                }}
                              />
                              <input
                                type="range"
                                min={goal.weightGoal.targetWeight}
                                max={goal.weightGoal.startWeight}
                                value={goal.weightGoal.currentWeight}
                                onChange={(e) => {
                                  const newWeight = parseFloat(e.target.value) || goal.weightGoal.currentWeight;
                                  const updatedGoal = {
                                    ...goal,
                                    weightGoal: {
                                      ...goal.weightGoal,
                                      currentWeight: newWeight
                                    }
                                  };
                                  if (onUpdateGoal) {
                                    onUpdateGoal(updatedGoal);
                                  }
                                }}
                                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                              />
                            </div>
                            
                            {/* Target Weight */}
                            <span className="text-xs font-semibold text-[#805232]">{goal.weightGoal.targetWeight}kg</span>
                            
                            {/* Current Weight Input */}
                            <input
                              type="number"
                              step="0.1"
                              value={goal.weightGoal.currentWeight}
                              onChange={(e) => {
                                const newWeight = parseFloat(e.target.value) || goal.weightGoal.currentWeight;
                                const updatedGoal = {
                                  ...goal,
                                  weightGoal: {
                                    ...goal.weightGoal,
                                    currentWeight: newWeight
                                  }
                                };
                                if (onUpdateGoal) {
                                  onUpdateGoal(updatedGoal);
                                }
                              }}
                              className="w-14 px-1.5 py-0.5 text-xs border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="kg"
                            />
                          </div>
                        </div>
                      ) : goal.unit === 'Time' ? (
                        /* Time Goals - Coming Soon */
                        <div className="border border-gray-400 rounded-lg p-2 w-max bg-[#DCDCDC]">
                          <span className="text-xs font-semibold text-[#805232] px-2 py-1">
                            Time tracking coming soon
                          </span>
                        </div>
                      ) : (
                        /* Count Goals - Tiles */
                        <div className="border border-gray-400 rounded-lg p-2 w-max bg-[#DCDCDC]">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5 flex-wrap items-center">
                              {Array.from({ length: getTargetValue(goal) }).map((_, index) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    const newProgress = index < goal.progress ? index : index + 1;
                                    const updatedGoal = { ...goal, progress: newProgress };
                                    if (onUpdateGoal) {
                                      onUpdateGoal(updatedGoal);
                                    }
                                  }}
                                  className={`w-1.5 h-4 rounded cursor-pointer transition-all ${
                                    index < goal.progress ? 'bg-green-500' : 'bg-gray-300'
                                  }`}
                                  title={`${index + 1} / ${getTargetValue(goal)}`}
                                />
                              ))}
                            </div>
                            <div className="flex items-center gap-1 whitespace-nowrap">
                              <input
                                type="number"
                                min="0"
                                max={getTargetValue(goal)}
                                value={goal.progress}
                                onChange={(e) => {
                                  const newProgress = Math.min(Math.max(parseInt(e.target.value) || 0, 0), getTargetValue(goal));
                                  const updatedGoal = { ...goal, progress: newProgress };
                                  if (onUpdateGoal) {
                                    onUpdateGoal(updatedGoal);
                                  }
                                }}
                                className="w-10 px-2 py-1 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              <span className="text-xs font-semibold text-[#805232]">
                                /{getTargetValue(goal)}
                              </span>
                            </div>
                          </div>
                        </div>
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
                            setDeleteConfirmGoalId(goal.id);
                          }}
                          className="p-1 text-[#805232] hover:text-[#805232] transition-colors"
                          title="Delete goal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded Content - Monthly Goals */}
                  {isGoalExpanded && (
                    <div className="border-t border-gray-200 bg-[#DCDCDC] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-[#805232]">
                          <Calendar className="w-5 h-5" />
                          <span className="font-medium">Monthly Goals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddMonthlyGoal(goal.id);
                            }}
                            className="px-3 py-1 text-sm bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Add Monthly Goal
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (goalMonthlyGoals.length > 0) {
                                onAddTask(goalMonthlyGoals[0].id);
                              }
                            }}
                            disabled={goalMonthlyGoals.length === 0}
                            className="px-3 py-1 text-sm bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-3 h-3" />
                            Add Task
                          </button>
                        </div>
                      </div>
                      
                      {goalMonthlyGoals.length === 0 && (
                        <div className="text-center py-8 bg-[#DCDCDC] border-2 border-dashed border-gray-200 rounded-lg">
                          <Calendar className="w-12 h-12 mx-auto mb-2 text-[#805232]" />
                          <p className="text-sm text-[#805232]">No monthly goals yet</p>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        {goalMonthlyGoals.map(monthlyGoal => {
                          const isMonthExpanded = expandedMonths.has(monthlyGoal.id);
                          const monthTasks = tasks.filter(t => t.monthlyGoalId === monthlyGoal.id);
                          const dailyTasks = monthTasks.filter(t => t.frequency === 'daily');
                          const weeklyTasks = monthTasks.filter(t => t.frequency === 'weekly');
                          
                          return (
                            <div key={monthlyGoal.id} className="bg-[#DCDCDC] rounded-lg overflow-hidden border border-gray-200">
                              {/* Monthly Goal Header */}
                              <div className="p-3 flex items-center justify-between gap-3">
                                {/* Expand/Collapse Icon */}
                                <button 
                                  onClick={(e) => toggleMonth(monthlyGoal.id, e)}
                                  className="text-[#805232] hover:text-[#805232] flex-shrink-0"
                                >
                                  {isMonthExpanded ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </button>
                                
                                {/* Monthly Goal Content */}
                                <div className="flex-1 flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-[#805232] cursor-pointer hover:text-[#805232] transition-colors">{monthlyGoal.title}</h4>
                                  <span className="text-xs text-[#805232]">({monthlyGoal.month})</span>
                                </div>
                                
                                {/* Status and Task Count */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <div className="flex items-center gap-1">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                          monthlyGoal.status === 'on-track' || monthlyGoal.status === 'ahead' ? 'bg-cyan-500' : 
                                          monthlyGoal.status === 'behind' ? 'bg-amber-500' : 
                                          'bg-cyan-500'
                                        }`}
                                        style={{ width: `${Math.min(Math.round((Number(monthlyGoal.currentProgress) / Number(monthlyGoal.target)) * 100), 100)}%` }}
                                      />
                                    </div>
                                    <span className="text-xs font-semibold text-[#805232] whitespace-nowrap">
                                      {formatProgressValue(monthlyGoal.currentProgress)} / {formatProgressValue(monthlyGoal.target)}
                                      {monthlyGoal.unit === 'Kilogram' && goal.weightGoal ? ` kg` : ''}
                                    </span>
                                  </div>
                                  <span className="text-xs text-[#805232]">{monthTasks.length}T</span>
                                  
                                  {/* Edit Button */}
                                  {onEditMonthlyGoal && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onEditMonthlyGoal(monthlyGoal.id);
                                      }}
                                      className="p-1 text-[#805232] hover:text-[#805232] transition-colors"
                                      title="Edit monthly goal"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              
                              {/* Expanded Content - Tasks */}
                              {isMonthExpanded && (
                                <div className="border-t border-gray-200 bg-[#DCDCDC] p-4">
                                  {monthTasks.length === 0 && (
                                    <div className="text-center py-4 bg-[#DCDCDC] border border-gray-200 rounded-lg">
                                      <Target className="w-6 h-6 mx-auto mb-1 text-[#805232]" />
                                      <p className="text-xs text-[#805232]">No tasks yet</p>
                                    </div>
                                  )}
                                  
                                  {/* Daily Tasks */}
                                  {dailyTasks.length > 0 && (
                                    <div className="mb-3">
                                      <div className="flex items-center gap-1 mb-2 text-xs text-[#805232] font-bold">
                                        <Clock className="w-3 h-3" />
                                        Daily Tasks
                                      </div>
                                      <div className="space-y-2">
                                        {dailyTasks.map(task => {
                                          const completion = calculateTaskCompletionToday(task);
                                          const status = getTaskStatus(completion);
                                          
                                          return (
                                            <div key={task.id} className="border-b border-gray-200 border-l-4 border-l-[#805232] pl-3 py-2 flex items-center justify-between gap-2">
                                              <div className="flex-1">
                                                <h5 className="text-xs font-bold text-[#805232] cursor-pointer hover:text-[#805232] transition-colors">{task.title}</h5>
                                                <div className="text-xs text-[#805232] mt-0.5">{formatTaskValue(task.currentProgress, task.unit)} / {formatTaskValue(task.target, task.unit)} {task.unit}</div>
                                              </div>
                                              <div className="flex items-center gap-2 flex-shrink-0">
                                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                  <div 
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                      completion >= 100 ? 'bg-green-500' : 
                                                      completion >= 70 ? 'bg-blue-500' : 
                                                      'bg-amber-500'
                                                    }`}
                                                    style={{ width: `${Math.min(completion, 100)}%` }}
                                                  />
                                                </div>
                                                <span className="text-xs text-[#805232]">{Math.round(completion)}%</span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Weekly Tasks */}
                                  {weeklyTasks.length > 0 && (
                                    <div>
                                      <div className="flex items-center gap-1 mb-2 text-xs text-[#805232] font-bold">
                                        <TrendingUp className="w-3 h-3" />
                                        Weekly Tasks
                                      </div>
                                      <div className="space-y-2">
                                        {weeklyTasks.map(task => {
                                          const completion = calculateTaskCompletionToday(task);
                                          const status = getTaskStatus(completion);
                                          
                                          return (
                                            <div key={task.id} className="border-b border-gray-200 border-l-4 border-l-[#805232] pl-3 py-2 flex items-center justify-between gap-2">
                                              <div className="flex-1">
                                                <h5 className="text-xs font-bold text-[#805232] cursor-pointer hover:text-[#805232] transition-colors">{task.title}</h5>
                                                <div className="text-xs text-[#805232] mt-0.5">{formatTaskValue(task.currentProgress, task.unit)} / {formatTaskValue(task.target, task.unit)} {task.unit}</div>
                                              </div>
                                              <div className="flex items-center gap-2 flex-shrink-0">
                                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                  <div 
                                                    className={`h-2 rounded-full transition-all duration-300 ${
                                                      completion >= 100 ? 'bg-green-500' : 
                                                      completion >= 70 ? 'bg-blue-500' : 
                                                      'bg-amber-500'
                                                    }`}
                                                    style={{ width: `${Math.min(completion, 100)}%` }}
                                                  />
                                                </div>
                                                <span className="text-xs text-[#805232]">{Math.round(completion)}%</span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
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
            })}
      </div>
      
      {/* Weight Update Modal */}
      {weightUpdateGoalId && (
        <WeightProgressModal
          isOpen={true}
          onClose={() => setWeightUpdateGoalId(null)}
          currentWeight={goals.find(g => g.id === weightUpdateGoalId)?.weightGoal?.currentWeight || 0}
          startWeight={goals.find(g => g.id === weightUpdateGoalId)?.weightGoal?.startWeight || 0}
          targetWeight={goals.find(g => g.id === weightUpdateGoalId)?.weightGoal?.targetWeight || 0}
          onUpdate={(newWeight) => {
            const goalToUpdate = goals.find(g => g.id === weightUpdateGoalId);
            if (goalToUpdate?.weightGoal) {
              const updatedGoal = {
                ...goalToUpdate,
                weightGoal: {
                  ...goalToUpdate.weightGoal,
                  currentWeight: newWeight
                }
              };
              setGoals(goals.map(g => g.id === weightUpdateGoalId ? updatedGoal : g));
            }
            setWeightUpdateGoalId(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <div className="bg-[#DCDCDC] border border-[#B8B9BA] rounded-lg p-6 max-w-sm mx-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#805232]">Delete Goal?</h3>
              <button
                onClick={() => setDeleteConfirmGoalId(null)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[#805232] mb-6">
              Are you sure you want to delete "{goals.find(g => g.id === deleteConfirmGoalId)?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  onDeleteGoal?.(deleteConfirmGoalId);
                  setDeleteConfirmGoalId(null);
                }}
                className="flex-1 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmGoalId(null)}
                className="flex-1 px-4 py-2 bg-[#DCDCDC] text-[#805232] rounded-lg hover:bg-[#DCDCDC] transition-colors font-medium border border-[#805232]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
