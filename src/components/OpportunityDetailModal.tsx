import React from 'react';
import { 
  X, 
  MapPin, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Users, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  Workflow, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { Opportunity, OrganizationProfile } from '../types';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
  onExpressInterest: (opp: Opportunity) => void;
  onFundProject: (opp: Opportunity) => void;
  currentOrg: OrganizationProfile;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onExpressInterest,
  onFundProject,
  currentOrg
}) => {
  if (!opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {opportunity.type}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                ID: {opportunity.id}
              </span>
              {opportunity.challengeRefId && (
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Govt Ref: {opportunity.challengeRefId}
                </span>
              )}
              <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
                {opportunity.domain}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {opportunity.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {opportunity.district} {opportunity.block ? `(${opportunity.block})` : ''}
              </span>
              <span>•</span>
              <span className="text-slate-600 font-medium">
                {opportunity.university || opportunity.govtDepartment}
              </span>
              <span>•</span>
              <span className="text-blue-600 font-bold">
                TRL {opportunity.trl} ({opportunity.currentStage})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Problem & Verification Section */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Verified Societal Problem
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified by Government of Jharkhand
              </span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-normal">
              {opportunity.problemStatement}
            </p>
            {opportunity.village && (
              <p className="text-xs text-slate-500 font-medium pt-1">
                📍 <strong>Field Habitations:</strong> {opportunity.village}
              </p>
            )}
          </div>

          {/* Solution & Tech Stack */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. University Solution & Engineering Stack
            </h3>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <p className="text-sm text-slate-800 leading-relaxed">
                {opportunity.solutionOverview}
              </p>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 mb-1.5">Technology Components</p>
                <div className="flex flex-wrap gap-1.5">
                  {opportunity.techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TRL Visual Ladder */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                3. Technology Readiness Level (TRL 1 - 9)
              </h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Currently at TRL {opportunity.trl}
              </span>
            </div>

            {/* Visual Steps */}
            <div className="grid grid-cols-9 gap-1.5 pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => {
                const isPassed = lvl <= opportunity.trl;
                const isCurrent = lvl === opportunity.trl;
                return (
                  <div key={lvl} className="text-center">
                    <div 
                      className={`h-2.5 rounded-full transition-all ${
                        isCurrent ? 'bg-blue-600 ring-2 ring-blue-300' :
                        isPassed ? 'bg-emerald-500' : 'bg-slate-200'
                      }`} 
                    />
                    <span className={`text-[10px] font-bold block mt-1 ${isCurrent ? 'text-blue-700' : isPassed ? 'text-slate-700' : 'text-slate-400'}`}>
                      TRL {lvl}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-center">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Technology</span>
                <p className="text-sm font-extrabold text-slate-800">{opportunity.readiness.technology}%</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Manufacturing</span>
                <p className="text-sm font-extrabold text-slate-800">{opportunity.readiness.manufacturing}%</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Govt Clearances</span>
                <p className="text-sm font-extrabold text-slate-800">{opportunity.readiness.government}%</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Community Score</span>
                <p className="text-sm font-extrabold text-emerald-600">{opportunity.communityValidationScore || 85}/100</p>
              </div>
            </div>
          </div>

          {/* University Team & Govt Partner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-1">
              <p className="text-[10px] font-bold uppercase text-slate-400">Academic & Research Team</p>
              <p className="text-sm font-bold text-slate-900">{opportunity.facultyLead || 'Lead Investigator'}</p>
              <p className="text-xs text-slate-600">{opportunity.university}</p>
              <p className="text-[11px] text-blue-600 font-semibold mt-1">
                {opportunity.studentTeamCount || 5} Student & Postgrad Researchers assigned
              </p>
            </div>

            <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-1">
              <p className="text-[10px] font-bold uppercase text-slate-400">Government Coordination</p>
              <p className="text-sm font-bold text-slate-900">{opportunity.govtDepartment}</p>
              <p className="text-xs text-slate-600">Field Site Clearance & Community Jal Sahiya Network</p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> State Pilot Sanctioned
              </p>
            </div>
          </div>

          {/* Funding Milestones Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase text-slate-700">
                Milestone-Gated Funding Requirements
              </h4>
              <span className="text-xs font-extrabold text-slate-900">
                Total: ₹{(opportunity.fundingRequired / 100000).toFixed(1)} Lakh
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {opportunity.milestones.map((m, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      m.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {m.completed ? '✓' : idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-800">{m.name}</p>
                      <p className="text-[10px] text-slate-400">Stage: {m.stage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">₹{(m.amount / 100000).toFixed(1)} L</span>
                    <span className={`block text-[10px] font-bold ${m.completed ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {m.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Estimated Impact: <strong className="text-slate-900">{opportunity.beneficiaries.toLocaleString()} citizens</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onFundProject(opportunity);
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <IndianRupee className="w-3.5 h-3.5" />
              Commit Funding
            </button>
            <button
              onClick={() => {
                onExpressInterest(opportunity);
                onClose();
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              Express Interest & Collaborate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
