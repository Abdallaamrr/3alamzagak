'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const { lang, t, addToast, settings } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      addToast(
        lang === 'ar'
          ? 'تم إرسال رسالتك بنجاح! سيتواصل معك فريق خدمة العملاء خلال ساعات.'
          : 'Message sent successfully! Our team will reach out shortly.',
        'success'
      );
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black font-heading text-cream-100">
          {t.contact}
        </h1>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          {lang === "ar"
            ? "فريق عالم على مزاجك جاهز دائماً للرد على استفساراتك واقتراحاتك."
            : "The 3alamzagak team is always here to assist you."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-navy-900 border border-gold-500/20 text-center space-y-2">
          <Phone className="w-6 h-6 text-gold-400 mx-auto" />
          <h3 className="text-sm font-bold text-cream-100">
            {lang === "ar" ? "الهاتف والواتساب" : "Phone & WhatsApp"}
          </h3>
          <p className="text-xs font-mono text-gold-400" dir="ltr">
            {settings.supportPhone}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-navy-900 border border-gold-500/20 text-center space-y-2">
          <Mail className="w-6 h-6 text-gold-400 mx-auto" />
          <h3 className="text-sm font-bold text-cream-100">
            {lang === "ar" ? "البريد الإلكتروني" : "Support Email"}
          </h3>
          <p className="text-xs text-gold-400">{settings.supportEmail}</p>
        </div>

        <div className="p-6 rounded-2xl bg-navy-900 border border-gold-500/20 text-center space-y-2">
          <MapPin className="w-6 h-6 text-gold-400 mx-auto" />
          <h3 className="text-sm font-bold text-cream-100">
            {lang === "ar" ? "المقر الرئيسي" : "Headquarters"}
          </h3>
          <p className="text-xs text-gray-400">القاهرة، مصر (Cairo, Egypt)</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-3xl bg-navy-900 border border-gold-500/30 space-y-4 max-w-2xl mx-auto text-xs"
      >
        <h2 className="text-base font-bold text-cream-100 border-b border-gold-500/20 pb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gold-400" />
          <span>
            {lang === "ar"
              ? "أرسل لنا رسالة مباشرة"
              : "Send Us a Direct Message"}
          </span>
        </h2>

        <div>
          <label className="block text-gray-300 font-bold mb-1">
            {t.fullName}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
            placeholder="اسمك..."
          />
        </div>

        <div>
          <label className="block text-gray-300 font-bold mb-1">
            {t.email}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
            placeholder="بريدك الإلكتروني..."
          />
        </div>

        <div>
          <label className="block text-gray-300 font-bold mb-1">
            {lang === "ar" ? "الرسالة" : "Message"}
          </label>
          <textarea
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-navy-950 border border-gold-500/30 rounded-xl p-3 text-cream-100 focus:outline-none"
            placeholder="اكتب استفسارك هنا..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:bg-gold-400 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{lang === "ar" ? "إرسال الرسالة" : "Send Message"}</span>
        </button>
      </form>
    </div>
  );
}
