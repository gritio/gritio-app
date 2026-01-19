import { useState, useEffect } from 'react';
import { Calendar, Target, LogOut, CheckSquare, BarChart3, Zap } from 'lucide-react';
import { AllyLogo } from './AllyLogo';
import { authApi } from '../services/api';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface SidebarProps {
  currentView: 'overview' | 'detail' | 'today' | 'weekly' | 'task-timeline' | 'todos';
  onNavigate: (view: 'overview' | 'detail' | 'today' | 'weekly' | 'task-timeline' | 'todos') => void;
  onLogout?: () => void;
}

export function Sidebar({ currentView, onNavigate, onLogout }: SidebarProps) {
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

  const menuItems = [
    {
      id: 'overview',
      label: 'Goals',
      icon: Target,
      view: 'overview' as const
    },
    {
      id: 'weekly',
      label: 'Weekly Check-in',
      icon: BarChart3,
      view: 'weekly' as const
    },
    {
      id: 'task-timeline',
      label: 'Task Timeline',
      icon: Zap,
      view: 'task-timeline' as const
    },
    {
      id: 'today',
      label: 'Today Tasks',
      icon: Calendar,
      view: 'today' as const
    },
    {
      id: 'todos',
      label: 'Todos',
      icon: CheckSquare,
      view: 'todos' as const
    }
  ];

  return (
    <div className={`${isIconOnly ? 'w-16' : 'w-48'} bg-[#DCDCDC] min-h-screen shadow-lg flex flex-col flex-shrink-0 transition-all duration-300`}>
      {/* Logo/Brand + Menu - Fixed at top */}
      <div className="sticky top-0 z-10 bg-[#DCDCDC]">
        <div className="p-3 border-b border-[#B8B9BA]">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-8 h-8 flex items-center justify-center">
              <AllyLogo size={32} />
            </div>
            {!isIconOnly && (
              <div>
                <h1 className="text-[#805232] font-bold text-sm">Gritio</h1>
                <p className="text-[#805232] text-xs leading-none">Small Steps, Big Results</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items - Sticky */}
        <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;

          const button = (
            <button
              key={item.id}
              onClick={() => onNavigate(item.view)}
              className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-all text-sm ${
                isActive
                  ? 'bg-[#805232] text-white shadow-md'
                  : 'text-[#805232] hover:bg-[#805232] hover:text-white'
              } ${isIconOnly ? 'justify-center' : ''}`}
              title={isIconOnly ? item.label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isIconOnly && <span className="font-bold text-sm">{item.label}</span>}
            </button>
          );

          if (isIconOnly) {
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  {button}
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[#805232] text-white">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return button;
        })}
        </nav>
      </div>

      {/* Footer Section - Sticks to bottom when scrolling */}
      <div className="sticky bottom-0 p-2 border-t border-[#B8B9BA] space-y-1 bg-[#DCDCDC] mt-auto">
        {user && !isIconOnly && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 cursor-help text-center">
                <p className="text-[#805232] text-xs font-medium">Logged in as</p>
                <p className="text-[#805232] text-xs font-bold truncate">{user.name || user.email}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-[#805232] text-white">
              {user.name || user.email}
            </TooltipContent>
          </Tooltip>
        )}
        {onLogout && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onLogout}
                className={`w-full flex items-center gap-2 px-2 py-1 bg-[#DCDCDC] text-[#805232] rounded text-xs hover:bg-[#C0C0C0] transition-colors font-medium border border-[#805232] ${isIconOnly ? 'justify-center' : ''}`}
                title={isIconOnly ? 'Logout' : undefined}
              >
                <LogOut className="w-3 h-3" />
                {!isIconOnly && 'Logout'}
              </button>
            </TooltipTrigger>
            {isIconOnly && (
              <TooltipContent side="right" className="bg-[#805232] text-white">
                Logout
              </TooltipContent>
            )}
          </Tooltip>
        )}
      </div>
    </div>
  );
}
