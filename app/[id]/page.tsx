// app/[id]/page.tsx
import { ProductPageContent } from "@/Components/ProductComponents/ProductPageContent";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return (
    <div>
      <ProductPageContent productId={id} />
    </div>
  );
}
