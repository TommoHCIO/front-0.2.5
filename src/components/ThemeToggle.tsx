import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 flex items-center gap-2"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-400">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-gray-400">Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;