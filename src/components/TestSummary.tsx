import React from 'react';
import { Trophy, Target, AlertTriangle, Timer, Keyboard, Check, X, Activity, Award } from 'lucide-react';
import { Achievement } from '../types/achievements';

interface TestSummaryProps {
  wpm: number;
  accuracy: number;
  mistakes: { [key: string]: number };
  streak: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
  wordsTyped: number;
  correctWords: number;
  incorrectWords: number;
  unlockedAchievements: Achievement[];
  onClose: () => void;
}

export default function TestSummary({ 
  wpm, 
  accuracy, 
  mistakes, 
  streak,
  totalKeystrokes,
  correctKeystrokes,
  incorrectKeystrokes,
  wordsTyped,
  correctWords,
  incorrectWords,
  unlockedAchievements,
  onClose 
}: TestSummaryProps) {
  const totalMistakes = Object.values(mistakes).reduce((sum, count) => sum + count, 0);
  const mostProblematicKeys = Object.entries(mistakes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const kps = Math.round((totalKeystrokes / 60) * 10) / 10;
  const wps = Math.round((wordsTyped / 60) * 10) / 10;

  const recentUnlocks = unlockedAchievements.filter(a => 
    a.unlockedAt && new Date().getTime() - a.unlockedAt.getTime() < 5000
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Test Sonuçları</h2>
        
        {recentUnlocks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Yeni Başarılar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentUnlocks.map((achievement) => (
                <div key={achievement.id} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`
                      p-2 rounded-lg
                      ${achievement.rarity === 'legendary' ? 'bg-yellow-400/20' :
                        achievement.rarity === 'epic' ? 'bg-purple-400/20' :
                        achievement.rarity === 'rare' ? 'bg-blue-400/20' :
                        'bg-gray-400/20'}
                    `}>
                      {achievement.icon()}
                    </div>
                    <div>
                      <div className="font-semibold">{achievement.title}</div>
                      <div className="text-sm text-white/70">{achievement.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-4">
            <Activity className="w-6 h-6 text-purple-400 mb-2" />
            <div className="text-2xl font-bold">{wpm}</div>
            <div className="text-sm text-white/70">WPM</div>
            <div className="text-xs text-white/50 mt-1">{wps} kelime/saniye</div>
          </div>
          
          <div className="glass rounded-xl p-4">
            <Target className="w-6 h-6 text-emerald-400 mb-2" />
            <div className="text-2xl font-bold">{accuracy}%</div>
            <div className="text-sm text-white/70">Doğruluk</div>
            <div className="text-xs text-white/50 mt-1">{correctWords}/{wordsTyped}</div>
          </div>
          
          <div className="glass rounded-xl p-4">
            <Keyboard className="w-6 h-6 text-blue-400 mb-2" />
            <div className="text-2xl font-bold">{kps}</div>
            <div className="text-sm text-white/70">Tuş/Saniye</div>
            <div className="text-xs text-white/50 mt-1">Toplam: {totalKeystrokes}</div>
          </div>

          <div className="glass rounded-xl p-4">
            <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-sm text-white/70">En Uzun Seri</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              Doğruluk İstatistikleri
            </h3>
            <div className="space-y-3">
              <div className="glass rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Doğru Tuşlar</span>
                  <span className="font-mono">{correctKeystrokes}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-400 h-full rounded-full"
                    style={{ width: `${(correctKeystrokes / totalKeystrokes) * 100}%` }}
                  />
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Doğru Kelimeler</span>
                  <span className="font-mono">{correctWords}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-400 h-full rounded-full"
                    style={{ width: `${(correctWords / wordsTyped) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <X className="w-5 h-5 text-red-400" />
              Hata İstatistikleri
            </h3>
            <div className="space-y-3">
              <div className="glass rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Yanlış Tuşlar</span>
                  <span className="font-mono">{incorrectKeystrokes}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className="bg-red-400 h-full rounded-full"
                    style={{ width: `${(incorrectKeystrokes / totalKeystrokes) * 100}%` }}
                  />
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Yanlış Kelimeler</span>
                  <span className="font-mono">{incorrectWords}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className="bg-red-400 h-full rounded-full"
                    style={{ width: `${(incorrectWords / wordsTyped) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {mostProblematicKeys.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              En Çok Hata Yapılan Tuşlar
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {mostProblematicKeys.map(([key, count]) => (
                <div key={key} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-mono font-bold mb-1">{key}</div>
                  <div className="text-sm text-white/70">{count} hata</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 glass hover:bg-white/20 rounded-xl transition-colors"
        >
          Yeni Test Başlat
        </button>
      </div>
    </div>
  );
}