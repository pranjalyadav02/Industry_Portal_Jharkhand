import React from 'react';
import { 
  Rocket, 
  MapPin, 
  CheckCircle2, 
  Users, 
  Activity, 
  Wifi, 
  Battery, 
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const FieldDeploymentView: React.FC = () => {
  const [selectedSite, setSelectedSite] = React.useState<string>('Gumla-01');

  const sites = [
    {
      id: 'Gumla-01',
      name: 'Bishunpur Rural Drinking Water Sensor Mesh',
      district: 'Gumla',
      block: 'Bishunpur',
      villages: 'Banari, Kujra, Champa, Navatoli (18 habs)',
      status: 'Active Field Pilot',
      nodesOnline: '18 / 20 Nodes Online',
      telemetry: {
        lastPing: '2 mins ago',
        fluorideLevel: '1.14 ppm (Normal threshold < 1.5 ppm)',
        arsenicLevel: '0.004 mg/L (Safe)',
        batteryAvg: '94%',
        signal: 'LoRaWAN + GSM (98% packet delivery)'
      },
      communityPartner: 'Bishunpur Jal Sahiya Mahila Samiti',
      beneficiaries: 28400,
      validationScore: 92
    },
    {
      id: 'Khunti-02',
      name: 'Torpa Tribal Solar Cold Micro-Storage Unit 1 & 2',
      district: 'Khunti',
      block: 'Torpa',
      villages: 'Dorma, Diyakel, Tapkara (3 FPOs)',
      status: 'Commissioned & Active',
      nodesOnline: '2 / 2 Chillers Online',
      telemetry: {
        lastPing: 'Just now',
        internalTemp: '4.2°C (Optimal target 4°C - 6°C)',
        humidity: '88% RH',
        batteryAvg: '98% (Solar powered)',
        signal: '4G Telemetry'
      },
      communityPartner: 'Torpa Mahila Vikas Samiti (SHG Cluster)',
      beneficiaries: 18500,
      validationScore: 95
    },
    {
      id: 'Singhbhum-03',
      name: 'Chaibasa Point-of-Care Sickle Cell Screening Field Unit',
      district: 'West Singhbhum',
      block: 'Chaibasa Sadar',
      villages: '12 Primary Health Centers (PHCs)',
      status: 'Clinical Trial Pilot',
      nodesOnline: '12 Devices Active',
      telemetry: {
        lastPing: '15 mins ago',
        testsConducted: '1,420 tests logged this week',
        turnaround: '42 mins avg confirmation',
        batteryAvg: '89%',
        signal: 'ABHA (Ayushman Bharat Digital Health)'
      },
      communityPartner: 'Kolhan Tribal Health Worker Guild',
      beneficiaries: 21000,
      validationScore: 89
    }
  ];

  const activeSite = sites.find(s => s.id === selectedSite) || sites[0];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto overflow-y-auto">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
              Ground Validation
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-semibold">Real-Time IoT Telemetry & Community Feeds</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Field Deployment & Community Validation
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl">
            Live monitoring of pilot installations in Jharkhand villages. Every hardware node reports real telemetry and citizen feedback.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
          <span>Live Field Stream: 32 Hardware Nodes Reporting</span>
        </div>
      </div>

      {/* Deployment Sites Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sites.map(s => {
          const isSelected = s.id === activeSite.id;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSite(s.id)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-500">{s.id}</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {s.status}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm leading-snug">{s.name}</h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {s.district} ({s.block})
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>{s.nodesOnline}</span>
                <span className="font-bold text-blue-600">{s.beneficiaries.toLocaleString()} pop</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Site Live Telemetry & Field Dashboard */}
      {activeSite && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Telemetric Node Active</span>
                <span className="text-xs text-slate-400">• Last ping: {activeSite.telemetry.lastPing}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">{activeSite.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Location: {activeSite.villages}, {activeSite.district} District
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400">Citizen Validation Score</span>
              <p className="text-xl font-black text-emerald-600">{activeSite.validationScore} / 100</p>
              <p className="text-[10px] text-slate-500">Verified by local Jal Sahiya</p>
            </div>
          </div>

          {/* Telemetry Sensor Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Primary Parameter</span>
              <p className="text-sm font-bold text-slate-900">{activeSite.telemetry.fluorideLevel || activeSite.telemetry.internalTemp}</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-1">✓ Within BIS Standard</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Secondary Parameter</span>
              <p className="text-sm font-bold text-slate-900">{activeSite.telemetry.arsenicLevel || activeSite.telemetry.humidity || activeSite.telemetry.testsConducted}</p>
              <p className="text-[10px] text-blue-600 font-semibold mt-1">Calibrated Daily</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Power Subsystem</span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                <Battery className="w-4 h-4 text-emerald-600" />
                {activeSite.telemetry.batteryAvg}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Solar PV Micro-Panel</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Telemetry Mesh</span>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                <Wifi className="w-4 h-4 text-blue-600" />
                Connected
              </p>
              <p className="text-[10px] text-slate-500 mt-1">{activeSite.telemetry.signal}</p>
            </div>
          </div>

          {/* Community Feedback and Local Operators */}
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-slate-900">Community Operations & Field Partner</p>
              <p className="text-slate-600">{activeSite.communityPartner}</p>
              <p className="text-[11px] text-blue-700 mt-0.5">24 Jal Sahiya and SHG members trained on digital tablet calibration</p>
            </div>

            <button 
              onClick={() => alert(`Downloading IoT Raw Telemetry Data CSV & Sensor Calibration Log for ${activeSite.id}...`)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 cursor-pointer"
            >
              Export Sensor Telemetry Logs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
