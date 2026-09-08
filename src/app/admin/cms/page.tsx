'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Image as ImageIcon, Plus, Edit2, Save } from 'lucide-react';

export default function AdminCMSPage() {
  const { lang, t, banners, updateHomepageBanners, addToast } = useApp();

  const [heroTitleAr, setHeroTitleAr] = useState(banners[0]?.titleAr || 'العب. تنافس. استمتع.');
  const [heroTitleEn, setHeroTitleEn] = useState(banners[0]?.titleEn || 'Play. Compete. Have Fun.');
  const [heroSubtitleAr, setHeroSubtitleAr] = useState(
    banners[0]?.subtitleAr || 'وجهتك الأولى لأفخم ألعاب الكروت والترابيزة والألعاب الجماعية في مصر.'
  );

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [
      {
        ...banners[0],
        titleAr: heroTitleAr,
        titleEn: heroTitleEn,
        subtitleAr: heroSubtitleAr,
      },
    ];
    updateHomepageBanners(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gold-500/20 pb-4">
        <h1 className="text-2xl font-black font-heading text-cream-100">
          {lang === 'ar' ? 'إدارة بنرات ومحتوى الصفحة الرئيسية (CMS)' : 'Homepage CMS Management'}
        </h1>
        <p className="text-xs text-gray-400">
          {lang === 'ar' ? 'تعديل النصوص، العناوين، وبنرات الهيرو بدون حاجة لكود' : 'Customize homepage hero banners, text, and promo sections'}
        </p>
      </div>

      <form onSubmit={handleSaveCMS} className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-gold-400 border-b border-gold-500/20 pb-2">
          {lang === 'ar' ? 'تعديل قسم الهيرو الرئيسي (Hero Banner)' : 'Edit Hero Banner'}
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-gray-300 font-bold mb-1">العنوان الرئيسي بالعربية (Hero Title AR)</label>
            <input
              type="text"
              value={heroTitleAr}
              onChange={(e) => setHeroTitleAr(e.target.value)}
              className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">English Hero Title</label>
            <input
              type="text"
              value={heroTitleEn}
              onChange={(e) => setHeroTitleEn(e.target.value)}
              className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">الوصف الفرعي (Subtitle AR)</label>
            <textarea
              rows={2}
              value={heroSubtitleAr}
              onChange={(e) => setHeroSubtitleAr(e.target.value)}
              className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow flex items-center gap-1.5 hover:bg-gold-400"
          >
            <Save className="w-4 h-4" />
            <span>{t.saveChanges}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
