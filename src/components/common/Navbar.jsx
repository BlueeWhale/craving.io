import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Moon, Sun, Menu, Utensils, LogOut } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onToggleSidebar }) => {
  const { cartItemCount, cartTotal, dietPreference, setDietPreference } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const cycleDietPreference = () => {
    if (!setDietPreference) return;
    const current = dietPreference || 'Both';
    if (current === 'Both') setDietPreference('Veg');
    else if (current === 'Veg') setDietPreference('Non-Veg');
    else setDietPreference('Both');
  };

  // Helper properties for premium text scaling & background color syncing
  const currentPreference = dietPreference || 'Both';
  
  const getTrackColor = () => {
    if (currentPreference === 'Veg') return 'bg-emerald-500/15 border-emerald-500/30';
    if (currentPreference === 'Non-Veg') return 'bg-rose-500/15 border-rose-500/30';
    return 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800';
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-darkcard/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Left Side: Brand Identity */}
        <div className="flex items-center space-x-4 shrink-0">
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <Link to="/" className="flex items-center space-x-2 text-brand-500 font-black text-2xl tracking-tight">
            <Utensils className="h-7 w-7 stroke-[2.5]" />
            <span className="hidden sm:inline">Craving.io</span>
          </Link>
        </div>

        {/* Right Side Control Panel */}
        <div className="flex items-center space-x-3 sm:space-x-4 ml-auto shrink-0">
          
          {/* Theme Shift Utility */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition cursor-pointer"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
          </button>

          {/* Checkout Basket Badge */}
          <Link to="/cart" className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-brand-500 transition group flex items-center space-x-1">
            <ShoppingBag className="h-5 w-5 group-hover:scale-105 transition-transform" />
            {cartItemCount > 0 && (
              <>
                <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-black rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
                <span className="hidden md:inline text-xs font-bold text-slate-700 dark:text-slate-300 pl-1">
                  ₹{cartTotal}
                </span>
              </>
            )}
          </Link>

          {/* Profile Actions / Sign In Gate */}
          {user ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-700">
              <Link to="/profile" className="hidden md:block text-right">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                <p className="text-[10px] font-semibold text-brand-500 uppercase tracking-wider">{user.role}</p>
              </Link>
              <button 
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition duration-150 whitespace-nowrap"
            >
              Sign In
            </Link>
          )}

          {/* ==========================================
              EXTREME RIGHT SIDE: ULTRA KINETIC DYNAMIC SLIDING SWITCH 
             ========================================== */}
          <div className="pl-2 border-l border-slate-200 dark:border-slate-700 flex items-center">
            <button
              type="button"
              onClick={cycleDietPreference}
              className={`relative h-8 w-[92px] rounded-full p-1 transition-all duration-300 cursor-pointer focus:outline-none border shadow-inner overflow-hidden ${getTrackColor()}`}
            >
              {/* Elastic Sliding Capsule Wrapper */}
              <motion.div
                className={`h-full rounded-full flex items-center justify-center text-[10px] font-black shadow-md border`}
                style={{ width: '40px' }}
                animate={{
                  x: currentPreference === 'Veg' ? 0 : currentPreference === 'Non-Veg' ? 42 : 21,
                  backgroundColor: currentPreference === 'Veg' ? '#10b981' : currentPreference === 'Non-Veg' ? '#f43f5e' : '#ffffff',
                  borderColor: currentPreference === 'Veg' ? '#059669' : currentPreference === 'Non-Veg' ? '#e11d48' : '#e2e8f0',
                  color: currentPreference === 'Both' ? '#0f172a' : '#ffffff'
                }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              >
                {/* Dynamic Content Fade & Pop Effect inside sliding pill */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPreference}
                    initial={{ opacity: 0, scale: 0.6, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center font-extrabold tracking-tight"
                  >
                    {currentPreference === 'Veg' ? '🥗' : currentPreference === 'Non-Veg' ? '🍗' : 'All'}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;