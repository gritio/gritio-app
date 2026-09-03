import { useState } from 'react';
import { authApi } from '../services/api';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onShowRegister?: () => void;
}

export function GritioLogo() {
  return (
    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-[#805232]/20 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <rect width="100" height="100" fill="#805232" />
        <path
          d="M 20 70 L 50 30 L 80 70"
          stroke="white"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="30" r="6" fill="white" />
      </svg>
    </div>
  );
}

export function LoginPage({ onLoginSuccess, onShowRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authApi.login(email, password);
      setTimeout(() => onLoginSuccess(), 100);
    } catch (err: any) {
      console.error('Login error:', err);
      const message = err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F3] via-[#F3E9DE] to-[#E8D5C4] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 ring-1 ring-black/5 p-8 sm:p-10">
          <div className="text-center mb-8">
            <GritioLogo />
            <h1 className="text-2xl font-bold text-[#805232] mt-4 tracking-tight">Gritio</h1>
            <p className="text-gray-500 text-sm mt-1.5">Manage your life — goals, todos, and more</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#805232]/30 focus:border-[#805232] transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#805232]/30 focus:border-[#805232] transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#805232] text-white py-3 rounded-xl font-medium hover:bg-[#6b4427] hover:shadow-lg hover:shadow-[#805232]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Logging in…' : (
                <>
                  Login
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button
                onClick={onShowRegister}
                className="text-[#805232] font-semibold hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
