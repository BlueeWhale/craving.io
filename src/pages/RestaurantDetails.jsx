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
        // Fallback mocked details engine parameters
        setRestaurant({ name: 'The Truffle Crust Pizza', rating: 4.8, banner: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000' });
        setMenu([
          { _id: 'food_1', name: 'Burrata Truffle Blossom Pizza', description: 'Fresh creamy burrata cheese spread across charcoal high-hydration dough base drops.', price: 549, category: 'Premium' },
          { _id: 'food_2', name: 'Classic Pepperoni Hot Honey', description: 'Spicy dry-cured salami curls topped with hot chili-infused honey glazes.', price: 429, category: 'Classic' }
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
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-8 w-1/3" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
            return (
              <div key={food._id} className="bg-white dark:bg-darkcard p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 flex justify-between items-center gap-4 transition-all">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" title="Vegetarian Item Flag" />
                    <h4 className="font-bold text-slate-800 dark:text-white text-base">{food.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{food.description}</p>
                  <span className="font-black text-slate-700 dark:text-slate-200 text-sm block pt-1">₹{food.price}</span>
                </div>

                {/* Micro Action Cart Controller Button Interface */}
                <div className="shrink-0">
                  {qty > 0 ? (
                    <div className="flex items-center space-x-3 bg-brand-500 text-white rounded-xl p-1.5 shadow-md">
                      <button onClick={() => updateQuantity(food._id, -1)} className="p-1 rounded-md hover:bg-white/10 transition">
                        <Minus className="h-3.5 w-3.5 stroke-[3]" />
                      </button>
                      <span className="font-mono font-bold text-sm w-4 text-center">{qty}</span>
                      <button onClick={() => updateQuantity(food._id, 1)} className="p-1 rounded-md hover:bg-white/10 transition">
                        <Plus className="h-3.5 w-3.5 stroke-[3]" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(food)}
                      className="border-2 border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-brand-500 font-bold transition flex items-center justify-center bg-slate-50 dark:bg-slate-900"
                    >
                      <Plus className="h-4 w-4 stroke-[2.5]" />
                    </button>
                  )}
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