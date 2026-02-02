import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { LifeGoal } from '../types';
import { lifeGoalsApi } from '../services/api';

interface LifeGoalsPageProps {
  isKidsMode?: boolean;
}

export function LifeGoalsPage({ isKidsMode }: LifeGoalsPageProps = {}) {
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchLifeGoals();
  }, []);

  const fetchLifeGoals = async () => {
    try {
      setLoading(true);
      const data = await lifeGoalsApi.getLifeGoals();
      setLifeGoals(data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch life goals:', err);
      setError('Failed to load life goals');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setFormData({ title: '', description: '' });
  };

  const handleEdit = (lifeGoal: LifeGoal) => {
    setEditingId(lifeGoal.id);
    setFormData({ title: lifeGoal.title, description: lifeGoal.description || '' });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      if (editingId) {
        await lifeGoalsApi.updateLifeGoal(editingId, formData);
      } else {
        await lifeGoalsApi.createLifeGoal(formData);
      }
      await fetchLifeGoals();
      setIsAddingNew(false);
      setEditingId(null);
      setFormData({ title: '', description: '' });
      setError(null);
    } catch (err: any) {
      console.error('Failed to save life goal:', err);
      const errorMsg = err.response?.data?.message || 'Failed to save life goal';
      setError(errorMsg);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this life goal?')) {
      try {
        await lifeGoalsApi.deleteLifeGoal(id);
        await fetchLifeGoals();
        setError(null);
      } catch (err: any) {
        console.error('Failed to delete life goal:', err);
        setError('Failed to delete life goal');
      }
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({ title: '', description: '' });
  };

  const canAddMore = lifeGoals.length < 5;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#805232] mb-4"></div>
          <p className="text-[#805232] font-medium">Loading life goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4 md:py-8">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${isKidsMode ? 'text-[#00FF00]' : 'text-[#805232]'}`}>Life Goals</h1>
        <p className={`text-xs sm:text-sm md:text-base ${isKidsMode ? 'text-[#00FF00]' : 'text-[#805232]'}`}>Define up to 5 life goals that guide your yearly objectives</p>
      </div>

      {error && (
        <div className="mb-4 sm:mb-6 p-2 sm:p-3 md:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-xs sm:text-sm">
          {error}
        </div>
      )}

      {(isAddingNew || editingId) && (
        <div className="mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-6 bg-[#F5F5F5] rounded-lg border-2 border-[#805232]">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#805232] mb-3 sm:mb-4">
            {editingId ? 'Edit Life Goal' : 'Add New Life Goal'}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-[#805232] font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Health & Wellness"
                className="w-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232]"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-[#805232] font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Focus on physical fitness, nutrition, and mental wellbeing"
                rows={3}
                className="w-full px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232]"
              />
            </div>
            <div className="flex gap-2 sm:gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-3 sm:px-4 md:px-6 py-1 sm:py-2 text-xs sm:text-sm bg-[#DCDCDC] text-[#805232] rounded-lg hover:bg-[#C0C0C0] transition-colors font-medium border border-[#805232]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 sm:px-4 md:px-6 py-1 sm:py-2 text-xs sm:text-sm bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        {lifeGoals.length === 0 ? (
          <div className="text-center py-8 sm:py-10 md:py-12 bg-[#F5F5F5] rounded-lg">
            <p className="text-sm sm:text-base md:text-lg text-[#805232] mb-3 sm:mb-4">No life goals yet</p>
            {canAddMore && (
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-6 py-1 sm:py-2 text-xs sm:text-sm bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium"
              >
                <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
                Create First Life Goal
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3 sm:mb-4">
              <p className={`text-xs sm:text-sm font-medium ${isKidsMode ? 'text-[#00FF00]' : 'text-[#805232]'}`}>
                {lifeGoals.length} of 5 life goals created
              </p>
              {canAddMore && (
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium text-xs sm:text-sm"
                >
                  <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
                  Add Life Goal
                </button>
              )}
            </div>

            {lifeGoals.map((goal) => (
              <div
                key={goal.id}
                className={`p-3 sm:p-4 md:p-6 rounded-lg hover:shadow-lg transition-shadow ${
                  isKidsMode
                    ? 'bg-[#00FFFF] bg-opacity-60 border-2 border-[#0099FF]'
                    : 'bg-white border-2 border-[#D0D0D0]'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#805232] flex-1">{goal.title}</h3>
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="p-1 sm:p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 sm:w-5 h-4 sm:h-5 text-[#805232]" />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="p-1 sm:p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 sm:w-5 h-4 sm:h-5 text-red-600" />
                    </button>
                  </div>
                </div>
                {goal.description && (
                  <p className="text-xs sm:text-sm text-[#805232] mb-3">{goal.description}</p>
                )}
                {goal.goals && goal.goals.length > 0 && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#D0D0D0]">
                    <p className="text-xs sm:text-sm font-medium text-[#805232] mb-2">
                      Linked Goals ({goal.goals.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {goal.goals.map((g) => (
                        <span
                          key={g.id}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#E8D5C4] text-[#805232] rounded-full text-xs sm:text-sm"
                        >
                          {g.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
