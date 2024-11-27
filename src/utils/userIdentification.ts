import { v4 as uuidv4 } from 'uuid';

const chessPlayers = [
  'Magnus', 'Kasparov', 'Capablanca', 'Fischer', 'Carlsen', 'Tal', 'Alekhine',
  'Botvinnik', 'Karpov', 'Anand', 'Morphy', 'Lasker', 'Kramnik', 'Spassky'
];

const funNicknames = [
  'SpeedTyper', 'KeyboardNinja', 'WordMaster', 'TypeLord', 'SwiftKeys',
  'TypeWhisperer', 'KeyboardWizard', 'WordSmith', 'TypeMaster', 'KeyboardKing'
];

const generateUsername = (): string => {
  const lists = [chessPlayers, funNicknames];
  const selectedList = lists[Math.floor(Math.random() * lists.length)];
  const randomName = selectedList[Math.floor(Math.random() * selectedList.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${randomName}${randomNumber}`;
};

interface UserData {
  id: string;
  username: string;
  createdAt: string;
  lastSeen: string;
  stats: {
    highestWpm: number;
    bestAccuracy: number;
    longestStreak: number;
    testsCompleted: number;
  };
}

export const identifyUser = (): UserData => {
  const storedUser = localStorage.getItem('typemaster_user');
  
  if (storedUser) {
    const userData: UserData = JSON.parse(storedUser);
    userData.lastSeen = new Date().toISOString();
    localStorage.setItem('typemaster_user', JSON.stringify(userData));
    return userData;
  }

  const newUser: UserData = {
    id: uuidv4(),
    username: generateUsername(),
    createdAt: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    stats: {
      highestWpm: 0,
      bestAccuracy: 0,
      longestStreak: 0,
      testsCompleted: 0
    }
  };

  localStorage.setItem('typemaster_user', JSON.stringify(newUser));
  return newUser;
};

export const updateUserStats = (
  wpm: number,
  accuracy: number,
  streak: number
): UserData => {
  const userData = identifyUser();
  
  userData.stats.highestWpm = Math.max(userData.stats.highestWpm, wpm);
  userData.stats.bestAccuracy = Math.max(userData.stats.bestAccuracy, accuracy);
  userData.stats.longestStreak = Math.max(userData.stats.longestStreak, streak);
  userData.stats.testsCompleted += 1;
  
  localStorage.setItem('typemaster_user', JSON.stringify(userData));
  return userData;
};