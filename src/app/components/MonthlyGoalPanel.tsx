import { useState, useEffect } from 'react';
import { MonthlyGoal } from '../types';
import { X, Save } from 'lucide-react';

interface MonthlyGoalPanelProps {
  goalId: string;
  goalTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (monthlyGoal: Omit<MonthlyGoal, 'id' | 'currentProgress' | 'status'>) => void;
}

export function MonthlyGoalPanel({ goalId, goalTitle, isOpen, onClose, onSave }: MonthlyGoalPanelProps) {
  const [formData, setFormData] = useState({
    title: '',
    month: new Date().toISOString().slice(0, 7),
    target: 1,
    unit: 'units',
    remarks: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, month: e.target.value });
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, target: parseFloat(e.target.value) || 1 });
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, unit: e.target.value });
  };

  const handleRemarksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, remarks: e.target.value });
  };

  const handleSave = async () => {
    const [year, month] = formData.month.split('-').map(Number);
    const monthDate = new Date(year, month - 1, 1);
    const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onSave({
      goalId,
      title: formData.title,
      month: monthName,
      monthDate,
      target: formData.target,
      unit: formData.unit,
      remarks: formData.remarks
    });
    
    setIsSaving(false);
    setFormData({
      title: '',
      month: new Date().toISOString().slice(0, 7),
      target: 1,
      unit: 'units',
      remarks: ''
    });
    onClose();
  };

  return (
    <>
      {/* Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-[#805232]">Add Monthly Goal</h2>
            <p className="text-sm text-[#805232] mt-1">for goal: {goalTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#805232] hover:text-[#805232] p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#805232] mb-2">
              Monthly Goal Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g., January Weight Target, Q1 Reading Goal"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
            />
          </div>

          {/* Month */}
          <div>
            <label className="block text-sm font-medium text-[#805232] mb-2">
              Month
            </label>
            <input
              type="month"
              value={formData.month}
              onChange={handleMonthChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
            />
            <p className="text-xs text-[#805232] mt-1">
              Select the month for this goal
            </p>
          </div>

          {/* Target and Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#805232] mb-2">
                Monthly Target
              </label>
              <input
                type="number"
                min="1"
                step="0.1"
                value={formData.target}
                onChange={handleTargetChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#805232] mb-2">
                Unit
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={handleUnitChange}
                placeholder="e.g., KG, books, pages"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-[#805232] mb-2">
              Remarks (Optional)
            </label>
            <textarea
              value={formData.remarks}
              onChange={handleRemarksChange}
              rows={3}
              placeholder="Any specific notes for this month's target..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
            />
          </div>

          {/* Example */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-[#805232]">
              <strong>Example:</strong> This monthly goal will track progress toward <strong>{formData.target} {formData.unit}</strong> for the selected month.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 space-y-3">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Add Monthly Goal
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-[#805232] px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
