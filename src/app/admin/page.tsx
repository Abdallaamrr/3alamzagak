'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  BarChart,
  Calendar,
  Eye,
  CheckCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboardOverview() {
  const { lang, t, products, orders, inventoryLogs } = useApp();
  const [dateFilter, setDateFilter] = useState('7days');

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const todayRevenue = orders
    .filter((o) => o.createdAt.startsWith('2026-09-08'))
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  // Chart Sample Data
  const revenueChartData = [
    { name: '01 Sep', revenue: 1420, orders: 4 },
    { name: '02 Sep', revenue: 2150, orders: 7 },
    { name: '03 Sep', revenue: 1890, orders: 5 },
    { name: '04 Sep', revenue: 3100, orders: 9 },
    { name: '05 Sep', revenue: 2750, orders: 8 },
    { name: '06 Sep', revenue: 4200, orders: 12 },
    { name: '07 Sep', revenue: 3850, orders: 10 },
    { name: '08 Sep', revenue: 2900, orders: 7 },
  ];

  const categoryDistribution = [
    { name: 'ألعاب الكروت (Card Games)', value: 45, color: '#d4af37' },
    { name: 'ألعاب الطاولة (Board Games)', value: 25, color: '#b89220' },
    { name: 'ألعاب الحفلات (Party Games)', value: 15, color: '#dc2626' },
    { name: 'الشطرنج والدمنة (Chess)', value: 15, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header & Date Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-cream-100">{t.overview}</h1>
          <p className="text-xs text-gray-400">
            {lang === 'ar' ? 'متابعة أداء المبيعات والمخزون في الوقت الفعلي' : 'Real-time sales & inventory metrics'}
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-navy-900 border border-gold-500/30 p-1 rounded-xl text-xs font-bold">
          {['today', '7days', 'month', 'year'].map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                dateFilter === filter
                  ? 'bg-gold-500 text-navy-950 shadow-gold-glow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter === 'today'
                ? 'اليوم'
                : filter === '7days'
                ? 'آخر 7 أيام'
                : filter === 'month'
                ? 'هذا الشهر'
                : 'هذا العام'}
            </button>
          ))}
        </div>
      </div>

      {/* 8 Top KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{t.totalRevenue}</span>
            <DollarSign className="w-4 h-4 text-gold-400" />
          </div>
          <p className="text-2xl font-black text-gold-400">
            {totalRevenue.toFixed(0)} <span className="text-xs">{t.egp}</span>
          </p>
          <span className="text-[10px] text-emerald-400 font-bold">+14.2% مقارنة بالفترة السابقة</span>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{t.todayRevenue}</span>
            <TrendingUp className="w-4 h-4 text-gold-400" />
          </div>
          <p className="text-2xl font-black text-cream-100">
            {todayRevenue.toFixed(0)} <span className="text-xs">{t.egp}</span>
          </p>
          <span className="text-[10px] text-gray-400">اليوم 8 سبتمبر</span>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{t.totalOrders}</span>
            <ShoppingBag className="w-4 h-4 text-gold-400" />
          </div>
          <p className="text-2xl font-black text-cream-100">{orders.length}</p>
          <span className="text-[10px] text-emerald-400 font-bold">نسبة اكتمال 98%</span>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{t.pendingOrders}</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{pendingOrdersCount}</p>
          <span className="text-[10px] text-amber-400/80 font-bold">تتطلب التأكيد والشحن</span>
        </div>

        {/* KPI 5 */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{t.totalCustomers}</span>
            <Users className="w-4 h-4 text-gold-400" />
          </div>
          <p className="text-2xl font-black text-cream-100">1,248</p>
          <span className="text-[10px] text-emerald-400 font-bold">+28 عميل جديد هذا الأسبوع</span>
        </div>

        {/* KPI 6 */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{t.totalProducts}</span>
            <Package className="w-4 h-4 text-gold-400" />
          </div>
          <p className="text-2xl font-black text-cream-100">{products.length}</p>
          <span className="text-[10px] text-gray-400">في 6 أقسام رئيسية</span>
        </div>

        {/* KPI 7 */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{t.lowStockAlerts}</span>
            <AlertTriangle className="w-4 h-4 text-suit-red" />
          </div>
          <p className="text-2xl font-black text-suit-red">{lowStockCount}</p>
          <span className="text-[10px] text-suit-red font-bold">تتطلب إعادة طلب مخزون</span>
        </div>

        {/* KPI 8 */}
        <div className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{t.avgOrderValue}</span>
            <BarChart className="w-4 h-4 text-gold-400" />
          </div>
          <p className="text-2xl font-black text-gold-400">
            {avgOrderValue.toFixed(0)} <span className="text-xs">{t.egp}</span>
          </p>
          <span className="text-[10px] text-gray-400">لكل طلب شراء</span>
        </div>
      </div>

      {/* Interactive Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-cream-100 font-heading">
              {lang === 'ar' ? 'حركة المبيعات والطلبات اليومية' : 'Daily Sales & Orders Trend'}
            </h3>
            <span className="text-xs text-gold-400 font-bold">سبتمبر 2026</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0d14', borderColor: '#d4af37', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#goldGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sales Share Pie Chart */}
        <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-cream-100 font-heading">
            {lang === 'ar' ? 'توزيع المبيعات حسب القسم' : 'Sales Share by Category'}
          </h3>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a0d14', borderColor: '#d4af37', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs text-gray-300">
            {categoryDistribution.map((c) => (
              <div key={c.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="truncate max-w-[160px]">{c.name.split(' (')[0]}</span>
                </div>
                <span className="font-bold text-cream-100">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4">
        <h3 className="text-sm font-bold text-cream-100 font-heading">
          {lang === 'ar' ? 'أحدث الطلبات القادمة' : 'Recent Incoming Orders'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="text-gold-400 bg-navy-950 border-b border-gold-500/20">
              <tr>
                <th className="p-3 text-start">{lang === 'ar' ? 'رقم الطلب' : 'Order #'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'العميل' : 'Customer'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'طريقة الدفع' : 'Payment'}</th>
                <th className="p-3 text-start">{lang === 'ar' ? 'المجموع' : 'Total'}</th>
                <th className="p-3 text-start">{t.orderStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-gray-300">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-navy-850">
                  <td className="p-3 font-mono font-bold text-gold-400">{ord.orderNumber}</td>
                  <td className="p-3 font-medium text-cream-100">{ord.customerName}</td>
                  <td className="p-3 text-gray-400">{ord.createdAt.split('T')[0]}</td>
                  <td className="p-3 uppercase font-semibold">{ord.paymentMethod}</td>
                  <td className="p-3 font-bold text-cream-100">{ord.total} {t.egp}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-bold">
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
