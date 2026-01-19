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
  onRefreshGoals
}: GoalsPageProps) {
  const [activeTab, setActiveTab] = useState<'goals' | 'life-goals' | 'hierarchy'>('goals');

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 border-b-2 border-[#D0D0D0] px-2 sm:px-4 md:px-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('goals')}
          className={`pb-2 sm:pb-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap ${
            activeTab === 'goals'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Goals Overview
        </button>
        <button
          onClick={() => setActiveTab('life-goals')}
          className={`pb-2 sm:pb-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap ${
            activeTab === 'life-goals'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Life Goals
        </button>
        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`pb-2 sm:pb-3 px-2 sm:px-4 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap ${
            activeTab === 'hierarchy'
              ? 'text-[#805232] border-b-2 border-[#805232]'
              : 'text-gray-600 hover:text-[#805232]'
          }`}
        >
          Goal Hierarchy
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'goals' && (
          <div className="h-full overflow-y-auto">
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
            />
          </div>
        )}

        {activeTab === 'life-goals' && (
          <div className="h-full overflow-y-auto">
            <LifeGoalsPage />
          </div>
        )}

        {activeTab === 'hierarchy' && (
          <div className="h-full overflow-y-auto">
            <GoalHierarchyPage
              goals={goals}
              monthlyGoals={monthlyGoals}
              tasks={tasks}
              lifeGoals={lifeGoals}
            />
          </div>
        )}
      </div>
    </div>
  );
}
