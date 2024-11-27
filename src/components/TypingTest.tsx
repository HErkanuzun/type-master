import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy } from 'lucide-react';
import Header from './Header';
import DetailedStats from './DetailedStats';
import MistakeAnalysis from './MistakeAnalysis';
import Keyboard from './Keyboard';
import TestSummary from './TestSummary';
import Achievements from './Achievements';
import AdBanner from './AdBanner';
import SpaceBackground from './SpaceBackground';
import Footer from './Footer';
import WordDisplay from './WordDisplay';
import UserProfile from './UserProfile';
import { useTypingGame } from '../hooks/useTypingGame';
import { identifyUser, updateUserStats } from '../utils/userIdentification';

export default function TypingTest() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showAchievementsDrawer, setShowAchievementsDrawer] = useState(false);
  const [userData, setUserData] = useState(identifyUser());

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
    totalKeystrokes,
    correctKeystrokes,
    incorrectKeystrokes,
    wordsTyped,
    correctWords,
    incorrectWords,
    handleTyping,
    resetTest
  } = useTypingGame({ minWordsBuffer: 30 });

  const handleTestEnd = () => {
    setShowSummary(true);
    if (wpm >= 60 && accuracy >= 95) {
      setShowConfetti(true);
    }
    setUserData(updateUserStats(wpm, accuracy, streak));
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleTestEnd();
    }
  }, [timeLeft]);

  const handleReset = () => {
    resetTest();
    setShowConfetti(false);
    setShowSummary(false);
  };

  return (
    <div className="min-h-screen py-2 sm:py-3 lg:py-6 px-2 sm:px-3 lg:px-4 relative">
      <SpaceBackground />
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-2 sm:gap-3">
        <div className="hidden xl:block w-64 shrink-0">
          <div className="glass-card rounded-xl p-3 sticky top-2">
            <AdBanner position="sidebar" />
          </div>
        </div>

        <div className="flex-1">
          <div className="glass-card rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-4">
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

            <div className="mb-4">
              <UserProfile
                username={userData.username}
                stats={userData.stats}
              />
            </div>

            <div className="xl:hidden glass rounded-xl p-3 mb-4">
              <AdBanner position="top" />
            </div>

            <div className="mb-6">
              <div className="glass rounded-xl p-3 sm:p-4">
                <WordDisplay
                  currentWord={currentWords[0] || ''}
                  typedText={typedText}
                  nextWords={currentWords.slice(1)}
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
            </div>

            <div className="mb-6">
              <DetailedStats
                timeLeft={timeLeft}
                totalKeystrokes={totalKeystrokes}
                correctKeystrokes={correctKeystrokes}
                incorrectKeystrokes={incorrectKeystrokes}
                wpm={wpm}
                accuracy={accuracy}
                wordsTyped={wordsTyped}
                correctWords={correctWords}
                incorrectWords={incorrectWords}
              />
            </div>

            <MistakeAnalysis mistakes={mistakes} />
            <Keyboard mistakes={mistakes} />
          </div>

          <div className="mt-4 sm:mt-6">
            <Footer />
          </div>
        </div>
        
        <div className="hidden xl:block w-64 shrink-0">
          <div className="glass-card rounded-xl p-3 sticky top-2">
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
            totalKeystrokes={totalKeystrokes}
            correctKeystrokes={correctKeystrokes}
            incorrectKeystrokes={incorrectKeystrokes}
            wordsTyped={wordsTyped}
            correctWords={correctWords}
            incorrectWords={incorrectWords}
            unlockedAchievements={unlockedAchievements}
            onClose={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}