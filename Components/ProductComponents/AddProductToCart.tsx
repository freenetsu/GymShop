"use client";

import { addProductToCart } from "@/actions/actions";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const AddProductToCart = ({ productId }: { productId: string }) => {
  const { data: session, status } = useSession();
  const [isAdding, setIsAdding] = useState(false);

  console.log("Session status:", status);
  console.log("Session data:", session);

  const handleAddToCart = async () => {
    console.log("Current session:", session);
    console.log("User ID:", session?.user?.id);

    if (!session?.user?.id) {
      toast.error("Veuillez vous connecter pour ajouter des produits au panier");
      return;
    }

    setIsAdding(true);

    try {
      await addProductToCart(productId, session.user.id);
      toast.success("Produit ajouté au panier !");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      toast.error("Une erreur est survenue lors de l'ajout au panier");
    } finally {
      setIsAdding(false);
    }
  };

  // Afficher un message si la session est en cours de chargement
  if (status === "loading") {
    return (
      <div className="p-4 pt-0">
        <Button
          className="w-full bg-white text-black rounded-md opacity-50"
          disabled
        >
          <ShoppingCart className="mr-2 h-4 w-4 animate-spin" />
          Chargement...
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 pt-0">
      <Button
        className="w-full bg-white text-black hover:bg-gray-200 rounded-md"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <ShoppingCart className="mr-2 h-4 w-4 animate-spin" />
            Ajout en cours...
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {status === "authenticated" ? "Ajouter au panier" : "Connectez-vous"}
          </>
        )}
      </Button>
    </div>
  );
};
