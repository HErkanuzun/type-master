import React from 'react';
import { Achievement } from '../../types/achievements';
import AchievementCard from './AchievementCard';

interface AchievementGridProps {
  achievements: Achievement[];
  filter: 'all' | 'unlocked' | 'locked';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function AchievementGrid({ achievements, filter, rarity }: AchievementGridProps) {
  const filteredAchievements = achievements
    .filter(achievement => {
      if (rarity && achievement.rarity !== rarity) return false;
      if (filter === 'unlocked') return achievement.unlockedAt;
      if (filter === 'locked') return !achievement.unlockedAt;
      return true;
    })
    .sort((a, b) => {
      // Sort by rarity and unlock status
      const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
      if (a.unlockedAt && !b.unlockedAt) return -1;
      if (!a.unlockedAt && b.unlockedAt) return 1;
      return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAchievements.map((achievement) => (
        <div key={achievement.id} className={`transition-opacity ${!achievement.unlockedAt ? 'opacity-50' : ''}`}>
          <AchievementCard achievement={achievement} />
        </div>
      ))}
    </div>
  );
}