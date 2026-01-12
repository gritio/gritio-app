import { useState } from 'react';
import { authApi } from '../services/api';
import { Mail, Lock, User, Phone, Calendar, Eye, EyeOff } from 'lucide-react';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onBackToLogin: () => void;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
}

function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('At least 8 characters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One uppercase letter');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One number');
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  } else {
    feedback.push('One special character');
  }

  return { score, feedback };
}

export function RegisterPage({ onRegisterSuccess, onBackToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, feedback: [] });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    setPasswordStrength(validatePasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score === 0) return 'bg-gray-300';
    if (passwordStrength.score <= 2) return 'bg-red-500';
    if (passwordStrength.score === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score === 0) return 'No password';
    if (passwordStrength.score <= 2) return 'Weak';
    if (passwordStrength.score === 3) return 'Good';
    return 'Strong';
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.fullName || !formData.phone || !formData.dob || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (passwordStrength.score < 3) {
      setError('Password is too weak. Please meet all strength requirements');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await authApi.register({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        phone: formData.phone,
        dob: new Date(formData.dob).toISOString(),
      });
      
      alert('Registration successful! Please check your email to verify your account.');
      onRegisterSuccess();
    } catch (err: any) {
      console.error('Registration error:', err);
      const message = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FAFAFA] via-[#B8BABB] to-[#E8D5C4] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#805232] mb-2">Create Account</h1>
          <p className="text-[#805232] text-sm">Join HouseholdTracker today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#805232] mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-[#805232]" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#805232] mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-[#805232]" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#805232] mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-[#805232]" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#805232] mb-2">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-[#805232]" />
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#805232]"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`h-2 flex-1 rounded ${getPasswordStrengthColor()}`}></div>
                  <span className="text-xs font-semibold text-[#805232]">{getPasswordStrengthText()}</span>
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <ul className="text-xs text-gray-600 list-disc list-inside">
                    {passwordStrength.feedback.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#805232] mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-[#805232]" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805232]"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-[#805232]"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1"
              disabled={isLoading}
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms and Conditions and Privacy Policy
            </label>
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full text-[#805232] py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}
