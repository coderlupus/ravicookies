import chocolateChipImage from "@/assets/chocolate-chip-cookies.jpg";
import oatmealImage from "@/assets/oatmeal-cookies.jpg";
import doubleChocolateImage from "@/assets/double-chocolate-cookies.jpg";

export const products = [
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