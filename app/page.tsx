import Banner from "@/Components/Banner";
import { Introduce } from "@/Components/Introduce";
import { BrandProductRandom } from "@/Components/ProductComponents/BrandProductRandom";
import { Spacing } from "@/Components/Spacing";
export default function Home() {
  return (
    <main className="">
      <Spacing size="sm" />
      <Banner />
      <Spacing size="md" />
      <Introduce
        title="Découvrez Nos Meilleures Sélections"
        description="Explorez nos produits les plus populaires et faites votre choix parmi notre collection soigneusement sélectionnée."
      />
      <BrandProductRandom />
      <Spacing size="sm" />
      <Introduce
        title="Nos Dernières Nouveautés"
        description="Restez à la pointe de la mode avec nos produits fraîchement ajoutés à notre collection."
      />
      <BrandProductRandom />
      <Spacing size="sm" />
      <Introduce
        title="Trouvez Votre Style Parfait"
        description="Une sélection qui allie qualité, confort et tendance, pensée pour répondre à vos envies."
      />
      <BrandProductRandom />
    </main>
  );
}
