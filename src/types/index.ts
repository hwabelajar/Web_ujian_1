export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'active' | 'upcoming' | 'completed';
  startTime?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  date: string;
  duration: number; // minutes taken
}

export interface UserStats {
  averageScore: number;
  examsCompleted: number;
  totalTimeSpent: number; // in minutes
  rank: string;
}
