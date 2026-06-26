import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/common/ProtectedRoute';
import IntroSplash from './components/common/IntroSplash'; // Import the intro screen

// Authentication Pages Import
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Marketplace Core Pages Import
import RestaurantDirectory from './pages/RestaurantDirectory';
import RestaurantDetails from './pages/RestaurantDetails';

// group ordering
import GroupOrderLanding from './pages/GroupOrderLanding';
import GroupOrderRoom from './pages/GroupOrderRoom';

//Recipt
import RecipeVault from './pages/RecipeVault';

//Mystry box
import MysteryBoxPage from './pages/MysteryBoxPage';

//2 new line
import FlashBattleground from './pages/FlashBattleground';
import MacroDashboard from './pages/MacroDashboard';

//mood analysis
import MoodAnalyzer from './pages/MoodAnalyzer';

// cart and checkout
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
const MockView = ({ title }) => (
  <div className="p-6 bg-white dark:bg-darkcard rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 min-h-[50vh] flex items-center justify-center">
    <h2 className="text-xl font-bold text-slate-400 italic">{title} Sandbox Content Area</h2>
  </div>
);

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // Track Intro Animation state

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

                                  // 2. Locate the routing map table block and replace the old placeholders:
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />

                  //makeing group order router
                  <Route path="/group-order" element={<GroupOrderLanding />} />
                  <Route path="/group-order/:roomCode" element={<GroupOrderRoom />} />
                  //mood router
                  <Route path="/mood" element={<MoodAnalyzer />} />

                  //Mystry box router
                  <Route path="/mystery-box" element={<MysteryBoxPage />} />
                  <Route path="/flash-deals" element={<FlashBattleground />} />
                  <Route path="/macros" element={<MacroDashboard />} />
                  {/* Protected Consumer Routes */}
                  <Route path="/mood" element={<ProtectedRoute><MockView title="Food Mood Analyzer Matrix" /></ProtectedRoute>} />
                  <Route path="/mystery-box" element={<ProtectedRoute><MockView title="Mystery Box Engine" /></ProtectedRoute>} />
                  
                  <Route path="/profile" element={<ProtectedRoute><MockView title="User Profile Hub & Badges" /></ProtectedRoute>} />
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