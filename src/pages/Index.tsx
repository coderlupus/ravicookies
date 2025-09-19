import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";

const Index = () => {
  return (
    // Os Provedores não ficam mais aqui
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="products">
          <ProductShowcase />
        </section>
        <section id="about" className="py-16 bg-cookie-cream">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-cookie-chocolate mb-6">Sobre a Ravi Cookies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Somos uma empresa familiar que produz cookies artesanais com muito carinho e ingredientes selecionados. 
              Cada cookie é feito com amor para proporcionar momentos especiais e sabores únicos.
            </p>
          </div>
        </section>
        <section id="contact" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-cookie-chocolate mb-6">Entre em Contato</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Entre em contato conosco pelo WhatsApp para fazer seu pedido!
            </p>
            <p className="text-xl font-semibold text-cookie-caramel">
              📱 +55 84 99963-0496
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;