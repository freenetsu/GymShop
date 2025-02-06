"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const LoginGithub = () => {
  const handleLogin = async () => {
    try {
      await signIn("github", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 text-white bg-[#24292F] hover:bg-[#24292F]/90 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <FaGithub className="w-5 h-5" />
      <span className="font-medium">Continuer avec GitHub</span>
    </button>
  );
};

export default LoginGithub;
