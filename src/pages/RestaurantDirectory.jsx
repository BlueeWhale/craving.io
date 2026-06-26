import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Search, SlidersHorizontal } from 'lucide-react';
import axios from 'axios';
import Skeleton from '../components/common/Skeleton';

const categories = ['All', 'Pizza', 'Burgers', 'Healthy', 'Dessert', 'Biryani', 'Asian'];

const RestaurantDirectory = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/restaurants');
        setRestaurants(res.data.data || []);
      } catch (err) {
        console.error("Failed fetching directory:", err);
        // Fallback mocked infrastructure metrics if local system is sandbox isolated
        setRestaurants([
          { _id: 'res_1', name: 'The Truffle Crust Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500', rating: 4.8, distance: '1.2 km', category: 'Pizza', tags: ['Premium', 'Italian'] },
          { _id: 'res_2', name: 'Lean Protein Lab', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', rating: 4.5, distance: '2.4 km', category: 'Healthy', tags: ['Salads', 'Keto'] },
          { _id: 'res_3', name: 'Smash & Stack Co.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', rating: 4.2, distance: '3.1 km', category: 'Burgers', tags: ['American', 'Fast Food'] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(res => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Category Slider Carousel */}
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none snap-x">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap snap-clamp ${
              selectedCategory === cat
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                : 'bg-white dark:bg-darkcard border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid List Viewport */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
            <span>Top Picks Near You</span>
            <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">
              {filteredRestaurants.length}
            </span>
          </h2>
          <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-darkcard text-slate-500 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="space-y-3">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            filteredRestaurants.map((res) => (
              <motion.div
                key={res._id}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/restaurant/${res._id}`)}
                className="bg-white dark:bg-darkcard rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800/60 cursor-pointer group transition-all"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={res.image}
                    alt={res.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {res.tags?.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-slate-800 dark:text-white text-base truncate group-hover:text-brand-500 transition">
                    {res.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center text-amber-500 gap-0.5">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{res.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 stroke-[2.5]" />
                      <span>25-30 mins</span>
                    </div>
                    <span>•</span>
                    <span>{res.distance || '1.5 km'}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDirectory;