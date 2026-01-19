import { LayoutGrid, Calendar, Target, LogOut, CheckSquare, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AllyLogo } from './AllyLogo';
import { authApi } from '../services/api';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface SidebarProps {
  currentView: 'overview' | 'detail' | 'today' | 'weekly' | 'task-timeline' | 'todos' | 'life-goals' | 'hierarchy';
  onNavigate: (view: 'overview' | 'detail' | 'today' | 'weekly' | 'task-timeline' | 'todos' | 'life-goals' | 'hierarchy') => void;
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
        },
        {
          id: 'task-timeline',
          label: 'Task Timeline',
          view: 'task-timeline' as const
        },
        {
          id: 'life-goals',
          label: 'Life Goals',
          view: 'life-goals' as const
        },
        {
          id: 'hierarchy',
          label: 'Goal Hierarchy',
          view: 'hierarchy' as const
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
    <div className="w-48 bg-[#DCDCDC] min-h-screen shadow-lg flex flex-col flex-shrink-0">
      {/* Logo/Brand + Menu - Fixed at top */}
      <div className="sticky top-0 z-10 bg-[#DCDCDC]">
        <div className="p-3 border-b border-[#B8B9BA]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <AllyLogo size={32} />
            </div>
            <div>
              <h1 className="text-[#805232] font-bold text-sm">Gritio</h1>
              <p className="text-[#805232] text-xs leading-none">Small Steps, Big Results</p>
            </div>
          </div>
        </div>

        {/* Menu Items - Sticky */}
        <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedMenu === item.id;
          const hasSubmenu = 'submenu' in item;
          const isActive = hasSubmenu ? currentView === item.view && !(hasSubmenu && (item as any).submenu.some((sub: any) => currentView === sub.view)) : currentView === item.view;

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
                className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all text-sm ${
                  isActive
                    ? 'bg-[#805232] text-white shadow-md'
                    : 'text-[#805232] hover:bg-[#805232] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="font-bold text-sm">{item.label}</span>
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
                <div className="ml-4 mt-1 space-y-1">
                  {(item as any).submenu.map((subitem: any) => (
                    <button
                      key={subitem.id}
                      onClick={() => onNavigate(subitem.view)}
                      className={`w-full text-left px-2 py-1 rounded text-xs transition-all ${
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
      </div>

      {/* Footer Section - Sticks to bottom when scrolling */}
      <div className="sticky bottom-0 p-2 border-t border-[#B8B9BA] space-y-1 bg-[#DCDCDC] mt-auto">
        {user && (
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
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-2 py-1 bg-[#DCDCDC] text-[#805232] rounded text-xs hover:bg-[#C0C0C0] transition-colors font-medium border border-[#805232]"
          >
            <LogOut className="w-3 h-3" />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
