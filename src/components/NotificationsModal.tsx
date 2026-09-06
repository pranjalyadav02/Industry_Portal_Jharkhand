import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, IndianRupee, ArrowRight, ShieldAlert } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (tab: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigateTo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-start justify-end p-4 sm:p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in slide-in-from-right-4 duration-150">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Action Center & Alerts</h3>
            <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">3</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto text-xs">
          {/* Action 1 */}
          <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                Action Required
              </span>
              <span className="text-[10px] text-slate-400">2 hours ago</span>
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Milestone Tranche Awaiting Escrow Release</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              BIT Mesra has submitted NABL lab test certificates for Milestone 3 (₹4.0 Lakh). CSR Head signature needed to authorize bank dispatch.
            </p>
            <button
              onClick={() => {
                onNavigateTo('funding-workspace');
                onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              Review & Release Tranche <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2 */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                AI Risk Alert
              </span>
              <span className="text-[10px] text-slate-400">5 hours ago</span>
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Gumla Field Sensor Backorder Risk</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Sensor housing vendor delayed 18 days. Auto-recommendation: route tooling to Bokaro Bio-Clean MSME for 48-hr turnaround.
            </p>
            <button
              onClick={() => {
                onNavigateTo('pipeline');
                onClose();
              }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              Resolve in Pipeline <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 3 */}
          <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                Mentorship Request
              </span>
              <span className="text-[10px] text-slate-400">1 day ago</span>
            </div>
            <h4 className="font-bold text-slate-900 text-xs">University Innovator Requested Hardware Expert</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Student team at BAU Ranchi requested 1 hour technical review for solar micro-inverter firmware optimization.
            </p>
            <button
              onClick={() => {
                onNavigateTo('tech-support');
                onClose();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              Assign Industry Mentor <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
