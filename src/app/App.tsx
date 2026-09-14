import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Sidebar } from './components/Sidebar';
import { GoalsPage } from './components/GoalsPage';
import { GoalDetail } from './components/GoalDetail';
import { TaskTrackingView } from './components/TaskTrackingView';
import { TaskTimelinePage } from './components/TaskTimelinePage';
import { TodosPage } from './components/TodosPage';
import { LifeGoalsPage } from './components/LifeGoalsPage';
import { ProfilePage } from './components/ProfilePage';
import { GoalEditPanel } from './components/GoalEditPanel';
import { MonthlyGoalPanel } from './components/MonthlyGoalPanel';
import { EditMonthlyGoalPanel } from './components/EditMonthlyGoalPanel';
import { UpdateProgressPanel } from './components/UpdateProgressPanel';
import { AddGoalModal } from './components/AddGoalModal';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { OnboardingPage } from './components/OnboardingPage';
import { JournalScreen } from './components/JournalScreen';
import { mockGoals, mockMonthlyGoals, mockTasks, mockWeeklyCheckIns } from './data/mockData';
import { Goal, MonthlyGoal, Task, WeeklyCheckIn, Todo, LifeGoal, JournalNotebook, ReminderOptions } from './types';
import { goalsApi, authApi, monthlyGoalsApi, tasksApi, todosApi, lifeGoalsApi, journalApi, googleCalendarApi } from './services/api';

type View = 'overview' | 'detail' | 'today' | 'weekly' | 'task-timeline' | 'todos' | 'life-goals' | 'profile' | 'onboarding' | 'journal';

