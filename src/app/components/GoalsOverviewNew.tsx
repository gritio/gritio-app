import { useState } from 'react';
import { Goal, MonthlyGoal, Task } from '../types';
import { Target, Plus, Trash2, Edit, X } from 'lucide-react';
import { CollapsibleGoalRow } from './CollapsibleGoalRow';
import { AddTaskPanel } from './AddTaskPanel';
import { GenerateMonthlyGoalsPanel } from './GenerateMonthlyGoalsPanel';
import { monthlyGoalsApi, goalsApi } from '../services/api';

interface GoalsOverviewNewProps {
  goals: Goal[];
  monthlyGoals: MonthlyGoal[];
  tasks: Task[];
  onSelectGoal: (goalId: string) => void;
  onAddMonthlyGoal: (goalId: string) => void;
  onAddTask: (goalId: string) => void;
  onEditGoal?: (goalId: string) => void;
  onEditMonthlyGoal?: (monthlyGoalId: string) => void;
  onUpdateGoal?: (updatedGoal: Goal) => void;
  onDeleteGoal?: (goalId: string) => void;
  onRefreshGoals?: () => void;
}

export function GoalsOverviewNew({
  goals,
  monthlyGoals,
  tasks,
  onSelectGoal,
  onAddMonthlyGoal,
  onAddTask,
  onEditGoal,
  onEditMonthlyGoal,
  onUpdateGoal,
  onDeleteGoal,
  onRefreshGoals,
}: GoalsOverviewNewProps) {
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());
  const [deleteConfirmGoalId, setDeleteConfirmGoalId] = useState<string | null>(null);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [isAddTaskPanelOpen, setIsAddTaskPanelOpen] = useState(false);
  const [selectedGoalForTask, setSelectedGoalForTask] = useState<Goal | null>(null);
  const [isGenerateMonthlyGoalsPanelOpen, setIsGenerateMonthlyGoalsPanelOpen] = useState(false);
  const [selectedGoalForGeneration, setSelectedGoalForGeneration] = useState<Goal | null>(null);
  const [localMonthlyGoals, setLocalMonthlyGoals] = useState(monthlyGoals);
  const [localGoals, setLocalGoals] = useState(goals);

  const toggleGoal = (goalId: string) => {
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
      setIsUpdatingProgress(true);
      console.log('Updating monthly goal:', monthlyGoalId, 'to', newProgress);
      const updateData = {
        currentProgress: Number(newProgress),
      };
      const result = await monthlyGoalsApi.updateMonthlyGoal(monthlyGoalId, updateData);
      console.log('Update response:', result);
      
      // Update the local monthly goals state
      const updatedMonthlyGoals = localMonthlyGoals.map(mg => 
        mg.id === monthlyGoalId 
          ? { ...mg, currentProgress: Number(newProgress) }
          : mg
      );
      setLocalMonthlyGoals(updatedMonthlyGoals);
      
      // Recalculate parent goal progress
      const updatedGoal = updatedMonthlyGoals.find(mg => mg.id === monthlyGoalId);
      if (updatedGoal) {
        const goalId = updatedGoal.goalId;
        const goalMonthlyGoals = updatedMonthlyGoals.filter(mg => mg.goalId === goalId);
        
        // Calculate average progress across all months
        const totalProgress = goalMonthlyGoals.reduce((sum, mg) => {
          const monthProgress = mg.target > 0 
            ? (Number(mg.currentProgress) / Number(mg.target)) * 100 
            : 0;
          return sum + monthProgress;
        }, 0);
        const avgProgress = Math.round(totalProgress / goalMonthlyGoals.length);
        
        // Update the parent goal
        const updatedGoals = localGoals.map(g => 
          g.id === goalId 
            ? { ...g, progress: avgProgress }
            : g
        );
        setLocalGoals(updatedGoals);
      }
    } catch (error: any) {
      console.error('Failed to update progress:', error);
      console.error('Error details:', error?.response?.data || error?.message || error);
      alert('Failed to update progress: ' + (error?.response?.data?.message || error?.message || 'Unknown error'));
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  const handleOpenAddTaskPanel = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setSelectedGoalForTask(goal);
      setIsAddTaskPanelOpen(true);
    }
  };

  const handleSaveTask = async (newTask: any) => {
    try {
      console.log('Task created:', newTask);
      setIsAddTaskPanelOpen(false);
      setSelectedGoalForTask(null);
      if (onRefreshGoals) onRefreshGoals();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleOpenGenerateMonthlyGoalsPanel = (goalId: string) => {
    const goal = localGoals.find(g => g.id === goalId);
    if (goal) {
      setSelectedGoalForGeneration(goal);
      setIsGenerateMonthlyGoalsPanelOpen(true);
    }
  };

  const handleGenerateMonthlyGoals = async (strategy: string, startValue?: number) => {
    if (!selectedGoalForGeneration) return;

    try {
      const payload: any = {
        autoCreateMonthly: true,
        distributionStrategy: strategy,
      };

      if (startValue !== undefined) {
        payload.startValue = startValue;
      }

      await goalsApi.updateGoal(selectedGoalForGeneration.id, payload);
      
      setIsGenerateMonthlyGoalsPanelOpen(false);
      setSelectedGoalForGeneration(null);
      
      if (onRefreshGoals) onRefreshGoals();
    } catch (error: any) {
      console.error('Failed to generate monthly goals:', error);
      throw error;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="mb-2 text-[#805232]">Goals Overview</h1>
      </div>

      {/* Stats Summary */}
      <div className="bg-[#DCDCDC] border border-gray-400 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-[#DCDCDC] border border-[#805232] p-3 rounded-lg">
              <Target className="w-6 h-6 text-[#805232]" />
            </div>
            <div>
              <div className="text-[#805232] text-sm">Total Goals</div>
              <div className="text-2xl text-[#805232]">{localGoals.length}</div>
            </div>
          </div>

          <div className="w-px h-16 bg-gray-400"></div>

          <div className="flex items-center gap-3 flex-1">
            <div className="bg-[#DCDCDC] border border-[#805232] p-3 rounded-lg">
              <Target className="w-6 h-6 text-[#805232]" />
            </div>
            <div>
              <div className="text-[#805232] text-sm">On Track</div>
              <div className="text-2xl text-[#805232]">
                {localGoals.filter(g => g.status === 'on-track' || g.status === 'ahead').length}
              </div>
            </div>
          </div>

          <div className="w-px h-16 bg-gray-400"></div>

          <div className="flex items-center gap-3 flex-1">
            <div className="bg-[#DCDCDC] border border-[#805232] p-3 rounded-lg">
              <Target className="w-6 h-6 text-[#805232]" />
            </div>
            <div>
              <div className="text-[#805232] text-sm">Avg. Progress</div>
              <div className="text-2xl text-[#805232]">
                {localGoals.length > 0 ? Math.round(localGoals.reduce((sum, g) => sum + g.progress, 0) / localGoals.length) : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {localGoals.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-[#DCDCDC] border-2 border-dashed border-gray-200 rounded-lg p-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-[#805232]" />
            <h3 className="mb-2 text-[#805232]">No Goals Yet</h3>
            <p className="text-[#805232] mb-6">Get started by creating your first yearly goal</p>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="space-y-2">
        {localGoals.map(goal => (
          <CollapsibleGoalRow
            key={goal.id}
            goal={goal}
            monthlyGoals={localMonthlyGoals}
            isExpanded={expandedGoals.has(goal.id)}
            onToggle={() => toggleGoal(goal.id)}
            onEditMonthlyGoal={onEditMonthlyGoal || (() => {})}
            onUpdateProgress={handleUpdateMonthlyProgress}
            onEditGoal={onEditGoal}
            onDeleteGoal={(goalId) => setDeleteConfirmGoalId(goalId)}
            onAddTask={handleOpenAddTaskPanel}
            onGenerateMonthlyGoals={handleOpenGenerateMonthlyGoalsPanel}
            tasks={tasks}
          />
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
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
              Are you sure you want to delete "{localGoals.find(g => g.id === deleteConfirmGoalId)?.title}"? This action cannot be undone.
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

      {/* Add Task Panel */}
      {selectedGoalForTask && (
        <AddTaskPanel
          isOpen={isAddTaskPanelOpen}
          onClose={() => {
            setIsAddTaskPanelOpen(false);
            setSelectedGoalForTask(null);
          }}
          goalId={selectedGoalForTask.id}
          goalTitle={selectedGoalForTask.title}
          onSave={handleSaveTask}
        />
      )}

      {/* Generate Monthly Goals Panel */}
      {selectedGoalForGeneration && (
        <GenerateMonthlyGoalsPanel
          goal={selectedGoalForGeneration}
          isOpen={isGenerateMonthlyGoalsPanelOpen}
          onClose={() => {
            setIsGenerateMonthlyGoalsPanelOpen(false);
            setSelectedGoalForGeneration(null);
          }}
          onGenerate={handleGenerateMonthlyGoals}
        />
      )}
    </div>
  );
}
