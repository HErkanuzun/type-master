import React from 'react';

interface KeyboardProps {
  mistakes: { [key: string]: number };
}

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'ı', 'o', 'p', 'ğ', 'ü'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş', 'i'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ç'],
];

export default function Keyboard({ mistakes }: KeyboardProps) {
  const getKeyColor = (key: string) => {
    if (!mistakes[key]) return 'bg-white/5 text-white/90';
    if (mistakes[key] >= 5) return 'bg-red-500/50 text-white';
    if (mistakes[key] >= 3) return 'bg-red-400/50 text-white';
    return 'bg-red-300/50 text-white';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
          {row.map((key) => (
            <div
              key={key}
              className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg font-mono text-[10px] sm:text-xs md:text-sm transition-colors ${getKeyColor(key)} backdrop-blur-sm relative`}
            >
              {key}
              {mistakes[key] && (
                <span className="absolute text-[6px] sm:text-[8px] md:text-[10px] top-0 right-0 font-sans text-white/90">
                  {mistakes[key]}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}