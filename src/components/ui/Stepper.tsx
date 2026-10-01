import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export type CheckoutStep = 1 | 2 | 3;

interface StepperProps {
  currentStep: CheckoutStep;
}

export function Stepper({ currentStep }: StepperProps) {
  const steps = [
    { number: 1, label: 'Cart', href: '/cart' },
    { number: 2, label: 'Delivery', href: '/checkout' },
    { number: 3, label: 'Confirmation', href: '#' },
  ];

  return (
    <div className="w-full py-6 flex items-center justify-center select-none">
      <div className="flex items-center gap-2 sm:gap-4 max-w-lg">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <React.Fragment key={step.number}>
              {/* Step indicator */}
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <Link
                    href={step.href}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B4A3A] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:opacity-90 transition-opacity"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </Link>
                ) : isActive ? (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E8683A] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs ring-4 ring-[#E8683A]/20">
                    {step.number}
                  </div>
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E5E0D3] text-[#6B7280] flex items-center justify-center font-bold text-xs sm:text-sm">
                    {step.number}
                  </div>
                )}

                <span
                  className={`text-xs sm:text-sm font-bold ${
                    isActive
                      ? 'text-[#1F2A25]'
                      : isCompleted
                      ? 'text-[#0B4A3A]'
                      : 'text-[#6B7280]'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line with orange // motif */}
              {index < steps.length - 1 && (
                <div className="flex items-center gap-1 sm:gap-2 px-1">
                  <div
                    className={`h-[2px] w-6 sm:w-12 ${
                      isCompleted ? 'bg-[#0B4A3A]' : 'bg-[#D4C8B0]'
                    }`}
                  />
                  {/* The orange // diagonal connector motif */}
                  <span className="text-[#E8683A] font-extrabold text-xs tracking-tighter opacity-80 select-none">
                    //
                  </span>
                  <div
                    className={`h-[2px] w-6 sm:w-12 ${
                      currentStep > step.number + 1 ? 'bg-[#0B4A3A]' : 'bg-[#D4C8B0]'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
