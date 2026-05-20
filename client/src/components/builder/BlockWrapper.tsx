'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Block } from '@/types';
import { useBuilderStore } from '@/stores/builderStore';
import { getBlockStyles } from '@/lib/utils';
import { getGlassClass } from '@/lib/cursorStyles';
import { useResponsiveGrid } from '@/hooks/useResponsiveGrid';

interface BlockWrapperProps {
  block: Block;
  children: React.ReactNode;
}

export function BlockWrapper({ block, children }: BlockWrapperProps) {
  const selectedBlockId = useBuilderStore((s) => s.selectedBlockId);
  const selectBlock = useBuilderStore((s) => s.selectBlock);
  const removeBlock = useBuilderStore((s) => s.removeBlock);
  const toggleBlockVisibility = useBuilderStore((s) => s.toggleBlockVisibility);
  const resizeBlock = useBuilderStore((s) => s.resizeBlock);
  const shiftBlockIndex = useBuilderStore((s) => s.shiftBlockIndex);
  const blocksCount = useBuilderStore((s) => s.blocks.length);
  const blockIndex = useBuilderStore((s) => s.blocks.findIndex((b) => b.id === block.id));
  const columns = useBuilderStore((s) => s.grid.columns);
  const glassmorphismLevel = useBuilderStore((s) => s.theme.glassmorphismLevel);

  // Detect mobile for size clamping in UI
  const { isMobile } = useResponsiveGrid([]);
  const maxCols = isMobile ? 2 : columns;

  const isSelected = selectedBlockId === block.id;
  const glassClass = getGlassClass(glassmorphismLevel);
  const isFirst = blockIndex === 0;
  const isLast = blockIndex === blocksCount - 1;

  // Custom size input state
  const [customW, setCustomW] = useState(String(block.position.w));
  const [customH, setCustomH] = useState(String(block.position.h));

  // Sync custom inputs when block size changes externally
  useEffect(() => {
    setCustomW(String(block.position.w));
    setCustomH(String(block.position.h));
  }, [block.position.w, block.position.h]);

  const applyCustomSize = useCallback(() => {
    const w = Math.max(1, Math.min(maxCols, parseInt(customW, 10) || 1));
    const h = Math.max(1, Math.min(6, parseInt(customH, 10) || 1));
    setCustomW(String(w));
    setCustomH(String(h));
    resizeBlock(block.id, w, h);
  }, [customW, customH, maxCols, block.id, resizeBlock]);

  // Keyboard shortcuts when this block is selected
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isSelected) return;
    // Don't intercept if user is typing in the custom size inputs
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        shiftBlockIndex(block.id, -maxCols);
        break;
      case 'ArrowDown':
        e.preventDefault();
        shiftBlockIndex(block.id, maxCols);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (!isFirst) shiftBlockIndex(block.id, -1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (!isLast) shiftBlockIndex(block.id, 1);
        break;
      case 'Delete':
      case 'Backspace':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          removeBlock(block.id);
        }
        break;
    }
  }, [isSelected, isFirst, isLast, block.id, maxCols, shiftBlockIndex, removeBlock]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Responsive size presets — filter out sizes wider than max columns
  const sizePresets = [
    { w: 1, h: 1 }, { w: 2, h: 1 }, { w: 2, h: 2 },
    { w: 3, h: 1 }, { w: 3, h: 2 },
    { w: 4, h: 1 }, { w: 4, h: 2 },
  ].filter((s) => s.w <= maxCols);

  // Display width respects mobile clamping
  const displayW = Math.min(block.position.w, maxCols);

  // CSS Grid span — the ONLY layout mechanism. No x/y.
  const style: React.CSSProperties = {
    gridColumn: `span ${displayW}`,
    gridRow: `span ${block.position.h}`,
    opacity: block.isVisible ? 1 : 0.4,
    zIndex: isSelected ? 50 : 1,
    ...getBlockStyles(block.style),
    position: 'relative',
    overflow: isSelected ? 'visible' : 'hidden',
  };

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.8 }}
      style={style}
      className={`group cursor-pointer ${glassClass} ${
        isSelected
          ? 'ring-2 ring-violet-500/80 shadow-[0_0_30px_rgba(139,92,246,0.2)]'
          : 'hover:ring-1 hover:ring-white/20'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(isSelected ? null : block.id);
      }}
    >
      {/* Block content */}
      <div className="w-full h-full overflow-hidden">
        {children}
      </div>

      {/* ─── Floating Toolbar (renders below the block) ──────────── */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute left-1/2 z-[60] flex flex-col items-center gap-1.5 pt-2"
            style={{ top: '100%', transform: 'translateX(-50%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ─── Toolbar Row: Arrows + Actions ─────────────────── */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 px-2 py-1.5 bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-black/60 max-w-[90vw] md:max-w-none">
              {/* D-Pad: ↑ ↓ ← → */}
              <button
                disabled={blockIndex < maxCols}
                onClick={() => shiftBlockIndex(block.id, -maxCols)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm md:text-xs font-bold"
                title="Move up row (↑)"
              >↑</button>
              <button
                disabled={blockIndex + maxCols >= blocksCount}
                onClick={() => shiftBlockIndex(block.id, maxCols)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm md:text-xs font-bold"
                title="Move down row (↓)"
              >↓</button>
              <button
                disabled={isFirst}
                onClick={() => shiftBlockIndex(block.id, -1)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm md:text-xs font-bold"
                title="Move left (←)"
              >←</button>
              <button
                disabled={isLast}
                onClick={() => shiftBlockIndex(block.id, 1)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm md:text-xs font-bold"
                title="Move right (→)"
              >→</button>

              {/* Divider */}
              <div className="w-px h-5 bg-white/10 mx-0.5" />

              {/* Visibility */}
              <button
                onClick={() => toggleBlockVisibility(block.id)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-all text-xs md:text-[10px]"
                title={block.isVisible ? 'Hide' : 'Show'}
              >
                {block.isVisible ? '👁️' : '🚫'}
              </button>
              {/* Delete */}
              <button
                onClick={() => removeBlock(block.id)}
                className="w-9 h-9 md:w-7 md:h-7 flex items-center justify-center rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 transition-all text-xs md:text-[10px]"
                title="Delete"
              >✕</button>
            </div>

            {/* ─── Size Row: Presets + Custom Input ───────────────── */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 px-2 py-1.5 bg-zinc-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl shadow-black/60 max-w-[90vw] md:max-w-none">
              {/* Presets */}
              {sizePresets.map((size) => {
                const isActive = block.position.w === size.w && block.position.h === size.h;
                return (
                  <button
                    key={`${size.w}x${size.h}`}
                    onClick={() => resizeBlock(block.id, size.w, size.h)}
                    className={`px-3 py-1.5 md:px-2 md:py-0.5 text-xs md:text-[10px] font-semibold rounded-md transition-all ${
                      isActive
                        ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                        : 'bg-white/[0.06] text-white/50 hover:bg-white/[0.12] hover:text-white'
                    }`}
                  >
                    {size.w}×{size.h}
                  </button>
                );
              })}

              {/* Divider */}
              <div className="w-px h-5 bg-white/10 mx-0.5" />

              {/* Custom WxH input */}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  max={maxCols}
                  value={customW}
                  onChange={(e) => setCustomW(e.target.value)}
                  onBlur={applyCustomSize}
                  onKeyDown={(e) => { if (e.key === 'Enter') applyCustomSize(); }}
                  className="w-10 h-7 md:w-8 md:h-6 text-center text-xs md:text-[10px] font-bold text-white bg-white/[0.08] border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-xs md:text-[10px] font-bold text-white/30">×</span>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={customH}
                  onChange={(e) => setCustomH(e.target.value)}
                  onBlur={applyCustomSize}
                  onKeyDown={(e) => { if (e.key === 'Enter') applyCustomSize(); }}
                  className="w-10 h-7 md:w-8 md:h-6 text-center text-xs md:text-[10px] font-bold text-white bg-white/[0.08] border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
