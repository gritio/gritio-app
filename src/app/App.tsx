import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { GoalsOverviewNew as GoalsOverview } from './components/GoalsOverviewNew';
import { GoalDetail } from './components/GoalDetail';
import { TodayView } from './components/TodayView';
import { WeeklyTaskView } from './components/WeeklyTaskView';
import { TaskTimelinePage } from './components/TaskTimelinePage';
import { TodosPage } from './components/TodosPage';
import { LifeGoalsPage } from './components/LifeGoalsPage';
import { GoalHierarchyPage } from './components/GoalHierarchyPage';
import { GoalEditPanel } from './components/GoalEditPanel';
import { MonthlyGoalPanel } from './components/MonthlyGoalPanel';
import { EditMonthlyGoalPanel } from './components/EditMonthlyGoalPanel';
import { UpdateProgressPanel } from './components/UpdateProgressPanel';
import { AddGoalModal } from './components/AddGoalModal';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { mockGoals, mockMonthlyGoals, mockTasks, mockWeeklyCheckIns } from './data/mockData';
import { Goal, MonthlyGoal, Task, WeeklyCheckIn, Todo, LifeGoal } from './types';
import { goalsApi, authApi, monthlyGoalsApi, tasksApi, todosApi, lifeGoalsApi } from './services/api';

