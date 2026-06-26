import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Moon, Sun, User, Menu, Utensils, LogOut } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
  const { cartItemCount, cartTotal } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-darkcard/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity & Toggle Trigger */}
        <div className="flex items-center space-x-4">
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

        {/* Right: Functional Control Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Shift Utility */}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition"
            aria-label="Toggle Theme Mode"
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

          {/* Profile Actions Container */}
          {user ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-700">
              <Link to="/profile" className="hidden md:block text-right">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{user.name}</p>
                <p className="text-[10px] font-semibold text-brand-500 uppercase tracking-wider">{user.role}</p>
              </Link>
              <button 
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
                title="Log Out Profile"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition duration-150"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;