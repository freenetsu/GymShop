import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-4xl font-bold mb-4">Page non trouvée</h2>
      <p className="text-xl mb-8">Désolé, la page que vous recherchez n'existe pas.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
