import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isMini?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  calculateItemPrice: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const calculateItemPrice = (item: CartItem) => {
    if (item.isMini) {
      // Mini cookies: R$ 8.00 per pack of 6
      const packs = Math.ceil(item.quantity / 6);
      return packs * 8.00;
    } else {
      // Regular cookies: R$ 5.00 each, but 3 for R$ 13.00
      const threePackPromos = Math.floor(item.quantity / 3);
      const remainingCookies = item.quantity % 3;
      return (threePackPromos * 13.00) + (remainingCookies * 5.00);
    }
  };

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      const isMini = product.name.includes('Mini');
      
      if (existingItem) {
        const newQuantity = isMini ? existingItem.quantity + 6 : existingItem.quantity + 1;
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      const initialQuantity = isMini ? 6 : 1;
      return [...prev, { ...product, quantity: initialQuantity, isMini }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (item.isMini) {
            // Mini cookies: minimum 6, must be multiples of 6
            const adjustedQuantity = Math.max(6, Math.ceil(quantity / 6) * 6);
            return { ...item, quantity: adjustedQuantity };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + calculateItemPrice(item), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        calculateItemPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};