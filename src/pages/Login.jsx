import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await login(email, password);
    if (result.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setError(result.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-darkcard p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="text-sm text-slate-400 mt-1">Discover gourmet dishes matching your vibe.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-xl flex items-center text-xs font-semibold border border-rose-100 dark:border-rose-900/30">
            <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-slate-400 h-4 w-4" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
              <Link to="/forgot-password" className="text-xs font-bold text-brand-500 hover:underline">Forgot?</Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-slate-400 h-4 w-4" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-brand-400 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-150 flex items-center justify-center space-x-2 text-sm mt-2"
          >
            <span>{submitting ? 'Verifying Session...' : 'Sign In'}</span>
            {!submitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          New to Craving.io? <Link to="/register" className="font-bold text-brand-500 hover:underline">Create Account</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;