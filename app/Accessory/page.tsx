import { BannerComp } from "@/Components/BannerComp";
import { AccessoryProduct } from "@/Components/ProductComponents/AccessoryProduct";
import { Spacing } from "@/Components/Spacing";

const PageAccessory = () => {
  return (
    <div>
      <Spacing size="sm" />
      <BannerComp
        title="ACCESSORY"
        minTitle="SHOP"
        description="Découvrez notre sélection de produits pour l'entraînement fonctionnel"
      />
      <Spacing size="sm" />

      <AccessoryProduct />
    </div>
  );
};

export default PageAccessory;
