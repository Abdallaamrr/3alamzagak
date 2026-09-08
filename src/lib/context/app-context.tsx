'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Product,
  Category,
  CartItem,
  Order,
  OrderStatus,
  Coupon,
  Review,
  InventoryTransaction,
  User,
  HomepageBanner,
  StoreSettings,
  Address,
  ProductVariant,
} from '../types';
import { translations, TranslationDictionary } from '../translations';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
  INITIAL_INVENTORY_LOGS,
  INITIAL_USERS,
  INITIAL_BANNERS,
  DEFAULT_SETTINGS,
} from '../demo-data';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  // Language
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  cartDiscount: number;
  shippingFee: number;
  cartTotal: number;
  freeShippingProgress: number;

  // Coupons
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCouponCode: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth & Account
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginAsDemoCustomer: () => void;
  loginAsAdmin: () => void;
  logout: () => void;

  // Store Records & Admin CRUD
  products: Product[];
  categories: Category[];
  orders: Order[];
  coupons: Coupon[];
  reviews: Review[];
  inventoryLogs: InventoryTransaction[];
  banners: HomepageBanner[];
  settings: StoreSettings;

  // Actions
  createOrder: (orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, notes?: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adjustProductStock: (productId: string, newStock: number, reason: InventoryTransaction['reason']) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCouponActive: (id: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  moderateReview: (id: string, status: Review['status'], adminReply?: string) => void;
  updateHomepageBanners: (banners: HomepageBanner[]) => void;
  updateStoreSettings: (settings: StoreSettings) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]); // default admin logged in for easy admin testing
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // DB States
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [inventoryLogs, setInventoryLogs] = useState<InventoryTransaction[]>(INITIAL_INVENTORY_LOGS);
  const [banners, setBanners] = useState<HomepageBanner[]>(INITIAL_BANNERS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('3z_lang') as Language;
      if (savedLang) setLangState(savedLang);

      const savedCart = localStorage.getItem('3z_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('3z_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // ignore SSR
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem('3z_lang', l);
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = l;
    } catch {
      // ignore
    }
  };

  const t: TranslationDictionary = translations[lang];

  // Save Cart to storage
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('3z_cart', JSON.stringify(newCart));
    } catch {
      // ignore
    }
  };

  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    if (product.stock <= 0) {
      addToast(lang === 'ar' ? 'عذراً، هذا المنتج غير متوفر حالياً' : 'Sorry, this product is out of stock', 'error');
      return;
    }

    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedVariant?.id === variant?.id
    );

    let newCart: CartItem[] = [];
    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      const targetQty = currentQty + quantity;
      if (targetQty > product.stock) {
        addToast(
          lang === 'ar'
            ? `لا يمكن إضافة أكثر من الكمية المتاحة (${product.stock})`
            : `Cannot add more than available stock (${product.stock})`,
          'error'
        );
        return;
      }
      newCart = [...cart];
      newCart[existingIndex].quantity = targetQty;
    } else {
      newCart = [...cart, { product, quantity, selectedVariant: variant }];
    }

    updateCartState(newCart);
    addToast(
      lang === 'ar'
        ? `تم إضافة "${lang === 'ar' ? product.nameAr : product.nameEn}" للسلة!`
        : `Added "${product.nameEn}" to cart!`,
      'success'
    );
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    const newCart = cart.filter((i) => i.product.id !== productId);
    updateCartState(newCart);
    if (item) {
      addToast(lang === 'ar' ? 'تم إزالة المنتج من السلة' : 'Item removed from cart', 'info');
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const item = cart.find((i) => i.product.id === productId);
    if (item && quantity > item.product.stock) {
      addToast(
        lang === 'ar' ? `الكمية المتوفرة بالمخزون هي ${item.product.stock}` : `Max available stock is ${item.product.stock}`,
        'error'
      );
      return;
    }

    const newCart = cart.map((i) => (i.product.id === productId ? { ...i, quantity } : i));
    updateCartState(newCart);
  };

  const clearCart = () => {
    updateCartState([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.type === 'percentage') {
      cartDiscount = (cartSubtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.maxDiscount && cartDiscount > appliedCoupon.maxDiscount) {
        cartDiscount = appliedCoupon.maxDiscount;
      }
    } else if (appliedCoupon.type === 'fixed') {
      cartDiscount = appliedCoupon.value;
    }
  }

  const isFreeShippingUnlocked =
    (appliedCoupon && appliedCoupon.type === 'free_shipping') || cartSubtotal >= settings.freeShippingThreshold;

  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShippingUnlocked ? 0 : settings.defaultShippingFee;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee);

  const freeShippingProgress = Math.min(100, (cartSubtotal / settings.freeShippingThreshold) * 100);

  const applyCouponCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code === cleanCode && c.isActive);

    if (!coupon) {
      return {
        success: false,
        message: lang === 'ar' ? 'كود الخصم غير صحيح أو منتهي الصلاحية' : 'Invalid or expired coupon code',
      };
    }

    if (cartSubtotal < coupon.minOrderValue) {
      return {
        success: false,
        message:
          lang === 'ar'
            ? `الحد الأدنى لاستخدام هذا الكود هو ${coupon.minOrderValue} ج.م`
            : `Minimum order value for this coupon is ${coupon.minOrderValue} EGP`,
      };
    }

    setAppliedCoupon(coupon);
    addToast(lang === 'ar' ? 'تم تطبيق كود الخصم بنجاح!' : 'Coupon code applied successfully!', 'success');
    return {
      success: true,
      message: lang === 'ar' ? 'تم الخصم بنجاح' : 'Coupon applied',
    };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    addToast(lang === 'ar' ? 'تم إلغاء كود الخصم' : 'Coupon removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    let newWishlist: string[] = [];
    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter((id) => id !== productId);
      addToast(lang === 'ar' ? 'تم إزالة اللعبة من المفضلة' : 'Removed from wishlist', 'info');
    } else {
      newWishlist = [...wishlist, productId];
      addToast(lang === 'ar' ? 'تم إضافة اللعبة للمفضلة ❤️' : 'Added to wishlist ❤️', 'success');
    }
    setWishlist(newWishlist);
    try {
      localStorage.setItem('3z_wishlist', JSON.stringify(newWishlist));
    } catch {
      // ignore
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Auth simulation
  const loginAsDemoCustomer = () => {
    setCurrentUser(INITIAL_USERS[1]);
    addToast(lang === 'ar' ? 'مرحباً بك عمر خالد!' : 'Welcome back Omar Khaled!', 'success');
  };

  const loginAsAdmin = () => {
    setCurrentUser(INITIAL_USERS[0]);
    addToast(lang === 'ar' ? 'تم تسجيل الدخول كمسؤول للنظام' : 'Logged in as Super Admin', 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    addToast(lang === 'ar' ? 'تم تسجيل الخروج' : 'Logged out', 'info');
  };

  // Order Creation & Inventory Sync
  const createOrder = (orderPayload: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `3Z-${randomNum}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderPayload,
      id: orderId,
      orderNumber,
      createdAt: now,
      timeline: [
        {
          status: 'Pending',
          date: new Date().toLocaleString(),
          notes: 'Order received & queued for confirmation',
        },
      ],
    };

    // Safely deduct stock & generate audit log
    const updatedProducts = [...products];
    const newLogs: InventoryTransaction[] = [];

    orderPayload.items.forEach((item) => {
      const idx = updatedProducts.findIndex((p) => p.id === item.productId);
      if (idx > -1) {
        const p = updatedProducts[idx];
        const prevStock = p.stock;
        const nextStock = Math.max(0, prevStock - item.quantity);
        updatedProducts[idx] = { ...p, stock: nextStock };

        newLogs.push({
          id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
          productId: p.id,
          productName: p.nameAr,
          previousStock: prevStock,
          newStock: nextStock,
          change: -item.quantity,
          reason: 'Order Deduction',
          adminUser: `System (Order ${orderNumber})`,
          date: new Date().toLocaleString(),
        });
      }
    });

    setProducts(updatedProducts);
    setInventoryLogs((prev) => [...newLogs, ...prev]);
    setOrders((prev) => [newOrder, ...prev]);

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, notes?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const nowStr = new Date().toLocaleString();
          const newTimeline = [...o.timeline, { status, date: nowStr, notes }];
          const paymentStatus = status === 'Delivered' ? 'Paid' : o.paymentStatus;
          return { ...o, status, paymentStatus, timeline: newTimeline };
        }
        return o;
      })
    );
    addToast(
      lang === 'ar' ? `تم تحديث حالة الطلب إلى "${status}"` : `Order status updated to "${status}"`,
      'success'
    );
  };

  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProd: Product = { ...prodData, id };
    setProducts((prev) => [newProd, ...prev]);
    addToast(lang === 'ar' ? 'تم إضافة اللعبة بنجاح' : 'Game added successfully', 'success');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    addToast(lang === 'ar' ? 'تم حفظ تعديلات اللعبة' : 'Game updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast(lang === 'ar' ? 'تم حذف اللعبة من المتجر' : 'Game deleted', 'info');
  };

  const adjustProductStock = (productId: string, newStock: number, reason: InventoryTransaction['reason']) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    const prevStock = target.stock;
    const diff = newStock - prevStock;

    updateProduct(productId, { stock: newStock });

    const log: InventoryTransaction = {
      id: `inv-${Date.now()}`,
      productId,
      productName: target.nameAr,
      previousStock: prevStock,
      newStock,
      change: diff,
      reason,
      adminUser: currentUser?.name || 'Admin',
      date: new Date().toLocaleString(),
    };

    setInventoryLogs((prev) => [log, ...prev]);
    addToast(lang === 'ar' ? 'تم تعديل المخزون وسجل العمليات' : 'Stock adjusted & logged', 'success');
  };

  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = { ...couponData, id: `coup-${Date.now()}` };
    setCoupons((prev) => [newCoupon, ...prev]);
    addToast(lang === 'ar' ? 'تم إضافة كود الخصم الجديد' : 'New coupon created', 'success');
  };

  const toggleCouponActive = (id: string) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
    addToast(lang === 'ar' ? 'تم تغيير حالة الكوبون' : 'Coupon status toggled', 'info');
  };

  const addReview = (revData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newRev: Review = {
      ...revData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Approved',
    };
    setReviews((prev) => [newRev, ...prev]);
    addToast(lang === 'ar' ? 'شكراً لك! تم إضافة تقييمك بنجاح' : 'Thank you! Review published', 'success');
  };

  const moderateReview = (id: string, status: Review['status'], adminReply?: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status, adminReply: adminReply ?? r.adminReply } : r)));
    addToast(lang === 'ar' ? 'تم تحديث التقييم' : 'Review updated', 'success');
  };

  const updateHomepageBanners = (newBanners: HomepageBanner[]) => {
    setBanners(newBanners);
    addToast(lang === 'ar' ? 'تم حفظ بنرات الصفحة الرئيسية' : 'Homepage banners updated', 'success');
  };

  const updateStoreSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    addToast(lang === 'ar' ? 'تم إعدادات المتجر' : 'Store settings saved', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartDiscount,
        shippingFee,
        cartTotal,
        freeShippingProgress,
        appliedCoupon,
        applyCouponCode,
        removeCouponCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        setCurrentUser,
        loginAsDemoCustomer,
        loginAsAdmin,
        logout,
        products,
        categories,
        orders,
        coupons,
        reviews,
        inventoryLogs,
        banners,
        settings,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        adjustProductStock,
        addCoupon,
        toggleCouponActive,
        addReview,
        moderateReview,
        updateHomepageBanners,
        updateStoreSettings,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
