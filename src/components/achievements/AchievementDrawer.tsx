import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '../../types/achievements';
import AchievementStats from './AchievementStats';
import AchievementGrid from './AchievementGrid';
import AchievementFilters from './AchievementFilters';
import { allAchievements } from '../../data/achievements';

interface AchievementDrawerProps {
  unlockedAchievements: Achievement[];
  onClose: () => void;
}

export default function AchievementDrawer({ unlockedAchievements, onClose }: AchievementDrawerProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [rarity, setRarity] = useState<'common' | 'rare' | 'epic' | 'legendary' | undefined>();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Get all possible achievements
  const allPossibleAchievements = allAchievements(0, 0, 0, {}, 0);
  
  // Mark unlocked achievements
  const achievements = allPossibleAchievements.map(achievement => ({
    ...achievement,
    unlockedAt: unlockedAchievements.find(a => a.id === achievement.id)?.unlockedAt
  }));

  const totalAchievements = achievements.length;
  const progress = (unlockedAchievements.length / totalAchievements) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        ref={drawerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Başarılar</h2>
          <AchievementStats
            total={totalAchievements}
            unlocked={unlockedAchievements.length}
            progress={progress}
          />
        </div>

        <AchievementFilters
          activeFilter={filter}
          activeRarity={rarity}
          onFilterChange={setFilter}
          onRarityChange={setRarity}
        />
        
        <div className="overflow-y-auto custom-scrollbar pr-2">
          <AchievementGrid
            achievements={achievements}
            filter={filter}
            rarity={rarity}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}