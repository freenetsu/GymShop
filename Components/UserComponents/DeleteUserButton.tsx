"use client";
import { deleteUser } from "@/actions/actions";
import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteUserButtonProps {
  userId: string;
  className?: string;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId }) => {
  const handleDelete = async () => {
    await deleteUser(userId);
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-800 hover:text-red-600 "
      title="Supprimer l'utilisateur"
    >
      <Trash2 className="h-7 w-7" />
    </button>
  );
};

export default DeleteUserButton;
