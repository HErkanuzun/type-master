import React from 'react';

interface AchievementStatsProps {
  total: number;
  unlocked: number;
  progress: number;
}

export default function AchievementStats({ total, unlocked, progress }: AchievementStatsProps) {
  return (
    <div className="text-right">
      <div className="text-sm text-white/70 mb-1">
        {unlocked} / {total} Başarı
      </div>
      <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}