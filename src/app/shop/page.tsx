'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { ProductCard } from '@/components/product/ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
} from 'lucide-react';

function ShopContent() {
  const { lang, t, products, categories } = useApp();
  const searchParams = useSearchParams();

  // Query parameters
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialOffers = searchParams.get('offers') === 'true';
  const initialBestSeller = searchParams.get('bestseller') === 'true';
  const initialNew = searchParams.get('new') === 'true';

  // Filter States
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOffers, setOnlyOffers] = useState(initialOffers);
  const [onlyBestSellers, setOnlyBestSellers] = useState(initialBestSeller);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState(initialNew);

  // Layout View & Sorting State
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract unique brands for filter options
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), [products]);

  // Multi-Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName =
          prod.nameAr.toLowerCase().includes(query) || prod.nameEn.toLowerCase().includes(query);
        const matchesSku = prod.sku.toLowerCase().includes(query);
        const matchesBrand = prod.brand.toLowerCase().includes(query);
        const matchesTags = prod.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesName && !matchesSku && !matchesBrand && !matchesTags) {
          return false;
        }
      }

      // Category match
      if (selectedCategory) {
        const catObj = categories.find((c) => c.slug === selectedCategory);
        if (catObj && prod.categoryId !== catObj.id) {
          return false;
        }
      }

      // Brand match
      if (selectedBrand && prod.brand !== selectedBrand) {
        return false;
      }

      // Price match
      const price = prod.salePrice || prod.price;
      if (price < minPrice || price > maxPrice) {
        return false;
      }

      // Stock match
      if (onlyInStock && prod.stock <= 0) {
        return false;
      }

      // Offers match
      if (onlyOffers && !prod.salePrice) {
        return false;
      }

      // Best seller match
      if (onlyBestSellers && !prod.isBestSeller) {
        return false;
      }

      // New arrivals match
      if (onlyNewArrivals && !prod.isNewArrival) {
        return false;
      }

      // Difficulty match
      if (selectedDifficulty && prod.difficultyLevel !== selectedDifficulty) {
        return false;
      }

      // Language match
      if (selectedLanguage && prod.language !== selectedLanguage && prod.language !== 'Bilingual') {
        return false;
      }

      return true;
    });
  }, [
    products,
    categories,
    searchTerm,
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    onlyInStock,
    onlyOffers,
    onlyBestSellers,
    onlyNewArrivals,
    selectedDifficulty,
    selectedLanguage,
  ]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'newest') {
      return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    if (sortBy === 'bestseller') {
      return list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    return list; // featured default
  }, [filteredProducts, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setMinPrice(0);
    setMaxPrice(2000);
    setSelectedDifficulty('');
    setSelectedLanguage('');
    setOnlyInStock(false);
    setOnlyOffers(false);
    setOnlyBestSellers(false);
    setOnlyNewArrivals(false);
    setSortBy('featured');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-500/20 pb-6">
        <div>
          <h1 className="text-3xl font-black font-heading text-cream-100">{t.allProducts}</h1>
          <p className="text-xs text-gray-400 mt-1">
            {lang === 'ar'
              ? `تم العثور على ${sortedProducts.length} لعبة تناسب اختيارك`
              : `Found ${sortedProducts.length} games matching your criteria`}
          </p>
        </div>

        {/* Search Bar & View Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-navy-900 border border-gold-500/30 text-cream-100 placeholder-gray-500 rounded-xl py-2 px-9 text-xs focus:outline-none focus:border-gold-500"
            />
            <Search className="absolute ltr:left-3 rtl:right-3 top-2.5 w-4 h-4 text-gold-400" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute ltr:right-3 rtl:left-3 top-2.5 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-navy-900 border border-gold-500/30 text-gold-400 rounded-xl py-2 px-3 text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="featured">{t.sortFeatured}</option>
              <option value="bestseller">{t.bestSellers}</option>
              <option value="price-low">{t.sortPriceLow}</option>
              <option value="price-high">{t.sortPriceHigh}</option>
              <option value="rating">{t.sortRating}</option>
              <option value="newest">{t.sortNewest}</option>
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="lg:hidden p-2 bg-navy-900 border border-gold-500/30 text-gold-400 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t.filterBy}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filter Panel */}
        <aside
          className={`space-y-6 lg:block ${
            isMobileFiltersOpen
              ? 'fixed inset-0 z-50 bg-navy-950 p-6 overflow-y-auto block'
              : 'hidden'
          }`}
        >
          {isMobileFiltersOpen && (
            <div className="flex items-center justify-between border-b border-gold-500/20 pb-4 mb-4 lg:hidden">
              <h3 className="text-base font-bold text-cream-100">{t.filterBy}</h3>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-400">
                <X className="w-6 h-6" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between text-xs border-b border-gold-500/10 pb-3">
            <span className="font-bold text-gold-400 uppercase tracking-wider">{t.filterBy}</span>
            <button
              onClick={resetFilters}
              className="text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.clearFilters}</span>
            </button>
          </div>

          {/* Filter: Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-cream-100">{t.categories}</h4>
            <div className="space-y-1 text-xs text-gray-300">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-start px-2 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === '' ? 'bg-gold-500/20 text-gold-400 font-bold' : 'hover:bg-navy-850'
                }`}
              >
                {t.allCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-start px-2 py-1.5 rounded-lg transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-gold-500/20 text-gold-400 font-bold'
                      : 'hover:bg-navy-850'
                  }`}
                >
                  {lang === 'ar' ? cat.nameAr : cat.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Price Range */}
          <div className="space-y-2 pt-4 border-t border-gold-500/10">
            <h4 className="text-xs font-bold text-cream-100">{t.priceRange}</h4>
            <div className="flex items-center gap-2 text-xs">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-1/2 bg-navy-900 border border-gold-500/30 rounded-lg p-2 text-cream-100 focus:outline-none"
                placeholder="0"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-1/2 bg-navy-900 border border-gold-500/30 rounded-lg p-2 text-cream-100 focus:outline-none"
                placeholder="2000"
              />
            </div>
          </div>

          {/* Filter: Brand */}
          <div className="space-y-2 pt-4 border-t border-gold-500/10">
            <h4 className="text-xs font-bold text-cream-100">{lang === 'ar' ? 'العلامة التجارية' : 'Brand'}</h4>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-navy-900 border border-gold-500/30 text-cream-100 rounded-lg p-2 text-xs focus:outline-none"
            >
              <option value="">{t.allBrands}</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Filter: Difficulty Level */}
          <div className="space-y-2 pt-4 border-t border-gold-500/10">
            <h4 className="text-xs font-bold text-cream-100">{t.difficulty}</h4>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-navy-900 border border-gold-500/30 text-cream-100 rounded-lg p-2 text-xs focus:outline-none"
            >
              <option value="">{lang === 'ar' ? 'جميع المستويات' : 'All Difficulties'}</option>
              <option value="Easy">{lang === 'ar' ? 'سهل' : 'Easy'}</option>
              <option value="Medium">{lang === 'ar' ? 'متوسط' : 'Medium'}</option>
              <option value="Hard">{lang === 'ar' ? 'صعب' : 'Hard'}</option>
            </select>
          </div>

          {/* Filter: Checkboxes Status */}
          <div className="space-y-2 pt-4 border-t border-gold-500/10 text-xs text-cream-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-gold-500"
              />
              <span>{t.inStock}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyOffers}
                onChange={(e) => setOnlyOffers(e.target.checked)}
                className="accent-suit-red"
              />
              <span className="text-suit-red font-bold">{t.offers}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyBestSellers}
                onChange={(e) => setOnlyBestSellers(e.target.checked)}
                className="accent-gold-500"
              />
              <span>{t.bestSellers}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyNewArrivals}
                onChange={(e) => setOnlyNewArrivals(e.target.checked)}
                className="accent-emerald-500"
              />
              <span>{t.newArrivals}</span>
            </label>
          </div>

          {isMobileFiltersOpen && (
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full py-3 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs"
            >
              {lang === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
            </button>
          )}
        </aside>

        {/* Right Main Product Grid Area */}
        <main className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <div className="p-12 text-center bg-navy-900 border border-gold-500/20 rounded-3xl space-y-4">
              <div className="text-4xl">🎲</div>
              <h3 className="text-lg font-bold text-cream-100">{t.noProductsFound}</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">{t.tryDifferentSearch}</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow"
              >
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-gold-400 font-bold">جاري تحميل المتجر...</div>}>
      <ShopContent />
    </Suspense>
  );
}
