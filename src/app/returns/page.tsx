'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { RefreshCw } from 'lucide-react';

export default function ReturnsPage() {
  const { lang, t } = useApp();
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black font-heading text-cream-100 flex items-center justify-center gap-2">
          <RefreshCw className="w-7 h-7 text-gold-400" />
          <span>{t.returnsPolicy}</span>
        </h1>
        <p className="text-xs text-gray-400">سياسة الاستبدال والاسترجاع خلال 14 يوماً من الاستلام</p>
      </div>

      <div className="p-8 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-6 text-xs text-cream-200 leading-relaxed">
        <h2 className="text-base font-bold text-gold-400 border-b border-gold-500/20 pb-2">
          شروط الاسترجاع والاستبدال
        </h2>
        <p>
          يحق للعميل استبدال أو استرجاع أي لعبة خلال 14 يوماً من تاريخ استلام الشحنة، بشرط أن تكون اللعبة بحالتها الأصلية غير مفتوحة الغلاف البلاستيكي وبكامل مكوناتها وعلبتها الأصلية.
        </p>
      </div>
    </div>
  );
}
