import { useState } from 'react';
import { Goal, Task, MonthlyGoal } from '../types';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { formatTaskValue, calculateTaskCompletionToday, getTaskStatus } from '../utils/calculations';
import { ArrowLeft, Clock, TrendingUp, Target, Calendar, ChevronDown, ChevronRight, Plus } from 'lucide-react';

interface GoalDetailProps {
  goal: Goal;
  monthlyGoals: MonthlyGoal[];
  tasks: Task[];
  onBack: () => void;
  onAddMonthlyGoal: () => void;
  onAddTask: (monthlyGoalId: string) => void;
}

export function GoalDetail({ goal, monthlyGoals, tasks, onBack, onAddMonthlyGoal, onAddTask }: GoalDetailProps) {
  const [isGoalExpanded, setIsGoalExpanded] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  
  const goalMonthlyGoals = monthlyGoals
    .filter(mg => mg.goalId === goal.id)
    .sort((a, b) => a.monthDate.getTime() - b.monthDate.getTime());
  
  const toggleMonth = (monthlyGoalId: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthlyGoalId)) {
      newExpanded.delete(monthlyGoalId);
    } else {
      newExpanded.add(monthlyGoalId);
    }
    setExpandedMonths(newExpanded);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#805232] hover:text-[#805232] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Overview
      </button>
      
      {/* Main Goal Expandable Tile */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
        {/* Goal Header - Clickable */}
        <div 
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsGoalExpanded(!isGoalExpanded)}
        >
          <div className="flex items-start gap-4">
            {/* Expand/Collapse Icon */}
            <button className="text-[#805232] hover:text-[#805232] mt-1">
              {isGoalExpanded ? (
                <ChevronDown className="w-6 h-6" />
              ) : (
                <ChevronRight className="w-6 h-6" />
              )}
            </button>
            
            {/* Goal Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="mb-2 text-[#805232]">{goal.title}</h1>
                  <p className="text-[#805232]">Yearly Target: {goal.yearlyMeasure}</p>
                </div>
                <StatusBadge status={goal.status} size="md" />
              </div>
              
              <div className="mb-4">
                <ProgressBar 
                  progress={goal.progress} 
                  status={goal.status}
                  showLabel={true}
                  height="lg"
                />
              </div>
              
              <div className="flex gap-6 text-sm text-[#805232]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {goal.startDate.toLocaleDateString()} - {goal.endDate.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {goalMonthlyGoals.length} Monthly Goals
                </div>
              </div>
              
              {goal.remarks && (
                <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-[#805232] italic">
                  {goal.remarks}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Expanded Content - Monthly Goals */}
        {isGoalExpanded && (
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-[#805232]">
                <Calendar className="w-5 h-5 text-[#805232]" />
                Monthly Goals
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddMonthlyGoal();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Monthly Goal
              </button>
            </div>
            
            {goalMonthlyGoals.length === 0 && (
              <div className="text-center py-12 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-[#805232]" />
                <h3 className="mb-2 text-[#805232]">No Monthly Goals Yet</h3>
                <p className="text-[#805232] mb-6">Break down your yearly goal into monthly targets</p>
                <p className="text-sm text-[#805232]">Click "Add Monthly Goal" above to get started</p>
              </div>
            )}
            
            <div className="space-y-3">
              {goalMonthlyGoals.map(monthlyGoal => {
                const isExpanded = expandedMonths.has(monthlyGoal.id);
                const monthTasks = tasks.filter(t => t.monthlyGoalId === monthlyGoal.id);
                const dailyTasks = monthTasks.filter(t => t.frequency === 'daily');
                const weeklyTasks = monthTasks.filter(t => t.frequency === 'weekly');
                
                return (
                  <div key={monthlyGoal.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {/* Monthly Goal Header */}
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleMonth(monthlyGoal.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <button className="text-[#805232] hover:text-[#805232]">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3>{monthlyGoal.title}</h3>
                              <span className="text-sm text-[#805232]">{monthlyGoal.month}</span>
                            </div>
                            <div className="text-xs text-[#805232] mb-2">
                              {Number(monthlyGoal.currentProgress).toFixed(2)} / {Number(monthlyGoal.target).toFixed(2)} {monthlyGoal.unit}
                            </div>
                            <ProgressBar 
                              progress={Math.round((Number(monthlyGoal.currentProgress) / Number(monthlyGoal.target)) * 100)} 
                              status={monthlyGoal.status}
                              showLabel={true}
                              height="sm"
                            />
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <StatusBadge status={monthlyGoal.status} size="sm" />
                            <div className="text-sm text-[#805232]">
                              {monthTasks.length} {monthTasks.length === 1 ? 'task' : 'tasks'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Content - Tasks */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-[#805232]">
                            Tasks for {monthlyGoal.month}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddTask(monthlyGoal.id);
                            }}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Add Task
                          </button>
                        </div>
                        
                        {monthTasks.length === 0 && (
                          <div className="text-center py-6 bg-white border border-gray-200 rounded-lg">
                            <Target className="w-8 h-8 mx-auto mb-2 text-[#805232]" />
                            <p className="text-sm text-[#805232]">No tasks yet for this month</p>
                          </div>
                        )}
                        
                        {/* Daily Tasks */}
                        {dailyTasks.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2 text-sm text-[#805232]">
                              <Clock className="w-4 h-4" />
                              Daily Tasks
                            </div>
                            <div className="space-y-2">
                              {dailyTasks.map(task => {
                                const completion = calculateTaskCompletionToday(task);
                                const status = getTaskStatus(completion);
                                
                                return (
                                  <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1">
                                        <h4 className="text-sm mb-1 text-[#805232]">{task.title}</h4>
                                        <div className="text-xs text-[#805232]">
                                          {formatTaskValue(task.currentProgress, task.unit)} / {formatTaskValue(task.target, task.unit)}
                                        </div>
                                      </div>
                                      <StatusBadge status={status} size="sm" />
                                    </div>
                                    <ProgressBar 
                                      progress={completion} 
                                      status={status}
                                      showLabel={false}
                                      height="sm"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* Weekly Tasks */}
                        {weeklyTasks.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2 text-sm text-[#805232]">
                              <TrendingUp className="w-4 h-4" />
                              Weekly Tasks
                            </div>
                            <div className="space-y-2">
                              {weeklyTasks.map(task => {
                                const completion = calculateTaskCompletionToday(task);
                                const status = getTaskStatus(completion);
                                
                                return (
                                  <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1">
                                        <h4 className="text-sm mb-1 text-[#805232]">{task.title}</h4>
                                        <div className="text-xs text-[#805232]">
                                          {formatTaskValue(task.currentProgress, task.unit)} / {formatTaskValue(task.target, task.unit)}
                                        </div>
                                      </div>
                                      <StatusBadge status={status} size="sm" />
                                    </div>
                                    <ProgressBar 
                                      progress={completion} 
                                      status={status}
                                      showLabel={false}
                                      height="sm"
                                    />
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
      
      {/* Annotations */}
      <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="mb-3 text-[#805232]">🔗 Hierarchical Structure</h3>
        <div className="space-y-2 text-sm text-[#805232]">
          <p>• <strong>Yearly Goal</strong> → broken down into <strong>Monthly Goals</strong></p>
          <p>• Each <strong>Monthly Goal</strong> has a specific target for that month</p>
          <p>• Under each monthly goal, you can add <strong>Daily or Weekly Tasks</strong></p>
          <p>• <strong>Progress calculation</strong>: Task → Monthly Goal → Yearly Goal</p>
          <p>• Click on a monthly goal to expand and view/add tasks</p>
        </div>
      </div>
    </div>
  );
}