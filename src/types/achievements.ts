import { IconType } from '../utils/achievementIcons';

export interface Achievement {
  id: string;
  icon: () => JSX.Element;
  title: string;
  description: string;
  condition: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface AchievementCategory {
  id: string;
  title: string;
  achievements: Achievement[];
}