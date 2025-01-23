import { NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { productId } = await request.json();

    const cart = await prisma.cart.findFirst({
      where: {
        userId: params.userId,
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: "Panier non trouvé" },
        { status: 404 }
      );
    }

    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        products: {
          disconnect: {
            id: productId,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
