import React, { useState } from 'react';
import { useStock } from '@/context/StockContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { products } from '@/data/products'; // Importa a lista de produtos

const AdminPage = () => {
  const { stock, setStockValue } = useStock();
  
  const [localStock, setLocalStock] = useState<Record<string, string>>({});

  const handleStockChange = (id: string, value: string) => {
    setLocalStock(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveStock = (id: string) => {
    const newStock = parseInt(localStock[id], 10);
    if (!isNaN(newStock)) {
      setStockValue(id, newStock);
      setLocalStock(prev => ({...prev, [id]: ''})); 
      alert(`Estoque do produto "${products.find(p => p.id === id)?.name}" atualizado para ${newStock}!`);
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
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Estoque Atual: {stock[product.id]?.stock ?? '...'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Novo estoque"
                    className="w-28"
                    value={localStock[product.id] || ''}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                  />
                  <Button onClick={() => handleSaveStock(product.id)}>Salvar</Button>
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