'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Lock, ChevronRight, Minus, Plus, Loader2, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatNaira } from '@/config/delivery';

interface OrderSummaryPanelProps {
  onPlaceOrder?: () => void;
  isSubmitting?: boolean;
  isFormValid?: boolean;
  submitButtonText?: string;
  showButton?: boolean;
}

export function OrderSummaryPanel({
  onPlaceOrder,
  isSubmitting = false,
  isFormValid = true,
  submitButtonText = 'Place Order',
  showButton = true,
}: OrderSummaryPanelProps) {
  const { items, subtotalKobo, deliveryFeeKobo, totalKobo, updateQuantity } = useCart();

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-[#E5E0D3] overflow-hidden flex flex-col">
      {/* Orange Header with geometric accents */}
      <div className="bg-[#E8683A] text-white p-5 sm:p-6 relative overflow-hidden">
        {/* Geometric decorative corner lines (yellow and green) */}
        <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-90 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#F4B63F] transform rotate-45" />
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#0B4A3A] transform rotate-45" />
        </div>

        <div className="relative z-10 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              Order Summary
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-medium mt-0.5">
              A few essentials for your home.
            </p>
          </div>
        </div>
      </div>

      {/* Item rows */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        {items.length === 0 ? (
          <div className="py-8 text-center text-[#6B7280]">
            <p className="text-sm font-medium">Your cart is currently empty</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F0EAE1]">
            {items.map((item) => {
              const { product, quantity } = item;
              return (
                <div key={product.id} className="py-3.5 first:pt-0 flex items-center justify-between gap-3">
                  {/* Left: Thumbnail & details */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] shrink-0 p-1 flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-lg">🌾</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#1F2A25] truncate leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6B7280] truncate mt-0.5">
                        {product.descriptor || product.size_label}
                      </p>
                    </div>
                  </div>

                  {/* Right: Quantity Stepper & Line Price */}
                  <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                    {/* Stepper − 1 + */}
                    <div className="inline-flex items-center rounded-lg border border-[#D4C8B0] bg-[#FDFBF5] px-1 py-0.5 text-xs font-semibold text-[#1F2A25]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#6B7280] hover:text-[#0B4A3A] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-bold text-xs select-none">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#6B7280] hover:text-[#0B4A3A] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right min-w-[70px]">
                      <span className="text-sm font-bold text-[#1F2A25]">
                        {formatNaira(product.price_kobo * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pricing Breakdown & Action */}
        <div className="mt-6 pt-5 border-t border-[#E5E0D3]">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between text-[#6B7280]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1F2A25]">{formatNaira(subtotalKobo)}</span>
            </div>
            <div className="flex items-center justify-between text-[#6B7280]">
              <span>Delivery Fee (Lagos)</span>
              <span className="font-semibold text-[#1F2A25]">{formatNaira(deliveryFeeKobo)}</span>
            </div>
            <div className="pt-3 border-t border-[#E5E0D3] flex items-center justify-between">
              <span className="text-base sm:text-lg font-bold text-[#1F2A25]">Total</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#1F2A25]">
                {formatNaira(totalKobo)}
              </span>
            </div>
          </div>

          {/* Place Order CTA Button */}
          {showButton && (
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={onPlaceOrder}
                disabled={isSubmitting || !isFormValid || items.length === 0}
                className="w-full py-4 px-6 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Placing order...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#F4B63F]" />
                    <span>{submitButtonText}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Badges / Guarantees below button */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B7280]">
                <Check className="w-3.5 h-3.5 text-[#0B4A3A] stroke-[3]" />
                <span>Secure payment, your details are protected.</span>
              </div>
              <p className="text-center text-[11px] font-medium text-[#E8683A]">
                Pay on delivery. Nothing to pay now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
