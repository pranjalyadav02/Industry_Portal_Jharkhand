import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Award, 
  Download, 
  CheckCircle2, 
  ExternalLink,
  IndianRupee,
  Layers
} from 'lucide-react';

export const TechTransferView: React.FC = () => {
  const ipList = [
    {
      id: 'IP-2026-004',
      title: 'Electrochemical Fluoride Sensing Mesh & Sub-PPM Telemetry Probe',
      patentNo: 'IN-2026-PAT-09182 (Filed)',
      assignee: 'Birla Institute of Technology, Mesra',
      inventors: 'Dr. A. Verma, S. Murmu, P. Kumar',
      licenseModel: 'Open Public Good (Jharkhand Rural Water) + Commercial Tooling Royalty',
      status: 'Provisional Granted',
      commercialPartner: 'Tata Steel CSR / Bokaro Bio-Clean',
      trl: 6
    },
    {
      id: 'IP-2026-007',
      title: 'Phase Change Material (PCM) Thermal Buffer for Solar Cold Micro-Rooms',
      patentNo: 'IN-2025-PAT-04421 (Published)',
      assignee: 'Birsa Agricultural University (BAU)',
      inventors: 'Prof. S. Soren, Er. N. Roy',
      licenseModel: 'Statewide Exclusive MSME License',
      status: 'Examination Stage',
      commercialPartner: 'Birsa AgriTech Solutions',
      trl: 6
    },
    {
      id: 'IP-2026-011',
      title: 'Microfluidic Immunoassay for Rapid Sickle Cell Differential Blood Staining',
      patentNo: 'IN-2026-PAT-01129 (Filed)',
      assignee: 'Kolhan University + RIMS Ranchi',
      inventors: 'Dr. P. Hansda, Dr. M. Choudhary',
      licenseModel: 'Non-Exclusive Humanitarian License',
      status: 'Filed',
      commercialPartner: 'Tech Mahindra Foundation',
      trl: 5
    }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
              Intellectual Property Repository
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">Statewide Technology Transfer Registry</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            IPR & Technology Transfer Agreements
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Clear, transparent intellectual property frameworks ensuring academic inventors receive royalties while enabling industry to scale solutions for societal good.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl text-xs text-blue-900 font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Indian Patent Office (IPO) & DIPP Compliant</span>
        </div>
      </div>

      {/* IP Cards */}
      <div className="space-y-4">
        {ipList.map((ip) => (
          <div key={ip.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {ip.id}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                    {ip.status}
                  </span>
                  <span className="text-xs font-mono text-slate-600 font-semibold">
                    Patent Ref: {ip.patentNo}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{ip.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assignee: <strong className="text-slate-700">{ip.assignee}</strong> • Inventors: {ip.inventors}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => alert(`Downloading IPO Patent Draft & Claims for ${ip.id}...`)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Claims & Specs
                </button>
                <button
                  onClick={() => alert(`Initiating Technology Commercialization License Agreement for ${ip.title}...`)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
                >
                  License Technology
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Licensing Terms</span>
                <span className="font-semibold text-slate-800">{ip.licenseModel}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Active Licensee / Partner</span>
                <span className="font-semibold text-slate-800">{ip.commercialPartner}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
