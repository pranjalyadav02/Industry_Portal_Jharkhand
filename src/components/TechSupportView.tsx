import React from 'react';
import { 
  Cpu, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Building2, 
  GraduationCap, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Mentor, TechSupportOffer } from '../types';

export const TechSupportView: React.FC = () => {
  const [assignedSuccess, setAssignedSuccess] = React.useState<string | null>(null);

  const mentors: Mentor[] = [
    {
      id: 'M-01',
      name: 'Dr. Rajiv Mukhopadhyay',
      title: 'Principal Water Quality & Membrane Architect',
      organization: 'Tata Steel Industrial Engineering',
      expertise: ['Electro-chemical Sensing', 'Membrane Filtration', 'NABL Lab Compliance'],
      assignedProjects: ['PR-2026-0019 (BIT Mesra)'],
      hoursContributed: 36
    },
    {
      id: 'M-02',
      name: 'Sunita Murmu',
      title: 'VP Embedded Systems & IoT Gateways',
      organization: 'Tech Mahindra Engineering',
      expertise: ['LoRaWAN', 'Firmware Optimization', 'Solar Micro-Power'],
      assignedProjects: ['PR-2026-0024 (BAU Ranchi)'],
      hoursContributed: 24
    },
    {
      id: 'M-03',
      name: 'Vikas Agarwal',
      title: 'Head of Tooling & Production Engineering',
      organization: 'Adityapur Tool Room (IDTR)',
      expertise: ['DFM (Design for Manufacturing)', 'Die Casting', 'Injection Molding'],
      assignedProjects: ['PR-2026-0019 (Bokaro Tooling)'],
      hoursContributed: 42
    }
  ];

  const pendingRequests = [
    {
      id: 'REQ-081',
      university: 'Birsa Agricultural University (BAU)',
      project: 'PR-2026-0024: Solar Micro Cold Storage',
      need: 'Thermal simulation of phase change material (PCM) during 44°C summer ambient temperatures in Torpa, Khunti.',
      urgency: 'Medium',
      date: 'Yesterday'
    },
    {
      id: 'REQ-084',
      university: 'Kolhan University + RIMS',
      project: 'PR-2026-0031: Sickle Cell Point-of-Care Kit',
      need: 'Optical microfluidic sensor calibration with clinical control samples.',
      urgency: 'High',
      date: '2 days ago'
    }
  ];

  const handleAssign = (reqId: string) => {
    setAssignedSuccess(`Industry Mentor assigned to ${reqId}! 2-hour technical advisory clinic scheduled.`);
    setTimeout(() => setAssignedSuccess(null), 3500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
              Knowledge & Tech Transfer
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">More Than Funding</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Industry Mentorship & Technical Support
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Direct access to corporate R&D engineers, testing facilities, and manufacturing leads who guide university teams through rigorous industrial standards.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl text-xs text-blue-900 font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>102 Corporate Engineering Hours Contributed</span>
        </div>
      </div>

      {assignedSuccess && (
        <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{assignedSuccess}</span>
        </div>
      )}

      {/* Pending University Requests */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Active University Support Requests</h3>
            <p className="text-xs text-slate-500">Student and faculty innovators requesting corporate expertise</p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            {pendingRequests.length} Pending
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {pendingRequests.map(req => (
            <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {req.id}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{req.project}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    req.urgency === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.urgency} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-600">{req.need}</p>
                <p className="text-[11px] text-slate-400">Requesting Body: {req.university}</p>
              </div>

              <button
                onClick={() => handleAssign(req.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-colors cursor-pointer shrink-0"
              >
                Assign Industry Mentor
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Mentors Directory */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Registered Corporate Mentors & Domain Leads
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mentors.map(m => (
            <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                <p className="text-xs text-slate-500">{m.title}</p>
                <p className="text-xs text-blue-600 font-semibold">{m.organization}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Expertise</span>
                <div className="flex flex-wrap gap-1">
                  {m.expertise.map(exp => (
                    <span key={exp} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{m.hoursContributed} hrs contributed</span>
                <span className="font-semibold text-emerald-600">{m.assignedProjects.length} Active Project</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
