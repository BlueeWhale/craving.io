import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, AlertCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'User' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await axios.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-darkcard p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Create Account</h2>
          <p className="text-sm text-slate-400 mt-1">Unlock global gourmet tracking profiles.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-xl flex items-center text-xs font-semibold">
            <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-slate-400 h-4 w-4" />
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none" placeholder="Alex Mercer" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-slate-400 h-4 w-4" />
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none" placeholder="alex@mercer.com" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Phone Number</label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3 text-slate-400 h-4 w-4" />
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none" placeholder="+91 98765 43210" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-slate-400 h-4 w-4" />
              <input type="password" name="password" required value={formData.password} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none" placeholder="••••••••" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Account Purpose</label>
            <select name="role" value={formData.role} onChange={handleInputChange} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none font-medium">
              <option value="User">Order Food & Play Game Modes</option>
              <option value="Restaurant Owner">Register Restaurant Partner Profile</option>
            </select>
          </div>

          <button type="submit" disabled={submitting} className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl shadow-md transition text-sm mt-2">
            {submitting ? 'Registering Portfolio...' : 'Create Account'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;