'use client';

import React from 'react';
import { Logo } from '@/components/common/Logo';
import { useApp } from '@/lib/context/app-context';
import { Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const { lang, t } = useApp();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      <div className="text-center space-y-4">
        <Logo size="xl" />
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-cream-100">
          {lang === 'ar' ? 'قصة عالم زاجك' : 'The Story of 3alamzagak'}
        </h1>
        <p className="text-sm text-gold-400 font-bold max-w-lg mx-auto">
          {lang === 'ar'
            ? 'نبتكر ألعاب الكروت والترابيزة الفاخرة لتجميع العائلة والأصدقاء في أمتع الأوقات.'
            : 'Designing luxury card & board games that bring friends and family together.'}
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-6 text-sm text-cream-200 leading-relaxed">
        <h2 className="text-xl font-bold text-gold-400 border-b border-gold-500/20 pb-3">
          {lang === 'ar' ? 'رؤيتنا وشغفنا' : 'Our Vision & Passion'}
        </h2>
        <p>
          {lang === 'ar'
            ? 'تأسس عالم زاجك (3alamzagak) من شغف حقيقي بإعادة روح التنافس والضحك والجمعات إلى كل بيت مصري وعربي. نؤمن بأن الألعاب ليست مجرد كروت أو قطع رقعة، بل هي وسيلة لصنع ذكريات لا تُنسى وسهرات مليئة بالتحدي والذكاء.'
            : '3alamzagak was founded out of a true passion for reviving the spirit of healthy competition, laughter, and gatherings in every home. We believe games are not merely cards or board pieces, but a vehicle for crafting unforgettable memories.'}
        </p>

        <h2 className="text-xl font-bold text-gold-400 border-b border-gold-500/20 pb-3">
          {lang === 'ar' ? 'جودة ملَكية بدون مساومة' : 'Royal Quality Standards'}
        </h2>
        <p>
          {lang === 'ar'
            ? 'من اختيار أنواع الخشب الطبيعي كالجان والجوز لشطرنج وطاولة الزهر، إلى طباعة كروت لعبة سبيدي وحُضبت وكومة الـ 10 بخامات مقاومة للماء والخدش، نحرص في عالم زاجك على تقديم أعلى مستويات الفخامة والمتانة.'
            : 'From selecting premium natural beech and walnut wood for our chess and backgammon sets, to printing Speeeeeedy, Hodabt, and Koma El 10 cards on waterproof cardstock, we enforce uncompromising standards.'}
        </p>
      </div>
    </div>
  );
}
