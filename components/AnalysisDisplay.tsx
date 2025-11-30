import React from 'react';
import { AnalysisResult } from '../types';
import { Button } from './Button';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  imageData?: string;
  onReset: () => void;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, imageData, onReset }) => {
  const isHighConfidence = result.confidenceScore >= 70;
  const scoreColor = isHighConfidence ? 'text-green-500' : result.confidenceScore >= 40 ? 'text-orange-500' : 'text-red-500';

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in-up pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image & Score */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden flex flex-col items-center text-center">
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             
             <h3 className="text-zinc-400 text-xs font-semibold tracking-widest uppercase mb-4">Confidence Score</h3>
             <div className={`text-7xl font-bold ${scoreColor} tracking-tighter mb-6`}>
                {result.confidenceScore}%
             </div>

             {imageData && (
               <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-6">
                 <img src={`data:image/png;base64,${imageData}`} alt="Analyzed Chart" className="w-full h-full object-cover" />
               </div>
             )}

             <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/5 text-left">
                <h4 className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">Next Action</h4>
                <p className="text-sm text-white font-medium leading-relaxed">
                  {result.nextStep}
                </p>
             </div>
          </div>
          
          <div className="hidden lg:block">
             <Button onClick={onReset} variant="secondary" className="w-full">
               Analyze Another Chart
             </Button>
          </div>
        </div>

        {/* Right Column: Detailed Breakdown */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm orange-glow relative overflow-hidden">
           <div className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <DetailRow label="Detected Model" value={result.detectedModel} />
                <DetailRow label="Key Level" value={result.keyLevelObservation} />
                <DetailRow label="SMT Status" value={result.smtStatus} />
                <DetailRow label="Entry Trigger" value={result.entryTrigger} />
              </div>

              <div className="pt-8 border-t border-white/10">
                 <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-3">AI Reasoning</h4>
                 <p className="text-zinc-300 text-base leading-relaxed">
                   {result.reasoning}
                 </p>
              </div>
           </div>
        </div>

        <div className="lg:hidden col-span-1">
             <Button onClick={onReset} variant="secondary" className="w-full">
               Analyze Another Chart
             </Button>
        </div>

      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="group">
    <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-orange-500/70 transition-colors">{label}</div>
    <div className="text-white text-lg font-light border-l-2 border-orange-500/30 pl-4 group-hover:border-orange-500 transition-colors">
      {value}
    </div>
  </div>
);