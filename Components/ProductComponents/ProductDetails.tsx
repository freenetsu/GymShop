import { Star, Package2, ShoppingCart, Clock } from "lucide-react";
import { AddProductToCart } from "./AddProductToCart";

// Components/ProductDetails.tsx
type ProductDetailsProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    type: string | null;
    prix: number;
    stock: number;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    rating: number | null;
  };
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 text-white bg-gray-800 rounded-lg shadow-lg">
          Produit non trouvé
        </div>
      </div>
    );
  }

  const isInStock = product.stock > 0;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gray-800">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info Section */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full">
                {product.type || "Non spécifié"}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white">
                  {product.rating ? product.rating.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white">{product.name}</h1>
          </div>

          {/* Price and Stock */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-white">
                {product.prix.toFixed(2)} €
              </p>
              <p className="text-sm text-gray-400">Prix TTC</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${
              isInStock 
                ? "bg-green-500/10 text-green-500" 
                : "bg-red-500/10 text-red-500"
            }`}>
              {isInStock ? `${product.stock} en stock` : "Rupture de stock"}
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-invert">
            <p className="text-gray-300 leading-relaxed">
              {product.description || "Aucune description disponible."}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <Package2 className="w-5 h-5" />
              <span>Livraison gratuite</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-5 h-5" />
              <span>Expédition sous 24h</span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="pt-6">
            <AddProductToCart productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
