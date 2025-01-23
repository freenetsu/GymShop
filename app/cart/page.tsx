"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Trash2, ShoppingBag, CreditCard, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

type CartProduct = {
  id: string;
  name: string;
  description: string | null;
  prix: number;
  image: string | null;
  quantity?: number;
};

export default function CartPage() {
  const { data: session } = useSession();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCartProducts();
    } else {
      setIsLoading(false);
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [session]);

  const fetchCartProducts = async () => {
    try {
      const response = await fetch(`/api/cart/${session?.user?.id}`);
      const data = await response.json();
      setCartProducts(data);
    } catch (error) {
      console.error("Erreur lors du chargement du panier:", error);
      toast.error("Impossible de charger votre panier");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setIsRemoving(productId);
    try {
      await fetch(`/api/cart/${session?.user?.id}/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      toast.success("Produit retiré du panier");
      fetchCartProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      toast.error("Impossible de retirer le produit");
    } finally {
      setIsRemoving(null);
    }
  };

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => total + product.prix, 0);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Card className="max-w-md w-full mx-4 bg-gray-800 border border-gray-700">
          <CardBody className="p-8 text-center">
            <div className="mb-6">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Connectez-vous pour voir votre panier
            </h2>
            <p className="text-gray-400 mb-6">
              Vous pourrez voir vos articles et procéder au paiement après vous être connecté
            </p>
            <Button
              href="/api/auth/signin"
              as="a"
              className="w-full bg-white text-black hover:bg-gray-100"
              size="lg"
            >
              Se connecter
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-white text-lg">Chargement de votre panier...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Votre Panier</h1>
        
        {cartProducts.length === 0 ? (
          <Card className="bg-gray-800 border border-gray-700">
            <CardBody className="p-8 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Votre panier est vide
              </h2>
              <p className="text-gray-400 mb-6">
                Découvrez nos produits et commencez vos achats
              </p>
              <Button
                href="/"
                as="a"
                className="bg-white text-black hover:bg-gray-100"
                size="lg"
              >
                Continuer mes achats
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des produits */}
            <div className="lg:col-span-2 space-y-4">
              {cartProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="bg-gray-800 border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors"
                >
                  <CardBody className="p-4">
                    <div className="flex gap-4">
                      <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {product.name}
                            </h3>
                            {product.description && (
                              <p className="text-sm text-gray-400 mt-1">
                                {product.description}
                              </p>
                            )}
                          </div>
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            onClick={() => removeFromCart(product.id)}
                            isLoading={isRemoving === product.id}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                        <div className="mt-4">
                          <span className="text-xl font-bold text-white">
                            {product.prix.toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Résumé de la commande */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800 border border-gray-700 sticky top-4">
                <CardBody className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Résumé de la commande
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Sous-total</span>
                      <span>{calculateTotal().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Livraison</span>
                      <span>Gratuite</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-white">Total</span>
                        <span className="text-2xl font-bold text-white">
                          {calculateTotal().toFixed(2)} €
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">TVA incluse</p>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-white text-black hover:bg-gray-100"
                    size="lg"
                    startContent={<CreditCard className="w-5 h-5" />}
                  >
                    Procéder au paiement
                  </Button>

                  <div className="mt-6 text-center">
                    <Button
                      href="/"
                      as="a"
                      variant="light"
                      className="text-gray-400 hover:text-white"
                    >
                      Continuer mes achats
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
