"use client";

import { Clock, CreditCard, Package, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
};

export default function AccountPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Ici vous pouvez charger les commandes de l'utilisateur
    // depuis votre API si nécessaire
  }, [session]);

  const renderProfile = () => (
    <div className="space-y-8">
      <div className="glass-morphism p-8 rounded-xl border border-gray-700/50 shadow-lg">
        <div className="flex items-center mb-6">
          <User className="w-8 h-8 text-primary-500 mr-4" />
          <h3 className="text-2xl font-bold text-gray-300">
            Informations personnelles
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Nom</label>
            <p className="text-lg text-white bg-gray-800/50 p-3 rounded-lg">
              {session?.user?.name || "Non renseigné"}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <p className="text-lg text-white bg-gray-800/50 p-3 rounded-lg">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="glass-morphism p-6 rounded-xl border border-gray-700/50 shadow-lg hover:border-primary-500/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Package className="w-6 h-6 text-primary-500" />
                <span className="text-lg font-medium text-white">
                  Commande #{order.id}
                </span>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 font-medium">
                {order.status}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span className="font-medium text-white">
                  {order.total.toFixed(2)} €
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(order.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 glass-morphism rounded-xl border border-gray-700/50">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-300">
            Aucune commande pour le moment
          </p>
          <p className="text-gray-400 mt-2">
            Vos commandes apparaîtront ici une fois que vous aurez effectué un
            achat
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold  text-gray-300 mb-8">Mon Compte</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="glass-morphism p-4 rounded-lg h-fit">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={
                  "flex items-center w-full px-4 py-2 text-sm rounded-lg " +
                  (activeTab === "profile"
                    ? "bg-primary-500/20 text-white"
                    : "text-gray-400 hover:bg-primary-500/10 hover:text-white")
                }
              >
                <User className="w-4 h-4 mr-3" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={
                  "flex items-center w-full px-4 py-2 text-sm rounded-lg " +
                  (activeTab === "orders"
                    ? "bg-primary-500/20 text-white"
                    : "text-gray-400 hover:bg-primary-500/10 hover:text-white")
                }
              >
                <Package className="w-4 h-4 mr-3" />
                Commandes
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === "profile" && renderProfile()}
            {activeTab === "orders" && renderOrders()}
          </div>
        </div>
      </div>
    </div>
  );
}
