import LoginGoogle from "@/Components/AuthComponents/LoginGoogle";
import LoginGithub from "../../Components/AuthComponents/LoginGithub";
import { Dumbbell } from "lucide-react";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
        {/* Logo et Titre */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Bienvenue sur GymShop
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>

        {/* Boutons de connexion */}
        <div className="space-y-4">
          <LoginGithub />
          <LoginGoogle />
          
          {/* Séparateur */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-b from-gray-900 to-black text-gray-400">
                Ou continuez avec
              </span>
            </div>
          </div>

          {/* Liens supplémentaires */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              En vous connectant, vous acceptez nos{" "}
              <a href="#" className="text-primary-500 hover:text-primary-400">
                Conditions d'utilisation
              </a>{" "}
              et notre{" "}
              <a href="#" className="text-primary-500 hover:text-primary-400">
                Politique de confidentialité
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
