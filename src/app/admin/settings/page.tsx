'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Settings, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const { lang, t, settings, updateStoreSettings } = useApp();

  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [defaultShippingFee, setDefaultShippingFee] = useState(settings.defaultShippingFee);
  const [supportPhone, setSupportPhone] = useState(settings.supportPhone);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      ...settings,
      freeShippingThreshold,
      defaultShippingFee,
      supportPhone,
      supportEmail,
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="border-b border-gold-500/20 pb-4">
        <h1 className="text-2xl font-black font-heading text-cream-100">
          {t.settings}
        </h1>
        <p className="text-xs text-gray-400">
          {lang === 'ar' ? 'تعديل رسوم الشحن الشاملة، عتبة الشحن المجاني، وساعات الدعم' : 'Configure store currency, shipping threshold, and support contacts'}
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4 text-xs">
        <div>
          <label className="block text-gray-300 font-bold mb-1">عتبة الشحن المجاني (EGP Free Shipping Threshold)</label>
          <input
            type="number"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
            className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-bold mb-1">رسوم الشحن القياسية (Default Shipping Fee EGP)</label>
          <input
            type="number"
            value={defaultShippingFee}
            onChange={(e) => setDefaultShippingFee(Number(e.target.value))}
            className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-bold mb-1">رقم الهاتف والواتساب للدعم</label>
          <input
            type="text"
            value={supportPhone}
            onChange={(e) => setSupportPhone(e.target.value)}
            className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 font-mono"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-bold mb-1">البريد الإلكتروني للدعم</label>
          <input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100"
          />
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
