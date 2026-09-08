import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context/app-context';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/common/Toast';

export const metadata: Metadata = {
  title: 'عالم زاجك | 3alamzagak - Card & Board Games Store',
  description: 'المتجر الإلكتروني الأول لأفخم ألعاب الكروت والطاولة والتجمعات العائلية في مصر والوطن العربي.',
  keywords: ['عالم زاجك', '3alamzagak', 'ألعاب كروت', 'ألعاب طاولة', 'شطرنج', 'سبيدي', 'Speeeeeedy', 'Board Games Egypt'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="min-h-screen flex flex-col bg-navy-950 text-cream-100 selection:bg-gold-500 selection:text-navy-950">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
