import { useState } from 'react';
import { Task, MeasurementType, Frequency } from '../types';
import { X } from 'lucide-react';
import { tasksApi } from '../services/api';

interface AddTaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: string;
  goalTitle: string;
  onSave: (task: Task) => void;
}

export function AddTaskPanel({ isOpen, onClose, goalId, goalTitle, onSave }: AddTaskPanelProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'number' as MeasurementType,
    frequency: 'daily' as Frequency,
    target: 1,
    unit: 'times',
    timesPerWeek: 1
  });

  const getCurrentAndRemainingMonths = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const remainingMonths = new Set<number>();
    for (let i = currentMonth; i < 12; i++) {
      remainingMonths.add(i);
    }
    return remainingMonths;
  };

  const [selectedMonths, setSelectedMonths] = useState<Set<number>>(getCurrentAndRemainingMonths());

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const handleTypeChange = (type: MeasurementType) => {
    let defaultUnit = 'units';
    if (type === 'number') defaultUnit = 'times';
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Months")
    console.log(Array.from(selectedMonths))
    const taskData = {
      goalId,
      ...formData,
      timesPerWeek: formData.frequency === 'weekly' ? formData.timesPerWeek : undefined,
      months: Array.from(selectedMonths)
    };
    
    try {
      const newTask = await tasksApi.createTask(taskData as any);
      onSave(newTask);
      resetForm();
      onClose();
    } catch (error: any) {
      console.error('Failed to create task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'number',
      frequency: 'daily',
      target: 1,
      unit: 'times',
      timesPerWeek: 1
    });
    setSelectedMonths(getCurrentAndRemainingMonths());
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
    <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#805232] to-[#6b4427] text-white p-6 flex items-center justify-between sticky top-0">
        <div>
          <h2 className="text-lg font-bold">Add New Task</h2>
          <p className="text-xs text-gray-200 mt-1">for {goalTitle}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Content */}
      <div className="overflow-y-auto h-[calc(100%-80px)] pb-20">
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-semibold">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Gym Attendance, Daily Steps, Reading Time"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
            />
          </div>
          
          {/* Measurement Type */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-semibold">
              Measurement Type *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => handleTypeChange(e.target.value as MeasurementType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
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
            <label className="block text-sm mb-2 text-[#805232] font-semibold">
              Frequency *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, frequency: 'daily'})}
                className={`px-3 py-2 border rounded-lg transition-all text-sm ${
                  formData.frequency === 'daily'
                    ? 'border-[#805232] bg-[#FFF5F0] text-[#805232] font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Daily
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, frequency: 'weekly'})}
                className={`px-3 py-2 border rounded-lg transition-all text-sm ${
                  formData.frequency === 'weekly'
                    ? 'border-[#805232] bg-[#FFF5F0] text-[#805232] font-semibold'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Times Per Week */}
          {showFrequencyWeeklyFields && (
            <div>
              <label className="block text-sm mb-2 text-[#805232] font-semibold">
                Times per Week *
              </label>
              <div className="flex items-center gap-3">
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
                  className="w-10 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
                />
              </div>
            </div>
          )}
          
          {/* Target and Unit */}
          {showTargetUnit && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-2 text-[#805232] font-semibold">
                  Target *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.target}
                  onChange={(e) => setFormData({...formData, target: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2 text-[#805232] font-semibold">
                  Unit *
                </label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  placeholder="e.g., days, mins, steps, km"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
                />
              </div>
            </div>
          )}
          
          {/* Example */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-[#805232]">
              <strong>Example:</strong> {getExampleText()}
            </p>
          </div>

          {/* Copy Task to Other Months */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#805232] border-t border-gray-200 pt-3 uppercase">
              Copy Task to Other Months
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {months.map((month, index) => (
                <label key={month} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMonths.has(index)}
                    onChange={() => toggleMonth(index)}
                    className="w-3 h-3 rounded accent-[#805232]"
                  />
                  <span className="text-xs text-gray-700">{month}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 italic mt-1">
              Task will be created in current month and any selected months
            </p>
          </div>
        </form>
      </div>

      {/* Footer Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[#805232] hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex-1 px-3 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors text-sm font-medium"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
