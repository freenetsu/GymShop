"use client";

import { Code } from "@/Components/Code";
import { Card, CardHeader } from "@nextui-org/card";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";

type Product = {
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

type CardProductProps = {
  product: Product;
};

export default function CardProduct({ product }: CardProductProps) {
  const { data: session, status } = useSession();

  // ID de l'utilisateur connecté
  const currentUserId = session?.user?.id;

  // Affichage de chargement si la session est en cours de récupération
  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  // Vérification de la disponibilité du produit
  if (!product || !product.image || !product.name) {
    return <p>Produit indisponible</p>;
  }

  return (
    <Card className="w-80 h-auto max-w-sm overflow-hidden bg-black text-white border border-gray-700 rounded-md">
      <CardHeader className="p-0">
        <div className="relative w-full h-0 pb-[100%]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover border-b border-gray-700"
          />
          <p className="absolute top-2 right-2">
            <Code>New</Code>
          </p>
        </div>
      </CardHeader>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating || 0)
                  ? "text-gray-100 fill-gray-100"
                  : "text-gray-500"
              }`}
            />
          ))}
          {/* <span className="ml-2 text-sm text-gray-400">
            {product.reviews || 0} avis
          </span> */}
        </div>
        <p className="mt-2 text-xl font-bold">${product.prix.toFixed(2)}</p>
      </div>
      {/* Appel corrigé avec la gestion de l'ID utilisateur */}
      {/* <AddProductToCart productId={product.id} userId={currentUserId} /> */}
    </Card>
  );
}
