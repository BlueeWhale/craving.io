import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  // Computational tax metrics calculations
  const deliveryFee = cartTotal > 500 ? 0 : 40;
  const platformTax = 18;
  const finalGrandTotal = cartTotal + deliveryFee + platformTax;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full text-slate-400 dark:text-slate-500 mb-4">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="text-xl font-black text-slate-800 dark:text-white">Your basket is empty</h2>
        <p className="text-sm text-slate-400 mt-1 max-w-xs">Looks like you haven't added any culinary items to your tray yet.</p>
        <Link to="/" className="mt-6 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md transition">
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Items List Tray Column */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Review Your Basket</h1>
        
        <div className="space-y-3">
          {cart.map((item) => (
            <motion.div 
              key={item._id}
              layout
              className="bg-white dark:bg-darkcard p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 dark:text-white text-sm sm:text-base truncate">{item.name}</h3>
                <p className="text-xs text-slate-400 font-medium">₹{item.price} each</p>
              </div>

              {/* Functional Row Operational Tools */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={() => updateQuantity(item._id, -1)}
                    className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-mono font-bold text-sm w-5 text-center dark:text-white">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, 1)}
                    className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
                  title="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bill Breakdowns Calculation Summary Card */}
      <div className="bg-white dark:bg-darkcard p-6 rounded-3xl border border-slate-100 dark:border-slate-800 h-fit space-y-6 shadow-sm">
        <h3 className="text-lg font-black text-slate-800 dark:text-white">Bill Summary</h3>
        
        <div className="space-y-3 text-sm border-b pb-4 dark:border-slate-800">
          <div className="flex justify-between text-slate-500">
            <span>Item Subtotal</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">₹{cartTotal}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Delivery Partner Fee</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {deliveryFee === 0 ? <span className="text-emerald-500 font-bold">FREE</span> : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Platform Tax & GST</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">₹{platformTax}</span>
          </div>
        </div>

        <div className="flex justify-between items-center font-black text-base dark:text-white">
          <span>Grand Total</span>
          <span className="text-xl text-brand-500">₹{finalGrandTotal}</span>
        </div>

        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition duration-150 flex items-center justify-center space-x-2 text-sm"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Cart;