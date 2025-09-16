import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-cookie-golden rounded-full flex items-center justify-center">
                <span className="text-3xl">🍪</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Ravi Cookies</h2>
                <p className="text-sm opacity-90">Cookies Artesanais</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Criamos cookies artesanais com muito amor e ingredientes selecionados. 
              Cada mordida é uma experiência única e deliciosa.
            </p>
            <p className="flex items-center text-sm">
              Feito com <Heart className="w-4 h-4 mx-2 text-red-400" /> para amantes de cookies
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <button 
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="hover:text-cookie-golden transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="hover:text-cookie-golden transition-colors"
                >
                  Produtos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="hover:text-cookie-golden transition-colors"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="hover:text-cookie-golden transition-colors"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(84) 9 9963-0496</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>jfelipesiqueira79@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Caicó, RN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/80">
          <p>&copy; 2025 Ravi Cookies. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;