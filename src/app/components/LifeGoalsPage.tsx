import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { LifeGoal } from '../types';
import { lifeGoalsApi } from '../services/api';

export function LifeGoalsPage() {
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
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#805232] mb-2">Life Goals</h1>
        <p className="text-[#805232]">Define up to 5 life goals that guide your yearly objectives</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {(isAddingNew || editingId) && (
        <div className="mb-8 p-6 bg-[#F5F5F5] rounded-lg border-2 border-[#805232]">
          <h2 className="text-xl font-bold text-[#805232] mb-4">
            {editingId ? 'Edit Life Goal' : 'Add New Life Goal'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[#805232] font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Health & Wellness"
                className="w-full px-4 py-2 border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232]"
              />
            </div>
            <div>
              <label className="block text-[#805232] font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="e.g., Focus on physical fitness, nutrition, and mental wellbeing"
                rows={3}
                className="w-full px-4 py-2 border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232]"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-[#DCDCDC] text-[#805232] rounded-lg hover:bg-[#C0C0C0] transition-colors font-medium border border-[#805232]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {lifeGoals.length === 0 ? (
          <div className="text-center py-12 bg-[#F5F5F5] rounded-lg">
            <p className="text-[#805232] text-lg mb-4">No life goals yet</p>
            {canAddMore && (
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Create First Life Goal
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-[#805232] font-medium">
                {lifeGoals.length} of 5 life goals created
              </p>
              {canAddMore && (
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Life Goal
                </button>
              )}
            </div>

            {lifeGoals.map((goal) => (
              <div
                key={goal.id}
                className="p-6 bg-white border-2 border-[#D0D0D0] rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#805232]">{goal.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(goal)}
                      className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5 text-[#805232]" />
                    </button>
                    <button
                      onClick={() => handleDelete(goal.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
                {goal.description && (
                  <p className="text-[#805232] mb-3">{goal.description}</p>
                )}
                {goal.goals && goal.goals.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#D0D0D0]">
                    <p className="text-sm font-medium text-[#805232] mb-2">
                      Linked Goals ({goal.goals.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {goal.goals.map((g) => (
                        <span
                          key={g.id}
                          className="px-3 py-1 bg-[#E8D5C4] text-[#805232] rounded-full text-sm"
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
