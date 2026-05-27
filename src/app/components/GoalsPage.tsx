import { useState } from 'react';
import { Goal, MonthlyGoal, Task, LifeGoal } from '../types';
import { GoalsOverviewNew } from './GoalsOverviewNew';
import { LifeGoalsPage } from './LifeGoalsPage';
import { GoalHierarchyPage } from './GoalHierarchyPage';

interface GoalsPageProps {
  goals: Goal[];
  monthlyGoals: MonthlyGoal[];
  tasks: Task[];
  lifeGoals: LifeGoal[];
  onSelectGoal: (goalId: string) => void;
  onAddMonthlyGoal: (goalId: string) => void;
  onAddTask: (monthlyGoalId: string) => void;
  onEditGoal?: (goalId: string) => void;
  onEditMonthlyGoal?: (monthlyGoalId: string) => void;
  onUpdateGoal?: (updatedGoal: Goal) => void;
  onDeleteGoal?: (goalId: string) => void;
  onRefreshGoals?: () => void;
  isKidsMode?: boolean;
}

export function GoalsPage({
  goals,
  monthlyGoals,
  tasks,
  lifeGoals,
  onSelectGoal,
  onAddMonthlyGoal,
  onAddTask,
  onEditGoal,
  onEditMonthlyGoal,
  onUpdateGoal,
  onDeleteGoal,
  onRefreshGoals,
  isKidsMode
}: GoalsPageProps) {
  const [showLifeGoals, setShowLifeGoals] = useState(false);
  const [showHierarchy, setShowHierarchy] = useState(false);

  if (showLifeGoals) {
    return <LifeGoalsPage isKidsMode={isKidsMode} />;
  }

  if (showHierarchy) {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="px-4 py-4 border-b border-[rgba(0,0,0,0.08)]">
          <button
            onClick={() => setShowHierarchy(false)}
            className="text-sm font-medium text-[#805232] hover:text-[#6b4427]"
          >
            ← Back to Goals
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <GoalHierarchyPage
            goals={goals}
            monthlyGoals={monthlyGoals}
            tasks={tasks}
            lifeGoals={lifeGoals}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Goals Content */}
      <div className="flex-1 overflow-y-auto">
        <GoalsOverviewNew
          goals={goals}
          monthlyGoals={monthlyGoals}
          tasks={tasks}
          onSelectGoal={onSelectGoal}
          onAddMonthlyGoal={onAddMonthlyGoal}
          onAddTask={onAddTask}
          onEditGoal={onEditGoal}
          onEditMonthlyGoal={onEditMonthlyGoal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
          onRefreshGoals={onRefreshGoals}
          isKidsMode={isKidsMode}
        />
      </div>
    </div>
  );
}
