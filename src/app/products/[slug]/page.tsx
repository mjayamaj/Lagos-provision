import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, Sparkles, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TopLeftStripes, BottomRightStripes } from '@/components/ui/CornerStripes';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductDetailClient } from '@/components/shop/ProductDetailClient';
import { getProductBySlug, getProducts } from '@/lib/db';
import { CATEGORIES } from '@/data/catalog';
import { formatNaira } from '@/config/delivery';

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category
  const { products: relatedProducts } = await getProducts({
    category: product.category_id,
    limit: 4,
  });

  const category = CATEGORIES.find((c) => c.id === product.category_id);

  return (
    <div className="min-h-screen bg-[#FBF6EA] flex flex-col relative overflow-x-hidden">
      <TopLeftStripes />
      <BottomRightStripes />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
          <Link href="/shop" className="hover:text-[#0B4A3A] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/shop?category=${category.slug}`} className="hover:text-[#0B4A3A]">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#1F2A25] font-bold truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Card Container */}
        <div className="bg-white rounded-3xl border border-[#EADFC8] p-6 sm:p-10 shadow-sm mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Product Image */}
            <div className="w-full aspect-square rounded-2xl bg-[#FDFBF5] border border-[#EADFC8] p-8 flex items-center justify-center relative overflow-hidden group">
              {product.is_best_seller && (
                <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-[#F4B63F] text-[#1F2A25] font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3 h-3" /> Best Seller
                </span>
              )}
              {product.is_perishable && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-[#15803D] text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  Fresh Daily
                </span>
              )}

              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <span className="text-6xl">🌾</span>
              )}
            </div>

            {/* Right: Info, Price, Actions */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B4A3A]">
                    {product.brand || 'Lagos Provision'}
                  </span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs font-semibold text-[#6B7280]">
                    {category?.name}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2A25] tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-semibold text-[#6B7280] mt-1">
                  {product.descriptor}
                </p>
              </div>

              {/* Price & Unit */}
              <div className="p-4 rounded-2xl bg-[#FDFBF5] border border-[#EADFC8] flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1F2A25]">
                  {formatNaira(product.price_kobo)}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#6B7280]">
                  per {product.size_label} ({product.unit || 'unit'})
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {product.description}
              </p>

              {/* Client Component for Quantity Stepper and Add To Cart */}
              <ProductDetailClient product={product} />

              {/* Trust Features */}
              <div className="pt-6 border-t border-[#F0EAE1] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4B5563]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#E8F4F0] text-[#0B4A3A] flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span>Pay on Delivery across Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#E8F4F0] text-[#0B4A3A] flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span>Flat ₦2,000 Doorstep Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#E8F4F0] text-[#0B4A3A] flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span>Accepts Cash, POS & Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#E8F4F0] text-[#0B4A3A] flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span>100% Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like / Related items */}
        {relatedProducts.length > 1 && (
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold text-[#1F2A25] tracking-tight mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
