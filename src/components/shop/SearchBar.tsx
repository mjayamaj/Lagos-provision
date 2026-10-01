'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/data/catalog';
import { Product } from '@/types';
import { formatNaira } from '@/config/delivery';

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase().trim();
    const matches = PRODUCTS.filter(
      (p) =>
        p.is_active &&
        (p.name.toLowerCase().includes(q) ||
          p.descriptor.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q)))
    ).slice(0, 6);

    setResults(matches);
    setIsOpen(matches.length > 0);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="absolute left-4.5 pointer-events-none text-[#0B4A3A]">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search rice, garri, palm oil, Indomie, peak milk..."
          className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-[#EADFC8] focus:border-[#0B4A3A] text-sm sm:text-base text-[#1F2A25] placeholder:text-[#9CA3AF] shadow-sm focus:outline-hidden focus:ring-4 focus:ring-[#0B4A3A]/10 transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-20 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-2 sm:right-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
        >
          Search
        </button>
      </form>

      {/* Typeahead Suggestions Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#E5E0D3] overflow-hidden z-50 animate-in fade-in-50 duration-150">
          <div className="p-2 divide-y divide-[#F0EAE1]">
            {results.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/products/${product.slug}`);
                }}
                className="w-full p-2.5 rounded-xl hover:bg-[#FDFBF5] flex items-center justify-between text-left transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#FBF6EA] border border-[#EADFC8] p-1 shrink-0 flex items-center justify-center">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span>🌾</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#1F2A25] group-hover:text-[#0B4A3A] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-[#6B7280] truncate">
                      {product.descriptor} • {product.size_label}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-2 shrink-0">
                  <span className="text-sm font-extrabold text-[#1F2A25]">
                    {formatNaira(product.price_kobo)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B4A3A]" />
                </div>
              </button>
            ))}
          </div>

          <div className="p-2.5 bg-[#FBF6EA] border-t border-[#E5E0D3] text-center">
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="text-xs font-bold text-[#0B4A3A] hover:underline"
            >
              See all results for "{query}" →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
