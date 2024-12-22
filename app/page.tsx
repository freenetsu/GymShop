import Banner from "@/Components/Banner";
import { Spacing } from "@/Components/Spacing";
import { BrandProductAll } from "../Components/ProductComponents/BrandProductAll";

export default function Home() {
  return (
    <main className="">
      <Spacing size="sm" />
      <Banner />
      <Spacing size="sm" />
      <BrandProductAll />
    </main>
  );
}
