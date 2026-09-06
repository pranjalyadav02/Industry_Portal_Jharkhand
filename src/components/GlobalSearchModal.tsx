import React from 'react';
import { Search, X, MapPin, ArrowRight, Building2, GraduationCap } from 'lucide-react';
import { Opportunity, Collaboration } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: Opportunity[];
  collaborations: Collaboration[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onSelectCollaboration: (col: Collaboration) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  opportunities,
  collaborations,
  onSelectOpportunity,
  onSelectCollaboration
}) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredOpps = opportunities.filter(o => 
    !query || 
    o.title.toLowerCase().includes(query.toLowerCase()) || 
    o.district.toLowerCase().includes(query.toLowerCase()) ||
    o.domain.toLowerCase().includes(query.toLowerCase()) ||
    o.id.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredCols = collaborations.filter(c =>
    !query ||
    c.projectTitle.toLowerCase().includes(query.toLowerCase()) ||
    c.id.toLowerCase().includes(query.toLowerCase()) ||
    c.district.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search water, BIT Mesra, Gumla, TRL 5, CH-2026..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none text-slate-900 placeholder:text-slate-400 font-medium"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {filteredOpps.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                Opportunities & Challenges
              </p>
              <div className="space-y-1">
                {filteredOpps.map((opp) => (
                  <button
                    key={opp.id}
                    onClick={() => {
                      onSelectOpportunity(opp);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600">{opp.title}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">{opp.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span>{opp.district}</span>
                        <span>•</span>
                        <span>TRL {opp.trl}</span>
                        <span>•</span>
                        <span>₹{((opp.fundingRequired)/100000).toFixed(1)}L Needed</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredCols.length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
                Active Collaborations
              </p>
              <div className="space-y-1">
                {filteredCols.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      onSelectCollaboration(col);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600">{col.projectTitle}</span>
                        <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{col.id}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {col.university} • {col.status}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredOpps.length === 0 && filteredCols.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No results found matching "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
