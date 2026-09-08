'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { CheckCircle2, Printer, Truck, ArrowLeft, ArrowRight, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { lang, t, orders } = useApp();

  const order = orders.find((o) => o.id === id || o.orderNumber === id);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f3e5ab', '#dc2626', '#ffffff'],
      });
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-cream-100">لم يتم العثور على الطلب</h1>
        <Link href="/" className="px-6 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8 print:p-0">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-navy-900 border border-gold-500/30 text-center space-y-4 shadow-card-dark">
        <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-heading text-cream-100">
          {t.orderConfirmedTitle}
        </h1>
        <p className="text-xs text-gray-300">
          {lang === "ar"
            ? "شكراً لتسوقك من عالم على مزاجك! سيتم تجهيز طلبك وشحنه خلال أقرب وقت ممكن."
            : "Thank you for shopping at 3alamzagak! Your order is queued for packing & delivery."}
        </p>

        <div className="inline-block px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 font-bold text-sm">
          {t.orderNumberLabel}{" "}
          <span className="font-mono">{order.orderNumber}</span>
        </div>
      </div>

      {/* Invoice Details Card */}
      <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-6 text-xs text-cream-200">
        <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
          <h2 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
            {t.orderSummary}
          </h2>
          <span className="px-3 py-1 rounded-full bg-navy-950 border border-gold-500/30 text-gold-400 font-bold">
            {order.status}
          </span>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-navy-950 border border-gold-500/10 space-y-1">
            <span className="font-bold text-gold-400 block">{t.fullName}</span>
            <p className="font-semibold text-cream-100">{order.customerName}</p>
            <p className="text-gray-400">{order.customerPhone}</p>
            <p className="text-gray-400">{order.customerEmail}</p>
          </div>

          <div className="p-3 rounded-xl bg-navy-950 border border-gold-500/10 space-y-1">
            <span className="font-bold text-gold-400 block">
              {t.stepAddress}
            </span>
            <p className="font-semibold text-cream-100">
              {order.shippingAddress.governorate} - {order.shippingAddress.city}
            </p>
            <p className="text-gray-400">
              {order.shippingAddress.streetAddress} (
              {order.shippingAddress.building})
            </p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-cream-100">
            {lang === "ar" ? "المنتجات المطلوبة" : "Items"}
          </h3>
          <div className="divide-y divide-gold-500/10">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="py-2.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.productNameEn}
                    className="w-12 h-12 object-cover rounded-lg border border-gold-500/20"
                  />
                  <div>
                    <p className="font-bold text-cream-100">
                      {lang === "ar" ? item.productNameAr : item.productNameEn}
                    </p>
                    <p className="text-gray-400">الكمية: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-gold-400">
                  {item.price * item.quantity} {t.egp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Summary */}
        <div className="pt-4 border-t border-gold-500/20 space-y-1 text-end">
          <div className="flex justify-between">
            <span className="text-gray-400">{t.subtotal}</span>
            <span className="font-bold text-cream-100">
              {order.subtotal} {t.egp}
            </span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-suit-red">
              <span>{t.discount}</span>
              <span className="font-bold">
                -{order.discount.toFixed(0)} {t.egp}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-400">{t.shippingFee}</span>
            <span className="font-bold text-cream-100">
              {order.shippingFee === 0
                ? t.freeShipping
                : `${order.shippingFee} ${t.egp}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-black text-gold-400 pt-2 border-t border-gold-500/10">
            <span>{t.grandTotal}</span>
            <span>
              {order.total.toFixed(0)} {t.egp}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-navy-900 border border-gold-500/40 text-gold-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-gold-500/10 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>{t.printInvoice}</span>
        </button>

        <Link
          href="/order-tracking"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>{t.trackOrder}</span>
        </Link>
      </div>
    </div>
  );
}
