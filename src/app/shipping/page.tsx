'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { Truck, ShieldCheck } from 'lucide-react';

export default function ShippingPage() {
  const { lang, t } = useApp();
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black font-heading text-cream-100 flex items-center justify-center gap-2">
          <Truck className="w-7 h-7 text-gold-400" />
          <span>{t.shippingPolicy}</span>
        </h1>
        <p className="text-xs text-gray-400">توصيل سريع وآمن لجميع محافظات جمهورية مصر العربية</p>
      </div>

      <div className="p-8 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-6 text-xs text-cream-200 leading-relaxed">
        <h2 className="text-base font-bold text-gold-400 border-b border-gold-500/20 pb-2">
          مواعيد التوصيل والأسعار
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>القاهرة والجيزة:</strong> التوصيل خلال 24 - 48 ساعة (رسوم الشحن 45 ج.م).</li>
          <li><strong>الإسكندرية ومحافظات الدلتا والقناة:</strong> التوصيل خلال 2 - 3 أيام عمل.</li>
          <li><strong>الصعيد والصحراء والبحر الأحمر:</strong> التوصيل خلال 3 - 5 أيام عمل.</li>
          <li className="text-gold-400 font-bold">شحن مجاني تلقائي للطلبات بقيمة 600 ج.م أو أكثر.</li>
        </ul>
      </div>
    </div>
  );
}
