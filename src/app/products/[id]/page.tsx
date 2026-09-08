'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/context/app-context';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  Share2,
  Users,
  Clock,
  Award,
  Globe,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Send,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { lang, t, products, addToCart, toggleWishlist, isInWishlist, reviews, addReview, addToast } = useApp();

  const product = products.find((p) => p.id === id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'howToPlay' | 'reviews'>('specs');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // New review form state
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [customerNameInput, setCustomerNameInput] = useState('');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <div className="text-5xl">🃏</div>
        <h1 className="text-2xl font-bold text-cream-100">{t.noProductsFound}</h1>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow"
        >
          {t.shopNow}
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'Approved');

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const currentPrice = product.salePrice || product.price;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lang === 'ar' ? product.nameAr : product.nameEn,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast(lang === 'ar' ? 'تم نسخ رابط اللعبة للحافظة!' : 'Product link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && customerNameInput.trim()) {
      addReview({
        productId: product.id,
        customerName: customerNameInput.trim(),
        rating: newRating,
        title: newTitle.trim() || (lang === 'ar' ? 'تقييم ممتاز' : 'Great Game'),
        comment: newComment.trim(),
        isVerifiedPurchase: true,
      });
      setIsReviewModalOpen(false);
      setNewComment('');
      setNewTitle('');
      setCustomerNameInput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-gold-400 transition-colors">
          {t.home}
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold-400 transition-colors">
          {t.shop}
        </Link>
        <span>/</span>
        <span className="text-gold-400 font-medium truncate max-w-xs">
          {lang === 'ar' ? product.nameAr : product.nameEn}
        </span>
      </nav>

      {/* Main Product Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy-900 border border-gold-500/30 shadow-card-dark">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={lang === 'ar' ? product.nameAr : product.nameEn}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {discountPercent > 0 && (
              <span className="absolute top-4 ltr:left-4 rtl:right-4 bg-suit-red text-white text-xs font-black px-3 py-1 rounded-lg shadow-lg">
                -{discountPercent}% {t.discount}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-gold-500 scale-105 shadow-gold-glow'
                      : 'border-gold-500/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-1">
              {product.brand} • {lang === 'ar' ? product.categoryNameAr : product.categoryNameEn}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-heading text-cream-100 leading-tight">
              {lang === 'ar' ? product.nameAr : product.nameEn}
            </h1>
          </div>

          {/* Rating & Review Summary */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-gold-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-sm">{product.rating}</span>
            </div>
            <span className="text-gray-400">
              {t.reviewsCount.replace('{count}', product.reviewCount.toString())}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-400">SKU: {product.sku}</span>
          </div>

          {/* Price & Stock Badge */}
          <div className="p-4 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-gold-400">{currentPrice}</span>
              <span className="text-base font-bold text-cream-100">{t.egp}</span>

              {product.salePrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.price} {t.egp}
                </span>
              )}
            </div>

            {/* Stock State Badge */}
            <div className="pt-2">
              {product.stock > 10 ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.inStock}</span>
                </span>
              ) : product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{t.onlyLeft.replace('{count}', product.stock.toString())}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-suit-red bg-suit-red/10 px-3 py-1 rounded-full border border-suit-red/30">
                  <span>{t.outOfStock}</span>
                </span>
              )}
            </div>
          </div>

          {/* Game Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-navy-900 border border-gold-500/10 text-center space-y-1">
              <Users className="w-4 h-4 text-gold-400 mx-auto" />
              <span className="text-[10px] text-gray-400 block">{t.players}</span>
              <span className="text-xs font-bold text-cream-100">{product.numberOfPlayers}</span>
            </div>

            <div className="p-3 rounded-xl bg-navy-900 border border-gold-500/10 text-center space-y-1">
              <Clock className="w-4 h-4 text-gold-400 mx-auto" />
              <span className="text-[10px] text-gray-400 block">{t.duration}</span>
              <span className="text-xs font-bold text-cream-100">{product.playingTimeMinutes}</span>
            </div>

            <div className="p-3 rounded-xl bg-navy-900 border border-gold-500/10 text-center space-y-1">
              <Award className="w-4 h-4 text-gold-400 mx-auto" />
              <span className="text-[10px] text-gray-400 block">{t.age}</span>
              <span className="text-xs font-bold text-cream-100">{product.ageRecommendation}</span>
            </div>

            <div className="p-3 rounded-xl bg-navy-900 border border-gold-500/10 text-center space-y-1">
              <Globe className="w-4 h-4 text-gold-400 mx-auto" />
              <span className="text-[10px] text-gray-400 block">{t.gameLanguage}</span>
              <span className="text-xs font-bold text-cream-100">{product.language}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs text-cream-200 leading-relaxed">
            {lang === 'ar' ? product.shortDescriptionAr : product.shortDescriptionEn}
          </p>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gold-500/30 rounded-xl bg-navy-900 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-gold-400 hover:bg-navy-800 rounded-lg text-sm"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-cream-100 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 text-gold-400 hover:bg-navy-800 rounded-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Wishlist & Share buttons */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-suit-red text-white border-suit-red'
                    : 'bg-navy-900 border-gold-500/30 text-gold-400 hover:border-gold-500'
                }`}
                title={t.wishlist}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-navy-900 border border-gold-500/30 text-gold-400 hover:border-gold-500 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock <= 0}
                className={`py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  product.stock <= 0
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-navy-900 border-2 border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-navy-950'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className={`py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-gold-glow ${
                  product.stock <= 0
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500'
                }`}
              >
                <span>{t.buyNow}</span>
                {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specifications / How to Play / Reviews */}
      <div className="bg-navy-900 border border-gold-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-gold-500/20 text-sm font-bold gap-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-gold-500 text-gold-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {t.specs}
          </button>

          {product.howToPlayAr && (
            <button
              onClick={() => setActiveTab('howToPlay')}
              className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                activeTab === 'howToPlay'
                  ? 'border-gold-500 text-gold-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.howToPlay}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-gold-500 text-gold-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {t.rating} ({productReviews.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'specs' && (
          <div className="space-y-4 text-xs text-cream-200 leading-relaxed">
            <p className="whitespace-pre-line">
              {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
            </p>
          </div>
        )}

        {activeTab === 'howToPlay' && (
          <div className="p-4 rounded-2xl bg-navy-950 border border-gold-500/20 space-y-3 text-xs text-cream-200">
            <h4 className="font-bold text-gold-400 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تعليمات وقواعد اللعبة' : 'Game Rules & Setup'}</span>
            </h4>
            <p className="leading-relaxed">
              {lang === 'ar' ? product.howToPlayAr : product.howToPlayEn}
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-cream-100">{t.customerReviewsTitle}</h4>
                <p className="text-xs text-gray-400">{t.reviewsCount.replace('{count}', productReviews.length.toString())}</p>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs hover:bg-gold-400 transition-colors"
              >
                {t.writeReview}
              </button>
            </div>

            {productReviews.length === 0 ? (
              <p className="text-xs text-gray-400 italic">
                {lang === 'ar' ? 'لا توجد تقييمات لهذه اللعبة بعد. كن أول من يشارك رأيه!' : 'No reviews for this game yet. Be the first to share your thoughts!'}
              </p>
            ) : (
              <div className="space-y-4">
                {productReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-navy-950 border border-gold-500/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-cream-100">{rev.customerName}</span>
                      <div className="flex items-center gap-1 text-gold-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Frequently Bought Together / Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-cream-100">{t.relatedProducts}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-gold-500/30 rounded-3xl p-6 max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b border-gold-500/20 pb-3">
              <h3 className="text-base font-bold text-cream-100">{t.writeReview}</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">{t.fullName}</label>
                <input
                  type="text"
                  required
                  value={customerNameInput}
                  onChange={(e) => setCustomerNameInput(e.target.value)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100 focus:outline-none"
                  placeholder="أدخل اسمك..."
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">{t.rating}</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-gold-400"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-current' : 'opacity-30'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {lang === 'ar' ? 'تعليقك وتقييمك للعبة' : 'Your Review'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-2.5 text-cream-100 focus:outline-none"
                  placeholder="اكتب تجربتك وانطباعك عن اللعبة..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs hover:bg-gold-400 transition-colors shadow-gold-glow"
              >
                {lang === 'ar' ? 'إرسال التقييم' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
