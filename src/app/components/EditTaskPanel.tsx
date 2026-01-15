import { useState, useEffect } from 'react';
import { Task, MeasurementType, Frequency } from '../types';
import { X } from 'lucide-react';
import { tasksApi } from '../services/api';

interface EditTaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (task: Task) => void;
}

export function EditTaskPanel({ isOpen, onClose, task, onSave }: EditTaskPanelProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'number' as MeasurementType,
    frequency: 'daily' as Frequency,
    target: 1,
    unit: 'times',
    timesPerWeek: 1
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTaskData = async () => {
      if (task && isOpen) {
        try {
          console.log('EditTaskPanel: Loading task with id:', task.id);
          const fullTask = await tasksApi.getTask(task.id);
          console.log('EditTaskPanel: Loaded full task:', fullTask);
          const typeValue = fullTask.type?.toLowerCase() as MeasurementType || 'number';
          const freqValue = fullTask.frequency?.toLowerCase() as Frequency || 'daily';
          console.log('EditTaskPanel: Normalized type:', typeValue, 'frequency:', freqValue);
          setFormData({
            title: fullTask.title || '',
            type: typeValue,
            frequency: freqValue,
            target: fullTask.target || 1,
            unit: fullTask.unit || 'times',
            timesPerWeek: fullTask.timesPerWeek || 1
          });
          console.log('EditTaskPanel: Form data set to:', {
            title: fullTask.title,
            type: typeValue,
            frequency: freqValue,
            target: fullTask.target,
            unit: fullTask.unit,
            timesPerWeek: fullTask.timesPerWeek
          });
        } catch (err) {
          console.error('Failed to load task:', err);
          console.log('EditTaskPanel: Using fallback from passed task:', task);
          setFormData({
            title: task.title,
            type: task.type as MeasurementType,
            frequency: task.frequency as Frequency,
            target: task.target,
            unit: task.unit || 'times',
            timesPerWeek: task.timesPerWeek || 1
          });
        }
        setError(null);
      }
    };
    loadTaskData();
  }, [task, isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task) return;

    const updateData = {
      title: formData.title,
      type: formData.type,
      frequency: formData.frequency,
      target: formData.target,
      unit: formData.unit,
      timesPerWeek: formData.frequency === 'weekly' ? formData.timesPerWeek : undefined
    };
    
    try {
      setIsLoading(true);
      setError(null);
      const updatedTask = await tasksApi.updateTask(task.id, updateData as any);
      onSave(updatedTask);
      onClose();
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update task';
      console.error('Failed to update task:', err);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !task) return null;

  const showNumberTypeSpecificFields = formData.type === 'number';
  const showFrequencyWeeklyFields = formData.frequency === 'weekly';
  const showTargetUnit = formData.type !== 'number';

  return (
    <div className={`fixed right-0 top-0 h-screen w-96 bg-gray-100 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="sticky top-0 bg-gray-100 border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Task Name</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="e.g., Gym Session"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Task Type</label>
          <div className="space-y-2">
            {(['number', 'steps', 'distance', 'time'] as MeasurementType[]).map((type) => (
              <label key={type} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderColor: formData.type === type ? '#805232' : '', backgroundColor: formData.type === type ? '#f5f1ed' : '' }}>
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={formData.type === type}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-900">
                  {type === 'number' ? 'Simple Checkbox' : type === 'steps' ? 'Steps' : type === 'distance' ? 'Distance' : 'Time'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {!showNumberTypeSpecificFields && (
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Target Per Session</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: parseFloat(e.target.value) || 0})}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                required
              />
              <input
                type="text"
                value={formData.unit}
                disabled
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Frequency</label>
          <div className="space-y-2">
            {(['daily', 'weekly'] as Frequency[]).map((freq) => (
              <label key={freq} 
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderColor: formData.frequency === freq ? '#805232' : '', backgroundColor: formData.frequency === freq ? '#f5f1ed' : '' }}>
                <input
                  type="radio"
                  name="frequency"
                  value={freq}
                  checked={formData.frequency === freq}
                  onChange={() => setFormData({...formData, frequency: freq})}
                  className="w-4 h-4"
                  disabled={showNumberTypeSpecificFields && freq === 'weekly'}
                />
                <span className="text-sm font-medium text-gray-900">
                  {freq === 'daily' ? 'Daily' : 'Weekly'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {showFrequencyWeeklyFields && (
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Times Per Week</label>
            <input
              type="number"
              min="1"
              max="7"
              value={formData.timesPerWeek}
              onChange={(e) => setFormData({...formData, timesPerWeek: parseInt(e.target.value) || 1})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>
        )}

        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
