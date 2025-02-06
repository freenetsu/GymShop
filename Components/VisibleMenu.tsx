"use client";

import { ClipboardList, LogOut, User, Users } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function VisibleMenu() {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email === "guizanifares0@gmail.com") {
      setIsAdmin(true);
    }
  }, [session?.user?.email]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-800 overflow-hidden z-50">
      <div className="py-2">
        {session ? (
          <>
            <div className="px-4 py-3 border-b border-gray-800">
              <p className="text-sm font-semibold text-white">
                {session.user?.name || "Utilisateur"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {session.user?.email}
              </p>
              {isAdmin && (
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-primary-500/20 text-white rounded-full ">
                  Administrateur
                </span>
              )}
            </div>

            <div className="py-1 space-y-0.5">
              <Link
                href="/account"
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <User className="w-4 h-4 mr-3 opacity-70" />
                Mon Compte
              </Link>

              {isAdmin && (
                <>
                  <div className="px-3 py-1">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Administration
                    </div>
                  </div>
                  <Link
                    href="/ListUsers"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <Users className="w-4 h-4 mr-3 opacity-70" />
                    Liste des utilisateurs
                  </Link>
                  <Link
                    href="/ListProducts"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <ClipboardList className="w-4 h-4 mr-3 opacity-70" />
                    Liste des produits
                  </Link>
                </>
              )}

              <div className="pt-2 px-3">
                <div className="border-t border-gray-800"></div>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3 opacity-70" />
                Déconnexion
              </button>
            </div>
          </>
        ) : (
          <div className="py-1">
            <Link
              href="/sign-in"
              className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <User className="w-4 h-4 mr-3 opacity-70" />
              Connexion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
