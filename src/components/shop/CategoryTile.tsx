import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import { ChevronRight } from 'lucide-react';

interface CategoryTileProps {
  category: Category;
  count?: number;
}

export function CategoryTile({ category, count }: CategoryTileProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="bg-white rounded-2xl border border-[#EADFC8] p-4.5 flex items-center justify-between group hover:border-[#0B4A3A] hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-[#FDFBF5] border border-[#EADFC8] text-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
          {category.icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#1F2A25] group-hover:text-[#0B4A3A] transition-colors truncate leading-tight">
            {category.name}
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            {count !== undefined ? `${count} items` : 'Browse all'}
          </p>
        </div>
      </div>

      <div className="w-7 h-7 rounded-full bg-[#FBF6EA] group-hover:bg-[#0B4A3A] group-hover:text-white text-[#6B7280] flex items-center justify-center transition-colors shrink-0">
        <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
