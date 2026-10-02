'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Lock, ArrowLeft, User as UserIcon, LogOut, CheckCircle2, PackageCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  isCheckout?: boolean;
}

export function Header({ isCheckout = false }: HeaderProps) {
  const { itemCount } = useCart();
  const { user, signInWithGoogle, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const homeHref = user ? '/shop' : '/';

  return (
    <header className="w-full bg-[#FBF6EA] border-b border-[#EADFC8]/60 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Left */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href={homeHref} className="flex items-center gap-3 group">
            {/* Basket Logo Mark */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0B4A3A] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bag handle */}
                <path d="M8 8V6C8 4.34315 9.34315 3 11 3H13C14.6569 3 16 4.34315 16 6V8" stroke="#F4B63F" strokeWidth="2.2" strokeLinecap="round"/>
                {/* Bag base */}
                <path d="M4.5 8.5H19.5L18 20.5H6L4.5 8.5Z" fill="#0B4A3A" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round"/>
                {/* Produce / stripes inside */}
                <path d="M9 13L10.5 17" stroke="#E8683A" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 11.5L12 17" stroke="#F4B63F" strokeWidth="2" strokeLinecap="round"/>
                <path d="M15 13L13.5 17" stroke="#34D399" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B4A3A] leading-none">
                Lagos Provision
              </span>
            </div>
          </Link>

          {/* Nigerian Flag */}
          <div className="flex items-center h-4 w-6 rounded-xs overflow-hidden shadow-xs border border-black/10 select-none" title="Proudly Nigerian">
            <div className="w-1/3 h-full bg-[#008751]" />
            <div className="w-1/3 h-full bg-white" />
            <div className="w-1/3 h-full bg-[#008751]" />
          </div>

          {/* Thin Divider */}
          <div className="hidden md:block h-7 w-[1px] bg-[#D4C8B0]" />

          {/* Tagline */}
          <div className="hidden md:flex flex-col text-[10px] font-bold tracking-widest text-[#0B4A3A] uppercase leading-tight select-none">
            <span>FRESH GROCERIES.</span>
            <span>LOCAL GOODNESS.</span>
          </div>
        </div>

        {/* Right Section */}
        {isCheckout ? (
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1F2A25] hover:text-[#0B4A3A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#0B4A3A]" />
              <span>Back to Shop</span>
            </Link>

            <div className="h-6 w-[1px] bg-[#D4C8B0]" />

            <div className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#0B4A3A] flex items-center justify-center text-white shadow-xs">
                <Lock className="w-4 h-4 text-[#F4B63F]" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-[#1F2A25] leading-tight">Secure Checkout</span>
                <span className="text-[11px] text-[#6B7280] leading-tight">Your information is safe</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Nav links (Only for signed-in users) */}
            {user && (
              <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#1F2A25]">
                <Link href="/shop" className="hover:text-[#0B4A3A] transition-colors">
                  Shop Catalog
                </Link>
                <Link href="/account/orders" className="hover:text-[#0B4A3A] transition-colors">
                  My Orders
                </Link>
              </nav>
            )}

            {/* Google Sign-in / User Profile */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-black/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0B4A3A] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {user.full_name ? user.full_name[0] : 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-[#1F2A25] max-w-[120px] truncate">
                    {user.full_name || user.email}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E5E0D3] py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-[#1F2A25] truncate">{user.full_name || 'My Account'}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#1F2A25] hover:bg-[#FBF6EA] transition-colors"
                    >
                      <PackageCheck className="w-4 h-4 text-[#0B4A3A]" />
                      <span>My Orders</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#D4C8B0] bg-white text-xs font-bold text-[#1F2A25] hover:border-[#0B4A3A] shadow-xs transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.67-5.17 3.67-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27 14.24A7.18 7.18 0 0 1 4.9 12c0-.78.14-1.54.37-2.24V6.61H1.27A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.27 5.39l4-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.27 6.61l4 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            )}

            {/* Cart Icon (Only for authenticated users) */}
            {user && (
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl bg-white border border-[#D4C8B0] hover:border-[#0B4A3A] transition-colors text-[#0B4A3A] shadow-xs flex items-center justify-center group"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E8683A] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-200">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
