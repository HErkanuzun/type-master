import { icons } from '../utils/achievementIcons';
import { Achievement } from '../types/achievements';

// Hız başarıları
const createSpeedAchievements = (wpm: number): Achievement[] => [
  {
    id: 'speed-20',
    icon: icons.zap,
    title: "Acemi Yazıcı",
    description: "20+ WPM hızına ulaştın!",
    condition: wpm >= 20,
    rarity: 'common'
  },
  {
    id: 'speed-40',
    icon: icons.zap,
    title: "Hızlı Parmaklar",
    description: "40+ WPM hızına ulaştın!",
    condition: wpm >= 40,
    rarity: 'common'
  },
  {
    id: 'speed-60',
    icon: icons.fastZap,
    title: "Klavye Virtüözü",
    description: "60+ WPM hızına ulaştın!",
    condition: wpm >= 60,
    rarity: 'rare'
  },
  {
    id: 'speed-80',
    icon: icons.rocket,
    title: "Hız Efsanesi",
    description: "80+ WPM hızına ulaştın!",
    condition: wpm >= 80,
    rarity: 'epic'
  },
  {
    id: 'speed-100',
    icon: icons.trophy,
    title: "Hız Şampiyonu",
    description: "100+ WPM hızına ulaştın!",
    condition: wpm >= 100,
    rarity: 'legendary'
  }
];

// Doğruluk başarıları
const createAccuracyAchievements = (accuracy: number): Achievement[] => [
  {
    id: 'accuracy-80',
    icon: icons.target,
    title: "Özenli Yazıcı",
    description: "80%+ doğruluk oranı!",
    condition: accuracy >= 80,
    rarity: 'common'
  },
  {
    id: 'accuracy-90',
    icon: icons.shield,
    title: "Keskin Nişancı",
    description: "90%+ doğruluk oranı!",
    condition: accuracy >= 90,
    rarity: 'rare'
  },
  {
    id: 'accuracy-95',
    icon: icons.shield,
    title: "Hassas Atış",
    description: "95%+ doğruluk oranı!",
    condition: accuracy >= 95,
    rarity: 'epic'
  },
  {
    id: 'accuracy-98',
    icon: icons.shield,
    title: "Kusursuzluğa Yakın",
    description: "98%+ doğruluk oranı!",
    condition: accuracy >= 98,
    rarity: 'legendary'
  },
  {
    id: 'accuracy-100',
    icon: icons.award,
    title: "Mükemmeliyetçi",
    description: "100% doğruluk!",
    condition: accuracy === 100,
    rarity: 'legendary'
  }
];

// Seri başarıları
const createStreakAchievements = (streak: number): Achievement[] => [
  {
    id: 'streak-10',
    icon: icons.flame,
    title: "Ateş Serisi",
    description: "10+ kelime hatasız!",
    condition: streak >= 10,
    rarity: 'rare'
  },
  {
    id: 'streak-20',
    icon: icons.crown,
    title: "Seri Uzmanı",
    description: "20+ kelime hatasız!",
    condition: streak >= 20,
    rarity: 'epic'
  },
  {
    id: 'streak-30',
    icon: icons.crown,
    title: "Seri İmparatoru",
    description: "30+ kelime hatasız!",
    condition: streak >= 30,
    rarity: 'legendary'
  }
];

// Harf başarıları (yeni)
const createLetterAchievements = (mistakes: { [key: string]: number }): Achievement[] => [
  {
    id: 'perfect-vowels',
    icon: icons.star,
    title: "Sesli Harf Ustası",
    description: "Tüm sesli harfleri hatasız yazdın!",
    condition: !['a', 'e', 'i', 'o', 'u'].some(vowel => mistakes[vowel]),
    rarity: 'rare'
  },
  {
    id: 'perfect-common',
    icon: icons.star,
    title: "Sık Harf Ustası",
    description: "En sık kullanılan 5 harfi hatasız yazdın!",
    condition: !['e', 'a', 'i', 'n', 'r'].some(letter => mistakes[letter]),
    rarity: 'epic'
  },
  {
    id: 'no-mistakes',
    icon: icons.award,
    title: "Hatasız Klavye",
    description: "Hiçbir harfte hata yapmadın!",
    condition: Object.keys(mistakes).length === 0,
    rarity: 'legendary'
  }
];

// Kombinasyon başarıları
const createCombinationAchievements = (wpm: number, accuracy: number, streak: number): Achievement[] => [
  {
    id: 'beginner-combo',
    icon: icons.medal,
    title: "Başlangıç Ustalığı",
    description: "30+ WPM ve 80%+ doğruluk!",
    condition: wpm >= 30 && accuracy >= 80,
    rarity: 'common'
  },
  {
    id: 'intermediate-combo',
    icon: icons.medal,
    title: "Orta Seviye Ustalık",
    description: "50+ WPM ve 90%+ doğruluk!",
    condition: wpm >= 50 && accuracy >= 90,
    rarity: 'rare'
  },
  {
    id: 'advanced-combo',
    icon: icons.star,
    title: "İleri Seviye Ustalık",
    description: "70+ WPM ve 95%+ doğruluk!",
    condition: wpm >= 70 && accuracy >= 95,
    rarity: 'epic'
  },
  {
    id: 'expert-combo',
    icon: icons.star,
    title: "Uzman Seviye",
    description: "90+ WPM ve 98%+ doğruluk!",
    condition: wpm >= 90 && accuracy >= 98,
    rarity: 'legendary'
  },
  {
    id: 'perfect-combo',
    icon: icons.trophy,
    title: "Mükemmel Performans",
    description: "100+ WPM ve 100% doğruluk!",
    condition: wpm >= 100 && accuracy === 100,
    rarity: 'legendary'
  }
];

// İlerleme başarıları
const createProgressAchievements = (testCount: number): Achievement[] => [
  {
    id: 'first-test',
    icon: icons.book,
    title: "İlk Adım",
    description: "İlk testini tamamladın!",
    condition: testCount >= 1,
    rarity: 'common'
  },
  {
    id: 'dedicated-10',
    icon: icons.coffee,
    title: "Düzenli Pratik",
    description: "10 test tamamladın!",
    condition: testCount >= 10,
    rarity: 'rare'
  },
  {
    id: 'dedicated-50',
    icon: icons.timer,
    title: "Azimli Yazıcı",
    description: "50 test tamamladın!",
    condition: testCount >= 50,
    rarity: 'epic'
  },
  {
    id: 'dedicated-100',
    icon: icons.heart,
    title: "Tutkulu Yazıcı",
    description: "100 test tamamladın!",
    condition: testCount >= 100,
    rarity: 'legendary'
  }
];

export const allAchievements = (
  wpm: number, 
  accuracy: number, 
  streak: number, 
  mistakes: { [key: string]: number } = {},
  testCount: number = 0
): Achievement[] => {
  const achievements = [
    ...createSpeedAchievements(wpm),
    ...createAccuracyAchievements(accuracy),
    ...createStreakAchievements(streak),
    ...createLetterAchievements(mistakes),
    ...createCombinationAchievements(wpm, accuracy, streak),
    ...createProgressAchievements(testCount)
  ];

  const rarityOrder = {
    legendary: 0,
    epic: 1,
    rare: 2,
    common: 3
  };

  return achievements.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
};