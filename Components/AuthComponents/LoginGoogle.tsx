"use client";
import { login } from "@/actions/auth";
import { FaGoogle } from "react-icons/fa";

const LoginGoogle = () => {
  return (
    <div
      onClick={() => login("google")}
      className="w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-black border border-gray-700 rounded-md p-4 flex justify-center items-center hover:bg-gray-800"
    >
      <FaGoogle className="text-white" />
      <p className="text-gray-300">Login with Google</p>
    </div>
  );
};

export default LoginGoogle;
