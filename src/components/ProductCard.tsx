import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useStock } from "@/context/StockContext"; // 1. Importe o hook de estoque

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  priceInfo?: string;
  image: string;
}

const ProductCard = ({ id, name, description, price, priceInfo, image }: ProductCardProps) => {
  const { addItem } = useCart();
  const { getStock } = useStock(); // 2. Pegue a função getStock do contexto
  const { toast } = useToast();

  const currentStock = getStock(id); // 3. Obtenha o estoque atual do produto
  const isOutOfStock = currentStock <= 0; // 4. Verifique se está esgotado

  const handleAddToCart = () => {
    // 5. Adicione uma verificação antes de adicionar ao carrinho
    if (isOutOfStock) {
      toast({
        title: "Produto Esgotado",
        description: "Este item não está mais disponível em estoque.",
        variant: "destructive",
      });
      return; // Para a execução da função aqui
    }

    const isMini = name.includes('Mini');
    addItem({ id, name, price, image });
    const toastResult = toast({
      title: "Produto adicionado",
      description: `${name} foi adicionado ao carrinho!${isMini ? ' (6 unidades)' : ''}`,
      action: (
        <button 
          onClick={() => toastResult.dismiss()}
          className="text-sm underline hover:no-underline"
        >
          Fechar
        </button>
      ),
    });
  };

  return (
    <Card className="group hover:shadow-golden transition-all duration-300 overflow-hidden border-border/50">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* 6. Adicione um aviso visual de "Esgotado" */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Esgotado</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-cookie-chocolate"
        >
          <Heart className="w-4 h-4" />
        </Button>
        <div className="absolute bottom-3 left-3 bg-cookie-golden text-white px-2 py-1 rounded-md text-sm font-medium">
          R$ {price.toFixed(2)}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-cookie-chocolate mb-2 group-hover:text-cookie-caramel transition-colors">
          {name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        {priceInfo && (
          <p className="text-xs text-muted-foreground mb-4">
            {priceInfo}
          </p>
        )}
        
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-gradient-golden hover:bg-cookie-caramel text-white shadow-soft"
            onClick={handleAddToCart}
            disabled={isOutOfStock} // 7. Desabilite o botão se estiver esgotado
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isOutOfStock ? "Esgotado" : "Adicionar"}
          </Button>
          <Button variant="outline" className="border-cookie-caramel text-cookie-caramel hover:bg-cookie-caramel hover:text-white px-3 py-2 min-w-[80px]">
            Ver mais
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;