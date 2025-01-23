// app/[id]/page.tsx
import { ProductPageContent } from "@/Components/ProductComponents/ProductPageContent";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <ProductPageContent productId={params.id} />
    </div>
  );
}
