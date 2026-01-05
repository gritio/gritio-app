import { useState, useEffect } from 'react';
import { Task } from '../types';
import { X, Plus, Minus, Save } from 'lucide-react';
import { formatTaskValue } from '../utils/calculations';

interface UpdateProgressPanelProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (taskId: string, newProgress: number) => void;
}

export function UpdateProgressPanel({ isOpen, onClose, task, onSave }: UpdateProgressPanelProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (task) {
      setProgress(task.currentProgress);
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = () => {
    onSave(task.id, progress);
    onClose();
  };

  const increment = () => {
    const step = task.type === 'time' ? 5 : task.type === 'steps' ? 1000 : 1;
    setProgress(Math.min(progress + step, task.target * 2));
  };

  const decrement = () => {
    const step = task.type === 'time' ? 5 : task.type === 'steps' ? 1000 : 1;
    setProgress(Math.max(progress - step, 0));
  };

  const handleQuickSet = (percentage: number) => {
    setProgress(Math.round((task.target * percentage) / 100));
  };

  const completionPercentage = Math.round((progress / task.target) * 100);

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
            <h2 className="text-xl font-semibold text-[#805232]">Update Progress</h2>
            <p className="text-sm text-[#805232] mt-1">{task.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#805232] hover:text-[#805232] p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Current Progress Display */}
          <div className="text-center bg-gray-50 rounded-lg p-6">
            <div className="text-6xl font-bold mb-2 text-blue-600">
              {progress}
            </div>
            <div className="text-[#805232]">
              {task.unit} of {task.target} ({completionPercentage}%)
            </div>
          </div>

          {/* Progress Bar Preview */}
          <div>
            <div className="text-sm text-[#805232] mb-2">Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  completionPercentage >= 100 ? 'bg-green-500' : 
                  completionPercentage >= 70 ? 'bg-blue-500' : 
                  'bg-amber-500'
                }`}
                style={{ width: `${Math.min(completionPercentage, 100)}%` }}
              />
            </div>
            <div className="text-xs text-[#805232] mt-1">{completionPercentage}% Complete</div>
          </div>

          {/* Increment/Decrement Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={decrement}
              className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-6 h-6 text-[#805232]" />
            </button>

            <div className="flex-1">
              <input
                type="number"
                value={progress}
                onChange={(e) => setProgress(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                min="0"
              />
            </div>

            <button
              type="button"
              onClick={increment}
              className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              <Plus className="w-6 h-6 text-[#805232]" />
            </button>
          </div>

          {/* Quick Set Buttons */}
          <div>
            <div className="text-sm font-medium text-[#805232] mb-2">Quick Set:</div>
            <div className="grid grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSet(0)}
                className="px-2 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                0%
              </button>
              <button
                type="button"
                onClick={() => handleQuickSet(25)}
                className="px-2 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => handleQuickSet(50)}
                className="px-2 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => handleQuickSet(75)}
                className="px-2 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => handleQuickSet(100)}
                className="px-2 py-2 text-sm border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                100%
              </button>
            </div>
          </div>

          {/* Target Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-[#805232]">
              <strong>Target:</strong> {formatTaskValue(task.target, task.unit)} per {task.frequency === 'daily' ? 'day' : 'week'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 space-y-3">
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Progress
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
