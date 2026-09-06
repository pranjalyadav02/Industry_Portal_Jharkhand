import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Sliders, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  GraduationCap, 
  MapPin, 
  IndianRupee, 
  Users, 
  Cpu, 
  Workflow, 
  HeartHandshake,
  Check,
  RefreshCw
} from 'lucide-react';
import { Opportunity, OrganizationProfile } from '../types';

interface AIMatchingViewProps {
  currentOrg: OrganizationProfile;
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onExpressInterest: (opp: Opportunity) => void;
  onOpenAudit: () => void;
}

export const AIMatchingView: React.FC<AIMatchingViewProps> = ({
  currentOrg,
  opportunities,
  onSelectOpportunity,
  onExpressInterest,
  onOpenAudit
}) => {
  // Capability toggles for interactive AI matching demo
  const [selectedTechs, setSelectedTechs] = React.useState<string[]>([
    'AI/ML', 'IoT', 'Hardware', 'Manufacturing', 'Water Technology', 'Rural Deployment'
  ]);
  const [selectedExpertise, setSelectedExpertise] = React.useState<string[]>([
    'Water & Sanitation', 'Healthcare', 'Agriculture & Food'
  ]);
  const [selectedResources, setSelectedResources] = React.useState<string[]>([
    'Funding', 'Testing Labs', 'Manufacturing'
  ]);
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>('All');
  const [isCalculating, setIsCalculating] = React.useState<boolean>(false);

  const availableTechs = [
    'AI/ML', 'IoT', 'Cloud', 'Hardware', 'Manufacturing', 'Water Technology', 
    'Rural Deployment', 'Robotics', 'GIS', 'Renewable Energy', 'Healthcare technology'
  ];

  const availableExpertise = [
    'Water & Sanitation', 'Healthcare', 'Agriculture & Food', 'Education & Skill', 
    'Environment & CleanTech', 'Infrastructure & Energy'
  ];

  const toggleTech = (t: string) => {
    setSelectedTechs(prev => 
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
    triggerRecalculate();
  };

  const toggleExpertise = (e: string) => {
    setSelectedExpertise(prev => 
      prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]
    );
    triggerRecalculate();
  };

  const triggerRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 250);
  };

  // Dynamic match score calculation based on active toggles
  const scoredOpportunities = React.useMemo(() => {
    return opportunities.map(opp => {
      let score = 50;
      // Tech overlap
      const techMatches = opp.requiredCapabilities.filter(c => selectedTechs.includes(c));
      score += techMatches.length * 9;
      
      // Domain overlap
      if (selectedExpertise.some(e => opp.domain.toLowerCase().includes(e.toLowerCase()))) {
        score += 15;
      }

      // District match
      if (selectedDistrict === 'All' || opp.district === selectedDistrict) {
        score += 5;
      }

      score = Math.min(Math.max(score, 45), 98);

      return {
        ...opp,
        dynamicScore: score
      };
    }).sort((a, b) => b.dynamicScore - a.dynamicScore);
  }, [opportunities, selectedTechs, selectedExpertise, selectedDistrict]);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Title & Explainer */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              AI Matching Engine v4.2
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-600">Cross-Platform Recommendation Core</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            AI Opportunity Matching & Capability Profile
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Configure {currentOrg.name}'s technological, manufacturing, and CSR capabilities. The system analyzes real-time verified challenges and university prototypes across Jharkhand.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Recommendations only; human approval required.</span>
        </div>
      </div>

      {/* Capability Profile Configurator Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Configure Organization Capabilities</h3>
          </div>
          <span className="text-[11px] text-slate-400">
            {selectedTechs.length} Techs • {selectedExpertise.length} Domains selected
          </span>
        </div>

        {/* Technologies Selection */}
        <div>
          <p className="text-[11px] uppercase font-extrabold text-slate-400 tracking-wider mb-2">
            1. Core Technology & Engineering Capabilities
          </p>
          <div className="flex flex-wrap gap-2">
            {availableTechs.map((tech) => {
              const active = selectedTechs.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    active 
                      ? 'bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/20' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {active && <Check className="w-3 h-3 text-white" />}
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* Industry Domains */}
        <div>
          <p className="text-[11px] uppercase font-extrabold text-slate-400 tracking-wider mb-2">
            2. Industry Expertise & Mandate Focus
          </p>
          <div className="flex flex-wrap gap-2">
            {availableExpertise.map((domain) => {
              const active = selectedExpertise.includes(domain);
              return (
                <button
                  key={domain}
                  onClick={() => toggleExpertise(domain)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    active 
                      ? 'bg-indigo-600 text-white font-bold shadow-xs shadow-indigo-500/20' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {active && <Check className="w-3 h-3 text-white" />}
                  {domain}
                </button>
              );
            })}
          </div>
        </div>

        {/* District Preference */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="text-xs font-bold text-slate-600">Geographic Preference:</span>
          {['All', 'Gumla', 'Khunti', 'West Singhbhum', 'Dhanbad', 'Latehar', 'Sahibganj'].map(d => (
            <button
              key={d}
              onClick={() => { setSelectedDistrict(d); triggerRecalculate(); }}
              className={`text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedDistrict === d ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d === 'All' ? 'All 24 Districts' : d}
            </button>
          ))}
        </div>
      </div>

      {/* AI Matched Recommendations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Ranked Opportunity Matches</h3>
            <span className="text-xs text-slate-500 font-medium">({scoredOpportunities.length} opportunities analyzed)</span>
          </div>
          {isCalculating && (
            <span className="text-xs text-blue-600 flex items-center gap-1 font-semibold animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" /> Recalculating neural weights...
            </span>
          )}
        </div>

        <div className="space-y-5">
          {scoredOpportunities.map((opp, index) => {
            const isTop = index === 0;
            return (
              <div 
                key={opp.id}
                className={`bg-white rounded-2xl border transition-all p-6 ${
                  isTop 
                    ? 'border-blue-400 shadow-md ring-2 ring-blue-500/10' 
                    : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        opp.dynamicScore >= 85 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {opp.dynamicScore}% Match
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {opp.id}
                      </span>
                      {opp.challengeRefId && (
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          Linked Govt Challenge: {opp.challengeRefId}
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {opp.domain}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {opp.district}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => onSelectOpportunity(opp)}>
                      {opp.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Funding Gap</p>
                      <p className="text-base font-black text-slate-900">
                        ₹{((opp.fundingRequired - opp.fundingCommitted) / 100000).toFixed(1)} Lakh
                      </p>
                      <p className="text-[10px] text-slate-500">Total: ₹{(opp.fundingRequired / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="h-9 w-px bg-slate-200" />
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Readiness</p>
                      <p className="text-base font-black text-blue-600">
                        TRL {opp.trl}
                      </p>
                      <p className="text-[10px] text-slate-500">{opp.readiness.overall}% overall</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">
                  {opp.problemStatement}
                </p>

                {/* Why You Match Breakdown */}
                <div className="bg-slate-50 rounded-xl p-3.5 mb-5 border border-slate-200/60">
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Why {currentOrg.name.split(' ')[0]} matches this project:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-600">
                    {opp.whyMatch?.map((reason, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-1.5">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span className="text-[11px] text-slate-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capabilities pills + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Needed:</span>
                    {opp.requiredCapabilities.map((req) => (
                      <span 
                        key={req} 
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                          selectedTechs.includes(req) 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectOpportunity(opp)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                    >
                      Deep Dive
                    </button>
                    <button
                      onClick={() => onExpressInterest(opp)}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      Express Interest
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
