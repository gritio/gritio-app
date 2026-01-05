import { useState } from 'react';
import { X } from 'lucide-react';

interface WeightProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeight: number;
  startWeight: number;
  targetWeight: number;
  onUpdate: (newWeight: number) => void;
}

export function WeightProgressModal({
  isOpen,
  onClose,
  currentWeight,
  startWeight,
  targetWeight,
  onUpdate
}: WeightProgressModalProps) {
  const [newWeight, setNewWeight] = useState(currentWeight);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(newWeight);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#805232]">Update Weight</h2>
          <button
            onClick={onClose}
            className="text-[#805232] hover:text-[#805232] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#805232] mb-2">
                Current Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={newWeight}
                onChange={(e) => setNewWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-[#805232]">
                <div className="mb-2">
                  <strong>Start:</strong> {startWeight}kg
                </div>
                <div className="mb-2">
                  <strong>Target:</strong> {targetWeight}kg
                </div>
                <div className="pt-2 border-t border-blue-200">
                  {newWeight < startWeight ? (
                    <div className="text-green-600 font-semibold">
                      ✓ Lost {(startWeight - newWeight).toFixed(1)}kg
                    </div>
                  ) : (
                    <div className="text-amber-600 font-semibold">
                      {(newWeight - startWeight).toFixed(1)}kg gained
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
