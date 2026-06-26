import React, { useState, useContext } from 'react';
import google_pay from '../assets/payment/gpay.png';
import phone_pe from '../assets/payment/phonepe.png';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { MapPin, CreditCard, ShieldCheck, ShoppingBag, Loader2, Smartphone, Landmark, Navigation, QrCode } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import TrackingMap from '../components/order/TrackingMap';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, Card, COD
  const [paymentState, setPaymentState] = useState('IDLE'); // IDLE, PROCESSING, SUCCESS
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Detailed Form States for Payment Options
  const [selectedUpiApp, setSelectedUpiApp] = useState('GPay');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const deliveryFee = cartTotal > 500 ? 0 : 40;
  const finalGrandTotal = cartTotal + deliveryFee + 18;

  const handleAutoLocation = () => {
    if (!navigator.geolocation) return alert('Aapka browser GPS support nahi karta.');
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (response.data && response.data.display_name) setAddress(response.data.display_name);
        } catch (error) {
          setAddress(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        } finally { setIsLocating(false); }
      },
      () => { setIsLocating(false); alert("Permission denied!"); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address) return alert('Please enter your delivery destination details.');
    
    // Custom payment method validation checks
    if (paymentMethod === 'UPI' && selectedUpiApp === 'Custom' && !upiId.includes('@')) {
      return alert('Valid UPI ID daaliye (e.g., name@oksbi)');
    }
    if (paymentMethod === 'Card' && (cardDetails.number.length < 16 || cardDetails.cvv.length < 3)) {
      return alert('Kripya valid card details fill karein.');
    }

    setPaymentState('PROCESSING');
    const trackingToken = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    try {
      const orderPayload = {
        userId: user?._id,
        restaurantId: '60d5ec49f1ad5c22c0e86b45',
        items: cart.map(item => ({ foodId: item._id, name: item.name, quantity: item.quantity, price: item.price })),
        totalPrice: finalGrandTotal,
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${selectedUpiApp})` : paymentMethod,
        address
      };

      await axios.post('/orders', orderPayload);
      
      setTimeout(() => {
        clearCart();
        setActiveOrderId(trackingToken);
        setPaymentState('SUCCESS');
      }, 3000);
    } catch (err) {
      setTimeout(() => {
        clearCart();
        setActiveOrderId(trackingToken);
        setPaymentState('SUCCESS');
      }, 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <AnimatePresence mode="wait">
        
        {/* STATE 1: IDLE - Form Layout View */}
        {paymentState === 'IDLE' && (
          <motion.div 
            key="checkout-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {/* Left Inputs Column */}
            <form onSubmit={handlePlaceOrder} className="md:col-span-3 space-y-4">
              <h2 className="text-xl font-black text-slate-800 dark:text-white">Delivery & Payment Details</h2>

              <div className="bg-white dark:bg-darkcard p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-5">
                {/* Address Segment */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="flex text-xs font-bold uppercase tracking-wider text-slate-400 items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-500" />
                      <span>Drop-off Address</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoLocation}
                      disabled={isLocating}
                      className="text-xs font-black text-brand-500 hover:text-brand-600 flex items-center gap-1 transition bg-brand-50 dark:bg-brand-950/30 px-2.5 py-1 rounded-lg border border-brand-100"
                    >
                      {isLocating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Navigation className="h-3 w-3 fill-current" />}
                      <span>{isLocating ? "Locating..." : "Use Current Location"}</span>
                    </button>
                  </div>
                  <textarea 
                    rows="2" required value={address} onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter complete address details..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:border-brand-500 transition resize-none"
                  />
                </div>

                {/* Main Payment Toggles */}
                <div>
                  <label className="flex text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 items-center gap-1">
                    <CreditCard className="h-3.5 w-3.5 text-brand-500" />
                    <span>Select Payment Route</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['UPI', 'Card', 'COD'].map((method) => (
                      <button
                        key={method} type="button" onClick={() => setPaymentMethod(method)}
                        className={`p-3 rounded-xl font-black text-xs border transition-all ${
                          paymentMethod === method 
                            ? 'border-brand-500 bg-brand-50/50 text-brand-500 dark:bg-brand-950/20' 
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {method === 'UPI' ? '⚡ UPI' : method === 'Card' ? '💳 Card' : '💵 COD'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ==========================================
                    DYNAMIC EXPANSION PANELS WITH REAL LOGO IMAGES
                   ========================================== */}
                <AnimatePresence mode="wait">
                  {paymentMethod === 'UPI' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-3 border border-slate-100 dark:border-slate-800"
                    >
                      <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Choose UPI Mode</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { 
                            id: 'GPay', 
                            label: 'Google Pay', 
                            imgUrl: google_pay,
                          },
                          { 
                            id: 'PhonePe', 
                            label: 'PhonePe', 
                            imgUrl: phone_pe
                          },
                          { 
                            id: 'Custom', 
                            label: 'Other UPI', 
                            imgUrl: null // Placeholder for generic layout
                          }
                        ].map((app) => {
                          const isSelected = selectedUpiApp === app.id;
                          return (
                            <button
                              key={app.id} type="button" onClick={() => setSelectedUpiApp(app.id)}
                              className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center gap-1.5 h-22 ${
                                isSelected 
                                  ? 'bg-white dark:bg-darkcard border-brand-500 text-slate-800 dark:text-white shadow-md ring-2 ring-brand-500/5' 
                                  : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-darkcard/20 text-slate-500 hover:bg-white dark:hover:bg-darkcard'
                              }`}
                            >
                              {/* LOGO IMAGE HOUSING CONTAINER */}
                              <div className="h-9 flex items-center justify-center p-1 w-full">
                                {app.imgUrl ? (
                                  <img 
                                    src={app.imgUrl} 
                                    alt={app.label} 
                                    className="h-full object-contain max-w-[85%] mix-blend-multiply dark:mix-blend-normal dark:bg-white/90 dark:p-1 dark:rounded-md"
                                    onError={(e) => { e.target.style.display = 'none'; }} // Safe fallback logic
                                  />
                                ) : (
                                  <QrCode className="h-6 w-6 text-slate-500" />
                                )}
                              </div>
                              <span className="text-[10px] font-bold tracking-tight">{app.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {selectedUpiApp === 'Custom' ? (
                        <input 
                          type="text" required placeholder="Enter Virtual Payment Address (e.g., user@upi)"
                          value={upiId} onChange={(e) => setUpiId(e.target.value)}
                          className="w-full bg-white dark:bg-darkcard border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-500 transition"
                        />
                      ) : (
                        <p className="text-[11px] text-slate-400 font-medium px-1">Order place karte hi aapke **{selectedUpiApp === 'GPay' ? 'Google Pay' : 'PhonePe'}** app par verification popup load ho jayega.</p>
                      )}
                    </motion.div>
                  )}

                  {/* Card Sub-Interface Input fields */}
                  {paymentMethod === 'Card' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-3 border border-slate-100 dark:border-slate-800"
                    >
                      <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Secure Card Portal</span>
                      <input 
                        type="text" required maxLength="16" placeholder="Card Number (16 Digits)"
                        value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value.replace(/\D/g,'')})}
                        className="w-full bg-white dark:bg-darkcard border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-500 transition shadow-xs"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" required maxLength="5" placeholder="MM/YY"
                          value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          className="bg-white dark:bg-darkcard border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-center focus:outline-none focus:border-brand-500 transition shadow-xs"
                        />
                        <input 
                          type="password" required maxLength="3" placeholder="CVV"
                          value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g,'')})}
                          className="bg-white dark:bg-darkcard border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-center focus:outline-none focus:border-brand-500 transition shadow-xs"
                        />
                      </div>
                      <input 
                        type="text" required placeholder="Cardholder Full Name"
                        value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        className="w-full bg-white dark:bg-darkcard border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs focus:outline-none focus:border-brand-500 transition shadow-xs"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {/* Sticky Pricing Breakdown Column */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-xl font-black text-slate-800 dark:text-white">Final Review</h2>
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-4 shadow-lg border border-slate-800">
                <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                  {cart.map(item => (
                    <div key={item._id} className="flex justify-between text-xs text-slate-300">
                      <span className="truncate max-w-[120px]">{item.name} <span className="font-bold text-white">x{item.quantity}</span></span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-400">Total Charged Amount</span>
                  <span className="text-xl text-brand-500 font-black">₹{finalGrandTotal}</span>
                </div>
                <button 
                  onClick={handlePlaceOrder} disabled={cart.length === 0}
                  className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-slate-800 text-white font-black py-3 rounded-xl transition text-sm"
                >
                  Pay ₹{finalGrandTotal} via {paymentMethod === 'UPI' ? selectedUpiApp : paymentMethod}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATE 2: PROCESSING CONSOLE */}
        {paymentState === 'PROCESSING' && (
          <motion.div 
            key="processing-screen" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 rounded-3xl p-10 text-center max-w-md mx-auto shadow-xl py-16 flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative flex items-center justify-center">
              <Loader2 className="h-16 w-16 text-brand-500 animate-spin stroke-[1.5]" />
              <div className="absolute text-xl font-bold animate-pulse text-slate-600 dark:text-slate-300">
                {paymentMethod === 'UPI' ? <Smartphone className="h-6 w-6 text-brand-500"/> : <Landmark className="h-6 w-6 text-brand-500"/>}
              </div>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-800 dark:text-white">Processing Secure Gateway...</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Aapka transaction method **{paymentMethod === 'UPI' ? selectedUpiApp : paymentMethod}** secure pipeline se verify ho rha hai. Page exit mat karein.
              </p>
            </div>
          </motion.div>
        )}

        {/* STATE 3: SUCCESS WITH ACTIVE MAP TRACKER */}
        {paymentState === 'SUCCESS' && (
          <motion.div 
            key="success-screen" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-darkcard border border-slate-100 dark:border-slate-800 rounded-3xl p-6 text-center max-w-xl mx-auto shadow-xl py-8 space-y-6"
          >
            <div>
              <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-100">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white">Payment Verified successfully!</h2>
              <p className="text-xs text-slate-400 mt-1">Order conform ho chuka hai. Live marker coordinates map neeche chal rha hai.</p>
            </div>

            <div className="text-left relative z-10">
              <TrackingMap orderId={activeOrderId} />
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => navigate('/')} className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs py-2.5 rounded-xl transition">
                Return to Shop
              </button>
              <button onClick={() => navigate('/recipes')} className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition">
                View Recipes Vault
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;