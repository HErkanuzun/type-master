import React from 'react';

interface WordDisplayProps {
  currentWord: string;
  typedText: string;
  nextWords: string[];
}

export default function WordDisplay({ currentWord, typedText, nextWords }: WordDisplayProps) {
  return (
    <div className="font-mono text-base sm:text-lg mb-4 min-h-[8rem] flex flex-col">
      {/* Current word container with fixed height */}
      <div className="h-8 sm:h-10 flex items-center">
        <span className="mr-2">
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
      </div>

      {/* Next words container with fixed height and proper overflow handling */}
      <div className="flex-1 overflow-hidden">
        <div className="text-white/30 whitespace-pre-wrap break-words leading-relaxed">
          {nextWords.join(' ')}
        </div>
      </div>
    </div>
  );
}