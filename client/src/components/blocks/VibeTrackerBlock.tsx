'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Block, ThemeConfig } from '@/types';

interface VibeTrackerBlockProps {
  block: Block<'vibeTracker'>;
  isEditing?: boolean;
  theme?: ThemeConfig;
}

const CYCLE_INTERVAL_MS = 3000;

export function VibeTrackerBlock({ block, theme }: VibeTrackerBlockProps) {
  const { items } = block.content;
  const [activeIndex, setActiveIndex] = useState(0);
  const isLight = theme?.mode === 'light';

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;

    const id = setInterval(advance, CYCLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [advance, items.length]);

  if (items.length === 0) {
    return (
      <div className={`flex items-center justify-center w-full h-full text-sm ${isLight ? 'text-zinc-400' : 'text-white/30'}`}>
        No vibes yet
      </div>
    );
  }

  const current = items[activeIndex];
  if (!current) return null;

  return (
    <div className="flex flex-col justify-center w-full h-full overflow-hidden select-none">
      {/* Subtle category dots */}
      {items.length > 1 && (
        <div className="flex items-center gap-1 mb-2">
          {items.map((_, i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 16 : 5,
                height: 5,
                backgroundColor:
                  i === activeIndex
                    ? 'rgba(167, 139, 250, 0.8)'
                    : isLight 
                      ? 'rgba(0, 0, 0, 0.15)' 
                      : 'rgba(255, 255, 255, 0.15)',
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ y: 18, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -18, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center gap-2.5"
        >
          {current.icon && (
            <span className="text-lg flex-shrink-0 leading-none">
              {current.icon}
            </span>
          )}
          <div className="min-w-0">
            <p className={`text-[10px] font-semibold uppercase tracking-widest leading-none mb-0.5 ${isLight ? 'text-violet-700/80' : 'text-violet-300/70'}`}>
              {current.label}
            </p>
            <p className={`text-sm font-medium truncate leading-snug ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {current.value}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
