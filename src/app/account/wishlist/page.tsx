'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { lang, t, wishlist, products } = useApp();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="border-b border-gold-500/20 pb-4">
        <h1 className="text-3xl font-black font-heading text-cream-100 flex items-center gap-2">
          <Heart className="w-7 h-7 text-suit-red fill-current" />
          <span>{t.wishlist} ({wishlist.length})</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          {lang === 'ar' ? 'الألعاب المحفوظة لسهراتك القادمة' : 'Saved games for your upcoming game nights'}
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="p-16 text-center bg-navy-900 border border-gold-500/20 rounded-3xl space-y-4 max-w-md mx-auto">
          <div className="text-4xl">❤️</div>
          <h3 className="text-lg font-bold text-cream-100">لا توجد ألعاب في المفضلة حالياً</h3>
          <p className="text-xs text-gray-400">تصفح متجر عالم زاجك واحفظ ألعابك المفضلة بالنقر على الأيقونة.</p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow"
          >
            {t.shopNow}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
