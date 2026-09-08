'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, Tag, Truck, ShieldCheck } from 'lucide-react';

export default function FullCartPage() {
  const {
    lang,
    t,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    settings,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCouponCode(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400 text-5xl mx-auto">
          ♠
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black font-heading text-cream-100">{t.cartEmpty}</h1>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">{t.cartEmptySubtitle}</p>
        </div>
        <Link
          href="/shop"
          className="inline-block px-8 py-3 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow"
        >
          {t.shopNow}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-black font-heading text-cream-100 border-b border-gold-500/20 pb-4">
        {t.shoppingCart} ({cart.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const itemPrice = item.product.salePrice || item.product.price;
            return (
              <div
                key={item.product.id}
                className="p-4 rounded-2xl bg-navy-900 border border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.nameEn}
                    className="w-20 h-20 object-cover rounded-xl border border-gold-500/30 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-gold-400 font-bold uppercase">{item.product.brand}</span>
                    <h3 className="text-sm font-bold text-cream-100 line-clamp-1">
                      {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </h3>
                    <p className="text-xs text-gold-400 font-bold mt-1">
                      {itemPrice} {t.egp}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity Modifier */}
                  <div className="flex items-center border border-gold-500/30 rounded-xl bg-navy-950">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-gold-400 hover:bg-navy-850 rounded-lg text-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-bold text-cream-100 text-xs">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-gold-400 hover:bg-navy-850 rounded-lg text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-black text-gold-400 min-w-[80px] text-end">
                    {itemPrice * item.quantity} {t.egp}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-500 hover:text-suit-red p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Summary Box */}
        <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/30 space-y-6 h-fit">
          <h2 className="text-lg font-bold text-cream-100 border-b border-gold-500/20 pb-3">
            {t.orderSummary}
          </h2>

          {/* Coupon */}
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Tag className="w-4 h-4" />
                <span>{appliedCoupon.code}</span>
              </div>
              <button onClick={removeCouponCode} className="text-gray-400 hover:text-white text-xs underline">
                {lang === 'ar' ? 'إلغاء' : 'Remove'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder={t.couponCode}
                className="flex-1 bg-navy-950 border border-gold-500/30 rounded-xl px-3 py-2 text-xs text-cream-100 placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-navy-800 text-gold-400 border border-gold-500/30 text-xs font-bold hover:bg-gold-500 hover:text-navy-950 transition-colors"
              >
                {t.applyCoupon}
              </button>
            </form>
          )}

          {/* Cost breakdown */}
          <div className="space-y-2 text-xs text-gray-300 border-b border-gold-500/20 pb-4">
            <div className="flex justify-between">
              <span>{t.subtotal}</span>
              <span className="font-bold text-cream-100">
                {cartSubtotal} {t.egp}
              </span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-suit-red">
                <span>{t.discount}</span>
                <span className="font-bold">
                  -{cartDiscount.toFixed(0)} {t.egp}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>{t.shippingFee}</span>
              <span className="font-bold text-cream-100">
                {shippingFee === 0 ? t.freeShipping : `${shippingFee} ${t.egp}`}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-base font-black text-gold-400">
            <span>{t.grandTotal}</span>
            <span>
              {cartTotal.toFixed(0)} {t.egp}
            </span>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            <span>{t.proceedToCheckout}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    </div>
  );
}
