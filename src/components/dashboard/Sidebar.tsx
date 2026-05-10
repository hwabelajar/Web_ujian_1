import * as React from 'react';
import { LayoutDashboard, BookOpen, History, Settings, LogOut, ChevronRight, ShieldCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { motion } from 'motion/react';
import { User as UserType } from '@/types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserType;
  onLogout: () => void;
}

export function Sidebar({ activeTab, setActiveTab, user, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'exams', label: 'Daftar Ujian', icon: BookOpen },
    { id: 'history', label: 'Riwayat Saya', icon: History },
  ];

  if (user.role === 'admin') {
    menuItems.push({ id: 'admin', label: 'Kelola Soal (Dev)', icon: ShieldCheck });
  }

  const bottomItems = [
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-72 flex-col border-r-2 border-slate-200 bg-white">
      <div className="flex h-20 items-center px-8 border-b-2 border-slate-50">
        <div className="flex items-center gap-3 font-black text-2xl tracking-tighter text-slate-900">
          <div className="rounded-xl bg-indigo-600 p-2 text-white shadow-lg shadow-indigo-100 flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <span>EduScore</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-8">
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Menu Utama
          </p>
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group',
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 font-bold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <item.icon className={cn('h-5 w-5 transition-colors', isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600')} />
                <span className="text-sm tracking-tight">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="px-4 py-4">
           <div className="h-0.5 bg-slate-100 rounded-full w-full" />
        </div>

        <div className="space-y-2 py-4">
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Personal
          </p>
          {bottomItems.map((item) => (
            <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <item.icon className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
              <span className="text-sm font-medium tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-6">
        <div 
          onClick={onLogout}
          className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 flex items-center gap-4 relative group cursor-pointer hover:border-red-100 hover:bg-red-50/30 transition-all"
        >
          <Avatar className="h-10 w-10 rounded-xl border-2 border-white shadow-sm shrink-0">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-indigo-600 text-white font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-slate-800 truncate">{user.name}</span>
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-red-500 uppercase tracking-widest mt-0.5 transition-colors">Logout</span>
          </div>
          <div className="ml-auto w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:rotate-12 transition-all">
             <LogOut className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
