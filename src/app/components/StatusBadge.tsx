import { GoalStatus } from '../types';

interface StatusBadgeProps {
  status: GoalStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colorMap = {
    'on-track': 'bg-green-500',
    'behind': 'bg-amber-500',
    'ahead': 'bg-emerald-500'
  };
  
  const sizeStyles = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  };
  
  return (
    <div className={`rounded ${colorMap[status]} ${sizeStyles[size]}`}></div>
  );
}
