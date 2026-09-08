export type Language = 'ar' | 'en';

export interface ProductVariant {
  id: string;
  nameAr: string;
  nameEn: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  attributes: Record<string, string>;
}

export interface Product {
  id: string;
  sku: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  price: number;
  salePrice?: number;
  costPrice: number;
  profitMargin?: number;
  categoryId: string;
  categoryNameAr: string;
  categoryNameEn: string;
  subcategoryId?: string;
  brand: string;
  images: string[];
  videoUrl?: string;
  variants?: ProductVariant[];
  stock: number;
  lowStockThreshold: number;
  weightKg?: number;
  dimensionsCm?: string;
  ageRecommendation: string; // e.g. "8+"
  numberOfPlayers: string; // e.g. "2-4 Players"
  minPlayers: number;
  maxPlayers: number;
  playingTimeMinutes: string; // e.g. "15-30 mins"
  difficultyLevel: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  difficultyAr: string;
  language: 'Arabic' | 'English' | 'Bilingual';
  tags: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  howToPlayAr?: string;
  howToPlayEn?: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  icon: string;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  governorate: string; // e.g. Cairo, Giza, Alexandria
  city: string;
  streetAddress: string;
  building: string;
  apartment?: string;
  isDefault: boolean;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Refunded';

export type PaymentMethod = 'cod' | 'card' | 'wallet';

export interface OrderItem {
  productId: string;
  productNameAr: string;
  productNameEn: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderTimeline {
  status: OrderStatus;
  date: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  shippingAddress: Address;
  deliveryMethod: string;
  trackingNumber: string;
  timeline: OrderTimeline[];
  createdAt: string;
  notes?: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
  status: 'Approved' | 'Pending' | 'Hidden';
  adminReply?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  timesUsed: number;
  perCustomerLimit: number;
  isActive: boolean;
}

export interface InventoryTransaction {
  id: string;
  productId: string;
  productName: string;
  previousStock: number;
  newStock: number;
  change: number;
  reason: 'Restock' | 'Order Deduction' | 'Manual Adjustment' | 'Damaged/Lost' | 'Return';
  adminUser: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Customer' | 'Super Admin' | 'Admin' | 'Inventory Manager' | 'Order Manager' | 'Content Manager';
  avatar?: string;
  createdAt: string;
  totalSpent: number;
  ordersCount: number;
  addresses: Address[];
}

export interface NotificationItem {
  id: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  date: string;
  isRead: boolean;
  type: 'order' | 'stock' | 'system' | 'review' | 'promo';
}

export interface HomepageBanner {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  ctaTextAr: string;
  ctaTextEn: string;
  link: string;
  imageUrl: string;
  badgeAr?: string;
  badgeEn?: string;
  isActive: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
  ip: string;
}

export interface StoreSettings {
  storeNameAr: string;
  storeNameEn: string;
  supportPhone: string;
  supportEmail: string;
  currency: string;
  freeShippingThreshold: number;
  defaultShippingFee: number;
  taxRate: number;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
}
