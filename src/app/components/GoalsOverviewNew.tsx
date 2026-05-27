import { useState } from 'react';
import { Goal, MonthlyGoal, Task } from '../types';
import { Target, Trash2, Edit, X } from 'lucide-react';
import { CollapsibleGoalRow } from './CollapsibleGoalRow';
import { AddTaskPanel } from './AddTaskPanel';
import { GenerateMonthlyGoalsPanel } from './GenerateMonthlyGoalsPanel';
import { monthlyGoalsApi, goalsApi } from '../services/api';
import { COLORS } from '../constants/colors';

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
  isKidsMode?: boolean;
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
  isKidsMode,
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
      
      // Refresh goals to get updated status from backend
      if (onRefreshGoals) {
        await onRefreshGoals();
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

  const onTrackCount = localGoals.filter(g => g.status === 'ON_TRACK' || g.status === 'COMPLETED').length;
  const behindCount = localGoals.length - onTrackCount;
  const avgProgress = localGoals.length > 0 ? Math.round(localGoals.reduce((sum, g) => sum + g.progress, 0) / localGoals.length) : 0;

  // Calculate the month range for the summary
  const today = new Date();
  const startMonth = new Date(today.getFullYear(), 0, 1);
  const endMonth = today;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateRange = `${monthNames[startMonth.getMonth()]} – ${monthNames[endMonth.getMonth()]} ${endMonth.getFullYear()}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      {/* Header with title */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: isKidsMode ? COLORS.kidsGreen : COLORS.primary }}>Yearly goals</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Goals Total Card */}
        <div className={`rounded-lg p-4 ${isKidsMode ? 'bg-[#00FFFF] bg-opacity-20 border border-[#0099FF]' : 'bg-white border border-[#E8E8E8]'}`}>
          <p className={`text-xs font-semibold mb-2 ${isKidsMode ? 'text-[#00FF00]' : 'text-gray-600'}`}>Goals total</p>
          <p className={`text-2xl font-bold mb-1 ${isKidsMode ? 'text-[#00FF00]' : 'text-[#805232]'}`}>{localGoals.length}</p>
          <p className={`text-xs ${isKidsMode ? 'text-[#00FF00]' : 'text-gray-600'}`}>across 3 life goals</p>
        </div>

        {/* Avg Progress Card */}
        <div className={`rounded-lg p-4 ${isKidsMode ? 'bg-[#00FFFF] bg-opacity-20 border border-[#0099FF]' : 'bg-white border border-[#E8E8E8]'}`}>
          <p className={`text-xs font-semibold mb-2 ${isKidsMode ? 'text-[#00FF00]' : 'text-gray-600'}`}>Avg progress</p>
          <p className={`text-2xl font-bold mb-1 ${isKidsMode ? 'text-[#00FF00]' : 'text-[#805232]'}`}>{avgProgress}%</p>
          <p className={`text-xs ${isKidsMode ? 'text-[#00FF00]' : 'text-gray-600'}`}>{dateRange}</p>
        </div>

        {/* On Track Card */}
        <div className={`rounded-lg p-4 ${isKidsMode ? 'bg-[#00FFFF] bg-opacity-20 border border-[#0099FF]' : 'bg-white border border-[#E8E8E8]'}`}>
          <p className={`text-xs font-semibold mb-2 ${isKidsMode ? 'text-[#00FF00]' : 'text-gray-600'}`}>On track</p>
          <p className={`text-2xl font-bold mb-1 ${isKidsMode ? 'text-[#00FF00]' : 'text-[#3b6d11]'}`}>{onTrackCount}</p>
          <p className={`text-xs ${isKidsMode ? 'text-[#00FF00]' : 'text-gray-600'}`}>{behindCount} behind</p>
        </div>
      </div>

      {/* Empty State */}
      {localGoals.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-white border-2 border-dashed border-[#D0D0D0] rounded-lg p-12">
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
            isKidsMode={isKidsMode}
          />
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="bg-white border-2 border-[#D0D0D0] rounded-lg p-6 max-w-sm mx-4 shadow-lg">
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
                className="flex-1 px-4 py-2 bg-gray-200 text-[#805232] rounded-lg hover:bg-gray-300 transition-colors font-medium border border-[#805232]"
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
