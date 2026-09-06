import React from 'react';
import { Search, Bell, Sparkles, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { IndustryMode, UserRole } from '../types';

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
  const [showDemoMenu, setShowDemoMenu] = React.useState(false);

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

        {/* Hero Demo Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SIH Hero Demos</span>
            <span className="sm:hidden">Demos</span>
          </button>

          {showDemoMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                1-Click Interactive Flows
              </div>
              <button
                onClick={() => {
                  onLaunchHeroDemo('demo1');
                  setShowDemoMenu(false);
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-blue-50/80 group transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-slate-800 group-hover:text-blue-600">
                  <Play className="w-3 h-3 text-blue-600 fill-blue-600" />
                  Flow 1: AI Opportunity Match
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Company capabilities → 92% Match Gumla Water → Express Interest</p>
              </button>

              <button
                onClick={() => {
                  onLaunchHeroDemo('demo2');
                  setShowDemoMenu(false);
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-green-50/80 group transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-slate-800 group-hover:text-green-600">
                  <Play className="w-3 h-3 text-green-600 fill-green-600" />
                  Flow 2: CSR to Impact (₹50L)
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">₹50L Budget allocation → Milestones → 75k Beneficiaries</p>
              </button>

              <button
                onClick={() => {
                  onLaunchHeroDemo('demo3');
                  setShowDemoMenu(false);
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-amber-50/80 group transition-colors"
              >
                <div className="flex items-center gap-2 font-bold text-slate-800 group-hover:text-amber-600">
                  <Play className="w-3 h-3 text-amber-600 fill-amber-600" />
                  Flow 3: Prototype to Scale (TRL 6)
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">University prototype → MSME toolmaker discovery → 4-party pilot</p>
              </button>
            </div>
          )}
        </div>

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
      </div>
    </header>
  );
};
