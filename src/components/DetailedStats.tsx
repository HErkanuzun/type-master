import React from 'react';
import { Activity, Timer, Keyboard, Check, X, Zap, Target } from 'lucide-react';

interface DetailedStatsProps {
  timeLeft: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
  wpm: number;
  accuracy: number;
  wordsTyped: number;
  correctWords: number;
  incorrectWords: number;
}

export default function DetailedStats({
  timeLeft,
  totalKeystrokes,
  correctKeystrokes,
  incorrectKeystrokes,
  wpm,
  accuracy,
  wordsTyped,
  correctWords,
  incorrectWords
}: DetailedStatsProps) {
  const elapsedTime = 60 - timeLeft;
  const kps = elapsedTime > 0 ? Math.round((totalKeystrokes / elapsedTime) * 10) / 10 : 0;
  const wps = elapsedTime > 0 ? Math.round((wordsTyped / elapsedTime) * 10) / 10 : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Timer className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-white/70">Süre</span>
        </div>
        <div className="text-xl font-mono font-bold text-white">
          {timeLeft}s
        </div>
        <div className="text-xs text-white/50 mt-1">
          Geçen: {elapsedTime}s
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Keyboard className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-white/70">Tuş/Saniye</span>
        </div>
        <div className="text-xl font-mono font-bold text-white">
          {kps}
        </div>
        <div className="text-xs text-white/50 mt-1">
          Toplam: {totalKeystrokes}
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-sm text-white/70">Doğru Tuş</span>
        </div>
        <div className="text-xl font-mono font-bold text-white">
          {correctKeystrokes}
        </div>
        <div className="text-xs text-white/50 mt-1">
          {Math.round((correctKeystrokes / totalKeystrokes) * 100 || 0)}%
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <X className="w-4 h-4 text-red-400" />
          <span className="text-sm text-white/70">Yanlış Tuş</span>
        </div>
        <div className="text-xl font-mono font-bold text-white">
          {incorrectKeystrokes}
        </div>
        <div className="text-xs text-white/50 mt-1">
          {Math.round((incorrectKeystrokes / totalKeystrokes) * 100 || 0)}%
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-white/70">Kelime/Dakika</span>
        </div>
        <div className="text-xl font-mono font-bold text-white">
          {wpm}
        </div>
        <div className="text-xs text-white/50 mt-1">
          {wps} kelime/saniye
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-white/70">Doğruluk</span>
        </div>
        <div className="text-xl font-mono font-bold text-white">
          {accuracy}%
        </div>
        <div className="text-xs text-white/50 mt-1">
          {correctWords}/{wordsTyped} kelime
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-sm text-white/70">Doğru Kelime</span>
        </div>
        <div className="text-xl font-mono font-bold text-white">
          {correctWords}
        </div>
        <div className="text-xs text-white/50 mt-1">
          {Math.round((correctWords / wordsTyped) * 100 || 0)}%
        </div>
      </div>

      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <X className="w-4 h-4 text-red-400" />
          <span className="text-sm text-white/70">Yanlış Kelime</span>
        </div>
        <div className="text-xl font-mono font-bold text-white">
          {incorrectWords}
        </div>
        <div className="text-xs text-white/50 mt-1">
          {Math.round((incorrectWords / wordsTyped) * 100 || 0)}%
        </div>
      </div>
    </div>
  );
}