import React from 'react';
import { 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  Lock, 
  FileCheck, 
  ShieldAlert, 
  Download, 
  ArrowUpRight, 
  AlertCircle,
  Building2
} from 'lucide-react';
import { Collaboration, UserRole } from '../types';

interface FundingWorkspaceProps {
  collaborations: Collaboration[];
  userRole: UserRole;
  onReleaseTranche: (colId: string, milestoneId: string, amount: number) => void;
}

export const FundingWorkspace: React.FC<FundingWorkspaceProps> = ({
  collaborations,
  userRole,
  onReleaseTranche
}) => {
  const [selectedColId, setSelectedColId] = React.useState<string>(collaborations[0]?.id || 'COL-2026-0021');
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const activeCol = collaborations.find(c => c.id === selectedColId) || collaborations[0];

  const canReleaseFunds = ['Company Administrator', 'CSR Head', 'Project Sponsor'].includes(userRole);

  const handleRelease = (milestoneId: string, amount: number) => {
    if (!canReleaseFunds) {
      setAuthError(`Access Denied: Role "${userRole}" is not authorized to release capital tranches. Only CSR Head or Company Administrator can authorize fund releases.`);
      setTimeout(() => setAuthError(null), 4000);
      return;
    }

    onReleaseTranche(activeCol.id, milestoneId, amount);
    setSuccessMsg(`Tranche of ₹${(amount/100000).toFixed(2)} Lakh successfully authorized and released for ${activeCol.projectTitle}`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
              Milestone Escrow Governance
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">Strict Audit Accountability</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Funding Workspace & Capital Tranches
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Zero blanket donations: Capital is released in verified tranches tied to technical evidence, NABL test reports, and district administration validation.
          </p>
        </div>

        {/* Active Role Indicator */}
        <div className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
          canReleaseFunds 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          {canReleaseFunds ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Lock className="w-4 h-4 text-amber-600 shrink-0" />}
          <div>
            <span>Your Role: {userRole}</span>
            <span className="block text-[10px] font-normal text-slate-500">
              {canReleaseFunds ? 'Authorized to Release Funds' : 'View-Only (Release Restricted)'}
            </span>
          </div>
        </div>
      </div>

      {authError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Collaboration Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {collaborations.map(col => (
          <button
            key={col.id}
            onClick={() => setSelectedColId(col.id)}
            className={`text-xs px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedColId === col.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {col.id}: {col.projectTitle.slice(0, 30)}...
          </button>
        ))}
      </div>

      {/* Main Funding Card */}
      {activeCol && (
        <div className="space-y-6">
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Commitment</span>
              <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1">
                ₹{(activeCol.totalCommitment / 100000).toFixed(2)} Lakh
              </p>
              <p className="text-xs text-slate-500 mt-1">{activeCol.university}</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Released Capital</span>
              <p className="text-2xl md:text-3xl font-black text-blue-600 mt-1">
                ₹{(activeCol.releasedAmount / 100000).toFixed(2)} Lakh
              </p>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${(activeCol.releasedAmount / activeCol.totalCommitment) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400">Remaining in Escrow</span>
              <p className="text-2xl md:text-3xl font-black text-slate-700 mt-1">
                ₹{(activeCol.remainingAmount / 100000).toFixed(2)} Lakh
              </p>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
                {activeCol.milestones.filter(m => m.status === 'Completed').length} of {activeCol.milestones.length} Milestones Cleared
              </p>
            </div>
          </div>

          {/* Milestones Tranche Release Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Milestone Release Pipeline: {activeCol.projectTitle}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Escrow Contract Ref: ESC-{activeCol.id}-2026
                </p>
              </div>
              <button 
                onClick={() => alert(`Downloading signed escrow agreement and NABL audit pack for ${activeCol.id}...`)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Escrow Terms PDF
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {activeCol.milestones.map((m, index) => {
                const isCompleted = m.status === 'Completed';
                const isInProgress = m.status === 'In Progress';
                const isPending = m.status === 'Pending Verification';
                const isLocked = m.status === 'Locked';

                return (
                  <div key={m.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isCompleted ? 'bg-emerald-100 text-emerald-800' :
                        isInProgress ? 'bg-blue-100 text-blue-800' :
                        isPending ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {isCompleted ? '✓' : index + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                            isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            isInProgress ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            isPending ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-slate-100 text-slate-400'
                          }`}>
                            {m.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {isCompleted 
                            ? `Verified & released on ${m.completionDate || '2026-05-15'}` 
                            : isInProgress 
                            ? 'Technical trial data received; awaiting CSR head final signature' 
                            : isPending 
                            ? 'Awaiting laboratory evidence upload' 
                            : 'Gated by previous milestone completion'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Tranche Value</span>
                        <span className="text-base font-black text-slate-900">
                          ₹{(m.amount / 100000).toFixed(1)} Lakh
                        </span>
                      </div>

                      {/* Release action */}
                      {isCompleted ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Released
                        </span>
                      ) : isInProgress ? (
                        <button
                          onClick={() => handleRelease(m.id, m.amount)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                        >
                          Authorize & Release
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-slate-100 text-slate-400 font-bold px-3 py-1.5 rounded-lg text-xs cursor-not-allowed flex items-center gap-1"
                        >
                          <Lock className="w-3 h-3" />
                          Locked
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
