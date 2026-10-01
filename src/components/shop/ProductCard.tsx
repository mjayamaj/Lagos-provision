'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Minus, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatNaira } from '@/config/delivery';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const isOutOfStock = product.stock_qty <= 0;

  return (
    <div className="bg-white rounded-2xl border border-[#EADFC8] p-4 flex flex-col justify-between group hover:border-[#0B4A3A]/40 hover:shadow-md transition-all duration-200 relative overflow-hidden">
      {/* Badges top */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {product.is_best_seller && (
          <span className="inline-flex items-center gap-1 bg-[#F4B63F] text-[#1F2A25] font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-2.5 h-2.5" /> Best Seller
          </span>
        )}
        {product.is_perishable && (
          <span className="inline-flex items-center gap-1 bg-[#15803D] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
            Fresh Daily
          </span>
        )}
      </div>

      {/* Product Image & Link */}
      <Link href={`/products/${product.slug}`} className="block relative pt-2 pb-4">
        <div className="w-full aspect-4/3 rounded-xl bg-[#FDFBF5] border border-[#F3EBD8] flex items-center justify-center p-3 overflow-hidden group-hover:scale-[1.02] transition-transform duration-200">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-3xl">🌾</div>
          )}
        </div>
      </Link>

      {/* Info & Price */}
      <div className="pt-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Size */}
          <div className="flex items-center justify-between text-xs text-[#6B7280] mb-1">
            <span className="font-semibold text-[#0B4A3A] truncate max-w-[120px]">
              {product.brand || 'Lagos Provision'}
            </span>
            <span className="bg-[#F3EBD8] text-[#1F2A25] font-bold text-[10px] px-1.5 py-0.5 rounded-sm">
              {product.size_label}
            </span>
          </div>

          {/* Name */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-[#1F2A25] group-hover:text-[#0B4A3A] transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Descriptor */}
          <p className="text-xs text-[#6B7280] line-clamp-1 mt-0.5">
            {product.descriptor}
          </p>
        </div>

        {/* Bottom row: Price & Cart Action */}
        <div className="mt-4 pt-3 border-t border-[#F3EBD8] flex items-center justify-between gap-2">
          <div>
            <span className="text-base font-extrabold text-[#1F2A25]">
              {formatNaira(product.price_kobo)}
            </span>
          </div>

          {isOutOfStock ? (
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg select-none">
              Out of stock
            </span>
          ) : quantity > 0 ? (
            /* Stepper - 1 + */
            <div className="inline-flex items-center rounded-xl border border-[#0B4A3A] bg-[#E8F4F0] px-1.5 py-1 text-xs font-bold text-[#0B4A3A] shadow-2xs">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-5 h-5 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center select-none">{quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-5 h-5 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Add button */
            <button
              type="button"
              onClick={() => addItem(product, 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] text-white text-xs font-bold shadow-2xs hover:shadow-sm active:scale-95 transition-all duration-150"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
