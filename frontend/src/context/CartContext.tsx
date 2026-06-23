'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  // Hydrate cart from localStorage on layout mount safely
  useEffect(() => {
    const storedCart = localStorage.getItem('zv_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error parsing cart cache", e);
      }
    }
  }, []);

  // Sync to local memory storage whenever the bag mutations fire
  const syncCartMemory = (updatedCart: any[]) => {
    setCart(updatedCart);
    localStorage.setItem('zv_cart', JSON.stringify(updatedCart));
  };

  const addToCart = (product: any) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      // If item already exists inside the bag, increment its numerical count cleanly
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      syncCartMemory(newCart);
    } else {
      // Append the brand new structured metadata layout cleanly
      syncCartMemory([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newCart = cart.map((item) => (item.id === id ? { ...item, quantity } : item));
    syncCartMemory(newCart);
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    syncCartMemory(newCart);
  };

  const clearCart = () => {
    syncCartMemory([]);
  };

  // Derive total live payable metric numbers smoothly on every single render loop pass
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);