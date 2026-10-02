'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Stepper } from '@/components/ui/Stepper';
import { TopLeftStripes, BottomRightStripes } from '@/components/ui/CornerStripes';
import { useCart } from '@/context/CartContext';
import { formatNaira } from '@/config/delivery';
import { AuthGuard } from '@/components/auth/AuthGuard';

function CartContent() {
  const router = useRouter();
  const {
    items,
    subtotalKobo,
    deliveryFeeKobo,
    totalKobo,
    updateQuantity,
    removeItem,
    clearCart,
    loadDesignSeedCart,
    isLoaded,
  } = useCart();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#FBF6EA] flex items-center justify-center">
        <p className="text-sm font-bold text-[#0B4A3A]">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EA] flex flex-col relative overflow-x-hidden">
      <TopLeftStripes />
      <BottomRightStripes />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Stepper Header (Step 1 Cart) */}
        <Stepper currentStep={1} />

        <div className="max-w-4xl mx-auto mt-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#EADFC8] mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A25] tracking-tight">
              Shopping Cart
            </h1>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-red-600 font-bold hover:underline"
              >
                Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="bg-white rounded-3xl border border-[#EADFC8] p-10 sm:p-16 text-center space-y-5 shadow-xs">
              <div className="w-20 h-20 rounded-full bg-[#FDFBF5] border-2 border-[#EADFC8] flex items-center justify-center mx-auto text-4xl shadow-inner">
                🛒
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-[#1F2A25]">Your cart is empty</h2>
                <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto">
                  Browse our market catalog for fresh Nigerian food provisions, rice, garri, and oils.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Start Shopping</span>
                </Link>

                {/* Helpful button to load exact mock items */}
                <button
                  type="button"
                  onClick={loadDesignSeedCart}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FDFBF5] hover:bg-[#F3EBD8] border-2 border-[#D4C8B0] text-[#0B4A3A] text-xs sm:text-sm font-extrabold shadow-2xs transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#F4B63F]" />
                  <span>Load Design Sample Cart (₦36,400)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Cart Items List & Summary */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Items Table Card */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EADFC8] p-5 sm:p-6 shadow-xs divide-y divide-[#F0EAE1]">
                {items.map((item) => {
                  const { product, quantity } = item;
                  return (
                    <div
                      key={product.id}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Product details */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-xl">🌾</span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <Link
                            href={`/products/${product.slug}`}
                            className="text-sm font-bold text-[#1F2A25] hover:text-[#0B4A3A] truncate block"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs text-[#6B7280]">
                            {product.descriptor} • <span className="font-semibold">{product.size_label}</span>
                          </p>
                          <p className="text-xs font-bold text-[#0B4A3A] mt-1 sm:hidden">
                            {formatNaira(product.price_kobo * quantity)}
                          </p>
                        </div>
                      </div>

                      {/* Controls: Stepper, Line Total & Remove */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                        {/* Stepper */}
                        <div className="inline-flex items-center rounded-xl border border-[#D4C8B0] bg-[#FDFBF5] px-2 py-1 text-xs font-bold text-[#1F2A25]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md text-gray-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-extrabold select-none">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md text-gray-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line price desktop */}
                        <span className="hidden sm:inline text-sm font-extrabold text-[#1F2A25] min-w-[80px] text-right">
                          {formatNaira(product.price_kobo * quantity)}
                        </span>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-[#EADFC8] p-6 shadow-xs space-y-5">
                <h2 className="text-lg font-extrabold text-[#1F2A25] pb-3 border-b border-[#F0EAE1]">
                  Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-[#6B7280]">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#1F2A25]">{formatNaira(subtotalKobo)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#6B7280]">
                    <span>Flat Delivery (Lagos)</span>
                    <span className="font-bold text-[#1F2A25]">{formatNaira(deliveryFeeKobo)}</span>
                  </div>
                  <div className="pt-3 border-t border-[#E5E0D3] flex items-center justify-between">
                    <span className="text-base font-extrabold text-[#1F2A25]">Estimated Total</span>
                    <span className="text-xl font-extrabold text-[#0B4A3A]">
                      {formatNaira(totalKobo)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/checkout"
                    className="w-full py-4 px-6 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
                  >
                    <span>Proceed to Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="p-3 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] text-center">
                  <p className="text-[11px] font-semibold text-[#0B4A3A]">
                    🚚 Pay on Delivery — No online payment required
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CartPage() {
  return (
    <AuthGuard>
      <CartContent />
    </AuthGuard>
  );
}
