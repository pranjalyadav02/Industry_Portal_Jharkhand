import React from 'react';
import { 
  Workflow, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Wrench, 
  IndianRupee, 
  FileCheck,
  TrendingDown,
  Clock,
  Play
} from 'lucide-react';
import { Opportunity } from '../types';

interface PrototypePipelineViewProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
}

export const PrototypePipelineView: React.FC<PrototypePipelineViewProps> = ({
  opportunities,
  onSelectOpportunity
}) => {
  const [selectedOppId, setSelectedOppId] = React.useState<string>('PR-2026-0019');
  const [currentStep, setCurrentStep] = React.useState<number>(3); // Step 3: MSME discovery & 4-party pilot
  const [demo3Success, setDemo3Success] = React.useState<boolean>(false);

  const activeOpp = opportunities.find(o => o.id === selectedOppId) || opportunities[0];

  const pipelineStages = [
    { trl: '1-3', name: 'Academic Research', status: 'Completed', owner: 'BIT Mesra', duration: '6 months' },
    { trl: '4', name: 'Lab Prototype Tested', status: 'Completed', owner: 'Dept of Electronics', duration: '4 months' },
    { trl: '5', name: 'Field Pilot & Telemetry', status: 'Active (Current)', owner: 'Govt + Jal Sahiya', duration: '3 months' },
    { trl: '6', name: 'Design for Manufacturing', status: 'Ready for Handoff', owner: 'MSME Partner Needed', duration: '2 months' },
    { trl: '7-8', name: 'Tooling & Batch Production', status: 'Upcoming', owner: 'Bokaro Bio-Clean / Adityapur', duration: '4 months' },
    { trl: '9', name: 'Statewide Deployment', status: 'Pending', owner: 'State Water Dept + CSR', duration: 'Ongoing' }
  ];

  const handleAdvanceStep = () => {
    setDemo3Success(true);
    setCurrentStep(4);
    setTimeout(() => setDemo3Success(false), 4500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Workflow className="w-3 h-3 text-amber-600" />
              Hero Demo Flow 3
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">TRL Progression & MSME Manufacturing</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Prototype → Production Pipeline (TRL 1-9)
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Bridging the classic "valley of death" between university lab prototypes and commercial-scale rural manufacturing in Jharkhand.
          </p>
        </div>

        <button
          onClick={handleAdvanceStep}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          Simulate TRL 6 → MSME Handoff
        </button>
      </div>

      {demo3Success && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-950 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Hero Demo Flow 3 Executed: MSME Partner (Bokaro Bio-Clean) paired with BIT Mesra. Four-Party Collaboration Agreement generated for 500-unit batch production!
          </span>
        </div>
      )}

      {/* Selected Project Overview Card */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
              <span>PROJECT: {activeOpp.id}</span>
              <span>•</span>
              <span>DISTRICT: {activeOpp.district}</span>
              <span>•</span>
              <span className="text-white bg-amber-600/60 px-2 py-0.5 rounded text-[10px]">TRL 5</span>
            </div>
            <h3 className="text-lg md:text-xl font-black tracking-tight">{activeOpp.title}</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">{activeOpp.solutionOverview}</p>
          </div>

          {/* Unit Cost Curve Reduction */}
          <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl shrink-0 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Unit Cost Curve Reduction</span>
            <div className="flex items-center justify-center gap-3 mt-1">
              <span className="text-sm font-bold text-slate-400 line-through">₹45,000 (Lab)</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-lg font-black text-emerald-400">₹6,800 / unit (Scaled)</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">85% unit cost reduction via MSME tooling</p>
          </div>
        </div>
      </div>

      {/* TRL Stage Ladder Visualizer */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            TRL Progression & Stage Gates
          </h3>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            Stage 3 of 6 Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {pipelineStages.map((stage, idx) => {
            const isDone = idx < 2;
            const isCurrent = idx === 2;
            return (
              <div 
                key={idx}
                className={`p-4 rounded-xl border transition-all text-xs ${
                  isCurrent 
                    ? 'border-blue-500 bg-blue-50/40 shadow-xs' 
                    : isDone 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : 'border-slate-200 bg-slate-50/50 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                    isDone ? 'bg-emerald-100 text-emerald-800' :
                    isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    TRL {stage.trl}
                  </span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </div>

                <p className="font-bold text-slate-900 leading-tight mt-1">{stage.name}</p>
                <p className="text-[10px] text-slate-500 mt-1">Owner: {stage.owner}</p>
                <div className="text-[10px] font-semibold text-slate-400 mt-2 pt-2 border-t border-slate-200/60">
                  Est: {stage.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MSME Tooling & Manufacturing Partner Discovery */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Matched MSME Tooling & Manufacturing Partners in Jharkhand
            </h3>
            <p className="text-xs text-slate-500">
              Industrial clusters capable of taking university prototypes to ISO/NABL production standards
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700">3 MSMEs Qualified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-blue-300 bg-blue-50/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Bokaro Bio-Clean MSME</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">96% Capability</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Specializes in water sensor casings, injection molding, PCB weatherproofing, and field telemetry.
            </p>
            <div className="text-[10px] text-slate-500 font-semibold">
              📍 Bokaro Industrial Area • Capacity: 1,500 units/mo
            </div>
            <button className="w-full mt-2 bg-blue-600 text-white font-bold py-1.5 rounded-lg text-xs hover:bg-blue-700 cursor-pointer">
              Initiate Tooling Contract
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Adityapur Tool Room (IDTR)</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800">92% Capability</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Govt MSME autonomous body with CNC milling, die casting, and electrochemical sensor housing.
            </p>
            <div className="text-[10px] text-slate-500 font-semibold">
              📍 Jamshedpur • Capacity: High Precision
            </div>
            <button className="w-full mt-2 bg-slate-100 text-slate-700 font-bold py-1.5 rounded-lg text-xs hover:bg-slate-200 cursor-pointer">
              View Tooling Schedule
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Ranchi Micro-Tech Electronics</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-700">84% Capability</span>
            </div>
            <p className="text-[11px] text-slate-600">
              SMD component assembly, LoRaWAN gateways, solar power micro-inverters.
            </p>
            <div className="text-[10px] text-slate-500 font-semibold">
              📍 Tupudana, Ranchi • Capacity: 500 units/mo
            </div>
            <button className="w-full mt-2 bg-slate-100 text-slate-700 font-bold py-1.5 rounded-lg text-xs hover:bg-slate-200 cursor-pointer">
              Request Quotation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
