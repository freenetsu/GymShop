"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User, Package, CreditCard, Clock } from "lucide-react";

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
    <div className="space-y-6">
      <div className="glass-morphism p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 gradient-text">Informations personnelles</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Nom</label>
            <p className="text-white">{session?.user?.name || "Non renseigné"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <p className="text-white">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="glass-morphism p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Commande #{order.id}</span>
              <span className="text-sm font-medium px-2 py-1 rounded-full bg-primary-500/20">
                {order.status}
              </span>
            </div>
            <div className="text-white font-medium">{order.total.toFixed(2)} €</div>
            <div className="text-sm text-gray-400">{new Date(order.date).toLocaleDateString()}</div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 glass-morphism rounded-lg">
          <Package className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-400">Aucune commande pour le moment</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold gradient-text mb-8">Mon Compte</h1>
        
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
