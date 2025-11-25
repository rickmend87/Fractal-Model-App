import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700",
    ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};