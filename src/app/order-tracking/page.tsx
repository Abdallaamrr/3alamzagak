'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { OrderStatus } from '@/lib/types';

const STATUS_STEPS: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export default function OrderTrackingPage() {
  const { lang, t, orders } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<typeof orders[0] | null>(orders[0] || null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const q = searchInput.trim().toUpperCase();
      const found = orders.find(
        (o) => o.orderNumber.toUpperCase() === q || o.id === searchInput.trim() || o.trackingNumber.toUpperCase() === q
      );
      setSearchedOrder(found || null);
    }
  };

  const getStepStatusIndex = (currentStatus: OrderStatus) => {
    return STATUS_STEPS.indexOf(currentStatus);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black font-heading text-cream-100 flex items-center justify-center gap-2">
          <Truck className="w-7 h-7 text-gold-400" />
          <span>{t.trackOrder}</span>
        </h1>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          {lang === 'ar'
            ? 'أدخل رقم الطلب المكون من 5 أرقام لمتابعة خط سير شحنتك لحظة بلحظة.'
            : 'Enter your 5-digit order number to track delivery progress.'}
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={t.searchOrderPlaceholder}
          className="flex-1 bg-navy-900 border border-gold-500/30 text-cream-100 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gold-500"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow hover:bg-gold-400 transition-colors"
        >
          {t.trackOrder}
        </button>
      </form>

      {/* Results View */}
      {searchedOrder ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900 border border-gold-500/30 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
            <div>
              <span className="text-[11px] text-gray-400 block">{t.orderNumberLabel}</span>
              <span className="text-lg font-black text-gold-400 font-mono">
                {searchedOrder.orderNumber}
              </span>
            </div>

            <div className="text-start sm:text-end">
              <span className="text-[11px] text-gray-400 block">رقم التتبع</span>
              <span className="text-xs font-bold text-cream-100 font-mono">
                {searchedOrder.trackingNumber}
              </span>
            </div>
          </div>

          {/* Timeline Visual Pipeline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              {lang === 'ar' ? 'خط سير الطلب' : 'Tracking Timeline'}
            </h3>

            <div className="relative border-l-2 rtl:border-r-2 rtl:border-l-0 border-gold-500/30 pl-6 rtl:pr-6 rtl:pl-0 space-y-6">
              {searchedOrder.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] rtl:-right-[31px] top-0.5 w-4 h-4 rounded-full bg-gold-500 border-2 border-navy-900 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-navy-950" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-cream-100">{item.status}</h4>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{item.date}</span>
                    {item.notes && (
                      <p className="text-[11px] text-gold-400/90 mt-1 italic">{item.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-navy-900 border border-gold-500/20 rounded-3xl space-y-2">
          <AlertCircle className="w-8 h-8 text-gold-400 mx-auto" />
          <p className="text-xs text-gray-400">
            {lang === 'ar' ? 'لم نجد طلباً بهذا الرقم. يرجى التأكد من الرقم والمحاولة مجدداً.' : 'No order found with this number.'}
          </p>
        </div>
      )}
    </div>
  );
}
