import React from 'react';
import { X, HeartHandshake, CheckCircle2, ShieldCheck, IndianRupee, Cpu, Wrench, Rocket } from 'lucide-react';
import { Opportunity, OrganizationProfile, IndustryMode } from '../types';

interface ExpressInterestModalProps {
  opportunity: Opportunity | null;
  currentOrg: OrganizationProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    modes: IndustryMode[];
    commitmentAmount: number;
    notes: string;
  }) => void;
}

export const ExpressInterestModal: React.FC<ExpressInterestModalProps> = ({
  opportunity,
  currentOrg,
  isOpen,
  onClose,
  onSubmit
}) => {
  if (!isOpen || !opportunity) return null;

  const [selectedModes, setSelectedModes] = React.useState<IndustryMode[]>(['Funder', 'Technology Partner']);
  const [fundingAmount, setFundingAmount] = React.useState<number>(
    Math.min(1800000, opportunity.fundingRequired - opportunity.fundingCommitted)
  );
  const [proposalNotes, setProposalNotes] = React.useState<string>(
    `We at ${currentOrg.name} would like to support ${opportunity.title} with capital funding and engineering mentorship through our CSR and R&D divisions.`
  );

  const toggleMode = (mode: IndustryMode) => {
    setSelectedModes(prev => 
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      modes: selectedModes,
      commitmentAmount: selectedModes.includes('Funder') ? fundingAmount : 0,
      notes: proposalNotes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Express Interest & Form Consortium</h3>
              <p className="text-xs text-slate-500">Initiate formal quad-helix collaboration for {opportunity.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Initiative</span>
            <p className="font-bold text-slate-900 text-sm">{opportunity.title}</p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              {opportunity.university || opportunity.govtDepartment} • {opportunity.district} District
            </p>
          </div>

          {/* Collaboration Modes */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Select Collaboration Capabilities You Will Provide:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['Funder', 'Technology Partner', 'Deployment Partner'] as IndustryMode[]).map((mode) => {
                const active = selectedModes.includes(mode);
                return (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => toggleMode(mode)}
                    className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer flex flex-col justify-between ${
                      active 
                        ? 'border-blue-600 bg-blue-50 text-blue-900' 
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{mode === 'Funder' ? '💰 Funder / CSR' : mode === 'Technology Partner' ? '🧠 Tech & Mentorship' : '🚀 Field Deployment'}</span>
                    <span className="text-[10px] font-normal text-slate-400 mt-1">
                      {mode === 'Funder' ? 'Capital grant / escrow' : mode === 'Technology Partner' ? 'Labs, engineering, R&D' : 'Ground scale & distribution'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Funding Amount if Funder is selected */}
          {selectedModes.includes('Funder') && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Proposed Funding Commitment (₹)</label>
                <span className="text-blue-600 font-extrabold text-sm">
                  ₹{(fundingAmount / 100000).toFixed(1)} Lakh
                </span>
              </div>
              <input
                type="range"
                min={200000}
                max={3000000}
                step={100000}
                value={fundingAmount}
                onChange={(e) => setFundingAmount(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Released in milestone-gated tranches according to signed escrow agreement.
              </p>
            </div>
          )}

          {/* Notes / Proposal */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Proposal Note / Objectives:
            </label>
            <textarea
              rows={3}
              value={proposalNotes}
              onChange={(e) => setProposalNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Transmitted directly to Academic Dean & State Nodal Officer for MoU sign-off.</span>
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4" />
              Submit Expression of Interest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
