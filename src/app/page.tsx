'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { ProductCard } from '@/components/product/ProductCard';
import { Logo } from '@/components/common/Logo';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Flame,
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
  Star,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { lang, t, products, categories, reviews } = useApp();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const specialOffers = products.filter((p) => p.salePrice).slice(0, 4);
  const originals = products.filter((p) => p.brand === '3alamzagak');

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section inspired by luxury gaming table */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center bg-table-texture overflow-hidden border-b border-gold-500/20 px-4">
        {/* Floating Card & Dice Micro-animations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle radial glow center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-radial blur-3xl opacity-60" />

          {/* Floating Card 1: Speeeeeedy */}
          <motion.img
            src="/cards/Speeeeeedy_Minimalist_Full_Card_4K_9x5.5cm.png"
            alt="Speeeeeedy Card"
            animate={{ y: [0, -15, 0], rotate: [ -8, -5, -8 ] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 ltr:left-8 rtl:right-8 w-28 sm:w-44 rounded-xl shadow-gold-glow border border-gold-500/30 opacity-70 hidden md:block"
          />

          {/* Floating Card 2: Hodabt */}
          <motion.img
            src="/cards/01_Hodabt_police_4K_bleed.png"
            alt="Hodabt Card"
            animate={{ y: [0, 18, 0], rotate: [ 10, 14, 10 ] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-16 ltr:right-10 rtl:left-10 w-32 sm:w-48 rounded-xl shadow-gold-glow border border-gold-500/30 opacity-70 hidden md:block"
          />

          {/* Floating Card 3: Koma El 10 */}
          <motion.img
            src="/cards/Koma_El10_Crown_4K_9x5.5cm_Full.png"
            alt="Crown Card"
            animate={{ y: [0, -12, 0], rotate: [ 5, 2, 5 ] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 ltr:right-24 rtl:left-24 w-24 sm:w-36 rounded-xl shadow-gold-glow border border-gold-500/30 opacity-60 hidden lg:block"
          />

          {/* Suit Symbols Floating */}
          <div className="absolute top-1/3 left-1/4 text-gold-500/20 text-6xl animate-pulse-subtle font-serif select-none">
            ♠
          </div>
          <div className="absolute bottom-1/4 right-1/3 text-suit-red/20 text-6xl animate-pulse-subtle font-serif select-none">
            ♥
          </div>
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 py-12">
          {/* Logo Branding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <Logo size="xl" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-cream-100 leading-tight"
          >
            {t.heroTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-xl text-cream-200/90 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 font-black text-sm uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all shadow-gold-glow flex items-center justify-center gap-2"
            >
              <span>{t.shopNow}</span>
              {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            <Link
              href="/shop?category=card-games"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-navy-900 border border-gold-500/40 text-gold-400 font-bold text-sm hover:bg-gold-500/10 hover:border-gold-500 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-gold-400" />
              <span>{t.exploreGames}</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Shop By Category */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-cream-100 flex items-center gap-2">
              <span className="text-gold-500">♠</span>
              <span>{t.categories}</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {lang === 'ar' ? 'اختر قسمك المفضل وابدأ التحدي' : 'Pick your favorite category & start playing'}
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-bold text-gold-400 hover:underline flex items-center gap-1"
          >
            <span>{lang === 'ar' ? 'عرض الكل' : 'View All'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-navy-900 border border-gold-500/20 hover:border-gold-500 hover:shadow-gold-glow transition-all duration-300 p-4 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-xl bg-navy-950 border border-gold-500/30 overflow-hidden flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.nameEn}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold text-cream-100 group-hover:text-gold-400 transition-colors">
                  {lang === 'ar' ? cat.nameAr : cat.nameEn}
                </h3>
                <span className="text-[10px] text-gray-500 mt-0.5 block">
                  {cat.productCount} {lang === 'ar' ? 'ألعاب' : 'games'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. 3alamzagak Originals Showcase Spotlight */}
      <section className="bg-gradient-to-b from-navy-900 via-navy-850 to-navy-950 border-y border-gold-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
              {lang === 'ar' ? 'إصدارات عالم زاجك الأصلية' : '3alamzagak Original Releases'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-cream-100">
              {lang === 'ar' ? 'ألعاب مصممة بروح التحدي والضحك' : 'Games Crafted For Passion & Competition'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              {lang === 'ar'
                ? 'استمتع بأشهر ألعاب الكروت السريعة والتحقيق المصرية المصنوعة بأعلى معايير الجودة.'
                : 'Enjoy top Egyptian speed & deduction card games designed with royalty quality.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {originals.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-cream-100 flex items-center gap-2">
              <Flame className="w-7 h-7 text-gold-500" />
              <span>{t.bestSellers}</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {lang === 'ar' ? 'الأكثر طلباً وتقييماً من عشاق الألعاب' : 'Top requested games by our players'}
            </p>
          </div>

          <Link
            href="/shop?bestseller=true"
            className="text-xs font-bold text-gold-400 hover:underline flex items-center gap-1"
          >
            <span>{lang === 'ar' ? 'عرض الكل' : 'View All'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. Special Offers Banner */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-suit-red/90 via-navy-900 to-navy-950 border border-gold-500/30 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-start">
            <span className="inline-block px-3 py-1 rounded-full bg-gold-500 text-navy-950 text-xs font-black uppercase tracking-wider">
              {t.offers} ⚡
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-cream-100 leading-tight">
              {lang === 'ar'
                ? 'وفر حتى 30% على باقات الألعاب العائلية!'
                : 'Save Up to 30% on Family & Gathering Bundles!'}
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed">
              {lang === 'ar'
                ? 'استفد من خصومات كود WELCOME10 واحصل على شحن مجاني للطلبات فوق 600 ج.م.'
                : 'Use code WELCOME10 for an extra 10% off plus free shipping on orders over 600 EGP.'}
            </p>

            <Link
              href="/shop?offers=true"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
            >
              <span>{t.shopNow}</span>
              {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>

          <div className="w-48 sm:w-64 shrink-0 relative">
            <img
              src="/cards/Speeeeeedy_Info_Card_2-4Players_4K_ExtraBleed_Full (1).png"
              alt="Special Bundle"
              className="w-full rounded-2xl shadow-2xl border-2 border-gold-500/40 rotate-3 transform hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* 6. Why 3alamzagak? Value Propositions */}
      <section className="container mx-auto px-4 py-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-cream-100">{t.whyUsTitle}</h2>
          <p className="text-xs text-gray-400">
            {lang === 'ar' ? 'نحن لا نبيع ألعاباً فقط، بل نصنع أوقاتاً ممتعة' : 'We don’t just sell games; we deliver fun'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-navy-900 border border-gold-500/20 text-center space-y-3 hover:border-gold-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-cream-100">{t.authenticProducts}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{t.authenticDesc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-gold-500/20 text-center space-y-3 hover:border-gold-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-cream-100">{t.fastDelivery}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{t.fastDeliveryDesc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-gold-500/20 text-center space-y-3 hover:border-gold-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-cream-100">{t.securePayments}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{t.securePaymentsDesc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-gold-500/20 text-center space-y-3 hover:border-gold-500 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-cream-100">{t.greatSupport}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{t.greatSupportDesc}</p>
          </div>
        </div>
      </section>

      {/* 7. Customer Reviews Carousel */}
      <section className="bg-navy-900/50 border-y border-gold-500/10 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-cream-100">
              {t.customerReviewsTitle}
            </h2>
            <p className="text-xs text-gray-400">
              {lang === 'ar' ? 'تجارب حقيقية وتقييمات موثقة من لاعبين محترفين' : 'Verified reviews from passionate players'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-navy-950 border border-gold-500/20 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-gold-400" />
                    ))}
                  </div>
                  <h3 className="text-sm font-bold text-cream-100">{rev.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">"{rev.comment}"</p>
                </div>

                <div className="pt-4 border-t border-gold-500/10 flex items-center justify-between text-xs text-gray-400">
                  <span className="font-bold text-cream-100">{rev.customerName}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    ✓ {lang === 'ar' ? 'مشتري موثق' : 'Verified Purchase'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
