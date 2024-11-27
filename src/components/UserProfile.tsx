import React from 'react';
import { User, Trophy, Target, Zap, History } from 'lucide-react';

interface UserProfileProps {
  username: string;
  stats: {
    highestWpm: number;
    bestAccuracy: number;
    longestStreak: number;
    testsCompleted: number;
  };
}

export default function UserProfile({ username, stats }: UserProfileProps) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center gap-2 mb-3">
        <User className="w-5 h-5 text-white/70" />
        <span className="text-white font-medium">{username}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="glass p-2 rounded-lg">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
            <Trophy className="w-4 h-4" />
            <span>En Yüksek WPM</span>
          </div>
          <div className="text-white font-mono font-bold">
            {stats.highestWpm}
          </div>
        </div>
        
        <div className="glass p-2 rounded-lg">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
            <Target className="w-4 h-4" />
            <span>En İyi Doğruluk</span>
          </div>
          <div className="text-white font-mono font-bold">
            {stats.bestAccuracy}%
          </div>
        </div>
        
        <div className="glass p-2 rounded-lg">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
            <Zap className="w-4 h-4" />
            <span>En Uzun Seri</span>
          </div>
          <div className="text-white font-mono font-bold">
            {stats.longestStreak}
          </div>
        </div>
        
        <div className="glass p-2 rounded-lg">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
            <History className="w-4 h-4" />
            <span>Toplam Test</span>
          </div>
          <div className="text-white font-mono font-bold">
            {stats.testsCompleted}
          </div>
        </div>
      </div>
    </div>
  );
}