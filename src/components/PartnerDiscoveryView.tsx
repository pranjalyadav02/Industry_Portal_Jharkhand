import React from 'react';
import { 
  Compass, 
  Search, 
  Building2, 
  GraduationCap, 
  Wrench, 
  Rocket, 
  MapPin, 
  CheckCircle2, 
  Mail, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const PartnerDiscoveryView: React.FC = () => {
  const [selectedType, setSelectedType] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const partners = [
    {
      id: 'P-UNIV-01',
      name: 'Birla Institute of Technology (BIT) Mesra',
      type: 'University',
      city: 'Ranchi',
      focus: 'IoT, Water Sensors, AI/ML, Satellite Telemetry, Drone Mapping',
      facilities: 'Central Instrumentation Facility, NABL Water Quality Testing Lab',
      activeProjects: 4,
      leadContact: 'Dr. A. Verma (Dean, Research & Consultation)'
    },
    {
      id: 'P-UNIV-02',
      name: 'Birsa Agricultural University (BAU)',
      type: 'University',
      city: 'Kanke, Ranchi',
      focus: 'Agri-Tech, Solar Cold Chain, Indigenous Crop Processing, Soil Health',
      facilities: 'Agro-processing incubation centre, Experimental farm plots',
      activeProjects: 3,
      leadContact: 'Prof. S. Soren (Director of Research)'
    },
    {
      id: 'P-UNIV-03',
      name: 'National Institute of Technology (NIT) Jamshedpur',
      type: 'University',
      city: 'Jamshedpur',
      focus: 'Heavy Metal Recovery, Mine Runoff Treatment, Industrial Automation',
      facilities: 'Materials Characterization Center, Heavy Engineering Labs',
      activeProjects: 2,
      leadContact: 'Dr. K. Murmu (Civil & Environmental Eng)'
    },
    {
      id: 'P-MSME-01',
      name: 'Bokaro Bio-Clean Environmental Solutions',
      type: 'MSME',
      city: 'Bokaro Industrial Area',
      focus: 'Sensor Casing Fabrication, Injection Molding, Telemetry Enclosures',
      facilities: 'ISO 9001 CNC precision tooling, 1,500 units/mo assembly line',
      activeProjects: 2,
      leadContact: 'Rajesh Sharma (Managing Director)'
    },
    {
      id: 'P-MSME-02',
      name: 'Indo-Danish Tool Room (Adityapur Tool Room)',
      type: 'MSME / Govt Autonomous',
      city: 'Adityapur, Jamshedpur',
      focus: 'Precision Tooling, Die Casting, Rapid Prototyping, Electro-mechanical',
      facilities: '5-Axis CNC Milling, Vacuum Heat Treatment, CMM Metrology',
      activeProjects: 3,
      leadContact: 'General Manager (Tooling Division)'
    },
    {
      id: 'P-STARTUP-01',
      name: 'Birsa AgriTech Solutions',
      type: 'Startup',
      city: 'Ranchi',
      focus: 'Solar Micro Cold Storage, Cold Chain IoT, Tribal Market Aggregation',
      facilities: 'Incubated at AIC-BIT Mesra, 8 field operational units',
      activeProjects: 2,
      leadContact: 'Ankit Kumar (Co-founder & CEO)'
    },
    {
      id: 'P-GOVT-01',
      name: 'Drinking Water & Sanitation Dept (DDWS) Jharkhand',
      type: 'Government',
      city: 'Dhurwa, Ranchi',
      focus: 'Jal Jeevan Mission, Fluoride/Arsenic Remediation, Village Jal Sahiya',
      facilities: '24 District Labs, State Water Testing Directorate',
      activeProjects: 6,
      leadContact: 'Chief Engineer (Monitoring & Quality Control)'
    }
  ];

  const filteredPartners = partners.filter(p => {
    if (selectedType !== 'All' && p.type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.focus.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
              Innovation Network
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">{filteredPartners.length} Verified Institutions</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Ecosystem Partner Discovery
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Find universities with specialized research labs, MSMEs with manufacturing capability, and government agencies seeking field collaboration.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search universities, MSMEs, labs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'University', 'MSME', 'Startup', 'Government'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`text-xs px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedType === type
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {type === 'All' ? 'All Partners' : type}
          </button>
        ))}
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div 
            key={partner.id}
            className="bg-white rounded-2xl border border-slate-200/80 hover:border-blue-400/80 shadow-xs p-6 space-y-4 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  partner.type === 'University' ? 'bg-purple-100 text-purple-800' :
                  partner.type === 'MSME' ? 'bg-amber-100 text-amber-800' :
                  partner.type === 'Startup' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {partner.type}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {partner.city}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">
                {partner.name}
              </h3>

              <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                <strong>Focus:</strong> {partner.focus}
              </p>

              <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                <span className="font-bold text-slate-700 block mb-0.5">Facilities:</span>
                {partner.facilities}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                <span className="font-bold text-slate-800">{partner.activeProjects}</span> Active Collaborations
              </div>
              <button
                onClick={() => alert(`Initiating dialogue with ${partner.leadContact} at ${partner.name}...`)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                Connect <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
