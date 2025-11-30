import React from 'react';
import { HistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose, history, onSelect }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-white/10 shadow-2xl z-[70] 
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
           {/* Header */}
           <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
             <h2 className="text-xl font-bold text-white">Analysis History</h2>
             <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-400">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
               </svg>
             </button>
           </div>

           {/* List */}
           <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {history.length === 0 ? (
                <div className="text-center text-zinc-500 py-10">
                  <p>No history yet.</p>
                  <p className="text-sm">Analyze a chart to see it here.</p>
                </div>
              ) : (
                history.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="group bg-black/40 border border-white/5 hover:border-orange-500/50 rounded-xl p-3 flex gap-4 cursor-pointer transition-all duration-300 hover:bg-white/5"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-zinc-800 border border-white/5 relative">
                       <img src={`data:image/png;base64,${item.imageData}`} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                       <div className="flex items-center justify-between mb-1">
                          <span className={`text-lg font-bold ${item.result.confidenceScore >= 70 ? 'text-green-500' : item.result.confidenceScore >= 40 ? 'text-orange-500' : 'text-red-500'}`}>
                            {item.result.confidenceScore}%
                          </span>
                          <span className="text-xs text-zinc-600">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                       </div>
                       <h4 className="text-white text-sm font-medium truncate mb-1">{item.result.detectedModel}</h4>
                       <p className="text-zinc-500 text-xs truncate">{item.result.entryTrigger}</p>
                    </div>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>
    </>
  );
};