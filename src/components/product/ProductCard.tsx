'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useApp } from '@/lib/context/app-context';
import { Star, Heart, ShoppingBag, Eye, Users, Clock, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { lang, t, addToCart, toggleWishlist, isInWishlist } = useApp();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const currentPrice = product.salePrice || product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-navy-900/90 border border-gold-500/20 rounded-2xl overflow-hidden hover:border-gold-500/60 hover:shadow-gold-glow transition-all duration-300 flex flex-col h-full"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full bg-navy-950 overflow-hidden">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={lang === 'ar' ? product.nameAr : product.nameEn}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Floating Badges Top Left/Right */}
        <div className="absolute top-3 ltr:left-3 rtl:right-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-suit-red text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase">
              {discountPercent}% {t.discount}
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gradient-to-r from-gold-500 to-gold-700 text-navy-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" />
              <span>{t.bestSellers}</span>
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
              {t.newArrivals}
            </span>
          )}
          {product.stock <= 0 && (
            <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
              {t.outOfStock}
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right/Left */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 ltr:right-3 rtl:left-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-suit-red text-white shadow-lg scale-110'
              : 'bg-navy-950/70 text-cream-100 border border-gold-500/30 hover:border-gold-500 hover:text-gold-400'
          }`}
          title={t.wishlist}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Game Quick Specs Pills on Image Footer */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 text-[10px] text-cream-100 bg-navy-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-gold-500/20">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-gold-400" />
            <span>{product.numberOfPlayers}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gold-400" />
            <span>{product.playingTimeMinutes}</span>
          </div>
          <div className="font-bold text-gold-400">{product.ageRecommendation}</div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-medium text-gold-400/80">{product.brand}</span>
            <div className="flex items-center gap-1 text-gold-400">
              <Star className="w-3.5 h-3.5 fill-current text-gold-400" />
              <span className="font-bold text-xs">{product.rating}</span>
              <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`} className="group-hover:text-gold-400 transition-colors">
            <h3 className="text-sm font-bold text-cream-100 line-clamp-2 leading-snug">
              {lang === 'ar' ? product.nameAr : product.nameEn}
            </h3>
          </Link>
        </div>

        {/* Price & Action Button Footer */}
        <div className="pt-2 border-t border-gold-500/10 flex items-center justify-between gap-2 mt-auto">
          {/* Price Tag */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-gold-400">{currentPrice}</span>
              <span className="text-xs font-bold text-cream-200">{t.egp}</span>
            </div>
            {product.salePrice && (
              <span className="text-[11px] text-gray-400 line-through">
                {product.price} {t.egp}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all shadow-md ${
              product.stock <= 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 shadow-gold-glow'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.addToCart}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
