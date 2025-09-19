import React, { useState } from 'react';
import { useStock } from '@/context/StockContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast'; // Importar o sistema de toast
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Importar componentes da Tabela
import { Save, Loader2, ArrowLeft } from 'lucide-react'; // Importar ícones

const AdminPage = () => {
  const { stock, setStockValue } = useStock();
  const { toast } = useToast();
  
  // Estado para os valores dos inputs
  const [localStock, setLocalStock] = useState<Record<string, string>>({});
  // Estado para controlar qual botão está "carregando"
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStockChange = (id: string, value: string) => {
    setLocalStock(prev => ({ ...prev, [id]: value }));
  };

  const handleSaveStock = (id: string) => {
    setLoadingId(id); // Ativa o ícone de carregamento para este botão
    const newStock = parseInt(localStock[id], 10);
    
    if (!isNaN(newStock)) {
      setStockValue(id, newStock);
      setLocalStock(prev => ({...prev, [id]: ''})); 
      
      // Simula um tempo de espera da API e depois mostra o toast
      setTimeout(() => {
        toast({
          title: "Estoque Atualizado!",
          description: `O estoque de "${products.find(p => p.id === id)?.name}" foi definido para ${newStock}.`,
        });
        setLoadingId(null); // Desativa o carregamento
      }, 500); // Meio segundo de delay para simular a rede

    } else {
      toast({
        title: "Erro de Validação",
        description: "Por favor, insira um número válido.",
        variant: "destructive",
      });
      setLoadingId(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie o estoque dos seus produtos em tempo real.</p>
        </div>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Loja
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estoque de Produtos</CardTitle>
          <CardDescription>
            Altere a quantidade de um item e clique em "Salvar" para atualizar o estoque para todos os clientes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Produto</TableHead>
                <TableHead className="text-center">Estoque Atual</TableHead>
                <TableHead>Novo Estoque</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-lg">
                    {stock[product.id]?.stock ?? '...'}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Ex: 25"
                      className="w-32"
                      value={localStock[product.id] || ''}
                      onChange={(e) => handleStockChange(product.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      onClick={() => handleSaveStock(product.id)}
                      disabled={loadingId === product.id || !localStock[product.id]}
                      size="sm"
                    >
                      {loadingId === product.id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Salvar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;