import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET() {
  try {
    await prisma.$connect();
    console.log("Connexion à la base de données réussie");

    const productsCount = await prisma.product.count();
    console.log(`Nombre de produits: ${productsCount}`);

    const products = await prisma.product.findMany({
      take: 1
    });
    
    await prisma.$disconnect();

    return NextResponse.json({
      status: "success",
      productsCount,
      sampleProduct: products[0] || null
    });
  } catch (error) {
    console.error("Erreur de test de la base de données:", error);
    return NextResponse.json({
      status: "error",
      error: error instanceof Error ? error.message : "Erreur inconnue"
    }, { status: 500 });
  }
}
