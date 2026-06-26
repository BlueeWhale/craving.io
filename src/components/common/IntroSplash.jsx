import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, MapPin, Utensils } from 'lucide-react';

const IntroSplash = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Synchronized timeout engine set for 4 seconds of smooth transitions
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-slate-50 overflow-hidden"
        >
          {/* Main Visual Animation Container Stage */}
          <div className="relative w-full max-w-md h-64 flex flex-col items-center justify-center">
            
            {/* 1. Concentric Background Ripple Lines */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: i === 0 ? 0.3 : 0.15, scale: 0.2 }}
                animate={{ opacity: 0, scale: 1.8 }}
                transition={{
                  duration: 1.8,
                  ease: 'easeOut',
                  repeat: 1,
                  delay: i * 0.6,
                }}
                className="absolute border-2 border-rose-500/30 rounded-full h-48 w-48 pointer-events-none"
              />
            ))}

            {/* 2. The Path Tracker & Motorcycle Vector Frame */}
            <div className="w-full relative h-16 flex items-center justify-center mb-6">
              
              {/* Dynamic Underlying Track */}
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: ['0%', '80%', '0%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, times: [0, 0.5, 1], ease: 'easeInOut' }}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent"
              />

              {/* Rolling Bike Phase */}
              <motion.div
                initial={{ x: '-60%', scale: 0.6, opacity: 0 }}
                animate={{ 
                  x: ['-60%', '0%', '60%'], 
                  scale: [0.7, 1.1, 0.7], 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 2.2, 
                  times: [0, 0.5, 1],
                  ease: 'easeInOut' 
                }}
                className="absolute text-rose-500 z-20"
              >
                {/* Micro-vibration ride bounce layer */}
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.15, ease: 'linear' }}
                  className="bg-white border-2 border-rose-100 shadow-lg shadow-rose-500/10 p-3 rounded-full"
                >
                  <Bike className="h-7 w-7 stroke-[2.5]" />
                </motion.div>
              </motion.div>

              {/* 3. Centered Pin Drop Morphing Target */}
              <motion.div
                initial={{ scale: 0, y: -40, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], y: 0, opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.5, type: 'spring', stiffness: 120 }}
                className="absolute text-rose-500 z-10"
              >
                <div className="bg-rose-500 text-white p-3 rounded-full shadow-lg shadow-rose-500/20">
                  <MapPin className="h-6 w-6 fill-current animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* 4. Elegant Minimal Brand Slate Reveal */}
            <div className="overflow-hidden h-14 flex items-center justify-center mt-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 2.6, 
                  duration: 0.6, 
                  ease: [0.215, 0.610, 0.355, 1.000] // Premium cubic out curve
                }}
                className="flex items-center space-x-2 text-slate-900 font-black text-3xl tracking-tight"
              >
                <Utensils className="h-7 w-7 text-rose-500 stroke-[2.5]" />
                <span>
                  Craving<span className="text-rose-500">.io</span>
                </span>
              </motion.div>
            </div>

            {/* Micro loading progress line element */}
            <div className="w-24 bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ delay: 2.6, duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
                className="w-1/2 h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSplash;