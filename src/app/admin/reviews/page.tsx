'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/context/app-context';
import { Star, Check, X, Trash2, MessageSquare } from 'lucide-react';

export default function AdminReviewsPage() {
  const { lang, t, reviews, moderateReview, products } = useApp();
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});

  return (
    <div className="space-y-6">
      <div className="border-b border-gold-500/20 pb-4">
        <h1 className="text-2xl font-black font-heading text-cream-100">
          {lang === 'ar' ? 'إدارة وتقييمات العملاء' : 'Reviews Moderation'}
        </h1>
        <p className="text-xs text-gray-400">
          {lang === 'ar' ? 'مراجعة، اعتماد، أو الرد على تقييمات العملاء الموثقة' : 'Moderate and reply to verified customer reviews'}
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => {
          const prod = products.find((p) => p.id === rev.productId);
          return (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-navy-900 border border-gold-500/20 space-y-3"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-gold-500/10 pb-3">
                <div>
                  <h3 className="font-bold text-cream-100 text-sm">{rev.customerName}</h3>
                  <p className="text-xs text-gold-400 font-medium">
                    اللعبة: {prod ? (lang === 'ar' ? prod.nameAr : prod.nameEn) : rev.productId}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex text-gold-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      rev.status === 'Approved'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : rev.status === 'Pending'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-suit-red/20 text-suit-red'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-cream-100">{rev.title}</h4>
                <p className="text-gray-300 leading-relaxed">"{rev.comment}"</p>
              </div>

              {rev.adminReply && (
                <div className="p-3 rounded-xl bg-navy-950 border border-gold-500/20 text-xs space-y-1">
                  <span className="font-bold text-gold-400 block">رد الإدارة:</span>
                  <p className="text-gray-300">{rev.adminReply}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-gold-500/10 text-xs">
                <div className="flex gap-2">
                  {rev.status !== 'Approved' && (
                    <button
                      onClick={() => moderateReview(rev.id, 'Approved')}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500"
                    >
                      اعتماد (Approve)
                    </button>
                  )}
                  {rev.status !== 'Hidden' && (
                    <button
                      onClick={() => moderateReview(rev.id, 'Hidden')}
                      className="px-3 py-1 rounded-lg bg-navy-950 border border-gold-500/30 text-gray-300 hover:text-white"
                    >
                      إخفاء (Hide)
                    </button>
                  )}
                  <button
                    onClick={() => moderateReview(rev.id, 'Hidden')}
                    className="px-3 py-1 rounded-lg bg-suit-red/20 text-suit-red hover:bg-suit-red hover:text-white"
                  >
                    حذف (Delete)
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
