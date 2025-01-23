import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    console.log("Getting cart for user:", params.userId);
    
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Trouver ou créer un panier pour l'utilisateur
    let cart = await prisma.cart.findFirst({
      where: {
        userId: params.userId,
      },
      include: {
        products: true,
      },
    });

    if (!cart) {
      console.log("Creating new cart for user");
      cart = await prisma.cart.create({
        data: {
          userId: params.userId,
        },
        include: {
          products: true,
        },
      });
    }

    console.log("Cart found:", cart);
    return NextResponse.json(cart.products);
  } catch (error) {
    console.error("Erreur détaillée lors de la récupération du panier:", error);
    return NextResponse.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    );
  }
}
