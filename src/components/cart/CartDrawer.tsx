'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Tag, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    lang,
    t,
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    freeShippingProgress,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    settings,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCouponCode(couponInput);
      setCouponInput('');
    }
  };

  const remainingForFreeShipping = Math.max(0, settings.freeShippingThreshold - cartSubtotal);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 ltr:right-0 rtl:left-0 max-w-full flex">
          <motion.div
            initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-navy-950 border-l border-gold-500/20 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-gold-500/20 flex items-center justify-between bg-navy-900">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                <h2 className="text-base font-bold text-cream-100">{t.shoppingCart}</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400">
                  {cart.length} {lang === 'ar' ? 'عناصر' : 'items'}
                </span>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-navy-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-navy-900/60 p-3 border-b border-gold-500/10 text-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <Truck className="w-4 h-4 text-gold-400 shrink-0" />
                {remainingForFreeShipping > 0 ? (
                  <p className="text-cream-200">
                    {t.freeShippingRemaining.replace('{amount}', remainingForFreeShipping.toFixed(0))}
                  </p>
                ) : (
                  <p className="text-emerald-400 font-bold">{t.freeShippingAchieved}</p>
                )}
              </div>
              <div className="w-full h-1.5 bg-navy-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400 text-3xl">
                    ♠
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-cream-100">{t.cartEmpty}</h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">{t.cartEmptySubtitle}</p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs hover:bg-gold-400 transition-colors shadow-gold-glow"
                  >
                    {t.shopNow}
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const itemPrice = item.product.salePrice || item.product.price;
                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 rounded-xl bg-navy-900 border border-gold-500/10 hover:border-gold-500/30 transition-all"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.nameEn}
                        className="w-16 h-16 object-cover rounded-lg border border-gold-500/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-xs font-bold text-cream-100 truncate">
                            {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-500 hover:text-suit-red transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-bold text-gold-400">
                            {itemPrice} {t.egp}
                          </span>

                          <div className="flex items-center border border-gold-500/30 rounded-lg bg-navy-950 text-xs">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-gold-400 hover:bg-navy-800"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-bold text-cream-100">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-gold-400 hover:bg-navy-800"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer Summary */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-gold-500/20 bg-navy-900 space-y-3">
                {/* Coupon Code Input */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code}</span>
                    </div>
                    <button
                      onClick={removeCouponCode}
                      className="text-gray-400 hover:text-white text-[11px] underline"
                    >
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
                      className="flex-1 bg-navy-950 border border-gold-500/30 rounded-lg px-3 py-1.5 text-xs text-cream-100 placeholder-gray-500 focus:outline-none focus:border-gold-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-navy-800 text-gold-400 border border-gold-500/30 text-xs font-bold hover:bg-gold-500 hover:text-navy-950 transition-colors"
                    >
                      {t.applyCoupon}
                    </button>
                  </form>
                )}

                {/* Price Breakdown */}
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>{t.subtotal}</span>
                    <span className="font-semibold text-cream-100">
                      {cartSubtotal} {t.egp}
                    </span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-suit-red">
                      <span>{t.discount}</span>
                      <span className="font-semibold">
                        -{cartDiscount.toFixed(0)} {t.egp}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>{t.shippingFee}</span>
                    <span className="font-semibold text-cream-100">
                      {shippingFee === 0 ? t.freeShipping : `${shippingFee} ${t.egp}`}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-gold-500/20 text-sm font-bold text-gold-400">
                    <span>{t.grandTotal}</span>
                    <span>
                      {cartTotal.toFixed(0)} {t.egp}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:from-gold-400 hover:to-gold-500 transition-all shadow-gold-glow"
                >
                  <span>{t.proceedToCheckout}</span>
                  {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
