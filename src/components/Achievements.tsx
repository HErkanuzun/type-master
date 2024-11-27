import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AchievementCard from './achievements/AchievementCard';
import AchievementDrawer from './achievements/AchievementDrawer';
import { Achievement } from '../types/achievements';

interface AchievementsProps {
  wpm: number;
  accuracy: number;
  streak: number;
  showDrawer: boolean;
  onCloseDrawer: () => void;
  unlockedAchievements: Achievement[];
}

export default function Achievements({ 
  wpm, 
  accuracy, 
  streak, 
  showDrawer, 
  onCloseDrawer,
  unlockedAchievements 
}: AchievementsProps) {
  const recentUnlocks = unlockedAchievements.filter(a => 
    a.unlockedAt && new Date().getTime() - a.unlockedAt.getTime() < 5000
  );

  return (
    <>
      <AnimatePresence>
        {showDrawer && (
          <AchievementDrawer
            unlockedAchievements={unlockedAchievements}
            onClose={onCloseDrawer}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {recentUnlocks.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}