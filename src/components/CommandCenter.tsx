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
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>('Gumla');

  const districtSummary: Record<string, { projects: number; beneficiaries: string; domain: string }> = {
    'Gumla': { projects: 3, beneficiaries: '34,500', domain: 'Water & Sanitation' },
    'Khunti': { projects: 4, beneficiaries: '28,200', domain: 'Agriculture & Cold Chain' },
    'West Singhbhum': { projects: 2, beneficiaries: '48,000', domain: 'Tribal Healthcare' },
    'Dhanbad': { projects: 3, beneficiaries: '72,000', domain: 'Groundwater & Mines' },
    'Ranchi': { projects: 6, beneficiaries: '110,000', domain: 'Agri-AI & MedTech' },
    'East Singhbhum': { projects: 5, beneficiaries: '95,000', domain: 'Industrial Safety & Tech' }
  };

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
            <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">+2 this month</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Across 4 state universities
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all">
          <p className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Funding Committed</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl md:text-3xl font-black text-slate-900">₹62.0 L</span>
            <span className="text-blue-700 font-bold text-xs bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">₹40L Released</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            Milestone-gated release
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all">
          <p className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Solutions in Field</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl md:text-3xl font-black text-slate-900">8 Pilots</span>
            <span className="text-indigo-700 font-bold text-xs bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">6 Districts</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            TRL 5 to TRL 7 stages
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all">
          <p className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider">Impacted Population</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl md:text-3xl font-black text-slate-900">425K</span>
            <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Verified</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Users className="w-3 h-3 text-emerald-600" />
            Govt & community verified
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

        {/* Right Col: Geographic Map + CSR Progress + Risk Alert */}
        <div className="space-y-6">
          {/* Geographic Impact Map Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm">Jharkhand Impact Map</h3>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                6/24 Districts Active
              </span>
            </div>

            {/* Interactive District Pills & Visual map */}
            <div className="bg-slate-900 rounded-xl p-4 text-white relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                <span>Selected District:</span>
                <span className="text-blue-400 font-bold text-xs">{selectedDistrict}</span>
              </div>

              {/* Stylized SVG Map Representation of Jharkhand Districts */}
              <div className="h-36 bg-slate-950/70 rounded-lg p-3 relative flex items-center justify-center border border-slate-800">
                <svg viewBox="0 0 200 120" className="w-full h-full text-slate-700">
                  {/* Stylized outline of Jharkhand */}
                  <polygon 
                    points="30,40 70,20 130,15 170,30 185,75 140,110 80,115 20,85" 
                    fill="#1E293B" 
                    stroke="#334155" 
                    strokeWidth="2"
                  />
                  {/* District nodes */}
                  <circle cx="65" cy="75" r="7" className={`cursor-pointer transition-all ${selectedDistrict === 'Gumla' ? 'fill-blue-500 stroke-white stroke-2' : 'fill-slate-600'}`} onClick={() => setSelectedDistrict('Gumla')} />
                  <circle cx="95" cy="65" r="8" className={`cursor-pointer transition-all ${selectedDistrict === 'Ranchi' ? 'fill-blue-500 stroke-white stroke-2' : 'fill-blue-600'}`} onClick={() => setSelectedDistrict('Ranchi')} />
                  <circle cx="85" cy="85" r="6" className={`cursor-pointer transition-all ${selectedDistrict === 'Khunti' ? 'fill-blue-500 stroke-white stroke-2' : 'fill-emerald-600'}`} onClick={() => setSelectedDistrict('Khunti')} />
                  <circle cx="145" cy="50" r="7" className={`cursor-pointer transition-all ${selectedDistrict === 'Dhanbad' ? 'fill-blue-500 stroke-white stroke-2' : 'fill-amber-600'}`} onClick={() => setSelectedDistrict('Dhanbad')} />
                  <circle cx="150" cy="90" r="8" className={`cursor-pointer transition-all ${selectedDistrict === 'East Singhbhum' ? 'fill-blue-500 stroke-white stroke-2' : 'fill-blue-500'}`} onClick={() => setSelectedDistrict('East Singhbhum')} />
                  <circle cx="100" cy="100" r="7" className={`cursor-pointer transition-all ${selectedDistrict === 'West Singhbhum' ? 'fill-blue-500 stroke-white stroke-2' : 'fill-purple-600'}`} onClick={() => setSelectedDistrict('West Singhbhum')} />
                  <text x="65" y="65" fill="#94A3B8" fontSize="8" textAnchor="middle">Gumla</text>
                  <text x="95" y="55" fill="#94A3B8" fontSize="8" textAnchor="middle">Ranchi</text>
                  <text x="145" y="40" fill="#94A3B8" fontSize="8" textAnchor="middle">Dhanbad</text>
                  <text x="150" y="80" fill="#94A3B8" fontSize="8" textAnchor="middle">Jsr</text>
                </svg>
              </div>

              {/* District info card */}
              <div className="mt-3 bg-slate-800/80 rounded-lg p-2.5 border border-slate-700 text-xs">
                <div className="flex justify-between font-bold text-white mb-0.5">
                  <span>{selectedDistrict} District</span>
                  <span className="text-emerald-400">{districtSummary[selectedDistrict]?.projects || 2} Active Projects</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Focus: {districtSummary[selectedDistrict]?.domain || 'Water & Agriculture'}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Beneficiaries: {districtSummary[selectedDistrict]?.beneficiaries || '20,000+'} verified citizens
                </div>
              </div>
            </div>

            {/* Quick District selection chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['Gumla', 'Khunti', 'West Singhbhum', 'Dhanbad', 'Ranchi', 'East Singhbhum'].map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedDistrict === d
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
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

          {/* Risk Alert & Action Required Box */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-amber-950">AI Risk Alert: Gumla Pilot</p>
                  <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-amber-200 text-amber-800">Medium</span>
                </div>
                <p className="text-[11px] text-amber-800 mt-1 leading-normal">
                  Sensor probe casing delayed 18 days due to supplier backorder.
                </p>
                <div className="mt-2 text-[11px] font-semibold text-amber-900 bg-amber-100/70 p-2 rounded-lg border border-amber-200/60">
                  💡 <strong>Recommended:</strong> Route fabrication to Bokaro Bio-Clean or Adityapur Tool Room (48-hr turnaround).
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTo('pipeline')}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-1.5 rounded-lg transition-colors cursor-pointer text-center"
            >
              Resolve with MSME Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
