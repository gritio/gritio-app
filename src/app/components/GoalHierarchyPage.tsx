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

  const FlowchartNode = ({ node, level }: { node: HierarchyNode; level: number }) => {
    const data = node.data as any;
    const nodeSize = level === 0 ? 'w-24 h-24' : level === 1 ? 'w-20 h-20' : 'w-16 h-16';
    const textSize = level === 0 ? 'text-xs' : 'text-[10px]';
    const subTextSize = level === 0 ? 'text-[10px]' : 'text-[8px]';
    const spacing = level === 0 ? 'mt-6' : level === 1 ? 'mt-4' : 'mt-3';
    const gapSize = level === 0 ? 'gap-8' : level === 1 ? 'gap-6' : 'gap-4';
    const connectorHeight = level === 0 ? 'h-6' : 'h-4';
    
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
          <div className={`${spacing} relative`}>
            {/* Vertical line from parent */}
            <div className={`absolute -top-6 left-1/2 w-0.5 ${connectorHeight} bg-gray-400`} style={{ transform: 'translateX(-50%)' }} />

            {/* Horizontal line connecting children */}
            {node.children.length > 1 && (
              <div
                className="absolute h-0.5 bg-gray-400"
                style={{
                  top: 0,
                  left: `calc(50% - ${(node.children.length * (level === 0 ? 90 : level === 1 ? 70 : 50)) / 2}px)`,
                  width: `${node.children.length * (level === 0 ? 90 : level === 1 ? 70 : 50)}px`,
                }}
              />
            )}

            {/* Child nodes */}
            <div className={`flex ${gapSize} justify-center ${spacing}`}>
              {node.children.map((child, index) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Vertical line from connector to child */}
                  <div className={`absolute -top-6 left-1/2 w-0.5 ${connectorHeight} bg-gray-400`} style={{ transform: 'translateX(-50%)' }} />
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
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-[#805232] mb-4">Goal Hierarchy</h1>
        <div className="text-center py-12 bg-[#F5F5F5] rounded-lg">
          <p className="text-[#805232] text-lg">No goals yet</p>
          <p className="text-gray-600">Create a goal to see the hierarchy</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <h1 className="text-3xl font-bold text-[#805232] mb-2">Goal Hierarchy Flowchart</h1>
        <p className="text-[#805232]">View your goals organized as a hierarchical flowchart</p>
      </div>

      {/* Legend */}
      <div className="px-6 pt-4 pb-2 flex gap-6 flex-wrap bg-white border-b border-gray-200">
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
        <div className="flex flex-col gap-6 items-center py-6 px-6">
          {hierarchyData.map((node) => (
            <FlowchartNode key={node.id} node={node} level={0} />
          ))}
        </div>
      </div>
    </div>
  );
}
