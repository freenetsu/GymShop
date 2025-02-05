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

interface CardProductProps {
  product: Product;
}

export function CardProduct({ product }: CardProductProps) {
  const { data: session, status } = useSession();
  const currentUserId = session?.user?.id;

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (!product || !product.image || !product.name) {
    return <p>Produit indisponible</p>;
  }

  return (
    <Card className="py-4">
      <Link href={`/${product.id}`}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{product.type}</p>
          <small className="text-default-500">{product.stock} en stock</small>
          <h4 className="font-bold text-large">{product.name}</h4>
          <div className="flex items-center">
            {product.rating && (
              <>
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="ml-1">{product.rating}</span>
              </>
            )}
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover h-[140px]"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-bold">{product.prix}€</div>
          </div>
        </CardBody>
      </Link>
      <AddProductToCart productId={product.id} />
    </Card>
  );
}
