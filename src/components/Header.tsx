import React from 'react';
import { Search, Bell, ShieldAlert, CheckCircle2, Languages, LogOut } from 'lucide-react';
import { IndustryMode, UserRole } from '../types';
import { handlePortalLogout } from '../utils/navigation';

interface HeaderProps {
  currentTab: string;
  activeModes: IndustryMode[];
  onToggleMode: (mode: IndustryMode) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadAlertsCount: number;
  onLaunchHeroDemo: (demoId: 'demo1' | 'demo2' | 'demo3') => void;
  userRole: UserRole;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  activeModes,
  onToggleMode,
  onOpenSearch,
  onOpenNotifications,
  unreadAlertsCount,
  onLaunchHeroDemo,
  userRole
}) => {
  const [isHindi, setIsHindi] = React.useState(false);
  const t = (en: string, hi: string) => isHindi ? hi : en;

  const getBreadcrumbTitle = (tab: string) => {
    switch (tab) {
      case 'command-center': return 'Industry Command Center';
      case 'marketplace': return 'Opportunity Marketplace';
      case 'ai-matching': return 'AI Opportunity Matching Engine';
      case 'govt-challenges': return 'Government Challenges';
      case 'university-projects': return 'University Innovation Projects';
      case 'collaborations': return 'Active Collaborations & Pipeline';
      case 'pipeline': return 'Prototype → Production Pipeline (TRL)';
      case 'deployment': return 'Field Deployment & Community Validation';
      case 'tech-support': return 'Mentorship & Technology Support';
      case 'csr-planner': return 'CSR Opportunity Matching & Portfolio';
      case 'funding-workspace': return 'Milestone-Based Funding Workspace';
      case 'impact-dashboard': return 'Statewide Impact Dashboard & Map';
      case 'partners': return 'Ecosystem Partner Discovery';
      case 'tech-transfer': return 'IPR & Technology Transfer';
      case 'audit-log': return 'Audit Trail & Compliance Log';
      default: return 'Command Center';
    }
  };

  const modesList: { mode: IndustryMode; icon: string; label: string }[] = [
    { mode: 'Funder', icon: '💰', label: 'Funder' },
    { mode: 'Technology Partner', icon: '🧠', label: 'Tech Partner' },
    { mode: 'Deployment Partner', icon: '🚀', label: 'Deployment' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 flex items-center justify-between px-6 z-20 shrink-0 select-none">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2.5 text-xs">
        <span className="text-slate-400 font-medium">Workspace</span>
        <span className="text-slate-300">/</span>
        <span className="font-bold text-slate-800 text-sm">{getBreadcrumbTitle(currentTab)}</span>
        <span className="ml-2 hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          <CheckCircle2 className="w-3 h-3 text-blue-600" />
          Jharkhand Innovation Grid
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Three Major Industry Modes */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {modesList.map((item) => {
            const isActive = activeModes.includes(item.mode);
            return (
              <button
                key={item.mode}
                onClick={() => onToggleMode(item.mode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-bold border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title={`Toggle ${item.label} mode`}
              >
                <span>{item.icon}</span>
                <span className="text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Global Search trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs text-slate-500 transition-colors w-40 sm:w-56"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">Search water, TRL, BIT...</span>
          <kbd className="ml-auto hidden sm:inline-block text-[10px] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 font-mono">⌘K</kbd>
        </button>

        {/* Hindi Language Toggle */}
        <button
          onClick={() => setIsHindi(!isHindi)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
          title={isHindi ? 'Switch to English' : 'हिंदी में देखें'}
        >
          <Languages className="w-3.5 h-3.5" />
          {isHindi ? 'EN' : 'हि'}
        </button>

        {/* Notifications & Action Center */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          title="Action Alerts & Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
          )}
        </button>

        {/* Role badge */}
        <div className="hidden xl:flex items-center pl-2 border-l border-slate-200 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Role:</span>
          <span className="font-semibold text-slate-700">{userRole}</span>
        </div>

        {/* Exit to Login Portal */}
        <button
          onClick={handlePortalLogout}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
          title="Sign Out to JanaSamadhan Login Portal"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
