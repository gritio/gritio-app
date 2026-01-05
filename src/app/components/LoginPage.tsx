import { useState } from 'react';
import { authApi } from '../services/api';
import { Mail, Lock } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login with email:', email);
      const result = await authApi.login(email, password);
      console.log('Login successful:', result);
      setTimeout(() => onLoginSuccess(), 100);
    } catch (err: any) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setError('');
    setIsLoading(true);
    setEmail(demoEmail);

    try {
      await authApi.login(demoEmail, 'password123');
      setTimeout(() => onLoginSuccess(), 100);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FAFAFA] via-[#B8BABB] to-[#E8D5C4] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#805232] mb-2">HouseholdTracker</h1>
          <p className="text-[#805232] text-sm">Manage your household goals</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-[#805232] mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-[#805232]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#805232] mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-[#805232]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#805232] text-white py-2 rounded-lg font-medium hover:bg-[#6b4427] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#805232]">Demo Users</span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('sowmyasniyer@gmail.com')}
            disabled={isLoading}
            className="w-full bg-[#DCDCDC] border border-[#805232] text-[#805232] py-2 rounded-lg font-medium hover:bg-[#DCDCDC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Demo: Sowmya Sharath
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('sharathnatraj@gmail.com')}
            disabled={isLoading}
            className="w-full bg-[#DCDCDC] border border-[#805232] text-[#805232] py-2 rounded-lg font-medium hover:bg-[#DCDCDC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Demo: Sharath Nataraj
          </button>
        </div>

        <p className="text-xs text-[#805232] text-center mt-4">
          Demo password: password123
        </p>
      </div>
    </div>
  );
}
