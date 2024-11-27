import React from 'react';
import { Award, Zap, Target, Crown, Flame, Star, Trophy, Timer, Heart, Shield, Book, Coffee, Rocket, Medal, Brain } from 'lucide-react';

export type IconType = typeof Zap;

export const renderIcon = (Icon: IconType) => {
  return <Icon className="w-6 h-6" />;
};

export const icons = {
  zap: () => renderIcon(Zap),
  fastZap: () => renderIcon(Zap), // Replacing Lightning with Zap
  rocket: () => renderIcon(Rocket),
  trophy: () => renderIcon(Trophy),
  target: () => renderIcon(Target),
  shield: () => renderIcon(Shield),
  award: () => renderIcon(Award),
  flame: () => renderIcon(Flame),
  crown: () => renderIcon(Crown),
  medal: () => renderIcon(Medal),
  star: () => renderIcon(Star),
  brain: () => renderIcon(Brain),
  book: () => renderIcon(Book),
  coffee: () => renderIcon(Coffee),
  timer: () => renderIcon(Timer),
  heart: () => renderIcon(Heart),
};