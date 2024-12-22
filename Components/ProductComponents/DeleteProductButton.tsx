"use client";
import { deleteProduct } from "@/actions/actions";
import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteProductButtonProps {
  productId: string;
  className?: string;
}

const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({
  productId,
}) => {
  const handleDelete = async () => {
    await deleteProduct(productId);
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-800 hover:text-red-600 "
      title="Supprimer le produit"
    >
      <Trash2 className="h-7 w-7" />
    </button>
  );
};

export default DeleteProductButton;
