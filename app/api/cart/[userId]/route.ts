import prisma from "@/db";

interface Context {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    console.log("Getting cart for user:", userId);

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return Response.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Trouver ou créer un panier pour l'utilisateur
    let cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        products: true,
      },
    });

    if (!cart) {
      console.log("Creating new cart for user");
      cart = await prisma.cart.create({
        data: {
          userId: userId,
        },
        include: {
          products: true,
        },
      });
    }

    return Response.json(cart);
  } catch (error) {
    console.error("Error in GET cart:", error);
    return Response.json(
      { error: "Erreur lors de la récupération du panier" },
      { status: 500 }
    );
  }
}
