import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, FileText, Mail } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TopLeftStripes, BottomRightStripes } from '@/components/ui/CornerStripes';

export const metadata = {
  title: 'Privacy Policy — Lagos Provision',
  description: 'Privacy Policy and Google OAuth user data disclosure for Lagos Provision.',
};

export default function PrivacyPage() {
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
              <Shield className="w-3.5 h-3.5" />
              <span>NDPR & Google OAuth Compliant</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2A25] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
              Last updated: October 2026 • Effective for all Lagos Provision customers & website visitors
            </p>
          </div>

          <div className="prose prose-sm max-w-none text-[#374151] space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">1. Overview</h2>
              <p>
                Lagos Provision (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the online grocery and provision ordering platform serving customers across Lagos State, Nigeria. We are committed to protecting your personal information and your right to privacy in full compliance with the Nigeria Data Protection Regulation (NDPR) and international privacy standards.
              </p>
            </section>

            <section className="bg-[#FBF6EA] p-5 rounded-2xl border border-[#EADFC8]">
              <h2 className="text-lg font-bold text-[#0B4A3A] mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#0B4A3A]" />
                <span>2. Google OAuth User Data Policy</span>
              </h2>
              <p className="mb-2">
                When you choose to sign in to Lagos Provision using your <strong>Google Account</strong> (&ldquo;Sign in with Google&rdquo;), we request access to basic profile information:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Email address:</strong> Used as your unique account identifier and to send order confirmations, receipts, and delivery notifications.</li>
                <li><strong>Full Name:</strong> Used to personalize your account and label grocery delivery packages.</li>
                <li><strong>Avatar / Profile Picture:</strong> Displayed within your personal profile header.</li>
              </ul>
              <p className="mt-3 font-semibold text-[#1F2A25]">
                What we DO NOT do with Google Data:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>We <strong>never sell, lease, or trade</strong> your Google profile data to third-party data brokers or advertisers.</li>
                <li>We do not request or access your Google contacts, Google Drive files, search history, or any other sensitive scopes.</li>
                <li>Your data is never used to train generalized artificial intelligence models without explicit consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">3. Information Collected During Checkout</h2>
              <p>
                To deliver groceries and provisions to your doorstep in Lagos, we collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Delivery Address & LGA:</strong> Destination within the 20 Local Government Areas of Lagos State.</li>
                <li><strong>Phone Number:</strong> For our dispatch riders to coordinate doorstep arrival and phone contact.</li>
                <li><strong>Order History:</strong> Record of items purchased, delivery timestamps, and payment receipt status.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">4. Payment Security</h2>
              <p>
                Lagos Provision operates primarily on a <strong>Pay on Delivery (Cash, POS terminal, or direct bank transfer)</strong> model. We do not store credit or debit card numbers on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">5. Data Retention & Account Deletion</h2>
              <p>
                You retain complete control over your personal data. You may request deletion of your account and associated order records at any time by sending an email with the subject &ldquo;Data Deletion Request&rdquo; to <strong>support@lagosprovision.ng</strong>. We will permanently delete your personal profile data within 7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1F2A25] mb-2">6. Contact Us</h2>
              <p>
                If you have questions regarding this Privacy Policy or your personal information, please contact our Data Protection team:
              </p>
              <div className="mt-2 text-xs bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-1 font-mono text-[#1F2A25]">
                <p>Email: support@lagosprovision.ng</p>
                <p>Customer Care: +234 800 524 6777</p>
                <p>Physical Dispatch Hub: Victoria Island & Ikeja, Lagos State, Nigeria</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
