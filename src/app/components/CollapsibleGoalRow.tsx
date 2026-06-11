import { useState, useEffect } from 'react';
import { Goal, Task, GoalLog } from '../types';
import { ChevronRight, Edit, Trash2, Plus, Heart, Building2, Users, Star } from 'lucide-react';
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
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
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
  const isLogsMode = goal.progressSource === 'LOGS';
  const isTasksMode = goal.progressSource === 'TASKS';
  const isWeight = goal.unit === 'Kilogram';

  const [logs, setLogs] = useState<GoalLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newValue, setNewValue] = useState<string>('1');
  const [newRemarks, setNewRemarks] = useState('');
  const [newLoggedAt, setNewLoggedAt] = useState(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false);

  const goalTasks = tasks.filter(t => t.goalId === goal.id);

  useEffect(() => {
    if (!isExpanded || !isLogsMode) return;
    let cancelled = false;
    setLogsLoading(true);
    goalLogsApi.listByGoal(goal.id)
      .then(data => { if (!cancelled) setLogs(data); })
      .catch(err => console.error('Failed to fetch logs:', err))
      .finally(() => { if (!cancelled) setLogsLoading(false); });
    return () => { cancelled = true; };
  }, [isExpanded, isLogsMode, goal.id]);

  // For LOGS+Weight, prefill the value with the latest weight reading.
  useEffect(() => {
    if (showAddForm && isLogsMode && isWeight && logs.length > 0) {
      setNewValue(String(logs[0].value));
    } else if (showAddForm && isLogsMode && isWeight && goal.weightGoal) {
      setNewValue(String(goal.weightGoal.currentWeight ?? goal.weightGoal.startWeight));
    }
  }, [showAddForm, isLogsMode, isWeight, logs, goal.weightGoal]);

  const handleAddLog = async () => {
    const value = parseFloat(newValue);
    if (isNaN(value)) return;
    setSubmitting(true);
    try {
      const log = await goalLogsApi.create({
        goalId: goal.id,
        value,
        remarks: newRemarks || undefined,
        loggedAt: new Date(newLoggedAt).toISOString(),
      });
      setLogs(prev => [log, ...prev]);
      setShowAddForm(false);
      setNewValue(isWeight ? newValue : '1');
      setNewRemarks('');
      setNewLoggedAt(new Date().toISOString().split('T')[0]);
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

  const isPercentage = goal.unit === 'Percentage';

  // Headline metrics
  const headlineLeft = (() => {
    if (isPercentage && goal.percentageGoal) {
      const avg = Math.round(goal.progressAvg || 0);
      const target = goal.percentageGoal.targetPercent;
      return (
        <>
          <div className="text-base font-semibold text-[#805232]">
            {avg}%
          </div>
          <div className="text-xs text-[#999] font-medium">
            target: {target}%
          </div>
        </>
      );
    }
    if (isTasksMode) {
      return (
        <>
          <div className="text-base font-semibold text-[#805232]">
            Total: {formatNumber(goal.progressTotal || 0)}
          </div>
          <div className="text-xs text-[#999] font-medium">
            Avg: {Math.round(goal.progressAvg || 0)}%
          </div>
        </>
      );
    }
    if (isLogsMode && isWeight && goal.weightGoal) {
      const cur = goal.weightGoal.currentWeight;
      const tgt = goal.weightGoal.targetWeight;
      return (
        <>
          <div className="text-base font-semibold text-[#805232]">
            {formatNumber(cur)} kg
          </div>
          <div className="text-xs text-[#999] font-medium">
            target: {formatNumber(tgt)} kg
          </div>
        </>
      );
    }
    // LOGS Count/Time — show absolute total instead of %.
    const totalLogged = goal.logsTotal ?? logs.reduce((s, l) => s + l.value, 0);
    let mainText = '';
    let targetText = '';
    if (goal.unit === 'Count' && goal.countGoal) {
      mainText = formatNumber(totalLogged);
      targetText = `of ${goal.countGoal.targetCount}`;
    } else if (goal.unit === 'Time' && goal.timeGoal) {
      const totalMins = goal.timeGoal.targetHours * 60 + goal.timeGoal.targetMinutes;
      mainText = `${formatNumber(totalLogged)} min`;
      targetText = `of ${totalMins} min`;
    }
    return (
      <>
        <div className="text-base font-semibold text-[#805232]">{mainText}</div>
        <div className="text-xs text-[#999] font-medium">{targetText}</div>
      </>
    );
  })();

  const barColor = goal.status?.toUpperCase().includes('ON_TRACK') ? '#3b6d11' : '#805232';
  const barPct = Math.min(Math.round(isTasksMode ? (goal.progressAvg || 0) : (goal.progress || 0)), 100);

  const hasTasks = !!goal.taskProgress && goal.taskProgress.length > 0;

  const renderTaskRows = () => (
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
  );

  return (
    <div className="mb-6">
      {/* Goal Header */}
      <div
        className={`rounded-lg mb-4 hover:shadow-lg transition-all duration-200 ${
          isKidsMode
            ? 'bg-[#00FFFF] bg-opacity-60 border-2 border-[#0099FF]'
            : 'bg-white border border-[#E8E8E8]'
        }`}
      >
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
            <h3 className="text-sm font-semibold text-[#805232]">{goal.title}</h3>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">{headlineLeft}</div>

            <div className="flex items-center gap-2">
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
        </div>

        {/* Progress bar row */}
        <div className="flex items-center gap-2.5 px-3.5 pb-3.5">
          <div className="flex-1 h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${barPct}%`, backgroundColor: barColor }}
            />
          </div>
          <div className="text-xs text-[#999] font-medium whitespace-nowrap">
            {isTasksMode
              ? `${Math.round(goal.progressAvg || 0)}% avg adherence`
              : `${Math.round(goal.progress || 0)}% of year`}
          </div>
        </div>

        {/* Expanded section */}
        {isExpanded && (
          <div className="px-3.5 pb-3.5 pt-1 border-t border-[#F0F0F0]">
            {isTasksMode && (
              <div className="pt-3">
                <div className="text-xs font-semibold text-[#805232] mb-2">Tasks</div>
                {hasTasks ? renderTaskRows() : (
                  <div className="text-xs text-[#999] py-2">
                    No tasks yet. Click + to add a task.
                  </div>
                )}
                {onEditGoal && (
                  <button
                    onClick={() => onEditGoal(goal.id)}
                    className="mt-3 text-xs text-[#805232] underline hover:text-[#6b4427]"
                  >
                    Switch to manual logging
                  </button>
                )}
              </div>
            )}

            {isLogsMode && (
              <div className="pt-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-[#805232]">
                    {isWeight ? 'Weight logs' : 'Log entries'}
                  </div>
                  <button
                    onClick={() => setShowAddForm(v => !v)}
                    className="text-xs px-2.5 py-1 bg-[#805232] text-white rounded hover:bg-[#6b4427] transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    {isWeight ? 'Log weight' : 'Log entry'}
                  </button>
                </div>

                {showAddForm && (
                  <div className="bg-[#FAFAFA] rounded p-3 mb-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-[#805232] mb-1">
                          {isWeight ? 'Weight (kg)' : 'Value'}
                        </label>
                        <input
                          type="number"
                          step={isWeight ? '0.1' : '1'}
                          value={newValue}
                          onChange={e => setNewValue(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#805232] mb-1">Date</label>
                        <input
                          type="date"
                          value={newLoggedAt}
                          onChange={e => setNewLoggedAt(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#805232] mb-1">Remarks (optional)</label>
                      <input
                        type="text"
                        value={newRemarks}
                        onChange={e => setNewRemarks(e.target.value)}
                        placeholder={isWeight ? 'Morning, fasted...' : 'Trip to Goa, AI paper...'}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-[#805232] focus:outline-none focus:ring-1 focus:ring-[#805232]"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="px-3 py-1 text-xs text-[#805232] border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddLog}
                        disabled={submitting}
                        className="px-3 py-1 text-xs bg-[#805232] text-white rounded hover:bg-[#6b4427] disabled:opacity-50"
                      >
                        {submitting ? 'Saving...' : 'Add Entry'}
                      </button>
                    </div>
                  </div>
                )}

                {logsLoading ? (
                  <div className="text-xs text-[#999] py-2">Loading...</div>
                ) : logs.length === 0 ? (
                  <div className="text-xs text-[#999] py-2">
                    No entries yet. Click "{isWeight ? 'Log weight' : 'Log entry'}" to add one.
                  </div>
                ) : (
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {logs.map(log => (
                      <div key={log.id} className="flex items-center gap-3 bg-[#FAFAFA] rounded px-3 py-2 text-sm">
                        <div className="text-xs text-[#999] w-24 flex-shrink-0">
                          {formatLogDate(log.loggedAt)}
                        </div>
                        <div className="text-[#805232] font-medium w-16 flex-shrink-0">
                          {formatNumber(log.value)}{isWeight ? ' kg' : ''}
                        </div>
                        <div className="flex-1 text-[#805232] truncate">
                          {log.remarks || ''}
                        </div>
                        <button
                          onClick={() => handleDeleteLog(log.id)}
                          className="text-[#999] hover:text-red-600 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {logs.length > 0 && !isWeight && (
                  <div className="mt-2 text-xs text-[#999] text-right">
                    Total: {formatNumber(logs.reduce((s, l) => s + l.value, 0))}
                    {goal.unit === 'Count' && goal.countGoal ? ` of ${goal.countGoal.targetCount}` : ''}
                    {goal.unit === 'Time' && goal.timeGoal ? ` min of ${goal.timeGoal.targetHours * 60 + goal.timeGoal.targetMinutes}` : ''}
                  </div>
                )}
              </div>
            )}

            {/* Supporting tasks — shown on LOGS goals that also have tasks */}
            {isLogsMode && hasTasks && (
              <div className="pt-4 mt-3 border-t border-[#F0F0F0]">
                <div className="text-xs font-semibold text-[#805232] mb-2">Supporting tasks</div>
                {renderTaskRows()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
