"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const LoginGoogle = () => {
  const handleLogin = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <FcGoogle className="w-5 h-5" />
      <span className="font-medium">Continuer avec Google</span>
    </button>
  );
};

export default LoginGoogle;
