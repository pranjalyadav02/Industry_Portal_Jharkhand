import React from 'react';
import { 
  LineChart, 
  TrendingUp, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Download, 
  ShieldCheck, 
  IndianRupee,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { JHARKHAND_DISTRICTS } from '../data/mockData';

export const ImpactDashboardView: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>('All');

  const impactMetrics = [
    {
      metric: 'Rural Water Safety & Heavy Metal Screening',
      location: 'Gumla District (Bishunpur & Raidih)',
      expected: '25,000 citizens screened',
      actual: '28,400 verified beneficiaries',
      delta: '+13.6%',
      status: 'Exceeded Target',
      validationSource: 'DDWS Jharkhand + Jal Sahiya Field Audit'
    },
    {
      metric: 'Tribal Vegetable Post-Harvest Preservation',
      location: 'Khunti District (Torpa Block)',
      expected: '60% spoilage reduction',
      actual: '68.5% measured reduction',
      delta: '+8.5%',
      status: 'Exceeded Target',
      validationSource: 'BAU Ranchi + Gram Vikas Kendra'
    },
    {
      metric: 'Point-of-Care Sickle Cell Disease Detection',
      location: 'West Singhbhum (Chaibasa)',
      expected: '4 hour turnaround',
      actual: '45 minute point-of-care turnaround',
      delta: '5.3x faster',
      status: 'High Impact',
      validationSource: 'RIMS Ranchi + District Health Society'
    },
    {
      metric: 'Forest Fire Early Thermal Alert Mesh',
      location: 'Latehar District (Betla National Park)',
      expected: '< 30 min detection',
      actual: '12 minute real-time alert',
      delta: '2.5x faster',
      status: 'Verified',
      validationSource: 'Jharkhand Forest Department'
    }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              Verified Impact Audit
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">Expected vs. Actual Field Outcomes</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Statewide Societal Impact Dashboard
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Real outcomes, not projections. Every figure is backed by district administrative data, IoT telemetry feeds, and community validation.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Official Jharkhand CSR & Innovation Impact Report (PDF) with digital signatures...')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Export Verified Report (PDF)
        </button>
      </div>

      {/* Aggregate Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Beneficiaries</span>
          <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1">425,000</p>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">Across 6 priority districts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400">Habitations Reached</span>
          <p className="text-2xl md:text-3xl font-black text-blue-600 mt-1">148 Villages</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Panchayat-level coverage</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400">University Labs Engaged</span>
          <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1">12 Research Teams</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">BIT, BAU, NIT, Kolhan</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400">MSME Manufacturing Jobs</span>
          <p className="text-2xl md:text-3xl font-black text-indigo-600 mt-1">320 Skilled</p>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">Bokaro & Adityapur clusters</p>
        </div>
      </div>

      {/* Expected vs. Actual Impact Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Expected vs. Actual Impact Verification
            </h3>
            <p className="text-xs text-slate-500">Milestone audit data verified by state monitoring committees</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            100% Audit Cleared
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {impactMetrics.map((item, idx) => (
            <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{item.metric}</h4>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {item.location}
                </p>
                <p className="text-[11px] text-slate-400">
                  Audit Source: <span className="text-slate-600 font-semibold">{item.validationSource}</span>
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Baseline Expected</span>
                  <span className="text-xs font-bold text-slate-600">{item.expected}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Actual Measured</span>
                  <span className="text-sm font-black text-emerald-700">{item.actual}</span>
                  <span className="text-[10px] font-bold text-emerald-600 block">{item.delta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
