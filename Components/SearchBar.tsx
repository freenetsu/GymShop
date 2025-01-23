"use client";

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

type SearchResult = {
  id: string;
  name: string;
  description: string | null;
  prix: number;
  image: string | null;
  type: string | null;
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [debouncedQuery] = useDebounce(query, 300);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim() === "") {
      setResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setResults(data);
        setShowResults(true);
      } else {
        console.warn("Réponse invalide de l'API:", data);
        setResults([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la recherche");
      setResults([]);
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && results.length > 0) {
      router.push(`/product/${results[0].id}`);
      setShowResults(false);
      setQuery("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError(null);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    setError(null);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher un produit..."
          className="w-full pl-10 pr-10 py-2 glass-morphism rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-white/20 transition-colors"
          disabled={isLoading}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {error && (
        <div className="absolute mt-2 w-full p-2 bg-red-500/80 backdrop-blur-sm text-white text-sm rounded-lg">
          {error}
        </div>
      )}

      {showResults && results.length > 0 && (
        <div className="absolute mt-2 w-full glass-morphism rounded-lg shadow-lg overflow-hidden z-50">
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={() => {
                  setShowResults(false);
                  setQuery("");
                }}
                className="block hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3 p-3">
                  {product.image && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full hover-effect"
                      />
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {product.name}
                    </h3>
                    {product.type && (
                      <p className="text-xs text-gray-400 truncate">
                        {product.type}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-white font-semibold bg-primary-500/20 px-2 py-1 rounded-full text-sm">
                      {product.prix.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
