import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useStock } from './StockContext';

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
  // Pegamos TODAS as funções que precisamos do estoque
  const { getStock, decreaseStock, increaseStock } = useStock();

  const calculateItemPrice = (item: CartItem) => {
    if (item.isMini) {
      const packs = Math.ceil(item.quantity / 6);
      return packs * 8.00;
    } else {
      const threePackPromos = Math.floor(item.quantity / 3);
      const remainingCookies = item.quantity % 3;
      return (threePackPromos * 13.00) + (remainingCookies * 5.00);
    }
  };

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    const currentStock = getStock(product.id);
    const itemInCart = items.find(item => item.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;
    
    const isMini = product.name.includes('Mini');
    const quantityToAdd = isMini ? 6 : 1;

    if (quantityInCart + quantityToAdd > currentStock) {
      console.error("Estoque insuficiente para adicionar o item:", product.name);
      return;
    }

    // +++ CORREÇÃO IMPORTANTE +++
    // Primeiro, damos baixa no estoque
    decreaseStock(product.id, quantityToAdd);

    // Depois, atualizamos o carrinho
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: quantityToAdd, isMini }];
    });
  };

  const removeItem = (id: string) => {
    const itemToRemove = items.find(item => item.id === id);
    if (itemToRemove) {
      // +++ CORREÇÃO IMPORTANTE +++
      // Devolvemos a quantidade do item removido para o estoque
      increaseStock(id, itemToRemove.quantity);
    }
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    const itemToUpdate = items.find(item => item.id === id);
    if (!itemToUpdate) return;
    
    const oldQuantity = itemToUpdate.quantity;
    const difference = newQuantity - oldQuantity;
    const currentStock = getStock(id);

    // Se a diferença necessária for maior que o estoque disponível, não faz nada
    if (difference > currentStock) {
      console.error("Não há estoque suficiente para aumentar para esta quantidade.");
      return;
    }

    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    // +++ CORREÇÃO IMPORTANTE +++
    // Atualiza o estoque com base na diferença
    if (difference > 0) {
      decreaseStock(id, difference); // Diminui o estoque
    } else if (difference < 0) {
      increaseStock(id, -difference); // Aumenta o estoque
    }
    
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const clearCart = () => {
    // Devolve todos os itens para o estoque antes de limpar o carrinho
    items.forEach(item => {
      increaseStock(item.id, item.quantity);
    });
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