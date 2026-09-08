'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Product } from '@/lib/types';
import { Plus, Search, Edit2, Trash2, Eye, X, Check, Copy } from 'lucide-react';

export default function AdminProductsPage() {
  const { lang, t, products, addProduct, updateProduct, deleteProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form tab state
  const [activeTab, setActiveTab] = useState<'general' | 'pricing' | 'inventory' | 'specs'>('general');

  // Product form fields state
  const [sku, setSku] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [shortDescriptionAr, setShortDescriptionAr] = useState('');
  const [shortDescriptionEn, setShortDescriptionEn] = useState('');
  const [price, setPrice] = useState<number>(300);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [costPrice, setCostPrice] = useState<number>(120);
  const [stock, setStock] = useState<number>(20);
  const [brand, setBrand] = useState('3alamzagak');
  const [numberOfPlayers, setNumberOfPlayers] = useState('2-4 Players');
  const [playingTimeMinutes, setPlayingTimeMinutes] = useState('15-30 mins');
  const [ageRecommendation, setAgeRecommendation] = useState('8+');

  const filteredProducts = products.filter(
    (p) =>
      p.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openNewProductModal = () => {
    setEditingId(null);
    setSku(`3Z-GAME-${Math.floor(100 + Math.random() * 900)}`);
    setNameAr('');
    setNameEn('');
    setDescriptionAr('');
    setDescriptionEn('');
    setShortDescriptionAr('');
    setShortDescriptionEn('');
    setPrice(300);
    setSalePrice(undefined);
    setCostPrice(120);
    setStock(20);
    setBrand('3alamzagak');
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingId(prod.id);
    setSku(prod.sku);
    setNameAr(prod.nameAr);
    setNameEn(prod.nameEn);
    setDescriptionAr(prod.descriptionAr);
    setDescriptionEn(prod.descriptionEn);
    setShortDescriptionAr(prod.shortDescriptionAr);
    setShortDescriptionEn(prod.shortDescriptionEn);
    setPrice(prod.price);
    setSalePrice(prod.salePrice);
    setCostPrice(prod.costPrice);
    setStock(prod.stock);
    setBrand(prod.brand);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, {
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        shortDescriptionAr,
        shortDescriptionEn,
        price,
        salePrice,
        costPrice,
        stock,
        brand,
      });
    } else {
      addProduct({
        sku,
        nameAr,
        nameEn,
        descriptionAr,
        descriptionEn,
        shortDescriptionAr,
        shortDescriptionEn,
        price,
        salePrice,
        costPrice,
        categoryId: 'cat-1',
        categoryNameAr: 'ألعاب الكروت',
        categoryNameEn: 'Card Games',
        brand,
        images: ['/cards/Speeeeeedy_Minimalist_Full_Card_4K_9x5.5cm.png'],
        stock,
        lowStockThreshold: 5,
        ageRecommendation,
        numberOfPlayers,
        minPlayers: 2,
        maxPlayers: 4,
        playingTimeMinutes,
        difficultyLevel: 'Medium',
        difficultyAr: 'متوسط',
        language: 'Bilingual',
        tags: ['New Game'],
        isFeatured: false,
        isBestSeller: false,
        isNewArrival: true,
        isActive: true,
        rating: 5.0,
        reviewCount: 1,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-4">
        <div>
          <h1 className="text-2xl font-black font-heading text-cream-100">
            {lang === 'ar' ? 'إدارة الألعاب والمنتجات' : 'Products Management'}
          </h1>
          <p className="text-xs text-gray-400">
            {lang === 'ar'
              ? `إجمالي ${products.length} لعبة مسجلة في كارتة المتجر`
              : `Total ${products.length} games registered in the store catalog`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-navy-900 border border-gold-500/30 text-cream-100 rounded-xl py-2 px-8 text-xs focus:outline-none"
            />
            <Search className="absolute ltr:left-2.5 rtl:right-2.5 top-2.5 w-4 h-4 text-gold-400" />
          </div>

          <button
            onClick={openNewProductModal}
            className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow hover:bg-gold-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addProduct}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-navy-900 border border-gold-500/20 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-navy-950 text-gold-400 border-b border-gold-500/20">
              <tr>
                <th className="p-3 text-start">الصورة (Image)</th>
                <th className="p-3 text-start">اللعبة (Product)</th>
                <th className="p-3 text-start">SKU</th>
                <th className="p-3 text-start">السعر (Price)</th>
                <th className="p-3 text-start">المخزون (Stock)</th>
                <th className="p-3 text-start">الحالة (Status)</th>
                <th className="p-3 text-start">الإجراءات (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-500/10 text-gray-300">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-navy-850">
                  <td className="p-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.nameEn}
                      className="w-10 h-10 object-cover rounded-lg border border-gold-500/20"
                    />
                  </td>
                  <td className="p-3 font-bold text-cream-100 max-w-xs truncate">
                    {lang === 'ar' ? prod.nameAr : prod.nameEn}
                  </td>
                  <td className="p-3 font-mono text-gold-400/80">{prod.sku}</td>
                  <td className="p-3 font-bold text-gold-400">
                    {prod.salePrice || prod.price} {t.egp}
                  </td>
                  <td className="p-3 font-bold">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        prod.stock <= prod.lowStockThreshold
                          ? 'bg-suit-red/20 text-suit-red'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {prod.stock} قطع
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      نشط (Active)
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(prod)}
                        className="p-1.5 rounded-lg bg-navy-950 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-navy-950 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 rounded-lg bg-navy-950 border border-suit-red/30 text-suit-red hover:bg-suit-red hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-gold-500/30 rounded-3xl p-6 max-w-2xl w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gold-500/20 pb-3">
              <h3 className="text-base font-bold text-cream-100">
                {editingId ? t.editProduct : t.addProduct}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Tabs */}
            <div className="flex border-b border-gold-500/10 text-xs font-bold gap-4">
              {['general', 'pricing', 'inventory', 'specs'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-2 capitalize border-b-2 ${
                    activeTab === tab
                      ? 'border-gold-500 text-gold-400'
                      : 'border-transparent text-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {activeTab === 'general' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">اسم اللعبة بالعربية</label>
                    <input
                      type="text"
                      required
                      value={nameAr}
                      onChange={(e) => setNameAr(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">English Name</label>
                    <input
                      type="text"
                      required
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">SKU الكود الفريد</label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100 font-mono"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">السعر الأصلي (Price)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">سعر العرض (Sale Price)</label>
                    <input
                      type="number"
                      value={salePrice || ''}
                      onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">سعر التكلفة (Cost Price)</label>
                    <input
                      type="number"
                      value={costPrice}
                      onChange={(e) => setCostPrice(Number(e.target.value))}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div>
                  <label className="block text-gray-300 font-bold mb-1">الكمية بالمخزون (Stock)</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                  />
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">عدد اللاعبين</label>
                    <input
                      type="text"
                      value={numberOfPlayers}
                      onChange={(e) => setNumberOfPlayers(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">العمر المناسب</label>
                    <input
                      type="text"
                      value={ageRecommendation}
                      onChange={(e) => setAgeRecommendation(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-gray-300"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold shadow-gold-glow"
                >
                  {t.saveChanges}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
