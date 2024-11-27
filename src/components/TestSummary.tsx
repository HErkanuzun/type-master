import React from 'react';
import { Trophy, Target, AlertTriangle } from 'lucide-react';

interface TestSummaryProps {
  wpm: number;
  accuracy: number;
  mistakes: { [key: string]: number };
  streak: number;
  onClose: () => void;
}

export default function TestSummary({ wpm, accuracy, mistakes, streak, onClose }: TestSummaryProps) {
  const totalMistakes = Object.values(mistakes).reduce((sum, count) => sum + count, 0);
  const mostProblematicKeys = Object.entries(mistakes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-card rounded-2xl p-8 max-w-lg w-full text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Test Sonuçları</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 glass rounded-xl">
            <Trophy className="w-6 h-6 text-yellow-300 mx-auto mb-2" />
            <div className="text-2xl font-bold">{wpm}</div>
            <div className="text-sm text-white/70">WPM</div>
          </div>
          
          <div className="text-center p-4 glass rounded-xl">
            <Target className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
            <div className="text-2xl font-bold">{accuracy}%</div>
            <div className="text-sm text-white/70">Doğruluk</div>
          </div>
          
          <div className="text-center p-4 glass rounded-xl">
            <AlertTriangle className="w-6 h-6 text-red-300 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalMistakes}</div>
            <div className="text-sm text-white/70">Toplam Hata</div>
          </div>
        </div>

        {mostProblematicKeys.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">En Çok Hata Yapılan Tuşlar</h3>
            <div className="flex gap-3">
              {mostProblematicKeys.map(([key, count]) => (
                <div key={key} className="flex-1 text-center p-3 glass rounded-xl">
                  <div className="text-2xl font-mono font-bold">{key}</div>
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