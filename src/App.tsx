/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ExamCard } from '@/components/dashboard/ExamCard';
import { ExamEngine } from '@/components/exam/ExamEngine';
import { MOCK_EXAMS, MOCK_STATS, MOCK_ATTEMPTS } from '@/lib/mock-data';
import { Exam, User as UserType } from '@/types';
import { motion, AnimatePresence } from 'motion/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Search, Bell, CheckCircle2, ChevronRight, Award, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { LoginForm } from '@/components/auth/LoginForm';

export default function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [lastScore, setLastScore] = useState(0);

  const handleStartExam = (exam: Exam) => {
    setCurrentExam(exam);
  };

  const handleFinishExam = (score: number) => {
    setLastScore(score);
    setCurrentExam(null);
    setShowResultDialog(true);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  return (
    <div className="flex h-screen bg-[#F1F5F9] text-slate-800 font-sans selection:bg-indigo-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />
      
      <main className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#F1F5F9] sticky top-0 z-10">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              placeholder="Cari ujian, materi, atau topik..." 
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-4 ring-indigo-50 border-indigo-200 transition-all outline-none font-medium shadow-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
                <div className="flex flex-col text-right">
                   <span className="text-xs font-bold text-slate-800 leading-none">{user.name}</span>
                   <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">
                     {user.role === 'admin' ? 'Akses Developer' : 'Siswa Gold'}
                   </span>
                </div>
                <Avatar className="h-9 w-9 rounded-xl border-2 border-indigo-100">
                   <AvatarImage src={user.avatar} />
                   <AvatarFallback className="bg-indigo-600 text-white font-bold">
                     {user.name.split(' ').map(n => n[0]).join('')}
                   </AvatarFallback>
                </Avatar>
             </div>
             <Button variant="ghost" size="icon" className="relative h-12 w-12 bg-white border-2 border-slate-200 rounded-2xl hover:bg-slate-50 shadow-sm group">
                <Bell className="h-5 w-5 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
             </Button>
          </div>
        </header>

        <div className="p-8 pt-2 pb-16">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Belajar</h1>
                    <p className="text-slate-500 font-medium mt-1">Ringkasan aktivitas dan performa ujian Anda hari ini.</p>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-6 rounded-2xl shadow-lg shadow-indigo-100 flex items-center gap-2">
                     <Search className="h-4 w-4" /> Temukan Ujian Baru
                  </Button>
                </div>
                
                <DashboardStats stats={MOCK_STATS} />

                <div className="grid gap-8 lg:grid-cols-5">
                  <Card className="lg:col-span-3 bento-card p-6">
                    <CardHeader className="px-0 pt-0 mb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold text-slate-800">Ujian Terbaru</CardTitle>
                        <Button variant="ghost" className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:bg-indigo-50">Lihat Semua</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nama Ujian</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tanggal</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Skor</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hasil</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {MOCK_ATTEMPTS.map((attempt) => (
                            <TableRow key={attempt.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <TableCell className="font-bold text-slate-700 py-4">Sains & Teknologi</TableCell>
                              <TableCell className="text-slate-500 font-medium">{format(new Date(attempt.date), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>
                                <span className={cn("text-lg font-black", attempt.score >= 80 ? 'text-emerald-500' : 'text-amber-500')}>
                                  {attempt.score}%
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                                  <CheckCircle2 className="h-3 w-3" /> Lulus
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2 bento-card p-6">
                    <CardHeader className="px-0 pt-0 mb-4">
                      <CardTitle className="text-xl font-bold text-slate-800">Ujian Rekomendasi</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 space-y-4">
                      {MOCK_EXAMS.filter(e => e.status === 'active').slice(0, 3).map(exam => (
                        <div key={exam.id} className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                           <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-110 transition-transform">
                              {exam.category[0]}
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-800 truncate">{exam.title}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{exam.duration} Min • {exam.category}</p>
                           </div>
                           <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              <ChevronRight className="h-4 w-4" />
                           </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === 'exams' && (
              <motion.div
                key="exams"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Ujian Tersedia</h1>
                    <p className="text-slate-500 font-medium mt-1">Pilih ujian dibawah ini untuk mulai menguji kemampuan Anda.</p>
                  </div>
                  <div className="flex gap-2 p-1 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
                    <Button variant="ghost" className="px-4 font-bold text-xs uppercase tracking-widest bg-slate-100 rounded-xl">Semua</Button>
                    <Button variant="ghost" className="px-4 font-bold text-xs uppercase tracking-widest text-slate-400">Aktif</Button>
                    <Button variant="ghost" className="px-4 font-bold text-xs uppercase tracking-widest text-slate-400">Mendatang</Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {MOCK_EXAMS.map(exam => (
                    <ExamCard key={exam.id} exam={exam} onStart={handleStartExam} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">Riwayat Belajar</h1>
                  <p className="text-slate-500 font-medium mt-1">Lacak dan pantau perkembangan skor ujian Anda dari waktu ke waktu.</p>
                </div>
                
                <Card className="bento-card overflow-hidden">
                   <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="pl-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Ujian</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Kategori</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tanggal</TableHead>
                            <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Lama Pengerjaan</TableHead>
                            <TableHead className="text-right pr-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">Skor Akhir</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {MOCK_ATTEMPTS.map((attempt) => (
                            <TableRow key={attempt.id} className="hover:bg-slate-50 transition-colors border-slate-50">
                              <TableCell className="pl-8 py-5">
                                 <div className="flex flex-col">
                                    <span className="font-bold text-slate-800">Ujian Tengah Semester: Matematika Dasar</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Hash ID: {attempt.id}</span>
                                 </div>
                              </TableCell>
                              <TableCell><Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold uppercase text-[9px] tracking-widest">Matematika</Badge></TableCell>
                              <TableCell className="text-slate-500 font-medium">{format(new Date(attempt.date), 'PPPP')}</TableCell>
                              <TableCell className="text-slate-700 font-bold">{attempt.duration} Menit</TableCell>
                              <TableCell className="text-right pr-8">
                                 <span className={cn("text-2xl font-black", attempt.score >= 80 ? "text-emerald-500" : "text-amber-500")}>
                                   {attempt.score}%
                                 </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                   </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'admin' && user.role === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Kelola Ujian & Soal</h1>
                    <p className="text-slate-500 font-medium mt-1">Area pengembang untuk menambah atau mengubah daftar soal ujian.</p>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-6 rounded-2xl shadow-lg shadow-indigo-100 flex items-center gap-2">
                     <Plus className="h-5 w-5" /> Tambah Ujian Baru
                  </Button>
                </div>

                <div className="grid gap-6">
                  {MOCK_EXAMS.map(exam => (
                    <Card key={exam.id} className="bento-card p-6 overflow-hidden">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-6">
                          <div className="h-16 w-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-xl">
                            {exam.category[0]}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">{exam.title}</h3>
                            <p className="text-slate-500 font-medium text-sm mt-1">{exam.description || 'Tidak ada deskripsi'}</p>
                            <div className="flex gap-4 mt-3">
                              <Badge className="bg-slate-100 text-slate-600 border-none font-bold text-[10px] uppercase tracking-wider px-3 py-1">{exam.duration} Menit</Badge>
                              <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold text-[10px] uppercase tracking-wider px-3 py-1">{exam.category}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" className="h-12 px-6 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Tambah Soal
                          </Button>
                          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-rose-500 bg-rose-50 hover:bg-rose-100">
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-8 border-t-2 border-slate-50 pt-6">
                         <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Daftar Soal Terdaftar (Total: 5)</h4>
                         <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                               <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border-2 border-slate-100 group hover:border-indigo-100 transition-colors">
                                  <span className="text-sm font-bold text-slate-700">Soal #{i}: Apa yang dimaksud dengan fotosintesis pada tumbuhan?</span>
                                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <Button variant="ghost" size="sm" className="font-bold text-xs text-slate-400 hover:text-indigo-600">Ubah</Button>
                                     <Button variant="ghost" size="sm" className="font-bold text-xs text-rose-400 hover:text-rose-600">Hapus</Button>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Exam Engine Overlay */}
      <AnimatePresence>
        {currentExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#F1F5F9]"
          >
            <ExamEngine 
              exam={currentExam} 
              onFinish={handleFinishExam}
              onCancel={() => setCurrentExam(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Dialog */}
      <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none rounded-[2.5rem] shadow-2xl">
          <div className="p-10 text-center space-y-8 bg-white relative">
            <div className="absolute top-0 right-0 p-6">
                <Button variant="ghost" size="icon" onClick={() => setShowResultDialog(false)} className="rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200">
                   <ChevronRight className="h-4 w-4 rotate-90" />
                </Button>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ujian Selesai!</h1>
              <p className="text-slate-500 font-medium">Hasil rekapitulasi ujian Anda sudah siap.</p>
            </div>

            <div className="flex flex-col items-center justify-center py-6">
               <div className="h-44 w-44 rounded-full border-2 border-slate-100 flex items-center justify-center relative shadow-inner bg-slate-50/50">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-indigo-600">{lastScore}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Skor Akhir</span>
                  </div>
                  <svg className="absolute inset-0 h-full w-full -rotate-90">
                     <circle 
                        cx="88" cy="88" r="80" 
                        fill="transparent" 
                        stroke="#e2e8f0" 
                        strokeWidth="12"
                     />
                     <motion.circle 
                        initial={{ strokeDashoffset: 502.4 }}
                        animate={{ strokeDashoffset: 502.4 * (1 - lastScore/100) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="88" cy="88" r="80" 
                        fill="transparent" 
                        stroke="#4f46e5" 
                        strokeWidth="12"
                        strokeDasharray="502.4"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]"
                     />
                  </svg>
               </div>
            </div>

            <div className={cn(
              "p-6 rounded-3xl border-2 font-bold text-sm leading-relaxed",
              lastScore >= 80 ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-amber-50 border-amber-100 text-amber-800"
            )}>
               {lastScore >= 80 ? (
                 <div className="flex flex-col gap-2">
                   <div className="flex justify-center gap-2 text-emerald-500 text-xl"><Award /><Award /><Award /></div>
                   "Luar biasa! Pertahankan terus performa gemilang Anda."
                 </div>
               ) : (
                 "Cukup baik! Ada beberapa materi yang perlu Anda tinjau kembali."
               )}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bento-card p-4 flex flex-col items-center gap-1 bg-slate-50 border-slate-200">
                  <span className="text-xl font-black text-slate-800">12/15</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Benar</span>
               </div>
               <div className="bento-card p-4 flex flex-col items-center gap-1 bg-slate-50 border-slate-200">
                  <span className="text-xl font-black text-slate-800">22:15</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Waktu</span>
               </div>
            </div>

            <Button onClick={() => setShowResultDialog(false)} className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-100 transition-all active:scale-95">
              Kembali ke Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

