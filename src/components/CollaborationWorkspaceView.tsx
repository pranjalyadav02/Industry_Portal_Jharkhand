import React from 'react';
import { 
  Handshake, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Download, 
  IndianRupee, 
  Building2, 
  GraduationCap, 
  Layers, 
  ShieldCheck, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { Collaboration, OrganizationProfile } from '../types';

interface CollaborationWorkspaceViewProps {
  collaborations: Collaboration[];
  onSelectCollaboration: (col: Collaboration) => void;
  selectedCollaboration: Collaboration | null;
  currentOrg: OrganizationProfile;
}

export const CollaborationWorkspaceView: React.FC<CollaborationWorkspaceViewProps> = ({
  collaborations,
  onSelectCollaboration,
  selectedCollaboration,
  currentOrg
}) => {
  const activeCol = selectedCollaboration || collaborations[0];
  const [activeTab, setActiveTab] = React.useState<'overview' | 'milestones' | 'documents' | 'field-data'>('overview');
  const [noteInput, setNoteInput] = React.useState<string>('');
  const [notes, setNotes] = React.useState<string[]>([
    'Bishunpur Block Development Officer completed site visit. 18 solar water points cleared.',
    'Bokaro Bio-Clean delivered 20 sensor probe enclosures for bench testing.'
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    setNotes([noteInput.trim(), ...notes]);
    setNoteInput('');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
              Multi-Stakeholder Consortium
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">{collaborations.length} Active Workspaces</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Collaboration & Partnership Workspaces
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Where Government, University research teams, Industry funders, and Community ground partners execute together under unified legal agreements.
          </p>
        </div>

        {/* 4-Party Badge */}
        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Quad-Helix Model: Govt + Univ + Industry + Community</span>
        </div>
      </div>

      {/* Collaboration Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {collaborations.map((col) => {
          const isSelected = col.id === activeCol.id;
          return (
            <button
              key={col.id}
              onClick={() => onSelectCollaboration(col)}
              className={`text-xs px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {col.id} • {col.projectTitle.slice(0, 32)}...
            </button>
          );
        })}
      </div>

      {/* Main Workspace for activeCol */}
      {activeCol && (
        <div className="space-y-6">
          {/* Top Banner Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {activeCol.id}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {activeCol.status}
                  </span>
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {activeCol.district} District
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Agreement: {activeCol.agreementStatus}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900">{activeCol.projectTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Academic Lead: <strong className="text-slate-800">{activeCol.university}</strong> • Industry Partner: <strong className="text-slate-800">{currentOrg.name}</strong>
                </p>
              </div>

              {/* Progress & Validation pill */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Commitment</span>
                  <p className="text-lg font-black text-slate-900">
                    ₹{(activeCol.totalCommitment / 100000).toFixed(1)} Lakh
                  </p>
                  <p className="text-[10px] text-slate-500">₹{(activeCol.releasedAmount / 100000).toFixed(1)}L released</p>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Community Score</span>
                  <p className="text-lg font-black text-emerald-600">
                    {activeCol.communityValidationScore}/100
                  </p>
                  <p className="text-[10px] text-slate-500">Jal Sahiya verified</p>
                </div>
              </div>
            </div>

            {/* Quad Helix 4-Party Stakeholder Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">1. Government Partner</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{activeCol.governmentPartner}</p>
                <p className="text-[10px] text-slate-500">Site clearances & field sanctions</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">2. University Innovator</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{activeCol.university.split('(')[0]}</p>
                <p className="text-[10px] text-slate-500">Sensor design, firmware & TRL</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">3. Industry / CSR</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{currentOrg.name.split(' ')[0]} CSR</p>
                <p className="text-[10px] text-slate-500">Funding & telemetry engineering</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">4. Community / Grassroots</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{activeCol.communityPartner}</p>
                <p className="text-[10px] text-slate-500">Sampling & local maintenance</p>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200">
            {[
              { id: 'overview', label: 'Milestones & Work Plan' },
              { id: 'documents', label: 'Consortium Documents & MoUs' },
              { id: 'field-data', label: 'Field Trial Logs & Updates' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs font-bold px-4 py-2.5 border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Milestones */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
                Consortium Milestones & Tranches
              </div>
              <div className="divide-y divide-slate-100">
                {activeCol.milestones.map((m, idx) => (
                  <div key={m.id} className="p-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {m.status === 'Completed' ? '✓' : idx + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{m.title}</p>
                        <p className="text-[11px] text-slate-400">Status: {m.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">₹{(m.amount / 100000).toFixed(1)} Lakh</span>
                      <span className={`block text-[10px] font-bold ${
                        m.status === 'Completed' ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {m.status === 'Completed' ? 'Disbursed' : 'Awaiting Gates'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Documents */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400">Consortium Legal Artifacts</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: 'Tripartite MoU Agreement (Govt + BIT Mesra + Tata CSR)', size: '2.4 MB', date: '12 Jan 2026' },
                  { name: 'NABL Sensor Calibration Test Certificate', size: '1.8 MB', date: '04 Feb 2026' },
                  { name: 'Bishunpur District Field Site Authorization Order', size: '850 KB', date: '20 Feb 2026' },
                  { name: 'IPR Royalty & Open Source Hardware Framework', size: '1.2 MB', date: '28 Feb 2026' }
                ].map((doc, dIdx) => (
                  <div key={dIdx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{doc.name}</p>
                        <p className="text-[10px] text-slate-400">{doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading verified document: ${doc.name}`)}
                      className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-200 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Field Trial Logs & Collaborative Updates */}
          {activeTab === 'field-data' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase text-slate-400">Live Field Updates & Coordination</h4>
              
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add field note or technical observation..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Post Note
                </button>
              </form>

              <div className="space-y-2.5 pt-2">
                {notes.map((n, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p>{n}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Recorded by Consortium Lead</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
