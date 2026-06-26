import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Copy, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import io from 'socket.io-client';

// Establish fallback link hook targeting backend parameters
const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');

const GroupOrderRoom = () => {
  const { roomCode } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user && roomCode) {
      // Connect to Socket room channels
      socket.emit('joinGroupRoom', { roomCode, user });

      socket.on('roomUpdated', (updatedGroup) => {
        setRoomData(updatedGroup);
      });
    }

    return () => {
      socket.off('roomUpdated');
    };
  }, [roomCode, user]);

  const copyLink = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compute bill segments grouping item valuations by user names
  const getSplitBreakdown = () => {
    if (!roomData || !roomData.cartItems) {
      // Sandbox fallback data model if socket server is isolated
      return {
        [user?.name || 'Rishab']: 350,
        'Aman': 300,
        'Rahul': 350
      };
    }
    return roomData.cartItems.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + item.price;
      return acc;
    }, {});
  };

  const breakdowns = getSplitBreakdown();
  const grossTotal = Object.values(breakdowns).reduce((a, b) => a + b, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Shared Basket Viewport Column */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex flex-wrap justify-between items-start gap-2 border-b pb-4 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block bg-indigo-50 dark:bg-indigo-950/30 w-fit px-2.5 py-0.5 rounded-md mb-1.5">
              Live Session Active
            </span>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">Shared Cart Terminal</h1>
          </div>

          {/* Copy Share Code Widget */}
          <button 
            onClick={copyLink}
            className="flex items-center space-x-2 text-xs font-bold bg-white dark:bg-darkcard border px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition shadow-xs"
          >
            <span className="font-mono text-slate-900 dark:text-white">{roomCode}</span>
            {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Members Status Chips Container */}
        <div className="flex flex-wrap gap-2 items-center text-xs font-bold text-slate-400">
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <Users className="h-4 w-4 text-indigo-500" />
            <span>Active Order Crew:</span>
          </div>
          {roomData?.members ? (
            roomData.members.map((m, idx) => (
              <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                ● {m.name}
              </span>
            ))
          ) : (
            ['Rishab (Host)', 'Aman', 'Rahul'].map((name, i) => (
              <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                ● {name}
              </span>
            ))
          )}
        </div>

        {/* Tray Item Cards list */}
        <div className="space-y-3 pt-2">
          {roomData?.cartItems ? (
            roomData.cartItems.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-darkcard p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.name}</h4>
                  <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mt-0.5">Claimed by {item.name}</p>
                </div>
                <span className="font-black text-slate-800 dark:text-white">₹{item.price}</span>
              </div>
            ))
          ) : (
            // Sandbox design preview state
            [
              { name: 'Burrata Truffle Blossom Pizza', user: 'Rishab', price: 350 },
              { name: 'Classic Pepperoni Hot Honey', user: 'Aman', price: 300 },
              { name: 'Smoked Avocado Burger Combo', user: 'Rahul', price: 350 }
            ].map((mockItem, i) => (
              <div key={i} className="bg-white dark:bg-darkcard p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">{mockItem.name}</h4>
                  <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mt-0.5">Claimed by {mockItem.user}</p>
                </div>
                <span className="font-black text-slate-800 dark:text-white">₹{mockItem.price}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bill Splitting Metric Panel Summary Card */}
      <div className="bg-white dark:bg-darkcard p-6 rounded-3xl border border-slate-100 dark:border-slate-800 h-fit space-y-6 shadow-sm lg:mt-12">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-slate-800 dark:text-white">Automated Split Matrix</h3>
          <p className="text-xs text-slate-400">Calculated continuously based on selected items.</p>
        </div>

        <div className="space-y-3 text-sm border-b pb-4 dark:border-slate-800">
          {Object.entries(breakdowns).map(([name, individualTotal]) => (
            <div key={name} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-700 dark:text-slate-300">{name} pays</span>
              <span className="font-black text-slate-900 dark:text-white font-mono">₹{individualTotal}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center font-black text-base dark:text-white px-1">
          <span>Pool Cumulative Total</span>
          <span className="text-2xl text-indigo-600 font-black font-mono">₹{grossTotal}</span>
        </div>

        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 rounded-xl flex items-start text-[11px] font-medium leading-relaxed border border-indigo-100 dark:border-indigo-900/20">
          <AlertCircle className="h-4 w-4 mr-1.5 shrink-0 mt-0.5" />
          <span>Each member's share updates live as items are added or removed. Head to the shared checkout line once everyone finishes adding their selections.</span>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition text-sm flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Add More Food Items</span>
        </button>
      </div>

    </div>
  );
};

export default GroupOrderRoom;