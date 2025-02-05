import { CardProduct } from "@/Components/ProductComponents/CardProduct";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import prisma from "@/db";

// Fonction pour mélanger les éléments d'un tableau
function shuffleArray(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export const BrandProductRandom = async () => {
  // Récupère tous les produits depuis la base de données
  const productsBrand = await prisma.product.findMany({});

  // Mélange les produits
  const shuffledProducts = shuffleArray(productsBrand);

  return (
    <div className="bg-black text-white py-10">
      <div className="mx-auto max-w-screen-xl">
        {/* Limite la largeur et centre le carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 gap-6">
            {shuffledProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-1 md:basis-1/3 lg:basis-1/4 ml-3.5"
              >
                <div className="p-8">
                  <CardProduct product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
