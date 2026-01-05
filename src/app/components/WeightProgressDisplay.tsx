import { useState } from 'react';
import { WeightProgressModal } from './WeightProgressModal';

interface WeightProgressDisplayProps {
  currentWeight: number;
  startWeight: number;
  targetWeight: number;
  onUpdate: (newWeight: number) => void;
}

export function WeightProgressDisplay({
  currentWeight,
  startWeight,
  targetWeight,
  onUpdate
}: WeightProgressDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalDistance = startWeight - targetWeight;
  const distanceCovered = startWeight - currentWeight;
  const progressPercentage = (distanceCovered / totalDistance) * 100;
  const clampedProgress = Math.min(Math.max(progressPercentage, 0), 100);

  const lostWeight = startWeight - currentWeight;
  const remainingWeight = currentWeight - targetWeight;

  return (
    <>
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-25 rounded-lg">
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-[#805232] mb-3">Weight Progress</h4>

          {/* Progress Bar with Start and Target Labels */}
          <div className="relative mb-6">
            <div className="flex items-center justify-between text-xs text-[#805232] mb-2">
              <span className="font-medium">{startWeight}kg</span>
              <span className="font-medium">{targetWeight}kg</span>
            </div>

            {/* Main Progress Bar */}
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r from-orange-400 to-green-500`}
                style={{ width: `${clampedProgress}%` }}
              />

              {/* Current Position Marker */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#805232] transition-all duration-500"
                style={{ left: `${clampedProgress}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 w-4 h-4 bg-[#805232] rounded-full border-2 border-white" />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-[#805232] mb-1">Lost</p>
              <p className="text-lg font-bold text-green-600">
                {lostWeight > 0 ? lostWeight.toFixed(1) : '0'}kg
              </p>
            </div>
            <div>
              <p className="text-xs text-[#805232] mb-1">Progress</p>
              <p className="text-lg font-bold text-[#805232]">
                {clampedProgress.toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-[#805232] mb-1">Remaining</p>
              <p className="text-lg font-bold text-amber-600">
                {remainingWeight > 0 ? remainingWeight.toFixed(1) : '0'}kg
              </p>
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Update Weight
          </button>
        </div>
      </div>

      <WeightProgressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentWeight={currentWeight}
        startWeight={startWeight}
        targetWeight={targetWeight}
        onUpdate={onUpdate}
      />
    </>
  );
}
