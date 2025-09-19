import React, { useState } from 'react';
import { useStock } from '@/context/StockContext';
import { useCart } from '@/context/CartContext'; // Usaremos para pegar a lista de produtos
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const { stock, setStockValue } = useStock();
  
  // Vamos pegar os produtos do contexto do carrinho para não repetir a lista de produtos
  // Em um app real, os produtos viriam de uma API também.
  const { items: cartItems } = useCart();
  const products = cartItems; // Usando os itens do carrinho como base de produtos

  // Estado local para guardar os valores dos inputs
  const [localStock, setLocalStock] = useState<Record<string, string>>({});

  const handleStockChange = (id: string, value: string) => {
    setLocalStock(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveStock = (id: string) => {
    const newStock = parseInt(localStock[id], 10);
    if (!isNaN(newStock)) {
      setStockValue(id, newStock);
      // Limpa o campo após salvar
      setLocalStock(prev => ({...prev, [id]: ''})); 
      alert(`Estoque do produto ${id} atualizado para ${newStock}!`);
    } else {
      alert("Por favor, insira um número válido.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Painel de Controle de Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.keys(stock).map(productId => (
              <div key={productId} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-medium">Produto ID: {productId}</p>
                  <p className="text-sm text-gray-500">
                    Estoque Atual: {stock[productId].stock}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Novo estoque"
                    className="w-28"
                    value={localStock[productId] || ''}
                    onChange={(e) => handleStockChange(productId, e.target.value)}
                  />
                  <Button onClick={() => handleSaveStock(productId)}>Salvar</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link to="/">
                <Button variant="outline">Voltar para a Loja</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;