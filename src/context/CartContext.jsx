import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Pull previous session's cart items from local storage if available
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('cart');
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (foodItem) => {
    setCart((prevCart) => {
      const existingItemIdx = prevCart.findIndex((item) => item._id === foodItem._id);
      
      if (existingItemIdx > -1) {
        // Create shallow copy of collection to maintain immutable update patterns
        const updatedCart = [...prevCart];
        updatedCart[existingItemIdx].quantity += 1;
        return updatedCart;
      }
      
      // Append brand-new item payload with a default tracking quantity unit
      return [...prevCart, { ...foodItem, quantity: 1 }];
    });
  };

  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== foodId));
  };

  const updateQuantity = (foodId, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === foodId) {
          const targetedQty = item.quantity + amount;
          return targetedQty > 0 ? { ...item, quantity: targetedQty } : item;
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Automated computational derivations
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartItemCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};