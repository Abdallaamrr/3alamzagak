'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  href?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  href = '/',
  className = '',
}) => {
  const sizeClasses = {
    sm: { icon: 'w-6 h-6', title: 'text-lg', subtitle: 'text-[9px]' },
    md: { icon: 'w-8 h-8', title: 'text-2xl', subtitle: 'text-[10px]' },
    lg: { icon: 'w-11 h-11', title: 'text-3xl', subtitle: 'text-xs' },
    xl: { icon: 'w-16 h-16', title: 'text-5xl', subtitle: 'text-sm' },
  };

  const currentSize = sizeClasses[size];

  const logoContent = (
    <div
      className={`inline-flex items-center gap-3 select-none group ${className}`}
    >
      {/* Emblem Frame */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 p-[1.5px] shadow-gold-glow group-hover:shadow-gold-glow-lg transition-all duration-300`}
      >
        <div className="bg-navy-900 rounded-[10.5px] p-2 flex items-center justify-center">
          {/* Custom Suits Emblem */}
          <div
            className={`${currentSize.icon} flex flex-col items-center justify-center leading-none text-gold-400 font-bold`}
          >
            <div className="flex items-center gap-0.5 text-xs">
              <span className="text-suit-black dark:text-gold-400">♠</span>
              <span className="text-suit-red">♥</span>
            </div>
            <div className="flex items-center gap-0.5 text-xs -mt-1">
              <span className="text-suit-red">♦</span>
              <span className="text-suit-black dark:text-gold-400">♣</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`font-heading font-black tracking-tight bg-gradient-to-r from-cream-100 via-gold-400 to-gold-600 bg-clip-text text-transparent ${currentSize.title}`}
          >
            عالم على مزاجك
          </span>
          <span className="text-gold-500 font-serif font-bold text-xs tracking-widest uppercase opacity-80 border-l border-gold-500/30 pl-2 hidden sm:inline">
            3alamzagak
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 text-gold-400/80 tracking-widest font-sans font-medium uppercase text-[10px]">
            <span>CARD & BOARD GAMES</span>
            <span className="inline-block w-1 h-1 rounded-full bg-suit-red"></span>
            <span>مصر</span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{logoContent}</Link>;
  }

  return logoContent;
};
