import { GoalStatus } from '../types';

interface ProgressBarProps {
  progress: number;
  status: GoalStatus;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ progress, status, showLabel = true, height = 'md' }: ProgressBarProps) {
  const colors = {
    'on-track': 'bg-green-500',
    'behind': 'bg-amber-500',
    'ahead': 'bg-emerald-500'
  };
  
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heights[height]}`}>
        <div 
          className={`${colors[status]} ${heights[height]} rounded-full transition-all duration-500`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-[#805232] text-right">
          {clampedProgress}%
        </div>
      )}
    </div>
  );
}
