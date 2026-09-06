import React from 'react';
import { 
  PiggyBank, 
  Sparkles, 
  CheckCircle2, 
  IndianRupee, 
  MapPin, 
  Users, 
  PieChart as PieIcon, 
  ArrowRight, 
  ShieldCheck,
  Building2,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { Opportunity, OrganizationProfile, DomainType } from '../types';

interface CSRViewProps {
  currentOrg: OrganizationProfile;
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onCommitCSRBudget: (plan: any) => void;
}

export const CSRView: React.FC<CSRViewProps> = ({
  currentOrg,
  opportunities,
  onSelectOpportunity,
  onCommitCSRBudget
}) => {
  // Hero Demo 2 states: CSR Budget ₹50 Lakh default
  const [budgetLakhs, setBudgetLakhs] = React.useState<number>(50);
  const [selectedPriorities, setSelectedPriorities] = React.useState<DomainType[]>([
    'Water & Sanitation',
    'Healthcare & MedTech',
    'Agriculture & Food'
  ]);
  const [committedSuccess, setCommittedSuccess] = React.useState<boolean>(false);

  const csrThemes: DomainType[] = [
    'Water & Sanitation',
    'Healthcare & MedTech',
    'Agriculture & Food',
    'Education & Skill',
    'Environment & CleanTech',
    'Rural Livelihoods'
  ];

  const toggleTheme = (theme: DomainType) => {
    setSelectedPriorities(prev => 
      prev.includes(theme) ? prev.filter(t => t !== theme) : [...prev, theme]
    );
  };

  // AI-recommended portfolio breakdown for the chosen budget
  const recommendedPortfolio = React.useMemo(() => {
    const total = budgetLakhs;
    return [
      {
        projectId: 'PR-2026-0019',
        title: 'Rural Drinking Water Quality Monitoring Mesh',
        theme: 'Water & Sanitation',
        district: 'Gumla',
        university: 'BIT Mesra',
        allocationLakh: Math.round(total * 0.40),
        beneficiaries: 25000,
        trl: 5,
        pilotReady: true
      },
      {
        projectId: 'PR-2026-0031',
        title: 'Tribal Sickle Cell Disease Point-of-Care Kit',
        theme: 'Healthcare & MedTech',
        district: 'West Singhbhum',
        university: 'Kolhan Univ + RIMS',
        allocationLakh: Math.round(total * 0.30),
        beneficiaries: 30000,
        trl: 4,
        pilotReady: true
      },
      {
        projectId: 'PR-2026-0024',
        title: 'Solar Micro Cold Storage for Tribal Vegetables',
        theme: 'Agriculture & Food',
        district: 'Khunti',
        university: 'BAU Ranchi',
        allocationLakh: Math.round(total * 0.20),
        beneficiaries: 18500,
        trl: 6,
        pilotReady: true
      },
      {
        projectId: 'PR-2026-0055',
        title: 'Community Environmental Monitoring & CleanTech',
        theme: 'Environment & CleanTech',
        district: 'Latehar',
        university: 'BIT Mesra',
        allocationLakh: Math.round(total * 0.10),
        beneficiaries: 12000,
        trl: 6,
        pilotReady: true
      }
    ];
  }, [budgetLakhs]);

  const totalBeneficiaries = recommendedPortfolio.reduce((acc, curr) => acc + curr.beneficiaries, 0);

  const handleCommitPlan = () => {
    onCommitCSRBudget({
      budget: budgetLakhs * 100000,
      portfolio: recommendedPortfolio
    });
    setCommittedSuccess(true);
    setTimeout(() => setCommittedSuccess(false), 3500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <PiggyBank className="w-3 h-3 text-emerald-600" />
              Hero Demo Flow 2
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">Corporate Social Responsibility Engine</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            CSR Opportunity Matching & Impact Planner
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            CSR is not just spending: Connect funding directly to verified university innovations, track project outputs, and measure verified community impact across Jharkhand.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Section 135 Companies Act & Schedule VII Compliant</span>
        </div>
      </div>

      {/* Interactive Planner Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Define CSR Priorities & Capital Envelope</h3>
            <p className="text-xs text-slate-500">Simulate allocation across verified high-impact Jharkhand initiatives</p>
          </div>
          {/* Quick budget selector buttons */}
          <div className="flex items-center gap-2">
            {[25, 50, 100].map(b => (
              <button
                key={b}
                onClick={() => setBudgetLakhs(b)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  budgetLakhs === b 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ₹{b} Lakh
              </button>
            ))}
          </div>
        </div>

        {/* Budget Slider & Custom Value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Annual CSR Allocation Slider</span>
              <span className="text-emerald-700 text-sm font-black">₹{budgetLakhs} Lakh (₹{(budgetLakhs / 100).toFixed(2)} Cr)</span>
            </div>
            <input
              type="range"
              min={10}
              max={200}
              step={5}
              value={budgetLakhs}
              onChange={(e) => setBudgetLakhs(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>₹10 Lakh</span>
              <span>₹1 Crore</span>
              <span>₹2 Crore</span>
            </div>
          </div>

          <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-[10px] uppercase font-bold text-emerald-800">Projected Beneficiaries</p>
            <p className="text-2xl font-black text-emerald-950 mt-0.5">{totalBeneficiaries.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-700 font-semibold">Across 4 Jharkhand Districts</p>
          </div>
        </div>

        {/* Focus Areas Selection */}
        <div>
          <p className="text-[11px] uppercase font-extrabold text-slate-400 tracking-wider mb-2.5">
            CSR Focus Areas (Schedule VII)
          </p>
          <div className="flex flex-wrap gap-2">
            {csrThemes.map((theme) => {
              const active = selectedPriorities.includes(theme);
              return (
                <button
                  key={theme}
                  onClick={() => toggleTheme(theme)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    active 
                      ? 'bg-emerald-700 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-slate-400'}`} />
                  {theme}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Recommended Portfolio Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              AI Optimized Portfolio Recommendation (₹{budgetLakhs}L Envelope)
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Automated milestone tranches generated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedPortfolio.map((item, idx) => (
            <div 
              key={item.projectId}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 uppercase">
                    {item.theme}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ₹{item.allocationLakh} Lakh ({((item.allocationLakh / budgetLakhs) * 100).toFixed(0)}%)
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span>{item.university}</span>
                  <span>•</span>
                  <span>{item.district} District</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-600">
                  Beneficiaries: <strong className="text-slate-900">{item.beneficiaries.toLocaleString()}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    TRL {item.trl}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Pilot Ready
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commit CSR Allocation Button */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-white">Execute CSR Impact Portfolio Allocation</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Initiates milestone agreements, provisions escrow governance, and schedules field audits.
            </p>
          </div>

          <button
            onClick={handleCommitPlan}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            Commit ₹{budgetLakhs}L Portfolio
          </button>
        </div>

        {committedSuccess && (
          <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            ₹{budgetLakhs} Lakh CSR Portfolio committed! Milestone release agreements routed to legal & university teams.
          </div>
        )}
      </div>

      {/* Historical CSR Portfolio Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Active CSR Portfolio Summary</h3>
            <p className="text-xs text-slate-500">Historical performance and beneficiaries across programs</p>
          </div>
          <span className="text-xs font-bold text-slate-700">Total Funded: ₹1.0 Cr</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3">Domain</th>
                <th className="px-5 py-3">Funded Amount</th>
                <th className="px-5 py-3">Active Projects</th>
                <th className="px-5 py-3">Beneficiaries</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-5 py-4 font-bold text-slate-900">Water & Sanitation</td>
                <td className="px-5 py-4 font-semibold text-emerald-700">₹42 Lakh</td>
                <td className="px-5 py-4">3 projects (Gumla, Dhanbad)</td>
                <td className="px-5 py-4 font-bold">38,500 citizens</td>
                <td className="px-5 py-4 text-right">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">On Track</span>
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-bold text-slate-900">Healthcare & MedTech</td>
                <td className="px-5 py-4 font-semibold text-emerald-700">₹27 Lakh</td>
                <td className="px-5 py-4">4 projects (West Singhbhum)</td>
                <td className="px-5 py-4 font-bold">21,000 patients</td>
                <td className="px-5 py-4 text-right">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Active Pilot</span>
                </td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-bold text-slate-900">Agriculture & Cold Storage</td>
                <td className="px-5 py-4 font-semibold text-emerald-700">₹31 Lakh</td>
                <td className="px-5 py-4">5 projects (Khunti, Hazaribagh)</td>
                <td className="px-5 py-4 font-bold">12,400 farmers</td>
                <td className="px-5 py-4 text-right">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Completed Phase 1</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
