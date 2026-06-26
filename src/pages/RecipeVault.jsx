import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Clock, ChefHat, Lock, Unlock, Flame, Award } from 'lucide-react';
import axios from 'axios';

const mockAchievements = [
  { id: 'Pizza Collector', title: 'Pizza Collector', desc: 'Unlocked 3 premium artisanal woodfired pizza formulations.', icon: Flame, unlocked: true, color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
  { id: 'Burger Expert', title: 'Burger Expert', desc: 'Order high-stack smash burgers from local partner kitchens.', icon: Trophy, unlocked: true, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
  { id: 'Street Food Explorer', title: 'Street Food Explorer', desc: 'Taste secret spices from verified street corners.', icon: ChefHat, unlocked: false, color: 'text-slate-400 bg-slate-100 dark:bg-slate-800' },
];

const mockRecipes = [
  { _id: 'r1', name: 'Burrata Blossom Charcoal Crust', difficulty: 'Hard', cookingTime: '45 mins', locked: false, ingredients: ['High Hydration Flour', 'Active Charcoal Powder', 'Fresh Burrata Cheese', 'Truffle Glaze Drops'], steps: ['Prepare high hydration charcoal dough.', 'Cold ferment for 48 hours.', 'Bake at 450°C.', 'Top fresh burrata immediately post-bake.'] },
  { _id: 'r2', name: 'Smash Avocado Wagyu Stack', difficulty: 'Medium', cookingTime: '20 mins', locked: false, ingredients: ['Wagyu Beef Patty', 'Brioche Bun', 'Ripe Avocado', 'Smoky Chipotle Sauce'], steps: ['Smash patty thin on high iron griddle.', 'Toast brioche with premium butter.', 'Layer freshly smashed seasoned avocado sauce.'] },
  { _id: 'r3', name: 'Spicy Tangy Street-side Golgappa Panipuri', difficulty: 'Easy', cookingTime: '15 mins', locked: true, ingredients: ['Locked Parameter', 'Locked Parameter'], steps: ['Order local street food combo packages to securely decipher this item card formulation sequence.'] },
];

const RecipeVault = () => {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [activeRecipe, setActiveRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/features/unlocked-recipes');
        if (response.data.success) {
          // Live production override syncing sequence
        }
      } catch (err) {
        console.log("Sandbox active mode running.");
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-2">
      
      {/* Dynamic Header Metrics Dashboard Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-rose-500" />
            <span>Gourmet Recipe Vault</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Orders complete karke verified kitchen files unlock karo aur culinary achievements badhao!
          </p>
        </div>
        
        {/* Simple Progress Box */}
        <div className="bg-white dark:bg-darkcard border px-5 py-3 rounded-2xl flex items-center gap-4 border-slate-100 dark:border-slate-800 shadow-xs">
          <div className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 flex items-center justify-center font-black">
            2/3
          </div>
          <div className="text-xs">
            <span className="font-bold text-slate-800 dark:text-white block">Unlocked Rate</span>
            <span className="text-slate-400 font-medium">Keep ordering to reveal all items</span>
          </div>
        </div>
      </div>

      {/* Gamified Badges Tracker Grid Panel */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block items-center gap-1">
          <Award className="h-4 w-4" />
          <span>Profile Collection Milestones</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockAchievements.map((badge) => {
            const BadgeIcon = badge.icon;
            return (
              <div 
                key={badge.id}
                className={`p-4 rounded-2xl border flex gap-3 items-start transition-all ${badge.color} ${!badge.unlocked ? 'opacity-50 grayscale' : ''}`}
              >
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 shrink-0 shadow-xs">
                  <BadgeIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-1.5">
                    <span>{badge.title}</span>
                    {badge.unlocked && <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded">EARNED</span>}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Split Interface Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Recipe Cards Directory */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-base font-black text-slate-800 dark:text-white">Unlocked Formulations</h3>
          {recipes.map((item) => (
            <div
              key={item._id}
              onClick={() => !item.locked && setActiveRecipe(item)}
              className={`p-4 rounded-2xl border transition-all text-left ${
                item.locked 
                  ? 'bg-slate-50/50 dark:bg-darkcard/40 border-slate-100 dark:border-slate-800/40 cursor-not-allowed' 
                  : `bg-white dark:bg-darkcard cursor-pointer ${activeRecipe?._id === item._id ? 'border-rose-500 ring-2 ring-rose-500/5' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'}`
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className={`font-bold text-sm ${item.locked ? 'text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                  {item.name}
                </h4>
                {item.locked ? <Lock className="h-4 w-4 text-slate-400" /> : <Unlock className="h-4 w-4 text-rose-500" />}
              </div>

              {!item.locked && (
                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 mt-3">
                  <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {item.cookingTime}</span>
                  <span>•</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{item.difficulty}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side: Detailed Canvas Review Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeRecipe ? (
              <motion.div
                key={activeRecipe._id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="bg-white dark:bg-darkcard p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6 shadow-xs"
              >
                <div>
                  <h2 className="text-xl font-black text-slate-800 dark:text-white">{activeRecipe.name} Formulations File</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Verified secret item blueprint curated by partner restaurant chefs.</p>
                </div>

                {/* Ingredients layout blocks */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ingredients List</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeRecipe.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs font-bold bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                        ✔ {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Incremental Steps sequence checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Preparation Timeline Instructions</h4>
                  <ol className="space-y-2.5 text-sm">
                    {activeRecipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        <span className="font-mono font-black text-rose-500 shrink-0">{i+1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </motion.div>
            ) : (
              <div className="bg-slate-50/50 dark:bg-darkcard/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400 italic text-sm h-full flex items-center justify-center min-h-[300px]">
                Left list me se kisi bhi unlocked file card par tap karke ingredients and secret recipe metrics check karo!
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};

export default RecipeVault;