import { useState, useEffect } from 'react';
import { Goal, LifeGoal } from '../types';
import { X, Trash2 } from 'lucide-react';
import { goalsApi, lifeGoalsApi } from '../services/api';

interface GoalEditPanelProps {
  goal: Goal | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
}

export function GoalEditPanel({ goal, isOpen, onClose, onSave, onDelete }: GoalEditPanelProps) {
  const [formData, setFormData] = useState<Goal | null>(goal);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>([]);
  const [loadingLifeGoals, setLoadingLifeGoals] = useState(false);

  useEffect(() => {
    if (goal) {
      setFormData(goal);
      setError(null);
    }
  }, [goal]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updateData: any = {
        title: formData.title,
        remarks: formData.remarks,
        lifeGoalId: formData.lifeGoalId || undefined,
      };

      // Kilogram goals always stay LOGS; for others, send the chosen mode.
      if (formData.unit !== 'Kilogram' && formData.progressSource) {
        updateData.progressSource = formData.progressSource;
      }

      if (formData.unit === 'Kilogram' && formData.weightGoal) {
        updateData.weightGoal = {
          startWeight: formData.weightGoal.startWeight,
          currentWeight: formData.weightGoal.currentWeight,
          targetWeight: formData.weightGoal.targetWeight,
        };
      } else if (formData.unit === 'Count' && formData.countGoal) {
        updateData.countGoal = {
          targetCount: formData.countGoal.targetCount,
        };
      } else if (formData.unit === 'Time' && formData.timeGoal) {
        updateData.timeGoal = {
          targetHours: formData.timeGoal.targetHours,
          targetMinutes: formData.timeGoal.targetMinutes || 0,
        };
      }
      
      const updatedGoal = await goalsApi.updateGoal(formData.id, updateData);
      onSave(updatedGoal);
      onClose();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update goal';
      console.error('Goal update error:', errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (formData) {
      onDelete(formData.id);
      setShowDeleteConfirm(false);
      onClose();
    }
  };

  if (!formData) return null;

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-0 h-screen w-96 bg-[#DCDCDC] shadow-2xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="sticky top-0 bg-[#DCDCDC] border-b border-[#B8B9BA] p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#805232]">Edit Goal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-bold">
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
            <label className="block text-sm mb-2 text-[#805232] font-bold">
              Link to Life Goal (Optional)
            </label>
            <select
              value={formData.lifeGoalId || ''}
              onChange={(e) => setFormData({...formData, lifeGoalId: e.target.value || undefined})}
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
          </div>
          
          {/* Area - Read Only */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-bold">
              Area
            </label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-[#805232] flex items-center">
              {formData.area}
            </div>
          </div>
          
          {/* Unit - Read Only */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-bold">
              Unit
            </label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-[#805232] flex items-center">
              {formData.unit}
            </div>
          </div>
          
          {/* Progress tracking mode - hidden for Kilogram (always LOGS) */}
          {(formData.unit === 'Count' || formData.unit === 'Time') && (
            <div className="border border-[#B8B9BA] rounded-lg p-4 bg-[#FAFAFA]">
              <label className="block text-sm mb-3 text-[#805232] font-bold">
                Track progress by *
              </label>
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="editProgressSource"
                    value="TASKS"
                    checked={formData.progressSource === 'TASKS'}
                    onChange={() => setFormData({ ...formData, progressSource: 'TASKS' })}
                    className="mt-1 accent-[#805232]"
                  />
                  <div>
                    <div className="text-sm font-medium text-[#805232]">From weekly/daily tasks</div>
                    <div className="text-xs text-[#999]">Progress aggregated from task completions</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="editProgressSource"
                    value="LOGS"
                    checked={formData.progressSource === 'LOGS'}
                    onChange={() => setFormData({ ...formData, progressSource: 'LOGS' })}
                    className="mt-1 accent-[#805232]"
                  />
                  <div>
                    <div className="text-sm font-medium text-[#805232]">Log entries manually</div>
                    <div className="text-xs text-[#999]">Add entries as they happen</div>
                  </div>
                </label>
              </div>
              <p className="text-xs text-[#805232] mt-3">
                Switching changes how progress is calculated. Existing tasks and logs are preserved.
              </p>
            </div>
          )}

          {/* Current Weight - Only show if Kilogram is selected */}
          {formData.unit === 'Kilogram' && (
            <div>
              <label className="block text-sm mb-2 text-[#805232] font-bold">
                Current Weight (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.weightGoal?.currentWeight || ''}
                onChange={(e) => {
                  const currentWeight = parseFloat(e.target.value) || 0;
                  if (formData) {
                    setFormData({
                      ...formData,
                      weightGoal: {
                        ...(formData.weightGoal || { startWeight: 0, currentWeight: 0, targetWeight: 0 }),
                        currentWeight
                      }
                    });
                  }
                }}
                placeholder="e.g., 80.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
              />
            </div>
          )}
          
          {/* Count Goal Field - Only show if Count is selected */}
          {formData.unit === 'Count' && (
            <div>
              <label className="block text-sm mb-2 text-[#805232] font-bold">
                Target Count *
              </label>
              <input
                type="number"
                required
                value={formData.countGoal?.targetCount || ''}
                onChange={(e) => {
                  const targetCount = parseInt(e.target.value) || 0;
                  if (formData) {
                    setFormData({
                      ...formData,
                      countGoal: {
                        ...formData.countGoal,
                        targetCount
                      }
                    });
                  }
                }}
                placeholder="e.g., 24"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
              />
            </div>
          )}

          {/* Time Goal Fields - Only show if Time is selected */}
          {formData.unit === 'Time' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-[#805232] font-bold">
                  Target Hours *
                </label>
                <input
                  type="number"
                  required
                  value={formData.timeGoal?.targetHours || ''}
                  onChange={(e) => {
                    const targetHours = parseInt(e.target.value) || 0;
                    if (formData) {
                      setFormData({
                        ...formData,
                        timeGoal: {
                          ...formData.timeGoal,
                          targetHours,
                          targetMinutes: formData.timeGoal?.targetMinutes || 0
                        }
                      });
                    }
                  }}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-[#805232] font-bold">
                  Target Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formData.timeGoal?.targetMinutes || ''}
                  onChange={(e) => {
                    const targetMinutes = parseInt(e.target.value) || 0;
                    if (formData) {
                      setFormData({
                        ...formData,
                        timeGoal: {
                          ...formData.timeGoal,
                          targetHours: formData.timeGoal?.targetHours || 0,
                          targetMinutes
                        }
                      });
                    }
                  }}
                  placeholder="e.g., 30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
                />
              </div>
            </div>
          )}
          
          {/* Dates - Read Only */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-[#805232] font-bold">
                Start Date
              </label>
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-[#805232] flex items-center">
                {formData.startDate ? (formData.startDate instanceof Date ? formData.startDate.toISOString().split('T')[0] : String(formData.startDate).split('T')[0]) : ''}
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-2 text-[#805232] font-bold">
                End Date
              </label>
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-[#805232] flex items-center">
                {formData.endDate ? (formData.endDate instanceof Date ? formData.endDate.toISOString().split('T')[0] : String(formData.endDate).split('T')[0]) : ''}
              </div>
            </div>
          </div>
          
          {/* Remarks */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-bold">
              Remarks (Optional)
            </label>
            <textarea
              value={formData.remarks || ''}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              placeholder="Any notes or reminders for this goal..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
            />
          </div>
        </form>

        {/* Error Display */}
        {error && (
          <div className="mx-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 space-y-4 px-6 pb-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-[#DCDCDC] text-[#805232] rounded-lg border border-[#805232] hover:bg-[#DCDCDC] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
          
          {/* Delete Button */}
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete Goal
          </button>
        </div>
      </div>


      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <div className="bg-[#DCDCDC] border border-[#B8B9BA] rounded-lg p-6 max-w-sm mx-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#805232]">Delete Goal?</h3>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[#805232] mb-6">
              Are you sure you want to delete "{formData.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-[#DCDCDC] text-[#805232] rounded-lg hover:bg-[#DCDCDC] transition-colors font-medium border border-[#805232]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
