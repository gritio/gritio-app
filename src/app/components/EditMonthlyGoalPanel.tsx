import { useState, useEffect } from 'react';
import { MonthlyGoal } from '../types';
import { X, Trash2 } from 'lucide-react';
import { monthlyGoalsApi } from '../services/api';

interface EditMonthlyGoalPanelProps {
  monthlyGoal: MonthlyGoal | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedGoal: MonthlyGoal) => void;
  onDelete: (monthlyGoalId: string) => void;
}

export function EditMonthlyGoalPanel({ monthlyGoal, isOpen, onClose, onSave, onDelete }: EditMonthlyGoalPanelProps) {
  const [formData, setFormData] = useState<MonthlyGoal | null>(monthlyGoal);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (monthlyGoal) {
      setFormData(monthlyGoal);
      setError(null);
    }
  }, [monthlyGoal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsLoading(true);
    setError(null);

    try {
      const updateData = {
        title: formData.title,
        target: Number(formData.target),
        currentProgress: Number(formData.currentProgress),
        remarks: formData.remarks,
      };
      
      console.log('EditMonthlyGoalPanel - Sending updateData:', updateData);

      const updatedGoal = await monthlyGoalsApi.updateMonthlyGoal(formData.id, updateData);
      console.log('EditMonthlyGoalPanel - Response from API:', updatedGoal);
      onSave(updatedGoal);
      console.log('Parent goal should be updated by backend automatically');
      onClose();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update monthly goal';
      console.error('Monthly goal update error:', errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!formData) return;

    setIsLoading(true);
    setError(null);

    try {
      await monthlyGoalsApi.deleteMonthlyGoal(formData.id);
      onDelete(formData.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to delete monthly goal';
      console.error('Monthly goal delete error:', errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData) return null;

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-0 h-screen w-96 bg-[#DCDCDC] shadow-2xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="sticky top-0 bg-[#DCDCDC] border-b border-[#B8B9BA] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#805232]">Edit Monthly Goal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
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
              placeholder="e.g., January Weight Target"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
            />
          </div>

          {/* Month - Read Only */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-bold">
              Month
            </label>
            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-[#805232] flex items-center">
              {formData.month}
            </div>
          </div>

          {/* Target */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-bold">
              Target *
            </label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: parseFloat(e.target.value) || 0})}
              placeholder="e.g., 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
            />
          </div>

          {/* Current Progress */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-bold">
              {formData.unit === 'Kilogram' ? 'Current Weight (kg)' : `Current Progress (${formData.unit})`} *
            </label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.currentProgress}
              onChange={(e) => setFormData({...formData, currentProgress: parseFloat(e.target.value) || 0})}
              placeholder={formData.unit === 'Kilogram' ? 'e.g., 75.5' : 'e.g., 2'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-[#805232]"
            />
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

          {/* Remarks */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-bold">
              Remarks (Optional)
            </label>
            <textarea
              value={formData.remarks || ''}
              onChange={(e) => setFormData({...formData, remarks: e.target.value})}
              placeholder="Any notes or reminders for this monthly goal..."
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
            Delete Monthly Goal
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <div className="bg-[#DCDCDC] border border-[#B8B9BA] rounded-lg p-6 max-w-sm mx-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#805232]">Delete Monthly Goal?</h3>
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
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-[#DCDCDC] text-[#805232] rounded-lg hover:bg-[#DCDCDC] transition-colors font-medium border border-[#805232] disabled:opacity-50 disabled:cursor-not-allowed"
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
