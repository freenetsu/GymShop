"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const VisibleMenu = () => {
  const { data: session } = useSession();
  const [role, setRole] = useState<number | null>(null);

  useEffect(() => {
    if (session?.user && session.user.email === "guizanifares0@gmail.com") {
      setRole(1);
    } else {
      setRole(0);
    }
  }, [session]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirection vers la page d'accueil
  };

  if (session?.user) {
    return (
      <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 shadow-lg rounded-lg z-50">
        <Link
          href="/UserData"
          className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
        >
          Mes Informations
        </Link>
        {role === 1 && (
          <>
            <Link
              href="/ListUsers"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
            >
              Liste Utilisateurs
            </Link>
            <Link
              href="/ListProducts"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
            >
              Liste Produits
            </Link>
          </>
        )}
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
        >
          Se Déconnecter
        </button>
      </div>
    );
  } else {
    return (
      <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 shadow-lg rounded-lg z-50">
        <Link
          href="/sign-in"
          className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
        >
          Se Connecter
        </Link>
      </div>
    );
  }
};
