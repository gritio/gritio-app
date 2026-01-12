import axios, { AxiosInstance } from 'axios';
import { Goal, MonthlyGoal, Task, Todo } from '../types';
import { getToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log('=== API Configuration ===');
console.log('VITE_API_URL env:', import.meta.env.VITE_API_URL);
console.log('API_BASE_URL:', API_BASE_URL);
console.log('========================');

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    console.log('API Interceptor - Token from getToken():', token ? token.substring(0, 20) + '...' : 'null');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('API Interceptor - Authorization header set');
    } else {
      console.warn('API Interceptor - No token available');
    }
  } catch (error) {
    console.error('Failed to get token:', error);
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string): Promise<{ access_token: string; user: any }> => {
    try {
      console.log('API: Sending login request to /auth/login');
      const response = await apiClient.post('/auth/login', { email, password });
      console.log('API: Login response received:', response.data);
      const { access_token, user } = response.data;
      localStorage.setItem('authToken', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user.id);
      return { access_token, user };
    } catch (error) {
      console.error('API: Login request failed:', error);
      throw error;
    }
  },

  register: async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    dob?: string;
  }): Promise<{ message: string; user: any }> => {
    try {
      console.log('API: Sending register request to /auth/register');
      const response = await apiClient.post('/auth/register', data);
      console.log('API: Register response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Register request failed:', error);
      throw error;
    }
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    try {
      console.log('API: Sending email verification request to /auth/verify-email');
      const response = await apiClient.post('/auth/verify-email', { token });
      console.log('API: Email verification response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Email verification request failed:', error);
      throw error;
    }
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getUserId: (): string | null => {
    return localStorage.getItem('userId');
  },
};

