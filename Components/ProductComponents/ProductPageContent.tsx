// Components/ProductPageContent.tsx
import { getProductById } from "@/actions/actions";
import { ProductDetails } from "@/Components/ProductComponents/ProductDetails";

type ProductPageContentProps = {
  productId: string;
};

export const ProductPageContent = async ({
  productId,
}: ProductPageContentProps) => {
  const product = await getProductById(productId);

  return <ProductDetails product={product} />;
};
