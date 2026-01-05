import { useState } from 'react';
import { Task, MeasurementType, Frequency } from '../types';
import { X } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: string;
  goalTitle: string;
  onSave: (task: Omit<Task, 'id' | 'currentProgress' | 'lastUpdated' | 'completionHistory'>) => void;
}

export function AddTaskModal({ isOpen, onClose, goalId, goalTitle, onSave }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'number' as MeasurementType,
    frequency: 'daily' as Frequency,
    target: 1,
    unit: 'days',
    timesPerWeek: 1
  });

  const [selectedMonths, setSelectedMonths] = useState<Set<number>>(new Set());

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const handleTypeChange = (type: MeasurementType) => {
    let defaultUnit = 'units';
    if (type === 'time') defaultUnit = 'mins';
    if (type === 'steps') defaultUnit = 'steps';
    if (type === 'distance') defaultUnit = 'km';
    
    const newData = {...formData, type, unit: defaultUnit};
    if (type === 'number') {
      newData.frequency = 'daily';
    }
    setFormData(newData);
  };

  const toggleMonth = (monthIndex: number) => {
    const newSelected = new Set(selectedMonths);
    if (newSelected.has(monthIndex)) {
      newSelected.delete(monthIndex);
    } else {
      newSelected.add(monthIndex);
    }
    setSelectedMonths(newSelected);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = {
      goalId,
      ...formData,
      timesPerWeek: formData.frequency === 'weekly' ? formData.timesPerWeek : undefined
    };
    onSave(taskData as any);
    setFormData({
      title: '',
      type: 'number',
      frequency: 'daily',
      target: 1,
      unit: 'days',
      timesPerWeek: 1
    });
    setSelectedMonths(new Set());
    onClose();
  };

  const showNumberTypeSpecificFields = formData.type === 'number';
  const showFrequencyWeeklyFields = formData.frequency === 'weekly';
  const showTargetUnit = formData.type !== 'number';

  const getExampleText = (): string => {
    if (showNumberTypeSpecificFields) {
      if (formData.frequency === 'daily') {
        return `Track once per day`;
      } else {
        return `Track ${formData.timesPerWeek} times per week`;
      }
    }
    
    const freqText = formData.frequency === 'daily' ? 'per day' : `per session, ${formData.timesPerWeek}x per week`;
    return `Track ${formData.target} ${formData.unit} ${freqText}`;
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2>Add New Task</h2>
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
                Task Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Gym Attendance, Daily Steps, Reading Time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
            </div>
            
            {/* Measurement Type */}
            <div>
              <label className="block text-sm mb-2 text-[#805232]">
                Measurement Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value as MeasurementType)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              >
                <option value="number">Number (countable items)</option>
                <option value="time">Time (minutes/hours)</option>
                <option value="steps">Steps (activity)</option>
                <option value="distance">Distance (km/miles)</option>
              </select>
              <p className="text-xs text-[#805232] mt-1">
                {formData.type === 'number' && 'e.g., gym days, books read, sessions completed'}
                {formData.type === 'time' && 'e.g., reading time, workout duration, study time'}
                {formData.type === 'steps' && 'e.g., daily steps, weekly step goal'}
                {formData.type === 'distance' && 'e.g., running distance, walking distance'}
              </p>
            </div>
            
            {/* Frequency */}
            <div>
              <label className="block text-sm mb-2 text-[#805232]">
                Frequency *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, frequency: 'daily'})}
                  className={`px-4 py-3 border rounded-lg transition-all ${
                    formData.frequency === 'daily'
                      ? 'border-[#805232] bg-[#FFF5F0] text-[#805232]'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Daily
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, frequency: 'weekly'})}
                  className={`px-4 py-3 border rounded-lg transition-all ${
                    formData.frequency === 'weekly'
                      ? 'border-[#805232] bg-[#FFF5F0] text-[#805232]'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>

            {/* Times Per Week - Only for Weekly + Non-Number types OR Number Weekly */}
            {showFrequencyWeeklyFields && (
              <div>
                <label className="block text-sm mb-2 text-[#805232]">
                  Times per Week *
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={formData.timesPerWeek}
                    onChange={(e) => setFormData({...formData, timesPerWeek: parseInt(e.target.value)})}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#805232]"
                  />
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={formData.timesPerWeek}
                    onChange={(e) => setFormData({...formData, timesPerWeek: Math.min(7, Math.max(1, parseInt(e.target.value) || 1))})}
                    className="w-12 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#805232]"
                  />
                </div>
              </div>
            )}
            
            {/* Target and Unit - Only show if needed */}
            {showTargetUnit && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-[#805232]">
                    Target *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: parseInt(e.target.value) || 1})}
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
                    placeholder="e.g., days, mins, steps, km"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                  />
                </div>
              </div>
            )}
            
            {/* Example */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-[#805232]">
                <strong>Example:</strong> {getExampleText()}
              </p>
            </div>

            {/* Copy Task to Other Months */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#805232] border-t-2 border-gray-200 pt-4">
                Copy Task to Other Months
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {months.map((month, index) => (
                  <label key={month} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMonths.has(index)}
                      onChange={() => toggleMonth(index)}
                      className="w-4 h-4 rounded accent-[#805232]"
                    />
                    <span className="text-xs text-gray-700 font-medium">{month}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic">
                Task will be created in the current month and any selected months above
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
              className="flex-1 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}