import React from 'react';

interface AdBannerProps {
  position: 'top' | 'sidebar';
}

export default function AdBanner({ position }: AdBannerProps) {
  return (
    <div className={`
      glass rounded-lg p-4
      flex items-center justify-center
      ${position === 'top' ? 'h-24' : 'sticky top-6 h-[calc(100vh-3rem)] w-full'}
    `}>
      <div className="text-center text-white/70">
        <p className="font-semibold">Reklam Alanı</p>
        <p className="text-sm">{position === 'top' ? '728x90' : '300x600'}</p>
      </div>
    </div>
  );
}