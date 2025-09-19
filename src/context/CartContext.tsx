import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useStock } from './StockContext'; // 1. Importe o hook useStock que criamos

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
  const { getStock } = useStock(); // 2. Pegue a função getStock do contexto de estoque

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
    // 3. Lógica de verificação de estoque
    const currentStock = getStock(product.id);
    const itemInCart = items.find(item => item.id === product.id);
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;
    
    const isMini = product.name.includes('Mini');
    const quantityToAdd = isMini ? 6 : 1;

    // Verifica se a quantidade no carrinho somada à nova quantidade ultrapassa o estoque
    if (quantityInCart + quantityToAdd > currentStock) {
      console.error("Estoque insuficiente para adicionar o item:", product.name);
      // Aqui você poderia usar o `toast` para avisar o usuário que não há mais estoque!
      return; // Para a execução da função e não adiciona o item
    }

    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityToAdd;
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: quantityToAdd, isMini }];
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

    const currentStock = getStock(id);
    if (quantity > currentStock) {
        console.error("Não é possível atualizar para uma quantidade maior que o estoque.");
        // Você também pode adicionar um toast de aviso aqui.
        return; // Impede a atualização
    }
    
    setItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (item.isMini) {
            const adjustedQuantity = Math.max(6, Math.ceil(quantity / 6) * 6);
            // Verifica novamente após o ajuste para múltiplos de 6
            if (adjustedQuantity > currentStock) {
                return item; // Retorna o item sem alteração se o ajuste ultrapassar o estoque
            }
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