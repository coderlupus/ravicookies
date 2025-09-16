import ProductCard from "./ProductCard";
import chocolateChipImage from "@/assets/chocolate-chip-cookies.jpg";
import oatmealImage from "@/assets/oatmeal-cookies.jpg";
import doubleChocolateImage from "@/assets/double-chocolate-cookies.jpg";

const products = [
  {
    id: "1",
    name: "Cookie de Baunilha",
    description: "Delicioso cookie de baunilha com sabor clássico e irresistível.",
    price: 5.00,
    priceInfo: "1 unidade - R$ 5,00 | 3 unidades - R$ 13,00",
    image: chocolateChipImage
  },
  {
    id: "2", 
    name: "Cookie de Chocolate",
    description: "Cookie de chocolate intenso para os amantes do cacau.",
    price: 5.00,
    priceInfo: "1 unidade - R$ 5,00 | 3 unidades - R$ 13,00",
    image: doubleChocolateImage
  },
  {
    id: "3",
    name: "Mini Cookie de Baunilha",
    description: "Versão mini do nosso cookie de baunilha, perfeito para lanches.",
    price: 8.00,
    priceInfo: "6 unidades - R$ 8,00",
    image: oatmealImage
  },
  {
    id: "4",
    name: "Mini Cookie de Chocolate",
    description: "Mini cookies de chocolate intenso, ideais para compartilhar.",
    price: 8.00,
    priceInfo: "6 unidades - R$ 8,00",
    image: doubleChocolateImage
  }
];

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cookie-chocolate mb-4">
            Sabores Irresistíveis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada cookie é preparado com ingredientes premium e muito carinho. 
            Escolha seus favoritos e experimente o sabor da felicidade.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-cookie-cream">
            <h3 className="text-2xl font-semibold text-cookie-chocolate mb-3">
              Nossos 4 sabores especiais esperando por você!
            </h3>
            <p className="text-muted-foreground mb-6">
              Experimente nossos deliciosos cookies artesanais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-golden hover:bg-cookie-caramel text-white px-8 py-3 rounded-lg font-semibold shadow-golden hover:scale-105 transition-all">
                Ver Todos os Produtos
              </button>
              <button className="border-2 border-cookie-caramel text-cookie-caramel hover:bg-cookie-caramel hover:text-white px-8 py-3 rounded-lg font-semibold transition-all">
                Criar Conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;