import { useState, useEffect } from 'react';
import { Task, Goal } from '../types';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { formatTaskValue, calculateTaskCompletionToday, getTaskStatus } from '../utils/calculations';
import { Calendar, CheckCircle, Circle, Edit } from 'lucide-react';
import { tasksApi } from '../services/api';

interface TodayViewProps {
  tasks: Task[];
  goals: Goal[];
  onUpdateProgress: (taskId: string) => void;
}

export function TodayView({ tasks, goals, onUpdateProgress }: TodayViewProps) {
  const [todayCompletions, setTodayCompletions] = useState<Record<string, any>>({});

  const dailyTasks = tasks.filter(task => task.frequency === 'daily');
  
  // Fetch today's completions for all daily tasks
  useEffect(() => {
    const fetchTodayCompletions = async () => {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      
      const completions: Record<string, any> = {};
      
      const promises = dailyTasks.map(async (task) => {
        try {
          const history = await tasksApi.getHistory(task.id, 1);
          if (history.length > 0) {
            completions[task.id] = history[0];
          }
        } catch (error) {
          console.error(`Failed to fetch today's completion for task ${task.id}:`, error);
        }
      });
      
      await Promise.all(promises);
      setTodayCompletions(completions);
    };
    
    if (dailyTasks.length > 0) {
      fetchTodayCompletions();
    }
  }, [dailyTasks]);

  const todayTasks = dailyTasks;
  
  // Create a map of goalId to goal for quick lookup
  const goalMap = new Map(goals.map(g => [g.id, g]));
  
  const handleToggleComplete = (taskId: string) => {
    // In a real app, this would update the task completion
    console.log('Toggle task:', taskId);
    onUpdateProgress(taskId);
  };
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="mb-2 text-[#805232]">Today's Tasks</h1>
      </div>
      
      {/* Summary Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-white border border-[#805232] p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-[#805232]" />
            </div>
            <div>
              <div className="text-[#805232] text-sm">{today}</div>
              <div className="text-2xl">{todayTasks.length} Tasks</div>
            </div>
          </div>
          
          <div className="w-px h-16 bg-gray-200"></div>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <div>
              <div className="text-[#805232] text-sm">Completed</div>
              <div className="text-2xl">
                {todayTasks.filter(t => calculateTaskCompletionToday(t) >= 100).length}
              </div>
            </div>
          </div>
          
          <div className="w-px h-16 bg-gray-200"></div>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
            <div>
              <div className="text-[#805232] text-sm">In Progress</div>
              <div className="text-2xl">
                {todayTasks.filter(t => {
                  const comp = calculateTaskCompletionToday(t);
                  return comp > 0 && comp < 100;
                }).length}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Task List */}
      <div className="grid grid-cols-1 gap-3">
        {todayTasks.map(task => {
          const todayData = todayCompletions[task.id];
          const todayValue = todayData?.value || 0;
          const completion = todayValue >= task.target ? 100 : (task.target > 0 ? Math.round((todayValue / task.target) * 100) : 0);
          const status = getTaskStatus(completion);
          const parentGoal = goalMap.get(task.goalId);
          const isComplete = completion >= 100;
          
          return (
            <div 
              key={task.id} 
              className="bg-[#DCDCDC] rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all hover:scale-105 hover:-translate-y-1 p-4"
            >
              <div className="flex items-center gap-3">
                {/* Completion Toggle */}
                <button 
                  onClick={() => handleToggleComplete(task.id)}
                  className="flex-shrink-0"
                >
                  {isComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#805232] hover:text-[#805232]" />
                  )}
                </button>
                
                {/* Task Title and Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium ${isComplete ? 'line-through text-[#805232]' : ''}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#805232] mt-0.5">
                    <span>{parentGoal?.area}</span>
                    <span>•</span>
                    <span>{parentGoal?.title}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-24 flex-shrink-0">
                  <ProgressBar 
                    progress={completion} 
                    status={status}
                    showLabel={false}
                    height="sm"
                  />
                </div>
                
                {/* Progress Value */}
                <div className="text-xs text-[#805232] whitespace-nowrap flex-shrink-0">
                  <span className={isComplete ? 'text-green-600 font-semibold' : ''}>
                    {formatTaskValue(todayValue, task.unit)}
                  </span>
                  <span> / {formatTaskValue(task.target, task.unit)}</span>
                </div>
                
                {/* Status and Update Button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={status} size="sm" />
                  <button
                    onClick={() => onUpdateProgress(task.id)}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {todayTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-[#805232]" />
            <h3 className="mb-2 text-[#805232]">No Tasks Today</h3>
            <p className="text-[#805232]">Great! You've completed all your daily tasks</p>
          </div>
        </div>
      )}
    </div>
  );
}