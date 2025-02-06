// Components/ProductPageContent.tsx
import { getProductById } from "@/actions/actions";
import { ProductDetails } from "@/Components/ProductComponents/ProductDetails";
import { notFound } from "next/navigation";

type ProductPageContentProps = {
  productId: string;
};

export const ProductPageContent = async ({
  productId,
}: ProductPageContentProps) => {
  try {
    const product = await getProductById(productId);
    return <ProductDetails product={product} />;
  } catch (error) {
    notFound();
  }
};
