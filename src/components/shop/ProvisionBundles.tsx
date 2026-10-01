'use client';

import React, { useState } from 'react';
import { Package, Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/catalog';
import { formatNaira } from '@/config/delivery';

interface Bundle {
  id: string;
  name: string;
  badge: string;
  description: string;
  items: Array<{ productId: string; quantity: number }>;
}

const BUNDLES: Bundle[] = [
  {
    id: 'bundle-family',
    name: 'Monthly Family Essentials Pack',
    badge: 'Popular Choice',
    description: 'The staples every home needs: Rice 10kg, Ijebu Garri 5kg, Cooking Oil 1L, Tomato Stew, and Milo Soaps.',
    items: [
      { productId: 'prod-rice-10kg-design', quantity: 1 },
      { productId: 'prod-garri-5kg-design', quantity: 1 },
      { productId: 'prod-golden-penny-oil-1l-design', quantity: 1 },
      { productId: 'prod-tomato-stew-400g-design', quantity: 2 },
      { productId: 'prod-milo-soap-200g-design', quantity: 3 },
    ],
  },
  {
    id: 'bundle-student',
    name: 'Student & Youth Quick Pack',
    badge: 'Fast & Easy',
    description: 'Quick-cook favourites: Indomie Chicken Carton, Nestlé Milo, Peak Milk, Sugar Cubes, and Crunchy Chin Chin.',
    items: [
      { productId: 'prod-indomie-chicken-carton', quantity: 1 },
      { productId: 'prod-milo-choc-900g', quantity: 1 },
      { productId: 'prod-peak-milk-powder-900g', quantity: 1 },
      { productId: 'prod-sugar-cubes-500g', quantity: 1 },
      { productId: 'prod-chin-chin-500g', quantity: 1 },
    ],
  },
  {
    id: 'bundle-soup',
    name: 'Traditional Soup Maker Pack',
    badge: 'Chef’s Special',
    description: 'Cook authentic Nigerian soups: Fresh ground Egusi, draw Ogbono, pure Red Palm Oil, Crayfish, and Smoked Catfish.',
    items: [
      { productId: 'prod-egusi-ground-500g', quantity: 1 },
      { productId: 'prod-ogbono-ground-250g', quantity: 1 },
      { productId: 'prod-red-palm-oil-1l', quantity: 1 },
      { productId: 'prod-ground-crayfish-250g', quantity: 1 },
      { productId: 'prod-smoked-catfish-pack', quantity: 1 },
    ],
  },
];

export function ProvisionBundles() {
  const { addItem } = useCart();
  const [addedBundleId, setAddedBundleId] = useState<string | null>(null);

  const calculateBundleTotal = (bundle: Bundle) => {
    return bundle.items.reduce((sum, it) => {
      const p = PRODUCTS.find((prod) => prod.id === it.productId);
      return sum + (p ? p.price_kobo * it.quantity : 0);
    }, 0);
  };

  const handleAddBundle = (bundle: Bundle) => {
    bundle.items.forEach((it) => {
      const p = PRODUCTS.find((prod) => prod.id === it.productId);
      if (p) {
        addItem(p, it.quantity);
      }
    });

    setAddedBundleId(bundle.id);
    setTimeout(() => {
      setAddedBundleId(null);
    }, 2000);
  };

  return (
    <section className="py-12 bg-white rounded-3xl border border-[#EADFC8] p-6 sm:p-10 my-10 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4F0] text-[#0B4A3A] text-xs font-extrabold uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5" /> Ready-Made Packs
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A25] tracking-tight">
            Provision Bundles
          </h2>
          <p className="text-sm text-[#6B7280] mt-1 max-w-xl">
            Save time with curated Nigerian grocery packs for families, students, and home cooking. Add the entire bundle to your cart in 1 click.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BUNDLES.map((bundle) => {
          const totalKobo = calculateBundleTotal(bundle);
          const isAdded = addedBundleId === bundle.id;

          return (
            <div
              key={bundle.id}
              className="rounded-2xl border border-[#EADFC8] bg-[#FDFBF5] p-6 flex flex-col justify-between hover:border-[#0B4A3A] transition-all duration-200 group"
            >
              <div>
                <span className="inline-block bg-[#F4B63F] text-[#1F2A25] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3">
                  {bundle.badge}
                </span>

                <h3 className="text-lg font-bold text-[#1F2A25] group-hover:text-[#0B4A3A] transition-colors leading-snug">
                  {bundle.name}
                </h3>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                  {bundle.description}
                </p>

                {/* Bundle items list */}
                <div className="mt-4 pt-3 border-t border-[#EADFC8]/60 space-y-1.5">
                  <p className="text-[11px] font-bold text-[#1F2A25] uppercase tracking-wider">
                    Included ({bundle.items.length} items):
                  </p>
                  <ul className="text-xs text-[#4B5563] space-y-1">
                    {bundle.items.map((it) => {
                      const p = PRODUCTS.find((prod) => prod.id === it.productId);
                      if (!p) return null;
                      return (
                        <li key={p.id} className="flex items-center gap-1.5 truncate">
                          <span className="text-[#0B4A3A] font-bold">✓</span>
                          <span className="truncate">
                            {p.name} {it.quantity > 1 ? `(${it.quantity}x)` : ''}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Price & Add */}
              <div className="mt-6 pt-4 border-t border-[#EADFC8] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B7280] block">Bundle Price</span>
                  <span className="text-lg font-extrabold text-[#1F2A25]">
                    {formatNaira(totalKobo)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddBundle(bundle)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 shadow-xs active:scale-95 ${
                    isAdded
                      ? 'bg-[#15803D] text-white'
                      : 'bg-[#0B4A3A] hover:bg-[#08382c] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add Pack</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
