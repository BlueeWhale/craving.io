import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus, ArrowRight, Link } from 'lucide-react';

const GroupOrderLanding = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    // Generate a random high-visibility room alpha-code (e.g., FOOD-8932)
    const generatedCode = `FOOD-${Math.floor(1000 + Math.random() * 9000)}`;
    navigate(`/group-order/${generatedCode}`);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomCode.trim()) {
      navigate(`/group-order/${roomCode.toUpperCase().trim()}`);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-[65vh] flex flex-col justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-darkcard p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-6"
      >
        <div className="h-14 w-14 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100 dark:border-indigo-900/30">
          <Users className="h-7 w-7" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Group Ordering</h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Pool orders with your crew in real-time and let our engine automatically compute the individual bill splits.
          </p>
        </div>

        {/* Action 1: Spawn a Brand New Room */}
        <button
          onClick={handleCreateRoom}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 text-sm"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Create New Room Code</span>
        </button>

        <div className="relative flex py-2 items-center text-xs text-slate-300 dark:text-slate-700 uppercase font-bold">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-3 text-slate-400">Or Join Active Session</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Action 2: Input Form to join existing token */}
        <form onSubmit={handleJoinRoom} className="flex gap-2">
          <div className="relative flex items-center flex-1">
            <Link className="absolute left-3 text-slate-400 h-4 w-4" />
            <input
              type="text"
              required
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="e.g., FOOD-1234"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm font-mono font-bold uppercase text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white p-3 rounded-xl transition"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default GroupOrderLanding;