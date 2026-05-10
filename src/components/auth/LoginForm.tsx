import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, User, Lock, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { motion } from 'motion/react';
import { User as UserType } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface LoginFormProps {
  onLogin: (user: UserType) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Dev Login State
  const [showDevModal, setShowDevModal] = useState(false);
  const [devEmail, setDevEmail] = useState('');
  const [devPassword, setDevPassword] = useState('');
  const [devError, setDevError] = useState('');

  const handleAdminLogin = () => {
    if (devEmail === 'admin' && devPassword === 'admin') {
      onLogin({
        id: 'admin-id',
        name: 'Administrator (Dev)',
        email: 'admin',
        role: 'admin',
        avatar: 'https://github.com/shadcn.png'
      });
    } else {
      setDevError('Kredensial Dev tidak valid');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin/Dev Login check (Double support for main form)
    if (email === 'admin' && password === 'admin') {
      onLogin({
        id: 'admin-id',
        name: 'Administrator (Dev)',
        email: 'admin',
        role: 'admin',
        avatar: 'https://github.com/shadcn.png'
      });
      return;
    }

    // Default Student Login (Mock)
    if (email && password) {
       onLogin({
         id: 'user-id',
         name: 'John Doe',
         email: email,
         role: 'student',
         avatar: 'https://github.com/shadcn.png'
       });
    } else {
      setError('Silakan isi email dan password');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F1F5F9] p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-3 justify-center mb-8 font-black text-3xl tracking-tighter text-slate-900">
          <div className="rounded-2xl bg-indigo-600 p-3 text-white shadow-xl shadow-indigo-200">
            <BookOpen className="h-8 w-8" />
          </div>
          <span>EduScore</span>
        </div>

        <Card className="bento-card p-4">
          <CardHeader className="space-y-1 text-center pb-8 border-b-2 border-slate-50 mb-6">
            <CardTitle className="text-2xl font-black text-slate-900">Masuk ke Akun</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Silakan masuk untuk mulai mengelola ujian Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Email atau Username</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <Input 
                    id="email" 
                    placeholder="nama@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 ring-indigo-50 border-indigo-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Password</Label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 ring-indigo-50 border-indigo-200"
                  />
                </div>
              </div>

              {error && <p className="text-xs font-bold text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100">{error}</p>}

              <Button type="submit" className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2">
                Masuk <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-slate-400 text-sm font-medium">
          Belum punya akun? <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Daftar sekarang</span>
        </p>
      </motion.div>

      {/* Floating Admin/Dev Entry Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={() => setShowDevModal(true)}
          variant="secondary"
          className="h-10 px-4 rounded-xl bg-white border-2 border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 shadow-sm transition-colors"
        >
          <ShieldCheck className="h-4 w-4 mr-2" />
          <span className="font-bold text-[10px] uppercase tracking-widest">Akses Dev</span>
        </Button>
      </div>

      <Dialog open={showDevModal} onOpenChange={setShowDevModal}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl border-none p-0 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 p-8 text-white">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center mb-4">
               <KeyRound className="h-6 w-6" />
            </div>
            <DialogTitle className="text-2xl font-black">Autentikasi Dev</DialogTitle>
            <DialogDescription className="text-slate-400 font-medium">
              Area terbatas. Masukkan kredensial pengembang untuk melanjutkan.
            </DialogDescription>
          </div>
          <div className="p-8 space-y-6 bg-white">
             <div className="space-y-4">
                <div className="space-y-2">
                   <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Dev Username</Label>
                   <Input 
                      placeholder="Admin username" 
                      value={devEmail}
                      onChange={(e) => setDevEmail(e.target.value)}
                      className="h-12 bg-slate-50 border-2 border-slate-100 rounded-xl"
                   />
                </div>
                <div className="space-y-2">
                   <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Secret Key</Label>
                   <Input 
                      type="password" 
                      placeholder="••••••••" 
                      value={devPassword}
                      onChange={(e) => setDevPassword(e.target.value)}
                      className="h-12 bg-slate-50 border-2 border-slate-100 rounded-xl"
                   />
                </div>
                {devError && <p className="text-[10px] font-bold text-rose-500">{devError}</p>}
             </div>
             <Button 
               onClick={handleAdminLogin}
               className="w-full h-12 bg-slate-900 hover:bg-black text-white font-bold rounded-xl"
             >
               Verifikasi & Masuk
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
