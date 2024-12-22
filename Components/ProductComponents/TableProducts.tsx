import prisma from "../../db";
import { PopCreateProduct } from "..//ProductComponents/PopCreateProduct";
import DeleteProductButton from "../ProductComponents/DeleteProductButton";
import { PopUpdateProduct } from "../ProductComponents/PopUpdateProduct";

import { Spacing } from "../Spacing";

export async function TableProducts() {
  const products = await prisma.product.findMany();
  return (
    <div>
      <div className="flex mb-1 p-4 gap-2">
        <h1 className="text-2xl font-bold text-white">Produits</h1>
        <PopCreateProduct />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-black">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Categorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Modifier
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-800 transition duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.prix}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.stock}
                </td>
                <td className="px-6 py-4  text-sm text-gray-300 flex gap-3">
                  <DeleteProductButton
                    productId={product.id}
                    className="text-red-500 hover:text-red-400"
                  />
                  <PopUpdateProduct productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Spacing size="md" />
        <Spacing size="md" />
      </div>
    </div>
  );
}
