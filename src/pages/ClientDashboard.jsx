import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Clock, Gift, Award, MapPin, 
  ChevronRight, Bike, Sparkles, TrendingUp, DollarSign 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data Matrices for Portfolio Pacing
const orderHistoryMock = [
  { id: 'ORD-8831', restaurant: 'The Truffle Crust Pizza', date: 'Today, 02:40 PM', items: '2x Spicy Paneer, 1x Coke', total: 648, status: 'On The Way' },
  { id: 'ORD-7642', restaurant: 'Lean Protein Lab', date: '24 June 2026', items: '1x Keto Salad Bowl', total: 320, status: 'Delivered' },
  { id: 'ORD-6511', restaurant: 'Smash & Stack Co.', date: '18 June 2026', items: '2x Classic Double Smash', total: 450, status: 'Delivered' },
];

const spendingChartData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 2100 },
  { name: 'Mar', amount: 1800 },
  { name: 'Apr', amount: 3400 },
  { name: 'May', amount: 2800 },
  { name: 'Jun', amount: 4150 },
];

const activeChallengesMock = [
  { id: 'ch-1', title: 'Green Diet Streak', progress: 80, reward: 'Unlock Elite Badge', desc: 'Order 5 healthy salads this month' },
  { id: 'ch-2', title: 'Midnight Craver', progress: 33, reward: '₹100 Flash Coupon', desc: 'Place 3 orders after 11:00 PM' }
];

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    name: 'Ankit Sharma',
    tier: 'Gold Gourmet Member',
    xp: 2450,
    nextTierXp: 3000
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* HEADER SECTION: User Profile Matrix Banner */}
      <div className="relative bg-slate-900 text-white rounded-3xl p-6 md:p-8 overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-10 blur-xl pointer-events-none">
          <div className="h-64 w-64 bg-brand-500 rounded-full animate-pulse" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-brand-400 uppercase tracking-widest bg-brand-950/50 px-2.5 py-1 rounded-md border border-brand-900/30">
                {userProfile.tier}
              </span>
              <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Welcome Back, {userProfile.name}!</h1>
            <p className="text-xs text-slate-400 max-w-md">Aapke custom analytics dashboards, order status channels aur active streak parameters niche live hain.</p>
          </div>

          {/* Gamified XP Progress bar panel */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 min-w-[260px] space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Level Progression</span>
              <span className="font-bold text-brand-400">{userProfile.xp} / {userProfile.nextTierXp} XP</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-linear-to-r from-brand-500 to-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${(userProfile.xp / userProfile.nextTierXp) * 100}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <p className="text-[10px] text-slate-500 font-medium italic text-right">550 XP more to unlock Platinum Vault! 💎</p>
          </div>
        </div>
      </div>

      {/* DYNAMIC METRIC COUNTERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Orders', value: '42', desc: 'Lifetime transactions count', icon: ShoppingBag, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' },
          { title: 'Wallet Cashback', value: '₹340', desc: 'Active redeemable balance', icon: DollarSign, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
          { title: 'Active Challenges', value: '2 Starks', desc: 'In-progress reward missions', icon: Award, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
          { title: 'Secret Card Invites', value: '7 Locked', desc: 'Mystery recipe vault unlocks', icon: Gift, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">{stat.title}</span>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{stat.value}</h3>
              <p className="text-[10px] text-slate-400 font-medium">{stat.desc}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5 stroke-[2]" />
            </div>
          </div>
        ))}
      </div>

      {/* DASHBOARD CORE CONTROL GRID SYSTEMS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Spending Chart Analytics & Order History (Takes 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Real-time Spending Matrix Chart */}
          <div className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-md font-black text-slate-800 dark:text-white tracking-tight">Spending Analytics</h2>
                <p className="text-[11px] text-slate-400 font-medium">Monthly budget expenditure trajectory maps</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-lg">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+24% vs last month</span>
              </div>
            </div>

            {/* CRITICAL FIX: FIXED WRAPPER OVERRIDE MATRIX FOR RESPONSIVE CONTAINER */}
            <div className="h-48 w-full font-mono text-[11px] pt-2 relative" style={{ minWidth: '100%', minHeight: '192px' }}>
              <ResponsiveContainer width="99%" height="100%">
                <LineChart data={spendingChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', background: '#0f172a', color: '#fff', fontSize: '11px', border: 'none' }} />
                  <Line type="monotone" dataKey="amount" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Active Order History Feed Logs */}
          <div className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-xs">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-md font-black text-slate-800 dark:text-white tracking-tight">Recent Activity Log</h2>
                <p className="text-[11px] text-slate-400 font-medium">Live pipeline tracker of active and history orders</p>
              </div>
              <button className="text-xs font-black text-brand-500 hover:text-brand-600 flex items-center">
                <span>View Full Log</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {orderHistoryMock.map((order) => {
                const isTransit = order.status === 'On The Way';
                return (
                  <div key={order.id} className="p-3.5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 hover:border-slate-200 dark:hover:border-slate-700 transition">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${isTransit ? 'bg-rose-50 text-rose-500 border-rose-100 animate-pulse' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                        {isTransit ? <Bike className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-black text-slate-800 dark:text-white truncate max-w-[150px]">{order.restaurant}</h4>
                          <span className="text-[9px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded-sm">{order.id}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium truncate max-w-[180px]">{order.items}</p>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <span className="text-xs font-black text-slate-800 dark:text-white block">₹{order.total}</span>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md inline-block ${
                        isTransit 
                          ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400' 
                          : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Gamified Challenges Matrix Panel & Quick Actions (Takes 1 Column) */}
        <div className="space-y-6">
          
          {/* Dynamic Active Streaks Challenges Card */}
          <div className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 shadow-xs">
            <div>
              <h2 className="text-md font-black text-slate-800 dark:text-white tracking-tight">Active Achievements</h2>
              <p className="text-[11px] text-slate-400 font-medium">Complete tasks to scale levels and redeem perks</p>
            </div>

            <div className="space-y-4">
              {activeChallengesMock.map((challenge) => (
                <div key={challenge.id} className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800 dark:text-white">{challenge.title}</span>
                    <span className="text-[9px] font-bold text-brand-500 bg-brand-50 dark:bg-brand-950/30 px-1.5 py-0.5 rounded-md">{challenge.reward}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">{challenge.desc}</p>
                  
                  {/* Miniature progress meter matrix */}
                  <div className="space-y-1 pt-1">
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${challenge.progress}%` }} />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 block text-right">{challenge.progress}% Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Matrix Shortcuts */}
          <div className="bg-linear-to-br from-brand-500 to-rose-600 text-white rounded-3xl p-5 space-y-4 shadow-lg shadow-brand-500/10">
            <div>
              <h2 className="text-md font-black tracking-tight">Premium Features</h2>
              <p className="text-[11px] text-brand-100 font-medium">Instant triggers for smart lifestyle eating tools</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Macro Budgeter', path: '/macros', desc: 'Calorie maps' },
                { name: 'Mystery Box', path: '/mystery-box', desc: 'Surprise food' },
                { name: 'Recipe Vault', path: '/recipes', desc: 'Saved kitchen' },
                { name: 'Group Orders', path: '/group-order', desc: 'Split items' }
              ].map((act, i) => (
                <button 
                  key={i}
                  onClick={() => navigate(act.path)}
                  className="bg-white/10 hover:bg-white/20 text-left p-3 rounded-xl border border-white/10 transition group focus:outline-none cursor-pointer"
                >
                  <span className="font-black text-xs block group-hover:translate-x-0.5 transition-transform">{act.name}</span>
                  <span className="text-[9px] text-brand-200 font-medium block mt-0.5">{act.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ClientDashboard;