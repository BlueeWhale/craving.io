import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Frown, BatteryCharging, Dumbbell, PartyPopper, BookOpen, Star, ShoppingBag, ShoppingCart } from 'lucide-react';
import axios from 'axios';

const moodList = [
  { id: 'Happy', label: 'Happy', emoji: '🥳', icon: Smile, color: 'from-amber-400 to-orange-500' },
  { id: 'Sad', label: 'Sad', emoji: '🥺', icon: Frown, color: 'from-blue-400 to-indigo-600' },
  { id: 'Tired', label: 'Tired', emoji: '🥱', icon: BatteryCharging, color: 'from-purple-500 to-slate-700' },
  { id: 'Gym Mode', label: 'Gym Mode', emoji: '💪', icon: Dumbbell, color: 'from-emerald-400 to-teal-600' },
  { id: 'Party Mode', label: 'Party Mode', emoji: '💃', icon: PartyPopper, color: 'from-rose-400 to-pink-600' },
  { id: 'Study Mode', label: 'Study Mode', emoji: '🧠', icon: BookOpen, color: 'from-cyan-400 to-blue-500' },
];

const MoodAnalyzer = () => {
  const [activeMood, setActiveMood] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async (moodId) => {
    setActiveMood(moodId);
    setLoading(true);
    setRecommendations([]);

    try {
      // Backend API Matrix hit engine line
      const response = await axios.get(`/features/mood-recommendations?mood=${moodId}`);
      setRecommendations(response.data.data || []);
    } catch (err) {
      console.warn("API Offline! Sandbox mock response compile kar rha hu.");
      
      // Sandbox Mode: Agar backend local system pe link nhi hai, toh ye dummy items dikhenge
      setTimeout(() => {
        const mockData = {
          'Happy': [
            { _id: 'm1', name: 'Triple Chocolate Belgian Waffle', price: 249, restaurant: 'The Dessert Vault', rating: 4.8 },
            { _id: 'm2', name: 'Loaded Overload Cheese Pizza', price: 399, restaurant: 'Pizzeria Hub', rating: 4.6 }
          ],
          'Sad': [
            { _id: 'm3', name: 'Gourmet Mac & Cheese Bowl', price: 199, restaurant: 'Comfort Kitchen', rating: 4.5 },
            { _id: 'm4', name: 'Classic Mud Cake with Ice Cream', price: 149, restaurant: 'Sweet Cravings', rating: 4.7 }
          ],
          'Gym Mode': [
            { _id: 'm5', name: 'High-Protein Grilled Chicken Bowl', price: 299, restaurant: 'The Fit Fuel Co.', rating: 4.9 },
            { _id: 'm6', name: 'Avocado Quinoa Green Salad', price: 249, restaurant: 'Lean & Clean Cafe', rating: 4.4 }
          ],
        };
        setRecommendations(mockData[moodId] || [
          { _id: 'm7', name: 'Chef Special Paneer Club Sandwich', price: 179, restaurant: 'Bites & Beans', rating: 4.3 }
        ]);
        setLoading(false);
      }, 1000);
    } finally {
      if (!loading) setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white sm:text-4xl">
          Food Mood <span className="text-brand-500">Analyzer</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Abhi kaisa feel ho raha hai? Apne current mood pe tap karo aur hamara AI system khana dhund ke dega!
        </p>
      </div>

      {/* Mood Selector Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {moodList.map((mood) => {
          const MoodIcon = mood.icon;
          const isSelected = activeMood === mood.id;

          return (
            <motion.div
              key={mood.id}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fetchRecommendations(mood.id)}
              className={`p-5 rounded-2xl border text-center cursor-pointer relative overflow-hidden transition-all duration-200 ${
                isSelected 
                  ? `bg-gradient-to-br ${mood.color} text-white shadow-lg border-transparent` 
                  : 'bg-white dark:bg-darkcard border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className={`p-3 rounded-xl mx-auto w-fit mb-3 ${isSelected ? 'bg-white/20' : 'bg-slate-50 dark:bg-slate-900'}`}>
                <MoodIcon className="h-6 w-6 stroke-[2.2]" />
              </div>
              <span className="text-sm font-bold block">{mood.label}</span>
              <span className="text-xs opacity-60 mt-1 block">{mood.emoji}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Recommended Items Core Dashboard Shell */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-slate-800 dark:text-white border-b pb-2 dark:border-slate-800">
          {activeMood ? `AI Recommended Items for "${activeMood}" mood` : 'Select a mood to reveal menu items'}
        </h2>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="h-8 w-8 border-4 border-slate-200 border-t-brand-500 rounded-full animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {recommendations.map((food) => (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-darkcard p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex justify-between items-center gap-4 shadow-xs"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-base">{food.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{food.restaurant?.name || food.restaurant}</p>
                  
                  <div className="flex items-center space-x-3 pt-1 text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-200">₹{food.price}</span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="text-amber-500 flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-current" /> {food.rating}
                    </span>
                  </div>
                </div>

                <button 
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-brand-500 dark:hover:bg-brand-600 text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-1.5"
                  onClick={() => alert(`${food.name} has been added to checkout routing matrix tray!`)}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>ADD</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!loading && activeMood && recommendations.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-8 italic">Is mood ke liye kuch items catalog me add karne honge.</p>
        )}
      </div>

    </div>
  );
};

export default MoodAnalyzer;