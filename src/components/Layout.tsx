import React from 'react';
import { Sidebar } from './Sidebar';
import { ConnectWallet } from './ConnectWallet';
import { useTheme } from '../context/ThemeContext';
import { ParticleBackground } from './ParticleBackground';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-[#15202B] via-[#192734] to-[#15202B]' 
        : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'
    }`}>
      <ParticleBackground />
      <Sidebar />
      
      {/* Connect Wallet Button */}
      <div className="fixed top-6 right-6 z-50">
        <ConnectWallet />
      </div>

      <main className="lg:ml-64 min-h-screen relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#2D9CDB] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#7F56D9] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow delay-1000" />
        
        {/* Content */}
        <div className="relative">
          {children}
        </div>
      </main>
    </div>
  );
};