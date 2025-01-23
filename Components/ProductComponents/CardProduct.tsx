"use client";

import { Code } from "@/Components/Code";
import { AddProductToCart } from "@/Components/ProductComponents/AddProductToCart";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
  const currentUserId = session?.user?.id;

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (!product || !product.image || !product.name) {
    return <p>Produit indisponible</p>;
  }

  return (
    <Card className="w-80 h-auto max-w-sm overflow-hidden bg-black text-white border border-gray-700 rounded-md hover:shadow-lg transition-transform duration-200">
      <Link href={`/${product.id}`}>
        <CardHeader className="p-0">
          <div className="relative w-full h-0 pb-[100%]">
            <img
              src={product.image}
              alt={product.name}
              className="absolute top-0 left-0 w-full h-full object-cover border-b border-gray-700"
            />
          </div>
        </CardHeader>
        <CardBody className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-sm text-gray-400 mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">{product.prix}€</p>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{product.rating || "N/A"}</span>
            </div>
          </div>
        </CardBody>
      </Link>
      <AddProductToCart productId={product.id} userId={currentUserId} />
    </Card>
  );
}
