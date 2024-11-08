import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  variant = 'primary', 
  icon: Icon,
  children, 
  className = '',
  size = 'md',
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50';
  
  const variants = {
    primary: 'bg-[#2D9CDB] text-white hover:bg-[#2D9CDB]/90',
    secondary: 'bg-[#1E2A37] text-white hover:bg-[#1E2A37]/90',
    ghost: 'bg-transparent text-[#2D9CDB] hover:bg-[#2D9CDB]/10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 md:px-6 md:py-3',
    lg: 'px-6 py-3 md:px-8 md:py-4 text-lg'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />}
    </button>
  );
};