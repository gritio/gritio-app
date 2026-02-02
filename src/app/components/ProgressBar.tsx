import { GoalStatus } from '../types';

interface ProgressBarProps {
  progress: number;
  status: GoalStatus;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  isKidsMode?: boolean;
}

export function ProgressBar({ progress, status, showLabel = true, height = 'md', isKidsMode }: ProgressBarProps) {
  const colors = isKidsMode ? {
    'on-track': 'bg-[#00FF00]',
    'behind': 'bg-[#00FF00]',
    'ahead': 'bg-[#00FF00]'
  } : {
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
      <div className={`w-full rounded-full overflow-hidden ${heights[height]} ${isKidsMode ? 'bg-[#0099FF]' : 'bg-gray-200'}`}>
        <div 
          className={`${colors[status]} ${heights[height]} rounded-full transition-all duration-500`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className={`mt-1 text-sm text-right ${isKidsMode ? 'text-[#00FF00]' : 'text-[#805232]'}`}>
          {clampedProgress}%
        </div>
      )}
    </div>
  );
}
