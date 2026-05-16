import { useState } from 'react';
import { Todo } from '../types';
import { X, Trash2 } from 'lucide-react';

interface TodoDetailPanelProps {
  todo: Todo;
  onClose: () => void;
  onUpdate: (todo: Todo) => void;
  onDelete: () => void;
}

export function TodoDetailPanel({ todo, onClose, onUpdate, onDelete }: TodoDetailPanelProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [dueDate, setDueDate] = useState(new Date(todo.dueDate).toISOString().split('T')[0]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    try {
      onUpdate({ ...todo, title: title.trim(), description, dueDate: new Date(dueDate) });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      onDelete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black bg-opacity-40" onClick={onClose} />

      <div className="w-96 bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-base font-semibold text-[#805232]">Edit Todo</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter todo title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add more details..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232] text-sm"
            />
          </div>

          <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-500 space-y-1">
            <p>
              <span className="font-medium">Status:</span>{' '}
              {todo.done ? (
                <span className="text-green-600 font-medium">Completed</span>
              ) : (
                <span className="text-amber-600 font-medium">In Progress</span>
              )}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-5 space-y-2">
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="w-full px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete Todo
          </button>
        </div>
      </div>
    </div>
  );
}
