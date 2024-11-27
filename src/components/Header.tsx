import React from 'react';
import { Globe2, RotateCcw } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  language: string;
  onLanguageChange: () => void;
  onReset: () => void;
}

export default function Header({ language, onLanguageChange, onReset }: HeaderProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Logo />
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={onLanguageChange}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl glass hover:bg-white/20 transition-colors text-white text-sm sm:text-base"
        >
          <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" />
          {language.toUpperCase()}
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl glass hover:bg-white/20 transition-colors text-white text-sm sm:text-base"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Yenile</span>
        </button>
      </div>
    </div>
  );
}