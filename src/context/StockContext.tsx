import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const BIN_URL = 'URL_DO_SEU_BIN_AQUI'; 
const MASTER_KEY = 'SUA_MASTER_KEY_SECRETA_AQUI';

// Define a estrutura de um item de estoque
interface StockItem {
  stock: number;
}

// Define o que nosso contexto vai fornecer
interface StockContextType {
  stock: Record<string, StockItem>;
  getStock: (id: string) => number;
  decreaseStock: (id: string, quantity: number) => void;
  setStockValue: (id: string, newStock: number) => void; // <--- ADICIONADO AQUI
}

// Cria o contexto
const StockContext = createContext<StockContextType | undefined>(undefined);

// Cria um "atalho" (hook) para usar o contexto mais facilmente
export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock deve ser usado dentro de um StockProvider');
  }
  return context;
};

// Define as propriedades que o nosso Provedor irá receber
interface StockProviderProps {
  children: ReactNode;
}

// Cria o Provedor que vai "abraçar" nossa aplicação
export const StockProvider = ({ children }: StockProviderProps) => {
  // Onde vamos guardar os dados do estoque
  const [stock, setStock] = useState<Record<string, StockItem>>({});

  // Este efeito roda uma vez quando o componente é montado
  useEffect(() => {
    // Busca os dados do nosso arquivo stock.json
    fetch('/stock.json')
      .then(response => response.json())
      .then(data => setStock(data))
      .catch(error => console.error('Erro ao buscar estoque:', error));
  }, []); // O array vazio [] garante que isso rode só uma vez

  // Função para pegar o estoque de um item pelo ID
  const getStock = (id: string): number => {
    return stock[id]?.stock ?? 0; // Retorna o estoque ou 0 se não encontrar
  };

  // Função para diminuir o estoque (simulando uma venda)
  const decreaseStock = (id: string, quantity: number) => {
    setStock(prevStock => {
      const currentStock = prevStock[id]?.stock ?? 0;
      const newStock = Math.max(0, currentStock - quantity); // Garante que o estoque não fique negativo
      return {
        ...prevStock,
        [id]: { ...prevStock[id], stock: newStock },
      };
    });
  };

  // +++ FUNÇÃO ADICIONADA +++
  // Função para definir um novo valor de estoque (para a página de admin)
  const setStockValue = (id: string, newStock: number) => {
    setStock(prevStock => ({
      ...prevStock,
      [id]: { ...prevStock[id], stock: Math.max(0, newStock) }, // Garante que não seja negativo
    }));
  };

  // Disponibiliza os valores para os componentes filhos
  return (
    <StockContext.Provider value={{ stock, getStock, decreaseStock, setStockValue }}> {/* <--- ADICIONADO AQUI */}
      {children}
    </StockContext.Provider>
  );
};