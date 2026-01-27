import { useState, useMemo } from 'react';
import { Goal, MonthlyGoal, Task, LifeGoal } from '../types';

interface GoalHierarchyPageProps {
  goals: Goal[];
  monthlyGoals: MonthlyGoal[];
  tasks: Task[];
  lifeGoals: LifeGoal[];
}

interface HierarchyNode {
  type: 'lifeGoal' | 'goal' | 'monthlyGoal' | 'task';
  data: Goal | MonthlyGoal | Task | LifeGoal;
  children: HierarchyNode[];
  id: string;
}

export function GoalHierarchyPage({ goals, monthlyGoals, tasks, lifeGoals }: GoalHierarchyPageProps) {
  const buildGoalNode = (goal: Goal): HierarchyNode => {
    const goalMonthlyGoals = monthlyGoals.filter((mg) => mg.goalId === goal.id);
    const goalTasks = tasks.filter((t) => t.goalId === goal.id);

    // Get current, previous, and next months
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Calculate previous month (handles year boundary)
    const prevDate = new Date(currentYear, currentMonth - 1, 1);
    const prevMonth = prevDate.getMonth();
    const prevYear = prevDate.getFullYear();

    // Calculate next month (handles year boundary)
    const nextDate = new Date(currentYear, currentMonth + 1, 1);
    const nextMonth = nextDate.getMonth();
    const nextYear = nextDate.getFullYear();

    // Filter to show only 3 months: previous, current, next
    const threeMonthsGoals = goalMonthlyGoals.filter((mg) => {
      const mgDate = new Date(mg.monthDate);
      const mgMonth = mgDate.getMonth();
      const mgYear = mgDate.getFullYear();

      // Check if it's previous month
      if (mgMonth === prevMonth && mgYear === prevYear) return true;
      
      // Check if it's current month
      if (mgMonth === currentMonth && mgYear === currentYear) return true;
      
      // Check if it's next month
      if (mgMonth === nextMonth && mgYear === nextYear) return true;
      
      return false;
    });

    const monthlyGoalChildren = threeMonthsGoals.map((mg) => ({
      type: 'monthlyGoal' as const,
      data: mg,
      children: goalTasks.map((task) => ({
        type: 'task' as const,
        data: task,
        children: [],
        id: `task-${task.id}`,
      })),
      id: `monthlyGoal-${mg.id}`,
    }));

    return {
      type: 'goal',
      data: goal,
      children: monthlyGoalChildren,
      id: `goal-${goal.id}`,
    };
  };

  const hierarchyData = useMemo(() => {
    const nodes: HierarchyNode[] = [];

    // Group life goals with their goals
    const lifeGoalMap = new Map<string, Goal[]>();
    const unlinkedGoals: Goal[] = [];

    goals.forEach((goal) => {
      if (goal.lifeGoalId) {
        if (!lifeGoalMap.has(goal.lifeGoalId)) {
          lifeGoalMap.set(goal.lifeGoalId, []);
        }
        lifeGoalMap.get(goal.lifeGoalId)!.push(goal);
      } else {
        unlinkedGoals.push(goal);
      }
    });

    // Create life goal nodes
    lifeGoals.forEach((lifeGoal) => {
      const linkedGoals = lifeGoalMap.get(lifeGoal.id) || [];
      const goalChildren = linkedGoals.map((goal) => buildGoalNode(goal));
      nodes.push({
        type: 'lifeGoal',
        data: lifeGoal,
        children: goalChildren,
        id: `lifeGoal-${lifeGoal.id}`,
      });
    });

    // Add unlinked goals
    unlinkedGoals.forEach((goal) => {
      nodes.push(buildGoalNode(goal));
    });

    return nodes;
  }, [goals, monthlyGoals, tasks, lifeGoals, buildGoalNode]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'lifeGoal':
        return 'bg-blue-100 border-blue-400';
      case 'goal':
        return 'bg-purple-100 border-purple-400';
      case 'monthlyGoal':
        return 'bg-yellow-100 border-yellow-400';
      case 'task':
        return 'bg-green-100 border-green-400';
      default:
        return 'bg-gray-100 border-gray-400';
    }
  };

  const getNodeLabel = (node: HierarchyNode): string => {
    const data = node.data as any;
    switch (node.type) {
      case 'lifeGoal':
        return data.title;
      case 'goal':
        return data.title;
      case 'monthlyGoal':
        return data.month;
      case 'task':
        return data.title;
      default:
        return data.title;
    }
  };

  const getNodeSpacing = (level: number) => {
    return level === 0 ? 120 : level === 1 ? 100 : 80;
  };

  const getGapSize = (level: number) => {
    // gap-12 = 3rem = 48px, gap-8 = 2rem = 32px, gap-6 = 1.5rem = 24px
    return level === 0 ? 48 : level === 1 ? 32 : 24;
  };

  const calculateSubtreeWidth = (node: HierarchyNode, level: number): number => {
    if (node.children.length === 0) {
      return getNodeSpacing(level);
    }
    const gap = getGapSize(level);
    const childrenWidth = node.children.reduce((sum, child, index) => {
      const childWidth = calculateSubtreeWidth(child, level + 1);
      const gapBetweenChildren = index > 0 ? gap : 0;
      return sum + childWidth + gapBetweenChildren;
    }, 0);
    return childrenWidth;
  };

  const FlowchartNode = ({ node, level }: { node: HierarchyNode; level: number }) => {
    const data = node.data as any;
    const nodeSize = level === 0 ? 'w-32 h-32' : level === 1 ? 'w-28 h-28' : 'w-24 h-24';
    const textSize = level === 0 ? 'text-sm' : level === 1 ? 'text-xs' : 'text-[10px]';
    const subTextSize = level === 0 ? 'text-xs' : level === 1 ? 'text-[10px]' : 'text-[8px]';
    const spacing = level === 0 ? 'mt-8' : level === 1 ? 'mt-6' : 'mt-4';
    const gapSize = level === 0 ? 'gap-12' : level === 1 ? 'gap-8' : 'gap-6';
    const nodeSpacing = getNodeSpacing(level);
    
    return (
      <div className="flex flex-col items-center">
        {/* Node Circle */}
        <div
          className={`${nodeSize} rounded-full border-3 flex items-center justify-center text-center p-2 ${getNodeColor(
            node.type
          )} hover:shadow-lg transition-shadow cursor-pointer`}
        >
          <div>
            <p className={`font-bold ${textSize} text-[#805232]`}>{getNodeLabel(node)}</p>
            {node.type === 'goal' && (
              <p className={`${subTextSize} text-gray-600 mt-0.5`}>{(data as Goal).progress}%</p>
            )}
            {node.type === 'monthlyGoal' && (
              <p className={`${subTextSize} text-gray-600 mt-0.5`}>T: {(data as MonthlyGoal).target}</p>
            )}
          </div>
        </div>

        {/* Connector Lines and Child Nodes */}
        {node.children.length > 0 && (
          <div className={`${spacing} relative`} style={{ marginTop: '2rem' }}>
            {/* SVG for diagonal lines */}
            {(() => {
              const childWidths = node.children.map(child => calculateSubtreeWidth(child, level + 1));
              const gap = getGapSize(level);
              let cumulativeX = 0;
              const childPositions: number[] = [];
              
              for (let i = 0; i < node.children.length; i++) {
                if (i > 0) {
                  cumulativeX += gap;
                }
                const childWidth = childWidths[i];
                const centerX = cumulativeX + childWidth / 2;
                childPositions.push(centerX);
                cumulativeX += childWidth;
              }
              
              const totalWidth = cumulativeX;

              return (
                <svg
                  style={{
                    position: 'absolute',
                    top: `-2rem`,
                    left: '50%',
                    transform: `translateX(-${totalWidth / 2}px)`,
                    overflow: 'visible',
                  }}
                  width={totalWidth}
                  height="2rem"
                >
                  {/* Vertical line from parent */}
                  <line x1={totalWidth / 2} y1="0" x2={totalWidth / 2} y2="16" stroke="rgb(156, 163, 175)" strokeWidth="2" />
                  
                  {/* Diagonal lines to children */}
                  {childPositions.map((childX) => {
                    return (
                      <line
                        key={`diagonal-${childX}`}
                        x1={totalWidth / 2}
                        y1="16"
                        x2={childX}
                        y2="32"
                        stroke="rgb(156, 163, 175)"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              );
            })()}

            {/* Child nodes */}
            <div className={`flex ${gapSize} justify-center`}>
              {node.children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  <FlowchartNode node={child} level={level + 1} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (goals.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#805232] mb-4">Goal Hierarchy</h1>
        <div className="text-center py-8 sm:py-12 bg-[#F5F5F5] rounded-lg">
          <p className="text-[#805232] text-base sm:text-lg">No goals yet</p>
          <p className="text-gray-600 text-sm sm:text-base">Create a goal to see the hierarchy</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-2 sm:p-4 md:p-6 border-b border-gray-200 bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#805232] mb-2">Goal Hierarchy Flowchart</h1>
        <p className="text-xs sm:text-sm md:text-base text-[#805232]">View your goals organized as a hierarchical flowchart</p>
      </div>

      {/* Legend */}
      <div className="px-2 sm:px-4 md:px-6 pt-2 sm:pt-3 md:pt-4 pb-1 sm:pb-2 flex gap-2 sm:gap-4 md:gap-6 flex-wrap bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-400" />
          <span className="text-xs text-[#805232] font-medium">Life Goal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-100 border-2 border-purple-400" />
          <span className="text-xs text-[#805232] font-medium">Yearly Goal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-yellow-100 border-2 border-yellow-400" />
          <span className="text-xs text-[#805232] font-medium">Monthly Goal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-100 border-2 border-green-400" />
          <span className="text-xs text-[#805232] font-medium">Task</span>
        </div>
      </div>

      {/* Flowchart - Full Screen */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="flex flex-col gap-4 sm:gap-6 items-center py-2 sm:py-4 md:py-6 px-2 sm:px-4 md:px-6">
          {hierarchyData.map((node) => (
            <FlowchartNode key={node.id} node={node} level={0} />
          ))}
        </div>
      </div>
    </div>
  );
}
