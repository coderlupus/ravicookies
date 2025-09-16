import { ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Cart from "./Cart";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Header = () => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gradient-warm border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-golden rounded-full flex items-center justify-center">
              <span className="text-2xl">🍪</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-cookie-chocolate">Ravi Cookies</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')} 
              className="text-foreground hover:text-cookie-caramel transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => handleNavigation('products')} 
              className="text-foreground hover:text-cookie-caramel transition-colors"
            >
              Produtos
            </button>
            <button 
              onClick={() => handleNavigation('about')} 
              className="text-foreground hover:text-cookie-caramel transition-colors"
            >
              Sobre
            </button>
            <button 
              onClick={() => handleNavigation('contact')} 
              className="text-foreground hover:text-cookie-caramel transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground hover:text-cookie-caramel"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold">Criar Conta</h2>
                    <p className="text-sm text-muted-foreground">
                      Preencha seus dados para criar uma conta
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Nome</label>
                      <input 
                        type="text" 
                        placeholder="Seu nome completo"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input 
                        type="email" 
                        placeholder="seu@email.com"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Telefone</label>
                      <input 
                        type="tel" 
                        placeholder="(84) 99999-9999"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <Button className="w-full">
                      Criar Conta
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-foreground hover:text-cookie-caramel relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cookie-caramel text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <Cart onClose={() => setIsCartOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;