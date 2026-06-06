import { useState, useEffect } from 'react';
import { Goal, Task } from '../types';
import { ChevronDown, ChevronRight, ArrowLeft, ArrowRight, Edit, Trash2, Plus, Eye, X, Heart, Building2, Users, Star } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { tasksApi } from '../services/api';
import { COLORS } from '../constants/colors';

function getIconForGoal(goal: Goal): { Icon: React.ReactNode; bgColor: string; iconColor: string } {
  const title = goal.title.toLowerCase();
  const area = goal.area?.toLowerCase() || '';

  if (area.includes('health') || title.includes('health') || title.includes('fitness') || title.includes('weight')) {
    return { Icon: <Heart className="w-4 h-4" />, bgColor: '#fde8e0', iconColor: '#d85a30' };
  }
  if (area.includes('financial') || area.includes('money') || title.includes('financial') || title.includes('retire')) {
    return { Icon: <Building2 className="w-4 h-4" />, bgColor: '#fdf8e0', iconColor: '#854f0b' };
  }
  if (area.includes('family') || title.includes('family') || title.includes('nandu') || title.includes('child')) {
    return { Icon: <Users className="w-4 h-4" />, bgColor: COLORS.successLight, iconColor: COLORS.success };
  }
  return { Icon: <Star className="w-4 h-4" />, bgColor: '#ede9fe', iconColor: '#6d28d9' };
}

function getStatusColor(status: string, colors: typeof COLORS): { bg: string; text: string } {
  const s = status?.toUpperCase() || '';
  if (s.includes('ON_TRACK') || s.includes('COMPLETED')) return { bg: colors.successLight, text: colors.success };
  if (s.includes('BEHIND')) return { bg: colors.warningLight, text: colors.warning };
  if (s.includes('AT_RISK')) return { bg: colors.dangerLight, text: colors.danger };
  return { bg: colors.gray[100], text: colors.textSecondary };
}

interface CollapsibleGoalRowProps {
  goal: Goal;
  isExpanded: boolean;
  onToggle: () => void;
  onEditGoal?: (goalId: string) => void;
  onDeleteGoal?: (goalId: string) => void;
  onAddTask?: (goalId: string) => void;
  tasks?: Task[];
  isKidsMode?: boolean;
}

export function CollapsibleGoalRow({
  goal,
  isExpanded,
  onToggle,
  onEditGoal,
  onDeleteGoal,
  onAddTask,
  tasks = [],
  isKidsMode,
}: CollapsibleGoalRowProps) {
  const [monthOffset, setMonthOffset] = useState(0);
  const [monthCompletions, setMonthCompletions] = useState<Record<string, any>>({});
  const [loadingMonths, setLoadingMonths] = useState<Set<string>>(new Set());
  const [selectedIconMonthId, setSelectedIconMonthId] = useState<string | null>(null);

  const goalTasks = tasks.filter(t => t.goalId === goal.id);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-11

  // Generate 12 months starting from January of current year
  const allMonths = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, i, 1);
    return date;
  });

  const visibleMonths = allMonths.slice(monthOffset, monthOffset + 6);
  const canGoBack = monthOffset > 0;
  const canGoForward = monthOffset + 6 < allMonths.length;

  const formatProgressValue = (value: number | string): string => {
    const num = Number(value);
    if (num === 0 || num === 1 || Number.isInteger(num)) {
      return Math.round(num).toString();
    }
    return num.toFixed(2);
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

  // Fetch month completions for all months
  useEffect(() => {
    allMonths.forEach(monthDate => {
      const year = monthDate.getFullYear();
      const monthNum = monthDate.getMonth() + 1;
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
  }, [goalTasks.length, goal.id]);

  return (
    <div className="mb-6">
      <style>{`
        .tooltip-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .tooltip-text {
          visibility: hidden;
          width: max-content;
          background-color: #805232;
          color: white;
          text-align: center;
          border-radius: 6px;
          padding: 5px 10px;
          position: absolute;
          z-index: 1000;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
        }
        .tooltip-text::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #805232 transparent transparent transparent;
        }
        .tooltip-container:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }
      `}</style>

      {/* Goal Header */}
      <div className={`rounded-lg mb-4 hover:shadow-lg transition-all duration-200 ${
        isKidsMode
          ? 'bg-[#00FFFF] bg-opacity-60 border-2 border-[#0099FF]'
          : 'bg-white border border-[#E8E8E8]'
      }`}>
        {/* Header row - matches mockup layout */}
        <div className="flex items-center gap-3 p-3.5">
          {/* Chevron */}
          <button
            onClick={onToggle}
            className="text-[#805232] hover:text-[#805232] flex-shrink-0 transition-transform"
            style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Icon Box */}
          {(() => {
            const { Icon, bgColor, iconColor } = getIconForGoal(goal);
            return (
              <div className="rounded-lg w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bgColor }}>
                <div style={{ color: iconColor }}>{Icon}</div>
              </div>
            );
          })()}

          {/* Goal Main - just the title */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#805232]">{goal.title}</h3>
          </div>

          {/* Goal Right - percentage and action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <div className="text-base font-semibold" style={{
                color: goal.status?.toUpperCase().includes('ON_TRACK') ? '#3b6d11' : '#805232'
              }}>
                {Math.round(goal.progress || 0)}%
              </div>
              <div className="text-xs text-[#999] font-medium">of year</div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {onAddTask && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddTask(goal.id);
                  }}
                  className="p-1.5 text-[#999] hover:text-[#805232] hover:bg-[#f5f5f5] rounded transition-colors"
                  title="Add task"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
              {onEditGoal && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditGoal(goal.id);
                  }}
                  className="p-1.5 text-[#999] hover:text-[#805232] hover:bg-[#f5f5f5] rounded transition-colors"
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
                  className="p-1.5 text-[#999] hover:text-red-600 hover:bg-[#f5f5f5] rounded transition-colors"
                  title="Delete goal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar row - below header */}
        <div className="flex items-center gap-2.5 px-3.5 pb-3.5">
          <div className="flex-1 h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.round(goal.progress || 0)}%`,
                backgroundColor: goal.status?.toUpperCase().includes('ON_TRACK') ? '#3b6d11' : '#805232'
              }}
            />
          </div>
          <div className="text-xs text-[#999] font-medium whitespace-nowrap">
            {Math.round(goal.progress || 0)}% of year
            {goal.unit === 'Kilogram' && goal.weightGoal ?
              ` · ${(goal.weightGoal.startWeight - goal.weightGoal.targetWeight).toFixed(1)} ${goal.unit?.toLowerCase() || 'units'} to go`
              : goal.unit ? ` · ${goal.unit}` : ''}
          </div>
        </div>
      </div>

    </div>
  );
}
