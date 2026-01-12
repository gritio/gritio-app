import { useState } from 'react';
import { Goal, MeasurementType, Frequency } from '../types';
import { X } from 'lucide-react';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id' | 'progress' | 'status' | 'description'>) => Promise<void>;
}

export function AddGoalModal({ isOpen, onClose, onSave }: AddGoalModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    area: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    unit: '',
    remarks: '',
  });
  const [weightData, setWeightData] = useState({
    startWeight: '',
    targetWeight: ''
  });
  const [countData, setCountData] = useState({
    targetCount: ''
  });
  const [timeData, setTimeData] = useState({
    targetHours: '',
    targetMinutes: ''
  });
  const [autoCreateMonthly, setAutoCreateMonthly] = useState(false);
  const [distributionStrategy, setDistributionStrategy] = useState<'spread' | 'equal' | 'frontload' | 'progressive'>('spread');
  const [startValue, setStartValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getTargetValue = (): number => {
    if (formData.unit === 'Kilogram' && weightData.targetWeight && weightData.startWeight) {
      // For weight goals, calculate absolute difference (weight to lose/gain)
      return Math.abs(parseFloat(weightData.targetWeight) - parseFloat(weightData.startWeight));
    } else if (formData.unit === 'Count' && countData.targetCount) {
      return parseInt(countData.targetCount);
    } else if (formData.unit === 'Time' && timeData.targetHours) {
      // For time goals, convert hours and minutes to total minutes
      const hours = parseInt(timeData.targetHours) || 0;
      const minutes = parseInt(timeData.targetMinutes) || 0;
      return hours * 60 + minutes;
    }
    return 0;
  };

  const calculateMonthlyDistribution = (): number[] => {
    const target = getTargetValue();
    const months: number[] = Array(12).fill(0);

    if (target <= 0) return months;

    if (distributionStrategy === 'spread') {
      // Distribute evenly across quarters
      const remainder = target % 4;
      const basePerMonth = Math.floor(target / 4);
      
      // Assign to Jan, Apr, Jul, Oct
      months[0] = basePerMonth + (remainder > 0 ? 1 : 0);
      months[3] = basePerMonth + (remainder > 1 ? 1 : 0);
      months[6] = basePerMonth + (remainder > 2 ? 1 : 0);
      months[9] = basePerMonth + (remainder > 3 ? 1 : 0);
    } else if (distributionStrategy === 'equal') {
      // Divide equally across all 12 months
      const monthlyTarget = parseFloat((target / 12).toFixed(2));
      for (let i = 0; i < 12; i++) {
        months[i] = monthlyTarget;
      }
    } else if (distributionStrategy === 'frontload') {
      // Fill first N months
      const wholePart = Math.floor(target);
      const fractionalPart = target - wholePart;
      
      for (let i = 0; i < wholePart; i++) {
        months[i] = 1;
      }
      if (fractionalPart > 0 && wholePart < 12) {
        months[wholePart] = fractionalPart;
      }
    } else if (distributionStrategy === 'progressive') {
      // Ramp from startValue to target linearly, then maintain
      const start = parseInt(startValue) || 0;
      const monthsToReach = Math.min(target, 12);
      const incrementPerMonth = (target - start) / monthsToReach;
      
      for (let i = 0; i < 12; i++) {
        if (i < monthsToReach) {
          months[i] = Math.round(start + (i + 1) * incrementPerMonth);
        } else {
          months[i] = target;
        }
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
      const start = parseFloat(startValue) || 0;
      return `Ramp from ${start} to ${target}: increasing each month`;
    }
    return '';
  };

  const getStrategyBenefits = () => {
    if (distributionStrategy === 'spread') {
      return 'Even pacing throughout year, clear targets';
    } else if (distributionStrategy === 'equal') {
      return 'Consistent targets every month, total equals goal';
    } else if (distributionStrategy === 'frontload') {
      return 'Build momentum early, finish ahead of schedule';
    } else if (distributionStrategy === 'progressive') {
      return 'Start easy, build progressively toward goal';
    }
    return '';
  };

  const renderDistributionPreview = () => {
    const distribution = calculateMonthlyDistribution();
    const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
    
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
                    style={{height: `${Math.min((value / getTargetValue()) * 100, 100)}%`}}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Form submission started');
      const goalPayload: any = {
        title: formData.title,
        area: formData.area,
        unit: formData.unit,
        startDate: formData.startDate,
        endDate: formData.endDate,
        remarks: formData.remarks || undefined,
      };

      if (autoCreateMonthly) {
        goalPayload.autoCreateMonthly = true;
        const strategyMap: Record<string, string> = {
          'spread': 'SPREAD_EVENLY',
          'equal': 'EQUAL_DISTRIBUTION',
          'frontload': 'FRONT_LOAD',
          'progressive': 'PROGRESSIVE'
        };
        goalPayload.distributionStrategy = strategyMap[distributionStrategy] || 'SPREAD_EVENLY';
        if (distributionStrategy === 'progressive') {
          goalPayload.startValue = parseInt(startValue);
        }
      }

      if (formData.unit === 'Kilogram' && weightData.startWeight) {
        goalPayload.weightGoal = {
          startWeight: parseFloat(weightData.startWeight),
          currentWeight: parseFloat(weightData.startWeight),
          targetWeight: parseFloat(weightData.targetWeight)
        };
      } else if (formData.unit === 'Count' && countData.targetCount) {
        goalPayload.countGoal = {
          targetCount: parseInt(countData.targetCount)
        };
      } else if (formData.unit === 'Time' && timeData.targetHours) {
        goalPayload.timeGoal = {
          targetHours: parseInt(timeData.targetHours),
          targetMinutes: parseInt(timeData.targetMinutes) || 0
        };
      }
      await onSave(goalPayload);
      console.log('Goal saved successfully');
      
      // Reset form
      setFormData({
        title: '',
        area: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        unit: '',
        remarks: '',
      });
      setWeightData({ startWeight: '', targetWeight: '' });
      setCountData({ targetCount: '' });
      setTimeData({ targetHours: '', targetMinutes: '' });
      setStartValue('');
      setAutoCreateMonthly(false);
      console.log('Closing modal');
      onClose();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to create goal';
      console.error('Goal creation error:', errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
      <div className="bg-[#DCDCDC] border border-[#B8B9BA] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#B8B9BA]">
          <h2 className="text-[#805232] font-semibold">Add New Goal</h2>
          <button 
            onClick={onClose}
            className="text-[#805232] hover:text-[#805232] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm mb-2 text-[#805232]">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Reach Target Weight"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
              />
            </div>
            
            {/* Area */}
            <div>
              <label className="block text-sm mb-2 text-[#805232]">
                Area *
              </label>
              <select
                required
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
              >
                <option value="">Select an area</option>
                <option value="Health">Health</option>
                <option value="Learning">Learning</option>
                <option value="Career">Career</option>
                <option value="Finance">Finance</option>
                <option value="Relationships">Relationships</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            
            {/* Unit */}
            <div>
              <label className="block text-sm mb-2 text-[#805232]">
                Unit (How would you like to measure this goal) *
              </label>
              <select
                required
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
              >
                <option value="">Select a unit</option>
                <option value="Count">Count</option>
                <option value="Time">Time</option>
                <option value="Kilogram">Kilogram</option>
              </select>
            </div>
            
            {/* Weight Goal Fields - Only show if Kilogram is selected */}
            {formData.unit === 'Kilogram' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-2 text-[#805232]">
                      Start Weight (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={weightData.startWeight}
                      onChange={(e) => setWeightData({...weightData, startWeight: e.target.value})}
                      placeholder="e.g., 96"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#805232]">
                      Target Weight (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={weightData.targetWeight}
                      onChange={(e) => setWeightData({...weightData, targetWeight: e.target.value})}
                      placeholder="e.g., 87"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Count Goal Field - Only show if Count is selected */}
            {formData.unit === 'Count' && (
              <div>
                <label className="block text-sm mb-2 text-[#805232]">
                  Target Count *
                </label>
                <input
                  type="number"
                  required
                  value={countData.targetCount}
                  onChange={(e) => setCountData({...countData, targetCount: e.target.value})}
                  placeholder="e.g., 24"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                />
              </div>
            )}

            {/* Time Goal Fields - Only show if Time is selected */}
            {formData.unit === 'Time' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-[#805232]">
                    Target Hours *
                  </label>
                  <input
                    type="number"
                    required
                    value={timeData.targetHours}
                    onChange={(e) => setTimeData({...timeData, targetHours: e.target.value})}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-[#805232]">
                    Target Minutes
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={timeData.targetMinutes}
                    onChange={(e) => setTimeData({...timeData, targetMinutes: e.target.value})}
                    placeholder="e.g., 30"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                  />
                </div>
              </div>
            )}
            
            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-[#805232]">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2 text-[#805232]">
                  End Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                />
              </div>
            </div>
            
            {/* Remarks */}
            <div>
              <label className="block text-sm mb-2 text-[#805232]">
                Remarks (Optional)
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                placeholder="Any notes or reminders for this goal..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
              />
            </div>
            
            {/* Auto Create Monthly Targets Section */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="autoCreateMonthly"
                  checked={autoCreateMonthly}
                  onChange={(e) => setAutoCreateMonthly(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="autoCreateMonthly" className="text-sm font-medium text-[#805232] cursor-pointer">
                  Automatically create monthly targets
                </label>
              </div>

              {autoCreateMonthly && (
                <div className="space-y-4 ml-6">
                  <div>
                    <label className="block text-sm mb-3 text-[#805232] font-medium">
                      Distribution Strategy
                    </label>
                    <div className="space-y-2">
                      {/* Spread Evenly */}
                      <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        style={{borderColor: distributionStrategy === 'spread' ? '#805232' : '', backgroundColor: distributionStrategy === 'spread' ? '#f5f1ed' : ''}}>
                        <input
                          type="radio"
                          name="strategy"
                          value="spread"
                          checked={distributionStrategy === 'spread'}
                          onChange={(e) => setDistributionStrategy(e.target.value as any)}
                          className="w-4 h-4 mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#805232]">Spread Evenly</span>
                            <span className="text-xs bg-[#805232] text-white px-2 py-1 rounded">Recommended</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{getStrategyBenefits()}</p>
                        </div>
                      </label>

                      {/* Equal Distribution */}
                      <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        style={{borderColor: distributionStrategy === 'equal' ? '#805232' : '', backgroundColor: distributionStrategy === 'equal' ? '#f5f1ed' : ''}}>
                        <input
                          type="radio"
                          name="strategy"
                          value="equal"
                          checked={distributionStrategy === 'equal'}
                          onChange={(e) => setDistributionStrategy(e.target.value as any)}
                          className="w-4 h-4 mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[#805232]">Equal Distribution</div>
                          <p className="text-xs text-gray-600 mt-1">{getStrategyBenefits()}</p>
                        </div>
                      </label>

                      {/* Front Load */}
                      <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        style={{borderColor: distributionStrategy === 'frontload' ? '#805232' : '', backgroundColor: distributionStrategy === 'frontload' ? '#f5f1ed' : ''}}>
                        <input
                          type="radio"
                          name="strategy"
                          value="frontload"
                          checked={distributionStrategy === 'frontload'}
                          onChange={(e) => setDistributionStrategy(e.target.value as any)}
                          className="w-4 h-4 mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-[#805232]">Front Load</div>
                          <p className="text-xs text-gray-600 mt-1">{getStrategyBenefits()}</p>
                        </div>
                      </label>

                      {/* Progressive - Only for Count and Time goals */}
                      {(formData.unit === 'Count' || formData.unit === 'Time') && (
                        <label className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          style={{borderColor: distributionStrategy === 'progressive' ? '#805232' : '', backgroundColor: distributionStrategy === 'progressive' ? '#f5f1ed' : ''}}>
                          <input
                            type="radio"
                            name="strategy"
                            value="progressive"
                            checked={distributionStrategy === 'progressive'}
                            onChange={(e) => setDistributionStrategy(e.target.value as any)}
                            className="w-4 h-4 mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#805232]">Progressive</div>
                            <p className="text-xs text-gray-600 mt-1">{getStrategyBenefits()}</p>
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Progressive Strategy Fields */}
                  {(formData.unit === 'Count' || formData.unit === 'Time') && distributionStrategy === 'progressive' && (
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

                  {/* Distribution Preview */}
                  <div>
                    <label className="block text-sm mb-2 text-[#805232] font-medium">
                      Monthly Distribution Preview
                    </label>
                    <p className="text-xs text-gray-600 mb-2">{getDistributionDescription()}</p>
                    {renderDistributionPreview()}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#DCDCDC] text-[#805232] rounded-lg border border-[#805232] hover:bg-[#DCDCDC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Creating...' : 'Add Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
