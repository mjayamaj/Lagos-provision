'use client';

import React from 'react';
import Link from 'next/link';
import { PackageCheck, ArrowRight, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TopLeftStripes, BottomRightStripes } from '@/components/ui/CornerStripes';
import { useAuth } from '@/context/AuthContext';
import { formatNaira } from '@/config/delivery';

export default function MyOrdersPage() {
  const { user, signInWithGoogle } = useAuth();

  // Demo past orders for logged in user or preview
  const demoOrders = [
    {
      order_number: 'LP-2026-849102',
      date: '2026-09-28',
      status: 'delivered',
      total_kobo: 3640000,
      item_count: 5,
      items_summary: 'Parboiled Rice (10kg), Garri (5kg), Tomato Stew x2, Oil 1L...',
      lga: 'Ikeja',
    },
    {
      order_number: 'LP-2026-619283',
      date: '2026-09-15',
      status: 'delivered',
      total_kobo: 2150000,
      item_count: 3,
      items_summary: 'Vegetable Cooking Oil (5L), Indomie Chicken Carton, Salt...',
      lga: 'Lekki Phase 1',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF6EA] flex flex-col relative overflow-x-hidden">
      <TopLeftStripes />
      <BottomRightStripes />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="pb-6 border-b border-[#EADFC8] mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#E8683A] block mb-1">
            Account Management
          </span>
          <h1 className="text-3xl font-extrabold text-[#1F2A25] tracking-tight">
            My Orders
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Track and view previous grocery delivery orders placed for your household.
          </p>
        </div>

        {!user ? (
          <div className="bg-white rounded-3xl border border-[#EADFC8] p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#E8F4F0] text-[#0B4A3A] flex items-center justify-center mx-auto">
              <PackageCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#1F2A25]">Sign in to view orders</h2>
            <p className="text-xs text-[#6B7280]">
              Sign in with your Google account to view your past orders, delivery addresses, and receipts.
            </p>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-3 px-4 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>Continue with Google</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {demoOrders.map((ord) => (
              <div
                key={ord.order_number}
                className="bg-white rounded-2xl border border-[#EADFC8] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#0B4A3A] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-[#0B4A3A] font-mono">
                      {ord.order_number}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#1F2A25] font-semibold">{ord.items_summary}</p>
                  <p className="text-[11px] text-[#6B7280]">
                    Placed on {ord.date} • Delivered to {ord.lga}, Lagos • Paid on Delivery
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-0 border-[#F0EAE1]">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-[#6B7280] block">Total Paid</span>
                    <span className="text-base font-extrabold text-[#1F2A25]">
                      {formatNaira(ord.total_kobo)}
                    </span>
                  </div>

                  <Link
                    href={`/order/${ord.order_number}`}
                    className="p-2.5 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] hover:bg-[#0B4A3A] hover:text-white transition-colors text-[#0B4A3A]"
                    title="View Receipt"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
