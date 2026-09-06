import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Store, 
  Building2, 
  GraduationCap, 
  Handshake, 
  PiggyBank, 
  Workflow, 
  LineChart, 
  Users, 
  FileText, 
  Cpu, 
  Compass, 
  Rocket,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { OrganizationProfile, UserRole } from '../types';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentOrg: OrganizationProfile;
  allOrgs: OrganizationProfile[];
  onSwitchOrg: (org: OrganizationProfile) => void;
  userRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentOrg,
  allOrgs,
  onSwitchOrg,
  userRole,
  onSwitchRole
}) => {
  const [showOrgDropdown, setShowOrgDropdown] = React.useState(false);

  const navItems = [
    { section: 'Overview', items: [
      { id: 'command-center', label: 'Command Center', icon: LayoutDashboard, badge: 'Live' },
    ]},
    { section: 'Opportunities', items: [
      { id: 'marketplace', label: 'Marketplace', icon: Store },
      { id: 'ai-matching', label: 'AI Match Engine', icon: Sparkles, highlight: true },
      { id: 'govt-challenges', label: 'Govt Challenges', icon: Building2 },
      { id: 'university-projects', label: 'University Projects', icon: GraduationCap },
    ]},
    { section: 'Collaboration', items: [
      { id: 'collaborations', label: 'Collaborations', icon: Handshake, count: 3 },
      { id: 'pipeline', label: 'Prototype → Production', icon: Workflow },
      { id: 'deployment', label: 'Field Deployment', icon: Rocket },
      { id: 'tech-support', label: 'Tech & Mentorship', icon: Cpu },
    ]},
    { section: 'CSR & Capital', items: [
      { id: 'csr-planner', label: 'CSR Planner', icon: PiggyBank },
      { id: 'funding-workspace', label: 'Funding Workspace', icon: FileText },
    ]},
    { section: 'Ecosystem & Impact', items: [
      { id: 'impact-dashboard', label: 'Impact Dashboard', icon: LineChart },
      { id: 'partners', label: 'Partner Discovery', icon: Compass },
      { id: 'tech-transfer', label: 'IPR & Tech Transfer', icon: ShieldCheck },
      { id: 'audit-log', label: 'Audit & Compliance', icon: Users },
    ]}
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-white flex flex-col h-full border-r border-slate-800 select-none shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20 ring-2 ring-blue-400/30">
            J
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold leading-tight tracking-tight text-white">JanaSamadhan</h1>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">P4</span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 truncate">Industry & CSR Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navItems.map((group) => (
          <div key={group.section} className="space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1">
              {group.section}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 text-left ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-bold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  } ${item.highlight && !isActive ? 'ring-1 ring-blue-500/30 text-blue-300' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="truncate flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-300">
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-700 text-slate-300">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Organization Switcher Footer */}
      <div className="p-3 bg-slate-950/70 border-t border-slate-800 relative">
        <button
          onClick={() => setShowOrgDropdown(!showOrgDropdown)}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/60 transition-colors text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
            {currentOrg.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-200 truncate group-hover:text-white">{currentOrg.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{userRole} • {currentOrg.headquarters.split(',')[0]}</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:text-white" />
        </button>

        {showOrgDropdown && (
          <div className="absolute bottom-16 left-3 right-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Switch Organization
            </div>
            <div className="space-y-1 my-1">
              {allOrgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    onSwitchOrg(org);
                    setShowOrgDropdown(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between ${
                    org.id === currentOrg.id ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{org.name}</span>
                  <span className="text-[9px] uppercase px-1 rounded bg-slate-800 text-slate-400">{org.type}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-slate-800 pt-1 mt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Active User Role
              </div>
              {(['CSR Head', 'Innovation Manager', 'Company Administrator', 'Technology Lead', 'Industry Mentor'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onSwitchRole(r);
                    setShowOrgDropdown(false);
                  }}
                  className={`w-full text-left px-2 py-1 rounded text-[11px] ${
                    r === userRole ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  • {r}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
