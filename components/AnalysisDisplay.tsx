import React from 'react';
import { AnalysisResult } from '../types';
import { Button } from './Button';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, onReset }) => {
  const isHighConfidence = result.confidenceScore >= 70;
  const scoreColor = isHighConfidence ? 'text-green-500' : result.confidenceScore >= 40 ? 'text-orange-500' : 'text-red-500';

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm orange-glow relative overflow-hidden">
        {/* Background gradient splash */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          
          {/* Left Column: Score */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-6">
            <div>
              <h3 className="text-zinc-400 text-sm font-semibold tracking-widest uppercase mb-2">Confidence Score</h3>
              <div className={`text-8xl font-bold ${scoreColor} tracking-tighter`}>
                {result.confidenceScore}%
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 w-full border border-white/5">
              <h4 className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Next Action</h4>
              <p className="text-xl text-white font-medium leading-relaxed">
                {result.nextStep}
              </p>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <DetailRow label="Detected Model" value={result.detectedModel} />
              <DetailRow label="Key Level" value={result.keyLevelObservation} />
              <DetailRow label="SMT Status" value={result.smtStatus} />
              <DetailRow label="Entry Trigger" value={result.entryTrigger} />
            </div>

            <div className="pt-6 border-t border-white/10">
               <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">AI Reasoning</h4>
               <p className="text-zinc-300 text-sm leading-relaxed">
                 {result.reasoning}
               </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
            <Button onClick={onReset} variant="secondary">
              Analyze Another Chart
            </Button>
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="group">
    <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-orange-500/70 transition-colors">{label}</div>
    <div className="text-white text-lg font-light border-l-2 border-orange-500/30 pl-3 group-hover:border-orange-500 transition-colors">
      {value}
    </div>
  </div>
);