'use client';

import React, { useState } from 'react';
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
  Sparkles,
  ShieldAlert,
  LogOut,
  SlidersHorizontal,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-navy-950/95 backdrop-blur-md border-b border-gold-500/20 shadow-2xl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-gold-800/40 to-navy-900 text-gold-400 py-1.5 px-4 text-xs font-medium text-center border-b border-gold-500/10 flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between text-center">
          <p className="w-full text-center sm:text-start">
            {t.freeShippingBanner}
          </p>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-[11px] text-cream-200">
            <Link
              href="/order-tracking"
              className="hover:text-gold-400 transition-colors"
            >
              {t.trackOrder}
            </Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-gold-400 transition-colors">
              {t.faq}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gold-400 p-2 hover:bg-navy-850 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Brand Logo */}
        <Logo size="md" />

        {/* Live Search Bar */}
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
                {lang === "ar"
                  ? "اقتراحات البحث السريع"
                  : "Quick Search Results"}
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
                      {lang === "ar" ? prod.nameAr : prod.nameEn}
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
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex items-center gap-1.5 text-xs text-gold-400 font-bold px-2.5 py-1.5 rounded-lg border border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span>{t.language}</span>
          </button>

          {/* Wishlist Button */}
          <Link
            href="/account/wishlist"
            className="relative p-2 text-gold-400 hover:bg-navy-850 rounded-lg transition-colors hidden sm:block"
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
            className="relative p-2 text-gold-400 hover:bg-navy-850 rounded-lg transition-colors flex items-center gap-2 border border-gold-500/20"
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
              className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-gold-500/10 border border-gold-500/30 hover:border-gold-500 text-cream-100 text-xs font-medium transition-all"
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
                className="absolute ltr:right-0 rtl:left-0 top-full mt-2 w-56 bg-navy-900 border border-gold-500/30 rounded-xl shadow-card-dark py-2 z-50 text-xs"
              >
                {currentUser ? (
                  <>
                    <div className="px-4 py-2 border-b border-gold-500/10">
                      <p className="font-bold text-cream-100">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-gold-400/80 truncate">
                        {currentUser.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gold-500/20 text-gold-400">
                        {currentUser.role}
                      </span>
                    </div>

                    <Link
                      href="/account"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-navy-800 text-cream-100 font-medium"
                    >
                      {t.myAccount}
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-navy-800 text-cream-100 font-medium"
                    >
                      {t.myOrders}
                    </Link>

                    {/* Admin Link if Admin */}
                    {(currentUser.role.includes("Admin") ||
                      currentUser.role.includes("Manager")) && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-gold-500/10 text-gold-400 font-bold hover:bg-gold-500/20 border-y border-gold-500/20 my-1"
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
                      className="w-full text-start flex items-center gap-2 px-4 py-2 hover:bg-suit-red/20 text-suit-red font-medium transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.logout}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          loginAsDemoCustomer();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-center py-1.5 px-3 rounded-lg bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-colors"
                      >
                        {lang === "ar"
                          ? "دخول كعميل تجريبي"
                          : "Login Demo Customer"}
                      </button>
                      <button
                        onClick={() => {
                          loginAsAdmin();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-center py-1.5 px-3 rounded-lg bg-navy-800 text-gold-400 font-bold border border-gold-500/30 hover:border-gold-500 transition-colors"
                      >
                        {lang === "ar"
                          ? "دخول لوحة التحكم (Admin)"
                          : "Login Admin Dashboard"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Links Bar */}
      <nav className="hidden lg:block bg-navy-900/90 border-t border-gold-500/10">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-6 py-2.5">
            <Link
              href="/"
              className={`hover:text-gold-400 transition-colors ${
                pathname === "/"
                  ? "text-gold-400 font-bold border-b-2 border-gold-400 pb-1"
                  : "text-cream-200"
              }`}
            >
              {t.home}
            </Link>

            <Link
              href="/shop"
              className={`hover:text-gold-400 transition-colors ${
                pathname === "/shop"
                  ? "text-gold-400 font-bold border-b-2 border-gold-400 pb-1"
                  : "text-cream-200"
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
                    {lang === "ar" ? cat.nameAr : cat.nameEn}
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
            ♠ ♥ ♣ ♦{" "}
            {lang === "ar" ? "عالم على مزاجك - ممتع ولطيف" : "Play & Compete"}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-gold-500/20 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-navy-850 border border-gold-500/30 text-cream-100 rounded-xl py-2.5 px-10 text-sm focus:outline-none focus:border-gold-500"
            />
            <Search className="absolute ltr:left-3 rtl:right-3 top-3 w-4 h-4 text-gold-400" />
          </form>

          <div className="flex flex-col gap-3 font-semibold text-sm text-cream-100">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gold-500/10 hover:text-gold-400"
            >
              {t.home}
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gold-500/10 hover:text-gold-400"
            >
              {t.shop}
            </Link>
            <Link
              href="/shop?offers=true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gold-500/10 text-suit-red"
            >
              {t.offers}
            </Link>
            <Link
              href="/shop?new=true"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gold-500/10 hover:text-gold-400"
            >
              {t.newArrivals}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gold-500/10 hover:text-gold-400"
            >
              {t.about}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 border-b border-gold-500/10 hover:text-gold-400"
            >
              {t.contact}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
