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
      className="w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-black border border-gray-700 rounded-md p-4 flex justify-center items-center hover:bg-gray-800"
    >
      <FcGoogle />
      <span className="text-gray-300">Login with Google</span>
    </button>
  );
};

export default LoginGoogle;
