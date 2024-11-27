import React from 'react';
import { Timer } from 'lucide-react';

interface StatsProps {
  timeLeft: number;
  wpm: number;
  accuracy: number;
  streak: number;
}

export default function Stats({ timeLeft, wpm, accuracy, streak }: StatsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mb-6">
      <div className="flex items-center gap-2 text-base sm:text-lg justify-center sm:justify-start text-white">
        <Timer className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="font-mono font-bold">{timeLeft}s</span>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-8">
        <div className="text-center">
          <div className="text-xs sm:text-sm text-white/70">WPM</div>
          <div className="text-lg sm:text-2xl font-bold text-white">{wpm}</div>
        </div>
        <div className="text-center">
          <div className="text-xs sm:text-sm text-white/70">Doğruluk</div>
          <div className="text-lg sm:text-2xl font-bold text-white">{accuracy}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs sm:text-sm text-white/70">Seri</div>
          <div className="text-lg sm:text-2xl font-bold text-white">{streak}</div>
        </div>
      </div>
    </div>
  );
}