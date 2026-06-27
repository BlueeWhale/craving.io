import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, Smile, Gift, BookOpen, User, 
  LayoutDashboard, ShieldAlert, X, Compass, Flame, Dumbbell, Utensils 
} from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);

  const baseNavLinks = [
    { name: 'Browse Food', path: '/', icon: Compass },
    { name: 'Flash Deals', path: '/flash-deals', icon: Flame },
    { name: 'Macro Budgeter', path: '/macros', icon: Dumbbell },
    { name: 'User Dashboard', path: '/dashboard', icon: LayoutDashboard, desc: 'Live analytics & tracks' },
    { name: 'Group Orders', path: '/group-order', icon: Users },
    { name: 'Mood Analyzer', path: '/mood', icon: Smile },
    { name: 'Mystery Box', path: '/mystery-box', icon: Gift },
    { name: 'Recipe Vault', path: '/recipes', icon: BookOpen },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  const restaurantLinks = [
    { name: 'Merchant Panel', path: '/merchant/dashboard', icon: LayoutDashboard },
  ];

  const adminLinks = [
    { name: 'System Control', path: '/admin/dashboard', icon: ShieldAlert },
  ];

  const activeStyle = "flex items-center space-x-3 px-4 py-3 rounded-xl bg-brand-50 dark:bg-brand-900/10 text-brand-500 font-bold border-r-4 border-brand-500 transition-all text-sm";
  const idleStyle = "flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-all text-sm font-medium";

  const renderLinkGroup = (links) => (
    <div className="space-y-1">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink 
            key={link.path} 
            to={link.path} 
            onClick={onClose}
            className={({ isActive }) => isActive ? activeStyle : idleStyle}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{link.name}</span>
          </NavLink>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile view backdrop overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs  transition-opacity duration-250"
        />
      )}

      {/* Sidebar Main Frame */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-darkcard border-r border-slate-200 dark:border-slate-800 p-4 transform lg:transform-none lg:opacity-100 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* FIXED MOBILE HEADER SECTION WITH EXPLICIT VISIBILITY */}
        <div className="flex items-center justify-between lg:hidden w-full mb-6 pb-4 border-b border-slate-100 dark:border-slate-800 relative z-55">
          <div className="flex items-center space-x-2 text-brand-500 font-black text-xl tracking-tight">
            <Utensils className="h-5 w-5 stroke-[2.5]" />
            <span>Craving.io</span>
          </div>
          
          {/* THE CLOSE BUTTON - VISIBLE & CLICKABLE */}
          <button 
            onClick={onClose}
            disabled={!isOpen}
            className={`p-2 rounded-xl border transition-all duration-200 focus:outline-none relative z-55
              ${isOpen 
                ? 'bg-rose-50 text-rose-500 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30 opacity-100 scale-100 cursor-pointer block' 
                : 'bg-slate-100 text-slate-400 border-slate-200 opacity-50 scale-95 cursor-not-allowed hidden'
              }`}
            title="Close Sidebar Menu"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Links Navigation Layout */}
        <div className="h-[calc(100%-4rem)] flex flex-col justify-between overflow-y-auto pr-1">
          {/* Desktop view me padding add karne ke liye class logic apply kiya */}
          <div className="space-y-6 lg:pt-16">
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-4 block mb-2">Discovery Hub</span>
              {renderLinkGroup(baseNavLinks)}
            </div>

            {user?.role === 'Restaurant Owner' && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-4 block mb-2">Management</span>
                {renderLinkGroup(restaurantLinks)}
              </div>
            )}

            {user?.role === 'Admin' && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-4 block mb-2">Superuser Command</span>
                {renderLinkGroup(adminLinks)}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400 font-mono">
            Maded by BlueeWahale 2026
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;