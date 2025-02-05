import prisma from "@/db";

interface Context {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { productId } = await request.json();

    const cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!cart) {
      return Response.json({ error: "Panier non trouvé" }, { status: 404 });
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

    return Response.json({ message: "Produit retiré du panier" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return Response.json(
      { error: "Erreur lors de la suppression du produit du panier" },
      { status: 500 }
    );
  }
}
