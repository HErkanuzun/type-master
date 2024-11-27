import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy } from 'lucide-react';
import Header from './Header';
import Stats from './Stats';
import MistakeAnalysis from './MistakeAnalysis';
import Keyboard from './Keyboard';
import TestSummary from './TestSummary';
import Achievements from './Achievements';
import AdBanner from './AdBanner';
import SpaceBackground from './SpaceBackground';
import Footer from './Footer';
import WordDisplay from './WordDisplay';
import { useTypingGame } from '../hooks/useTypingGame';

export default function TypingTest() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showAchievementsDrawer, setShowAchievementsDrawer] = useState(false);

  const {
    language,
    setLanguage,
    currentWords,
    typedText,
    setTypedText,
    mistakes,
    timeLeft,
    wpm,
    accuracy,
    streak,
    unlockedAchievements,
    handleTyping,
    resetTest
  } = useTypingGame();

  const handleTestEnd = () => {
    setShowSummary(true);
    if (wpm >= 60 && accuracy >= 95) {
      setShowConfetti(true);
    }
  };

  const handleReset = () => {
    resetTest();
    setShowConfetti(false);
    setShowSummary(false);
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-12 px-3 sm:px-4 lg:px-6 relative">
      <SpaceBackground />
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-4 sm:gap-6">
        <div className="hidden xl:block w-72 shrink-0">
          <div className="glass-card rounded-2xl p-4 sticky top-6">
            <AdBanner position="sidebar" />
          </div>
        </div>

        <div className="flex-1">
          <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <Header 
                language={language}
                onLanguageChange={() => setLanguage(lang => lang === 'tr' ? 'en' : 'tr')}
                onReset={handleReset}
              />
              <button
                onClick={() => setShowAchievementsDrawer(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/20 transition-colors text-white w-full sm:w-auto justify-center"
              >
                <Trophy className="w-5 h-5" />
                <span className="inline">Başarılar</span>
                {unlockedAchievements.length > 0 && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                    {unlockedAchievements.length}
                  </span>
                )}
              </button>
            </div>

            <div className="xl:hidden glass rounded-xl p-4 mb-6">
              <AdBanner position="top" />
            </div>

            <Stats 
              timeLeft={timeLeft}
              wpm={wpm}
              accuracy={accuracy}
              streak={streak}
            />

            <div className="mb-8">
              <div className="glass rounded-xl p-4 sm:p-6">
                <WordDisplay
                  currentWord={currentWords[0] || ''}
                  typedText={typedText}
                  nextWords={currentWords.slice(1, 10)}
                />
                <input
                  type="text"
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  onKeyDown={handleTyping}
                  className="w-full bg-transparent glass-input rounded-lg p-3 text-base sm:text-lg font-mono focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder={timeLeft === 60 ? 'Yazmaya başla...' : ''}
                  disabled={timeLeft === 0}
                />
              </div>

              <MistakeAnalysis mistakes={mistakes} />
            </div>

            <Keyboard mistakes={mistakes} />
          </div>

          <div className="mt-6 sm:mt-8">
            <Footer />
          </div>
        </div>
        
        <div className="hidden xl:block w-72 shrink-0">
          <div className="glass-card rounded-2xl p-4 sticky top-6">
            <AdBanner position="sidebar" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAchievementsDrawer && (
          <Achievements
            wpm={wpm}
            accuracy={accuracy}
            streak={streak}
            showDrawer={showAchievementsDrawer}
            onCloseDrawer={() => setShowAchievementsDrawer(false)}
            unlockedAchievements={unlockedAchievements}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {timeLeft === 0 && showSummary && (
          <TestSummary
            wpm={wpm}
            accuracy={accuracy}
            mistakes={mistakes}
            streak={streak}
            onClose={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}