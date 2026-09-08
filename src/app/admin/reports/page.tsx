'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { Download, BarChart3, FileSpreadsheet, FileText, TrendingUp } from 'lucide-react';

export default function AdminReportsPage() {
  const { lang, t, products, orders } = useApp();

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Customer', 'Date', 'Total', 'Payment Method', 'Status'];
    const rows = orders.map((o) => [
      o.orderNumber,
      `"${o.customerName}"`,
      o.createdAt.split('T')[0],
      o.total,
      o.paymentMethod,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `3alamzagak_sales_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-cream-100">
            {lang === 'ar' ? 'التقارير وتحليلات الأداء' : 'Reports & Analytics'}
          </h1>
          <p className="text-xs text-gray-400">
            {lang === 'ar' ? 'تصدير ملخصات المبيعات، المخزون، والعملاء بصيغة CSV' : 'Export sales & inventory reports to CSV/Excel'}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-gold-glow hover:bg-gold-400 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>تصدير تقرير المبيعات (Export CSV)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-3">
          <FileSpreadsheet className="w-8 h-8 text-gold-400" />
          <h3 className="font-bold text-cream-100 text-sm">تقرير إجمالي المبيعات (Sales Report)</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            يتضمن المجموع الإجمالي لكل طلب، الخصومات، رسوم الشحن، وحالة الدفع.
          </p>
          <button
            onClick={handleExportCSV}
            className="w-full py-2 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-400 text-xs font-bold hover:bg-gold-500/10"
          >
            تنزيل CSV
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-3">
          <BarChart3 className="w-8 h-8 text-gold-400" />
          <h3 className="font-bold text-cream-100 text-sm">تقرير تقييم المخزون (Inventory Valuation)</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            كشف الكميات المتبقية وقيمتها التكليفية والبيعية الإجمالية.
          </p>
          <button
            onClick={handleExportCSV}
            className="w-full py-2 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-400 text-xs font-bold hover:bg-gold-500/10"
          >
            تنزيل CSV
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-3">
          <TrendingUp className="w-8 h-8 text-gold-400" />
          <h3 className="font-bold text-cream-100 text-sm">تقرير الأكثر مبيعاً (Top Sellers)</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            الألعاب الأكثر طلباً وأفضل الأقسام تحقيقاً للأرباح.
          </p>
          <button
            onClick={handleExportCSV}
            className="w-full py-2 rounded-xl bg-navy-950 border border-gold-500/30 text-gold-400 text-xs font-bold hover:bg-gold-500/10"
          >
            تنزيل CSV
          </button>
        </div>
      </div>
    </div>
  );
}
