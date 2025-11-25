import React, { useCallback, useState } from 'react';
import { Button } from './Button';
import { AppState } from '../types';

interface HeroSectionProps {
  onImageSelected: (file: File) => void;
  appState: AppState;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onImageSelected, appState }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelected(e.dataTransfer.files[0]);
    }
  }, [onImageSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  }, [onImageSelected]);

  const isLoading = appState === AppState.ANALYZING;

  return (
    <div className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
         <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in mb-16">
        <h2 className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
          • Universal Model AI
        </h2>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
          Decode Market <br />
          <span className="gradient-text">Structure.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
          Instantly analyze price action, SMT divergence, and swing points to calculate probability.
          Precision trading powered by Gemini 2.5 Flash.
        </p>
      </div>

      {/* Upload Area / "Video Player" lookalike */}
      <div className="w-full max-w-3xl mx-auto relative group">
        <div 
          className={`
            aspect-video rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm 
            flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500
            ${isDragging ? 'border-orange-500 bg-orange-500/5 scale-[1.02]' : 'hover:border-white/20'}
            ${isLoading ? 'animate-pulse' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
            {isLoading ? (
                <div className="flex flex-col items-center gap-4 z-10">
                   <div className="w-16 h-16 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin"></div>
                   <p className="text-orange-500 font-medium tracking-wide">ANALYZING MARKET STRUCTURE...</p>
                </div>
            ) : (
                <>
                    {/* Placeholder content resembling the screenshot's player */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                    
                    <label className="cursor-pointer flex flex-col items-center group/btn z-10">
                        <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6 backdrop-blur-md group-hover/btn:bg-orange-600 group-hover/btn:border-orange-500 transition-all duration-300 shadow-2xl">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        <span className="text-2xl font-semibold text-white mb-2">Upload Chart Image</span>
                        <span className="text-zinc-500 text-sm">Drag & drop or click to browse</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
                    </label>

                    {/* Decorative elements from screenshot */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-50 pointer-events-none">
                        <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-orange-500 rounded-full"></div>
                        </div>
                    </div>
                </>
            )}
        </div>
        
        {/* Glow behind container */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 -z-10"></div>
      </div>

      {/* Feature Steps List */}
      <div className="mt-16 w-full max-w-sm mx-auto space-y-3">
          <StepItem number="01" text="Import Chart Screenshot" active={appState === AppState.IDLE} />
          <StepItem number="02" text="AI Pattern Recognition" active={appState === AppState.ANALYZING} />
          <StepItem number="03" text="Get Confidence Score" active={appState === AppState.SUCCESS} />
      </div>
    </div>
  );
};

const StepItem: React.FC<{ number: string; text: string; active?: boolean }> = ({ number, text, active }) => (
    <div className={`
        flex items-center justify-between p-4 rounded-xl border transition-all duration-300
        ${active 
            ? 'bg-zinc-900 border-orange-500/50 shadow-lg shadow-orange-900/20 translate-x-2' 
            : 'bg-transparent border-white/5 text-zinc-500 hover:bg-white/5'}
    `}>
        <span className="font-medium">{text}</span>
        <span className={`text-xs font-bold px-2 py-1 rounded bg-black/50 ${active ? 'text-orange-500' : 'text-zinc-600'}`}>
            {number}
        </span>
    </div>
);