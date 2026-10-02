'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Filter,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TopLeftStripes, BottomRightStripes } from '@/components/ui/CornerStripes';
import { ProductCard } from '@/components/shop/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/data/catalog';
import { Product } from '@/types';
import { AuthGuard } from '@/components/auth/AuthGuard';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'default';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSort);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 24;

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(
      new Set(PRODUCTS.map((p) => p.brand).filter(Boolean))
    ) as string[];
    return list.sort();
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS].filter((p) => p.is_active);

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find((c) => c.slug === selectedCategory || c.id === selectedCategory);
      if (cat) {
        result = result.filter((p) => p.category_id === cat.id || p.category_slug === cat.slug);
      }
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.descriptor.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price_kobo - b.price_kobo);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price_kobo - a.price_kobo);
    } else if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'best_seller') {
      result.sort((a, b) => (b.is_best_seller ? 1 : 0) - (a.is_best_seller ? 1 : 0));
    } else {
      result.sort((a, b) => a.sort_order - b.sort_order);
    }

    return result;
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, page * pageSize);
  const hasMore = displayedProducts.length < filteredProducts.length;

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setPage(1);
    setMobileFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setSortBy('default');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner / Breadcrumb */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EADFC8]">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8683A] block mb-1">
            Lagos Provision Marketplace
          </span>
          <h1 className="text-3xl font-extrabold text-[#1F2A25] tracking-tight">
            All Provisions & Groceries
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Showing <strong className="text-[#0B4A3A]">{displayedProducts.length}</strong> of{' '}
            <strong>{filteredProducts.length}</strong> items available in Lagos
          </p>
        </div>

        {/* Mobile filter toggle button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#D4C8B0] text-xs font-bold text-[#1F2A25] shadow-xs"
          >
            <Filter className="w-4 h-4 text-[#0B4A3A]" />
            <span>Filter Categories</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-6">
          {/* Categories Card */}
          <div className="bg-white rounded-2xl border border-[#EADFC8] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1] mb-3">
              <h2 className="text-sm font-extrabold text-[#1F2A25] uppercase tracking-wide">
                Categories
              </h2>
              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className="text-xs text-[#E8683A] font-bold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            <ul className="space-y-1 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl font-bold flex items-center justify-between transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#0B4A3A] text-white shadow-xs'
                      : 'text-[#1F2A25] hover:bg-[#FDFBF5]'
                  }`}
                >
                  <span>All Provisions</span>
                  <span className={selectedCategory === 'all' ? 'text-[#F4B63F]' : 'text-gray-400'}>
                    {PRODUCTS.length}
                  </span>
                </button>
              </li>

              {CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter((p) => p.category_id === cat.id).length;
                const isSelected = selectedCategory === cat.slug;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl font-semibold flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#0B4A3A] text-white font-bold shadow-xs'
                          : 'text-[#4B5563] hover:bg-[#FDFBF5] hover:text-[#1F2A25]'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </span>
                      <span className={isSelected ? 'text-[#F4B63F]' : 'text-gray-400'}>
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Brand Filter */}
          <div className="bg-white rounded-2xl border border-[#EADFC8] p-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#1F2A25] uppercase tracking-wide pb-3 border-b border-[#F0EAE1] mb-3">
              Filter by Brand
            </h3>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-[#D4C8B0] bg-white text-[#1F2A25] focus:outline-hidden focus:border-[#0B4A3A]"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* Product Catalog Column */}
        <div className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Search & Sort */}
          <div className="bg-white rounded-2xl border border-[#EADFC8] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search catalog..."
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#D4C8B0] text-xs text-[#1F2A25] placeholder:text-[#9CA3AF] focus:outline-hidden focus:border-[#0B4A3A]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs font-semibold text-[#6B7280] whitespace-nowrap">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-[#D4C8B0] bg-white text-xs font-bold text-[#1F2A25] focus:outline-hidden focus:border-[#0B4A3A]"
                >
                  <option value="default">Default Order</option>
                  <option value="best_seller">Best Sellers First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Pills */}
          {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#6B7280] font-semibold">Active filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B4A3A] text-white font-bold">
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                  <button type="button" onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8683A] text-white font-bold">
                  Brand: {selectedBrand}
                  <button type="button" onClick={() => setSelectedBrand('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F4B63F] text-[#1F2A25] font-bold">
                  Search: "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-red-600 font-bold hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {displayedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#EADFC8] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FDFBF5] border border-[#EADFC8] flex items-center justify-center mx-auto text-3xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-[#1F2A25]">No products found</h3>
              <p className="text-xs sm:text-sm text-[#6B7280] max-w-sm mx-auto">
                We couldn't find any provisions matching your filters. Try clearing your search or picking another category.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-5 py-2.5 rounded-xl bg-[#0B4A3A] text-white text-xs font-bold shadow-xs hover:bg-[#08382c] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination / Load More */}
          {hasMore && (
            <div className="pt-8 text-center">
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="px-8 py-3.5 rounded-xl bg-white hover:bg-[#FDFBF5] border-2 border-[#0B4A3A] text-[#0B4A3A] font-extrabold text-sm shadow-xs transition-colors hover:shadow-md"
              >
                Load More Provisions ({filteredProducts.length - displayedProducts.length} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Category Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EADFC8] mb-4">
                <h3 className="text-base font-extrabold text-[#1F2A25]">Filter Categories</h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <ul className="space-y-1 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-bold flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-[#0B4A3A] text-white'
                        : 'text-[#1F2A25] hover:bg-[#FDFBF5]'
                    }`}
                  >
                    <span>All Provisions</span>
                    <span>{PRODUCTS.length}</span>
                  </button>
                </li>
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange(cat.slug)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0B4A3A] text-white font-bold'
                            : 'text-[#4B5563] hover:bg-[#FDFBF5]'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span>{cat.icon}</span>
                          <span className="truncate">{cat.name}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-6 border-t border-[#EADFC8] mt-6">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#0B4A3A] text-white font-bold text-xs shadow-xs text-center"
              >
                Apply & View Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FBF6EA] flex flex-col relative overflow-x-hidden">
        <TopLeftStripes />
        <BottomRightStripes />
        <Header />
        <main className="flex-1">
          <Suspense fallback={<div className="p-12 text-center text-sm">Loading market catalog...</div>}>
            <ShopContent />
          </Suspense>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
