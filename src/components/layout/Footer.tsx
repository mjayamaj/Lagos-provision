import React from 'react';
import Link from 'next/link';
import { FOOTER_TAGLINE, LAGOS_LGAS } from '@/config/delivery';

export function Footer() {
  return (
    <footer className="w-full bg-[#FBF6EA] border-t border-[#EADFC8] pt-12 pb-16 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#EADFC8]">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-[#0B4A3A]">Lagos Provision</span>
              <span className="text-xs">🇳🇬</span>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Lagos' trusted neighbourhood grocery provision shop. Fresh staples, rice, garri, oils, spices, and household essentials delivered to your doorstep.
            </p>
            <p className="text-xs font-bold text-[#E8683A]">
              Pay on Delivery across all 20 Lagos LGAs.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-[#1F2A25] uppercase tracking-wider mb-3">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>
                <Link href="/shop?category=rice-beans-grains" className="hover:text-[#0B4A3A] transition-colors">
                  Rice, Beans & Grains
                </Link>
              </li>
              <li>
                <Link href="/shop?category=garri-flour-swallow" className="hover:text-[#0B4A3A] transition-colors">
                  Garri, Flour & Swallow
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pasta-noodles" className="hover:text-[#0B4A3A] transition-colors">
                  Pasta & Noodles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=oils-fats" className="hover:text-[#0B4A3A] transition-colors">
                  Oils & Cooking Fats
                </Link>
              </li>
              <li>
                <Link href="/shop?category=tomatoes-canned-food-sauces" className="hover:text-[#0B4A3A] transition-colors">
                  Tomatoes & Canned Stews
                </Link>
              </li>
              <li>
                <Link href="/shop?category=fresh-produce-eggs-frozen" className="hover:text-[#0B4A3A] transition-colors">
                  Fresh Produce & Perishables
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery Coverage */}
          <div>
            <h4 className="text-xs font-bold text-[#1F2A25] uppercase tracking-wider mb-3">
              Delivery Coverage (Lagos)
            </h4>
            <p className="text-xs text-[#6B7280] mb-2 leading-relaxed">
              Flat ₦2,000 delivery fee to all 20 Local Government Areas:
            </p>
            <div className="flex flex-wrap gap-1 text-[11px] text-[#0B4A3A]">
              {LAGOS_LGAS.slice(0, 10).map((lga) => (
                <span key={lga} className="bg-white/80 px-2 py-0.5 rounded-sm border border-[#EADFC8]">
                  {lga}
                </span>
              ))}
              <span className="text-[#6B7280] text-xs self-center">+ 10 more</span>
            </div>
          </div>

          {/* Help & Policies */}
          <div>
            <h4 className="text-xs font-bold text-[#1F2A25] uppercase tracking-wider mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>Support Phone: <strong className="text-[#1F2A25]">+234 800 524 6777</strong></li>
              <li>WhatsApp Orders: <strong className="text-[#1F2A25]">+234 801 234 5678</strong></li>
              <li>Delivery Hours: Monday – Saturday (8am – 7pm)</li>
              <li>Door Payment: Cash, POS & Bank Transfer</li>
              <li className="pt-2 text-[11px] text-[#6B7280]">NDPR Privacy Compliant</li>
            </ul>
          </div>
        </div>

        {/* Bottom Tagline & Stripe Ribbon (Exact design match) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* 4 Diagonal color stripes */}
            <div className="flex items-center gap-1 select-none">
              <span className="w-2 h-4.5 bg-[#F4B63F] transform -skew-x-[25deg] rounded-xs inline-block" />
              <span className="w-2 h-4.5 bg-[#E8683A] transform -skew-x-[25deg] rounded-xs inline-block" />
              <span className="w-2 h-4.5 bg-[#0B4A3A] transform -skew-x-[25deg] rounded-xs inline-block" />
              <span className="w-2 h-4.5 bg-[#F4B63F] transform -skew-x-[25deg] rounded-xs inline-block" />
            </div>

            {/* Tagline */}
            <span className="text-xs font-extrabold tracking-widest text-[#0B4A3A] uppercase select-none">
              {FOOTER_TAGLINE}
            </span>
          </div>

          <div className="text-[11px] text-[#6B7280]">
            © {new Date().getFullYear()} Lagos Provision. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
