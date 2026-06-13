import { useState, useEffect } from 'react';
import { Goal, Task, GoalLog } from '../types';
import { ChevronRight, Edit, Trash2, Plus, Heart, Building2, Users, Star, Pencil, Check, X } from 'lucide-react';
import { goalLogsApi } from '../services/api';
import { COLORS } from '../constants/colors';

function getIconForGoal(goal: Goal): { Icon: React.ReactNode; bgColor: string; iconColor: string } {
  const title = goal.title.toLowerCase();

  if (title.includes('health') || title.includes('fitness') || title.includes('weight')) {
    return { Icon: <Heart className="w-4 h-4" />, bgColor: '#fde8e0', iconColor: '#d85a30' };
  }
  if (title.includes('financial') || title.includes('retire') || title.includes('money')) {
    return { Icon: <Building2 className="w-4 h-4" />, bgColor: '#fdf8e0', iconColor: '#854f0b' };
  }
  if (title.includes('family') || title.includes('nandu') || title.includes('child')) {
    return { Icon: <Users className="w-4 h-4" />, bgColor: COLORS.successLight, iconColor: COLORS.success };
  }
  return { Icon: <Star className="w-4 h-4" />, bgColor: '#ede9fe', iconColor: '#6d28d9' };
}

interface CollapsibleGoalRowProps {
  goal: Goal;
  isExpanded: boolean;
  onToggle: () => void;
  onEditGoal?: (goalId: string) => void;
  onDeleteGoal?: (goalId: string) => void;
  onAddTask?: (goalId: string) => void;
  onRefreshGoals?: () => void;
  tasks?: Task[];
  isKidsMode?: boolean;
}

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return n.toFixed(1);
}

function formatLogDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function CollapsibleGoalRow({
  goal,
  isExpanded,
  onToggle,
  onEditGoal,
  onDeleteGoal,
  onAddTask,
  onRefreshGoals,
  tasks = [],
  isKidsMode,
}: CollapsibleGoalRowProps) {
  const isCount = goal.unit === 'Count';
  const isWeight = goal.unit === 'Kilogram';
  const isTime = goal.unit === 'Time';
  const isPercentage = goal.unit === 'Percentage';
  const pillClickable = !isPercentage;

  const [logs, setLogs] = useState<GoalLog[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newValue, setNewValue] = useState<string>('');
  const [newRemarks, setNewRemarks] = useState('');
  const [newLoggedAt, setNewLoggedAt] = useState<string>(() => new Date().toISOString().split('T')[0]);

  // Inline edit state for previous log rows.
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [editingRemarks, setEditingRemarks] = useState<string>('');

  const goalTasks = tasks.filter(t => t.goalId === goal.id);
  const hasTasks = !!goal.taskProgress && goal.taskProgress.length > 0;

  // Fetch logs whenever the tile is opened (chevron OR pill) for LOGS units.
  useEffect(() => {
    if (isPercentage) return;
    if (!isExpanded && !showEditor) return;
    let cancelled = false;
    goalLogsApi.listByGoal(goal.id)
      .then(data => { if (!cancelled) setLogs(data); })
      .catch(err => console.error('Failed to fetch logs:', err));
    return () => { cancelled = true; };
  }, [isExpanded, showEditor, isPercentage, goal.id]);

  // Reset editor + inline-edit when the tile collapses.
  useEffect(() => {
    if (!isExpanded && !showEditor) {
      setEditingLogId(null);
    }
  }, [isExpanded, showEditor]);

  // Cumulative count (only meaningful for Count goals): sum of log values to date.
  const logsTotal = goal.logsTotal ?? logs.reduce((s, l) => s + l.value, 0);

  // Default new-value when opening the editor — varies per unit.
  const computeDefaultNewValue = (): string => {
    if (isCount) return String(Math.round(logsTotal) + 1);
    if (isWeight) {
      const latest = logs[0]?.value;
      const current = goal.weightGoal?.currentWeight;
      const start = goal.weightGoal?.startWeight;
      return String(latest ?? current ?? start ?? '');
    }
    if (isTime) return '';
    return '';
  };

  const openEditor = () => {
    if (!pillClickable) return;
    setNewValue(computeDefaultNewValue());
    setNewRemarks('');
    setNewLoggedAt(new Date().toISOString().split('T')[0]);
    setShowEditor(true);
    // If tile is collapsed, ask parent to expand it.
    if (!isExpanded) onToggle();
  };

  const closeEditor = () => {
    setShowEditor(false);
    setNewValue('');
    setNewRemarks('');
    setNewLoggedAt(new Date().toISOString().split('T')[0]);
  };

  const handleSave = async () => {
    const inputNum = parseFloat(newValue);
    if (!Number.isFinite(inputNum)) return;

    // Compute the log entry's value field based on unit semantics.
    let logValue = inputNum;
    if (isCount) {
      logValue = Math.max(0, inputNum - logsTotal);
      // If the user didn't change the prefilled (next-number) value, treat as +1.
      if (logValue === 0 && inputNum === logsTotal + 1) logValue = 1;
      if (logValue <= 0) return;
    }

    setSubmitting(true);
    try {
      const log = await goalLogsApi.create({
        goalId: goal.id,
        value: logValue,
        remarks: newRemarks || undefined,
        loggedAt: new Date(newLoggedAt).toISOString(),
      });
      setLogs(prev => [log, ...prev]);
      closeEditor();
      if (onRefreshGoals) onRefreshGoals();
    } catch (err) {
      console.error('Failed to create log:', err);
      alert('Failed to create log entry');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await goalLogsApi.delete(id);
      setLogs(prev => prev.filter(l => l.id !== id));
      if (onRefreshGoals) onRefreshGoals();
    } catch (err) {
      console.error('Failed to delete log:', err);
    }
  };

  const startEditLog = (log: GoalLog) => {
    setEditingLogId(log.id);
    setEditingValue(String(log.value));
    setEditingRemarks(log.remarks || '');
  };

  const cancelEditLog = () => {
    setEditingLogId(null);
    setEditingValue('');
    setEditingRemarks('');
  };

  const saveEditLog = async (id: string) => {
    const v = parseFloat(editingValue);
    if (!Number.isFinite(v)) return;
    try {
      const updated = await goalLogsApi.update(id, {
        value: v,
        remarks: editingRemarks,
      });
      setLogs(prev => prev.map(l => (l.id === id ? updated : l)));
      cancelEditLog();
      if (onRefreshGoals) onRefreshGoals();
    } catch (err) {
      console.error('Failed to update log:', err);
    }
  };

  // ------- Subtitle text per unit -------
  const currentYear = new Date().getFullYear();
  const subtitle = (() => {
    if (isPercentage && goal.percentageGoal) {
      return `Avg ${Math.round(goal.progressAvg || 0)}% · target ${goal.percentageGoal.targetPercent}%`;
    }
    const yearPct = Math.round(goal.progress || 0);
    if (isCount && goal.countGoal) {
      return `${formatNumber(logsTotal)} of ${goal.countGoal.targetCount} · ${yearPct}% of year`;
    }
    if (isWeight && goal.weightGoal) {
      return `Target ${formatNumber(goal.weightGoal.targetWeight)} kg by Dec ${currentYear}`;
    }
    if (isTime && goal.timeGoal) {
      const tgt = goal.timeGoal.targetHours * 60 + goal.timeGoal.targetMinutes;
      return `${formatNumber(logsTotal)} of ${tgt} min · ${yearPct}% of year`;
    }
    return '';
  })();

  // ------- Pill text per unit -------
  const pillText = (() => {
    if (isCount && goal.countGoal) return `${formatNumber(logsTotal)} of ${goal.countGoal.targetCount}`;
    if (isWeight && goal.weightGoal) return `${formatNumber(goal.weightGoal.currentWeight)} kg`;
    if (isTime) return `${formatNumber(logsTotal)} min`;
    if (isPercentage) return `${Math.round(goal.progressAvg || 0)}%`;
    return '';
  })();

  const barColor = goal.status?.toUpperCase().includes('ON_TRACK') ? '#3b6d11' : '#805232';
  const barPct = Math.min(Math.round(isPercentage ? (goal.progressAvg || 0) : (goal.progress || 0)), 100);

  // Editor labels per unit
  const editorLabel = isCount ? 'DONE' : isWeight ? 'WEIGHT' : isTime ? 'MINUTES' : 'VALUE';
  const editorSuffix = isCount ? '' : isWeight ? 'kg' : isTime ? 'min' : '';

  // Display label for a log row (Count: cumulative position; others: value with unit)
  const formatLogLabel = (log: GoalLog, idxAscending: number): string => {
    if (isCount) {
      // idxAscending is position when logs are sorted oldest-first
      // For a multi-trip log (value > 1), use a range
      const startPos = idxAscending + 1;
      const endPos = idxAscending + Math.max(1, Math.round(log.value));
      return startPos === endPos ? `#${startPos}` : `#${startPos}–${endPos}`;
    }
    if (isWeight) return `${formatNumber(log.value)} kg`;
    if (isTime) return `${formatNumber(log.value)} min`;
    return formatNumber(log.value);
  };

  // Sort logs newest-first for display, but we need cumulative position for Count
  // so we compute ascending index by reversing.
  const sortedDesc = [...logs].sort((a, b) =>
    new Date(b.loggedAt).getTime() - new Date(a.loggedAt).getTime(),
  );
  // Cumulative running sum from oldest → newest
  const ascending = [...sortedDesc].reverse();
  const ascendingCumStart: Record<string, number> = {};
  let running = 0;
  for (const l of ascending) {
    ascendingCumStart[l.id] = running;
    running += Math.max(1, Math.round(l.value));
  }
  const visibleLogs = sortedDesc.slice(0, 2);

  return (
    <div className="mb-6">
      <div
        className={`rounded-lg mb-4 hover:shadow-lg transition-all duration-200 ${
          isKidsMode
            ? 'bg-[#00FFFF] bg-opacity-60 border-2 border-[#0099FF]'
            : 'bg-white border border-[#E8E8E8]'
        }`}
      >
        {/* Header row */}
        <div className="flex items-center gap-3 p-3.5">
          <button
            onClick={onToggle}
            className="text-[#805232] hover:text-[#805232] flex-shrink-0 transition-transform"
            style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {(() => {
            const { Icon, bgColor, iconColor } = getIconForGoal(goal);
            return (
              <div className="rounded-lg w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bgColor }}>
                <div style={{ color: iconColor }}>{Icon}</div>
              </div>
            );
          })()}

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#805232] truncate">{goal.title}</h3>
            {subtitle && (
              <div className="text-xs text-[#999] mt-0.5 truncate">{subtitle}</div>
            )}
          </div>

          {/* Value pill */}
          {pillText && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (pillClickable) openEditor();
              }}
              disabled={!pillClickable}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                pillClickable
                  ? 'bg-[#EFE6DD] text-[#805232] hover:bg-[#E5D7C8] cursor-pointer'
                  : 'bg-[#F0F0F0] text-[#999] cursor-default'
              }`}
              title={pillClickable ? 'Click to log' : ''}
            >
              <span>{pillText}</span>
              {pillClickable && <Pencil className="w-3 h-3 opacity-60" />}
            </button>
          )}

          <div className="flex items-center gap-2 flex-shrink-0">
            {onAddTask && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddTask(goal.id);
                }}
                className="p-1.5 text-[#999] hover:text-[#805232] hover:bg-[#f5f5f5] rounded transition-colors"
                title="Add task"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
            {onEditGoal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditGoal(goal.id);
                }}
                className="p-1.5 text-[#999] hover:text-[#805232] hover:bg-[#f5f5f5] rounded transition-colors"
                title="Edit goal"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onDeleteGoal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteGoal(goal.id);
                }}
                className="p-1.5 text-[#999] hover:text-red-600 hover:bg-[#f5f5f5] rounded transition-colors"
                title="Delete goal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2.5 px-3.5 pb-3.5">
          <div className="flex-1 h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${barPct}%`, backgroundColor: barColor }}
            />
          </div>
        </div>

        {/* Expanded body — chevron expansion OR editor open */}
        {(isExpanded || showEditor) && (
          <div className="px-3.5 pb-3.5 pt-1 border-t border-[#F0F0F0]">
            {/* Editor section — only visible when pill was clicked */}
            {showEditor && pillClickable && (
              <div className="pt-3 pb-3 bg-[#FAFAFA] rounded-lg px-3 mt-3">
                <div className="grid grid-cols-12 gap-3 mb-2">
                  <div className="col-span-3">
                    <label className="block text-[10px] uppercase tracking-wider text-[#999] mb-1">{editorLabel}</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step={isWeight ? '0.1' : '1'}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
                        autoFocus
                      />
                      {editorSuffix && <span className="text-xs text-[#999]">{editorSuffix}</span>}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-[10px] uppercase tracking-wider text-[#999] mb-1">Date</label>
                    <input
                      type="date"
                      max={new Date().toISOString().split('T')[0]}
                      value={newLoggedAt}
                      onChange={(e) => setNewLoggedAt(e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
                    />
                  </div>
                  <div className="col-span-6">
                    <label className="block text-[10px] uppercase tracking-wider text-[#999] mb-1">
                      {isCount ? 'Where / what was it?' : 'Notes (optional)'}
                    </label>
                    <input
                      type="text"
                      value={newRemarks}
                      onChange={(e) => setNewRemarks(e.target.value)}
                      placeholder={isCount ? 'e.g. Paris' : 'e.g. Morning, fasted'}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={closeEditor}
                    className="px-3 py-1 text-xs text-[#805232] border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={submitting}
                    className="px-3 py-1 text-xs bg-[#805232] text-white rounded hover:bg-[#6b4427] disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            )}

            {/* Previous logs (last 2) — shown when editor open OR chevron expansion */}
            {!isPercentage && (
              <div className="pt-3">
                <div className="text-[10px] uppercase tracking-wider text-[#999] mb-2">Previous logs</div>
                {visibleLogs.length === 0 ? (
                  <div className="text-xs text-[#999] py-2">No previous entries.</div>
                ) : (
                  <div className="space-y-1">
                    {visibleLogs.map((log) => {
                      const isEditing = editingLogId === log.id;
                      const startPos = ascendingCumStart[log.id] ?? 0;
                      const label = formatLogLabel(log, startPos);
                      return (
                        <div key={log.id} className="flex items-center gap-3 bg-[#FAFAFA] rounded px-3 py-2 text-sm">
                          <div className="text-xs text-[#999] w-16 flex-shrink-0">
                            {formatLogDate(log.loggedAt)}
                          </div>
                          {isEditing ? (
                            <>
                              <input
                                type="number"
                                step={isWeight ? '0.1' : '1'}
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                className="w-20 px-2 py-0.5 border border-gray-300 rounded text-sm text-[#805232]"
                              />
                              <input
                                type="text"
                                value={editingRemarks}
                                onChange={(e) => setEditingRemarks(e.target.value)}
                                className="flex-1 px-2 py-0.5 border border-gray-300 rounded text-sm text-[#805232]"
                              />
                              <button
                                onClick={() => saveEditLog(log.id)}
                                className="text-[#3b6d11] hover:bg-gray-100 p-1 rounded"
                                title="Save"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={cancelEditLog}
                                className="text-[#999] hover:bg-gray-100 p-1 rounded"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="text-[#805232] font-medium w-20 flex-shrink-0">{label}</div>
                              <div className="flex-1 text-[#805232] truncate">{log.remarks || ''}</div>
                              {showEditor && (
                                <>
                                  <button
                                    onClick={() => startEditLog(log)}
                                    className="text-[#999] hover:text-[#805232] p-1"
                                    title="Edit"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLog(log.id)}
                                    className="text-[#999] hover:text-red-600 p-1"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Supporting tasks — only shown on chevron expansion (not editor mode) */}
            {!showEditor && hasTasks && (
              <div className="pt-4 mt-3 border-t border-[#F0F0F0]">
                <div className="text-xs font-semibold text-[#805232] mb-2">Tasks</div>
                <div className="space-y-2">
                  {goal.taskProgress!.map(tp => {
                    const adherence = Math.round(tp.adherence);
                    const freqText = tp.frequency === 'WEEKLY'
                      ? `${tp.timesPerWeek || 1}× / week`
                      : 'daily';
                    return (
                      <div key={tp.taskId} className="flex items-center gap-3 bg-[#FAFAFA] rounded px-3 py-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-[#805232] truncate">{tp.title}</div>
                          <div className="text-xs text-[#999]">
                            {freqText} · {formatNumber(tp.ytdValue)} / {formatNumber(tp.expected)} YTD
                          </div>
                        </div>
                        <div className="w-24 h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${Math.min(adherence, 100)}%`, backgroundColor: barColor }}
                          />
                        </div>
                        <div className="text-xs font-semibold text-[#805232] w-10 text-right">
                          {adherence}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
