"use client";

import { VisibleMenu } from "@/Components/VisibleMenu";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchBar } from "./SearchBar";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.user?.id && status === "authenticated") {
      fetchCartItemCount();
    }
  }, [session, status]);

  const fetchCartItemCount = async () => {
    try {
      const response = await fetch(`/api/cart/${session?.user?.id}`);
      const products = await response.json();
      setCartItemCount(products.length);
    } catch (error) {
      console.error("Erreur lors du chargement du nombre d'articles:", error);
    }
  };

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold font-heading  text-gray-300"
            >
              GymShop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/Dress"
                className="text-gray-300 hover:text-white hover:bg-primary-600/20 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Vetements
              </Link>
              <Link
                href="/Accessory"
                className="text-gray-300 hover:text-white hover:bg-primary-600/20 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Accessoires
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          {/* Cart and User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative text-gray-300 hover:text-white hover-effect p-2 rounded-full hover:bg-primary-600/20"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-float">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="relative" onMouseEnter={() => setShowMenu(true)}>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="text-gray-300 hover:text-white hover-effect p-2 rounded-full hover:bg-primary-600/20"
                >
                  <User className="h-6 w-6" />
                </button>
                {showMenu && <VisibleMenu />}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white hover-effect p-2 rounded-full hover:bg-primary-600/20"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-morphism mt-2 rounded-lg overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/Dress"
                className="text-gray-300 hover:text-white hover:bg-primary-600/20 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Vetements
              </Link>
              <Link
                href="/Accessory"
                className="text-gray-300 hover:text-white hover:bg-primary-600/20 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Accessoires
              </Link>
              <div className="px-3 py-2">
                <SearchBar />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
