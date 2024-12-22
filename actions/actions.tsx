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
  // Rechercher un panier existant pour l'utilisateur
  let cart = await prisma.cart.findFirst({
    where: {
      id: userId,
    },
  });

  // Si aucun panier n'existe, en créer un
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  // Ajouter le produit au panier (connecter via l'ID)
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      products: {
        connect: { id: productId },
      },
    },
  });

  // Revalidation de la page du panier
  revalidatePath(`/cart/${userId}`);
}
