import { useState, useEffect } from 'react';
import { Goal, MeasurementType, Frequency, LifeGoal } from '../types';
import { X } from 'lucide-react';
import { lifeGoalsApi } from '../services/api';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id' | 'progress' | 'status' | 'description'>) => Promise<void>;
}

const lastDayOfCurrentYear = () => {
  const d = new Date(new Date().getFullYear(), 11, 31);
  return d.toISOString().split('T')[0];
};

export function AddGoalModal({ isOpen, onClose, onSave }: AddGoalModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: lastDayOfCurrentYear(),
    unit: '',
    remarks: '',
    lifeGoalId: '',
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
  const [percentageData, setPercentageData] = useState({
    targetPercent: '80'
  });
  const [startValue, setStartValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>([]);
  const [loadingLifeGoals, setLoadingLifeGoals] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchLifeGoals();
    }
  }, [isOpen]);

  const fetchLifeGoals = async () => {
    try {
      setLoadingLifeGoals(true);
      const data = await lifeGoalsApi.getLifeGoals();
      setLifeGoals(data);
    } catch (err) {
      console.error('Failed to fetch life goals:', err);
    } finally {
      setLoadingLifeGoals(false);
    }
  };
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Form submission started');

      // Backend derives progressSource from unit; no client-side choice.
      const goalPayload: any = {
        title: formData.title,
        unit: formData.unit,
        startDate: formData.startDate,
        endDate: formData.endDate,
        remarks: formData.remarks || undefined,
        lifeGoalId: formData.lifeGoalId || undefined,
      };

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
      } else if (formData.unit === 'Percentage' && percentageData.targetPercent) {
        goalPayload.percentageGoal = {
          targetPercent: parseInt(percentageData.targetPercent)
        };
      }
      await onSave(goalPayload);
      console.log('Goal saved successfully');
      
      // Reset form
      setFormData({
        title: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: lastDayOfCurrentYear(),
        unit: '',
        remarks: '',
        lifeGoalId: '',
      });
      setWeightData({ startWeight: '', targetWeight: '' });
      setCountData({ targetCount: '' });
      setTimeData({ targetHours: '', targetMinutes: '' });
      setPercentageData({ targetPercent: '80' });
      setStartValue('');
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
            
            {/* Life Goal */}
            <div>
              <label className="block text-sm mb-2 text-[#805232]">
                Link to Life Goal (Optional)
              </label>
              <select
                value={formData.lifeGoalId}
                onChange={(e) => setFormData({...formData, lifeGoalId: e.target.value})}
                disabled={loadingLifeGoals}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232] disabled:bg-gray-100"
              >
                <option value="">Select a life goal...</option>
                {lifeGoals.map((lg) => (
                  <option key={lg.id} value={lg.id}>
                    {lg.title}
                  </option>
                ))}
              </select>
              {lifeGoals.length === 0 && !loadingLifeGoals && (
                <p className="text-xs text-gray-600 mt-1">No life goals created yet. <a href="#" className="underline">Create one first</a></p>
              )}
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
                <option value="Percentage">Percentage (adherence)</option>
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

            {/* Percentage Goal Field - Only show if Percentage is selected */}
            {formData.unit === 'Percentage' && (
              <div>
                <label className="block text-sm mb-2 text-[#805232]">
                  Target Adherence % *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  value={percentageData.targetPercent}
                  onChange={(e) => setPercentageData({ targetPercent: e.target.value })}
                  placeholder="e.g., 80"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                />
                <p className="text-xs text-[#999] mt-1">
                  Goal is met when your average task adherence reaches this %.
                </p>
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
                  max={lastDayOfCurrentYear()}
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                />
                <p className="text-xs text-[#999] mt-1">Max: Dec 31 of current year</p>
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
