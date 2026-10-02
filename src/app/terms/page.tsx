import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TopLeftStripes, BottomRightStripes } from '@/components/ui/CornerStripes';

export const metadata = {
  title: 'Terms of Service — Lagos Provision',
  description: 'Terms of Service and ordering conditions for Lagos Provision grocery store.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FBF6EA] flex flex-col relative overflow-x-hidden">
      <TopLeftStripes />
      <BottomRightStripes />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B4A3A] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADFC8] shadow-sm">
          {/* Header */}
          <div className="border-b border-[#EADFC8] pb-6 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4F0] text-[#0B4A3A] text-xs font-bold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Customer Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A25] tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
              Last updated: October 2026 • Governed under the laws of the Federal Republic of Nigeria
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#374151] space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">1. Acceptance of Terms</h2>
              <p>
                By creating an account (including via Google OAuth), placing an order, or accessing any part of Lagos Provision (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">2. Service Description</h2>
              <p>
                Lagos Provision is a digital grocery provisioning service delivering fresh market staples (rice, garri, beans, cooking oils, tubers, spices, and packaged foods) across the 20 Local Government Areas of Lagos State, Nigeria.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">3. User Accounts & Google Authentication</h2>
              <p>
                Users can register and log in seamlessly using Google OAuth. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate delivery information (address and contact phone number) to ensure timely fulfillment.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">4. Pricing, Delivery & Payment on Delivery</h2>
              <p>
                All prices are displayed in Nigerian Naira (₦). A flat delivery fee of ₦2,000 applies across all covered Lagos LGAs.
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Payment on Delivery:</strong> You can inspect your grocery parcel upon delivery and settle the total via Cash, dispatch POS terminal, or direct bank transfer.</li>
                <li><strong>Cancellations:</strong> Orders may be cancelled without penalty prior to rider dispatch. Once a rider is on transit, orders cannot be cancelled mid-route.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">5. Returns, Quality Guarantee & Refunds</h2>
              <p>
                We stand behind the freshness of all provisions. If an item arrives damaged, unsealed, or not matching specifications, you may reject that item at the door, and the rider will deduct it from your final payable total immediately.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">6. Contact & Support</h2>
              <p>
                For order assistance or questions regarding these terms, reach our Lagos customer support desk at <strong>support@lagosprovision.ng</strong> or via phone at <strong>+234 800 524 6777</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
