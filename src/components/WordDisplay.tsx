import React from 'react';

interface WordDisplayProps {
  currentWord: string;
  typedText: string;
  nextWords: string[];
}

export default function WordDisplay({ currentWord, typedText, nextWords }: WordDisplayProps) {
  return (
    <div className="relative h-16 sm:h-20 flex items-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full overflow-hidden">
          <div className="whitespace-nowrap font-mono text-base sm:text-lg tracking-wide">
            <span className="inline-flex">
              {currentWord.split('').map((char, index) => {
                const typedChar = typedText[index];
                let className = 'text-white/50'; // Default state

                if (typedChar !== undefined) {
                  className = typedChar === char ? 'text-blue-400' : 'text-red-400';
                }

                return (
                  <span key={index} className={className}>
                    {char}
                  </span>
                );
              })}
            </span>
            <span className="ml-4 text-white/30 inline-block">
              {nextWords.slice(0, 15).join(' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}