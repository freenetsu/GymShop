"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/db";
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  try {
    await signIn(provider);
  } catch (error) {
    console.error(`Erreur de connexion avec ${provider}:`, error);
    throw new Error(`Une erreur est survenue lors de la connexion avec ${provider}`);
  }
};

export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function loginWithCreds(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      throw new Error("Invalid credentials");
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
