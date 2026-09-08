'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { Logo } from '../common/Logo';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Globe,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  LogOut,
  Home,
  Grid,
  PhoneCall,
  PackageCheck,
  HelpCircle,
  Tag,
  Flame,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    lang,
    setLang,
    t,
    cart,
    wishlist,
    setIsCartOpen,
    currentUser,
    loginAsDemoCustomer,
    loginAsAdmin,
    logout,
    products,
    categories,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Disable body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Search Filter Suggestions
  const searchSuggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-navy-950/95 backdrop-blur-md border-b border-gold-500/20 shadow-2xl">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-navy-900 via-gold-800/40 to-navy-900 text-gold-400 py-1.5 px-3 sm:px-4 text-xs font-medium text-center border-b border-gold-500/10">
          <div className="container mx-auto flex items-center justify-between text-center">
            <p className="w-full text-center sm:text-start truncate text-[11px] sm:text-xs">
              {t.freeShippingBanner}
            </p>
            <div className="hidden sm:flex items-center gap-4 shrink-0 text-[11px] text-cream-200">
              <Link
                href="/order-tracking"
                className="hover:text-gold-400 transition-colors flex items-center gap-1"
              >
                <PackageCheck className="w-3 h-3 text-gold-400" />
                <span>{t.trackOrder}</span>
              </Link>
              <span>•</span>
              <Link href="/faq" className="hover:text-gold-400 transition-colors flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-gold-400" />
                <span>{t.faq}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gold-400 p-2 hover:bg-navy-850 rounded-xl transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Brand Logo */}
          <div className="shrink-0 max-w-[170px] sm:max-w-none">
            <Logo size="md" className="scale-90 sm:scale-100 origin-left rtl:origin-right" />
          </div>

          {/* Desktop Live Search Bar */}
          <div className="relative flex-1 max-w-lg hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-navy-850 border border-gold-500/30 text-cream-100 placeholder-gold-400/50 rounded-full py-2 px-10 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
              />
              <Search className="absolute ltr:left-3.5 rtl:right-3.5 top-2.5 w-4 h-4 text-gold-400/70" />
            </form>

            {/* Autocomplete Suggestions Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-navy-900 border border-gold-500/30 rounded-xl shadow-card-dark py-2 z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-xs text-gold-400 font-semibold border-b border-gold-500/10">
                  {lang === 'ar' ? 'اقتراحات البحث السريع' : 'Quick Search Results'}
                </div>
                {searchSuggestions.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.id}`}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-navy-800 transition-colors"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.nameEn}
                      className="w-10 h-10 object-cover rounded-lg border border-gold-500/20"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cream-100 font-medium truncate">
                        {lang === 'ar' ? prod.nameAr : prod.nameEn}
                      </p>
                      <p className="text-xs text-gold-400 font-semibold">
                        {prod.salePrice || prod.price} {t.egp}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden text-gold-400 p-2 hover:bg-navy-850 rounded-xl transition-colors"
              aria-label="Search Games"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1 text-xs text-gold-400 font-bold px-2 py-1.5 rounded-lg border border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span className="uppercase">{t.language}</span>
            </button>

            {/* Wishlist Button */}
            <Link
              href="/account/wishlist"
              className="relative p-2 text-gold-400 hover:bg-navy-850 rounded-xl transition-colors hidden sm:block"
              title={t.wishlist}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-suit-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gold-400 hover:bg-navy-850 rounded-xl transition-colors flex items-center gap-2 border border-gold-500/20"
              title={t.cart}
            >
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <span className="text-xs font-bold text-cream-100 hidden sm:inline">
                {totalCartCount} {t.cart}
              </span>
              {totalCartCount > 0 && (
                <span className="bg-gold-500 text-navy-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-gold-500/10 border border-gold-500/30 hover:border-gold-500 text-cream-100 text-xs font-medium transition-all"
              >
                <User className="w-4 h-4 text-gold-400" />
                <span className="hidden md:inline max-w-[100px] truncate">
                  {currentUser ? currentUser.name : t.account}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gold-400" />
              </button>

              {/* Account Dropdown */}
              {isUserMenuOpen && (
                <div
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                  className="absolute ltr:right-0 rtl:left-0 top-full mt-2 w-60 bg-navy-900 border border-gold-500/30 rounded-2xl shadow-card-dark py-2 z-50 text-xs"
                >
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-gold-500/10">
                        <p className="font-bold text-cream-100">{currentUser.name}</p>
                        <p className="text-[11px] text-gold-400/80 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gold-500/20 text-gold-400">
                          {currentUser.role}
                        </span>
                      </div>

                      <Link
                        href="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2.5 hover:bg-navy-800 text-cream-100 font-medium"
                      >
                        {t.myAccount}
                      </Link>
                      <Link
                        href="/account/wishlist"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2.5 hover:bg-navy-800 text-cream-100 font-medium"
                      >
                        {t.wishlist} ({wishlist.length})
                      </Link>

                      {/* Admin Link if Admin */}
                      {(currentUser.role.includes('Admin') || currentUser.role.includes('Manager')) && (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gold-500/10 text-gold-400 font-bold hover:bg-gold-500/20 border-y border-gold-500/20 my-1"
                        >
                          <ShieldAlert className="w-4 h-4 text-gold-400" />
                          <span>{t.adminDashboard}</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-start flex items-center gap-2 px-4 py-2.5 hover:bg-suit-red/20 text-suit-red font-medium transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.logout}</span>
                      </button>
                    </>
                  ) : (
                    <div className="p-2 space-y-1.5">
                      <button
                        onClick={() => {
                          loginAsDemoCustomer();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-center py-2 px-3 rounded-xl bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-colors text-xs"
                      >
                        {lang === 'ar' ? 'دخول كعميل تجريبي' : 'Login Demo Customer'}
                      </button>
                      <button
                        onClick={() => {
                          loginAsAdmin();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-center py-2 px-3 rounded-xl bg-navy-800 text-gold-400 font-bold border border-gold-500/30 hover:border-gold-500 transition-colors text-xs"
                      >
                        {lang === 'ar' ? 'دخول لوحة التحكم (Admin)' : 'Login Admin Dashboard'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Row (Expandable) */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-3 py-2 bg-navy-900 border-t border-gold-500/10 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder={t.searchPlaceholder}
                className="w-full bg-navy-850 border border-gold-500/40 text-cream-100 placeholder-gold-400/50 rounded-xl py-2 px-9 text-xs focus:outline-none focus:border-gold-500"
              />
              <Search className="absolute ltr:left-3 rtl:right-3 top-2.5 w-4 h-4 text-gold-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute ltr:right-3 rtl:left-3 top-2.5 text-cream-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}

        {/* Desktop Main Navigation Links Bar */}
        <nav className="hidden lg:block bg-navy-900/90 border-t border-gold-500/10">
          <div className="container mx-auto px-4 flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-6 py-2.5">
              <Link
                href="/"
                className={`hover:text-gold-400 transition-colors ${
                  pathname === '/'
                    ? 'text-gold-400 font-bold border-b-2 border-gold-400 pb-1'
                    : 'text-cream-200'
                }`}
              >
                {t.home}
              </Link>

              <Link
                href="/shop"
                className={`hover:text-gold-400 transition-colors ${
                  pathname === '/shop'
                    ? 'text-gold-400 font-bold border-b-2 border-gold-400 pb-1'
                    : 'text-cream-200'
                }`}
              >
                {t.shop}
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-cream-200 hover:text-gold-400 py-1 transition-colors">
                  <span>{t.categories}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block w-64 bg-navy-900 border border-gold-500/30 rounded-xl shadow-card-dark p-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      className="block px-3 py-2 rounded-lg hover:bg-navy-800 text-cream-100 hover:text-gold-400 transition-colors text-xs"
                    >
                      {lang === 'ar' ? cat.nameAr : cat.nameEn}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/shop?offers=true"
                className="text-suit-red font-bold hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.offers}</span>
              </Link>

              <Link
                href="/shop?new=true"
                className="text-cream-200 hover:text-gold-400 transition-colors"
              >
                {t.newArrivals}
              </Link>

              <Link
                href="/shop?bestseller=true"
                className="text-cream-200 hover:text-gold-400 transition-colors"
              >
                {t.bestSellers}
              </Link>

              <Link
                href="/about"
                className="text-cream-200 hover:text-gold-400 transition-colors"
              >
                {t.about}
              </Link>

              <Link
                href="/contact"
                className="text-cream-200 hover:text-gold-400 transition-colors"
              >
                {t.contact}
              </Link>
            </div>

            <div className="text-gold-400/70 text-[11px] font-sans">
              ♠ ♥ ♣ ♦ {lang === 'ar' ? 'عالم على مزاجك - ألعاب ورق وطاولة فاخرة' : 'Premium Games Store'}
            </div>
          </div>
        </nav>
      </header>

      {/* Off-Canvas Mobile Navigation Overlay Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Container */}
          <div className="relative w-4/5 max-w-sm bg-navy-950 border-r rtl:border-r-0 rtl:border-l border-gold-500/20 h-full flex flex-col z-10 shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gold-500/20 flex items-center justify-between bg-navy-900">
              <Logo size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gold-400 p-2 hover:bg-navy-800 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Drawer Search Bar */}
            <div className="p-4 border-b border-gold-500/10">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-navy-850 border border-gold-500/30 text-cream-100 placeholder-gold-400/50 rounded-xl py-2.5 px-9 text-xs focus:outline-none focus:border-gold-500"
                />
                <Search className="absolute ltr:left-3 rtl:right-3 top-3 w-4 h-4 text-gold-400" />
              </form>
            </div>

            {/* Mobile Drawer Navigation Links */}
            <div className="p-4 space-y-2 flex-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-850 text-cream-100 font-medium text-sm border-b border-gold-500/10"
              >
                <Home className="w-4 h-4 text-gold-400" />
                <span>{t.home}</span>
              </Link>

              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-850 text-cream-100 font-medium text-sm border-b border-gold-500/10"
              >
                <Grid className="w-4 h-4 text-gold-400" />
                <span>{t.shop}</span>
              </Link>

              {/* Accordion Categories */}
              <div className="border-b border-gold-500/10">
                <button
                  onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-cream-100 font-medium text-sm hover:bg-navy-850 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-gold-400" />
                    <span>{t.categories}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gold-400 transition-transform ${
                      isMobileCategoriesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isMobileCategoriesOpen && (
                  <div className="ltr:pl-8 rtl:pr-8 py-1 space-y-1 bg-navy-900/60 rounded-xl my-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 text-xs text-cream-200 hover:text-gold-400"
                      >
                        {lang === 'ar' ? cat.nameAr : cat.nameEn}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/shop?offers=true"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-850 text-suit-red font-bold text-sm border-b border-gold-500/10"
              >
                <Sparkles className="w-4 h-4 text-suit-red" />
                <span>{t.offers}</span>
              </Link>

              <Link
                href="/shop?bestseller=true"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-850 text-cream-100 font-medium text-sm border-b border-gold-500/10"
              >
                <Flame className="w-4 h-4 text-gold-400" />
                <span>{t.bestSellers}</span>
              </Link>

              <Link
                href="/order-tracking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-850 text-cream-100 font-medium text-sm border-b border-gold-500/10"
              >
                <PackageCheck className="w-4 h-4 text-gold-400" />
                <span>{t.trackOrder}</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-850 text-cream-100 font-medium text-sm border-b border-gold-500/10"
              >
                <HelpCircle className="w-4 h-4 text-gold-400" />
                <span>{t.about}</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-navy-850 text-cream-100 font-medium text-sm"
              >
                <PhoneCall className="w-4 h-4 text-gold-400" />
                <span>{t.contact}</span>
              </Link>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-4 border-t border-gold-500/20 bg-navy-900 space-y-3">
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-gold-500/30 text-gold-400 font-bold text-xs"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'ar' ? 'English Language' : 'اللغة العربية'}</span>
              </button>

              {currentUser ? (
                <div className="text-xs text-cream-200 space-y-2">
                  <p className="text-gold-400 font-bold">{currentUser.name}</p>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-suit-red font-medium flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t.logout}</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      loginAsDemoCustomer();
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-2 px-3 rounded-xl bg-gold-500 text-navy-950 font-bold text-center"
                  >
                    {lang === 'ar' ? 'عميل' : 'Customer'}
                  </button>
                  <button
                    onClick={() => {
                      loginAsAdmin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-2 px-3 rounded-xl bg-navy-850 border border-gold-500/30 text-gold-400 font-bold text-center"
                  >
                    {lang === 'ar' ? 'أدمين' : 'Admin'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom App Bar (Native App Feel) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-lg border-t border-gold-500/20 py-2 px-4 shadow-2xl flex justify-around items-center text-[10px] font-semibold text-gold-400/70">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 ${
            pathname === '/' ? 'text-gold-400 font-bold' : 'text-cream-300'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{t.home}</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center gap-1 ${
            pathname === '/shop' ? 'text-gold-400 font-bold' : 'text-cream-300'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>{t.shop}</span>
        </Link>

        <button
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="flex flex-col items-center gap-1 text-cream-300 hover:text-gold-400"
        >
          <Search className="w-5 h-5" />
          <span>{t.searchPlaceholder.split(' ')[0]}</span>
        </button>

        <Link
          href="/account/wishlist"
          className={`relative flex flex-col items-center gap-1 ${
            pathname === '/account/wishlist' ? 'text-gold-400 font-bold' : 'text-cream-300'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>{t.wishlist}</span>
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-suit-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-cream-300 hover:text-gold-400"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{t.cart}</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold-500 text-navy-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </nav>
    </>
  );
};
