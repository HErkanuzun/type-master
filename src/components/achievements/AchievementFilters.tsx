import React from 'react';
import { Trophy, Lock, Unlock, Filter } from 'lucide-react';

interface AchievementFiltersProps {
  activeFilter: 'all' | 'unlocked' | 'locked';
  activeRarity?: 'common' | 'rare' | 'epic' | 'legendary';
  onFilterChange: (filter: 'all' | 'unlocked' | 'locked') => void;
  onRarityChange: (rarity?: 'common' | 'rare' | 'epic' | 'legendary') => void;
}

export default function AchievementFilters({ 
  activeFilter, 
  activeRarity, 
  onFilterChange, 
  onRarityChange 
}: AchievementFiltersProps) {
  const rarityOptions = [
    { value: undefined, label: 'Tümü' },
    { value: 'common', label: 'Normal' },
    { value: 'rare', label: 'Nadir' },
    { value: 'epic', label: 'Epik' },
    { value: 'legendary', label: 'Efsanevi' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl glass transition-colors ${
            activeFilter === 'all' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Tümü</span>
        </button>
        <button
          onClick={() => onFilterChange('unlocked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl glass transition-colors ${
            activeFilter === 'unlocked' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <Unlock className="w-4 h-4" />
          <span>Açılan</span>
        </button>
        <button
          onClick={() => onFilterChange('locked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl glass transition-colors ${
            activeFilter === 'locked' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Kilitli</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-white/70" />
        <select
          value={activeRarity || ''}
          onChange={(e) => onRarityChange(e.target.value as any || undefined)}
          className="bg-transparent glass px-3 py-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          {rarityOptions.map((option) => (
            <option 
              key={option.value || 'all'} 
              value={option.value || ''}
              className="bg-gray-900"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}