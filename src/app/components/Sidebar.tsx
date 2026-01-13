import { LayoutGrid, Calendar, TrendingUp, Target, LogOut, CheckSquare, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AllyLogo } from './AllyLogo';
import { authApi } from '../services/api';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface SidebarProps {
  currentView: 'overview' | 'detail' | 'today' | 'weekly' | 'todos';
  onNavigate: (view: 'overview' | 'detail' | 'today' | 'weekly' | 'todos') => void;
  onLogout?: () => void;
}

export function Sidebar({ currentView, onNavigate, onLogout }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>('overview');
  const user = authApi.getStoredUser();

  const menuItems = [
    {
      id: 'overview',
      label: 'Goals',
      icon: Target,
      view: 'overview' as const,
      submenu: [
        {
          id: 'weekly',
          label: 'Weekly Check-in',
          view: 'weekly' as const
        }
      ]
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
    <div className="w-64 bg-[#DCDCDC] min-h-screen shadow-lg">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-[#B8B9BA]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <AllyLogo size={40} />
          </div>
          <div>
            <h1 className="text-[#805232] font-bold text-lg">Gritio</h1>
            <p className="text-[#805232] text-xs">Small Steps, Big Results</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenu === item.id;
          const hasSubmenu = 'submenu' in item;
          const isActive = hasSubmenu ? currentView === item.view && !item.submenu.some(sub => currentView === sub.view) : currentView === item.view;
          const isActiveParent = hasSubmenu && item.submenu.some(sub => currentView === sub.view);

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (hasSubmenu) {
                    onNavigate(item.view);
                    setExpandedMenu(isExpanded ? null : item.id);
                  } else {
                    onNavigate(item.view);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#805232] text-white shadow-md'
                    : 'text-[#805232] hover:bg-[#805232] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="font-bold">{item.label}</span>
                </div>
                {hasSubmenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {hasSubmenu && isExpanded && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.id}
                      onClick={() => onNavigate(subitem.view)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                        currentView === subitem.view
                          ? 'bg-[#805232] text-white font-semibold'
                          : 'text-[#805232] hover:bg-[#805232] hover:text-white'
                      }`}
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-[#B8B9BA] space-y-1">
        {user && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-3 cursor-help text-center">
                <p className="text-[#805232] text-xs font-medium">Logged in as</p>
                <p className="text-[#805232] text-sm font-bold truncate">{user.name || user.email}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-[#805232] text-white">
              {user.name || user.email}
            </TooltipContent>
          </Tooltip>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#DCDCDC] text-[#805232] rounded-lg hover:bg-[#DCDCDC] transition-colors font-medium text-sm border border-[#805232]"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
