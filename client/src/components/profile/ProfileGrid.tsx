'use client';

import type { Block, GridConfig, ThemeConfig } from '@/types';
import { motion, type Variants } from 'framer-motion';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { getBlockStyles, getAnimationClass } from '@/lib/utils';
import { getGlassClass, getCursorClass } from '@/lib/cursorStyles';import { useResponsiveGrid } from '@/hooks/useResponsiveGrid';

interface ProfileGridProps {
  blocks: Block[];
  grid: GridConfig;
  theme: ThemeConfig;
  staggered?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

import { useState, useEffect } from 'react';

export function ProfileGrid({ blocks, grid, theme, staggered = false }: ProfileGridProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { responsiveBlocks, isMobile } = useResponsiveGrid(blocks);
  const activeColumns = isMobile ? 2 : grid.columns;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${activeColumns}, 1fr)`,
    gridAutoRows: `${grid.rowHeight}px`,
    gridAutoFlow: 'row dense',
    gap: `${grid.gap}px`,
    maxWidth: `${grid.maxWidth}px`,
    margin: '0 auto',
    padding: '24px',
    opacity: isMounted ? 1 : 0, // Prevent SSR flash
    transition: 'opacity 0.3s ease',
  };

  const glassClass = getGlassClass(theme.glassmorphismLevel);
  const cursorClass = getCursorClass(theme.cursorStyle);

  return (
    <div
      className={`min-h-screen relative z-10 ${cursorClass}`}
      style={{
        backgroundColor: theme.backgroundColor,
        fontFamily: theme.fontFamily,
      }}
    >
      <motion.div
        style={gridStyle}
        variants={staggered ? containerVariants : undefined}
        initial={staggered ? 'hidden' : undefined}
        animate={staggered && isMounted ? 'visible' : undefined}
      >
        {responsiveBlocks.map((block, index) => (
          <motion.div
            key={block.id}
            layout="position"
            variants={staggered ? itemVariants : undefined}
            initial={staggered ? undefined : { opacity: 0, y: 20 }}
            animate={staggered ? undefined : { opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={
              staggered
                ? undefined
                : {
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }
            }
            className={`${getAnimationClass(block.style.animation)} ${glassClass} overflow-hidden`}
            style={{
              gridColumn: `span ${block.position.w}`,
              gridRow: `span ${block.position.h}`,
              ...getBlockStyles(block.style),
            }}
          >
            <BlockRenderer block={block} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
