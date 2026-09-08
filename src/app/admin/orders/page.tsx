'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Order, OrderStatus } from '@/lib/types';
import { Search, Eye, Printer, Edit, CheckCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const { lang, t, orders, updateOrderStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    if (selectedStatusFilter !== 'all' && ord.status !== selectedStatusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.customerPhone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-cream-100">
            {lang === 'ar' ? 'إدارة الطلبات والمبيعات' : 'Orders Management'}
          </h1>
          <p className="text-xs text-gray-400">
            {lang === 'ar' ? `إجمالي ${orders.length} طلب في النظام` : `Total ${orders.length} orders queued`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث برقم الطلب، اسم العميل..."
              className="w-full bg-navy-900 border border-gold-500/30 text-cream-100 rounded-xl py-2 px-8 text-xs focus:outline-none"
            />
            <Search className="absolute ltr:left-2.5 rtl:right-2.5 top-2.5 w-4 h-4 text-gold-400" />
          </div>

          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-navy-900 border border-gold-500/30 text-gold-400 rounded-xl py-2 px-3 text-xs font-bold focus:outline-none"
          >
            <option value="all">جميع الحالات</option>
            <option value="Pending">قيد الانتظار (Pending)</option>
            <option value="Confirmed">مؤكد (Confirmed)</option>
            <option value="Processing">جاري التجهيز (Processing)</option>
            <option value="Packed">تم التغليف (Packed)</option>
            <option value="Shipped">تم الشحن (Shipped)</option>
            <option value="Delivered">تم التسليم (Delivered)</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-navy-900 border border-gold-500/20 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-navy-950 text-gold-400 border-b border-gold-500/20">
              <tr>
                <th className="p-3 text-start">رقم الطلب</th>
                <th className="p-3 text-start">العميل</th>
                <th className="p-3 text-start">المحافظة</th>
                <th className="p-3 text-start">طريقة الدفع</th>
                <th className="p-3 text-start">الإجمالي</th>
                <th className="p-3 text-start">حالة الطلب</th>
                <th className="p-3 text-start">تحديث الحالة</th>
                <th className="p-3 text-start">عرض</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-gray-300">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-navy-850">
                  <td className="p-3 font-mono font-bold text-gold-400">{ord.orderNumber}</td>
                  <td className="p-3">
                    <p className="font-bold text-cream-100">{ord.customerName}</p>
                    <p className="text-[10px] text-gray-400">{ord.customerPhone}</p>
                  </td>
                  <td className="p-3">{ord.shippingAddress.governorate}</td>
                  <td className="p-3 uppercase font-semibold text-gray-300">{ord.paymentMethod}</td>
                  <td className="p-3 font-bold text-gold-400">{ord.total} {t.egp}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-bold">
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="bg-navy-950 border border-gold-500/30 text-cream-100 rounded-lg p-1 text-[11px] focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 rounded-lg bg-navy-950 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-navy-950 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-gold-500/30 rounded-3xl p-6 max-w-lg w-full space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gold-500/20 pb-3">
              <h3 className="text-base font-bold text-cream-100">
                تفاصيل الطلب #{selectedOrder.orderNumber}
              </h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400">
                إغلاق
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950 space-y-1">
                <p className="font-bold text-gold-400">العميل: {selectedOrder.customerName}</p>
                <p className="text-gray-400">الهاتف: {selectedOrder.customerPhone}</p>
                <p className="text-gray-400">البريد: {selectedOrder.customerEmail}</p>
                <p className="text-gray-400">العنوان: {selectedOrder.shippingAddress.streetAddress}</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-cream-100">العناصر:</p>
                {selectedOrder.items.map((it) => (
                  <div key={it.productId} className="flex justify-between p-2 rounded-lg bg-navy-950">
                    <span>{it.productNameAr} ({it.quantity}×)</span>
                    <span className="font-bold text-gold-400">{it.price * it.quantity} ج.م</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gold-500/20 flex justify-between font-bold text-sm text-gold-400">
                <span>الإجمالي الكلي:</span>
                <span>{selectedOrder.total} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
