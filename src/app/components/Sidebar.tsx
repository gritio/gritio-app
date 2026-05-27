import { useState, useEffect } from 'react';
import { Heart, Target, LogOut, CheckSquare, Calendar, Rocket, Sun, Zap } from 'lucide-react';
import { AllyLogo } from './AllyLogo';
import { authApi } from '../services/api';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface SidebarProps {
  currentView: 'overview' | 'detail' | 'today' | 'weekly' | 'task-timeline' | 'todos' | 'life-goals' | 'profile' | 'onboarding';
  onNavigate: (view: 'overview' | 'detail' | 'today' | 'weekly' | 'task-timeline' | 'todos' | 'life-goals' | 'profile' | 'onboarding') => void;
  onLogout?: () => void;
  isKidsMode?: boolean;
  onboardingStep?: number;
  lifeGoalsCount?: number;
  goalsCount?: number;
  tasksCount?: number;
  todosCount?: number;
}

export function Sidebar({ currentView, onNavigate, onLogout, isKidsMode, onboardingStep = 0, lifeGoalsCount = 0, goalsCount = 0, tasksCount = 0, todosCount = 0 }: SidebarProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const user = authApi.getStoredUser();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isIconOnly = windowWidth < 768;

  // Determine if user is in onboarding
  const isOnboarding = onboardingStep < 4;

  const NavItem = ({ label, icon: Icon, view, isDimmed = false, count }: { label: string; icon: any; view: typeof currentView; isDimmed?: boolean; count?: number }) => {
    const isActive = currentView === view;
    const button = (
      <button
        onClick={() => onNavigate(view)}
        disabled={isDimmed}
        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-md transition-all text-sm font-medium ${
          isDimmed
            ? 'opacity-70 cursor-not-allowed text-white/50'
            : isActive
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white'
        }`}
        title={isIconOnly ? label : undefined}
      >
        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#e8c89a]' : isDimmed ? 'text-white/35' : 'text-white/40'}`} />
        {!isIconOnly && <span className="flex-1 text-left">{label}</span>}
        {count !== undefined && count > 0 && (
          <span className="text-xs bg-white/20 text-white px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium">{count}</span>
        )}
      </button>
    );

    if (isIconOnly) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right" className="bg-[#805232] text-white">{label}</TooltipContent>
        </Tooltip>
      );
    }
    return button;
  };

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="text-xs uppercase tracking-widest text-white/30 px-3 py-3 font-medium">{label}</div>
  );

  return (
    <div className="w-44 bg-[#3d2210] min-h-screen shadow-lg flex flex-col flex-shrink-0">
      {/* Logo/Brand */}
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <AllyLogo size={32} />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">Gritio</h1>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {/* SETUP Section */}
        {isOnboarding && (
          <>
            <SectionLabel label="Setup" />
            <div className="relative mb-2">
              <button
                onClick={() => onNavigate('onboarding')}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-md transition-all text-sm font-medium ${
                  currentView === 'onboarding'
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Rocket className={`w-4 h-4 flex-shrink-0 ${currentView === 'onboarding' ? 'text-[#e8c89a]' : 'text-white/40'}`} />
                <span className="flex-1 text-left">Get started</span>
                <span className="text-xs font-bold bg-[#805232] text-white px-2 py-1 rounded-full">{onboardingStep}/4</span>
              </button>
            </div>
            <div className="border-t border-white/10 my-2"></div>
          </>
        )}

        {/* GOALS Section */}
        <SectionLabel label="Goals" />
        <NavItem label="Life goals" icon={Heart} view="life-goals" isDimmed={false} count={lifeGoalsCount} />
        <NavItem label="Yearly goals" icon={Target} view="overview" isDimmed={isOnboarding && lifeGoalsCount === 0} count={goalsCount} />
        <div className="border-t border-white/10 my-2"></div>

        {/* DAILY Section */}
        <SectionLabel label="Daily" />
        <NavItem label="This week" icon={Calendar} view="weekly" isDimmed={isOnboarding && tasksCount === 0} count={tasksCount} />
        <NavItem label="Today" icon={Sun} view="today" isDimmed={isOnboarding && tasksCount === 0} count={tasksCount} />
        <div className="border-t border-white/10 my-2"></div>

        {/* OTHERS Section */}
        <SectionLabel label="Others" />
        <NavItem label="Todos" icon={CheckSquare} view="todos" isDimmed={false} count={todosCount} />
        <div className="border-t border-white/10 my-2"></div>

        {/* REPORTS Section */}
        <SectionLabel label="Reports" />
        <NavItem label="Task Timeline" icon={Zap} view="task-timeline" isDimmed={isOnboarding && tasksCount === 0} count={tasksCount} />
      </nav>

      {/* Footer Section */}
      <div className="p-3 border-t border-white/10">
        {user && (
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#805232] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {(user.name || user.email)?.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-xs font-medium truncate">{user.name || user.email}</p>
                <p className="text-white/40 text-xs">Settings · Logout</p>
              </div>
            </div>
          </div>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-white/60 hover:text-white text-sm rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
