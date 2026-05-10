import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Timer, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Exam, Question } from '@/types';
import { MOCK_QUESTIONS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ExamEngineProps {
  exam: Exam;
  onFinish: (score: number) => void;
  onCancel: () => void;
}

export function ExamEngine({ exam, onFinish, onCancel }: ExamEngineProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [isFinishing, setIsFinishing] = useState(false);

  const questions = MOCK_QUESTIONS; 
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSelectAnswer = (optionIndex: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: parseInt(optionIndex),
    });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionIndex) {
        score += 1;
      }
    });
    return Math.round((score / questions.length) * 100);
  };

  const handleFinish = () => {
    setIsFinishing(true);
    setTimeout(() => {
      onFinish(calculateScore());
    }, 1500);
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  if (isFinishing) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card p-12 text-center max-w-sm"
        >
          <div className="flex justify-center mb-6">
             <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-16 w-16 border-4 border-indigo-600 border-t-transparent rounded-full"
             />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Menyimpan Jawaban...</h2>
          <p className="text-slate-500 mt-2">Sistem sedang menghitung skor akhir Anda.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#F1F5F9] flex flex-col p-6 gap-4 overflow-hidden select-none">
      {/* Header Bento Row */}
      <div className="flex gap-4 h-16 shrink-0">
        <div className="flex-1 bg-white border-2 border-slate-200 rounded-2xl px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">E</div>
            <div>
              <h1 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Exam Portal</h1>
              <p className="text-base font-bold text-slate-800 leading-tight">{exam.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">JD</div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-800">John Doe</p>
            </div>
          </div>
        </div>
        <div className="w-56 bg-slate-900 border-2 border-slate-800 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-slate-200">
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-0.5">Sisa Waktu</p>
          <p className={cn(
            "text-2xl font-mono font-bold tracking-wider",
            timeLeft < 300 ? "text-red-400 animate-pulse" : "text-white"
          )}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Sidebar Nav */}
        <div className="w-64 flex flex-col gap-4">
          <div className="flex-1 bg-white border-2 border-slate-200 rounded-[2rem] p-5 flex flex-col shadow-sm overflow-hidden">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5">
                 <div className="w-1 h-1 bg-slate-400 rounded-sm"></div>
                 <div className="w-1 h-1 bg-slate-400 rounded-sm"></div>
                 <div className="w-1 h-1 bg-slate-400 rounded-sm"></div>
                 <div className="w-1 h-1 bg-slate-400 rounded-sm"></div>
              </div>
              Navigasi
            </h3>
            
            <div className="grid grid-cols-5 gap-1.5 overflow-y-auto pr-1 custom-scrollbar pb-2">
              {questions.map((_, i) => {
                const isCurrent = currentQuestionIndex === i;
                const isAnswered = answers[questions[i].id] !== undefined;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentQuestionIndex(i)}
                    className={cn(
                      "aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all",
                      isCurrent && "ring-2 ring-indigo-100 scale-105 z-10 shadow-sm",
                      isAnswered 
                        ? (isCurrent ? "bg-indigo-600 text-white" : "bg-emerald-500 text-white") 
                        : (isCurrent ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200")
                    )}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="flex-1 bg-white border-2 border-slate-200 rounded-[2rem] p-10 flex flex-col shadow-sm relative overflow-y-auto">
          <div className="mb-6">
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
            </span>
            <h2 className="text-base font-bold text-slate-800 mt-6 leading-tight tracking-tight">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="space-y-3 mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => {
                  const label = String.fromCharCode(65 + index);
                  const isSelected = answers[currentQuestion.id] === index;
                  return (
                    <button 
                      key={index}
                      onClick={() => handleSelectAnswer(index.toString())}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group",
                        isSelected 
                          ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-50" 
                          : "border-slate-100 hover:border-slate-300 bg-white"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-colors shrink-0",
                        isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      )}>
                        {label}
                      </div>
                      <span className={cn(
                        "text-sm font-semibold transition-colors",
                        isSelected ? "text-indigo-900" : "text-slate-700"
                      )}>
                        {option}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="h-16 shrink-0 flex gap-4">
        <button 
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="px-8 bg-white border-2 border-slate-200 rounded-2xl text-slate-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" /> Sebelum
        </button>
        
        <div className="flex-1 bg-slate-200/50 rounded-2xl flex items-center px-6 text-slate-400 font-bold text-[10px] uppercase tracking-wider italic">
          Draft disimpan secara otomatis pada {format(timeLeft < 0 ? new Date() : new Date(), 'HH:mm:ss')}
        </div>

        {currentQuestionIndex === questions.length - 1 ? (
          <button 
            onClick={handleFinish}
            className="px-10 bg-emerald-500 border-2 border-emerald-500 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 shadow-lg shadow-emerald-50 transition-all active:scale-95"
          >
            Selesai <CheckCircle2 className="h-4 w-4" />
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="px-8 bg-indigo-600 border-2 border-indigo-600 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-50 transition-all active:scale-95"
          >
            Lanjut <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
