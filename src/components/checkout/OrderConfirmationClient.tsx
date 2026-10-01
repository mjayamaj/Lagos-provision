'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Banknote,
  CreditCard,
  Building2,
  Printer,
  ArrowRight,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
} from 'lucide-react';
import { Order } from '@/types';
import { formatNaira, ACCEPTED_DOOR_PAYMENT_METHODS } from '@/config/delivery';

export function OrderConfirmationClient({ order }: { order: Order }) {
  useEffect(() => {
    // Fire confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0B4A3A', '#E8683A', '#F4B63F', '#22C55E'],
      });
    } catch {
      // Ignore if canvas is unsupported
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Success Hero Banner */}
      <div className="bg-white rounded-3xl border border-[#EADFC8] p-8 sm:p-12 text-center shadow-xs space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#E8F4F0] text-[#0B4A3A] flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="inline-block bg-[#E8F4F0] text-[#0B4A3A] font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
            Order Confirmed • Pay on Delivery
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2A25] tracking-tight">
            Thank you, {order.customer_name}!
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Your order has been received and our Lagos packing team is preparing your provisions.
          </p>
        </div>

        {/* Order Number Badge */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] text-sm">
            <span className="text-[#6B7280] font-medium">Order Number:</span>
            <strong className="text-base font-extrabold text-[#0B4A3A] font-mono tracking-wide">
              {order.order_number}
            </strong>
          </div>
        </div>

        {/* Amount to Pay on Delivery Alert Card */}
        <div className="max-w-md mx-auto mt-4 p-5 rounded-2xl bg-[#FEF3C7] border-2 border-dashed border-[#F59E0B] text-center">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#92400E]">
            Amount Due on Delivery
          </p>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#0B4A3A] my-1">
            {formatNaira(order.total_kobo)}
          </div>
          <p className="text-[11px] text-[#78350F]">
            No payment was taken online. Please have this amount ready when our delivery rider arrives.
          </p>
        </div>
      </div>

      {/* Door payment options */}
      <div className="bg-white rounded-3xl border border-[#EADFC8] p-6 sm:p-8 shadow-xs">
        <h2 className="text-lg font-bold text-[#1F2A25] mb-4">
          How to pay the rider when your order arrives:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ACCEPTED_DOOR_PAYMENT_METHODS.map((method) => (
            <div
              key={method.id}
              className="p-4 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] space-y-1.5"
            >
              <div className="flex items-center gap-2">
                {method.id === 'cash' && <Banknote className="w-5 h-5 text-[#0B4A3A]" />}
                {method.id === 'pos' && <CreditCard className="w-5 h-5 text-[#0B4A3A]" />}
                {method.id === 'transfer' && <Building2 className="w-5 h-5 text-[#0B4A3A]" />}
                <span className="text-sm font-bold text-[#1F2A25]">{method.name}</span>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                {method.instruction}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details & Delivery Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Ordered Items Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EADFC8] p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-[#1F2A25] pb-3 border-b border-[#F0EAE1]">
            Items Ordered ({order.items?.length || 0})
          </h2>

          <div className="divide-y divide-[#F0EAE1]">
            {(order.items || []).map((item) => (
              <div key={item.id} className="py-3.5 first:pt-0 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-[#1F2A25]">{item.name_snapshot}</h3>
                  <p className="text-xs text-[#6B7280]">
                    {item.size_snapshot} • Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#1F2A25]">
                    {formatNaira(item.line_total_kobo)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5E0D3] space-y-2 text-sm">
            <div className="flex justify-between text-[#6B7280]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#1F2A25]">{formatNaira(order.subtotal_kobo)}</span>
            </div>
            <div className="flex justify-between text-[#6B7280]">
              <span>Delivery Fee (Lagos)</span>
              <span className="font-semibold text-[#1F2A25]">{formatNaira(order.delivery_fee_kobo)}</span>
            </div>
            <div className="pt-2 border-t border-[#E5E0D3] flex justify-between text-base font-extrabold text-[#1F2A25]">
              <span>Total Due on Delivery</span>
              <span className="text-xl text-[#0B4A3A]">{formatNaira(order.total_kobo)}</span>
            </div>
          </div>
        </div>

        {/* Right: Shipping Address & Support */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#EADFC8] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-[#1F2A25] pb-3 border-b border-[#F0EAE1]">
              Delivery Information
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#4B5563]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0B4A3A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1F2A25]">{order.shipping_street}</p>
                  <p>{order.shipping_neighbourhood}, {order.shipping_lga}, Lagos</p>
                  {order.shipping_landmark && (
                    <p className="text-gray-500 text-xs mt-0.5">Near: {order.shipping_landmark}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0B4A3A] shrink-0" />
                <div>
                  <span className="font-semibold text-[#1F2A25]">{order.customer_phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#0B4A3A] shrink-0" />
                <div>
                  <span className="font-semibold text-[#0B4A3A]">Within 24–48 hours</span>
                </div>
              </div>

              {order.delivery_instructions && (
                <div className="p-3 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] mt-3">
                  <p className="text-[11px] font-bold text-[#1F2A25] uppercase">Instructions for Rider:</p>
                  <p className="text-xs italic text-[#6B7280] mt-0.5">"{order.delivery_instructions}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 py-3 px-4 rounded-xl bg-white border border-[#D4C8B0] hover:bg-gray-50 text-xs font-bold text-[#1F2A25] flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>

            <Link
              href="/shop"
              className="flex-1 py-3 px-4 rounded-xl bg-[#0B4A3A] hover:bg-[#08382c] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Back to Shop</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