export const goalsApi = {
  createGoal: async (goalData: {
    title: string;
    area: string;
    unit: string;
    startDate: string;
    endDate: string;
    remarks?: string;
    weightGoal?: { startWeight: number; currentWeight: number; targetWeight: number };
    countGoal?: { targetCount: number };
    timeGoal?: { targetHours: number; targetMinutes?: number };
  }): Promise<Goal> => {
    try {
      console.log('API: Creating goal with data:', goalData);
      const response = await apiClient.post('/goals', goalData);
      console.log('API: Goal created successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API: Goal creation failed:', error.response?.data || error.message);
      throw error;
    }
  },

  getGoals: async (): Promise<Goal[]> => {
    try {
      console.log('API: Fetching goals from /goals');
      const response = await apiClient.get('/goals');
      console.log('API: Goals fetched successfully, count:', response.data?.length || 0);
      return response.data;
    } catch (error: any) {
      console.error('API: Failed to fetch goals:', error.response?.data || error.message);
      throw error;
    }
  },

  getGoal: async (id: string): Promise<Goal> => {
    const response = await apiClient.get(`/goals/${id}`);
    return response.data;
  },

  updateGoal: async (
    id: string,
    goalData: {
      title?: string;
      remarks?: string;
      weightGoal?: { startWeight?: number; currentWeight?: number; targetWeight?: number };
      countGoal?: { targetCount?: number; currentCount?: number };
      timeGoal?: { targetHours?: number; targetMinutes?: number; currentHours?: number; currentMinutes?: number };
    }
  ): Promise<Goal> => {
    try {
      console.log('API: Updating goal with data:', goalData);
      const response = await apiClient.put(`/goals/${id}`, goalData);
      console.log('API: Goal updated successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API: Goal update failed:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteGoal: async (id: string): Promise<void> => {
    await apiClient.delete(`/goals/${id}`);
  },
};

export const monthlyGoalsApi = {
  createMonthlyGoal: async (monthlyGoalData: {
    goalId: string;
    title: string;
    month: string;
    monthDate: string;
    target: number;
    unit: string;
    remarks?: string;
  }): Promise<MonthlyGoal> => {
    const response = await apiClient.post('/monthly-goals', monthlyGoalData);
    return response.data;
  },

  getAllMonthlyGoals: async (): Promise<MonthlyGoal[]> => {
    try {
      console.log('API: Fetching all monthly goals');
      const response = await apiClient.get('/monthly-goals');
      console.log('API: Monthly goals fetched successfully, count:', response.data?.length || 0);
      return response.data;
    } catch (error: any) {
      console.error('API: Failed to fetch monthly goals:', error.response?.data || error.message);
      throw error;
    }
  },

  getMonthlyGoalsByGoal: async (goalId: string): Promise<MonthlyGoal[]> => {
    const response = await apiClient.get(`/monthly-goals/goal/${goalId}`);
    return response.data;
  },

  getMonthlyGoal: async (id: string): Promise<MonthlyGoal> => {
    const response = await apiClient.get(`/monthly-goals/${id}`);
    return response.data;
  },

  updateMonthlyGoal: async (
    id: string,
    monthlyGoalData: { title?: string; target?: number; currentProgress?: number; status?: string; remarks?: string }
  ): Promise<MonthlyGoal> => {
    try {
      console.log('API: Updating monthly goal with data:', monthlyGoalData);
      const response = await apiClient.put(`/monthly-goals/${id}`, monthlyGoalData);
      console.log('API: Monthly goal updated successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API: Monthly goal update failed:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteMonthlyGoal: async (id: string): Promise<void> => {
    try {
      console.log('API: Deleting monthly goal:', id);
      await apiClient.delete(`/monthly-goals/${id}`);
      console.log('API: Monthly goal deleted successfully');
    } catch (error: any) {
      console.error('API: Monthly goal delete failed:', error.response?.data || error.message);
      throw error;
    }
  },
};

export const tasksApi = {
  createTask: async (taskData: {
    goalId: string;
    title: string;
    type: string;
    frequency: string;
    target: number;
    unit: string;
    timesPerWeek?: number;
  }): Promise<Task> => {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await apiClient.get('/tasks');
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch tasks:', error.response?.data || error.message);
      return [];
    }
  },

  getTasksByGoal: async (goalId: string): Promise<Task[]> => {
    const response = await apiClient.get(`/tasks/goal/${goalId}`);
    return response.data;
  },

  getTasksByMonthlyGoal: async (monthlyGoalId: string): Promise<Task[]> => {
    const response = await apiClient.get(`/tasks/monthly-goal/${monthlyGoalId}`);
    return response.data;
  },

  getTask: async (id: string): Promise<Task> => {
    const response = await apiClient.get(`/tasks/${id}`);
    return response.data;
  },

  updateTask: async (
    id: string,
    taskData: { title?: string; target?: number; currentProgress?: number }
  ): Promise<Task> => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  logCompletion: async (id: string, date: string, value: number): Promise<void> => {
    await apiClient.post(`/tasks/${id}/log-completion`, { date, value });
  },

  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  getHistory: async (id: string, days?: number): Promise<any[]> => {
    const response = await apiClient.get(`/tasks/${id}/history`, { params: { days } });
    return response.data;
  },

  getMonthCompletions: async (taskId: string, year: number, month: number): Promise<any[]> => {
    try {
      const response = await apiClient.get(`/tasks/${taskId}/completions`, { 
        params: { year, month } 
      });
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch month completions:', error.response?.data || error.message);
      return [];
    }
  },
};

export const todosApi = {
  createTodo: async (todoData: {
    title: string;
    description?: string;
    dueDate: string;
    priority?: boolean;
  }): Promise<Todo> => {
    try {
      const response = await apiClient.post('/todos', todoData);
      return response.data;
    } catch (error: any) {
      console.error('Failed to create todo:', error.response?.data || error.message);
      throw error;
    }
  },

  getAllTodos: async (): Promise<Todo[]> => {
    try {
      const response = await apiClient.get('/todos');
      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch todos:', error.response?.data || error.message);
      return [];
    }
  },

  getTodo: async (id: string): Promise<Todo> => {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  },

  updateTodo: async (
    id: string,
    todoData: {
      title?: string;
      description?: string;
      dueDate?: string;
      priority?: boolean;
      done?: boolean;
    }
  ): Promise<Todo> => {
    try {
      const response = await apiClient.put(`/todos/${id}`, todoData);
      return response.data;
    } catch (error: any) {
      console.error('Failed to update todo:', error.response?.data || error.message);
      throw error;
    }
  },

  deleteTodo: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/todos/${id}`);
    } catch (error: any) {
      console.error('Failed to delete todo:', error.response?.data || error.message);
      throw error;
    }
  },

  toggleDone: async (id: string, done: boolean): Promise<Todo> => {
    const response = await apiClient.put(`/todos/${id}/done`, { done });
    return response.data;
  },

  togglePriority: async (id: string, priority: boolean): Promise<Todo> => {
    const response = await apiClient.put(`/todos/${id}/priority`, { priority });
    return response.data;
  },

  bulkMarkDone: async (ids: string[]): Promise<{ count: number }> => {
    const response = await apiClient.post('/todos/bulk/mark-done', { ids });
    return response.data;
  },
};
