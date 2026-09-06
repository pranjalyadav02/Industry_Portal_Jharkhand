import React from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Layers, 
  HeartHandshake, 
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Opportunity, OpportunityType, DomainType } from '../types';
import { JHARKHAND_DISTRICTS } from '../data/mockData';

interface MarketplaceViewProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onExpressInterest: (opp: Opportunity) => void;
  initialTypeFilter?: OpportunityType | 'All';
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  opportunities,
  onSelectOpportunity,
  onExpressInterest,
  initialTypeFilter = 'All'
}) => {
  const [selectedType, setSelectedType] = React.useState<string>(initialTypeFilter);
  const [selectedDomain, setSelectedDomain] = React.useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>('All');
  const [selectedTRL, setSelectedTRL] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const domains: DomainType[] = [
    'Water & Sanitation',
    'Healthcare & MedTech',
    'Agriculture & Food',
    'Environment & CleanTech',
    'Education & Skill'
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedType !== 'All') {
      if (selectedType === 'Government Challenge' && opp.type !== 'Government Challenge') return false;
      if (selectedType === 'University Project' && opp.type !== 'University Project') return false;
      if (selectedType === 'Field Pilot' && opp.type !== 'Field Pilot') return false;
      if (selectedType === 'Deployment' && opp.type !== 'Deployment Opportunity') return false;
    }
    if (selectedDomain !== 'All' && opp.domain !== selectedDomain) return false;
    if (selectedDistrict !== 'All' && opp.district !== selectedDistrict) return false;
    if (selectedTRL !== 'All') {
      if (selectedTRL === 'TRL 1-3' && opp.trl > 3) return false;
      if (selectedTRL === 'TRL 4-6' && (opp.trl < 4 || opp.trl > 6)) return false;
      if (selectedTRL === 'TRL 7-9' && opp.trl < 7) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = 
        opp.title.toLowerCase().includes(q) ||
        opp.problemStatement.toLowerCase().includes(q) ||
        opp.district.toLowerCase().includes(q) ||
        (opp.university && opp.university.toLowerCase().includes(q)) ||
        opp.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Statewide Innovation Exchange
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{filteredOpportunities.length} Active Listings</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Opportunity Marketplace
            </h2>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              Discover verified government societal challenges, university prototypes, and deployment pipelines seeking industry collaboration.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-center">
              <span className="text-base font-black text-slate-900">₹1.4 Cr</span>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Total Capital Needed</p>
            </div>
            <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-center">
              <span className="text-base font-black text-blue-600">238,500</span>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Beneficiaries</p>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by topic, university, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full pb-1 md:pb-0">
            {[
              { id: 'All', label: 'All Opportunities' },
              { id: 'Government Challenge', label: 'Govt Challenges' },
              { id: 'University Project', label: 'University Projects' },
              { id: 'Field Pilot', label: 'Field Pilots' },
              { id: 'Deployment', label: 'Deployment Ready' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  selectedType === cat.id
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub filters: Domain & District & TRL */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Filter by:</span>
          
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200 text-xs outline-none cursor-pointer"
          >
            <option value="All">All Domains</option>
            {domains.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200 text-xs outline-none cursor-pointer"
          >
            <option value="All">All 24 Districts</option>
            {JHARKHAND_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            value={selectedTRL}
            onChange={(e) => setSelectedTRL(e.target.value)}
            className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200 text-xs outline-none cursor-pointer"
          >
            <option value="All">All TRL Stages</option>
            <option value="TRL 1-3">TRL 1-3 (Early Concept & Research)</option>
            <option value="TRL 4-6">TRL 4-6 (Prototype & Pilot Testing)</option>
            <option value="TRL 7-9">TRL 7-9 (Deployment & Scale)</option>
          </select>

          {(selectedDomain !== 'All' || selectedDistrict !== 'All' || selectedTRL !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDomain('All');
                setSelectedDistrict('All');
                setSelectedTRL('All');
                setSearchQuery('');
              }}
              className="text-[11px] text-blue-600 font-bold hover:underline ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Opportunities Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opp) => (
          <div 
            key={opp.id}
            className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400/80 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
          >
            {/* Top Bar */}
            <div className="p-5 pb-3">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  opp.type === 'Government Challenge' ? 'bg-amber-100 text-amber-800' :
                  opp.type === 'Field Pilot' ? 'bg-blue-100 text-blue-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {opp.type}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                    {opp.id}
                  </span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-bold text-[11px]">
                    TRL {opp.trl}
                  </span>
                </div>
              </div>

              <h3 
                onClick={() => onSelectOpportunity(opp)}
                className="font-bold text-slate-900 group-hover:text-blue-600 text-base leading-snug cursor-pointer transition-colors line-clamp-2"
              >
                {opp.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
                <span className="flex items-center gap-1 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {opp.district}
                </span>
                <span>•</span>
                <span className="truncate text-slate-600">
                  {opp.university ? opp.university.split('(')[0] : opp.govtDepartment}
                </span>
              </div>
            </div>

            {/* Problem Snapshot */}
            <div className="px-5 py-2 flex-1">
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {opp.problemStatement}
              </p>

              {/* TRL Progress Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 mb-1">
                  <span>TRL Readiness</span>
                  <span className="text-slate-700 font-extrabold">{opp.readiness.overall}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full" 
                    style={{ width: `${(opp.trl / 9) * 100}%` }}
                  />
                </div>
              </div>

              {/* Required Capabilities Chips */}
              <div className="mt-3 flex flex-wrap gap-1">
                {opp.requiredCapabilities.slice(0, 3).map((cap) => (
                  <span key={cap} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    {cap}
                  </span>
                ))}
                {opp.requiredCapabilities.length > 3 && (
                  <span className="text-[10px] text-slate-400 font-semibold self-center">
                    +{opp.requiredCapabilities.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Metrics & Actions */}
            <div className="p-5 pt-3 bg-slate-50/70 border-t border-slate-100 mt-auto">
              <div className="flex justify-between items-center mb-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Funding Needed</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    ₹{((opp.fundingRequired - opp.fundingCommitted) / 100000).toFixed(1)} Lakh
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Beneficiaries</span>
                  <span className="font-bold text-blue-700">
                    {opp.beneficiaries.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onSelectOpportunity(opp)}
                  className="w-full py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200/80 bg-white border border-slate-200 transition-colors cursor-pointer text-center"
                >
                  View Details
                </button>
                <button
                  onClick={() => onExpressInterest(opp)}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Collaborate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <p className="text-slate-500 font-medium">No opportunities match the selected criteria.</p>
          <button
            onClick={() => {
              setSelectedType('All');
              setSelectedDomain('All');
              setSelectedDistrict('All');
              setSelectedTRL('All');
              setSearchQuery('');
            }}
            className="text-xs text-blue-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
