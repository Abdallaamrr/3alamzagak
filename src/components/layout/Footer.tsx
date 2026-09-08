'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { Logo } from '../common/Logo';
import { Mail, Phone, MapPin, Send, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t, addToast, settings } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast(
        lang === 'ar'
          ? 'تم اشتراكك بنجاح في عائلة عالم زاجك! تفقد بريدك للحصول على الخصم 🥳'
          : 'Subscribed to 3alamzagak Club! Check your inbox for your discount 🥳',
        'success'
      );
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-950 text-cream-200 border-t border-gold-500/20 pt-14 pb-8 relative overflow-hidden">
      {/* Background Suit Motifs */}
      <div className="absolute right-10 bottom-10 opacity-5 pointer-events-none text-gold-500 text-9xl font-serif select-none">
        ♠ ♥ ♣ ♦
      </div>

      <div className="container mx-auto px-4">
        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gold-500/10 text-center md:text-start">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cream-100">{t.authenticProducts}</h4>
              <p className="text-[11px] text-gray-400">{t.authenticDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cream-100">{t.fastDelivery}</h4>
              <p className="text-[11px] text-gray-400">{t.fastDeliveryDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cream-100">{t.securePayments}</h4>
              <p className="text-[11px] text-gray-400">{t.securePaymentsDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cream-100">{t.returnsPolicy}</h4>
              <p className="text-[11px] text-gray-400">استبدال ورجوع بسهولة خلال 14 يوم</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-gold-500/10">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              {lang === 'ar'
                ? 'عالم زاجك هو العلامة التجارية المصرية الأولى المتخصصة في ألعاب الكروت والترابيزة والجمعات. نبتكر ونوفر أمتع الألعاب المصممة بجودة ملكية تليق بأوقاتك.'
                : '3alamzagak is Egypt’s premier brand dedicated to card games, tabletop, and gathering games. We craft high-end game experiences for unforgettable moments.'}
            </p>
            <div className="flex items-center gap-4 text-xs text-gold-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gold-400" />
                <span dir="ltr">{settings.supportPhone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gold-400" />
                <span>{settings.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider">{t.shop}</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/shop?category=card-games" className="hover:text-gold-400 transition-colors">
                  {lang === 'ar' ? 'ألعاب الكروت' : 'Card Games'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=board-games" className="hover:text-gold-400 transition-colors">
                  {lang === 'ar' ? 'ألعاب الطاولة والترابيزة' : 'Board Games'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=party-games" className="hover:text-gold-400 transition-colors">
                  {lang === 'ar' ? 'ألعاب الحفلات والسهرات' : 'Party Games'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=chess-classic" className="hover:text-gold-400 transition-colors">
                  {lang === 'ar' ? 'الشطرنج والدمنة الكلاسيكية' : 'Chess & Classics'}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-gold-400 transition-colors">
                  {lang === 'ar' ? 'جرابات حماية ونرد فاخر' : 'Sleeves & Accessories'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider">{t.customerCare}</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold-400 transition-colors">
                  {t.faq}
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="hover:text-gold-400 transition-colors">
                  {t.trackOrder}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-gold-400 transition-colors">
                  {t.shippingPolicy}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gold-400 transition-colors">
                  {t.returnsPolicy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider">{t.newsletterTitle}</h4>
            <p className="text-xs text-gray-400 leading-snug">{t.newsletterSubtitle}</p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t.enterEmail}
                  className="w-full bg-navy-850 border border-gold-500/30 text-cream-100 placeholder-gray-500 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="absolute ltr:right-1 rtl:left-1 top-1 bottom-1 px-3 bg-gold-500 text-navy-950 rounded-lg text-xs font-bold hover:bg-gold-400 transition-colors flex items-center gap-1"
                >
                  <span>{t.subscribe}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{t.rightsReserved.replace('{year}', new Date().getFullYear().toString())}</p>

          <div className="flex items-center gap-4">
            <span className="px-2 py-1 rounded border border-gold-500/20 bg-navy-900 text-cream-200 text-[10px] font-bold">
              💵 Cash on Delivery
            </span>
            <span className="px-2 py-1 rounded border border-gold-500/20 bg-navy-900 text-cream-200 text-[10px] font-bold">
              💳 Visa / MasterCard
            </span>
            <span className="px-2 py-1 rounded border border-gold-500/20 bg-navy-900 text-cream-200 text-[10px] font-bold">
              📱 Vodafone Cash
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