type View = 'overview' | 'detail' | 'today' | 'weekly' | 'task-timeline' | 'todos' | 'life-goals' | 'hierarchy';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());
  const [showRegister, setShowRegister] = useState(false);
  const [currentView, setCurrentView] = useState<View>('overview');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState<boolean>(false);
  
  // Edit Panel State
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  
  // Edit Monthly Goal Panel State
  const [editingMonthlyGoalId, setEditingMonthlyGoalId] = useState<string | null>(null);
  const [isEditMonthlyGoalPanelOpen, setIsEditMonthlyGoalPanelOpen] = useState(false);
  
  // Monthly Goal Panel State
  const [isMonthlyGoalPanelOpen, setIsMonthlyGoalPanelOpen] = useState(false);
  const [monthlyGoalTargetId, setMonthlyGoalTargetId] = useState<string | null>(null);
  
  // Update Progress Panel State
  const [isUpdateProgressPanelOpen, setIsUpdateProgressPanelOpen] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  
  // State for goals, monthly goals, tasks, check-ins, and todos
  const [goals, setGoals] = useState<Goal[]>([]);
  const [monthlyGoals, setMonthlyGoals] = useState<MonthlyGoal[]>(mockMonthlyGoals);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [checkIns] = useState<WeeklyCheckIn[]>(mockWeeklyCheckIns);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Fetch goals on component mount
  const fetchGoals = async () => {
    try {
      console.log('Starting to fetch goals, isAuthenticated:', isAuthenticated);
      setGoalsLoading(true);
      console.log('Fetching goals, monthly goals, and tasks from API...');
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const fetchPromise = Promise.all([
        goalsApi.getGoals(),
        monthlyGoalsApi.getAllMonthlyGoals(),
        tasksApi.getAllTasks(),
        todosApi.getAllTodos(),
        lifeGoalsApi.getLifeGoals()
      ]);
      const [fetchedGoals, fetchedMonthlyGoals, fetchedTasks, fetchedTodos, fetchedLifeGoals] = await Promise.race([fetchPromise, timeoutPromise]) as any;
      
      console.log('Goals fetched successfully:', fetchedGoals);
      console.log('Monthly goals fetched successfully:', fetchedMonthlyGoals);
      console.log('Tasks fetched successfully:', fetchedTasks);
      console.log('Todos fetched successfully:', fetchedTodos);
      console.log('Life goals fetched successfully:', fetchedLifeGoals);
      setGoals(fetchedGoals);
      setMonthlyGoals(fetchedMonthlyGoals);
      setTasks(fetchedTasks);
      setTodos(fetchedTodos);
      setLifeGoals(fetchedLifeGoals || []);
      setGoalsLoading(false);
    } catch (error: any) {
      const errorMsg = error?.message || error?.response?.data?.message || 'Unknown error fetching goals';
      console.error('Failed to fetch goals:', error);
      console.error('Error details:', errorMsg);
      console.log('Using mock data as fallback');
      // Fall back to mock data on error
      setGoals(mockGoals);
      setMonthlyGoals(mockMonthlyGoals);
      setTasks(mockTasks);
      setLoadingError(null); // Clear error after fallback
      setGoalsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('isAuthenticated is true, fetching goals');
      fetchGoals();
    } else {
      console.log('isAuthenticated is false, skipping goal fetch');
      setGoalsLoading(false);
    }
  }, [isAuthenticated]);
  
  const handleEditGoal = (goalId: string) => {
    setEditingGoalId(goalId);
    setIsEditPanelOpen(true);
  };

  const handleSaveEditedGoal = async (updatedGoal: Goal) => {
    try {
      // Refetch the goal to get full data including lifeGoal relationship
      const fullGoal = await goalsApi.getGoal(updatedGoal.id);
      setGoals(goals.map(g => g.id === updatedGoal.id ? fullGoal : g));
    } catch (error) {
      console.error('Failed to refetch goal:', error);
      // Fallback: at least update with the returned data
      setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
    }
  };

  const handleEditMonthlyGoal = async (monthlyGoalId: string) => {
    try {
      // Fetch the full monthly goal with parent goal data
      const fullMonthlyGoal = await monthlyGoalsApi.getMonthlyGoal(monthlyGoalId);
      console.log('handleEditMonthlyGoal - Fetched full monthly goal:', fullMonthlyGoal);
      setEditingMonthlyGoalId(monthlyGoalId);
      // Update the monthlyGoals state with the full data
      setMonthlyGoals(monthlyGoals.map(mg => mg.id === monthlyGoalId ? fullMonthlyGoal : mg));
      setIsEditMonthlyGoalPanelOpen(true);
    } catch (error) {
      console.error('Failed to fetch monthly goal:', error);
      // Fallback to the existing data
      setEditingMonthlyGoalId(monthlyGoalId);
      setIsEditMonthlyGoalPanelOpen(true);
    }
  };

  const handleSaveEditedMonthlyGoal = (updatedMonthlyGoal: MonthlyGoal) => {
    setMonthlyGoals(monthlyGoals.map(mg => mg.id === updatedMonthlyGoal.id ? updatedMonthlyGoal : mg));
  };

  const handleDeleteMonthlyGoal = (monthlyGoalId: string) => {
    setMonthlyGoals(monthlyGoals.filter(mg => mg.id !== monthlyGoalId));
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await goalsApi.deleteGoal(goalId);
      setGoals(goals.filter(g => g.id !== goalId));
      setMonthlyGoals(monthlyGoals.filter(mg => mg.goalId !== goalId));
      setTasks(tasks.filter(t => t.goalId !== goalId));
    } catch (error: any) {
      console.error('Failed to delete goal:', error);
      alert('Failed to delete goal. Please try again.');
    }
  };

  const handleSelectGoal = (goalId: string) => {
    setSelectedGoalId(goalId);
    // Keep in overview, don't navigate to detail view
  };
  
  const handleAddMonthlyGoalFromOverview = (goalId: string) => {
    setMonthlyGoalTargetId(goalId);
    setIsMonthlyGoalPanelOpen(true);
  };
  
  const handleAddTaskFromOverview = (goalId: string) => {
    setSelectedGoalId(goalId);
  };
  
  const handleBackToOverview = () => {
    setSelectedGoalId(null);
    setCurrentView('overview');
  };

  const handleLogout = async () => {
    setGoals([]);
    setMonthlyGoals([]);
    setTasks([]);
    setTodos([]);
    await authApi.logout();
    setIsAuthenticated(false);
  };

  const handleAddTodo = async (title: string) => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const newTodo = await todosApi.createTodo({
        title,
        dueDate: tomorrow.toISOString().split('T')[0],
        priority: false,
      });
      setTodos([...todos, newTodo]);
    } catch (error: any) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      await todosApi.updateTodo(updatedTodo.id, {
        title: updatedTodo.title,
        description: updatedTodo.description,
        dueDate: updatedTodo.dueDate.toISOString().split('T')[0],
        priority: updatedTodo.priority,
        done: updatedTodo.done,
      });
      setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    } catch (error: any) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todosApi.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error: any) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleToggleTodoDone = async (id: string, done: boolean) => {
    try {
      await todosApi.toggleDone(id, done);
      setTodos(todos.map(t => t.id === id ? { ...t, done } : t));
    } catch (error: any) {
      console.error('Failed to toggle todo done:', error);
    }
  };

  const handleToggleTodoPriority = async (id: string, priority: boolean) => {
    try {
      await todosApi.togglePriority(id, priority);
      setTodos(todos.map(t => t.id === id ? { ...t, priority } : t));
    } catch (error: any) {
      console.error('Failed to toggle todo priority:', error);
    }
  };
  
  const handleSaveGoal = async (goalData: any) => {
    try {
      console.log('Creating goal with data:', goalData);
      const newGoal = await goalsApi.createGoal(goalData);
      console.log('Goal created successfully:', newGoal);
      // Refresh goals list from API to ensure data is in sync
      const updatedGoals = await goalsApi.getGoals();
      console.log('Refreshed goals list:', updatedGoals);
      setGoals(updatedGoals);
    } catch (error: any) {
      console.error('Failed to create goal:', error);
      throw error;
    }
  };
  
  const handleSaveMonthlyGoal = (monthlyGoalData: Omit<MonthlyGoal, 'id' | 'currentProgress' | 'status'>) => {
    const newMonthlyGoal: MonthlyGoal = {
      ...monthlyGoalData,
      id: `monthly-${Date.now()}`,
      currentProgress: 0,
      status: 'on-track'
    };
    setMonthlyGoals([...monthlyGoals, newMonthlyGoal]);
  };
  
  
  const handleUpdateProgress = (taskId: string) => {
    setUpdatingTaskId(taskId);
    setIsUpdateProgressPanelOpen(true);
  };
  
  const handleSaveProgress = (taskId: string, newProgress: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          currentProgress: newProgress,
          lastUpdated: new Date(),
          completionHistory: [
            ...task.completionHistory,
            {
              date: new Date(),
              value: newProgress,
              completed: newProgress >= task.target
            }
          ]
        };
      }
      return task;
    }));
    
    // Recalculate goal progress
    // In a real app, this would be handled by the backend or a more sophisticated state management
    const updatedTask = tasks.find(t => t.id === taskId);
    if (updatedTask) {
      const goalToUpdate = goals.find(g => g.id === updatedTask.goalId);
      if (goalToUpdate) {
        const goalTasks = tasks.filter(t => t.goalId === goalToUpdate.id);
        const totalProgress = goalTasks.reduce((sum, task) => {
          const prog = task.id === taskId ? newProgress : task.currentProgress;
          const taskCompletion = (prog / task.target) * 100;
          return sum + Math.min(taskCompletion, 100);
        }, 0);
        const newGoalProgress = Math.round(totalProgress / goalTasks.length);
        
        setGoals(goals.map(g => {
          if (g.id === goalToUpdate.id) {
            return { ...g, progress: newGoalProgress };
          }
          return g;
        }));
      }
    }
  };
  
  const selectedGoal = selectedGoalId ? goals.find(g => g.id === selectedGoalId) : null;

  return (
    <>
      {!isAuthenticated ? (
        showRegister ? (
          <RegisterPage 
            onRegisterSuccess={() => setShowRegister(false)}
            onBackToLogin={() => setShowRegister(false)}
          />
        ) : (
          <LoginPage 
            onLoginSuccess={() => setIsAuthenticated(true)}
            onShowRegister={() => setShowRegister(true)}
          />
        )
      ) : goalsLoading ? (
        <div className="min-h-screen bg-gradient-to-r from-[#FAFAFA] via-[#B8BABB] to-[#E8D5C4] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#805232] mb-4"></div>
            <p className="text-[#805232] font-medium">Loading your goals...</p>
            {loadingError && <p className="text-red-600 text-sm mt-4">{loadingError}</p>}
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-[#FAFAFA] via-[#B8BABB] to-[#E8D5C4] flex font-bold">
          {/* Sidebar */}
          <Sidebar currentView={currentView} onNavigate={setCurrentView} onLogout={handleLogout} />
          
          {/* Main Content Area with Panel */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${isEditPanelOpen ? 'mr-96' : ''}`}>
            {/* Main Content */}
            <main className="py-8 flex-1">
              {currentView === 'overview' && (
                <GoalsOverview 
                  goals={goals}
                  monthlyGoals={monthlyGoals}
                  tasks={tasks}
                  onSelectGoal={handleSelectGoal}
                  onAddMonthlyGoal={handleAddMonthlyGoalFromOverview}
                  onAddTask={handleAddTaskFromOverview}
                  onEditGoal={handleEditGoal}
                  onEditMonthlyGoal={handleEditMonthlyGoal}
                  onUpdateGoal={handleSaveEditedGoal}
                  onDeleteGoal={handleDeleteGoal}
                  onRefreshGoals={fetchGoals}
                />
              )}
              
              {currentView === 'detail' && selectedGoal && (
                <GoalDetail 
                  goal={selectedGoal}
                  monthlyGoals={monthlyGoals}
                  tasks={tasks}
                  onBack={handleBackToOverview}
                  onAddMonthlyGoal={() => {
                    setMonthlyGoalTargetId(selectedGoal.id);
                    setIsMonthlyGoalPanelOpen(true);
                  }}
                  onAddTask={handleAddTaskFromOverview}
                />
              )}
              
              {currentView === 'today' && (
                <TodayView 
                  tasks={tasks}
                  goals={goals}
                  onUpdateProgress={handleUpdateProgress}
                />
              )}
              
              {currentView === 'todos' && (
                <TodosPage
                  todos={todos}
                  onAddTodo={handleAddTodo}
                  onUpdateTodo={handleUpdateTodo}
                  onDeleteTodo={handleDeleteTodo}
                  onToggleDone={handleToggleTodoDone}
                  onTogglePriority={handleToggleTodoPriority}
                />
              )}
              
              {currentView === 'weekly' && (
                <WeeklyTaskView 
                  goals={goals}
                  tasks={tasks}
                  onGoalClick={(goalId) => {
                    setSelectedGoalId(goalId);
                    setCurrentView('overview');
                  }}
                />
              )}

              {currentView === 'task-timeline' && (
                <TaskTimelinePage 
                  goals={goals}
                  tasks={tasks}
                />
              )}

              {currentView === 'life-goals' && (
                <LifeGoalsPage />
              )}

              {currentView === 'hierarchy' && (
                <GoalHierarchyPage 
                  goals={goals}
                  monthlyGoals={monthlyGoals}
                  tasks={tasks}
                  lifeGoals={lifeGoals}
                />
              )}
            </main>
            
            {/* Panels */}
            <GoalEditPanel
              goal={editingGoalId ? goals.find(g => g.id === editingGoalId) || null : null}
              isOpen={isEditPanelOpen}
              onClose={() => setIsEditPanelOpen(false)}
              onSave={handleSaveEditedGoal}
              onDelete={handleDeleteGoal}
            />
            
            {monthlyGoalTargetId ? (
              <MonthlyGoalPanel
                goalId={monthlyGoalTargetId}
                goalTitle={goals.find(g => g.id === monthlyGoalTargetId)?.title || ''}
                isOpen={isMonthlyGoalPanelOpen}
                onClose={() => setIsMonthlyGoalPanelOpen(false)}
                onSave={handleSaveMonthlyGoal}
              />
            ) : null}

            <EditMonthlyGoalPanel
              monthlyGoal={editingMonthlyGoalId ? monthlyGoals.find(mg => mg.id === editingMonthlyGoalId) || null : null}
              isOpen={isEditMonthlyGoalPanelOpen}
              onClose={() => setIsEditMonthlyGoalPanelOpen(false)}
              onSave={handleSaveEditedMonthlyGoal}
              onDelete={handleDeleteMonthlyGoal}
            />
            
            {/* Modals */}
            <AddGoalModal 
              isOpen={isAddGoalModalOpen}
              onClose={() => setIsAddGoalModalOpen(false)}
              onSave={handleSaveGoal}
            />
            
            
            <UpdateProgressPanel
              isOpen={isUpdateProgressPanelOpen}
              onClose={() => setIsUpdateProgressPanelOpen(false)}
              task={updatingTaskId ? tasks.find(t => t.id === updatingTaskId) || null : null}
              onSave={handleSaveProgress}
            />
            
            {/* Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-3">
              {currentView === 'overview' && (
                <button
                  onClick={() => setIsAddGoalModalOpen(true)}
                  className="bg-[#805232] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#6b4427] transition-all hover:scale-105 flex items-center gap-2"
                >
                  <span className="text-xl">+</span>
                  Add Goal
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}