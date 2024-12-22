"use client";
import { login } from "@/actions/auth";
import { FaGithub } from "react-icons/fa";

const LoginGithub = () => {
  return (
    <div
      onClick={() => login("github")}
      className="w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-black border border-gray-700 rounded-md p-4 flex justify-center items-center hover:bg-gray-800"
    >
      <FaGithub className="text-white" />
      <p className="text-gray-300">Login with Github</p>
    </div>
  );
};

export default LoginGithub;
