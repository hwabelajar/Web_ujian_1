import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UserStats } from '@/types';
import { TrendingUp, Award, Clock, Target } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface DashboardStatsProps {
  stats: UserStats;
}

const chartData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 70 },
  { name: 'Mar', score: 82 },
  { name: 'Apr', score: 85 },
  { name: 'May', score: 92 },
];

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bento-card border-none bg-indigo-600 text-white shadow-indigo-100 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[10px] font-bold uppercase tracking-widest opacity-80">Rata-rata Skor</CardTitle>
          <TrendingUp className="h-4 w-4 opacity-80" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.averageScore}%</div>
          <p className="text-[10px] font-medium opacity-60 mt-1 uppercase tracking-wider">+2.5% dibanding bulan lalu</p>
          <div className="mt-6 w-full h-1.5 bg-indigo-900/20 rounded-full overflow-hidden">
             <div className="h-full bg-white rounded-full" style={{ width: `${stats.averageScore}%` }} />
          </div>
        </CardContent>
      </Card>

      <Card className="bento-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ujian Selesai</CardTitle>
          <Award className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">{stats.examsCompleted}</div>
          <div className="mt-4 flex items-center text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit uppercase tracking-wider">
            Target: Top 10%
          </div>
        </CardContent>
      </Card>

      <Card className="bento-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waktu Fokus</CardTitle>
          <Clock className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">{Math.round(stats.totalTimeSpent / 60)}j</div>
          <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">Total jam belajar Aktif</p>
          <div className="mt-4 flex -space-x-2 overflow-hidden">
             {[1,2,3,4].map(i => (
               <div key={i} className="inline-block h-8 w-8 rounded-xl ring-2 ring-white bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                 #{i}
               </div>
             ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bento-card relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Peringkat Anda</CardTitle>
          <Target className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">{stats.rank}</div>
          <div className="mt-4 flex flex-col gap-2">
             <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                <span>Gold</span>
                <span className="text-indigo-600 font-extrabold flex items-center gap-1">Peringkat Baru <Award className="h-3 w-3" /></span>
             </div>
             <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '65%' }} />
             </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bento-card col-span-full h-[350px] p-6">
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800 tracking-tight">Tren Performa Belajar</CardTitle>
              <CardDescription className="text-slate-500 font-medium">Data progres skor rata-rata mingguan Anda</CardDescription>
            </div>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
               <button className="px-3 py-1 text-[10px] font-bold uppercase rounded-lg bg-white shadow-sm">Bulan</button>
               <button className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">Minggu</button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[240px] px-0">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                <YAxis fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} tick={{fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ background: '#ffffff', borderRadius: '16px', border: '2px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
           </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
