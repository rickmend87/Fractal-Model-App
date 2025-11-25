import React from 'react';
import { Button } from './Button';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-black"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Fractal Model Trader</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">MODEL</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">RESOURCES</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">HISTORY</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium text-zinc-300 hover:text-white hidden sm:block">Log In</a>
          <Button variant="primary" className="py-2 px-5 text-sm">
            Get Access
          </Button>
        </div>
      </div>
    </header>
  );
};