// Helper function to check if user is under 18
const isUserKid = (dob?: string): boolean => {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age < 18;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());
  const [showRegister, setShowRegister] = useState(false);
  const [isKidsMode, setIsKidsMode] = useState(() => {
    const savedKidsMode = localStorage.getItem('isKidsMode');
    return savedKidsMode === 'true';
  });
  const [currentView, setCurrentView] = useState<View>(() => {
    const savedView = localStorage.getItem('currentView') as View | null;
    // 'weekly' redirects to 'today' since they're now the same tabbed view
    if (savedView === 'weekly') return 'today';
    return (savedView && ['overview', 'detail', 'today', 'weekly', 'task-timeline', 'todos', 'life-goals', 'onboarding', 'journal'].includes(savedView))
      ? savedView
      : 'overview';
  });
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  
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
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [lifeGoals, setLifeGoals] = useState<LifeGoal[]>([]);
  const [journalNotebooks, setJournalNotebooks] = useState<JournalNotebook[]>([]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Calculate onboarding step (0-4) based on fetched data
  const calculateOnboardingStep = (fetchedLifeGoals: LifeGoal[], fetchedGoals: Goal[], fetchedTasks: Task[]): number => {
    if (!fetchedLifeGoals || fetchedLifeGoals.length === 0) return 0;
    if (!fetchedGoals || fetchedGoals.length === 0) return 1;
    if (!fetchedTasks || fetchedTasks.length === 0) return 2;
    return 3; // Tasks exist, but might not have logged today
  };

  const onboardingStep = calculateOnboardingStep(lifeGoals, goals, tasks);

  // Silent refresh after task saves — no loading spinner, no view reset
  const refreshTasksQuietly = async () => {
    try {
      const [fetchedGoals, fetchedTasks] = await Promise.all([
        goalsApi.getGoals(),
        tasksApi.getAllTasks(),
      ]);
      setGoals(fetchedGoals);
      setTasks(fetchedTasks);
    } catch {
      // Silently ignore — stale data is better than a broken interstitial
    }
  };

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
        tasksApi.getAllTasks(),
        todosApi.getAllTodos(),
        lifeGoalsApi.getLifeGoals(),
        journalApi.getNotebooks()
      ]);
      const [fetchedGoals, fetchedTasks, fetchedTodos, fetchedLifeGoals, fetchedJournalNotebooks] = await Promise.race([fetchPromise, timeoutPromise]) as any;

      console.log('Goals fetched successfully:', fetchedGoals);
      console.log('Tasks fetched successfully:', fetchedTasks);
      console.log('Todos fetched successfully:', fetchedTodos);
      console.log('Life goals fetched successfully:', fetchedLifeGoals);
      setGoals(fetchedGoals);
      setMonthlyGoals([]);
      setTasks(fetchedTasks);
      setTodos(fetchedTodos);
      setLifeGoals(fetchedLifeGoals || []);
      setJournalNotebooks(fetchedJournalNotebooks || []);
      
      // Check if user is in kids mode
      console.log('=== CHECKING KIDS MODE IN FETCH GOALS ===');
      const userDOB = authApi.getUserDOB();
      console.log('User DOB from localStorage in fetchGoals:', userDOB);
      console.log('All localStorage keys:', Object.keys(localStorage));
      console.log('userDOB value:', localStorage.getItem('userDOB'));
      if (userDOB) {
        const isKid = isUserKid(userDOB);
        console.log('Is user a kid?', isKid);
        setIsKidsMode(isKid);
      } else {
        console.log('NO DOB FOUND - Kids mode NOT activated');
      }
      
      // If no life goals exist, redirect to onboarding page
      if (!fetchedLifeGoals || fetchedLifeGoals.length === 0) {
        setCurrentView('onboarding');
      }
      
      setGoalsLoading(false);
    } catch (error: any) {
      const errorMsg = error?.message || error?.response?.data?.message || 'Unknown error fetching goals';
      console.error('Failed to fetch goals:', error);
      console.error('Error details:', errorMsg);
      console.log('Using mock data as fallback');
      // Fall back to mock data on error
      setGoals(mockGoals);
      setMonthlyGoals([]);
      setTasks(mockTasks);
      setLoadingError(null); // Clear error after fallback
      setGoalsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('isAuthenticated is true, fetching goals');
      
      // Check kids mode from stored DOB (extracted from JWT during login)
      const userDOB = authApi.getUserDOB();
      console.log('Checking kids mode - User DOB:', userDOB);
      if (userDOB) {
        const isKid = isUserKid(userDOB);
        console.log('Is user a kid?', isKid);
        setIsKidsMode(isKid);
      }
      
      fetchGoals();
      googleCalendarApi.getStatus()
        .then(status => setCalendarConnected(status.connected))
        .catch(() => setCalendarConnected(false));
    } else {
      console.log('isAuthenticated is false, skipping goal fetch');
      setGoalsLoading(false);
      setIsKidsMode(false);
    }
  }, [isAuthenticated]);

  // Land back on Profile after the Google Calendar OAuth redirect and surface the result
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const calendarResult = params.get('calendar');
    if (!calendarResult) return;

    if (calendarResult === 'connected') {
      toast.success('Google Calendar connected');
      setCalendarConnected(true);
    } else if (calendarResult === 'error') {
      toast.error('Failed to connect Google Calendar. Please try again.');
    }
    setCurrentView('profile');
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  // Save current view to localStorage
  useEffect(() => {
    localStorage.setItem('currentView', currentView);
  }, [currentView]);

  // Save kids mode to localStorage
  useEffect(() => {
    localStorage.setItem('isKidsMode', isKidsMode.toString());
  }, [isKidsMode]);
  
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
    setJournalNotebooks([]);
    await authApi.logout();
    setIsAuthenticated(false);
  };

  const handleAddTodo = async (title: string, dueDate: string) => {
    try {
      const newTodo = await todosApi.createTodo({
        title,
        dueDate,
        priority: false,
      });
      setTodos([...todos, newTodo]);
    } catch (error: any) {
      console.error('Failed to create todo:', error);
      toast.error('Failed to add todo: ' + (error?.response?.data?.message || error?.message || 'Unknown error'));
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

  const handleReorderTodos = async (orderedIds: string[]) => {
    const orderById = new Map(orderedIds.map((id, index) => [id, index]));
    setTodos(prev =>
      [...prev]
        .map(t => (orderById.has(t.id) ? { ...t, order: orderById.get(t.id)! } : t))
        .sort((a, b) => a.order - b.order),
    );
    try {
      await todosApi.reorderTodos(orderedIds);
    } catch (error: any) {
      console.error('Failed to persist todo order:', error);
      toast.error('Failed to save new order');
    }
  };

  const computeReminderEventStart = (options: ReminderOptions): Date => {
    const [year, month, day] = options.date.split('-').map(Number);
    if (options.allDay) return new Date(year, month - 1, day);
    const [hour, minute] = (options.time || '00:00').split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute);
  };

  const applyReminderToTodos = (todoId: string, options: ReminderOptions, eventId: string, htmlLink: string) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === todoId
          ? {
              ...t,
              googleEventId: eventId,
              googleEventLink: htmlLink,
              googleEventStart: computeReminderEventStart(options),
              googleEventAllDay: options.allDay,
              googleEventRecurrence: options.recurrence,
              googleEventReminderMinutes: options.reminderMinutesBefore,
            }
          : t,
      ),
    );
  };

  const handleCreateReminder = async (todoId: string, options: ReminderOptions) => {
    try {
      const { eventId, htmlLink } = await googleCalendarApi.createReminder(todoId, options);
      applyReminderToTodos(todoId, options, eventId, htmlLink);
      toast.success('Added to Google Calendar');
    } catch (error: any) {
      if (error?.response?.status === 404 && error?.response?.data?.message?.includes('not connected')) {
        toast.error('Connect Google Calendar from your Profile first');
        return;
      }
      console.error('Failed to create Google Calendar reminder:', error);
      toast.error('Failed to add to Google Calendar');
    }
  };

  const handleUpdateReminder = async (todoId: string, options: ReminderOptions) => {
    try {
      const { eventId, htmlLink } = await googleCalendarApi.updateReminder(todoId, options);
      applyReminderToTodos(todoId, options, eventId, htmlLink);
      toast.success('Calendar reminder updated');
    } catch (error: any) {
      console.error('Failed to update Google Calendar reminder:', error);
      toast.error('Failed to update calendar reminder');
    }
  };

  const handleCreateJournalNotebook = async (data: { name: string; color?: string }): Promise<JournalNotebook> => {
    const created = await journalApi.createNotebook(data);
    setJournalNotebooks(prev => [...prev, created]);
    return created;
  };

  const handleUpdateJournalNotebook = async (id: string, data: { name?: string; color?: string }) => {
    try {
      const updated = await journalApi.updateNotebook(id, data);
      setJournalNotebooks(prev => prev.map(n => n.id === id ? updated : n));
    } catch (error: any) {
      console.error('Failed to update journal notebook:', error);
    }
  };

  const handleDeleteJournalNotebook = async (id: string) => {
    try {
      await journalApi.deleteNotebook(id);
      setJournalNotebooks(prev => prev.filter(n => n.id !== id));
    } catch (error: any) {
      console.error('Failed to delete journal notebook:', error);
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
      <Toaster position="top-right" richColors />
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
        <div className="min-h-screen bg-[#f5f0eb] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#805232] mb-4"></div>
            <p className="text-[#805232] font-medium">Loading your goals...</p>
            {loadingError && <p className="text-red-600 text-sm mt-4">{loadingError}</p>}
          </div>
        </div>
      ) : (
        <div className={`min-h-screen flex font-bold ${isKidsMode ? '' : 'bg-[#f5f0eb]'}`} style={{ ...(isKidsMode && { backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }), fontFamily: isKidsMode ? 'Marker Felt, Chalkboard SE, Comic Sans MS, sans-serif' : 'inherit', fontSize: isKidsMode ? '18px' : 'inherit' }}>
          {/* Sidebar */}
          <Sidebar currentView={currentView} onNavigate={setCurrentView} onLogout={handleLogout} isKidsMode={isKidsMode} onboardingStep={onboardingStep} lifeGoalsCount={lifeGoals.length} goalsCount={goals.length} tasksCount={tasks.length} todosCount={todos.length} journalCount={journalNotebooks.length} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Main Content Area with Panel */}
          <div className={`flex-1 flex flex-col transition-all duration-300 overflow-hidden ${isEditPanelOpen ? 'md:mr-96' : ''}`}>
            {/* Mobile top bar */}
            <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-[#3d2210] text-white sticky top-0 z-30 flex-shrink-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
                className="p-1 -ml-1"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="font-bold">Gritio</span>
            </div>
            {/* Main Content */}
            <main className="py-2 sm:py-4 md:py-8 flex-1 overflow-y-auto overflow-x-hidden">
              {currentView === 'overview' && (
                <GoalsPage
                  goals={goals}
                  monthlyGoals={monthlyGoals}
                  tasks={tasks}
                  lifeGoals={lifeGoals}
                  onSelectGoal={handleSelectGoal}
                  onAddMonthlyGoal={handleAddMonthlyGoalFromOverview}
                  onAddTask={handleAddTaskFromOverview}
                  onEditGoal={handleEditGoal}
                  onEditMonthlyGoal={handleEditMonthlyGoal}
                  onUpdateGoal={handleSaveEditedGoal}
                  onDeleteGoal={handleDeleteGoal}
                  onRefreshGoals={fetchGoals}
                  isKidsMode={isKidsMode}
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
                <TaskTrackingView
                  tasks={tasks}
                  goals={goals}
                  defaultTab="today"
                  onTasksUpdate={refreshTasksQuietly}
                />
              )}

              {currentView === 'onboarding' && (
                <OnboardingPage
                  lifeGoals={lifeGoals}
                  goals={goals}
                  tasks={tasks}
                  onNavigate={setCurrentView}
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
                  onReorder={handleReorderTodos}
                  calendarConnected={calendarConnected}
                  onCreateReminder={handleCreateReminder}
                  onUpdateReminder={handleUpdateReminder}
                  onConnectCalendar={() => setCurrentView('profile')}
                />
              )}

              {currentView === 'journal' && (
                <JournalScreen
                  notebooks={journalNotebooks}
                  onCreateNotebook={handleCreateJournalNotebook}
                  onUpdateNotebook={handleUpdateJournalNotebook}
                  onDeleteNotebook={handleDeleteJournalNotebook}
                />
              )}
              
              {currentView === 'weekly' && (
                <TaskTrackingView
                  tasks={tasks}
                  goals={goals}
                  defaultTab="weekly"
                  onTasksUpdate={refreshTasksQuietly}
                />
              )}

              {currentView === 'task-timeline' && (
                <TaskTimelinePage 
                  goals={goals}
                  tasks={tasks}
                  isKidsMode={isKidsMode}
                />
              )}
              
              {currentView === 'life-goals' && (
                <LifeGoalsPage 
                  lifeGoals={lifeGoals}
                  onRefresh={fetchGoals}
                />
              )}
              
              {currentView === 'profile' && (
                <ProfilePage
                  onBack={() => setCurrentView('overview')}
                  isKidsMode={isKidsMode}
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