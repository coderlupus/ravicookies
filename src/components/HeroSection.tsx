import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-cookies.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Delicious cookies" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cookie-chocolate/80 via-cookie-chocolate/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-2xl text-white">
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Sabores que
            <span className="block text-cookie-golden">Conquistam</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Descubra cookies artesanais feitos com ingredientes selecionados e muito amor. 
            Cada mordida é uma experiência única e irresistível.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-cookie-golden hover:bg-cookie-caramel text-cookie-chocolate font-semibold px-8 py-6 text-lg shadow-golden hover:scale-105 transition-all min-w-[180px]"
              onClick={() => {
                const element = document.getElementById('products');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Ver Produtos
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-cookie-chocolate bg-white hover:bg-gray-100 px-8 py-6 text-lg backdrop-blur-sm min-w-[180px]"
              onClick={() => {
                const element = document.getElementById('about');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Saber Mais
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="text-9xl">🍪</div>
      </div>
    </section>
  );
};

export default HeroSection;