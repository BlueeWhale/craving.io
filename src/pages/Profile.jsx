import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, MapPin, Camera, Save, Award, Plus, Trash2, Calendar, PhoneCall, Heart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Form profile states (With extended details)
  const [formData, setFormData] = useState({
    name: user?.name || 'Ankit Sharma',
    email: user?.email || 'ankit.sharma@example.com',
    phone: '+91 98765 43210',
    altPhone: '',
    dob: '2007-08-15', // Default 18-19 age bracket pacing node
    gender: 'Male', // Male, Female, Other
    foodPreference: 'Veg' // Veg, Non-Veg, Both
  });

  // Saved Addresses array mock state
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home 🏠', details: 'Flat 402, Royal Palms, Sector 45, Chandigarh' },
    { id: 2, type: 'Office 🏢', details: 'Tower B, Tech Mahindra Campus, Phase 8, Mohali' }
  ]);

  const [newAddress, setNewAddress] = useState('');
  const [newAddressType, setNewAddressType] = useState('Home');

  // Earned Achievement Badges
  const badges = [
    { id: 'b1', name: 'Fastest Eater', desc: 'Ordered a flash deal within 30 seconds', icon: '⚡' },
    { id: 'b2', name: 'Salad King', desc: 'Completed a 5-day healthy diet streak', icon: '🥗' },
    { id: 'b3', name: 'Elite Member', desc: 'Crossed Gold Tier level status', icon: '👑' },
  ];

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Synchronizing Matrix Payload:", formData);
    alert('Extended profile credentials successfully saved to cloud node database! ✓');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress) return;
    setAddresses([...addresses, { id: Date.now(), type: `${newAddressType} 📍`, details: newAddress }]);
    setNewAddress('');
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Account Vault & Identity</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT CARD: Avatar & Badges Showcase */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 p-6 rounded-3xl text-center shadow-xs space-y-4">
            <div className="relative w-24 h-24 mx-auto group">
              <div className="w-full h-full bg-brand-500 rounded-3xl flex items-center justify-center font-black text-2xl text-white shadow-md">
                {formData.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-white rounded-xl border-2 border-white dark:border-darkcard hover:scale-105 transition">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <h3 className="font-black text-slate-800 dark:text-white text-base">{formData.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Gold Gourmet Client</p>
            </div>
          </div>

          {/* Earned Badges Showcase */}
          <div className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Unlocked Medals</span>
            </h3>
            <div className="space-y-2">
              {badges.map(badge => (
                <div key={badge.id} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-white">{badge.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Core Identity Edit Form & Addresses Setup */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Detailed Personal Coordinates Form */}
          <div className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs">
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Personal Coordinates</h3>
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 block pl-1  items-center gap-1">
                    <User className="h-3 w-3" /> <span>Full Name</span>
                  </label>
                  <input 
                    type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-500 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 block pl-1  items-center gap-1">
                    <PhoneCall className="h-3 w-3" /> <span>Primary Phone</span>
                  </label>
                  <input 
                    type="text" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-500 transition"
                  />
                </div>
              </div>

              {/* Row 2: DOB & Alternate Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 block pl-1  items-center gap-1">
                    <Calendar className="h-3 w-3" /> <span>Date of Birth</span>
                  </label>
                  <input 
                    type="date" required value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-500 transition font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 block pl-1">Alternate Contact (Optional)</label>
                  <input 
                    type="text" placeholder="Add secondary phone node..." value={formData.altPhone} onChange={(e) => setFormData({...formData, altPhone: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-500 transition"
                  />
                </div>
              </div>

              {/* Row 3: Gender Choice & Food Preferences Selector Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-400 block pl-1">Gender Node</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Male', 'Female', 'Other'].map((gen) => (
                      <button
                        key={gen} type="button" onClick={() => setFormData({...formData, gender: gen})}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          formData.gender === gen 
                            ? 'border-brand-500 bg-brand-50/50 text-brand-500 dark:bg-brand-950/20' 
                            : 'border-slate-200 dark:border-slate-700 text-slate-500 bg-transparent hover:bg-slate-50'
                        }`}
                      >
                        {gen}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-slate-400 block pl-1  items-center gap-1">
                    <Heart className="h-3 w-3 text-rose-500" /> <span>Food Preference</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Veg', 'Non-Veg', 'Both'].map((pref) => (
                      <button
                        key={pref} type="button" onClick={() => setFormData({...formData, foodPreference: pref})}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          formData.foodPreference === pref 
                            ? 'border-emerald-500 bg-emerald-50/50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400' 
                            : 'border-slate-200 dark:border-slate-700 text-slate-500 bg-transparent hover:bg-slate-50'
                        }`}
                      >
                        {pref === 'Veg' ? '🟢 Veg' : pref === 'Non-Veg' ? '🔴 Non-Veg' : '✨ Both'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Static Identity Email Node */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 block pl-1  items-center gap-1">
                  <Mail className="h-3 w-3" /> <span>Email Node Address</span>
                </label>
                <input 
                  type="email" disabled value={formData.email}
                  className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-400 cursor-not-allowed focus:outline-none"
                />
              </div>

              <button type="submit" className="bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition">
                <Save className="h-3.5 w-3.5" />
                <span>Save Advanced Credentials</span>
              </button>
            </form>
          </div>

          {/* Saved Addresses Manager Card */}
          <div className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 p-5 rounded-3xl shadow-xs space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <MapPin className="h-4 w-4 text-brand-500" />
              <span>Saved Delivery Destinations</span>
            </h3>

            <div className="space-y-2">
              {addresses.map(addr => (
                <div key={addr.id} className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-start justify-between gap-3 group">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">{addr.type}</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{addr.details}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddAddress} className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex gap-2">
                <select 
                  value={newAddressType} onChange={(e) => setNewAddressType(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-700 dark:text-slate-300 font-bold focus:outline-none"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Gym">Gym</option>
                </select>
                <input 
                  type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Add complete new delivery destination coordinates..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs focus:outline-none focus:border-brand-500 transition"
                />
                <button type="submit" className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 rounded-xl transition text-slate-600 dark:text-slate-300">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;