'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { FileText, ShieldCheck } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const { lang, t } = useApp();

  const auditLogs = [
    {
      id: 'log-1',
      user: 'Super Admin',
      action: 'UPDATE_STOCK',
      details: 'تعديل كمية مخزون لعبة سبيدي (Speeeeeedy) إلى 45 قطعة',
      timestamp: '2026-09-08 14:20:10',
      ip: '197.35.12.44',
    },
    {
      id: 'log-2',
      user: 'Super Admin',
      action: 'CREATE_COUPON',
      details: 'إنشاء كود خصم WELCOME10 بنسبة 10%',
      timestamp: '2026-09-08 11:05:00',
      ip: '197.35.12.44',
    },
    {
      id: 'log-3',
      user: 'Order Manager',
      action: 'CHANGE_ORDER_STATUS',
      details: 'تغيير حالة الطلب #3Z-98421 إلى Delivered',
      timestamp: '2026-09-02 14:45:00',
      ip: '156.204.18.9',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gold-500/20 pb-4">
        <h1 className="text-2xl font-black font-heading text-cream-100">
          {t.auditLogs}
        </h1>
        <p className="text-xs text-gray-400">
          {lang === 'ar' ? 'سجل تتبع أمني شامل لجميع عمليات وإجراءات المشرفين' : 'Security activity audit log'}
        </p>
      </div>

      <div className="bg-navy-900 border border-gold-500/20 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-navy-950 text-gold-400 border-b border-gold-500/20">
              <tr>
                <th className="p-3 text-start">التاريخ والوقت</th>
                <th className="p-3 text-start">المستخدم</th>
                <th className="p-3 text-start">الحدث (Action)</th>
                <th className="p-3 text-start">التفاصيل</th>
                <th className="p-3 text-start">عنوان IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-gray-300">
              {auditLogs.map((l) => (
                <tr key={l.id} className="hover:bg-navy-850">
                  <td className="p-3 font-mono text-gray-400">{l.timestamp}</td>
                  <td className="p-3 font-bold text-cream-100">{l.user}</td>
                  <td className="p-3 font-mono text-gold-400">{l.action}</td>
                  <td className="p-3">{l.details}</td>
                  <td className="p-3 font-mono text-gray-500">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
