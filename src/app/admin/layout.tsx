'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Logo } from '@/components/common/Logo';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  Star,
  Image as ImageIcon,
  BarChart3,
  Settings,
  ShieldCheck,
  Globe,
  Bell,
  ArrowRight,
  ArrowLeft,
  FileText,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t, currentUser } = useApp();
  const pathname = usePathname();

  const navLinks = [
    { href: '/admin', labelAr: 'نظرة عامة (Overview)', labelEn: 'Overview', icon: LayoutDashboard },
    { href: '/admin/products', labelAr: 'إدارة المنتجات (Products)', labelEn: 'Products', icon: Package },
    { href: '/admin/inventory', labelAr: 'إدارة المخزون (Inventory)', labelEn: 'Inventory', icon: Boxes },
    { href: '/admin/orders', labelAr: 'إدارة الطلبات (Orders)', labelEn: 'Orders', icon: ShoppingBag },
    { href: '/admin/customers', labelAr: 'إدارة العملاء (Customers)', labelEn: 'Customers', icon: Users },
    { href: '/admin/coupons', labelAr: 'الكوبونات (Coupons)', labelEn: 'Coupons', icon: Tag },
    { href: '/admin/reviews', labelAr: 'التقييمات (Reviews)', labelEn: 'Reviews', icon: Star },
    { href: '/admin/cms', labelAr: 'محتوى الرئيسية (CMS)', labelEn: 'Homepage CMS', icon: ImageIcon },
    { href: '/admin/reports', labelAr: 'التقارير (Analytics)', labelEn: 'Reports', icon: BarChart3 },
    { href: '/admin/audit-logs', labelAr: 'سجل العمليات (Audit Logs)', labelEn: 'Audit Logs', icon: FileText },
    { href: '/admin/settings', labelAr: 'إعدادات المتجر (Settings)', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-cream-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-navy-900 border-b md:border-b-0 md:border-r rtl:md:border-r-0 rtl:md:border-l border-gold-500/20 p-4 space-y-6 shrink-0">
        <div className="flex items-center justify-between border-b border-gold-500/10 pb-4">
          <Logo size="sm" href="/admin" />
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold-500/20 text-gold-400">
            ADMIN
          </span>
        </div>

        {/* User Role Card */}
        <div className="p-3 rounded-xl bg-navy-950 border border-gold-500/10 text-xs">
          <p className="font-bold text-cream-100">{currentUser?.name || 'Super Admin'}</p>
          <p className="text-[10px] text-gold-400">{currentUser?.role || 'Super Admin'}</p>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gold-500 text-navy-950 shadow-gold-glow'
                    : 'text-cream-200 hover:bg-navy-850 hover:text-gold-400'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{lang === 'ar' ? link.labelAr : link.labelEn}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to Storefront Link */}
        <div className="pt-4 border-t border-gold-500/10">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-950 text-gold-400 hover:text-white border border-gold-500/30 text-xs font-bold transition-colors"
          >
            {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{lang === 'ar' ? 'العودة للمتجر الرئيسي' : 'Back to Storefront'}</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-navy-900 border-b border-gold-500/20 px-6 py-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gold-400 font-heading">
            {lang === 'ar' ? 'لوحة الإدارة والمتابعة' : 'Management Console'}
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="text-xs font-bold text-gold-400 px-2.5 py-1 rounded-lg border border-gold-500/30"
            >
              {t.language}
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
