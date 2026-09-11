import React from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Layers, 
  TrendingUp, 
  Users, 
  Droplet, 
  HeartHandshake, 
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Opportunity, Collaboration, OrganizationProfile } from '../types';

interface CommandCenterProps {
  currentOrg: OrganizationProfile;
  opportunities: Opportunity[];
  collaborations: Collaboration[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onSelectCollaboration: (col: Collaboration) => void;
  onNavigateTo: (tab: string) => void;
  onExpressInterest: (opp: Opportunity) => void;
  onOpenAudit: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  currentOrg,
  opportunities,
  collaborations,
  onSelectOpportunity,
  onSelectCollaboration,
  onNavigateTo,
  onExpressInterest,
  onOpenAudit
}) => {
  const topMatch = opportunities.find(o => o.id === 'PR-2026-0019') || opportunities[0];

  // Compute KPI totals from real props
  const totalCommitted = collaborations.reduce((sum, c) => sum + (c.totalCommitment || 0), 0);
  const totalReleased = collaborations.reduce((sum, c) => sum + (c.releasedAmount || 0), 0);
  const activeDistricts = [...new Set(collaborations.map(c => c.district).filter(Boolean))].length;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Welcome Banner / Objective Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
              Jharkhand Industry & CSR Grid
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500">FY 2026-27 Active Portfolio</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Where can {currentOrg.name.split('/')[0]} create the greatest impact?
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Connecting verified government societal challenges and university prototypes with industry funding, manufacturing capabilities, and field deployment.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigateTo('ai-matching')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Match Explorer
          </button>
          <button
            onClick={() => onNavigateTo('csr-planner')}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 transition-all cursor-pointer"
          >
            CSR Planner (₹50L)
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all">
          <p className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Active Collaborations</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl md:text-3xl font-black text-slate-900">{collaborations.length}</span>
            {collaborations.length === 0 && <span className="text-slate-400 text-xs">None yet</span>}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Active in Jharkhand
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all">
          <p className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Funding Committed</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl md:text-3xl font-black text-slate-900">
              {totalCommitted > 0 ? `₹${(totalCommitted/100000).toFixed(1)}L` : '—'}
            </span>
            {totalReleased > 0 && <span className="text-blue-700 font-bold text-xs bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">₹{(totalReleased/100000).toFixed(1)}L Released</span>}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            Milestone-gated release
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all">
          <p className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Opportunities</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl md:text-3xl font-black text-slate-900">{opportunities.length}</span>
            {activeDistricts > 0 && <span className="text-indigo-700 font-bold text-xs bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">{activeDistricts} Districts</span>}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            Open for industry engagement
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all">
          <p className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Districts Covered</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl md:text-3xl font-black text-slate-900">{activeDistricts || '—'}</span>
            <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">of 24</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Users className="w-3 h-3 text-emerald-600" />
            Jharkhand districts
          </p>
        </div>
      </div>

      {/* Main Split: Left Hero Match & Active Pipeline | Right: Geographic Map & Risk Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Feature: AI Recommended Match (Matching the Professional Polish Design Theme) */}
          <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 md:p-7 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Sparkles className="w-40 h-40 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3.5">
                <span className="bg-blue-400/30 backdrop-blur-xs text-blue-100 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-300/30">
                  AI Recommended Match
                </span>
                <span className="bg-emerald-400/20 text-emerald-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-400/30">
                  {topMatch.matchScore}% Match Confidence
                </span>
                <span className="bg-white/10 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                  District: {topMatch.district} ({topMatch.block})
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
                {topMatch.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-blue-100/90 mb-4 font-medium">
                <span><strong>University:</strong> {topMatch.university?.split('(')[0]}</span>
                <span>•</span>
                <span><strong>Stage:</strong> TRL {topMatch.trl} ({topMatch.currentStage})</span>
                <span>•</span>
                <span><strong>Beneficiaries:</strong> {topMatch.beneficiaries.toLocaleString()}</span>
              </div>

              <p className="text-blue-100/80 text-xs md:text-sm mb-5 leading-relaxed max-w-2xl">
                {topMatch.problemStatement}
              </p>

              {/* Why you match pills */}
              <div className="bg-black/20 backdrop-blur-xs rounded-xl p-3 mb-6 border border-white/10">
                <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider mb-2">
                  Why {currentOrg.name.split(' ')[0]} matches:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-blue-100">
                  {topMatch.whyMatch?.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onExpressInterest(topMatch)}
                  className="bg-white hover:bg-blue-50 text-blue-900 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <HeartHandshake className="w-4 h-4 text-blue-700" />
                  Express Interest & Collaborate
                </button>
                <button
                  onClick={() => onSelectOpportunity(topMatch)}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Technical & TRL Review
                </button>
                <div className="ml-auto text-right">
                  <p className="text-[10px] uppercase text-blue-200 font-bold">Funding Needed</p>
                  <p className="text-sm font-extrabold text-white">₹18 Lakh • MSME Tooling</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Project Pipeline Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Active Industry Collaborations</h3>
                <p className="text-[11px] text-slate-500">Real-time status of supported university research & pilots</p>
              </div>
              <button
                onClick={() => onNavigateTo('collaborations')}
                className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                View Full Workspace <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3">Project & ID</th>
                    <th className="px-5 py-3">University Partner</th>
                    <th className="px-5 py-3">Stage</th>
                    <th className="px-5 py-3">Committed / Released</th>
                    <th className="px-5 py-3 text-right">Validation</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-600 divide-y divide-slate-100">
                  {collaborations.map((col) => (
                    <tr 
                      key={col.id} 
                      onClick={() => onSelectCollaboration(col)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900">{col.projectTitle}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{col.id} • {col.district}</div>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700">
                        {col.university.split('(')[0]}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          col.status === 'Field Pilot' ? 'bg-amber-100 text-amber-800' :
                          col.status === 'Deployment' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {col.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium">
                        <span className="text-slate-900 font-bold">₹{(col.totalCommitment/100000).toFixed(1)}L</span>
                        <span className="text-slate-400 text-[10px] ml-1.5">(₹{(col.releasedAmount/100000).toFixed(1)}L released)</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                          {col.communityValidationScore}/100
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Active Districts from Collaborations */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">Active Districts</h3>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {activeDistricts}/24 Districts
              </span>
            </div>

            {activeDistricts === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs">No collaborations yet.</p>
                <p className="text-[11px] mt-1">Express interest in an opportunity to activate districts.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[...new Set(collaborations.map(c => c.district).filter(Boolean))].map((d) => (
                  <span
                    key={d}
                    className="text-[11px] px-2.5 py-1 rounded-lg font-medium bg-blue-600 text-white"
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CSR Focus Utilization */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                CSR Capital Deployment
              </h4>
              <span className="text-xs font-bold text-slate-700">₹3.6 Cr / ₹5.0 Cr</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-700">Water & Sanitation</span>
                  <span className="text-blue-600">45% (₹1.62 Cr)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-700">Healthcare & MedTech</span>
                  <span className="text-emerald-600">30% (₹1.08 Cr)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-700">Agriculture & Cold Storage</span>
                  <span className="text-amber-600">18% (₹65 L)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-slate-700">Education & Skill Dev</span>
                  <span className="text-purple-600">7% (₹25 L)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Required */}
          {collaborations.length > 0 && collaborations.some(c => c.status === 'Field Pilot') && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-amber-950">Field Pilots Need Review</p>
                    <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-amber-200 text-amber-800">Action</span>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1 leading-normal">
                    {collaborations.filter(c => c.status === 'Field Pilot').length} collaboration(s) in field pilot stage require periodic validation.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTo('pipeline')}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-1.5 rounded-lg transition-colors cursor-pointer text-center"
              >
                View Pipeline Status
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
