'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

export function ProductDetailClient({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2500);
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Quantity Stepper */}
        <div className="inline-flex items-center justify-between sm:justify-start rounded-xl border-2 border-[#D4C8B0] bg-[#FDFBF5] px-3 py-2 text-sm font-bold text-[#1F2A25]">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white text-gray-600 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-base font-extrabold select-none">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white text-gray-600 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-3.5 px-6 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99] ${
            added
              ? 'bg-[#15803D] text-white'
              : 'bg-[#0B4A3A] hover:bg-[#08382c] text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5 stroke-[3]" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 text-[#F4B63F]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Quick link to checkout if item was added */}
      {added && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#E8F4F0] border border-[#0B4A3A]/20 animate-in fade-in-50 duration-200">
          <span className="text-xs font-bold text-[#0B4A3A]">
            Item added! Ready to check out?
          </span>
          <Link
            href="/checkout"
            className="text-xs font-bold text-[#0B4A3A] hover:underline flex items-center gap-1"
          >
            <span>Proceed to Delivery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
