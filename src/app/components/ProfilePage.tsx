import { useState, useEffect } from 'react';
import { ArrowLeft, Save, X, Calendar, CheckCircle2, Bell, Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { googleCalendarApi } from '../services/api';
import {
  getDailyReminderTime,
  setDailyReminderTime,
  getWeeklyReminderDay,
  setWeeklyReminderDay,
  getWeeklyReminderTime,
  setWeeklyReminderTime,
} from '../utils/notifications';

const WEEKDAY_OPTIONS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

interface ProfilePageProps {
  onBack: () => void;
  isKidsMode?: boolean;
  onNotifySettingsChanged: () => void;
}

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  dob: string | null;
  phone: string | null;
  coins: number;
}

export function ProfilePage({ onBack, isKidsMode, onNotifySettingsChanged }: ProfilePageProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
  });
  const [calendarStatus, setCalendarStatus] = useState<{ connected: boolean; googleEmail?: string } | null>(null);
  const [isCalendarActionPending, setIsCalendarActionPending] = useState(false);
  const [dailyTime, setDailyTime] = useState(getDailyReminderTime);
  const [weeklyDay, setWeeklyDay] = useState(getWeeklyReminderDay);
  const [weeklyTime, setWeeklyTime] = useState(getWeeklyReminderTime);

  const handleDailyTimeChange = (value: string) => {
    setDailyTime(value);
    setDailyReminderTime(value);
    onNotifySettingsChanged();
  };

  const handleWeeklyDayChange = (value: number) => {
    setWeeklyDay(value);
    setWeeklyReminderDay(value);
    onNotifySettingsChanged();
  };

  const handleWeeklyTimeChange = (value: string) => {
    setWeeklyTime(value);
    setWeeklyReminderTime(value);
    onNotifySettingsChanged();
  };

  useEffect(() => {
    fetchProfile();
    fetchCalendarStatus();

    if (!Capacitor.isNativePlatform()) return;
    // If the user closes the system browser tab without finishing (or cancels),
    // don't leave the Connect button stuck in a disabled "pending" state.
    const listenerPromise = Browser.addListener('browserFinished', () => {
      setIsCalendarActionPending(false);
    });
    return () => {
      listenerPromise.then(listener => listener.remove());
    };
  }, []);

  const fetchCalendarStatus = async () => {
    try {
      const status = await googleCalendarApi.getStatus();
      setCalendarStatus(status);
    } catch (err) {
      console.error('Failed to load Google Calendar status', err);
    }
  };

  const handleConnectCalendar = async () => {
    setIsCalendarActionPending(true);
    try {
      const isNative = Capacitor.isNativePlatform();
      const { url } = await googleCalendarApi.getConnectUrl(isNative ? 'native' : 'web');
      if (isNative) {
        // Google blocks its OAuth consent screen inside an embedded WebView —
        // this has to open in the device's real browser, not navigate in-app.
        await Browser.open({ url });
      } else {
        window.location.href = url;
      }
    } catch (err) {
      console.error('Failed to start Google Calendar connect flow', err);
      setIsCalendarActionPending(false);
    }
  };

  const handleDisconnectCalendar = async () => {
    if (!confirm('Disconnect Google Calendar? Existing calendar events will stay, but new reminders won’t be created until you reconnect.')) {
      return;
    }
    setIsCalendarActionPending(true);
    try {
      await googleCalendarApi.disconnect();
      setCalendarStatus({ connected: false });
    } catch (err) {
      console.error('Failed to disconnect Google Calendar', err);
    } finally {
      setIsCalendarActionPending(false);
    }
  };

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
      <div className="max-w-2xl mx-auto p-3 sm:p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className={`rounded-lg border-2 p-6 ${isKidsMode ? 'bg-[#00FFFF] bg-opacity-60 border-[#0099FF]' : 'bg-white border-gray-200'}`}>
          {!isEditing ? (
            <>
              {/* Compact summary — full details are collapsed by default */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#805232] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {(profile.name || profile.email).substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-bold text-[#805232] truncate">{profile.name || profile.email}</p>
                    <p className="text-xs text-gray-500 truncate">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-[#805232] hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit profile"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsProfileExpanded(v => !v)}
                    className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                    title={isProfileExpanded ? 'Hide details' : 'Show details'}
                  >
                    {isProfileExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isProfileExpanded && (
                <div className="space-y-6 mt-6 pt-6 border-t border-gray-100">
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
              )}
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

        {/* Google Calendar connection */}
        <div className={`mt-4 rounded-lg border-2 p-6 ${isKidsMode ? 'bg-[#00FFFF] bg-opacity-60 border-[#0099FF]' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-1">
            <Calendar className="w-5 h-5 text-[#805232]" />
            <h2 className="text-lg font-bold text-[#805232]">Google Calendar</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Connect your Google account to add one-click reminders for your todos.
          </p>

          {calendarStatus === null ? (
            <p className="text-sm text-gray-400">Checking connection…</p>
          ) : calendarStatus.connected ? (
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Connected as <span className="font-medium">{calendarStatus.googleEmail}</span>
              </div>
              <button
                onClick={handleDisconnectCalendar}
                disabled={isCalendarActionPending}
                className="px-3 py-1.5 text-sm rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleConnectCalendar}
              disabled={isCalendarActionPending}
              className="px-4 py-2 bg-[#805232] text-white rounded-lg hover:bg-[#6b4427] transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              {isCalendarActionPending ? 'Redirecting…' : 'Connect Google Calendar'}
            </button>
          )}
        </div>

        {/* Notification timing */}
        <div className={`mt-4 rounded-lg border-2 p-6 ${isKidsMode ? 'bg-[#00FFFF] bg-opacity-60 border-[#0099FF]' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-3 mb-1">
            <Bell className="w-5 h-5 text-[#805232]" />
            <h2 className="text-lg font-bold text-[#805232]">Notifications</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            When your daily and weekly reminders fire. What's included is controlled
            from the Todos page and each goal's task list.
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#805232]">Daily reminder time</label>
              <input
                type="time"
                value={dailyTime}
                onChange={e => handleDailyTimeChange(e.target.value)}
                className="w-full px-3 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#805232]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[#805232]">Weekly reminder</label>
              <div className="flex gap-2">
                <select
                  value={weeklyDay}
                  onChange={e => handleWeeklyDayChange(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#805232]"
                >
                  {WEEKDAY_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <input
                  type="time"
                  value={weeklyTime}
                  onChange={e => handleWeeklyTimeChange(e.target.value)}
                  className="flex-1 px-3 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#805232]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
