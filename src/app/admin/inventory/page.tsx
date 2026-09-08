'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { InventoryTransaction } from '@/lib/types';
import { Boxes, AlertTriangle, Plus, RotateCcw, FileText, CheckCircle2 } from 'lucide-react';

export default function AdminInventoryPage() {
  const { lang, t, products, inventoryLogs, adjustProductStock } = useApp();

  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [adjustmentQty, setAdjustmentQty] = useState<number>(10);
  const [reason, setReason] = useState<InventoryTransaction['reason']>('Restock');
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  const lowStockItems = products.filter((p) => p.stock <= p.lowStockThreshold);

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedProductId);
    if (prod) {
      adjustProductStock(selectedProductId, Math.max(0, prod.stock + adjustmentQty), reason);
      setIsAdjustModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-cream-100">
            {t.inventory}
          </h1>
          <p className="text-xs text-gray-400">
            {lang === 'ar' ? 'متابعة حركة المخزن وتعديل الكميات مع سجل مراجعة أمني' : 'Stock level monitoring & audit trail'}
          </p>
        </div>

        <button
          onClick={() => setIsAdjustModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow hover:bg-gold-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تعديل كمية مخزون' : 'Adjust Stock'}</span>
        </button>
      </div>

      {/* Low stock alert cards */}
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-2xl bg-suit-red/10 border border-suit-red/30 space-y-3">
          <div className="flex items-center gap-2 text-suit-red font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>{t.lowStockAlerts} ({lowStockItems.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lowStockItems.map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-navy-900 border border-suit-red/30 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-cream-100 truncate max-w-[140px]">{p.nameAr}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{p.sku}</p>
                </div>
                <span className="font-black text-suit-red bg-suit-red/20 px-2 py-0.5 rounded">
                  {p.stock} متبقي
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Logs History Table */}
      <div className="bg-navy-900 border border-gold-500/20 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-cream-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gold-400" />
          <span>{lang === 'ar' ? 'سجل حركات المخزون التاريخية' : 'Stock Audit Trail History'}</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-navy-950 text-gold-400 border-b border-gold-500/20">
              <tr>
                <th className="p-3 text-start">التاريخ (Date)</th>
                <th className="p-3 text-start">المنتج (Product)</th>
                <th className="p-3 text-start">الكمية السابقة (Prev)</th>
                <th className="p-3 text-start">التغيير (Change)</th>
                <th className="p-3 text-start">الكمية الجديدة (New)</th>
                <th className="p-3 text-start">السبب (Reason)</th>
                <th className="p-3 text-start">المسؤول (User)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-gray-300">
              {inventoryLogs.map((log) => (
                <tr key={log.id} className="hover:bg-navy-850">
                  <td className="p-3 text-gray-400">{log.date}</td>
                  <td className="p-3 font-bold text-cream-100">{log.productName}</td>
                  <td className="p-3">{log.previousStock}</td>
                  <td className={`p-3 font-bold ${log.change >= 0 ? 'text-emerald-400' : 'text-suit-red'}`}>
                    {log.change >= 0 ? `+${log.change}` : log.change}
                  </td>
                  <td className="p-3 font-bold text-gold-400">{log.newStock}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-navy-950 border border-gold-500/20 text-[10px]">
                      {log.reason}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400">{log.adminUser}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Modal */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-gold-500/30 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-cream-100 border-b border-gold-500/20 pb-3">
              {lang === 'ar' ? 'تعديل كمية المخزون' : 'Adjust Product Stock'}
            </h3>

            <form onSubmit={handleStockSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">اختر اللعبة</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nameAr} (المخزون الحالي: {p.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">مقدار التغيير (مثال: +10 لإضافة، -5 لخصم)</label>
                <input
                  type="number"
                  required
                  value={adjustmentQty}
                  onChange={(e) => setAdjustmentQty(Number(e.target.value))}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">سبب التعديل</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as any)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                >
                  <option value="Restock">شحنة جديدة (Restock)</option>
                  <option value="Manual Adjustment">تعديل جرد يدوي (Manual Adjustment)</option>
                  <option value="Damaged/Lost">تالف أو مفقود (Damaged/Lost)</option>
                  <option value="Return">مرتجع عميل (Return)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-gray-300"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold shadow-gold-glow"
                >
                  {t.confirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
