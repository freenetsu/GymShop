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
      className="w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-black border border-gray-700 rounded-md p-4 flex justify-center items-center hover:bg-gray-800"
    >
      <FaGithub className="text-white" />
      <span className="text-gray-300">Login with Github</span>
    </button>
  );
};

export default LoginGithub;
