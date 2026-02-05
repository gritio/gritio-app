import { useState, useEffect } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
  isKidsMode?: boolean;
}

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  dob: string | null;
  phone: string | null;
  coins: number;
}

export function ProfilePage({ onBack, isKidsMode }: ProfilePageProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const apiUrl = (import.meta.env as any).VITE_API_URL || 'http://localhost:3000';
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${apiUrl}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
        });
      }
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError('');
      const apiUrl = (import.meta.env as any).VITE_API_URL || 'http://localhost:3000';
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${apiUrl}/users/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setIsEditing(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const calculateAge = (dob: string | null) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!profile) {
    return (
      <div className={`p-6 text-center ${isKidsMode ? 'bg-gradient-to-b from-[#00FFFF] to-[#00FF00] bg-opacity-20' : 'bg-white'}`}>
        Loading profile...
      </div>
    );
  }

  const age = calculateAge(profile.dob);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-4 max-w-2xl mx-auto">
          <button onClick={onBack} className="text-[#805232] hover:text-[#805232]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className={`text-2xl font-bold ${isKidsMode ? 'text-[#00FF00]' : 'text-[#805232]'}`}>
            My Profile
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className={`rounded-lg border-2 p-6 ${isKidsMode ? 'bg-[#00FFFF] bg-opacity-60 border-[#0099FF]' : 'bg-white border-gray-200'}`}>
          {!isEditing ? (
            <>
              {/* View Mode */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <p className={`text-sm font-semibold ${isKidsMode ? 'text-[#805232]' : 'text-gray-600'}`}>
                    Name
                  </p>
                  <p className="text-xl font-bold text-[#805232]">
                    {profile.name || 'Not set'}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className={`text-sm font-semibold ${isKidsMode ? 'text-[#805232]' : 'text-gray-600'}`}>
                    Email
                  </p>
                  <p className="text-lg text-[#805232]">
                    {profile.email}
                  </p>
                </div>

                {/* Date of Birth */}
                <div>
                  <p className={`text-sm font-semibold ${isKidsMode ? 'text-[#805232]' : 'text-gray-600'}`}>
                    Date of Birth
                  </p>
                  <p className="text-lg text-[#805232]">
                    {profile.dob
                      ? new Date(profile.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                      : 'Not set'}
                  </p>
                  {age !== null && (
                    <p className={`text-sm mt-1 ${isKidsMode ? 'text-[#805232]' : 'text-gray-500'}`}>
                      Age: {age}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <p className={`text-sm font-semibold ${isKidsMode ? 'text-[#805232]' : 'text-gray-600'}`}>
                    Phone
                  </p>
                  <p className="text-lg text-[#805232]">
                    {profile.phone || 'Not set'}
                  </p>
                </div>

                {/* Coins */}
                <div>
                  <p className={`text-sm font-semibold ${isKidsMode ? 'text-[#805232]' : 'text-gray-600'}`}>
                    Coins
                  </p>
                  <p className="text-xl font-bold text-[#805232]">
                    {profile.coins} 🪙
                  </p>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className={`mt-8 w-full py-2 rounded font-bold transition-colors ${
                  isKidsMode
                    ? 'bg-[#00FF00] text-black hover:bg-[#00DD00]'
                    : 'bg-[#805232] text-white hover:bg-[#704229]'
                }`}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#805232]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded border-2 ${
                      isKidsMode
                        ? 'border-[#0099FF] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#00FF00]'
                        : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#805232]'
                    }`}
                    placeholder="Enter name"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#805232]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded border-2 ${
                      isKidsMode
                        ? 'border-[#0099FF] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#00FF00]'
                        : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#805232]'
                    }`}
                    placeholder="Enter phone"
                  />
                </div>

                {/* DOB Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#805232]">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded border-2 ${
                      isKidsMode
                        ? 'border-[#0099FF] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#00FF00]'
                        : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#805232]'
                    }`}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`flex-1 py-2 rounded font-bold transition-colors flex items-center justify-center gap-2 ${
                    isKidsMode
                      ? 'bg-[#00FF00] text-black hover:bg-[#00DD00] disabled:opacity-50'
                      : 'bg-[#805232] text-white hover:bg-[#704229] disabled:opacity-50'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className={`flex-1 py-2 rounded font-bold transition-colors flex items-center justify-center gap-2 ${
                    isKidsMode
                      ? 'bg-gray-300 text-black hover:bg-gray-400'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
