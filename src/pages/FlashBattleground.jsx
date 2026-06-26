import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Zap, Flame, Users, ShoppingCart } from 'lucide-react';

const mockDeals = [
  { id: 'd1', name: 'Artisanal Truffle Pizza', originalPrice: 599, dealPrice: 199, spotsLeft: 3, restaurant: 'Pizzeria Grand', timeLeft: 120 },
  { id: 'd2', name: 'Monster Avocado Crunch Burger', originalPrice: 349, dealPrice: 99, spotsLeft: 1, restaurant: 'Burger Lab', timeLeft: 45 },
  { id: 'd3', name: 'Loaded Belgian Berry Waffle', originalPrice: 249, dealPrice: 49, spotsLeft: 5, restaurant: 'Waffle Co.', timeLeft: 300 },
];

const FlashBattleground = () => {
  const [deals, setDeals] = useState(mockDeals);

  // Live countdown ticker simulation for real-time stress test feel
  useEffect(() => {
    const interval = setInterval(() => {
      setDeals((prevDeals) =>
        prevDeals.map((deal) => ({
          ...deal,
          timeLeft: deal.timeLeft > 0 ? deal.timeLeft - 1 : 0,
        })).filter(deal => deal.timeLeft > 0)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-500 text-xs font-black uppercase tracking-wider rounded-full mb-1">
          <Zap className="h-3.5 w-3.5 fill-current" />
          <span>Live Battleground Active</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-white sm:text-4xl">
          Flash Discount <span className="text-brand-500">Battleground</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Bina refresh kiye dekho! Limited orders jo zero hone se pehle grab karne hain. Price drops directly to bottom rock pricing!
        </p>
      </div>

      {/* Grid Display Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden"
            >
              {/* Top Meta Status bar */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold truncate max-w-[120px]">{deal.restaurant}</span>
                <div className="flex items-center gap-1 text-rose-500 font-mono font-black bg-rose-50 dark:bg-rose-950/20 px-2.5 py-1 rounded-lg">
                  <Timer className="h-3.5 w-3.5 animate-spin" />
                  <span>{formatTime(deal.timeLeft)}</span>
                </div>
              </div>

              {/* Dish Metadata pricing details */}
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-800 dark:text-white truncate">{deal.name}</h3>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-black text-slate-900 dark:text-white">₹{deal.dealPrice}</span>
                  <span className="text-xs text-slate-400 line-through">₹{deal.originalPrice}</span>
                  <span className="text-[10px] text-emerald-500 font-black bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    Save {Math.round(((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100)}%
                  </span>
                </div>
              </div>

              {/* Progress dynamic bar tracking spots left */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-amber-500 flex items-center gap-0.5"><Users className="h-3 w-3" /> Rush Hour!</span>
                  <span className="text-slate-500 dark:text-slate-400">{deal.spotsLeft} items left</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${(deal.spotsLeft / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => alert(`Battleground deal secured! Proceeding instantly to flash checkout matrix router!`)}
                className="w-full bg-slate-900 dark:bg-brand-500 hover:brightness-110 text-white text-xs font-black py-2.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Flame className="h-4 w-4 fill-current text-amber-400" />
                <span>CLAIM FLASH PRICE</span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlashBattleground;