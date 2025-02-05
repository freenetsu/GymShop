"use client";

import { addProductToCart } from "@/actions/actions";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface AddProductToCartProps {
  productId: string;
}

export const AddProductToCart = ({ productId }: AddProductToCartProps) => {
  const { data: session } = useSession();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!session?.user?.id) {
      toast.error("Veuillez vous connecter pour ajouter au panier");
      return;
    }

    try {
      setIsAdding(true);
      await addProductToCart(productId, session.user.id);
      toast.success("Produit ajouté au panier");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error instanceof Error ? error.message : "Erreur lors de l'ajout au panier");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      isLoading={isAdding}
      onClick={handleAddToCart}
      className="w-full"
      color="primary"
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      Ajouter au panier
    </Button>
  );
};
