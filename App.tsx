import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { analyzeChartWithGemini } from './services/geminiService';
import { AnalysisResult, AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImageSelected = async (file: File) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);
    setResult(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        // Remove data URL prefix (e.g., "data:image/png;base64,")
        const base64Data = base64String.split(',')[1];
        
        try {
          const analysis = await analyzeChartWithGemini(base64Data);
          setResult(analysis);
          setAppState(AppState.SUCCESS);
        } catch (apiError) {
          console.error(apiError);
          setAppState(AppState.ERROR);
          setErrorMsg("Failed to analyze the chart. Please ensure the image is clear and try again.");
        }
      };
      reader.onerror = () => {
        setAppState(AppState.ERROR);
        setErrorMsg("Error reading file.");
      };
      reader.readAsDataURL(file);

    } catch (e) {
      setAppState(AppState.ERROR);
      setErrorMsg("An unexpected error occurred.");
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <Header />
      
      <main className="relative">
        {/* Dynamic Content Switching */}
        {appState === AppState.SUCCESS && result ? (
           <div className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center">
             <div className="mb-12 text-center">
               <h2 className="text-4xl font-bold mb-4">Analysis Complete</h2>
               <p className="text-zinc-400">Here is the breakdown based on the Universal Model.</p>
             </div>
             <AnalysisDisplay result={result} onReset={handleReset} />
           </div>
        ) : (
          <HeroSection onImageSelected={handleImageSelected} appState={appState} />
        )}

        {/* Error Notification */}
        {appState === AppState.ERROR && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-900/90 text-white px-6 py-4 rounded-xl border border-red-500/50 backdrop-blur-md shadow-2xl flex items-center gap-4 z-50 animate-bounce-in">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
             </svg>
             <div>
               <p className="font-bold text-sm">Analysis Failed</p>
               <p className="text-xs opacity-80">{errorMsg}</p>
             </div>
             <button onClick={handleReset} className="ml-4 hover:bg-white/10 p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
             </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black text-center text-zinc-600 text-sm">
        <p>© 2025 Fractal Model Trader. Powered by Gemini 2.5 Flash.</p>
      </footer>
    </div>
  );
}

export default App;