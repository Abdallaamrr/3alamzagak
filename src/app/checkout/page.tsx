'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context/app-context';
import { PaymentMethod } from '@/lib/types';
import {
  User,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Phone,
  Mail,
  Building,
} from 'lucide-react';

const EGYPTIAN_GOVERNORATES = [
  'القاهرة (Cairo)',
  'الجيزة (Giza)',
  'الإسكندرية (Alexandria)',
  'القليوبية (Qalyubia)',
  'الشرقية (Sharqia)',
  'الدقهلية (Dakahlia)',
  'البحيرة (Beheira)',
  'المنوفية (Monufia)',
  'الغربية (Gharbia)',
  'كفر الشيخ (Kafr El Sheikh)',
  'الفيوم (Faiyum)',
  'بني سويف (Beni Suef)',
  'المنيا (Minya)',
  'أسيوط (Asyut)',
  'سوهاج (Sohag)',
  'قنا (Qena)',
  'الأقصر (Luxor)',
  'أسوان (Aswan)',
  'البحر الأحمر (Red Sea)',
  'جنوب سيناء (South Sinai)',
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    lang,
    t,
    cart,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    createOrder,
    currentUser,
    addToast,
  } = useApp();

  const [activeStep, setActiveStep] = useState<number>(1);

  // Form State
  const [customerName, setCustomerName] = useState(currentUser?.name || 'عمر خالد');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'omar.khaled@gmail.com');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '01012345678');

  const [governorate, setGovernorate] = useState('القاهرة (Cairo)');
  const [city, setCity] = useState('المعادي');
  const [streetAddress, setStreetAddress] = useState('شارع 9 الرئيسي');
  const [building, setBuilding] = useState('عمارة 14 - شقة 4');

  const [deliveryMethod, setDeliveryMethod] = useState('توصيل قياسي (24 - 48 ساعة)');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [walletPhone, setWalletPhone] = useState('');

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-cream-100">{t.cartEmpty}</h1>
        <button
          onClick={() => router.push('/shop')}
          className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs"
        >
          {t.shopNow}
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!customerName || !customerPhone || !customerEmail) {
      addToast(lang === 'ar' ? 'يرجى إكمال بيانات العميل' : 'Please complete customer info', 'error');
      setActiveStep(1);
      return;
    }

    if (!streetAddress || !city) {
      addToast(lang === 'ar' ? 'يرجى إكمال عنوان الشحن' : 'Please complete shipping address', 'error');
      setActiveStep(2);
      return;
    }

    // Build order items payload
    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productNameAr: item.product.nameAr,
      productNameEn: item.product.nameEn,
      image: item.product.images[0],
      price: item.product.salePrice || item.product.price,
      quantity: item.quantity,
    }));

    const newOrder = createOrder({
      customerId: currentUser?.id || 'guest-cust',
      customerName,
      customerEmail,
      customerPhone,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee,
      total: cartTotal,
      status: 'Pending',
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      shippingAddress: {
        id: `addr-${Date.now()}`,
        title: 'عنوان الشحن',
        fullName: customerName,
        phone: customerPhone,
        governorate,
        city,
        streetAddress,
        building,
        isDefault: true,
      },
      deliveryMethod,
      trackingNumber: `EG-3Z-${Math.floor(10000 + Math.random() * 90000)}-TRK`,
    });

    addToast(lang === 'ar' ? 'تم تأكيد طلبك بنجاح! 🎉' : 'Order placed successfully! 🎉', 'success');
    router.push(`/order-confirmation/${newOrder.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Checkout Header & Steps Indicator */}
      <div className="border-b border-gold-500/20 pb-6 space-y-4">
        <h1 className="text-3xl font-black font-heading text-cream-100 flex items-center gap-2">
          <Lock className="w-6 h-6 text-gold-400" />
          <span>{t.checkout}</span>
        </h1>

        {/* Steps Bar */}
        <div className="grid grid-cols-5 gap-2 text-xs font-bold text-center">
          {[
            { num: 1, label: t.stepCustomer },
            { num: 2, label: t.stepAddress },
            { num: 3, label: t.stepShipping },
            { num: 4, label: t.stepPayment },
            { num: 5, label: t.stepReview },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`py-2 px-1 rounded-xl border transition-all truncate ${
                activeStep === s.num
                  ? 'bg-gold-500 text-navy-950 border-gold-400 font-extrabold shadow-gold-glow'
                  : activeStep > s.num
                  ? 'bg-navy-900 text-gold-400 border-gold-500/30'
                  : 'bg-navy-950 text-gray-500 border-navy-800'
              }`}
            >
              {s.num}. {s.label.split('. ')[1]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Customer Information */}
          {activeStep === 1 && (
            <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4">
              <h2 className="text-lg font-bold text-cream-100 flex items-center gap-2">
                <User className="w-5 h-5 text-gold-400" />
                <span>{t.stepCustomer}</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">{t.fullName}</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">{t.phone}</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">{t.email}</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow"
                >
                  {lang === 'ar' ? 'التالي: عنوان الشحن' : 'Next: Shipping Address'}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Address */}
          {activeStep === 2 && (
            <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4">
              <h2 className="text-lg font-bold text-cream-100 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold-400" />
                <span>{t.stepAddress}</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">{t.governorate}</label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
                  >
                    {EGYPTIAN_GOVERNORATES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1">{t.city}</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-bold mb-1">{t.building}</label>
                    <input
                      type="text"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">{t.streetAddress}</label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                    className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
                    placeholder="اسم الشارع، علامة مميزة بجوارك..."
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-gray-300 text-xs"
                >
                  {lang === 'ar' ? 'السابق' : 'Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow"
                >
                  {lang === 'ar' ? 'التالي: طريقة التوصيل' : 'Next: Delivery Method'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Delivery Method */}
          {activeStep === 3 && (
            <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4">
              <h2 className="text-lg font-bold text-cream-100 flex items-center gap-2">
                <Truck className="w-5 h-5 text-gold-400" />
                <span>{t.stepShipping}</span>
              </h2>

              <div className="space-y-3 text-xs">
                {[
                  {
                    id: 'standard',
                    titleAr: 'توصيل قياسي (24 - 48 ساعة)',
                    titleEn: 'Standard Delivery (24-48h)',
                    price: shippingFee === 0 ? 'مجاني' : `${shippingFee} ج.م`,
                  },
                  {
                    id: 'express',
                    titleAr: 'توصيل سريع للغاية في نفس اليوم (القاهرة والجيزة)',
                    titleEn: 'Express Same-Day Delivery (Cairo & Giza)',
                    price: '85 ج.م',
                  },
                ].map((m) => (
                  <label
                    key={m.id}
                    onClick={() => setDeliveryMethod(m.titleAr)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      deliveryMethod === m.titleAr
                        ? 'bg-gold-500/10 border-gold-500 text-cream-100'
                        : 'bg-navy-950 border-gold-500/20 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === m.titleAr}
                        onChange={() => setDeliveryMethod(m.titleAr)}
                        className="accent-gold-500"
                      />
                      <span className="font-bold">
                        {lang === 'ar' ? m.titleAr : m.titleEn}
                      </span>
                    </div>
                    <span className="font-bold text-gold-400">{m.price}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-gray-300 text-xs"
                >
                  {lang === 'ar' ? 'السابق' : 'Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow"
                >
                  {lang === 'ar' ? 'التالي: طريقة الدفع' : 'Next: Payment Method'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment Method */}
          {activeStep === 4 && (
            <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/20 space-y-4">
              <h2 className="text-lg font-bold text-cream-100 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gold-400" />
                <span>{t.stepPayment}</span>
              </h2>

              <div className="space-y-3 text-xs">
                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-gold-500/10 border-gold-500 text-cream-100'
                      : 'bg-navy-950 border-gold-500/20 text-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-gold-500 mt-1"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-cream-100">{t.cashOnDelivery}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {lang === 'ar'
                        ? 'ادفع نقداً لمندوب الشحن عند استلام الألعاب عند باب المنزل.'
                        : 'Pay cash to courier when receiving your games at your doorstep.'}
                    </p>
                  </div>
                </label>

                {/* Card Payment */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-gold-500/10 border-gold-500 text-cream-100'
                      : 'bg-navy-950 border-gold-500/20 text-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-gold-500 mt-1"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="font-bold text-sm text-cream-100">{t.creditCard}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {lang === 'ar' ? 'دفع إلكتروني آمن عبر الفيزا والماستركارد وميزة' : 'Secure card payment via Visa, MasterCard & Meeza'}
                      </p>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="p-3 rounded-xl bg-navy-900 border border-gold-500/20 space-y-2 text-xs">
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          placeholder="الاسم على البطاقة"
                          className="w-full bg-navy-950 border border-gold-500/30 rounded-lg p-2 text-cream-100"
                        />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="رقم البطاقة (16 رقم)"
                          className="w-full bg-navy-950 border border-gold-500/30 rounded-lg p-2 text-cream-100"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-1/2 bg-navy-950 border border-gold-500/30 rounded-lg p-2 text-cream-100"
                          />
                          <input
                            type="password"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="CVC"
                            className="w-1/2 bg-navy-950 border border-gold-500/30 rounded-lg p-2 text-cream-100"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Mobile Wallet */}
                <label
                  onClick={() => setPaymentMethod('wallet')}
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'wallet'
                      ? 'bg-gold-500/10 border-gold-500 text-cream-100'
                      : 'bg-navy-950 border-gold-500/20 text-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="accent-gold-500 mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-sm text-cream-100">{t.mobileWallet}</h4>
                    {paymentMethod === 'wallet' && (
                      <input
                        type="tel"
                        value={walletPhone}
                        onChange={(e) => setWalletPhone(e.target.value)}
                        placeholder="رقم المحفظة (فودافون كاش، أورنج كاش...)"
                        className="w-full bg-navy-950 border border-gold-500/30 rounded-lg p-2 text-xs text-cream-100"
                      />
                    )}
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-gray-300 text-xs"
                >
                  {lang === 'ar' ? 'السابق' : 'Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(5)}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow-gold-glow"
                >
                  {lang === 'ar' ? 'التالي: مراجعة الطلب' : 'Next: Review Order'}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Confirm */}
          {activeStep === 5 && (
            <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/30 space-y-6">
              <h2 className="text-lg font-bold text-cream-100 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gold-400" />
                <span>{t.stepReview}</span>
              </h2>

              <div className="space-y-4 text-xs">
                {/* Summary Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-navy-950 border border-gold-500/10 space-y-1">
                    <span className="font-bold text-gold-400 block">{t.fullName}</span>
                    <p className="text-cream-100">{customerName}</p>
                    <p className="text-gray-400">{customerPhone}</p>
                    <p className="text-gray-400">{customerEmail}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950 border border-gold-500/10 space-y-1">
                    <span className="font-bold text-gold-400 block">{t.stepAddress}</span>
                    <p className="text-cream-100">{governorate} - {city}</p>
                    <p className="text-gray-400">{streetAddress} ({building})</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-950 border border-gold-500/10 flex justify-between">
                  <div>
                    <span className="font-bold text-gold-400 block">{t.stepPayment}</span>
                    <p className="text-cream-100 uppercase font-bold">{paymentMethod}</p>
                  </div>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="text-gold-400 underline hover:text-white"
                  >
                    {lang === 'ar' ? 'تعديل' : 'Edit'}
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-gold-500/20">
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-gray-300 text-xs"
                >
                  {lang === 'ar' ? 'السابق' : 'Back'}
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-navy-950 font-black text-sm uppercase tracking-wider shadow-gold-glow hover:from-gold-400 hover:to-gold-500 transition-all flex items-center gap-2"
                >
                  <span>{t.placeOrder}</span>
                  {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Order Summary */}
        <div className="p-6 rounded-3xl bg-navy-900 border border-gold-500/30 space-y-4 h-fit">
          <h3 className="text-base font-bold text-cream-100 border-b border-gold-500/20 pb-3">
            {t.orderSummary} ({cart.length})
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt={item.product.nameEn}
                  className="w-12 h-12 object-cover rounded-lg border border-gold-500/20 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-cream-100 font-bold truncate">
                    {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                  </p>
                  <p className="text-gray-400">
                    {item.quantity} × {item.product.salePrice || item.product.price} {t.egp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 text-xs border-t border-gold-500/20 pt-4 text-gray-300">
            <div className="flex justify-between">
              <span>{t.subtotal}</span>
              <span className="font-bold text-cream-100">
                {cartSubtotal} {t.egp}
              </span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-suit-red">
                <span>{t.discount}</span>
                <span className="font-bold">
                  -{cartDiscount.toFixed(0)} {t.egp}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>{t.shippingFee}</span>
              <span className="font-bold text-cream-100">
                {shippingFee === 0 ? t.freeShipping : `${shippingFee} ${t.egp}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-black text-gold-400 pt-2 border-t border-gold-500/10">
              <span>{t.grandTotal}</span>
              <span>
                {cartTotal.toFixed(0)} {t.egp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
