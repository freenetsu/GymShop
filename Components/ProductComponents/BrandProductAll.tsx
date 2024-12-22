import CardProduct from "@/Components/ProductComponents/CardProduct";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import prisma from "@/db";

export const BrandProductAll = async () => {
  // Récupère uniquement les produits avec la catégorie "dress"
  const productsBrand = await prisma.product.findMany({});

  return (
    <div className="bg-black text-white py-10">
      <div className="mx-auto max-w-screen-xl">
        {/* Limite la largeur et centre le carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 gap-6">
            {productsBrand.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-1 md:basis-1/3 lg:basis-1/4 ml-3.5"
              >
                <CardProduct product={product} />
                {/* Passer chaque produit comme prop */}
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
