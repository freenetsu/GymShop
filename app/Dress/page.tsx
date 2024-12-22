import { BannerComp } from "@/Components/BannerComp";
import { DressProduct } from "@/Components/ProductComponents/DressProduct";
import { Spacing } from "@/Components/Spacing";

const PageDress = () => {
  return (
    <div>
      <Spacing size="sm" />
      <BannerComp
        title="DRESS"
        minTitle="SHOP"
        description="Découvrez notre sélection de produits pour l'entraînement fonctionnel"
      />
      <Spacing size="sm" />
      <DressProduct />
    </div>
  );
};

export default PageDress;
