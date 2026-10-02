import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Banknote,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TopLeftStripes, BottomRightStripes, StripeAccent } from '@/components/ui/CornerStripes';
import { SearchBar } from '@/components/shop/SearchBar';
import { CategoryTile } from '@/components/shop/CategoryTile';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProvisionBundles } from '@/components/shop/ProvisionBundles';
import { CATEGORIES, PRODUCTS } from '@/data/catalog';
import { LAGOS_LGAS, BRAND_TAGLINE } from '@/config/delivery';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function HomePage() {
  // 1. Featured / Best Seller products (12 items)
  const bestSellers = PRODUCTS.filter((p) => p.is_best_seller || p.is_featured).slice(0, 12);

  // 2. Select first 8 categories for individual showcase rows (8 items each = 64 items)
  const showcaseCategories = CATEGORIES.slice(0, 8);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#FBF6EA] flex flex-col relative overflow-x-hidden">
        {/* Decorative Corner Ribbons */}
        <TopLeftStripes />
      <BottomRightStripes />

      {/* Navigation Header */}
      <Header />

      <main className="flex-1">
        {/* ==========================================
            HERO SECTION
        ========================================== */}
        <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Headline, Copy, Search, CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EADFC8] shadow-2xs">
                  <StripeAccent />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B4A3A]">
                    {BRAND_TAGLINE}
                  </span>
                  <span className="text-xs">🇳🇬</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2A25] tracking-tight leading-[1.1]">
                  Fresh groceries, delivered across <span className="text-[#0B4A3A]">Lagos</span>.
                </h1>

                {/* Subcopy */}
                <p className="text-base sm:text-lg text-[#4B5563] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Stock your home with premium Nigerian market staples: triple-sorted stone-free rice, Ijebu garri, pure palm oil, canned stews, and fresh provisions. <strong className="text-[#0B4A3A]">Pay on delivery at your door.</strong>
                </p>

                {/* Search Bar with live typeahead */}
                <div className="pt-2 flex justify-center lg:justify-start">
                  <SearchBar />
                </div>

                {/* Action Buttons & Value Highlights */}
                <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Link
                    href="/shop"
                    className="px-6 py-3.5 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group"
                  >
                    <span>Shop All Provisions</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#how-it-works"
                    className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#FDFBF5] border-2 border-[#D4C8B0] text-[#1F2A25] font-bold text-sm sm:text-base transition-colors"
                  >
                    How Delivery Works
                  </a>
                </div>

                {/* Trust mini badges */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-[#4B5563]">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#E8F4F0] flex items-center justify-center text-[#0B4A3A]">
                      ✓
                    </div>
                    <span>Pay at door (Cash, POS, Transfer)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#E8F4F0] flex items-center justify-center text-[#0B4A3A]">
                      ✓
                    </div>
                    <span>Flat ₦2,000 all 20 LGAs</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Vector Illustration (Basket + Scooter) */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="w-full max-w-lg lg:max-w-none relative aspect-4/3 flex items-center justify-center">
                  <img
                    src="/images/illustrations/hero-basket-scooter.svg"
                    alt="Lagos Provision Delivery and Basket"
                    className="w-full h-auto object-contain drop-shadow-sm hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            SHOP BY CATEGORY (14 TILES GRID)
        ========================================== */}
        <section className="py-12 border-t border-[#EADFC8]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8683A] block mb-1">
                  Browse Catalog
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A25] tracking-tight">
                  Shop by Category
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs sm:text-sm font-bold text-[#0B4A3A] hover:underline flex items-center gap-1"
              >
                <span>View Full Market Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 14 Category Tiles Grid (2-cols mobile, 4-cols desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {CATEGORIES.map((category) => {
                const count = PRODUCTS.filter((p) => p.category_id === category.id).length;
                return (
                  <CategoryTile
                    key={category.id}
                    category={category}
                    count={count}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            BEST SELLERS / EVERYDAY ESSENTIALS (12 CARDS)
        ========================================== */}
        <section className="py-12 bg-white/50 border-t border-b border-[#EADFC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Highly Rated
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A25] tracking-tight">
                  Everyday Essentials & Best Sellers
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                  The most frequently requested provisions in Lagos homes.
                </p>
              </div>
              <Link
                href="/shop?sort=best_seller"
                className="text-xs sm:text-sm font-bold text-[#0B4A3A] hover:underline flex items-center gap-1"
              >
                <span>See All Best Sellers</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 12 Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            PROVISION BUNDLES
        ========================================== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProvisionBundles />
        </div>

        {/* ==========================================
            CATEGORY PRODUCT ROWS (AT LEAST 8 CATEGORIES)
            Together with Best Sellers, shows 76+ products!
        ========================================== */}
        <div className="space-y-12 py-8">
          {showcaseCategories.map((cat, idx) => {
            const catProducts = PRODUCTS.filter((p) => p.category_id === cat.id).slice(0, 8);
            if (catProducts.length === 0) return null;

            return (
              <section key={cat.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-6 pb-3 border-b border-[#EADFC8]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2A25] tracking-tight">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-[#6B7280]">
                        Top quality grains, sizes and pantry packs
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="text-xs sm:text-sm font-bold text-[#0B4A3A] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>See all {cat.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* 4-up desktop grid / 2-up mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {catProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* ==========================================
            WHY LAGOS PROVISION (VALUE PROPS)
        ========================================== */}
        <section className="py-16 bg-white border-t border-[#EADFC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8683A] block mb-1">
                Why Shop With Us
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F2A25] tracking-tight">
                Designed for Lagos Families
              </h2>
              <p className="text-sm text-[#6B7280] mt-2">
                We take the stress out of Lagos traffic, market crowds, and price haggling.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#FDFBF5] border border-[#EADFC8] space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#0B4A3A] text-[#F4B63F] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1F2A25]">Fresh & Local Quality</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Triple-sorted stone-free rice, authentic crisp Ijebu garri, and pure unadulterated oils straight from trusted sources.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDFBF5] border border-[#EADFC8] space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#0B4A3A] text-[#F4B63F] flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1F2A25]">24–48h Lagos Delivery</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Prompt doorstep delivery by our fleet across all 20 LGAs. No missed packages, no stressful market trips.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDFBF5] border border-[#EADFC8] space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#0B4A3A] text-[#F4B63F] flex items-center justify-center">
                  <Banknote className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1F2A25]">Pay on Delivery Only</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  No online card risks. Inspect your order at the door and pay the rider via cash, POS card terminal, or door transfer.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FDFBF5] border border-[#EADFC8] space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#0B4A3A] text-[#F4B63F] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1F2A25]">Flat ₦2,000 Delivery</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  One simple transparent delivery fee across the entire state, whether you live in Ikeja, Lekki, Ikorodu, or Alimosho.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            HOW IT WORKS (3 SIMPLE STEPS)
        ========================================== */}
        <section id="how-it-works" className="py-16 bg-[#FBF6EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B4A3A] block mb-1">
                Simple & Convenient
              </span>
              <h2 className="text-3xl font-extrabold text-[#1F2A25] tracking-tight">
                How It Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="bg-white rounded-2xl border border-[#EADFC8] p-8 text-center relative shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#0B4A3A] text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#1F2A25] mb-2">1. Pick Your Staples</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Select rice, garri, beans, cooking oils, and canned foods in your preferred bag size or bundle pack.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#EADFC8] p-8 text-center relative shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#E8683A] text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#1F2A25] mb-2">2. Tell Us Where</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Enter your Lagos address, local government area, and any specific gate code or delivery instructions.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#EADFC8] p-8 text-center relative shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#0B4A3A] text-[#F4B63F] font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#1F2A25] mb-2">3. We Deliver & You Pay</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Our rider brings your provisions to your door. Inspect your items and pay via cash, POS card terminal, or instant transfer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            DELIVERY COVERAGE SECTION
        ========================================== */}
        <section id="coverage" className="py-14 bg-white border-t border-[#EADFC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B4A3A] block mb-1">
                Lagos State Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A25] tracking-tight">
                Delivering to All 20 Local Government Areas
              </h2>
              <p className="text-sm text-[#6B7280] mt-2 mb-8">
                Wherever you reside in Lagos, our delivery fleet reaches your doorstep at a flat rate of <strong className="text-[#0B4A3A]">₦2,000</strong>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-[#1F2A25]">
                {LAGOS_LGAS.map((lga) => (
                  <div
                    key={lga}
                    className="p-2.5 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] font-semibold text-center hover:border-[#0B4A3A] transition-colors"
                  >
                    📍 {lga}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </AuthGuard>
  );
}
