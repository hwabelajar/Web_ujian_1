import { Exam, Question, ExamAttempt, UserStats } from '../types/index';

export const MOCK_EXAMS: Exam[] = [
  {
    id: '1',
    title: 'Analisis Matematika I',
    description: 'Ujian komprehensif Kalkulus Diferensial dan Integral.',
    duration: 90,
    totalQuestions: 40,
    category: 'Mathematics',
    difficulty: 'Hard',
    status: 'active',
  },
  {
    id: '2',
    title: 'Bahasa Inggris Dasar',
    description: 'Grammar, Vocabulary, and Reading Comprehension.',
    duration: 60,
    totalQuestions: 50,
    category: 'Language',
    difficulty: 'Easy',
    status: 'active',
  },
  {
    id: '3',
    title: 'Fisika Mekanika',
    description: 'Hukum Newton, Energi, dan Momentum.',
    duration: 120,
    totalQuestions: 30,
    category: 'Science',
    difficulty: 'Medium',
    status: 'upcoming',
    startTime: '2026-05-15T09:00:00Z',
  },
];

export const MOCK_ATTEMPTS: ExamAttempt[] = [
  {
    id: 'a1',
    examId: '4',
    userId: 'u1',
    score: 85,
    totalQuestions: 100,
    date: '2026-04-20T10:00:00Z',
    duration: 45,
  },
  {
    id: 'a2',
    examId: '5',
    userId: 'u1',
    score: 92,
    totalQuestions: 50,
    date: '2026-04-28T14:30:00Z',
    duration: 35,
  },
  {
    id: 'a3',
    examId: '6',
    userId: 'u1',
    score: 78,
    totalQuestions: 40,
    date: '2026-05-02T09:00:00Z',
    duration: 55,
  },
];

export const MOCK_STATS: UserStats = {
  averageScore: 85,
  examsCompleted: 12,
  totalTimeSpent: 720,
  rank: 'Gold Learner',
};

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Berapakah hasil dari 15 x 6?',
    options: ['80', '90', '100', '110'],
    correctOptionIndex: 1,
  },
  {
    id: 'q2',
    text: 'Siapakah penemu bola lampu?',
    options: ['Nikola Tesla', 'Thomas Edison', 'Alexander Graham Bell', 'Isaac Newton'],
    correctOptionIndex: 1,
  },
  {
    id: 'q3',
    text: 'Planet manakah yang dikenal sebagai Planet Merah?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturnus'],
    correctOptionIndex: 2,
  },
  {
    id: 'q4',
    text: 'Apa simbol kimia untuk emas?',
    options: ['Ag', 'Fe', 'Au', 'Pb'],
    correctOptionIndex: 2,
  },
  {
    id: 'q5',
    text: 'Siapakah penulis novel "Laskar Pelangi"?',
    options: ['Tere Liye', 'Andrea Hirata', 'Habiburrahman El Shirazy', 'Dee Lestari'],
    correctOptionIndex: 1,
  },
];
