import { useState } from 'react';
import { Goal } from '../types';
import { X } from 'lucide-react';

interface GenerateMonthlyGoalsPanelProps {
  goal: Goal | null;
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (strategy: string, startValue?: number) => Promise<void>;
}

export function GenerateMonthlyGoalsPanel({ goal, isOpen, onClose, onGenerate }: GenerateMonthlyGoalsPanelProps) {
  const [distributionStrategy, setDistributionStrategy] = useState<'spread' | 'equal' | 'frontload' | 'progressive'>('spread');
  const [startValue, setStartValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!goal || !isOpen) return null;

  const getTargetValue = (): number => {
    if (goal.unit === 'Kilogram' && goal.weightGoal) {
      return Math.abs(goal.weightGoal.targetWeight - goal.weightGoal.startWeight);
    } else if (goal.unit === 'Count' && goal.countGoal) {
      return goal.countGoal.targetCount;
    } else if (goal.unit === 'Time' && goal.timeGoal) {
      const hours = goal.timeGoal.targetHours || 0;
      const minutes = goal.timeGoal.targetMinutes || 0;
      return hours * 60 + minutes;
    }
    return 0;
  };

  const calculateMonthlyDistribution = (): number[] => {
    const target = getTargetValue();
    const months: number[] = Array(12).fill(0);

    if (target <= 0) return months;

    if (distributionStrategy === 'spread') {
      const remainder = target % 4;
      const basePerMonth = Math.floor(target / 4);
      months[0] = basePerMonth + (remainder > 0 ? 1 : 0);
      months[3] = basePerMonth + (remainder > 1 ? 1 : 0);
      months[6] = basePerMonth + (remainder > 2 ? 1 : 0);
      months[9] = basePerMonth + (remainder > 3 ? 1 : 0);
    } else if (distributionStrategy === 'equal') {
      const monthlyTarget = parseFloat((target / 12).toFixed(2));
      for (let i = 0; i < 12; i++) {
        months[i] = monthlyTarget;
      }
    } else if (distributionStrategy === 'frontload') {
      const wholePart = Math.floor(target);
      const fractionalPart = target - wholePart;
      for (let i = 0; i < wholePart; i++) {
        months[i] = 1;
      }
      if (fractionalPart > 0 && wholePart < 12) {
        months[wholePart] = fractionalPart;
      }
    } else if (distributionStrategy === 'progressive') {
      const start = parseInt(startValue) || 0;
      const incrementPerMonth = (target - start) / 12;
      for (let i = 0; i < 12; i++) {
        months[i] = Math.round(start + (i + 1) * incrementPerMonth);
      }
    }

    return months;
  };

  const getDistributionDescription = () => {
    const target = getTargetValue();
    if (target <= 0) return 'Set a target value first';

    if (distributionStrategy === 'spread') {
      return `Distribute quarterly: ${Math.ceil(target / 4)} per quarter`;
    } else if (distributionStrategy === 'equal') {
      return `Consistent targets: ${(target / 12).toFixed(2)} per month`;
    } else if (distributionStrategy === 'frontload') {
      return `Build momentum early: Fill first ${Math.ceil(target)} months`;
    } else if (distributionStrategy === 'progressive') {
      const start = parseInt(startValue) || 0;
      return `Ramp from ${start} to ${target}: increasing each month`;
    }
    return '';
  };

  const renderDistributionPreview = () => {
    const distribution = calculateMonthlyDistribution();
    const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    const target = getTargetValue();

    return (
      <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-end justify-between gap-1 h-32">
          {distribution.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="text-xs text-gray-600 mb-2">{value.toFixed(2)}</div>
              <div className="w-full bg-gray-200 rounded relative overflow-hidden h-20 flex items-end">
                {value > 0 && (
                  <div
                    className="w-full bg-[#805232] transition-all"
                    style={{height: `${Math.min((value / target) * 100, 100)}%`}}
                  />
                )}
              </div>
              <div className="text-xs text-gray-600 mt-2">{months[index]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const strategyMap: Record<string, string> = {
        'spread': 'SPREAD_EVENLY',
        'equal': 'EQUAL_DISTRIBUTION',
        'frontload': 'FRONT_LOAD',
        'progressive': 'PROGRESSIVE'
      };
      
      const strategy = strategyMap[distributionStrategy] || 'SPREAD_EVENLY';
      const value = distributionStrategy === 'progressive' ? parseInt(startValue) : undefined;
      
      await onGenerate(strategy, value);
      onClose();
      setDistributionStrategy('spread');
      setStartValue('');
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to generate monthly goals';
      console.error('Generate error:', errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed right-0 top-0 h-screen w-96 bg-[#DCDCDC] shadow-2xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="sticky top-0 bg-[#DCDCDC] border-b border-[#B8B9BA] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#805232]">Generate Monthly Goals</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-5">
          <div>
            <label className="block text-sm mb-3 text-[#805232] font-medium">
              Distribution Strategy
            </label>
            <div className="space-y-2">
              {['spread', 'equal', 'frontload', ...(goal.unit === 'Count' || goal.unit === 'Time' ? ['progressive'] : [])].map((strategy) => (
                <label
                  key={strategy}
                  className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{
                    borderColor: distributionStrategy === strategy ? '#805232' : '',
                    backgroundColor: distributionStrategy === strategy ? '#f5f1ed' : ''
                  }}
                >
                  <input
                    type="radio"
                    name="strategy"
                    value={strategy}
                    checked={distributionStrategy === strategy as any}
                    onChange={(e) => setDistributionStrategy(e.target.value as any)}
                    className="w-4 h-4 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#805232]">
                      {strategy === 'spread' && 'Spread Evenly'}
                      {strategy === 'equal' && 'Equal Distribution'}
                      {strategy === 'frontload' && 'Front Load'}
                      {strategy === 'progressive' && 'Progressive'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {distributionStrategy === 'progressive' && (
            <div className="ml-6 p-3 bg-gray-50 rounded-lg">
              <div className="max-w-xs">
                <label className="block text-xs mb-1 text-[#805232] font-medium">
                  Start Value *
                </label>
                <input
                  type="number"
                  step="1"
                  value={startValue}
                  onChange={(e) => setStartValue(e.target.value)}
                  placeholder="e.g., 3"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Will increase to {getTargetValue()} by year-end
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2 text-[#805232] font-medium">
              Monthly Distribution Preview
            </label>
            <p className="text-xs text-gray-600 mb-2">{getDistributionDescription()}</p>
            {renderDistributionPreview()}
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mt-6">
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-[#DCDCDC] text-[#805232] rounded-lg border border-[#805232] hover:bg-[#DCDCDC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
}
