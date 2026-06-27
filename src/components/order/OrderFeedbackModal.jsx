import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, DollarSign, X, CheckCircle, Smile } from 'lucide-react';

const OrderFeedbackModal = ({ isOpen, onClose, orderId, restaurantName }) => {
  const [foodRating, setFoodRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tipOptions = [20, 30, 50, 100];

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const finalTip = selectedTip === 'custom' ? Number(customTip) : (selectedTip || 0);
    
    // Yahan API payload lock hoga backend ke liye
    const feedbackPayload = {
      orderId,
      rating: foodRating,
      review: reviewText,
      tipAmount: finalTip
    };
    
    console.log("Feedback Synchronization Active:", feedbackPayload);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFoodRating(0);
      setSelectedTip(null);
      setCustomTip('');
      setReviewText('');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-darkcard w-full max-w-md rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl p-6 relative overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button Trigger */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="h-4 w-4" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmitFeedback} className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-black uppercase text-brand-500 tracking-widest block">Share Your Experience</span>
              <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
                How was your meal from {restaurantName || 'Elite Kitchen'}?
              </h3>
            </div>

            {/* SECTION 1: INTERACTIVE STAR RATING PATTERN */}
            <div className="space-y-2 text-center bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60">
              <label className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">Rate the Food Quality</label>
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFoodRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-125 duration-150"
                  >
                    <Star 
                      className={`h-7 w-7 transition-colors ${
                        star <= (hoverRating || foodRating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-200 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {foodRating > 0 && (
                <span className="text-[11px] font-bold text-brand-500 block animate-pulse">
                  {foodRating === 5 ? '🎯 Absolutely Flavor Elite!' : foodRating >= 4 ? '🔥 Very Delicious!' : '👍 Good Touch'}
                </span>
              )}
            </div>

            {/* SECTION 2: RIDER APPRECIATION (TIP ENGINE GRID) */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 pl-1">
                <Smile className="h-4 w-4 text-emerald-500" />
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Support Your Delivery Hero</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium pl-1 leading-relaxed">
                100% of this tip goes directly into the rider's bank account node to fuel their day.
              </p>
              
              <div className="grid grid-cols-4 gap-2">
                {tipOptions.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedTip(amount);
                      setCustomTip('');
                    }}
                    className={`py-2 rounded-xl text-xs font-black border transition-all ${
                      selectedTip === amount
                        ? 'border-emerald-500 bg-emerald-50/60 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              {/* Custom Tip Trigger Node */}
              <div className="pt-1">
                {selectedTip === 'custom' ? (
                  <div className="relative animate-in slide-in-from-top-2 duration-200">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">₹</span>
                    <input 
                      type="number"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      placeholder="Enter custom appreciation tip..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-emerald-500 rounded-xl p-2.5 pl-7 text-xs font-bold text-emerald-600 focus:outline-none"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedTip('custom')}
                    className="text-[11px] font-bold text-slate-400 hover:text-brand-500 transition pl-1 underline decoration-dotted"
                  >
                    Add a custom tip amount
                  </button>
                )}
              </div>
            </div>

            {/* SECTION 3: REVIEWS COMMENT FIELD */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 block pl-1">Review Comments (Optional)</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write what you loved about the packaging, taste, or fast delivery..."
                rows="2"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:border-brand-500 transition resize-none"
              />
            </div>

            {/* Submit Action Block */}
            <button
              type="submit"
              disabled={foodRating === 0}
              className={`w-full py-3 rounded-xl font-bold text-xs text-white shadow-md flex items-center justify-center gap-1.5 transition ${
                foodRating > 0 ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer' : 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-400'
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              <span>Submit Rating & Appreciation</span>
            </button>
          </form>
        ) : (
          /* SUCCESS SUBMISSION DRAW STATE */
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in duration-300">
            <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/30 rounded-3xl flex items-center justify-center text-emerald-500 shadow-inner">
              <Heart className="h-8 w-8 fill-current scale-105 animate-pulse" />
            </div>
            <div>
              <h4 className="font-black text-slate-800 dark:text-white text-base">Feedback Node Transmitted!</h4>
              <p className="text-xs text-slate-400 font-medium max-w-[240px] mx-auto mt-0.5">
                Thank you for elevating our platform parameters and helping the delivery team!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderFeedbackModal;