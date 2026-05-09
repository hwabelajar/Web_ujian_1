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
      <div className="flex gap-4 h-20 shrink-0">
        <div className="flex-1 bg-white border-2 border-slate-200 rounded-2xl px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
            <div>
              <h1 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Exam Portal</h1>
              <p className="text-lg font-bold text-slate-800 leading-tight">{exam.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">JD</div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">John Doe</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">ID: 202409812</p>
            </div>
          </div>
        </div>
        <div className="w-72 bg-slate-900 border-2 border-slate-800 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg shadow-slate-200">
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-0.5">Sisa Waktu</p>
          <p className={cn(
            "text-3xl font-mono font-bold tracking-wider",
            timeLeft < 300 ? "text-red-400 animate-pulse" : "text-white"
          )}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Question Card */}
        <div className="flex-1 bg-white border-2 border-slate-200 rounded-[2.5rem] p-12 flex flex-col shadow-sm relative overflow-y-auto">
          <div className="mb-8">
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
            </span>
            <h2 className="text-3xl font-bold text-slate-800 mt-8 leading-tight tracking-tight">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="space-y-4 mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => {
                  const label = String.fromCharCode(65 + index);
                  const isSelected = answers[currentQuestion.id] === index;
                  return (
                    <button 
                      key={index}
                      onClick={() => handleSelectAnswer(index.toString())}
                      className={cn(
                        "w-full flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left group",
                        isSelected 
                          ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-50" 
                          : "border-slate-100 hover:border-slate-300 bg-white"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-colors",
                        isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      )}>
                        {label}
                      </div>
                      <span className={cn(
                        "text-xl font-semibold transition-colors",
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

        {/* Sidebar Nav & Stats */}
        <div className="w-80 flex flex-col gap-4">
          <div className="flex-1 bg-white border-2 border-slate-200 rounded-[2.5rem] p-6 flex flex-col shadow-sm overflow-hidden">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5">
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
                 <div className="w-1.5 h-1.5 bg-slate-400 rounded-sm"></div>
              </div>
              Navigasi Soal
            </h3>
            
            <div className="grid grid-cols-5 gap-2.5 overflow-y-auto pr-1 custom-scrollbar pb-4">
              {questions.map((_, i) => {
                const isCurrent = currentQuestionIndex === i;
                const isAnswered = answers[questions[i].id] !== undefined;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentQuestionIndex(i)}
                    className={cn(
                      "aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                      isCurrent && "ring-4 ring-indigo-100 scale-110 z-10 shadow-md",
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

          {/* Stats Card */}
          <div className="h-48 bento-card-indigo">
             <div className="flex justify-between items-start mb-6">
                <h4 className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Live Statistik</h4>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-bold opacity-80 uppercase">Aktif</span>
                </div>
             </div>
             <div className="space-y-4">
                <div className="space-y-1.5">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="opacity-70">Terjawab</span>
                      <span>{answeredCount} / {questions.length}</span>
                   </div>
                   <div className="w-full h-2 bg-indigo-900/30 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                      />
                   </div>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-bold">
                   <span className="opacity-70">Progres Akhir</span>
                   <span>{Math.round(progress)}%</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="h-20 shrink-0 flex gap-4">
        <button 
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="w-48 bg-white border-2 border-slate-200 rounded-2xl text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" /> Sebelumnya
        </button>
        
        <div className="flex-1 bg-slate-200/50 rounded-2xl flex items-center px-8 text-slate-500 font-bold text-xs uppercase tracking-wider italic">
          Draft jawaban disimpan secara otomatis pada {format(new Date(), 'HH:mm:ss')}
        </div>

        {currentQuestionIndex === questions.length - 1 ? (
          <button 
            onClick={handleFinish}
            disabled={answeredCount < questions.length - 1}
            className="w-56 bg-emerald-500 border-2 border-emerald-500 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all active:scale-95"
          >
            Selesaikan Ujian <CheckCircle2 className="h-5 w-5" />
          </button>
        ) : (
          <button 
            onClick={handleNext}
            className="w-48 bg-indigo-600 border-2 border-indigo-600 rounded-2xl text-white font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            Selanjutnya <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
