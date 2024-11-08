import React, { useState } from 'react';
import { Home, Coins, Menu, X, Map, ExternalLink, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import ThemeToggle from './ThemeToggle';
import { RewardsModal } from './RewardsModal';
import { AboutModal } from './AboutModal';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const location = useLocation();

  const mainMenuItems = [
    { 
      title: 'Home', 
      icon: <Home className="w-5 h-5" />, 
      path: '/' 
    },
    { 
      title: 'D-app Preview', 
      icon: <ExternalLink className="w-5 h-5" />, 
      path: 'https://whimsical-ganache-7f13fd.netlify.app', 
      external: true 
    },
    { 
      title: 'Rewards', 
      icon: <Coins className="w-5 h-5" />, 
      onClick: () => setIsRewardsModalOpen(true)
    },
    { 
      title: 'Roadmap', 
      icon: <Map className="w-5 h-5" />, 
      path: '/roadmap' 
    },
  ];

  const socialMenuItems = [
    { 
      title: 'X Socials', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>, 
      path: 'https://x.com/ChatTE_Official', 
      external: true 
    },
    { 
      title: 'Telegram', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.48.79-.74 3.08-1.34 5.15-2.23 6.19-2.66 2.95-1.23 3.56-1.44 3.97-1.44.09 0 .28.02.41.09.11.06.19.14.22.24.03.11.05.21.05.3z"/>
      </svg>, 
      path: 'https://t.me/+klLqxEBo4QpmMWY0', 
      external: true 
    }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#1D9BF0] p-2 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-[#15202B] text-white w-64 transform transition-transform duration-200 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <Logo size="sm" />
            <div>
              <h1 className="text-xl font-bold">Chat to Earn</h1>
              <p className="text-xs text-gray-400">Earn while you chat</p>
            </div>
          </div>

          <nav className="flex-1 space-y-6">
            {/* Main Menu Section */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3">Menu</h2>
              <ul className="space-y-1">
                {mainMenuItems.map((item) => (
                  <li key={item.title}>
                    {item.external ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    ) : item.onClick ? (
                      <button
                        onClick={() => {
                          item.onClick();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors w-full text-left"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link
                        to={item.path!}
                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors ${
                          location.pathname === item.path ? 'bg-white/10' : ''
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links Section */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3">Social Links</h2>
              <ul className="space-y-1">
                {socialMenuItems.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* About Us Button */}
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors w-full text-left mb-4"
          >
            <Info className="w-5 h-5" />
            <span>About Us</span>
          </button>

          {/* Theme Toggle at Bottom */}
          <div className="pt-4 border-t border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <RewardsModal 
        isOpen={isRewardsModalOpen}
        onClose={() => setIsRewardsModalOpen(false)}
      />

      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </>
  );
};