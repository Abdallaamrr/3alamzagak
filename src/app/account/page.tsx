'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { Package, Heart, MapPin, User, Settings, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

export default function AccountDashboardPage() {
  const { lang, t, currentUser, orders, wishlist } = useApp();

  const userOrders = currentUser
    ? orders.filter((o) => o.customerId === currentUser.id)
    : orders.slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Welcome Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-950 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-black text-xl">
            {currentUser ? currentUser.name.charAt(0) : 'U'}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-cream-100">
              {t.welcomeBack.replace('{name}', currentUser ? currentUser.name : 'زائر زاجك')}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              {currentUser ? currentUser.email : 'تسوق بحرية وسجل متابعة طلباتك أولاً بأول'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 font-bold text-xs">
            {currentUser ? currentUser.role : 'Guest User'}
          </span>
        </div>
      </div>

      {/* KPI Stats Quick Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/account/orders"
          className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 hover:border-gold-500 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">{t.myOrders}</span>
            <span className="text-xl font-black text-cream-100">{userOrders.length}</span>
          </div>
        </Link>

        <Link
          href="/account/wishlist"
          className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 hover:border-gold-500 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">{t.wishlist}</span>
            <span className="text-xl font-black text-cream-100">{wishlist.length}</span>
          </div>
        </Link>

        <Link
          href="/account/addresses"
          className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 hover:border-gold-500 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-400 block">{t.savedAddresses}</span>
            <span className="text-xl font-black text-cream-100">
              {currentUser?.addresses.length || 1}
            </span>
          </div>
        </Link>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-gold-500/10 pb-3">
          <h2 className="text-base font-bold text-cream-100">{lang === 'ar' ? 'أحدث الطلبات' : 'Recent Orders'}</h2>
          <Link href="/account/orders" className="text-xs text-gold-400 hover:underline">
            {lang === 'ar' ? 'عرض الكل' : 'View All'}
          </Link>
        </div>

        {userOrders.length === 0 ? (
          <p className="text-xs text-gray-400 italic">لا توجد طلبات سابقة حتى الآن.</p>
        ) : (
          <div className="space-y-3">
            {userOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-xl bg-navy-950 border border-gold-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-gold-400 font-mono">{ord.orderNumber}</span>
                  <span className="text-gray-400 block text-[11px] mt-0.5">{ord.createdAt}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-400 font-bold">
                    {ord.status}
                  </span>
                  <span className="font-bold text-cream-100">{ord.total} {t.egp}</span>
                  <Link
                    href={`/order-confirmation/${ord.id}`}
                    className="text-gold-400 hover:underline font-bold"
                  >
                    {lang === 'ar' ? 'التفاصيل' : 'Details'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
