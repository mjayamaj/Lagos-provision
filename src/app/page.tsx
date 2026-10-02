'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ShoppingBag,
  LogOut,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TopLeftStripes, BottomRightStripes, StripeAccent } from '@/components/ui/CornerStripes';
import { useAuth } from '@/context/AuthContext';
import { BRAND_TAGLINE } from '@/config/delivery';

export default function LoginLandingPage() {
  const router = useRouter();
  const { user, isLoading, signInWithGoogle, signOut } = useAuth();
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-redirect authenticated users to /shop
  useEffect(() => {
    if (user && !isLoading) {
      setRedirectCountdown(3);
      const interval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            router.push('/shop');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [user, isLoading, router]);

  const handleGoogleSignIn = async () => {
    try {
      setErrorMessage(null);
      setIsSigningIn(true);
      await signInWithGoogle();
    } catch (err: unknown) {
      console.error('Sign-in error:', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to connect to Google authentication. Please try again.';
      setErrorMessage(message);
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EA] flex flex-col relative overflow-x-hidden selection:bg-[#E8683A] selection:text-white">
      {/* Heritage Corner Stripes */}
      <TopLeftStripes />
      <BottomRightStripes />

      {/* Main Header */}
      <Header />

      <main className="flex-1 flex flex-col justify-center py-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Brand Story & Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EADFC8] shadow-2xs">
                <StripeAccent />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B4A3A]">
                  {BRAND_TAGLINE}
                </span>
                <span className="text-xs">🇳🇬</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#1F2A25] tracking-tight leading-[1.15]">
                Fresh Nigerian Groceries,{' '}
                <span className="text-[#0B4A3A]">Delivered to Your Doorstep.</span>
              </h1>

              {/* Subcopy */}
              <p className="text-sm sm:text-base text-[#4B5563] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Stock your home with premium Nigerian market staples: triple-sorted stone-free rice, Ijebu garri, pure palm oil, and fresh provisions. Authenticate with Google to access our market catalog, manage delivery addresses, and enjoy flat ₦2,000 door delivery with pay-on-delivery across all 20 Lagos LGAs.
              </p>

              {/* Trust Anchors */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="bg-white/90 border border-[#EADFC8] rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F4F0] flex items-center justify-center text-[#0B4A3A] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1F2A25]">Pay on Delivery</h3>
                    <p className="text-[11px] text-[#6B7280]">Inspect provisions at your door before Cash, POS or Transfer.</p>
                  </div>
                </div>

                <div className="bg-white/90 border border-[#EADFC8] rounded-2xl p-4 flex items-start gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF7ED] flex items-center justify-center text-[#E8683A] shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#1F2A25]">Flat ₦2,000 Lagos Delivery</h3>
                    <p className="text-[11px] text-[#6B7280]">Prompt delivery across all 20 Local Government Areas.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Google OAuth Sign-In Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#EADFC8] shadow-xl p-6 sm:p-8 relative">
                {/* Visual Top Accent Stripe */}
                <div className="absolute top-0 left-8 right-8 h-1.5 rounded-b-md bg-gradient-to-r from-[#F4B63F] via-[#E8683A] to-[#0B4A3A]" />

                {user ? (
                  /* ==========================================
                      STATE 1: USER IS ALREADY SIGNED IN
                  ========================================== */
                  <div className="text-center py-4 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-[#E8F4F0] border-2 border-[#0B4A3A] text-[#0B4A3A] flex items-center justify-center mx-auto text-xl font-black uppercase shadow-xs">
                      {user.full_name ? user.full_name[0] : 'U'}
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-1 text-xs font-extrabold text-[#0B4A3A] uppercase tracking-wider mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Signed in with Google</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-[#1F2A25] tracking-tight">
                        Welcome back, {user.full_name || 'Customer'}!
                      </h2>
                      <p className="text-xs text-[#6B7280] mt-1 font-mono">{user.email}</p>
                    </div>

                    <div className="bg-[#FBF6EA] border border-[#EADFC8] rounded-2xl p-4 text-xs text-[#1F2A25]">
                      <p className="font-semibold">
                        Entering Lagos Provision Shop in{' '}
                        <strong className="text-[#E8683A]">{redirectCountdown ?? 1}s</strong>...
                      </p>
                      <div className="w-full bg-[#EADFC8] h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-[#0B4A3A] h-full transition-all duration-1000 ease-linear rounded-full"
                          style={{
                            width: `${((3 - (redirectCountdown ?? 0)) / 3) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Link
                        href="/shop"
                        className="w-full py-3.5 px-4 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <span>Enter Shop Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out / Switch Account</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ==========================================
                      STATE 2: STRICT GOOGLE SIGN-IN
                  ========================================== */
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F4F0] text-[#0B4A3A] text-[11px] font-bold uppercase tracking-wider mb-1">
                        <Lock className="w-3 h-3" />
                        <span>Customer Authentication</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-[#1F2A25] tracking-tight">
                        Sign in with Google
                      </h2>
                      <p className="text-xs text-[#6B7280]">
                        Authentication with your Google account is required to enter Lagos Provision.
                      </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2.5 text-left text-xs text-red-700">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div className="leading-tight">{errorMessage}</div>
                      </div>
                    )}

                    {/* Official Google OAuth Sign-In Button */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isSigningIn}
                        className="w-full py-3.5 px-4 rounded-xl bg-white border-2 border-[#D4C8B0] hover:border-[#0B4A3A] hover:shadow-md text-[#1F2A25] font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
                        aria-label="Sign in with Google"
                      >
                        {isSigningIn ? (
                          <>
                            <RefreshCw className="w-5 h-5 text-[#0B4A3A] animate-spin" />
                            <span>Redirecting to Google...</span>
                          </>
                        ) : (
                          <>
                            {/* Official 4-color Google G Logo */}
                            <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
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
                            <span className="text-[#1F2A25] group-hover:text-[#0B4A3A]">
                              Sign in with Google
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Scope Explanation & Privacy Compliance (Required for Google Verification) */}
                    <div className="bg-[#FBF6EA] p-3.5 rounded-xl border border-[#EADFC8] text-[11px] text-[#4B5563] space-y-1.5">
                      <p className="font-semibold text-[#1F2A25]">
                        🔒 Safe & Verified Authentication
                      </p>
                      <p>
                        We only access your basic Google profile (name, email, profile picture) to verify your account and label delivery parcels. We never store passwords or share your data.
                      </p>
                    </div>

                    {/* Terms & Privacy Links (Strict Google OAuth requirement) */}
                    <div className="pt-1 text-center text-[11px] text-[#6B7280] leading-normal border-t border-gray-100">
                      <span>By continuing, you agree to Lagos Provision&apos;s </span>
                      <Link
                        href="/terms"
                        className="text-[#0B4A3A] font-bold hover:underline inline-flex items-center gap-0.5"
                      >
                        Terms of Service
                      </Link>
                      <span> and </span>
                      <Link
                        href="/privacy"
                        className="text-[#0B4A3A] font-bold hover:underline inline-flex items-center gap-0.5"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Benefits Bar */}
          <div className="mt-14 pt-10 border-t border-[#EADFC8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-lg">⚡</span>
              <h4 className="text-xs font-extrabold text-[#1F2A25] uppercase tracking-wider">
                1-Minute Checkout
              </h4>
              <p className="text-xs text-[#6B7280]">
                Pre-filled address and contact details for rapid grocery orders.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-lg">📍</span>
              <h4 className="text-xs font-extrabold text-[#1F2A25] uppercase tracking-wider">
                Saved Lagos Addresses
              </h4>
              <p className="text-xs text-[#6B7280]">
                Save home, office, and family locations across any of the 20 LGAs.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-lg">📦</span>
              <h4 className="text-xs font-extrabold text-[#1F2A25] uppercase tracking-wider">
                Order History & Tracking
              </h4>
              <p className="text-xs text-[#6B7280]">
                Access past receipts, delivery status, and reorder favourite staples.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-lg">🛡️</span>
              <h4 className="text-xs font-extrabold text-[#1F2A25] uppercase tracking-wider">
                Google Verified Security
              </h4>
              <p className="text-xs text-[#6B7280]">
                Encrypted OAuth 2.0 sessions with zero third-party data tracking.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
