import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Search, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Skeleton from '../components/common/Skeleton';
import { CartContext } from '../context/CartContext';

// 1. UPDATED CATEGORIES DATA WITH DIET TYPE TAGS
const categoriesData = [
  { id: 'All', name: 'All Dishes', desc: 'Curated Picks', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=250&auto=format&fit=crop&q=80', type: 'both' },
  { id: 'Pizza', name: 'Pizza Hub', desc: 'Cheesy Crusts', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=250&auto=format&fit=crop&q=80', type: 'both' }, // Pizza me veg/non-veg dono milte hain
  { id: 'Burgers', name: 'Burgers', desc: 'Smash Stacks', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=250&auto=format&fit=crop&q=80', type: 'both' },
  { id: 'Healthy', name: 'Diet Lab', desc: 'Keto Clean', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=250&auto=format&fit=crop&q=80', type: 'veg' }, // Explicitly Veg
  { id: 'Dessert', name: 'Desserts', desc: 'Sugar Vault', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=250&auto=format&fit=crop&q=80', type: 'veg' }, // Explicitly Veg
  { id: 'Biryani', name: 'Biryani', desc: 'Royal Spices', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=250&auto=format&fit=crop&q=80', type: 'non-veg' }, // Explicitly Non-Veg
  { id: 'Asian', name: 'Asian Fine', desc: 'Wok Wonders', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=250&auto=format&fit=crop&q=80', type: 'non-veg' } // Explicitly Non-Veg
];

const RestaurantDirectory = () => {
  const navigate = useNavigate();
  const { dietPreference } = useContext(CartContext);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const currentPref = (dietPreference || 'Both').toLowerCase();

  useEffect(() => {
    let isMounted = true;
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/restaurants');
        if (isMounted) setRestaurants(res.data.data || []);
      } catch (err) {
        console.error("Failed fetching directory:", err);
        if (isMounted) {
          setRestaurants([
            { _id: 'res_1', name: 'The Truffle Crust Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500', rating: 4.8, distance: '1.2 km', category: 'Pizza', tags: ['Premium', 'Italian', 'Veg'] },
            { _id: 'res_2', name: 'Lean Protein Lab', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', rating: 4.5, distance: '2.4 km', category: 'Healthy', tags: ['Salads', 'Keto', 'Veg'] },
            { _id: 'res_3', name: 'Smash & Stack Co. Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', rating: 4.2, distance: '3.1 km', category: 'Burgers', tags: ['American', 'Fast Food', 'Non-Veg'] },
            { _id: 'res_4', name: 'Crispy Chicken Pop Hub', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500', rating: 4.3, distance: '1.9 km', category: 'Burgers', tags: ['Poultry', 'Fast Food', 'Non-Veg'] }
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRestaurants();
    return () => { isMounted = false; };
  }, []);

  // 2. DYNAMICALLY FILTER THE EXPANDED PORTALS LIST BASED ON SLIDER STATE
  const filteredCategories = useMemo(() => {
    return categoriesData.filter(cat => {
      if (currentPref === 'both') return true;
      return cat.type === 'both' || cat.type === currentPref;
    });
  }, [currentPref]);

  // Handle auto reset of selected category if it gets hidden by slider changes
  useEffect(() => {
    const isStillVisible = filteredCategories.some(c => c.id === selectedCategory);
    if (!isStillVisible) {
      setSelectedCategory('All');
    }
  }, [filteredCategories, selectedCategory]);

  // PERFORMANCE OPTIMIZATION: Memoized Filtered Results for Restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(res => {
      const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
      const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDiet = currentPref === 'both' || 
        (currentPref === 'veg' && res.tags?.some(t => t.toLowerCase() === 'veg')) || 
        (currentPref === 'non-veg' && res.tags?.some(t => t.toLowerCase() === 'non-veg'));

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [restaurants, selectedCategory, searchQuery, currentPref]);

  return (
    <div className="space-y-8 p-1 animate-in fade-in duration-300">
      {/* BANNER WITH SEARCH */}
      <div className="relative h-60 md:h-72 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80" 
          alt="Premium Food Banner" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 z-10">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-sm">
              Satisfy Your Deepest Cravings
            </h1>
            <p className="text-xs md:text-sm text-slate-200 font-medium max-w-md">
              Discover the elite kitchens, signature recipes, and lightning-fast deliveries near you.
            </p>
          </div>

          <div className="w-full max-w-md bg-white/10 dark:bg-slate-900/20 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-xl flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
              <input 
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for restaurants, dishes, or cuisines..."
                className="w-full bg-white/10 dark:bg-black/20 text-white placeholder-white/60 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none border border-white/10 focus:border-brand-400 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* PORTAL CAROUSEL (NOW COMPLETELY DYNAMIC) */}
      <div className="space-y-2">
        <div className="px-1 flex justify-between items-center">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Explore Flavor Portals</h3>
          <span className="text-[10px] font-bold text-brand-500 flex items-center gap-1 animate-pulse select-none">
            Swipe Right <ArrowRight className="h-3 w-3" />
          </span>
        </div>

        {/* 3. SWITCH RENDER MATRIX TO USE FILTERED CATEGORIES EXCLUSIVELY */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory pt-2 px-1 min-h-[210px]">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileTap={{ scale: 0.96 }} 
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex-none w-36 h-48 rounded-2xl overflow-hidden shadow-md snap-start group transition-all duration-300 border-2
                    ${isSelected ? 'border-brand-500 ring-4 ring-brand-500/15 scale-[1.01] z-10 shadow-lg' : 'border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600'}`}
                >
                  <img 
                    src={cat.image} alt={cat.name} 
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105
                      ${isSelected ? 'brightness-90 filter-none' : 'brightness-75 saturate-[0.85] dark:saturate-75'}`}
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-300 ${isSelected ? 'from-slate-950/85 via-slate-950/40 to-transparent' : 'from-slate-950/90 via-slate-950/60 to-black/10'}`} />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-left flex flex-col justify-end space-y-0.5 z-10">
                    <span className={`text-[9px] font-mono uppercase tracking-widest font-bold transition-colors ${isSelected ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-300'}`}>{cat.desc}</span>
                    <h4 className="text-sm font-black text-white tracking-tight leading-tight drop-shadow-md">{cat.name}</h4>
                    {isSelected && (
                      <motion.div layoutId="activeGlowStrip" className="h-1 w-8 bg-brand-500 rounded-full mt-1.5" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* RESTAURANT LIST VIEWPORT */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <span>Top Picks Near You</span>
            <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">
              {loading ? '...' : filteredRestaurants.length}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[250px]">
          {loading ? (
            Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="space-y-3">
                <Skeleton className="aspect-video w-full rounded-2xl" />
                <Skeleton className="h-5 w-2/3 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>
            ))
          ) : filteredRestaurants.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {filteredRestaurants.map((res) => (
                <motion.div
                  key={res._id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  whileHover={{ y: -4 }} 
                  onClick={() => navigate(`/restaurant/${res._id}`)}
                  className="bg-white dark:bg-darkcard rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800/60 cursor-pointer group transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {res.tags?.map((tag, i) => (
                        <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow-xs ${
                          tag.toLowerCase() === 'veg' ? 'bg-emerald-500/90 text-white' : tag.toLowerCase() === 'non-veg' ? 'bg-rose-500/90 text-white' : 'bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-slate-800 dark:text-white text-base truncate group-hover:text-brand-500 transition">{res.name}</h3>
                    <div className="flex items-center space-x-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <div className="flex items-center text-amber-500 gap-0.5"><Star className="h-3.5 w-3.5 fill-current" /><span>{res.rating}</span></div>
                      <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 stroke-[2.5]" /><span>25-30 mins</span></div>
                      <span>•</span><span>{res.distance || '1.5 km'}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-12 text-center text-sm font-bold text-slate-400 italic bg-white dark:bg-darkcard rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center"
            >
              Is selection preference ke liye koi kitchen node available nahi hai!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDirectory;