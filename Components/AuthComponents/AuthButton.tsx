import React from "react";

interface AuthButtonProps {
  isLoading?: boolean;
}

const AuthButton = ({ isLoading }: AuthButtonProps) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`${
        isLoading ? "bg-gray-600" : "bg-blue-600"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white transition-colors duration-200 ease-in-out hover:bg-blue-700 disabled:cursor-not-allowed`}
    >
      {isLoading ? "Loading..." : "Sign in"}
    </button>
  );
};

export default AuthButton;
