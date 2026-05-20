'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Block } from '@/types';

interface VibeTrackerBlockProps {
  block: Block<'vibeTracker'>;
  isEditing?: boolean;
}

const CYCLE_INTERVAL_MS = 3000;

export function VibeTrackerBlock({ block }: VibeTrackerBlockProps) {
  const { items } = block.content;
  const [activeIndex, setActiveIndex] = useState(0);

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
      <div className="flex items-center justify-center w-full h-full text-white/30 text-sm">
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
            <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-300/70 leading-none mb-0.5">
              {current.label}
            </p>
            <p className="text-white text-sm font-medium truncate leading-snug">
              {current.value}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
