import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen } from 'lucide-react';
import { Exam } from '@/types';
import { cn } from '@/lib/utils';

interface ExamCardProps {
  exam: Exam;
  onStart: (exam: Exam) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onStart }) => {
  const difficultyColor = {
    Easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Hard: 'bg-rose-100 text-rose-700 border-rose-200',
  }[exam.difficulty];

  const canStart = exam.status === 'active';

  return (
    <Card className="bento-card group hover:border-indigo-600/50">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="font-bold text-[10px] uppercase tracking-widest border-slate-200">
            {exam.category}
          </Badge>
          <Badge className={cn("font-bold text-[10px] uppercase tracking-widest border", difficultyColor)} variant="secondary">
            {exam.difficulty}
          </Badge>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-slate-800">{exam.title}</CardTitle>
          <CardDescription className="text-slate-500 line-clamp-2">
            {exam.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Durasi</span>
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <Clock className="h-4 w-4 text-indigo-600" />
            <span>{exam.duration}m</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Soal</span>
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <BookOpen className="h-4 w-4 text-indigo-600" />
            <span>{exam.totalQuestions}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className={cn(
            "w-full rounded-2xl font-bold py-6 transition-all",
            canStart ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100" : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )} 
          disabled={!canStart}
          onClick={() => onStart(exam)}
        >
          {canStart ? 'Mulai Ujian' : 'Segera Hadir'}
        </Button>
      </CardFooter>
    </Card>
  );
}
