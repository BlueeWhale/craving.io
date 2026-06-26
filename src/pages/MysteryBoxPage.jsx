import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, HelpCircle, Flame, Star, ShoppingCart, Sparkles } from 'lucide-react';
import axios from 'axios';

const budgetTiers = [
  { amount: 199, label: 'Budget Snack Pack', badge: 'Casual 🍿' },
  { amount: 299, label: 'Hunger Buster Box', badge: 'Popular 🔥' },
  { amount: 499, label: 'Premium Feast Tray', badge: 'Gourmet ✨' },
  { amount: 999, label: 'Luxury Grand Platter', badge: 'Elite 👑' },
];

const MysteryBoxPage = () => {
  const [selectedBudget, setSelectedBudget] = useState(299);
  const [boxData, setBoxData] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [error, setError] = useState('');

  const fetchMysteryBox = async () => {
    setIsRevealing(true);
    setBoxData(null);
    setError('');

    try {
      // Backend api endpoint to generate box combinations
      const response = await axios.post('/features/mystery-box', { 
        budget: selectedBudget,
        restaurantId: '60d5ec49f1ad5c22c0e86b45' 
      });
      
      // Suspense aur thrill fill karne ke liye deliberate delay loop simulation
      setTimeout(() => {
        setBoxData(response.data.mysteryBox);
        setIsRevealing(false);
      }, 2400);

    } catch (err) {
      console.warn("API Down! Sandbox visualization activation loop.");
      
      // Sandbox fallback data generation
      setTimeout(() => {
        const mockResponses = {
          199: { title: "Chef's Surprise Snack Box", estimatedValue: 220, items: [{ name: "Peri Peri Loaded Fries", price: 120 }, { name: "Cold Brew Mint Coffee", price: 100 }] },
          299: { title: "Smash Burger Surprise Duo", estimatedValue: 340, items: [{ name: "Double Cheese Smash Burger", price: 210 }, { name: "Crispy Onion Rings", price: 80 }, { name: "Coke Zero Sugar", price: 50 }] },
          499: { title: "Premium Italian Fusion Box", estimatedValue: 530, items: [{ name: "Woodfired Truffle Mushroom Pizza", price: 380 }, { name: "Garlic Breadsticks w/ Cheese Dip", price: 150 }] },
          999: { title: "Imperial Asian Banquet Bundle", estimatedValue: 1120, items: [{ name: "Exotic Pan-Fried Dimsums (6pc)", price: 320 }, { name: "Chili Garlic Hibachi Noodles", price: 350 }, { name: "Schezwan Prawns Bowl", price: 450 }] },
        };
        
        setBoxData(mockResponses[selectedBudget]);
        setIsRevealing(false);
      }, 2400);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      
      {/* Platform Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider rounded-full mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Gamified Food Drops</span>
        </div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-white sm:text-4xl">
          Gourmet <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">Mystery Box</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Confused ho kya khana hai? Apna budget choose karo aur humare chef ko aapke liye surprise cook karne do!
        </p>
      </div>

      {/* Pricing Tier Grid Workspace */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {budgetTiers.map((tier) => {
          const isSelected = selectedBudget === tier.amount;
          return (
            <motion.div
              key={tier.amount}
              whileHover={{ y: isRevealing ? 0 : -3 }}
              onClick={() => !isRevealing && setSelectedBudget(tier.amount)}
              className={`p-5 rounded-2xl border cursor-pointer relative transition-all duration-200 ${
                isSelected 
                  ? 'border-amber-500 bg-amber-500/5 dark:bg-amber-500/10 shadow-md shadow-amber-500/5' 
                  : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-darkcard hover:border-slate-300'
              } ${isRevealing ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div className="absolute top-3 right-3 text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md">
                {tier.badge}
              </div>
              <span className="text-2xl font-black text-slate-800 dark:text-white font-mono block mt-2">₹{tier.amount}</span>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-1">{tier.label}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Animation Stage & Reveal Console Display */}
      <div className="flex flex-col items-center justify-center bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xs min-h-[340px] relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          
          {/* State 1: Box Shaking Animation Loop */}
          {isRevealing && (
            <motion.div
              key="shaking-box"
              animate={{ 
                rotate: [0, -8, 8, -8, 8, 0],
                scale: [1, 1.05, 1] 
              }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
              className="text-8xl select-none filter drop-shadow-xl"
            >
              🎁
            </motion.div>
          )}

          {/* State 2: Idle Waiting Vector */}
          {!isRevealing && !boxData && (
            <motion.div 
              key="idle-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-6"
            >
              <div className="text-8xl select-none animate-bounce">📦</div>
              <button
                onClick={fetchMysteryBox}
                className="bg-gradient-to-r from-amber-500 to-rose-500 hover:brightness-105 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg shadow-rose-500/10 transition"
              >
                Unlock Surprise Package
              </button>
            </motion.div>
          )}

          {/* State 3: Content Reveal Dashboard */}
          {!isRevealing && boxData && (
            <motion.div
              key="revealed-box"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full max-w-md space-y-5 text-center"
            >
              <div className="text-5xl select-none">✨🎉</div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-800 dark:text-white">{boxData.title}</h3>
                <p className="text-xs text-emerald-500 font-bold">Yield Value Pack: ~₹{boxData.estimatedValue}</p>
              </div>

              {/* Items Breakdown list inside mystery set */}
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-left divide-y divide-slate-100 dark:divide-slate-800">
                {boxData.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs font-medium py-2.5 first:pt-0 last:pb-0">
                    <span className="text-slate-700 dark:text-slate-300">🔎 {item.name}</span>
                    <span className="font-bold text-slate-500 dark:text-slate-400">₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => { setBoxData(null); }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs py-3 rounded-xl transition"
                >
                  Try Another Budget
                </button>
                <button 
                  onClick={() => alert('Mystery Box bundle pushed directly to core order processing cart!')}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>ADD TO CART</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
};

export default MysteryBoxPage;