import React from 'react';

export function TopLeftStripes() {
  return (
    <div
      className="absolute top-0 left-0 w-28 h-28 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {/* Yellow stripe */}
        <div
          className="absolute -top-6 -left-6 w-20 h-5 bg-[#F4B63F] transform -rotate-45 origin-bottom-right shadow-xs"
        />
        {/* Orange stripe */}
        <div
          className="absolute -top-1 -left-1 w-24 h-5 bg-[#E8683A] transform -rotate-45 origin-bottom-right shadow-xs"
        />
        {/* Deep green stripe */}
        <div
          className="absolute top-4 left-4 w-28 h-5 bg-[#0B4A3A] transform -rotate-45 origin-bottom-right shadow-xs"
        />
      </div>
    </div>
  );
}

export function BottomRightStripes() {
  return (
    <div
      className="absolute bottom-0 right-0 w-36 h-36 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {/* Yellow stripe */}
        <div
          className="absolute bottom-16 -right-6 w-32 h-6 bg-[#F4B63F] transform -rotate-45 shadow-xs"
        />
        {/* Orange stripe */}
        <div
          className="absolute bottom-9 -right-6 w-36 h-6 bg-[#E8683A] transform -rotate-45 shadow-xs"
        />
        {/* Deep green stripe */}
        <div
          className="absolute bottom-2 -right-6 w-40 h-6 bg-[#0B4A3A] transform -rotate-45 shadow-xs"
        />
      </div>
    </div>
  );
}

export function StripeAccent() {
  return (
    <span className="inline-flex items-center gap-1 text-[#E8683A] font-bold text-xs tracking-tighter select-none">
      <span className="w-1.5 h-3.5 bg-[#F4B63F] transform skew-x-[-25deg] rounded-xs inline-block" />
      <span className="w-1.5 h-3.5 bg-[#E8683A] transform skew-x-[-25deg] rounded-xs inline-block" />
      <span className="w-1.5 h-3.5 bg-[#0B4A3A] transform skew-x-[-25deg] rounded-xs inline-block" />
    </span>
  );
}
