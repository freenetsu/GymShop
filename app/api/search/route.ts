import { NextResponse } from "next/server";
import prisma, { connectDB } from "@/db";

export async function GET(request: Request) {
  try {
    // Connexion à la base de données
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    console.log("API de recherche - Requête reçue");
    console.log("Terme de recherche:", query);

    if (!query || query.trim() === "") {
      console.log("Aucun terme de recherche fourni");
      return NextResponse.json([]);
    }

    // Vérification de la table products
    try {
      const productsCount = await prisma.product.count();
      console.log(`Nombre total de produits dans la base: ${productsCount}`);
    } catch (countError) {
      console.error("Erreur lors du comptage des produits:", countError);
    }

    // Exécution de la recherche
    console.log("Exécution de la recherche avec les critères suivants:", {
      name: { contains: query },
      description: { contains: query },
      type: { contains: query },
    });

    // Recherche simple sans mode insensitive (SQLite ne le supporte pas)
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
          {
            type: {
              contains: query,
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

    console.log(`Recherche terminée - ${products.length} résultats trouvés`);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erreur détaillée dans l'API de recherche:", error);
    
    return NextResponse.json(
      { 
        error: "Erreur lors de la recherche",
        details: error instanceof Error ? error.message : "Erreur inconnue"
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
