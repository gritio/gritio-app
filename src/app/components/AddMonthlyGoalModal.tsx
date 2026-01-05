import { useState } from 'react';
import { MonthlyGoal } from '../types';
import { X } from 'lucide-react';

interface AddMonthlyGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: string;
  goalTitle: string;
  onSave: (monthlyGoal: Omit<MonthlyGoal, 'id' | 'currentProgress' | 'status'>) => void;
}

export function AddMonthlyGoalModal({ isOpen, onClose, goalId, goalTitle, onSave }: AddMonthlyGoalModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    month: new Date().toISOString().slice(0, 7), // YYYY-MM format
    target: 1,
    unit: 'units',
    remarks: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create date object from YYYY-MM string
    const [year, month] = formData.month.split('-').map(Number);
    const monthDate = new Date(year, month - 1, 1);
    
    // Format month name
    const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    onSave({
      goalId,
      title: formData.title,
      month: monthName,
      monthDate,
      target: formData.target,
      unit: formData.unit,
      remarks: formData.remarks
    });
    
    // Reset form
    setFormData({
      title: '',
      month: new Date().toISOString().slice(0, 7),
      target: 1,
      unit: 'units',
      remarks: ''
    });
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2>Add Monthly Goal</h2>
            <p className="text-sm text-[#805232] mt-1">for goal: {goalTitle}</p>
          </div>
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
                Monthly Goal Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., January Weight Target, Q1 Reading Goal"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
            </div>
            
            {/* Month Picker */}
            <div>
              <label className="block text-sm mb-2 text-[#805232]">
                Month *
              </label>
              <input
                type="month"
                required
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
              <p className="text-xs text-[#805232] mt-1">
                Select the month for this goal
              </p>
            </div>
            
            {/* Target and Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-[#805232]">
                  Monthly Target *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.1"
                  value={formData.target}
                  onChange={(e) => setFormData({...formData, target: parseFloat(e.target.value) || 1})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2 text-[#805232]">
                  Unit *
                </label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  placeholder="e.g., KG, books, pages, hours"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
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
                placeholder="Any specific notes for this month's target..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
            </div>
            
            {/* Example */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-[#805232]">
                <strong>Example:</strong> This monthly goal will track progress toward <strong>{formData.target} {formData.unit}</strong> for the selected month.
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[#805232] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Monthly Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
