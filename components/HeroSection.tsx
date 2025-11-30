import React, { useCallback, useState } from 'react';
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
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-20 pb-10">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
         <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Text Content */}
        <div className="space-y-8 animate-fade-in z-10 text-left">
           {/* Tag */}
           <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-orange-500 font-bold tracking-widest text-xs uppercase">Universal Model AI</span>
           </div>

           {/* Heading */}
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
             Craft Visual <br />
             <span className="gradient-text">Trades.</span>
           </h1>

           {/* Description */}
           <p className="text-lg md:text-xl text-zinc-400 max-w-lg font-light leading-relaxed">
             Transform raw charts into actionable insights instantly. 
             AI adapts to the TTrades logic, automating the analysis so you can focus on execution.
           </p>

           {/* Status / Feature Tags */}
           <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm w-fit transition-all hover:bg-white/10 cursor-default">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="text-sm font-medium text-zinc-300">System Operational</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-transparent rounded-full border border-transparent w-fit">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                 </svg>
                 <span className="text-sm font-medium text-zinc-500">Free Access</span>
              </div>
           </div>
        </div>

        {/* Right Column: Upload Interface */}
        <div className="relative z-10 flex flex-col gap-6">
            {/* Upload Area / Video Player Lookalike */}
            <div 
              className={`
                aspect-video w-full rounded-2xl border bg-black/40 backdrop-blur-sm 
                flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500
                shadow-2xl shadow-black/50 group
                ${isDragging ? 'border-orange-500 bg-orange-500/5 scale-[1.02]' : 'border-white/10 hover:border-white/20'}
                ${isLoading ? 'animate-pulse border-orange-500/30' : ''}
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
                {isLoading ? (
                    <div className="flex flex-col items-center gap-4 z-10">
                       <div className="w-16 h-16 rounded-full border-4 border-orange-500/30 border-t-orange-500 animate-spin"></div>
                       <p className="text-orange-500 font-medium tracking-wide">ANALYZING STRUCTURE...</p>
                    </div>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        
                        <label className="cursor-pointer flex flex-col items-center group/btn z-10">
                            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6 backdrop-blur-md group-hover/btn:bg-orange-600 group-hover/btn:border-orange-500 transition-all duration-300 shadow-2xl">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <span className="text-2xl font-semibold text-white mb-2">Upload Chart</span>
                            <span className="text-zinc-500 text-sm">Drag & drop or click to browse</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileInput} />
                        </label>

                        {/* Player UI Elements */}
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-50 pointer-events-none">
                            <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
                                <div className="h-full w-1/3 bg-orange-500 rounded-full"></div>
                            </div>
                        </div>
                    </>
                )}
                
                {/* Glow behind container */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000 -z-10"></div>
            </div>

            {/* Workflow Steps */}
            <div className="grid grid-cols-1 gap-3">
                 <StepItem number="01" text="Import Chart Screenshot" active={appState === AppState.IDLE} />
                 <StepItem number="02" text="AI Pattern Recognition" active={appState === AppState.ANALYZING} />
                 <StepItem number="03" text="Get Confidence Score" active={appState === AppState.SUCCESS} />
            </div>
        </div>

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
        <span className="font-medium text-sm md:text-base">{text}</span>
        <span className={`text-xs font-bold px-2 py-1 rounded bg-black/50 ${active ? 'text-orange-500' : 'text-zinc-600'}`}>
            {number}
        </span>
    </div>
);