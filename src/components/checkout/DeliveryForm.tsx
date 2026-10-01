'use client';

import React from 'react';
import {
  User,
  FileText,
  CreditCard,
  Banknote,
  Building2,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { LAGOS_LGAS, ACCEPTED_DOOR_PAYMENT_METHODS, formatNaira } from '@/config/delivery';
import { CheckoutFormData } from '@/lib/validation/checkout';

interface DeliveryFormProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  totalKobo: number;
  userEmail?: string;
  isLoggedIn?: boolean;
}

export function DeliveryForm({
  formData,
  onChange,
  errors,
  totalKobo,
  isLoggedIn = false,
}: DeliveryFormProps) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-[#E5E0D3] p-6 sm:p-8">
      {/* Header: Customer Details */}
      <div className="flex items-start gap-3.5 pb-6 border-b border-[#F0EAE1]">
        <div className="w-10 h-10 rounded-full bg-[#0B4A3A] text-white flex items-center justify-center shrink-0 shadow-xs">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F2A25] tracking-tight leading-tight">
            Customer Details
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
            Tell us where to reach you and where to deliver your order.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {/* ==========================================
            1. CONTACT INFORMATION
        ========================================== */}
        <div>
          <h2 className="text-base font-bold text-[#1F2A25] mb-4">
            1. Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-[#1F2A25] mb-1.5"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => onChange('fullName', e.target.value)}
                placeholder="e.g. Adeola Johnson"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1F2A25] placeholder:text-[#9CA3AF] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0B4A3A]/20 ${
                  errors.fullName
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-[#D4C8B0] bg-white focus:border-[#0B4A3A]'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 font-medium mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number (Nigerian) with flag and +234 prefix */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold text-[#1F2A25] mb-1.5"
              >
                Phone Number (Nigerian)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none select-none">
                  {/* Small Flag */}
                  <div className="flex h-3 w-4.5 rounded-xs overflow-hidden border border-black/10">
                    <div className="w-1/3 h-full bg-[#008751]" />
                    <div className="w-1/3 h-full bg-white" />
                    <div className="w-1/3 h-full bg-[#008751]" />
                  </div>
                  <ChevronDown className="w-3 h-3 text-[#6B7280]" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => onChange('phone', e.target.value)}
                  placeholder="+234 801 234 5678"
                  className={`w-full pl-14 pr-3.5 py-2.5 rounded-xl border text-sm text-[#1F2A25] placeholder:text-[#9CA3AF] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0B4A3A]/20 ${
                    errors.phone
                      ? 'border-red-500 bg-red-50/20'
                      : 'border-[#D4C8B0] bg-white focus:border-[#0B4A3A]'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 font-medium mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Email Address (Added below phone per PRD spec) */}
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-xs font-bold text-[#1F2A25] mb-1.5"
            >
              Email Address <span className="font-normal text-[#6B7280]">(for order confirmation)</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="e.g. adeola@example.com"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1F2A25] placeholder:text-[#9CA3AF] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0B4A3A]/20 ${
                errors.email
                  ? 'border-red-500 bg-red-50/20'
                  : 'border-[#D4C8B0] bg-white focus:border-[#0B4A3A]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* ==========================================
            2. DELIVERY ADDRESS (LAGOS)
        ========================================== */}
        <div>
          <h2 className="text-base font-bold text-[#1F2A25] mb-4">
            2. Delivery Address (Lagos)
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* House Number & Street */}
              <div>
                <label
                  htmlFor="street"
                  className="block text-xs font-bold text-[#1F2A25] mb-1.5"
                >
                  House Number & Street
                </label>
                <input
                  id="street"
                  type="text"
                  value={formData.street}
                  onChange={(e) => onChange('street', e.target.value)}
                  placeholder="e.g. 12B, Adekunle Fajuyi Street"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1F2A25] placeholder:text-[#9CA3AF] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0B4A3A]/20 ${
                    errors.street
                      ? 'border-red-500 bg-red-50/20'
                      : 'border-[#D4C8B0] bg-white focus:border-[#0B4A3A]'
                  }`}
                />
                {errors.street && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.street}</p>
                )}
              </div>

              {/* Area / Local Government */}
              <div>
                <label
                  htmlFor="lga"
                  className="block text-xs font-bold text-[#1F2A25] mb-1.5"
                >
                  Area / Local Government
                </label>
                <div className="relative">
                  <select
                    id="lga"
                    value={formData.lga}
                    onChange={(e) => onChange('lga', e.target.value)}
                    className={`w-full appearance-none px-3.5 py-2.5 rounded-xl border text-sm text-[#1F2A25] bg-white transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0B4A3A]/20 pr-9 ${
                      errors.lga
                        ? 'border-red-500 bg-red-50/20'
                        : 'border-[#D4C8B0] focus:border-[#0B4A3A]'
                    }`}
                  >
                    <option value="" disabled>
                      Select LGA
                    </option>
                    {LAGOS_LGAS.map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#6B7280] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.lga && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.lga}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City / Neighbourhood */}
              <div>
                <label
                  htmlFor="neighbourhood"
                  className="block text-xs font-bold text-[#1F2A25] mb-1.5"
                >
                  City / Neighbourhood
                </label>
                <input
                  id="neighbourhood"
                  type="text"
                  value={formData.neighbourhood}
                  onChange={(e) => onChange('neighbourhood', e.target.value)}
                  placeholder="e.g. Ikeja"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1F2A25] placeholder:text-[#9CA3AF] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0B4A3A]/20 ${
                    errors.neighbourhood
                      ? 'border-red-500 bg-red-50/20'
                      : 'border-[#D4C8B0] bg-white focus:border-[#0B4A3A]'
                  }`}
                />
                {errors.neighbourhood && (
                  <p className="text-xs text-red-500 font-medium mt-1">{errors.neighbourhood}</p>
                )}
              </div>

              {/* Landmark (Optional) */}
              <div>
                <label
                  htmlFor="landmark"
                  className="block text-xs font-bold text-[#1F2A25] mb-1.5"
                >
                  Landmark <span className="font-normal text-[#6B7280]">(Optional)</span>
                </label>
                <input
                  id="landmark"
                  type="text"
                  value={formData.landmark || ''}
                  onChange={(e) => onChange('landmark', e.target.value)}
                  placeholder="e.g. Near Ikeja City Mall"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4C8B0] bg-white text-sm text-[#1F2A25] placeholder:text-[#9CA3AF] transition-colors focus:outline-hidden focus:border-[#0B4A3A] focus:ring-2 focus:ring-[#0B4A3A]/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            3. DELIVERY INSTRUCTIONS
        ========================================== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-[#0B4A3A]" />
            <h2 className="text-base font-bold text-[#1F2A25]">
              3. Delivery Instructions
            </h2>
          </div>

          <div className="relative">
            <textarea
              id="instructions"
              rows={3}
              maxLength={200}
              value={formData.instructions || ''}
              onChange={(e) => onChange('instructions', e.target.value)}
              placeholder="e.g. Call on arrival, gate code, or any special instructions..."
              className="w-full px-3.5 py-2.5 pb-7 rounded-xl border border-[#D4C8B0] bg-white text-sm text-[#1F2A25] placeholder:text-[#9CA3AF] transition-colors focus:outline-hidden focus:border-[#0B4A3A] focus:ring-2 focus:ring-[#0B4A3A]/20 resize-none"
            />
            {/* Live 0/200 Counter */}
            <span className="absolute bottom-2.5 right-3 text-xs text-[#6B7280] font-mono select-none">
              {(formData.instructions || '').length}/200
            </span>
          </div>
        </div>

        {/* ==========================================
            4. PAYMENT METHOD (Pay on Delivery Only)
        ========================================== */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-4 h-4 text-[#0B4A3A]" />
            <h2 className="text-base font-bold text-[#1F2A25]">
              4. Payment Method
            </h2>
          </div>
          <p className="text-xs text-[#6B7280] mb-4">
            You pay when your order arrives.
          </p>

          {/* Single Radio Card for Pay on Delivery */}
          <div className="rounded-xl border-2 border-[#0B4A3A] bg-[#FDFBF5] p-4.5 sm:p-5 relative shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B4A3A]/10 text-[#0B4A3A] flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1F2A25]">
                    Pay on Delivery
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Pay when you receive your order at your doorstep.
                  </p>
                </div>
              </div>

              {/* Radio selection circle */}
              <div className="w-5 h-5 rounded-full border-2 border-[#0B4A3A] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0B4A3A]" />
              </div>
            </div>

            {/* Dynamic total ready line */}
            <div className="mt-3.5 pt-3.5 border-t border-[#EADFC8] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0B4A3A]">
                Please have <strong className="font-extrabold">{formatNaira(totalKobo)}</strong> ready when your order arrives.
              </span>
            </div>
          </div>

          {/* Accepted ways to pay the rider at the door */}
          <div className="mt-4 p-4 rounded-xl bg-white border border-[#E5E0D3]">
            <p className="text-xs font-bold text-[#1F2A25] mb-2.5 uppercase tracking-wide">
              Accepted payment methods at your door:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ACCEPTED_DOOR_PAYMENT_METHODS.map((method) => {
                return (
                  <div
                    key={method.id}
                    className="p-3 rounded-lg bg-[#FDFBF5] border border-[#EADFC8] flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {method.id === 'cash' && <Banknote className="w-4 h-4 text-[#0B4A3A]" />}
                      {method.id === 'pos' && <CreditCard className="w-4 h-4 text-[#0B4A3A]" />}
                      {method.id === 'transfer' && <Building2 className="w-4 h-4 text-[#0B4A3A]" />}
                      <span className="text-xs font-bold text-[#1F2A25]">{method.name}</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] leading-snug">
                      {method.instruction}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
