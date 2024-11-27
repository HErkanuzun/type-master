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
  const [incorrectCharacters, setIncorrectCharacters] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [incorrectKeystrokes, setIncorrectKeystrokes] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [testEnded, setTestEnded] = useState(false);

  const generateWords = useCallback((count: number = 50) => {
    const wordList = words[language];
    const shuffled = [...wordList].sort(() => Math.random() - 0.5);
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

  const calculateAccuracy = useCallback(() => {
    if (totalCharacters === 0) return 100;
    return Math.round((correctCharacters / totalCharacters) * 100);
  }, [totalCharacters, correctCharacters]);

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

  const endTest = useCallback(() => {
    setIsActive(false);
    setTestCount(prev => prev + 1);
    setTestEnded(true);
    checkAchievements();
  }, [checkAchievements]);

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
    setIncorrectCharacters(0);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setIncorrectKeystrokes(0);
    setWordsTyped(0);
    setCorrectWords(0);
    setIncorrectWords(0);
    setTestEnded(false);
  }, [generateWords, initialTime]);

  const handleTyping = useCallback((e: React.KeyboardEvent) => {
    if (timeLeft === 0 || testEnded) return;

    if (!isActive && timeLeft === initialTime) {
      setIsActive(true);
    }

    // Update keystroke counts
    setTotalKeystrokes(prev => prev + 1);
    const currentWord = currentWords[0];
    const currentIndex = typedText.length;
    
    if (currentWord && currentIndex < currentWord.length) {
      if (e.key === currentWord[currentIndex]) {
        setCorrectKeystrokes(prev => prev + 1);
      } else {
        setIncorrectKeystrokes(prev => prev + 1);
      }
    }

    if (e.key === ' ') {
      e.preventDefault();
      const wordToCheck = typedText.trim();
      const correctWord = currentWords[0];

      if (!correctWord) return;

      setWordsTyped(prev => prev + 1);
      setTotalCharacters(prev => prev + correctWord.length);
      
      let correctCount = 0;
      for (let i = 0; i < correctWord.length; i++) {
        if (wordToCheck[i] === correctWord[i]) {
          correctCount++;
        }
      }
      
      setCorrectCharacters(prev => prev + correctCount);
      setIncorrectCharacters(prev => prev + (correctWord.length - correctCount));

      if (wordToCheck === correctWord) {
        setStreak(s => s + 1);
        setCorrectWords(prev => prev + 1);
      } else {
        setStreak(0);
        setIncorrectWords(prev => prev + 1);
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
      ensureEnoughWords();
    }
  }, [isActive, timeLeft, typedText, currentWords, mistakes, initialTime, calculateAccuracy, ensureEnoughWords, testEnded]);

  useEffect(() => {
    resetTest();
  }, [language, resetTest]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            endTest();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, endTest]);

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
    totalKeystrokes,
    correctKeystrokes,
    incorrectKeystrokes,
    wordsTyped,
    correctWords,
    incorrectWords,
    handleTyping,
    resetTest
  };
}