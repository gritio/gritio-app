import { useState, useEffect } from 'react';
import { Task, TaskProgressEntry, MeasurementType, Frequency } from '../types';
import { X } from 'lucide-react';
import { tasksApi } from '../services/api';

interface EditTaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskProgressEntry | null;
  goalTitle: string;
  onSave: (updated: Task) => void;
}

export function EditTaskPanel({ isOpen, onClose, task, goalTitle, onSave }: EditTaskPanelProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'number' as MeasurementType,
    frequency: 'daily' as Frequency,
    target: 1,
    unit: 'times',
    timesPerWeek: 1,
  });
  const [originalType, setOriginalType] = useState<MeasurementType>('number');
  const [originalFrequency, setOriginalFrequency] = useState<Frequency>('daily');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task && isOpen) {
      const type = task.type.toLowerCase() as MeasurementType;
      const frequency = task.frequency.toLowerCase() as Frequency;
      setFormData({
        title: task.title,
        type,
        frequency,
        target: task.target,
        unit: task.unit,
        timesPerWeek: task.timesPerWeek ?? 1,
      });
      setOriginalType(type);
      setOriginalFrequency(frequency);
      setError(null);
    }
  }, [task, isOpen]);

  const handleTypeChange = (type: MeasurementType) => {
    let defaultUnit = formData.unit;
    if (type === 'number') defaultUnit = 'times';
    if (type === 'time') defaultUnit = 'mins';
    if (type === 'steps') defaultUnit = 'steps';
    if (type === 'distance') defaultUnit = 'km';
    setFormData({ ...formData, type, unit: defaultUnit });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await tasksApi.updateTask(task.taskId, {
        title: formData.title,
        type: formData.type,
        frequency: formData.frequency,
        target: formData.type !== 'number' ? formData.target : undefined,
        unit: formData.type !== 'number' ? formData.unit : undefined,
        timesPerWeek: formData.frequency === 'weekly' ? formData.timesPerWeek : undefined,
      });
      onSave(updated);
      onClose();
    } catch (err: any) {
      setError('Failed to save task. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const showTargetUnit = formData.type !== 'number';
  const showTimesPerWeek = formData.frequency === 'weekly';
  const hasStructuralChange = formData.type !== originalType || formData.frequency !== originalFrequency;

  if (!isOpen || !task) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 z-40 translate-x-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#805232] to-[#6b4427] text-white p-6 flex items-center justify-between sticky top-0">
        <div>
          <h2 className="text-lg font-bold">Edit Task</h2>
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
      <div className="overflow-y-auto h-[calc(100%-80px)] pb-28">
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-semibold">Task Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
            />
          </div>

          {/* Measurement Type */}
          <div>
            <label className="block text-sm mb-2 text-[#805232] font-semibold">Measurement Type *</label>
            <select
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
            <label className="block text-sm mb-2 text-[#805232] font-semibold">Frequency *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, frequency: 'daily' })}
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
                onClick={() => setFormData({ ...formData, frequency: 'weekly' })}
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
          {showTimesPerWeek && (
            <div>
              <label className="block text-sm mb-2 text-[#805232] font-semibold">Times per Week *</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={formData.timesPerWeek}
                  onChange={(e) => setFormData({ ...formData, timesPerWeek: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#805232]"
                />
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={formData.timesPerWeek}
                  onChange={(e) => setFormData({ ...formData, timesPerWeek: Math.min(7, Math.max(1, parseInt(e.target.value) || 1)) })}
                  className="w-10 px-2 py-1 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
                />
              </div>
            </div>
          )}

          {/* Target and Unit */}
          {showTargetUnit && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-2 text-[#805232] font-semibold">Target *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: parseFloat(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-[#805232] font-semibold">Unit *</label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g., km, mins, steps"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
                />
              </div>
            </div>
          )}

          {/* Structural change warning */}
          {hasStructuralChange && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>Heads up:</strong> Changing type or frequency will recalculate YTD progress from existing logs. Historical data is preserved.
              </p>
            </div>
          )}

          {/* Error */}
          {error && <p className="text-xs text-red-600">{error}</p>}
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[#805232] hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="flex-1 px-3 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors text-sm font-medium disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
