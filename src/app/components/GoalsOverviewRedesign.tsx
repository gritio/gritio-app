import { useState } from 'react';
import { Goal, MonthlyGoal, Task } from '../types';
import { CollapsibleGoalRow } from './CollapsibleGoalRow';
import { AddTaskPanel } from './AddTaskPanel';
import { monthlyGoalsApi, tasksApi } from '../services/api';

interface GoalsOverviewRedesignProps {
  goals: Goal[];
  monthlyGoals: MonthlyGoal[];
  tasks: Task[];
  onRefreshGoals: () => void;
}

export function GoalsOverviewRedesign({
  goals,
  monthlyGoals,
  onRefreshGoals,
}: GoalsOverviewRedesignProps) {
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedMonthlyGoalForTask, setSelectedMonthlyGoalForTask] = useState<MonthlyGoal | null>(null);

  const toggleGoalExpansion = (goalId: string) => {
    const newExpanded = new Set(expandedGoals);
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId);
    } else {
      newExpanded.add(goalId);
    }
    setExpandedGoals(newExpanded);
  };

  const handleUpdateMonthlyProgress = async (monthlyGoalId: string, newProgress: number | string) => {
    try {
      const updateData = { currentProgress: Number(newProgress) };
      await monthlyGoalsApi.updateMonthlyGoal(monthlyGoalId, updateData);
      if (onRefreshGoals) onRefreshGoals();
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const getMonthlyGoalsForGoal = (goalId: string): MonthlyGoal[] => {
    return monthlyGoals.filter(mg => mg.goalId === goalId);
  };

  const handleOpenAddTaskModal = (monthlyGoal: MonthlyGoal) => {
    setSelectedMonthlyGoalForTask(monthlyGoal);
    setIsAddTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: any) => {
    console.log('Task created:', taskData);
    setIsAddTaskModalOpen(false);
    setSelectedMonthlyGoalForTask(null);
    onRefreshGoals();
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-[#805232]">Goals Overview Redesign</h1>
          <p className="text-sm text-gray-600 mt-2">Click on a month to view and manage tasks</p>
        </div>

        {/* Goals List */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="space-y-6">
            {goals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No goals yet. Create one to get started!</p>
              </div>
            ) : (
              goals.map(goal => (
                <CollapsibleGoalRow
                  key={goal.id}
                  goal={goal}
                  monthlyGoals={getMonthlyGoalsForGoal(goal.id)}
                  isExpanded={expandedGoals.has(goal.id)}
                  onToggle={() => toggleGoalExpansion(goal.id)}
                  onEditMonthlyGoal={() => {}}
                  onUpdateProgress={handleUpdateMonthlyProgress}
                  onAddTask={handleOpenAddTaskModal}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Task Panel */}
      <AddTaskPanel
        isOpen={isAddTaskModalOpen}
        onClose={() => {
          setIsAddTaskModalOpen(false);
          setSelectedMonthlyGoalForTask(null);
        }}
        monthlyGoal={selectedMonthlyGoalForTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}
