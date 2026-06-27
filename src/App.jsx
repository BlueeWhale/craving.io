import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/common/ProtectedRoute';
import IntroSplash from './components/common/IntroSplash'; 

// Authentication Pages Import
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Marketplace Core Pages Import
import RestaurantDirectory from './pages/RestaurantDirectory';
import RestaurantDetails from './pages/RestaurantDetails';

// Client Dashboard Hub
import ClientDashboard from './pages/ClientDashboard'; 

// User Profile Vault
import Profile from './pages/Profile'; // <-- REAL PROFILE PAGE MOUNTED HERE

// Group Ordering
import GroupOrderLanding from './pages/GroupOrderLanding';
import GroupOrderRoom from './pages/GroupOrderRoom';

// Recipes
import RecipeVault from './pages/RecipeVault';

// Mystery Box
import MysteryBoxPage from './pages/MysteryBoxPage';

// Gamified & Strategic Features
import FlashBattleground from './pages/FlashBattleground';
import MacroDashboard from './pages/MacroDashboard';

// Mood Analysis
import MoodAnalyzer from './pages/MoodAnalyzer';

// Cart and Checkout
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const MockView = ({ title }) => (
  <div className="p-6 bg-white dark:bg-darkcard rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 min-h-[50vh] flex items-center justify-center">
    <h2 className="text-xl font-bold text-slate-400 italic">{title} Sandbox Content Area</h2>
  </div>
);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true); 

  return (
    <>
      {/* Run intro splash animation layer */}
      <IntroSplash onComplete={() => setShowIntro(false)} />

      {!showIntro && (
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-darkbg text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:pl-64 min-h-[calc(100vh-4rem)]">
              <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <Routes>
                  {/* Unprotected Public Marketplace & Auth Routes */}
                  <Route path="/" element={<RestaurantDirectory />} />
                  <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />

                  {/* Client Portal Interfaces */}
                  <Route path="/dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
                  <Route path="/profile" element={<Profile />} /> {/* <-- LINKED REAL PROFILE FORM */}

                  {/* Specialized Lifecycle Gateways */}
                  <Route path="/group-order" element={<ProtectedRoute><GroupOrderLanding /></ProtectedRoute>} />
                  <Route path="/group-order/:roomCode" element={<ProtectedRoute><GroupOrderRoom /></ProtectedRoute>} />
                  <Route path="/mood" element={<ProtectedRoute><MoodAnalyzer /></ProtectedRoute>} />
                  <Route path="/mystery-box" element={<ProtectedRoute><MysteryBoxPage /></ProtectedRoute>} />
                  <Route path="/flash-deals" element={<ProtectedRoute><FlashBattleground /></ProtectedRoute>} />
                  <Route path="/macros" element={<ProtectedRoute><MacroDashboard /></ProtectedRoute>} />
                  <Route path="/recipes" element={<RecipeVault />} />
                  
                  {/* Protected Specialized Partner Dashboards */}
                  <Route path="/merchant/dashboard" element={
                    <ProtectedRoute allowedRoles={['Restaurant Owner', 'Admin']}>
                      <MockView title="Restaurant Partner Administration Panel" />
                    </ProtectedRoute>
                  } />
                </Routes>
              </div>
            </main>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;