'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const { lang, t } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qAr: 'ما هي مدة التوصيل داخل مصر؟',
      qEn: 'What is the delivery time across Egypt?',
      aAr: 'يتم التوصيل داخل القاهرة والجيزة خلال 24 - 48 ساعة. لباقي المحافظات خلال 2 - 4 أيام عمل.',
      aEn: 'Delivery takes 24-48 hours in Cairo & Giza, and 2-4 business days for other governorates.',
    },
    {
      qAr: 'هل يمكنني الدفع عند الاستلام (COD)؟',
      qEn: 'Do you offer Cash on Delivery?',
      aAr: 'نعم! ندعم الدفع نقداً عند استلام الشحنة أمام باب المنزل في جميع محافظات مصر.',
      aEn: 'Yes, we support Cash on Delivery across all governorates in Egypt.',
    },
    {
      qAr: 'هل منتجات وألعاب عالم على مزاجك أصلية؟',
      qEn: 'Are 3alamzagak games authentic?',
      aAr: 'جميع المنتجات أصلية 100% ومصنوعة بخامات ملكية فاخرة تسعى لضمان أطول عمر افتراضي للكروت والطاولات.',
      aEn: '100% authentic products crafted with premium materials for maximum durability.',
    },
    {
      qAr: 'كيف يمكنني تتبع حالة طلبي؟',
      qEn: 'How can I track my order?',
      aAr: 'يمكنك استخدام صفحة "تتبع الطلب" وإدخال رقم الطلب المكون من 5 أرقام لمتابعة خط سير الشحنة.',
      aEn: 'Go to Track Order page and enter your order number for real-time tracking.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black font-heading text-cream-100 flex items-center justify-center gap-2">
          <HelpCircle className="w-7 h-7 text-gold-400" />
          <span>{t.faq}</span>
        </h1>
        <p className="text-xs text-gray-400">
          {lang === 'ar' ? 'إجابات على الأسئلة الأكثر شيوعاً بين زبائن عالم على مزاجك' : 'Frequently asked questions'}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-navy-900 border border-gold-500/20 overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-4 text-start font-bold text-sm text-cream-100 flex justify-between items-center"
            >
              <span>{lang === 'ar' ? faq.qAr : faq.qEn}</span>
              <ChevronDown
                className={`w-4 h-4 text-gold-400 transition-transform ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="p-4 pt-0 text-xs text-gray-300 border-t border-gold-500/10 leading-relaxed">
                {lang === 'ar' ? faq.aAr : faq.aEn}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
