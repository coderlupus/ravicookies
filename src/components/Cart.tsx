import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, calculateItemPrice } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar o pedido.",
        variant: "destructive",
      });
      return;
    }

    const whatsappNumber = "5584999630496";
    let message = "Olá, gostaria de fazer um pedido!\n\n";
    
    items.forEach(item => {
      message += `*Produto:* ${item.name}\n`;
      message += `*Quantidade:* ${item.quantity}${item.isMini ? ' (pacotes de 6)' : ''}\n`;
      message += `*Valor total:* R$ ${calculateItemPrice(item).toFixed(2)}\n\n`;
    });
    
    message += `*Valor total do pedido:* R$ ${getTotalPrice().toFixed(2)}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
    
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Seu pedido foi enviado para o WhatsApp!",
    });
  };

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-cookie-chocolate">Carrinho</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
          <Button onClick={onClose} variant="outline">
            Continuar comprando
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-cookie-chocolate flex items-center justify-between">
          Carrinho
          <Button variant="ghost" size="sm" onClick={clearCart}>
            Limpar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center space-x-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-cookie-chocolate truncate">
                  {item.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  R$ {calculateItemPrice(item).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-500 hover:text-red-700"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-cookie-chocolate">Total:</span>
          <span className="font-bold text-lg text-cookie-chocolate">
            R$ {getTotalPrice().toFixed(2)}
          </span>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full bg-gradient-golden hover:bg-cookie-caramel text-white"
            onClick={handleCheckout}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Finalizar no WhatsApp
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Continuar comprando
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;