// "use client";

// import { addProductToCart } from "@/actions/actions";
// import { Button } from "@nextui-org/button";
// import { CardFooter } from "@nextui-org/card";
// import { ShoppingCart } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// export const AddProductToCart = ({ productId, userId: propUserId }) => {
//   const { data: session } = useSession();
//   const userId = session?.user?.id || propUserId; // Utiliser l'ID de session si disponible
//   const [isAdding, setIsAdding] = useState(false);

//   const handleAddToCart = async () => {
//     console.log(userId);
//     if (!userId) {
//       alert("Vous devez être connecté pour ajouter des produits au panier !");
//       return;
//     }

//     setIsAdding(true);

//     try {
//       // Appel de la fonction addProductToCart
//       await addProductToCart(productId, userId);

//       // Feedback utilisateur
//       alert("Produit ajouté au panier !");
//     } catch (error) {
//       console.error("Erreur lors de l'ajout au panier :", error);
//       alert("Une erreur est survenue. Veuillez réessayer.");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   return (
//     <CardFooter className="p-4 pt-0">
//       <Button
//         className="w-full bg-white text-black hover:bg-gray-200 rounded-md"
//         onClick={handleAddToCart}
//         disabled={isAdding}
//       >
//         {isAdding ? (
//           <>
//             <ShoppingCart className="mr-2 h-4 w-4 animate-spin" />
//             Ajout...
//           </>
//         ) : (
//           <>
//             <ShoppingCart className="mr-2 h-4 w-4" />
//             Ajouter au panier
//           </>
//         )}
//       </Button>
//     </CardFooter>
//   );
// };
