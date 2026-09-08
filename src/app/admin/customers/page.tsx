'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { Users, Mail, Phone, ShoppingBag } from 'lucide-react';

export default function AdminCustomersPage() {
  const { lang, t, orders } = useApp();

  const customersList = [
    {
      id: 'cust-1',
      name: 'عمر خالد',
      email: 'omar.khaled@gmail.com',
      phone: '01012345678',
      ordersCount: 4,
      totalSpent: 2840,
      governorate: 'القاهرة',
    },
    {
      id: 'cust-2',
      name: 'مريم علي',
      email: 'mariam.ali@yahoo.com',
      phone: '01198765432',
      ordersCount: 2,
      totalSpent: 1162,
      governorate: 'الجيزة',
    },
    {
      id: 'cust-3',
      name: 'أحمد محمود',
      email: 'ahmed.m@hotmail.com',
      phone: '01234567890',
      ordersCount: 1,
      totalSpent: 588,
      governorate: 'الإسكندرية',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gold-500/20 pb-4">
        <h1 className="text-2xl font-black font-heading text-cream-100">
          {lang === 'ar' ? 'إدارة وسجلات العملاء' : 'Customers Management'}
        </h1>
        <p className="text-xs text-gray-400">
          {lang === 'ar' ? 'قائمة حسابات العملاء، عدد الطلبات، والقيمة الشرائية التراكمية' : 'View registered customer profiles and lifetime value'}
        </p>
      </div>

      <div className="bg-navy-900 border border-gold-500/20 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-navy-950 text-gold-400 border-b border-gold-500/20">
              <tr>
                <th className="p-3 text-start">العميل (Customer)</th>
                <th className="p-3 text-start">الهاتف (Phone)</th>
                <th className="p-3 text-start">البريد (Email)</th>
                <th className="p-3 text-start">المحافظة (Governorate)</th>
                <th className="p-3 text-start">عدد الطلبات (Orders)</th>
                <th className="p-3 text-start">إجمالي الإنفاق (Lifetime Value)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-gray-300">
              {customersList.map((c) => (
                <tr key={c.id} className="hover:bg-navy-850">
                  <td className="p-3 font-bold text-cream-100">{c.name}</td>
                  <td className="p-3 font-mono">{c.phone}</td>
                  <td className="p-3 text-gray-400">{c.email}</td>
                  <td className="p-3">{c.governorate}</td>
                  <td className="p-3 font-bold text-gold-400">{c.ordersCount} طلبات</td>
                  <td className="p-3 font-bold text-emerald-400">{c.totalSpent} {t.egp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
