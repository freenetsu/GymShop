import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient().$extends(withAccelerate({
    log: ["query", "error", "warn"],
  }));

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Fonction utilitaire pour gérer la connexion
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Base de données connectée avec succès");
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    throw error;
  }
}

export default prisma;
