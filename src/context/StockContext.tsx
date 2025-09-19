import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// !! IMPORTANTE: Verifique se os seus dados do JSONBin.io estão corretos aqui !!
const BIN_URL = import.meta.env.VITE_JSONBIN_URL;
const MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;

interface StockItem {
  stock: number;
}

interface StockContextType {
  stock: Record<string, StockItem>;
  getStock: (id: string) => number;
  decreaseStock: (id: string, quantity: number) => void;
  increaseStock: (id: string, quantity: number) => void; // <--- ADICIONADO
  setStockValue: (id: string, newStock: number) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock deve ser usado dentro de um StockProvider');
  }
  return context;
};

interface StockProviderProps {
  children: ReactNode;
}

export const StockProvider = ({ children }: StockProviderProps) => {
  const [stock, setStock] = useState<Record<string, StockItem>>({});

  const updateStockOnServer = async (newStockData: Record<string, StockItem>) => {
    try {
      await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': MASTER_KEY
        },
        body: JSON.stringify(newStockData)
      });
    } catch (error) {
      console.error('Falha ao atualizar o estoque no servidor:', error);
    }
  };

  useEffect(() => {
    fetch(`${BIN_URL}/latest`)
      .then(response => response.json())
      .then(data => setStock(data.record))
      .catch(error => console.error('Erro ao buscar estoque:', error));
  }, []);

  const getStock = (id: string): number => {
    return stock[id]?.stock ?? 0;
  };
  
  const setStockValue = (id: string, newStockValue: number) => {
    const updatedStock = {
      ...stock,
      [id]: { ...stock[id], stock: Math.max(0, newStockValue) },
    };
    setStock(updatedStock);
    updateStockOnServer(updatedStock);
  };

  const decreaseStock = (id: string, quantity: number) => {
    const currentStock = getStock(id);
    const newStock = currentStock - quantity;
    setStockValue(id, newStock);
  };

  // +++ FUNÇÃO ADICIONADA +++
  const increaseStock = (id: string, quantity: number) => {
    const currentStock = getStock(id);
    const newStock = currentStock + quantity;
    setStockValue(id, newStock);
  };

  return (
    <StockContext.Provider value={{ stock, getStock, decreaseStock, increaseStock, setStockValue }}> {/* <--- ADICIONADO */}
      {children}
    </StockContext.Provider>
  );
};