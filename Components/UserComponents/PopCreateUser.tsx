"use client";

import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { createUser } from "../../actions/actions";

export const PopCreateUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Bouton pour ouvrir le formulaire */}

      <button onClick={openModal}>
        <CiSquarePlus className="h-8 w-8 text-gray-300 hover:text-gray-100" />
      </button>

      {/* Fenêtre modale (formulaire) */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <form className="space-y-6" action={createUser}>
              <h2 className="text-xl font-bold text-white mb-4">
                Ajouter un Utilisateur
              </h2>
              <input
                type="text"
                name="nameUser"
                placeholder="Nom Utilisateur"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 font-semibold text-black bg-white rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Ajouter l'Utilisateur
              </button>
            </form>
            {/* Bouton pour fermer le modal */}
            <button
              onClick={closeModal}
              className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
