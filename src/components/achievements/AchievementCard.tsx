import React from 'react';
import { Lock } from 'lucide-react';
import { Achievement } from '../../types/achievements';

interface AchievementCardProps {
  achievement: Achievement;
}

const rarityColors = {
  common: 'from-gray-400 to-gray-300',
  rare: 'from-blue-400 to-blue-300',
  epic: 'from-purple-400 to-purple-300',
  legendary: 'from-yellow-400 to-yellow-300'
};

const rarityLabels = {
  common: 'Normal',
  rare: 'Nadir',
  epic: 'Epik',
  legendary: 'Efsanevi'
};

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const isLocked = !achievement.unlockedAt;

  return (
    <div className={`
      relative overflow-hidden rounded-xl glass
      ${isLocked ? 'grayscale' : ''}
      transition-all duration-300 group hover:transform hover:scale-[1.02]
    `}>
      <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${rarityColors[achievement.rarity]}`} />
      
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          <div className={`
            p-2 rounded-lg glass
            ${isLocked ? 'bg-white/5' : `bg-gradient-to-br ${rarityColors[achievement.rarity]}`}
          `}>
            {isLocked ? <Lock className="w-6 h-6" /> : achievement.icon()}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-white group-hover:text-white/90 transition-colors">
              {achievement.title}
            </h3>
            <p className="text-sm text-white/70 mb-2">
              {achievement.description}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className={`
                px-2 py-0.5 rounded-full glass
                ${isLocked ? 'text-white/50' : `text-${achievement.rarity}-300`}
              `}>
                {rarityLabels[achievement.rarity]}
              </span>
              {achievement.unlockedAt && (
                <span className="text-white/50">
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}