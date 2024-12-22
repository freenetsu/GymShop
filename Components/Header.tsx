"use client";

import { VisibleMenu } from "@/Components/VisibleMenu";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartBubble, setCartBubble] = useState(0); // State pour la bulle
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              GymShop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/Dress"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Vetements
              </Link>
              <Link
                href="/Accessory"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Accessoires
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* User Account and Cart */}
          <div className="hidden md:flex items-center">
            <div className="relative" onMouseEnter={() => setShowMenu(true)}>
              <div className="relative" ref={menuRef}>
                <div
                  onClick={() => setShowMenu(!showMenu)}
                  className="text-gray-300 hover:text-white p-2 cursor-pointer"
                >
                  <User className="h-6 w-6" />
                </div>
                <SessionProvider>
                  {/* Menu déroulant */}
                  {showMenu && <VisibleMenu />}
                </SessionProvider>
              </div>
            </div>

            <div className="relative">
              <Link
                href="/cart"
                className="text-gray-300 hover:text-white p-2 ml-4"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping cart</span>
              </Link>

              {/* Bulle au-dessus de l'icône */}
              {cartBubble > 0 && (
                <div className="absolute top-2 -right-3 bg-red-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {cartBubble}
                </div>
              )}
            </div>
            <button
              onClick={() => setCartBubble(cartBubble + 1)}
              className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Ajouter au panier
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/categories/electronics"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Electronics
            </Link>
            <Link
              href="/categories/clothing"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Clothing
            </Link>
            <Link
              href="/categories/home"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home & Garden
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <Link href="/account" className="text-gray-300 hover:text-white">
                <User className="h-6 w-6" />
                <span className="sr-only">User account</span>
              </Link>
              <Link
                href="/cart"
                className="text-gray-300 hover:text-white ml-4"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="sr-only">Shopping cart</span>
              </Link>
            </div>
            <div className="mt-3 px-2">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
