import React, { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const starsRef = useRef<HTMLDivElement>(null);
  const shootingStarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create static stars
    if (starsRef.current) {
      const stars = starsRef.current;
      stars.innerHTML = '';
      
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        stars.appendChild(star);
      }
    }

    // Create shooting stars
    if (shootingStarsRef.current) {
      const shootingStars = shootingStarsRef.current;
      shootingStars.innerHTML = '';
      
      for (let i = 0; i < 10; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.right = '0';
        shootingStar.style.animationDelay = `${Math.random() * 10}s`;
        shootingStars.appendChild(shootingStar);
      }
    }
  }, []);

  return (
    <>
      <div className="space-background" />
      <div ref={starsRef} className="stars" />
      <div ref={shootingStarsRef} className="stars" />
    </>
  );
}