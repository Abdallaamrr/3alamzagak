'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  const { lang, t } = useApp();
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black font-heading text-cream-100 flex items-center justify-center gap-2">
          <ShieldCheck className="w-7 h-7 text-gold-400" />
          <span>{t.privacy}</span>
        </h1>
      </div>

      <div className="p-8 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4 text-xs text-cream-200 leading-relaxed">
        <p>
          يلتزم متجر عالم زاجك (3alamzagak) بحماية بياناتك الشخصية ومعلومات الشحن والدفع الخاصة بك بأعلى معايير الأمان والتشفير.
        </p>
      </div>
    </div>
  );
}
