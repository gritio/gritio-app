import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Heart, Building2, Users, Lightbulb } from 'lucide-react';
import { LifeGoal } from '../types';
import { lifeGoalsApi } from '../services/api';

interface LifeGoalsPageProps {
  isKidsMode?: boolean;
}

function getIconConfig(title: string): { Icon: React.ReactNode; bgColor: string } {
  const lower = title.toLowerCase();
  if (lower.includes('health') || lower.includes('wellness')) {
    return { Icon: <Heart className="w-6 h-6" />, bgColor: '#FFDDD7' };
  }
  if (lower.includes('financial') || lower.includes('money')) {
    return { Icon: <Building2 className="w-6 h-6" />, bgColor: '#FFF4D7' };
  }
  if (lower.includes('family') || lower.includes('nandu') || lower.includes('child')) {
    return { Icon: <Users className="w-6 h-6" />, bgColor: '#D7F0DD' };
  }
  return { Icon: <Lightbulb className="w-6 h-6" />, bgColor: '#E8D7FF' };
}

function GoalTile({ goal, onEdit, onDelete, onReadMore }: {
  goal: LifeGoal;
  onEdit: (goal: LifeGoal) => void;
  onDelete: (id: string) => void;
  onReadMore: (goal: LifeGoal) => void;
}) {
  const { Icon, bgColor } = getIconConfig(goal.title);
  const descriptionPoints = goal.description
    ? goal.description.split('\n').filter(line => line.trim())
    : [];
  const showReadMore = descriptionPoints.length > 3;

  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:border-[#805232] hover:shadow-lg transition-all group relative">
      <div className="flex items-start gap-4 mb-4">
        <div className="rounded-xl p-3 flex-shrink-0" style={{ backgroundColor: bgColor }}>
          <div className="text-[#805232]">{Icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-[#805232] leading-tight">
            {goal.title}
          </h3>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(goal)}
            className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 className="w-4 h-4 text-[#805232]" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {descriptionPoints.length > 0 && (
        <div>
          <ul className="space-y-2 ml-1">
            {descriptionPoints.slice(0, 3).map((point, idx) => (
              <li key={idx} className="text-sm text-[#805232] flex gap-2 line-clamp-1">
                <span className="text-[#805232] mt-0.5 flex-shrink-0">•</span>
                <span className="truncate">{point.trim()}</span>
              </li>
            ))}
          </ul>
          {showReadMore && (
            <button
              onClick={() => onReadMore(goal)}
              className="mt-3 text-sm text-[#805232] hover:text-[#6b4427] font-medium transition-colors"
            >
              Read more →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function AddTile({ onClick, canAdd }: { onClick: () => void; canAdd: boolean }) {
  if (!canAdd) return null;

  return (
    <button
      onClick={onClick}
      className="bg-[#F5F5F5] border-2 border-dashed border-[#D0D0D0] rounded-2xl p-6 hover:border-[#805232] hover:bg-[#F0E8D4] transition-all flex flex-col items-center justify-center min-h-[200px] group"
    >
      <Plus className="w-8 h-8 text-[#805232] mb-2 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium text-[#805232]">Add life goal</span>
    </button>
  );
}

export function LifeGoalsPage({ isKidsMode }: LifeGoalsPageProps = {}) {
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [expandedGoal, setExpandedGoal] = useState<LifeGoal | null>(null);

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
    <div className="w-full px-2 sm:px-4 md:px-6 py-4 md:py-8 bg-[#f5f0eb] min-h-screen">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#805232] mb-2">Life goals</h1>
          <p className="text-sm md:text-base text-[#805232]">Define up to 5 goals that guide your yearly objectives</p>
        </div>
        <div className="text-[#805232] text-lg font-semibold">{lifeGoals.length}/5</div>
      </div>

      {error && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {expandedGoal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#805232]">{expandedGoal.title}</h2>
              <button
                onClick={() => setExpandedGoal(null)}
                className="p-1 hover:bg-[#F5F5F5] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#805232]" />
              </button>
            </div>
            {expandedGoal.description && (
              <ul className="space-y-2 ml-1">
                {expandedGoal.description.split('\n').filter(line => line.trim()).map((point, idx) => (
                  <li key={idx} className="text-sm text-[#805232] flex gap-2">
                    <span className="text-[#805232] mt-0.5">•</span>
                    <span>{point.trim()}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => {
                setExpandedGoal(null);
                handleEdit(expandedGoal);
              }}
              className="mt-6 w-full px-4 py-2 text-sm font-medium text-white bg-[#805232] hover:bg-[#6b4427] rounded-lg transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {(isAddingNew || editingId) && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#805232]">
                {editingId ? 'Edit Life Goal' : 'Add Life Goal'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-[#F5F5F5] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#805232]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#805232] font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Health & Wellness"
                  className="w-full px-4 py-2.5 text-sm border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232] focus:ring-2 focus:ring-[#805232]/20"
                />
              </div>
              <div>
                <label className="block text-sm text-[#805232] font-semibold mb-2">Description (one item per line)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Run 3x a week&#10;Sleep 7+ hours&#10;Gym consistency"
                  rows={4}
                  className="w-full px-4 py-2.5 text-sm border border-[#D0D0D0] rounded-lg focus:outline-none focus:border-[#805232] focus:ring-2 focus:ring-[#805232]/20 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 text-sm font-medium text-[#805232] bg-[#F5F5F5] hover:bg-[#E8E8E8] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#805232] hover:bg-[#6b4427] rounded-lg transition-colors"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {lifeGoals.length === 0 ? (
        <div className="text-center py-12 md:py-16 bg-white rounded-xl border border-[#E8E8E8]">
          <p className="text-base md:text-lg text-[#805232] mb-4">No life goals yet</p>
          {canAddMore && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 text-sm bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors font-medium"
            >
              <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
              Create First Life Goal
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifeGoals.map((goal) => (
            <GoalTile
              key={goal.id}
              goal={goal}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReadMore={setExpandedGoal}
            />
          ))}
          <AddTile onClick={handleAddNew} canAdd={canAddMore} />
        </div>
      )}
    </div>
  );
}
