import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Plus, Minus, Check } from 'lucide-react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Skeleton from '../components/common/Skeleton';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const [resDetails, resMenu] = await Promise.all([
          axios.get(`/restaurants/${id}`),
          axios.get(`/food?restaurantId=${id}`)
        ]);
        setRestaurant(resDetails.data.data);
        setMenu(resMenu.data.data);
      } catch (err) {
        console.error("Sandbox mode activation:", err);
        // Fallback mockup details with explicit food item image links
        setRestaurant({ name: 'The Truffle Crust Pizza', rating: 4.8, banner: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000' });
        setMenu([
          { _id: 'food_1', name: 'Burrata Truffle Blossom Pizza', description: 'Fresh creamy burrata cheese spread across charcoal high-hydration dough base drops with aromatic white truffle oils.', price: 549, category: 'Premium', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300&auto=format&fit=crop&q=80', isVeg: true },
          { _id: 'food_2', name: 'Classic Pepperoni Hot Honey Pizza', description: 'Spicy dry-cured artisan pepperoni curls topped with pure organic hot chili-infused honey glazes.', price: 429, category: 'Classic', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&auto=format&fit=crop&q=80', isVeg: false }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurantData();
  }, [id]);

  const getItemQty = (itemId) => {
    const item = cart.find(i => i._id === itemId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-3xl" />
        <Skeleton className="h-8 w-1/3" />
        <div className="space-y-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Editorial Profile Banner */}
      <div className="h-48 sm:h-64 rounded-3xl overflow-hidden relative shadow-inner bg-slate-100 dark:bg-slate-800">
        <img src={restaurant?.banner} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{restaurant?.name}</h1>
            <p className="text-xs text-slate-300 font-medium mt-1">Gourmet Pizzas • Artisanal bakes • Fresh Cheeses</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl flex items-center space-x-1 font-bold text-sm">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span>{restaurant?.rating}</span>
          </div>
        </div>
      </div>

      {/* Menu Directory Engine */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-xl font-black text-slate-800 dark:text-white border-b pb-2 dark:border-slate-800">Menu Highlights</h2>
        
        <div className="space-y-4">
          {menu.map((food) => {
            const qty = getItemQty(food._id);
            // Dynamic check for vegetable parameters
            const checkVeg = food.isVeg !== undefined ? food.isVeg : true;

            return (
              <div key={food._id} className="bg-white dark:bg-darkcard p-5 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800/80 flex justify-between items-center gap-6 transition-all hover:shadow-md">
                
                {/* Left Side: Food Description Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span 
                      className={`h-2 w-2 rounded-full inline-block shrink-0 ${checkVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                      title={checkVeg ? "Vegetarian" : "Non-Vegetarian"} 
                    />
                    <h4 className="font-black text-slate-800 dark:text-white text-base tracking-tight">{food.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed font-medium">{food.description}</p>
                  <span className="font-black text-slate-800 dark:text-slate-100 text-sm block pt-1">₹{food.price}</span>
                </div>

                {/* Right Side: PREMIUM IMAGE CONTAINER WITH FLOATING COUNTER BOX */}
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-2xl overflow-hidden shadow-xs border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <img 
                    src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'} 
                    alt={food.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />

                  {/* Floating Micro Action Cart Controller Wrapper */}
                  <div className="absolute bottom-1.5 inset-x-1.5 flex justify-center z-10">
                    {qty > 0 ? (
                      <div className="flex items-center space-x-2 bg-brand-500 text-white rounded-xl p-1 shadow-md w-full justify-between backdrop-blur-xs">
                        <button onClick={() => updateQuantity(food._id, -1)} className="p-0.5 rounded-md hover:bg-white/10 transition focus:outline-none">
                          <Minus className="h-3 w-3 stroke-[3]" />
                        </button>
                        <span className="font-mono font-black text-xs w-4 text-center">{qty}</span>
                        <button onClick={() => updateQuantity(food._id, 1)} className="p-0.5 rounded-md hover:bg-white/10 transition focus:outline-none">
                          <Plus className="h-3 w-3 stroke-[3]" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(food)}
                        className="w-full bg-white/90 dark:bg-slate-900/90 hover:bg-brand-500 dark:hover:bg-brand-500 text-slate-800 dark:text-white hover:text-white dark:hover:text-white py-1 rounded-xl text-[10px] font-black uppercase tracking-wider transition shadow-sm border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xs focus:outline-none"
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;