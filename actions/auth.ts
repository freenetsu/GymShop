"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  try {
    await signIn(provider);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthSignin":
          throw new Error("Erreur lors de la connexion avec " + provider);
        case "OAuthCallback":
          throw new Error("Erreur lors de la réponse de " + provider);
        default:
          throw new Error("Une erreur est survenue lors de la connexion");
      }
    }
    throw error;
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

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const loginWithCreds = async (formData: FormData): Promise<void> => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const rawFormData = {
      email: email as string,
      password: password as string,
      redirectTo: "/",
    };

    await signIn("credentials", rawFormData);
    revalidatePath("/");
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Invalid credentials");
        default:
          throw new Error("Authentication failed");
      }
    }
    throw error;
  }
};
