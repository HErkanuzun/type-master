import { useState, useCallback, useEffect } from 'react';
import { words } from '../data/words';
import { Achievement, allAchievements } from '../data/achievements';

interface UseTypingGameProps {
  initialTime?: number;
  minWordsBuffer?: number;
}

export function useTypingGame({ 
  initialTime = 60,
  minWordsBuffer = 20
}: UseTypingGameProps = {}) {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [typedText, setTypedText] = useState('');
  const [mistakes, setMistakes] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [correctCharacters, setCorrectCharacters] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);

  const generateWords = useCallback((count: number = 50) => {
    const wordList = words[language];
    const shuffled = [...wordList].sort(() => Math.random() - 0.5);
    // If we need more words than available, repeat the list
    const repeatedWords: string[] = [];
    while (repeatedWords.length < count) {
      repeatedWords.push(...shuffled);
    }
    return repeatedWords.slice(0, count);
  }, [language]);

  const ensureEnoughWords = useCallback(() => {
    if (currentWords.length < minWordsBuffer) {
      setCurrentWords(prev => [...prev, ...generateWords(50)]);
    }
  }, [currentWords.length, generateWords, minWordsBuffer]);

  const resetTest = useCallback(() => {
    setCurrentWords(generateWords());
    setTypedText('');
    setMistakes({});
    setTimeLeft(initialTime);
    setIsActive(false);
    setWpm(0);
    setAccuracy(100);
    setStreak(0);
    setTotalCharacters(0);
    setCorrectCharacters(0);
  }, [generateWords, initialTime]);

  const checkAchievements = useCallback(() => {
    const currentAchievements = allAchievements(wpm, accuracy, streak, mistakes, testCount);
    const newUnlocks = currentAchievements.filter(achievement => 
      achievement.condition && 
      !unlockedAchievements.some(a => a.id === achievement.id)
    );

    if (newUnlocks.length > 0) {
      setUnlockedAchievements(prev => [
        ...prev,
        ...newUnlocks.map(achievement => ({
          ...achievement,
          unlockedAt: new Date()
        }))
      ]);
    }
  }, [wpm, accuracy, streak, mistakes, testCount, unlockedAchievements]);

  const calculateAccuracy = useCallback(() => {
    if (totalCharacters === 0) return 100;
    return Math.round((correctCharacters / totalCharacters) * 100);
  }, [totalCharacters, correctCharacters]);

  const handleTyping = useCallback((e: React.KeyboardEvent) => {
    if (!isActive && timeLeft === initialTime) {
      setIsActive(true);
    }

    if (e.key === ' ') {
      e.preventDefault();
      const wordToCheck = typedText.trim();
      const correctWord = currentWords[0];

      if (!correctWord) return; // Prevent typing if no words available

      setTotalCharacters(prev => prev + correctWord.length);
      let correctCount = 0;
      for (let i = 0; i < correctWord.length; i++) {
        if (wordToCheck[i] === correctWord[i]) {
          correctCount++;
        }
      }
      setCorrectCharacters(prev => prev + correctCount);

      if (wordToCheck === correctWord) {
        setStreak(s => s + 1);
      } else {
        setStreak(0);
        const newMistakes = { ...mistakes };
        for (let i = 0; i < correctWord.length; i++) {
          if (wordToCheck[i] !== correctWord[i]) {
            const char = correctWord[i];
            newMistakes[char] = (newMistakes[char] || 0) + 1;
          }
        }
        setMistakes(newMistakes);
      }

      const wordsTyped = typedText.trim().split(' ').length;
      const newWpm = Math.round((wordsTyped / (initialTime - timeLeft)) * 60);
      setWpm(newWpm);
      setAccuracy(calculateAccuracy());
      setTypedText('');
      setCurrentWords(words => words.slice(1));
      ensureEnoughWords(); // Check if we need more words
    }
  }, [isActive, timeLeft, typedText, currentWords, mistakes, initialTime, calculateAccuracy, ensureEnoughWords]);

  useEffect(() => {
    resetTest();
  }, [language, resetTest]);

  useEffect(() => {
    if (isActive) {
      checkAchievements();
    }
  }, [isActive, checkAchievements]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            setTestCount(prev => prev + 1);
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // Ensure we always have enough words
  useEffect(() => {
    ensureEnoughWords();
  }, [ensureEnoughWords]);

  return {
    language,
    setLanguage,
    currentWords,
    typedText,
    setTypedText,
    mistakes,
    timeLeft,
    isActive,
    wpm,
    accuracy,
    streak,
    testCount,
    unlockedAchievements,
    handleTyping,
    resetTest
  };
}