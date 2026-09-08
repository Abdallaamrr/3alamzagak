'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Tag, Plus, Check, X, Trash2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const { lang, t, coupons, addCoupon, toggleCouponActive } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed' | 'free_shipping'>('percentage');
  const [value, setValue] = useState(15);
  const [minOrderValue, setMinOrderValue] = useState(300);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (code) {
      addCoupon({
        code: code.trim().toUpperCase(),
        type,
        value,
        minOrderValue,
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        usageLimit: 500,
        timesUsed: 0,
        perCustomerLimit: 1,
        isActive: true,
      });
      setIsModalOpen(false);
      setCode('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-cream-100">
            {lang === 'ar' ? 'إدارة الكوبونات والخصومات' : 'Coupons & Discounts'}
          </h1>
          <p className="text-xs text-gray-400">
            {lang === 'ar' ? 'إنشاء وتفعيل أكواد الخصم الترويجية والشحن المجاني' : 'Create & manage promotional discount codes'}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow hover:bg-gold-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إنشاء كود خصم جديد' : 'New Coupon'}</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-4 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-lg font-black font-mono text-gold-400 block">{c.code}</span>
                <span className="text-xs text-gray-400 capitalize">{c.type.replace('_', ' ')}</span>
              </div>
              <button
                onClick={() => toggleCouponActive(c.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                  c.isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-suit-red/20 text-suit-red border border-suit-red/30'
                }`}
              >
                {c.isActive ? 'مفعل (Active)' : 'معطل (Inactive)'}
              </button>
            </div>

            <div className="space-y-1 text-xs text-gray-300">
              <p>
                قيمة الخصم:{' '}
                <span className="font-bold text-cream-100">
                  {c.type === 'percentage' ? `${c.value}%` : `${c.value} ج.م`}
                </span>
              </p>
              <p>الحد الأدنى للطلب: <span className="font-bold text-cream-100">{c.minOrderValue} ج.م</span></p>
              <p>مرات الاستخدام: <span className="font-bold text-gold-400">{c.timesUsed} مرة</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-gold-500/30 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-cream-100 border-b border-gold-500/20 pb-3">
              إنشاء كود خصم جديد
            </h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">كود الخصم (Code)</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="مثال: SUMMER20"
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">نوع الخصم</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                >
                  <option value="percentage">نسبة مئوية (Percentage %)</option>
                  <option value="fixed">مبلغ ثابت (Fixed Amount EGP)</option>
                  <option value="free_shipping">شحن مجاني (Free Shipping)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">قيمة الخصم</label>
                <input
                  type="number"
                  required
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">الحد الأدنى لقيمة الطلب (EGP)</label>
                <input
                  type="number"
                  required
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(Number(e.target.value))}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-gray-300"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold shadow-gold-glow"
                >
                  {t.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
