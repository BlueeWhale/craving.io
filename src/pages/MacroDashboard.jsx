import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Target, RefreshCw, Star, ShoppingBag } from 'lucide-react';

const mockMacroFood = [
  { id: 'f1', name: 'Keto Grilled Chicken Protein Bowl', cal: 450, pro: 42, carb: 12, fat: 15, price: 299, rating: 4.8 },
  { id: 'f2', name: 'Almond Crust Low-Carb Avocado Toast', cal: 320, pro: 14, carb: 8, fat: 22, price: 189, rating: 4.5 },
  { id: 'f3', name: 'Vegan Quinoa Power Salad', cal: 380, pro: 18, carb: 45, fat: 10, price: 249, rating: 4.6 },
];

const MacroDashboard = () => {
  const [maxCarbs, setMaxCarbs] = useState(30);
  const [minProtein, setMinProtein] = useState(20);

  const filteredItems = mockMacroFood.filter(
    item => item.carb <= maxCarbs && item.pro >= minProtein
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header sections */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white">
          Macro & Calorie <span className="text-emerald-500">Budgeter</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Apne body fitness limits set karo, humara fitness router engine pure area ke restaurants me se wahi menu items filter karega.
        </p>
      </div>

      {/* Controller Controls Segment panel */}
      <div className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slider 1: Protein limit control */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1"><Target className="h-4 w-4 text-emerald-500" /> Minimum Protein Requirement</span>
            <span className="text-slate-800 dark:text-white font-mono">{minProtein}g</span>
          </div>
          <input 
            type="range" min="10" max="60" value={minProtein}
            onChange={(e) => setMinProtein(parseInt(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Slider 2: Carb limit control */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1"><Dumbbell className="h-4 w-4 text-amber-500" /> Maximum Carb Ceiling Limit</span>
            <span className="text-slate-800 dark:text-white font-mono">{maxCarbs}g</span>
          </div>
          <input 
            type="range" min="5" max="60" value={maxCarbs}
            onChange={(e) => setMaxCarbs(parseInt(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Filter Yield Outputs */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-slate-800 dark:text-white border-b pb-2 dark:border-slate-800">
          Target Balanced Clean Fuel Choices ({filteredItems.length})
        </h3>

        <div className="space-y-3">
          {filteredItems.map(food => (
            <div key={food.id} className="bg-white dark:bg-darkcard p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-white text-sm sm:text-base">{food.name}</h4>
                {/* Macro Micro badges system layout */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">🔥 {food.cal} kcal</span>
                  <span className="text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-500">💪 P: {food.pro}g</span>
                  <span className="text-[10px] font-bold bg-amber-500/10 px-2 py-0.5 rounded text-amber-500">🌾 C: {food.carb}g</span>
                  <span className="text-[10px] font-bold bg-indigo-500/10 px-2 py-0.5 rounded text-indigo-500">🥑 F: {food.fat}g</span>
                </div>
              </div>

              <div className="flex justify-between sm:justify-end items-center gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                <span className="font-black text-slate-800 dark:text-white text-sm">₹{food.price}</span>
                <button 
                  onClick={() => alert(`${food.name} macro profile item tracked down to cart!`)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md"
                >
                  ADD CLEAN FUEL
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <p className="text-slate-400 text-sm italic text-center py-6">Ceiling budget strict ho gya! Targets parameters thoda loose karke re-evaluate karo.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MacroDashboard;