"use server";
import prisma from "@/db";
import { revalidatePath } from "next/cache";

//For create :
export async function createProduct(formData: FormData) {
  await prisma.product.create({
    data: {
      name: formData.get("nameC") as string,
      description: formData.get("descriptionC") as string,
      type: formData.get("typeC") as string,
      prix: parseInt(formData.get("prixC") as string),
      stock: parseInt(formData.get("stockC") as string),
    },
  });
  revalidatePath("/products");
}

export async function createUser(formData: FormData) {
  await prisma.user.create({
    data: {
      name: formData.get("nameUser") as string,
      email: formData.get("email") as string,
    },
  });
  revalidatePath("/users");
}

// For Delete
export async function deleteUser(userId: string) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  revalidatePath("/users");
}

export async function deleteProduct(productId: string) {
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  revalidatePath("/products");
}

// For Update
export async function updateUser(formData: FormData) {
  await prisma.user.update({
    where: { id: formData.get("idUser") as string },
    data: {
      name: formData.get("nameUserUpdate") as string,
      email: formData.get("emailUpdate") as string,
    },
  });
  revalidatePath("/users");
}
export async function updateProduct(formData: FormData) {
  const productId = formData.get("productId") as string;
  if (!productId) throw new Error("Product ID is required.");

  await prisma.product.update({
    where: { id: productId },
    data: {
      name: formData.get("nameU") as string,
      description: formData.get("descriptionU") as string,
      type: formData.get("typeU") as string,
      prix: parseInt((formData.get("prixU") as string) || "0", 10),
      stock: parseInt((formData.get("stockU") as string) || "0", 10),
    },
  });
  revalidatePath("/products");
}

export async function addProductToCart(productId: string, userId: string) {
  try {
    // Vérifier si le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Produit non trouvé");
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Rechercher un panier existant pour l'utilisateur
    let cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        products: true,
      },
    });

    // Si aucun panier n'existe, en créer un
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          products: {
            connect: { id: productId },
          },
        },
        include: {
          products: true,
        },
      });
    } else {
      // Vérifier si le produit est déjà dans le panier
      const productExists = cart.products.some((p) => p.id === productId);

      if (!productExists) {
        // Ajouter le produit au panier existant
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            products: {
              connect: { id: productId },
            },
          },
        });
      }
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid product ID");
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Unable to fetch product");
  }
}

export async function searchProducts(query: string): Promise<
  Array<{
    id: string;
    name: string;
    description: string | null;
    prix: number;
    image: string | null;
    type: string | null;
  }>
> {
  if (!query || query.trim() === "") {
    return [];
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            type: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        prix: true,
        image: true,
        type: true,
      },
      take: 5,
    });

    return products;
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    return []; // Retourner un tableau vide au lieu de lancer une erreur
  }
}
