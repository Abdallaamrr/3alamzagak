'use client';

import React from 'react';
import { useApp } from '@/lib/context/app-context';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 left-5 sm:left-auto sm:w-96 z-50 flex flex-col gap-2.5 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border backdrop-blur-md ${
              t.type === 'success'
                ? 'bg-navy-900/95 border-gold-500/40 text-cream-100'
                : t.type === 'error'
                ? 'bg-navy-900/95 border-suit-red/50 text-cream-100'
                : 'bg-navy-900/95 border-gold-400/30 text-cream-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />}
              {t.type === 'error' && <AlertCircle className="w-5 h-5 text-suit-red shrink-0" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
              <p className="text-sm font-medium leading-snug">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
