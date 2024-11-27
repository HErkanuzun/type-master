import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MistakeAnalysisProps {
  mistakes: { [key: string]: number };
}

export default function MistakeAnalysis({ mistakes }: MistakeAnalysisProps) {
  if (Object.keys(mistakes).length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3 sm:mb-4 text-white/90">
        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        <h2 className="text-sm sm:text-base font-semibold">Hata Analizi</h2>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {Object.entries(mistakes).map(([char, count]) => (
          <div key={char} className="px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-lg">
            <span className="font-mono text-base sm:text-lg text-white">{char}</span>
            <span className="ml-2 text-xs sm:text-sm text-white/70">{count}x</span>
          </div>
        ))}
      </div>
    </div>
  );
}